// Helpers for slicing the author's markdown notes into chapters and sections.
import fs from 'node:fs';

export const lines = (file) => fs.readFileSync(file, 'utf8').replace(/\r/g, '').split('\n');

/** index of the first line that matches re at or after `from` (outside code fences) */
export function find(ls, re, from = 0) {
  let fence = false;
  for (let i = from; i < ls.length; i++) {
    if (/^```/.test(ls[i])) fence = !fence;
    if (!fence && re.test(ls[i])) return i;
  }
  return -1;
}

/** split lines into [{title, md}] at headings of exactly `level` (e.g. '## '), ignoring headings inside code fences. */
export function split(ls, level, pre) {
  const out = [];
  let cur = null, fence = false;
  const head = new RegExp('^' + level + '(?!#)');
  const flush = () => { if (cur) { cur.md = cur.lines.join('\n').trim(); delete cur.lines; if (cur.md || cur.title) out.push(cur); } };
  for (const l of ls) {
    if (/^```/.test(l)) fence = !fence;
    if (!fence && head.test(l)) {
      flush();
      const t = l.replace(head, '').trim();
      const m = /^([A-Z]\.\d+)\s+(.*)$/.exec(t);
      cur = { title: m ? m[2] : t, label: m ? m[1] : '', lines: [] };
    } else {
      if (!cur) cur = { title: pre || '', label: '', lines: [], unnumbered: !!pre };
      cur.lines.push(l);
    }
  }
  flush();
  return out.filter((s) => s.md.trim() || s.title);
}
