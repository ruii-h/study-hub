import { useMemo, useState } from 'react';
import { Stat, Stats, Tabs } from './kit';
import { Btn, DemoCard, Label, Msg, Row } from './ui';

const fact = (n: number) => { let r = 1n; for (let i = 2n; i <= BigInt(n); i++) r *= i; return r; };
const P = (n: number, r: number) => fact(n) / fact(n - r);
const C = (n: number, r: number) => P(n, r) / fact(r);
const Slider = ({ id, label, v, set, min, max }: { id: string; label: string; v: number; set: (n: number) => void; min: number; max: number }) => (
  <Row><Label htmlFor={id}>{label}: <b>{v}</b></Label><input id={id} type="range" min={min} max={max} value={v} onChange={(e) => set(+e.target.value)} className="min-h-11 w-56 max-w-full accent-[var(--accent)]" /></Row>
);
const Chip = ({ children, on }: { children: React.ReactNode; on?: boolean }) => (
  <span className={`inline-block rounded-md border px-2 py-0.5 font-mono text-[12.5px] ${on ? 'border-accent bg-accent/20' : 'border-line bg-surface2'}`}>{children}</span>
);

function Stages() {
  const [st, setSt] = useState([3, 2, 2]);
  const names = ['shirts', 'trousers', 'shoes'];
  const total = st.reduce((a, b) => a * b, 1);
  const combos = useMemo(() => {
    const out: string[] = [];
    const go = (i: number, cur: string) => { if (out.length >= 24) return; if (i === st.length) { out.push(cur); return; } for (let k = 1; k <= st[i]; k++) go(i + 1, cur + names[i][0].toUpperCase() + k + ' '); };
    go(0, ''); return out;
  }, [st]);
  return (
    <>
      <Msg>You get dressed in stages and <b>every stage is needed</b>. Change how many choices each stage has: the stages <b>multiply</b>. If instead you pick <i>one of several separate cases</i>, the counts <b>add</b> (the sum rule).</Msg>
      {names.map((n, i) => <Slider key={n} id={'st' + i} label={`${n} (choices)`} v={st[i]} min={1} max={5} set={(v) => setSt(st.map((x, j) => (j === i ? v : x)))} />)}
      <Stats><Stat k="Product rule" v={st.join(' × ') + ' = ' + total} /><Stat k="Sum rule if only ONE item" v={st.join(' + ') + ' = ' + st.reduce((a, b) => a + b, 0)} /></Stats>
      <div className="my-2 flex flex-wrap gap-1.5">{combos.map((c, i) => <Chip key={i}>{c}</Chip>)}{total > combos.length && <span className="text-[12.5px] text-muted">… and {total - combos.length} more</span>}</div>
    </>
  );
}

function Arrange() {
  const [n, setN] = useState(5);
  const [r, setR] = useState(3);
  const rr = Math.min(r, n);
  const [order, setOrder] = useState(true);
  const [rep, setRep] = useState(false);
  const count = rep ? (order ? BigInt(n) ** BigInt(rr) : C(n + rr - 1, rr)) : order ? P(n, rr) : C(n, rr);
  const items = 'ABCDEFGHIJ'.slice(0, Math.min(n, 6));
  const list = useMemo(() => {
    const out: string[] = [];
    const go = (cur: number[], start: number) => {
      if (out.length >= 30) return;
      if (cur.length === Math.min(rr, 3)) { out.push(cur.map((i) => items[i]).join('')); return; }
      for (let i = order ? 0 : start; i < items.length; i++) { if (!rep && cur.includes(i)) continue; go([...cur, i], rep && !order ? i : i + 1); }
    };
    if (rr <= 3) go([], 0);
    return out;
  }, [n, rr, order, rep, items]);
  const formula = rep ? (order ? `n^r = ${n}^${rr}` : `C(n+r−1, r) = C(${n + rr - 1}, ${rr})`) : order ? `n!/(n−r)! = ${n}!/${n - rr}!` : `n!/(r!(n−r)!) = ${n}!/(${rr}!·${n - rr}!)`;
  return (
    <>
      <Slider id="ar-n" label="n things to choose from" v={n} min={2} max={10} set={setN} />
      <Slider id="ar-r" label="r picked" v={rr} min={1} max={Math.min(n, 8)} set={setR} />
      <Row><Btn ghost={!order} aria-pressed={order} onClick={() => setOrder(true)}>Order matters</Btn><Btn ghost={order} aria-pressed={!order} onClick={() => setOrder(false)}>Order does not matter</Btn><Btn ghost={!rep} aria-pressed={rep} onClick={() => setRep(!rep)}>Repeats allowed</Btn></Row>
      <Stats><Stat k="Count" v={count.toLocaleString()} /><Stat k="Formula" v={<span className="text-[13px]">{formula}</span>} /></Stats>
      {rr <= 3 ? <div className="my-2 flex flex-wrap gap-1.5">{list.map((c, i) => <Chip key={i}>{c}</Chip>)}{BigInt(list.length) < count && <span className="text-[12.5px] text-muted">showing the first {list.length}, using the first {Math.min(n, 6)} things</span>}</div> : <Msg>Pick r ≤ 3 to see the actual list.</Msg>}
      <Msg live>{order ? 'ABC and CBA count as different when order matters.' : 'ABC, ACB, BAC … are the same group when order does not matter: divide by the r! ways to reorder a group.'}</Msg>
    </>
  );
}

function Pigeon() {
  const [m, setM] = useState(4);
  const [k, setK] = useState(5);
  const guaranteed = Math.floor((k - 1) / m) + 1;
  const holes = Array.from({ length: m }, (_, i) => Array.from({ length: Math.floor(k / m) + (i < k % m ? 1 : 0) }));
  const mx = Math.max(...holes.map((h) => h.length));
  return (
    <>
      <Msg>Put <b>k</b> items into <b>m</b> boxes as evenly as you can. Whatever you do, some box must hold at least ⌈k/m⌉. To <b>guarantee</b> a box with at least t items, you need <b>m(t−1)+1</b> items.</Msg>
      <Slider id="pg-m" label="boxes m (e.g. suits)" v={m} min={2} max={8} set={setM} />
      <Slider id="pg-k" label="items k (e.g. cards drawn)" v={k} min={1} max={30} set={setK} />
      <div className="my-2 flex flex-wrap gap-2">
        {holes.map((h, i) => (
          <div key={i} className={`flex min-h-[64px] min-w-[52px] flex-wrap content-end gap-1 rounded-lg border p-1.5 ${h.length === mx && mx > 1 ? 'border-ok bg-ok/15' : 'border-line bg-surface2'}`}>
            {h.map((_, j) => <i key={j} className="inline-block h-3.5 w-3.5 rounded-full bg-accent" />)}
          </div>
        ))}
      </div>
      <Stats><Stat k="Some box has at least" v={guaranteed} /><Stat k="Items needed to force 3 in one box" v={m * 2 + 1} /></Stats>
    </>
  );
}

export default function CountingLab() {
  const [t, setT] = useState<'stages' | 'arrange' | 'pigeon'>('stages');
  return (
    <DemoCard title="Counting lab: feel the rules before using the formulas">
      <Tabs value={t} onChange={setT} items={[['stages', 'Product and sum rules'], ['arrange', 'Arrangements and groups'], ['pigeon', 'Pigeonhole']]} />
      {t === 'stages' ? <Stages /> : t === 'arrange' ? <Arrange /> : <Pigeon />}
    </DemoCard>
  );
}
