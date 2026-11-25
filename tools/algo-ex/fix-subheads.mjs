// Turns paragraphs that are only a bold line (BFS / DFS, Method 1-3, Plan A/B ...) into real sub-headings (class t-h3x).
import fs from 'fs';
const F = new URL('../../src/courses/algo/data.json', import.meta.url);
const D = JSON.parse(fs.readFileSync(F, 'utf8'));
let n = 0;
for (const l of D.lessons) l.html = l.html.replace(/<p><strong[^>]*>([^<]{3,140})<\/strong><\/p>/g, (m, t) => { n++; return `<div role="heading" aria-level="3" class="t-h3x">${t.replace(/\.$/, '')}</div>`; });
fs.writeFileSync(F, JSON.stringify(D));
console.log('converted', n);
