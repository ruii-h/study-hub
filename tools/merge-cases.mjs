// Groups every end-of-chapter case file with the in-section passages that tell the same story:
// the case file moves to where the story is first told, the other tellings are folded into it, and the duplicate case-file list is removed.
// usage: node tools/merge-cases.mjs <idp|algo|bpas> [lessons] [--apply]
import { parseHTML } from 'file:///C:/Users/RUIHEN~1/AppData/Local/Temp/claude/cfae48da7b4a6b5b/3a4de062-91ec-4162-95f7-8576d9042e7f/scratchpad/node_modules/linkedom/esm/index.js';
import fs from 'node:fs';
const args = process.argv.slice(2);
const apply = args.includes('--apply');
const course = args[0];
const only = args[1] && !args[1].startsWith('--') ? args[1].split(',').map(Number) : null;
const file = `src/courses/${course}/data.json`;
const D = JSON.parse(fs.readFileSync(file, 'utf8'));
const STOP = new Set('about above after again also because before between could does during each either every from have having here into just more most much must other over same should since some such than that their them then there these they this those through under until very were what when where which while will with would your the and for are not you can its was has had how why who our out any all one two three four five six seven eight nine ten first second third next last only both many often then like make made use used using uses'.split(' '));
const tok = (s) => new Set((s.toLowerCase().match(/[a-z0-9][a-z0-9'’.-]{3,}/g) || []).map((w) => w.replace(/[.'’-]+$/, '').replace(/['’]s$/, '').replace(/.com$/, '')).filter((w) => w.length >= 4 && !STOP.has(w)));
const txt = (e) => e.textContent.replace(/\s+/g, ' ').trim();
const df = new Map();
D.lessons.forEach((l) => tok(l.html.replace(/<[^>]+>/g, ' ')).forEach((w) => df.set(w, (df.get(w) || 0) + 1)));
const rare = (set) => new Set([...set].filter((w) => (df.get(w) || 0) <= 7));
const RECAP = /Quick examples|30 seconds|Flip to recall|Real-life case files|Pause & recall|Roadmap/;
const hits = (U, R) => { let h = 0; U.forEach((w) => { if (R.has(w)) h++; }); return h; };

let moved = 0, grouped = 0;
for (const l of D.lessons) {
  if (only && !only.includes(l.n)) continue;
  const { document } = parseHTML('<div id="r">' + l.html + '</div>');
  const root = document.getElementById('r');
  const caseSec = [...root.querySelectorAll('.t-section')].find((s) => /Real-life case files/.test(s.querySelector('.t-h2')?.textContent || ''));
  if (!caseSec) continue;
  const cfs = [...caseSec.querySelectorAll('.case-file')].map((cf) => ({ cf, title: txt(cf.querySelector('h3')), R: rare(tok(txt(cf))), items: [] }));
  const bodySecs = [...root.querySelectorAll('.t-section')].filter((s) => s !== caseSec && !RECAP.test(s.querySelector('.t-h2')?.textContent || ''));
  // blocks we can move: direct children of "case" containers, plus stand-alone leaf blocks of sections
  const blocks = [];
  const seenEl = new Set();
  bodySecs.forEach((s) => {
    s.querySelectorAll('.t-unit.case,.t-callout.case').forEach((k) => {
      if (k.parentElement.closest('.t-unit.case,.t-callout.case')) return; // outermost case container only
      [...k.children].forEach((c) => { if (seenEl.has(c)) return; seenEl.add(c); if (/^(UL|OL)$/.test(c.tagName) && c.children.length >= 3) [...c.children].forEach((li) => blocks.push({ e: li, cont: k, inCase: true })); else blocks.push({ e: c, cont: k, inCase: true }); });
    });
    [...s.children].forEach((k) => {
      if (/t-h2|^sub$/.test(k.className) || seenEl.has(k)) return;
      if (/case/.test(k.className)) return;
      if (/^(P|UL|OL|BLOCKQUOTE)$/.test(k.tagName)) blocks.push({ e: k, cont: null, inCase: false });
    });
  });
  const claimed = new Set();
  // 1) which case does each "case" container belong to?
  const contBest = new Map();
  blocks.filter((b) => b.inCase).forEach((b) => {
    const k = b.cont; if (contBest.has(k)) return;
    const own = [...k.children].filter((c) => /^(H3|P|UL|OL)$/.test(c.tagName)).map(txt).join(' ');
    const U = rare(tok(own));
    let best = null, bh = 0; cfs.forEach((c) => { const h = hits(U, c.R); if (h > bh) { bh = h; best = c; } });
    contBest.set(k, bh >= 5 ? best : null);
  });
  // 2) assign each block
  blocks.forEach((b) => {
    const U = rare(tok(txt(b.e)));
    let best = null, bh = 0; cfs.forEach((c) => { const h = hits(U, c.R); if (h > bh) { bh = h; best = c; } });
    let target = null;
    if (b.inCase) { target = contBest.get(b.cont); if (best && best !== target && bh >= 4 && bh / Math.max(1, U.size) >= 0.25 && !/^H3$/.test(b.e.tagName)) target = best; }
    else if (best && bh >= 5 && bh / Math.max(1, U.size) >= 0.25) target = best;
    if (target && !/^H3$/.test(b.e.tagName) && hits(U, target.R) < 1) target = null; // unrelated tidbit: leave where it is
    if (target && /:s*$/.test(txt(b.e)) && txt(b.e).length <= 90) { b.drop = true; }
    if (target) target.items.push(b);
  });
  console.log(`\n=== ${course} CH ${l.n} ${l.title}`);
  for (const c of cfs) {
    if (!c.items.length) { console.log(` CASE "${c.title}" -> no in-section telling; kept as is`); continue; }
    console.log(` CASE "${c.title}" <- ${c.items.length} block(s)`);
    c.items.forEach((b) => console.log(`      ${b.inCase ? '[case]' : '[text]'} ${txt(b.e).slice(0, 90)}`));
  }
  if (!apply) continue;
  for (const c of cfs) {
    if (!c.items.length) continue;
    c.items.filter((b) => b.drop).forEach((b) => b.e.remove());
    const caseBlocks = c.items.filter((b) => b.inCase && !b.drop).map((b) => b.e);
    const textBlocks = [];
    c.items.filter((b) => !b.inCase).forEach((b) => {
      const pv = b.e.previousElementSibling;
      if (pv && pv.tagName === 'P' && /^(further )?worked (example|case)/i.test(txt(pv)) && txt(pv).length <= 120) { if (!caseBlocks.includes(pv)) caseBlocks.push(pv); caseBlocks.push(b.e); }
      else textBlocks.push(b.e);
    });
    if (!caseBlocks.length) {
      // the story is told in the running text: put the case card right after that text instead of at the end of the chapter
      textBlocks.sort((x, y) => (x.compareDocumentPosition(y) & 4 ? -1 : 1));
      const last = textBlocks[textBlocks.length - 1];
      last.parentElement.insertBefore(c.cf, last.nextSibling);
      grouped++; continue;
    }
    caseBlocks.sort((x, y) => (x.compareDocumentPosition(y) & 4 ? -1 : 1));
    const first = caseBlocks[0].tagName === 'LI' ? caseBlocks[0].parentElement : caseBlocks[0];
    const row = document.createElement('div'); row.className = 'cf-row d';
    const lab = document.createElement('b'); lab.textContent = 'More from the lecture';
    const body = document.createElement('div'); body.className = 'cf-more';
    row.append(lab, body); c.cf.appendChild(row);
    first.parentElement.insertBefore(c.cf, first);
    let ul = null;
    caseBlocks.forEach((e) => { if (e.tagName === 'H3') e.remove(); else if (e.tagName === 'LI') { if (!ul) { ul = document.createElement('ul'); ul.className = 't-rule-list'; body.appendChild(ul); } ul.appendChild(e); } else { ul = null; body.appendChild(e); } });
    moved += caseBlocks.length; grouped++;
  }
  root.querySelectorAll('ul,ol').forEach((u) => { if (!u.children.length) u.remove(); });
  root.querySelectorAll('.t-unit,.t-callout').forEach((u) => { if (!txt(u) && !u.querySelector('table,svg,img,.case-file')) u.remove(); });
  if (!caseSec.querySelector('.case-file')) caseSec.remove();
  else { const s = caseSec.querySelector('.sub'); if (s) s.textContent = 'Cases that are not told in the lecture text above.'; }
  l.html = root.innerHTML;
}
if (apply) { fs.writeFileSync(file, JSON.stringify(D)); console.log(`\napplied: ${grouped} case files grouped, ${moved} blocks folded in`); }
