import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EXTRA } from './config';
import { useG } from './state';
import { JumpBtn } from './Practice';
import { fade, riseSwap } from './motion';

/* eslint-disable @typescript-eslint/no-explicit-any */
const L5 = 'ABCDE';

function Mcq({ q, sec }: { q: any; sec: string }) {
  const g = useG(); const { P, PS, M, ST, patch, D } = g;
  const sol = !!ST.psol;
  const [sel, setSel] = useState<string[]>(PS[q.n] ? PS[q.n].split('') : []);
  const checked = PS[q.n] !== undefined && !sol;
  const ans = q.a.split('');
  const label = q.no || q.n;
  const check = () => {
    const s = sel.slice().sort().join(''); const a = ans.slice().sort().join(''); const ok = s === a;
    patch('PS', (o) => ({ ...o, [q.n]: s })); patch('P', (o) => ({ ...o, [q.n]: ok ? 1 : 0 }));
    patch('M', (m) => { const n = { ...m }; if (ok) delete n['p' + q.n]; else n['p' + q.n] = { q: q.q, o: q.o, a: q.a, e: q.e, w: q.w, ch: q.ch, id: 'p' + q.n }; return n; });
  };
  const retry = () => { setSel([]); patch('PS', (o) => { const n = { ...o }; delete n[q.n]; return n; }); patch('P', (o) => { const n = { ...o }; delete n[q.n]; return n; }); };
  const done = checked || sol; const ok = checked && P[q.n] === 1;
  void M; void D;
  return (
    <div className="exq" id={'pq' + q.n}>
      <div className="qh"><h2 className="qn">Question {label}</h2><span className="ms">{D.pastSingle ? 'CHOOSE THE BEST ANSWER' : 'SELECT ALL THAT APPLY'}</span></div>
      <div className="qt" dangerouslySetInnerHTML={{ __html: q.q }} />
      <div role="group" aria-label={`Options for question ${label}`}>
        {q.o.map((o: string, i: number) => {
          const v = L5[i], isA = ans.includes(v), isS = sel.includes(v);
          const cls = `eo ${!done && isS ? 'sel' : ''} ${sol ? (isA ? 'right' : '') : checked ? (isA && isS ? 'right' : isS ? 'wrong' : isA ? 'miss' : '') : ''}`;
          return (<div key={i}>
            <label className={cls}><input type="checkbox" value={v} checked={isS} disabled={done} onChange={(e) => setSel((s) => (e.target.checked ? [...s, v] : s.filter((x) => x !== v)))} /><i>{v}.</i><span dangerouslySetInnerHTML={{ __html: o }} /></label>
            {checked && q.w?.[i] ? <div className={`why ${isA ? 'wy' : 'wn'}`}><b>{isA ? 'Why this is right' : 'Why this is wrong'}:</b> {q.w[i]}</div> : null}
          </div>);
        })}
      </div>
      {!sol && <div className="row"><button className="btn" disabled={checked || !sel.length} onClick={check}>Check answer</button>
        <button className="btn ghost" onClick={() => g.openChapter(q.ch, { back: { tab: 'past', sel: sec, sec, q: q.n, y: 0, label: 'Back to Past Exam Q' + label, up: null } })}>📖 Revise chapter {q.ch}</button></div>}
      <AnimatePresence>{done && (
        <motion.div {...fade}><div className={`verdict ${sol || ok ? 'ok' : 'no'}`}><b>{sol ? 'Solution:' : ok ? '✅ Correct.' : '❌ Not quite.'}</b> {sol ? '' : 'Answer: '}<b>{ans.join(', ')}</b>. <span dangerouslySetInnerHTML={{ __html: q.e }} />
          {!sol && <div className="row">{ok ? null : <JumpBtn ch={q.ch} text={q.q + ' ' + q.e} back={{ tab: 'past', sel: sec, sec, q: q.n, y: 0, label: 'Back to Past Exam Q' + label, up: null }} />}<button className="btn ghost" onClick={retry}>↺ Try again</button></div>}
        </div></motion.div>)}</AnimatePresence>
    </div>
  );
}

function Written({ q, sec }: { q: any; sec: string }) {
  const g = useG(); const sol = !!g.ST.psol;
  return (
    <div className="exq">
      <div className="qh"><h2 className="qn">Question {q.no || q.n}</h2><span className="ms">{q.pts} POINTS</span></div>
      <div className="qt" dangerouslySetInnerHTML={{ __html: q.q }} />
      <label className="sr" htmlFor={'ta' + q.n}>Your answer</label>
      <textarea id={'ta' + q.n} placeholder="Write your own answer first (saved on this device)…" value={g.PW[q.n] || ''} onChange={(e) => g.patch('PW', (o) => ({ ...o, [q.n]: e.target.value }))} />
      <div className="row"><button className="btn ghost" onClick={() => g.openChapter(q.ch, { back: { tab: 'past', sel: sec, sec, q: 0, y: 0, label: 'Back to Past Exam', up: null } })}>📖 Revise chapter {q.ch}</button></div>
      <AnimatePresence initial={false}>{sol && <motion.details className="model" open {...fade}><summary>Model answer</summary><div className="ma" dangerouslySetInnerHTML={{ __html: q.a }} /></motion.details>}</AnimatePresence>
    </div>
  );
}

export default function Past() {
  const g = useG(); const { D, P, ST, pastSec: sec } = g;
  const secs = D.secs!; const [a, b, label] = secs[sec] || secs[Object.keys(secs)[0]];
  const mc = D.exam.mcq.filter((q) => q.n >= a && q.n <= b), wr = D.exam.wr.filter((q) => q.n >= a && q.n <= b);
  const keys = Object.keys(secs), nk = keys[keys.indexOf(sec) + 1];
  const ex = EXTRA[g.meta.id];
  const a1 = Object.keys(P).length, c1 = Object.values(P).filter((v: any) => v).length;
  return (
    <div className="pane" id="pastm" tabIndex={0}>
      <div className="pastbar"><h1 className="t-h1" style={{ fontSize: 26, margin: 0 }}>Past exam questions</h1>
        <label className="switch"><span>Show solutions</span><input type="checkbox" role="switch" checked={!!ST.psol} onChange={(e) => g.patch('ST', (o) => ({ ...o, psol: e.target.checked ? 1 : 0 }))} /><i /></label></div>
      <div className="warnbox"><b>{ex?.pastLabel || 'Important:'}</b> <span dangerouslySetInnerHTML={{ __html: D.pastNote || '' }} /></div>
      <div className="pills" role="group" aria-label="Exam sections">
        {keys.map((k) => <button key={k} className={k === sec ? 'on' : ''} aria-pressed={k === sec} onClick={() => g.setPastSec(k)}>{secs[k][2].split(' · ')[0]} · {secs[k][3] || `Q${secs[k][0]}–${secs[k][1]}`}</button>)}
      </div>
      <div className="sub" style={{ margin: '8px 0 4px' }}><b>{label}</b> &nbsp;·&nbsp; <span role="status">{a1} of {D.exam.mcq.length} answered · {c1} correct</span></div>
      <AnimatePresence mode="wait" initial={false}><motion.div key={sec} {...riseSwap}>
        {mc.map((q) => <Mcq key={q.n + String(!!ST.psol)} q={q} sec={sec} />)}
        {wr.map((q) => <Written key={q.n} q={q} sec={sec} />)}
        <div className="endrow"><div className="endmsg">End of this section. {nk ? 'Keep the momentum.' : 'That is everything here.'}</div>
          {nk ? <button className="btn go" onClick={() => g.setPastSec(nk)}>Next: {secs[nk][2].split(' · ')[0]} →</button> : <button className="btn go" onClick={() => g.setTab('practice')}>Back to the practice questions →</button>}</div>
      </motion.div></AnimatePresence>
    </div>
  );
}
