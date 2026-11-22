// usage: node tools/dump.mjs <course> <chapter|all>  -> compact print of the chapter questions for auditing
import fs from 'fs';
const [c, ch] = process.argv.slice(2); const d = JSON.parse(fs.readFileSync(`src/courses/${c}/data.json`, 'utf8'));
const s = (x) => String(x || '').replace(/<[^>]+>/g, '').replace(/&(\w+);/g, (m, a) => ({ lt: '<', gt: '>', amp: '&', quot: '"' }[a] || m));
for (const l of d.lessons) { if (ch !== 'all' && +ch !== l.n) continue;
  console.log('## ' + l.n + ' ' + l.title);
  (d.hard[l.n] || []).forEach((q, i) => { console.log(`H${i} ${s(q.q)}`); q.o.forEach((o, j) => console.log(`  ${q.a.includes('ABCDE'[j]) ? '+' : '-'} ${s(o)}${q.w && q.w[j] ? '  // ' + s(q.w[j]).replace(/^(True|False): /, '').slice(0, 95) : ''}`)); });
  (d.quiz[l.n] || []).forEach((q, i) => { console.log(`Q${i} ${s(q.q)}`); q.o.forEach((o, j) => console.log(`  ${j === q.c ? '+' : '-'} ${s(o)}${q.w && q.w[j] ? '  // ' + s(q.w[j]) : ''}`)); });
}
