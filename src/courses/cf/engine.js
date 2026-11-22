// Study guide engine for IS114 Computing Fundamentals. Same engine as the IS211/IS210/IS115 guides (wiki-links, back bar, practice groups, flashcards, exams),
// with the section groups, past-exam sections and storage key supplied by the course data.
/* eslint-disable */
export default function mountCourse(D, __api) {
  const __undo = [];
  const __L = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); __undo.push(() => t.removeEventListener(ev, fn, o)); };
  const __MO = (cb) => { const o = new MutationObserver(cb); __undo.push(() => o.disconnect()); return o; };



const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const KEY='cf1_';let S={},V={},K={},P={},ST={},M={},QP={},PS={},PW={};
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(KEY+k)||'null')||d}catch(e){return d}};
S=ld('scores',{});V=ld('visited',{});K=ld('known',{});P=ld('past',{});ST=ld('settings',{});M=ld('mistakes',{});QP=ld('qstate',{});PS=ld('pastsel',{});PW=ld('pastwrite',{});
const sv=()=>{try{localStorage.setItem(KEY+'scores',JSON.stringify(S));localStorage.setItem(KEY+'visited',JSON.stringify(V));localStorage.setItem(KEY+'known',JSON.stringify(K));localStorage.setItem(KEY+'past',JSON.stringify(P));localStorage.setItem(KEY+'settings',JSON.stringify(ST));localStorage.setItem(KEY+'mistakes',JSON.stringify(M));localStorage.setItem(KEY+'qstate',JSON.stringify(QP));localStorage.setItem(KEY+'pastsel',JSON.stringify(PS));localStorage.setItem(KEY+'pastwrite',JSON.stringify(PW))}catch(e){}};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let cur=null,tab='theory',BACK=null;
const TABS=['theory','practice','cards','cheat'];
// ---------- theme / size
function applyTheme(t){document.documentElement.dataset.theme=t;$('#theme').innerHTML=t=='light'?'<span class="ti">🌙</span><span class="tx"> Dark</span>':'<span class="ti">☀️</span><span class="tx"> Light</span>'}
function toggleTheme(){const t=document.documentElement.dataset.theme=='light'?'dark':'light';ST.theme=t;sv();applyTheme(t);if(tab=='theory'&&cur)loadTheory(cur,{keep:true})}
function setSize(d){ST.fs=Math.min(1.35,Math.max(.85,(ST.fs||1)+d));sv();applySize()}
function applySize(){const c=$('#theory-content');if(c)c.style.zoom='';$$('.fsv').forEach(e=>e.textContent=Math.round((ST.fs||1)*100)+'%')}
// ---------- tabs / nav
function switchTab(t,focus){tab=t;ST.tab=t;sv();setTimeout(buildNav,0);$$('.tab').forEach(e=>{const on=e.dataset.t==t;e.classList.toggle('active',on);e.setAttribute('aria-selected',on)});$$('.tab-view').forEach(e=>e.classList.toggle('active',e.id=='tab-'+t));
 toggleNav(false);if(t=='practice')renderPQ(pqSel);if(t=='cards')renderCards();if(t=='cheat')renderCheat();if(t=='past')renderPast(pastSec)}
function toggleNav(f){const n=$('#mnav');const o=f===undefined?!n.classList.contains('open'):f;n.classList.toggle('open',o);$('#scrim').classList.toggle('on',o);$('#menu').setAttribute('aria-expanded',o)}
function stat(){const n=Object.keys(V).length;$('#stat').textContent=n+' / '+D.lessons.length+' read';const p=$('#pbar');p.firstElementChild.style.width=(n/D.lessons.length*100)+'%';p.setAttribute('aria-valuenow',n)}
function sc(s){return s.s/s.t>=.8?'ok':s.s/s.t>=.5?'mid':'lo'}
let NAVG=-1;let CCH=0;
const groupOf=n=>D.groups.findIndex(g=>g.ns.includes(n));
const cardChap=c=>{const m=/(\d+)\./.exec(c.f);return m?+m[1]:0};
function setCCH(n){CCH=+n||0;ST.cch=CCH;sv();if(tab=='cards')renderCards();else renderCheat();toggleNav(false);buildNav()}
function navItem(ico,num,title,on,act,badge){return `<button class="theory-item ${on?'active':''}" ${on?'aria-current="true"':''} onclick="${act}"><span class="theory-item-icon" aria-hidden="true">${ico}</span><span class="tn">${num}</span><span class="tt">${title}</span>${badge||''}</button>`}
const chapList=fn=>D.groups.map(g=>`<div class="theory-group"><div class="theory-group-title static">${g.t}</div>`+g.ns.map(n=>fn(D.lessons.find(x=>x.n==n))).join('')+'</div>').join('');
const hd=s=>`<div class="theory-nav-header">${s}</div>`;
/* practice tab: chapter quizzes grouped by exam section */
const PQG=D.pqg;
const pqList=fn=>PQG.map(g=>`<div class="theory-group"><div class="theory-group-title static">${g[0]}</div>`+g[1].map(n=>fn(D.lessons.find(x=>x.n==n))).join('')+'</div>').join('');
function buildNav(){const keep=['#nav','#mnav'].map(s=>{const e=$(s);return e?e.scrollTop:0});
 const theory=hd('Chapters')+chapList(l=>{const s=S[l.n];return navItem(l.icon,l.n,l.title,cur==l.n,`loadTheory(${l.n})`,(V[l.n]?'<span class="rd" title="Read" aria-label="read">●</span>':'')+(s?`<span class="tq sc ${sc(s)}" title="Quiz score">${s.s}/${s.t}</span>`:''))});
 let m=theory;
 if(tab=='practice'){m=hd('Chapter quizzes')+navItem('🔁','','Review my mistakes',pqSel=='mx',"renderPQ('mx');toggleNav(false)",mCount()?`<span class="tq sc lo">${mCount()}</span>`:'')+pqList(l=>{const s=S[l.n];return navItem(l.icon,l.n,l.title,pqSel==l.n,`pqMode=pqMode;renderPQ(${l.n});toggleNav(false)`,s?`<span class="tq sc ${sc(s)}">${s.s}/${s.t}</span>`:'')})+(D.selfq?navItem('📝','','Self-check Q&amp;A',pqSel=='sc',"renderPQ('sc');toggleNav(false)"):'')}
 else if(tab=='cards'||tab=='cheat'){const cnt={};D.cards.forEach(c=>{const k=cardChap(c);cnt[k]=(cnt[k]||0)+1});const fn=tab=='cards'?(l=>{const ks=D.cards.filter(c=>cardChap(c)==l.n);const kn=D.cards.reduce((a,c,i)=>a+(cardChap(c)==l.n&&K[i]?1:0),0);return [cnt[l.n]||0,tab=='cards'&&cnt[l.n]?`<span class="tq sc ${kn==cnt[l.n]?'ok':'mid'}">${kn}/${cnt[l.n]}</span>`:'']}):(l=>[cnt[l.n]||0,cnt[l.n]?`<span class="tq sc mid">${cnt[l.n]}</span>`:'']);
  m=hd(tab=='cards'?'Flashcards by chapter':'Cheat-sheet by chapter')+navItem('🗂️','',`All chapters (${D.cards.length})`,!CCH,'setCCH(0)')+chapList(l=>{const [c,b]=fn(l);return c?navItem(l.icon,l.n,l.title,CCH==l.n,`setCCH(${l.n})`,b):''})}
 else if(tab=='past'){m=hd('Past exam sections')+Object.keys(SECS).map(k=>{const [a,b2]=SECS[k];const mc=D.exam.mcq.filter(q=>q.n>=a&&q.n<=b2);const ans=mc.filter(q=>P[q.n]!==undefined).length;return navItem('📝',k,SECS[k][2].replace(/^Section [A-E] · /,''),pastSec==k,`renderPast('${k}');toggleNav(false)`,mc.length?`<span class="tq sc ${ans==mc.length?'ok':'mid'}">${ans}/${mc.length}</span>`:'')}).join('')}
 else if(tab=='exam'){const s=qStatus('exam');m=hd('Final exam')+navItem('🏠','','Exam overview',false,'renderExamHome();toggleNav(false)')+navItem('▶️','',s&&!s.done?`Resume exam (${s.a}/${s.n})`:s?'Review your answers':'Start exam',false,'startExam();toggleNav(false)')+navItem('🔄','','Start a new random exam',false,"restart('exam',()=>startExam(true));toggleNav(false)")+navItem('🔁','',`Review my mistakes${mCount()?' ('+mCount()+')':''}`,false,"switchTab('practice');renderPQ('mx')")}
 morph($('#nav'),theory);morph($('#mnav'),m);['#nav','#mnav'].forEach((s,i)=>{$(s).scrollTo({top:keep[i],behavior:'instant'})})}
function readMins(html){const w=html.replace(/<[^>]+>/g,' ').split(/\s+/).length;return Math.max(1,Math.round(w/200))}
function loadTheory(n,o){o=o||{};const dir=(cur==null||n==cur)?'':(n>cur?'r':'l');cur=n;V[n]=1;ST.last=n;sv();stat();buildNav();const l=D.lessons.find(x=>x.n==n);const i=D.lessons.findIndex(x=>x.n==n);
 const pv=D.lessons[i-1],nx=D.lessons[i+1];const mins=readMins(l.html);
 const back=o.back?`<div class="backbar"><button class="bb-go" onclick="goBack()">↩ ${esc(o.back.label)}</button><button class="bb-x" title="Dismiss" aria-label="Dismiss" onclick="this.parentNode.remove()">×</button></div>`:'';BACK=o.back||null;
 $('#theory-content').innerHTML=`<div class="t-hero"><div class="t-tag ${l.tag}">Chapter ${n} of ${D.lessons.length}</div><h1 class="t-h1" tabindex="-1">${l.title}</h1><div class="t-subtitle">${l.goal}</div><div class="meta">⏱ about ${mins} min read · ${(D.hard[n]||[]).length} exam-style questions at the end</div></div>${l.html}
 <div class="endrow"><div class="endmsg">You have reached the end of Chapter ${n}. <b>Next step:</b> test yourself while it is fresh.</div><button class="btn" onclick="goQuiz(${n})">🧠 Take the Chapter ${n} quiz</button></div>
 <div class="t-nav-footer">${pv?`<button class="t-nav-btn" onclick="loadTheory(${pv.n})"><small>Previous</small>← ${pv.title}</button>`:'<div></div>'}${nx?`<button class="t-nav-btn next" onclick="loadTheory(${nx.n})"><small>Next chapter</small>${nx.title} →</button>`:`<button class="t-nav-btn next" onclick="switchTab('practice')"><small>You finished the course notes</small>Go to the practice questions →</button>`}</div>${back}`;
 const c=$('#theory-content');applySize();c.scrollTop=0;anim(c,dir?'scr-'+dir:'scr-in');buildToc();switchTab('theory');stackTables(c);mm();reveal();autolink(c,n);fillRows(c);
 if(!o.keep){const h=c.querySelector('h1');if(h&&o.focus!==false)h.focus({preventScroll:true})}}
function reveal(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{root:$('#theory-content'),threshold:.05});
 $$('#theory-content .reveal').forEach((el,i)=>{el.style.transitionDelay=(Math.min(i,4)*60)+'ms';io.observe(el)})}
function morph(el,html){const t=document.createElement('div');t.innerHTML=html;const sel='button,.theory-group-title,.theory-nav-header,.pq-head';const a=[...el.querySelectorAll(sel)],b=[...t.querySelectorAll(sel)];
 if(a.length&&a.length===b.length&&a.every((x,i)=>x.tagName===b[i].tagName&&x.className.split(' ')[0]===b[i].className.split(' ')[0]&&(x.getAttribute('onclick')||'')===(b[i].getAttribute('onclick')||''))){
  a.forEach((x,i)=>{if(x.className!==b[i].className)x.className=b[i].className;if(x.innerHTML!==b[i].innerHTML)x.innerHTML=b[i].innerHTML;const c=b[i].getAttribute('aria-current');if(c)x.setAttribute('aria-current',c);else x.removeAttribute('aria-current')});return}
 el.innerHTML=html}
/* simple one-way vertical chains (flowchart TD with no branches) become a compact snake of numbered boxes */
function snakeChains(){$$('#theory-content pre.mermaid:not([data-processed])').forEach(pre=>{const src=pre.textContent;if(!/^\s*(%%.*\n)?\s*(flowchart|graph)\s+(TD|TB)/m.test(src)||/subgraph|-\.|==>/.test(src))return;
 const lab={},edges=[];const nodeRe=/([A-Za-z_]\w*)\s*(?:\["([^"]*)"\]|\[([^\]]*)\]|\("([^"]*)"\)|\(([^)]*)\))/g;let m;while((m=nodeRe.exec(src)))lab[m[1]]=(m[2]||m[3]||m[4]||m[5]||'').trim();
 src.replace(nodeRe,'$1').split('\n').forEach(l=>{const p=l.split('-->').map(x=>x.replace(/\|[^|]*\|/g,'').trim());for(let i=0;i<p.length-1;i++){const a=p[i].match(/^[A-Za-z_]\w*/),b=p[i+1].match(/^[A-Za-z_]\w*/);if(a&&b)edges.push([a[0],b[0]])}});
 if(edges.length<3)return;const out={},inn={};edges.forEach(([a,b])=>{out[a]=(out[a]||0)+1;inn[b]=(inn[b]||0)+1});
 if(Object.values(out).some(v=>v>1)||Object.values(inn).some(v=>v>1))return;
 const start=edges.map(e=>e[0]).find(a=>!inn[a]);if(!start)return;const next={};edges.forEach(([a,b])=>next[a]=b);const order=[];let c=start,g=0;while(c&&g++<40){order.push(c);c=next[c]}
 if(order.length<4||order.length!==new Set(order).size)return;
 const w=(pre.parentElement&&pre.parentElement.clientWidth)||600,cols=Math.max(1,Math.min(4,Math.floor(w/210)));
 const d=document.createElement('div');d.className='snake';d.style.setProperty('--cols',cols);
 d.innerHTML=order.map((id,i)=>{const r=Math.floor(i/cols),k=i%cols,col=r%2?cols-k:k+1,last=i===order.length-1,arrow=last?'':(k===cols-1?'↓':(r%2?'←':'→'));
  const t=esc(lab[id]||id).replace(/^\d+\.\s*/,'').replace(/&lt;br\s*\/?&gt;/g,'<br>');return `<div class="sn" style="grid-row:${r+1};grid-column:${col}" data-a="${arrow}"><b>${i+1}</b><span>${t}</span></div>`}).join('');
 pre.replaceWith(d)})}
function mm(){snakeChains();const bl=$$('#theory-content pre.mermaid:not([data-processed])');if(!bl.length)return;if(!window.mermaid){__api.loadMermaid().then(m=>{window.mermaid=m;mm()}).catch(()=>{});return}
 const go=async(nodes,n)=>{try{mermaid.initialize({startOnLoad:false,securityLevel:'loose',theme:(document.documentElement.dataset.theme=='light'?'neutral':'dark')});await mermaid.run({nodes})}catch(e){}
  const bad=nodes.filter(x=>x.isConnected&&!x.querySelector('svg'));if(bad.length&&n<3)setTimeout(()=>go(bad,n+1),600)};go(bl,0)}
function stackTables(c){if(innerWidth>600)return;c.querySelectorAll('.t-table-wrap').forEach(w=>{if(w.scrollWidth<=w.clientWidth+1)return;const tb=w.querySelector('table');if(!tb||tb.tHead==null&&!tb.querySelector('th'))return;const hs=[...tb.rows[0].cells].map(x=>x.textContent.trim());tb.querySelectorAll('tr').forEach((r,i)=>{if(i==0)return;[...r.cells].forEach((cell,j)=>{if(hs[j]&&j>0)cell.setAttribute('data-l',hs[j])})});w.classList.add('stack')})}
function buildToc(){const c=$('#theory-content');const secs=$$('#theory-content .t-section[id]');if(secs.length<2)return;
 const bar=document.createElement('nav');bar.className='toc';bar.setAttribute('aria-label','Sections in this chapter');
 bar.innerHTML='<div class="tocs">'+secs.map(s=>{const n=s.querySelector('.t-num');const tt=s.querySelector('.t-h2').textContent.replace(n?n.textContent:'','').trim();return `<a href="#${s.id}" data-id="${s.id}" title="${esc(tt)}">${n?n.textContent+' ':''}${esc(tt)}</a>`}).join('')+'</div><i class="rp"></i>';
 c.querySelector('.t-hero').insertAdjacentElement('afterend',bar);
 bar.querySelectorAll('a').forEach(a=>a.onclick=e=>{e.preventDefault();scrollToId(a.dataset.id)});
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){bar.querySelectorAll('a').forEach(a=>{const on=a.dataset.id==e.target.id;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});const on=bar.querySelector('a.on');if(on)bar.querySelector('.tocs').scrollTo({left:on.offsetLeft-80,behavior:'smooth'})}}),{root:c,rootMargin:'-10% 0px -75% 0px'});
 secs.forEach(s=>io.observe(s));
 c.onscroll=()=>{const p=c.scrollTop/Math.max(1,c.scrollHeight-c.clientHeight);bar.querySelector('.rp').style.width=(p*100)+'%';ST.y=Math.round(c.scrollTop);ST.yn=cur;clearTimeout(window._sv);window._sv=setTimeout(sv,400)}}
function scrollToId(id,inst){const c=$('#theory-content'),t=document.getElementById(id);if(t){t.classList.add('in');c.scrollTo({top:t.offsetTop-(c.querySelector('.toc')?c.querySelector('.toc').offsetHeight+8:16),behavior:(inst)?'instant':'smooth'});t.classList.remove('flash');void t.offsetWidth;t.classList.add('flash')}}
// ---------- practice
let pqSel=1;
let pqMode='hard';
function mCount(){return Object.keys(M).length}
function renderPQ(sel){pqSel=sel;ST.pq=sel;ST.pqm=pqMode;buildNav();let h=`<div class="pq-head">CHAPTER QUIZZES</div>`;
 h+=`<button class="pq-item ${sel=='mx'?'active':''}" onclick="renderPQ('mx')"><span class="tn">🔁</span><span class="tt">Review my mistakes</span>${mCount()?`<span class="sc lo">${mCount()}</span>`:''}</button>`;
 PQG.forEach(g=>{h+=`<div class="pq-head">${g[0].toUpperCase()}</div>`;g[1].map(n=>D.lessons.find(x=>x.n==n)).forEach(l=>{const s=S[l.n];h+=`<button class="pq-item ${sel==l.n?'active':''}" ${sel==l.n?'aria-current="true"':''} onclick="renderPQ(${l.n})"><span class="tn">${l.n}</span><span class="tt">${l.title}</span>${s?`<span class="sc ${sc(s)}">${s.s}/${s.t}</span>`:''}</button>`})});
 if(D.selfq)h+=`<button class="pq-item ${sel=='sc'?'active':''}" onclick="renderPQ('sc')"><span class="tn">📝</span><span class="tt">Self-check Q&amp;A (${D.selfn||''})</span></button>`;
 morph($('#pql'),h);
 if(sel=='sc'){$('#pqm').innerHTML='<h1 class="t-h1" style="font-size:26px;margin-bottom:6px">Self-check Q&amp;A</h1><div class="sub">Think first, then open the answer.</div><div class="t-section">'+D.selfq+'</div>';return}
 if(sel=='mx'){reviewMistakes();return}
 const l=D.lessons.find(x=>x.n==sel);
 const nf=(D.fill&&D.fill[sel]||[]).length;
 const pills=`<div class="pills" role="group" aria-label="Question style"><button class="${pqMode=='hard'?'on':''}" aria-pressed="${pqMode=='hard'}" onclick="pqMode='hard';renderPQ(${sel})">Exam-style (harder) · ${(D.hard[sel]||[]).length+nf}</button><button class="${pqMode=='warm'?'on':''}" aria-pressed="${pqMode=='warm'}" onclick="pqMode='warm';renderPQ(${sel})">Warm-up (easier) · ${(D.quiz[sel]||[]).length}</button></div>`;
 if(pqMode=='warm'){runQuiz(`Chapter ${sel} — ${l.title} (warm-up)`,D.quiz[sel],'w'+sel,$('#pqm'),pills);return}
 runMulti(`Chapter ${sel} — ${l.title}`,(D.hard[sel]||[]).map((q,i)=>({...q,id:'h'+sel+'-'+i,ch:sel})),sel,$('#pqm'),pills);
 if(nf){const fh=document.createElement('div');fh.id='pqf';$('#pqm').appendChild(fh);runFill('Type the answer',D.fill[sel].map(q=>({...q})),'f'+sel,fh,'')}}
function goQuiz(n){pqMode='hard';switchTab('practice');renderPQ(n)}
function goBack(){const b=BACK;if(!b)return;if(b.tab=='cheat'||b.tab=='cards'){switchTab(b.tab);return}if(b.tab=='theory'){const c=$('#theory-content');if(+b.sel==cur){BACK=b.up||null;wlBar(BACK);c.scrollTo({top:b.y,behavior:'smooth'})}else{loadTheory(+b.sel,{back:b.up||undefined,focus:false});$('#theory-content').scrollTop=b.y}return}if(b.tab=='practice'&&b.sel=='exam'){switchTab('exam')}else if(b.tab=='practice'){switchTab('practice');renderPQ(b.sel=='mx'?'mx':+b.sel)}else if(b.tab=='past'){switchTab('past');renderPast(b.sec);setTimeout(()=>{const e=document.getElementById('pq'+b.q);if(e)e.scrollIntoView({block:'start'})},60)}else if(b.tab=='exam'){switchTab('exam')}}
function nextOf(n){const i=D.lessons.findIndex(x=>x.n==n);return D.lessons[i+1]}

const STOP=new Set('the a an and or of to in is are was were be been it its that this these those for on with as by at from not no do does did can could should would will which what who how why when where than then so if but into out up down over under more most such only same too very just also may might must have has had their there they them he she his her we you your our i me my one two all any each few other some both either neither true false statement because'.split(' '));
let SECIDF=null;
const secTok=s=>(String(s).toLowerCase().match(/[a-z][a-z0-9'-]{2,}/g)||[]).filter(w=>!STOP.has(w));
function bestSection(n,text){buildIdx();const secs=IDX.filter(e=>!e.term&&e.id);
 if(!SECIDF){SECIDF={};secs.forEach(e=>{e._t=secTok(e.text);e._f={};e._t.forEach(w=>e._f[w]=(e._f[w]||0)+1);Object.keys(e._f).forEach(w=>SECIDF[w]=(SECIDF[w]||0)+1)});SECIDF._N=secs.length}
 const q=new Set(secTok(text));let best=null,bs=0;
 secs.filter(e=>e.n==n).forEach(e=>{let s=0;q.forEach(w=>{if(e._f[w])s+=(1+Math.log(e._f[w]))*Math.log(SECIDF._N/(SECIDF[w]||1))});s/=Math.sqrt(e._t.length+60);if(s>bs){bs=s;best=e}});return best}
function jumpBtn(ch,text,back){const s=bestSection(ch,text);const lbl=s?'📖 Review '+esc(s.title.length>44?s.title.slice(0,42)+'…':s.title):'📖 Review Chapter '+ch;
 const a=Object.entries(back).map(([k,v])=>` data-b-${k}="${esc(String(v))}"`).join('');return `<button class="btn ghost jump" data-jump="${s?esc(s.id):''}" data-ch="${ch}"${a}>${lbl}</button>`}
function reread(n,back,sec){loadTheory(n,{back:back,focus:false});if(sec)setTimeout(()=>scrollToId(sec),450)}
__L(document,'click',e=>{const b=e.target.closest('[data-jump]');if(!b)return;const d=b.dataset;reread(+d.ch,{tab:d.bTab,sel:d.bSel,sec:d.bSec,q:d.bQ?+d.bQ:0,label:d.bLabel||'Back to your quiz'},d.jump)});
const whyHTML=(isA,r)=>r?`<div class="why ${isA?'wy':'wn'}"><b>${isA?'Why this is right':'Why this is wrong'}:</b> ${esc(r)}</div>`:'';
function qSave(key){QP[key].ts=Date.now();sv()}
function qStatus(key){const s=QP[key];if(!s)return null;const a=s.ord.filter(x=>x.chk).length;return {a,n:s.ord.length,done:a==s.ord.length}}
function restart(key,fn){delete QP[key];sv();fn()}
function runQuiz(title,qs,key,host,pills){
 qs=qs.map((q,i)=>({...q,id:key+'-'+i}));
 let st=QP[key];const ids=qs.map(q=>q.id).sort().join();
 if(!st||st.ord.map(x=>x.id).sort().join()!=ids){st=QP[key]={ord:shuffle(qs).map(q=>({id:q.id,perm:shuffle(q.o.map((_,i)=>i)),sel:null,chk:0}))};sv()}
 const by={};qs.forEach(q=>by[q.id]=q);
 const prep=st.ord.map(x=>{const q=by[x.id];return{q:q.q,e:q.e,o:x.perm.map(i=>q.o[i]),w:x.perm.map(i=>q.w?q.w[i]:null),c:x.perm.indexOf(q.c),rec:x,ch:+String(key).replace('w','')}});
 const N=prep.length;let score=0,done=0;
 host.innerHTML=`<h1 class="t-h1" style="font-size:26px">${title}</h1>${pills||''}<div class="sub">${N} questions · instant feedback · saved automatically · options reshuffle every new attempt</div><div class="qprog" role="status" aria-live="polite"><span id="qp">Answered 0 of ${N}</span><i><b id="qb"></b></i><button class="btn ghost sm" id="rs">↺ Start over</button></div><div id="qs"></div><div id="res" aria-live="polite"></div>`;
 host.querySelector('#rs').onclick=()=>restart(key,()=>renderPQ(+String(key).replace('w','')));
 const box=host.querySelector('#qs');
 const upd=()=>{host.querySelector('#qp').textContent=`Answered ${done} of ${N} · ${score} correct`;host.querySelector('#qb').style.width=(done/N*100)+'%'};
 const finish=quiet=>{S[key]={s:score,t:N};sv();buildNav();const wn=+String(key).replace('w','');const p=Math.round(score/N*100);
    host.querySelector('#res').innerHTML=`<div class="qq resultcard"><div class="ring" id="rg"><span>${p}%</span></div><div class="rt"><div style="font-weight:700">Score: ${score}/${N}</div><div class="sub">${p>=80?'Strong — move on. 🎉':p>=50?'Decent — revisit the weak parts, then retry.':'Re-read the chapter and try again.'}</div><div class="row"><button class="btn" onclick="restart('${key}',()=>renderPQ(${wn}))">Retry (reshuffled)</button><button class="btn ghost" onclick="pqMode='hard';renderPQ(${wn})">Try the exam-style quiz →</button></div></div></div>`;
    requestAnimationFrame(()=>{const g=host.querySelector('#rg');if(g)g.style.setProperty('--p',p)});if(!quiet)host.querySelector('#res').scrollIntoView({behavior:'smooth'})};
 prep.forEach((q,i)=>{const d=document.createElement('div');d.className='qq';d.innerHTML=`<div class="t">${i+1}. ${q.q}</div>`;
  const pick=(j,quiet)=>{d.querySelectorAll('.opt').forEach((x,k)=>{x.disabled=true;if(k==q.c)x.classList.add('ok')});
   const bs=d.querySelectorAll('.opt');if(j==q.c)score++;else bs[j].classList.add('bad');done++;upd();
   d.insertAdjacentHTML('beforeend',`<div class="exp" role="status">${j==q.c?'✅ <b>Correct.</b> '+q.e:`❌ <b>Not quite.</b> ${q.w[j]?`<div class="wh"><b>Why "${esc(q.o[j].length>60?q.o[j].slice(0,58)+'…':q.o[j])}" is wrong:</b> ${esc(q.w[j])}</div>`:''}<div class="wh"><b>Correct: ${esc(q.o[q.c])}.</b> ${q.e}</div><div class="row">${jumpBtn(q.ch,q.q+' '+q.o[q.c]+' '+q.e+' '+q.o[j],{tab:'practice',sel:q.ch,label:'Back to your quiz'})}</div>`}</div>`);
   if(done==N)finish(quiet)};
  q.o.forEach((o,j)=>{const b=document.createElement('button');b.className='opt';b.textContent=o;b.onclick=()=>{q.rec.sel=j;q.rec.chk=1;qSave(key);pick(j,false)};d.appendChild(b)});
  box.appendChild(d);if(q.rec.chk)pick(q.rec.sel,true)});
 upd();host.scrollTop=0}
function runMulti(title,qs,key,host,pills,o){o=o||{};
 const L='ABCDE';
 const ids=qs.map(q=>q.id).sort().join();let st=QP[key];
 if(!st||st.ord.map(x=>x.id).sort().join()!=ids){st=QP[key]={ord:shuffle(qs).map(q=>({id:q.id,perm:shuffle(q.o.map((_,i)=>i)),sel:[],chk:0}))};sv()}
 const by={};qs.forEach(q=>by[q.id]=q);
 const prep=st.ord.map(x=>{const q=by[x.id];const ans=q.a.split('').map(l=>L.indexOf(l));return {src:q,rec:x,q:q.q,e:q.e,o:x.perm.map(i=>q.o[i]),w:x.perm.map(i=>q.w?q.w[i]:null),a:x.perm.map((old,pos)=>ans.includes(old)?pos:-1).filter(p=>p>=0)}});
 const N=prep.length;let done=0,score=0;
 const resume=prep.some(q=>q.rec.chk||q.rec.sel.length);
 host.innerHTML=`<h1 class="t-h1" style="font-size:26px">${title}</h1>${pills||''}<div class="sub">${N} questions · <b>select all that apply</b> · every option must be judged · saved automatically${resume?' · <b>resumed where you left off</b>':''}</div><div class="qprog" role="status" aria-live="polite"><span id="qp">Answered 0 of ${N}</span><i><b id="qb"></b></i>${key==='mx'?'':'<button class="btn ghost sm" id="rs">↺ Start over</button>'}</div><div id="qs"></div><div id="res" aria-live="polite"></div>`;
 const rs=host.querySelector('#rs');if(rs)rs.onclick=()=>restart(key,()=>{if(key==='exam')startExam(true);else renderPQ(+key)});
 const box=host.querySelector('#qs');
 const upd=()=>{host.querySelector('#qp').textContent=`Answered ${done} of ${N} · ${score} fully correct`;host.querySelector('#qb').style.width=(done/N*100)+'%'};
 prep.forEach((q,i)=>{const d=document.createElement('div');d.className='exq';d.id='mq'+i;d.innerHTML=`<div class="qh"><h2 class="qn">Question ${i+1}</h2><span class="ms">SELECT ALL THAT APPLY</span></div><div class="qt">${q.q}</div><div role="group" aria-label="Options for question ${i+1}">${q.o.map((x,j)=>`<label class="eo"><input type="checkbox" value="${j}"><i>${L[j]}.</i><span>${x}</span></label>`).join('')}</div><div class="row"><button class="btn" disabled>Check answer</button></div><div class="vd" aria-live="polite"></div>`;
  const btn=d.querySelector('.btn');
  const sync=()=>{d.querySelectorAll('.eo').forEach(l=>l.classList.toggle('sel',l.querySelector('input').checked));btn.disabled=!d.querySelector('input:checked')};
  d.querySelectorAll('input').forEach(inp=>inp.onchange=()=>{sync();q.rec.sel=[...d.querySelectorAll('input:checked')].map(x=>+x.value);qSave(key)});
  const check=(quiet)=>{const sel=[...d.querySelectorAll('input:checked')].map(x=>+x.value);const ok=sel.length==q.a.length&&sel.every(x=>q.a.includes(x));
   d.querySelectorAll('.eo').forEach((l,j)=>{const isA=q.a.includes(j),isS=sel.includes(j);if(isA&&isS)l.classList.add('right');else if(isS)l.classList.add('wrong');else if(isA)l.classList.add('miss');l.querySelector('input').disabled=true;l.insertAdjacentHTML('afterend',whyHTML(isA,q.w[j]))});
   btn.disabled=true;done++;if(ok){score++;if(!quiet)delete M[q.src.id]}else if(!quiet){M[q.src.id]={q:q.src.q,o:q.src.o,a:q.src.a,e:q.src.e,w:q.src.w,ch:q.src.ch,id:q.src.id}}
   d.querySelector('.vd').innerHTML=`<div class="verdict ${ok?'ok':'no'}"><b>${ok?'✅ Fully correct.':'❌ Not quite.'}</b> Correct: <b>${q.a.map(x=>L[x]).join(', ')}</b>. ${q.e} ${ok?'':`<div class="row">${jumpBtn(q.src.ch,q.q+' '+q.e+' '+q.o.filter((x,j)=>(q.a.includes(j))!==(sel.includes(j))).join(' '),{tab:'practice',sel:key,label:'Back to your quiz'})}</div>`}</div>`;
   upd();if(!quiet){sv();buildNav()}
   if(done==N)finishMulti(host,key,score,N,{quiet})};
  btn.onclick=()=>{q.rec.sel=[...d.querySelectorAll('input:checked')].map(x=>+x.value);q.rec.chk=1;qSave(key);check(false)};
  box.appendChild(d);
  q.rec.sel.forEach(j=>{const inp=d.querySelectorAll('input')[j];if(inp)inp.checked=true});sync();
  if(q.rec.chk)check(true)});
 upd();
 if(resume&&!prep.every(q=>q.rec.chk)){const nx=prep.findIndex(q=>!q.rec.chk);const e=host.querySelector('#mq'+nx);if(e)setTimeout(()=>e.scrollIntoView({block:'start'}),50)}else host.scrollTop=0}
function finishMulti(host,key,score,N,o){
 if(key!=='mx'&&key!=='exam'){S[key]={s:score,t:N};sv();buildNav()}
 const p=Math.round(score/N*100);const n=+key;const nx=nextOf(n);
 let acts='';
 if(key==='exam'){acts=(mCount()?`<button class="btn main" onclick="renderPQ('mx');switchTab('practice')">Review my ${mCount()} mistakes</button><button class="btn ghost" onclick="restart('exam',()=>startExam(true))">Take a new random exam</button>`:`<button class="btn main" onclick="restart('exam',()=>startExam(true))">Take a new random exam</button>`)+(document.querySelector('[data-t=past]')?`<button class="btn lnk" onclick="switchTab('past')">Try the past-year questions</button>`:'')}
 else if(key==='mx'){acts=`<button class="btn main" onclick="reviewMistakes()">${mCount()?'Review remaining mistakes':'Nothing left to review ✓'}</button>`}
 else{const pass=p>=80;const rr=`<button class="btn lnk" onclick="reread(${n},{tab:'practice',sel:${n},label:'Back to your quiz'})">Re-read Chapter ${n}</button>`;const rt=`<button class="btn lnk" onclick="restart('${n}',()=>renderPQ(${n}))">Retry this quiz (reshuffled)</button>`;if(pass){acts=(nx?`<button class="btn main" onclick="loadTheory(${nx.n})">Continue to Chapter ${nx.n}</button><button class="btn ghost" onclick="renderPQ(${nx.n})">Quiz me on Chapter ${nx.n}</button>`:`<button class="btn main" onclick="switchTab('practice')">Go to the practice questions</button>`)+rt+rr}else{acts=`<button class="btn main" onclick="restart('${n}',()=>renderPQ(${n}))">Retry this quiz (reshuffled)</button><button class="btn ghost" onclick="reread(${n},{tab:'practice',sel:${n},label:'Back to your quiz'})">Re-read Chapter ${n}</button>`+(nx?`<button class="btn lnk" onclick="loadTheory(${nx.n})">Skip ahead to Chapter ${nx.n}</button>`:'')}}
 host.querySelector('#res').innerHTML=`<div class="exq resultcard"><div class="ring" id="rg"><span>${p}%</span></div><div class="rt"><div style="font-weight:800;font-size:18px">${score} of ${N} fully correct</div><div class="sub">${p>=80?'Strong. Move on to the next chapter. 🎉':p>=50?'Decent. Revisit the explanations of the ones you missed, then retry.':'Re-read the chapter, then try again. Partial credit does not exist in the exam either.'}${mCount()&&key!=='mx'?` Missed questions are saved in <b>Review my mistakes</b> so they come back until you get them right.`:''}</div><div class="row">${acts}</div></div></div>`;
 requestAnimationFrame(()=>{const g=host.querySelector('#rg');if(g)g.style.setProperty('--p',p)});if(!o.quiet)host.querySelector('#res').scrollIntoView({behavior:'smooth'})}
function reviewMistakes(){const host=$('#pqm');const qs=Object.values(M);
 if(tab!='practice')switchTab('practice');
 if(!qs.length){host.innerHTML='<h1 class="t-h1" style="font-size:26px">Review my mistakes</h1><div class="exq"><div class="qt">🎉 No mistakes saved.</div><div class="sub">Questions you get wrong in the exam-style quizzes, the final exam or the past-year questions are collected here and stay until you answer them correctly. This is spaced practice: retrieving what you missed is what moves it into long-term memory.</div></div>';return}
 runMulti('Review my mistakes ('+qs.length+')',qs,'mx',host,'')}
// ---------- final exam
function renderExamHome(){buildNav();const hn=Object.values(D.hard).reduce((a,b)=>a+b.length,0);const s=qStatus('exam');
 $('#examm').innerHTML=`<h1 class="t-h1" style="font-size:26px">Final Exam</h1><div class="sub">40 random exam-style questions (select all that apply) drawn from every chapter, from every chapter. Your progress is saved, so you can leave and come back.</div>${s?`<div class="exq"><div class="qt">${s.done?'You finished an exam attempt.':'You have an exam in progress.'}</div><div class="sub">${s.a} of ${s.n} answered${S.exam?` · last score ${S.exam.s}/${S.exam.t}`:''}</div><div class="row"><button class="btn" onclick="startExam()">${s.done?'Review your answers':'Resume exam →'}</button><button class="btn ghost" onclick="restart('exam',()=>startExam(true))">Start a new exam</button></div></div>`:''}<div class="row">${s?'':`<button class="btn" onclick="startExam(true)">Start exam (40 of ${hn})</button>`}${mCount()?`<button class="btn ghost" onclick="switchTab('practice');renderPQ('mx')">🔁 Review my ${mCount()} mistakes</button>`:''}</div>`}
function startExam(fresh){const get=id=>{const m=/^h(\d+)-(\d+)$/.exec(id);const q=m&&D.hard[m[1]]&&D.hard[m[1]][+m[2]];return q?{...q,id,ch:+m[1]}:null};
 let list;const st=QP.exam;
 if(!fresh&&st){list=st.ord.map(x=>get(x.id)).filter(Boolean);if(list.length!=st.ord.length){delete QP.exam;list=null}}
 if(!list){delete QP.exam;let all=[];Object.entries(D.hard).forEach(([n,a])=>a.forEach((q,i)=>all.push({...q,id:'h'+n+'-'+i,ch:+n})));list=shuffle(all).slice(0,40)}
 runMulti('Final Exam',list,$('#examm'),'')}
// ---------- cards
let shuf=false;
function renderCards(){buildNav();const m=$('#cardsm');m.innerHTML=`<h1 class="t-h1" style="font-size:26px">Flashcards</h1><div class="sub">Say the definition aloud, then tap, click or press Enter to flip. Mark what you know — it is saved.</div><div class="fc-filter"><label class="sr" for="fq">Search terms</label><input id="fq" type="search" placeholder="Search terms…" oninput="drawCards()"><label class="sr" for="fs">Filter cards</label><select id="fs" onchange="drawCards()"><option value="all">All</option><option value="todo">Not yet known</option><option value="known">Known</option></select>${chSel()}<button class="btn ghost" onclick="shuf=!shuf;drawCards()">Shuffle</button><span id="fcount" class="sub" role="status"></span></div><div class="fc-grid" id="fg"></div>`;drawCards()}
const cardFront=c=>`<div class="bp-card-header"><div class="bp-card-header-title">${c.t}</div><span class="bp-flip-badge">Term · ${esc(wlRefLabel(c.f))}</span></div><div class="fc-b" style="color:var(--muted);font-style:italic">Tap to reveal the definition…</div>`;
function drawCards(){const q=($('#fq').value||'').toLowerCase(),f=$('#fs').value;let cs=D.cards.map((c,i)=>({...c,i}));if(shuf)cs=shuffle(cs);
 cs=cs.filter(c=>(!q||(c.t+c.d).toLowerCase().includes(q))&&(f=='all'||(f=='known')==!!K[c.i])&&(!CCH||cardChap(c)==CCH));
 $('#fcount').textContent=`${cs.length} cards · ${Object.values(K).filter(Boolean).length} of ${D.cards.length} known`;
 $('#fg').innerHTML=cs.map(c=>`<div class="bp-card ${K[c.i]?'known':''}" id="c${c.i}" data-f="0" role="button" tabindex="0" aria-label="Flashcard: ${esc(c.t)}. Press Enter to flip." onclick="flip(${c.i})">${cardFront(c)}</div>`).join('')}
function flip(i){const el=$('#c'+i),c=D.cards[i];if(!el||el.dataset.busy)return;el.dataset.busy='1';el.classList.add('flipping');setTimeout(()=>{const back=el.dataset.f=='0';el.dataset.f=back?'1':'0';
 el.innerHTML=back?`<div class="bp-card-header bp-card-back"><div class="bp-card-header-title">${c.t}</div><span class="bp-flip-badge">Definition</span></div><div class="fc-b">${c.d}</div><div style="padding:0 16px 12px"><button class="btn ghost" onclick="event.stopPropagation();mark(${i})">${K[i]?'✓ Known (undo)':'Mark as known'}</button></div>`:cardFront(c);
 el.classList.remove('flipping');el.removeAttribute('data-busy')},180)}
function mark(i){K[i]=K[i]?0:1;sv();const el=$('#c'+i);el.classList.toggle('known',!!K[i]);const b=el.querySelector('button');if(b)b.textContent=K[i]?'✓ Known (undo)':'Mark as known';$('#fcount').textContent=`${$$('.bp-card').length} cards · ${Object.values(K).filter(Boolean).length} of ${D.cards.length} known`}
function chSel(){return `<label class="sr" for="fch">Chapter</label><select id="fch" class="chsel" onchange="setCCH(this.value)"><option value="0">All chapters</option>${D.lessons.filter(l=>D.cards.some(c=>cardChap(c)==l.n)).map(l=>`<option value="${l.n}" ${CCH==l.n?'selected':''}>${l.n}. ${esc(l.title)}</option>`).join('')}</select>`}
function renderCheat(){buildNav();const cs=D.cards.filter(c=>!CCH||cardChap(c)==CCH);$('#cheatm').innerHTML=`<h1 class="t-h1" style="font-size:26px">Cheat-sheet</h1><div class="sub">${cs.length} key terms${CCH?' from chapter '+CCH:''} with the section where each lives.</div><div class="fc-filter">${chSel()}</div><div class="t-table-wrap" tabindex="0"><table class="ch"><thead><tr><th>Term</th><th>Definition</th><th>From</th></tr></thead><tbody>${cs.map(c=>`<tr><td>${c.t}</td><td>${c.d}</td><td>${wlRefHTML(c.f)}</td></tr>`).join('')}</tbody></table></div>`}
// ---------- past exam
let pastSec='A';const SECS={A:[1,20,'Section A · Q1–20 (multiple select)'],B:[21,40,'Section B · Q21–40 (multiple select)'],C:[41,60,'Section C · Q41–60 (multiple select)'],D:[61,70,'Section D · Q61–70 (written, 15 pts each)'],E:[71,73,'Section E · Q71–73 (long written, 50 pts each)']};
function pastTally(){const a=Object.keys(P).length,c=Object.values(P).filter(v=>v).length;return `${a} of ${D.exam.mcq.length} answered · ${c} correct`}
function renderPast(sec){pastSec=sec;buildNav();const m=$('#pastm');
 let h='<h1 class="t-h1" style="font-size:26px">Past exam questions</h1><div class="warnbox"><b>Important:</b> these are the questions you transcribed (73 in total). Your file has <b>no answer key</b>, so the answers and model answers below are <b>my own, worked out from the course notes</b>. Use them as a study aid; if your lecturer or a marked paper disagrees, trust that. Where I am less sure, the explanation says so. Multiple-select questions need <b>all</b> the right options and none of the wrong ones.</div><div class="pills" role="group" aria-label="Exam sections">'+Object.keys(SECS).map(k=>`<button class="${k==sec?'on':''}" ${k==sec?'aria-pressed="true"':'aria-pressed="false"'} onclick="renderPast('${k}')">${SECS[k][2].split(' · ')[0]} · Q${SECS[k][0]}–${SECS[k][1]}</button>`).join('')+`</div><div class="sub" style="margin:8px 0 4px"><b>${SECS[sec][2]}</b> &nbsp;·&nbsp; <span id="ptally" role="status">${pastTally()}</span></div>`;
 const [a,b]=SECS[sec];
 D.exam.mcq.filter(q=>q.n>=a&&q.n<=b).forEach(q=>{h+=`<div class="exq" id="pq${q.n}"><div class="qh"><h2 class="qn">Question ${q.n}</h2><span class="ms">SELECT ALL THAT APPLY</span></div><div class="qt">${q.q}</div><div role="group" aria-label="Options for question ${q.n}">`+q.o.map((o,i)=>`<label class="eo"><input type="checkbox" value="${'ABCDE'[i]}" onchange="selPast(${q.n})"><i>${'ABCDE'[i]}.</i><span>${o}</span></label>`).join('')+`</div><div class="row"><button class="btn" id="pb${q.n}" disabled onclick="checkPast(${q.n})">Check answer</button><button class="btn ghost" onclick="reread(${q.ch},{tab:'past',sec:'${sec}',q:${q.n},label:'Back to Past Exam Q${q.n}'})">📖 Revise chapter ${q.ch}</button></div><div id="pv${q.n}" aria-live="polite"></div></div>`});
 D.exam.wr.filter(q=>q.n>=a&&q.n<=b).forEach(q=>{h+=`<div class="exq"><div class="qh"><h2 class="qn">Question ${q.n}</h2><span class="ms">${q.pts} POINTS</span></div><div class="qt">${q.q}</div><label class="sr" for="ta${q.n}">Your answer</label><textarea id="ta${q.n}" placeholder="Write your own answer first (saved on this device)…" oninput="PW[${q.n}]=this.value;sv()">${esc(PW[q.n]||'')}</textarea><div class="row"><button class="btn ghost" onclick="reread(${q.ch},{tab:'past',sec:'${sec}',q:0,label:'Back to Past Exam'})">📖 Revise chapter ${q.ch}</button></div><details class="model"><summary>Show model answer (from the notes)</summary><div class="ma">${q.a}</div></details></div>`});
 const ks=Object.keys(SECS),ix=ks.indexOf(sec),nk=ks[ix+1];h+=`<div class="endrow"><div class="endmsg">End of this section. ${nk?'Keep the momentum.':'That is the whole past paper.'}</div>${nk?`<button class="btn go" onclick="renderPast('${nk}')">Next: ${SECS[nk][2].split(' · ')[0]} →</button>`:`<button class="btn go" onclick="switchTab('practice')">Go to the practice questions →</button>${mCount()?`<button class="btn ghost" onclick="switchTab('practice');renderPQ('mx')">🔁 Review ${mCount()} mistakes</button>`:''}`}</div>`;
 m.innerHTML=h;m.scrollTop=0;D.exam.mcq.filter(q=>q.n>=a&&q.n<=b&&PS[q.n]!==undefined).forEach(q=>{const box=$('#pq'+q.n);PS[q.n].split('').forEach(v=>{const i=box.querySelector('input[value="'+v+'"]');if(i)i.checked=true});selPast(q.n);checkPast(q.n,true)});ST.psec=sec;sv()}
function selPast(n){const box=$('#pq'+n);box.querySelectorAll('.eo').forEach(l=>l.classList.toggle('sel',l.querySelector('input').checked));$('#pb'+n).disabled=!box.querySelector('input:checked')}
function checkPast(n,restore){const q=D.exam.mcq.find(x=>x.n==n);const box=$('#pq'+n);const sel=[...box.querySelectorAll('input:checked')].map(x=>x.value).sort().join('');const ans=q.a.split('').sort().join('');
 box.querySelectorAll('.eo').forEach(l=>{const v=l.querySelector('input').value;const isA=ans.includes(v),isS=sel.includes(v);l.classList.remove('sel','right','wrong','miss');if(isA&&isS)l.classList.add('right');else if(isS)l.classList.add('wrong');else if(isA)l.classList.add('miss');l.querySelector('input').disabled=true;const nx=l.nextElementSibling;if(nx&&nx.classList.contains('why'))nx.remove();l.insertAdjacentHTML('afterend',whyHTML(isA,q.w&&q.w['ABCDE'.indexOf(v)]))});
 PS[n]=sel;P[n]=sel==ans?1:0;if(sel==ans)delete M[q.ch&&'p'+n];else M['p'+n]={q:q.q,o:q.o,a:q.a.split('').join(''),e:q.e,w:q.w,ch:q.ch,id:'p'+n};sv();buildNav();$('#ptally').textContent=pastTally();$('#pb'+n).disabled=true;
 $('#pv'+n).innerHTML=`<div class="verdict ${sel==ans?'ok':'no'}"><b>${sel==ans?'✅ Correct.':'❌ Not quite.'}</b> Answer: <b>${q.a.split('').join(', ')}</b>. ${q.e}<div class="row">${sel==ans?'':jumpBtn(q.ch,q.q+' '+q.e+' '+q.o.filter((x,j)=>ans.includes('ABCDE'[j])!==sel.includes('ABCDE'[j])).join(' '),{tab:'past',sec:pastSec,q:n,label:'Back to Past Exam Q'+n})}<button class="btn ghost" onclick="retryPast(${n})">↺ Try again</button></div></div>`}
function retryPast(n){const box=$('#pq'+n);box.querySelectorAll('.eo').forEach(l=>{l.classList.remove('sel','right','wrong','miss');const i=l.querySelector('input');i.checked=false;i.disabled=false});box.querySelectorAll('.why').forEach(x=>x.remove());$('#pv'+n).innerHTML='';$('#pb'+n).disabled=true;delete P[n];delete PS[n];sv();$('#ptally').textContent=pastTally();box.querySelector('input').focus()}
// ---------- practice: type-in questions (answers are checked after normalising spacing, quotes and option spacing; several accepted spellings)
function fillNorm(s,kind,ci){s=String(s).replace(/\r/g,'').split('\n').map(l=>l.trim().replace(/\s+/g,' ')).join('\n').replace(/^\n+|\n+$/g,'').replace(/\n{2,}/g,'\n');
 s=s.replace(/["'`\u201c\u201d\u2018\u2019]/g,'');
 if(kind==='cmd'){s=s.replace(/\s*\|\s*/g,' | ').replace(/\s*(>>?)\s*/g,' $1 ').replace(/(\s-[A-Za-z])\s+(?=[^\s-])/g,'$1').replace(/\s+/g,' ').trim()}
 return ci?s.toLowerCase():s}
function fillOK(q,v){const k=q.kind||'out',u=fillNorm(v,k,q.ci);if(!u)return false;
 return q.a.some(a=>{if(a.startsWith('re:'))return new RegExp(a.slice(3),'i').test(u);return fillNorm(a,k,q.ci)===u})}
function runFill(title,qs,key,host,pills){const st=QP[key]=QP[key]||{r:{}};if(!st.r)st.r={};
 const N=qs.length;
 const tally=()=>{const d=Object.values(st.r).filter(x=>x.done).length,c=Object.values(st.r).filter(x=>x.ok).length;host.querySelector('#qp').textContent=`Answered ${d} of ${N} · ${c} correct`;host.querySelector('#qb').style.width=(d/N*100)+'%'};
 host.innerHTML=`<h2 class="t-h1" style="font-size:20px;margin:30px 0 6px">${title}</h2>${pills||''}<div class="sub">${N} questions · <b>type the answer</b> · extra spaces and quote style are ignored · saved automatically</div><div class="qprog" role="status" aria-live="polite"><span id="qp"></span><i><b id="qb"></b></i><button class="btn ghost sm" id="rs">↺ Start over</button></div><div id="qs"></div>`;
 host.querySelector('#rs').onclick=()=>{delete QP[key];sv();renderPQ(pqSel)};
 const box=host.querySelector('#qs');
 qs.forEach((q,i)=>{const d=document.createElement('div');d.className='exq';const multi=(q.kind||'out')==='out'&&/\n/.test(q.a[0]||'');
  const field=multi?`<textarea id="fa${i}" rows="4" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Your answer to question ${i+1}" style="width:100%;font:14px/1.5 ui-monospace,Consolas,monospace"></textarea>`:`<input id="fa${i}" type="text" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Your answer to question ${i+1}" style="width:100%;font:14px/1.5 ui-monospace,Consolas,monospace">`;
  d.innerHTML=`<div class="qh"><h2 class="qn">Question ${i+1}</h2><span class="ms">TYPE THE ANSWER</span></div><div class="qt">${q.q}</div>${field}<div class="row"><button class="btn" data-c>Check answer</button><button class="btn ghost" data-s>Show answer</button></div><div class="vd" aria-live="polite"></div>`;
  const inp=d.querySelector('#fa'+i),vd=d.querySelector('.vd');const r=st.r[i];if(r)inp.value=r.v||'';
  const showAns=()=>`<div class="why wy"><b>Accepted answer:</b> ${q.a.filter(a=>!a.startsWith('re:')).slice(0,2).map(a=>`<code>${esc(a).replace(/\n/g,'<br>')}</code>`).join(' or ')||esc(q.a[0])}</div>`;
  const paint=()=>{const r=st.r[i];if(!r||!r.done){vd.innerHTML='';return}
   vd.innerHTML=`<div class="verdict ${r.ok?'ok':'no'}"><b>${r.ok?'✅ Correct.':(r.shown?'Answer revealed.':'❌ Not quite.')}</b> ${q.e||''}${r.ok?'':showAns()}</div>`;inp.classList.toggle('ok',!!r.ok)};
  d.querySelector('[data-c]').onclick=()=>{const ok=fillOK(q,inp.value);st.r[i]={v:inp.value,done:1,ok:ok?1:0};sv();paint();tally()};
  d.querySelector('[data-s]').onclick=()=>{st.r[i]={v:inp.value,done:1,ok:0,shown:1};sv();paint();tally()};
  inp.addEventListener('input',()=>{if(!st.r[i]||!st.r[i].done){st.r[i]={v:inp.value};sv()}});
  if(!multi)inp.addEventListener('keydown',e=>{if(e.key==='Enter')d.querySelector('[data-c]').click()});
  box.appendChild(d);paint()});
 tally();host.scrollTop=0}
// ---------- search
let IDX=null;
function buildIdx(){if(IDX)return;IDX=[];const t=document.createElement('div');
 const clean=h=>h.replace(/<\/(div|p|li|td|th|h\d|span|b|strong)>/g,'$& ');
 D.lessons.forEach(l=>{t.innerHTML=clean(l.html);t.querySelectorAll('.t-section,.case-file').forEach(s=>{if(s.classList.contains('t-section')&&/Real-life case files/.test((s.querySelector('.t-h2')||{}).textContent||''))return;
  const h=s.querySelector('.t-h2,h3,.gt');const nm=s.querySelector('.t-num');let title=(h?h.textContent:'').replace(/\s+/g,' ').trim();if(nm)title=title.replace(nm.textContent,'').trim();
  const text=s.textContent.replace(/\s+/g,' ').trim();if(!title)title='Overview';
  IDX.push({n:l.n,ch:l.title,id:s.id||'',title:(nm?nm.textContent+' ':'')+title,text,lead:((s.querySelector(':scope>p')||{}).textContent||'').replace(/\s+/g,' ').trim()})})});
 D.cards.forEach(c=>{const m=/(\d+)\./.exec(c.f);IDX.push({n:m?+m[1]:1,ch:'Key term',id:'',title:c.t,text:c.d,term:1})})}
function doSearch(){const v=$('#q').value.trim().toLowerCase();const box=$('#sr');if(v.length<2){box.hidden=true;return}
 buildIdx();const terms=v.split(/\s+/);const res=[];
 IDX.forEach(e=>{const tl=e.title.toLowerCase(),x=e.text.toLowerCase();let sc=0;for(const t of terms){const a=tl.includes(t),b=x.split(t).length-1;if(!a&&!b){sc=0;break}sc+=(a?6:0)+Math.min(b,5)}if(sc)res.push({e,sc:sc+(e.term?3:0)})});
 res.sort((a,b)=>b.sc-a.sc);const top=res.slice(0,8);
 box.innerHTML=top.length?top.map((r,i)=>{const e=r.e,x=e.text,p=x.toLowerCase().indexOf(terms[0]);const sn=x.slice(Math.max(0,p-50),p+110);let sh=esc(sn);terms.forEach(t=>{sh=sh.replace(new RegExp('('+t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig'),'<mark>$1</mark>')});
  return `<button role="option" class="sri" data-n="${e.n}" data-id="${e.id}"><span class="srt">${e.term?'🃏 ':''}${esc(e.title)}</span><span class="src">Ch ${e.n} · ${e.term?'key term':esc(e.ch)}</span><span class="srs">…${sh}…</span></button>`}).join(''):'<div class="srn">No matches. Try a different word, or part of a word.</div>';
 box.hidden=false;box.querySelectorAll('.sri').forEach(b=>b.onclick=()=>{const id=b.dataset.id,n=+b.dataset.n;box.hidden=true;$('#q').value='';loadTheory(n,{focus:false});if(id)setTimeout(()=>scrollToId(id),350)})}
// ---------- help / reset / keyboard
function openHelp(){$('#resetbtn').textContent='Reset my progress';$('#resetbtn').dataset.s='';$('#help').showModal()}
function resetAll(){const b=$('#resetbtn');if(b.dataset.s!='1'){b.dataset.s='1';b.textContent='Click again to confirm';setTimeout(()=>{if(b.dataset.s=='1'){b.dataset.s='';b.textContent='Reset my progress'}},4000);return}
 S={};V={};K={};P={};M={};QP={};PS={};PW={};ST={theme:ST.theme,fs:ST.fs};sv();b.textContent='Progress cleared ✓';stat();buildNav();if(tab=='practice')renderPQ(pqSel);if(tab=='past')renderPast(pastSec)}
__L(document,'keydown',e=>{
 const tg=e.target,typing=/INPUT|TEXTAREA|SELECT/.test(tg.tagName)&&tg.type!='checkbox';
 if((e.key=='Enter'||e.key==' ')&&tg.getAttribute&&tg.getAttribute('role')=='button'&&tg.tagName=='DIV'){e.preventDefault();tg.click();return}
 if(e.key=='Escape'){const b=$('#sr');if(!b.hidden){b.hidden=true;$('#q').blur()}toggleNav(false);return}
 if(tg.id=='q'&&(e.key=='ArrowDown'||e.key=='ArrowUp')){const it=$$('#sr .sri');if(!it.length)return;e.preventDefault();const k=it.indexOf(document.activeElement);const nx=e.key=='ArrowDown'?(k+1)%it.length:(k<=0?it.length-1:k-1);it[nx].focus();return}
 if(document.activeElement&&document.activeElement.classList.contains('sri')&&(e.key=='ArrowDown'||e.key=='ArrowUp')){const it=$$('#sr .sri');const k=it.indexOf(document.activeElement);e.preventDefault();if(e.key=='ArrowUp'&&k==0){$('#q').focus()}else it[(k+(e.key=='ArrowDown'?1:-1)+it.length)%it.length].focus();return}
 if(typing||e.ctrlKey||e.metaKey||e.altKey)return;
 if(e.key=='/'){e.preventDefault();$('#q').focus();$('#q').select()}
 else if(e.key=='?'){openHelp()}
 else if(e.key=='t'){toggleTheme()}
 else if(/^[1-9]$/.test(e.key)&&TABS[+e.key-1]){switchTab(TABS[+e.key-1])}
 else if(tab=='theory'&&(e.key=='ArrowRight'||e.key=='ArrowLeft')&&!tg.closest('.toc')){const i=D.lessons.findIndex(x=>x.n==cur),j=i+(e.key=='ArrowRight'?1:-1);if(D.lessons[j])loadTheory(D.lessons[j].n)}
});
$('#q').addEventListener('input',doSearch);$('#q').addEventListener('focus',doSearch);
__L(document,'click',e=>{if(!e.target.closest('.searchbox'))$('#sr').hidden=true});
__L(window,'pagehide',()=>{try{sv()}catch(e){}});
function fitH(){const h=(window.visualViewport?visualViewport.height*visualViewport.scale:innerHeight);document.documentElement.style.setProperty('--app-h',Math.round(h)+'px')}
fitH();__L(window,'resize',fitH);__L(window,'orientationchange',fitH);if(window.visualViewport)__L(window.visualViewport,'resize',fitH);
function pressFx(el){if(!el||el.disabled||el.matches('[aria-disabled=true]'))return;el.classList.remove('pressed');void el.offsetWidth;el.classList.add('pressed');clearTimeout(el._pf);el._pf=setTimeout(()=>el.classList.remove('pressed'),480)}
const PRESS='button,.eo,.bp-card,summary,.sri,.toc a,.pq-ctx,label.btn';
__L(document,'pointerdown',e=>{const el=e.target.closest(PRESS);if(el)pressFx(el)},{passive:true});
__L(document,'keydown',e=>{if(e.key==='Enter'||e.key===' '){const el=e.target.closest&&e.target.closest(PRESS);if(el)pressFx(el)}});
function anim(el,cls){if(!el)return;['scr-in','scr-r','scr-l'].forEach(k=>el.classList.remove(k));void el.offsetWidth;el.classList.add(cls||'scr-in');clearTimeout(el._an);el._an=setTimeout(()=>el.classList.remove('scr-in','scr-r','scr-l'),450)}
[['renderPQ','#pqm'],['renderPast','#pastm'],['renderCards','#cardsm'],['renderCheat','#cheatm'],['renderExamHome','#examm'],['startExam','#examm'],['reviewMistakes','#pqm']].forEach(([n,s])=>{const f=window[n];window[n]=function(){const r=f.apply(this,arguments);anim(document.querySelector(s));return r}});
// ---------- init
(function(){let t=ST.theme;if(!t)t=(matchMedia&&matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';applyTheme(t)})();
buildNav();stat();
(function(){CCH=ST.cch||0;const want=ST.tab,wq=ST.pq,wm=ST.pqm,wp=ST.psec;const n=ST.last&&D.lessons.find(x=>x.n==ST.last)?ST.last:1;loadTheory(n,{focus:false});ST.tab=want;ST.pq=wq;ST.pqm=wm;ST.psec=wp;if(ST.yn==n&&ST.y>50)setTimeout(()=>{$('#theory-content').scrollTop=ST.y},350);
if(ST.pqm)pqMode=ST.pqm;if(ST.pq!==undefined&&(ST.pq=='mx'||ST.pq=='sc'||D.lessons.find(x=>x.n==ST.pq)))pqSel=ST.pq;if(ST.psec&&SECS[ST.psec])pastSec=ST.psec;
if(ST.tab&&ST.tab!='theory'&&document.getElementById('tab-'+ST.tab))switchTab(ST.tab,false);
})();
/* auto-fit: shrink short labels a little so they stay on one line where possible */
(function(){
const SEL=[['.gt,.glance .gt',11],['.t-h3',13],['th',10],['.tab .tl',9.5],['.pills button',11.5],['.btn:not(.jump)',11.5],['.badge,.t-tag,.cf-tag,.ms',10],['.core-t,.bp-card-header-title,.road-t,.teach>.tc>b',10],['.t-nav-btn',12],['.theory-item .tt,.pq-item .tt',11.5],['.t-h2',16],['.road .flow span',12],['.dm-t',11.5],['.t-callout>b:first-child,.cf-head h4',13],['summary',13],['.sc,.tq',10]];
function wraps(e){const cs=getComputedStyle(e);if(e.scrollWidth>e.clientWidth+1&&cs.overflowX==='hidden')return true;const fs=parseFloat(cs.fontSize);const w=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(n.textContent.trim().length<2)continue;const r=document.createRange();r.selectNodeContents(n);const t=new Set();for(const x of r.getClientRects()){if(x.width>1)t.add(Math.round(x.top/(fs*.6)))}if(t.size>1)return true}return false}
function fit(e,min){if(e.style.fontSize)e.style.fontSize='';if(!wraps(e))return;let fs=parseFloat(getComputedStyle(e).fontSize);const lo=Math.max(min,fs*.72);const f0=fs;while(fs>lo){fs-=.5;e.style.fontSize=fs+'px';if(!wraps(e))return}if(wraps(e))e.style.fontSize=Math.max(lo,f0*.9)+'px'}
let busy=false,tm=null;
function run(){if(busy)return;busy=true;try{for(const [s,m] of SEL)document.querySelectorAll(s).forEach(e=>{if(e.offsetParent)fit(e,m)})}finally{busy=false}}
function sched(){clearTimeout(tm);tm=setTimeout(()=>requestAnimationFrame(run),90)}
__MO(m=>{if(busy)return;sched()}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden']});
__L(window,'resize',sched);__L(window,'load',sched);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sched);sched();
})();

  
  // ---------- wiki-style cross-links (v2: main topics, one link per topic per section)
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
   cont.querySelectorAll('.t-section,.teach').forEach(s=>{const kids=[...s.children].filter(k=>k.offsetHeight>0&&getComputedStyle(k).position!=='absolute');
    kids.forEach(k=>k.style.removeProperty('grid-column'));
    const tpl=getComputedStyle(s).gridTemplateColumns;if(!tpl||tpl==='none')return;const cols=tpl.split(' ').length;if(cols<2)return;
    const colW=parseFloat(tpl.split(' ')[0]),gap=parseFloat(getComputedStyle(s).columnGap)||0;
    const rows=new Map();kids.forEach(k=>{const key=k.offsetTop;if(!rows.has(key))rows.set(key,[]);rows.get(key).push(k)});
    rows.forEach(list=>{const spans=list.map(k=>Math.max(1,Math.round((k.offsetWidth+gap)/(colW+gap))));const used=spans.reduce((a,b)=>a+b,0);
     if(used<cols){const last=list[list.length-1];last.style.gridColumn='span '+(spans[spans.length-1]+cols-used)}})})}
  var FRT=0;__L(window,'resize',()=>{clearTimeout(FRT);FRT=setTimeout(()=>fillRows(),160)});__undo.push(()=>clearTimeout(FRT));
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
  function wlBarEl(b){const d=document.createElement('div');d.className='backbar';
   const go=document.createElement('button');go.className='bb-go';go.textContent='↩ '+b.label;go.onclick=()=>goBack();
   const x=document.createElement('button');x.className='bb-x';x.textContent='×';x.title='Dismiss';x.setAttribute('aria-label','Dismiss');x.onclick=()=>d.remove();
   d.append(go,x);return d}
  function wlBar(b){const c=$('#theory-content');let bar=c.querySelector(':scope>.backbar');
   if(!b){if(bar)bar.remove();return}
   const nb=wlBarEl(b);if(bar)bar.replaceWith(nb);else c.appendChild(nb)}
  function wlGo(a){const n=+a.dataset.n,id=a.dataset.id,c=$('#theory-content'),l=D.lessons.find(x=>x.n==cur);
   const back=tab!=='theory'?{tab:tab,sel:cur,y:0,label:'Back to the '+(tab==='cheat'?'cheat-sheet':'flashcards'),up:null}:{tab:'theory',sel:cur,y:c.scrollTop,label:'Back to '+(l?wlChap(l):'the previous page'),up:BACK};
   if(n==cur){BACK=back;wlBar(back);if(id)scrollToId(id);else c.scrollTo({top:0,behavior:'smooth'})}
   else{loadTheory(n,{back:back,focus:false});if(id)scrollToId(id,true)}}
  __undo.push(wlHide);
  __L(document,'mouseover',e=>{if(!matchMedia('(hover:hover)').matches)return;const a=e.target.closest&&e.target.closest('a.wl');if(a)wlShow(a);else if(WLTIP&&!(e.target.closest&&e.target.closest('.wl-tip')))wlHide()});
  __L(document,'focusin',e=>{const a=e.target.closest&&e.target.closest('a.wl');if(a&&matchMedia('(hover:hover)').matches)wlShow(a)});
  __L(document,'focusout',e=>{if(e.target.closest&&e.target.closest('a.wl'))wlHide()});
  __L(document,'scroll',wlHide,true);
  __L(document,'keydown',e=>{if(e.key==='Escape')wlHide()});
  __L(document,'click',e=>{const a=e.target.closest&&e.target.closest('a.wl');if(!a)return;e.preventDefault();wlHide();wlGo(a)});

  // expose bindings for inline handlers (onclick="loadTheory(3)", onclick="pqMode='hard'" ...)
  const __names = {
    "KEY": { configurable: true, get: () => KEY,  },
    "S": { configurable: true, get: () => S, set: (v) => { S = v; } },
    "V": { configurable: true, get: () => V, set: (v) => { V = v; } },
    "K": { configurable: true, get: () => K, set: (v) => { K = v; } },
    "P": { configurable: true, get: () => P, set: (v) => { P = v; } },
    "ST": { configurable: true, get: () => ST, set: (v) => { ST = v; } },
    "M": { configurable: true, get: () => M, set: (v) => { M = v; } },
    "QP": { configurable: true, get: () => QP, set: (v) => { QP = v; } },
    "PS": { configurable: true, get: () => PS, set: (v) => { PS = v; } },
    "PW": { configurable: true, get: () => PW, set: (v) => { PW = v; } },
    "ld": { configurable: true, get: () => ld,  },
    "sv": { configurable: true, get: () => sv,  },
    "shuffle": { configurable: true, get: () => shuffle,  },
    "esc": { configurable: true, get: () => esc,  },
    "cur": { configurable: true, get: () => cur, set: (v) => { cur = v; } },
    "tab": { configurable: true, get: () => tab, set: (v) => { tab = v; } },
    "BACK": { configurable: true, get: () => BACK, set: (v) => { BACK = v; } },
    "TABS": { configurable: true, get: () => TABS,  },
    "applyTheme": { configurable: true, get: () => applyTheme, set: (v) => { applyTheme = v; } },
    "toggleTheme": { configurable: true, get: () => toggleTheme, set: (v) => { toggleTheme = v; } },
    "setSize": { configurable: true, get: () => setSize, set: (v) => { setSize = v; } },
    "applySize": { configurable: true, get: () => applySize, set: (v) => { applySize = v; } },
    "switchTab": { configurable: true, get: () => switchTab, set: (v) => { switchTab = v; } },
    "toggleNav": { configurable: true, get: () => toggleNav, set: (v) => { toggleNav = v; } },
    "stat": { configurable: true, get: () => stat, set: (v) => { stat = v; } },
    "sc": { configurable: true, get: () => sc, set: (v) => { sc = v; } },
    "NAVG": { configurable: true, get: () => NAVG, set: (v) => { NAVG = v; } },
    "CCH": { configurable: true, get: () => CCH, set: (v) => { CCH = v; } },
    "groupOf": { configurable: true, get: () => groupOf,  },
    "cardChap": { configurable: true, get: () => cardChap,  },
    "setCCH": { configurable: true, get: () => setCCH, set: (v) => { setCCH = v; } },
    "navItem": { configurable: true, get: () => navItem, set: (v) => { navItem = v; } },
    "chapList": { configurable: true, get: () => chapList,  },
    "hd": { configurable: true, get: () => hd,  },
    "buildNav": { configurable: true, get: () => buildNav, set: (v) => { buildNav = v; } },
    "readMins": { configurable: true, get: () => readMins, set: (v) => { readMins = v; } },
    "loadTheory": { configurable: true, get: () => loadTheory, set: (v) => { loadTheory = v; } },
    "reveal": { configurable: true, get: () => reveal, set: (v) => { reveal = v; } },
    "mm": { configurable: true, get: () => mm, set: (v) => { mm = v; } },
    "stackTables": { configurable: true, get: () => stackTables, set: (v) => { stackTables = v; } },
    "buildToc": { configurable: true, get: () => buildToc, set: (v) => { buildToc = v; } },
    "scrollToId": { configurable: true, get: () => scrollToId, set: (v) => { scrollToId = v; } },
    "pqSel": { configurable: true, get: () => pqSel, set: (v) => { pqSel = v; } },
    "pqMode": { configurable: true, get: () => pqMode, set: (v) => { pqMode = v; } },
    "mCount": { configurable: true, get: () => mCount, set: (v) => { mCount = v; } },
    "renderPQ": { configurable: true, get: () => renderPQ, set: (v) => { renderPQ = v; } },
    "goQuiz": { configurable: true, get: () => goQuiz, set: (v) => { goQuiz = v; } },
    "goBack": { configurable: true, get: () => goBack, set: (v) => { goBack = v; } },
    "nextOf": { configurable: true, get: () => nextOf, set: (v) => { nextOf = v; } },
    "STOP": { configurable: true, get: () => STOP,  },
    "SECIDF": { configurable: true, get: () => SECIDF, set: (v) => { SECIDF = v; } },
    "secTok": { configurable: true, get: () => secTok,  },
    "bestSection": { configurable: true, get: () => bestSection, set: (v) => { bestSection = v; } },
    "jumpBtn": { configurable: true, get: () => jumpBtn, set: (v) => { jumpBtn = v; } },
    "reread": { configurable: true, get: () => reread, set: (v) => { reread = v; } },
    "whyHTML": { configurable: true, get: () => whyHTML,  },
    "qSave": { configurable: true, get: () => qSave, set: (v) => { qSave = v; } },
    "qStatus": { configurable: true, get: () => qStatus, set: (v) => { qStatus = v; } },
    "restart": { configurable: true, get: () => restart, set: (v) => { restart = v; } },
    "runQuiz": { configurable: true, get: () => runQuiz, set: (v) => { runQuiz = v; } },
    "runMulti": { configurable: true, get: () => runMulti, set: (v) => { runMulti = v; } },
    "finishMulti": { configurable: true, get: () => finishMulti, set: (v) => { finishMulti = v; } },
    "reviewMistakes": { configurable: true, get: () => reviewMistakes, set: (v) => { reviewMistakes = v; } },
    "renderExamHome": { configurable: true, get: () => renderExamHome, set: (v) => { renderExamHome = v; } },
    "startExam": { configurable: true, get: () => startExam, set: (v) => { startExam = v; } },
    "shuf": { configurable: true, get: () => shuf, set: (v) => { shuf = v; } },
    "renderCards": { configurable: true, get: () => renderCards, set: (v) => { renderCards = v; } },
    "cardFront": { configurable: true, get: () => cardFront,  },
    "drawCards": { configurable: true, get: () => drawCards, set: (v) => { drawCards = v; } },
    "flip": { configurable: true, get: () => flip, set: (v) => { flip = v; } },
    "mark": { configurable: true, get: () => mark, set: (v) => { mark = v; } },
    "chSel": { configurable: true, get: () => chSel, set: (v) => { chSel = v; } },
    "renderCheat": { configurable: true, get: () => renderCheat, set: (v) => { renderCheat = v; } },
    "pastSec": { configurable: true, get: () => pastSec, set: (v) => { pastSec = v; } },
    "SECS": { configurable: true, get: () => SECS,  },
    "pastTally": { configurable: true, get: () => pastTally, set: (v) => { pastTally = v; } },
    "renderPast": { configurable: true, get: () => renderPast, set: (v) => { renderPast = v; } },
    "selPast": { configurable: true, get: () => selPast, set: (v) => { selPast = v; } },
    "checkPast": { configurable: true, get: () => checkPast, set: (v) => { checkPast = v; } },
    "retryPast": { configurable: true, get: () => retryPast, set: (v) => { retryPast = v; } },
    "IDX": { configurable: true, get: () => IDX, set: (v) => { IDX = v; } },
    "buildIdx": { configurable: true, get: () => buildIdx, set: (v) => { buildIdx = v; } },
    "doSearch": { configurable: true, get: () => doSearch, set: (v) => { doSearch = v; } },
    "openHelp": { configurable: true, get: () => openHelp, set: (v) => { openHelp = v; } },
    "resetAll": { configurable: true, get: () => resetAll, set: (v) => { resetAll = v; } },
    "fitH": { configurable: true, get: () => fitH, set: (v) => { fitH = v; } },
    "pressFx": { configurable: true, get: () => pressFx, set: (v) => { pressFx = v; } },
    "PRESS": { configurable: true, get: () => PRESS,  },
    "anim": { configurable: true, get: () => anim, set: (v) => { anim = v; } },
  };
  for (const k of Object.keys(__names)) {
    try { Object.defineProperty(window, k, __names[k]); } catch (e) {}
  }
  return () => {
    __undo.forEach((f) => { try { f(); } catch (e) {} });
    for (const k of Object.keys(__names)) { try { delete window[k]; } catch (e) {} }
    try { delete window._sv; } catch (e) {}
  };
}
