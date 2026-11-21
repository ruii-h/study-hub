// One-off: removes the course-slide "source tags" (e.g. "W1 · A.1", "W01·M01 p.5", "L3 · s12") from the lesson HTML.
// Only chips whose text looks like a slide/week reference are touched; pre-existing empty elements are left alone.
import fs from 'node:fs';

const SRC = /^(W\d+[a-z]?\s*(·|p\.)|W\d+\b|L\d+\b|Week-?\s?\d+)/;
const CHIP = '<span class="chip">([^<]*)</span>';

for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/data.json`;
  const D = JSON.parse(fs.readFileSync(f, 'utf8'));
  let removed = 0;
  const kept = [];
  const allSrc = (html) => [...html.matchAll(/<span class="chip">([^<]*)</g)].every((x) => SRC.test(x[1].trim()));

  const fix = (s) => {
    // A. paragraphs that contain nothing but source chips (ALGO: <p class="srcline">, IDP/BPAS: plain <p>)
    s = s.replace(new RegExp(`<p(?: class="srcline")?>((?:\\s*${CHIP})+)\\s*</p>`, 'g'), (m, inner) =>
      allSrc(inner) ? ((removed += (inner.match(/<span class="chip">/g) || []).length), '') : m);
    // B. inline source chips, together with the whitespace before them
    s = s.replace(new RegExp(`\\s*${CHIP}`, 'g'), (m, t) => (SRC.test(t.trim()) ? (removed++, '') : (kept.push(t), m)));
    return s;
  };
  const walk = (o) => {
    if (typeof o === 'string') return o.includes('class="chip"') ? fix(o) : o;
    if (Array.isArray(o)) return o.map(walk);
    if (o && typeof o === 'object') return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, walk(v)]));
    return o;
  };
  fs.writeFileSync(f, JSON.stringify(walk(D)));
  const left = (fs.readFileSync(f, 'utf8').match(/class=\\"chip\\"/g) || []).length;
  console.log(id, 'removed', removed, 'chips left', left, kept.slice(0, 5));
}
