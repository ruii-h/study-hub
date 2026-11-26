// Shared builders for the BPAS "Exam Practice" tab (D.mocks in src/courses/bpas/data.json).
// Markup matches what src/guide/Mocks.tsx and src/guide/mcq.ts expect (same cards as the ALGO mocks).
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** tiny inline markup on RAW text: **bold**, *italic*, `code`, ~~ is not used */
export const inl = (s) => {
  const codes = [];
  s = String(s).replace(/`([^`]+)`/g, (m, t) => { codes.push(t); return `@@C${codes.length - 1}@@`; });
  s = esc(s).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, '$1<i>$2</i>');
  return s.replace(/@@C(\d+)@@/g, (m, i) => `<code>${esc(codes[+i])}</code>`);
};
export const p = (s) => `<p>${inl(s)}</p>`;
export const ul = (items) => `<ul>${items.map((x) => `<li>${inl(x)}</li>`).join('')}</ul>`;
export const ol = (items) => `<ol>${items.map((x) => `<li>${inl(x)}</li>`).join('')}</ol>`;
export const table = (head, rows) => `<div class="t-table-wrap" tabindex="0"><table class="t-mini-table"><thead><tr>${head.map((h) => `<th>${inl(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inl(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export const note = (s) => `<div class="warnbox">${inl(s)}</div>`;
export const raw = (s) => s;

/** a Mermaid flowchart drawn as swimlanes (src/guide/swimlane.ts) */
export const swim = (src) => `<pre class="mermaid swim">${esc(src.trim())}</pre>`;

/** one written question with a "Show answer" fold */
export function written(chip, title, q, a, label = 'Show answer') {
  return `<div class="exr reveal"><div class="exr-head"><span class="cf-tag">${esc(chip)}</span><h4>${inl(title)}</h4></div><div class="exr-q"><div>${q}</div></div><details class="model"><summary>${label}</summary><div class="ma">${a}</div></details></div>`;
}

/** one multiple-choice question: options o (raw text), answers like 'AC', why[] = one reason per option */
export function mcq(chip, title, stem, o, ans, expl, why, multi = true) {
  const L = 'ABCDEFGHIJKL';
  const ci = ans.split('').map((c) => L.indexOf(c));
  if (why && why.length !== o.length) throw new Error(`why length ${why.length} vs ${o.length}: ${title}`);
  const opts = o.map((x, i) => {
    const w = why && why[i];
    return `<div class="mcq-o"><label class="eo"><input type="checkbox"><i>${L[i]}.</i><span>${inl(x)}</span></label>${w ? `<div class="why ${ci.includes(i) ? 'wy' : 'wn'}" hidden><b>${ci.includes(i) ? 'Why this is right' : 'Why this is wrong'}:</b> ${inl(w)}</div>` : ''}</div>`;
  }).join('');
  const body = `<div class="mcq" data-ans="${ci.join(',')}" data-multi="${multi ? 1 : 0}">${stem}<div class="qh"><span class="ms">${multi ? 'SELECT ALL THAT APPLY' : 'CHOOSE THE BEST ANSWER'}</span></div>`
    + `<div role="group" aria-label="Answer options">${opts}</div>`
    + `<div class="row"><button type="button" class="btn mcq-check" disabled>Check answer</button></div>`
    + `<div class="verdict mcq-verdict" hidden><div class="mcq-head"></div><div class="mcq-expl">${expl ? inl(expl) : ''}</div><div class="row"><button type="button" class="btn ghost mcq-retry">↺ Try again</button></div></div></div>`;
  return `<div class="exr reveal"><div class="exr-head"><span class="cf-tag">${esc(chip)}</span><h4>${inl(title)}</h4></div><div class="exr-q"><div>${body}</div></div></div>`;
}

let secN = 0;
export const section = (title, cards) => `<div class="t-section" id="bx${secN++}" data-gen="1"><div role="heading" aria-level="2" class="t-h2">${inl(title)}</div>${cards.join('')}</div>`;

// ---------------------------------------------------------------- SVG helpers
const FONT = 'font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif"';
const wrapTxt = (s, n) => { const out = []; let cur = ''; String(s).split(/\s+/).forEach((w) => { if (cur && (cur + ' ' + w).length > n) { out.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w; }); if (cur) out.push(cur); return out; };
const tspans = (lines, x, y0, lh) => lines.map((l, i) => `<tspan x="${x}" y="${y0 + i * lh}">${esc(l)}</tspan>`).join('');
const svgWrap = (w, h, inner, label) => `<div class="t-table-wrap" tabindex="0"><svg viewBox="0 0 ${w} ${h}" width="${w}" style="max-width:100%;height:auto;color:var(--text,#222)" role="img" aria-label="${esc(label)}" ${FONT}>${inner}</svg></div>`;

function stick(x, y, name) {
  return `<g stroke="currentColor" stroke-width="1.5" fill="none"><circle cx="${x}" cy="${y - 22}" r="8" fill="var(--surface,#fff)"/><line x1="${x}" y1="${y - 14}" x2="${x}" y2="${y + 8}"/><line x1="${x - 13}" y1="${y - 6}" x2="${x + 13}" y2="${y - 6}"/><line x1="${x}" y1="${y + 8}" x2="${x - 10}" y2="${y + 24}"/><line x1="${x}" y1="${y + 8}" x2="${x + 10}" y2="${y + 24}"/></g>`
    + `<text x="${x}" y="${y + 40}" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">${esc(name)}</text>`;
}

/** Use case diagram. boundaries: [{title, ucs:[{id,label}]}] stacked top to bottom; left / right: [{name, to:[ids]}]. */
export function ucSvg({ boundaries, left = [], right = [], label = 'Use case diagram' }) {
  const W = 760, BX = 170, BW = W - 340, CX = BX + BW / 2, OW = 232, OH = 40, GAP = 54;
  let y = 12; const pos = {}; let boxes = '', ovals = '';
  boundaries.forEach((b) => {
    const h = 34 + b.ucs.length * GAP;
    boxes += `<rect x="${BX}" y="${y}" width="${BW}" height="${h}" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="${BX + 10}" y="${y + 20}" font-size="12.5" font-weight="700" fill="currentColor">${esc(b.title)}</text>`;
    b.ucs.forEach((u, i) => {
      const cy = y + 34 + i * GAP + 12;
      pos[u.id] = { x: CX, y: cy };
      const L = wrapTxt(u.label, 30);
      ovals += `<ellipse cx="${CX}" cy="${cy}" rx="${OW / 2}" ry="${OH / 2}" fill="var(--surface,#fff)" stroke="currentColor" stroke-width="1.2"/><text text-anchor="middle" font-size="12" fill="currentColor">${tspans(L, CX, cy + 4 - (L.length - 1) * 7, 14)}</text>`;
    });
    y += h + 14;
  });
  const H = y + 4;
  const place = (acts, side) => {
    let lines = '', figs = ''; let lastY = -999;
    acts.map((a) => ({ a, y: a.to.reduce((s, id) => s + pos[id].y, 0) / a.to.length })).sort((m, n) => m.y - n.y).forEach(({ a, y: ay }) => {
      let yy = Math.max(ay, lastY + 78); lastY = yy;
      const ax = side === 'L' ? 70 : W - 70;
      a.to.forEach((id) => { const o = pos[id]; if (!o) throw new Error('uc id ' + id); lines += `<line x1="${ax + (side === 'L' ? 14 : -14)}" y1="${yy - 6}" x2="${o.x + (side === 'L' ? -OW / 2 : OW / 2)}" y2="${o.y}" stroke="currentColor" stroke-width="1" opacity=".75"/>`; });
      figs += stick(ax, yy, a.name);
    });
    return { lines, figs };
  };
  const l = place(left, 'L'), r = place(right, 'R');
  const H2 = Math.max(H, 40 + 78 * Math.max(left.length, right.length));
  return svgWrap(W, H2, `${boxes}${l.lines}${r.lines}${ovals}${l.figs}${r.figs}`, label);
}

/** C4 context diagram. nodes [{id,x,y,w,h,kind:'person'|'sys'|'ext',name,type,desc}], edges [{a,b,label,dx,dy}] */
export function c4Svg({ w = 760, h = 420, nodes, edges, label = 'C4 context diagram' }) {
  const fill = { person: '#08427b', sys: '#1168bd', ext: '#6b6b6b' };
  const N = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const edge = (n, tx, ty) => { // point on n's rectangle towards (tx,ty)
    const cx = n.x + n.w / 2, cy = n.y + n.h / 2, dx = tx - cx, dy = ty - cy;
    const k = Math.min((n.w / 2) / Math.abs(dx || 1e-9), (n.h / 2) / Math.abs(dy || 1e-9));
    return [cx + dx * k, cy + dy * k];
  };
  let s = `<defs><marker id="c4a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>`;
  edges.forEach((e) => {
    const a = N[e.a], b = N[e.b];
    const [x1, y1] = edge(a, b.x + b.w / 2, b.y + b.h / 2), [x2, y2] = edge(b, a.x + a.w / 2, a.y + a.h / 2);
    s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5 3" marker-end="url(#c4a)"/>`;
  });
  nodes.forEach((n) => {
    s += `<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="${n.kind === 'person' ? 14 : 5}" fill="${fill[n.kind]}"/>`;
    const L = [{ t: n.name, b: 1, f: 13 }, { t: `[${n.type}]`, b: 0, f: 10.5 }, ...wrapTxt(n.desc || '', Math.floor(n.w / 5.7)).map((t) => ({ t, b: 0, f: 10.5 }))];
    const lh = 14, y0 = n.y + n.h / 2 - (L.length * lh) / 2 + 11;
    s += `<text text-anchor="middle" fill="#fff">${L.map((l, i) => `<tspan x="${n.x + n.w / 2}" y="${y0 + i * lh}" font-size="${l.f}" font-weight="${l.b ? 700 : 400}">${esc(l.t)}</tspan>`).join('')}</text>`;
  });
  edges.forEach((e) => {
    const a = N[e.a], b = N[e.b];
    const mx = (a.x + a.w / 2 + b.x + b.w / 2) / 2 + (e.dx || 0), my = (a.y + a.h / 2 + b.y + b.h / 2) / 2 + (e.dy || 0);
    const L = wrapTxt(e.label, 20), bw = Math.max(...L.map((x) => x.length)) * 5.6 + 10, bh = L.length * 13 + 6;
    s += `<rect x="${(mx - bw / 2).toFixed(1)}" y="${(my - bh / 2).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh}" rx="3" fill="var(--surface,#fff)" opacity=".92"/><text text-anchor="middle" font-size="10.5" fill="currentColor">${tspans(L, mx.toFixed(1), my - (L.length - 1) * 6.5 + 3.5, 13)}</text>`;
  });
  return svgWrap(w, h, s, label);
}

/** Gassmann magic triangle. each corner: lines[] shown beside it */
export function gzSvg({ what = [], how = [], value = [], who = [], label = 'Gassmann triangle' }) {
  const W = 780, H = 500;
  const blk = (lines, x, y, anchor, width) => `<text font-size="11.5" fill="currentColor" text-anchor="${anchor}">${lines.flatMap((l) => wrapTxt(l, width)).map((t, i) => `<tspan x="${x}" y="${y + i * 14}">${esc(t)}</tspan>`).join('')}</text>`;
  const A = [390, 130], B = [140, 372], C = [640, 372];
  let s = `<polygon points="${A} ${B} ${C}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  [A, B, C].forEach((v) => { s += `<line x1="${v[0]}" y1="${v[1]}" x2="390" y2="285" stroke="currentColor" stroke-width="1.2"/>`; });
  s += `<circle cx="390" cy="285" r="36" fill="var(--surface,#fff)" stroke="currentColor" stroke-width="1.6"/><text x="390" y="283" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">WHO?</text><text x="390" y="297" text-anchor="middle" font-size="9.5" fill="currentColor">customer</text>`;
  s += `<text x="390" y="22" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">WHAT? · value proposition (product)</text>${blk(what, 390, 42, 'middle', 80)}`;
  s += `<text x="20" y="400" font-size="14" font-weight="700" fill="currentColor">HOW? · value chain (process)</text>${blk(how, 20, 420, 'start', 46)}`;
  s += `<text x="760" y="400" text-anchor="end" font-size="14" font-weight="700" fill="currentColor">VALUE? · revenue model</text>${blk(value, 760, 420, 'end', 46)}`;
  if (who.length) s += `<text x="390" y="338" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">Who (customer segment):</text>${blk(who, 390, 352, 'middle', 38)}`;
  return svgWrap(W, H, s, label);
}
