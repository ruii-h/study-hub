import { useMemo, useState } from 'react';
import { Arr, Pseudo, Stat, Stats, Tabs, Transport, useSteps, type Tone } from './kit';
import { Btn, DemoCard, Msg, Row } from './ui';

type Mode = 'stack' | 'queue' | 'brackets';
const WORDS = ['kiwi', 'fig', 'plum', 'pear', 'lime', 'date', 'peach', 'mango'];

function Playground({ kind }: { kind: 'stack' | 'queue' }) {
  const [a, setA] = useState<string[]>(['fig', 'plum']);
  const [next, setNext] = useState(2);
  const [moved, setMoved] = useState(0);
  const [msg, setMsg] = useState(kind === 'stack' ? 'Push and pop. Only the top (the right end) is reachable.' : 'Enqueue at the back, dequeue from the front.');
  const isS = kind === 'stack';
  const push = () => {
    if (a.length >= 8) { setMsg('Full for this demo (8 items).'); return; }
    const w = WORDS[next % WORDS.length]; setNext(next + 1); setA([...a, w]);
    setMsg(isS ? `push("${w}"): placed on top.` : `enqueue("${w}"): joins the back of the line.`);
  };
  const take = () => {
    if (!a.length) { setMsg(isS ? 'pop on an empty stack: nothing to return.' : 'dequeue on an empty queue: nothing to return.'); return; }
    if (isS) { setMsg(`pop() returns "${a[a.length - 1]}", the most recent item (last in, first out).`); setA(a.slice(0, -1)); }
    else { setMsg(`dequeue() returns "${a[0]}", the earliest item (first in, first out). With a plain list, the other ${a.length - 1} item(s) shift left.`); setMoved(moved + a.length - 1); setA(a.slice(1)); }
  };
  const peek = () => setMsg(a.length ? `peek() looks at "${isS ? a[a.length - 1] : a[0]}" without removing it.` : 'peek on an empty structure: nothing to see.');
  const tone: Record<number, Tone> = a.length ? { [isS ? a.length - 1 : 0]: 'on' } : {};
  const under: Record<number, string> = {};
  a.forEach((_, i) => (under[i] = String(i)));
  if (a.length) { if (isS) under[a.length - 1] = `${a.length - 1} · top`; else { under[0] = '0 · front'; if (a.length > 1) under[a.length - 1] = `${a.length - 1} · back`; } }
  return (
    <>
      <Row>
        <Btn onClick={push}>{isS ? 'push' : 'enqueue'}</Btn>
        <Btn onClick={take}>{isS ? 'pop' : 'dequeue'}</Btn>
        <Btn ghost onClick={peek}>peek</Btn>
        <Btn ghost onClick={() => { setA([]); setMoved(0); setMsg('Cleared.'); }}>Clear</Btn>
      </Row>
      {a.length ? <Arr a={a} tone={tone} under={under} /> : <div className="my-2.5 flex min-h-[62px] items-center rounded-lg border border-dashed border-line px-3 text-[13px] text-muted">empty</div>}
      <Stats><Stat k="Size" v={a.length} />{!isS && <Stat k="Items shifted" v={moved} />}</Stats>
      <Msg live>{msg}</Msg>
    </>
  );
}

const CODE = [
  'def balanced(s):',
  '    stack = []',
  '    for ch in s:',
  '        if ch in "([{":      push(ch)',
  '        elif ch in ")]}":',
  '            if empty or top != match(ch): return False',
  '            pop()',
  '    return stack is empty',
];
const PAIR: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
interface BSt { i: number; stack: string[]; line: number; note: string; verdict?: boolean }
function brackets(s: string): BSt[] {
  const out: BSt[] = [{ i: -1, stack: [], line: 1, note: 'Start with an empty stack. Read the text left to right.' }];
  const st: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if ('([{'.includes(c)) { st.push(c); out.push({ i, stack: [...st], line: 3, note: `“${c}” opens a group: push it.` }); }
    else if (PAIR[c]) {
      if (!st.length) { out.push({ i, stack: [], line: 5, note: `“${c}” closes a group, but the stack is empty: nothing to match. Not balanced.`, verdict: false }); return out; }
      if (st[st.length - 1] !== PAIR[c]) { out.push({ i, stack: [...st], line: 5, note: `“${c}” needs “${PAIR[c]}” on top, but the top is “${st[st.length - 1]}”. Not balanced.`, verdict: false }); return out; }
      st.pop(); out.push({ i, stack: [...st], line: 6, note: `“${c}” matches the top: pop it.` });
    } else out.push({ i, stack: [...st], line: 2, note: `“${c}” is not a bracket: skip it.` });
  }
  out.push({ i: s.length, stack: [...st], line: 7, verdict: st.length === 0, note: st.length ? `Text finished but ${st.length} opener(s) are still on the stack. Not balanced.` : 'Text finished and the stack is empty. Balanced.' });
  return out;
}
const SAMPLES = ['a{b{c}d}', 'ab{{c}d', 'a}b{cd', '([]{})'];

function Brackets() {
  const [txt, setTxt] = useState(SAMPLES[0]);
  const steps = useMemo(() => brackets(txt), [txt]);
  const s = useSteps(steps.length);
  const cur = steps[s.k];
  return (
    <>
      <Row>
        {SAMPLES.map((x) => <Btn key={x} ghost={txt !== x} aria-pressed={txt === x} onClick={() => { setTxt(x); s.reset(); }}><code>{x}</code></Btn>)}
      </Row>
      <Transport s={s} label="Character" />
      <Arr a={txt.split('')} tone={Object.fromEntries(txt.split('').map((_, i): [number, Tone] => [i, i === cur.i ? (cur.verdict === false ? 'bad' : 'on') : i < cur.i ? 'hit' : 'out']))} />
      <div className="my-2 flex min-h-[44px] items-center gap-1.5 rounded-lg border border-line bg-bg px-2">
        <span className="text-[12px] uppercase tracking-wide text-muted">stack →</span>
        {cur.stack.length ? cur.stack.map((c, i) => <b key={i} className={`rounded border px-2 py-0.5 font-mono ${i === cur.stack.length - 1 ? 'border-accent bg-accent/20' : 'border-line bg-surface2'}`}>{c}</b>) : <span className="text-[13px] text-muted">empty</span>}
      </div>
      <Pseudo lines={CODE} active={cur.line} />
      <Msg live>{cur.note}{cur.verdict != null && <b className={cur.verdict ? ' text-ok' : ' text-[var(--red)]'}> {cur.verdict ? '✔ Balanced' : '✘ Not balanced'}</b>}</Msg>
    </>
  );
}

export default function StackQueueLab() {
  const [mode, setMode] = useState<Mode>('stack');
  return (
    <DemoCard title="Stacks and queues: operate them yourself">
      <Tabs value={mode} onChange={setMode} items={[['stack', 'Stack (LIFO)'], ['queue', 'Queue (FIFO)'], ['brackets', 'Balanced brackets']]} />
      {mode === 'brackets' ? <Brackets /> : <Playground key={mode} kind={mode} />}
    </DemoCard>
  );
}
