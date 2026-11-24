import { useMemo, useState } from 'react';
import { COL, Key, Pseudo, Tabs, Transport, useSteps } from './kit';
import { QueuePipe, StackTower, type Item } from './viz';
import { DemoCard, Msg, Row, Select } from './ui';

type Algo = 'dfs' | 'bfs' | 'topo' | 'ucs';
interface G { name: string; directed: boolean; weighted: boolean; pos: Record<string, [number, number]>; edges: [string, string, number?][]; algos: Algo[]; start: string; goal?: string; vb?: string; names?: Record<string, string>; pick?: boolean }

const GRAPHS: Record<string, G> = {
  run: {
    name: 'Running example', directed: true, weighted: false, start: 'A', algos: ['bfs', 'dfs'],
    pos: { A: [50, 40], B: [150, 40], C: [50, 150], D: [150, 150], E: [250, 40], F: [250, 150] },
    edges: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'A'], ['C', 'D'], ['D', 'B'], ['D', 'F'], ['E', 'D']],
  },
  dag: {
    name: 'Building a new MRT line (prerequisites)', directed: true, weighted: false, start: 'A', algos: ['topo'],
    pos: { A: [40, 50], B: [40, 150], C: [130, 50], D: [130, 150], E: [220, 40], F: [220, 160], G: [310, 100] },
    edges: [['A', 'C'], ['B', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'F'], ['E', 'G'], ['F', 'G'], ['C', 'F']],
  },
  wt: {
    name: 'Weighted graph (edge = cost)', directed: false, weighted: true, start: 'A', goal: 'F', algos: ['bfs', 'ucs'],
    pos: { A: [40, 95], B: [130, 35], C: [130, 155], D: [225, 35], E: [225, 155], F: [320, 95] },
    edges: [['A', 'B', 2], ['A', 'C', 5], ['B', 'C', 1], ['B', 'D', 4], ['C', 'D', 2], ['C', 'E', 6], ['D', 'F', 3], ['E', 'F', 1]],
  },
};

const MRT_NAMES: Record<string, string> = { JE: 'Jurong East', CL: 'Clementi', BV: 'Buona Vista', QT: 'Queenstown', TB: 'Tiong Bahru', OP: 'Outram Park', RP: 'Raffles Place', CH: 'City Hall', BG: 'Bugis', PL: 'Paya Lebar', TM: 'Tanah Merah', NT: 'Newton', OR: 'Orchard', DG: 'Dhoby Ghaut' };
GRAPHS.mrt = {
  name: 'Simplified Singapore MRT (minutes)', directed: false, weighted: true, pick: true, start: 'JE', goal: 'PL', algos: ['bfs', 'ucs'], names: MRT_NAMES, vb: '0 0 420 230',
  pos: { JE: [35, 70], CL: [90, 110], BV: [140, 150], QT: [190, 190], TB: [250, 195], OP: [300, 165], RP: [335, 120], CH: [305, 85], BG: [360, 60], PL: [385, 115], TM: [385, 190], NT: [110, 25], OR: [180, 40], DG: [245, 40] },
  edges: [['JE', 'CL', 3], ['CL', 'BV', 3], ['BV', 'QT', 4], ['QT', 'TB', 4], ['TB', 'OP', 3], ['OP', 'RP', 4], ['RP', 'CH', 2], ['CH', 'BG', 2], ['BG', 'PL', 6], ['PL', 'TM', 8], ['JE', 'NT', 18], ['NT', 'OR', 3], ['OR', 'DG', 3], ['DG', 'CH', 2], ['BV', 'DG', 16], ['DG', 'PL', 14]],
};

const CODE: Record<Algo, string[]> = {
  dfs: ['stack = [start]', 'while stack:', '    u = stack.pop()', '    if u in visited: continue      # discard', '    visit(u)', '    for v in reversed(neighbours(u)):', '        if v not in visited: stack.append(v)'],
  bfs: ['queue = [start]; seen = {start}', 'while queue:', '    u = queue.pop(0)', '    visit(u)', '    for v in neighbours(u):', '        if v not in seen:', '            seen.add(v); queue.append(v)'],
  topo: ['def dfs(u):', '    seen.add(u)', '    for v in neighbours(u):', '        if v not in seen: dfs(v)', '    finish.append(u)           # after all outgoing', '', 'order = reversed(finish)'],
  ucs: ['pq = [(0, start)]', 'while pq:', '    cost, u = heappop(pq)', '    if u in done: continue', '    done[u] = cost; if u == goal: stop', '    for v, w in neighbours(u):', '        heappush(pq, (cost + w, v))'],
};

type Mark = 'new' | 'fr' | 'cur' | 'done';
interface Step { mark: Record<string, Mark>; tree: string[]; cur?: string; front: string; frontLabel: string; order: string[]; note: string; line: number; row: string[]; path?: string[] }

function nbrs(g: G, u: string): [string, number][] {
  const out: [string, number][] = [];
  for (const [a, b, w] of g.edges) { if (a === u) out.push([b, w ?? 1]); else if (!g.directed && b === u) out.push([a, w ?? 1]); }
  return out.sort((x, y) => x[0].localeCompare(y[0]));
}
const key = (g: G, a: string, b: string) => (g.directed || a < b ? `${a}${b}` : `${b}${a}`);
const cost = (g: G, p: string[]) => p.slice(1).reduce((t, v, i) => t + (nbrs(g, p[i]).find((x) => x[0] === v)?.[1] ?? 0), 0);
const pathTo = (par: Record<string, string>, v: string) => { const p = [v]; while (par[p[0]]) p.unshift(par[p[0]]); return p; };

function run(g: G, algo: Algo): Step[] {
  const names = Object.keys(g.pos);
  const mark: Record<string, Mark> = Object.fromEntries(names.map((v) => [v, 'new' as Mark]));
  const out: Step[] = [];
  const tree: string[] = [], order: string[] = [], par: Record<string, string> = {};
  const snap = (p: Partial<Step> & { note: string; line: number; front: string; frontLabel: string; row: string[] }) => out.push({ mark: { ...mark }, tree: [...tree], order: [...order], ...p });
  if (algo === 'dfs') {
    const stack: [string, string?][] = [[g.start]];
    mark[g.start] = 'fr';
    snap({ line: 0, front: `[${g.start}]`, frontLabel: 'Stack (top on the right)', note: 'Push the start vertex.', row: ['–', '–', `[${g.start}]`] });
    while (stack.length) {
      const [u, p] = stack.pop()!;
      if (order.includes(u)) { snap({ cur: u, line: 3, front: `[${stack.map((x) => x[0]).join(', ')}]`, frontLabel: 'Stack (top on the right)', note: `Pop ${u}: already visited, discard it.`, row: [u, 'discarded', `[${stack.map((x) => x[0]).join(' ')}]`] }); continue; }
      order.push(u); mark[u] = 'cur'; if (p) { tree.push(key(g, p, u)); par[u] = p; }
      const pushed: string[] = [];
      for (const [v] of [...nbrs(g, u)].reverse()) if (!order.includes(v)) { stack.push([v, u]); pushed.push(v); if (mark[v] === 'new') mark[v] = 'fr'; }
      snap({ cur: u, line: 4, front: `[${stack.map((x) => x[0]).join(', ')}]`, frontLabel: 'Stack (top on the right)', note: `Pop and visit ${u}. Push ${pushed.length ? pushed.reverse().join(', ') : 'nothing new'}${pushed.length > 1 ? ' (pushed in reverse so the alphabetically first is on top)' : ''}.`, row: [u, order.join(' '), `[${stack.map((x) => x[0]).join(' ')}]`] });
      mark[u] = 'done';
    }
    snap({ line: 1, front: '[ ]', frontLabel: 'Stack (top on the right)', note: `Stack empty. DFS visit order: ${order.join(', ')}.`, row: ['', order.join(' '), '[ ]'] });
  } else if (algo === 'bfs') {
    const q = [g.start]; mark[g.start] = 'fr';
    snap({ line: 0, front: `[${g.start}]`, frontLabel: 'Queue (front on the left)', note: `Mark ${g.start} and enqueue it.`, row: ['–', '–', `[${g.start}]`] });
    while (q.length) {
      const u = q.shift()!; order.push(u); mark[u] = 'cur';
      const nw: string[] = [];
      for (const [v] of nbrs(g, u)) if (mark[v] === 'new') { mark[v] = 'fr'; q.push(v); nw.push(v); par[v] = u; tree.push(key(g, u, v)); }
      snap({ cur: u, line: 3, front: `[${q.join(', ')}]`, frontLabel: 'Queue (front on the left)', note: `Dequeue and visit ${u}. ${nw.length ? `Mark and enqueue ${nw.join(', ')}.` : 'No new neighbours.'}`, row: [u, order.join(' '), `[${q.join(' ')}]`] });
      mark[u] = 'done';
    }
    const goal = g.goal;
    snap({ line: 1, front: '[ ]', frontLabel: 'Queue (front on the left)', note: `Queue empty. BFS visit order: ${order.join(', ')}.${goal ? ` Fewest hops to ${goal}: ${pathTo(par, goal).join(' → ')} (${pathTo(par, goal).length - 1} edges), ignoring the costs.${g.weighted ? ` That route actually costs ${cost(g, pathTo(par, goal))}.` : ''}` : ''}`, row: ['', order.join(' '), '[ ]'], path: goal ? pathTo(par, goal) : undefined });
  } else if (algo === 'topo') {
    const fin: string[] = []; const seen = new Set<string>(); const path: string[] = [];
    const f = () => `[${fin.join(', ')}]`;
    snap({ line: 0, front: '[ ]', frontLabel: 'Finish stack (bottom → top)', note: 'Run DFS from every unvisited vertex. A vertex is finished only after everything it points to.', row: ['–', '', '[ ]'] });
    const dfs = (u: string) => {
      seen.add(u); path.push(u); mark[u] = 'cur'; order.push(u);
      snap({ cur: u, line: 1, front: f(), frontLabel: 'Finish stack (bottom → top)', note: `Enter ${u} (call path ${path.join(' → ')}).`, row: [`enter ${u}`, path.join('>'), f()] });
      for (const [v] of nbrs(g, u)) if (!seen.has(v)) { tree.push(key(g, u, v)); dfs(v); mark[u] = 'cur'; }
      fin.push(u); path.pop(); mark[u] = 'done';
      snap({ cur: u, line: 4, front: f(), frontLabel: 'Finish stack (bottom → top)', note: `${u} has no unvisited outgoing edges left: it finishes and goes on the finish stack.`, row: [`finish ${u}`, path.join('>'), f()] });
    };
    for (const v of names) if (!seen.has(v)) dfs(v);
    const res = [...fin].reverse();
    snap({ line: 6, front: f(), frontLabel: 'Finish stack (bottom → top)', note: `Pop the finish stack: topological order ${res.join(' → ')}. Every edge points forward.`, row: ['order', res.join(' '), f()], path: res });
  } else {
    const done: Record<string, number> = {};
    let pq: [number, string, string?][] = [[0, g.start]]; mark[g.start] = 'fr';
    const fmt = () => pq.slice().sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1])).map((x) => `${x[1]}:${x[0]}`).join(', ');
    snap({ line: 0, front: `[${fmt()}]`, frontLabel: 'Priority queue (cheapest first)', note: 'Enqueue the start at cost 0.', row: ['–', '–', fmt()] });
    while (pq.length) {
      pq.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]));
      const [c, u, p] = pq.shift()!;
      if (u in done) { snap({ cur: u, line: 3, front: `[${fmt()}]`, frontLabel: 'Priority queue (cheapest first)', note: `Dequeue ${u} at ${c}: already finalised at ${done[u]}, discard it.`, row: [`${u}:${c}`, 'discarded', fmt()] }); continue; }
      done[u] = c; order.push(u); mark[u] = 'cur'; if (p) { tree.push(key(g, p, u)); par[u] = p; }
      if (u === g.goal) {
        snap({ cur: u, line: 4, front: `[${fmt()}]`, frontLabel: 'Priority queue (cheapest first)', note: `Dequeue ${u} at cost ${c}: the goal is dequeued, so stop. Cheapest route ${pathTo(par, u).join(' → ')}, cost ${c}.`, row: [`${u}:${c}`, 'goal, stop', fmt()], path: pathTo(par, u) });
        return out;
      }
      const add: string[] = [];
      for (const [v, w] of nbrs(g, u)) if (!(v in done)) { pq.push([c + w, v, u]); add.push(`${v}:${c + w}`); if (mark[v] === 'new') mark[v] = 'fr'; }
      snap({ cur: u, line: 4, front: `[${fmt()}]`, frontLabel: 'Priority queue (cheapest first)', note: `Dequeue ${u} at cost ${c}, finalise it. ${add.length ? `Enqueue ${add.join(', ')} (cost so far + edge).` : 'Nothing new to enqueue.'}`, row: [`${u}:${c}`, Object.entries(done).map(([k, v]) => `${k}=${v}`).join(' '), fmt()] });
      mark[u] = 'done';
    }
  }
  return out;
}

const FILL: Record<Mark, string> = { new: COL.s2, fr: 'rgba(210,153,34,.35)', cur: COL.accent, done: 'rgba(63,185,80,.45)' };

export default function GraphTracer({ ids }: { ids: string[] }) {
  const [gid, setGid] = useState(ids[0]);
  const g0 = GRAPHS[gid];
  const [from, setFrom] = useState(g0.start);
  const [to, setTo] = useState(g0.goal ?? '');
  const g = useMemo(() => (g0.pick ? { ...g0, start: from, goal: to } : g0), [g0, from, to]);
  const [algo, setAlgo] = useState<Algo>(g.algos[0]);
  const a = g.algos.includes(algo) ? algo : g.algos[0];
  const steps = useMemo(() => run(g, a), [g, a]);
  const s = useSteps(steps.length);
  const cur = steps[s.k];
  const names = Object.keys(g.pos);
  const L: Record<Algo, string> = { dfs: 'DFS (stack)', bfs: 'BFS (queue)', topo: 'Topological sort', ucs: 'Uniform cost search' };
  const pathEdges = new Set<string>();
  if (cur.path) for (let i = 0; i + 1 < cur.path.length; i++) pathEdges.add(key(g, cur.path[i], cur.path[i + 1]));

  return (
    <DemoCard title={`Graph tracer: ${g.name}`}>
      {g.pick && (
        <Row>
          <label className="text-[13px] text-muted" htmlFor="gt-from">From</label>
          <Select id="gt-from" value={from} onChange={(e) => { setFrom(e.target.value); s.reset(); }}>{Object.keys(g.pos).map((v) => <option key={v} value={v}>{g.names?.[v] ?? v}</option>)}</Select>
          <label className="text-[13px] text-muted" htmlFor="gt-to">to</label>
          <Select id="gt-to" value={to} onChange={(e) => { setTo(e.target.value); s.reset(); }}>{Object.keys(g.pos).map((v) => <option key={v} value={v}>{g.names?.[v] ?? v}</option>)}</Select>
        </Row>
      )}
      {ids.length > 1 && <Tabs value={gid} onChange={(v) => { setGid(v); setAlgo(GRAPHS[v].algos[0]); s.reset(); }} items={ids.map((i) => [i, GRAPHS[i].name] as [string, string])} />}
      {g.algos.length > 1 && <Tabs value={a} onChange={(v) => { setAlgo(v); s.reset(); }} items={g.algos.map((x) => [x, L[x]] as [Algo, string])} />}
      <Transport s={s} />
      <div className="my-2 overflow-x-auto rounded-lg border border-line bg-bg">
        <svg viewBox={g.vb ?? '0 0 360 195'} role="img" aria-label={g.name} style={{ width: '100%', maxWidth: g.vb ? 720 : 560, display: 'block', margin: '0 auto' }}>
          <defs><marker id={`ar-${gid}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--muted)" /></marker></defs>
          {g.edges.map(([x, y, w]) => {
            const [x1, y1] = g.pos[x], [x2, y2] = g.pos[y];
            const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
            const bi = g.directed && g.edges.some(([p, q]) => p === y && q === x);
            const off = bi ? 5 : 0, ox = -uy * off, oy = ux * off;
            const sx = x1 + ux * 19 + ox, sy = y1 + uy * 19 + oy, ex = x2 - ux * (g.directed ? 23 : 19) + ox, ey = y2 - uy * (g.directed ? 23 : 19) + oy;
            const k = key(g, x, y), onPath = pathEdges.has(k), inTree = cur.tree.includes(k);
            const c = onPath ? COL.warn : inTree ? COL.ok : COL.s3;
            return (
              <g key={x + y}>
                <line key={inTree ? 't' + k : 'n' + k} className={inTree ? 'vz-draw' : undefined} style={{ ['--len' as string]: 400 }} x1={sx} y1={sy} x2={ex} y2={ey} stroke={c} strokeWidth={onPath ? 3.5 : inTree ? 2.5 : 1.6} markerEnd={g.directed ? `url(#ar-${gid})` : undefined} />
                {w != null && <text x={(x1 + x2) / 2 + ox * 2 - uy * 8} y={(y1 + y2) / 2 + oy * 2 + ux * 8 + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={COL.warn}>{w}</text>}
              </g>
            );
          })}
          {names.map((v) => {
            const [x, y] = g.pos[v];
            return (
              <g key={v}>
                {cur.cur === v && <circle cx={x} cy={y} r={24} fill="none" stroke={COL.accent} strokeWidth={2} className="vz-blink" />}
                <circle cx={x} cy={y} r={17} fill={FILL[cur.mark[v]]} stroke={cur.cur === v ? COL.accent : COL.line} strokeWidth={cur.cur === v ? 3 : 1.5} />
                <text x={x} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={COL.ink}>{v}</text>
                {cur.order.includes(v) && <text x={x + 15} y={y - 15} fontSize={10.5} fontWeight={700} fill={COL.warn}>{cur.order.indexOf(v) + 1}</text>}
              </g>
            );
          })}
        </svg>
      </div>
      {g.names && <div className="my-1 text-[12px] leading-relaxed text-muted">{Object.entries(g.names).map(([k, v]) => <span key={k} className="mr-3 inline-block"><b className="text-ink">{k}</b> {v}</span>)} · schematic, minutes illustrative</div>}
      <Row><Key c={COL.s3}>not seen</Key><Key c="rgba(210,153,34,.8)">waiting in the container</Key><Key c={COL.accent}>current</Key><Key c="rgba(63,185,80,.9)">finished</Key><Key c={COL.warn}>numbers = visit order</Key></Row>
      <div className="my-2 rounded-lg border border-line bg-surface2/40 p-3">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[13px]"><b>{cur.frontLabel}</b>{cur.cur && <span className="rounded-md border border-accent bg-accent/20 px-2 py-0.5 font-mono">now: {cur.cur}</span>}</div>
        {(() => {
          const inner = cur.front.slice(1, -1).trim(); const raw = inner ? inner.split(', ') : [];
          const items: Item[] = raw.map((x, i) => { const [v, c] = x.split(':'); return { id: i + x, label: v, sub: c != null ? 'cost ' + c : undefined }; });
          return a === 'dfs' || a === 'topo' ? <StackTower compact min={3} label={a === 'topo' ? 'finish stack' : 'stack'} items={items} /> : <QueuePipe items={items} priority={a === 'ucs'} label={a === 'ucs' ? 'priority queue' : 'queue'} />;
        })()}
      </div>
      <Pseudo lines={CODE[a]} active={cur.line} />
      <div className="my-2 max-h-48 overflow-auto rounded-lg border border-line">
        <table className="w-full border-collapse text-left text-[12.5px]">
          <thead><tr className="bg-surface2 text-muted"><th className="px-2 py-1">Step</th><th className="px-2 py-1">{a === 'topo' ? 'Event' : 'Took'}</th><th className="px-2 py-1">{a === 'topo' ? 'Call path' : a === 'ucs' ? 'Finalised' : 'Visited'}</th><th className="px-2 py-1">{a === 'topo' ? 'Finish stack' : 'Container after'}</th></tr></thead>
          <tbody>{steps.slice(0, s.k + 1).map((st, i) => <tr key={i} className={i === s.k ? 'bg-accent/15 font-semibold' : ''}><td className="px-2 py-1">{i}</td>{st.row.map((c, j) => <td key={j} className="px-2 py-1 font-mono">{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <Msg live>{cur.note}</Msg>
    </DemoCard>
  );
}
