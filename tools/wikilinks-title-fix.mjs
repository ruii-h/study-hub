// One-off: section titles may start with an emoji or number; strip anything before the first letter before the "generic title" filter runs.
import fs from 'node:fs';
const from = "let t=e.title.replace(/^[\\d.]+\\s*/,'')";
const to = "let t=e.title.replace(/^[^A-Za-z]+/,'')";
for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  if (!s.includes(from)) throw new Error(id + ' missing');
  s = s.replace(from, () => to);
  fs.writeFileSync(f, s);
  console.log(id, 'ok');
}
