import { useState } from 'react';
import { useG } from './state';
import { breakAny } from './paragraphs';
import { Options } from './Choice';

/* eslint-disable @typescript-eslint/no-explicit-any */
const L5 = 'ABCDE';
const sorted = (s: string) => s.split('').filter(Boolean).sort().join('');

/** A full multiple-select mock: answer everything, submit once, then review right/wrong per option. */
export default function MockExam({ qs }: { qs: any[] }) {
  const g = useG();
  const m = g.ST.cmock || {};
  const sel: Record<string, string> = m.sel || {};
  const sub = !!m.sub;
  const hist: { s: number; t: number }[] = m.hist || [];
  const [onlyWrong, setOnlyWrong] = useState(false);
  const set = (fn: (c: any) => any) => g.patch('ST', (o) => ({ ...o, cmock: fn(o.cmock || {}) }));
  const toggle = (n: string, v: string) => set((c) => {
    const cur = (c.sel?.[n] || '').split('').filter(Boolean);
    const nx = cur.includes(v) ? cur.filter((x: string) => x !== v) : [...cur, v];
    return { ...c, sel: { ...c.sel, [n]: nx.sort().join('') } };
  });
  const ok = (q: any) => sorted(sel[q.n] || '') === sorted(q.a);
  const answered = qs.filter((q) => (sel[q.n] || '').length).length;
  const score = qs.filter(ok).length;
  const submit = () => set((c) => ({ ...c, sub: 1, hist: [...(c.hist || []), { s: qs.filter((q) => sorted((c.sel || {})[q.n] || '') === sorted(q.a)).length, t: qs.length }].slice(-8) }));
  const retake = () => { setOnlyWrong(false); set((c) => ({ hist: c.hist || [] })); document.getElementById('cmock')?.scrollIntoView({ block: 'start' }); };
  const jump = (n: string) => document.getElementById('cm' + n)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  const shown = sub && onlyWrong ? qs.filter((q) => !ok(q)) : qs;

  return (
    <div id="cmock" className="cmock">
      <div className="warnbox"><b>Mock mode.</b> {qs.length} multiple-select questions in the style of the real exam. Each question has five options and <b>one to four</b> can be correct; you only score a question by choosing <b>exactly</b> the right set. Nothing is revealed until you submit.</div>
      <div className="cm-nav" role="group" aria-label="Question navigator">
        {qs.map((q, i) => {
          const a = (sel[q.n] || '').length > 0;
          const cls = sub ? (ok(q) ? 'right' : 'wrong') : a ? 'done' : '';
          return <button key={q.n} className={cls} onClick={() => jump(q.n)} aria-label={`Question ${i + 1}${sub ? (ok(q) ? ', correct' : ', wrong') : a ? ', answered' : ', unanswered'}`}>{i + 1}</button>;
        })}
      </div>
      {sub && (
        <div className="cm-res" role="status">
          <div className="cm-big">{score} / {qs.length}</div>
          <div><b>{Math.round((score / qs.length) * 100)}%</b> of questions fully correct. {qs.length - score ? `Review the ${qs.length - score} you missed below: each option shows what the key says and why.` : 'Perfect set.'}
            {hist.length > 1 ? <div className="cm-hist">Previous attempts: {hist.slice(0, -1).map((h, i) => <span key={i}>{h.s}/{h.t}</span>)}</div> : null}</div>
          <div className="row">
            <button className="btn" onClick={retake}>↺ Retake the mock</button>
            <button className={`btn ghost ${onlyWrong ? 'on' : ''}`} onClick={() => setOnlyWrong((v) => !v)}>{onlyWrong ? 'Show all questions' : 'Show only the ones I got wrong'}</button>
          </div>
        </div>)}
      {shown.map((q) => {
        const label = q.no, ans = q.a.split(''), mine = sel[q.n] || '', right = ok(q);
        return (
          <div className="exq" id={'cm' + q.n} key={q.n}>
            <div className="qh"><h2 className="qn">Question {label}</h2><span className="ms">SELECT ALL THAT APPLY</span>{sub && <span className={`cm-badge ${right ? 'ok' : 'no'}`}>{right ? '✓ correct' : mine ? '✗ wrong' : '✗ not answered'}</span>}</div>
            <div className="qt" dangerouslySetInnerHTML={{ __html: breakAny(q.q) }} />
            <Options o={q.o} a={ans.map((l: string) => L5.indexOf(l))} sel={mine.split('').map((l: string) => L5.indexOf(l))} w={q.w} mode={sub ? 'checked' : 'open'} label={`Options for question ${label}`} onChange={(j) => toggle(q.n, L5[j])} head={(isA, isS) => (isA ? (isS ? '✓ You ticked it, and it is correct' : '✓ Correct option you did not tick') : (isS ? '✗ You ticked it, but it is wrong' : '✓ Rightly left blank'))} />
            {sub && <div className={`verdict ${right ? 'ok' : 'no'}`}><b>{right ? '✅ Correct.' : '❌ Not quite.'}</b> Key: <b>{ans.join(', ')}</b>{mine ? <> · you chose <b>{mine.split('').join(', ')}</b></> : null}.{q.e ? <> <span dangerouslySetInnerHTML={{ __html: breakAny(q.e) }} /></> : null}
              <div className="row"><button className="btn ghost" onClick={() => g.openChapter(q.ch)}>📖 Revise chapter {q.ch}</button></div></div>}
          </div>);
      })}
      {!sub && (
        <div className="endrow"><div className="endmsg">{answered} of {qs.length} answered. {answered < qs.length ? 'Unanswered questions score zero.' : 'Ready when you are.'}</div>
          <button className="btn go" disabled={!answered} onClick={submit}>Submit and check my answers →</button></div>)}
    </div>
  );
}
