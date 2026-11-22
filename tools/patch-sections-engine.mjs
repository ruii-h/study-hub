// One-off: adds the grouped exam-section quizzes (A, B, C and a wrap-up set) to the IDP engine.
import fs from 'node:fs';
const f = 'src/courses/idp/engine.js';
let s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  if (!s.includes(a)) throw new Error('missing: ' + a.slice(0, 70));
  s = s.replace(a, () => b);
}

// 1. section definitions + pool + runner
rep("let pqMode='hard';",
`let pqMode='hard';
/* exam sections: chapters pooled the way the exam groups them; each run draws n questions (the exam has 20 per section) */
const SECDEF={
 A:{t:'Section A · Empathy to evaluating designs',s:'Section A',chs:[2,3,4,5,13],n:20,d:'Empathy, requirements, ideation, prototypes and evaluating designs'},
 B:{t:'Section B · Models, cognition, input and interface design',s:'Section B',chs:[6,7,8,9,10,11,16],n:20,d:'Interaction models, memory, input, mobile, information design, visual design (incl. Gestalt) and UI tools'},
 C:{t:'Section C · Evaluation methods, experiments and analysis',s:'Section C',chs:[12,14,15,17,18,19],n:20,d:'Inspection, qualitative analysis, laboratory studies, web experiments, designing experiments and quantitative analysis'},
 D:{t:'Wrap-up · Introduction, presenting, review and AI',s:'Wrap-up',chs:[1,20,21,22,23],n:0,d:'Chapters with fewer than five exam-style questions each, grouped into one set'}};
function secPool(k){const d=SECDEF[k];const all=[];d.chs.forEach(n=>(D.hard[n]||[]).forEach((q,i)=>all.push({...q,id:'h'+n+'-'+i,ch:n})));((D.secq||{})[k]||[]).forEach((q,i)=>all.push({...q,id:'s'+k+'-'+i}));return all}
function secBadge(k){const st=qStatus('sec'+k);return st?\`<span class="tq sc \${st.done?'ok':'mid'}">\${st.a}/\${st.n}</span>\`:''}
function renderSection(k){const d=SECDEF[k],key='sec'+k,pool=secPool(k),by={};pool.forEach(q=>by[q.id]=q);
 let list=null;const st=QP[key];
 if(st){list=st.ord.map(x=>by[x.id]).filter(Boolean);if(list.length!=st.ord.length){delete QP[key];list=null}}
 if(!list){delete QP[key];list=d.n?shuffle(pool).slice(0,d.n):pool.slice()}
 const chn=d.chs.map(n=>D.lessons.find(x=>x.n==n).title).join(' · ');
 runMulti(d.t,list,key,$('#pqm'),\`<div class="sub">\${d.d}. Pool of \${pool.length} questions from: \${chn}.\${d.n?\` Each set draws \${d.n} at random, like the exam.\`:''}</div>\`)}`);

// 2. practice list (mobile) + nav (desktop)
rep("h+=`<button class=\"pq-item ${sel=='mx'?'active':''}\" onclick=\"renderPQ('mx')\"><span class=\"tn\">🔁</span><span class=\"tt\">Review my mistakes</span>${mCount()?`<span class=\"sc lo\">${mCount()}</span>`:''}</button>`;",
 "h+=`<button class=\"pq-item ${sel=='mx'?'active':''}\" onclick=\"renderPQ('mx')\"><span class=\"tn\">🔁</span><span class=\"tt\">Review my mistakes</span>${mCount()?`<span class=\"sc lo\">${mCount()}</span>`:''}</button>`;\n h+=`<div class=\"pq-head\">EXAM SECTIONS</div>`+Object.keys(SECDEF).map(k=>`<button class=\"pq-item ${sel==k?'active':''}\" onclick=\"renderPQ('${k}')\"><span class=\"tn\">${k}</span><span class=\"tt\">${SECDEF[k].t.replace(/^[^·]*· /,'')}</span>${secBadge(k)}</button>`).join('')+`<div class=\"pq-head\">BY CHAPTER</div>`;");
rep("m=hd('Chapter quizzes')+navItem('🔁','','Review my mistakes',pqSel=='mx',\"renderPQ('mx');toggleNav(false)\",mCount()?`<span class=\"tq sc lo\">${mCount()}</span>`:'')+chapList(",
 "m=hd('Chapter quizzes')+navItem('🔁','','Review my mistakes',pqSel=='mx',\"renderPQ('mx');toggleNav(false)\",mCount()?`<span class=\"tq sc lo\">${mCount()}</span>`:'')+hd('Exam sections')+Object.keys(SECDEF).map(k=>navItem('🎯',k,SECDEF[k].t.replace(/^[^·]*· /,''),pqSel==k,`renderPQ('${k}');toggleNav(false)`,secBadge(k))).join('')+hd('By chapter')+chapList(");

// 3. routing
rep("if(sel=='mx'){reviewMistakes();return}\n const l=D.lessons.find(x=>x.n==sel);", "if(sel=='mx'){reviewMistakes();return}\n if(SECDEF[sel]){renderSection(sel);return}\n const l=D.lessons.find(x=>x.n==sel);");
rep("(ST.pq=='mx'||ST.pq=='sc'||D.lessons.find(x=>x.n==ST.pq))", "(ST.pq=='mx'||ST.pq=='sc'||SECDEF[ST.pq]||D.lessons.find(x=>x.n==ST.pq))");
rep("renderPQ(b.sel=='mx'?'mx':+b.sel)", "renderPQ(b.sel=='mx'?'mx':/^sec/.test(b.sel)?b.sel.slice(3):+b.sel)");
rep("if(key==='exam')startExam(true);else renderPQ(+key)", "if(key==='exam')startExam(true);else renderPQ(/^sec/.test(key)?key.slice(3):+key)");

// 4. results: no chapter score for section runs; next-step buttons
rep("if(key!=='mx'&&key!=='exam'){S[key]={s:score,t:N};sv();buildNav()}", "if(key!=='mx'&&key!=='exam'&&!/^sec/.test(key)){S[key]={s:score,t:N};sv()}buildNav();");
rep("const p=Math.round(score/N*100);const n=+key;const nx=nextOf(n);", "const p=Math.round(score/N*100);const n=+key;const nx=isNaN(n)?null:nextOf(n);");
rep("else if(key==='mx'){", "else if(/^sec/.test(key)){const k=key.slice(3),nk={A:'B',B:'C',C:'D'}[k],again=`restart('${key}',()=>renderPQ('${k}'))`,rv=mCount()?`<button class=\"btn ghost\" onclick=\"renderPQ('mx')\">Review my ${mCount()} mistakes</button>`:'';acts=(p>=80&&nk?`<button class=\"btn main\" onclick=\"renderPQ('${nk}')\">Continue to ${SECDEF[nk].s}</button>${rv}<button class=\"btn lnk\" onclick=\"${again}\">Try a new set of questions</button>`:`<button class=\"btn main\" onclick=\"${again}\">Try a new set of questions</button>${rv}`)}\n else if(key==='mx'){");
fs.writeFileSync(f, s);
console.log('ok');
