// Report: which in-section units tell the same story as each end-of-chapter case file?
import { parseHTML } from 'file:///C:/Users/RUIHEN~1/AppData/Local/Temp/claude/cfae48da7b4a6b5b/3a4de062-91ec-4162-95f7-8576d9042e7f/scratchpad/node_modules/linkedom/esm/index.js';
import fs from 'node:fs';
const course = process.argv[2];
const only = process.argv[3] ? process.argv[3].split(',').map(Number) : null;
const D = JSON.parse(fs.readFileSync(`src/courses/${course}/data.json`, 'utf8'));
const STOP = new Set('about above after again also because before between could does during each either every from have having here into just more most much must other over same should since some such than that their them then there these they this those through under until very were what when where which while will with would your the and for are not you can its was has had how why who our out any all one two three four five six seven eight nine ten first second third next last only both many often then like make made use used using uses'.split(' '));
const tok = (s) => new Set((s.toLowerCase().match(/[a-z0-9][a-z0-9'’.-]{3,}/g) || []).filter((w) => !STOP.has(w)));
const txt = (e) => e.textContent.replace(/\s+/g, ' ').trim();
const df = new Map();
D.lessons.forEach((l) => tok(l.html.replace(/<[^>]+>/g, ' ')).forEach((w) => df.set(w, (df.get(w) || 0) + 1)));
const rare = (set) => [...set].filter((w) => (df.get(w) || 0) <= 3);

for (const l of D.lessons) {
  if (only && !only.includes(l.n)) continue;
  const { document } = parseHTML('<div id="r">' + l.html + '</div>');
  const root = document.getElementById('r');
  const isCaseSec = (s) => /Real-life case files/.test(s.querySelector('.t-h2')?.textContent || '');
  const cfs = [...root.querySelectorAll('.case-file')].filter((c) => c.closest('.t-section') && isCaseSec(c.closest('.t-section')));
  if (!cfs.length) continue;
  const units = [];
  for (const s of root.querySelectorAll('.t-section')) {
    if (isCaseSec(s)) continue;
    const h = s.querySelector('.t-h2')?.textContent || '';
    if (/Quick examples|30 seconds|Flip to recall/.test(h)) continue;
    [...s.children].forEach((k, i) => { if (!/t-h2/.test(k.className)) units.push({ el: k, sec: txt(s.querySelector('.t-h2') || s).slice(0, 30), i }); });
  }
  console.log(`\n=== ${course} CH ${l.n} ${l.title}`);
  for (const c of cfs) {
    const title = txt(c.querySelector('h3'));
    const R = rare(tok(txt(c)));
    const scored = units.map((u) => { const t = tok(txt(u.el)); const hit = R.filter((w) => t.has(w)); return { u, hit: hit.length }; }).filter((x) => x.hit >= 3).sort((a, b) => b.hit - a.hit).slice(0, 4);
    console.log(` CASE "${title}" (rare terms ${R.length})`);
    scored.forEach((x) => console.log(`    ${x.hit}/${R.length} [${x.u.sec} #${x.u.i} ${x.u.el.tagName.toLowerCase()}.${x.u.el.className}] ${txt(x.u.el).slice(0, 90)}`));
    if (!scored.length) console.log('    (no in-section telling found)');
  }
}
