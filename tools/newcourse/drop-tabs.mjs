// Removes the Final Exam tab (a random repeat of the practice questions) from a guide's engine + shell, and optionally the Cheat-sheet tab.
// Usage: node tools/newcourse/drop-tabs.mjs <course id>... (also called by build.mjs)
import fs from 'node:fs';
import path from 'node:path';

export function dropTabs(eng, shell, { cheat = false } = {}) {
  const gone = ['exam', ...(cheat ? ['cheat'] : [])];
  for (const t of gone) {
    shell = shell.replace(new RegExp(` *<button class="tab"[^\n]*data-t="${t}"[^\n]*</button>\n`), '').replace(new RegExp(`<div class="tab-view" id="tab-${t}"[^\n]*</div>\n`), '');
    eng = eng.replace(new RegExp(`,'${t}'`), '');
  }
  eng = eng.replace("if(t=='exam')renderExamHome();", '').replace(/if\(t=='cheat'\)renderCheat\(\);/, cheat ? '' : "if(t=='cheat')renderCheat();");
  eng = eng.replace("onclick=\"switchTab('exam')\"><small>You finished the course notes</small>Take the Final Exam →", "onclick=\"switchTab('practice')\"><small>You finished the course notes</small>Go to the practice questions →");
  eng = eng.replace(/onclick="switchTab\('exam'\)">Take the Final Exam( →)?<\/button>/g, (m, a) => `onclick="switchTab('practice')">Go to the practice questions${a || ''}</button>`);
  eng = eng.replace(/else if\(\/\^\[1-\d\]\$\/\.test\(e\.key\)\)\{switchTab\(TABS\[\+e\.key-1\]\)\}/, 'else if(/^[1-9]$/.test(e.key)&&TABS[+e.key-1]){switchTab(TABS[+e.key-1])}');
  const n = (shell.match(/<button class="tab"/g) || []).length;
  shell = shell.replace(/<kbd>1<\/kbd>–<kbd>\d<\/kbd>/, `<kbd>1</kbd>–<kbd>${n}</kbd>`).replace(/Jump to a tab \([^)]*\)/, 'Jump to a tab');
  return { eng, shell };
}

if (process.argv[1] && process.argv[1].endsWith('drop-tabs.mjs')) {
  const root = path.resolve(import.meta.dirname, '..', '..');
  for (const id of process.argv.slice(2)) {
    const d = path.join(root, 'src', 'courses', id);
    const r = dropTabs(fs.readFileSync(path.join(d, 'engine.js'), 'utf8'), fs.readFileSync(path.join(d, 'shell.html'), 'utf8'), { cheat: id === 'ctp' });
    fs.writeFileSync(path.join(d, 'engine.js'), r.eng); fs.writeFileSync(path.join(d, 'shell.html'), r.shell);
    console.log(id, 'tabs left', (r.shell.match(/<button class="tab"/g) || []).length);
  }
}
