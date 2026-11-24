import { useMemo, useState } from 'react';
import { Arr, Pseudo, Stat, Stats, Tabs, Transport, useSteps, type Tone } from './kit';
import { Btn, DemoCard, Label, Msg, NumberInput, Row } from './ui';
import { QueuePipe, Returned, StackTower, type Item } from './viz';

type Mode = 'stack' | 'queue' | 'pq' | 'brackets';
const WORDS = ['kiwi', 'fig', 'plum', 'pear', 'lime', 'date', 'peach', 'mango'];
let uid = 100;

function Playground({ kind }: { kind: 'stack' | 'queue' | 'pq' }) {
  const [a, setA] = useState<Item[]>(kind === 'pq' ? [{ id: 1, label: 'fig', sub: 'p4' }, { id: 2, label: 'plum', sub: 'p2' }] : [{ id: 1, label: 'fig' }, { id: 2, label: 'plum' }]);
  const [next, setNext] = useState(3);
  const [moved, setMoved] = useState(0);
  const [ret, setRet] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const [pri, setPri] = useState(3);
  const [msg, setMsg] = useState(kind === 'stack' ? 'Push and pop. Only the top is reachable: the last plate you put on is the first one you can take off.' : kind === 'queue' ? 'Enqueue at the back, dequeue from the front: like a canteen line.' : 'Each item has a priority number: LOWER = MORE URGENT. dequeue always serves the lowest number, whatever order they arrived in.');
  const isS = kind === 'stack', isP = kind === 'pq';
  const best = (x: Item[]) => x.reduce((m, it, i) => (parseInt((it.sub ?? 'p0').slice(1)) < parseInt((x[m].sub ?? 'p0').slice(1)) ? i : m), 0);
  const push = () => {
    if (a.length >= 8) { setMsg('Full for this demo (8 items).'); return; }
    const w = WORDS[next % WORDS.length]; setNext(next + 1);
    const it: Item = { id: uid++, label: w, sub: isP ? 'p' + pri : undefined };
    setA([...a, it]);
    setMsg(isS ? 'push("' + w + '"): the new plate lands ON TOP. Nothing underneath moves.' : isP ? 'enqueue("' + w + '", priority ' + pri + '): it joins the collection. Its position does not matter; only its number does.' : 'enqueue("' + w + '"): joins the BACK of the line.');
  };
  const take = () => {
    if (!a.length) { setMsg(isS ? 'pop on an empty stack: nothing to return (an error in real code).' : 'dequeue on an empty structure: nothing to return.'); return; }
    let i = isS ? a.length - 1 : isP ? best(a) : 0;
    const it = a[i];
    setRet(it.label + (it.sub ? ' (' + it.sub + ')' : '')); setTick(tick + 1);
    if (isS) setMsg('pop() returns "' + it.label + '": the most recent item. LIFO = last in, first out.');
    else if (isP) setMsg('dequeue() returns "' + it.label + '" because ' + it.sub + ' is the lowest number in the collection' + (i !== 0 ? ' (even though ' + a[0].label + ' arrived first).' : '.'));
    else { setMsg('dequeue() returns "' + it.label + '": the earliest item. FIFO = first in, first out. In a plain list the other ' + (a.length - 1) + ' item(s) must shift left.'); setMoved(moved + a.length - 1); }
    setA(a.filter((_, k) => k !== i));
  };
  const peek = () => setMsg(a.length ? 'peek() looks at "' + a[isS ? a.length - 1 : isP ? best(a) : 0].label + '" without removing it.' : 'peek on an empty structure: nothing to see.');
  const shown = isP ? [...a].sort((x, y) => parseInt(x.sub!.slice(1)) - parseInt(y.sub!.slice(1))) : a;
  const hot = isP && a.length ? shown[0].id : null;
  const marked = isP ? shown.map((it) => ({ ...it, tone: it.id === hot ? undefined : undefined })) : a;
  return (
    <>
      <Row>
        <Btn onClick={push}>{isS ? 'push' : 'enqueue'}</Btn>
        {isP && <><Label htmlFor="pq-p">priority</Label><NumberInput id="pq-p" min={1} max={9} value={pri} onChange={(e) => setPri(Math.max(1, Math.min(9, e.target.valueAsNumber || 1)))} /></>}
        <Btn onClick={take}>{isS ? 'pop' : 'dequeue'}</Btn>
        <Btn ghost onClick={peek}>peek</Btn>
        <Btn ghost onClick={() => { setA([]); setMoved(0); setRet(null); setMsg('Cleared.'); }}>Clear</Btn>
      </Row>
      <div className="my-3 rounded-lg border border-line bg-surface2/40 p-3">
        {isS ? <StackTower items={a} /> : <QueuePipe items={isP ? marked : a} priority={isP} label={isP ? 'priority queue (sorted so you can see who is next)' : 'queue'} />}
      </div>
      <Returned v={ret} tick={tick} note={isS ? 'came off the top' : isP ? 'was the most urgent' : 'was at the front'} />
      <Stats><Stat k="Size" v={a.length} />{kind === 'queue' && <Stat k="Items shifted" v={moved} />}</Stats>
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
      <div className="my-2 rounded-lg border border-line bg-surface2/40 p-3"><StackTower compact min={3} label="stack" items={cur.stack.map((c, i) => ({ id: i + c, label: c }))} /></div>
      <Pseudo lines={CODE} active={cur.line} />
      <Msg live>{cur.note}{cur.verdict != null && <b className={cur.verdict ? ' text-ok' : ' text-[var(--red)]'}> {cur.verdict ? '✔ Balanced' : '✘ Not balanced'}</b>}</Msg>
    </>
  );
}

export default function StackQueueLab() {
  const [mode, setMode] = useState<Mode>('stack');
  return (
    <DemoCard title="Stacks and queues: operate them yourself">
      <Tabs value={mode} onChange={setMode} items={[['stack', 'Stack (LIFO)'], ['queue', 'Queue (FIFO)'], ['pq', 'Priority queue'], ['brackets', 'Balanced brackets']]} />
      {mode === 'brackets' ? <Brackets /> : <Playground key={mode} kind={mode} />}
    </DemoCard>
  );
}
