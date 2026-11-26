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
  const T = C.template || {};
  if (T.teach === 'intro') h.push(`<div class="t-section reveal"><p>${il(ch.intro || ch.goal)}</p></div>`);
  else if (T.teach === 'why') h.push(`<div class="teach"><div class="tc why"><b>💡 Overview</b>${il(ch.why)}</div></div>`);
  else h.push(`<div class="teach"><div class="tc why"><b>💡 Why it matters</b>${il(ch.why)}</div><div class="tc hook"><b>🧠 Memory hook</b>${il(ch.hook)}</div></div>`);
  h.push(`<div class="road"><div class="road-t">🗺️ Roadmap of this chapter</div><div class="flow">${titles.map((x, i) => `${i ? '<i>→</i>' : ''}<span><b>${x.m}</b>${esc(x.t.length > 46 ? x.t.slice(0, 44) + '…' : x.t)}</span>`).join('')}</div></div>`);
  if (T.glance !== false) h.push(`<div class="glance"><div class="gt">⚡ At a glance — ${il(ch.glance[0])}</div><div class="flow">${ch.glance[1].map((x, i) => `${i ? '<i>→</i>' : ''}<span>${il(x)}</span>`).join('')}</div></div>`);
  if (ch.names) {
    h.push(`<div class="t-section names reveal"><div aria-level="2" class="t-h2" role="heading">${T.namesTitle ? esc(T.namesTitle) : '🔤 Exact names — know these word for word'}</div>${ch.namesNote ? `<div class="sub">${il(ch.namesNote)}</div>` : ''}<div class="t-table-wrap" tabindex="0"><table class="t-mini-table"><thead><tr>${(T.namesCols || ['Exact name', 'What it does', 'How to tell it apart']).map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${ch.names.map((r) => `<tr><td><b>${il(r[0])}</b></td><td>${il(r[1])}</td><td>${il(r[2])}</td></tr>`).join('')}</tbody></table></div></div>`);
  }
  secs.forEach((s) => {
    const body = (ch.leads && ch.leads[s.m] ? `<p class="lead">${il(ch.leads[s.m])}</p>` : '') + mdToHtml(clean(s.md, refMap));
    if (s.unnumbered) h.push(`<div class="t-section reveal"><div aria-level="2" class="t-h2" role="heading">${s.title}</div>${body}</div>`);
    else h.push(`<div class="t-section reveal" id="s${ch.n}-${s.m}"><div aria-level="2" class="t-h2" role="heading"><span class="t-num">${ch.n}.${s.m}</span>${il(stripEmoji(fixTitle(s.title)))}</div>${body}</div>`);
    if (ch.recall && ch.recall[0] === s.m) h.push(`<details class="recall"><summary>🧩 Pause &amp; recall — ${il(ch.recall[1])}</summary><div class="ans"><b>Answer:</b> ${il(ch.recall[2])}</div></details>`);
  });
  if (ch.cases && ch.cases.length) {
    h.push(`<div class="t-section"><div aria-level="2" class="t-h2" role="heading">${ch.casesTitle || '🧪 Worked examples'}</div><div class="sub">${ch.casesSub || 'Work through these by hand before you read the answer.'}</div>${ch.cases.map((c) => `<div class="case-file reveal"><div class="cf-head"><span class="cf-tag">${esc(c.tag)}</span><h3>${il(c.title)}</h3></div><div class="cf-row s"><b>${esc(c.lab?.[0] || 'The setting')}</b>${mdToHtml(c.s)}</div><div class="cf-row w"><b>${esc(c.lab?.[1] || 'What happened')}</b>${mdToHtml(c.w)}</div><div class="cf-row l"><b>${esc(c.lab?.[2] || 'The lesson')}</b><p>${il(c.l)}</p></div></div>`).join('')}</div>`);
  }
  if (T.quick !== false) h.push(`<div class="t-section reveal"><div aria-level="2" class="t-h2" role="heading">⚡ Quick examples</div>${ch.quick.map((q) => `<div class="core"><div class="core-t">${il(q[0])}</div><div class="cc-row"><div class="cc p"><b>Point</b>${il(q[1])}</div><div class="cc e"><b>Example</b>${il(q[2])}</div><div class="cc w"><b>Explanation</b>${il(q[3])}</div></div></div>`).join('')}</div>`);
  h.push(`<div class="t-section reveal"><div aria-level="2" class="t-h2" role="heading">${T.summaryTitle ? esc(T.summaryTitle) : '✅ This chapter in 30 seconds'}</div><ul class="checks">${ch.checks.map((c) => `<li>${il(c)}</li>`).join('')}</ul></div>`);
  const fc = ch.cards.slice(0, 6);
  h.push(`<div class="t-section"><div aria-level="2" class="t-h2" role="heading">🃏 Flip to recall</div><div class="sub">Say the answer out loud first, then tap the card.</div><div class="fcards">${fc.map((c) => `<div class="fcard" role="button" tabindex="0" aria-label="Flashcard: ${esc(c[0].replace(/<[^>]+>/g, ''))}. Press Enter to flip." onclick="this.classList.toggle('flip')"><div class="fi"><div class="ff"><span>${il(c[0])}</span><em>tap to flip</em></div><div class="fb">${il(c[1])}</div></div></div>`).join('')}</div></div>`);
  h.push(`<div class="bridge"><b>➡ Where next?</b> ${il(ch.bridge)}</div>`);
  return h.join('');
}

const iceBlock = (ch) => `<div class="t-section"><div aria-level="2" class="t-h2" role="heading"><span class="t-num">${ch.n}</span>${esc(ch.title)}</div>${ch.exr.map((e, i) => `<div class="exr"><div class="exr-q"><span class="exr-n">${i + 1}</span><div>${mdToHtml(clean(e[0])).replace(/^<p>|<\/p>\s*$/g, '')}</div></div><details class="model"><summary>Show answer</summary><div class="ma">${mdToHtml(clean(e[1]))}</div></details></div>`).join('')}</div>`;
const D = { fill: {}, ice: '', hard: {}, lessons: [], groups: C.groups, quiz: {}, cards: [], selfq: C.selfq ? C.selfq(refMap) : '', exam: { mcq: [], wr: [] } };
const problems = [];
raw.forEach(({ ch, secs }) => {
  const meta = C.meta[ch.n];
  if (!meta) { problems.push('no meta for chapter ' + ch.n); return; }
  const m = { ...ch, ...meta, ...(C.leads && C.leads[ch.n] ? { intro: C.leads[ch.n].intro, leads: C.leads[ch.n].l } : {}) };
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
    const pos = (ch.n + i) % (q[2].length + 1);
    const o = [...wrong.map((x) => x[0])]; o.splice(pos, 0, bq(q[1]));
    const w = wrong.map((x) => x[1] || null); w.splice(pos, 0, null);
    if (q[4] !== 'bank' && (wrong.length < 1 || wrong.length > 3 || wrong.some((x) => !x[1]))) problems.push(`ch${ch.n} warm#${i} needs 1-3 wrong options with reasons`);
    return { q: bq(q[0]), o, c: pos, e: bq(q[3]), w };
  });
  if (m.fill && m.fill.length) D.fill[ch.n] = m.fill.map((f) => ({ q: bq(f[0]), a: f[1], e: bq(f[2] || ''), kind: f[3] || 'out', ci: !!f[4] }));
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
  (m.multi || []).forEach((q) => D.hard[ch.n].push({ q: bq(q[0]), o: q[1].map(bq), a: q[2], e: bq(q[3] || ''), w: null }));
  if (!C.bank && D.hard[ch.n].length < 10) problems.push(`ch${ch.n} has ${D.hard[ch.n].length} exam-style questions (need 10)`);
});
if (C.bank) { const b = C.bank(bq); D.quiz = b.quiz; D.hard = b.hard; D.fill = b.fill; problems.push(...b.problems); }
if (C.exam) { D.exam = C.exam(refMap); }
Object.assign(D, C.extra || {});
if (C.selfq && D.selfq) D.selfn = C.selfq.count;
if (problems.length) { console.error('PROBLEMS:\n' + problems.join('\n')); process.exit(1); }

fs.writeFileSync(path.join(out, 'data.json'), JSON.stringify(D));
console.log(id, 'chapters', D.lessons.length, 'cards', D.cards.length, 'hard', Object.values(D.hard).flat().length, 'warm', Object.values(D.quiz).flat().length, 'html KB', Math.round(D.lessons.reduce((a, l) => a + l.html.length, 0) / 1024));

// ---------- style: the shared guide stylesheet (the guide UI itself is the React app in src/guide)
const idp = path.join(root, 'src', 'courses', 'idp');
fs.writeFileSync(path.join(out, 'style.css'), fs.readFileSync(path.join(root, 'tools', 'newcourse', 'exr.css'), 'utf8')); // shared rules live in src/course/guide-base.css
