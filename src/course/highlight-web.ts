/** Obsidian-palette tokenizers for JavaScript, CSS, HTML/Vue and JSON code blocks (same `.tk-*` classes as highlight.ts). */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const span = (c: string, t: string) => `<span class="tk-${c}">${esc(t)}</span>`;

const JSKW = new Set('const let var function return if else for while do switch case break continue new class extends import from export default async await try catch finally throw typeof instanceof in of delete void yield this super static get set'.split(' '));
const JSCONST = new Set(['true', 'false', 'null', 'undefined', 'NaN']);
const JSBI = new Set('console document window Math JSON Object Array String Number Boolean Promise Date localStorage sessionStorage fetch axios ref computed watch reactive onMounted onUnmounted defineProps defineEmits defineExpose setTimeout setInterval parseInt parseFloat require module process app express mongoose'.split(' '));

export function javascript(src: string): string {
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|(=>|[-+*/%<>=!&|?:]+)|(\s+)|([\s\S])/g;
  let out = '', m: RegExpExecArray | null, afterFn = false, prev = '';
  while ((m = re.exec(src))) {
    const [t, com, str, num, id, op, ws] = m;
    if (com) out += span('c', t);
    else if (str) out += span('s', t);
    else if (num) out += span('n', t);
    else if (id) {
      const call = /^\s*\(/.test(src.slice(re.lastIndex));
      if (JSCONST.has(id)) out += span('b', t);
      else if (JSKW.has(id) && prev !== '.') { out += span('k', t); afterFn = id === 'function' || id === 'class'; }
      else if (afterFn) { out += span('f', t); afterFn = false; }
      else if (JSBI.has(id) && prev !== '.') out += span('bi', t);
      else if (call) out += span('f', t);
      else out += span('v', t);
      prev = '';
    } else if (op) { out += span('o', t); prev = ''; }
    else if (ws) out += t;
    else { out += esc(t); prev = t; }
  }
  return out;
}

export function css(src: string): string {
  const re = /(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(@[\w-]+)|(#[0-9a-fA-F]{3,8}\b|-?\d*\.?\d+(?:px|em|rem|vh|vw|fr|s|ms|deg|%)?)|([\w-]+)(?=\s*:(?!:)[^{};]*[;}])|([.#]?[A-Za-z_][\w-]*(?:::?[\w-]+(?:\([^)]*\))?)*(?=[^{};]*\{))|(\s+)|([\s\S])/g;
  let out = '', m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const [t, com, str, at, num, prop, sel, ws] = m;
    if (com) out += span('c', t);
    else if (str) out += span('s', t);
    else if (at) out += span('k', t);
    else if (num) out += span('n', t);
    else if (prop) out += span('bi', t);
    else if (sel) out += span('f', t);
    else if (ws) out += t;
    else out += esc(t);
  }
  return out;
}

export function html(src: string): string {
  const re = /(<!--[\s\S]*?-->)|(<\/?)([A-Za-z][\w:-]*)((?:\s+[^\s=<>"'/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)(\s*\/?>)|(\{\{[\s\S]*?\}\})/g;
  const attrs = (a: string) => a.replace(/(\s+)([^\s=<>"'/]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+))?/g, (_, sp, n, eq, v) => sp + span('bi', n) + (v !== undefined ? esc(eq) + span('s', v) : ''));
  let out = '', i = 0, m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m.index > i) out += esc(src.slice(i, m.index));
    i = re.lastIndex;
    if (m[1]) out += span('c', m[1]);
    else if (m[6]) out += '{{' + javascript(m[6].slice(2, -2)) + '}}';
    else {
      const open = m[2], name = m[3], a = m[4], close = m[5];
      out += esc(open) + span('k', name) + attrs(a) + esc(close);
      const nm = name.toLowerCase();
      if (open === '<' && (nm === 'style' || nm === 'script') && !/\/>$/.test(close)) {
        const end = src.toLowerCase().indexOf('</' + nm, i);
        const body = src.slice(i, end < 0 ? src.length : end);
        out += nm === 'style' ? css(body) : javascript(body);
        i = re.lastIndex = end < 0 ? src.length : end;
      }
    }
  }
  return out + esc(src.slice(i));
}

export function json(src: string): string {
  return src.replace(/("(?:\\.|[^"\\])*")(\s*:)?|(-?\b\d+(?:\.\d+)?\b)|\b(true|false|null)\b|([\s\S])/g, (t, str, colon, num, kw) => (str ? (colon ? span('bi', str) + esc(colon) : span('s', str)) : num ? span('n', t) : kw ? span('b', t) : esc(t)));
}
