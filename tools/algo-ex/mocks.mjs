// Builds D.mocks (the "Mock Exams" tab) in src/courses/algo/data.json from tools/algo-ex/mocks-src.md.
// Run:  node tools/algo-ex/mocks.mjs        (add --dump to print where each question is split into question | answer)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { esc, code } from './lib.mjs';
import { curveFig, ringsFig, vennFig, topoFig } from './mock-figs.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const F = path.join(here, '../../src/courses/algo/data.json');
let md = fs.readFileSync(path.join(here, 'mocks-src.md'), 'utf8').replace(/\r\n/g, '\n');

// ---- text corrections made while auditing the answers (each must match exactly once) ----
const FIX = [
  ['**Why:** greedy gives $1 + $1 + 60¢ + 5¢×4 = 7 coins. Optimal gives $1 + $1 + 35¢ + 35¢ + 5¢ + 5¢ = 6 coins.',
    '**Why:** greedy takes the biggest coin each time: $1 + $1 + 60¢ + 5¢ × 4 = 7 coins. The best answer is $1 + 60¢ + 60¢ + 60¢ = 4 coins. Because 60¢ is not a "friendly" coin, taking the biggest coin first stops being optimal. For $1.95, $1.50 and $3.66 greedy happens to match the best answer (3, 5 and 6 coins).'],
  ['- **Option 4 (fewest conflicts):** Carefully built instances exist where a request with the fewest conflicts overlaps two or more requests from the optimal set. Picking it excludes them and gives a smaller schedule than the optimum. This is the standard counter-example from the interval scheduling literature.',
    '- **Option 4 (fewest conflicts):** a request with few conflicts can still sit on top of two requests that belong to the best schedule. Take these 11 requests (start–end): A 2–9, B 4–11, C 5–11, D 7–9, E 9–14, F 11–17, G 16–24, H 20–25, I 21–27, J 21–29, K 24–27. Request F has the fewest conflicts (2: only E and G), so Option 4 picks it first. That removes E and G. Every request left (A, B, C, D, H, I, J, K) now has exactly 3 conflicts, so whichever one you pick next kills the rest of its group, and the final answer is F + one of A–D + one of H–K = **3 requests**. The best schedule is A, E, G, K = **4 requests**. So Option 4 can fail too.'],
  ['**Answer: (a)**\n',
    '**Answer: (a)**\n\n> A caution: the table only gives the *best known* times. "Verifiable in polynomial time" puts X in NP, and "no known polynomial solver" is why the exam places it in NP-Complete, but strictly the table cannot rule out other regions such as (d). The exam expects (a), so give (a) in the exam.\n'],
];
for (const [a, b] of FIX) { const n = md.split(a).length - 1; if (n !== 1) throw new Error('FIX matched ' + n + ' times: ' + a.slice(0, 50)); md = md.replace(a, () => b); }

// second source: the three mock midterms and the actual midterm (items 4 to 7)
let md2 = fs.readFileSync(path.join(here, 'midterms-src.md'), 'utf8').replace(/\r\n/g, '\n').replace(/\s*\(Your pick[^)]*\)/g, '');

// ---- fenced blocks -> placeholders (so "# comment" lines inside code are not read as headings) ----
const fences = [];
const fence = (t) => t.replace(/```(\w*)\n([\s\S]*?)```/g, (m, lang, body) => { fences.push({ lang, body: body.replace(/\n$/, '') }); return `\n@@FENCE${fences.length - 1}@@\n`; });
md = fence(md); md2 = fence(md2);

// ---- inline markdown ----
const inline = (s) => {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (m, t) => { codes.push(t); return `@@C${codes.length - 1}@@`; });
  s = esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, '$1<i>$2</i>')
    .replace(/@@C(\d+)@@/g, (m, i) => `<code>${esc(codes[+i])}</code>`);
  return s;
};

// ---- block parser ----
function blocks(lines) {
  const out = []; let i = 0;
  const indent = (l) => l.match(/^ */)[0].length;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim() || /^---+$/.test(l.trim())) { i++; continue; }
    let m;
    if ((m = /^@@FENCE(\d+)@@$/.exec(l.trim()))) { out.push({ t: 'fence', ...fences[+m[1]] }); i++; continue; }
    if ((m = /^(#{3,4})\s+(.*)$/.exec(l))) { out.push({ t: 'h', text: m[2] }); i++; continue; }
    if (l.startsWith('>')) { const q = []; while (i < lines.length && lines[i].startsWith('>')) q.push(lines[i++].replace(/^>\s?/, '')); out.push({ t: 'quote', text: q.join(' ').trim() }); continue; }
    if (l.startsWith('|')) { const r = []; while (i < lines.length && lines[i].startsWith('|')) r.push(lines[i++]); out.push({ t: 'table', rows: r.filter((x) => !/^\|[\s|:-]+\|$/.test(x)).map((x) => x.replace(/^\||\|$/g, '').split('|').map((c) => c.trim())) }); continue; }
    if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
      const items = []; const ord = /^\s*\d+\./.test(l);
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        const mm = /^(\s*)([-*]|\d+\.)\s+(.*)$/.exec(lines[i]);
        if (mm[1].length >= 2 && items.length) items[items.length - 1].sub.push(mm[3]); else items.push({ text: mm[3], sub: [] });
        i++;
      }
      out.push({ t: 'list', ord, items }); continue;
    }
    if (/^\(Q\d+[^)]*(screenshot|written-response)/.test(l.trim())) { i++; continue; }
    const p = [l.trim()]; i++;
    while (i < lines.length && lines[i].trim() && !/^(\||>|#{3,4}\s|\s*([-*]|\d+\.)\s|@@FENCE|---+$)/.test(lines[i])) p.push(lines[i++].trim());
    out.push({ t: 'p', text: p.join(' ') });
  }
  return out;
}

const MARK = /✅/;
const clean = (s) => s.replace(/\s*✅/g, '').replace(/\s*\*\([^)]*\)\*/g, '').replace(/^\*\*(.*)\*\*$/, '$1').replace(/\*\*/g, '');
function render(b, hideMarks) {
  switch (b.t) {
    case 'fence':
      if (b.lang === 'mermaid') return `<pre class="mermaid">${esc(b.body)}</pre>`;
      return code(b.body, b.lang || 'text');
    case 'h': return `<h4 class="exr-sub">${inline(b.text)}</h4>`;
    case 'quote': return `<p class="chk">${inline(b.text)}</p>`;
    case 'p': return `<p>${inline(b.text)}</p>`;
    case 'list': {
      const tag = b.ord ? 'ol' : 'ul';
      return `<${tag}>${b.items.map((x) => `<li>${inline(hideMarks ? clean(x.text) : x.text)}${x.sub.length ? `<ul>${x.sub.map((y) => `<li>${inline(y)}</li>`).join('')}</ul>` : ''}</li>`).join('')}</${tag}>`;
    }
    case 'table': {
      const hd = b.rows[0], bd = b.rows.slice(1);
      return `<div class="t-table-wrap" tabindex="0"><table class="t-mini-table"><thead><tr>${hd.map((x) => `<th>${inline(x)}</th>`).join('')}</tr></thead><tbody>${bd.map((r) => `<tr>${r.map((x) => `<td>${inline(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
  }
  return '';
}

// ---- where the question ends and the answer begins ----
const ANS = /^(\*\*(Answer|Why|Working|Check|Approach|Idea|Best|One valid|How each|Trace|Tour|Step|The project|Number|Option [1-3] –|Counter|Each|Fix|Path)|Working:|Check:|Rule:|Why|Greedy criterion|Iteration|\(Iteration|Distances? |Input:|Step )/;
const hasMark = (b) => b.t === 'list' && b.items.some((x) => MARK.test(x.text));
const firstAnswer = (bl) => {
  const b0 = bl[0];
  if (!b0) return 0;
  if (b0.t === 'p' && ANS.test(b0.text)) return 0;                        // the body starts with the answer
  if (b0.t === 'list' && (b0.items.length === 1 || !b0.items.some((x) => MARK.test(x.text)))) return 0; // a bare list is the typed answer
  for (let k = 1; k < bl.length; k++) {
    const b = bl[k];
    if (b.t === 'p' && ANS.test(b.text)) return k;
    if (b.t === 'h') return k;
  }
  return bl.length;
};
// per-question overrides: number of leading blocks that belong to the question (key "mock.q")
const SPLIT = {
  '1.9': 2, '1.10': 1, '1.11': 1, '1.12': 2, '1.13': 0, '1.14': 0, '1.15': 0, '1.16': 0, '1.17': 0, '1.18': 0, '1.19': 2, '1.21': 0, '1.22': 0,
  '2.4': 1, '2.5': 0, '2.6': 0, '2.7': 0, '2.11': 2, '2.12': 0, '2.13': 0, '2.14': 0, '2.18': 5, '2.19': 6, '2.20': 0, '2.21': 0,
  '4.6': 0, '5.10': 1, '5.16': 0, '6.6': 3, '6.14': 3, '6.15': 0, '5.1': 11, '7.1': 3, '7.2': 2, '7.3': 2, '7.4': 2, '7.6': 1, '7.9': 1, '7.11': 1, '7.14': 1, '7.22': 1, '7.23': 2, '7.24': 1, '7.25': 1, '7.27': 3, '7.28': 2, '7.29': 2, '7.33': 2, '7.34': 2, '7.37': 1,
  '3.1': 1, '3.3': 2, '3.4': 8, '3.5': 0, '3.8': 2, '3.10': 1, '3.11': 0, '3.14': 0, '3.15': 2, '3.17': 1, '3.18': 5, '3.19': 2, '3.22': 1, '3.23': 5, '3.24': 0,
};
// blocks removed (key -> indexes into the block list): the old mermaid / text description of a picture that is now drawn
const DROP = { '7.13': [3, 4], '1.5': [1], '1.16': [1], '3.8': [2, 3] };
// reorder blocks (key -> new order of the original indexes, applied after DROP)
const ORDER = {
  '3.19': [0, 2, 1],
  // the four rotated seatings and the options first, the working after
  '5.1': (bl) => [...bl.slice(0, 10), bl[13], ...bl.slice(10, 13), ...bl.slice(14)],
  '7.33': [0, 2, 1, 3],
  '7.37': [2, 0, 1],
  // question tree without the shading / the new node; the shaded one moves into the answer
  '7.34': (bl) => { const f = bl[0]; const clean = { ...f, body: f.body.split('\n').filter((l) => !/^\s*style |n60 -\.->/.test(l)).join('\n') }; return [clean, bl[2], f, bl[1], bl[3]]; },
};
const RAW = {};
const QXPRE = { '7.14': () => BSEARCH(), '7.15': () => BSEARCH() }; // shown before the options
const BSEARCH = (key) => { const r = RAW['7.13']; return r ? render(r[3]) + render(r[4]) : ''; };
// figures injected at the end of the question part
const FIG = { '1.5': curveFig(), '1.16': topoFig(), '3.8': ringsFig(), '3.22': vennFig() };
// short subheaders for the questions that have no title in the source
const TITLES = {
  '1.1': 'Counting: choose 4 of 5', '1.2': 'What analysis is independent of', '1.3': 'Comparing efficiency', '1.4': 'Big-O with a constant k', '1.5': 'Reading a growth curve',
  '1.6': 'Loops over vertices and edges', '1.7': 'P, NP and NP-complete', '1.8': 'Advice for NP-hard problems',
  '2.1': 'A true statement about recursion', '2.2': 'Merge sort: a1 and a2', '2.3': 'What does the recursion return?', '2.8': 'Lowest-degree vertex', '2.9': 'Invalid BFS order',
  '2.10': 'Invalid topological ordering', '2.15': 'A false statement about approximation', '2.16': 'When greedy coin change fails', '2.17': 'Counting tours for 3 salesmen',
};
const P = (t) => `<p>${t}</p>`;
const blank = (t) => code(t, 'python');
// extra question wording (the source only had a title for these), or a function of the block list
const QX = {
  '1.12': P('Write a recursive function <code>count_two_children(t)</code> that returns the number of nodes in the binary tree <code>t</code> that have exactly two children (Figure 2).'),
  '1.13': P('Write a recursive function <code>count_descendents(t)</code> that sets <code>t.descendents</code> for every node of the tree to the number of descendants of that node.'),
  '1.14': P('What is the worst-case time complexity of the two functions above, in terms of the number of nodes n?'),
  '1.15': P('In at most 30 words, explain how topological sort differs from an ordinary sort.'),
  '1.16': P('Give one valid topological ordering of the vertices of Figure 3.'),
  '1.17': P('Each task takes one month and independent tasks can run at the same time. What is the least number of months needed to finish the whole project, and how do you find it?'),
  '1.18': P('In under 50 words, explain why the schedule can become intractable when resources (workers) are limited.'),
  '1.19': P('Start and end in Singapore (S) and visit the other four cities once each. How many different tours are possible?'),
  '1.21': P('There are n submitted requests. How many combinations of requests would a brute-force search have to examine?'),
  '1.22': P('In under 50 words, explain how this problem is similar to the Knapsack problem.'),
  '2.4': P('What is the Big-O time complexity of <code>mystery(n)</code>?'),
  '2.5': P('Fill in the table of values of <code>mystery(n)</code>.') + '<div class="t-table-wrap" tabindex="0"><table class="t-mini-table"><thead><tr><th>n</th><th>mystery(n)</th></tr></thead><tbody><tr><td>0</td><td>1</td></tr><tr><td>1</td><td>?</td></tr><tr><td>2</td><td>?</td></tr><tr><td>3</td><td>?</td></tr><tr><td>4</td><td>?</td></tr><tr><td>5</td><td>?</td></tr></tbody></table></div>',
  '2.6': P('Write <code>mystery(n)</code> in recursive form.'),
  '2.7': P('Which version, the iterative or the recursive one, has the higher time complexity? Explain.'),
  '2.12': P('Give the order in which a depth-first search from A visits the vertices of the graph (neighbours in alphabetical order). Write the letters with no spaces.'),
  '2.13': P('Give two different topological orderings of the graph.'),
  '2.14': P('Write pseudocode for a recursive topological sort that does not use depth-first search.'),
  '2.20': P('What is the Big-O time complexity of this greedy algorithm, where N is the number of dishes? State your assumptions.'),
  '2.21': P('Propose a third criterion (Option 3) that does better, and show the dishes it chooses.'),
  '3.1': P('The graph is stored as the adjacency list above. (a) How many nodes does it have? (b) How many edges? (c) What is its edge density?'),
  '3.5': P('To find the k-th smallest number in an array of n numbers, you merge-sort the array and read position k. What is the time complexity?'),
  '3.10': P('What is the worst-case time complexity of this code?'),
  '3.11': P('How many odd integers from 3000 to 9999 have all four digits different?'),
  '3.13': (bl) => P('The function above merges two sorted lists. Which rows give the correct minimum and maximum number of comparisons?') + render({ t: 'table', rows: bl[3].rows.map((r) => r.slice(0, -1)) }),
  '3.14': P('Fill in the blanks so that <code>rec_remove</code> removes every occurrence of <code>target</code> from <code>arr</code> and returns how many were removed.')
    + blank('def rec_remove(arr, target, i=0):\n    if ______:                       # (a)\n        return 0\n    elif ______:                     # (b)\n        del arr[i]\n        return 1 + rec_remove(______)    # (c)\n    else:\n        return rec_remove(______)        # (d)'),
  '3.15': P('Fill in the blanks (a) to (d) of this level-by-level (breadth-first) traversal.')
    + blank('def level_by_level_traverse(root):\n    q = Queue()\n    visit(root)\n    q.enqueue(root)\n\n    while q.count() > 0:\n        node = q.dequeue()\n        if node.left != None:\n            ______    # (a)\n            ______    # (b)\n        if node.right != None:\n            ______    # (c)\n            ______    # (d)'),
  '3.17': P('(a) How many comparisons are needed to find 32? (b) How many to search for 78? (c) Which two nodes could replace the root 43 if it were deleted?'),
  '7.37': () => P('Use the tree of Q36 and delete 50 with its inorder successor.') + (RAW['7.36'] ? render(RAW['7.36'][2]) : ''),
  '3.22': P('Assuming P ≠ NP, which Venn diagram shows the correct positions of X and Y?'),
  '3.24': P('Assign T tasks to D developers. Developer d needs time[d][t] hours for task t and has a fixed number of working hours. (a) How many assignments does brute force have to examine? (b) Give a heuristic (greedy) algorithm and its worst-case time complexity.'),
};

// ---- parse the markdown into mocks -> sections -> questions ----
function parseMocks(text, splitRe, first, skipFirst) {
  const parts = text.split(splitRe); if (skipFirst) parts.shift();
  const out = [];
  parts.forEach((txt, mi) => {
    const lines = txt.split('\n'); const mock = { n: first + mi, secs: [] }; let sec = null, q = null;
    const open = (title) => { sec = { title, qs: [] }; mock.secs.push(sec); };
    for (const l of lines) {
      let m;
      if (/^# /.test(l)) continue;
      if ((m = /^#{2,3} Q(\d+)(?:[–-]Q\d+)?(?: \(([\d.]+(?: \+ [\d.]+)*) pts?\))?(?: [–-] (.*))?$/.exec(l))) {
        if (!sec) open('Questions');
        q = { n: +m[1], pts: m[2] ? m[2].replace(/ \+ /g, '+') : null, title: (m[3] || '').trim(), sec: sec.title, lines: [] }; sec.qs.push(q); continue;
      }
      if ((m = /^## (.*)$/.exec(l))) { open(m[1].trim()); q = null; continue; }
      if (q) q.lines.push(l);
    }
    out.push(mock);
  });
  return out;
}
const NAMES = { 1: 'Mock Final 1', 2: 'Mock Final 2', 3: 'Mock Final 3', 4: 'Mock Midterm 1', 5: 'Mock Midterm 2', 6: 'Mock Midterm 3', 7: 'Actual Midterm' };
const mocks = [...parseMocks(md, /^# (?=Mock 2|Mock 3)/m, 1, false), ...parseMocks(md2, /^# (?=Mock Midterm|Actual Midterm)/m, 4, true)];

const strip = (s) => s.replace(/[*`✅]/g, '').replace(/\s+/g, ' ').trim();
const outMocks = [];
const dump = process.argv.includes('--dump');
for (const mock of mocks) {
  let count = 0; const secHtml = [];
  mock.secs.forEach((sec, si) => {
    const cards = sec.qs.map((q) => {
      const key = `${mock.n}.${q.n}`;
      const raw = blocks(q.lines); RAW[key] = raw;
      let bl = raw.filter((b, k) => !(DROP[key] || []).includes(k));
      if (typeof ORDER[key] === 'function') bl = ORDER[key](bl); else if (ORDER[key]) bl = ORDER[key].map((k) => bl[k]);
      if (process.argv.includes('--blocks')) console.log(key, bl.map((b, k) => `${k}:${b.t}:${(b.text || (b.items && b.items[0].text) || (b.rows && b.rows[0].join('/')) || b.body || '').toString().slice(0, 28).replace(/\s+/g, ' ')}`).join(' | '));
      let cut = SPLIT[key] ?? firstAnswer(bl);
      let Q = bl.slice(0, cut), A = bl.slice(cut);
      // option lists in the question: strip the marks; remember the right options
      const right = [];
      let hinted = null;
      Q.forEach((b) => { if (b.t === 'list') { b.items.forEach((x) => { if (MARK.test(x.text)) right.push(x.text.replace(/\s*✅/g, '')); }); if (b.items.some((x) => /\*\([^)]*\)\*/.test(x.text))) hinted = b; } });
      let title = q.title.replace(/`/g, '') || TITLES[key] || q.sec || 'Question ' + q.n;
      const chip = `${NAMES[mock.n].toUpperCase()} · Q${q.n}${q.pts ? ` · ${q.pts} PT${q.pts === '1' ? '' : 'S'}` : ''}`;
      let qh = Q.map((b) => render(b, true)).join('');
      const xq = typeof QX[key] === 'function' ? QX[key](bl) : QX[key];
      if (xq) qh += xq;
      if (QXPRE[key]) qh = QXPRE[key]() + qh;
      if (FIG[key]) qh += FIG[key];
      let ah = '';
      if (right.length && !(A[0] && A[0].t === 'p' && /^\*\*Answer/.test(A[0].text))) ah += `<p><b>Correct option${right.length > 1 ? 's' : ''}.</b></p><ul>${right.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>`;
      ah += A.map((b) => render(b, false)).join('');
      if (hinted) ah += `<p><b>Option by option.</b></p>` + render({ ...hinted, items: hinted.items.map((x) => ({ ...x, text: x.text.replace(/\s*✅/g, '') })) }, false);
      if (dump) console.log(key.padEnd(5), `Q=${Q.length} A=${A.length}`, '|', (Q[Q.length - 1] ? (Q[Q.length - 1].text || Q[Q.length - 1].t) : '').toString().slice(0, 50), '|', (A[0] ? (A[0].text || A[0].t) : '(none)').toString().slice(0, 50));
      count++;
      return `<div class="exr reveal"><div class="exr-head"><span class="cf-tag">${chip}</span><h4>${inline(title)}</h4></div>${qh ? `<div class="exr-q"><div>${qh}</div></div>` : ''}`
        + `<details class="model"><summary>Show answer</summary><div class="ma">${ah}</div></details></div>`;
    });
    secHtml.push(`<div class="t-section" id="msec${mock.n}-${si}" data-gen="1"><div role="heading" aria-level="2" class="t-h2">${inline(sec.title)}</div>${cards.join('')}</div>`);
  });
  outMocks.push({ n: mock.n, title: NAMES[mock.n], count, html: secHtml.join('') });
}
if (dump) process.exit(0);
const D = JSON.parse(fs.readFileSync(F, 'utf8'));
D.mocks = outMocks;
D.exam = { mcq: [], wr: [] }; // the old Past Exam tab is scrapped (replaced by Exam Practice)
fs.writeFileSync(F, JSON.stringify(D));
console.log('mocks:', outMocks.map((m) => `${m.title}: ${m.count}`).join(', '));
