/**
 * Readability pass over lesson HTML: long, dense paragraphs (and long table cells / list items) are broken into short
 * visual blocks (`<span class="pb">`, display:block) at sentence boundaries, so a wall of text reads as a few small
 * chunks. Works on the HTML string before it is rendered; the element, its classes and its inline markup are untouched.
 */
const INLINE = ['strong', 'em', 'a', 'span', 'code', 'b', 'i', 'u', 'sub', 'sup', 'small', 'mark'];
const OPEN = INLINE.map((t) => new RegExp('<' + t + '(?:[ ][^>]*)?>', 'g'));
const CLOSE = INLINE.map((t) => new RegExp('</' + t + '>', 'g'));
const balanced = (s: string) => OPEN.every((re, i) => (s.match(re) || []).length === (s.match(CLOSE[i]) || []).length);
const plain = (s: string) => s.replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/gi, 'x');

const ABBR = /(?:\b(?:e\.g|i\.e|vs|etc|cf|Fig|approx|No|Dr|St|Mr|Ms|Mrs|al|resp|incl|est|ca|Eq|Ch|Sec|p|pp)|\b[A-Za-z]|\b\d+)\.$/;
const MARK = /^(?:<[^>]+>)*(?:Example|Examples|E\.g\.|Note|However|Key|Common mistake|Cross-reference|Caveat|Why|Rule|In practice|Exam|Trap|Warning|Important|Tip|Remember|Limitation|Gotcha|Trade-off|Takeaway|Take-away|Answer|Worked)\b/;
const LABEL = /^(?:<[^>]+>)*[A-Z][^.:<>]{1,45}:(?:<\/[a-z]+>)*\s/;
const MIN = 300, TARGET = 220, MAX = 400;

const SENT = /([.?!)”"’])((?:<\/[a-z]+>)*)(\s+)(?=(?:<[^>]+>)*[A-Z“"\[])/g;

type Block = { h: string; li?: boolean };

function sentences(h: string): string[] {
  const cuts: { at: number; skip: number }[] = [];
  SENT.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = SENT.exec(h))) {
    const idx = m.index;
    if (h.lastIndexOf('<', idx) > h.lastIndexOf('>', idx)) continue; // inside a tag
    const before = plain(h.slice(0, idx + 1));
    if (m[1] === '.' && ABBR.test(before.slice(-14))) continue;
    if (m[1] !== '.' && m[1] !== '?' && m[1] !== '!' && !/[.?!]/.test(before.slice(-2, -1))) continue; // closing quote/bracket must follow a full stop
    cuts.push({ at: idx + 1 + m[2].length, skip: m[3].length });
  }
  const out: string[] = []; let p = 0;
  for (const c of cuts) { out.push(h.slice(p, c.at)); p = c.at + c.skip; }
  out.push(h.slice(p));
  return out;
}

/** Break very long sentences at semicolons. */
function semis(s: string): string[] {
  if (plain(s).length <= MAX || (s.match(/;\s/g) || []).length < 2) return [s];
  const parts = s.split(/(?<=;)\s+/); const out: string[] = []; let cur = '';
  for (const x of parts) {
    if (cur && plain(cur).length >= TARGET && balanced(cur)) { out.push(cur); cur = x; } else cur = cur ? cur + ' ' + x : x;
  }
  if (cur) out.push(cur);
  return out.every(balanced) ? out : [s];
}

/** "Label: a; b; c; d" with several items becomes the label line plus one bullet line per item. */
function listify(s: string): Block[] | null {
  if (plain(s).length < 200 || (s.match(/;\s/g) || []).length < 3) return null;
  const c = s.search(/:\s/); if (c < 0 || plain(s.slice(0, c)).length > 90) return null;
  const head = s.slice(0, c + 1), items = s.slice(c + 1).trim().split(/;\s+/).map((x) => x.replace(/[;.]$/, '').trim()).filter(Boolean);
  if (items.length < 4 || items.some((x) => plain(x).length > 200) || !balanced(head) || !items.every(balanced)) return null;
  return [{ h: head }, ...items.map((h) => ({ h, li: true }))];
}

/** Text with real line breaks and "- " / "1." markers (which HTML collapses into one run-on line). */
function lines(h: string): Block[] | null {
  if (!/\n\s*(?:[-•]|\d+[.)])\s/.test(h)) return null;
  const out = h.split(/\n+/).map((x) => x.trim()).filter(Boolean).map<Block>((x) => (/^[-•]\s/.test(x) ? { h: x.replace(/^[-•]\s+/, ''), li: true } : { h: x }));
  return out.length > 1 && out.every((b) => balanced(b.h)) ? out : null;
}

export function chunk(h: string): Block[] | null {
  const ln = lines(h); if (ln) return ln;
  if (plain(h).length < MIN) return null;
  const sents = sentences(h);
  const blocks: Block[] = []; let cur = '';
  const flush = () => { if (cur) { blocks.push({ h: cur }); cur = ''; } };
  for (const s of sents) {
    const lst = listify(s);
    if (lst) { flush(); blocks.push(...lst); continue; }
    for (const piece of semis(s)) {
      const t = plain(cur).length;
      const parenthetical = /^\(/.test(piece) && plain(piece).length < 160;
      const colonLead = /:\s*(?:<\/[a-z]+>)*$/.test(cur);
      const split = cur && !parenthetical && !colonLead && (t >= TARGET || (MARK.test(piece) && t >= 60) || (LABEL.test(piece) && t >= 40) || t + plain(piece).length > MAX);
      if (split && balanced(cur)) { flush(); cur = piece; } else cur = cur ? cur + ' ' + piece : piece;
    }
  }
  if (cur) {
    const last = blocks[blocks.length - 1];
    if (last && !last.li && plain(cur).length < 60 && balanced(last.h + ' ' + cur)) last.h += ' ' + cur; else blocks.push({ h: cur });
  }
  return blocks.length > 1 && blocks.every((b) => balanced(b.h)) ? blocks : null;
}

const EL = /<(p|li|td)(\s[^>]*)?>((?:(?!<\/?(?:div|table|pre|ul|ol|svg|p|tr|td|li|button|h[1-6])\b)[\s\S])*?)<\/\1>/g;

export function breakText(html: string): string {
  return html.replace(EL, (m, tag: string, attrs: string | undefined, inner: string) => {
    const b = chunk(inner);
    return b ? '<' + tag + (attrs || '') + '>' + b.map((x) => '<span class="pb' + (x.li ? (/^\(?\d+[.)]/.test(x.h) ? ' pb-li pb-num' : ' pb-li') : '') + '">' + x.h + '</span>').join('') + '</' + tag + '>' : m;
  });
}

/** For strings that are bare text (no block tags): chunk the whole string; otherwise treat like lesson HTML. */
export function breakAny(html: string): string {
  if (/<(?:p|div|ul|ol|table|pre)\b/.test(html)) return breakText(html);
  const b = chunk(html);
  return b ? b.map((x) => '<span class="pb' + (x.li ? (/^\(?\d+[.)]/.test(x.h) ? ' pb-li pb-num' : ' pb-li') : '') + '">' + x.h + '</span>').join('') : html;
}
