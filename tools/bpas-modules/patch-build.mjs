import fs from 'node:fs';
const f = 'tools/bpas-modules/build.mjs'; let s = fs.readFileSync(f, 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('missing: ' + a.slice(0, 60)); s = s.replace(a, () => b); };
rep("const lessons = [];", `/* The Discover phase (what Discovery is, its deliverables, the interview) is taught in M2 in the slides, so it moves out of the BPM section of M1. */
const dsec = sec(2, '2.2'); const cutAt = '<h3 class="t-h3">The Discover Phase in detail</h3>';
const ci = dsec.html.indexOf(cutAt); if (ci < 0) throw new Error('discover block not found');
const discoverBody = dsec.html.slice(ci + cutAt.length, dsec.html.lastIndexOf('</div>')).replace('covered in  below)', 'covered in the rest of this module and in Module 3)');
dsec.html = dsec.html.slice(0, ci) + '</div>';
const discover = { t: 'Discovery: Understanding the Current State', body: [discoverBody] };

const lessons = [];`);
rep("secs: [sec(3, '3.1'), sec(4, '4.1'), sec(4, '4.2'), sec(4, '4.3'), sec(4, '4.4')],", "secs: [discover, sec(3, '3.1'), sec(4, '4.1'), sec(4, '4.2'), sec(4, '4.3'), sec(4, '4.4')],");
rep("  [1, 'covered in  below)', 'covered in Modules 2 and 3)'],\n", "");
rep("const newCards = d.cards.map((c) => ({ ...c, f: remapRefs(c.f) }));", "const newCards = d.cards.map((c) => ({ ...c, f: c.t === 'Discover' ? '§2.1' : remapRefs(c.f) }));");
fs.writeFileSync(f, s); console.log('ok');
