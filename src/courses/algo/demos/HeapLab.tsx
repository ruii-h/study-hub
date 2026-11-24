import { useMemo, useState } from 'react';
import { Arr, Key, Pseudo, Stat, Stats, Transport, useSteps, COL, type Tone } from './kit';
import { Btn, DemoCard, Label, Msg, NumberInput, Row } from './ui';

interface St { a: number[]; hi: number[]; done: number[]; line: number; note: string }
type Op = 'up' | 'down' | 'build';
const UP = ['def up_heap(a, j):', '    while j > 0:', '        p = (j - 1) // 2', '        if a[j] >= a[p]: break', '        a[j], a[p] = a[p], a[j]   # swap up', '        j = p'];
const DOWN = ['def down_heap(a, j, n):', '    while 2*j + 1 < n:', '        c = smaller of a[2j+1], a[2j+2]', '        if a[j] <= a[c]: break', '        a[j], a[c] = a[c], a[j]   # swap down', '        j = c'];
const BUILD = ['for j in range(n//2 - 1, -1, -1):', '    down_heap(a, j, n)       # last parent first'];

function upSteps(a0: number[], v: number): St[] {
  const a = [...a0, v]; let j = a.length - 1;
  const out: St[] = [{ a: [...a], hi: [j], done: [], line: 0, note: `Add ${v} at the end (index ${j}): the shape stays complete. Now fix the order by moving it up.` }];
  while (j > 0) {
    const p = Math.floor((j - 1) / 2);
    if (a[j] >= a[p]) { out.push({ a: [...a], hi: [j, p], done: [j], line: 3, note: `Parent index (${j}−1)//2 = ${p} holds ${a[p]} ≤ ${a[j]}. Order is fine: stop.` }); return out; }
    out.push({ a: [...a], hi: [j, p], done: [], line: 3, note: `Parent index (${j}−1)//2 = ${p} holds ${a[p]}, which is bigger than ${a[j]}. Swap them.` });
    [a[j], a[p]] = [a[p], a[j]]; j = p;
    out.push({ a: [...a], hi: [j], done: [], line: 4, note: `Swapped. ${a[j]} is now at index ${j}.` });
  }
  out.push({ a: [...a], hi: [0], done: [0], line: 1, note: 'It reached the root: it is the new minimum. Stop.' });
  return out;
}

function downSteps(a0: number[], j0 = 0, n0?: number, pre?: St[]): St[] {
  const a = [...a0]; const n = n0 ?? a.length; let j = j0; const out: St[] = pre ?? [];
  while (2 * j + 1 < n) {
    const l = 2 * j + 1, r = l + 1; const c = r < n && a[r] < a[l] ? r : l;
    out.push({ a: [...a], hi: [j, c], done: [], line: 2, note: `Children of ${j}: 2j+1 = ${l}${r < n ? ` and 2j+2 = ${r}` : ' (no 2j+2)'}. The smaller child is a[${c}] = ${a[c]}.` });
    if (a[j] <= a[c]) { out.push({ a: [...a], hi: [j, c], done: [j], line: 3, note: `${a[j]} ≤ ${a[c]}: both rules hold. Stop.` }); return out; }
    [a[j], a[c]] = [a[c], a[j]];
    out.push({ a: [...a], hi: [c], done: [], line: 4, note: `${a[j]} < ${a[c]}, so swap parent and child. Keep going from index ${c}.` });
    j = c;
  }
  out.push({ a: [...a], hi: [j], done: [j], line: 1, note: `Index ${j} has no children (2j+1 = ${2 * j + 1} ≥ n = ${n}). Stop.` });
  return out;
}

function removeMin(a0: number[]): St[] {
  const a = [...a0]; const min = a[0]; const last = a.pop()!;
  const out: St[] = [{ a: a0, hi: [0], done: [], line: 0, note: `The minimum is always the root: ${min}.` }];
  if (!a.length) { out.push({ a: [], hi: [], done: [], line: 0, note: `Removed ${min}. The heap is empty.` }); return out; }
  a[0] = last;
  out.push({ a: [...a], hi: [0], done: [], line: 0, note: `Move the last item (${last}) to the root, so the shape stays complete. The order may now be wrong, so push it down.` });
  const st = downSteps(a, 0, a.length, []);
  out.push(...st);
  return out;
}

function buildSteps(a0: number[]): St[] {
  const a = [...a0]; const n = a.length;
  const out: St[] = [{ a: [...a], hi: [], done: [], line: 0, note: 'A random array is already a complete tree. Heapify from the last parent up to the root.' }];
  for (let j = Math.floor(n / 2) - 1; j >= 0; j--) {
    out.push({ a: [...a], hi: [j], done: [], line: 1, note: `Down-heap index ${j} (indices ≥ ${Math.floor(n / 2)} are leaves and already trivially heaps).` });
    let jj = j;
    while (2 * jj + 1 < n) {
      const l = 2 * jj + 1, r = l + 1; const c = r < n && a[r] < a[l] ? r : l;
      if (a[jj] <= a[c]) break;
      [a[jj], a[c]] = [a[c], a[jj]];
      out.push({ a: [...a], hi: [jj, c], done: [], line: 1, note: `Swap ${a[c]} down past ${a[jj]} (indices ${jj} and ${c}).` });
      jj = c;
    }
  }
  out.push({ a: [...a], hi: [], done: a.map((_, i) => i), line: 0, note: 'Every parent ≤ its children: a valid heap.' });
  return out;
}

/** Gives every value an identity that survives swaps, so nodes can slide to their new place instead of jumping. */
function computeIds(arrs: number[][]): number[][] {
  let next = 1000; const out: number[][] = [];
  let prevA: number[] = [], prevI: number[] = [];
  arrs.forEach((a, k) => {
    if (k === 0) { prevI = a.map(() => next++); out.push(prevI); prevA = a; return; }
    const used = new Set<number>(); const ids: (number | null)[] = a.map((v, i) => (i < prevA.length && prevA[i] === v ? (used.add(prevI[i]), prevI[i]) : null));
    const ids2 = ids.map((x, i) => {
      if (x != null) return x;
      const c = prevI.map((id, j) => ({ id, j })).filter((o) => !used.has(o.id) && prevA[o.j] === a[i]).sort((p, q) => Math.abs(p.j - i) - Math.abs(q.j - i))[0];
      if (c) { used.add(c.id); return c.id; }
      return next++;
    });
    prevI = ids2; prevA = a; out.push(ids2);
  });
  return out;
}
const START = [3, 8, 5, 12, 9, 7, 6];
const isHeap = (a: number[]) => a.every((v, i) => i === 0 || a[Math.floor((i - 1) / 2)] <= v);

export default function HeapLab() {
  const [base, setBase] = useState<number[]>(START);
  const [plan, setPlan] = useState<St[] | null>(null);
  const [op, setOp] = useState<Op>('up');
  const [val, setVal] = useState(2);
  const [sel, setSel] = useState<number | null>(null);
  const s = useSteps(plan ? plan.length : 1);
  const view = plan ? plan[s.k] : { a: base, hi: [], done: [], line: -1, note: 'Insert a value, remove the minimum, or heapify a scrambled array. Click any cell or node to see its parent and children.' };
  const commit = () => (plan ? plan[plan.length - 1].a : base);
  const start = (o: Op, p: St[]) => { setOp(o); setPlan(p); s.reset(); setSel(null); };
  const fin = () => { if (plan) { setBase(commit()); setPlan(null); s.reset(); } };
  const a = view.a; const n = a.length;
  const idList = useMemo(() => computeIds(plan ? plan.map((p) => p.a) : [base]), [plan, base]);
  const ids = idList[plan ? s.k : 0] ?? [];

  const lvl = (i: number) => Math.floor(Math.log2(i + 1));
  const H = Math.max(1, n ? lvl(n - 1) + 1 : 1);
  const pos = (i: number): [number, number] => { const L = lvl(i), k = i - (2 ** L - 1); return [((k + 0.5) / 2 ** L) * 420, 24 + L * 52]; };
  const tone: Record<number, Tone> = {};
  view.done.forEach((i) => (tone[i] = 'hit')); view.hi.forEach((i) => (tone[i] = 'warn'));
  if (sel != null) { tone[sel] = 'on'; [(sel - 1) >> 1, 2 * sel + 1, 2 * sel + 2].forEach((x, k) => { if (x < n && x >= 0 && (k > 0 || sel > 0)) tone[x] = 'run'; }); }
  const under: Record<number, string> = {}; a.forEach((_, i) => (under[i] = String(i)));

  return (
    <DemoCard title="Heap lab: a tree stored in a list, kept in order by swaps">
      <Row>
        <Label htmlFor="hp-v">Value</Label>
        <NumberInput id="hp-v" value={Number.isNaN(val) ? '' : val} onChange={(e) => setVal(e.target.valueAsNumber)} />
        <Btn disabled={!Number.isFinite(val) || n >= 14} onClick={() => { const b = commit(); setBase(b); start('up', upSteps(b, val)); }}>Insert</Btn>
        <Btn disabled={n === 0} onClick={() => { const b = commit(); setBase(b); start('down', removeMin(b)); }}>Remove min</Btn>
        <Btn ghost onClick={() => { const r = Array.from({ length: 9 }, () => 1 + Math.floor(Math.random() * 30)); setBase(r); start('build', buildSteps(r)); }}>Heapify a random array</Btn>
        <Btn ghost onClick={() => { setBase(START); setPlan(null); s.reset(); setSel(null); }}>Reset</Btn>
      </Row>
      {plan && <Row><Transport s={s} /><Btn ghost onClick={fin}>Skip to the end</Btn></Row>}
      <div className="my-2 overflow-x-auto rounded-lg border border-line bg-bg">
        <svg viewBox={`0 0 420 ${H * 52 + 8}`} role="img" aria-label="Heap as a tree" style={{ width: '100%', maxWidth: 520, display: 'block', margin: '0 auto' }}>
          {a.map((_, i) => { if (!i) return null; const [x1, y1] = pos((i - 1) >> 1), [x2, y2] = pos(i); const isH = view.hi.length === 2 && view.hi.includes(i) && view.hi.includes((i - 1) >> 1); return <line key={'e' + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={isH ? COL.warn : COL.s3} strokeWidth={isH ? 4 : 2} />; })}
          {a.map((v, i) => { const [x, y] = pos(i); const t = tone[i]; const f = t === 'hit' ? COL.ok : t === 'warn' ? COL.warn : t === 'on' ? COL.accent : t === 'run' ? COL.purple : COL.s2;
            return <g key={ids[i] ?? i} className="vz-move" style={{ transform: `translate(${x}px, ${y}px)`, cursor: 'pointer' }} onClick={() => setSel(sel === i ? null : i)}><circle r={18} fill={f} fillOpacity={t ? 0.6 : 1} stroke={t ? f : COL.line} strokeWidth={2} /><text y={5} textAnchor="middle" fontSize={14} fontWeight={700} fill={COL.ink}>{v}</text><text x={16} y={-15} fontSize={10} fill={COL.muted}>{i}</text></g>; })}
        </svg>
      </div>
      <div className="my-2 overflow-x-auto rounded-lg border border-line bg-bg px-2 py-2" aria-label="The same heap stored as a list">
        <div className="relative" style={{ height: 66, width: Math.max(n, 1) * 50 + 4, minWidth: 300 }}>
          {Array.from({ length: Math.max(n, 6) }, (_, i) => <div key={'s' + i} className="absolute top-0 flex h-[42px] w-[46px] items-center justify-center rounded-md border border-dashed border-line/60" style={{ left: i * 50 }}><span className="absolute -bottom-[18px] text-[11px] text-muted">{i}</span></div>)}
          {a.map((v, i) => { const t = tone[i]; const f = t === 'hit' ? 'border-ok bg-ok/30' : t === 'warn' ? 'border-[var(--yellow)] bg-[var(--yellow)]/35' : t === 'on' ? 'border-accent bg-accent/30' : t === 'run' ? 'border-[var(--purple)] bg-[var(--purple)]/30' : 'border-line bg-surface2';
            return <button key={ids[i] ?? i} onClick={() => setSel(sel === i ? null : i)} aria-label={`index ${i} value ${v}`} className={`vz-move absolute top-0 flex h-[42px] w-[46px] items-center justify-center rounded-md border-2 font-mono text-[14px] font-bold text-ink ${f}`} style={{ transform: `translateX(${i * 50}px)` }}>{v}</button>; })}
        </div>
      </div>
      {sel != null && <Msg>Index <b>{sel}</b> (value {a[sel]}): {sel > 0 ? <>parent = ⌊({sel}−1)/2⌋ = <b>{(sel - 1) >> 1}</b>; </> : 'it is the root; '}children = 2·{sel}+1 = <b>{2 * sel + 1}</b>{2 * sel + 1 >= n ? ' (none)' : ''} and 2·{sel}+2 = <b>{2 * sel + 2}</b>{2 * sel + 2 >= n ? ' (none)' : ''}.</Msg>}
      <Stats><Stat k="Size" v={n} /><Stat k="Height" v={n ? lvl(n - 1) + 1 : 0} /><Stat k="Heap order ok" v={isHeap(a) ? 'yes' : 'no'} /></Stats>
      <Row><Key c={COL.warn}>being compared / swapped</Key><Key c={COL.ok}>settled</Key><Key c={COL.accent}>selected</Key><Key c={COL.purple}>its parent and children</Key></Row>
      {plan && <Pseudo lines={op === 'up' ? UP : op === 'down' ? DOWN : BUILD} active={view.line} />}
      <Msg live>{view.note}</Msg>
    </DemoCard>
  );
}
