import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { breakAny } from './paragraphs';
import { EXTRA } from './config';
import { scoreClass, shuffle, useG } from './state';
import { fade, pop, rise, slideX } from './motion';
import MixedQuiz from './Mixed';

/* eslint-disable @typescript-eslint/no-explicit-any */
const L5 = 'ABCDEF';
const esc = (s: string) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));

export function JumpBtn({ ch, text, back }: { ch: number; text: string; back: any }) {
  const g = useG();
  const s = useMemo(() => g.wiki.bestSection(ch, text) as { title: string; id: string } | null, [g.wiki, ch, text]);
  const t = s ? (s.title.length > 44 ? s.title.slice(0, 42) + '…' : s.title) : '';
  return <button className="btn ghost jump" onClick={() => g.openChapter(ch, { back, sec: s?.id || undefined })}>{s ? '📖 Review ' + t : '📖 Review ' + (g.meta.unit || 'Chapter') + ' ' + ch}</button>;
}

export const WhyRow = ({ ok, r }: { ok: boolean; r?: string | null }) => (r ? <div className={`why ${ok ? 'wy' : 'wn'}`}><b>{ok ? 'Why this is right' : 'Why this is wrong'}:</b> {r}</div> : null);

export function Ring({ p }: { p: number }) { return <div className="ring" style={{ ['--p' as any]: p }}><span>{p}%</span></div>; }

/** A mistake corrected in "Review my mistakes" is also marked correct in the quiz it came from (chapter quiz, mixed quiz or past exam), including that chapter's score. */
export function syncSource(g: any, src: any) {
  const id = String(src.id); const ans: string[] = String(src.a).split('');
  const past = /^p(.+)$/.exec(id);
  if (past) {
    g.patch('PS', (o: any) => ({ ...o, [past[1]]: ans.slice().sort().join('') }));
    g.patch('P', (o: any) => ({ ...o, [past[1]]: 1 }));
    return;
  }
  const m = /^(h|x)(\d+)-/.exec(id); if (!m) return;
  const n = +m[2], key = m[1] === 'h' ? String(n) : 'x' + n;
  const old = g.QP[key]?.ord?.find((r: any) => r.id === id); if (!old) return;
  const idx = ans.map((l) => L5.indexOf(l));
  const wasWrong = !!old.chk && !(old.ok !== undefined ? old.ok : old.sel.length === idx.length && old.sel.every((p: number) => idx.includes(old.perm[p])));
  g.patch('QP', (o: any) => ({ ...o, [key]: { ...o[key], ord: o[key].ord.map((r: any) => (r.id === id ? { ...r, sel: r.perm.map((old2: number, pos: number) => (idx.includes(old2) ? pos : -1)).filter((p: number) => p >= 0), chk: 1, ...(m[1] === 'x' ? { ok: 1 } : {}) } : r)) } }));
  if (wasWrong) g.patch('S', (s: any) => (s[n] ? { ...s, [n]: { ...s[n], s: Math.min(s[n].t, s[n].s + 1) } } : s));
}

/* ---------- multi-select quiz ---------- */
type MQ = { title: string; qs: any[]; qkey: string; pills?: React.ReactNode; ch?: number };
function MultiQuiz(props: MQ) {
  const { qs, qkey } = props; const { QP, patch } = useG();
  const ids = qs.map((q) => q.id).sort().join();
  const st = QP[qkey];
  const valid = st && st.ord.map((x: any) => x.id).sort().join() === ids;
  useEffect(() => { if (!valid) patch('QP', (o) => ({ ...o, [qkey]: { ord: shuffle(qs).map((q) => ({ id: q.id, perm: shuffle(q.o.map((_: any, i: number) => i)), sel: [], chk: 0 })) } })); }, [valid]); // eslint-disable-line
  return valid ? <MultiBody {...props} /> : null;
}
function MultiBody({ title, qs, qkey, pills, ch }: MQ) {
  const g = useG();
  const { QP, patch } = g;
  const st = QP[qkey];
  const by: Record<string, any> = {}; qs.forEach((q) => (by[q.id] = q));
  const prep = st.ord.map((rec: any) => { const q = by[rec.id]; const ans = q.a.split('').map((l: string) => L5.indexOf(l)); return { src: q, rec, o: rec.perm.map((i: number) => q.o[i]), w: rec.perm.map((i: number) => (q.w ? q.w[i] : null)), a: rec.perm.map((old: number, pos: number) => (ans.includes(old) ? pos : -1)).filter((p: number) => p >= 0) }; });
  const N = prep.length;
  const isOk = (q: any) => q.rec.sel.length === q.a.length && q.rec.sel.every((x: number) => q.a.includes(x));
  const done = prep.filter((q: any) => q.rec.chk).length, score = prep.filter((q: any) => q.rec.chk && isOk(q)).length;
  const setRec = (id: string, fn: (r: any) => any) => patch('QP', (o) => ({ ...o, [qkey]: { ...o[qkey], ts: Date.now(), ord: o[qkey].ord.map((r: any) => (r.id === id ? fn(r) : r)) } }));
  const check = (q: any) => {
    setRec(q.rec.id, (r) => ({ ...r, chk: 1 }));
    const ok = isOk(q);
    if (ok && qkey === 'mx') syncSource(g, q.src);
    patch('M', (m) => { const n = { ...m }; if (ok) delete n[q.src.id]; else n[q.src.id] = { q: q.src.q, o: q.src.o, a: q.src.a, e: q.src.e, w: q.src.w, ch: q.src.ch, id: q.src.id }; return n; });
  };
  const key = qkey; const n = /^\d+$/.test(key) ? +key : 0;
  useEffect(() => { if (done === N && n) patch('S', (s) => (s[n]?.s === score && s[n]?.t === N ? s : { ...s, [n]: { s: score, t: N } })); }, [done, score]); // eslint-disable-line
  const isPast = n > 0 && !g.D.lessons.some((l) => l.n === n); // the past-quiz section has no theory chapter
  const nx = n && !isPast ? g.D.lessons[g.D.lessons.findIndex((l) => l.n === n) + 1] : null;
  const restart = () => patch('QP', (o) => { const x = { ...o }; delete x[qkey]; return x; });
  const p = Math.round((score / N) * 100); const mCount = Object.keys(g.M).length;
  return (<>
    <h1 className="t-h1" style={{ fontSize: 26 }}>{title}</h1>{pills}
    <div className="sub">{N} questions · <b>select all that apply</b> · every option must be judged · saved automatically{prep.some((q: any) => q.rec.chk || q.rec.sel.length) ? <> · <b>resumed where you left off</b></> : null}</div>
    <div className="qprog" role="status" aria-live="polite"><span>Answered {done} of {N} · {score} fully correct</span><i><b style={{ width: `${(done / N) * 100}%` }} /></i>{key === 'mx' ? null : <button className="btn ghost sm" onClick={restart}>↺ Start over</button>}</div>
    <div>
      {prep.map((q: any, i: number) => {
        const sel: number[] = q.rec.sel, chk = !!q.rec.chk, ok = chk && isOk(q);
        return (
          <motion.div className="exq" key={q.rec.id} id={'mq' + i} {...rise(i)}>
            <div className="qh"><h2 className="qn">Question {i + 1}</h2><span className="ms">{q.a.length === 1 ? 'CHOOSE ONE' : 'SELECT ALL THAT APPLY'}</span></div>
            <div className="qt" dangerouslySetInnerHTML={{ __html: breakAny(q.src.q) }} />
            <div role="group" aria-label={`Options for question ${i + 1}`}>
              {q.o.map((x: string, j: number) => {
                const isA = q.a.includes(j), isS = sel.includes(j);
                const cls = `eo ${!chk && isS ? 'sel' : ''} ${chk ? (isA && isS ? 'right' : isS ? 'wrong' : isA ? 'miss' : '') : ''}`;
                return (<div key={j}>
                  <label className={cls}><input type="checkbox" checked={isS} disabled={chk} onChange={(e) => setRec(q.rec.id, (r) => ({ ...r, sel: e.target.checked ? [...r.sel, j] : r.sel.filter((v: number) => v !== j) }))} /><i>{L5[j]}.</i><span dangerouslySetInnerHTML={{ __html: x }} /></label>
                  <AnimatePresence>{chk && q.w[j] && <motion.div {...fade}><WhyRow ok={isA} r={q.w[j]} /></motion.div>}</AnimatePresence>
                </div>);
              })}
            </div>
            <div className="row"><button className="btn" disabled={chk || !sel.length} onClick={() => check(q)}>Check answer</button></div>
            <AnimatePresence>{chk && (
              <motion.div className="vd" aria-live="polite" {...fade}>
                <div className={`verdict ${ok ? 'ok' : 'no'}`}><b>{ok ? '✅ Fully correct.' : '❌ Not quite.'}</b> Correct: <b>{q.a.map((x: number) => L5[x]).join(', ')}</b>. <span dangerouslySetInnerHTML={{ __html: breakAny(q.src.e) }} />
                  {!ok && q.src.ch ? <div className="row"><JumpBtn ch={q.src.ch} text={q.src.q + ' ' + q.src.e + ' ' + q.o.filter((_: any, j: number) => q.a.includes(j) !== sel.includes(j)).join(' ')} back={{ tab: 'practice', sel: qkey === 'mx' ? 'mx' : g.pqSel, y: 0, label: 'Back to your quiz', up: null }} /></div> : null}
                </div>
              </motion.div>)}</AnimatePresence>
          </motion.div>);
      })}
    </div>
    <AnimatePresence>{done === N && (
      <motion.div className="exq resultcard" aria-live="polite" {...pop} ref={(el) => { el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }}>
        <Ring p={p} /><div className="rt"><div style={{ fontWeight: 800, fontSize: 18 }}>{score} of {N} fully correct</div>
          <div className="sub">{p >= 80 ? `Strong. Move on to the next ${(g.meta.unit || 'chapter').toLowerCase()}. 🎉` : p >= 50 ? 'Decent. Revisit the explanations of the ones you missed, then retry.' : 'Re-read the chapter, then try again. Partial credit does not exist in the exam either.'}{mCount && key !== 'mx' ? <> Missed questions are saved in <b>Review my mistakes</b> so they come back until you get them right.</> : null}</div>
          <div className="row">
            {key === 'mx' ? <button className="btn main" onClick={() => g.setPqSel('mx')}>{mCount ? 'Review remaining mistakes' : 'Nothing left to review ✓'}</button> : p >= 80 ? <>
              {nx ? <><button className="btn main" onClick={() => g.openChapter(nx.n)}>Continue to {g.meta.unit || 'Chapter'} {nx.n}</button><button className="btn ghost" onClick={() => g.setPqSel(nx.n)}>Quiz me on {g.meta.unit || 'Chapter'} {nx.n}</button></> : <button className="btn main" onClick={() => g.setTab('theory')}>Back to the notes</button>}
              <button className="btn lnk" onClick={restart}>Retry this quiz (reshuffled)</button>{isPast ? null : <button className="btn lnk" onClick={() => g.openChapter(n, { back: { tab: 'practice', sel: n, y: 0, label: 'Back to your quiz', up: null } })}>Re-read {g.meta.unit || 'Chapter'} {n}</button>}</> : <>
              <button className="btn main" onClick={restart}>Retry this quiz (reshuffled)</button>{isPast ? null : <button className="btn ghost" onClick={() => g.openChapter(n, { back: { tab: 'practice', sel: n, y: 0, label: 'Back to your quiz', up: null } })}>Re-read {g.meta.unit || 'Chapter'} {n}</button>}{nx ? <button className="btn lnk" onClick={() => g.openChapter(nx.n)}>Skip ahead to {g.meta.unit || 'Chapter'} {nx.n}</button> : null}</>}
          </div></div>
      </motion.div>)}</AnimatePresence>
    {ch ? null : null}
  </>);
}

/* ---------- warm-up (single answer) ---------- */
type SQ = { title: string; qs: any[]; n: number; pills: React.ReactNode };
function SingleQuiz(props: SQ) {
  const { qs, n } = props; const { QP, patch } = useG(); const key = 'w' + n;
  const items = qs.map((q, i) => ({ ...q, id: key + '-' + i }));
  const ids = items.map((q) => q.id).sort().join();
  const st = QP[key]; const valid = st && st.ord.map((x: any) => x.id).sort().join() === ids;
  useEffect(() => { if (!valid) patch('QP', (o) => ({ ...o, [key]: { ord: shuffle(items).map((q) => ({ id: q.id, perm: shuffle(q.o.map((_: any, i: number) => i)), sel: null, chk: 0 })) } })); }, [valid]); // eslint-disable-line
  return valid ? <SingleBody {...props} /> : null;
}
function SingleBody({ title, qs, n, pills }: SQ) {
  const g = useG();
  const key = 'w' + n; const { QP, patch } = g;
  const items = qs.map((q, i) => ({ ...q, id: key + '-' + i }));
  const st = QP[key];
  const by: Record<string, any> = {}; items.forEach((q) => (by[q.id] = q));
  const prep = st.ord.map((rec: any) => { const q = by[rec.id]; return { rec, q: q.q, e: q.e, o: rec.perm.map((i: number) => q.o[i]), w: rec.perm.map((i: number) => (q.w ? q.w[i] : null)), c: rec.perm.indexOf(q.c) }; });
  const N = prep.length; const done = prep.filter((q: any) => q.rec.chk).length, score = prep.filter((q: any) => q.rec.chk && q.rec.sel === q.c).length;
  useEffect(() => { if (done === N) patch('S', (s) => (s[key]?.s === score && s[key]?.t === N ? s : { ...s, [key]: { s: score, t: N } })); }, [done, score]); // eslint-disable-line
  const pick = (id: string, j: number) => patch('QP', (o) => ({ ...o, [key]: { ...o[key], ord: o[key].ord.map((r: any) => (r.id === id ? { ...r, sel: j, chk: 1 } : r)) } }));
  const restart = () => patch('QP', (o) => { const x = { ...o }; delete x[key]; return x; });
  const p = Math.round((score / N) * 100);
  return (<>
    <h1 className="t-h1" style={{ fontSize: 26 }}>{title}</h1>{pills}
    <div className="sub">{N} questions · instant feedback · saved automatically · options reshuffle every new attempt</div>
    <div className="qprog" role="status" aria-live="polite"><span>Answered {done} of {N} · {score} correct</span><i><b style={{ width: `${(done / N) * 100}%` }} /></i><button className="btn ghost sm" onClick={restart}>↺ Start over</button></div>
    {prep.map((q: any, i: number) => (
      <motion.div className="qq" key={q.rec.id} {...rise(i)}>
        <div className="t"><span>{i + 1}. </span><span dangerouslySetInnerHTML={{ __html: breakAny(q.q) }} /></div>
        {q.o.map((o: string, j: number) => <button key={j} className={`opt ${q.rec.chk ? (j === q.c ? 'ok' : j === q.rec.sel ? 'bad' : '') : ''}`} disabled={!!q.rec.chk} onClick={() => pick(q.rec.id, j)} dangerouslySetInnerHTML={{ __html: o }} />)}
        <AnimatePresence>{q.rec.chk ? (
          <motion.div className="exp" role="status" {...fade}>
            {q.rec.sel === q.c ? <>✅ <b>Correct.</b> <span dangerouslySetInnerHTML={{ __html: breakAny(q.e) }} /></> : <>❌ <b>Not quite.</b>
              {q.w[q.rec.sel] ? <div className="wh"><b>Why “{q.o[q.rec.sel].replace(/<[^>]+>/g, '').slice(0, 58)}” is wrong:</b> <span dangerouslySetInnerHTML={{ __html: breakAny(q.w[q.rec.sel]) }} /></div> : null}
              <div className="wh"><b>Correct: <span dangerouslySetInnerHTML={{ __html: q.o[q.c] }} />.</b> <span dangerouslySetInnerHTML={{ __html: breakAny(q.e) }} /></div>
              <div className="row"><JumpBtn ch={n} text={q.q + ' ' + q.o[q.c] + ' ' + q.e} back={{ tab: 'practice', sel: n, y: 0, label: 'Back to your quiz', up: null }} /></div></>}
          </motion.div>) : null}</AnimatePresence>
      </motion.div>))}
    <AnimatePresence>{done === N && (
      <motion.div className="qq resultcard" {...pop} ref={(el) => { el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }}>
        <Ring p={p} /><div className="rt"><div style={{ fontWeight: 700 }}>Score: {score}/{N}</div><div className="sub">{p >= 80 ? 'Strong — move on. 🎉' : p >= 50 ? 'Decent — revisit the weak parts, then retry.' : 'Re-read the chapter and try again.'}</div>
          <div className="row"><button className="btn" onClick={restart}>Retry (reshuffled)</button><button className="btn ghost" onClick={() => g.goQuiz(n, 'hard')}>Try the exam-style quiz →</button></div></div>
      </motion.div>)}</AnimatePresence>
  </>);
}

/* ---------- type-the-answer ---------- */
const norm = (s: string, kind: string, ci: boolean) => {
  let t = String(s).replace(/\r/g, '').split('\n').map((l) => l.trim().replace(/\s+/g, ' ')).join('\n').replace(/^\n+|\n+$/g, '').replace(/\n{2,}/g, '\n');
  t = t.replace(/["'`“”‘’]/g, '');
  if (kind === 'cmd') t = t.replace(/\s*\|\s*/g, ' | ').replace(/\s*(>>?)\s*/g, ' $1 ').replace(/(\s-[A-Za-z])\s+(?=[^\s-])/g, '$1').replace(/\s+/g, ' ').trim();
  return ci ? t.toLowerCase() : t;
};
export const fillOK = (q: any, v: string) => { const k = q.kind || 'out', u = norm(v, k, q.ci); if (!u) return false; return q.a.some((a: string) => (a.startsWith('re:') ? new RegExp(a.slice(3), 'i').test(u) : norm(a, k, q.ci) === u)); };

function FillQuiz({ qs, qkey, title }: { qs: any[]; qkey: string; title: string }) {
  const g = useG(); const { QP, patch } = g;
  const r: Record<number, any> = QP[qkey]?.r || {};
  const set = (i: number, v: any) => patch('QP', (o) => ({ ...o, [qkey]: { ...o[qkey], r: { ...(o[qkey]?.r || {}), [i]: v } } }));
  const d = Object.values(r).filter((x: any) => x.done).length, c = Object.values(r).filter((x: any) => x.ok).length;
  return (<>
    <h2 className="t-h1" style={{ fontSize: 20, margin: '30px 0 6px' }}>{title}</h2>
    <div className="sub">{qs.length} questions · <b>type the answer</b> · extra spaces and quote style are ignored · saved automatically</div>
    <div className="qprog" role="status" aria-live="polite"><span>Answered {d} of {qs.length} · {c} correct</span><i><b style={{ width: `${(d / qs.length) * 100}%` }} /></i><button className="btn ghost sm" onClick={() => patch('QP', (o) => { const x = { ...o }; delete x[qkey]; return x; })}>↺ Start over</button></div>
    {qs.map((q, i) => {
      const rec = r[i] || {}; const multi = (q.kind || 'out') === 'out' && /\n/.test(q.a[0] || '');
      const shown = q.a.filter((a: string) => !a.startsWith('re:')).slice(0, 2);
      const inputProps = { id: 'fa' + i, spellCheck: false, autoCapitalize: 'off', autoComplete: 'off', 'aria-label': `Your answer to question ${i + 1}`, value: rec.v || '', style: { width: '100%', font: '14px/1.5 ui-monospace,Consolas,monospace' } as React.CSSProperties };
      return (
        <div className="exq" key={i}>
          <div className="qh"><h2 className="qn">Question {i + 1}</h2><span className="ms">TYPE THE ANSWER</span></div>
          <div className="qt" dangerouslySetInnerHTML={{ __html: breakAny(q.q) }} />
          {multi ? <textarea rows={4} {...inputProps} onChange={(e) => set(i, { ...rec, v: e.target.value })} /> : <input type="text" {...inputProps} className={rec.ok ? 'ok' : ''} onChange={(e) => set(i, { ...rec, v: e.target.value })} onKeyDown={(e) => { if (e.key === 'Enter') set(i, { v: rec.v, done: 1, ok: fillOK(q, rec.v || '') ? 1 : 0 }); }} />}
          <div className="row"><button className="btn" onClick={() => set(i, { v: rec.v, done: 1, ok: fillOK(q, rec.v || '') ? 1 : 0 })}>Check answer</button><button className="btn ghost" onClick={() => set(i, { v: rec.v, done: 1, ok: 0, shown: 1 })}>Show answer</button></div>
          <AnimatePresence>{rec.done ? (
            <motion.div className="vd" aria-live="polite" {...fade}><div className={`verdict ${rec.ok ? 'ok' : 'no'}`}><b>{rec.ok ? '✅ Correct.' : rec.shown ? 'Answer revealed.' : '❌ Not quite.'}</b> <span dangerouslySetInnerHTML={{ __html: breakAny(q.e || '') }} />
              {rec.ok ? null : <div className="why wy"><b>Accepted answer:</b> {shown.map((a: string, k: number) => <span key={k}>{k ? ' or ' : ''}<code>{a}</code></span>)}</div>}</div></motion.div>) : null}</AnimatePresence>
        </div>);
    })}
  </>);
}

function Pills({ sel }: { sel: number }) {
  const g = useG();
  const nh = (g.D.hard[sel]?.length || 0) + (g.D.fill?.[sel]?.length || 0), nw = g.D.quiz[sel]?.length || 0;
  return (
    <div className="pills" role="group" aria-label="Question style">
      <button className={g.pqMode === 'hard' ? 'on' : ''} aria-pressed={g.pqMode === 'hard'} onClick={() => g.setPqMode('hard')}>Exam-style (harder) · {nh}</button>
      {nw ? <button className={g.pqMode === 'warm' ? 'on' : ''} aria-pressed={g.pqMode === 'warm'} onClick={() => g.setPqMode('warm')}>Warm-up (easier) · {nw}</button> : null}
    </div>);
}

export default function Practice() {
  const g = useG();
  const { D, S, M, pqSel, pqMode } = g;
  const pqg = EXTRA[g.meta.id]?.pqg || D.pqg || D.groups.map((x) => [x.t, x.ns] as [string, number[]]);
  const mCount = Object.keys(M).length;
  const mxSnap = useRef<any[]>([]); const mxKey = useRef(0);
  if (pqSel === 'mx' && mxKey.current !== -1) { mxSnap.current = Object.values(M); mxKey.current = -1; }
  if (pqSel !== 'mx') mxKey.current = 0;
  const l = typeof pqSel === 'number' ? (D.lessons.find((x) => x.n === pqSel) || (D as any).qonly?.find((x: any) => x.n === pqSel)) : null;
  let pane: React.ReactNode = null;
  if (pqSel === 'sc') pane = <><h1 className="t-h1" style={{ fontSize: 26, marginBottom: 6 }}>Self-check Q&amp;A</h1><div className="sub">Think first, then open the answer.</div><div className="t-section" dangerouslySetInnerHTML={{ __html: breakAny(D.selfq || '') }} /></>;
  else if (pqSel === 'mx') pane = !mxSnap.current.length
    ? <><h1 className="t-h1" style={{ fontSize: 26 }}>Review my mistakes</h1><div className="exq"><div className="qt">🎉 No mistakes saved.</div><div className="sub">Questions you get wrong in the exam-style quizzes or the past-year questions are collected here and stay until you answer them correctly. This is spaced practice: retrieving what you missed is what moves it into long-term memory.</div></div></>
    : <MultiQuiz key={'mx' + mxSnap.current.length} title={`Review my mistakes (${mxSnap.current.length})`} qs={mxSnap.current} qkey="mx" />;
  else if (l) {
    const pills = <Pills sel={l.n} />;
    pane = (D as any).mixed ? <MixedQuiz key={'x' + l.n} n={l.n} title={`${g.meta.unit || 'Chapter'} ${l.n} — ${l.title}`} />
      : pqMode === 'warm' || !(D.hard[l.n] || []).length
      ? <SingleQuiz key={'w' + l.n} title={`${g.meta.unit || 'Chapter'} ${l.n} — ${l.title} (warm-up)`} qs={D.quiz[l.n] || []} n={l.n} pills={pills} />
      : <>
        <MultiQuiz key={'h' + l.n} title={D.lessons.some((x) => x.n === l.n) ? `${g.meta.unit || 'Chapter'} ${l.n} — ${l.title}` : l.title} qkey={String(l.n)} pills={pills} qs={(D.hard[l.n] || []).map((q: any, i: number) => ({ ...q, id: 'h' + l.n + '-' + i, ch: D.lessons.some((x) => x.n === l.n) ? l.n : undefined }))} />
        {D.fill?.[l.n]?.length ? <FillQuiz key={'f' + l.n} qkey={'f' + l.n} title="Type the answer" qs={D.fill[l.n]} /> : null}
      </>;
  }
  const item = (cls: string, key: string | number, on: boolean, onClick: () => void, children: React.ReactNode) => <button className={`pq-item ${on ? 'active' : ''}`} key={String(key)} aria-current={on ? 'true' : undefined} onClick={onClick}>{children}</button>;
  return (
    <div className="pq">
      <div className="pq-list" id="pql" tabIndex={0} aria-label={`${g.meta.unit || 'Chapter'} quizzes`}>
        <div className="pq-head">CHAPTER QUIZZES</div>
        {item('', 'mx', pqSel === 'mx', () => g.setPqSel('mx'), <><span className="tn">🔁</span><span className="tt">Review my mistakes</span>{mCount ? <span className="sc lo">{mCount}</span> : null}</>)}
        {pqg.map((grp, gi) => (<div key={gi}><div className="pq-head">{grp[0].toUpperCase()}</div>{grp[1].map((n) => { const x = (D.lessons.find((y) => y.n === n) || (D as any).qonly?.find((y: any) => y.n === n))!; const s = S[n]; return item('', n, pqSel === n, () => g.setPqSel(n), <><span className="tn">{n}</span><span className="tt">{x.title}</span>{s ? <span className={`sc ${scoreClass(s)}`}>{s.s}/{s.t}</span> : null}</>); })}</div>))}
        {D.selfq ? item('', 'sc', pqSel === 'sc', () => g.setPqSel('sc'), <><span className="tn">📝</span><span className="tt">Self-check Q&amp;A ({D.selfn || ''})</span></>) : null}
      </div>
      <div className="pane" id="pqm" tabIndex={0}>
        <AnimatePresence mode="wait" initial={false}><motion.div key={String(pqSel) + pqMode} {...slideX}>{pane}</motion.div></AnimatePresence>
      </div>
    </div>
  );
  void useState; void esc;
}
