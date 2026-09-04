const toggle=document.getElementById('menuToggle');
const nav=document.getElementById('nav');

toggle?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
});

nav?.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click',()=>{
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
  });
});

document.getElementById('year').textContent=new Date().getFullYear();

document.querySelectorAll('.clickable-service').forEach(card=>{
 const openBooking=()=>{card.classList.add('card-selected');setTimeout(()=>{window.location.href=card.dataset.booking||'booking.html'},220)};
 card.addEventListener('click',e=>{if(e.target.closest('a')){card.classList.add('card-selected');return}openBooking()});
 card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openBooking()}});
});

function setupComparison(compare){
  const range=compare.querySelector('.compare-range');
  const after=compare.querySelector('.compare-after-wrap');
  const line=compare.querySelector('.compare-line');
  const handle=compare.querySelector('.compare-handle');
  if(!range||!after) return;
  const update=()=>{
    const v=Number(range.value);
    after.style.clipPath=`inset(0 0 0 ${v}%)`;
    line.style.left=`${v}%`;
    handle.style.left=`${v}%`;
  };
  range.addEventListener('input',update);
  update();
}
document.querySelectorAll('[data-compare]').forEach(setupComparison);

document.querySelectorAll('.full-tab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const card=btn.closest('.full-result');
    card.querySelectorAll('.full-tab').forEach(b=>b.classList.toggle('active',b===btn));
    card.querySelectorAll('[data-full-panel]').forEach(panel=>{
      panel.classList.toggle('active',panel.dataset.fullPanel===btn.dataset.fullTab);
    });
  });
});
