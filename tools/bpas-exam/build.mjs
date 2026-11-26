// Builds D.mocks (the "Exam Practice" tab) of src/courses/bpas/data.json.
// Run: node tools/bpas-exam/build.mjs
// Sources: exam2018.mjs (2018 sample paper), quizzes.json (the old "Past Quizzes 1-3" practice set), predicted.mjs (predicted questions).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { inl, p, mcq, section } from './lib.mjs';
import { exam2018 } from './exam2018.mjs';
import { predicted } from './predicted.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const F = path.join(here, '../../src/courses/bpas/data.json');
const d = JSON.parse(fs.readFileSync(F, 'utf8'));

// ---- the past quizzes used to be practice chapter 14; keep them in quizzes.json and show them here
const QF = path.join(here, 'quizzes.json');
if (d.hard?.['14']) fs.writeFileSync(QF, JSON.stringify(d.hard['14'], null, 1));
const quiz = JSON.parse(fs.readFileSync(QF, 'utf8'));
const L = 'ABCDEFGHIJKL';
const SECS = [[0, 'Business–IT alignment and business processes'], [6, 'Resource and workflow modelling'], [11, 'Process analysis: issues, static and dynamic reports'], [21, 'Requirements and use cases'], [27, 'Blueprint, C4 and risk']];
const quizCards = quiz.map((q, i) => {
  const stem = q.q.replace(/\s+/g, ' ').trim();
  const title = `Q${i + 1}`;
  const why = q.o.map((_, j) => (q.w?.[j] || '').replace(/^(True|False):\s*/, '') || null);
  return mcq('', title, p(stem), q.o, q.a, q.e || '', why);
});
const quizHtml = SECS.map(([from, title], k) => section(`${title} (Q${from + 1}–Q${(SECS[k + 1]?.[0] ?? quiz.length)})`, quizCards.slice(from, SECS[k + 1]?.[0] ?? quiz.length))).join('');
const quizzes = { title: 'Past Quizzes 1–3', grp: 'Past Quizzes 1–3', ico: '🧩', sub: 'The 31 questions from quizzes 1 to 3, moved here from the Practice tab. Tick every option you think is right (one or more), check, and read the reason under each option.', html: quizHtml };

const all = [exam2018, quizzes, ...predicted];
d.mocks = all.map((m, i) => ({ n: i + 1, title: m.title, grp: m.grp, ico: m.ico, sub: m.sub, count: (m.html.match(/class="exr reveal"/g) || []).length, html: m.html }));

// ---- remove the quiz chapter from Practice (it lives in Exam Practice now)
delete d.hard?.['14']; delete d.quiz?.['14']; delete d.qonly;
if (d.pqg) d.pqg = d.pqg.filter((g) => !(g[1].length === 1 && g[1][0] === 14));
fs.writeFileSync(F, JSON.stringify(d));
console.log(d.mocks.map((m) => `${m.n}. [${m.grp}] ${m.title}: ${m.count} questions, ${(m.html.length / 1024).toFixed(0)} KB`).join('\n'));
