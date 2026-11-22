// Sentence-level redundancy check: which sentences of "extra" units are already said elsewhere in the same lesson?
import { parseHTML } from 'file:///C:/Users/RUIHEN~1/AppData/Local/Temp/claude/cfae48da7b4a6b5b/3a4de062-91ec-4162-95f7-8576d9042e7f/scratchpad/node_modules/linkedom/esm/index.js';
import fs from 'node:fs';
const [course, lessonN, thr = '0.55'] = process.argv.slice(2);
const D = JSON.parse(fs.readFileSync(`src/courses/${course}/data.json`, 'utf8'));
const STOP = new Set('the a an and or of to in is are was were be been it its that this these those for on with as by at from not no do does did can could should would will which what who how why when where than then so if but into out up down over under more most such only same too very just also may might must have has had their there they them he she his her we you your our i me my one all any each both either neither true false because'.split(' '));
const words = (s) => (s.toLowerCase().match(/[a-z0-9][a-z0-9'’-]*/g) || []).filter((w) => !STOP.has(w)).map((w) => w.replace(/(ing|ed|es|s)$/, ''));
const grams = (w, k = 2) => { const g = new Set(); for (let i = 0; i + k <= w.length; i++) g.add(w.slice(i, i + k).join(' ')); return g; };
const l = D.lessons.find((x) => x.n == +lessonN);
const { document } = parseHTML('<div id="r">' + l.html + '</div>');
const root = document.getElementById('r');
const txt = (e) => e.textContent.replace(/\s+/g, ' ').trim();
const units = [...root.querySelectorAll('.t-section > .t-unit, .t-section > .t-callout')].filter((u) => !/case/.test(u.className));
for (const u of units) {
  const sents = txt(u).split(/(?<=[.!?])\s+(?=[A-Z("“])/);
  const rest = [...root.querySelectorAll('.t-section')].filter((s) => !/30 seconds|Flip to recall|Quick examples|case files/.test(txt(s.querySelector('.t-h2') || s))).map((s) => {
    const c = s.cloneNode(true); c.querySelectorAll('.t-unit,.t-callout').forEach((x) => { if (x === u) x.remove(); }); return txt(c);
  }).join(' ');
  // exclude the unit itself from the reference: crude: remove its text
  const ref = grams(words(rest.replace(txt(u), '')));
  let dropped = 0; const lines = [];
  sents.forEach((s) => { const g = grams(words(s)); if (g.size < 4) return; let h = 0; g.forEach((x) => { if (ref.has(x)) h++; }); const cov = h / g.size; if (cov >= +thr) { dropped++; lines.push('   - ' + s.slice(0, 100)); } });
  if (sents.length > 1) console.log(`${txt(u).slice(0, 60)} :: ${dropped}/${sents.length} sentences covered elsewhere`);
  if (process.argv[5]) lines.forEach((x) => console.log(x));
}
