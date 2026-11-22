// One-off: legacy course CSS applies :hover styles on touch devices too (sticky hover after a tap).
// Wrap every rule that has a :hover selector in @media (hover:hover) so hover is only a mouse affordance; tap/click behaviour is unchanged.
import fs from 'node:fs';
import postcss from 'postcss';
for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/style.css`;
  const root = postcss.parse(fs.readFileSync(f, 'utf8'));
  let n = 0;
  root.walkRules((r) => {
    if (!r.selector.includes(':hover')) return;
    for (let p = r.parent; p && p.type !== 'root'; p = p.parent) {
      if (p.type === 'atrule' && p.name === 'media' && /hover\s*:\s*hover/.test(p.params)) return;
      if (p.type === 'atrule' && p.name === 'keyframes') return;
    }
    const w = postcss.atRule({ name: 'media', params: '(hover:hover)' });
    r.replaceWith(w);
    w.append(r);
    n++;
  });
  fs.writeFileSync(f, root.toString());
  console.log(id, 'wrapped', n);
}
