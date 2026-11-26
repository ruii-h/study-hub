// npm on Windows drops the optional wasm32 @emnapi packages from package-lock.json, and then `npm ci` fails on the Linux runner
// ("Missing: @emnapi/core@2.0.0-beta.2 from lock file"). Run this after any `npm install` that touched the lockfile:
//   node tools/fix-lock-emnapi.mjs
// It copies the missing node_modules/@emnapi/* entries from the commit that last had them (605768c).
import fs from 'fs';
import { execFileSync } from 'child_process';

const F = 'package-lock.json';
const cur = JSON.parse(fs.readFileSync(F, 'utf8'));
const old = JSON.parse(execFileSync('git', ['show', '605768c:package-lock.json'], { encoding: 'utf8', maxBuffer: 1 << 26 }));
let added = 0;
for (const k of Object.keys(old.packages)) {
  if (!/^node_modules\/@emnapi\//.test(k)) continue;
  if (cur.packages[k]) continue;
  cur.packages[k] = old.packages[k];
  added++;
  console.log('added', k, old.packages[k].version);
}
// keep npm's key order (alphabetical by path)
const sorted = {};
for (const k of Object.keys(cur.packages).sort((a, b) => (a === '' ? -1 : b === '' ? 1 : a.localeCompare(b, 'en')))) sorted[k] = cur.packages[k];
cur.packages = sorted;
fs.writeFileSync(F, JSON.stringify(cur, null, 2) + '\n');
console.log(added ? 'lockfile fixed' : 'nothing to add');
