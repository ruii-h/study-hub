import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CourseMeta } from '../courses/registry';
import { EXTRA } from './config';
import { GuideProvider, cardChap, lessonNo, scoreClass, unitOf, useG, type Data } from './state';
import Theory, { WikiLayer } from './Theory';
import Practice from './Practice';
import { Cards, Cheat } from './Cards';
import Past from './Past';
import Tutorials, { TutNav } from './Tutorials';
import Mocks, { MockNav } from './Mocks';
import { tabSwap } from './motion';
import { watchHighlight } from '../course/highlight';

const TAB_DEF: Record<string, [string, string, string]> = {
  theory: ['📖', 'Theory', ''], practice: ['🧠', 'Practice', ' Questions'], cards: ['🃏', 'Flashcards', ''],
  cheat: ['📌', 'Cheat', '-sheet'], tut: ['✏️', 'Tutorials', ' & Exercises'], mock: ['🎯', 'Exam', ' Practice'], ice: ['✏️', 'ICE', ' Exercises'], past: ['📝', 'Past', ' Exam'],
};

const tabDef = (D: Data, t: string): [string, string, string] => { const x = D.tabs?.find((y) => y.key === t); return x ? [x.ico, x.label, x.x] : TAB_DEF[t]; };

function navItem(ico: string, num: string | number, title: string, on: boolean, act: () => void, badge?: React.ReactNode) {
  return (
    <button key={String(num) + title} className={`theory-item ${on ? 'active' : ''}`} aria-current={on ? 'true' : undefined} onClick={act}>
      <span className="theory-item-icon" aria-hidden="true">{ico}</span><span className="tn">{num}</span><span className="tt" dangerouslySetInnerHTML={{ __html: title }} />{badge}
    </button>
  );
}

/** Chapter lists, one per tab. Elements are stable React nodes, so clicking an item only changes classes and never rebuilds the list. */
export function SideList() {
  const g = useG();
  const { D, S, V, K, M, ST, tab, cur, pqSel, pastSec, cch } = g;
  const grp = (groups: { t: string; ns: number[] }[] | [string, number[]][], fn: (n: number) => React.ReactNode) =>
    (groups as any[]).map((x, i) => { const t = Array.isArray(x) ? x[0] : x.t; const ns: number[] = Array.isArray(x) ? x[1] : x.ns; return (
      <div className="theory-group" key={i}><div className="theory-group-title static">{t}</div>{ns.map((n) => fn(n))}</div>); });
  const L = (n: number) => D.lessons.find((l) => l.n === n)!;
  const pqg = EXTRA[g.meta.id]?.pqg || D.pqg || D.groups.map((x) => [x.t, x.ns] as [string, number[]]);
  const mCount = Object.keys(M).length;
  const cnt: Record<number, number> = {};
  D.cards.forEach((c) => { const k = cardChap(c); cnt[k] = (cnt[k] || 0) + 1; });
  const sc = D.tabs?.find((x) => x.key === tab);
  if (sc && sc.kind === 'play') {
    const gs = [...new Set(D.play!.map((p: any) => p.g))] as string[];
    return (<>
      <div className="theory-nav-header">Live exercises</div>
      {gs.map((gname) => (<div className="theory-group" key={gname}><div className="theory-group-title static">{gname}</div>
        {D.play!.map((p: any, i: number) => p.g === gname ? navItem('▶', i + 1, p.title, (ST.play || D.play![0].id) === p.id, () => { g.patch('ST', (o) => ({ ...o, play: p.id })); g.setNavOpen(false); }) : null)}</div>))}
    </>);
  }
  if (tab === 'tut') return <TutNav />;
  if (tab === 'mock') return <MockNav />;
  if (sc && sc.groups) return (<>
    <div className="theory-nav-header">{sc.label}{sc.x}</div>
    {grp(sc.groups, (n) => { const l = L(n); return navItem(l.icon, lessonNo(g.meta, l), l.title, cur === n, () => g.openChapter(n), V[n] ? <span className="rd" title="Read" aria-label="read">●</span> : null); })}
  </>);
  if (tab === 'practice') return (<>
    <div className="theory-nav-header">{unitOf(g.meta)} quizzes</div>
    {navItem('🔁', '', 'Review my mistakes', pqSel === 'mx', () => g.setPqSel('mx'), mCount ? <span className="tq sc lo">{mCount}</span> : null)}
    {grp(pqg, (n) => { const qo = (D as any).qonly?.find((x: any) => x.n === n), l = qo ? null : L(n), s = S[n]; return navItem(qo ? '📝' : l!.icon, qo ? 'Q' : lessonNo(g.meta, l!), qo ? qo.title : l!.title, pqSel === n, () => g.setPqSel(n), s ? <span className={`tq sc ${scoreClass(s)}`}>{s.s}/{s.t}</span> : null); })}
    {D.selfq ? navItem('📝', '', 'Self-check Q&amp;A', pqSel === 'sc', () => g.setPqSel('sc')) : null}
  </>);
  if (tab === 'cards' || tab === 'cheat') return (<>
    <div className="theory-nav-header">{tab === 'cards' ? `Flashcards by ${unitOf(g.meta).toLowerCase()}` : `Cheat-sheet by ${unitOf(g.meta).toLowerCase()}`}</div>
    {navItem('🗂️', '', `All ${unitOf(g.meta).toLowerCase()}s (${D.cards.length})`, !cch, () => g.setCch(0))}
    {grp(D.groups, (n) => { const l = L(n); if (!cnt[n]) return null; const kn = D.cards.reduce((a, c, i) => a + (cardChap(c) === n && K[i] ? 1 : 0), 0);
      return navItem(l.icon, lessonNo(g.meta, l), l.title, cch === n, () => g.setCch(n), tab === 'cards' ? <span className={`tq sc ${kn === cnt[n] ? 'ok' : 'mid'}`}>{kn}/{cnt[n]}</span> : <span className="tq sc mid">{cnt[n]}</span>); })}
  </>);
  if (tab === 'past' && D.secs) return (<>
    <div className="theory-nav-header">Past exam sections</div>
    {Object.keys(D.secs).map((k) => { const [a, b, label] = D.secs![k]; const mc = D.exam.mcq.filter((q) => q.n >= a && q.n <= b); const ans = mc.filter((q) => g.P[q.n] !== undefined).length;
      return navItem('📝', k.length > 2 ? '' : k, label.replace(/^Section [A-E] · /, ''), pastSec === k, () => g.setPastSec(k), mc.length ? <span className={`tq sc ${ans === mc.length ? 'ok' : 'mid'}`}>{ans}/{mc.length}</span> : null); })}
  </>);
  return (<>
    <div className="theory-nav-header">{unitOf(g.meta)}s</div>
    {grp(D.groups, (n) => { const l = L(n), s = S[n]; return navItem(l.icon, lessonNo(g.meta, l), l.title, cur === n, () => g.openChapter(n), <>{V[n] ? <span className="rd" title="Read" aria-label="read">●</span> : null}{s ? <span className="tq sc" data-c={scoreClass(s)} title="Quiz score">{s.s}/{s.t}</span> : null}</>); })}
  </>);
}

function Search() {
  const g = useG();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const idx = useMemo(() => { g.wiki.buildIdx(); return g.wiki.getIdx() as any[]; }, [g.wiki]);
  const res = useMemo(() => {
    const v = q.trim().toLowerCase(); if (v.length < 2) return [];
    const terms = v.split(/\s+/); const out: { e: any; sc: number }[] = [];
    idx.forEach((e) => { const tl = e.title.toLowerCase(), x = e.text.toLowerCase(); let sc = 0; for (const t of terms) { const a = tl.includes(t), b = x.split(t).length - 1; if (!a && !b) { sc = 0; break; } sc += (a ? 6 : 0) + Math.min(b, 5); } if (sc) out.push({ e, sc: sc + (e.term ? 3 : 0) }); });
    return out.sort((a, b) => b.sc - a.sc).slice(0, 8);
  }, [q, idx]);
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
  const snippet = (e: any) => { const terms = q.trim().toLowerCase().split(/\s+/); const p = e.text.toLowerCase().indexOf(terms[0]); let sh = esc(e.text.slice(Math.max(0, p - 50), p + 110)); terms.forEach((t) => { sh = sh.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); }); return `…${sh}…`; };
  useEffect(() => { const f = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest('.searchbox')) setOpen(false); }; document.addEventListener('click', f); return () => document.removeEventListener('click', f); }, []);
  return (
    <div className="searchbox">
      <input id="q" type="search" placeholder="Search all notes…  ( / )" aria-label="Search all notes" autoComplete="off" aria-controls="sr" value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); (document.querySelector('#sr .sri') as HTMLElement)?.focus(); } }} />
      <div id="sr" role="listbox" hidden={!(open && q.trim().length >= 2)}
        onKeyDown={(e) => { const it = [...document.querySelectorAll<HTMLElement>('#sr .sri')]; const k = it.indexOf(document.activeElement as HTMLElement); if (e.key === 'ArrowDown') { e.preventDefault(); it[(k + 1) % it.length]?.focus(); } if (e.key === 'ArrowUp') { e.preventDefault(); if (k <= 0) document.getElementById('q')?.focus(); else it[k - 1].focus(); } }}>
        {res.length ? res.map((r, i) => (
          <button key={i} role="option" className="sri" onClick={() => { setOpen(false); setQ(''); g.openChapter(r.e.n, { sec: r.e.id || undefined, q: r.e.term ? r.e.title + ' ' + r.e.text : q }); }}>
            <span className="srt">{r.e.term ? '🃏 ' : ''}{r.e.title}</span><span className="src">Ch {r.e.n} · {r.e.term ? 'key term' : r.e.ch}</span><span className="srs" dangerouslySetInnerHTML={{ __html: snippet(r.e) }} />
          </button>)) : <div className="srn">No matches. Try a different word, or part of a word.</div>}
      </div>
    </div>
  );
}

function Help({ dlg }: { dlg: React.RefObject<HTMLDialogElement | null> }) {
  const g = useG();
  const [armed, setArmed] = useState(false);
  const tabs = useTabs();
  return (
    <dialog id="help" ref={dlg} aria-labelledby="helph" onClose={() => setArmed(false)}>
      <h2 id="helph">Help &amp; shortcuts</h2>
      <table className="keys"><tbody>
        <tr><td><kbd>←</kbd> <kbd>→</kbd></td><td>Previous / next {unitOf(g.meta).toLowerCase()}</td></tr><tr><td><kbd>/</kbd></td><td>Search all notes</td></tr>
        <tr><td><kbd>t</kbd></td><td>Switch light / dark mode</td></tr><tr><td><kbd>1</kbd>–<kbd>{tabs.length}</kbd></td><td>Jump to a tab</td></tr>
        <tr><td><kbd>?</kbd></td><td>Open this help</td></tr><tr><td><kbd>Esc</kbd></td><td>Close search or this window</td></tr></tbody></table>
      <p className="hk">Key terms are shown in <b className="k-c">one colour</b> throughout, so bold coloured text always means “remember this term”.</p>
      <p className="hk">Your progress, scores and settings are saved in this browser only.</p>
      <div className="row">
        <button className="btn ghost" id="resetbtn" onClick={() => { if (!armed) { setArmed(true); setTimeout(() => setArmed(false), 4000); } else { g.resetAll(); setArmed(false); } }}>{armed ? 'Click again to confirm' : 'Reset my progress'}</button>
        <button className="btn" onClick={() => dlg.current?.close()}>Close</button>
      </div>
    </dialog>
  );
}

function useTabs() {
  const { D, meta } = useG();
  return useMemo(() => {
    const t = ['theory'];
    if (meta.tabs.includes('Practice')) t.push('practice');
    if (D.tuts?.length) t.push('tut');
    if (D.mocks?.length) t.push('mock');
    if (meta.tabs.includes('Flashcards')) t.push('cards');
    if (meta.tabs.includes('Cheat-sheet')) t.push('cheat');
    D.tabs?.forEach((x) => { if (!t.includes(x.key)) t.push(x.key); });
    if (D.ice) t.push('ice');
    if ((D.exam.mcq.length || D.exam.wr.length) && D.secs) t.push('past');
    return t;
  }, [D, meta]);
}

function Shell({ meta }: { meta: CourseMeta }) {
  const g = useG();
  const { D, ST, tab, V } = g;
  const tabs = useTabs();
  const dlg = useRef<HTMLDialogElement>(null);
  const theme: string = ST.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { if (!tabs.includes(tab)) g.setTab('theory'); }, [tabs, tab]); // eslint-disable-line
  const nRead = Object.keys(V).length;
  const toggleTheme = () => g.patch('ST', (o) => ({ ...o, theme: theme === 'light' ? 'dark' : 'light' }));
  useEffect(() => {
    const fit = () => document.documentElement.style.setProperty('--app-h', Math.round(window.visualViewport ? window.visualViewport.height * window.visualViewport.scale : innerHeight) + 'px');
    fit(); addEventListener('resize', fit); window.visualViewport?.addEventListener('resize', fit);
    return () => { removeEventListener('resize', fit); window.visualViewport?.removeEventListener('resize', fit); };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tg = e.target as HTMLElement; const typing = /INPUT|TEXTAREA|SELECT/.test(tg.tagName) && (tg as HTMLInputElement).type !== 'checkbox';
      if (e.key === 'Escape') { g.setNavOpen(false); (document.getElementById('q') as HTMLInputElement)?.blur(); return; }
      if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === '/') { e.preventDefault(); (document.getElementById('q') as HTMLInputElement)?.focus(); }
      else if (e.key === '?') dlg.current?.showModal();
      else if (e.key === 't') toggleTheme();
      else if (/^[1-9]$/.test(e.key) && tabs[+e.key - 1]) g.setTab(tabs[+e.key - 1]);
      else if (g.tabOf(g.cur) === tab && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !tg.closest('.toc')) { const sl = D.lessons.filter((x) => g.tabOf(x.n) === tab), i = sl.findIndex((x) => x.n === g.cur), j = i + (e.key === 'ArrowRight' ? 1 : -1); if (sl[j]) g.openChapter(sl[j].n); }
    };
    document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey);
  });
  return (<>
    <a className="skip" href="#main">Skip to content</a>
    <header className="top"><div className="topbar">
      <button id="menu" aria-label="Open menu" aria-expanded={g.navOpen} onClick={() => g.setNavOpen(!g.navOpen)}>☰</button>
      <a className="hubback" href="#/" aria-label="Back to all courses" title="All courses">⌂</a><div className="logo">{meta.code}<span>Study</span></div>
      <div className="badge">{D.lessons.length} {unitOf(meta).toUpperCase()}S</div><div className="course">{meta.code} {meta.title}</div>
      <Search />
      <div className="topbar-right">
        <button id="theme" onClick={toggleTheme} aria-label="Switch between light and dark mode">{theme === 'light' ? <><span className="ti">🌙</span><span className="tx"> Dark</span></> : <><span className="ti">☀️</span><span className="tx"> Light</span></>}</button>
        <button id="helpbtn" aria-label="Help and keyboard shortcuts" onClick={() => dlg.current?.showModal()}>?</button>
        <div className="status-dot" aria-hidden="true" /><div className="status-text" id="stat" aria-live="polite">{nRead} / {D.lessons.length} read</div>
      </div>
    </div>
    <div id="pbar" role="progressbar" aria-label={`${unitOf(meta)}s read`} aria-valuemin={0} aria-valuemax={D.lessons.length} aria-valuenow={nRead}><i style={{ width: `${(nRead / D.lessons.length) * 100}%` }} /></div></header>
    <nav className="tab-bar" aria-label="Study sections"><div className="tablist" role="tablist">
      {tabs.map((t) => (
        <button key={t} className={`tab ${tab === t ? 'active' : ''}`} role="tab" aria-selected={tab === t} data-t={t} onClick={() => g.setTab(t)}>
          <span className="ti">{tabDef(D, t)[0]}</span><span className="tl">{tabDef(D, t)[1]}<span className="x">{tabDef(D, t)[2]}</span></span>
        </button>))}
    </div></nav>
    <main id="main"><div id="content">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={tab} className="tab-view active" role="tabpanel" id={'tab-' + tab} style={{ animation: 'none' }}
          {...tabSwap}>
          {(tab === 'theory' || !!D.tabs?.some((x) => x.key === tab && x.ns)) && <Theory />}
          {tab === 'play' && g.api?.Playground && <g.api.Playground />}
          {tab === 'practice' && <Practice />}
          {tab === 'tut' && <Tutorials />}
          {tab === 'mock' && <Mocks />}
          {tab === 'cards' && <Cards />}
          {tab === 'cheat' && !D.tabs?.some((x) => x.key === 'cheat') && <Cheat />}
          {tab === 'ice' && <div className="pane" id="icem" tabIndex={0}><h1 className="t-h1" style={{ fontSize: 26 }}>In-class exercises (ICE)</h1><div className="sub">Exercises from the weekly in-class sessions, grouped by chapter. Attempt each one first, then open the answer. Lab exercises are not included: they are meant to be run against test cases.</div><div dangerouslySetInnerHTML={{ __html: D.ice || '' }} /></div>}
          {tab === 'past' && <Past />}
        </motion.div>
      </AnimatePresence>
    </div></main>
    <div className={`theory-nav ${g.navOpen ? 'open' : ''}`} id="mnav" role="navigation" tabIndex={0} aria-label="Menu"><SideList /></div>
    <div id="scrim" className={g.navOpen ? 'on' : ''} onClick={() => g.setNavOpen(false)} />
    <Help dlg={dlg} />
    <WikiLayer />
  </>);
}

export default function Guide({ meta, D, api }: { meta: CourseMeta; D: Data; api?: Record<string, any> }) {
  const data = useMemo(() => { const x = EXTRA[meta.id]; return x ? { ...D, secs: D.secs || x.secs, pastNote: D.pastNote || x.pastNote } : D; }, [D, meta.id]);
  // IDP lessons contain a few inline handlers (colour-contrast demo, chapter links)
  useEffect(() => {
    const w = window as any;
    if (meta.id === 'idp') {
      const $ = (s: string) => document.querySelector(s) as any;
      w.dm = {
        hsl() { const h = $('#dmH').value, s = $('#dmS').value, l = $('#dmL').value; $('#dmHv').textContent = h; $('#dmSv').textContent = s; $('#dmLv').textContent = l; $('#dmSw').style.background = `hsl(${h},${s}%,${l}%)`; },
        lum(hex: string) { const c = [1, 3, 5].map((i) => parseInt(hex.substr(i, 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; },
        cc() { const f = $('#dmCt').value, b = $('#dmCb').value, p = $('#dmCp'); p.style.color = f; p.style.background = b; const a = w.dm.lum(f), c = w.dm.lum(b), r = (Math.max(a, c) + 0.05) / (Math.min(a, c) + 0.05); $('#dmCr').innerHTML = `<b>${r.toFixed(2)} : 1</b> &nbsp; ${r >= 4.5 ? '✅ passes body text (AA)' : r >= 3 ? '⚠️ large text only' : '❌ fails'}`; },
        cb(btn: HTMLElement, f: string) { btn.parentNode!.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === btn)); $('#dmCbs').style.filter = f === 'none' ? 'none' : f; },
      };
    }
    return () => { delete w.dm; delete w.loadTheory; };
  }, [meta.id]);
  useEffect(() => watchHighlight(), []); // Obsidian code colours for every code block
  return <GuideProvider meta={meta} D={data} api={api}><Shell meta={meta} /></GuideProvider>;
}
