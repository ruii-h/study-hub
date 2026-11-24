import { useMemo, useState } from 'react';
import { Key, Stat, Stats, Tabs, Transport, useSteps, COL } from './kit';
import { Btn, DemoCard, Label, Msg, NumberInput, Row } from './ui';

interface N { k: number; l: N | null; r: N | null }
type T = N | null;
const ins = (t: T, k: number): T => (!t ? { k, l: null, r: null } : k < t.k ? { ...t, l: ins(t.l, k) } : k > t.k ? { ...t, r: ins(t.r, k) } : t);
const has = (t: T, k: number): boolean => (!t ? false : k === t.k ? true : has(k < t.k ? t.l : t.r, k));
const minOf = (t: N): N => (t.l ? minOf(t.l) : t);
function del(t: T, k: number): [T, string] {
  if (!t) return [null, 'Key not found: nothing to delete.'];
  if (k < t.k) { const [x, m] = del(t.l, k); return [{ ...t, l: x }, m]; }
  if (k > t.k) { const [x, m] = del(t.r, k); return [{ ...t, r: x }, m]; }
  if (!t.l && !t.r) return [null, `${k} is a leaf: simply remove it.`];
  if (!t.l) return [t.r, `${k} has one child: its parent adopts that child.`];
  if (!t.r) return [t.l, `${k} has one child: its parent adopts that child.`];
  const s = minOf(t.r);
  const [r2] = del(t.r, s.k);
  return [{ k: s.k, l: t.l, r: r2 }, `${k} has two children: copy in its inorder successor ${s.k} (smallest key of the right subtree), then remove that successor from the right subtree.`];
}
const pre = (t: T): number[] => (t ? [t.k, ...pre(t.l), ...pre(t.r)] : []);
const ino = (t: T): number[] => (t ? [...ino(t.l), t.k, ...ino(t.r)] : []);
const post = (t: T): number[] => (t ? [...post(t.l), ...post(t.r), t.k] : []);
const height = (t: T): number => (t ? 1 + Math.max(height(t.l), height(t.r)) : 0);
const count = (t: T): number => (t ? 1 + count(t.l) + count(t.r) : 0);
const isFull = (t: T): boolean => !t || ((!t.l && !t.r) || (!!t.l && !!t.r)) && isFull(t.l) && isFull(t.r);
function isComplete(t: T): boolean {
  if (!t) return true;
  const q: T[] = [t]; let gap = false;
  while (q.length) { const x = q.shift()!; if (!x) { gap = true; continue; } if (gap) return false; q.push(x.l, x.r); }
  return true;
}
const isPerfect = (t: T): boolean => count(t) === 2 ** height(t) - 1;
const build = (ks: number[]) => ks.reduce<T>(ins, null);

const PRESETS: [string, number[]][] = [
  ['Perfect', [40, 20, 60, 10, 30, 50, 70]],
  ['Full, not complete', [40, 20, 60, 50, 70]],
  ['Complete, not full', [40, 20, 60, 10]],
  ['Skewed (a chain)', [10, 20, 30, 40, 50]],
];

interface Pos { k: number; x: number; y: number; px?: number; py?: number }
function layout(t: T): Pos[] {
  const out: Pos[] = []; let i = 0;
  const go = (n: T, d: number, p?: Pos) => {
    if (!n) return;
    go(n.l, d + 1, undefined);
    const me: Pos = { k: n.k, x: i++, y: d };
    out.push(me);
    go(n.r, d + 1, undefined);
  };
  go(t, 0);
  // parent links
  const at = new Map(out.map((p) => [p.k, p]));
  const link = (n: T) => { if (!n) return; for (const c of [n.l, n.r]) if (c) { const a = at.get(c.k)!, b = at.get(n.k)!; a.px = b.x; a.py = b.y; link(c); } };
  link(t);
  return out;
}

export default function TreeLab() {
  const [keys, setKeys] = useState<number[]>(PRESETS[0][1]);
  const [key, setKey] = useState(35);
  const [mode, setMode] = useState<'build' | 'walk'>('build');
  const [order, setOrder] = useState<'pre' | 'in' | 'post'>('in');
  const [path, setPath] = useState<number[]>([]);
  const [found, setFound] = useState<number | null>(null);
  const [msg, setMsg] = useState<string>('Insert, search or delete a key. Try a preset to see each tree class.');
  const tree = useMemo(() => build(keys), [keys]);
  const pos = useMemo(() => layout(tree), [tree]);
  const seq = useMemo(() => (order === 'pre' ? pre(tree) : order === 'in' ? ino(tree) : post(tree)), [tree, order]);
  const s = useSteps(seq.length + 1);
  const visited = mode === 'walk' ? seq.slice(0, s.k) : [];
  const cur = mode === 'walk' && s.k > 0 ? seq[s.k - 1] : null;
  const h = height(tree), n = count(tree);

  const W = Math.max(pos.length, 1), CW = 54, RH = 62;
  const vw = Math.max(W * CW, 300), vh = Math.max(h, 1) * RH + 12;
  const X = (x: number) => (x + 0.5) * (vw / W);
  const Y = (y: number) => y * RH + 28;

  const ok = Number.isFinite(key);
  const doIns = () => { if (!ok) return; if (keys.includes(key)) { setMsg(`${key} is already in the tree (keys are distinct).`); return; } if (keys.length >= 15) { setMsg('Tree is full for this demo (15 keys).'); return; } setKeys([...keys, key]); setPath([]); setFound(key); setMsg(`Inserted ${key}: at each node go left if smaller, right if larger, and attach at the first empty spot.`); };
  const doSearch = () => {
    if (!ok) return; const p: number[] = []; let t: T = tree;
    while (t) { p.push(t.k); if (t.k === key) break; t = key < t.k ? t.l : t.r; }
    const hit = p[p.length - 1] === key; setPath(p); setFound(hit ? key : null);
    setMsg(`Search ${key}: ${p.join(' → ') || 'empty tree'}. ${hit ? `Found after ${p.length} comparison${p.length > 1 ? 's' : ''}.` : `Reached an empty spot after ${p.length}: not in the tree.`} Only one subtree is searched at each step.`);
  };
  const doDel = () => { if (!ok) return; const [t2, m] = del(tree, key); setMsg(m); if (has(tree, key)) { setKeys(pre(t2)); setPath([]); setFound(null); } };

  return (
    <DemoCard title="Binary tree lab: build a BST, search it, delete from it, walk it">
      <Tabs value={mode} onChange={(v) => { setMode(v); s.reset(); }} items={[['build', 'Build and edit'], ['walk', 'Traversals']]} />
      {mode === 'build' ? (
        <>
          <Row>
            <Label htmlFor="tl-key">Key</Label>
            <NumberInput id="tl-key" value={Number.isNaN(key) ? '' : key} onChange={(e) => setKey(e.target.valueAsNumber)} />
            <Btn onClick={doIns}>Insert</Btn><Btn onClick={doSearch}>Search</Btn><Btn onClick={doDel}>Delete</Btn>
          </Row>
          <Row>
            {PRESETS.map(([t, ks]) => <Btn key={t} ghost onClick={() => { setKeys(ks); setPath([]); setFound(null); setMsg(`${t} tree loaded.`); }}>{t}</Btn>)}
            <Btn ghost onClick={() => { setKeys([]); setPath([]); setMsg('Empty tree.'); }}>Clear</Btn>
          </Row>
        </>
      ) : (
        <>
          <Tabs value={order} onChange={(v) => { setOrder(v); s.reset(); }} items={[['pre', 'Preorder'], ['in', 'Inorder'], ['post', 'Postorder']]} />
          <Transport s={s} label="Visited" />
        </>
      )}
      <div className="my-2 overflow-x-auto rounded-lg border border-line bg-bg">
        {pos.length === 0 ? <div className="p-6 text-center text-[13px] text-muted">empty tree</div> : (
          <svg viewBox={`0 0 ${vw} ${vh}`} role="img" aria-label="Binary search tree" style={{ width: '100%', maxWidth: vw * 1.4, minWidth: Math.min(vw, 300), display: 'block', margin: '0 auto' }}>
            {pos.map((p) => p.px != null && <line key={'e' + p.k} x1={X(p.px)} y1={Y(p.py!)} x2={X(p.x)} y2={Y(p.y)} stroke={path.includes(p.k) && path.includes(pos.find((q) => q.x === p.px && q.y === p.py)!.k) ? COL.accent : COL.line} strokeWidth={2} />)}
            {pos.map((p) => {
              const onPath = path.includes(p.k), isHit = found === p.k && mode === 'build', vi = visited.indexOf(p.k);
              const fill = isHit ? COL.ok : cur === p.k ? COL.accent : vi >= 0 ? COL.ok : onPath ? COL.accent : COL.s2;
              const faded = vi >= 0 && cur !== p.k;
              return (
                <g key={p.k}>
                  <circle cx={X(p.x)} cy={Y(p.y)} r={19} fill={fill} fillOpacity={fill === COL.s2 ? 1 : faded ? 0.45 : 0.9} stroke={fill === COL.s2 ? COL.line : fill} strokeWidth={2} />
                  <text x={X(p.x)} y={Y(p.y) + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={COL.ink}>{p.k}</text>
                  {vi >= 0 && <text x={X(p.x) + 20} y={Y(p.y) - 14} fontSize={11} fontWeight={700} fill={COL.warn}>{vi + 1}</text>}
                </g>
              );
            })}
          </svg>
        )}
      </div>
      {mode === 'walk' && <Msg live><b>{order === 'pre' ? 'Parent, left, right' : order === 'in' ? 'Left, parent, right (sorted for a BST)' : 'Left, right, parent'}:</b> {visited.join(', ') || 'press Step'}{cur != null && <> · now visiting <b>{cur}</b></>}</Msg>}
      {mode === 'build' && <Msg live>{msg}</Msg>}
      <Stats>
        <Stat k="Nodes" v={n} /><Stat k="Height" v={h} />
        <Stat k="Full" v={isFull(tree) ? 'yes' : 'no'} /><Stat k="Complete" v={isComplete(tree) ? 'yes' : 'no'} /><Stat k="Perfect" v={isPerfect(tree) ? 'yes' : 'no'} />
      </Stats>
      <Row><Key c={COL.accent}>search path / current</Key><Key c={COL.ok}>found / visited</Key></Row>
    </DemoCard>
  );
}
