let LANG=localStorage.getItem('lang')||'en';
if(!I18N[LANG])LANG='en';
const t=k=>(I18N[LANG]&&I18N[LANG][k])||I18N.en[k]||k;
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&#39;');
const slug=n=>String(n).toLowerCase().replace(/[^a-z0-9]/g,'');
const initials=n=>String(n).replace(/[^a-zA-Z0-9 ]/g,'').split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase()||'?';
const numOf=v=>Number(String(v).replace(/[^0-9.\-]/g,''));
const tierOf=n=>n>=30000?6:n>=25000?5:n>=20000?4:n>=15000?3:n>=10000?2:n>=5000?1:0;
const getJson=u=>fetch(u,{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error('Could not load '+u);return r.json()});

function applyLang(){
  document.documentElement.lang=LANG;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    el.innerHTML=t(el.dataset.i18n).replace(/~(.+?)~/g,'<span class=yellow>$1</span>');
  });
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===LANG));
  if(document.body.dataset.title)document.title=t(document.body.dataset.title);
  document.dispatchEvent(new Event('langchange'));
}
document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>{
  LANG=b.dataset.lang;localStorage.setItem('lang',LANG);applyLang();
}));

const revealObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revealObs.unobserve(e.target)}}),{threshold:.12});
function observeReveals(){document.querySelectorAll('.reveal:not(.in)').forEach(el=>revealObs.observe(el))}
function fixImages(){
  document.querySelectorAll('img[data-ini]').forEach(i=>i.addEventListener('error',()=>{
    const s=document.createElement('span');s.className='initials';s.textContent=i.dataset.ini;i.replaceWith(s);
  },{once:true}));
}

window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const p=document.getElementById('progress');
  if(p)p.style.width=(h.scrollTop/Math.max(1,h.scrollHeight-h.clientHeight)*100)+'%';
},{passive:true});

(function snow(){
  const c=document.getElementById('snow');
  if(!c||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const x=c.getContext('2d');let w,h,f=[];
  const size=()=>{w=c.width=innerWidth;h=c.height=innerHeight};
  size();addEventListener('resize',size);
  for(let i=0;i<70;i++)f.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2+.6,s:Math.random()*.7+.25,d:Math.random()*Math.PI*2});
  let raf;
  function tick(){
    x.clearRect(0,0,w,h);x.fillStyle='rgba(255,255,255,.55)';
    f.forEach(p=>{
      p.y+=p.s;p.d+=.01;p.x+=Math.sin(p.d)*.35;
      if(p.y>h){p.y=-5;p.x=Math.random()*w}
      x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill();
    });
    raf=requestAnimationFrame(tick);
  }
  document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(raf);if(!document.hidden)tick()});
  tick();
})();

const yearEl=document.getElementById('year');
if(yearEl)yearEl.textContent=new Date().getFullYear();
const footerEl=document.querySelector('.footer');
if(footerEl){
  const cr=document.createElement('p');
  cr.innerHTML='Data Provided by <a href="https://leetify.com" target="_blank" rel="noopener" class="credit-link">Leetify</a>';
  footerEl.appendChild(cr);
}
const toTop=document.createElement('button');
toTop.type='button';toTop.className='to-top';toTop.textContent='↑';
toTop.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
document.body.appendChild(toTop);
const syncTop=()=>{toTop.classList.toggle('show',scrollY>700)};
addEventListener('scroll',syncTop,{passive:true});
document.addEventListener('langchange',()=>{toTop.setAttribute('aria-label',t('totop'))});
syncTop();
applyLang();
observeReveals();
