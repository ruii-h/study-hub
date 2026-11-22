// One-off: a glossary title like "Process (How)" must not turn the everyday word "process" into a link; keep the stripped form only when it is a multi-word term.
import fs from 'node:fs';
const from = "if(q!==p)add(q);";
const to = "if(q!==p&&q.split(/\\s+/).length>1)add(q);";
for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  if (!s.includes(from)) throw new Error(id + ' missing');
  s = s.replace(from, () => to);
  fs.writeFileSync(f, s);
  console.log(id, 'ok');
}
