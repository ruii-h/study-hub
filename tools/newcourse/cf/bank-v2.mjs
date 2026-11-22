// IS114 practice bank: parsed from source/IS114_Question_Bank_v2.md (MCQ -> quiz, MSQ -> hard, Fill -> fill).
import fs from 'node:fs';
import path from 'node:path';
const NL = String.fromCharCode(10);
const CMDS = /^(touch|cat|nano|echo|head|tail|grep|sort|uniq|wc|ls|cut|chmod|pwd|ping|nmap|dig|http|ssh|rm|cd|mkdir|ps|fg|bg|python3?)\b/;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function loadBank(bq) {
  const md = fs.readFileSync(path.join(import.meta.dirname, 'source', 'IS114_Question_Bank_v2.md'), 'utf8');
  const quiz = {}, hard = {}, fill = {}, problems = [];
  let ch = 0, ctx = '', ctxLines = [];
  const flush = () => { ctx = ctxLines.length ? '<div class="qctx">' + ctxLines.map((l) => (l.startsWith('- ') ? '' : '') + bq(esc(l.replace(/^- /, '')))).join('<br>') + '</div>' : ''; };
  const text = (s) => bq(s.replace(/`([^`]+)`/g, (m, a) => '`' + a + '`'));
  const blocks = md.split(NL);
  let i = 0;
  while (i < blocks.length) {
    const l = blocks[i];
    const h = /^## Chapter (\d+)\./.exec(l);
    if (h) { ch = +h[1]; ctxLines = []; ctx = ''; i++; continue; }
    if (/^### /.test(l)) { ctxLines = []; i++; while (i < blocks.length && !/^\d+\. \*\*\[/.test(blocks[i]) && !/^---/.test(blocks[i])) { if (blocks[i].trim()) ctxLines.push(blocks[i].trim().replace(/\*\*(.+?)\*\*/g, '$1')); i++; } flush(); continue; }
    if (/^---/.test(l)) { ctxLines = []; ctx = ''; i++; continue; }
    const m = /^(\d+)\. \*\*\[(\w+)\]\*\* (.*)$/.exec(l);
    if (!m) { i++; continue; }
    const type = m[2], stem = m[3]; i++;
    const opts = []; let why = '', ans = '';
    while (i < blocks.length && !/^\d+\. \*\*\[/.test(blocks[i]) && !/^---/.test(blocks[i]) && !/^#/.test(blocks[i])) {
      const t = blocks[i].trim();
      if (t.startsWith('- ')) opts.push({ ok: t.startsWith('- ✅'), t: t.replace(/^- (✅ )?/, '') });
      else if (t.startsWith('*Why:*')) why = t.replace(/^\*Why:\*\s*/, '');
      else if (t.startsWith('**Answer:**')) ans = t.replace(/^\*\*Answer:\*\*\s*/, '');
      i++;
    }
    const q = (ctx ? ctx : '') + text(stem), e = text(why);
    const tag = `bank-v2 q${m[1]}`;
    if (type === 'MCQ') {
      const c = opts.findIndex((o) => o.ok);
      if (c < 0 || opts.filter((o) => o.ok).length !== 1) problems.push(tag + ' needs exactly one correct option');
      (quiz[ch] ||= []).push({ q, o: opts.map((o) => text(o.t)), c, e, w: opts.map(() => null) });
    } else if (type === 'MSQ') {
      const a = opts.map((o, k) => (o.ok ? 'ABCDEF'[k] : '')).join('');
      if (!a) problems.push(tag + ' has no correct option');
      (hard[ch] ||= []).push({ q, o: opts.map((o) => text(o.t)), a, e, w: null });
    } else if (type === 'Fill') {
      const spans = [...ans.matchAll(/`([^`]+)`/g)].map((x) => x[1]);
      if (!spans.length) problems.push(tag + ' fill has no answer');
      let a = [...spans];
      const first = spans[0] || '';
      const isCmd = CMDS.test(first);
      if (/___ FILENAME/.test(stem)) a = a.concat(a.map((x) => x + ' FILENAME'));
      if (/any argument order/.test(ans)) a = ['dig +short x.com @1.1.1.1', 'dig x.com +short @1.1.1.1', 'dig @1.1.1.1 +short x.com', 'dig @1.1.1.1 x.com +short', 'dig x.com @1.1.1.1 +short', 'dig +short @1.1.1.1 x.com'];
      if (first === '<br>') a.push('<br/>', '<br />', 'br');
      const caesar = /^[A-Z]{6,}$/.test(first);
      (fill[ch] ||= []).push({ q, a, e, kind: isCmd ? 'cmd' : 'out', ci: !isCmd && !caesar });
    } else problems.push(tag + ' unknown type ' + type);
  }
  return { quiz, hard, fill, problems };
}
