import { useMemo, useState } from 'react';
import { COL, Key, Pseudo, Stat, Stats, Tabs, Transport, useSteps } from './kit';
import { Btn, DemoCard, Label, Msg, Row, Select } from './ui';

type Algo = 'nn' | 'ins' | 'opt' | 'cmp';
type Imp = 'first' | 'best';
interface Pt { x: number; y: number }
interface St { tour: number[]; closed: boolean; add?: [number, number][]; rem?: [number, number][]; line: number; note: string }

function rng(seed: number) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const mkPts = (n: number, seed: number): Pt[] => { const r = rng(seed); return Array.from({ length: n }, () => ({ x: 24 + r() * 352, y: 20 + r() * 220 })); };
const D = (p: Pt[], a: number, b: number) => Math.hypot(p[a].x - p[b].x, p[a].y - p[b].y);
const len = (p: Pt[], t: number[], closed = true) => t.reduce((s, v, i) => (i + 1 < t.length ? s + D(p, v, t[i + 1]) : closed && t.length > 1 ? s + D(p, v, t[0]) : s), 0);

function nnSteps(p: Pt[], start: number): St[] {
  const left = new Set(p.map((_, i) => i)); left.delete(start);
  const t = [start]; const out: St[] = [{ tour: [...t], closed: false, line: 0, note: `Start at city ${start}.` }];
  while (left.size) {
    const u = t[t.length - 1]; let b = -1, bd = Infinity;
    for (const v of left) { const d = D(p, u, v); if (d < bd) { bd = d; b = v; } }
    left.delete(b); t.push(b);
    out.push({ tour: [...t], closed: false, add: [[u, b]], line: 3, note: `Nearest unvisited city to ${u} is ${b} (distance ${bd.toFixed(0)}). Go there.` });
  }
  out.push({ tour: [...t], closed: true, add: [[t[t.length - 1], t[0]]], line: 4, note: `No cities left: return to the start. Tour length ${len(p, t).toFixed(0)}. The last leg is forced, and may be long.` });
  return out;
}

function insSteps(p: Pt[], start: number): St[] {
  const n = p.length; let near = -1, nd = Infinity;
  for (let i = 0; i < n; i++) if (i !== start && D(p, start, i) < nd) { nd = D(p, start, i); near = i; }
  let t = [start, near];
  const left = new Set(p.map((_, i) => i)); left.delete(start); left.delete(near);
  const out: St[] = [{ tour: [...t], closed: true, line: 0, note: `Start with a tiny tour: city ${start} and its nearest neighbour ${near}.` }];
  while (left.size) {
    let bc = -1, bi = -1, bd = Infinity;
    for (const c of left) for (let i = 0; i < t.length; i++) {
      const a = t[i], b = t[(i + 1) % t.length];
      const d = D(p, a, c) + D(p, c, b) - D(p, a, b);
      if (d < bd) { bd = d; bc = c; bi = i; }
    }
    const a = t[bi], b = t[(bi + 1) % t.length];
    t = [...t.slice(0, bi + 1), bc, ...t.slice(bi + 1)];
    left.delete(bc);
    out.push({ tour: [...t], closed: true, add: [[a, bc], [bc, b]], rem: [[a, b]], line: 3, note: `Cheapest insertion over every city and every edge: put ${bc} between ${a} and ${b}. It adds only ${bd.toFixed(0)} to the length.` });
  }
  out.push({ tour: [...t], closed: true, line: 4, note: `All cities inserted. Tour length ${len(p, t).toFixed(0)}.` });
  return out;
}

function optSteps(p: Pt[], init: number[], imp: Imp): St[] {
  let t = [...init]; const n = t.length;
  const out: St[] = [{ tour: [...t], closed: true, line: 0, note: `Starting tour, length ${len(p, t).toFixed(0)}. Look for two edges that can be uncrossed.` }];
  for (let guard = 0; guard < 80; guard++) {
    let best = -1e-9, bi = -1, bj = -1;
    outer: for (let i = 0; i < n - 1; i++) for (let j = i + 2; j < n; j++) {
      if (i === 0 && j === n - 1) continue;
      const a = t[i], b = t[i + 1], c = t[j], d = t[(j + 1) % n];
      const delta = D(p, a, c) + D(p, b, d) - D(p, a, b) - D(p, c, d);
      if (delta < best) { best = delta; bi = i; bj = j; if (imp === 'first') break outer; }
    }
    if (bi < 0) break;
    const a = t[bi], b = t[bi + 1], c = t[bj], d = t[(bj + 1) % n];
    t = [...t.slice(0, bi + 1), ...t.slice(bi + 1, bj + 1).reverse(), ...t.slice(bj + 1)];
    out.push({ tour: [...t], closed: true, rem: [[a, b], [c, d]], add: [[a, c], [b, d]], line: 3, note: `Replace edges ${a}–${b} and ${c}–${d} by ${a}–${c} and ${b}–${d} (reverse the part in between). Saves ${(-best).toFixed(0)}; length now ${len(p, t).toFixed(0)}.` });
  }
  out.push({ tour: [...t], closed: true, line: 5, note: `No pair of edges can be swapped to shorten the tour: a local optimum, length ${len(p, t).toFixed(0)}. It need not be the global optimum.` });
  return out;
}

const CODE: Record<Exclude<Algo, 'cmp'>, string[]> = {
  nn: ['tour = [start]', 'while unvisited:', '    u = tour[-1]', '    v = nearest unvisited to u', '    tour.append(v)       # then return to start'],
  ins: ['tour = [start, nearest(start)]', 'while unvisited:', '    for each city c and each tour edge (a, b):', '        extra = d(a,c) + d(c,b) - d(a,b)', '    insert the pair with the smallest extra'],
  opt: ['improved = True', 'while improved:', '    for each pair of edges (a,b), (c,d):', '        if d(a,c) + d(b,d) < d(a,b) + d(c,d):', '            reverse the part between them', '    # stop when no swap helps'],
};

export default function TspLab() {
  const [n, setN] = useState(14);
  const [seed, setSeed] = useState(9);
  const [algo, setAlgo] = useState<Algo>('nn');
  const [imp, setImp] = useState<Imp>('first');
  const [from, setFrom] = useState<'nn' | 'random'>('random');
  const pts = useMemo(() => mkPts(n, seed), [n, seed]);
  const rand = useMemo(() => { const r = rng(seed + 99); const a = pts.map((_, i) => i); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }, [pts, seed]);
  const nnT = useMemo(() => nnSteps(pts, 0).at(-1)!.tour, [pts]);
  const steps = useMemo(() => algo === 'nn' ? nnSteps(pts, 0) : algo === 'ins' ? insSteps(pts, 0) : algo === 'opt' ? optSteps(pts, from === 'nn' ? nnT : rand, imp) : [], [algo, pts, imp, from, rand, nnT]);
  const cmp = useMemo(() => {
    const r = rng(seed + 5); let rb = Infinity;
    for (let k = 0; k < 2000; k++) { const a = pts.map((_, i) => i); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } rb = Math.min(rb, len(pts, a)); }
    const f = (st: St[]) => len(pts, st.at(-1)!.tour);
    return [
      ['Random order', len(pts, rand)], ['Best of 2000 random orders', rb], ['Nearest neighbour', f(nnSteps(pts, 0))], ['Cheapest insertion', f(insSteps(pts, 0))],
      ['2-opt from random', f(optSteps(pts, rand, 'best'))], ['2-opt from nearest neighbour', f(optSteps(pts, nnT, 'best'))],
    ] as [string, number][];
  }, [pts, rand, nnT, seed]);
  const s = useSteps(Math.max(1, steps.length));
  const cur = steps[s.k] ?? steps[0];
  const reset = () => s.reset();
  const mx = Math.max(...cmp.map((c) => c[1])), mn = Math.min(...cmp.map((c) => c[1]));
  const path = (t: number[], closed: boolean) => t.map((v, i) => `${i ? 'L' : 'M'}${pts[v].x} ${pts[v].y}`).join('') + (closed ? 'Z' : '');

  return (
    <DemoCard title="TSP heuristics: greedy tours and 2-opt improvement">
      <Tabs value={algo} onChange={(v) => { setAlgo(v); reset(); }} items={[['nn', '1st greedy: nearest neighbour'], ['ins', '2nd greedy: cheapest insertion'], ['opt', '2-opt'], ['cmp', 'Compare all']]} />
      <Row>
        <Label htmlFor="tsp-n">Cities</Label>
        <Select id="tsp-n" value={n} onChange={(e) => { setN(+e.target.value); reset(); }}>{[8, 10, 12, 14, 18, 24].map((v) => <option key={v} value={v}>{v}</option>)}</Select>
        <Btn ghost onClick={() => { setSeed(seed + 1); reset(); }}>New random cities</Btn>
        {algo === 'opt' && <>
          <Select aria-label="Start from" value={from} onChange={(e) => { setFrom(e.target.value as 'nn' | 'random'); reset(); }}><option value="random">Start: random tour</option><option value="nn">Start: nearest neighbour tour</option></Select>
          <Select aria-label="Improvement rule" value={imp} onChange={(e) => { setImp(e.target.value as Imp); reset(); }}><option value="first">First improvement</option><option value="best">Best improvement</option></Select>
        </>}
      </Row>
      {algo !== 'cmp' && <Transport s={s} />}
      <div className="my-2 overflow-hidden rounded-lg border border-line bg-bg">
        <svg viewBox="0 0 400 260" role="img" aria-label="Cities and tour" style={{ width: '100%', maxWidth: 640, display: 'block', margin: '0 auto' }}>
          {algo === 'cmp' ? <path d={path(rand, true)} fill="none" stroke={COL.s3} strokeWidth={1.2} /> : <path d={path(cur.tour, cur.closed)} fill="none" stroke={COL.accent} strokeWidth={2} strokeLinejoin="round" />}
          {algo !== 'cmp' && cur.rem?.map(([a, b], i) => <line key={'r' + i} x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} stroke={COL.bad} strokeWidth={2} strokeDasharray="5 4" />)}
          {algo !== 'cmp' && cur.add?.map(([a, b], i) => <line key={'a' + i} x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} stroke={COL.ok} strokeWidth={3.5} />)}
          {pts.map((q, i) => <g key={i}><circle cx={q.x} cy={q.y} r={i === 0 ? 7 : 5} fill={i === 0 ? COL.warn : COL.s2} stroke={COL.ink} strokeWidth={1.4} /><text x={q.x + 8} y={q.y - 6} fontSize={10} fill={COL.muted}>{i}</text></g>)}
        </svg>
      </div>
      {algo !== 'cmp' ? (<>
        <Row><Key c={COL.accent}>current tour</Key><Key c={COL.ok}>edge just added</Key><Key c={COL.bad}>edge just removed</Key><Key c={COL.warn}>start (city 0)</Key></Row>
        <Stats><Stat k="Tour length" v={len(pts, cur.tour, cur.closed).toFixed(0)} /><Stat k="Cities in tour" v={`${cur.tour.length} / ${n}`} /></Stats>
        <Pseudo lines={CODE[algo]} active={cur.line} />
        <Msg live>{cur.note}</Msg>
      </>) : (<>
        <div className="my-2 flex flex-col gap-1.5">
          {cmp.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[minmax(110px,190px)_1fr_auto] items-center gap-2 text-[13px]">
              <span className="text-muted">{k}</span>
              <span className="h-3.5 rounded bg-surface2"><i className="block h-full rounded" style={{ width: `${(v / mx) * 100}%`, background: v === mn ? COL.ok : COL.accent }} /></span>
              <b className="tabular-nums">{v.toFixed(0)}</b>
            </div>
          ))}
        </div>
        <Msg live>Shorter is better. The grey outline is the random tour. 2-opt polishes any starting tour, and starting from a good greedy tour usually ends better. Even then, none of these is guaranteed to be the true optimum.</Msg>
      </>)}
    </DemoCard>
  );
}
