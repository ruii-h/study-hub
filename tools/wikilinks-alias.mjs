// One-off: a few extra spellings for main topics so they are recognised in running text.
import fs from 'node:fs';
const from = "if(raw==='Gestalt principles')add('Gestalt')";
const to = "const AL={'gestalt principles':['Gestalt'],'design thinking cycle':['Design Thinking'],\"nielsen's 10 heuristics\":[\"Nielsen's heuristics\",'usability heuristics'],'model human processor (mhp)':['Model Human Processor'],'a/b testing vs. multivariate testing':['A/B test','A/B tests','multivariate testing']};(AL[raw.toLowerCase()]||[]).forEach(add)";
for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  if (!s.includes(from)) throw new Error(id + ' missing');
  s = s.replace(from, () => to);
  fs.writeFileSync(f, s);
  console.log(id, 'ok');
}
