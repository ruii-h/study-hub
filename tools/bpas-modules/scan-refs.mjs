import fs from 'node:fs';
const d = JSON.parse(fs.readFileSync('src/courses/bpas/data.json', 'utf8'));
const strip = (s) => s.replace(/<pre class="mermaid[\s\S]*?<\/pre>/g, ' ').replace(/<[^>]+>/g, ' ');
const pats = { sect: /§\s?\d+(\.\d+)?/g, chap: /\b(Chapter|Lecture|chapter)\s+\d+/g, rel: /\b(next|previous|this|last|earlier|later|following|preceding)\s+chapter/gi, href: /href="#[^"]*"/g, data: /data-(?:ch|go|n|id)="[^"]*"/g };
const tally = {};
const add = (k, v, where) => { tally[k] ??= {}; (tally[k][v] ??= []).push(where); };
d.lessons.forEach((l) => {
  const t = strip(l.html);
  for (const [k, re] of Object.entries(pats)) { const src = k === 'href' || k === 'data' ? l.html : t; for (const m of src.matchAll(re)) add(k, m[0], 'L' + l.n); }
});
const other = JSON.stringify({ q: d.quiz, h: d.hard, c: d.cards, e: d.exam });
for (const [k, re] of Object.entries(pats)) for (const m of other.matchAll(re)) add(k, m[0], 'other');
for (const [k, o] of Object.entries(tally)) { console.log('##', k); for (const [v, w] of Object.entries(o)) console.log('  ', v, '<-', [...new Set(w)].join(',') + (w.length > 1 ? ' x' + w.length : '')); }
