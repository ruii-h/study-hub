// One-off: wiki links v3
//  - a topic is "main" if ANY of its spellings is referenced from >= 2 other sections, and then all its spellings are linked (so "Gestalt principles" links as a whole)
//  - plain-text references such as "§6.4", "Chapter 18" and "Lecture 3" become links too
//  - ALGO's older §-links use the same jump + Back bar
//  - larger tap area for links on touch screens
import fs from 'node:fs';

const KEEP = String.raw`// keep only main topics: any spelling of the topic must be referenced from at least 2 other sections; then every spelling is kept
   const MINREF=2;const seenA=new Map(),byT=new Map(),keep=[];
   cand.forEach(x=>{const k=wlNorm(x.a);if(seenA.has(k))return;seenA.set(k,1);if(!byT.has(x.ti))byT.set(x.ti,[]);byT.get(x.ti).push(x)});
   byT.forEach((list,ti)=>{const h=T[ti];const res=list.map(x=>new RegExp("(?<![\\w’'-])"+wlRx(x.a)+"(?![\\w-])",'i'));let cnt=0;
    for(const e of secs){if(e.id===h.id||(!h.id&&e.n==h.n))continue;if(res.some(re=>re.test(e.text))&&++cnt>=MINREF)break}
    if(cnt>=MINREF)keep.push(...list)});
   `;

const REFS = String.raw`  function autoref(c,n){const ids=new Set(IDX.filter(e=>!e.term&&e.id).map(e=>e.id));
   const RE=/§\s?(\d+)(?:\.(\d+))?|\b(?:Chapter|Lecture)\s+(\d+)\b/g;
   const SKIP='a,button,h1,h2,h3,h4,h5,h6,.t-h1,.t-h2,.t-h3,.t-num,.gt,th,summary,pre,code,svg,.mermaid,.demo,.demo-slot,input,select,textarea,label,script,style,.backbar,.t-nav-footer,.endrow,.toc,.chip,.meta,.t-tag,.t-subtitle';
   const w=document.createTreeWalker(c,NodeFilter.SHOW_TEXT,{acceptNode:t=>{if(!/§|Chapter|Lecture/.test(t.nodeValue))return NodeFilter.FILTER_REJECT;const p=t.parentElement;return p&&!p.closest(SKIP)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
   const nodes=[];while(w.nextNode())nodes.push(w.currentNode);
   nodes.forEach(t=>{const txt=t.nodeValue;RE.lastIndex=0;let m,last=0,frag=null;
    while((m=RE.exec(txt))){const cn=+(m[1]||m[3]),sub=m[2];const l=D.lessons.find(x=>x.n==cn);if(!l)continue;
     const id=sub&&ids.has('s'+cn+'-'+sub)?'s'+cn+'-'+sub:'';
     const sid=(t.parentElement.closest('.t-section[id]')||{}).id||'';
     if(cn==n&&(!id||id==sid))continue;
     frag=frag||document.createDocumentFragment();
     if(m.index>last)frag.appendChild(document.createTextNode(txt.slice(last,m.index)));
     const a=document.createElement('a');a.className='wl wl-ref';a.href='#'+(id||'ch'+cn);a.dataset.n=cn;a.dataset.id=id;a.dataset.tt=l.title;a.dataset.f=m[1]?'§'+m[1]+(sub?'.'+sub:''):'Chapter '+cn;a.textContent=m[0];frag.appendChild(a);last=m.index+m[0].length}
    if(frag){if(last<txt.length)frag.appendChild(document.createTextNode(txt.slice(last)));t.parentNode.replaceChild(frag,t)}})}
`;

const SHOW_OLD_HEAD = "function wlShow(a){wlHide();const c=WL&&WL[+a.dataset.ci];if(!c)return;";
const SHOW_NEW_HEAD = "function wlShow(a){wlHide();const c=a.dataset.tt?{t:a.dataset.tt,d:'',f:a.dataset.f}:(WL&&WL[+a.dataset.ci]);if(!c)return;";

const CSS = `
/* ---- wiki links v3: bigger tap area on touch screens, §-references look like links ---- */
a.wl,a.xref{color:#6cb2ff;text-decoration:none}
html[data-theme=light] a.wl,html[data-theme=light] a.xref{color:#0645ad}
a.wl{position:relative}
a.wl::after{content:"";position:absolute;inset:-7px -3px}
@media(hover:hover){a.xref:hover{text-decoration:underline}a.wl::after{inset:0}}
`;

for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  const a = s.indexOf('// keep only main topics');
  const b = s.indexOf('WL=T;WLMAP={};');
  if (a < 0 || b < 0) throw new Error(id + ' keep markers');
  s = s.slice(0, a) + KEEP + s.slice(b);
  if (!s.includes(SHOW_OLD_HEAD)) throw new Error(id + ' wlShow');
  s = s.replace(SHOW_OLD_HEAD, () => SHOW_NEW_HEAD);
  // tooltip: skip the empty definition line for plain references
  s = s.replace("'<b>'+c.t+'</b><div>'+c.d+'</div><small>'", () => "'<b>'+c.t+'</b>'+(c.d?'<div>'+c.d+'</div>':'')+'<small>'");
  const af = '  function autolink(c,n){wlBuild();if(!WLRE)return;';
  if (!s.includes(af)) throw new Error(id + ' autolink');
  s = s.replace(af, () => REFS + '  function autolink(c,n){wlBuild();autoref(c,n);if(!WLRE)return;');
  if (id === 'algo') {
    const x = "const n=+a.dataset.n,id=a.dataset.id;if(n==cur){scrollToId(id)}else{loadTheory(n,{focus:false});setTimeout(()=>scrollToId(id),400)}});";
    if (!s.includes(x)) throw new Error('algo xref');
    s = s.replace(x, () => 'wlGo(a)});');
  }
  fs.writeFileSync(f, s);
  fs.appendFileSync(`src/courses/${id}/style.css`, CSS);
  console.log(id, 'ok');
}
