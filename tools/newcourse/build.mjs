// Builds src/courses/<id>/{data.json,engine.js,shell.html,style.css} for a new study guide (IS114, IS1704)
// from the author's notes (markdown) plus the hand-written chapter extras in tools/newcourse/<id>/*.mjs.
// Usage: node tools/newcourse/build.mjs cf|ctp
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { clean, esc, mdToHtml, makeMarked, stripEmoji } from './md.mjs';

const id = process.argv[2];
if (!id) throw new Error('usage: build.mjs <course id>');
const root = path.resolve(import.meta.dirname, '..', '..');
const dir = path.join(root, 'tools', 'newcourse', id);
const out = path.join(root, 'src', 'courses', id);
fs.mkdirSync(out, { recursive: true });
const { default: C } = await import(pathToFileURL(path.join(dir, 'course.mjs')).href);
const inline = makeMarked();
const il = (s) => inline.parseInline(s).replace(/<strong class="k-c">/g, '<strong class="k-c">');

// ---------- chapters: notes -> sections ----------
const chapters = [];
const refMap = {};
const raw = C.chapters.map((ch) => ({ ch, secs: ch.sections() }));
raw.forEach(({ ch, secs }) => {
  refMap['P' + ch.label] = ch.n;
  let k = 0;
  secs.forEach((s) => { if (!s.unnumbered) { s.m = ++k; if (s.label) refMap[s.label] = `${ch.n}.${s.m}`; } });
});
const fixTitle = (t) => (C.titleFix ? C.titleFix(t) : t).replace(/\s*`\[[^\]]*\]`/g, '');
const bq = (s) => (C.codeQuestions ? s.replace(/`([^`]+)`/g, (m, a) => '<code>' + esc(a) + '</code>') : s);
const SKIP_Q = /^(Quick examples|Flip to recall)/;

function chapterHtml(ch, secs) {
  const h = [];
  const titles = secs.filter((s) => !s.unnumbered).map((s) => ({ m: s.m, t: stripEmoji(fixTitle(s.title)).replace(/`/g, '') }));
  h.push(`<div class="teach"><div class="tc why"><b>💡 Why it matters</b>${il(ch.why)}</div><div class="tc hook"><b>🧠 Memory hook</b>${il(ch.hook)}</div></div>`);
  h.push(`<div class="road"><div class="road-t">🗺️ Roadmap of this chapter</div><div class="flow">${titles.map((x, i) => `${i ? '<i>→</i>' : ''}<span><b>${x.m}</b>${esc(x.t.length > 46 ? x.t.slice(0, 44) + '…' : x.t)}</span>`).join('')}</div></div>`);
  h.push(`<div class="glance"><div class="gt">⚡ At a glance — ${il(ch.glance[0])}</div><div class="flow">${ch.glance[1].map((x, i) => `${i ? '<i>→</i>' : ''}<span>${il(x)}</span>`).join('')}</div></div>`);
  if (ch.names) {
    h.push(`<div class="t-section names reveal"><div aria-level="2" class="t-h2" role="heading">🔤 Exact names — know these word for word</div>${ch.namesNote ? `<div class="sub">${il(ch.namesNote)}</div>` : ''}<div class="t-table-wrap" tabindex="0"><table class="t-mini-table"><thead><tr><th>Exact name</th><th>What it does</th><th>How to tell it apart</th></tr></thead><tbody>${ch.names.map((r) => `<tr><td><b>${il(r[0])}</b></td><td>${il(r[1])}</td><td>${il(r[2])}</td></tr>`).join('')}</tbody></table></div></div>`);
  }
  secs.forEach((s) => {
    const body = mdToHtml(clean(s.md, refMap));
    if (s.unnumbered) h.push(`<div class="t-section reveal"><div aria-level="2" class="t-h2" role="heading">${s.title}</div>${body}</div>`);
    else h.push(`<div class="t-section reveal" id="s${ch.n}-${s.m}"><div aria-level="2" class="t-h2" role="heading"><span class="t-num">${ch.n}.${s.m}</span>${il(stripEmoji(fixTitle(s.title)))}</div>${body}</div>`);
    if (ch.recall && ch.recall[0] === s.m) h.push(`<details class="recall"><summary>🧩 Pause &amp; recall — ${il(ch.recall[1])}</summary><div class="ans"><b>Answer:</b> ${il(ch.recall[2])}</div></details>`);
  });
  if (ch.cases && ch.cases.length) {
    h.push(`<div class="t-section"><div aria-level="2" class="t-h2" role="heading">${ch.casesTitle || '🧪 Worked examples'}</div><div class="sub">${ch.casesSub || 'Work through these by hand before you read the answer.'}</div>${ch.cases.map((c) => `<div class="case-file reveal"><div class="cf-head"><span class="cf-tag">${esc(c.tag)}</span><h3>${il(c.title)}</h3></div><div class="cf-row s"><b>${esc(c.lab?.[0] || 'The setting')}</b>${mdToHtml(c.s)}</div><div class="cf-row w"><b>${esc(c.lab?.[1] || 'What happened')}</b>${mdToHtml(c.w)}</div><div class="cf-row l"><b>${esc(c.lab?.[2] || 'The lesson')}</b><p>${il(c.l)}</p></div></div>`).join('')}</div>`);
  }
  h.push(`<div class="t-section reveal"><div aria-level="2" class="t-h2" role="heading">⚡ Quick examples</div>${ch.quick.map((q) => `<div class="core"><div class="core-t">${il(q[0])}</div><div class="cc-row"><div class="cc p"><b>Point</b>${il(q[1])}</div><div class="cc e"><b>Example</b>${il(q[2])}</div><div class="cc w"><b>Explanation</b>${il(q[3])}</div></div></div>`).join('')}</div>`);
  h.push(`<div class="t-section reveal"><div aria-level="2" class="t-h2" role="heading">✅ This chapter in 30 seconds</div><ul class="checks">${ch.checks.map((c) => `<li>${il(c)}</li>`).join('')}</ul></div>`);
  const fc = ch.cards.slice(0, 6);
  h.push(`<div class="t-section"><div aria-level="2" class="t-h2" role="heading">🃏 Flip to recall</div><div class="sub">Say the answer out loud first, then tap the card.</div><div class="fcards">${fc.map((c) => `<div class="fcard" role="button" tabindex="0" aria-label="Flashcard: ${esc(c[0].replace(/<[^>]+>/g, ''))}. Press Enter to flip." onclick="this.classList.toggle('flip')"><div class="fi"><div class="ff"><span>${il(c[0])}</span><em>tap to flip</em></div><div class="fb">${il(c[1])}</div></div></div>`).join('')}</div></div>`);
  h.push(`<div class="bridge"><b>➡ Where next?</b> ${il(ch.bridge)}</div>`);
  return h.join('');
}

const iceBlock = (ch) => `<div class="t-section"><div aria-level="2" class="t-h2" role="heading"><span class="t-num">${ch.n}</span>${esc(ch.title)}</div>${ch.exr.map((e, i) => `<div class="exr"><div class="exr-q"><span class="exr-n">${i + 1}</span><div>${mdToHtml(clean(e[0])).replace(/^<p>|<\/p>\s*$/g, '')}</div></div><details class="model"><summary>Show answer</summary><div class="ma">${mdToHtml(clean(e[1]))}</div></details></div>`).join('')}</div>`;
const D = { ice: '', hard: {}, lessons: [], groups: C.groups, quiz: {}, cards: [], selfq: C.selfq ? C.selfq(refMap) : '', exam: { mcq: [], wr: [] } };
const problems = [];
raw.forEach(({ ch, secs }) => {
  const meta = C.meta[ch.n];
  if (!meta) { problems.push('no meta for chapter ' + ch.n); return; }
  const m = { ...ch, ...meta };
  if (m.exr && m.exr.length) D.ice += iceBlock(m);
  D.lessons.push({ n: ch.n, title: ch.title, tag: ch.tag, icon: ch.icon, goal: m.goal, subtitle: m.goal, html: chapterHtml(m, secs) });
  // flashcards: [term, definition, section number]
  m.cards.forEach((c) => {
    const sec = secs.filter((s) => !s.unnumbered)[c[2] - 1];
    if (!sec) problems.push(`ch${ch.n} card "${c[0]}" -> section ${c[2]} missing`);
    D.cards.push({ t: bq(c[0]), d: bq(c[1]), f: `§${ch.n}.${c[2]}` });
  });
  // warm-up: [stem, correct, [3 wrong 'text :: why'], explanation]; correct answer position rotates so it is not always first
  D.quiz[ch.n] = m.warm.map((q, i) => {
    const wrong = q[2].map((x) => x.split(' :: ').map(bq));
    const pos = (ch.n + i) % 4;
    const o = [...wrong.map((x) => x[0])]; o.splice(pos, 0, bq(q[1]));
    const w = wrong.map((x) => x[1] || null); w.splice(pos, 0, null);
    if (wrong.length !== 3 || wrong.some((x) => !x[1])) problems.push(`ch${ch.n} warm#${i} needs 3 wrong options with reasons`);
    return { q: bq(q[0]), o, c: pos, e: bq(q[3]), w };
  });
  // exam-style: [stem, ['text :: reason' x5], 'ACE', explanation]
  D.hard[ch.n] = m.hard.map((q, i) => {
    const tag = `ch${ch.n} hard#${i}`;
    const [stem0, opts0, a, e0] = q;
    const stem = bq(stem0), opts = opts0.map(bq), e = bq(e0);
    if (opts.length !== 5) problems.push(tag + ' needs 5 options');
    if (!/^[A-E]{1,4}$/.test(a) || new Set(a).size !== a.length) problems.push(tag + ' bad key ' + a);
    const o = opts.map((x) => x.split(' :: ')[0]);
    const w = opts.map((x, j) => {
      const r = x.split(' :: ');
      if (!r[1]) problems.push(`${tag} option ${'ABCDE'[j]} has no reason`);
      return (a.includes('ABCDE'[j]) ? 'True: ' : 'False: ') + (r[1] || '');
    });
    return { q: stem, o, a, e, w };
  });
  if (D.hard[ch.n].length < 10) problems.push(`ch${ch.n} has ${D.hard[ch.n].length} exam-style questions (need 10)`);
});
if (C.exam) { D.exam = C.exam(refMap); }
Object.assign(D, C.extra || {});
if (C.selfq && D.selfq) D.selfn = C.selfq.count;
if (problems.length) { console.error('PROBLEMS:\n' + problems.join('\n')); process.exit(1); }

fs.writeFileSync(path.join(out, 'data.json'), JSON.stringify(D));
console.log(id, 'chapters', D.lessons.length, 'cards', D.cards.length, 'hard', Object.values(D.hard).flat().length, 'warm', Object.values(D.quiz).flat().length, 'html KB', Math.round(D.lessons.reduce((a, l) => a + l.html.length, 0) / 1024));

// ---------- shell, style, engine ----------
const idp = path.join(root, 'src', 'courses', 'idp');
let shell = fs.readFileSync(path.join(idp, 'shell.html'), 'utf8').replace(/\r/g, '');
shell = shell.replace(/<div class="logo">IS211<span>/, `<div class="logo">${C.code}<span>`).replace(/<div class="badge">\d+ CHAPTERS<\/div>/, `<div class="badge">${D.lessons.length} CHAPTERS</div>`)
  .replace(/<div class="course">[^<]*<\/div>/, `<div class="course">${C.code} ${C.title.replace(/&/g, '&amp;')}</div>`)
  .replace(/aria-valuemax="\d+"/, `aria-valuemax="${D.lessons.length}"`);
const hasPast = !!C.hasPast;
const hasIce = !!D.ice;
if (hasIce) {
  shell = shell.replace(/( <button class="tab"[^\n]*data-t="cheat"[^\n]*<\/button>\n)/, '$1 <button class="tab" role="tab" aria-selected="false" data-t="ice" onclick="switchTab(\'ice\')"><span class="ti">✏️</span><span class="tl">ICE<span class="x"> Exercises</span></span></button>\n');
  shell = shell.replace(/(<div class="tab-view" id="tab-cheat"[^\n]*<\/div>\n)/, '$1<div class="tab-view" id="tab-ice" role="tabpanel"><div class="pane" id="icem" tabindex="0"></div></div>\n');
}
const nTabs = 5 + (hasPast ? 1 : 0) + (hasIce ? 1 : 0);
if (!hasPast) {
  shell = shell.replace(/ <button class="tab"[^\n]*data-t="past"[^\n]*<\/button>\n/, '').replace(/<div class="tab-view" id="tab-past"[^\n]*<\/div>\n/, '');
  shell = shell.replace('<kbd>1</kbd>–<kbd>6</kbd>', '<kbd>1</kbd>–<kbd>5</kbd>');
}
fs.writeFileSync(path.join(out, 'shell.html'), shell);
fs.writeFileSync(path.join(out, 'style.css'), fs.readFileSync(path.join(idp, 'style.css'), 'utf8') + String.fromCharCode(10) + fs.readFileSync(path.join(root, 'tools', 'newcourse', 'exr.css'), 'utf8'));

let eng = fs.readFileSync(path.join(idp, 'engine.js'), 'utf8').replace(/\r/g, '');
const must = (a, b) => { if (!eng.includes(a)) throw new Error('engine pattern missing: ' + a.slice(0, 60)); eng = eng.replace(a, b); };
eng = eng.replace(/^\/\/ Generated by .*\n/, `// Study guide engine for ${C.code} ${C.title}. Same engine as the IS211/IS210/IS115 guides (wiki-links, back bar, practice groups, flashcards, exams),\n// with the section groups, past-exam sections and storage key supplied by the course data.\n`);
must("const KEY='idp6_'", `const KEY='${C.key}'`);
must("const TABS=['theory','practice','cards','cheat','past','exam'];", "const TABS=['theory','practice','cards','cheat'" + (hasIce ? ",'ice'" : '') + (hasPast ? ",'past'" : '') + ",'exam'];");
if (hasIce) {
  must("if(t=='cheat')renderCheat();", "if(t=='cheat')renderCheat();if(t=='ice')renderIce();");
  must("// ---------- cards", "function renderIce(){buildNav();$('#icem').innerHTML='<h1 class=\"t-h1\" style=\"font-size:26px\">In-class exercises (ICE)</h1><div class=\"sub\">Exercises from the weekly in-class sessions, grouped by chapter. Attempt each one first, then open the answer. Lab exercises are not included: they are meant to be run against test cases.</div>'+D.ice;$('#icem').scrollTop=0}\n// ---------- cards");
}
// IDP-only colour-contrast demo
eng = eng.replace(/const dm=\{[\s\S]*?\n\};\n/, '');
must('if($(\'#dmCr\'))dm.cc();', '');
must('    "dm": { configurable: true, get: () => dm,  },\n', '');
// practice groups come from the data (exam sections)
eng = eng.replace(/const PQG=\[.*\];\n/, 'const PQG=D.pqg;\n');
must("<div class=\"t-tag ${l.tag}\">Lecture ${n} of", "<div class=\"t-tag ${l.tag}\">Chapter ${n} of");
must("+navItem('📝','','Self-check Q&amp;A',pqSel=='sc',\"renderPQ('sc');toggleNav(false)\")}", "+(D.selfq?navItem('📝','','Self-check Q&amp;A',pqSel=='sc',\"renderPQ('sc');toggleNav(false)\"):'')}");
must("h+=`<button class=\"pq-item ${sel=='sc'?'active':''}\" onclick=\"renderPQ('sc')\"><span class=\"tn\">📝</span><span class=\"tt\">Self-check Q&amp;A (48)</span></button>`;", "if(D.selfq)h+=`<button class=\"pq-item ${sel=='sc'?'active':''}\" onclick=\"renderPQ('sc')\"><span class=\"tn\">📝</span><span class=\"tt\">Self-check Q&amp;A (${D.selfn||''})</span></button>`;");
must("like the past paper. Your progress", hasPast ? "like the past papers. Your progress" : "from every chapter. Your progress");
if (!hasPast) {
  must("<button class=\"btn ghost\" onclick=\"switchTab('past')\">📝 Past-year questions</button></div>`}", "</div>`}");
} else {
  // past exam: sections, note and the label for single-answer questions come from the data
  eng = eng.replace(/let pastSec='A';const SECS=\{.*\};\n/, "let pastSec=Object.keys(D.secs)[0];const SECS=D.secs;\n");
  must("these are the questions you transcribed (73 in total). Your file has <b>no answer key</b>, so the answers and model answers below are <b>my own, worked out from the course notes</b>. Use them as a study aid; if your lecturer or a marked paper disagrees, trust that. Where I am less sure, the explanation says so. Multiple-select questions need <b>all</b> the right options and none of the wrong ones.", "'+D.pastNote+'");
  must("<h2 class=\"qn\">Question ${q.n}</h2><span class=\"ms\">SELECT ALL THAT APPLY</span></div><div class=\"qt\">${q.q}</div><div role=\"group\" aria-label=\"Options for question ${q.n}\">`+q.o", "<h2 class=\"qn\">Question ${q.n}</h2><span class=\"ms\">${D.pastSingle?'CHOOSE THE BEST ANSWER':'SELECT ALL THAT APPLY'}</span></div><div class=\"qt\">${q.q}</div><div role=\"group\" aria-label=\"Options for question ${q.n}\">`+q.o");
  // solution toggle for the past exam
  const sol = fs.readFileSync(path.join(root, 'tools', 'newcourse', 'past-solution.js'), 'utf8');
  must('// ---------- search', sol + '// ---------- search');
  must('<div class="pills" role="group" aria-label="Exam sections">', '\'+solPills()+\'<div class="pills" role="group" aria-label="Exam sections">');
  must('D.exam.mcq.filter(q=>q.n>=a&&q.n<=b&&PS[q.n]!==undefined).forEach(', 'D.exam.mcq.filter(q=>!ST.psol&&q.n>=a&&q.n<=b&&PS[q.n]!==undefined).forEach(');
  must('ST.psec=sec;sv()}', 'applySol(a,b);ST.psec=sec;sv()}');
  must('const __names = {\n', 'const __names = {\n    "setPsol": { configurable: true, get: () => setPsol },\n');
  eng = eng.replace(/Question \$\{q\.n\}/g, 'Question ${q.no||q.n}');
  must("Q${SECS[k][0]}–${SECS[k][1]}", "${SECS[k][3]||'Q'+SECS[k][0]+'–'+SECS[k][1]}");
}
must("else if(/^[1-6]$/.test(e.key)){switchTab(TABS[+e.key-1])}", `else if(/^[1-${nTabs}]$/.test(e.key)){switchTab(TABS[+e.key-1])}`);
// the header comment and API
fs.writeFileSync(path.join(out, 'engine.js'), eng);
console.log('engine written', eng.length);
