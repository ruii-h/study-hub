// One-time: make the reduction part of chapter 12 say plainly that EVERY problem in NP reduces to an NP-complete problem.
import fs from 'fs';
const P = 'src/courses/algo/data.json';
const D = JSON.parse(fs.readFileSync(P, 'utf8'));
const l = D.lessons.find((x) => +x.n === 12);
if (l.html.includes('data-npred="1"')) { console.log('already done'); process.exit(0); }
const H3 = '<div role="heading" aria-level="3" class="t-h3x">';

const intro = `<div data-npred="1">${H3}The key fact: every problem in NP reduces to an NP-complete problem</div>`
  + `<p>Read “<strong class="k-c">A reduces to B</strong>” (A → B) as: <em>a fast solver for B would also solve A</em>. So B is <strong>at least as hard</strong> as A. The arrow always points from the easier problem to the harder one.</p>`
  + `<p>A problem is <strong class="k-c">NP-complete</strong> when it has both of these properties:</p>`
  + `<ul class="t-rule-list">`
  + `<li><strong class="k-c">1. It is in NP.</strong> A proposed answer can be checked in polynomial time.</li>`
  + `<li><strong class="k-c">2. Every problem in NP reduces to it.</strong> Take <em>any</em> problem in NP (subset sum, Sudoku, even every problem in P) and there is a fast converter that turns it into this one.</li>`
  + `</ul>`
  + `<p>Property 2 is what makes NP-complete problems the <strong>hardest problems inside NP</strong>: all of NP sits “below” them. Subset sum, SAT, Hamiltonian cycle and the decision version of TSP are all NP-complete, so each one can be turned into any of the others.</p>`
  + `<div class="nb"><b>What this gives you</b>`
  + `<ul class="t-rule-list">`
  + `<li><strong class="k-c">One fast solver would solve everything in NP.</strong> If any NP-complete problem had a polynomial-time algorithm, then every problem in NP would too (convert it, then solve it). That would mean P = NP, which is why nobody expects it.</li>`
  + `<li><strong class="k-c">Which way the arrows may point.</strong> If X is in P and Y is NP-complete, then X → Y is true (X is in NP, and everything in NP reduces to Y). Y → X would mean a fast solver for X solves Y, which would give P = NP, so you cannot assume it.</li>`
  + `<li><strong class="k-c">How to prove a new problem Z is NP-complete.</strong> (1) Show Z is in NP. (2) Reduce one <em>known</em> NP-complete problem to Z. Everything in NP already reduces to that known problem, and that problem reduces to Z, so everything in NP reduces to Z.</li>`
  + `<li><strong class="k-c">NP-hard</strong> means property 2 only: at least as hard as everything in NP, but not necessarily checkable (optimisation TSP is an example).</li>`
  + `</ul></div></div>`;

const tag = '<div class="t-slow-tag">In plain words, step by step</div>';
const sec = l.html.indexOf('id="s12-5"');
const at = l.html.indexOf(tag, sec); if (at < 0 || at - sec > 400) throw new Error('slow panel not found in 12.5');
l.html = l.html.slice(0, at + tag.length) + intro + l.html.slice(at + tag.length);

// formal version: replace the one-line "examples" with the definition
const oldEx = '<p><strong class="k-c">NP-complete</strong> examples: subset sum and Boolean satisfiability (SAT).</p>';
if (!l.html.includes(oldEx)) throw new Error('old example line not found');
l.html = l.html.replace(oldEx, '<p><strong class="k-c">NP-complete</strong> = in NP <em>and</em> every problem in NP reduces to it (so it is the hardest kind of problem in NP). Examples: subset sum, Boolean satisfiability (SAT), Hamiltonian cycle, TSP (decision version).</p>');

// 12.6: say what NP-hard means in terms of reductions
const old6 = '<strong class="k-c">NP-complete = NP-hard ∩ NP.</strong> A problem can be NP-hard without being in NP.';
if (!l.html.includes(old6)) throw new Error('12.6 line not found');
l.html = l.html.replace(old6, '<strong class="k-c">NP-hard</strong> = every problem in NP reduces to it (at least as hard as all of NP). <strong class="k-c">NP-complete = NP-hard ∩ NP.</strong> A problem can be NP-hard without being in NP.');

fs.writeFileSync(P, JSON.stringify(D));
console.log('done');
