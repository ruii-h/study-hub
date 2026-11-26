// usage: node slides.mjs <file-substring> <n,n,...>  — prints the given slides from the extracted text
import fs from 'node:fs';
const SP = 'C:/Users/RUIHEN~1/AppData/Local/Temp/claude/062b3dc8fd658c53/046e5561-9f9b-4f91-975f-a445f33456ea/scratchpad/slides/';
const f = fs.readdirSync(SP).find((x) => x.includes(process.argv[2]));
const want = new Set((process.argv[3] || '').split(',').filter(Boolean).map(Number));
const parts = fs.readFileSync(SP + f, 'utf8').replace(/\r/g, '').split(/^--- (?:slide|page) (\d+) ---$/m);
for (let i = 1; i < parts.length; i += 2) { const n = +parts[i]; if (!want.size || want.has(n)) console.log(`--- ${n}\n${parts[i + 1].trim().slice(0, +process.argv[4] || 900)}`); }
