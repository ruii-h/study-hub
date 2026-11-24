import { useState } from 'react';
import { Pseudo, Stat, Stats, Tabs } from './kit';
import { DemoCard, Label, Msg, Row } from './ui';

type K = 'one' | 'two' | 'nest' | 'tri' | 'half';
const FN: Record<K, { name: string; code: string[]; steps: (n: number) => number; big: string; why: string }> = {
  one: { name: 'One loop', code: ['for i in range(n):', '    work()          # 1 step'], steps: (n) => n, big: 'O(n)', why: 'The body runs once per item. Double n and the steps double.' },
  two: { name: 'Two loops in a row', code: ['for i in range(n): work()', 'for j in range(n): work()'], steps: (n) => 2 * n, big: 'O(n)', why: 'Steps add: n + n = 2n. The constant 2 is dropped, so still O(n).' },
  nest: { name: 'Nested loops', code: ['for i in range(n):', '    for j in range(n):', '        work()'], steps: (n) => n * n, big: 'O(n²)', why: 'Loops inside loops multiply: n × n. Double n and the steps quadruple.' },
  tri: { name: 'Triangle loop', code: ['for i in range(n):', '    for j in range(i):', '        work()'], steps: (n) => (n * (n - 1)) / 2, big: 'O(n²)', why: '0 + 1 + 2 + … + (n−1) = n(n−1)/2. Only half of n², but the same growth, so O(n²).' },
  half: { name: 'Halving loop', code: ['while n > 1:', '    n = n // 2', '    work()'], steps: (n) => Math.floor(Math.log2(Math.max(1, n))), big: 'O(log n)', why: 'n can be halved only about log₂ n times. Doubling n adds just one extra step.' },
};

export default function ComplexityLab() {
  const [k, setK] = useState<K>('nest');
  const [n, setN] = useState(8);
  const f = FN[k];
  const sizes = [4, 8, 16, 32, 64];
  const maxS = Math.max(...sizes.map((s) => f.steps(s)));
  return (
    <DemoCard title="Complexity lab: count the steps, then watch what doubling n does">
      <Tabs value={k} onChange={setK} items={(Object.keys(FN) as K[]).map((x) => [x, FN[x].name] as [K, string])} />
      <Pseudo lines={f.code} />
      <Row><Label htmlFor="cx-n">n = <b>{n}</b></Label><input id="cx-n" type="range" min={1} max={64} value={n} onChange={(e) => setN(+e.target.value)} className="min-h-11 w-56 max-w-full accent-[var(--accent)]" /></Row>
      <Stats><Stat k="Steps at this n" v={f.steps(n)} /><Stat k="Big-O" v={f.big} /></Stats>
      <div className="my-2 grid gap-1.5">
        {sizes.map((s, i) => (
          <div key={s} className="grid grid-cols-[52px_1fr_80px] items-center gap-2 text-[13px]">
            <span className="text-muted">n = {s}</span>
            <span className="h-4 rounded bg-surface2"><i className="block h-full rounded bg-accent transition-all duration-300" style={{ width: `${Math.max(2, (f.steps(s) / maxS) * 100)}%` }} /></span>
            <b className="tabular-nums">{f.steps(s)}{i > 0 && f.steps(sizes[i - 1]) > 0 ? <span className="ml-1 text-[11.5px] font-normal text-muted">{k === 'half' ? `+${f.steps(s) - f.steps(sizes[i - 1])}` : `×${(f.steps(s) / f.steps(sizes[i - 1])).toFixed(1)}`}</span> : null}</b>
          </div>
        ))}
      </div>
      <Msg live>Each row doubles n. The tag shows how the step count changed (× a factor, or + a fixed amount for log n). {f.why}</Msg>
    </DemoCard>
  );
}
