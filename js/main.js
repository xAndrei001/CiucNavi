(function(){
const mainGrid=document.getElementById('main-grid');
const benchGrid=document.getElementById('bench-grid');
const benchEmpty=document.getElementById('bench-empty');
const heroStats=document.getElementById('hero-stats');
const updatedEl=document.getElementById('stats-updated');
let STATE=null;

const statBox=(l,v)=>(v===undefined||v===null||v===''||v==='-')?'':`<div class='stat'><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`;

function card(p){
  const s=p.stats||{};const l=p.links||{};
  const img=p.icon
    ?`<img src='icons/${encodeURIComponent(p.icon)}' alt='${esc(p.name)}' data-ini='${esc(initials(p.name))}' loading='lazy'>`
    :`<span class='initials'>${esc(initials(p.name))}</span>`;
  const leet=p.steam64?`https://leetify.com/app/profile/${encodeURIComponent(p.steam64)}`:'';
  const links=[
    l.steam?`<a href='${esc(l.steam)}' target='_blank' rel='noopener'>Steam</a>`:'',
    leet?`<a href='${esc(leet)}' target='_blank' rel='noopener'>Leetify</a>`:''
  ].join('');
  return `<article class='card reveal'>
    <div class='card-img'><span class='role'>${esc(p.role)}</span>${img}</div>
    <div class='card-body'>
      <h3 class='card-name'><a class='stretched' href='player.html?p=${slug(p.name)}'>${esc(p.name)}</a></h3>
      <p class='card-real'>${esc(p.tag||'')}</p>
      <div class='card-stats'>${statBox(t('card.premier'),s.premier)}${statBox(t('card.hs'),s.hs)}${statBox(t('card.win'),s.winrate)}</div>
      <div class='card-links'>${links}</div>
      <span class='view'>${t('card.view')}</span>
    </div></article>`;
}

const average=v=>{
  const n=v.map(x=>Number(String(x).replace(/,/g,''))).filter(x=>!isNaN(x)&&x>0);
  return n.length?Math.round(n.reduce((a,b)=>a+b,0)/n.length):null;
};

function render(){
  if(!STATE)return;
  const {main,bench,live}=STATE;
  mainGrid.innerHTML=main.map(card).join('');
  benchGrid.innerHTML=bench.map(card).join('');
  benchEmpty.hidden=bench.length>0;
  const avg=average(main.map(p=>p.stats.premier));
  heroStats.innerHTML=`
    <div class='hero-stat'><strong>${main.length}</strong><span>${t('hero.main')}</span></div>
    <div class='hero-stat'><strong>${bench.length}</strong><span>${t('hero.bench')}</span></div>
    <div class='hero-stat'><strong>${avg?avg.toLocaleString():'-'}</strong><span>${t('hero.avg')}</span></div>`;
  if(live._updated&&updatedEl)updatedEl.textContent=t('updated')+': '+live._updated+'. ';
  fixImages();observeReveals();
}

Promise.all([getJson('data/players.json'),getJson('data/stats.json').catch(()=>({}))]).then(([data,live])=>{
  const players=(data.players||[]).map(p=>{
    const auto=live[p.steam64]||live[p.vanity]||{};
    const {detail,...flat}=auto;
    return {...p,stats:{...(p.stats||{}),...flat}};
  });
  STATE={main:players.filter(p=>p.status==='main'),bench:players.filter(p=>p.status==='bench'),live};
  render();
}).catch(err=>{
  mainGrid.innerHTML=`<p class='empty'>${esc(err.message)}. If testing locally, use a local server (e.g. VS Code Live Server).</p>`;
});
document.addEventListener('langchange',render);
})();
