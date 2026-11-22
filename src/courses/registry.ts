export type CourseId = 'cf' | 'algo' | 'bpas' | 'idp' | 'ctp';

export interface CourseMeta {
  id: CourseId;
  code: string;
  short: string;
  title: string;
  blurb: string;
  chapters: number;
  cards: number;
  /** localStorage prefix used by that course's engine (kept identical to the original guides so existing progress survives) */
  storageKey: string;
  /** per-course accent colour: [dark theme, light theme] */
  accent: [string, string];
  tabs: string[];
}

export const COURSES: CourseMeta[] = [
  {
    id: 'cf', code: 'IS114', short: 'IS114', title: 'Computing Fundamentals',
    blurb: 'Hardware, operating systems, Linux pipelines, file systems, networks, the Web, LANs and NAT, cloud computing and information security.',
    chapters: 10, cards: 140, storageKey: 'cf1_', accent: ['#f0883e', '#bc4c00'],
    tabs: ['Theory', 'Practice', 'Flashcards', 'Cheat-sheet', 'Final Exam'],
  },
  {
    id: 'algo', code: 'IS115', short: 'IS115', title: 'Algorithms & Programming',
    blurb: 'Counting, Big-O, sorting, recursion, trees, heaps, graphs and the limits of computation, with four live demos.',
    chapters: 12, cards: 122, storageKey: 'algo1_', accent: ['#58a6ff', '#0969da'],
    tabs: ['Theory', 'Practice', 'Flashcards', 'Cheat-sheet', 'Past Exam', 'Final Exam'],
  },
  {
    id: 'bpas', code: 'IS210', short: 'IS210', title: 'Business Process Analysis & Solutioning',
    blurb: 'Business-IT alignment, BPMN, static and dynamic analysis, requirements, blueprints and process innovation.',
    chapters: 14, cards: 84, storageKey: 'bpas2_', accent: ['#3fb950', '#1a7f37'],
    tabs: ['Theory', 'Practice', 'Flashcards', 'Cheat-sheet', 'Final Exam'],
  },
  {
    id: 'idp', code: 'IS211', short: 'IS211', title: 'Interaction Design & Prototyping',
    blurb: 'Design thinking, prototyping, interaction models, evaluation, experiments and human-AI interaction.',
    chapters: 23, cards: 111, storageKey: 'idp6_', accent: ['#bc8cff', '#8250df'],
    tabs: ['Theory', 'Practice', 'Flashcards', 'Cheat-sheet', 'Past Exam', 'Final Exam'],
  },
  {
    id: 'ctp', code: 'IS1704', short: 'IS1704', title: 'Computational Thinking & Programming',
    blurb: 'Python from variables to dictionaries: functions, loops, lists, tuples, files, scope and computational efficiency, with past exam papers.',
    chapters: 12, cards: 120, storageKey: 'ctp1_', accent: ['#e3b341', '#9a6700'],
    tabs: ['Theory', 'Practice', 'Flashcards', 'Cheat-sheet', 'ICE', 'Past Exam', 'Final Exam'],
  },
];

export const byId = (id?: string) => COURSES.find((c) => c.id === id);

/** Lazy loaders: every course (data, engine, shell, CSS) is its own chunk, fetched only when opened. */
export const loaders: Record<CourseId, () => Promise<{ D: unknown; mount: (D: unknown, api: unknown) => () => void; shell: string; css: string; api?: Record<string, unknown>; dispose?: () => void }>> = {
  algo: async () => {
    const [D, e, shell, css] = await Promise.all([
      import('./algo/data.json'), import('./algo/engine.js'), import('./algo/shell.html?raw'), import('./algo/style.css?inline'),
    ]);
    const demos = await import('./algo/demos'); // React demo components (binary search, sorting, BFS/DFS, UCS)
    return { D: D.default, mount: e.default, shell: shell.default, css: css.default, api: { mountDemos: demos.mountDemos }, dispose: demos.disposeDemos };
  },
  bpas: async () => {
    const [D, e, shell, css] = await Promise.all([
      import('./bpas/data.json'), import('./bpas/engine.js'), import('./bpas/shell.html?raw'), import('./bpas/style.css?inline'),
    ]);
    const katex = (await import('katex/dist/katex.min.css?inline')).default; // BPAS formulas are pre-rendered; only the KaTeX CSS/fonts are needed
    return { D: D.default, mount: e.default, shell: shell.default, css: katex + '\n' + css.default };
  },
  cf: async () => {
    const [D, e, shell, css] = await Promise.all([
      import('./cf/data.json'), import('./cf/engine.js'), import('./cf/shell.html?raw'), import('./cf/style.css?inline'),
    ]);
    return { D: D.default, mount: e.default, shell: shell.default, css: css.default };
  },
  ctp: async () => {
    const [D, e, shell, css] = await Promise.all([
      import('./ctp/data.json'), import('./ctp/engine.js'), import('./ctp/shell.html?raw'), import('./ctp/style.css?inline'),
    ]);
    return { D: D.default, mount: e.default, shell: shell.default, css: css.default };
  },
  idp: async () => {
    const [D, e, shell, css] = await Promise.all([
      import('./idp/data.json'), import('./idp/engine.js'), import('./idp/shell.html?raw'), import('./idp/style.css?inline'),
    ]);
    return { D: D.default, mount: e.default, shell: shell.default, css: css.default };
  },
};
