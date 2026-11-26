// Replaces the practice questions with scenario-style ones, adds the past-quiz section (14) and SUBWAY context.
import fs from 'node:fs';
import { hard, dropQuiz } from './pq-hard.mjs';
import { past } from './pq-past.mjs';
import { hard4, quiz4 } from './pq-m4.mjs';
const f = 'src/courses/bpas/data.json';
const d = JSON.parse(fs.readFileSync(f, 'utf8'));
for (const n of Object.keys(hard)) d.hard[n] = hard[n];
for (const [n, idx] of Object.entries(dropQuiz)) d.quiz[n] = d.quiz[n].filter((_, i) => !idx.includes(i));
d.hard[4] = hard4; d.quiz[4] = quiz4; // module 4 questions live in pq-m4.mjs
d.hard[14] = past; d.quiz[14] = [];
d.qonly = [{ n: 14, title: 'Past Quizzes 1–3', tn: 14 }];
d.pqg = [...d.groups.map((g) => [g.t, g.ns]), ['Past quizzes', [14]]];
// context for the SUBWAY annual figures
const l = d.lessons.find((x) => x.n === 5);
const h3 = /<h3 class="t-h3">Worked calculation — SUBWAY<\/h3>/;
if (!l.html.includes('Where 43,800 comes from')) {
  if (!h3.test(l.html)) throw new Error('h3 not found');
  l.html = l.html.replace(h3, (m) => m + `
<p><strong class="k-c">Where the annual figures come from.</strong> The task and role tables above give numbers <em>per sandwich</em> (one process instance). To get yearly totals you also need the <strong class="k-c">instance frequency per year</strong>: how many sandwiches the shop makes in a year. The slides give <strong class="k-y">43,800</strong> as an assumed input for this example. It works out to <strong>120 sandwiches a day × 365 days</strong>, though the slides do not say how it was chosen. Any other volume would scale every annual number in the same way.</p>
<ul class="t-rule-list">
<li><strong class="k-c">Annual hours per resource.</strong> A Bread Artist or Cashier works <strong>1,920 hours</strong> a year = 12 months × 20 days × 8 hours. A Veggie Artist works 720 hours each, and 3 are available.</li>
<li><strong class="k-c">Annual workload of a task</strong> = minutes per instance ÷ 60 × instances per year. Example: 0.75 ÷ 60 × 43,800 = 547.5 hours for Take sandwich order.</li>
</ul>`);
}
fs.writeFileSync(f, JSON.stringify(d));
console.log('hard', Object.keys(d.hard).map((k) => k + ':' + d.hard[k].length).join(' '));
console.log('quiz', Object.keys(d.quiz).map((k) => k + ':' + d.quiz[k].length).join(' '));
