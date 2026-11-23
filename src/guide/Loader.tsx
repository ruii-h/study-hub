import { motion } from 'framer-motion';
import { fade } from './motion';

/** Grey placeholder bars and boxes shown until a big chapter is completely in (text, code colours, fonts, images). */
export function ChapterLoader() {
  const line = (w: string, k: number) => <b key={k} className="sk-l" style={{ width: w }} />;
  const block = (k: number) => (
    <div className="sk-sec" key={k}>
      <b className="sk-h" style={{ width: k % 2 ? '44%' : '58%' }} />
      {[96, 90, 72].map((w, i) => line(w + '%', i))}
      <div className="sk-box" style={{ height: 150 + (k % 3) * 40 }} />
      {[94, 60].map((w, i) => line(w + '%', i + 5))}
    </div>);
  return (
    <motion.div className="sk" role="status" aria-label="Loading chapter" aria-live="polite" {...fade}>
      <span className="sr-only">Loading chapter…</span>
      <div className="sk-chips"><b /><b /><b /><b /></div>
      {[0, 1, 2].map(block)}
    </motion.div>
  );
}
