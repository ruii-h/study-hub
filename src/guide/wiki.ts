// @ts-nocheck
// Wiki-style cross-links, section index and tooltip, ported unchanged from the original guide engine.
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export function makeWiki(D) {
const STOP=new Set('the a an and or of to in is are was were be been it its that this these those for on with as by at from not no do does did can could should would will which what who how why when where than then so if but into out up down over under more most such only same too very just also may might must have has had their there they them he she his her we you your our i me my one two all any each few other some both either neither true false statement because'.split(' '));
let SECIDF=null;
const secTok=s=>(String(s).toLowerCase().match(/[a-z][a-z0-9'-]{2,}/g)||[]).filter(w=>!STOP.has(w));
function bestSection(n,text){buildIdx();const secs=IDX.filter(e=>!e.term&&e.id);
 if(!SECIDF){SECIDF={};secs.forEach(e=>{e._t=secTok(e.text);e._f={};e._t.forEach(w=>e._f[w]=(e._f[w]||0)+1);Object.keys(e._f).forEach(w=>SECIDF[w]=(SECIDF[w]||0)+1)});SECIDF._N=secs.length}
 const q=new Set(secTok(text));let best=null,bs=0;
 secs.filter(e=>e.n==n).forEach(e=>{let s=0;q.forEach(w=>{if(e._f[w])s+=(1+Math.log(e._f[w]))*Math.log(SECIDF._N/(SECIDF[w]||1))});s/=Math.sqrt(e._t.length+60);if(s>bs){bs=s;best=e}});return best}
let IDX=null;
function buildIdx(){if(IDX)return;IDX=[];const t=document.createElement('div');
 const clean=h=>h.replace(/<\/(div|p|li|td|th|h\d|span|b|strong)>/g,'$& ');
 D.lessons.forEach(l=>{t.innerHTML=clean(l.html);t.querySelectorAll('.t-section,.case-file').forEach(s=>{if(s.classList.contains('t-section')&&/Real-life case files/.test((s.querySelector('.t-h2')||{}).textContent||''))return;
  const h=s.querySelector('.t-h2,h3,.gt');const nm=s.querySelector('.t-num');let title=(h?h.textContent:'').replace(/\s+/g,' ').trim();if(nm)title=title.replace(nm.textContent,'').trim();
  const text=s.textContent.replace(/\s+/g,' ').trim();if(!title)title='Overview';
  IDX.push({n:l.n,ch:l.title,id:s.id||'',title:(nm?nm.textContent+' ':'')+title,text,lead:((s.querySelector(':scope>p')||{}).textContent||'').replace(/\s+/g,' ').trim()})})});
 D.cards.forEach(c=>{const m=/(\d+)\./.exec(c.f);IDX.push({n:m?+m[1]:1,ch:'Key term',id:'',title:c.t,text:c.d,term:1})})}
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
    parts.forEach(p=>{if(/\((preview|extra|variants)\)/.test(p))return;const q=p.replace(/\s*\([^)]*\)\s*/g,' ').trim();if(parts.length>1&&q.split(/\s+/).length==1&&q.length<12)return;add(p);if(q!==p&&q.split(/\s+/).length>1)add(q);const ac=p.match(/\(([A-Z][A-Z0-9]{1,7})\)/);if(ac)cand.push({a:ac[1],ti})});
    if(/Fitt/.test(raw))add("Fitts's Law");
    const AL={'gestalt principles':['Gestalt'],'design thinking cycle':['Design Thinking'],"nielsen's 10 heuristics":["Nielsen's heuristics",'usability heuristics'],'model human processor (mhp)':['Model Human Processor'],'a/b testing vs. multivariate testing':['A/B test','A/B tests','multivariate testing']};(AL[raw.toLowerCase()]||[]).forEach(add)});
   secs.forEach(e=>{let t=e.title.replace(/^[^A-Za-z]+/,'').replace(/^(the|a|an)\s+/i,'').replace(/\s*[?:—–(].*$/,'').trim();const w=t.split(/\s+/).length;if(w<2||w>4||t.length<8||/^(worked|step|summary|overview|roadmap|key|extra|additional|example|case|common|why|how)\b/i.test(t))return;
    const ti=T.length;T.push({t:t,d:e.text.slice(0,170).replace(/\s+\S*$/,'')+'…',f:'§'+e.id.slice(1).replace('-','.'),n:e.n,id:e.id});cand.push({a:t,ti})});
   // keep only main topics: any spelling of the topic must be referenced from at least 2 other sections; then every spelling is kept
   const MINREF=2;const seenA=new Map(),byT=new Map(),keep=[];
   cand.forEach(x=>{const k=wlNorm(x.a);if(seenA.has(k))return;seenA.set(k,1);if(!byT.has(x.ti))byT.set(x.ti,[]);byT.get(x.ti).push(x)});
   byT.forEach((list,ti)=>{const h=T[ti];const res=list.map(x=>new RegExp("(?<![\\w’'-])"+wlRx(x.a)+"(?![\\w-])",'i'));let cnt=0;
    for(const e of secs){if(e.id===h.id||(!h.id&&e.n==h.n))continue;if(res.some(re=>re.test(e.text))&&++cnt>=MINREF)break}
    if(cnt>=MINREF)keep.push(...list)});
   WL=T;WLMAP={};keep.forEach(x=>{WLMAP[wlNorm(x.a)]=x.ti});
   keep.sort((a,b)=>b.a.length-a.a.length);
   WLRE=keep.length?new RegExp("(?<![\\w\u2019'-])("+keep.map(x=>wlRx(x.a)).join('|')+")(?![\\w-])",'gi'):null}
  function wlLookup(t){const k=wlNorm(t);if(k in WLMAP)return WLMAP[k];const k2=k.replace(/s$/,'');return k2 in WLMAP?WLMAP[k2]:-1}
  function wlChap(l){return l.title.replace(/\s*\(.*$/,'').trim()}
  function wlRefInfo(f){buildIdx();const m=/(\d+)(?:\.(\d+))?/.exec(f||'');if(!m)return null;const n=+m[1];const l=D.lessons.find(x=>x.n==n);if(!l)return null;
   const id=m[2]?'s'+n+'-'+m[2]:'';const sec=id?IDX.find(e=>!e.term&&e.id===id):null;
   if(!sec)return {n,id:'',title:wlChap(l),chapter:wlChap(l),excerpt:(l.goal||'').replace(/<[^>]+>/g,'')};
   const title=sec.title.replace(/^[^A-Za-z]+/,'').replace(/\s*[(:—–?].*$/,'').trim()||wlChap(l);
   const body=sec.text.replace(/^\s*[\d.]+\s*/,'').slice(sec.title.replace(/^[\d.]+\s*/,'').length).replace(/^[\s:—–-]+/,'');
   const src=sec.lead&&sec.lead.length>50?sec.lead:body;const clean=src.replace(/§\s?(\d+)(?:\.(\d+))?/g,(m,a,b)=>{const q=IDX.find(e=>!e.term&&e.id===(b?'s'+a+'-'+b:''));const ll=D.lessons.find(x=>x.n==+a);return q?q.title.replace(/^[^A-Za-z]+/,'').replace(/\s*[(:—–?].*$/,''):(ll?wlChap(ll):'')});
   return {n,id,title,chapter:wlChap(l),excerpt:clean.slice(0,170).replace(/\s+\S*$/,'')+'…'}}
  function wlAnchor(info,text){const a=document.createElement('a');a.className='wl wl-ref';a.href='#'+(info.id||'ch'+info.n);a.dataset.n=info.n;a.dataset.id=info.id;a.textContent=text;return a}
  function wlRefHTML(f){const i=wlRefInfo(f);if(!i)return esc(f||'');return '<a class="wl wl-ref" href="#'+(i.id||'ch'+i.n)+'" data-n="'+i.n+'" data-id="'+i.id+'">'+esc(i.title)+'</a>'}
  function wlRefLabel(f){const i=wlRefInfo(f);return i?i.title:(f||'')}
  function autoref(c,n){buildIdx();
   const RE=/(\(\s*)?(?:§\s?(\d+)(?:\.(\d+))?|\b(?:Chapter|Lecture)\s+(\d+)\b)(\s*\))?/g;
   const SKIP='a,button,h1,h2,h3,h4,h5,h6,.t-h1,.t-h2,.t-h3,.t-num,.gt,th,summary,pre,code,svg,.mermaid,.demo,.demo-slot,input,select,textarea,label,script,style,.backbar,.t-nav-footer,.endrow,.toc,.chip,.meta,.t-tag,.t-subtitle';
   const w=document.createTreeWalker(c,NodeFilter.SHOW_TEXT,{acceptNode:t=>{if(!/§|Chapter|Lecture/.test(t.nodeValue))return NodeFilter.FILTER_REJECT;const p=t.parentElement;return p&&!p.closest(SKIP)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
   const nodes=[];while(w.nextNode())nodes.push(w.currentNode);
   nodes.forEach(t=>{const txt=t.nodeValue;RE.lastIndex=0;let m,last=0,frag=null;
    while((m=RE.exec(txt))){const open=m[1],cn=+(m[2]||m[4]),sub=m[3],close=m[5];
     const info=wlRefInfo(sub?cn+'.'+sub:''+cn);if(!info)continue;
          const sid=(t.parentElement.closest('.t-section[id]')||{}).id||'';
     const plain=(info.n==n&&(!info.id||info.id==sid))||/flex|grid/.test(getComputedStyle(t.parentElement).display);const mk=(i,tx)=>plain?document.createTextNode(tx):wlAnchor(i,tx);
     frag=frag||document.createDocumentFragment();
     let before=txt.slice(last,m.index),end=m.index+m[0].length;
     // a following range such as "§7.3–7.4": link the second title too
     let second=null;const rg=/^\s*[–-]\s*(?:(\d+)\.)?(\d+)/.exec(txt.slice(end));
     if(rg&&!open){const i2=wlRefInfo(rg[1]?rg[1]+'.'+rg[2]:(sub?cn+'.'+rg[2]:''+rg[2]));if(i2){second=i2;end+=rg[0].length}}
     if(open&&close&&!second){
       // "Visual Design (§11)": the words in front already name the target, so link them and drop the number
       const tl=info.title.toLowerCase(),bl=before.toLowerCase().replace(/\s+$/,'');
       if(bl.endsWith(tl)){const cut=bl.length-tl.length;const ws=before.length-bl.length;
         if(cut>0)frag.appendChild(document.createTextNode(before.slice(0,cut)));
         frag.appendChild(mk(info,before.slice(cut,before.length-ws)));
         last=end;RE.lastIndex=end;continue}
       if(before)frag.appendChild(document.createTextNode(before));
       frag.appendChild(document.createTextNode('('));frag.appendChild(mk(info,info.title));frag.appendChild(document.createTextNode(')'));
       last=end;RE.lastIndex=end;continue}
     if(before)frag.appendChild(document.createTextNode(before));
     if(open)frag.appendChild(document.createTextNode(open));
     frag.appendChild(mk(info,info.title));
     if(second){frag.appendChild(document.createTextNode(' and '));frag.appendChild(mk(second,second.title))}
     if(close)frag.appendChild(document.createTextNode(close));
     last=end;RE.lastIndex=end}
    if(frag){if(last<txt.length)frag.appendChild(document.createTextNode(txt.slice(last)));t.parentNode.replaceChild(frag,t)}})}
    /* cards that would leave an empty grid cell next to them stretch to fill the row */
  function fillRows(root){const cont=root||$('#theory-content');if(!cont)return;
   cont.querySelectorAll('.t-section,.teach,.fcards,.fc-grid').forEach(s=>{const kids=[...s.children].filter(k=>k.offsetHeight>0&&getComputedStyle(k).position!=='absolute');
    kids.forEach(k=>k.style.removeProperty('grid-column'));
    const tpl=getComputedStyle(s).gridTemplateColumns;if(!tpl||tpl==='none')return;const cols=tpl.split(' ').length;if(cols<2)return;
    const colW=parseFloat(tpl.split(' ')[0]),gap=parseFloat(getComputedStyle(s).columnGap)||0;
    const rows=new Map();kids.forEach(k=>{const key=k.offsetTop;if(!rows.has(key))rows.set(key,[]);rows.get(key).push(k)});
    rows.forEach(list=>{const spans=list.map(k=>Math.max(1,Math.round((k.offsetWidth+gap)/(colW+gap))));const used=spans.reduce((a,b)=>a+b,0);
     if(used<cols){const last=list[list.length-1];last.style.gridColumn='span '+(spans[spans.length-1]+cols-used)}})})}
  function autolink(c,n){wlBuild();autoref(c,n);if(!WLRE)return;const seen=new Map();
   const SKIP='a,button,h1,h2,h3,h4,h5,h6,.t-h1,.t-h2,.t-h3,.t-num,.gt,th,summary,pre,code,svg,.mermaid,.fcards,.fcard,.demo,.demo-slot,input,select,textarea,label,script,style,.backbar,.t-nav-footer,.endrow,.toc,.chip,.meta,.t-tag,.t-subtitle';
   const w=document.createTreeWalker(c,NodeFilter.SHOW_TEXT,{acceptNode:t=>{if(!t.nodeValue.trim())return NodeFilter.FILTER_REJECT;const p=t.parentElement;return p&&!p.closest(SKIP)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
   const nodes=[];while(w.nextNode())nodes.push(w.currentNode);
   nodes.forEach(t=>{const txt=t.nodeValue;WLRE.lastIndex=0;let m,last=0,frag=null;
    while((m=WLRE.exec(txt))){const ti=wlLookup(m[0]);if(ti<0)continue;const it=WL[ti];if(/flex|grid/.test(getComputedStyle(t.parentElement).display))continue;
     const secEl=t.parentElement.closest('.t-section,.case-file')||c;const sid=(t.parentElement.closest('.t-section[id]')||{}).id||'';
     if(it.n==n&&(!it.id||it.id==sid))continue; // the section that defines it
     let s=seen.get(secEl);if(!s){s=new Set();seen.set(secEl,s)}if(s.has(ti)||s.size>=6)continue;s.add(ti);
     frag=frag||document.createDocumentFragment();
     if(m.index>last)frag.appendChild(document.createTextNode(txt.slice(last,m.index)));
     const a=document.createElement('a');a.className='wl';a.href='#'+(it.id||'ch'+it.n);a.dataset.ci=ti;a.dataset.n=it.n;a.dataset.id=it.id;a.textContent=m[0];frag.appendChild(a);last=m.index+m[0].length}
    if(frag){if(last<txt.length)frag.appendChild(document.createTextNode(txt.slice(last)));t.parentNode.replaceChild(frag,t)}})}
  function wlHide(){if(WLTIP){WLTIP.remove();WLTIP=null}}
  function wlShow(a){wlHide();let t,dd,sm;const l=D.lessons.find(x=>x.n==+a.dataset.n);
   const c=a.dataset.ci!==undefined&&WL?WL[+a.dataset.ci]:null;
   if(c){const i=wlRefInfo(c.id?c.id.slice(1).replace('-','.'):''+c.n);t=c.t;dd=c.d;sm=(i&&i.id?i.title+' · ':'')+(l?wlChap(l):'')}
   else{const i=wlRefInfo(a.dataset.id?a.dataset.id.slice(1).replace('-','.'):''+a.dataset.n);if(!i)return;t=i.title;dd=i.excerpt;sm=i.id?i.chapter:''}
   const d=document.createElement('div');d.className='wl-tip';d.setAttribute('role','tooltip');d.innerHTML='<b>'+t+'</b>'+(dd?'<div>'+dd+'</div>':'')+(sm?'<small>'+sm+'</small>':'');
   document.body.appendChild(d);const r=a.getBoundingClientRect(),h=d.offsetHeight,wd=d.offsetWidth;
   d.style.left=Math.max(8,Math.min(r.left,innerWidth-wd-8))+'px';d.style.top=(r.bottom+h+12>innerHeight&&r.top>h+12?r.top-h-8:r.bottom+6)+'px';WLTIP=d}
  return { buildIdx, getIdx: () => IDX, bestSection, autolink, fillRows, wlRefLabel, wlRefHTML, wlRefInfo, wlChap, wlHide, wlShow };
}
