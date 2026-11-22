// One-off: never inject a link into text whose parent is a flex/grid container (the link would become a separate flex item with a gap around it).
import fs from 'node:fs';
const edits = [
  // autoref
  ["const id=sub&&ids.has('s'+cn+'-'+sub)?'s'+cn+'-'+sub:'';",
   "if(/flex|grid/.test(getComputedStyle(t.parentElement).display))continue;const id=sub&&ids.has('s'+cn+'-'+sub)?'s'+cn+'-'+sub:'';"],
  // autolink
  ["const it=WL[ti];", "const it=WL[ti];if(/flex|grid/.test(getComputedStyle(t.parentElement).display))continue;"],
];
for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  for (const [a, b] of edits) {
    if (!s.includes(a)) throw new Error(id + ': ' + a.slice(0, 50));
    s = s.replace(a, () => b);
  }
  fs.writeFileSync(f, s);
  console.log(id, 'ok');
}
