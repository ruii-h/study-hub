import fs from 'node:fs';
const d = JSON.parse(fs.readFileSync('src/courses/bpas/data.json', 'utf8'));
const re = /.{60}\b(?:drawn|shown|described|covered|introduced|listed|defined|explained|summarised|seen|given|set out|detailed|see|from|in|at|by|per|under|on)\s*(?:[;,.:)]|\s-\s|$).{0,30}/g;
d.lessons.forEach((l) => {
  const t = l.html.replace(/<pre class="mermaid[\s\S]*?<\/pre>/g, ' ').replace(/<[^>]+>/g, '|');
  const seen = new Set();
  for (const m of t.matchAll(re)) { if (/\|\s*(?:[;,.:)])/.test(m[0]) || /\b(?:drawn|shown|described|covered|introduced|listed|defined|explained|summarised|seen|detailed|see)\s*[;,.:)]/.test(m[0])) { if (!seen.has(m[0])) { seen.add(m[0]); console.log(l.n, JSON.stringify(m[0])); } } }
});
