import { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { byId, loaders } from '../courses/registry';
import Guide from '../guide/Guide';
import extraCss from './course-extra.css?inline';

type Loaded = Awaited<ReturnType<(typeof loaders)['algo']>>;

/** Hosts one study guide: loads its data + CSS lazily, injects the CSS while the route is open, and renders the React guide. */
export default function CourseApp() {
  const { courseId } = useParams();
  const meta = byId(courseId);
  const [mod, setMod] = useState<{ id: string; m: Loaded } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!meta) return;
    let off = false;
    setFailed(false);
    loaders[meta.id]().then((m) => { if (!off) setMod({ id: meta.id, m }); }).catch(() => { if (!off) setFailed(true); });
    return () => { off = true; };
  }, [meta]);

  const ready = meta && mod && mod.id === meta.id ? mod.m : null;

  useLayoutEffect(() => {
    if (!meta || !ready) return;
    document.querySelectorAll('style[data-course]').forEach((e) => e.remove()); // never let two guides' CSS coexist
    const style = document.createElement('style');
    style.dataset.course = meta.id;
    // legacy CSS lives in a low-priority layer so Tailwind utilities used inside the guide (e.g. the ALGO demos) can win
    style.textContent = '@layer legacy {\n' + ready.css + '\n}\n' + extraCss;
    document.head.appendChild(style);
    document.documentElement.dataset.course = meta.id;
    const prevTitle = document.title;
    document.title = `${meta.code} ${meta.title} — Study Guide`;
    return () => {
      style.remove();
      delete document.documentElement.dataset.course;
      delete document.documentElement.dataset.theme;
      document.documentElement.style.removeProperty('--app-h');
      document.title = prevTitle;
    };
  }, [meta, ready]);

  if (!meta) return <Navigate to="/" replace />;
  if (failed) {
    return (
      <div className="grid min-h-dvh place-items-center bg-bg p-6 text-ink">
        <div className="text-center">
          <p className="mb-3">Could not load {meta.short}. Check your connection and try again.</p>
          <button className="rounded-lg border border-line px-3 py-1.5" onClick={() => location.reload()}>Reload</button>
        </div>
      </div>
    );
  }
  if (!ready) {
    return (
      <div className="grid min-h-dvh place-items-center bg-bg text-muted" role="status" aria-live="polite">
        <div className="animate-fade-in w-[min(560px,88vw)] space-y-3" aria-label={`Loading ${meta.short}`}>
          <span className="sr-only">Loading {meta.short}…</span>
          {[40, 100, 92, 70].map((w, i) => <div key={i} className="h-4 animate-pulse rounded-md bg-surface2" style={{ width: w + '%' }} />)}
          <div className="h-40 animate-pulse rounded-xl bg-surface2" />
          {[88, 55].map((w, i) => <div key={i} className="h-4 animate-pulse rounded-md bg-surface2" style={{ width: w + '%' }} />)}
        </div>
      </div>
    );
  }
  return <Guide key={meta.id} meta={meta} D={ready.D as never} api={{ loadMermaid: () => import('mermaid').then((m) => m.default), ...ready.api }} />;
}
