// Fills blank "group" cells explicitly (no rowspan/merged cells) and fixes table slips. Idempotent.
import fs from 'fs';
const P = 'src/courses/bpas/data.json';
let s = fs.readFileSync(P, 'utf8');
const tabs = s.match(/<table[\s\S]*?<\/table>/g);
const rowsOf = (t) => [...t.matchAll(/<tr>[\s\S]*?<\/tr>/g)].map((m) => m[0]);
const cellsOf = (r) => [...r.matchAll(/<td[^>]*>[\s\S]*?<\/td>/g)].map((m) => m[0]);
const carry = (t, cols) => {
  const last = {}; let out = t;
  for (const r of rowsOf(t)) {
    const cs = cellsOf(r); let nr = r;
    cols.forEach((c) => {
      if (!cs[c]) return;
      if (/^<td[^>]*><\/td>$/.test(cs[c])) { if (last[c]) { const cs2 = cellsOf(nr); nr = nr.replace(cs2[c], last[c]); } }
      else last[c] = cs[c];
    });
    if (nr !== r) out = out.replace(r, nr);
  }
  return out;
};
const find = (hdr) => tabs.find((t) => t.includes(hdr));
const swap = (from, to) => { if (!s.includes(from)) return; s = s.split(from).join(to); };
const rep = (t, fn) => { const n = fn(t); if (n !== t) s = s.split(t).join(n); };

rep(find('<th>Use case</th>') && tabs.find((t) => t.includes('<th>Technical notes</th>')), (t) => carry(t, [0, 1]));
rep(tabs.find((t) => t.includes('<th>Use case</th>') && t.includes('<th>Comments</th>')), (t) => carry(t, [0, 1]));
rep(tabs.find((t) => t.includes('<th>Cost type</th>')), (t) => carry(t, [0]));
rep(tabs.find((t) => t.includes('<th>Theme</th>')), (t) => carry(t, [0]));
rep(tabs.find((t) => t.includes('<th>Level 1</th>')), (t) => carry(t, [0]));
// table 9: deliverables with no listed challenge
rep(tabs.find((t) => t.includes('Requirements specification</td>') && t.includes('Limited stakeholder availability')), (t) => t.replace(/(<td>(?:Requirements specification|Baseline assessment)<\/td>\\n)<td><\/td>\\n<td><\/td>/g, '$1<td>—</td>\\n<td>—</td>'));
// functional vs non-functional: missing label cell
swap('<tr>\\n<td><strong class=\\"k-c\\">This course</strong></td>\\n<td><strong class=\\"k-c\\">A later course</strong></td>', '<tr>\\n<td>Covered in</td>\\n<td><strong class=\\"k-c\\">This course</strong></td>\\n<td><strong class=\\"k-c\\">A later course</strong></td>');
// cost rating table: numbers for the unnumbered sub-items, dashes for totals
rep(tabs.find((t) => t.includes('Hardware total')), (t) => {
  let n = t;
  const num = { Design: '4.1.2', Construction: '4.1.3', Test: '4.1.4', Documentations: '4.1.5', 'Project management': '4.1.6' };
  for (const [k, v] of Object.entries(num)) n = n.replace(new RegExp('<td></td>(\\\n<td>' + k + '</td>)'), `<td>${v}</td>$1`);
  n = n.replace(/<td><\/td>(\\n<td>Modifications<\/td>)/, '<td>4.2.2</td>$1');
  n = n.replace(/(<td>(?:Hardware|Software|Process redesign) total<\/td>\\n)<td><\/td>\\n<td><\/td>/g, '$1<td>—</td>\\n<td>—</td>');
  n = n.replace(/(<td>Application [AB]<\/td>\\n)<td><\/td>\\n<td><\/td>/g, '$1<td>—</td>\\n<td>—</td>');
  n = n.replace(/(<td>Design and implementation<\/td>\\n)<td><\/td>\\n<td><\/td>\\n<td><\/td>/, '$1<td>—</td>\\n<td>—</td>\\n<td>—</td>');
  return n;
});
// SUBWAY total row
rep(tabs.find((t) => t.includes('4.3 min')), (t) => t.replace(/(<td>\$1\.105<\/td>\\n)<td><\/td>\\n<td><\/td>/, '$1<td>—</td>\\n<td>—</td>'));
// cycle-time table total row
rep(tabs.find((t) => t.includes('Expected cycle time')), (t) => t.replace(/<td><\/td>\\n<td><\/td>\\n<td><\/td>\\n(<td>[^\\n]*?Expected cycle time[^\\n]*?<\/td>)/, '<td>Total</td>\\n<td>—</td>\\n<td>—</td>\\n$1'));
// path table: separate Weighted averages row, no blank cells, slide value incl. seconds
rep(tabs.find((t) => t.includes('Weighted averages')), (t) => t
  .replace('<td></td>\\n<td><strong class=\\"k-c\\">Weighted averages', '<td>All</td>\\n<td><strong class=\\"k-c\\">Weighted averages')
  .replace('21 h 18 min</strong>', '21 h 18 min 19.567 s</strong>')
  .replace(/(\$64\.86<\/strong><\/td>\\n)<td><\/td>\\n<td><\/td>/, '$1<td>—</td>\\n<td>—</td>'));
swap('expected cost sums to $64.86 and expected elapsed time to 1,277.9 min = 21 h 17.9 min ✓ — the course\'s values.', 'the slide gives the weighted averages as $64.86 and 21 h 18 min 19.567 s (computed from the unrounded values). Adding the rounded table figures gives $64.87 and about 1,278 min (21 h 18 min), so small differences are rounding.');

// remaining empty cells in these three tables get an explicit dash
for (const key of ['4.3 min', 'Expected cycle time', 'Hardware total']) {
  rep(tabs.find((t) => t.includes(key)), (t) => t.split('<td></td>').join('<td>—</td>'));
}
swap('<td>—</td>\\n<td>—</td>\\n<td>—</td>\\n<td><strong class=\\"k-c\\">Expected cycle time', '<td>Total</td>\\n<td>—</td>\\n<td>—</td>\\n<td><strong class=\\"k-c\\">Expected cycle time');
JSON.parse(s); fs.writeFileSync(P, s);
console.log('ok');
