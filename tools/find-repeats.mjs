// Reports blocks inside each lesson that say overlapping things (word 5-gram overlap), so repeated material can be merged.
import fs from 'node:fs';
const course = process.argv[2];
const only = process.argv[3] ? process.argv[3].split(',').map(Number) : null;
const D = JSON.parse(fs.readFileSync(`src/courses/${course}/data.json`, 'utf8'));
const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9x]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const toks = (s) => (s.toLowerCase().match(/[a-z0-9][a-z0-9'’-]*/g) || []);
const sh = (t, k = 5) => { const set = new Set(); for (let i = 0; i + k <= t.length; i++) set.add(t.slice(i, i + k).join(' ')); return set; };

for (const l of D.lessons) {
  if (only && !only.includes(l.n)) continue;
  // blocks: every top-level-ish unit: p, li (in lists), td rows, callouts, case-file rows
  const re = /<(p|li|tr|div class="cf-row[^"]*"|div class="t-callout[^"]*"|div class="t-unit[^"]*")\b[^>]*>([\s\S]*?)<\/(?:p|li|tr|div)>/g;
  const blocks = [];
  let m;
  while ((m = re.exec(l.html))) {
    const t = strip(m[2]);
    if (t.split(' ').length >= 14) blocks.push({ pos: m.index, text: t, sh: sh(toks(t)) });
  }
  const pairs = [];
  for (let i = 0; i < blocks.length; i++) for (let j = i + 1; j < blocks.length; j++) {
    const a = blocks[i], b = blocks[j];
    if (a.pos === b.pos) continue;
    let inter = 0; for (const x of a.sh) if (b.sh.has(x)) inter++;
    const mn = Math.min(a.sh.size, b.sh.size);
    if (mn >= 8 && inter >= 4 && inter / mn >= 0.18) pairs.push({ i, j, inter, r: +(inter / mn).toFixed(2) });
  }
  console.log(`CH ${l.n} ${l.title}: ${blocks.length} blocks, ${pairs.length} overlapping pairs`);
  if (only) pairs.sort((x, y) => y.r - x.r).slice(0, 12).forEach((p) => console.log(`  [${p.r}] A: ${blocks[p.i].text.slice(0, 120)}\n        B: ${blocks[p.j].text.slice(0, 120)}`));
}
