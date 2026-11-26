import fs from 'node:fs';
for (const f of ['src/guide/Practice.tsx', 'src/guide/Mixed.tsx']) {
  let s = fs.readFileSync(f, 'utf8');
  const a = "'Strong. Move on to the next {(g.meta.unit || 'chapter').toLowerCase()}. 🎉'";
  const b = "`Strong. Move on to the next ${(g.meta.unit || 'chapter').toLowerCase()}. 🎉`";
  if (!s.includes(a)) { console.log('missing in', f); continue; }
  fs.writeFileSync(f, s.replace(a, b));
}
