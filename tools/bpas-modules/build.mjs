// Restructures src/courses/bpas/data.json from the 14 old chapters into the 12 modules of the slides (M1-M12) plus a review.
// Run once from the repo root: node tools/bpas-modules/build.mjs   (refuses to run twice)
import fs from 'node:fs';
import { m4, m7, hardQ, warmQ, section, enc } from './new-lessons.mjs';
import { m1Extra, m10Extra, m11Extra } from './extras.mjs';

const FILE = 'src/courses/bpas/data.json';
const d = JSON.parse(fs.readFileSync(FILE, 'utf8'));
if (d.lessons.length !== 14) throw new Error('data.json is already restructured');

/* ---------- parsing ---------- */
function topDivs(h) {
  const out = []; const re = /<div\b|<\/div>/g; let depth = 0, start = -1, m;
  while ((m = re.exec(h))) {
    if (m[0] === '<div') { if (depth === 0) start = m.index; depth++; } else { depth--; if (depth === 0) out.push(h.slice(start, re.lastIndex)); }
  }
  return out;
}
const HEAD = /<div aria-level="2" class="t-h2" role="heading">([\s\S]*?)<\/div>/;
const plain = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
function parse(l) {
  const P = { n: l.n, l, names: null, secs: [], extra: [], checks: [], cards: [], bridge: '' };
  const parts = topDivs(l.html);
  const joined = parts.join('');
  if (joined.length < l.html.replace(/\s+/g, '').length * 0.98) throw new Error('parse lost content in lesson ' + l.n);
  for (const s of parts) {
    const cls = /^<div class="([^"]*)"/.exec(s)[1].split(/\s+/);
    if (cls.includes('teach') || cls.includes('road') || cls.includes('glance')) continue;
    if (cls.includes('bridge')) { P.bridge = s; continue; }
    if (!cls.includes('t-section')) throw new Error('unknown part in lesson ' + l.n + ': ' + s.slice(0, 80));
    const hm = HEAD.exec(s); const hh = hm[1]; const title = plain(hh.replace(/<span class="t-num">[^<]*<\/span>/, ''));
    if (cls.includes('names')) {
      const a = s.indexOf('<tbody>') + 7, b = s.indexOf('</tbody>');
      P.names = { pre: s.slice(0, a), rows: [...s.slice(a, b).matchAll(/<tr>[\s\S]*?<\/tr>/g)].map((x) => x[0]), post: s.slice(b) };
    } else if (/30 seconds/.test(title)) {
      P.checks = [...s.matchAll(/<li>[\s\S]*?<\/li>/g)].map((x) => x[0]);
    } else if (/Flip to recall/.test(title)) {
      const i = s.indexOf('<div class="fcards">'); const fc = topDivs(s.slice(i))[0];
      P.cards = topDivs(fc.slice(fc.indexOf('>') + 1, fc.lastIndexOf('</div>')));
    } else {
      const nm = /<span class="t-num">([\d.]+)<\/span>/.exec(hh);
      (nm ? P.secs : P.extra).push({ old: nm ? nm[1] : null, title, html: s });
    }
  }
  return P;
}
const P = {}; d.lessons.forEach((l) => { P[l.n] = parse(l); });

/* ---------- builders ---------- */
const fixText = (s) => s.replace(/This chapter/g, 'This module').replace(/this chapter/g, 'this module').replace(/next chapter/g, 'next module').replace(/later chapter/g, 'later module');
const teach = (why, hook) => `<div class="teach"><div class="tc why"><b>💡 Why it matters</b>${why}</div><div class="tc hook"><b>🧠 Memory hook</b><b>${hook}</b></div></div>`;
const road = (titles) => `<div class="road"><div class="road-t">🗺️ Roadmap of this module</div><div class="flow">${titles.map((t, i) => `<span><b>${i + 1}</b>${t.replace(/&/g, '&amp;')}</span>`).join('<i>→</i>')}</div></div>`;
const glance = (t, items) => `<div class="glance"><div class="gt">⚡ At a glance — ${t}</div><div class="flow">${items.map((x) => `<span>${x}</span>`).join('<i>→</i>')}</div></div>`;
const bridge = (t) => `<div class="bridge"><b>➡ Where next?</b> ${t}</div>`;
const NAMES_PRE = P[4].names.pre.slice(0, P[4].names.pre.indexOf('<tbody>') + 7);
const namesRow = (a, b, c) => `<tr><td><b>${a}</b></td><td>${b}</td><td>${c}</td></tr>`;
const namesHtml = (rows, post) => !rows.length ? '' : NAMES_PRE + rows.map((r) => fixText(r).replace(/Covered in the next module/g, 'Covered in Module 3')).join('') + fixText(post);
const firstCell = (r) => plain(/<td>([\s\S]*?)<\/td>/.exec(r)[1]);
const calls = (x) => { const p = x.names.post; return p.slice(p.indexOf('</table></div>') + 14, p.lastIndexOf('</div>')); };
const namesPost = (...Ps) => '</tbody></table></div>' + Ps.map(calls).join('') + '</div>';
const checksHtml = (lis) => `<div class="t-section reveal"><div aria-level="2" class="t-h2" role="heading">✅ This module in 30 seconds</div><ul class="checks">${lis.join('')}</ul></div>`;
const FC_OPEN = '<div class="t-section"><div aria-level="2" class="t-h2" role="heading">🃏 Flip to recall</div><div class="sub">Say the answer out loud first, then tap the card.</div><div class="fcards">';
const cardHtml = (t, b) => `<div aria-label="Flashcard: ${t.replace(/"/g, '&quot;')}. Press Enter to flip." class="fcard" onclick="this.classList.toggle('flip')" role="button" tabindex="0"><div class="fi"><div class="ff"><span>${enc(t)}</span><em>tap to flip</em></div><div class="fb">${enc(b)}</div></div></div>`;
const cardsHtml = (cs) => FC_OPEN + cs.join('') + '</div></div>';

const SECMAP = {}; // old "a.b" -> new "N.K"
function renumber(sec, N, K) {
  if (sec.old) SECMAP[sec.old] = `${N}.${K}`;
  return fixText(sec.html.replace(/ id="s\d+-\d+"/, ` id="s${N}-${K}"`).replace(/<span class="t-num">[^<]*<\/span>/, `<span class="t-num">${N}.${K}</span>`));
}

/** compose one module from numbered section lists. `parts` = [{secs:[sec...]}...] in order; `extras` are unnumbered sections kept at the end. */
function compose(N, o) {
  const secs = o.secs, extras = o.extras || [];
  let K = 0; const body = [], titles = [];
  for (const s of secs) {
    K++;
    if (s.html) { body.push(renumber(s, N, K)); titles.push(s.title); }
    else { body.push(section(N, K, s.t, s.body.join(''))); titles.push(s.t); }
  }
  const names = namesHtml(o.names, o.namesPost);
  return {
    n: N, title: o.title, tag: o.tag, icon: o.icon, goal: o.goal, subtitle: o.goal, dn: N,
    html: teach(fixText(o.why), o.hook) + road(titles) + glance(o.gt, o.glance) + names + body.join('') + extras.map(fixText).join('') + checksHtml(o.checks.map(fixText)) + cardsHtml(o.cards) + bridge(o.bridge),
  };
}
const dedupeRows = (rows) => { const seen = new Set(); return rows.filter((r) => { const k = firstCell(r); if (seen.has(k)) return false; seen.add(k); return true; }); };
const newNamesRows = (arr) => arr.map((r) => namesRow(enc(r[0]), enc(r[1]), enc(r[2])));
const sec = (n, old) => { const s = P[n].secs.find((x) => x.old === old); if (!s) throw new Error('no section ' + old); return s; };
const extraOf = (n) => P[n].extra.map((x) => x.html);
const fromNew = (m) => ({ secs: m.sections.map(([t, body]) => ({ t, body })), names: newNamesRows(m.names), namesPost: '</tbody></table></div></div>', checks: m.summary.map((x) => `<li>${enc(x)}</li>`), cards: m.cards.map(([t, b]) => cardHtml(t, b)) });
const addExtra = (x) => x.map(([t, body]) => ({ t, body }));

/* The Discover phase (what Discovery is, its deliverables, the interview) is taught in M2 in the slides, so it moves out of the BPM section of M1. */
const dsec = sec(2, '2.2'); const cutAt = '<h3 class="t-h3">The Discover Phase in detail</h3>';
const ci = dsec.html.indexOf(cutAt); if (ci < 0) throw new Error('discover block not found');
const discoverBody = dsec.html.slice(ci + cutAt.length, dsec.html.lastIndexOf('</div>')).replace('covered in  below)', 'covered in the rest of this module and in Module 3)');
dsec.html = dsec.html.slice(0, ci) + '</div>';
const discover = { t: 'Discovery: Understanding the Current State', body: [discoverBody] };

const lessons = [];
const keep = (n, old) => ({ secs: P[n].secs, names: P[n].names.rows, namesPost: P[n].names.post, checks: P[n].checks, cards: P[n].cards, extras: extraOf(n), ...{} });

/* M1: business language + alignment + BPM + learning journey */
lessons.push(compose(1, {
  title: 'Business & IT Alignment', tag: P[1].l.tag, icon: P[1].l.icon,
  goal: 'Describe a business with Purpose, Participants, Process and Product, explain why IT must follow business goals, and see how BPM keeps processes improving.',
  why: 'Every later model answers one of four questions about a business. IT only pays off when it follows business goals, and BPM is the ongoing effort that keeps both lined up.',
  hook: 'Purpose · Participants · Process · Product, then align IT and run the BPM cycle.',
  gt: 'From purpose to improvement', glance: ['Four dimensions describe any business', 'IT follows business goals', 'The BPM cycle keeps improving'],
  secs: [sec(1, '1.1'), sec(1, '1.2'), sec(2, '2.1'), sec(2, '2.2'), ...addExtra(m1Extra)],
  names: dedupeRows([...P[1].names.rows, ...P[2].names.rows]), namesPost: namesPost(P[1], P[2]),
  extras: [...extraOf(1), ...extraOf(2)],
  checks: [...P[1].checks, ...P[2].checks, `<li>The course runs in four phases over the term; later courses (IS213, IS214, IS215, IS483) build on it.</li>`],
  cards: [...P[1].cards, ...P[2].cards],
  bridge: 'Next: what exactly counts as a business process, and the first two models that capture it, organisation and location.',
}));

/* M2: business process + five models + organisation + location */
const c4 = (i) => P[4].checks[i];
lessons.push(compose(2, {
  title: 'Process Modelling Part 1: Processes, Organisation & Location', tag: P[3].l.tag, icon: P[3].l.icon,
  goal: 'Define a business process and its attributes, then capture the people and places around it with the organisation and location models.',
  why: 'You cannot improve what you cannot describe. A shared definition, then the people and places around the process, set up every later model.',
  hook: 'Repeatable series of activities · Org = who reports to whom · Location = where.',
  gt: 'From definition to models', glance: ['A process is a repeatable series of activities', 'Org = who reports to whom', 'Location = where people are'],
  secs: [discover, sec(3, '3.1'), sec(4, '4.1'), sec(4, '4.2'), sec(4, '4.3'), sec(4, '4.4')],
  names: dedupeRows([...P[3].names.rows, ...P[4].names.rows.filter((r) => !/Resource Model/.test(firstCell(r)))]), namesPost: namesPost(P[4], P[3]),
  extras: extraOf(3),
  checks: [...P[3].checks, c4(0), c4(1), c4(2), c4(3)],
  cards: [...P[3].cards, P[4].cards[0], P[4].cards[2], P[4].cards[3]],
  bridge: 'Next: the resource model, the BPMN workflow, business rules and four worked processes.',
}));

/* M3: resource + workflow + rules + worked walkthroughs */
lessons.push(compose(3, {
  title: 'Process Modelling Part 2: Resources, Workflow & Rules', tag: P[5].l.tag, icon: P[5].l.icon,
  goal: 'Complete the model set with the resource model, the BPMN workflow and business rules, then practise on four worked processes.',
  why: 'The workflow is the heart of process modelling. Resources and rules complete the picture, and the four worked processes return in Analyse and Solve.',
  hook: 'The lane follows who performs the activity, not which tool is touched.',
  gt: 'Resources, workflow, rules', glance: ['Resource = who or what is used', 'Workflow = the order of activities', 'Rules = the logic behind them'],
  secs: [sec(4, '4.5'), sec(5, '5.1'), sec(5, '5.2'), sec(6, '6.1'), sec(6, '6.2'), sec(6, '6.3'), sec(6, '6.4')],
  names: dedupeRows([...P[4].names.rows.filter((r) => /Resource Model/.test(firstCell(r))), ...P[5].names.rows, ...P[6].names.rows]), namesPost: namesPost(P[5], P[6]),
  extras: [...extraOf(5), ...extraOf(6)],
  checks: [c4(4), ...P[5].checks, ...P[6].checks],
  cards: [P[4].cards[1], ...P[5].cards, ...P[6].cards],
  bridge: 'Next: practise choosing and drawing the models on written scenarios.',
}));

/* M4: new exercises */
const n4 = fromNew(m4);
lessons.push(compose(4, { ...n4, title: 'Modelling Exercises: Expense Report & Book Reservation', tag: m4.tag, icon: m4.icon, goal: m4.goal, why: m4.why, hook: m4.hook, gt: 'Four steps for any scenario', glance: m4.glance, bridge: m4.bridge.replace(/^Next: /, 'Next: ') }));

/* M5-M6 */
const single = (N, from, over) => compose(N, { title: over.title, tag: P[from].l.tag, icon: P[from].l.icon, goal: over.goal || P[from].l.goal, ...keepWhy(from), secs: [...P[from].secs, ...(over.add || [])], names: P[from].names ? P[from].names.rows : [], namesPost: P[from].names ? P[from].names.post : '', extras: extraOf(from), checks: P[from].checks, cards: P[from].cards, bridge: over.bridge });
function keepWhy(n) {
  const h = P[n].l.html;
  return {
    why: /<div class="tc why"><b>[^<]*<\/b>([\s\S]*?)<\/div>/.exec(h)[1],
    hook: /tc hook"><b>[^<]*<\/b><b>([\s\S]*?)<\/b>/.exec(h)[1],
    gt: /<div class="gt">⚡ At a glance — ([\s\S]*?)<\/div>/.exec(h)[1],
    glance: [...(/<div class="glance">[\s\S]*?<div class="flow">([\s\S]*?)<\/div><\/div>/.exec(h)[1].matchAll(/<span>([\s\S]*?)<\/span>/g))].map((x) => x[1]),
  };
}
const bridgeText = (n) => /<b>➡ Where next\?<\/b>\s*([\s\S]*?)<\/div>/.exec(P[n].bridge)[1];
lessons.push(single(5, 7, { title: 'Analysis Part 1: Static Analysis (RCI & RCR)', bridge: bridgeText(7) }));
lessons.push(single(6, 8, { title: 'Analysis Part 2: Dynamic Analysis & Simulation', bridge: 'Next: practise static and dynamic analysis on one hospital process.' }));

/* M7: new exercises */
const n7 = fromNew(m7);
lessons.push(compose(7, { ...n7, title: 'Analysis Exercises: Bed Management', tag: m7.tag, icon: m7.icon, goal: m7.goal, why: m7.why, hook: m7.hook, gt: 'Five activities on one process', glance: m7.glance, bridge: m7.bridge }));

/* M8-M12 + review */
lessons.push(single(8, 9, { title: 'Solutioning Part 1: Functional Requirements', bridge: bridgeText(9) }));
lessons.push(single(9, 10, { title: 'Solutioning Part 2: Concept Solution Blueprint', bridge: bridgeText(10) }));
lessons.push(single(10, 11, { title: 'Innovation Part 1: Product, Process & Business Model', bridge: bridgeText(11), add: addExtra(m10Extra) }));
lessons.push(single(11, 12, { title: 'Innovation Part 2: Technology, Automation, Digital Twins & IoT', bridge: bridgeText(12), add: addExtra(m11Extra) }));
lessons.push(single(12, 13, { title: 'Innovation Part 3: Process Architecture & Value Chains', bridge: bridgeText(13) }));
lessons.push(single(13, 14, { title: 'Course Review: Choosing Models, Techniques & Artefacts', bridge: bridgeText(14) }));
delete lessons[12].dn; lessons[12].dn = undefined;


/* ---------- text fixes: orphaned references and stray spaces before punctuation ---------- */
const FIXES = [
  [2, "recall 's \"lack of common language\"", "recall §1.3's \"lack of common language\""],
  [3, "described in 's \"reading an annotated diagram\" callout", "described in §3.2's \"reading an annotated diagram\" callout"],
  [10, 'innovation types in  are nested', 'innovation types in §10.5 are nested'],
  [5, 'The three-step pipeline is drawn in; this table', 'The three-step pipeline is in the at-a-glance strip at the top of this module; this table'],
  [5, '(the process is the one in; probabilities', '(the process is the one in §3.5; probabilities'],
  [5, 'connect to the RCI in: (1)', 'connect to the RCI in §5.6: (1)'],
  [6, 'flow diagram</em> of, redrawn on, with the decisions', 'flow diagram</em> of §3.5, with the decisions'],
];
for (const [n, a, b] of FIXES) {
  const l = lessons.find((x) => x.n === n);
  if (!l.html.includes(a)) throw new Error('fix not found in ' + n + ': ' + a);
  l.html = l.html.replace(a, b);
}
const tidy = (h) => h.split(/(<pre class="mermaid[\s\S]*?<\/pre>)/).map((seg) => (seg.startsWith('<pre class="mermaid') ? seg : seg.replace(/>([^<]+)</g, (m, t) => '>' + t.replace(/(\S) ([,.;:])(?=\s|$)/g, '$1$2') + '<'))).join('');
lessons.forEach((l) => { l.html = tidy(l.html); });

/* ---------- section reference map (cards, quiz explanations) ---------- */
const remapRefs = (s) => s.replace(/§\s?(\d+)\.(\d+)/g, (m, a, b) => { const to = SECMAP[`${a}.${b}`]; if (!to) throw new Error('unmapped ' + m); return '§' + to; });

/* ---------- quiz banks ---------- */
const OLD2NEW = { 1: 1, 2: 1, 3: 2, 5: 3, 6: 3, 7: 5, 8: 6, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13 };
function remapBank(bank, newBank) {
  const out = {};
  const push = (n, items) => { (out[n] ??= []).push(...items); };
  for (const [o, items] of Object.entries(bank)) {
    const oc = +o;
    if (oc === 4) { items.forEach((q, i) => push(/Resource/.test(q.q) || /“internal”/.test(q.q) ? 3 : 2, [q])); continue; }
    push(OLD2NEW[oc], items);
  }
  out[4] = newBank.m4; out[7] = newBank.m7;
  return Object.fromEntries(Object.keys(out).sort((a, b) => a - b).map((k) => [k, out[k]]));
}
const hard = remapBank(d.hard, hardQ);
const warmFix = (qs) => qs.map((q) => ({ ...q, w: q.w.map((x, i) => (i === q.c ? null : x)) }));
const quiz = remapBank(d.quiz, { m4: warmFix(warmQ.m4), m7: warmFix(warmQ.m7) });
const deep = (o) => JSON.parse(remapRefs(JSON.stringify(o)));

/* ---------- cards ---------- */
const cardChapOld = (c) => +/§(\d+)/.exec(c.f)[1];
const newCards = d.cards.map((c) => ({ ...c, f: c.t === 'Discover' ? '§2.1' : remapRefs(c.f) }));
const extraCards = [
  ['Expense report: four lanes', 'Employee, Office Administrator, Manager and Financial Officer; three end events.', '§4.2'],
  ['Why is Workday an external resource?', 'The company uses it but does not control or operate it.', '§4.2'],
  ['Book reservation lanes', 'Faculty, Admin and Librarian; the finance approval is a separate process.', '§4.3'],
  ['GenAI and BPMN XML', 'Import the XML to check it opens, then check lanes, gateways and end events and improve the prompt.', '§4.4'],
  ['Bed management bottlenecks', 'Search bed availability (55 min) and email bed request (45 min).', '§7.3'],
  ['Category of the resubmission rate', 'Decision points: a probability on the availability decision.', '§7.4'],
  ['Bed management To-Be impacts', 'Direct BAS access is internal; replacing the BAS with a shared cloud system is internal and external.', '§7.6'],
  ['What does "(Ibid.)" mean in the RCI solution?', 'Another root cause of the same issue, not a new issue.', '§7.2'],
].map(([t, dd, f]) => ({ t, d: dd, f }));
const allCards = [...newCards, ...extraCards].map((c, i) => ({ c, i })).sort((a, b) => (+/§(\d+)/.exec(a.c.f)[1] - +/§(\d+)/.exec(b.c.f)[1]) || a.i - b.i).map((x) => x.c);

/* ---------- assemble ---------- */
const out = {
  ...d, lessons,
  groups: [{ t: 'Model', ns: [1, 2, 3, 4], tag: 'blue' }, { t: 'Analyse', ns: [5, 6, 7], tag: 'yellow' }, { t: 'Solve', ns: [8, 9], tag: 'orange' }, { t: 'Innovate', ns: [10, 11, 12], tag: 'purple' }, { t: 'Choosing & Mistakes', ns: [13], tag: 'green' }],
  hard: deep(hard), quiz: deep(quiz), cards: allCards,
};
fs.writeFileSync(FILE, JSON.stringify(out));
console.log('lessons', lessons.map((l) => `${l.n}:${l.html.length}`).join(' '));
console.log('cards', allCards.length, 'hard', Object.entries(out.hard).map(([k, v]) => k + '=' + v.length).join(' '));
console.log('SECMAP', JSON.stringify(SECMAP));
