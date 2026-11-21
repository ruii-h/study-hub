# Study Hub

ALGO (IS115), BPAS (IS210) and IDP (IS211) study guides combined into one app.
Vite + React + TypeScript + Tailwind v4. Progress lives in `localStorage` (same keys as the original files, so existing progress carries over).

```
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
```

## Layout
- `src/hub/` – course picker (React + Tailwind).
- `src/course/CourseApp.tsx` – loads one course lazily, injects its CSS, mounts its engine, and removes everything when you leave.
- `src/courses/<id>/` – `data.json` (lessons, quizzes, cards, exams), `shell.html`, `style.css` (original CSS, unchanged), `engine.js` (original behaviour incl. the ALGO demos; generated).
- `src/styles/animations.css` – the 19 original keyframes, exposed to Tailwind as `animate-*` in `src/index.css`.
- Mermaid is loaded on demand when a chapter contains a diagram; BPAS gets KaTeX CSS/fonts from the `katex` package.
- `tools/` – the one-off scripts used to split the original HTML files (`tools/extract/*` then `tools/gen-courses.mjs`).

## Deploy
Static site, hash routing, relative base: works on GitHub Pages (`.github/workflows/deploy.yml`), Netlify (`netlify.toml`) or any static host. Nothing has been published.
