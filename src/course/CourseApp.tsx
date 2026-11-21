import { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { byId, loaders } from '../courses/registry';
import extraCss from './course-extra.css?inline';

type Loaded = Awaited<ReturnType<(typeof loaders)['algo']>>;

/**
 * Hosts one study guide. The guide's markup, CSS, data and engine are loaded as a lazy chunk the first time
 * the course is opened; leaving the route removes its CSS, listeners and window bindings completely.
 */
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

  // CSS first (layout effect => before paint), then the engine once the shell markup is in the DOM.
  useLayoutEffect(() => {
    if (!meta || !ready) return;
    const style = document.createElement('style');
    style.dataset.course = meta.id;
    style.textContent = ready.css + '\n' + extraCss;
    document.head.appendChild(style);
    document.documentElement.dataset.course = meta.id;
    const prevTitle = document.title;
    document.title = `${meta.short} Study Guide — ${meta.title}`;
    const unmount = ready.mount(ready.D, {
      loadMermaid: () => import('mermaid').then((m) => m.default),
    });
    return () => {
      unmount();
      style.remove();
      delete document.documentElement.dataset.course;
      delete document.documentElement.dataset.theme;
      document.documentElement.style.removeProperty('--vvh');
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
        <div className="animate-fade-in text-center">
          <div className="animate-glow mx-auto mb-3 h-10 w-10 rounded-full border-2 border-accent/60" />
          Loading {meta.short}…
        </div>
      </div>
    );
  }
  // display:contents keeps the guide's own layout (header / tabs / main) as direct children of <body>'s flow
  return <div key={meta.id} style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: ready.shell }} />;
}
