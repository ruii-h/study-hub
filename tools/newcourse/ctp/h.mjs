// Helpers for the IS1704 chapter files: K(src) is a formatted code block for use inside a question stem.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const K = (s) => `<div class="t-code"><div class="t-code-header"><span>python</span></div><div class="t-code-body" tabindex="0">${esc(s.replace(/^\n|\n$/g, ''))}</div></div>`;
