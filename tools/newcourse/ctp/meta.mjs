import m1 from './m1.mjs';
import m2 from './m2.mjs';
import m3 from './m3.mjs';
import { fill } from './fill.mjs';
export const metaAll = { ...m1, ...m2, ...m3 };
for (const [n, f] of Object.entries(fill)) metaAll[n].fill = f;
