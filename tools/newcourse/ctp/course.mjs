// IS1704 Computational Thinking & Programming: chapter structure (extraction of the author's notes) + course wiring.
import path from 'node:path';
import { lines, find, split } from '../src.mjs';
import { metaAll } from './meta.mjs';
import { exam } from './extra.mjs';

const ls = lines(path.join(import.meta.dirname, 'source', 'notes.md'));
const chap = (n) => {
  const a = find(ls, new RegExp('^## ' + n + '\. '));
  const b = find(ls, /^## \d+\. /, a + 1);
  return ls.slice(a + 1, b < 0 ? ls.length : b).filter((l) => !/^---\s*$/.test(l));
};
/** sections of a notes chapter: text before the first ### becomes a numbered "intro" section when it is non-empty */
const secs = (n, pre, drop) => () => {
  let L = chap(n);
  if (drop) { const i = L.findIndex((l) => drop.test(l)); if (i >= 0) { let j = L.findIndex((l, k) => k > i && /^#{3,4} /.test(l)); L = [...L.slice(0, i), ...(j < 0 ? [] : L.slice(j))]; } }
  return split(L, '### ', pre).map((s) => ({ ...s, unnumbered: false })).filter((s) => s.md.trim());
};

const chapters = [
  { n: 1, label: '1', title: 'Variables, Types & Strings', tag: 'blue', icon: '🐍', sections: secs(1) },
  { n: 2, label: '2', title: 'Input, Output & Arithmetic', tag: 'blue', icon: '⌨️', sections: () => [...secs(2, 'Reading input and printing output')(), ...secs(4, 'Arithmetic operators')()] },
  { n: 3, label: '3', title: 'Functions', tag: 'blue', icon: '🔧', sections: secs(3) },
  { n: 4, label: '4', title: 'Conditionals & Error Handling', tag: 'yellow', icon: '🔀', sections: secs(5) },
  { n: 5, label: '5', title: 'Loops', tag: 'yellow', icon: '🔁', sections: secs(6) },
  { n: 6, label: '6', title: 'Lists', tag: 'orange', icon: '📋', sections: secs(7) },
  { n: 7, label: '7', title: 'Tuples', tag: 'orange', icon: '📦', sections: secs(8, 'What a tuple is') },
  { n: 8, label: '8', title: 'Dictionaries', tag: 'orange', icon: '📚', sections: secs(9) },
  { n: 9, label: '9', title: 'Scope, Global Variables & Nested Functions', tag: 'purple', icon: '🌍', sections: secs(10) },
  { n: 10, label: '10', title: 'File Input & Output', tag: 'purple', icon: '📂', sections: secs(11, 'Reading and writing files') },
  { n: 11, label: '11', title: 'Computational Efficiency', tag: 'purple', icon: '⏱️', sections: secs(12) },
  { n: 12, label: '12', title: 'Mini Projects', tag: 'green', icon: '🛠️', sections: secs(13, '', /^#### Full Username Password Login/) },
];

export default {
  id: 'ctp', key: 'ctp1_', code: 'IS1704', title: 'Computational Thinking & Programming', chapters,
  titleFix: (t) => t.replace(/^\d+\.\s*/, '').replace(/\s*—\s*Create a New Function/, ': create a function').replace(/^Worked Example:\s*/, ''),
  groups: [
    { t: '🐍 Python basics', ns: [1, 2, 3], tag: 'blue' },
    { t: '🔀 Control flow', ns: [4, 5], tag: 'yellow' },
    { t: '📦 Data structures', ns: [6, 7, 8], tag: 'orange' },
    { t: '🧰 Scope, files & efficiency', ns: [9, 10, 11], tag: 'purple' },
    { t: '🛠️ Putting it together', ns: [12], tag: 'green' },
  ],
  extra: {
    pqg: [
      ['Section A · Reading and tracing code (basics)', [1, 2, 3]],
      ['Section A · Reading and tracing code (control flow)', [4, 5]],
      ['Section B · Writing functions with data structures', [6, 7, 8]],
      ['Section B · Scope, files and efficiency', [9, 10, 11]],
      ['Putting it together', [12]],
    ],
    secs: { A: [1, 10, 'Section A · AY2024-25 multiple choice', 'Q1–10'], B: [11, 15, 'Section B · AY2024-25 short answer', 'Q11–15'], C: [101, 110, 'Section C · AY2020-21 multiple choice', 'Q1–10'], D: [111, 116, 'Section D · AY2020-21 short answer', 'Q1–6'] },
    pastSingle: true,
    pastNote:'These are real final-exam questions: the AY2024-25 paper (with its published solutions) and the AY2020-21 paper. The 2020-21 paper has no answer key in your files, so those answers are my own: the multiple-choice answers and the short-answer solutions were worked out and checked by running the code in Python. The 2020-21 debugging question (Section B Q7, the buggy <code>trace_contacts_2</code> listing) is not included. Use <b>No solutions</b> to attempt a section like an exam, and <b>Show solutions</b> to read the answers and model solutions.',
  },
  meta: metaAll, exam, hasPast: true, codeQuestions: true,
};
