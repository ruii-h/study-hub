// One-off: re-orders/re-styles the quiz result buttons (one primary action, secondary ghost, tertiary text links).
import fs from 'node:fs';
const OLD_EXAM = "if(key==='exam'){acts=`<button class=\"btn\" onclick=\"restart('exam',()=>startExam(true))\">New random exam</button>${mCount()?`<button class=\"btn ghost\" onclick=\"renderPQ('mx');switchTab('practice')\">🔁 Review my ${mCount()} mistakes</button>`:''}<button class=\"btn ghost\" onclick=\"switchTab('past')\">📝 Try the past-year questions</button>`}";
const NEW_EXAM = "if(key==='exam'){acts=(mCount()?`<button class=\"btn main\" onclick=\"renderPQ('mx');switchTab('practice')\">Review my ${mCount()} mistakes</button><button class=\"btn ghost\" onclick=\"restart('exam',()=>startExam(true))\">Take a new random exam</button>`:`<button class=\"btn main\" onclick=\"restart('exam',()=>startExam(true))\">Take a new random exam</button>`)+(document.querySelector('[data-t=past]')?`<button class=\"btn lnk\" onclick=\"switchTab('past')\">Try the past-year questions</button>`:'')}";
const i0 = "else{acts=`<button class=\"btn\" onclick=\"restart('${n}',()=>renderPQ(${n}))\">Retry (reshuffled)</button>";
const NEW_CH = "else{const pass=p>=80;const rr=`<button class=\"btn lnk\" onclick=\"reread(${n},{tab:'practice',sel:${n},label:'Back to your quiz'})\">Re-read Chapter ${n}</button>`;const rt=`<button class=\"btn lnk\" onclick=\"restart('${n}',()=>renderPQ(${n}))\">Retry this quiz (reshuffled)</button>`;" +
"if(pass){acts=(nx?`<button class=\"btn main\" onclick=\"loadTheory(${nx.n})\">Continue to Chapter ${nx.n}</button><button class=\"btn ghost\" onclick=\"renderPQ(${nx.n})\">Quiz me on Chapter ${nx.n}</button>`:`<button class=\"btn main\" onclick=\"switchTab('exam')\">Take the Final Exam</button>`)+rt+rr}" +
"else{acts=`<button class=\"btn main\" onclick=\"restart('${n}',()=>renderPQ(${n}))\">Retry this quiz (reshuffled)</button><button class=\"btn ghost\" onclick=\"reread(${n},{tab:'practice',sel:${n},label:'Back to your quiz'})\">Re-read Chapter ${n}</button>`+(nx?`<button class=\"btn lnk\" onclick=\"loadTheory(${nx.n})\">Skip ahead to Chapter ${nx.n}</button>`:'')}}";
for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  if (!s.includes(OLD_EXAM)) throw new Error(id + ' exam');
  s = s.replace(OLD_EXAM, () => NEW_EXAM);
  const a = s.indexOf(i0);
  if (a < 0) throw new Error(id + ' ch');
  const endMark = "`You finished! Take the Final Exam →</button>`}`}";
  const b = s.indexOf("You finished! Take the Final Exam →</button>`}`}", a);
  if (b < 0) throw new Error(id + ' end');
  const e = b + "You finished! Take the Final Exam →</button>`}`}".length;
  s = s.slice(0, a) + NEW_CH + s.slice(e);
  s = s.replace("<button class=\"btn\" onclick=\"reviewMistakes()\">", "<button class=\"btn main\" onclick=\"reviewMistakes()\">");
  fs.writeFileSync(f, s);
  console.log(id, 'ok');
}
