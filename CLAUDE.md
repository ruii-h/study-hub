# Study Hub: notes for Claude

Read `README.md` first. Its "House rules" section is how the user wants everything to look and behave. Follow it for any UI or content change.

## Project
- Vite + React + TypeScript + Tailwind v4 (no preflight), HashRouter.
- Courses: ALGO (IS115), BPAS (IS210), IDP (IS211). Behaviour is the shared React guide in `src/guide/*` (Theory, Practice, Cards, Past, wiki links in `wiki.ts`, DOM post-processing in `enhance.ts`). Each course has `src/courses/<id>/{style.css,data.json}`.
- Deployed to https://ruii-h.github.io/study-hub/ from `main` of `ruii-h/study-hub`.

## Gotchas
- There are no per-course engines any more. Put behaviour in `src/guide/*` and shared CSS in `src/course/course-extra.css`; the old generator is stale.
- Phone overflow is the top rule: nothing may spill out of its container (tables stack via `stackTables`; lesson columns need `min-width:0`). Readability first: short paragraphs, grouped content, highlighted keywords.
- Course CSS lives in `@layer legacy`. State rules must outrank `:hover` rules, and all `:hover` rules sit inside `@media (hover:hover)`.
- Quiz questions are in `data.json` `hard[n]` as `{q,o[5],a,e,w[5]}`. `w` entries get an auto "True:/False:" prefix. Do not re-run `tools/add-questions.mjs` after editing stems, because it re-adds the originals.
- Wiki links live in `src/guide/wiki.ts` (autolink, fillRows, Back pill). Only main topics are linked, and titles are shown instead of "§" numbers.
- Edit with Edit/Write. In shell scripts, check that `\b` in regexes was not turned into a literal 0x08 character.

## Workflow
- Mobile first: Samsung S24 Ultra, Chrome (~412x915). Also check 360x780.
- Check UI changes in the browser preview before reporting them done.
- Commit and push to `main` only when asked.
