// One-off: group the practice-tab chapter quizzes under the exam sections (A / B / C / other) instead of one flat chapter list.
import fs from 'node:fs';
const f = 'src/courses/idp/engine.js';
let s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  if (!s.includes(a)) throw new Error('missing: ' + a.slice(0, 80));
  s = s.replace(a, () => b);
}
rep("const hd=s=>`<div class=\"theory-nav-header\">${s}</div>`;",
"const hd=s=>`<div class=\"theory-nav-header\">${s}</div>`;\n/* practice tab: chapter quizzes grouped by exam section */\nconst PQG=[['Section A · Empathy to evaluating designs',[2,3,4,5,13]],['Section B · Models, cognition, input and interface design',[6,7,8,9,10,11,16]],['Section C · Evaluation methods, experiments and analysis',[12,14,15,17,18,19]],['Introduction, presenting and review',[1,20,21,22,23]]];\nconst pqList=fn=>PQG.map(g=>`<div class=\"theory-group\"><div class=\"theory-group-title static\">${g[0]}</div>`+g[1].map(n=>fn(D.lessons.find(x=>x.n==n))).join('')+'</div>').join('');");
rep("mCount()?`<span class=\"tq sc lo\">${mCount()}</span>`:'')+chapList(l=>{const s=S[l.n];return navItem(l.icon,l.n,l.title,pqSel==l.n", "mCount()?`<span class=\"tq sc lo\">${mCount()}</span>`:'')+pqList(l=>{const s=S[l.n];return navItem(l.icon,l.n,l.title,pqSel==l.n");
rep("D.lessons.forEach(l=>{const s=S[l.n];h+=`<button class=\"pq-item", "PQG.forEach(g=>{h+=`<div class=\"pq-head\">${g[0].toUpperCase()}</div>`;g[1].map(n=>D.lessons.find(x=>x.n==n)).forEach(l=>{const s=S[l.n];h+=`<button class=\"pq-item");
rep("${s?`<span class=\"sc ${sc(s)}\">${s.s}/${s.t}</span>`:''}</button>`});\n h+=`<button class=\"pq-item ${sel=='sc'", "${s?`<span class=\"sc ${sc(s)}\">${s.s}/${s.t}</span>`:''}</button>`})});\n h+=`<button class=\"pq-item ${sel=='sc'");
fs.writeFileSync(f, s);
console.log('ok');
