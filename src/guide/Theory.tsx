import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MockExam from './Mock';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { SideList } from './Guide';
import { ChapterLoader } from './Loader';
import { highlightChunked } from '../course/highlight';
import { useG } from './state';
import { breakText } from './paragraphs';
import { balanceUnits, mergeCells, transposeTables, reveal, runMermaid, snakeChains, stackTables, treeChains } from './enhance';
import { chapterSlide, ease, flipTiming, floatUp } from './motion';

export function scrollToId(id: string, instant = false) {
  const c = document.getElementById('theory-content'), t = document.getElementById(id);
  if (!c || !t) return;
  t.classList.add('in');
  const toc = c.querySelector<HTMLElement>('.toc');
  c.scrollTo({ top: t.offsetTop - ((toc ? toc.offsetHeight : 0) + 32), behavior: instant ? 'instant' : 'smooth' });
  t.classList.remove('flash'); void t.offsetWidth; t.classList.add('flash');
}

/** Cross-link hover cards and click-to-jump with a "back" step, for every `a.wl` link in the guide. */
export function WikiLayer() {
  const g = useG();
  const ref = useRef(g); ref.current = g;
  useEffect(() => {
    const hover = matchMedia('(hover:hover)');
    const over = (e: MouseEvent) => { const t = e.target as HTMLElement; const a = t.closest?.('a.wl') as HTMLElement | null; if (!hover.matches) return; if (a) ref.current.wiki.wlShow(a); else if (!t.closest?.('.wl-tip')) ref.current.wiki.wlHide(); };
    const fin = (e: FocusEvent) => { const a = (e.target as HTMLElement).closest?.('a.wl') as HTMLElement | null; if (a && hover.matches) ref.current.wiki.wlShow(a); };
    const fout = (e: FocusEvent) => { if ((e.target as HTMLElement).closest?.('a.wl')) ref.current.wiki.wlHide(); };
    const hide = () => ref.current.wiki.wlHide();
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') hide(); };
    const click = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a.wl') as HTMLElement | null; if (!a) return;
      e.preventDefault(); hide();
      const G = ref.current; const n = +a.dataset.n!, id = a.dataset.id || ''; const c = document.getElementById('theory-content');
      const l = G.D.lessons.find((x) => x.n === G.cur);
      const back = G.tab === 'tut' ? { tab: 'tut', sel: G.tutSel, y: c?.scrollTop || 0, label: 'Back to the tutorial', up: null }
        : !(G.tab === 'theory' || G.D.tabs?.some((x) => x.key === G.tab && x.ns))
        ? { tab: G.tab, sel: G.cur, y: 0, label: 'Back to the ' + (G.tab === 'cheat' ? 'cheat-sheet' : 'flashcards'), up: null }
        : { tab: 'theory', sel: G.cur, y: c?.scrollTop || 0, label: 'Back to ' + (l ? G.wiki.wlChap(l) : 'the previous page'), up: G.back };
      if (n === G.cur && G.tab === G.tabOf(n)) { G.setBack(back); if (id) scrollToId(id); else c?.scrollTo({ top: 0, behavior: 'smooth' }); }
      else G.openChapter(n, { back, sec: id || undefined });
    };
    document.addEventListener('mouseover', over); document.addEventListener('focusin', fin); document.addEventListener('focusout', fout);
    document.addEventListener('scroll', hide, true); document.addEventListener('keydown', key); document.addEventListener('click', click);
    return () => { document.removeEventListener('mouseover', over); document.removeEventListener('focusin', fin); document.removeEventListener('focusout', fout); document.removeEventListener('scroll', hide, true); document.removeEventListener('keydown', key); document.removeEventListener('click', click); ref.current.wiki.wlHide(); };
  }, []);
  return null;
}

export default function Theory() {
  const g = useG();
  const { D, cur, ST, meta } = g;
  const lesson = D.lessons.find((l) => l.n === cur)!;
  const scope = useMemo(() => D.lessons.filter((l) => g.tabOf(l.n) === g.tabOf(cur)), [D, cur]); // eslint-disable-line
  const i = scope.findIndex((l) => l.n === cur), pv = scope[i - 1], nx = scope[i + 1];
  const body = useRef<HTMLDivElement>(null), scroller = useRef<HTMLDivElement>(null), rp = useRef<HTMLElement>(null);
  const [toc, setToc] = useState<{ id: string; num: string; t: string }[]>([]);
  const [active, setActive] = useState('');
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const dirRef = useRef(0); const prev = useRef(cur);
  if (prev.current !== cur) { dirRef.current = cur > prev.current ? 1 : -1; prev.current = cur; }
  const theme = ST.theme;
  const nq = (D.hard[cur]?.length || 0) + (D.fill?.[cur]?.length || 0) + ((D as any).mixed ? D.quiz[cur]?.length || 0 : 0);
  const mins = useMemo(() => Math.max(1, Math.round(lesson.html.replace(/<[^>]+>/g, ' ').split(/\s+/).length / 200)), [lesson]);
  const htmlStr = useMemo(() => breakText(lesson.html.replace(/ onclick="this\.classList\.toggle\('flip'\)"/g, '')), [lesson]);

  // very large chapters are laid out one frame later so a loading state can paint first
  const heavy = lesson.html.length > 15000;
  const [doneFor, setDoneFor] = useState(0);
  const [shownFor, setShownFor] = useState(0);
  const ready = !heavy || doneFor === cur;
  const finished = !heavy || shownFor === cur; // true once everything is in: html, enhancements, code colours, fonts, images
  useEffect(() => { if (ready) return; let a = requestAnimationFrame(() => { a = requestAnimationFrame(() => setDoneFor(cur)); }); return () => cancelAnimationFrame(a); }, [cur, ready]);

  useEffect(() => {
    if (!heavy || !ready || finished) return;
    let off = false;
    (async () => {
      const b = body.current; if (!b) return;
      await highlightChunked(b);
      await runMermaid(b, () => g.api!.loadMermaid(), theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
      await Promise.all([document.fonts?.ready, ...[...b.querySelectorAll('img')].map((im) => (im.complete ? null : im.decode().catch(() => null)))]);
      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      if (!off) setShownFor(cur);
    })();
    return () => { off = true; };
  }, [cur, ready, finished, heavy]); // eslint-disable-line

  useLayoutEffect(() => {
    const b = body.current, sc = scroller.current; if (!b || !sc || !ready) return;
    const p = g.pendingScroll.current; g.pendingScroll.current = null;
    sc.scrollTop = 0;
    transposeTables(b); stackTables(b); mergeCells(b); snakeChains(b); treeChains(b); g.wiki.autolink(sc, cur); balanceUnits(b); g.wiki.fillRows(sc);
    const stop = reveal(b, sc);
    const list = [...b.querySelectorAll<HTMLElement>('.t-section[id]')].map((s) => { const n = s.querySelector('.t-num'); const t = s.querySelector('.t-h2')!.textContent!.replace(n ? n.textContent! : '', '').trim(); return { id: s.id, num: n ? n.textContent! : '', t }; });
    setToc(list.length >= 2 ? list : []); setActive(''); setSlot(b.querySelector<HTMLElement>('#cmock-slot'));
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { root: sc, rootMargin: '-10% 0px -75% 0px' });
    if (list.length >= 2) b.querySelectorAll('.t-section[id]').forEach((s) => io.observe(s));
    g.api?.mountDemos?.([...b.querySelectorAll('.demo-slot')]);
    if (p?.sec) setTimeout(() => scrollToId(p.sec!, true), 30); else if (p?.y) setTimeout(() => { sc.scrollTop = p.y!; }, 30);
    else if (ST.yn === cur && ST.y > 50) setTimeout(() => { sc.scrollTop = ST.y; }, 350);
    (window as any).loadTheory = (n: number) => {
      const c = document.getElementById('theory-content');
      g.openChapter(n, { back: { tab: g.tab, sel: cur, y: c?.scrollTop || 0, label: 'Back to ' + g.wiki.wlChap(lesson), up: g.back } });
    };
    return () => { stop(); io.disconnect(); g.api?.disposeDemos?.(); setSlot(null); };
  }, [cur, ready]); // eslint-disable-line
  useEffect(() => { if (heavy && !finished) return; if (body.current) runMermaid(body.current, () => g.api!.loadMermaid(), theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')); }, [cur, theme, ready, finished]); // eslint-disable-line
  // cards that would leave an empty grid cell stretch to fill the row (re-run on every size change, like bootstrap's col-*)
  useEffect(() => {
    const sc = scroller.current, b = body.current; if (!sc || !b || !ready) return;
    let t = 0; const run = () => { clearTimeout(t); t = window.setTimeout(() => { balanceUnits(b); g.wiki.fillRows(sc); }, 100); };
    const ro = new ResizeObserver(run); ro.observe(sc); ro.observe(b); document.fonts?.ready.then(run); run();
    return () => { ro.disconnect(); clearTimeout(t); };
  }, [cur, ready]); // eslint-disable-line
  useEffect(() => { const h = scroller.current?.querySelector('h1') as HTMLElement | null; h?.focus({ preventScroll: true }); }, [cur]);

  const tmr = useRef(0);
  const onScroll = () => {
    const sc = scroller.current!; const p = sc.scrollTop / Math.max(1, sc.scrollHeight - sc.clientHeight);
    if (rp.current) rp.current.style.width = p * 100 + '%';
    clearTimeout(tmr.current); tmr.current = window.setTimeout(() => g.patch('ST', (o) => ({ ...o, y: Math.round(sc.scrollTop), yn: cur })), 400);
  };
  // flashcards inside the lesson: flip with a spring-free tween, one flip per click
  const onBodyClick = (e: React.MouseEvent) => {
    const fc = (e.target as HTMLElement).closest<HTMLElement>('.fcard'); if (!fc) return;
    const fi = fc.querySelector<HTMLElement>('.fi'); if (!fi || fc.dataset.busy) return;
    const to = fc.dataset.flip === '1' ? 0 : 180; fc.dataset.busy = '1';
    animate(fi, { rotateY: to }, { duration: flipTiming.lesson, ease }).then(() => { fc.dataset.flip = to ? '1' : '0'; delete fc.dataset.busy; });
  };

  return (
    <>
      <div className="theory-nav" id="nav" tabIndex={0} aria-label="Chapter list"><SideList /></div>
      <div ref={scroller} id="theory-content" className="theory-content" tabIndex={0} aria-label="Chapter content" onScroll={onScroll}>
        <motion.div key={cur} {...chapterSlide(dirRef.current)}>
          <div className="t-hero"><div className={`t-tag ${lesson.tag}`}>Chapter {lesson.dn ?? cur} of {scope.length}</div><h1 className="t-h1" tabIndex={-1}>{lesson.title}</h1><div className="t-subtitle" dangerouslySetInnerHTML={{ __html: lesson.goal }} /><div className="meta">⏱ about {mins} min read{nq > 0 ? ` · ${nq} exam-style questions at the end` : ''}</div></div>
          {toc.length > 0 && (
            <nav className="toc" aria-label="Sections in this chapter">
              <div className="tocs">{toc.map((s) => <a key={s.id} href={'#' + s.id} className={active === s.id ? 'on' : ''} aria-current={active === s.id ? 'true' : undefined} title={s.t} onClick={(e) => { e.preventDefault(); scrollToId(s.id); }}>{s.num ? s.num + ' ' : ''}{s.t}</a>)}</div>
              <i className="rp" ref={rp} />
            </nav>)}
          {!finished && <ChapterLoader />}
          <div ref={body} className={finished ? '' : 'defer-hl'} onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: ready ? htmlStr : '' }} />
          {slot && D.cmock ? createPortal(<MockExam qs={D.cmock} />, slot) : null}
          {meta.tabs.includes('Practice') && (D.hard[cur]?.length || D.quiz[cur]?.length) ? <div className="endrow"><div className="endmsg">You have reached the end of Chapter {lesson.dn ?? cur}. <b>Next step:</b> test yourself while it is fresh.</div><div className="row"><button className="btn" onClick={() => g.goQuiz(cur)}>🧠 Take the Chapter {cur} quiz</button>{D.tuts?.some((t) => t.n === cur) ? <button className="btn ghost" onClick={() => g.openTut(cur)}>✏️ Tutorials &amp; exercises</button> : null}</div></div> : null}
          {!(meta.tabs.includes('Practice') && (D.hard[cur]?.length || D.quiz[cur]?.length)) && D.tuts?.some((t) => t.n === cur) ? <div className="endrow"><div className="endmsg">Ready to apply it? Work through the tutorial and in-class exercises for this chapter.</div><button className="btn" onClick={() => g.openTut(cur)}>✏️ Tutorials &amp; exercises</button></div> : null}
          <div className="t-nav-footer">
            {pv ? <button className="t-nav-btn" onClick={() => g.openChapter(pv.n)}><small>Previous</small>← {pv.title}</button> : <div />}
            {nx ? <button className="t-nav-btn next" onClick={() => g.openChapter(nx.n)}><small>Next chapter</small>{nx.title} →</button> : meta.tabs.includes('Practice') && g.tabOf(cur) === 'theory' ? <button className="t-nav-btn next" onClick={() => g.setTab('practice')}><small>You finished the course notes</small>Go to the practice questions →</button> : <div />}
          </div>
        </motion.div>
        <AnimatePresence>
          {g.back && (
            <motion.div className="backbar" key="bb" {...floatUp}>
              <button className="bb-go" onClick={g.goBack}>↩ {g.back.label}</button>
              <button className="bb-x" title="Dismiss" aria-label="Dismiss" onClick={() => g.setBack(null)}>×</button>
            </motion.div>)}
        </AnimatePresence>
      </div>
    </>
  );
  void meta;
}
