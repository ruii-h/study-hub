// node tools/export-bank.mjs  -> exports/<course>-question-bank.md for every guide
import fs from 'fs';
const NL = String.fromCharCode(10);
const s = (x) => String(x || '').replace(/<code>([^<]*)<\/code>/g, '`$1`').replace(/<[^>]+>/g, '').replace(/&(\w+);/g, (m, a) => ({ lt: '<', gt: '>', amp: '&', quot: '"' }[a] || m)).trim();
const names = { cf: 'IS114 Computing Fundamentals', algo: 'IS115 Algorithms & Programming', bpas: 'IS210 Business Process Analysis & Solutioning', idp: 'IS211 Interaction Design & Prototyping', ctp: 'IS1704 Computational Thinking & Programming' };
fs.mkdirSync('exports', { recursive: true });
for (const c of Object.keys(names)) {
  const d = JSON.parse(fs.readFileSync(`src/courses/${c}/data.json`, 'utf8'));
  let n = 0, o = `# ${names[c]}: question bank${NL}${NL}Types: **MCQ** one correct option, **MSQ** select all that apply, **Fill** type the answer, **Short** short answer (self-marked). Correct options are marked ✅.${NL}`;
  for (const l of d.lessons) {
    o += `${NL}---${NL}${NL}## Chapter ${l.n}. ${s(l.title)}${NL}`;
    (d.quiz[l.n] || []).forEach((q) => { o += `${NL}${++n}. **[MCQ]** ${s(q.q)}${NL}` + q.o.map((x, j) => `   - ${j === q.c ? '✅ ' : ''}${s(x)}`).join(NL) + NL + (q.e ? `   *Why:* ${s(q.e)}${NL}` : ''); });
    (d.hard[l.n] || []).forEach((q) => { o += `${NL}${++n}. **[MSQ]** ${s(q.q)}${NL}` + q.o.map((x, j) => `   - ${q.a.includes('ABCDE'[j]) ? '✅ ' : ''}${s(x)}`).join(NL) + NL + (q.e ? `   *Why:* ${s(q.e)}${NL}` : ''); });
    (d.fill?.[l.n] || []).forEach((q) => { const a = q.a.filter((x) => !x.startsWith('re:')); o += `${NL}${++n}. **[${q.kind === 'self' ? 'Short' : 'Fill'}]** ${s(q.q)}${NL}   **Answer:** ${a.slice(0, 3).map((x) => (q.kind === 'cmd' || q.kind === 'out') && x.length < 90 ? '`' + x + '`' : x).join('  or  ') || '(keyword-checked)'}${NL}` + (q.e ? `   *Note:* ${s(q.e)}${NL}` : ''); });
  }
  fs.writeFileSync(`exports/${c}-question-bank.md`, o);
  console.log(c, n);
}
