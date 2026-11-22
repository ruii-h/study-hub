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
 host.innerHTML=`<h1 class="t-h1" style="font-size:26px">${title}</h1>${pills||''}<div class="sub">${N} questions · <b>type the answer</b> · extra spaces, quote style and the order-free spacing of options are ignored · saved automatically</div><div class="qprog" role="status" aria-live="polite"><span id="qp"></span><i><b id="qb"></b></i><button class="btn ghost sm" id="rs">↺ Start over</button></div><div id="qs"></div>`;
 host.querySelector('#rs').onclick=()=>{delete QP[key];sv();renderPQ(pqSel)};
 const box=host.querySelector('#qs');
 qs.forEach((q,i)=>{const d=document.createElement('div');d.className='exq';const multi=(q.kind||'out')==='out'&&/\n/.test(q.a[0]||'');
  const field=multi?`<textarea id="fa${i}" rows="4" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Your answer to question ${i+1}" style="width:100%;font:14px/1.5 ui-monospace,Consolas,monospace"></textarea>`:`<input id="fa${i}" type="text" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Your answer to question ${i+1}" style="width:100%;font:14px/1.5 ui-monospace,Consolas,monospace">`;
  d.innerHTML=`<div class="qh"><h2 class="qn">Question ${i+1}</h2><span class="ms">TYPE THE ANSWER</span></div><div class="qt">${q.q}</div>${field}<div class="row"><button class="btn" data-c>Check answer</button><button class="btn ghost" data-s>Show answer</button></div><div class="vd" aria-live="polite"></div>`;
  const inp=d.querySelector('#fa'+i),vd=d.querySelector('.vd');const r=st.r[i];if(r)inp.value=r.v||'';
  const showAns=()=>`<div class="why wy"><b>Accepted answer:</b> ${q.a.filter(a=>!a.startsWith('re:')).slice(0,2).map(a=>`<code>${esc(a).replace(/\n/g,'<br>')}</code>`).join(' or ')||esc(q.a[0])}</div>`;
  const paint=()=>{const r=st.r[i];if(!r||!r.done){vd.innerHTML='';return}
   vd.innerHTML=`<div class="verdict ${r.ok?'ok':'no'}"><b>${r.ok?'✅ Correct.':(r.shown?'Answer revealed.':'❌ Not quite.')}</b> ${q.e||''}${r.ok?'':showAns()}</div>`;inp.classList.toggle('ok',!!r.ok)};
  d.querySelector('[data-c]').onclick=()=>{const ok=fillOK(q,inp.value);st.r[i]={v:inp.value,done:1,ok:ok?1:0};if(ok)delete M['t'+key+'-'+i];else M['t'+key+'-'+i]=null,delete M['t'+key+'-'+i];sv();paint();tally()};
  d.querySelector('[data-s]').onclick=()=>{st.r[i]={v:inp.value,done:1,ok:0,shown:1};sv();paint();tally()};
  inp.addEventListener('input',()=>{if(!st.r[i]||!st.r[i].done){st.r[i]={v:inp.value};sv()}});
  if(!multi)inp.addEventListener('keydown',e=>{if(e.key==='Enter')d.querySelector('[data-c]').click()});
  box.appendChild(d);paint()});
 tally();host.scrollTop=0}
