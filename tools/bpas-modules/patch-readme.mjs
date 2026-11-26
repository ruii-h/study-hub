import fs from 'node:fs';
let s = fs.readFileSync('README.md', 'utf8');
s = s.replace('- Process workflows (BPAS ch. 6, 9, 12) are drawn', '- Process workflows (BPAS M3, M4, M7, M8, M11) are drawn');
s += `
## BPAS modules
- BPAS (IS210) is numbered like the slides: M1-M12 plus a course review (R). \`n\` in \`data.json\` is the module number, \`dn\` is shown as "M<dn>", and the course registry sets \`unit: 'Module'\`. Section ids are \`s<module>-<k>\`.
- M4 (modelling exercises) and M7 (bed management analysis) are new lessons built from the exercise slides; M1 holds the learning journey, M2 holds Discovery, M10 and M11 hold the class activities. The one-off build is \`tools/bpas-modules/build.mjs\` (from \`data.before.json\`, the 14-chapter version); \`cov2.mjs\` lists slide lines that the site does not cover.
`;
fs.writeFileSync('README.md', s);
