import data from './exercises.json';

export type Edge = [string, string, (number | null)?, { c?: [number, number]; side?: string; pos?: number }?];
export interface XGraph { name: string; nodes: Record<string, [number, number]>; edges: Edge[] }
export interface XSpec { algo: 'dfs' | 'bfs' | 'topo' | 'ucs' | 'q4' | 'q11'; g?: string; start?: string; goal?: string; rev?: boolean; extra?: { answer?: string; unreached?: string } }
export interface XQuestion { set: string; id: string; num: string; short: string; group: string; title: string; graph: string | null; rules: string[]; problem: string; spec: XSpec }

export const GRAPHS = data.graphs as unknown as Record<string, XGraph>;
export const QUESTIONS = data.qs as unknown as XQuestion[];

export type Mark = 'new' | 'wait' | 'cur' | 'vis' | 'fin' | 'disc' | 'out';
export interface Box { label: string; items: string[]; hint?: string; kind: 'stack' | 'queue' | 'pq' | 'text' }
export interface XStep { mark: Record<string, Mark>; tree: string[]; act: string[]; skip: string[]; path: string[]; badge: Record<string, string>; boxes: Box[]; popped?: { label: string; v: string; discard?: boolean }; seq: string[]; seqLabel: string; note: string }
export interface Trace { columns: string[]; rows: string[][]; steps: (XStep & { rows: number })[]; answer: string }

const cmp = (a: string, b: string) => (Number.isNaN(+a) || Number.isNaN(+b) ? a.localeCompare(b) : +a - +b);
export const ek = (u: string, v: string) => u + '>' + v;
const L = (a: string[]) => '[' + a.join(', ') + ']';
const isAre = (a: string[]) => (a.length === 1 ? `${a[0]} is` : `${a.join(', ')} are`);
const adjOf = (g: XGraph) => {
  const a: Record<string, { to: string; w: number | null }[]> = {};
  for (const v in g.nodes) a[v] = [];
  for (const e of g.edges) a[e[0]].push({ to: e[1], w: e[2] ?? null });
  for (const v in a) a[v].sort((x, y) => cmp(x.to, y.to));
  return a;
};
export const verts = (g: XGraph) => Object.keys(g.nodes).sort(cmp);
export function allTopo(g: XGraph): string[][] {
  const adj = adjOf(g), V = verts(g), indeg: Record<string, number> = {};
  V.forEach((v) => (indeg[v] = 0));
  g.edges.forEach((e) => indeg[e[1]]++);
  const out: string[][] = [], cur: string[] = [], used = new Set<string>();
  (function rec() {
    if (cur.length === V.length) { out.push([...cur]); return; }
    for (const v of V) if (!used.has(v) && indeg[v] === 0) { used.add(v); cur.push(v); adj[v].forEach((x) => indeg[x.to]--); rec(); adj[v].forEach((x) => indeg[x.to]++); cur.pop(); used.delete(v); }
  })();
  return out;
}

type Snap = Partial<XStep> & { note: string };
function mk(g: XGraph) {
  const V = verts(g);
  const steps: (XStep & { rows: number })[] = [];
  const rows: string[][] = [];
  const push = (s: Snap & { mark: Record<string, Mark> }) =>
    steps.push({ tree: [], act: [], skip: [], path: [], badge: {}, boxes: [], seq: [], seqLabel: '', ...s, rows: rows.length } as XStep & { rows: number });
  return { V, steps, rows, push };
}

export function dfsStack(g: XGraph, start: string, rev: boolean, extra: XSpec['extra'] = {}): Trace {
  const adj = adjOf(g), { V, steps, rows, push } = mk(g);
  const visited = new Set<string>(), seq: string[] = [], tree = new Set<string>();
  const stack: { v: string; from: string | null }[] = [{ v: start, from: null }];
  const order = rev ? 'reverse alphabetical' : 'alphabetical';
  const snap = (o: { cur?: string; discard?: boolean; act?: string[]; skip?: string[]; out?: string[]; note: string; newCount?: number }) => {
    const mark: Record<string, Mark> = {};
    V.forEach((v) => (mark[v] = visited.has(v) ? 'vis' : stack.some((s) => s.v === v) ? 'wait' : 'new'));
    (o.out ?? []).forEach((v) => (mark[v] = 'out'));
    if (o.cur) mark[o.cur] = o.discard ? 'disc' : 'cur';
    push({ mark, tree: [...tree], act: o.act ?? [], skip: o.skip ?? [], popped: o.cur ? { label: 'Popped', v: o.cur, discard: o.discard } : undefined, boxes: [{ label: 'Stack', kind: 'stack', items: stack.map((s) => s.v), hint: 'top is the last item' }], seq: [...seq], seqLabel: 'Visit sequence', note: o.note });
  };
  rows.push(['start', '—', start, L([start])]);
  snap({ note: `Push the start vertex <b>${start}</b> onto the empty stack. Nothing is visited yet: in this version a vertex is <b>visited when it is popped</b>.` });
  while (stack.length) {
    const top = stack.pop()!, u = top.v;
    if (visited.has(u)) {
      rows.push([u, 'discarded', '—', L(stack.map((s) => s.v))]);
      snap({ cur: u, discard: true, note: `Pop <b>${u}</b>. ${u} is already visited, so this extra copy is <b>discarded</b>. Nothing is pushed.` });
      continue;
    }
    visited.add(u); seq.push(u); if (top.from) tree.add(ek(top.from, u));
    const nb = adj[u].map((x) => x.to), pushOrd = rev ? [...nb].reverse() : nb, pushed: string[] = [], skipped: string[] = [], dup: string[] = [];
    for (const w of pushOrd) { if (visited.has(w)) skipped.push(w); else { if (stack.some((s) => s.v === w)) dup.push(w); stack.push({ v: w, from: u }); pushed.push(w); } }
    let note = `Pop <b>${u}</b>. It is not visited yet, so <b>visit ${u}</b>.`;
    if (!nb.length) note += ` ${u} has no outgoing edges, so nothing is pushed.`;
    else {
      if (pushed.length) { note += ` Push its unvisited out-neighbours in ${order} order: ${pushed.join(', ')}.`; if (pushed.length > 1) note += ` <b>${pushed[pushed.length - 1]}</b> goes in last, so it sits on top and is popped first.`; }
      if (skipped.length) note += ` ${isAre(skipped)} already visited, so not pushed.`;
      if (dup.length) note += ` ${isAre(dup)} already waiting in the stack: push another copy anyway.`;
    }
    rows.push([u, u, pushed.join(', ') || '—', L(stack.map((s) => s.v))]);
    snap({ cur: u, act: pushed.map((w) => ek(u, w)), skip: skipped.map((w) => ek(u, w)), note });
  }
  const out = V.filter((v) => !visited.has(v));
  snap({ out, note: `The stack is empty, so DFS stops. Visit sequence: <b>${seq.join(', ')}</b>.${out.length ? ` ${extra?.unreached ?? `${out.join(', ')} can never be reached from ${start}.`}` : ''}` });
  return { columns: ['Popped', 'Visited', 'Pushed', 'Stack after (bottom → top)'], rows, steps, answer: `<p><b>Visit sequence:</b> ${seq.join(', ')}</p>${extra?.answer ?? ''}` };
}

export function bfsQueue(g: XGraph, start: string, rev: boolean, extra: XSpec['extra'] = {}): Trace {
  const adj = adjOf(g), { V, steps, rows, push } = mk(g);
  const visited = new Set([start]), done = new Set<string>(), seq = [start], tree = new Set<string>(), q = [start];
  const order = rev ? 'reverse alphabetical' : 'alphabetical';
  const snap = (o: { cur?: string; act?: string[]; skip?: string[]; out?: string[]; note: string }) => {
    const mark: Record<string, Mark> = {};
    V.forEach((v) => (mark[v] = done.has(v) ? 'vis' : visited.has(v) ? 'wait' : 'new'));
    (o.out ?? []).forEach((v) => (mark[v] = 'out'));
    if (o.cur) mark[o.cur] = 'cur';
    push({ mark, tree: [...tree], act: o.act ?? [], skip: o.skip ?? [], popped: o.cur ? { label: 'Dequeued', v: o.cur } : undefined, boxes: [{ label: 'Queue', kind: 'queue', items: [...q], hint: 'head on the left, tail on the right' }], seq: [...seq], seqLabel: 'Visit sequence', note: o.note });
  };
  rows.push(['start', start, L(q)]);
  snap({ note: `Visit the start vertex <b>${start}</b> and enqueue it. In BFS a vertex is <b>visited when it is enqueued</b>, so no vertex ever enters the queue twice.` });
  while (q.length) {
    const u = q.shift()!; done.add(u);
    const nb = adj[u].map((x) => x.to), o2 = rev ? [...nb].reverse() : nb, added: string[] = [], skipped: string[] = [];
    for (const w of o2) { if (visited.has(w)) skipped.push(w); else { visited.add(w); q.push(w); seq.push(w); tree.add(ek(u, w)); added.push(w); } }
    let note = `Dequeue <b>${u}</b> from the head.`;
    if (added.length) note += ` Visit and enqueue its new out-neighbours in ${order} order: ${added.join(', ')}.`; else note += nb.length ? '' : ` ${u} has no outgoing edges.`;
    if (skipped.length) note += ` ${isAre(skipped)} already visited, so skipped.`;
    if (!added.length && nb.length && !skipped.length) note += ' Nothing new.';
    rows.push([u, added.join(', ') || '—', L(q)]);
    snap({ cur: u, act: added.map((w) => ek(u, w)), skip: skipped.map((w) => ek(u, w)), note });
  }
  const out = V.filter((v) => !visited.has(v));
  snap({ out, note: `The queue is empty, so BFS stops. Visit sequence: <b>${seq.join(', ')}</b>.${out.length ? ` ${extra?.unreached ?? `${out.join(', ')} can never be reached from ${start}.`}` : ''}` });
  return { columns: ['Dequeued', 'Visited / enqueued', 'Queue after (head → tail)'], rows, steps, answer: `<p><b>Visit sequence:</b> ${seq.join(', ')}</p>${extra?.answer ?? ''}` };
}

export function topoFinish(g: XGraph, rev: boolean, extra: XSpec['extra'] = {}): Trace {
  const adj = adjOf(g), { V, steps, rows, push } = mk(g);
  const color: Record<string, 'g' | 'b'> = {}, path: string[] = [], finish: string[] = [], tree = new Set<string>(), fin: Record<string, number> = {};
  let cycle: string | null = null;
  const order = rev ? 'reverse alphabetical' : 'alphabetical';
  const snap = (o: { cur?: string; act?: string[]; skip?: string[]; note: string }) => {
    const mark: Record<string, Mark> = {};
    V.forEach((v) => (mark[v] = color[v] === 'b' ? 'fin' : color[v] === 'g' ? 'wait' : 'new'));
    if (o.cur) mark[o.cur] = 'cur';
    const badge: Record<string, string> = {};
    for (const v in fin) badge[v] = 'f' + fin[v];
    push({ mark, tree: [...tree], act: o.act ?? [], skip: o.skip ?? [], badge, boxes: [{ label: 'DFS path (still exploring)', kind: 'stack', items: [...path] }, { label: 'Finish stack', kind: 'stack', items: [...finish], hint: 'a vertex goes on when it finishes' }], seq: [...finish], seqLabel: 'Finish order so far', note: o.note });
  };
  const visit = (u: string, parent: string | null, intro: string, restart: boolean) => {
    color[u] = 'g'; path.push(u); if (parent) tree.add(ek(parent, u));
    const nb = adj[u].map((x) => x.to), pushOrd = rev ? [...nb].reverse() : nb, explore = [...pushOrd].reverse();
    let note = intro;
    if (nb.length > 1) note += ` Its out-neighbours are pushed in ${order} order (${pushOrd.join(', ')}), so they leave the stack as <b>${explore.join(', ')}</b>: that is the order ${u} explores them.`;
    else if (nb.length === 1) note += ` Its only out-neighbour is ${nb[0]}.`; else note += ` ${u} has no outgoing edges.`;
    snap({ cur: u, act: parent ? [ek(parent, u)] : [], note });
    for (const w of explore) {
      if (!color[w]) visit(w, u, `From <b>${u}</b>, explore <b>${w}</b>. It joins the DFS path.`, false);
      else {
        if (color[w] === 'g' && !cycle) cycle = `${u} → ${w}`;
        snap({ cur: u, skip: [ek(u, w)], note: `Back at <b>${u}</b>. The next out-neighbour, <b>${w}</b>, is already ${color[w] === 'b' ? 'finished' : '<b>on the current DFS path</b>: an edge that leads back to the path is a <b>cycle</b>'}, so skip it.` });
      }
    }
    color[u] = 'b'; path.pop(); finish.push(u); fin[u] = finish.length;
    rows.push([String(finish.length), u, (restart ? 'outer loop; ' : '') + (nb.length ? `${nb.join(', ')} finished` : 'no out-neighbours'), L(finish)]);
    snap({ cur: u, note: `${nb.length ? `All out-neighbours of <b>${u}</b> (${nb.join(', ')}) are finished` : `<b>${u}</b> has no outgoing edges`}, so <b>${u} finishes</b>: push it onto the finish stack (finish #${finish.length}).` });
  };
  snap({ note: 'Every vertex starts unvisited. The outer loop goes through the vertices in alphabetical order and starts a fresh DFS from each one that is still unvisited.' });
  let first = true;
  for (const v of V) {
    if (color[v]) continue;
    visit(v, null, first ? `Outer loop: <b>${v}</b> is unvisited, so start a DFS from ${v}.` : `Outer loop: <b>${v}</b> is still unvisited, so start a new DFS from ${v}.`, !first);
    first = false;
  }
  const mark: Record<string, Mark> = {}, badge: Record<string, string> = {};
  if (cycle) {
    V.forEach((v) => (mark[v] = 'fin'));
    push({ mark, tree: [...tree], boxes: [{ label: 'Finish stack', kind: 'stack', items: [...finish] }], seq: [...finish], seqLabel: 'Finish order', note: `A cycle was found (the edge <b>${cycle}</b> returns to a vertex still on the path). In a cycle every vertex must come before the next, which is impossible. <b>No topological order exists.</b>` });
    return { columns: ['#', 'Finished', 'Reason', 'Finish stack after (bottom → top)'], rows, steps, answer: `<p><b>No valid order.</b> The graph has a cycle (${cycle}), so the tasks can never be put in a line where every arrow points forward.</p>` };
  }
  const topo = [...finish].reverse(), pos: Record<string, number> = {};
  topo.forEach((v, i) => (pos[v] = i + 1));
  const es: string[] = [];
  V.forEach((v) => { mark[v] = 'fin'; badge[v] = '#' + pos[v]; });
  g.edges.forEach((e) => es.push(ek(e[0], e[1])));
  const fwd = g.edges.every((e) => pos[e[0]] < pos[e[1]]);
  push({ mark, tree: [], path: es, badge, boxes: [{ label: 'Finish stack', kind: 'stack', items: [...finish], hint: 'pop from the top to read the order' }, { label: 'Topological order', kind: 'text', items: [topo.join(' ')] }], seq: topo, seqLabel: 'Topological order', note: `Pop the finish stack from top to bottom: topological order <b>${topo.join(', ')}</b>. Check: ${fwd ? `all ${g.edges.length} edges point forward (the tail of every arrow comes before its head).` : 'some edge points backward!'}` });
  return { columns: ['#', 'Finished', 'Reason', 'Finish stack after (bottom → top)'], rows, steps, answer: `<p><b>Topological order:</b> ${topo.join(', ')}</p>${extra?.answer ?? ''}` };
}

export function ucsSearch(g: XGraph, s: string, t: string, extra: XSpec['extra'] = {}): Trace {
  const adj = adjOf(g), { V, steps, rows, push } = mk(g);
  const pq: { v: string; c: number; p: string | null }[] = [{ v: s, c: 0, p: null }];
  const done = new Map<string, { v: string; c: number; p: string | null }>();
  const fe = (e: { v: string; c: number; p: string | null }) => `${e.v}(${e.c}, ${e.p ?? '—'})`;
  const sortPQ = () => pq.sort((a, b) => a.c - b.c || a.v.localeCompare(b.v));
  const snap = (o: { cur?: string; deq?: typeof pq[0]; act?: string[]; skip?: string[]; path?: string[]; pathV?: string[]; seq?: string[]; note: string }) => {
    const mark: Record<string, Mark> = {}, badge: Record<string, string> = {}, tree: string[] = [];
    V.forEach((v) => (mark[v] = done.has(v) ? 'vis' : pq.some((e) => e.v === v) ? 'wait' : 'new'));
    if (o.cur) mark[o.cur] = 'cur';
    done.forEach((e, v) => { if (e.p) tree.push(ek(e.p, v)); badge[v] = String(e.c); });
    pq.forEach((e) => (badge[e.v] = String(e.c)));
    o.pathV?.forEach((v) => (mark[v] = 'fin'));
    push({ mark, tree, act: o.act ?? [], skip: o.skip ?? [], path: o.path ?? [], badge, popped: o.deq ? { label: 'Dequeued', v: fe(o.deq) } : undefined, boxes: [{ label: 'Priority queue', kind: 'pq', items: pq.map((e) => fe(e)), hint: 'lowest cost first · entry = node(cost, previous)' }, { label: 'Dequeued so far (cost is final)', kind: 'text', items: [...done.values()].map(fe) }], seq: o.seq ?? [...done.keys()], seqLabel: 'Dequeued so far', note: o.note });
  };
  rows.push(['start', '—', fe(pq[0]), fe(pq[0])]);
  snap({ note: `Put the start <b>${s}</b> into the priority queue with cost 0 and no previous vertex. The number on each vertex is the cheapest cost found so far.` });
  let n = 0;
  while (pq.length) {
    n++; sortPQ(); const e = pq.shift()!; done.set(e.v, e);
    if (e.v === t) {
      rows.push([String(n), fe(e), 'target dequeued: stop', pq.map(fe).join(', ') || '[ ]']);
      snap({ cur: t, deq: e, note: `Dequeue the cheapest entry <b>${fe(e)}</b>. It is the target, so UCS <b>stops</b>. Cost ${e.c} is final, because everything left in the queue costs at least ${e.c}.` });
      break;
    }
    const parts: string[] = [], long: string[] = [], act: string[] = [], skip: string[] = [];
    for (const { to, w } of adj[e.v]) {
      const ww = w ?? 1;
      if (done.has(to)) { long.push(`${to} was already dequeued, so it is left alone.`); skip.push(ek(e.v, to)); parts.push(`${to}: already dequeued`); continue; }
      const nc = e.c + ww, ex = pq.find((x) => x.v === to);
      if (!ex) { pq.push({ v: to, c: nc, p: e.v }); act.push(ek(e.v, to)); parts.push(`${to}: ${e.c}+${ww} = ${nc}`); long.push(`Enqueue <b>${to}</b> with cost ${e.c} + ${ww} = ${nc}, previous ${e.v}.`); }
      else if (nc < ex.c) { long.push(`${to} is already in the queue at cost ${ex.c}. The new way costs ${e.c} + ${ww} = ${nc}, which is lower, so <b>update</b> it to ${to}(${nc}, ${e.v}).`); ex.c = nc; ex.p = e.v; act.push(ek(e.v, to)); parts.push(`${to}: ${e.c}+${ww} = ${nc}, lower: update`); }
      else { long.push(`${to} is already in the queue at cost ${ex.c}. ${e.c} + ${ww} = ${nc} is <b>not lower</b>, so keep ${fe(ex)}.`); skip.push(ek(e.v, to)); parts.push(`${to}: ${e.c}+${ww} = ${nc}, not lower`); }
    }
    sortPQ();
    rows.push([String(n), fe(e), parts.join('; ') || '—', pq.map(fe).join(', ') || '[ ]']);
    snap({ cur: e.v, deq: e, act, skip, note: `Dequeue the cheapest entry <b>${fe(e)}</b>: the cost of ${e.v} is now final. ${long.join(' ') || `${e.v} has no outgoing edges.`}` });
  }
  if (!done.has(t)) {
    snap({ note: `The queue is empty and ${t} was never dequeued: there is no route from ${s} to ${t}.` });
    return { columns: ['Step', 'Dequeued', 'Enqueued / updated', 'Queue after (cheapest first)'], rows, steps, answer: `<p>No route from ${s} to ${t}.</p>${extra?.answer ?? ''}` };
  }
  const path = [t]; while (done.get(path[0])!.p) path.unshift(done.get(path[0])!.p!);
  const pe: string[] = []; const ws: number[] = [];
  for (let i = 1; i < path.length; i++) { pe.push(ek(path[i - 1], path[i])); ws.push(adj[path[i - 1]].find((x) => x.to === path[i])!.w ?? 1); }
  snap({ path: pe, pathV: path, seq: path, note: `Read the path backwards by following the "previous" links from ${t}: ${[...path].reverse().join(' ← ')}. Cheapest path <b>${path.join(' → ')}</b>, cost ${ws.join(' + ')} = <b>${done.get(t)!.c}</b>.` });
  return { columns: ['Step', 'Dequeued', 'Enqueued / updated', 'Queue after (cheapest first)'], rows, steps, answer: `<p><b>Path:</b> ${path.join(' → ')} &nbsp; <b>Cost:</b> ${ws.join(' + ')} = ${done.get(t)!.c}</p>${extra?.answer ?? ''}` };
}

export function runSpec(spec: XSpec): Trace | null {
  const g = spec.g ? GRAPHS[spec.g] : null;
  if (!g) return null;
  if (spec.algo === 'dfs') return dfsStack(g, spec.start!, !!spec.rev, spec.extra);
  if (spec.algo === 'bfs') return bfsQueue(g, spec.start!, !!spec.rev, spec.extra);
  if (spec.algo === 'topo') return topoFinish(g, !!spec.rev, spec.extra);
  if (spec.algo === 'ucs') return ucsSearch(g, spec.start!, spec.goal!, spec.extra);
  return null;
}
