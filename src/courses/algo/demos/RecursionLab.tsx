import { useMemo, useState } from 'react';
import { Pseudo, Stat, Stats, Tabs, Transport, useSteps } from './kit';
import { DemoCard, Label, Msg, NumberInput, Row } from './ui';

type Fn = 'fact' | 'sum' | 'fib' | 'memo';
interface Frame { label: string; state: 'wait' | 'ret'; val?: number }
interface St { stack: Frame[]; calls: number; line: number; note: string; hits: number }

const CODE: Record<Fn, string[]> = {
  fact: ['def fact(n):', '    if n == 0:', '        return 1', '    return n * fact(n - 1)'],
  sum: ['def total(n):', '    if n == 0:', '        return 0', '    return n + total(n - 1)'],
  fib: ['def fib(n):', '    if n <= 1:', '        return n', '    return fib(n - 1) + fib(n - 2)'],
  memo: ['def fib(n, memo):', '    if n in memo:', '        return memo[n]        # reuse', '    if n <= 1:', '        return n', '    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)', '    return memo[n]'],
};
const NAME: Record<Fn, string> = { fact: 'fact', sum: 'total', fib: 'fib', memo: 'fib' };
const MAXN: Record<Fn, number> = { fact: 8, sum: 8, fib: 6, memo: 8 };

function trace(fn: Fn, n0: number): St[] {
  const out: St[] = [];
  const stack: Frame[] = [];
  const memo = new Map<number, number>();
  let calls = 0, hits = 0;
  const push = (line: number, note: string) => out.push({ stack: stack.map((f) => ({ ...f })), calls, hits, line, note });
  const nm = NAME[fn];
  const go = (n: number): number => {
    calls++;
    stack.push({ label: `${nm}(${n})`, state: 'wait' });
    if (fn === 'memo' && memo.has(n)) {
      hits++;
      const v = memo.get(n)!;
      push(2, `${nm}(${n}) is already in the memo: reuse ${v}, no new calls.`);
      stack[stack.length - 1] = { ...stack[stack.length - 1], state: 'ret', val: v };
      push(2, `${nm}(${n}) returns ${v} immediately.`);
      stack.pop();
      return v;
    }
    push(fn === 'memo' ? 3 : 1, `Call ${nm}(${n}). Is it a base case?`);
    let v: number;
    if (fn === 'fact' || fn === 'sum') {
      if (n === 0) { v = fn === 'fact' ? 1 : 0; }
      else { push(3, `Not a base case: ${nm}(${n}) must wait for ${nm}(${n - 1}).`); v = fn === 'fact' ? n * go(n - 1) : n + go(n - 1); }
    } else if (n <= 1) { v = n; }
    else {
      push(fn === 'fib' ? 3 : 5, `${nm}(${n}) needs ${nm}(${n - 1}) and then ${nm}(${n - 2}).`);
      const a = go(n - 1);
      const b = go(n - 2);
      v = a + b;
      if (fn === 'memo') memo.set(n, v);
    }
    stack[stack.length - 1] = { ...stack[stack.length - 1], state: 'ret', val: v };
    const base = (fn === 'fact' || fn === 'sum') ? n === 0 : n <= 1;
    push(base ? (fn === 'memo' ? 4 : 2) : (fn === 'memo' ? 6 : 3), base ? `Base case: ${nm}(${n}) returns ${v} directly.` : `${nm}(${n}) gets its answers back and returns ${v}.`);
    stack.pop();
    return v;
  };
  const r = go(n0);
  out.push({ stack: [], calls, hits, line: 0, note: `Finished. ${nm}(${n0}) = ${r}, using ${calls} call${calls === 1 ? '' : 's'}${hits ? ` (${hits} answered from the memo)` : ''}.` });
  return out;
}

export default function RecursionLab() {
  const [fn, setFn] = useState<Fn>('fact');
  const [n, setN] = useState(4);
  const nn = Math.max(0, Math.min(MAXN[fn], Number.isFinite(n) ? n : 0));
  const steps = useMemo(() => trace(fn, nn), [fn, nn]);
  const s = useSteps(steps.length);
  const cur = steps[s.k];
  const naive = useMemo(() => (fn === 'memo' ? trace('fib', Math.min(nn, 6)).at(-1)!.calls : 0), [fn, nn]);

  return (
    <DemoCard title="Recursion lab: the call stack, one call at a time">
      <Tabs value={fn} onChange={(v) => { setFn(v); s.reset(); }} items={[['fact', 'Factorial'], ['sum', 'Sum 1…n'], ['fib', 'Fibonacci'], ['memo', 'Fibonacci + memo']]} />
      <Row>
        <Label htmlFor="rl-n">n (0 to {MAXN[fn]})</Label>
        <NumberInput id="rl-n" min={0} max={MAXN[fn]} value={Number.isNaN(n) ? '' : n} onChange={(e) => { setN(e.target.valueAsNumber); s.reset(); }} />
      </Row>
      <Transport s={s} />
      <div className="my-2 grid gap-3 md:grid-cols-2">
        <div>
          <div className="mb-1 text-[12px] uppercase tracking-wide text-muted">Call stack (top first)</div>
          <div className="flex min-h-[120px] flex-col gap-1 rounded-lg border border-line bg-bg p-2">
            {cur.stack.length === 0 && <div className="m-auto text-[13px] text-muted">empty</div>}
            {[...cur.stack].reverse().map((f, i) => (
              <div key={cur.stack.length - i} className={`flex items-center justify-between rounded-md border px-3 py-1.5 font-mono text-[13px] ${f.state === 'ret' ? 'border-ok bg-ok/20' : i === 0 ? 'border-accent bg-accent/20' : 'border-line bg-surface2'}`}>
                <b>{f.label}</b><span className="text-muted">{f.state === 'ret' ? `returns ${f.val}` : 'waiting'}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Pseudo lines={CODE[fn]} active={cur.line} />
          <Stats>
            <Stat k="Calls so far" v={cur.calls} />
            <Stat k="Depth" v={cur.stack.length} />
            {fn === 'memo' && <Stat k="Memo hits" v={cur.hits} />}
          </Stats>
        </div>
      </div>
      <Msg live>{cur.note}{fn === 'memo' && s.k === s.last ? ` Without the memo, fib(${Math.min(nn, 6)}) takes ${naive} calls.` : ''}</Msg>
    </DemoCard>
  );
}
