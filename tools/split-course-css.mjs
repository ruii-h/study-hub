// One-off: moves the CSS that the course stylesheets share into src/course/guide-base.css and leaves each course only its own rules.
import fs from 'fs'; import postcss from 'postcss';
const ids = ['wad2', 'idp', 'algo', 'bpas', 'cf', 'ctp'];
const norm = (n) => n.toString().replace(/\s+/g, ' ').trim();
const parsed = {}; const count = new Map();
for (const id of ids) {
  const root = postcss.parse(fs.readFileSync(`tools/_bak/${id}.css`, 'utf8'));
  parsed[id] = root.nodes.filter((n) => n.type !== 'comment').map((n) => ({ k: norm(n), css: n.toString() }));
  for (const k of new Set(parsed[id].map((x) => x.k))) count.set(k, (count.get(k) || 0) + 1);
}
const TH = 4; const base = []; const inBase = new Set();
for (const id of ids) for (const n of parsed[id]) if (count.get(n.k) >= TH && !inBase.has(n.k)) { inBase.add(n.k); base.push(n.css); }
fs.writeFileSync('src/course/guide-base.css', '/* Shared by every course guide (rules that at least four of the six course stylesheets had in common). Fix shared layout, spacing and overflow HERE, never in one course file. */\n' + base.join('\n') + '\n');
for (const id of ids) {
  const seen = new Set(); const res = parsed[id].filter((n) => !inBase.has(n.k) && !seen.has(n.k) && seen.add(n.k));
  fs.writeFileSync(`src/courses/${id}/style.css`, `/* ${id}: only what is specific to this course. Shared rules live in src/course/guide-base.css. */\n` + res.map((n) => n.css).join('\n') + '\n');
  console.log(id, 'residual nodes', res.length, 'of', parsed[id].length);
}
console.log('base nodes', base.length, 'bytes', fs.statSync('src/course/guide-base.css').size);
