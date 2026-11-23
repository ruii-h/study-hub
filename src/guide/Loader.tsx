import { motion } from 'framer-motion';
import { fade } from './motion';

/** Shown while a big chapter (e.g. a code-archive file list) is being laid out, so the page never looks frozen. */
export function ChapterLoader({ label = 'Loading chapter…' }: { label?: string }) {
  return (
    <motion.div className="ld" role="status" aria-live="polite" {...fade}>
      <div className="ld-row"><i className="ld-ring" aria-hidden="true" /><span>{label}</span></div>
      <div className="ld-sk" aria-hidden="true"><b style={{ width: '38%' }} /><b style={{ width: '92%' }} /><b style={{ width: '78%' }} /><b style={{ width: '86%' }} /><b style={{ width: '54%' }} /></div>
    </motion.div>
  );
}
