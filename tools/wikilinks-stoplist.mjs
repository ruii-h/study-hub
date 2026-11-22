// One-off: ordinary English words that are also glossary titles are not linked (too many false links).
import fs from 'node:fs';
const from = "const add=(a,min)=>{a=a.trim();if(a.length>=(min||4))al.add(a)};";
const to = "const STOPW=new Set(['algorithm','constant','linear','state','contract','merge','root','leaf','height','cycle','frontier','solve','discover','activity','actor','heuristic','reduction','push','process','context','design','model','function','experience']);const add=(a,min)=>{a=a.trim();if(a.length>=(min||4)&&!(a.split(/\\s+/).length==1&&STOPW.has(a.toLowerCase().replace(/s$/,''))))al.add(a)};";
for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  if (!s.includes(from)) throw new Error(id);
  s = s.replace(from, () => to);
  fs.writeFileSync(f, s);
  console.log(id, 'ok');
}
