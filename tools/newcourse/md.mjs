// Markdown -> lesson HTML in the exact vocabulary the study-guide engine and CSS already use
// (t-section / t-h2 / t-num, t-table-wrap > t-mini-table, t-code, t-callout, t-rule-list, pre.mermaid, figcap, k-c ...).
import { Marked } from 'marked';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '+': '⁺', n: 'ⁿ' };
// tiny LaTeX -> Unicode for the handful of formulas in the notes (no KaTeX needed)
export function tex(s) {
  return s
    .replace(/\\text\{([^}]*)\}/g, '$1').replace(/\\times/g, '×').replace(/\\approx/g, '≈').replace(/\\le(q)?\b/g, '≤').replace(/\\ge(q)?\b/g, '≥')
    .replace(/\\log/g, 'log').replace(/\\cdot/g, '·').replace(/\\ /g, ' ').replace(/\\,/g, ' ').replace(/\{,\}/g, ',')
    .replace(/\^\{([^}]*)\}/g, (m, a) => [...a].map((c) => SUP[c] || c).join('')).replace(/\^([0-9n])/g, (m, a) => SUP[a])
    .replace(/_\{([^}]*)\}/g, '$1').replace(/\\([a-zA-Z]+)/g, '$1');
}

/** Remove the course-slide source tags and authoring asides from a markdown string. */
export function clean(md, refMap = {}) {
  let s = md.replace(/\r/g, '');
  s = s.replace(/\s*`\[(?:W\d+|LT|Comp|Lab|Lec|ICE)[^\]`]*\]`/g, '');
  s = s.replace(/\s*\[(?:W\d+ s[^\]]*|LT[^\]]*|Comp §[^\]]*)\]/g, '');
  s = s.replace(/\((?:added context|inferred|added analogy in source)\)/gi, '').replace(/\((?:added context|inferred)[:;]\s*/gi, '(');
  s = s.replace(/\*\((?:added context|inferred)[^)]*\)\*/gi, '');
  s = s.replace(/\s*\([^()]*(?:inferred|re-expressed|added context)[^()]*\)/gi, '');
  s = s.replace(/compendium breaks/g, 'course notes break').replace(/compendium describes/g, 'course notes describe').replace(/compendium's fuller description/g, 'a fuller description').replace(/([Tt])he compendium/g, '$1he course notes');
  s = s.replace(/Parts ([A-J]), ([A-J])/g, (m, a, b) => (refMap['P' + a] && refMap['P' + b] ? `Chapters ${refMap['P' + a]} and ${refMap['P' + b]}` : m));
  // $...$ maths -> plain Unicode
  s = s.replace(/\$\$([^$]+)\$\$/g, (m, a) => tex(a)).replace(/\$([^$\n]+)\$/g, (m, a) => tex(a));
  // part/section letters -> chapter numbers so the engine can link them
  s = s.replace(/§([A-Z])\.(\d+)/g, (m, L, n) => '§' + (refMap[L + '.' + n] || m.slice(1)));
  s = s.replace(/\bPart ([A-J])\b/g, (m, L) => (refMap['P' + L] ? 'Chapter ' + refMap['P' + L] : m));
  return s;
}

const CALLOUT = { tip: 'success', warning: 'warn', mistake: 'danger', gap: 'info', fix: 'info', info: 'info', danger: 'danger', success: 'success', warn: 'warn' };

export function makeMarked() {
  const m = new Marked({ gfm: true, breaks: false });
  m.use({
    renderer: {
      heading({ tokens, depth }) { return `<h3 class="t-h3">${this.parser.parseInline(tokens)}</h3>\n`; },
      strong({ tokens }) { return `<strong class="k-c">${this.parser.parseInline(tokens)}</strong>`; },
      codespan({ text }) { return `<code>${text}</code>`; },
      code({ text, lang }) {
        if (lang === 'mermaid') return `<pre class="mermaid">${esc(text.replace(/^\s*%%\{init:.*\}%%\s*\n?/m, ''))}</pre>\n`;
        const l = (lang || 'text').replace('text', 'output');
        return `<div class="t-code"><div class="t-code-header"><span>${esc(l)}</span></div><div class="t-code-body" tabindex="0">${esc(text.replace(/\n+$/, ''))}</div></div>\n`;
      },
      table({ header, rows }) {
        const cell = (c, tag) => `<${tag}>${this.parser.parseInline(c.tokens)}</${tag}>`;
        return `<div class="t-table-wrap" tabindex="0"><table class="t-mini-table"><thead><tr>${header.map((c) => cell(c, 'th')).join('')}</tr></thead><tbody>${rows.map((r) => '<tr>' + r.map((c) => cell(c, 'td')).join('') + '</tr>').join('')}</tbody></table></div>\n`;
      },
      list(token) {
        const tag = token.ordered ? 'ol' : 'ul';
        return `<${tag} class="t-rule-list">${token.items.map((it) => `<li>${this.parser.parse(it.tokens, !!it.loose).replace(/^<p>|<\/p>\s*$/g, '')}</li>`).join('')}</${tag}>\n`;
      },
      paragraph({ tokens }) {
        const t = this.parser.parseInline(tokens);
        const c = /^<em>Caption:\s*([\s\S]*)<\/em>$/.exec(t.trim());
        return c ? `<p class="figcap">${c[1].replace(/^\S/, (x) => x.toUpperCase())}</p>\n` : `<p>${t}</p>\n`;
      },
      hr() { return ''; },
      html({ text }) { return text; },
    },
  });
  return m;
}
const MD = makeMarked();

/** Convert one block of markdown, expanding <div class="callout x"> ... </div> wrappers into t-callout boxes. */
export function mdToHtml(md) {
  md = md.replace(/<style>[\s\S]*?<\/style>/g, '');
  const out = [];
  const re = /<div class="callout ([a-z]+)">\s*\n([\s\S]*?)\n<\/div>/g;
  let last = 0, m;
  while ((m = re.exec(md))) {
    out.push(MD.parse(md.slice(last, m.index)));
    out.push(`<div class="t-callout ${CALLOUT[m[1]] || 'info'}">${MD.parse(m[2])}</div>\n`);
    last = m.index + m[0].length;
  }
  out.push(MD.parse(md.slice(last)));
  return out.join('').replace(/<p>\s*<\/p>/g, '');
}

export const stripEmoji = (t) => t.replace(/^[^A-Za-z0-9`'"(]+/, '').replace(/\s*`\[[^\]]*\]`/g, '').trim();
