// The search index / wiki-link targets skipped every section that contained a case card. Case cards now live inside normal sections,
// so only the end-of-chapter "Real-life case files" list is skipped.
import fs from 'node:fs';
const from = "if(s.querySelector('.case-file'))return;";
const to = "if(s.classList.contains('t-section')&&/Real-life case files/.test((s.querySelector('.t-h2')||{}).textContent||''))return;";
for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  if (!s.includes(from)) throw new Error(id + ' missing');
  s = s.replace(from, () => to);
  fs.writeFileSync(f, s);
  console.log(id, 'ok');
}
