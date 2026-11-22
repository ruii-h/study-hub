// ---------- past exam: "No solutions" / "Show solutions" mode
function solSwitch(){return `<label class="switch"><span>Show solutions</span><input type="checkbox" role="switch" ${ST.psol?'checked':''} onchange="setPsol(this.checked)"><i></i></label>`}
function setPsol(v){ST.psol=v?1:0;sv();renderPast(pastSec)}
function applySol(a,b){const m=$('#pastm');const sol=!!ST.psol;
 m.querySelectorAll('details.model').forEach(d=>{if(sol){d.open=true;d.style.display=''}else{d.open=false;d.style.display='none'}});
 if(!sol)return;
 D.exam.mcq.filter(q=>q.n>=a&&q.n<=b).forEach(q=>{const box=$('#pq'+q.n);if(!box)return;
  box.querySelectorAll('.eo').forEach((l,j)=>{l.querySelector('input').disabled=true;if(q.a.includes('ABCDE'[j]))l.classList.add('right')});
  const bt=$('#pb'+q.n);if(bt)bt.style.display='none';
  $('#pv'+q.n).innerHTML=`<div class="verdict ok"><b>Solution:</b> <b>${q.a.split('').join(', ')}</b>. ${q.e}</div>`})}
