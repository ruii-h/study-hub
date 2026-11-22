// Merges the question batches in tools/qs/*.mjs into the IDP exam-style (hard) question sets.
// Each question: [chapter, stem, [five options], 'ACE' (correct letters), explanation, [five per-option reasons]]
// "True: " / "False: " is added to each reason from the answer key, so the reasons can never contradict it.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const f = 'src/courses/idp/data.json';
const D = JSON.parse(fs.readFileSync(f, 'utf8'));
const dir = 'tools/qs';
let added = 0, skipped = 0;
const bad = [];
for (const file of fs.readdirSync(dir).filter((x) => x.endsWith('.mjs')).sort()) {
  const { default: list } = await import(pathToFileURL(path.resolve(dir, file)).href);
  list.forEach(([ch, q, o, a, e, w], i) => {
    const tag = `${file}#${i}`;
    if (!D.hard[ch]) return bad.push(tag + ' chapter');
    if (o.length !== 5 || w.length !== 5 || !/^[A-E]{1,4}$/.test(a) || new Set(a).size !== a.length) return bad.push(tag + ' shape');
    const truth = [...a].map((l) => 'ABCDE'.indexOf(l));
    if (truth.length === 5) return bad.push(tag + ' all correct');
    const wl = w.map((t, j) => (truth.includes(j) ? 'True: ' : 'False: ') + t);
    if (D.hard[ch].some((x) => x.q === q)) { skipped++; return; }
    D.hard[ch].push({ q, o, a, e, w: wl });
    added++;
  });
}
if (bad.length) throw new Error('bad: ' + bad.join(', '));
fs.writeFileSync(f, JSON.stringify(D));
console.log('added', added, 'skipped', skipped, Object.entries(D.hard).map(([k, v]) => k + ':' + v.length).join(' '));
