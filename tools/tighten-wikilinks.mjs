// One-off: reduce false-positive wiki links (generic single words split out of "A / B / C" glossary titles, preview cards, wrong acronyms).
import fs from 'node:fs';
const edits = [
  ["const n=m?+m[1]:0;if(!n)return;const id=m[2]&&secs['s'+n+'-'+m[2]]?'s'+n+'-'+m[2]:'';",
   "let n=m?+m[1]:0;if(!n)return;let id=m[2]&&secs['s'+n+'-'+m[2]]?'s'+n+'-'+m[2]:'';if(c.t==='Gestalt principles'&&secs['s11-5']){n=11;id='s11-5'}"],
  ["parts.forEach(p=>{add(p,parts.length>2&&p.split(/\\s+/).length==1?7:4);",
   "if(!/\\((preview|extra|variants)\\)/.test(raw))parts.forEach(p=>{if(parts.length>1&&p.split(/\\s+/).length==1&&p.length<12)return;add(p);"],
  ["const ac=p.match(/\\(([A-Z][A-Za-z0-9]{1,7})\\)/);", "const ac=p.match(/\\(([A-Z][A-Z0-9]{1,7})\\)/);"],
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
