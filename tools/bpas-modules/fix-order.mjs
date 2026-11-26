import fs from 'node:fs';
const F = 'src/courses/bpas/data.json';
const d = JSON.parse(fs.readFileSync(F, 'utf8'));
const L = d.lessons.find((l) => l.n === 5); const h = L.html;
const a = h.indexOf('SUBWAY data (the process');
const pStart = h.lastIndexOf('<p>', a);
const roleH = h.search(/<th>Annual working hours per resource<\/th>/i);
if (a < 0 || roleH < a) throw new Error('anchors ' + a + ' ' + roleH);
const rs = h.lastIndexOf('<div class="t-table-wrap"', roleH), re = h.indexOf('</table></div>', roleH) + 14;
const roleTbl = h.slice(rs, re);
const between = h.slice(pStart, rs); // paragraph + activity table
console.log('between', between.length, 'after:', h.slice(re, re + 160).replace(/\n/g, ' '));
const intro = '<p><strong class="k-c">Role data</strong> (cost and availability of each resource):</p>\n';
L.html = h.slice(0, pStart) + intro + roleTbl + '\n' + between.replace('SUBWAY data (the process', '<strong class="k-c">Activity data</strong> for SUBWAY (the process') + h.slice(re);
fs.writeFileSync(F, JSON.stringify(d)); console.log('ok');
