// Slide-to-site coverage: lists slide lines whose words are mostly absent from the matching module.
// usage: node tools/bpas-modules/cov2.mjs [file-substring ...]
import fs from 'node:fs';
const SP = 'C:/Users/RUIHEN~1/AppData/Local/Temp/claude/062b3dc8fd658c53/046e5561-9f9b-4f91-975f-a445f33456ea/scratchpad/slides/';
const d = JSON.parse(fs.readFileSync('src/courses/bpas/data.json', 'utf8'));
const norm = (s) => s.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9%'\s]/g, ' ');
const words = (s) => norm(s).split(/\s+/).filter((w) => w.length >= 4);
const text = (l) => norm(l.html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<[^>]+>/g, ' ') + ' ' + JSON.stringify([d.hard[l.n], d.quiz[l.n]]));
const all = d.lessons.map(text); const setAll = new Set(all.join(' ').split(/\s+/));
const MAP = { 'M01-Business-IT-Alignment-Student': 1, 'M02-Business-Process-Modelling-P1-Student': 2, 'M03-Business-Process-Modelling-P2-Student': 3, 'M04-Business-Process-Modelling-Exercises-Student': 4, 'M05-Business-Process-Analysis-P1-Student': 5, 'M06-Business-Process-Analysis-P2-Student': 6, 'M07-Business-Process-Analysis-Exercises-Student': 7, 'M08-Business-Process-Solutioning-P1-Student': 8, 'M09-Business-Process-Solutioning-P2-Student': 9, 'M10-Business-Process-Innovation-P1-Student': 10, 'M11-Business-Process-Innovation-P2-Student': 11, 'M12-Business-Process-Innovation-P3-Student': 12, 'Course-Review': 13 };
const only = process.argv.slice(2);
for (const [file, n] of Object.entries(MAP)) {
  if (only.length && !only.some((o) => file.includes(o))) continue;
  const f = fs.readdirSync(SP).find((x) => x.includes(file)); if (!f) { console.log('NO FILE', file); continue; }
  const set = new Set(all[n - 1].split(/\s+/)); let slide = '', miss = 0, tot = 0;
  const lines = [];
  for (const raw of fs.readFileSync(SP + f, 'utf8').replace(/\r/g, '').split('\n')) {
    if (/^--- (slide|page)/.test(raw)) { slide = raw.replace(/-/g, '').trim(); continue; }
    const line = raw.trim(); if (line.length < 22 || /IS210-Business|smu.sg|^IS210-|^\[notes\]|Singapore Management|^\d+$/.test(line)) continue;
    const w = words(line); if (w.length < 3) continue; tot++;
    const hit = w.filter((x) => set.has(x)).length / w.length;
    if (hit < 0.6) { miss++; const ha = w.filter((x) => setAll.has(x)).length / w.length; lines.push(`  [${slide}] ${hit.toFixed(2)}${ha >= 0.6 ? ' (elsewhere)' : ''} ${line.slice(0, 160)}`); }
  }
  console.log(`\n###### M${n} ${f}: ${miss}/${tot} lines low`); console.log(lines.join('\n'));
}
