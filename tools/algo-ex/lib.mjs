// Helpers for writing ALGO tutorial / in-class exercise content as data, rendered to the guide's own HTML classes.
export const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** Inline code: c`a < b` -> <code>a &lt; b</code> */
export const c = (s, ...v) => `<code>${esc(String.raw({ raw: s }, ...v))}</code>`;
export const k = (t) => `<strong class="k-c">${t}</strong>`;

// ---- blocks used inside "Show full working" ----
export const ask = (t) => `<p><b>What the question is really asking.</b> ${t}</p>`;
export const theory = (t) => `<p><b>Theory used.</b> ${t}</p>`;
export const step = (n, t) => `<p><b>Step ${n}.</b> ${t}</p>`;
export const p = (t) => `<p>${t}</p>`;
export const check = (t) => `<p class="chk"><b>Check.</b> ${t}</p>`;
export const slip = (t) => `<p class="slip"><b>Common slip.</b> ${t}</p>`;
export const why = (t) => `<p><b>Why it works.</b> ${t}</p>`;
export const code = (t, lang = 'python') => `<div class="t-code"><div class="t-code-header"><span>${lang}</span></div><div class="t-code-body" tabindex="0">${esc(t)}</div></div>`;
export const ul = (items) => `<ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul>`;
export const ol = (items) => `<ol>${items.map((x) => `<li>${x}</li>`).join('')}</ol>`;
/** Small table: rows is an array of arrays; first row is the header. */
export const table = (rows) => `<div class="t-table-wrap" tabindex="0"><table class="t-mini-table"><thead><tr>${rows[0].map((x) => `<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map((r) => `<tr>${r.map((x) => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

/**
 * One exercise card.
 * chip: text of the chip tag (shown like the "WORKED EXAMPLE" tags), title: short subheader,
 * q: question html, ans: the short answer html, work: array of html blocks (step-by-step explanation).
 */
export function ex({ chip, title, q, ans, work }) {
  return `<div class="exr reveal"><div class="exr-head"><span class="cf-tag">${chip}</span><h4>${title}</h4></div><div class="exr-q"><div>${q}</div></div>`
    + `<details class="model"><summary>Show answer</summary><div class="ma">${ans}</div></details>`
    + `<details class="model"><summary>Show full working: how the theory gives the answer</summary><div class="ma">${work.join('')}</div></details></div>`;
}

export const section = ({ id, heading, sub, items }) =>
  `<div class="t-section" id="${id}" data-gen="1"><div role="heading" aria-level="2" class="t-h2">${heading}</div><div class="sub">${sub}</div>${items.join('')}</div>`;
