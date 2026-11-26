import fs from 'node:fs';
const f = 'tools/bpas-modules/build.mjs'; let s = fs.readFileSync(f, 'utf8');
const a = "  [10, 'innovation types in  are nested', 'innovation types in §10.5 are nested'],\n";
if (!s.includes(a)) throw new Error('anchor missing');
s = s.replace(a, () => a +
"  [5, 'The three-step pipeline is drawn in; this table', 'The three-step pipeline is in the at-a-glance strip at the top of this module; this table'],\n" +
"  [5, '(the process is the one in; probabilities', '(the process is the one in §3.5; probabilities'],\n" +
"  [5, 'connect to the RCI in: (1)', 'connect to the RCI in §5.6: (1)'],\n" +
"  [6, 'flow diagram</em> of, redrawn on, with the decisions', 'flow diagram</em> of §3.5, with the decisions'],\n");
fs.writeFileSync(f, s); console.log('ok');
