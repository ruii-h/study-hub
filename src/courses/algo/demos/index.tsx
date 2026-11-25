import { createRoot, type Root } from 'react-dom/client';
import BinarySearch from './BinarySearch';
import SortCompare from './SortCompare';
import IterationLab from './IterationLab';
import RecursionLab from './RecursionLab';
import StackQueueLab from './StackQueueLab';
import TreeLab from './TreeLab';
import GraphTracer from './GraphTracer';
import TspLab from './TspLab';
import BruteForceLab from './BruteForceLab';
import CountingLab from './CountingLab';
import ComplexityLab from './ComplexityLab';
import HeapLab from './HeapLab';
import HashLab from './HashLab';
import PvsNPLab from './PvsNPLab';
import ExerciseLab from './ExerciseLab';
import W11Lab from './W11Lab';
import { initDiagramZoom } from './zoom';
initDiagramZoom();

const DEMOS: Record<string, () => React.JSX.Element> = {
  bsearch: BinarySearch,
  sort: SortCompare,
  graph: () => <GraphTracer ids={['run']} simple />,
  ucs: () => <GraphTracer ids={['uc']} simple />,
  iter: IterationLab,
  recur: RecursionLab,
  stackq: StackQueueLab,
  tree: TreeLab,
  trace9: () => <GraphTracer ids={['run', 'dag']} />,
  mrt: () => <GraphTracer ids={['mrt']} />,
  trace10: () => <GraphTracer ids={['wt']} />,
  tsp: TspLab,
  brute: BruteForceLab,
  count: CountingLab,
  cplx: ComplexityLab,
  heap: HeapLab,
  hash: HashLab,
  pnp: PvsNPLab,
  xlab: () => <ExerciseLab />,
  w11: W11Lab,
};

const roots = new Map<Element, Root>();
const later = (fn: () => void) => setTimeout(fn, 0); // never unmount synchronously from inside another React commit

/** Called by the ALGO engine after each chapter renders: mounts a React root into every new `.demo-slot`, drops roots whose slot is gone. */
export function mountDemos(hosts: Element[]) {
  for (const [el, root] of roots) {
    if (!el.isConnected) { roots.delete(el); later(() => root.unmount()); }
  }
  for (const host of hosts) {
    if (roots.has(host)) continue;
    const Demo = DEMOS[(host as HTMLElement).dataset.demo ?? ''];
    if (!Demo) continue;
    const root = createRoot(host);
    roots.set(host, root);
    root.render(<Demo />);
  }
}

export function disposeDemos() {
  for (const root of roots.values()) later(() => root.unmount());
  roots.clear();
}
