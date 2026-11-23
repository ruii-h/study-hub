import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSES, type CourseMeta } from '../courses/registry';

const THEME_KEY = 'studyhub_theme';

function readJSON<T>(k: string, d: T): T {
  try { return JSON.parse(localStorage.getItem(k) || 'null') ?? d; } catch { return d; }
}

function progress(c: CourseMeta) {
  const visited = Object.keys(readJSON<Record<string, unknown>>(c.storageKey + 'visited', {})).length;
  const scores = readJSON<Record<string, { s: number; t: number }>>(c.storageKey + 'scores', {});
  const quizzed = Object.keys(scores).length;
  return { visited, quizzed, pct: Math.min(100, Math.round((visited / c.chapters) * 100)) };
}

function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const t = localStorage.getItem(THEME_KEY);
      if (t === 'light' || t === 'dark') return t;
    } catch { /* ignore */ }
    return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* ignore */ }
    return () => { delete document.documentElement.dataset.theme; };
  }, [theme]);
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))] as const;
}

export default function Hub() {
  const [theme, toggle] = useTheme();
  useEffect(() => { document.title = 'Study Hub — IS114 · IS115 · IS210 · IS211 · IS1704'; }, []);

  return (
    <div className="hub min-h-dvh bg-bg text-ink font-sans">
      <header className="sticky top-0 z-10 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <div className="text-lg font-bold tracking-tight">
            Study<span className="text-accent">Hub</span>
          </div>
          <button
            onClick={toggle}
            className="ml-auto rounded-lg border border-line bg-surface2 px-3 py-1.5 text-sm transition hover:border-accent "
            aria-label="Switch between light and dark mode"
          >
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10">
        <section className="animate-hero-in">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Choose a course to study</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Read the notes, take chapter quizzes, drill flashcards and sit practice exams. Progress is saved only in this browser.
          </p>
        </section>

        <ul className="m-0 mt-8 grid list-none p-0 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c, i) => {
            const p = progress(c);
            return (
              <li key={c.id} className="animate-tab-in flex" style={{ animationDelay: `${i * 80}ms`, ['--card-accent' as string]: theme === 'dark' ? c.accent[0] : c.accent[1] }}>
                <Link
                  to={`/${c.id}`}
                  className="group relative flex w-full flex-col overflow-hidden rounded-xl no-underline text-ink border border-line bg-surface p-5 transition duration-200 hover:-translate-y-1 hover:border-card-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-card-accent"
                >
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-card-accent" />
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-surface2 px-2 py-0.5 font-mono text-xs text-muted">Study guide</span>
                    <span className="text-muted transition group-hover:text-card-accent group-hover:translate-x-0.5" aria-hidden>→</span>
                  </div>
                  <div className="mt-4 text-3xl font-extrabold tracking-tight text-card-accent">{c.code}</div>
                  <h2 className="mt-1 text-base font-semibold">{c.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{c.blurb}</p>

                  <dl className="mt-4 flex gap-4 text-xs text-muted">
                    <div><dt className="sr-only">Chapters</dt><dd><b className="text-ink">{c.chapters}</b> chapters</dd></div>
                    {c.cards > 0 && <div><dt className="sr-only">Flashcards</dt><dd><b className="text-ink">{c.cards}</b> cards</dd></div>}
                    <div><dt className="sr-only">Tabs</dt><dd><b className="text-ink">{c.tabs.length}</b> modes</dd></div>
                  </dl>

                  <div className="mt-4" aria-label={`${p.visited} of ${c.chapters} chapters read`}>
                    <div className="mb-1 flex justify-between text-xs text-muted">
                      <span>{p.visited} / {c.chapters} read</span>
                      {p.quizzed > 0 && <span>{p.quizzed} quizzed</span>}
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface3">
                      <div className="h-full rounded-full bg-card-accent transition-[width] duration-500" style={{ width: `${p.pct}%` }} />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
