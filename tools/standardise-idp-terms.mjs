// One-off content fixes for the IDP guide: uniform Gestalt wording, binomial/test-selection logic, uniform method names.
import fs from 'node:fs';
const f = 'src/courses/idp/data.json';
const D = JSON.parse(fs.readFileSync(f, 'utf8'));
const log = [];
function walk(o, fn) {
  if (typeof o === 'string') return fn(o);
  if (Array.isArray(o)) return o.map((x) => walk(x, fn));
  if (o && typeof o === 'object') return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, walk(v, fn)]));
  return o;
}
let root = D;
function R(from, to, min = 1) {
  let n = 0;
  root = walk(root, (s) => {
    const parts = typeof from === 'string' ? s.split(from) : null;
    if (parts) { if (parts.length > 1) { n += parts.length - 1; return parts.join(to); } return s; }
    return s.replace(from, (...a) => { n++; return typeof to === 'function' ? to(...a) : to; });
  });
  if (n < min) throw new Error('no match: ' + from);
  log.push(n + 'x ' + String(from).slice(0, 60));
}
const cap = (m, s) => (m[0] === 'L' ? 'Laboratory' : 'laboratory') + s;

/* ---------- 1. Gestalt: one canonical set + identical wording everywhere ---------- */
const DEF = {
  sim: 'things that look alike (colour, shape, size) are seen as related',
  prox: 'things placed close together are seen as related, and separated from things farther away',
  reg: 'things inside the same boundary (card, border or background) are seen as one group',
  clo: 'we fill in small gaps to see a complete shape',
  fg: 'we separate a stable “figure” from the background',
};
R('(an application of <strong class="k-c">Gestalt principles</strong> — similarity, enclosure, proximity —', '(an application of <strong class="k-c">Gestalt principles</strong> — similarity, proximity, common region —');
R(/<p><strong class="k-c">Gestalt principles \(added context\):<\/strong>[\s\S]*?<\/p>/, () =>
  `<p><strong class="k-c">Gestalt principles (added context):</strong> these are perceptual rules describing how humans automatically group visual elements — <em>similarity</em> (${DEF.sim}), <em>proximity</em> (${DEF.prox}), and <em>common region</em> (also called <em>enclosure</em>: ${DEF.reg}). <em>Closure</em> and <em>figure/ground</em> complete the set of five (§11.5). They recur later under Visual Design (§11) and are why "add a border/background" or "align things into columns" is a real design decision, not decoration.</p>`);
R('Similarity, proximity, enclosure — perceptual grouping rules', 'Similarity, proximity, common region, closure, figure/ground — perceptual grouping rules');
R('Gestalt principles such as similarity, proximity and enclosure help', 'Gestalt principles such as similarity, proximity and common region help');
R('similarity, proximity and enclosure are Gestalt grouping cues', 'similarity, proximity and common region are Gestalt grouping cues');
R('Closure / Common region / Figure-ground / Proximity (Gestalt)', 'Similarity / Proximity / Common region / Closure / Figure-ground (Gestalt)');
R('Four perceptual grouping principles', 'Five perceptual grouping principles');

// lecture 11: SEE IT demo cards, intro, tables
const L = D.lessons[10];
{
  let h = root.lessons[10].html;
  h = h.replace('SEE IT — the four Gestalt principles, drawn', 'SEE IT — the five Gestalt principles, drawn');
  // reorder demo cards to the canonical order and add Similarity
  const start = h.indexOf('<div class="dm-card"><div class="dm-t">Closure</div>');
  const logo = h.indexOf('<div class="dm-card"><div class="dm-t">Logo fonts');
  if (start < 0 || logo < 0) throw new Error('demo cards');
  const block = h.slice(start, logo);
  const cards = block.split('<div class="dm-card">').filter(Boolean).map((c) => '<div class="dm-card">' + c);
  const by = (t) => cards.find((c) => c.includes(`<div class="dm-t">${t}`));
  const sim = '<div class="dm-card"><div class="dm-t">Similarity</div><svg viewBox="0 0 160 70" class="gs"><g fill="#4c8dff"><circle cx="14" cy="18" r="7"/><circle cx="54" cy="18" r="7"/><circle cx="94" cy="18" r="7"/><circle cx="134" cy="18" r="7"/><circle cx="34" cy="50" r="7"/><circle cx="74" cy="50" r="7"/><circle cx="114" cy="50" r="7"/></g><g fill="#e5484d"><rect x="27" y="11" width="14" height="14" rx="2"/><rect x="67" y="11" width="14" height="14" rx="2"/><rect x="107" y="11" width="14" height="14" rx="2"/><rect x="7" y="43" width="14" height="14" rx="2"/><rect x="47" y="43" width="14" height="14" rx="2"/><rect x="87" y="43" width="14" height="14" rx="2"/><rect x="127" y="43" width="14" height="14" rx="2"/></g></svg><div class=dm-cap>Things that look alike (same colour or shape) read as one set.</div></div>';
  const ordered = [sim, by('Proximity'), by('Common region'), by('Closure'), by('Figure')].join('');
  if (cards.length !== 4 || ordered.includes('undefined')) throw new Error('cards ' + cards.length);
  h = h.slice(0, start) + ordered + h.slice(logo);
  h = h.replace("Building on §1.1's brief introduction, four Gestalt principles are given full treatment here, describing how people perceive structure, logic, and patterns:", "Building on §1.1's brief introduction, the five Gestalt principles are given full treatment here, describing how people perceive structure, logic, and patterns:");
  // main description table -> canonical order and wording
  const ts = h.indexOf('<td><strong class="k-c">Closure</strong></td>');
  const trStart = h.lastIndexOf('<tr>', ts);
  const tbEnd = h.indexOf('</tbody>', ts);
  const row = (n, d, e) => `<tr>\n<td><strong class="k-c">${n}</strong></td>\n<td>${d}</td>\n<td>${e}</td>\n</tr>\n`;
  const up = (s) => s[0].toUpperCase() + s.slice(1);
  const rows = row('Similarity', up(DEF.sim), 'e.g. all links share one colour, so they read as one set')
    + row('Proximity', up(DEF.prox), "e.g. a progress bar's segments read as one connected sequence because they sit close together")
    + row('Common region', up(DEF.reg) + ' (also called enclosure)', 'Elements inside the same card or bordered box are read as related')
    + row('Closure', up(DEF.clo), 'A partially drawn shape/logo is still read as complete')
    + row('Figure/ground', up(DEF.fg), 'e.g. an iOS blur/focus effect pushes the background out of focus so the foreground content reads unambiguously as the figure');
  h = h.slice(0, trStart) + rows + h.slice(tbEnd);
  // "Exact names" glance table
  const gs = h.indexOf('<tr><td><b>Closure</b></td>');
  const ge = h.indexOf('</tbody>', gs);
  const grow = (n, d, e) => `<tr><td><b>${n}</b></td><td>${d}</td><td>${e}</td></tr>`;
  h = h.slice(0, gs)
    + grow('Similarity', up(DEF.sim), 'All links share one colour')
    + grow('Proximity', up(DEF.prox), 'Segments of a progress bar')
    + grow('Common region', up(DEF.reg), 'Items in one card or bordered box')
    + grow('Closure', up(DEF.clo), 'A partly drawn logo still reads as complete')
    + grow('Figure/ground', up(DEF.fg), 'Blurred background behind foreground content')
    + h.slice(ge);
  h = h.replace('<em>Closure</em>: remember it when designing loading indicators/progress bars.</p>', '<em>Closure</em>: remember it when designing loading indicators/progress bars. <em>Similarity</em>: ' + DEF.sim + ' — e.g. one colour for every link.</p>');
  root.lessons[10].html = h;
}
// self-check Q17
R('Name the four Gestalt principles covered in Lecture 11', 'Name the five Gestalt principles covered in Lecture 11');
R(/Closure — we prefer complete shapes and mentally fill in small gaps\. Common region — we group elements that share the same enclosed\/bordered area\. Figure\/ground — we seek a stable, unambiguous "figure" against a background rather than tolerating visual ambiguity\. Proximity — we group elements that sit physically closer together, separating them from more distant elements\./,
  () => `Similarity — ${DEF.sim}. Proximity — ${DEF.prox}. Common region (also called enclosure) — ${DEF.reg}. Closure — ${DEF.clo}. Figure/ground — ${DEF.fg}.`);

/* ---------- 2. Quantitative analysis (lecture 19) ---------- */
// binomial = within-subjects (each participant tries both versions and states ONE preference); the at-a-glance table had it under "between"
R('<tr><td>One binary preference</td><td>Binomial</td><td>—</td></tr>', '<tr><td>One binary preference (each participant tries both)</td><td>—</td><td>Binomial</td></tr>');
R('Within-subjects (one value per participant, e.g. preferred UI version)', 'Within-subjects (each participant tries both versions and gives one preference, e.g. preferred UI version; tested against a 50/50 split)');
R('Binomial</strong> (two-option nominal, e.g. preference or Yes/No recommend; tests deviation from 50/50; one choice per participant)', 'Binomial</strong> (two-option nominal, e.g. preference or Yes/No recommend; within-subjects: every participant tries both versions and gives one choice; tests deviation from 50/50)');
R('Q1{Is the dependent variable&lt;br/&gt;ratio or interval?}', 'Q1{What type is the&lt;br/&gt;dependent variable?}');
R('Q1 --&gt;|Yes| Q2{', 'Q1 --&gt;|Interval / ratio| Q2{');
R('Q1 --&gt;|No, nominal| Q4{Paired or independent sample?}', 'Q1 --&gt;|Nominal| Q4{Paired or independent sample?}\n    Q1 --&gt;|Ordinal| Q5');
R("[&quot;McNemar's / Binomial&quot;]", "[&quot;McNemar's (task success) / Binomial (preference)&quot;]");
R('(1) is the dependent variable interval/ratio or nominal, and (2)', '(1) is the dependent variable interval/ratio, ordinal or nominal (ordinal data takes the non-parametric branch, like non-normal interval/ratio data), and (2)');
R('normality only needs checking for interval/ratio data, since nominal tests don\'t assume it.', 'normality only needs checking for interval/ratio data, since ordinal and nominal tests don\'t assume it.');
// 19 heads in 20 fair flips: exact two-tailed binomial probability is 2 x 21 / 2^20 = 0.00004, not 2%
R('if 19/20 heads has p=.02, that means a result this extreme should happen only about 2% of the time by random chance alone if the coin really were fair.', 'if 19/20 heads has p≈.00004 (two-tailed: 19 or more, or 1 or fewer, heads), that means a result this extreme should happen only about 4 times in 100,000 by random chance alone if the coin really were fair.');
R('is ≈<strong class="k-c">2%</strong> (two-tailed)', 'is ≈<strong class="k-c">0.004%</strong> (p ≈ 0.00004, two-tailed)');
R('getting 19 heads has a probability of about 2% (two-tailed)', 'getting 19 heads has a probability of about 0.004% (p ≈ 0.00004, two-tailed)');
R('19 heads in 20 fair flips has about 2% probability (two-tailed).', '19 heads in 20 fair flips has a probability of about 0.004% (p ≈ 0.00004, two-tailed).');
R('True: 19 or more heads or 19 or more tails in 20 fair flips happens about 2% of the time.', 'True: 19 or more heads, or 1 or fewer, in 20 fair flips happens only about 4 times in 100,000.');

/* ---------- 3. Evaluation-method names: Inspection / Field study / Laboratory study / Survey ---------- */
R(/\b([Ll])ab(?:oratory)?[- ]stud(y|ies)\b/g, (m, l, s) => (l === 'L' ? 'Laboratory' : 'laboratory') + (m.includes('-') ? '-' : ' ') + 'stud' + s, 0);
R(/\b([Ll])ab(?:oratory)? experiment(s?)\b/g, (m, l, pl) => (l === 'L' ? 'Laboratory' : 'laboratory') + ' stud' + (pl ? 'ies' : 'y'));
R('users via lab tests', 'users via laboratory studies');
R('A six-step process for controlled tests', 'A six-step process for laboratory studies');
R('a lab setting controls', 'a laboratory setting controls');
R('Heuristic inspection', 'Inspection');
R(/\b([Ee])xpert inspection\b/g, (m, e) => (e === 'E' ? 'Inspection' : 'inspection'));
R('Expert review against Nielsen', 'Inspection method: experts compare the UI against Nielsen');

console.log(log.join('\n'));
fs.writeFileSync(f, JSON.stringify(root));
