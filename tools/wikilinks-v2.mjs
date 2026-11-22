// One-off: wiki-link v2 — main topics only (a term must be referenced from several other sections), a link in every section that mentions it,
// a sticky "Back" bar with a return stack, instant jump after the page transition, no CSS smooth-scroll fighting the animations.
import fs from 'node:fs';

const CODE = String.raw`  // ---------- wiki-style cross-links (v2: main topics, one link per topic per section)
  var WL=null,WLRE=null,WLMAP=null,WLTIP=null;
  function wlNorm(s){return s.toLowerCase().replace(/[\s\u00a0\u2010-\u2015-]+/g,' ').replace(/[\u2019]/g,"'").trim()}
  function wlRx(a){return a.replace(/[.*+?^$()|[\]\\{}]/g,'\\$&').replace(/[\s\u00a0\u2010-\u2015-]+/g,'[\\s\\u00a0\\u2010-\\u2015-]+').replace(/['\u2019]/g,"['\\u2019]")+(/[A-Za-z]$/.test(a)?'s?':'')}
  function wlBuild(){if(WL)return;buildIdx();
   const secs=IDX.filter(e=>!e.term&&e.id);
   const STOPW=new Set(['algorithm','constant','linear','state','contract','merge','root','leaf','height','cycle','frontier','solve','discover','activity','actor','heuristic','reduction','push','process','context','design','model','function','experience','scenario','customer','interval','ratio','nominal','ordinal']);
   const T=[],cand=[];
   D.cards.forEach(c=>{const m=/(\d+)(?:\.(\d+))?/.exec(c.f||'');let n=m?+m[1]:0;if(!n)return;let id=m[2]&&secs.some(e=>e.id==='s'+n+'-'+m[2])?'s'+n+'-'+m[2]:'';
    if(c.t==='Gestalt principles'&&secs.some(e=>e.id==='s11-5')){n=11;id='s11-5'}
    const raw=c.t.replace(/<[^>]+>/g,'').trim();const ti=T.length;T.push({t:c.t,d:c.d,f:c.f,n,id});
    const add=a=>{a=a.trim();if(a.length>=4&&!(a.split(/\s+/).length==1&&STOPW.has(a.toLowerCase().replace(/s$/,''))))cand.push({a,ti})};
    const parts=raw.split(/\s+(?:\/|vs\.?)\s+/);
    parts.forEach(p=>{if(/\((preview|extra|variants)\)/.test(p))return;const q=p.replace(/\s*\([^)]*\)\s*/g,' ').trim();if(parts.length>1&&q.split(/\s+/).length==1&&q.length<12)return;add(p);if(q!==p)add(q);const ac=p.match(/\(([A-Z][A-Z0-9]{1,7})\)/);if(ac)cand.push({a:ac[1],ti})});
    if(/Fitt/.test(raw))add("Fitts's Law");
    if(raw==='Gestalt principles')add('Gestalt')});
   secs.forEach(e=>{let t=e.title.replace(/^[\d.]+\s*/,'').replace(/^(the|a|an)\s+/i,'').replace(/\s*[?:—–(].*$/,'').trim();const w=t.split(/\s+/).length;if(w<1||w>4||t.length<6)return;
    const ti=T.length;T.push({t:t,d:e.text.slice(0,170).replace(/\s+\S*$/,'')+'…',f:'§'+e.id.slice(1).replace('-','.'),n:e.n,id:e.id});cand.push({a:t,ti})});
   // keep only main topics: the term must be referenced from at least 3 other sections
   const MINREF=3;const seenA=new Map();const keep=[];
   cand.forEach(x=>{const k=wlNorm(x.a);if(seenA.has(k))return;seenA.set(k,1);
    const re=new RegExp("(?<![\\w\u2019'-])"+wlRx(x.a)+"(?![\\w-])",'i');const h=T[x.ti];
    let cnt=0;for(const e of secs){if(e.id===h.id||(!h.id&&e.n==h.n))continue;if(re.test(e.text)&&++cnt>=MINREF)break}
    if(cnt>=MINREF)keep.push(x)});
   WL=T;WLMAP={};keep.forEach(x=>{WLMAP[wlNorm(x.a)]=x.ti});
   keep.sort((a,b)=>b.a.length-a.a.length);
   WLRE=keep.length?new RegExp("(?<![\\w\u2019'-])("+keep.map(x=>wlRx(x.a)).join('|')+")(?![\\w-])",'gi'):null}
  function wlLookup(t){const k=wlNorm(t);if(k in WLMAP)return WLMAP[k];const k2=k.replace(/s$/,'');return k2 in WLMAP?WLMAP[k2]:-1}
  function autolink(c,n){wlBuild();if(!WLRE)return;const seen=new Map();
   const SKIP='a,button,h1,h2,h3,h4,h5,h6,.t-h1,.t-h2,.t-h3,.t-num,.gt,th,summary,pre,code,svg,.mermaid,.fcards,.fcard,.demo,.demo-slot,input,select,textarea,label,script,style,.backbar,.t-nav-footer,.endrow,.toc,.chip,.meta,.t-tag,.t-subtitle';
   const w=document.createTreeWalker(c,NodeFilter.SHOW_TEXT,{acceptNode:t=>{if(!t.nodeValue.trim())return NodeFilter.FILTER_REJECT;const p=t.parentElement;return p&&!p.closest(SKIP)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
   const nodes=[];while(w.nextNode())nodes.push(w.currentNode);
   nodes.forEach(t=>{const txt=t.nodeValue;WLRE.lastIndex=0;let m,last=0,frag=null;
    while((m=WLRE.exec(txt))){const ti=wlLookup(m[0]);if(ti<0)continue;const it=WL[ti];
     const secEl=t.parentElement.closest('.t-section,.case-file')||c;const sid=(t.parentElement.closest('.t-section[id]')||{}).id||'';
     if(it.n==n&&(!it.id||it.id==sid))continue; // the section that defines it
     let s=seen.get(secEl);if(!s){s=new Set();seen.set(secEl,s)}if(s.has(ti)||s.size>=6)continue;s.add(ti);
     frag=frag||document.createDocumentFragment();
     if(m.index>last)frag.appendChild(document.createTextNode(txt.slice(last,m.index)));
     const a=document.createElement('a');a.className='wl';a.href='#'+(it.id||'ch'+it.n);a.dataset.ci=ti;a.dataset.n=it.n;a.dataset.id=it.id;a.textContent=m[0];frag.appendChild(a);last=m.index+m[0].length}
    if(frag){if(last<txt.length)frag.appendChild(document.createTextNode(txt.slice(last)));t.parentNode.replaceChild(frag,t)}})}
  function wlHide(){if(WLTIP){WLTIP.remove();WLTIP=null}}
  function wlShow(a){wlHide();const c=WL&&WL[+a.dataset.ci];if(!c)return;const l=D.lessons.find(x=>x.n==+a.dataset.n);
   const d=document.createElement('div');d.className='wl-tip';d.setAttribute('role','tooltip');d.innerHTML='<b>'+c.t+'</b><div>'+c.d+'</div><small>'+(c.f||'')+' · '+(l?l.title:'')+'</small>';
   document.body.appendChild(d);const r=a.getBoundingClientRect(),h=d.offsetHeight,wd=d.offsetWidth;
   d.style.left=Math.max(8,Math.min(r.left,innerWidth-wd-8))+'px';d.style.top=(r.bottom+h+12>innerHeight&&r.top>h+12?r.top-h-8:r.bottom+6)+'px';WLTIP=d}
  function wlBar(b){const c=$('#theory-content');let bar=c.querySelector(':scope>.backbar');
   if(!b){if(bar){const h=bar.offsetHeight+12;bar.remove();c.scrollTop=Math.max(0,c.scrollTop-h)}return}
   if(bar){bar.textContent='↩ '+b.label}else{bar=document.createElement('button');bar.className='backbar';bar.textContent='↩ '+b.label;bar.onclick=()=>goBack();c.insertBefore(bar,c.firstChild);c.scrollTop+=bar.offsetHeight+12}}
  function wlGo(a){const n=+a.dataset.n,id=a.dataset.id,c=$('#theory-content'),l=D.lessons.find(x=>x.n==cur);
   const back={tab:'theory',sel:cur,y:c.scrollTop,label:'Back to '+(l?l.title:'the previous page'),up:BACK};
   if(n==cur){BACK=back;wlBar(back);if(id)scrollToId(id);else c.scrollTo({top:0,behavior:'smooth'})}
   else{loadTheory(n,{back:back,focus:false});if(id)scrollToId(id,true)}}
  __undo.push(wlHide);
  __L(document,'mouseover',e=>{if(!matchMedia('(hover:hover)').matches)return;const a=e.target.closest&&e.target.closest('a.wl');if(a)wlShow(a);else if(WLTIP&&!(e.target.closest&&e.target.closest('.wl-tip')))wlHide()});
  __L(document,'focusin',e=>{const a=e.target.closest&&e.target.closest('a.wl');if(a&&matchMedia('(hover:hover)').matches)wlShow(a)});
  __L(document,'focusout',e=>{if(e.target.closest&&e.target.closest('a.wl'))wlHide()});
  __L(document,'scroll',wlHide,true);
  __L(document,'keydown',e=>{if(e.key==='Escape')wlHide()});
  __L(document,'click',e=>{const a=e.target.closest&&e.target.closest('a.wl');if(!a)return;e.preventDefault();wlHide();wlGo(a)});
`;

const GOBACK_OLD = /if\(b\.tab=='theory'\)\{[^}]*\}[^}]*return\}/;
const GOBACK_NEW = "if(b.tab=='theory'){const c=$('#theory-content');if(+b.sel==cur){BACK=b.up||null;wlBar(BACK);c.scrollTo({top:b.y,behavior:'smooth'})}else{loadTheory(+b.sel,{back:b.up||undefined,focus:false});$('#theory-content').scrollTop=b.y}return}";

const CSS = `
/* ---- wiki links v2: the back bar stays on screen, and CSS smooth-scroll must not fight page transitions ---- */
.theory-content{scroll-behavior:auto!important}
.theory-content>.backbar{position:sticky!important;top:0;z-index:40;box-shadow:0 6px 16px rgba(0,0,0,.32)}
`;

for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  const a = s.indexOf('  // ---------- wiki-style cross-links');
  const b = s.indexOf('// expose bindings');
  if (a < 0 || b < 0) throw new Error(id + ' markers');
  s = s.slice(0, a) + CODE + '\n  ' + s.slice(b);
  if (!GOBACK_OLD.test(s)) throw new Error(id + ' goBack old');
  s = s.replace(GOBACK_OLD, () => GOBACK_NEW);
  const sc = "function scrollToId(id){";
  if (!s.includes(sc)) throw new Error(id + ' scrollToId');
  s = s.replace(sc, () => 'function scrollToId(id,inst){');
  const sb = "behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'";
  if (!s.includes(sb)) throw new Error(id + ' behavior');
  s = s.replace(sb, () => "behavior:(inst||matchMedia('(prefers-reduced-motion:reduce)').matches)?'instant':'smooth'");
  fs.writeFileSync(f, s);
  fs.appendFileSync(`src/courses/${id}/style.css`, CSS);
  console.log(id, 'ok');
}
