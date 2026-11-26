// One-off: lets a course name its units "Module" instead of "Chapter" (CourseMeta.unit) and label lessons M1..M12.
import fs from 'node:fs';
const edits = [];
const E = (file, from, to, all = false) => edits.push({ file, from, to, all });
const SRC = 'src/guide/';

E('src/courses/registry.ts', "  tabs: string[];\n}", "  tabs: string[];\n  /** what the course calls its units in the UI; defaults to \"Chapter\" */\n  unit?: string;\n}");
E('src/courses/registry.ts', "chapters: 14, cards: 84, storageKey: 'bpas2_'", "chapters: 13, cards: 92, storageKey: 'bpas3_', unit: 'Module'");

E(SRC + 'state.tsx', "export interface Data {", "/** \"Chapter\" or the course's own word (BPAS: \"Module\") */\nexport const unitOf = (meta: CourseMeta) => meta.unit || 'Chapter';\n/** nav label of a lesson: M1..M12 for a course with modules (R for the review), otherwise the chapter number */\nexport const lessonNo = (meta: CourseMeta, l: Lesson): string | number => (meta.unit ? (l.dn ? 'M' + l.dn : 'R') : l.dn ?? l.n);\nexport interface Data {");

// Guide.tsx
E(SRC + 'Guide.tsx', "navItem(l.icon, l.dn ?? n, l.title, cur === n, () => g.openChapter(n), V[n]", "navItem(l.icon, lessonNo(g.meta, l), l.title, cur === n, () => g.openChapter(n), V[n]");
E(SRC + 'Guide.tsx', "navItem(l.icon, l.dn ?? n, l.title, cur === n, () => g.openChapter(n), <>", "navItem(l.icon, lessonNo(g.meta, l), l.title, cur === n, () => g.openChapter(n), <>");
E(SRC + 'Guide.tsx', "navItem(l.icon, n, l.title, pqSel === n,", "navItem(l.icon, lessonNo(g.meta, l), l.title, pqSel === n,");
E(SRC + 'Guide.tsx', "return navItem(l.icon, n, l.title, cch === n,", "return navItem(l.icon, lessonNo(g.meta, l), l.title, cch === n,");
E(SRC + 'Guide.tsx', "<div className=\"theory-nav-header\">Chapter quizzes</div>", "<div className=\"theory-nav-header\">{unitOf(g.meta)} quizzes</div>");
E(SRC + 'Guide.tsx', "'Flashcards by chapter' : 'Cheat-sheet by chapter'", "`Flashcards by ${unitOf(g.meta).toLowerCase()}` : `Cheat-sheet by ${unitOf(g.meta).toLowerCase()}`");
E(SRC + 'Guide.tsx', "`All chapters (${D.cards.length})`", "`All ${unitOf(g.meta).toLowerCase()}s (${D.cards.length})`");
E(SRC + 'Guide.tsx', "<div className=\"theory-nav-header\">Chapters</div>", "<div className=\"theory-nav-header\">{unitOf(g.meta)}s</div>");
E(SRC + 'Guide.tsx', "import { GuideProvider, cardChap, scoreClass, useG, type Data } from './state';", "import { GuideProvider, cardChap, lessonNo, scoreClass, unitOf, useG, type Data } from './state';");
E(SRC + 'Guide.tsx', "<td>Previous / next chapter</td>", "<td>Previous / next {unitOf(meta).toLowerCase()}</td>");
E(SRC + 'Guide.tsx', "aria-label=\"Chapters read\"", "aria-label={`${unitOf(meta)}s read`}");

// Theory.tsx
E(SRC + 'Theory.tsx', "Chapter {lesson.dn ?? cur} of {scope.length}", "{meta.unit ? (lesson.dn ? `${meta.unit} ${lesson.dn} of ${D.lessons.filter((x) => x.dn).length}` : 'Course review') : `Chapter ${lesson.dn ?? cur} of ${scope.length}`}");
E(SRC + 'Theory.tsx', "You have reached the end of Chapter {lesson.dn ?? cur}.", "You have reached the end of {meta.unit ? (lesson.dn ? `${meta.unit} ${lesson.dn}` : 'the course review') : `Chapter ${lesson.dn ?? cur}`}.");
E(SRC + 'Theory.tsx', "Take the Chapter {cur} quiz", "Take the {meta.unit ? (lesson.dn ? `${meta.unit} ${lesson.dn}` : 'review') : `Chapter ${cur}`} quiz");
E(SRC + 'Theory.tsx', "<small>Next chapter</small>", "<small>Next {(meta.unit || 'chapter').toLowerCase()}</small>");
E(SRC + 'Theory.tsx', "aria-label=\"Sections in this chapter\"", "aria-label={`Sections in this ${(meta.unit || 'chapter').toLowerCase()}`}");

// Practice.tsx / Mixed.tsx: user-facing "Chapter N" labels
const words = [
  ["Continue to Chapter {nx.n}", "Continue to {g.meta.unit || 'Chapter'} {nx.n}"],
  ["Quiz me on Chapter {nx.n}", "Quiz me on {g.meta.unit || 'Chapter'} {nx.n}"],
  ["Skip ahead to Chapter {nx.n}", "Skip ahead to {g.meta.unit || 'Chapter'} {nx.n}"],
  ["Re-read Chapter {n}", "Re-read {g.meta.unit || 'Chapter'} {n}"],
  ["Move on to the next chapter.", "Move on to the next {(g.meta.unit || 'chapter').toLowerCase()}."],
];
for (const f of ['Practice.tsx', 'Mixed.tsx']) for (const [a, b] of words) if (fs.readFileSync(SRC + f, 'utf8').includes(a)) E(SRC + f, a, b, true);
E(SRC + 'Practice.tsx', "'📖 Review Chapter ' + ch", "'📖 Review ' + (g.meta.unit || 'Chapter') + ' ' + ch");
E(SRC + 'Practice.tsx', "title={`Chapter ${l.n} — ${l.title}`} />", "title={`${g.meta.unit || 'Chapter'} ${l.n} — ${l.title}`} />", true);
E(SRC + 'Practice.tsx', "title={`Chapter ${l.n} — ${l.title} (warm-up)`}", "title={`${g.meta.unit || 'Chapter'} ${l.n} — ${l.title} (warm-up)`}");
E(SRC + 'Practice.tsx', "title={`Chapter ${l.n} — ${l.title}`} qkey", "title={`${g.meta.unit || 'Chapter'} ${l.n} — ${l.title}`} qkey");
E(SRC + 'Practice.tsx', "aria-label=\"Chapter quizzes\"", "aria-label={`${g.meta.unit || 'Chapter'} quizzes`}");

// Cards.tsx
E(SRC + 'Cards.tsx', "<label className=\"sr\" htmlFor=\"fch\">Chapter</label>", "<label className=\"sr\" htmlFor=\"fch\">{g.meta.unit || 'Chapter'}</label>");
E(SRC + 'Cards.tsx', "<option value={0}>All chapters</option>", "<option value={0}>All {(g.meta.unit || 'chapter').toLowerCase()}s</option>");
E(SRC + 'Cards.tsx', "<option key={l.n} value={l.n}>{l.n}. {l.title}</option>", "<option key={l.n} value={l.n}>{lessonNo(g.meta, l)}. {l.title}</option>");
E(SRC + 'Cards.tsx', "' from chapter ' + g.cch", "` from ${(g.meta.unit || 'chapter').toLowerCase()} ` + g.cch");
E(SRC + 'Cards.tsx', "import { cardChap, shuffle, useG } from './state';", "import { cardChap, lessonNo, shuffle, useG } from './state';");

const cache = {};
let bad = 0;
for (const e of edits) {
  cache[e.file] ??= fs.readFileSync(e.file, 'utf8');
  const s = cache[e.file];
  if (!s.includes(e.from)) { console.log('NOT FOUND', e.file, '::', e.from.slice(0, 70)); bad++; continue; }
  cache[e.file] = e.all ? s.split(e.from).join(e.to) : s.replace(e.from, () => e.to);
}
if (bad) { console.log(bad, 'edit(s) missing; nothing written'); process.exit(1); }
for (const [f, s] of Object.entries(cache)) fs.writeFileSync(f, s);
console.log('patched', Object.keys(cache).join(', '));
