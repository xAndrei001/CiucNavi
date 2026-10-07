(function(){
function boot(){
Object.assign(I18N.en,{'card.premierC':`CS rating`,'card.hsC':`Headshot accuracy`,'card.winC':`Match win rate`,'card.matches':`Matches`,'card.matchesC':`Played in total`});
Object.assign(I18N.ro,{'card.premierC':`Rating CS`,'card.hsC':`Precizie headshot`,'card.winC':`Rată de victorii`,'card.matches':`Meciuri`,'card.matchesC':`Jucate în total`});
Object.assign(I18N.hu,{'card.premierC':`CS értékelés`,'card.hsC':`Fejlövés pontosság`,'card.winC':`Győzelmi arány`,'card.matches':`Meccsek`,'card.matchesC':`Összes lejátszott`});
const mainGrid=document.getElementById('main-grid');
const benchGrid=document.getElementById('bench-grid');
const benchEmpty=document.getElementById('bench-empty');
const heroStats=document.getElementById('hero-stats');
const updatedEl=document.getElementById('stats-updated');
let STATE=null;

const statBox=(l,v,c)=>(v===undefined||v===null||v===''||v==='-')?'':`<div class='stat'><strong>${esc(typeof v==='number'?v.toLocaleString():v)}</strong><span>${esc(l)}</span><em>${esc(c||'')}</em></div>`;

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
      <div class='card-stats'>${statBox(t('card.premier'),s.premier,t('card.premierC'))}${statBox(t('card.hs'),s.hs,t('card.hsC'))}${statBox(t('card.win'),s.winrate,t('card.winC'))}${statBox(t('card.matches'),s.matches,t('card.matchesC'))}</div>
      <div class='card-links'>${links}</div>
      <span class='view'>${t('card.view')}</span>
    </div></article>`;
}

const average=v=>{
  const n=v.map(x=>Number(String(x).replace(/,/g,''))).filter(x=>!isNaN(x)&&x>0);
  return n.length?Math.round(n.reduce((a,b)=>a+b,0)/n.length):null;
};

function dashHTML(){
  const C=window.Charts;
  if(!C)return '';
  const rows=STATE.main.map((p,i)=>({p,i,col:C.PLC[i%C.PLC.length],prem:C.num(p.stats.premier),hs:C.num(p.stats.hs),win:C.num(p.stats.winrate),m:C.num(p.stats.matches),axes:C.profileAxes(p.detail),recent:(p.detail||{}).recent||[]}));
  if(!rows.some(r=>r.prem||r.hs||r.win))return `<p class='note'>${t('dash.nodata')}</p>`;
  const avg=f=>{const v=rows.map(f).filter(x=>x!=null&&x>0);return v.length?v.reduce((a,b)=>a+b,0)/v.length:null};
  const ap=avg(r=>r.prem),ah=avg(r=>r.hs),aw=avg(r=>r.win);
  const tm=rows.reduce((a,r)=>a+(r.m||0),0);
  const kpi=(v,l)=>v==null?'':`<div class='kpi reveal'><strong>${v}</strong><span>${l}</span></div>`;
  let h=`<div class='kpis'>${kpi(ap?Math.round(ap).toLocaleString():null,t('dash.avgPremier'))}${kpi(ah?ah.toFixed(1)+'%':null,t('dash.avgHs'))}${kpi(aw?aw.toFixed(1)+'%':null,t('dash.avgWin'))}${kpi(tm?tm.toLocaleString():null,t('dash.matches'))}</div><div class='dash-grid'>`;
  const pr=rows.filter(r=>r.prem);
  if(pr.length){
    const mx=Math.max(...pr.map(r=>r.prem))*1.15;
    h+=`<div class='panel reveal'><h3>${t('dash.premierChart')}</h3>${C.columns(pr.map(r=>({name:r.p.name,value:r.prem,text:Math.round(r.prem).toLocaleString()})),mx)}</div>`;
  }
  const hr=rows.filter(r=>r.hs);
  if(hr.length){
    const mx=Math.max(50,Math.max(...hr.map(r=>r.hs))*1.2);
    h+=`<div class='panel reveal'><h3>${t('dash.hsChart')}</h3>${C.meters(hr.map(r=>({label:r.p.name,value:r.hs,text:r.hs.toFixed(1)+'%',color:r.col})),mx)}</div>`;
  }
  const wr=rows.filter(r=>r.win);
  if(wr.length){
    h+=`<div class='panel reveal'><h3>${t('dash.winChart')}</h3>${C.meters(wr.map(r=>({label:r.p.name,value:r.win,text:r.win.toFixed(1)+'%',color:r.col})),100)}</div>`;
  }
  let keys=[];
  rows.forEach(r=>r.axes.forEach(a=>{if(!keys.some(k=>k.key===a.key))keys.push({key:a.key,label:a.label})}));
  keys=C.orderAxes(keys);
  if(keys.length>=3){
    const series=[];const leg=[];
    rows.forEach(r=>{
      if(r.axes.length){
        const v={};r.axes.forEach(a=>{v[a.key]=a.value});
        series.push({color:r.col,fill:.06,w:1.8,values:v});leg.push({color:r.col,name:r.p.name});
      }
    });
    const tv={};
    keys.forEach(k=>{
      const vals=rows.map(r=>{const a=r.axes.find(x=>x.key===k.key);return a?a.value:null}).filter(x=>x!=null);
      if(vals.length)tv[k.key]=vals.reduce((a,b)=>a+b,0)/vals.length;
    });
    series.push({color:'#ffffff',fill:.1,w:2.8,dash:'7 5',values:tv});
    leg.push({color:'#ffffff',name:t('dash.radarTeam')});
    h+=`<div class='panel reveal'><h3>${t('dash.radar')}</h3>${C.radar(keys,series)}${C.legend(leg)}</div>`;
  }
  const all=[];rows.forEach(r=>r.recent.forEach(x=>all.push(x)));
  const mr=C.mapRows(all).filter(x=>x.n>=3).sort((a,b)=>b.wr-a.wr||b.n-a.n);
  if(mr.length){
    const best=mr[0],worst=mr[mr.length-1];
    const co=(cls,lab,r)=>`<div class='co ${cls}'><span>${lab}</span><strong>${esc(C.mapName(r.map))}</strong><em>${r.wr.toFixed(0)}%</em></div>`;
    h+=`<div class='panel wide reveal'><h3>${t('dash.maps')}</h3><div class='callouts'>${co('good',t('dash.best'),best)}${mr.length>1?co('bad',t('dash.worst'),worst):''}</div>${C.mapMeters(mr)}<p class='note' style='margin-top:14px'>${t('dash.mapsNote')}</p></div>`;
  }else{
    h+=`<div class='panel wide reveal'><h3>${t('dash.maps')}</h3><p class='note'>${t('dash.nomaps')}</p></div>`;
  }
  return h+'</div>';
}

function renderDash(){
  let d=document.getElementById('dashboard');
  if(!d){
    d=document.createElement('section');d.className='section';d.id='dashboard';
    document.getElementById('roster').before(d);
    const nl=document.querySelector(`.nav-links a[href='#roster']`);
    if(nl){const a=document.createElement('a');a.href='#dashboard';a.id='nav-dash';nl.before(a)}
  }
  const na=document.getElementById('nav-dash');
  if(na)na.textContent=t('nav.dashboard');
  d.innerHTML=`<h2 class='section-title reveal'>${t('dash.title').replace(/~(.+?)~/g,'<span class=yellow>$1</span>')}</h2>`+dashHTML();
}

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
  renderDash();
  fixImages();observeReveals();
}

Promise.all([getJson('data/players.json'),getJson('data/stats.json').catch(()=>({}))]).then(([data,live])=>{
  const players=(data.players||[]).map(p=>{
    const auto=live[p.steam64]||live[p.vanity]||{};
    const {detail,...flat}=auto;
    return {...p,detail:detail||null,stats:{...(p.stats||{}),...flat}};
  });
  STATE={main:players.filter(p=>p.status==='main'),bench:players.filter(p=>p.status==='bench'),live};
  render();
}).catch(err=>{
  mainGrid.innerHTML=`<p class='empty'>${esc(err.message)}. If testing locally, use a local server (e.g. VS Code Live Server).</p>`;
});
document.addEventListener('langchange',render);
}
if(window.Charts){boot()}else{
  const s=document.createElement('script');s.src='js/charts.js';s.onload=boot;s.onerror=boot;document.head.appendChild(s);
}
})();
