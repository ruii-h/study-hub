import { useState } from 'react';
import { Stat, Stats, Tabs } from './kit';
import { DemoCard, Label, Msg, Row } from './ui';

const fact = (n: number) => { let r = 1n; for (let i = 2n; i <= BigInt(n); i++) r *= i; return r; };
const fmtT = (s: number) => {
  if (s < 1e-3) return `${(s * 1e6).toPrecision(3)} µs`; if (s < 1) return `${(s * 1e3).toPrecision(3)} ms`; if (s < 60) return `${s.toPrecision(3)} s`;
  const u: [number, string][] = [[60, 'min'], [3600, 'hours'], [86400, 'days'], [31557600, 'years']];
  let v = s, name = 's'; for (const [d, nm] of u) if (s >= d) { v = s / d; name = nm; }
  return `${v >= 1e6 ? v.toExponential(2) : v.toPrecision(3)} ${name}`;
};
const fmtN = (b: bigint) => { const t = b.toString(); return t.length > 12 ? `${t[0]}.${t.slice(1, 3)}×10^${t.length - 1}` : Number(b).toLocaleString(); };

export default function BruteForceLab() {
  const [n, setN] = useState(6);
  const [kind, setKind] = useState<'sym' | 'asym' | 'path'>('sym');
  const cnt = kind === 'sym' ? (n < 3 ? 1n : fact(n - 1) / 2n) : kind === 'asym' ? fact(n - 1) : fact(n) / 2n;
  const secs = Number(cnt) / 1e9;
  return (
    <DemoCard title="How big does brute-force TSP get?">
      <Tabs value={kind} onChange={setKind} items={[['sym', 'Round trip, symmetric'], ['asym', 'Round trip, asymmetric'], ['path', 'Open path, symmetric']]} />
      <Row>
        <Label htmlFor="bf-n">Places: <b>{n}</b></Label>
        <input id="bf-n" type="range" min={3} max={25} value={n} onChange={(e) => setN(+e.target.value)} className="min-h-11 w-60 max-w-full accent-[var(--accent)]" />
      </Row>
      <Stats><Stat k="Distinct tours" v={fmtN(cnt)} /><Stat k="Time at 10⁹ tours/s" v={fmtT(secs)} /></Stats>
      <Msg live>
        {kind === 'sym' ? <>(n−1)!/2: fix the start city (÷ n) and ignore direction (÷ 2). </> : kind === 'asym' ? <>(n−1)!: fixing the start removes the n rotations, but direction now matters. </> : <>n!/2: there is no return leg and no start to fix, so every ordering is a path, but a path and its reverse are the same. </>}
        Each extra place multiplies the count by about n, which is why exhaustive search stops being possible long before 25 places.
      </Msg>
    </DemoCard>
  );
}
