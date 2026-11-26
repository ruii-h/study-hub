# Study Hub

IS114, IS115, IS210, IS211 and IS1704 and IS216 (WAD2) study guides combined into one app (routes: `cf`, `algo`, `bpas`, `idp`, `ctp`, `wad2`).
Vite + React + TypeScript + Tailwind v4. Progress lives in `localStorage` (same keys as the original files, so existing progress carries over).

```
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
```

## Layout
- `src/hub/` – course picker (React + Tailwind).
- `src/course/CourseApp.tsx` – loads one course lazily, injects its CSS, mounts the shared guide, and removes everything when you leave.
- `src/guide/` – the React + Framer Motion guide app shared by all five courses (theory, practice, flashcards, ICE, past exams, search, wiki-links).
- `src/courses/<id>/` – `data.json` (lessons, quizzes, cards, exams) and `style.css`.
- `src/courses/algo/demos/` – the four ALGO demos as React + Tailwind components (mounted into each `.demo-slot` by the guide).
- `src/styles/animations.css` – the 19 original keyframes, exposed to Tailwind as `animate-*` in `src/index.css`.
- Mermaid is loaded on demand when a chapter contains a diagram; BPAS gets KaTeX CSS/fonts from the `katex` package.
- `tools/` – the one-off scripts used to split the original HTML files (`tools/extract/*` then `tools/gen-courses.mjs`).

## Deploy
Static site, hash routing, relative base. Live at https://ruii-h.github.io/study-hub/, deployed from `main` of `ruii-h/study-hub` by `.github/workflows/deploy.yml` (also works on Netlify via `netlify.toml` or any static host). Pushing to `main` redeploys.

## Styling notes
Legacy course CSS is injected inside `@layer legacy`, below Tailwind's utilities, so new React components can use Tailwind freely. Lesson, quiz and flashcard markup is stored in the JSON with the original class names, so that CSS stays as plain CSS.

Behaviour lives in the shared React guide (`src/guide/*`), not per-course engines; the old `engine.js` files and `tools/gen-courses.mjs` are gone or stale, so never regenerate course files. Content fixes are applied with small one-off scripts in `tools/` that assert every replacement matched.

---

# House rules (how this site should look and behave)

These are the owner's standing preferences. Follow them for every change, in all three courses, unless told otherwise.

## Readability and containment (most important)
- **Nothing may spill out of its container on a phone.** No horizontal page scroll, no text, table, image, diagram or code running past a card edge. Check at 360, 390 and 412px. Wide tables **stack** into one card per row with the column name above each value (done by `stackTables` in `src/guide/enhance.ts`, which also wraps tables inside "At a glance" cards); code blocks and diagrams scroll inside their own box. Lesson columns and flex children carry `min-width: 0` so one wide child can never stretch the page.
- **Readability beats density.** Break text into short paragraphs and lists with a blank line between ideas; one idea per paragraph, about three sentences at most. Never pack many facts into a single block or a single table cell.
- **Group related things.** Related points sit together under one clear label; unrelated points are visibly separated (spacing, a sub-heading or a new card).
- **Highlight keywords, not whole sentences.** Key terms are bold and coloured (cyan for names and keywords, yellow for table headers, muted italics for caveats) so the eye finds them. Body text stays the normal colour. Do not colour or bold more than a few words per sentence, or nothing stands out.
- Every new or edited section is checked at phone width for all three: no spill, enough air, keywords visible.

## Targets
- **Phone first, desktop too.** Priority device: Samsung S24 Ultra in Chrome (about 412 × 915 CSS px; also check 360 × 780). No horizontal scrolling, nothing hidden under the bottom tab bar, tap targets at least 44px on touch.
- Light and dark themes both work. Default look is the GitHub-dark style with a per-course accent: ALGO blue, BPAS green, IDP purple.
- Every change is checked at phone width before it is called done.

## Design
- Keep the original look of the guides. Do not restyle wholesale.
- One bright moment per view; everything else stays calm. No purple gradients, gradient text, glossy blobs, hype words, tiny ALL-CAPS labels, icon-in-a-box decoration, or stat banners.
- No emoji in navigation, buttons or button-like labels. Emoji may stay as small decoration inside lesson content that already uses it.
- Say what a thing does in plain words ("Continue to Chapter 4", not "Go").
- Do not centre everything; align content to a clear left edge and use the available width.

## Animations and transitions
- Keep all 19 original keyframe animations.
- Page changes fade in smoothly. Never combine CSS smooth-scroll on the lesson container with a page transition (it makes the jump stutter): the container uses `scroll-behavior: auto`, and smooth scrolling is requested explicitly only for same-page moves.
- Jumping to another chapter: render, jump to the target instantly, fade in. Jumping inside the same chapter: scroll smoothly and keep the page.
- Press feedback is subtle and must never spill onto a neighbouring control. No bouncing.
- Animations must always run: never add `prefers-reduced-motion` kill switches. Flips and reveals use Framer Motion.
- Animations come only from `src/guide/motion.ts` (no inline motion props).

## Hover versus click
- Hover is only a mouse nicety and never the only way to do something. Every hover rule sits in `@media (hover: hover)`, so touch screens never get sticky hover states.
- A hover lift must never cancel or override a state (for example a flipped card). State rules beat hover rules.
- Wording is device-neutral: "tap" for cards and flashcards ("tap, click or press Enter" for keyboard hints).

## Buttons
- **Keep the original button styling** (gradient and soft glow). Flat buttons made some buttons invisible, so do not flatten them.
- Result and action areas use one primary button, at most one secondary (outlined) and the rest as quiet text links (underlined muted text, no border, shadow or fill).
- The primary action follows the score: 80% or more means "Continue to the next chapter" (or Final Exam); below 80% means "Retry this quiz (reshuffled)", with "Re-read the chapter" as secondary.
- Labels say what they do; no emoji in them.

## Cards and containers
- Flashcards: tap to flip, the front says "Tap to reveal the definition…", "Mark as known" updates in place and does not flip the card again. Badge shows the section title, never a section number.
- If a grid row would leave an empty cell beside a card, stretch that card across the row (done by `fillRows` in `src/guide/wiki.ts`).
- Cards must not leave blank gaps beside them on wide screens and must stack to one column on phones.
- Link text must never be injected into flex or grid containers (it breaks the layout with gaps).

## Alignment
- Floating UI is centred on the lesson column, not the window (the Back pill is sticky at the bottom of the lesson column).
- The Back pill: 85% label, 15% dismiss "×", dark pill with a thin accent outline, label truncates with an ellipsis.

## Font sizes
- Body text 14–16px with comfortable line height; nothing below about 11.5px.
- No tiny ALL-CAPS captions as a design habit; section labels are normal-case or modestly small.
- The A− / A+ size control stays working and the layout must survive it.

## Content groupings
- Every quiz chapter appears under a section header in the Practice nav. There is no separate "Exam sections" list, because it only repeated the chapters below it. Chapters with few questions are grouped, not left as lone 1/2, 2/3 entries.
- Practice-tab chapter quizzes are grouped under the exam sections (IDP):
  - **A**: chapters 1–5 (introduction, empathy, requirements, ideate, prototype).
  - **B**: chapters 6–11 and 16 (models, memory, input, mobile, information design, visual design including Gestalt, UI tools).
  - **C**: chapters 12–15 and 17–19 (inspection, evaluating designs, qualitative analysis, laboratory studies, web experiments, designing experiments, quantitative analysis).
  - Chapters 20–23 sit in a last group (presenting, review, AI).
- Past Exam tab keeps the order of the real paper (Q1–20 / 21–40 / 41–60 and the written sections).
- Evaluation methods use one set of names everywhere: **Inspection, Field study, Laboratory study, Survey** (an experiment is a type of user study, not a fifth method).
- Gestalt: six principles with fixed names and wording: **Similarity, Proximity, Closure, Common region** (older name: enclosure), **Continuity, Figure/ground**. Lecture 11 teaches four in full; Lecture 1 mentions three.
- A concept, name or definition uses the same wording in every place it appears.

## Hyperlinks (Wikipedia style)
- Colour: blue (`#6cb2ff` dark, `#0645ad` light), no underline until hover.
- **Link main topics, not small details.** Link "Gestalt principles" as a whole, not "closure". A topic is linkable only if it is referenced from at least two other sections.
- Link in every section that mentions a topic (once per topic per section, at most six per section), not only the first mention. Never link inside headings, flashcards, code, diagrams, demos, buttons, or the section that defines the term.
- **Write the title, never a number.** "§11.5" becomes "Gestalt principles"; "Visual Design (§11)" becomes a link on "Visual Design"; "Chapter 18" becomes "Designing Experiments". No raw § references anywhere (flashcard badges, cheat-sheet "Where" column, diagram labels included). Citations of outside books are the only exception.
- Mouse hover shows a preview card: title, first sentence of the target section, chapter name. Tap or click jumps there.
- After a jump a floating **Back** pill returns to the exact spot, keeps a stack (Back repeatedly retraces the trail) and can be dismissed with "×".
- Links have a bigger invisible tap area on touch screens.

## Content display
- Lessons follow the same order: why it matters, memory hook, roadmap, at a glance, exact names, numbered sections, recall prompts, quick examples, 30-second summary, flashcards.
- No slide or source tags ("W3 · A.2", "Lec 11, slide 45") in lesson text.
- Question and case content tests the syllabus idea, not trivia about companies or people. Name a company or person only when it is the course's own example and the question does not depend on knowing it.
- Statistics statements must be correct (binomial is within-subjects; ordinal data takes the non-parametric branch; 19 heads in 20 fair flips is about 0.00004 two-tailed, not 2%).

## Q&A portions
- Chapter quizzes: 10 exam-style questions per chapter, multi-select ("select all that apply"), exactly five options, one to four correct, never all five.
- Every option has its own explanation, prefixed "True:" or "False:" by script from the answer key so it cannot contradict the key.
- Scenario-style stems modelled on the IS211 exam review (a short situation, then "which statements are justified?"). Options are shuffled per attempt.
- Results show score, then the buttons described under Buttons; missed questions go to "Review my mistakes".
- Final exam draws 40 from all chapters. Self-check Q&A and warm-up quizzes stay as they are.
- New questions go in `tools/qs/*.mjs` and are merged with `node tools/add-questions.mjs` (it skips questions already present, so never edit a stem there after merging; edit `data.json` instead).

## Repetition
- Say each thing once, in the section where it belongs. Better one longer section than three sections each saying part of the same thing.
- A story or case is told in one place. Its extra tellings are folded into that case card under "More from the lecture"; the end-of-chapter "Real-life case files" list holds only cases that are not told in the lesson text.
- The study-aid layers (at a glance, exact names, quick examples, 30-second summary, flashcards) are deliberate summaries, but they must not retell stories or introduce different wording for the same definition.
- Before adding content, check for overlap: `node tools/find-topic-repeats.mjs <course> all 3` lists topics discussed in three or more segments of a lesson, and `node tools/merge-cases.mjs <course>` (dry run) shows case stories told more than once.

## IS114 and IS1704 (generated)
`node tools/newcourse/build.mjs cf` and `... ctp` rebuild `src/courses/cf` and `src/courses/ctp` from the author's notes (`tools/newcourse/<id>/source/notes.md`) plus hand-written chapter extras (`m1-m3.mjs`: flashcards, warm-up and exam-style questions, ICE exercises). IS1704 has an extra ICE tab and a Past Exam tab.

**Unfinished:** IS1704 labs (Lab 1-8, mock labs, past lab tests) are not included on purpose: they are meant to be run against test cases. See `tools/newcourse/ctp/LABS-TODO.md`.

## Code blocks, structure and module formats
- **Code blocks always use the Obsidian colour scheme**: black `#000000` background, `#F8F8F2` text, keywords `#FFA4D8`, operators and `and/or/not/in/is` `#FF5555`, `True/False/None` `#FF79C6`, strings `#50FA7B`, numbers `#BD93F9`, comments `#6272A4`, function names `#F1FA8C`, built-ins and variables `#00FFFF`, parameters `#F8F8F2`. The palette lives in `src/course/course-extra.css` (`.tk-*`) and is applied at runtime by `src/course/highlight.ts`, started from `src/guide/Guide.tsx`. If code ever looks uncoloured, the highlighter is not mounted.
- IS1704 code uses a Python editor font; IS114 shows commands in a terminal-style block labelled `powershell`.
- **One place for everything shared.** Shared UI behaviour lives in `src/guide/*`; shared look and utility classes live in `src/course/course-extra.css`. Build reusable pieces ("our own bootstrap") instead of repeating markup or CSS.
- Side lists never rebuild on click (stable React nodes); only highlights change.
- Each module has its own teaching format; do not copy IS211's "why it matters / memory hook" template onto other modules. IS1704 teaches like the author's Python notes: explanation first, then code.
- Tabs: no Final Exam tab for IS114, IS1704 or IS216; no cheat-sheet for IS1704. Type-the-answer questions belong inside the Exam-style quiz. (The IS115, IS210 and IS211 guides keep their Final Exam.)
- No empty containers, no content landing in the wrong grid column, rounded corners everywhere.

## How to work on this repo
- Do not ask questions when the README already answers them; pick the sensible default, do it and say what was chosen.
- Check desktop and phone width (375–412px) after every UI change, and look at it in the browser before calling it done.
- Shared behaviour goes in `src/guide/*` so every course gets it; course-specific content goes in `src/courses/<id>/data.json` and `style.css`.
- Commit and push after each finished change. Keep replies short and do not elaborate unless asked.
- `CLAUDE.md` points new sessions at this file; keep the two consistent.

## IS216 WAD2 (generated)
`node tools/wad2/build.mjs` rebuilds `src/courses/wad2` from `tools/wad2/data.json`, which `tools/wad2/extract.mjs` pulled out of the standalone offline WAD2 page (theory, cheat sheets, live-playground lessons; Bootstrap 5.3 is bundled in `src/courses/wad2/bs.*`). The 104 theory topics are grouped into chapters by track, the 17 cheat sheets and 7 code-archive chapters get their own tabs (`D.tabs`, rendered by the Theory reader scoped to those chapters), and the 14 exercises feed the Live playground tab (`src/courses/wad2/Playground.tsx`). Chapters 1-3 are the start and exam-toolkit topics. Practice questions, past papers and the exam-question index are left out on purpose for now.

## Diagrams
- Process workflows (BPAS ch. 6, 9, 12) are drawn as horizontal swimlanes by `src/guide/swimlane.ts`. Mark a `pre.mermaid` with the class `swim` and write its lanes as `subgraph` blocks; the source stays valid Mermaid. `node tools/bpas-swimlanes.mjs` is the one-off script that converted the existing ones.
- On phones, plain top-down hierarchies (org charts) become an indented tree (`treeChains`) and simple one-way chains become the numbered snake (`snakeChains`).
