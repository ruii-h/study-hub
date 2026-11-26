import fs from 'node:fs';
const F = 'src/courses/bpas/data.json';
const d = JSON.parse(fs.readFileSync(F, 'utf8'));
const th = (a) => '<thead><tr>' + a.map((x) => `<th>${x}</th>`).join('') + '</tr></thead>';
const FULL = ['Issue #', 'Issue Description', 'Cause Description', 'Root Cause', 'Issue Category', 'Business Performance Metrics', 'Impact Level'];
const L5 = d.lessons.find((l) => l.n === 5), L7 = d.lessons.find((l) => l.n === 7);
const rep = (l, a, b) => { if (!l.html.includes(a)) throw new Error('missing ' + a.slice(0, 50)); l.html = l.html.replace(a, () => b); };

// 1. Real Estate: add Issue # and Issue Description
const re0 = /<thead>\s*<tr>\s*<th>Cause description<\/th>\s*<th>Root cause<\/th>\s*<th>Category<\/th>\s*<th>Metrics<\/th>\s*<th>Impact<\/th>\s*<\/tr>\s*<\/thead>/;
const mRe = re0.exec(L5.html); if (!mRe) throw new Error('real estate head');
const start = mRe.index, end = L5.html.indexOf('</table>', start);
let seg = L5.html.slice(start, end);
seg = seg.replace(re0, th(FULL));
let first = true;
seg = seg.replace(/<tbody>([\s\S]*)<\/tbody>/, (m, body) => '<tbody>' + body.replace(/<tr>/g, () => { const c = first ? '<tr><td>1</td><td>Errors in the forms where the bill of sales information is captured</td>' : '<tr><td>1 (same issue)</td><td>(same)</td>'; first = false; return c; }) + '</tbody>');
L5.html = L5.html.slice(0, start) + seg + L5.html.slice(end);

// 2. StarMall worked RCI: full headers + issue description
const desc = { 1: 'The application form is manually dispatched by the OD, which leads to increased waiting times', 2: "The customer's eligibility is checked by the MO at a later stage, which results in a high cost of rejection", 3: "The LM's role is critical, as he must approve all applications. This leads to longer waiting times for straightforward cases", 4: 'The CSO manually fills in the application form together with the applicant, which affects his productivity', 5: 'The MO first checks availability and then markets the rental spaces, which is time-consuming and inefficient' };
const sm0 = '<thead> <tr> <th>#</th> <th>Cause description</th> <th>Root cause</th> <th>Category</th> <th>Business performance metrics</th> <th>Impact</th> </tr> </thead>';
const smRe = /<thead>\s*<tr>\s*<th>#<\/th>\s*<th>Cause description<\/th>\s*<th>Root cause<\/th>\s*<th>Category<\/th>\s*<th>Business performance metrics<\/th>\s*<th>Impact<\/th>\s*<\/tr>\s*<\/thead>/;
const ms = smRe.exec(L5.html); if (!ms) throw new Error('starmall head');
const s2 = ms.index, e2 = L5.html.indexOf('</table>', s2);
let seg2 = L5.html.slice(s2, e2).replace(smRe, th(FULL));
seg2 = seg2.replace(/<tr><td>(\d)( \(another\))?<\/td>/g, (m, n, a) => `<tr><td>${n}${a || ''}</td><td>${a ? '(same)' : desc[n]}</td>`);
L5.html = L5.html.slice(0, s2) + seg2 + L5.html.slice(e2);
L5.html = L5.html.replace(/<td>\(same\)<\/td><td>High \(4\)<\/td>/g, '<td>(same)</td><td>High (4)</td>');

// 3. Bed management RCI (M7)
const bedHead = /<thead><tr><th>#<\/th><th>Issue<\/th><th>Cause<\/th><th>Root cause<\/th><th>Category<\/th><th>Metric<\/th><th>Stakeholder<\/th><\/tr><\/thead>/;
if (!bedHead.test(L7.html)) throw new Error('bed head');
L7.html = L7.html.replace(bedHead, th(['Issue #', 'Issue Description', 'Cause Description', 'Root Cause', 'Issue Category', 'Performance Metrics', 'Stakeholder']));
fs.writeFileSync(F, JSON.stringify(d)); console.log('ok');
