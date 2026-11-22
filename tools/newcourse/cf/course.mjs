// IS114 Computing Fundamentals: chapter structure (extraction of the author's notes) + course wiring.
import path from 'node:path';
import { lines, find, split } from '../src.mjs';
import { metaAll } from './meta.mjs';
import { exam, selfq } from './extra.mjs';

const ls = lines(path.join(import.meta.dirname, 'source', 'notes.md'));
const part = (L, next) => {
  const a = find(ls, new RegExp('^# Part ' + L + ' '));
  const b = next ? find(ls, new RegExp('^# Part ' + next + ' '), a + 1) : find(ls, /^---\s*$/, a + 1);
  return ls.slice(a + 1, b).filter((l) => !/^---\s*$/.test(l));
};
const ovA = find(ls, /^# Big-Picture Overview/), ovB = find(ls, /^# Part A /);
const sections = (L, next) => () => split(part(L, next), '## ');

const chapters = [
  { n: 1, label: 'A', title: 'Computer Hardware', tag: 'blue', icon: '🖥️', sections: () => [{ title: '🗺️ The whole course in one picture', unnumbered: true, md: ls.slice(ovA + 1, ovB).filter((l) => !/^---\s*$/.test(l)).slice(1).join('\n').replace(/^IS114 walks[\s\S]*?\n\n/, (m) => m) }, ...split(part('A', 'B'), '## ')] },
  { n: 2, label: 'B', title: 'Operating Systems & Processes', tag: 'blue', icon: '⚙️', sections: sections('B', 'C') },
  { n: 3, label: 'C', title: 'Linux Command-Line Data Analysis', tag: 'yellow', icon: '🐧', sections: sections('C', 'D') },
  { n: 4, label: 'D', title: 'File Systems, Paths & Permissions', tag: 'yellow', icon: '📁', sections: sections('D', 'E') },
  { n: 5, label: 'E', title: 'Computer Networks & Addressing', tag: 'orange', icon: '🌐', sections: sections('E', 'F') },
  { n: 6, label: 'F', title: 'The Web, HTML & HTTP', tag: 'orange', icon: '🕸️', sections: sections('F', 'G') },
  { n: 7, label: 'G', title: 'Local Networks, DHCP & NAT', tag: 'orange', icon: '🏠', sections: sections('G', 'H') },
  { n: 8, label: 'H', title: 'Cloud Computing & AWS EC2', tag: 'purple', icon: '☁️', sections: sections('H', 'I') },
  { n: 9, label: 'I', title: 'Information Security & Cryptography', tag: 'purple', icon: '🔐', sections: sections('I', 'J') },
  {
    n: 10, label: 'J', title: 'Systems Architecture Case Study', tag: 'purple', icon: '🏥',
    sections: () => {
      const L = part('J', 'K');
      const i = L.findIndex((l) => /^\*\*J\.1 /.test(l));
      const out = [{ title: 'The five-tier platform', md: L.slice(0, i).join('\n').trim() }];
      L.slice(i).join('\n').split(/\n\n(?=\*\*(?:J\.\d|Skill demonstrated))/).forEach((p) => {
        const m = /^\*\*J\.\d (.*?)\*\*\s*(?:`\[[^\]]*\]`)?:?\s*([\s\S]*)$/.exec(p.trim());
        if (m) out.push({ title: m[1], md: m[2].trim() });
        else if (/^\*\*Skill demonstrated/.test(p.trim())) out.push({ title: 'Tracing one concept across tiers', md: p.trim().replace(/^\*\*Skill demonstrated:\*\*\s*/, '') });
      });
      return out;
    },
  },
];

export default {
  id: 'cf', key: 'cf1_', code: 'IS114', title: 'Computing Fundamentals', chapters,
  groups: [
    { t: '🖥️ Machine & operating system', ns: [1, 2], tag: 'blue' },
    { t: '🐧 Linux & files', ns: [3, 4], tag: 'yellow' },
    { t: '🌐 Networks & the Web', ns: [5, 6, 7], tag: 'orange' },
    { t: '☁️ Cloud, security & design', ns: [8, 9, 10], tag: 'purple' },
  ],
  extra: {
    pqg: [
      ['Quiz 1 · Machine, operating system, Linux and files', [1, 2, 3, 4]],
      ['Quiz 2 · Networks and LANs', [5, 7]],
      ['Quiz 3 · The Web', [6]],
      ['Cloud, security and the case study', [8, 9, 10]],
    ],
    selfn: 0,
    mixed: true,
  },
  titleFix: (t) => t.replace(/ from the compendium/, '').replace(/ \(compendium quiz items\)/, '').replace(/ \(from Week \d+\)/, '').replace(/^Lab 1 — all 28 tasks with answers/, 'Lab 1 — all 28 tasks with answers').replace(/\s*—?\s*\(all (\d+) steps\)/, ' ($1 steps)'),
  template: { teach: 'why', glance: true, quick: false, namesTitle: 'Easily confused terms', namesCols: ['Term', 'What it is', 'Not to be confused with'], summaryTitle: 'Chapter summary' }, meta: metaAll, exam, selfq, hasPast: false, codeQuestions: true,
};
