import fs from 'fs';
const s = (x) => String(x || '').replace(/<[^>]+>/g, '').replace(/&(\w+);/g, (m, a) => ({ lt: '<', gt: '>', amp: '&', quot: '"' }[a] || m));
const ABS = /\b(always|never|only|all|none|any|completely|entirely|must|cannot|no need|impossible|guarantee|every|best|proves?)\b/i;
for (const c of process.argv.slice(2)) {
  const d = JSON.parse(fs.readFileSync(`src/courses/${c}/data.json`, 'utf8'));
  for (const l of d.lessons) {
    (d.hard[l.n] || []).forEach((q, i) => q.o.forEach((o, j) => {
      const ok = q.a.includes('ABCDE'[j]);
      if (ABS.test(s(o))) console.log(`${c} ch${l.n} H${i}${'ABCDE'[j]} ${ok ? '+' : '-'} ${s(o)}  //${s(q.w?.[j]).replace(/^(True|False): /, '')}`);
    }));
  }
}
