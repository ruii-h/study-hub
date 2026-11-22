// Finds topics (rare words) that are discussed in 3+ separate segments of one lesson: segments are sections, case files, callouts and recap blocks.
import fs from 'node:fs';
const course = process.argv[2];
const minSeg = +(process.argv[4] || 3);
const only = process.argv[3] && process.argv[3] !== 'all' ? process.argv[3].split(',').map(Number) : null;
const D = JSON.parse(fs.readFileSync(`src/courses/${course}/data.json`, 'utf8'));
const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9x]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const STOP = new Set('about above after again also because before between could does during each either every from have having here into just more most much must other over same should since some such than that their them then there these they this those through under until very were what when where which while will with would your the and for are not you can its was has had how why who our out any all one two three four five six seven eight nine ten first second third next last only both many often then like make made use used using uses'.split(' '));
const tok = (s) => (s.toLowerCase().match(/[a-z][a-z'’-]{3,}/g) || []).filter((w) => !STOP.has(w));

// document frequency across lessons
const df = new Map();
const lessonToks = D.lessons.map((l) => new Set(tok(strip(l.html))));
lessonToks.forEach((s) => s.forEach((w) => df.set(w, (df.get(w) || 0) + 1)));

for (const l of D.lessons) {
  if (only && !only.includes(l.n)) continue;
  // segments: split at section / case-file / callout / unit starts
  const marks = [...l.html.matchAll(/<div class="(?:t-section|case-file|t-callout|t-unit|glance|core|recall|bridge|road)\b[^>]*>/g)].map((m) => m.index);
  const cuts = [0, ...marks, l.html.length];
  const segs = [];
  for (let i = 0; i < cuts.length - 1; i++) {
    const t = strip(l.html.slice(cuts[i], cuts[i + 1]));
    if (t.length > 120) segs.push({ t, title: t.slice(0, 70), set: new Set(tok(t)) });
  }
  const count = new Map();
  segs.forEach((s, i) => s.set.forEach((w) => { if ((df.get(w) || 0) <= 3) { if (!count.has(w)) count.set(w, []); count.get(w).push(i); } }));
  const groups = new Map();
  for (const [w, idx] of count) if (idx.length >= minSeg) { const k = idx.join(','); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(w); }
  const out = [...groups.entries()].filter(([, ws]) => ws.length >= 2).sort((a, b) => b[1].length - a[1].length).slice(0, 8);
  console.log(`\n=== ${course} CH ${l.n} ${l.title} (${segs.length} segments)`);
  out.forEach(([k, ws]) => console.log(`  [${ws.slice(0, 6).join(', ')}] in segments ${k.split(',').map((i) => i + ':' + segs[i].title.slice(0, 40)).join(' | ')}`));
}
