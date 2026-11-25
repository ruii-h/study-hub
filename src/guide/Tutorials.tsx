import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { SideList } from './Guide';
import { useG } from './state';
import { breakText } from './paragraphs';
import { mergeCells, reveal, stackTables, transposeTables } from './enhance';
import SolToggle, { useSolutions } from './SolToggle';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Item = { i: number; chip: string; title: string };
type Sec = { id: string; title: string; items: Item[] };

const text = (h: string) => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x27;/g, "'").trim();

/** Sections and exercise cards of one chapter's tutorial page, read from its HTML (the order matches the DOM order). */
function outline(html: string): Sec[] {
  const secs: Sec[] = []; let i = 0;
  html.split('<div class="t-section').slice(1).forEach((part, k) => {
    const h = /class="t-h2">([\s\S]*?)<\/div>/.exec(part);
    const items: Item[] = [];
    for (const m of part.matchAll(/<span class="cf-tag">([\s\S]*?)<\/span><h4>([\s\S]*?)<\/h4>/g)) items.push({ i: i++, chip: text(m[1]), title: text(m[2]) });
    secs.push({ id: 'tsec' + k, title: h ? text(h[1]) : '', items });
  });
  return secs;
}

const goTo = (i: number) => {
  const c = document.getElementById('theory-content'); const el = c?.querySelectorAll<HTMLElement>('.exr')[i]; if (!c || !el) return;
  el.classList.add('in'); c.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' });
  el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
};

/** Side list for the Tutorials tab: the chapter being studied, then the exercises inside it. */
export function TutNav() {
  const g = useG();
  const { D, tutSel } = g;
  const tuts = D.tuts || [];
  const L = (n: number) => D.lessons.find((l) => l.n === n)!;
  const outl = useMemo(() => outline(tuts.find((t) => t.n === tutSel)?.html || ''), [tuts, tutSel]);
  return (<>
    {D.groups.map((gr, gi) => {
      const ns = gr.ns.filter((n) => tuts.some((t) => t.n === n)); if (!ns.length) return null;
      return (<div className="theory-group" key={gi}><div className="theory-group-title static">{gr.t}</div>
        {ns.map((n) => {
          const l = L(n), t = tuts.find((x) => x.n === n)!, on = n === tutSel;
          return (<div key={n}>
            <button className={`theory-item ${on ? 'active' : ''}`} aria-current={on ? 'true' : undefined} onClick={() => g.setTutSel(n)}>
              <span className="theory-item-icon" aria-hidden="true">{l.icon}</span><span className="tn">{l.dn ?? n}</span><span className="tt" dangerouslySetInnerHTML={{ __html: l.title }} /><span className="tq sc mid">{t.count}</span>
            </button>
          </div>);
        })}
      </div>);
    })}
  </>);
}

export default function Tutorials() {
  const g = useG();
  const { D, tutSel, ST } = g;
  const tuts = D.tuts || [];
  const idx = Math.max(0, tuts.findIndex((t) => t.n === tutSel));
  const tut = tuts[idx];
  const lesson = D.lessons.find((l) => l.n === tut.n)!;
  const pv = tuts[idx - 1], nx = tuts[idx + 1];
  const body = useRef<HTMLDivElement>(null), scroller = useRef<HTMLDivElement>(null);
  const htmlStr = useMemo(() => breakText(tut.html), [tut]);
  const outl = useMemo(() => outline(tut.html), [tut]);
  const [active, setActive] = useState('');
  useSolutions(body, tut.n);
  const dir = useRef(0); const prev = useRef(tut.n);
  if (prev.current !== tut.n) { dir.current = tut.n > prev.current ? 1 : -1; prev.current = tut.n; }

  useLayoutEffect(() => {
    const b = body.current, sc = scroller.current; if (!b || !sc) return;
    sc.scrollTop = 0;
    transposeTables(b); stackTables(b); mergeCells(b); g.wiki.autolink(sc, tut.n);
    const stop = reveal(b, sc);
    const secEls = [...b.querySelectorAll<HTMLElement>('.t-section')]; secEls.forEach((s, k) => { s.id = 'tsec' + k; });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { root: sc, rootMargin: '-10% 0px -75% 0px' });
    secEls.forEach((s) => io.observe(s)); setActive('');
    return () => { stop(); io.disconnect(); };
  }, [tut.n]); // eslint-disable-line
  useEffect(() => { (scroller.current?.querySelector('h1') as HTMLElement | null)?.focus({ preventScroll: true }); }, [tut.n]);
  void ST;

  return (
    <>
      <div className="theory-nav" id="nav" tabIndex={0} aria-label="Tutorial list"><SideList /></div>
      <div ref={scroller} id="theory-content" className="theory-content" tabIndex={0} aria-label="Tutorial content">
        <div key={tut.n}>
          <SolToggle /><div className="t-hero"><div className={`t-tag ${lesson.tag}`}>Tutorial {idx + 1} of {tuts.length}</div><h1 className="t-h1" tabIndex={-1}>{lesson.title}: tutorials &amp; exercises</h1>
            <div className="t-subtitle">Attempt each question first, then open the answer. The full working shows which part of the theory gives each step.</div>
            <div className="meta">✏️ {tut.count} exercises · chips show where each one comes from</div></div>
          <div className="row tut-actions"><button className="btn ghost" onClick={() => g.openChapter(tut.n, { back: { tab: 'tut', sel: tut.n, y: 0, label: 'Back to the tutorial', up: null } })}>📖 Revise Chapter {lesson.dn ?? tut.n} first</button>
            {(D.hard[tut.n]?.length || D.quiz[tut.n]?.length) ? <button className="btn ghost" onClick={() => g.goQuiz(tut.n)}>🧠 Chapter {tut.n} quiz</button> : null}</div>
          {outl.length > 1 && (
            <nav className="toc" aria-label="Sections in this tutorial"><div className="tocs">{outl.map((s) => <a key={s.id} href={'#' + s.id} className={active === s.id ? 'on' : ''} onClick={(e) => { e.preventDefault(); const c = document.getElementById('theory-content'), t = document.getElementById(s.id); if (c && t) { t.classList.add('in'); c.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' }); } }}>{s.title}</a>)}</div></nav>)}
          <div ref={body} dangerouslySetInnerHTML={{ __html: htmlStr }} />
          <div className="t-nav-footer">
            {pv ? <button className="t-nav-btn" onClick={() => g.setTutSel(pv.n)}><small>Previous</small>← {D.lessons.find((l) => l.n === pv.n)?.title}</button> : <div />}
            {nx ? <button className="t-nav-btn next" onClick={() => g.setTutSel(nx.n)}><small>Next tutorial</small>{D.lessons.find((l) => l.n === nx.n)?.title} →</button> : <div />}
          </div>
        </div>
      </div>
    </>
  );
}
