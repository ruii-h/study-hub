// One-off: flashcard fixes (hover lift no longer cancels the turn, no double flip on "Mark as known", consistent tap wording).
import fs from 'node:fs';

const OLD_FLIP = "function flip(i){const el=$('#c'+i),c=D.cards[i];el.classList.add('flipping');setTimeout(()=>{";
const NEW_FLIP = "function flip(i){const el=$('#c'+i),c=D.cards[i];if(!el||el.dataset.busy)return;el.dataset.busy='1';el.classList.add('flipping');setTimeout(()=>{";
const OLD_END = "el.classList.remove('flipping')},180)}";
const NEW_END = "el.classList.remove('flipping');el.removeAttribute('data-busy')},180)}";
const OLD_MARK = "function mark(i){K[i]=K[i]?0:1;sv();$('#c'+i).classList.toggle('known',!!K[i]);flip(i);setTimeout(()=>{flip(i);$('#fcount').textContent=`${$$('.bp-card').length} cards · ${Object.values(K).filter(Boolean).length} of ${D.cards.length} known`},420)}";
const NEW_MARK = "function mark(i){K[i]=K[i]?0:1;sv();const el=$('#c'+i);el.classList.toggle('known',!!K[i]);const b=el.querySelector('button');if(b)b.textContent=K[i]?'✓ Known (undo)':'Mark as known';$('#fcount').textContent=`${$$('.bp-card').length} cards · ${Object.values(K).filter(Boolean).length} of ${D.cards.length} known`}";
const CSS = `
/* ---- flashcards: a hover lift must never cancel the turn (hover rules above have the same specificity as the flip rules) ---- */
.fcard.flip .fi,.fcard.flip:hover .fi{transform:rotateY(180deg)}
.bp-card.flipping,.bp-card.flipping:hover{transform:scaleX(0)}
.fcard,.bp-card{touch-action:manipulation}
`;

for (const id of ['algo', 'bpas', 'idp']) {
  const f = `src/courses/${id}/engine.js`;
  let s = fs.readFileSync(f, 'utf8');
  const pairs = [
    [OLD_FLIP, NEW_FLIP],
    [OLD_END, NEW_END],
    [OLD_MARK, NEW_MARK],
    ['Click to reveal the definition…', 'Tap to reveal the definition…'],
    ['then click or press Enter to flip', 'then tap, click or press Enter to flip'],
  ];
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(id + ': ' + a.slice(0, 40));
    s = s.replace(a, () => b);
  }
  fs.writeFileSync(f, s);
  fs.appendFileSync(`src/courses/${id}/style.css`, CSS);
  const d = `src/courses/${id}/data.json`;
  let j = fs.readFileSync(d, 'utf8');
  j = j.split('Say the answer out loud first, then click the card').join('Say the answer out loud first, then tap the card');
  fs.writeFileSync(d, j);
  console.log(id, 'ok');
}
