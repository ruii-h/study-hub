// One-off: preview cards quote the section's first paragraph (not a demo caption) and never show a raw "§n.m".
import fs from 'node:fs';
const edits = [
  ["IDX.push({n:l.n,ch:l.title,id:s.id||'',title:(nm?nm.textContent+' ':'')+title,text})",
   "IDX.push({n:l.n,ch:l.title,id:s.id||'',title:(nm?nm.textContent+' ':'')+title,text,lead:((s.querySelector(':scope>p')||{}).textContent||'').replace(/\\s+/g,' ').trim()})"],
  ["return {n,id,title,chapter:wlChap(l),excerpt:body.slice(0,170).replace(/\\s+\\S*$/,'')+'…'}}",
   "const src=sec.lead&&sec.lead.length>50?sec.lead:body;const clean=src.replace(/§\\s?(\\d+)(?:\\.(\\d+))?/g,(m,a,b)=>{const q=IDX.find(e=>!e.term&&e.id===(b?'s'+a+'-'+b:''));const ll=D.lessons.find(x=>x.n==+a);return q?q.title.replace(/^[^A-Za-z]+/,'').replace(/\\s*[(:—–?].*$/,''):(ll?wlChap(ll):'')});\n   return {n,id,title,chapter:wlChap(l),excerpt:clean.slice(0,170).replace(/\\s+\\S*$/,'')+'…'}}"],
];
for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  for (const [a, b] of edits) {
    if (!s.includes(a)) throw new Error(id + ': ' + a.slice(0, 60));
    s = s.replace(a, () => b);
  }
  fs.writeFileSync(f, s);
  console.log(id, 'ok');
}
