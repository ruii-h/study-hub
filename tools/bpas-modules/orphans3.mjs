import fs from 'node:fs';
const d = JSON.parse(fs.readFileSync('src/courses/bpas/data.json', 'utf8'));
const re = /.{70}\b(?:in|see|from|of|to|with|per|under|at|and|the|a|on|by|for)\s*[;:,.)](?=\s|$).{0,30}/g;
d.lessons.forEach((l) => {
  const t = l.html.replace(/<pre class="mermaid[\s\S]*?<\/pre>/g, ' ').replace(/<[^>]+>/g, '|').replace(/\s+/g, ' ');
  const seen = new Set();
  for (const m of t.matchAll(re)) { if (/\b(?:e\.g|i\.e|etc|vs|No)\b[.,]?$/.test(m[0].slice(0, 90))) continue; if (!seen.has(m[0])) { seen.add(m[0]); console.log(l.n, JSON.stringify(m[0])); } }
});
