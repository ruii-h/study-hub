import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cardChap, shuffle, useG } from './state';
import { flipTiming } from './motion';
import { breakAny } from './paragraphs';

/* eslint-disable @typescript-eslint/no-explicit-any */
function ChapterSelect() {
  const g = useG();
  return (<>
    <label className="sr" htmlFor="fch">Chapter</label>
    <select id="fch" className="chsel" value={g.cch} onChange={(e) => g.setCch(+e.target.value)}>
      <option value={0}>All chapters</option>
      {g.D.lessons.filter((l) => g.D.cards.some((c) => cardChap(c) === l.n)).map((l) => <option key={l.n} value={l.n}>{l.n}. {l.title}</option>)}
    </select>
  </>);
}

/** One flashcard: squeeze to the centre, swap the face, open again. A tiny state machine means exactly one flip per click. */
function Card({ c, i }: { c: { t: string; d: string; f: string }; i: number }) {
  const g = useG();
  const [back, setBack] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'close' | 'open'>('idle');
  const known = !!g.K[i];
  const flip = () => { if (phase === 'idle') setPhase('close'); };
  return (
    <motion.div className={`bp-card ${known ? 'known' : ''}`} role="button" tabIndex={0} aria-label={`Flashcard: ${c.t.replace(/<[^>]+>/g, '')}. Press Enter to flip.`}
      onClick={flip} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } }}
      animate={{ scaleX: phase === 'close' ? 0 : 1 }} whileHover={{ y: -3 }} transition={{ duration: phase === 'close' ? flipTiming.close : flipTiming.open, ease: 'easeInOut' }}
      onAnimationComplete={() => { if (phase === 'close') { setBack((b) => !b); setPhase('open'); } else if (phase === 'open') setPhase('idle'); }}>
      {back ? (<>
        <div className="bp-card-header bp-card-back"><div className="bp-card-header-title" dangerouslySetInnerHTML={{ __html: c.t }} /><span className="bp-flip-badge">Definition</span></div>
        <div className="fc-b" dangerouslySetInnerHTML={{ __html: breakAny(c.d) }} />
        <div style={{ padding: '0 16px 12px' }}><button className="btn ghost" onClick={(e) => { e.stopPropagation(); g.patch('K', (k) => ({ ...k, [i]: k[i] ? 0 : 1 })); }}>{known ? '✓ Known (undo)' : 'Mark as known'}</button></div>
      </>) : (<>
        <div className="bp-card-header"><div className="bp-card-header-title" dangerouslySetInnerHTML={{ __html: c.t }} /><span className="bp-flip-badge">Term · {g.wiki.wlRefLabel(c.f)}</span></div>
        <div className="fc-b" style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Tap to reveal the definition…</div>
      </>)}
    </motion.div>
  );
}

export function Cards() {
  const g = useG();
  const [q, setQ] = useState(''); const [f, setF] = useState('all'); const [shuf, setShuf] = useState(0);
  const list = useMemo(() => {
    let cs = g.D.cards.map((c, i) => ({ ...c, i })); if (shuf) cs = shuffle(cs);
    const t = q.toLowerCase();
    return cs.filter((c) => (!t || (c.t + c.d).toLowerCase().includes(t)) && (f === 'all' || (f === 'known') === !!g.K[c.i]) && (!g.cch || cardChap(c) === g.cch));
  }, [g.D.cards, q, f, shuf, g.cch, g.K]);
  const nKnown = Object.values(g.K).filter(Boolean).length;
  const pane = useRef<HTMLDivElement>(null);
  useEffect(() => { const t = setTimeout(() => g.wiki.fillRows(pane.current), 80); const f = () => g.wiki.fillRows(pane.current); addEventListener('resize', f); return () => { clearTimeout(t); removeEventListener('resize', f); }; }, [list]); // eslint-disable-line
  return (
    <div className="pane" id="cardsm" tabIndex={0} ref={pane}>
      <h1 className="t-h1" style={{ fontSize: 26 }}>Flashcards</h1>
      <div className="sub">Say the definition aloud, then tap, click or press Enter to flip. Mark what you know — it is saved.</div>
      <div className="fc-filter">
        <label className="sr" htmlFor="fq">Search terms</label><input id="fq" type="search" placeholder="Search terms…" value={q} onChange={(e) => setQ(e.target.value)} />
        <label className="sr" htmlFor="fs">Filter cards</label><select id="fs" value={f} onChange={(e) => setF(e.target.value)}><option value="all">All</option><option value="todo">Not yet known</option><option value="known">Known</option></select>
        <ChapterSelect /><button className="btn ghost" onClick={() => setShuf((s) => s + 1)}>Shuffle</button>
        <span id="fcount" className="sub" role="status">{list.length} cards · {nKnown} of {g.D.cards.length} known</span>
      </div>
      <div className="fc-grid" id="fg">{list.map((c) => <Card key={c.i + '-' + shuf} c={c} i={c.i} />)}</div>
    </div>
  );
}

export function Cheat() {
  const g = useG();
  const cs = g.D.cards.filter((c) => !g.cch || cardChap(c) === g.cch);
  return (
    <div className="pane" id="cheatm" tabIndex={0}>
      <h1 className="t-h1" style={{ fontSize: 26 }}>Cheat-sheet</h1>
      <div className="sub">{cs.length} key terms{g.cch ? ' from chapter ' + g.cch : ''} with the section where each lives.</div>
      <div className="fc-filter"><ChapterSelect /></div>
      <div className="t-table-wrap" tabIndex={0}><table className="ch"><thead><tr><th>Term</th><th>Definition</th><th>From</th></tr></thead><tbody>
        {cs.map((c, i) => <tr key={i}><td dangerouslySetInnerHTML={{ __html: c.t }} /><td dangerouslySetInnerHTML={{ __html: c.d }} /><td dangerouslySetInnerHTML={{ __html: g.wiki.wlRefHTML(c.f) }} /></tr>)}
      </tbody></table></div>
    </div>
  );
}
