import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { shuffle, useG } from './state';
import { JumpBtn, Ring, WhyRow, fillOK } from './Practice';
import { fade, pop, rise } from './motion';

/* eslint-disable @typescript-eslint/no-explicit-any */
const L5 = 'ABCDEF';
const TAG: Record<string, string> = { s: 'CHOOSE ONE', m: 'SELECT ALL THAT APPLY', f: 'TYPE THE ANSWER', w: 'SHORT ANSWER' };

/** One mixed bank per chapter: single choice, select-all and typed answers, shuffled together. */
export function buildBank(D: any, n: number) {
  const out: any[] = [];
  (D.quiz[n] || []).forEach((q: any, i: number) => out.push({ id: `x${n}-s${i}`, t: 's', q: q.q, o: q.o, a: L5[q.c], w: q.w, e: q.e, ch: n }));
  (D.hard[n] || []).forEach((q: any, i: number) => out.push({ id: `x${n}-m${i}`, t: 'm', q: q.q, o: q.o, a: q.a, w: q.w, e: q.e, ch: n }));
  (D.fill?.[n] || []).forEach((q: any, i: number) => out.push({ id: `x${n}-f${i}`, t: 'f', q: q.q, fa: q.a, kind: q.kind, ci: q.ci, e: q.e, ch: n }));
  return out;
}

export default function MixedQuiz({ n, title }: { n: number; title: string }) {
  const g = useG(); const { QP, patch, D } = g;
  const qs = useMemo(() => buildBank(D, n), [D, n]);
  const key = 'x' + n;
  const ids = qs.map((q) => q.id).sort().join();
  const st = QP[key]; const valid = st && st.ord.map((x: any) => x.id).sort().join() === ids;
  useEffect(() => {
    if (!valid) patch('QP', (o) => ({ ...o, [key]: { ord: shuffle(qs).map((q) => ({ id: q.id, perm: q.o ? shuffle(q.o.map((_: any, i: number) => i)) : [], sel: [], chk: 0, v: '' })) } }));
  }, [valid]); // eslint-disable-line
  return valid ? <Body n={n} title={title} qs={qs} k={key} /> : null;
}

function Body({ n, title, qs, k }: { n: number; title: string; qs: any[]; k: string }) {
  const g = useG(); const { QP, patch } = g;
  const by: Record<string, any> = {}; qs.forEach((q) => (by[q.id] = q));
  const prep = QP[k].ord.map((rec: any) => {
    const q = by[rec.id];
    if (q.t === 'f') return { src: q, rec, o: [], w: [], a: [] as number[] };
    const ans = q.a.split('').map((l: string) => L5.indexOf(l));
    return { src: q, rec, o: rec.perm.map((i: number) => q.o[i]), w: rec.perm.map((i: number) => (q.w ? q.w[i] : null)), a: rec.perm.map((old: number, pos: number) => (ans.includes(old) ? pos : -1)).filter((p: number) => p >= 0) };
  });
  const N = prep.length;
  const isOk = (q: any) => (q.src.t === 'f' ? !!q.rec.ok : q.rec.sel.length === q.a.length && q.rec.sel.every((x: number) => q.a.includes(x)));
  const done = prep.filter((q: any) => q.rec.chk).length, score = prep.filter((q: any) => q.rec.chk && isOk(q)).length;
  const setRec = (id: string, fn: (r: any) => any) => patch('QP', (o) => ({ ...o, [k]: { ...o[k], ts: Date.now(), ord: o[k].ord.map((r: any) => (r.id === id ? fn(r) : r)) } }));
  const finish = (q: any, rec: any, ok: boolean) => {
    setRec(q.rec.id, () => ({ ...rec, chk: 1, ok: ok ? 1 : 0 }));
    if (q.src.t === 'f') return;
    patch('M', (m) => { const x = { ...m }; if (ok) delete x[q.src.id]; else x[q.src.id] = { q: q.src.q, o: q.src.o, a: q.src.a, e: q.src.e, w: q.src.w, ch: q.src.ch, id: q.src.id }; return x; });
  };
  useEffect(() => { if (done === N) patch('S', (s) => (s[n]?.s === score && s[n]?.t === N ? s : { ...s, [n]: { s: score, t: N } })); }, [done, score]); // eslint-disable-line
  const nx = g.D.lessons[g.D.lessons.findIndex((l) => l.n === n) + 1];
  const restart = () => patch('QP', (o) => { const x = { ...o }; delete x[k]; return x; });
  const p = Math.round((score / N) * 100); const mCount = Object.keys(g.M).length;
  const back = { tab: 'practice', sel: n, y: 0, label: 'Back to your quiz', up: null };
  return (<>
    <h1 className="t-h1" style={{ fontSize: 26 }}>{title}</h1>
    <div className="sub">{N} questions · choose one, select all, type the answer, or write a short answer · saved automatically{prep.some((q: any) => q.rec.chk) ? <> · <b>resumed where you left off</b></> : null}</div>
    <div className="qprog" role="status" aria-live="polite"><span>Answered {done} of {N} · {score} correct</span><i><b style={{ width: `${(done / N) * 100}%` }} /></i><button className="btn ghost sm" onClick={restart}>↺ Start over</button></div>
    <div>
      {prep.map((q: any, i: number) => {
        const self = q.src.t === 'f' && q.src.kind === 'self'; const t = (self ? 'w' : q.src.t) as string, rec = q.rec, sel: number[] = rec.sel || [], chk = !!rec.chk, ok = chk && isOk(q);
        const multi = t === 'm';
        const fillShown = t === 'f' || t === 'w' ? (q.src.fa as string[]).filter((a) => !a.startsWith('re:')).slice(0, 2) : [];
        const long = t === 'f' && /\n/.test(q.src.fa[0] || '');
        const check = () => (t === 'f' ? finish(q, { ...rec }, fillOK({ a: q.src.fa, kind: q.src.kind, ci: q.src.ci }, rec.v || '')) : finish(q, { ...rec }, isOk(q)));
        return (
          <motion.div className="exq" key={rec.id} id={'mq' + i} {...rise(i)}>
            <div className="qh"><h2 className="qn">Question {i + 1}</h2><span className="ms">{TAG[t]}</span></div>
            <div className="qt" dangerouslySetInnerHTML={{ __html: q.src.q }} />
            {t === 'f' || t === 'w' ? (
              long ? <textarea rows={4} id={'fa' + i} spellCheck={false} disabled={chk} value={rec.v || ''} aria-label={`Your answer to question ${i + 1}`} style={{ width: '100%', font: '14px/1.5 ui-monospace,Consolas,monospace' }} onChange={(e) => setRec(rec.id, (r) => ({ ...r, v: e.target.value }))} />
                : <input type="text" id={'fa' + i} spellCheck={false} autoComplete="off" autoCapitalize="off" disabled={chk} className={chk && ok ? 'ok' : ''} value={rec.v || ''} aria-label={`Your answer to question ${i + 1}`} style={{ width: '100%', font: '14px/1.5 ui-monospace,Consolas,monospace' }} onChange={(e) => setRec(rec.id, (r) => ({ ...r, v: e.target.value }))} onKeyDown={(e) => { if (e.key === 'Enter' && !chk && (rec.v || '').trim()) check(); }} />
            ) : (
              <div role="group" aria-label={`Options for question ${i + 1}`}>
                {q.o.map((x: string, j: number) => {
                  const isA = q.a.includes(j), isS = sel.includes(j);
                  const cls = `eo ${!chk && isS ? 'sel' : ''} ${chk ? (isA && isS ? 'right' : isS ? 'wrong' : isA ? 'miss' : '') : ''}`;
                  const flip = (on: boolean) => setRec(rec.id, (r) => ({ ...r, sel: multi ? (on ? [...r.sel, j] : r.sel.filter((v: number) => v !== j)) : [j] }));
                  return (<div key={j}>
                    <label className={cls}><input type={multi ? 'checkbox' : 'radio'} name={rec.id} checked={isS} disabled={chk} onChange={(e) => flip(e.target.checked)} /><i>{L5[j]}.</i><span dangerouslySetInnerHTML={{ __html: x }} /></label>
                    <AnimatePresence>{chk && q.w[j] && <motion.div {...fade}><WhyRow ok={isA} r={q.w[j]} /></motion.div>}</AnimatePresence>
                  </div>);
                })}
              </div>)}
            {t === 'w' ? (<>
              {!chk && !rec.rev ? <div className="row"><button className="btn" onClick={() => setRec(rec.id, (r) => ({ ...r, rev: 1 }))}>Show model answer</button></div> : null}
              <AnimatePresence>{!chk && rec.rev ? (
                <motion.div {...fade}><div className="why wy"><b>Model answer:</b> {q.src.fa[0]}</div>
                  <div className="row"><span className="sub">Be honest: does your answer cover the same points?</span><button className="btn" onClick={() => finish(q, { ...rec }, true)}>✓ I got it</button><button className="btn ghost" onClick={() => finish(q, { ...rec }, false)}>✗ Not yet</button></div></motion.div>) : null}</AnimatePresence>
            </>) : (
            <div className="row">
              <button className="btn" disabled={chk || (t === 'f' ? !(rec.v || '').trim() : !sel.length)} onClick={check}>Check answer</button>
              {t === 'f' ? <button className="btn ghost" disabled={chk} onClick={() => finish(q, { ...rec, shown: 1 }, false)}>Show answer</button> : null}
            </div>)}
            <AnimatePresence>{chk && (
              <motion.div className="vd" aria-live="polite" {...fade}>
                <div className={`verdict ${ok ? 'ok' : 'no'}`}>
                  <b>{ok ? (t === 'w' ? '✅ Marked as known.' : '✅ Correct.') : rec.shown ? 'Answer revealed.' : t === 'w' ? '↺ Marked to review.' : '❌ Not quite.'}</b>{' '}
                  {t !== 'f' && t !== 'w' ? <>Correct: <b>{q.a.map((x: number) => L5[x]).join(', ')}</b>. </> : null}<span dangerouslySetInnerHTML={{ __html: q.src.e || '' }} />
                  {t === 'f' && !ok ? <div className="why wy"><b>Accepted answer:</b> {fillShown.map((a: string, m: number) => <span key={m}>{m ? ' or ' : ''}<code>{a}</code></span>)}</div> : null}
                  {!ok ? <div className="row"><JumpBtn ch={n} text={q.src.q + ' ' + (q.src.e || '')} back={back} /></div> : null}
                </div>
              </motion.div>)}</AnimatePresence>
          </motion.div>);
      })}
    </div>
    <AnimatePresence>{done === N && (
      <motion.div className="exq resultcard" aria-live="polite" {...pop} ref={(el) => { el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }}>
        <Ring p={p} /><div className="rt"><div style={{ fontWeight: 800, fontSize: 18 }}>{score} of {N} correct</div>
          <div className="sub">{p >= 80 ? 'Strong. Move on to the next chapter. 🎉' : p >= 50 ? 'Decent. Revisit the explanations of the ones you missed, then retry.' : 'Re-read the chapter, then try again.'}{mCount ? <> Missed choice questions are saved in <b>Review my mistakes</b>.</> : null}</div>
          <div className="row">{p >= 80 ? <>
            {nx ? <><button className="btn main" onClick={() => g.openChapter(nx.n)}>Continue to Chapter {nx.n}</button><button className="btn ghost" onClick={() => g.setPqSel(nx.n)}>Quiz me on Chapter {nx.n}</button></> : <button className="btn main" onClick={() => g.setTab('theory')}>Back to the notes</button>}
            <button className="btn lnk" onClick={restart}>Retry this quiz (reshuffled)</button></> : <>
            <button className="btn main" onClick={restart}>Retry this quiz (reshuffled)</button><button className="btn ghost" onClick={() => g.openChapter(n, { back })}>Re-read Chapter {n}</button></>}</div></div>
      </motion.div>)}</AnimatePresence>
  </>);
}
