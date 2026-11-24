import { useEffect, useMemo, useRef, useState } from 'react';
import { COL, Key, Stat, Stats, Tabs } from './kit';
import { Btn, DemoCard, Label, Msg, Row } from './ui';

/* ---------- 1. growth ---------- */
const YEAR = 31557600;
const lfact = (n: number) => { let s = 0; for (let i = 2; i <= n; i++) s += Math.log10(i); return s; };
const FUNCS: [string, (n: number) => number, string][] = [
  ['log₂ n', (n) => Math.log10(Math.log2(Math.max(2, n))), 'efficient'], ['n', (n) => Math.log10(n), 'efficient'], ['n log₂ n', (n) => Math.log10(n * Math.log2(Math.max(2, n))), 'efficient'],
  ['n²', (n) => 2 * Math.log10(n), 'efficient'], ['n³', (n) => 3 * Math.log10(n), 'efficient'], ['2ⁿ', (n) => n * Math.log10(2), 'inefficient'], ['n!', lfact, 'inefficient'],
];
const sci = (x: number) => (x < 3 ? Math.pow(10, x).toPrecision(3) : `10^${x.toFixed(0)}`);
function human(L: number): string {
  if (L < -6) return `${Math.pow(10, L + 9).toPrecision(3)} ns`; if (L < -3) return `${Math.pow(10, L + 6).toPrecision(3)} µs`; if (L < 0) return `${Math.pow(10, L + 3).toPrecision(3)} ms`;
  const t = Math.pow(10, L);
  if (t < 60) return `${t.toPrecision(3)} s`; if (t < 3600) return `${(t / 60).toPrecision(3)} min`; if (t < 86400) return `${(t / 3600).toPrecision(3)} hours`; if (t < YEAR) return `${(t / 86400).toPrecision(3)} days`;
  const y = L - Math.log10(YEAR); return y < 6 ? `${Math.pow(10, y).toPrecision(3)} years` : `10^${y.toFixed(0)} years`;
}
function Growth() {
  const [n, setN] = useState(20);
  const [fast, setFast] = useState(false);
  const age = Math.log10(4.5e9 * YEAR);
  return (
    <>
      <Msg>A computer does about 10⁹ simple steps per second. Drag n and see how long each growth rate would take. Polynomial growth is efficient; exponential and factorial are not.</Msg>
      <Row>
        <Label htmlFor="pn-n">n = <b>{n}</b></Label>
        <input id="pn-n" type="range" min={1} max={60} value={n} onChange={(e) => setN(+e.target.value)} className="min-h-11 w-56 max-w-full accent-[var(--accent)]" />
        <Btn ghost aria-pressed={fast} onClick={() => setFast(!fast)}>1000× faster computer</Btn>
      </Row>
      <div className="my-2 grid gap-1.5">
        {FUNCS.map(([lab, f, kind]) => {
          const L = f(n) - 9 - (fast ? 3 : 0);
          const w = Math.max(1, Math.min(100, ((L + 9) / (age + 9)) * 100));
          const bad = L > Math.log10(YEAR) + 2;
          return (
            <div key={lab} className="grid grid-cols-[62px_1fr] items-center gap-2 text-[13px] sm:grid-cols-[72px_1fr_150px]">
              <b className={kind === 'inefficient' ? 'text-[var(--red)]' : 'text-ink'}>{lab}</b>
              <span className="h-4 rounded bg-surface2"><i className="block h-full rounded transition-all duration-300" style={{ width: `${w}%`, background: bad ? COL.bad : kind === 'inefficient' ? COL.warn : COL.accent }} /></span>
              <span className="col-span-2 text-right tabular-nums text-muted sm:col-span-1">{human(L)}</span>
            </div>
          );
        })}
      </div>
      <Msg live>Bars use a log scale; a full bar is the age of the Earth. At n = {n}, {FUNCS[5][1](n) - 9 - (fast ? 3 : 0) > Math.log10(YEAR) ? `2ⁿ already takes ${human(FUNCS[5][1](n) - 9 - (fast ? 3 : 0))}` : `2ⁿ takes ${human(FUNCS[5][1](n) - 9 - (fast ? 3 : 0))}`}. Try the 1000× button: it only buys about 10 more items for 2ⁿ, because 2¹⁰ ≈ 1000.</Msg>
    </>
  );
}

/* ---------- 2. solve vs verify ---------- */
const PUZ = { deck: { nums: [11, 5, -3, -1, -2, 7, -4], target: 0, rate: 1 }, big: { nums: [36, 53, 98, 58, 95, 90, 50, 87, 45, 11, 94, 65], target: 211, rate: 60 } };
function SolveVerify() {
  const [pz, setPz] = useState<'deck' | 'big'>('deck');
  const P = PUZ[pz];
  const [pick, setPick] = useState<number[]>([]);
  const [checks, setChecks] = useState(0);
  const [verdict, setVerdict] = useState('');
  const [mask, setMask] = useState(0);
  const [run, setRun] = useState(false);
  const [found, setFound] = useState<number[]>([]);
  const total = 2 ** P.nums.length;
  const sumOf = (m: number) => P.nums.reduce((s, v, i) => (m & (1 << i) ? s + v : s), 0);
  const ref = useRef({ mask, found });
  ref.current = { mask, found };
  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => {
      let m = ref.current.mask; const f = [...ref.current.found];
      for (let k = 0; k < P.rate && m < total; k++) { m++; if (m < total && m > 0 && sumOf(m) === P.target) f.push(m); }
      setMask(m); setFound(f); if (m >= total - 1) setRun(false);
    }, 120);
    return () => clearInterval(t);
  }, [run, pz]); // eslint-disable-line
  const reset = (k: 'deck' | 'big') => { setPz(k); setPick([]); setChecks(0); setVerdict(''); setMask(0); setFound([]); setRun(false); };
  const names = (m: number) => P.nums.filter((_, i) => m & (1 << i)).join(' + ') || 'nothing';
  const pm = pick.reduce((m, i) => m | (1 << i), 0);
  return (
    <>
      <Msg>Checking an answer is quick. <b>Finding</b> one is the slow part. Subset sum: pick numbers that add to the target.</Msg>
      <Tabs value={pz} onChange={reset} items={[['deck', 'Lecture example (7 numbers, target 0)'], ['big', 'Bigger (12 numbers, target 211)']]} />
      <div className="my-2 flex flex-wrap gap-1.5" role="group" aria-label="Numbers to pick">
        {P.nums.map((v, i) => <Btn key={i} ghost={!pick.includes(i)} aria-pressed={pick.includes(i)} onClick={() => { setPick(pick.includes(i) ? pick.filter((x) => x !== i) : [...pick, i]); setVerdict(''); }}>{v}</Btn>)}
      </div>
      <Row>
        <Btn onClick={() => { setChecks(checks + 1); const s = sumOf(pm); setVerdict(pick.length === 0 ? 'Pick at least one number.' : s === P.target ? `✔ ${names(pm)} = ${s}. That is the target. Verified with ${pick.length - 1} additions.` : `✘ ${names(pm)} = ${s}, not ${P.target}.`); }}>Verify my pick</Btn>
        <span className="text-[13px] text-muted">Target = <b className="text-ink">{P.target}</b> · checks done: {checks}</span>
      </Row>
      <Msg live>{verdict || 'Try picking numbers yourself first.'}</Msg>
      <div className="my-2 rounded-lg border border-line bg-bg p-3">
        <div className="mb-1 text-[12px] uppercase tracking-wide text-muted">Brute-force solver: try every subset</div>
        <Row>
          <Btn aria-pressed={run} onClick={() => setRun(!run)} disabled={mask >= total - 1}>{run ? 'Pause' : 'Start brute force'}</Btn>
          <Btn ghost disabled={run || mask >= total - 1} onClick={() => { const m = mask + 1; setMask(m); if (sumOf(m) === P.target) setFound([...found, m]); }}>One subset</Btn>
          <Btn ghost onClick={() => { setMask(0); setFound([]); setRun(false); }}>Reset</Btn>
        </Row>
        <div className="my-1.5 h-2.5 rounded bg-surface2"><i className="block h-full rounded bg-accent" style={{ width: `${(mask / (total - 1)) * 100}%` }} /></div>
        <Stats><Stat k="Subsets tried" v={`${mask.toLocaleString()} / ${(total - 1).toLocaleString()}`} /><Stat k="Solutions found" v={found.length} /></Stats>
        <Msg>Now trying: {mask ? names(mask) : '–'} {mask ? `= ${sumOf(mask)}` : ''}{found.length ? <> · first solution: <b>{names(found[0])}</b></> : ''}</Msg>
      </div>
      <div className="overflow-hidden rounded-lg border border-line">
        <table className="w-full border-collapse text-left text-[12.5px]"><thead><tr className="bg-surface2 text-muted"><th className="px-2 py-1">n numbers</th><th className="px-2 py-1">subsets 2ⁿ</th><th className="px-2 py-1">brute force at 10⁹/s</th><th className="px-2 py-1">verify one pick</th></tr></thead>
          <tbody>{[12, 30, 50, 80].map((n) => <tr key={n} className={n === P.nums.length ? 'bg-accent/10' : ''}><td className="px-2 py-1">{n}</td><td className="px-2 py-1 font-mono">{sci(n * Math.log10(2))}</td><td className="px-2 py-1">{human(n * Math.log10(2) - 9)}</td><td className="px-2 py-1">~{n} additions</td></tr>)}</tbody></table>
      </div>
    </>
  );
}

/* ---------- 3. P / NP map ---------- */
type Cls = 'P' | 'NP' | 'NPC' | 'HARD';
const CLS: Record<Cls, string> = { P: 'P: quick to solve', NP: 'NP: quick to verify (not known in P or NP-complete)', NPC: 'NP-complete: the hardest in NP', HARD: 'NP-hard: not known to be in NP' };
const PROBS: [string, Cls, string][] = [
  ['Multiplication', 'P', 'School multiplication of two d-digit numbers takes about d² steps. Polynomial.'],
  ['Sorting', 'P', 'Merge sort is O(n log n). In P, and so also in NP.'],
  ['Binary search', 'P', 'O(log n) on a sorted list.'],
  ['Shortest path (UCS)', 'P', 'Uniform cost search / Dijkstra is polynomial.'],
  ['Topological sort', 'P', 'DFS-based, O(V + E).'],
  ['Prime factoring', 'NP', 'A proposed factorisation is checked with one multiplication, so it is in NP. No fast algorithm is known, yet it is not known to be NP-complete either. RSA relies on its hardness.'],
  ['Subset sum', 'NPC', 'Checking a subset is O(n). NP-complete.'],
  ['SAT', 'NPC', 'Can true/false values make a formula true? Checking an assignment is fast. The first problem proved NP-complete.'],
  ['Hamiltonian cycle', 'NPC', 'Is there a cycle visiting every vertex once? A proposed cycle is checked in O(n). NP-complete.'],
  ['TSP (tour ≤ k?)', 'NPC', 'Decision version: checking a tour just adds n distances. NP-complete.'],
  ['3-colouring', 'NPC', 'Checking that neighbours differ is fast. NP-complete.'],
  ['TSP (shortest tour)', 'HARD', 'Optimisation version. Given a tour there is no known quick way to check it is the shortest, so it is not known to be in NP. Hence heuristics in week 11.'],
  ['Graph colouring (fewest colours)', 'HARD', 'Proving that no smaller colouring exists has no known quick check: NP-hard.'],
];
function ClassMap() {
  const [placed, setPlaced] = useState<Record<number, Cls>>({});
  const [cur, setCur] = useState<number | null>(null);
  const [first, setFirst] = useState<Record<number, boolean>>({});
  const [fb, setFb] = useState('Click a problem card, guess its class, and watch it move.');
  const guess = (c: Cls) => {
    if (cur == null) return; const ok = PROBS[cur][1] === c;
    setFirst({ ...first, [cur]: ok }); setPlaced({ ...placed, [cur]: PROBS[cur][1] });
    setFb(`${ok ? '✔ Right.' : `✘ It is ${CLS[PROBS[cur][1]]}.`} ${PROBS[cur][2]}`); setCur(null);
  };
  const score = Object.values(first).filter(Boolean).length;
  return (
    <>
      <Msg>Known: <b>P ⊆ NP</b> (anything you can solve quickly you can check quickly). Open: is P = NP? NP-complete = in NP <i>and</i> NP-hard.</Msg>
      <div className="my-2 flex flex-wrap gap-1.5">
        {PROBS.map(([n], i) => !(i in placed) && <Btn key={n} ghost={cur !== i} aria-pressed={cur === i} onClick={() => setCur(i)}>{n}</Btn>)}
        {Object.keys(placed).length === PROBS.length && <span className="text-[13px] text-ok">All placed.</span>}
      </div>
      {cur != null && (
        <div className="my-2 rounded-lg border border-accent bg-accent/10 p-2.5">
          <div className="mb-1.5 text-[13px]">Which class is <b>{PROBS[cur][0]}</b>?</div>
          <div className="flex flex-wrap gap-1.5">{(Object.keys(CLS) as Cls[]).map((c) => <Btn key={c} ghost onClick={() => guess(c)}>{CLS[c].split(':')[0]}</Btn>)}</div>
        </div>
      )}
      <div className="my-2 grid gap-2 sm:grid-cols-2">
        {(['HARD', 'NPC', 'NP', 'P'] as Cls[]).map((c) => (
          <div key={c} className="rounded-lg border border-line bg-bg p-2" style={{ borderLeft: `4px solid ${c === 'P' ? COL.ok : c === 'NP' ? COL.accent : c === 'NPC' ? COL.warn : COL.bad}` }}>
            <div className="mb-1 text-[12px] font-bold text-muted">{CLS[c]}</div>
            <div className="flex min-h-7 flex-wrap gap-1">{PROBS.map(([n, k], i) => placed[i] === c && k === c && <span key={n} className="rounded border border-line bg-surface2 px-2 py-0.5 text-[12.5px]">{n}</span>)}</div>
          </div>
        ))}
      </div>
      <Stats><Stat k="Correct on the first guess" v={`${score} / ${Object.keys(first).length}`} /></Stats>
      <Row><Key c={COL.ok}>P</Key><Key c={COL.accent}>NP</Key><Key c={COL.warn}>NP-complete</Key><Key c={COL.bad}>NP-hard</Key></Row>
      <Msg live>{fb}</Msg>
    </>
  );
}

/* ---------- 4. reduction HCP -> TSP ---------- */
const NODES = ['A', 'B', 'C', 'D', 'E'].map((l, i) => { const a = ((-90 + 72 * i) * Math.PI) / 180; return { l, x: 150 + 105 * Math.cos(a), y: 125 + 105 * Math.sin(a) }; });
const GR: Record<'1' | '2', [number, number][]> = { '1': [[0, 2], [2, 4], [4, 1], [1, 3], [3, 0], [0, 1]], '2': [[0, 1], [1, 2], [2, 0], [0, 3], [3, 4], [4, 0]] };
const has = (E: [number, number][], a: number, b: number) => E.some(([u, v]) => (u === a && v === b) || (u === b && v === a));
const TOURS: number[][] = (() => { const res: number[][] = []; const perm = (a: number[], l: number) => { if (l === a.length) { if (a[0] < a[a.length - 1]) res.push([0, ...a]); return; } for (let i = l; i < a.length; i++) { [a[l], a[i]] = [a[i], a[l]]; perm(a, l + 1); [a[l], a[i]] = [a[i], a[l]]; } }; perm([1, 2, 3, 4], 0); return res; })();
const tcost = (t: number[], E: [number, number][]) => t.reduce((c, a, i) => c + (has(E, a, t[(i + 1) % t.length]) ? 1 : 2), 0);
function Reduce() {
  const [g, setG] = useState<'1' | '2'>('1');
  const [step, setStep] = useState(0);
  const E = GR[g];
  const best = useMemo(() => TOURS.reduce((b, t) => (tcost(t, E) < tcost(b, E) ? t : b), TOURS[0]), [E]);
  const bc = tcost(best, E);
  const complete = step >= 1;
  const labels = ['Problem #1: does graph G have a Hamiltonian cycle (visit every vertex exactly once and return)?', 'Translate: build a complete graph G′. Edges that exist in G cost 1, missing edges cost 2.', 'Black box: a TSP solver finds the cheapest tour of G′ (here by trying all 12).', bc === 5 ? 'Translate back: the cheapest tour costs 5 = n, so it used only edges of G. YES, G has a Hamiltonian cycle.' : `Translate back: the cheapest tour costs ${bc} > 5 = n, so every tour needs a cost-2 edge that is not in G. NO Hamiltonian cycle.`];
  const lines: React.JSX.Element[] = [];
  for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) {
    const o = has(E, a, b); if (!o && !complete) continue;
    const A = NODES[a], B = NODES[b];
    lines.push(<g key={a + '-' + b}><line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={o ? COL.accent : COL.bad} strokeWidth={o ? 2.5 : 1.3} strokeDasharray={o ? undefined : '4 3'} opacity={o ? 1 : 0.7} />{complete && <text x={(A.x + B.x) / 2} y={(A.y + B.y) / 2 + 3} textAnchor="middle" fontSize={10} fontWeight={700} fill={o ? COL.accent : COL.bad}>{o ? 1 : 2}</text>}</g>);
  }
  const tour = step >= 2 ? 'M' + best.map((i) => `${NODES[i].x},${NODES[i].y}`).join('L') + 'Z' : '';
  return (
    <>
      <Msg><b>Reduction</b> = translating one problem into another. If TSP could be solved fast, this translation would solve Hamiltonian cycle fast, so Hamiltonian cycle is no harder than TSP.</Msg>
      <Tabs value={g} onChange={(v) => { setG(v); setStep(0); }} items={[['1', 'Graph 1'], ['2', 'Graph 2']]} />
      <Row><Btn ghost disabled={step <= 0} onClick={() => setStep(step - 1)}>Previous</Btn><Btn disabled={step >= 3} onClick={() => setStep(step + 1)}>Next step</Btn><Btn ghost disabled={step === 0} onClick={() => setStep(0)}>Restart</Btn><span className="text-[12.5px] text-muted">Step {step + 1} / 4</span></Row>
      <div className="my-2 overflow-hidden rounded-lg border border-line bg-bg">
        <svg viewBox="0 0 300 250" role="img" aria-label="Reduction graph" style={{ width: '100%', maxWidth: 380, display: 'block', margin: '0 auto' }}>
          {lines}
          {tour && <path d={tour} fill="none" stroke={bc === 5 ? COL.ok : COL.warn} strokeWidth={4} strokeLinejoin="round" opacity={0.85} />}
          {NODES.map((n) => <g key={n.l}><circle cx={n.x} cy={n.y} r={15} fill={COL.s2} stroke={COL.line} strokeWidth={2} /><text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill={COL.ink}>{n.l}</text></g>)}
        </svg>
      </div>
      <Msg live>{labels[step]}</Msg>
    </>
  );
}

export default function PvsNPLab() {
  const [t, setT] = useState<'g' | 's' | 'm' | 'r'>('g');
  return (
    <DemoCard title="P vs NP lab: race growth, solve vs verify, sort problems, translate one into another">
      <Tabs value={t} onChange={setT} items={[['g', 'Fast vs slow growth'], ['s', 'Solve vs verify'], ['m', 'P / NP map'], ['r', 'Reduction']]} />
      {t === 'g' ? <Growth /> : t === 's' ? <SolveVerify /> : t === 'm' ? <ClassMap /> : <Reduce />}
    </DemoCard>
  );
}
