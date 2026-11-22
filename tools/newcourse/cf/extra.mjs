// Self-check Q&A (Part O of the notes) as <details> blocks, like the IS211 guide.
import path from 'node:path';
import { lines, find } from '../src.mjs';
import { clean, mdToHtml } from '../md.mjs';

const ls = lines(path.join(import.meta.dirname, 'source', 'notes.md'));
export const exam = null;
export const selfq = (refMap) => {
  const a = find(ls, /^# Part O /);
  const body = ls.slice(a + 1).join('\n');
  const items = body.split(/\n#### /).slice(1);
  const out = ['<p><em>Think first, then open the answer. These mix recall, explain-why, calculation and apply questions.</em></p>'];
  items.forEach((it) => {
    const m = /^Q(\d+)\.\s*(?:\(([^)]*)\))?\s*\n+([\s\S]*?)\n+>\s*\*\*A:\*\*\s*([\s\S]*?)(?:\n+---\s*)?$/.exec(it.trim());
    if (!m) return;
    const clean2 = (t) => mdToHtml(clean(t, refMap)).replace(/^<p>|<\/p>\s*$/g, '').trim();
    out.push(`<p><strong>Q${m[1]}${m[2] ? ' (' + m[2].toLowerCase() + ')' : ''}.</strong> ${clean2(m[3])}</p>\n<details>\n<summary>Answer</summary>\n<p>${clean2(m[4].replace(/\n>\s?/g, '\n'))}</p>\n</details>`);
  });
  selfq.count = out.length - 1;
  return out.join('\n');
};
