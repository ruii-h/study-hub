// One-off: Wikipedia-style references. "§11.5", "§11", "Chapter 18" and "X (§11)" are shown as the real title of the section/chapter, hyperlinked, never as a number.
import fs from 'node:fs';

const HELPERS = String.raw`  function wlChap(l){return l.title.replace(/\s*\(.*$/,'').trim()}
  function wlRefInfo(f){buildIdx();const m=/(\d+)(?:\.(\d+))?/.exec(f||'');if(!m)return null;const n=+m[1];const l=D.lessons.find(x=>x.n==n);if(!l)return null;
   const id=m[2]?'s'+n+'-'+m[2]:'';const sec=id?IDX.find(e=>!e.term&&e.id===id):null;
   if(!sec)return {n,id:'',title:wlChap(l),chapter:wlChap(l),excerpt:(l.goal||'').replace(/<[^>]+>/g,'')};
   const title=sec.title.replace(/^[^A-Za-z]+/,'').replace(/\s*[(:—–?].*$/,'').trim()||wlChap(l);
   const body=sec.text.replace(/^\s*[\d.]+\s*/,'').slice(sec.title.replace(/^[\d.]+\s*/,'').length).replace(/^[\s:—–-]+/,'');
   return {n,id,title,chapter:wlChap(l),excerpt:body.slice(0,170).replace(/\s+\S*$/,'')+'…'}}
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
     if(/flex|grid/.test(getComputedStyle(t.parentElement).display))continue;
     const sid=(t.parentElement.closest('.t-section[id]')||{}).id||'';
     if(info.n==n&&(!info.id||info.id==sid))continue;
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
         frag.appendChild(wlAnchor(info,before.slice(cut,before.length-ws)));
         last=end;RE.lastIndex=end;continue}
       if(before)frag.appendChild(document.createTextNode(before));
       frag.appendChild(document.createTextNode('('));frag.appendChild(wlAnchor(info,info.title));frag.appendChild(document.createTextNode(')'));
       last=end;RE.lastIndex=end;continue}
     if(before)frag.appendChild(document.createTextNode(before));
     if(open)frag.appendChild(document.createTextNode(open));
     frag.appendChild(wlAnchor(info,info.title));
     if(second){frag.appendChild(document.createTextNode(' and '));frag.appendChild(wlAnchor(second,second.title))}
     if(close)frag.appendChild(document.createTextNode(close));
     last=end;RE.lastIndex=end}
    if(frag){if(last<txt.length)frag.appendChild(document.createTextNode(txt.slice(last)));t.parentNode.replaceChild(frag,t)}})}
`;

const SHOW = String.raw`function wlShow(a){wlHide();let t,dd,sm;const l=D.lessons.find(x=>x.n==+a.dataset.n);
   const c=a.dataset.ci!==undefined&&WL?WL[+a.dataset.ci]:null;
   if(c){const i=wlRefInfo(c.f);t=c.t;dd=c.d;sm=(i&&i.id?i.title+' · ':'')+(l?wlChap(l):'')}
   else{const i=wlRefInfo(a.dataset.id?a.dataset.id.slice(1).replace('-','.'):''+a.dataset.n);if(!i)return;t=i.title;dd=i.excerpt;sm=i.id?i.chapter:''}
   const d=document.createElement('div');d.className='wl-tip';d.setAttribute('role','tooltip');d.innerHTML='<b>'+t+'</b>'+(dd?'<div>'+dd+'</div>':'')+(sm?'<small>'+sm+'</small>':'');
   `;

const CSS = `
.bp-flip-badge{max-width:62%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
`;

for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  // 1. new autoref + helpers
  const a = s.indexOf('  function autoref(c,n){');
  const b = s.indexOf('  /* cards that would leave an empty grid cell');
  if (a < 0 || b < 0) throw new Error(id + ' autoref markers');
  s = s.slice(0, a) + HELPERS + '  ' + s.slice(b);
  // 2. tooltip
  const sa = s.indexOf('function wlShow(a){');
  const sb = s.indexOf('document.body.appendChild(d);', sa);
  if (sa < 0 || sb < 0) throw new Error(id + ' wlShow');
  s = s.slice(0, sa) + SHOW + s.slice(sb);
  // 3. flashcard badge shows the section title
  const fb = "Term · §${c.f.replace(/^§/,'')}";
  if (!s.includes(fb)) throw new Error(id + ' badge');
  s = s.replace(fb, () => 'Term · ${esc(wlRefLabel(c.f))}');
  // 4. cheat-sheet: where column = linked title
  const ch = '<td>${c.f}</td></tr>`).join';
  if (!s.includes(ch)) throw new Error(id + ' cheat');
  s = s.replace(ch, () => '<td>${wlRefHTML(c.f)}</td></tr>`).join');
  // 5. links used outside the lesson page (cheat-sheet): remember where to come back to
  const go = "const back={tab:'theory',sel:cur,y:c.scrollTop,label:'Back to '+(l?l.title:'the previous page'),up:BACK};";
  if (!s.includes(go)) throw new Error(id + ' wlGo');
  s = s.replace(go, () => "const back=tab!=='theory'?{tab:tab,sel:cur,y:0,label:'Back to the '+(tab==='cheat'?'cheat-sheet':'flashcards'),up:null}:{tab:'theory',sel:cur,y:c.scrollTop,label:'Back to '+(l?wlChap(l):'the previous page'),up:BACK};");
  const gb = "if(b.tab=='theory'){";
  if (!s.includes(gb)) throw new Error(id + ' goBack');
  s = s.replace(gb, () => "if(b.tab=='cheat'||b.tab=='cards'){switchTab(b.tab);return}if(b.tab=='theory'){");
  fs.writeFileSync(f, s);
  fs.appendFileSync(`src/courses/${id}/style.css`, CSS);
  console.log(id, 'ok');
}
