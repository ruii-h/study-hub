import { useId, useMemo, useState } from 'react';
import { COL, Key, Tabs, Transport, useSteps } from './kit';
import { Btn, DemoCard, Msg, Row } from './ui';
import { allTopo, ek, GRAPHS, QUESTIONS, runSpec, verts, type Box, type Mark, type XGraph, type XQuestion } from './exerciseEngine';

/* ---------- plain-English help for every phrase the exercises use ---------- */
const HELP: Record<string, [string, string]> = {
  stack: ['stack', 'A pile where you can only touch the top. push = put something on top, pop = take the top one off. The last thing in is the first thing out (“LIFO”), like a pile of plates.'],
  queue: ['queue', 'A line of people. enqueue = join the back (the tail), dequeue = the person at the front (the head) leaves. First in, first out (“FIFO”).'],
  'push alphabetical': ['push alphabetical', 'When you visit a vertex, push its neighbours onto the stack in A → Z order. The last one pushed ends up on top, so it is popped first. That means the alphabetically LAST neighbour gets explored first. Surprising but true.'],
  'push reverse alphabetical': ['push reverse alphabetical', 'Push the neighbours in Z → A order. The alphabetically FIRST neighbour ends up on top, so it is popped first.'],
  'visit on pop': ['visit on pop', 'A vertex only counts as “visited” at the moment you pop it, not when you push it. So the same vertex can be in the stack twice. If you pop a vertex that is already visited, discard that copy and carry on.'],
  'enqueue alphabetical': ['enqueue alphabetical', 'Add a vertex’s neighbours to the back of the queue in A → Z order, so the alphabetically first one will be served first.'],
  'enqueue reverse alphabetical': ['enqueue reverse alphabetical', 'Add the neighbours in Z → A order, so the alphabetically last one is served first within that group.'],
  'visit on enqueue': ['visit on enqueue', 'In BFS you mark a vertex visited the moment you put it in the queue (not when it leaves). That stops a vertex being queued twice.'],
  'DFS finish stack': ['DFS finish stack', 'Run DFS. When a vertex has finished exploring everything it points to, put it on a second stack (the finish stack). When the whole thing is done, pop that stack from the top: that is the topological order.'],
  'outer loop from A': ['outer loop from A', 'Go through the vertices in alphabetical order (A, B, C…). Each time you meet one that is not visited yet, start a brand-new DFS from it. This makes sure vertices not reachable from A still get placed.'],
  'push alphabetical ': ['', ''],
  'ignore weights': ['ignore weights', 'The numbers on the edges are costs. DFS, BFS and topological sort do not care about them, so just pretend they are not there.'],
  'priority queue': ['priority queue', 'A waiting line where the cheapest entry always goes first, whatever order it arrived in. (Like hospital triage.)'],
  'node(cost, previous)': ['node(cost, previous)', 'Each entry reads like B(2, A): “vertex B, total cost 2 so far, reached from A”. “Previous” lets you rebuild the route at the end by walking backwards.'],
  'update only if strictly lower': ['update only if strictly lower', 'If a vertex is already waiting in the queue and you find a cheaper way to it, replace its cost and previous. If the new way costs the same or more, leave it alone.'],
  'stop when target dequeued': ['stop when target dequeued', 'You may not stop when the target is first put in the queue, because a cheaper route might still turn up. Stop when it is taken out: by then nothing cheaper can remain.'],
  'watch for cycles': ['watch for cycles', 'A cycle is a loop of arrows (A → B → C → A). A task cannot come before itself, so a graph with a cycle has no topological order.'],
  'forced positions': ['forced positions', 'Some vertices have only one possible place in any valid order, for example the one with no incoming arrows must be first. Find these first.'],
  'independent blocks': ['independent blocks', 'Groups of positions that can be arranged without affecting each other. Count the ways for each block, then multiply.'],
  'construct a DAG for each count': ['construct a DAG', 'Draw a graph with arrows (and no loops) so it has exactly the requested number of valid orders.'],
};
const GENERIC: [string, string][] = [
  ['vertex / node', 'A dot in the graph (here a letter or number).'],
  ['edge / arrow', 'A line between two vertices. An arrow A → B means “you can go from A to B”, not the other way.'],
  ['neighbour / out-neighbour', 'A vertex you can reach in one step along an arrow leaving this one.'],
  ['visit', 'Writing a vertex into your answer list. The exercises ask for the order in which you visit them.'],
  ['reachable', 'You can get there by following arrows. A vertex nobody points to may never be reached.'],
  ['DAG', 'Directed acyclic graph: arrows, and no loops of arrows. Only these have a topological order.'],
  ['topological order', 'All vertices in a line so every arrow points forward (left to right). Think “socks before shoes”.'],
];
const ALGO_NAME = { dfs: 'Depth-first search with a stack (DFS)', bfs: 'Breadth-first search with a queue (BFS)', topo: 'Topological sort by DFS finish order', ucs: 'Uniform cost search (UCS)', q4: 'Counting topological orders', q11: 'Designing a DAG' } as const;

function intro(q: XQuestion): { ask: string; how: string[] } {
  const s = q.spec;
  const o = s.rev ? 'reverse alphabetical (Z → A)' : 'alphabetical (A → Z)';
  if (s.algo === 'dfs') return {
    ask: `Starting at ${s.start}, list the vertices in the order a stack-based DFS visits them. DFS goes as deep as it can along one path before backing up, like exploring a maze by always taking a new corridor first.`,
    how: [`Push ${s.start} on the stack.`, 'Pop the top. If it is already visited, throw it away. Otherwise write it in your answer.', `Push its not-yet-visited neighbours in ${o} order (so the last one pushed is on top).`, 'Repeat until the stack is empty. Vertices that never appear cannot be reached from the start.'] };
  if (s.algo === 'bfs') return {
    ask: `Starting at ${s.start}, list the vertices in the order a queue-based BFS visits them. BFS explores in rings: first everything one arrow away, then two arrows away, and so on, like ripples in a pond.`,
    how: [`Visit ${s.start} and put it in the queue.`, 'Take the vertex at the head of the queue.', `Visit each of its not-yet-visited neighbours in ${o} order and add them to the tail.`, 'Repeat until the queue is empty.'] };
  if (s.algo === 'topo') return {
    ask: 'Put every vertex in a line so that each arrow points forward. It is the order you would do tasks in if an arrow X → Y means “X must happen before Y”. You get it by running DFS and stacking vertices as they finish.',
    how: ['Go through the vertices alphabetically. For each unvisited one, start a DFS.', `Inside a DFS, explore the neighbours (pushed in ${o} order). Skip any already visited.`, 'When a vertex has nothing left to explore, it finishes: put it on the finish stack.', 'Finally pop the finish stack from the top. That is the order. If you ever run into a vertex that is still on the current path, there is a cycle and no order exists.'] };
  if (s.algo === 'ucs') return {
    ask: `Find the cheapest route from ${s.start} to ${s.goal}, where the cost of a route is the sum of its edge numbers. Plain BFS counts steps; UCS counts cost, so it can pick a longer route if it is cheaper.`,
    how: [`Start with ${s.start}(0, —) in the priority queue.`, 'Take out the cheapest entry. Its cost is now final.', 'For each neighbour: cost so far + edge weight. Add it if new; update it only if it is cheaper than what is already queued.', `Stop when ${s.goal} is taken out. Follow the “previous” entries back to read the route.`] };
  if (s.algo === 'q4') return { ask: 'Count how many different valid topological orders the graph has, and justify the number without listing everything blindly.', how: ['Find the vertices whose position is forced (nothing before them, or nothing after them).', 'Look at the groups of positions left over.', 'Count the ways to fill each group, then multiply the counts.'] };
  return { ask: 'Describe a graph with N vertices that has exactly N! (or (N−1)!, …, 1) valid topological orders.', how: ['Think about what arrows remove choices.', 'No arrows at all means every ordering is allowed.', 'Each extra forced vertex shrinks the count to a smaller factorial.'] };
}

/* ---------- graph drawing ---------- */
const FILL: Record<Mark, string> = { new: COL.s2, wait: 'rgba(210,153,34,.35)', cur: COL.accent, vis: 'rgba(63,185,80,.45)', fin: 'rgba(188,140,255,.45)', disc: 'rgba(248,81,73,.4)', out: 'rgba(120,120,120,.18)' };
function GraphSvg({ g, mark, tree = [], act = [], skip = [], path = [], badge = {}, label }: { g: XGraph; mark: Record<string, Mark>; tree?: string[]; act?: string[]; skip?: string[]; path?: string[]; badge?: Record<string, string>; label: string }) {
  const id = useId().replace(/:/g, '');
  const pts = Object.values(g.nodes);
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  g.edges.forEach((e) => { const c = e[3]?.c; if (c) { xs.push(c[0] / 1); ys.push(c[1] / 1); } });
  const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
  const S = Math.min(62, 340 / Math.max(0.5, maxx - minx)), PAD = 34;
  const X = (x: number) => (x - minx) * S + PAD, Y = (y: number) => (maxy - y) * S + PAD;
  const W = (maxx - minx) * S + 2 * PAD, H = (maxy - miny) * S + 2 * PAD;
  const R = 17;
  const weighted = g.edges.some((e) => e[2] != null);
  return (
    <div className="my-2 overflow-x-auto rounded-lg border border-line bg-bg">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} style={{ width: '100%', maxWidth: Math.max(W, 340) * 1.25, minWidth: Math.min(W, 300), display: 'block', margin: '0 auto' }}>
        <defs>
          {[['d', COL.s3], ['t', COL.ok], ['a', COL.warn], ['s', COL.bad], ['p', COL.purple]].map(([k, c]) => <marker key={k} id={`${id}${k}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0 0L10 5L0 10z" fill={c} /></marker>)}
        </defs>
        {g.edges.map((e, i) => {
          const [u, v, w, o] = e, a = g.nodes[u], b = g.nodes[v];
          const P0: [number, number] = [X(a[0]), Y(a[1])], P2: [number, number] = [X(b[0]), Y(b[1])];
          const C: [number, number] = o?.c ? [X(o.c[0]), Y(o.c[1])] : [(P0[0] + P2[0]) / 2, (P0[1] + P2[1]) / 2];
          const un = (p: number[], q: number[]) => { const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; };
          const d0 = un(P0, C), d2 = un(C, P2);
          const s: [number, number] = [P0[0] + d0[0] * R, P0[1] + d0[1] * R], t: [number, number] = [P2[0] - d2[0] * (R + 2), P2[1] - d2[1] * (R + 2)];
          const k = ek(u, v);
          const st = path.includes(k) ? 'p' : act.includes(k) ? 'a' : skip.includes(k) ? 's' : tree.includes(k) ? 't' : 'd';
          const col = { d: COL.s3, t: COL.ok, a: COL.warn, s: COL.bad, p: COL.purple }[st];
          const dpath = o?.c ? `M${s[0]} ${s[1]} Q${C[0]} ${C[1]} ${t[0]} ${t[1]}` : `M${s[0]} ${s[1]} L${t[0]} ${t[1]}`;
          const mx = o?.c ? (s[0] + 2 * C[0] + t[0]) / 4 : (P0[0] + P2[0]) / 2, my = o?.c ? (s[1] + 2 * C[1] + t[1]) / 4 : (P0[1] + P2[1]) / 2;
          const nx = -(P2[1] - P0[1]), ny = P2[0] - P0[0], nl = Math.hypot(nx, ny) || 1;
          return (
            <g key={i}>
              <path d={dpath} fill="none" stroke={col} strokeWidth={st === 'd' ? 1.8 : 3} markerEnd={`url(#${id}${st})`} opacity={st === 'd' ? 0.9 : 1} />
              {w != null && <text x={mx + (nx / nl) * 9} y={my + (ny / nl) * 9 + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill={COL.warn} stroke="var(--bg)" strokeWidth={3} paintOrder="stroke">{w}</text>}
            </g>
          );
        })}
        {Object.entries(g.nodes).map(([v, p]) => (
          <g key={v}>
            <circle cx={X(p[0])} cy={Y(p[1])} r={R} fill={FILL[mark[v] ?? 'new']} stroke={mark[v] === 'cur' ? COL.accent : COL.line} strokeWidth={mark[v] === 'cur' ? 3 : 1.6} />
            <text x={X(p[0])} y={Y(p[1]) + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={COL.ink}>{v}</text>
            {badge[v] && <text x={X(p[0]) + R - 1} y={Y(p[1]) - R + 3} fontSize={11} fontWeight={700} fill={COL.warn} stroke="var(--bg)" strokeWidth={3} paintOrder="stroke">{badge[v]}</text>}
          </g>
        ))}
      </svg>
      {weighted && <div className="px-3 pb-1.5 text-[11.5px] text-muted">Numbers on arrows are costs. Small number beside a circle = cheapest cost found so far.</div>}
    </div>
  );
}

function BoxView({ b }: { b: Box }) {
  return (
    <div className="min-w-[110px] flex-1">
      <div className="mb-1 text-[11.5px] uppercase tracking-wide text-muted">{b.label}{b.hint ? <span className="normal-case"> · {b.hint}</span> : null}</div>
      <div className={`flex min-h-[44px] gap-1.5 rounded-lg border border-line bg-bg p-1.5 ${b.kind === 'stack' ? 'flex-col-reverse justify-start' : 'flex-wrap items-center'}`}>
        {b.items.length === 0 && <span className="m-auto text-[13px] text-muted">empty</span>}
        {b.items.map((x, i) => <span key={i} className={`rounded-md border px-2 py-0.5 text-center font-mono text-[13px] ${b.kind === 'stack' && i === b.items.length - 1 ? 'border-accent bg-accent/20' : b.kind === 'queue' && i === 0 ? 'border-accent bg-accent/20' : b.kind === 'pq' && i === 0 ? 'border-accent bg-accent/20' : 'border-line bg-surface2'}`}>{x}</span>)}
      </div>
    </div>
  );
}

function Tracer({ q }: { q: XQuestion }) {
  const tr = useMemo(() => runSpec(q.spec), [q]);
  const s = useSteps(tr ? tr.steps.length : 1);
  const [ans, setAns] = useState(false);
  if (!tr) return null;
  const cur = tr.steps[s.k], g = GRAPHS[q.spec.g!];
  return (
    <>
      <Transport s={s} />
      <GraphSvg g={g} mark={cur.mark} tree={cur.tree} act={cur.act} skip={cur.skip} path={cur.path} badge={cur.badge} label={g.name} />
      <Row>
        <Key c="rgba(210,153,34,.8)">waiting in the container</Key><Key c={COL.accent}>current</Key><Key c="rgba(63,185,80,.9)">visited / final</Key>
        {q.spec.algo === 'dfs' && <Key c="rgba(248,81,73,.8)">discarded copy</Key>}{q.spec.algo === 'topo' && <Key c="rgba(188,140,255,.9)">finished (badge f# = finish number)</Key>}
        <Key c={COL.ok}>edge that reached a vertex</Key><Key c={COL.warn}>edge just used</Key><Key c={COL.bad}>edge to something already handled</Key>
      </Row>
      <div className="my-2 flex flex-wrap items-start gap-3">
        {cur.popped && <div><div className="mb-1 text-[11.5px] uppercase tracking-wide text-muted">{cur.popped.label}</div><span className={`inline-block rounded-md border px-2 py-1 font-mono text-[13px] ${cur.popped.discard ? 'border-[var(--red)] bg-[var(--red)]/20' : 'border-accent bg-accent/20'}`}>{cur.popped.v}</span></div>}
        {cur.boxes.map((b, i) => <BoxView key={i} b={b} />)}
      </div>
      <Msg><b>{cur.seqLabel}:</b> {cur.seq.join(' → ') || 'nothing yet'}</Msg>
      <Msg live><span dangerouslySetInnerHTML={{ __html: cur.note }} /></Msg>
      <div className="my-2 max-h-52 overflow-auto rounded-lg border border-line">
        <table className="w-full border-collapse text-left text-[12.5px]">
          <thead><tr className="bg-surface2 text-muted">{tr.columns.map((c) => <th key={c} className="px-2 py-1">{c}</th>)}</tr></thead>
          <tbody>{tr.rows.slice(0, cur.rows).map((r, i, a) => <tr key={i} className={i === a.length - 1 ? 'bg-accent/15 font-semibold' : ''}>{r.map((c, j) => <td key={j} className="px-2 py-1 font-mono">{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <Row><Btn ghost aria-pressed={ans} onClick={() => setAns(!ans)}>{ans ? 'Hide the answer' : 'Show the answer'}</Btn></Row>
      {ans && <div className="rounded-lg border border-ok bg-ok/10 px-3 py-2 text-[13.5px] leading-relaxed" dangerouslySetInnerHTML={{ __html: tr.answer }} />}
    </>
  );
}

/* ---------- Q4: counting topological orders ---------- */
function Count() {
  const g = GRAPHS.e_g2;
  const orders = useMemo(() => allTopo(g), [g]);
  const S: { slots: string[]; mark: Record<string, Mark>; note: string; list?: boolean }[] = [
    { slots: Array(8).fill('?'), mark: {}, note: 'Graph 2 has 8 vertices and 9 arrows. In a topological order, the tail of every arrow comes before its head. First find which vertices have a forced position.' },
    { slots: ['1', ...Array(7).fill('?')], mark: { 1: 'cur' }, note: 'Vertex <b>1</b> has no incoming arrows, and every other vertex can be reached from it. So 1 must come <b>first</b>.' },
    { slots: ['1', ...Array(6).fill('?'), '8'], mark: { 1: 'fin', 8: 'cur' }, note: 'Vertex <b>8</b> has no outgoing arrows, and everything leads to it. So 8 must come <b>last</b>.' },
    { slots: ['1', '?', '?', '4', '?', '?', '?', '8'], mark: { 1: 'fin', 8: 'fin', 4: 'cur' }, note: 'Vertex <b>4</b> must come after 2 and 3, and before 5, 6 and 7. Exactly two vertices (2 and 3) sit between 1 and 4, so 4 is stuck in <b>position 4</b>. The order looks like 1 □ □ 4 □ □ □ 8.' },
    { slots: ['1', '2|3', '2|3', '4', '?', '?', '?', '8'], mark: { 1: 'fin', 8: 'fin', 4: 'fin', 2: 'cur', 3: 'cur' }, note: 'Positions 2–3 hold {2, 3}. There is no arrow between 2 and 3, so either can go first: <b>2 ways</b> (2 3 or 3 2).' },
    { slots: ['1', '2|3', '2|3', '4', '5|6|7', '5|6|7', '5|6|7', '8'], mark: { 1: 'fin', 8: 'fin', 4: 'fin', 5: 'cur', 6: 'cur', 7: 'cur' }, note: 'Positions 5–7 hold {5, 6, 7}: 3! = 6 arrangements. The arrow 5 → 7 forces 5 before 7, which kills exactly half of them. That leaves 3!/2 = <b>3 ways</b>. Vertex 6 can sit anywhere among them.' },
    { slots: ['1', '2|3', '2|3', '4', '5|6|7', '5|6|7', '5|6|7', '8'], mark: Object.fromEntries(Object.keys(g.nodes).map((v) => [v, 'vis'])), note: 'The two blocks do not affect each other, so multiply: <b>2 × 3 = 6</b> topological orders. A computer search over all orderings also finds exactly ' + orders.length + '.', list: true },
  ];
  const s = useSteps(S.length);
  const c = S[s.k];
  return (
    <>
      <Transport s={s} label="Step" />
      <GraphSvg g={g} mark={c.mark} label="Graph 2" />
      <div className="my-2 flex flex-wrap gap-1.5">{c.slots.map((x, i) => <div key={i} className="text-center"><div className={`min-w-[44px] rounded-lg border px-2 py-2 font-mono font-bold ${x === '?' ? 'border-dashed border-line text-muted' : 'border-accent bg-accent/20'}`}>{x}</div><div className="text-[11px] text-muted">{i + 1}</div></div>)}</div>
      <Msg live><span dangerouslySetInnerHTML={{ __html: c.note }} /></Msg>
      {c.list && <div className="flex flex-wrap gap-1.5">{orders.map((o, i) => <span key={i} className="rounded-md border border-ok bg-ok/15 px-2 py-0.5 font-mono text-[13px]">{o.join(' ')}</span>)}</div>}
    </>
  );
}

/* ---------- Q11: DAGs with N!, (N-1)!, ... 1 orders ---------- */
function Design() {
  const [N, setN] = useState(4);
  const [k, setK] = useState(0);
  const kk = Math.min(k, N - 1);
  const g = useMemo<XGraph>(() => {
    const nodes: Record<string, [number, number]> = {}, edges: XGraph['edges'] = [];
    for (let i = 1; i <= kk; i++) nodes[String(i)] = [(i - 1) * 1.4, 0];
    const free = Array.from({ length: N - kk }, (_, i) => String(kk + 1 + i));
    const x0 = kk ? (kk - 1) * 1.4 + 1.8 : 0;
    free.forEach((v, i) => (nodes[v] = kk ? [x0, ((free.length - 1) / 2 - i) * 1.1] : [i * 1.4, 0]));
    for (let i = 1; i < kk; i++) edges.push([String(i), String(i + 1)]);
    if (kk >= 1) free.forEach((v) => edges.push([String(kk), v]));
    return { name: `N=${N}, k=${kk}`, nodes, edges };
  }, [N, kk]);
  const orders = useMemo(() => allTopo(g), [g]);
  const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
  return (
    <>
      <Row>
        <label className="text-[13px] text-muted" htmlFor="dg-n">N = <b>{N}</b></label><input id="dg-n" type="range" min={3} max={5} value={N} onChange={(e) => setN(+e.target.value)} className="min-h-11 w-32 accent-[var(--accent)]" />
        <label className="text-[13px] text-muted" htmlFor="dg-k">forced vertices k = <b>{kk}</b></label><input id="dg-k" type="range" min={0} max={N - 1} value={kk} onChange={(e) => setK(+e.target.value)} className="min-h-11 w-40 accent-[var(--accent)]" />
      </Row>
      <GraphSvg g={g} mark={{}} label="Constructed DAG" />
      <Msg live>{kk === 0 ? <>k = 0: <b>no arrows</b>, so nothing constrains the order and every permutation is valid: N! = <b>{fact(N)}</b>.</> : <>Chain the first <b>{kk}</b> vertices (1 → 2 → … → {kk}) and let vertex {kk} point at all {N - kk} remaining vertices. The chain is stuck in the first {kk} positions; the {N - kk} free vertices have no arrows among themselves, so they can appear in any order: (N − k)! = {N - kk}! = <b>{fact(N - kk)}</b>.</>} A computer check finds <b>{orders.length}</b> valid orders{orders.length === fact(N - kk) ? ' ✓' : ''}.</Msg>
    </>
  );
}

/* ---------- main ---------- */
export default function ExerciseLab({ sets }: { sets?: string[] }) {
  const all = sets ? QUESTIONS.filter((q) => sets.includes(q.set)) : QUESTIONS;
  const setNames = [...new Set(all.map((q) => q.set))];
  const [set, setSet] = useState(setNames[0]);
  const qs = all.filter((q) => q.set === set);
  const [id, setId] = useState(qs[0].id);
  const q = qs.find((x) => x.id === id) ?? qs[0];
  const it = intro(q);
  const groups = [...new Set(qs.map((x) => x.group))];
  return (
    <DemoCard title="In-class exercises, explained from scratch">
      <Msg>New to this? Read <b>What is it asking?</b> and <b>The words</b> first, try it on paper using <b>Do it by hand</b>, then step through to check your work. Nothing here is graded.</Msg>
      {setNames.length > 1 && <Tabs value={set} onChange={(v) => { setSet(v); setId(all.find((x) => x.set === v)!.id); }} items={setNames.map((n) => [n, n] as [string, string])} />}
      {groups.map((gp) => (
        <div key={gp} className="my-1.5">
          <div className="mb-1 text-[11.5px] uppercase tracking-wide text-muted">{gp}</div>
          <div className="flex flex-wrap gap-1.5">{qs.filter((x) => x.group === gp).map((x) => <Btn key={x.id} ghost={q.id !== x.id} aria-pressed={q.id === x.id} onClick={() => setId(x.id)}>{x.num} <span className="ml-1 opacity-70">{x.short}</span></Btn>)}</div>
        </div>
      ))}
      <div className="mt-3 rounded-lg border border-line bg-surface2 px-3 py-2">
        <div className="text-[15px] font-bold">{q.num}. {q.title}</div>
        <div className="mt-1 text-[13.5px] leading-relaxed text-muted"><b className="text-ink">The question:</b> {q.problem}</div>
        <div className="mt-1.5 text-[13.5px] leading-relaxed"><b>What is it asking?</b> {it.ask}</div>
        <div className="mt-1 text-[12px] text-muted">Method: {ALGO_NAME[q.spec.algo]}</div>
      </div>
      <details className="my-2 rounded-lg border border-line bg-bg px-3 py-2" open>
        <summary className="cursor-pointer text-[13.5px] font-bold">The words in this question</summary>
        <dl className="mt-1.5 grid gap-1.5 text-[13px] leading-relaxed">
          {q.rules.map((r) => { const h = HELP[r.startsWith('start ') ? '' : r]; if (r.startsWith('start ')) return <div key={r}><dt className="inline font-bold">{r}: </dt><dd className="inline text-muted">begin the algorithm at vertex {r.slice(6)}.</dd></div>; return h ? <div key={r}><dt className="inline font-bold">{h[0]}: </dt><dd className="inline text-muted">{h[1]}</dd></div> : null; })}
          <div className="mt-1 border-t border-line pt-1.5 text-[12.5px] text-muted"><b className="text-ink">Everyday graph words:</b> {GENERIC.map(([a, b]) => <span key={a} className="mr-2"><b>{a}</b> = {b}</span>)}</div>
        </dl>
      </details>
      <details className="my-2 rounded-lg border border-line bg-bg px-3 py-2" open>
        <summary className="cursor-pointer text-[13.5px] font-bold">Do it by hand</summary>
        <ol className="mt-1.5 list-decimal pl-5 text-[13.5px] leading-relaxed">{it.how.map((h, i) => <li key={i}>{h}</li>)}</ol>
      </details>
      {q.spec.algo === 'q4' ? <Count /> : q.spec.algo === 'q11' ? <Design /> : <Tracer key={q.id} q={q} />}
    </DemoCard>
  );
}

export { verts };
