import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SideList } from './Guide';
import { useG } from './state';
import { breakText } from './paragraphs';
import { mergeCells, reveal, runMermaid, stackTables, transposeTables } from './enhance';
import { chapterSlide } from './motion';

type Item = { i: number; chip: string; title: string };
type Sec = { id: string; title: string; items: Item[] };

const text = (h: string) => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x27;/g, "'").trim();

/** Sections and question cards of one mock exam, read from its HTML (the order matches the DOM order). */
function outline(html: string): Sec[] {
  const secs: Sec[] = []; let i = 0;
  html.split('<div class="t-section').slice(1).forEach((part, k) => {
    const h = /class="t-h2">([\s\S]*?)<\/div>/.exec(part);
    const items: Item[] = [];
    for (const m of part.matchAll(/<span class="cf-tag">([\s\S]*?)<\/span><h4>([\s\S]*?)<\/h4>/g)) items.push({ i: i++, chip: text(m[1]).replace(/^MOCK \d+ · /, ''), title: text(m[2]) });
    secs.push({ id: 'msec' + k, title: h ? text(h[1]) : '', items });
  });
  return secs;
}

const goTo = (i: number) => {
  const c = document.getElementById('theory-content'); const el = c?.querySelectorAll<HTMLElement>('.exr')[i]; if (!c || !el) return;
  el.classList.add('in'); c.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' });
  el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
};

/** Side list for the Mock Exams tab: the three mocks, and inside the chosen one its sections and questions. */
export function MockNav() {
  const g = useG();
  const { D, mockSel } = g;
  const mocks = D.mocks || [];
  const outl = useMemo(() => outline(mocks.find((t) => t.n === mockSel)?.html || ''), [mocks, mockSel]);
  return (<>
    <div className="theory-nav-header">Mock exams</div>
    <div className="theory-group"><div className="theory-group-title static">Full papers</div>
      {mocks.map((m) => {
        const on = m.n === mockSel;
        return (<div key={m.n}>
          <button className={`theory-item ${on ? 'active' : ''}`} aria-current={on ? 'true' : undefined} onClick={() => g.setMockSel(m.n)}>
            <span className="theory-item-icon" aria-hidden="true">🎯</span><span className="tn">{m.n}</span><span className="tt">Mock exam {m.n}</span><span className="tq sc mid">{m.count}</span>
          </button>
          {on && <div className="tut-sub">{outl.map((s) => (<div key={s.id}>
            {s.items.length > 0 && <div className="tut-sub-h">{s.title}</div>}
            {s.items.map((it) => <button key={it.i} className="tut-sub-i" onClick={() => { goTo(it.i); g.setNavOpen(false); }}><span className="chip">{it.chip}</span><span className="ttl">{it.title}</span></button>)}
          </div>))}</div>}
        </div>);
      })}
    </div>
  </>);
}

export default function Mocks() {
  const g = useG();
  const { D, mockSel, ST } = g;
  const mocks = D.mocks || [];
  const idx = Math.max(0, mocks.findIndex((t) => t.n === mockSel));
  const mock = mocks[idx];
  const pv = mocks[idx - 1], nx = mocks[idx + 1];
  const body = useRef<HTMLDivElement>(null), scroller = useRef<HTMLDivElement>(null);
  const htmlStr = useMemo(() => breakText(mock.html), [mock]);
  const outl = useMemo(() => outline(mock.html), [mock]);
  const [active, setActive] = useState('');
  const dir = useRef(0); const prev = useRef(mock.n);
  if (prev.current !== mock.n) { dir.current = mock.n > prev.current ? 1 : -1; prev.current = mock.n; }
  const theme: string = ST.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  useLayoutEffect(() => {
    const b = body.current, sc = scroller.current; if (!b || !sc) return;
    sc.scrollTop = 0;
    transposeTables(b); stackTables(b); mergeCells(b);
    const stop = reveal(b, sc);
    const secEls = [...b.querySelectorAll<HTMLElement>('.t-section')]; secEls.forEach((s, k) => { s.id = 'msec' + k; });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { root: sc, rootMargin: '-10% 0px -75% 0px' });
    secEls.forEach((s) => io.observe(s)); setActive('');
    return () => { stop(); io.disconnect(); };
  }, [mock.n]); // eslint-disable-line
  useEffect(() => { if (body.current && g.api?.loadMermaid) runMermaid(body.current, () => g.api!.loadMermaid(), theme); }, [mock.n, theme]); // eslint-disable-line
  useEffect(() => { (scroller.current?.querySelector('h1') as HTMLElement | null)?.focus({ preventScroll: true }); }, [mock.n]);

  const pts = (mock.n === 1 ? 'Mock 1' : 'Mock ' + mock.n);
  return (
    <>
      <div className="theory-nav" id="nav" tabIndex={0} aria-label="Mock exam list"><SideList /></div>
      <div ref={scroller} id="theory-content" className="theory-content" tabIndex={0} aria-label="Mock exam content">
        <motion.div key={mock.n} {...chapterSlide(dir.current)}>
          <div className="t-hero"><div className="t-tag">{pts} of {mocks.length}</div><h1 className="t-h1" tabIndex={-1}>Mock exam {mock.n}</h1>
            <div className="t-subtitle">Try each question under exam conditions first, then open the answer. Every answer carries its reasoning, so use it to find out why a wrong option is wrong.</div>
            <div className="meta">🎯 {mock.count} questions · chips show the question number and its marks</div></div>
          {outl.length > 1 && (
            <nav className="toc" aria-label="Sections in this mock exam"><div className="tocs">{outl.map((s) => <a key={s.id} href={'#' + s.id} className={active === s.id ? 'on' : ''} onClick={(e) => { e.preventDefault(); const c = document.getElementById('theory-content'), t = document.getElementById(s.id); if (c && t) { t.classList.add('in'); c.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' }); } }}>{s.title}</a>)}</div></nav>)}
          <div ref={body} dangerouslySetInnerHTML={{ __html: htmlStr }} />
          <div className="t-nav-footer">
            {pv ? <button className="t-nav-btn" onClick={() => g.setMockSel(pv.n)}><small>Previous</small>← Mock exam {pv.n}</button> : <div />}
            {nx ? <button className="t-nav-btn next" onClick={() => g.setMockSel(nx.n)}><small>Next mock</small>Mock exam {nx.n} →</button> : <div />}
          </div>
        </motion.div>
      </div>
    </>
  );
}
