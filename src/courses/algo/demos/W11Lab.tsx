import { useMemo, useState } from 'react';
import { COL, Key, Tabs, Transport, useSteps } from './kit';
import { Btn, DemoCard, Msg, Row } from './ui';

/* six places, order C J N P S W (distances in km, from the exercise sheet) */
const IDS: string[] = ['C', 'J', 'N', 'P', 'S', 'W'];
const NAME: Record<string, string> = { C: 'Changi Airport', J: 'Jurong East', N: 'NUS', P: 'Punggol', S: 'SMU', W: 'Woodlands' };
const M = [[0, 28, 25, 13, 17, 24], [28, 0, 6, 19, 11, 13], [25, 6, 0, 17, 10, 16], [13, 19, 17, 0, 12, 12], [17, 11, 10, 12, 0, 17], [24, 13, 16, 12, 17, 0]];
const XY: Record<string, [number, number]> = { C: [4.36, 1.82], J: [1.58, 1.47], N: [1.96, 0.6], P: [3.36, 2.26], S: [2.78, 0.6], W: [2.08, 2.62] };
const d = (a: string, b: string) => M[IDS.indexOf(a)][IDS.indexOf(b)];
const px = (k: string): [number, number] => [(XY[k][0] - 1.58) * 95 + 40, (2.62 - XY[k][1]) * 95 + 30];
const len = (t: string[]) => t.reduce((s, v, i) => s + d(v, t[(i + 1) % t.length]), 0);
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const fmt = (n: number) => (n >= 1e15 ? n.toExponential(2).replace('e+', ' × 10^') : n.toLocaleString('en-US'));

function Map({ tour, extra = [], hot = [], cur, label, closed = true }: { tour: string[]; extra?: [string, string][]; hot?: [string, string][]; cur?: string; label: string; closed?: boolean }) {
  const edges = tour.map((v, i) => [v, tour[(i + 1) % tour.length]] as [string, string]).filter((_, i) => closed || i < tour.length - 1);
  return (
    <div className="my-2 overflow-x-auto rounded-lg border border-line bg-bg">
      <svg viewBox="0 0 330 270" role="img" aria-label={label} style={{ width: '100%', maxWidth: 440, display: 'block', margin: '0 auto' }}>
        {extra.map(([a, b], i) => <line key={'x' + i} x1={px(a)[0]} y1={px(a)[1]} x2={px(b)[0]} y2={px(b)[1]} stroke={COL.s3} strokeDasharray="4 4" strokeWidth={1.4} />)}
        {tour.length > 1 && edges.map(([a, b], i) => {
          const isH = hot.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
          const mx = (px(a)[0] + px(b)[0]) / 2, my = (px(a)[1] + px(b)[1]) / 2;
          return <g key={i}><line x1={px(a)[0]} y1={px(a)[1]} x2={px(b)[0]} y2={px(b)[1]} stroke={isH ? COL.warn : COL.ok} strokeWidth={isH ? 4 : 3} /><text x={mx} y={my - 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={COL.warn} stroke="var(--bg)" strokeWidth={3} paintOrder="stroke">{d(a, b)}</text></g>;
        })}
        {IDS.map((v) => {
          const inT = tour.includes(v), on = v === cur;
          return <g key={v}><circle cx={px(v)[0]} cy={px(v)[1]} r={16} fill={on ? COL.accent : inT ? 'rgba(63,185,80,.45)' : COL.s2} stroke={on ? COL.accent : COL.line} strokeWidth={on ? 3 : 1.6} /><text x={px(v)[0]} y={px(v)[1] + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={COL.ink}>{v}</text></g>;
        })}
      </svg>
    </div>
  );
}

const W = ({ t, children }: { t: string; children: React.ReactNode }) => <div><dt className="inline font-bold">{t}: </dt><dd className="inline text-muted">{children}</dd></div>;
const Words = ({ children }: { children: React.ReactNode }) => (
  <details className="my-2 rounded-lg border border-line bg-bg px-3 py-2" open>
    <summary className="cursor-pointer text-[13.5px] font-bold">The words in this exercise</summary>
    <dl className="mt-1.5 grid gap-1.5 text-[13px] leading-relaxed">{children}</dl>
  </details>
);
const Ask = ({ q, ask }: { q: string; ask: string }) => (
  <div className="mt-2 rounded-lg border border-line bg-surface2 px-3 py-2 text-[13.5px] leading-relaxed">
    <div className="text-muted"><b className="text-ink">The question:</b> {q}</div>
    <div className="mt-1"><b>What is it asking?</b> {ask}</div>
  </div>
);
const Hand = ({ steps }: { steps: string[] }) => (
  <details className="my-2 rounded-lg border border-line bg-bg px-3 py-2" open>
    <summary className="cursor-pointer text-[13.5px] font-bold">Do it by hand</summary>
    <ol className="mt-1.5 list-decimal pl-5 text-[13.5px] leading-relaxed">{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
  </details>
);
const H = ({ html }: { html: string }) => <span dangerouslySetInnerHTML={{ __html: html }} />;

/* ---------- Ex1: counting tours ---------- */
function Ex1() {
  const [n, setN] = useState(6);
  const rows = [10, 15, 20, 25];
  return (
    <>
      <Ask q="How many different tours exist for 6 places? Then for 10, 15, 20 and 25. Why can’t we just try them all?" ask="A tour visits every place once and comes back to the start. Different orders give different tours, so count the orders. Then notice how fast that number grows." />
      <Words>
        <W t="tour">a round trip that visits every place exactly once and ends back where it began.</W>
        <W t="n!  (n factorial)">n × (n−1) × … × 1, the number of ways to line up n things. 4! = 4×3×2×1 = 24.</W>
        <W t="symmetric">the distance from A to B equals the distance from B to A. Because of this, running a tour backwards is the same tour.</W>
        <W t="brute force">trying every possible answer and keeping the best. Simple and always right, but slow.</W>
      </Words>
      <Hand steps={['Line up all n places in order: n! lines.', 'A tour is a loop, so it does not matter which place you call the “start”. Each loop was counted n times (once per start), so divide by n. That gives (n−1)!.', 'Going round the loop backwards is the same tour in a symmetric world. Divide by 2 again: (n−1)! / 2.', 'If the distances are one-way (not symmetric), keep both directions: just (n−1)!.']} />
      <Row><label htmlFor="ex1n" className="text-[13px] text-muted">Number of places n = <b>{n}</b></label><input id="ex1n" type="range" min={3} max={9} value={n} onChange={(e) => setN(+e.target.value)} className="min-h-11 w-48 accent-[var(--accent)]" /></Row>
      <div className="my-2 grid gap-1 text-[13.5px]">
        <div>All orderings: <b>{n}! = {fmt(fact(n))}</b></div>
        <div>÷ {n} starting points → <b>{fmt(fact(n - 1))}</b></div>
        <div>÷ 2 for direction (symmetric) → <b className="text-ok">{fmt(fact(n - 1) / 2)} different tours</b></div>
        <div className="text-muted">One-way distances: <b>{fmt(fact(n - 1))}</b> tours.</div>
      </div>
      <Msg>For the six places: 5! / 2 = 120 / 2 = <b>60</b> tours (and 120 if the distances were one-way).</Msg>
      <div className="my-2 overflow-x-auto rounded-lg border border-line"><table className="w-full border-collapse text-left text-[12.5px]"><thead><tr className="bg-surface2 text-muted"><th className="px-2 py-1">n</th><th className="px-2 py-1">(n−1)!/2 tours</th><th className="px-2 py-1">at 1 billion tours per second</th></tr></thead><tbody>{rows.map((r) => { const c = fact(r - 1) / 2, s = c / 1e9; return <tr key={r}><td className="px-2 py-1 font-mono">{r}</td><td className="px-2 py-1 font-mono">{fmt(c)}</td><td className="px-2 py-1">{s < 1 ? '< 1 second' : s < 3600 * 24 * 365 ? `${fmt(Math.round(s / 3600))} hours` : `${fmt(Math.round(s / 3.15e7))} years`}</td></tr>; })}</tbody></table></div>
      <Msg>That is why we do not brute-force big instances. We settle for fast <b>heuristics</b> (good-enough rules) like the next three exercises.</Msg>
    </>
  );
}

/* ---------- Ex2: nearest neighbour ---------- */
function nnSteps(start: string) {
  const tour = [start], steps: { tour: string[]; cur: string; note: string; opts?: [string, string][] }[] = [];
  steps.push({ tour: [start], cur: start, note: `Start at <b>${start}</b> (${NAME[start]}).` });
  while (tour.length < 6) {
    const last = tour[tour.length - 1];
    const left = IDS.filter((v) => !tour.includes(v));
    const best = [...left].sort((a, b) => d(last, a) - d(last, b) || a.localeCompare(b))[0];
    const tie = left.filter((v) => d(last, v) === d(last, best));
    steps.push({ tour: [...tour, best], cur: best, opts: left.map((v) => [last, v]), note: `From <b>${last}</b>, unvisited: ${left.map((v) => `${v}=${d(last, v)}`).join(', ')}. Closest is <b>${best}</b> (${d(last, best)} km).${tie.length > 1 ? ` Tie between ${tie.join(' and ')}: alphabetical rule picks <b>${best}</b>.` : ''}` });
    tour.push(best);
  }
  steps.push({ tour: [...tour], cur: start, note: `Everything visited. Drive home <b>${tour[5]} → ${start}</b> (${d(tour[5], start)} km). Total = <b>${len(tour)} km</b>.` });
  return steps;
}
function Ex2() {
  const [st, setSt] = useState('J');
  const S = useMemo(() => nnSteps(st), [st]);
  const s = useSteps(S.length), c = S[s.k];
  const full = s.k === S.length - 1;
  const tourFull = full ? c.tour : c.tour;
  return (
    <>
      <Ask q="Build a tour with nearest neighbour starting at Jurong East (J), then again starting at SMU (S). Compare the totals and explain the difference." ask="Follow one simple rule: always go to the closest place you have not been yet. Do it twice from different starts and see that the start matters." />
      <Words>
        <W t="nearest neighbour">a greedy rule: from where you stand, hop to the closest unvisited place. Repeat.</W>
        <W t="greedy">take the best-looking choice right now without thinking ahead. Quick, but it can paint you into a corner.</W>
        <W t="tie-break">if two places are equally close, you need a rule to pick. Here: alphabetical.</W>
        <W t="heuristic">a rule of thumb that is fast and usually decent, but not guaranteed best.</W>
      </Words>
      <Hand steps={['Pick the start place and write it down.', 'Look at the distances from your current place to every unvisited place. Pick the smallest.', 'Move there and write it down. Repeat until all six are visited.', 'Add the trip back to the start. Add up all the legs for the total.', 'Do it again from the other start and compare.']} />
      <Tabs value={st} onChange={(v) => { setSt(v); s.reset(); }} items={[['J', 'Start at J'], ['S', 'Start at S']]} />
      <Transport s={s} />
      <Map tour={tourFull} closed={full} cur={c.cur} hot={c.opts ? [[c.tour[c.tour.length - 2], c.cur]] : []} extra={c.opts ?? []} label="Nearest neighbour tour" />
      <Msg live><H html={c.note} /></Msg>
      <Msg>Tour so far: <b>{c.tour.join(' → ')}</b>{full ? ` → ${st}` : ''}</Msg>
      <Msg>Results: from J gives <b>{len(nnSteps('J').at(-1)!.tour)} km</b>, from S gives <b>{len(nnSteps('S').at(-1)!.tour)} km</b>. Same rule, different answer, because the early greedy choices lock in what is left. Starting at J is the worse one: it ends with a long return leg.</Msg>
    </>
  );
}

/* ---------- Ex3: cheapest insertion ---------- */
function insertionSteps() {
  let best: [string, string] = ['C', 'P'];
  for (const a of IDS) for (const b of IDS) if (a < b && d(a, b) < d(best[0], best[1])) best = [a, b];
  const tour = [best[0], best[1]];
  const steps: { tour: string[]; cur?: string; note: string }[] = [{ tour: [...tour], note: `Start with the <b>closest pair</b>: ${tour[0]}–${tour[1]} (${d(tour[0], tour[1])} km). Treat it as a tiny loop.` }];
  const left = IDS.filter((v) => !tour.includes(v));
  while (left.length) {
    let pick: { v: string; pos: number; delta: number; opts: string } | null = null;
    for (const v of left) {
      let bp = 0, bd = Infinity;
      const opts: string[] = [];
      for (let i = 0; i < tour.length; i++) {
        const a = tour[i], b = tour[(i + 1) % tour.length];
        const dl = d(a, v) + d(v, b) - d(a, b);
        opts.push(`${a}–${v}–${b}: ${dl}`);
        if (dl < bd) { bd = dl; bp = i + 1; }
      }
      if (!pick || bd < pick.delta) pick = { v, pos: bp, delta: bd, opts: opts.join('; ') };
    }
    const p = pick!;
    tour.splice(p.pos, 0, p.v);
    left.splice(left.indexOf(p.v), 1);
    steps.push({ tour: [...tour], cur: p.v, note: `Cheapest extra cost is adding <b>${p.v}</b>, extra <b>Δ = ${p.delta}</b> km (options for ${p.v}: ${p.opts}). Insert it. Tour length now ${len(tour)} km.` });
  }
  return steps;
}
function Ex3() {
  const S = useMemo(insertionSteps, []);
  const s = useSteps(S.length), c = S[s.k];
  return (
    <>
      <Ask q="Build a tour by cheapest insertion, starting from the closest pair of places." ask="Instead of walking, you grow a small loop. Each round, find the unvisited place that adds the least extra distance when squeezed between two neighbours on the loop, and splice it in." />
      <Words>
        <W t="insertion">putting a new place between two places that are already next to each other on the tour.</W>
        <W t="Δ (delta)">“the change”. Here: extra distance from inserting v between a and b = d(a,v) + d(v,b) − d(a,b). We remove the direct leg a–b and replace it with two legs via v.</W>
        <W t="closest pair">the two places with the smallest distance of all pairs (that is the starting loop).</W>
        <W t="cheapest">the insertion with the smallest Δ, across every unvisited place and every gap.</W>
      </Words>
      <Hand steps={['Find the smallest number in the distance table. Those two places are your starting loop.', 'For each unvisited place and each gap on the loop, compute Δ = d(a,v) + d(v,b) − d(a,b).', 'Take the smallest Δ over everything. Insert that place in that gap.', 'Repeat until every place is on the loop.']} />
      <Transport s={s} />
      <Map tour={c.tour} cur={c.cur} label="Cheapest insertion tour" />
      <Msg live><H html={c.note} /></Msg>
      <Msg>Tour: <b>{c.tour.join(' → ')} → {c.tour[0]}</b> · length <b>{len(c.tour)} km</b></Msg>
    </>
  );
}

/* ---------- Ex4: 2-opt ---------- */
function twoOpt(t0: string[]) {
  const rounds: { tour: string[]; moves: { i: number; k: number; a: string; b: string; c: string; e: string; delta: number }[]; pick: number | null }[] = [];
  let t = [...t0];
  for (let r = 0; r < 8; r++) {
    const n = t.length, moves: { i: number; k: number; a: string; b: string; c: string; e: string; delta: number }[] = [];
    for (let i = 0; i < n - 1; i++) for (let k = i + 2; k < n; k++) {
      if (i === 0 && k === n - 1) continue;
      const a = t[i], b = t[i + 1], c = t[k], e = t[(k + 1) % n];
      moves.push({ i, k, a, b, c, e, delta: d(a, c) + d(b, e) - d(a, b) - d(c, e) });
    }
    let pick: number | null = null;
    moves.forEach((m, j) => { if (m.delta < 0 && (pick === null || m.delta < moves[pick].delta)) pick = j; });
    rounds.push({ tour: [...t], moves, pick });
    if (pick === null) break;
    const m = moves[pick];
    t = [...t.slice(0, m.i + 1), ...t.slice(m.i + 1, m.k + 1).reverse(), ...t.slice(m.k + 1)];
  }
  return rounds;
}
function Ex4() {
  const R = useMemo(() => twoOpt(['J', 'N', 'S', 'P', 'W', 'C']), []);
  const [r, setR] = useState(0);
  const rd = R[Math.min(r, R.length - 1)];
  const pk = rd.pick !== null ? rd.moves[rd.pick] : null;
  return (
    <>
      <Ask q="Start from the tour J → N → S → P → W → C → J (the nearest-neighbour tour from J). Improve it with 2-opt: show each improving move and its Δ, until no move helps." ask="Look for two legs of the tour that cross or detour. Remove them, reconnect the pieces the other way round, and keep the change if the tour gets shorter." />
      <Words>
        <W t="2-opt move">pick two legs a–b and c–e on the tour. Delete both and reconnect as a–c and b–e. In practice this means reversing the stretch b … c. The tour stays one loop.</W>
        <W t="Δ (delta)">new legs minus old legs = d(a,c) + d(b,e) − d(a,b) − d(c,e). Negative Δ = the tour got shorter, so the move helps.</W>
        <W t="best improvement">in each round, check all possible moves and take the one with the most negative Δ.</W>
        <W t="local optimum">a tour where no single 2-opt move helps. It may still not be the very best tour overall.</W>
      </Words>
      <Hand steps={['Write the tour as a loop and number the legs.', 'For every pair of legs that do not touch, compute Δ with the formula. (6 places gives 9 pairs.)', 'If every Δ is 0 or positive, stop: you are at a local optimum.', 'Otherwise apply the most negative one: reverse the section between the two legs. Compute the new length and repeat.']} />
      <Tabs value={String(Math.min(r, R.length - 1))} onChange={(v) => setR(+v)} items={R.map((_, i) => [String(i), i === R.length - 1 ? 'Final' : `Round ${i + 1}`] as [string, string])} />
      <Map tour={rd.tour} hot={pk ? [[pk.a, pk.b], [pk.c, pk.e]] : []} label="Tour before this round" />
      <Msg>Tour at start of {r === R.length - 1 ? 'the last check' : `round ${r + 1}`}: <b>{rd.tour.join(' → ')} → {rd.tour[0]}</b> · <b>{len(rd.tour)} km</b></Msg>
      <div className="my-2 overflow-x-auto rounded-lg border border-line"><table className="w-full border-collapse text-left text-[12.5px]"><thead><tr className="bg-surface2 text-muted"><th className="px-2 py-1">legs removed</th><th className="px-2 py-1">legs added</th><th className="px-2 py-1">Δ</th></tr></thead><tbody>{rd.moves.map((m, j) => <tr key={j} className={j === rd.pick ? 'bg-ok/15 font-semibold' : ''}><td className="px-2 py-1 font-mono">{m.a}–{m.b}, {m.c}–{m.e}</td><td className="px-2 py-1 font-mono">{m.a}–{m.c}, {m.b}–{m.e}</td><td className="px-2 py-1 font-mono">{d(m.a, m.c)}+{d(m.b, m.e)}−{d(m.a, m.b)}−{d(m.c, m.e)} = {m.delta}</td></tr>)}</tbody></table></div>
      <Msg live>{pk ? <>Best move: remove {pk.a}–{pk.b} and {pk.c}–{pk.e}, add {pk.a}–{pk.c} and {pk.b}–{pk.e}: <b>Δ = {pk.delta}</b>, so the tour drops from {len(rd.tour)} to <b>{len(rd.tour) + pk.delta} km</b>. Highlighted legs are the ones removed.</> : <>No Δ is negative, so no 2-opt move helps: this is a <b>local optimum</b> at <b>{len(rd.tour)} km</b>. Brute force over all 60 tours confirms nothing shorter exists, so here the local optimum is also the best.</>}</Msg>
    </>
  );
}

/* ---------- Ex5: greedy coins ---------- */
function Ex5() {
  const COINS = [9, 6, 5, 1];
  const [amt, setAmt] = useState(12);
  const g: number[] = []; let rem = amt;
  for (const c of COINS) while (rem >= c) { g.push(c); rem -= c; }
  const best = useMemo(() => { const dp: number[][] = [[]]; for (let a = 1; a <= amt; a++) { let b: number[] | null = null; for (const c of COINS) if (a >= c && (!b || dp[a - c].length + 1 < b.length)) b = [...dp[a - c], c]; dp[a] = b!; } return dp[amt]; }, [amt]);
  return (
    <>
      <Ask q="With coins 1, 5, 6, 9, make 11, 12 and 15 using the greedy rule. Does greedy always give the fewest coins? Then compare the trade-offs of the algorithms in this chapter." ask="Greedy for coins = always grab the biggest coin that still fits. Check by comparison whether that matches the true fewest-coin answer. It is the same “locally best choice” idea as nearest neighbour." />
      <Words>
        <W t="greedy">at every step take the biggest/closest/best-looking option available now, and never undo it.</W>
        <W t="optimal">truly the best possible answer (here: the fewest coins).</W>
        <W t="counter-example">one case that shows a rule is not always right. Amount 12 is the counter-example for greedy.</W>
        <W t="trade-off">gaining something costs something else: fast heuristics are not guaranteed best, exact methods are slow.</W>
      </Words>
      <Row>{[11, 12, 15].map((a) => <Btn key={a} ghost={amt !== a} aria-pressed={amt === a} onClick={() => setAmt(a)}>Make {a}</Btn>)}</Row>
      <Msg><b>Greedy</b> for {amt}: {g.join(' + ')} = {g.length} coin{g.length > 1 ? 's' : ''}. <b>True minimum</b>: {best.join(' + ')} = {best.length} coin{best.length > 1 ? 's' : ''}. {g.length === best.length ? <span className="text-ok">Greedy is optimal here.</span> : <span className="text-[var(--red)]">Greedy is worse here, so it is not always optimal.</span>}</Msg>
      <Hand steps={['Take the largest coin that is not more than what you still need.', 'Repeat with the remainder until it is 0.', 'Now think: could a different mix use fewer coins? For 12, 6 + 6 uses 2 coins but greedy grabs 9 and then needs 1 + 1 + 1.']} />
      <div className="my-2 overflow-x-auto rounded-lg border border-line"><table className="w-full border-collapse text-left text-[12.5px]"><thead><tr className="bg-surface2 text-muted"><th className="px-2 py-1">Method</th><th className="px-2 py-1">Speed</th><th className="px-2 py-1">Answer quality</th><th className="px-2 py-1">Use when</th></tr></thead><tbody>
        <tr><td className="px-2 py-1 font-semibold">Brute force</td><td className="px-2 py-1">(n−1)!/2 tours: hopeless past ~15 places</td><td className="px-2 py-1">always the best</td><td className="px-2 py-1">tiny inputs</td></tr>
        <tr><td className="px-2 py-1 font-semibold">Nearest neighbour</td><td className="px-2 py-1">very fast, about n²</td><td className="px-2 py-1">decent, depends on start</td><td className="px-2 py-1">quick first answer</td></tr>
        <tr><td className="px-2 py-1 font-semibold">Cheapest insertion</td><td className="px-2 py-1">fast, about n²–n³</td><td className="px-2 py-1">usually better than NN</td><td className="px-2 py-1">better start tour</td></tr>
        <tr><td className="px-2 py-1 font-semibold">2-opt</td><td className="px-2 py-1">repeated passes, still polynomial</td><td className="px-2 py-1">improves any tour; no guarantee</td><td className="px-2 py-1">polish a heuristic tour</td></tr>
      </tbody></table></div>
    </>
  );
}

export default function W11Lab() {
  const [tab, setTab] = useState<'1' | '2' | '3' | '4' | '5'>('1');
  return (
    <DemoCard title="W11 in-class exercises, explained from scratch">
      <Msg>The story: you must visit <b>six places</b> and come home, using as little distance as possible. This is the Travelling Salesman Problem (TSP). Distances (km) are in the table; read it as “row place to column place”.</Msg>
      <div className="my-2 overflow-x-auto rounded-lg border border-line"><table className="w-full border-collapse text-center text-[12.5px]"><thead><tr className="bg-surface2 text-muted"><th className="px-2 py-1" />{IDS.map((v) => <th key={v} className="px-2 py-1" title={NAME[v]}>{v}</th>)}</tr></thead><tbody>{IDS.map((a) => <tr key={a}><th className="bg-surface2 px-2 py-1 text-muted" title={NAME[a]}>{a}</th>{IDS.map((b) => <td key={b} className={`px-2 py-1 font-mono ${a === b ? 'text-muted' : ''}`}>{d(a, b)}</td>)}</tr>)}</tbody></table></div>
      <div className="text-[12px] text-muted">{IDS.map((v) => `${v} = ${NAME[v]}`).join(' · ')}</div>
      <Tabs value={tab} onChange={setTab} items={[['1', 'Ex1 Count'], ['2', 'Ex2 Nearest'], ['3', 'Ex3 Insertion'], ['4', 'Ex4 2-opt'], ['5', 'Ex5 Greedy']]} />
      {tab === '1' && <Ex1 />}{tab === '2' && <Ex2 />}{tab === '3' && <Ex3 />}{tab === '4' && <Ex4 />}{tab === '5' && <Ex5 />}
    </DemoCard>
  );
}
