(function(){


const L=o=>(o&&typeof o==='object')?(o[LANG]||o.en||''):(o==null?'':o);
const imgTag=d=>d.icon?`<img src='img/players/${encodeURIComponent(d.icon)}' width='600' height='600' alt='${esc(d.name)}' data-ini='${esc(initials(d.name))}'>`:`<span class='initials'>${esc(initials(d.name))}</span>`;
const funTiles=d=>(d.fun||[]).map(f=>`<div class='fs'><strong>${esc(f.v)}</strong><span>${esc(L(f.l))}</span><em>${esc(L(f.c))}</em></div>`).join('');
const title=k=>t(k).replace(/~(.+?)~/g,'<span class=yellow>$1</span>');
let DATA=null,TEAM=null;
const root=document.getElementById('coach-root');

function keepOrder(){
  const s=document.getElementById('coach'),b=document.getElementById('bench');
  if(s&&b&&b.nextElementSibling!==s)b.after(s);
  const a=document.getElementById('nav-coach'),n=document.querySelector(`.nav-links a[href='#bench']`);
  if(a&&n&&n.nextElementSibling!==a)n.after(a);
}

function renderHome(){
  const d=DATA;
  if(!d||!document.getElementById('bench'))return;
  let sec=document.getElementById('coach');
  if(!sec){
    sec=document.createElement('section');sec.className='section';sec.id='coach';
    document.getElementById('bench').after(sec);
    const nl=document.querySelector(`.nav-links a[href='#bench']`);
    if(nl){const a=document.createElement('a');a.href='#coach';a.id='nav-coach';nl.after(a)}
    const main=document.querySelector('main'),nav=document.querySelector('.nav-links');
    const mo=new MutationObserver(keepOrder);
    if(main)mo.observe(main,{childList:true});
    if(nav)mo.observe(nav,{childList:true});
  }
  const na=document.getElementById('nav-coach');
  if(na)na.textContent=t('nav.coach');
  sec.innerHTML=`<h2 class='section-title reveal'>${title('coach.title')}</h2>
  <article class='coach reveal'>
    <a class='coach-photo' href='coach.html' aria-label='${esc(d.name)}'>${imgTag(d)}<span class='coach-tag'>${esc(L(d.role))}</span></a>
    <div class='coach-body'>
      <div class='coach-id'>
        <h3><a href='coach.html'>${esc(d.name)}</a></h3>
        <p>${esc(L(d.tagline))}</p>
        <div class='coach-links'>${d.steam?`<a class='btn btn-ghost btn-small' href='${esc(d.steam)}' target='_blank' rel='noopener'>Steam</a>`:''}<a class='btn btn-small' href='coach.html'>${t('coach.view')}</a></div>
      </div>
      <div class='fun-grid'>${funTiles(d)}</div>
    </div>
  </article>`;
  keepOrder();
  fixImages();observeReveals();
}

function renderPage(){
  const d=DATA;
  if(!d||!root)return;
  document.title=d.name+' | Ciuc Navi';
  const C=window.Charts;
  const links=d.steam?`<a class='btn btn-ghost btn-small' href='${esc(d.steam)}' target='_blank' rel='noopener'>Steam</a>`:'';
  let body=`<div class='panel reveal'><h3>${t('coach.awards')}</h3><div class='fun-grid'>${funTiles(d)}</div></div>`;
  const st=d.stats||{};
  if(C){
    const g=[['ct','coach.ct'],['t','coach.t'],['pistol','coach.pistol'],['ot','coach.ot']].filter(x=>typeof st[x[0]]==='number').map(x=>C.gauge(st[x[0]],t(x[1]),st[x[0]]+'%')).join('');
    if(g)body+=`<div class='panel reveal'><h3>${t('coach.stats')}</h3><div class='gauges'>${g}</div></div>`;
    const rows=C.mapRows(TEAM||[]).filter(r=>r.n>=3).sort((a,b)=>b.wr-a.wr||b.n-a.n);
    if(rows.length){
      const best=rows[0],worst=rows[rows.length-1];
      const co=(cls,lab,r)=>`<div class='co ${cls}'><span>${lab}</span><strong>${esc(C.mapName(r.map))}</strong><em>${r.wr.toFixed(0)}%</em></div>`;
      body+=`<div class='panel reveal'><h3>${t('coach.maps')}</h3><div class='callouts'>${co('good',t('coach.best'),best)}${rows.length>1?co('bad',t('coach.worst'),worst):''}</div>${C.mapMeters(rows)}<p class='note' style='margin-top:14px'>${t('coach.mapsNote')}</p></div>`;
    }else{
      body+=`<div class='panel reveal'><h3>${t('coach.maps')}</h3><p class='note'>${t('coach.nomaps')}</p></div>`;
    }
  }
  if(d.bio)body+=`<div class='panel reveal'><h3>${t('coach.about')}</h3><p class='coach-bio'>${esc(L(d.bio))}</p></div>`;
  root.innerHTML=`<a class='back' href='index.html#roster'>${t('player.back')}</a>
  <div class='p-hero'>
    <div class='p-img'>${imgTag(d)}</div>
    <div class='p-info'>
      <span class='role'>${esc(L(d.role))}</span>
      <h1>${esc(d.name)}</h1>
      <p class='p-tag'>${esc(L(d.tagline))}</p>
      <div class='p-links'>${links}</div>
    </div>
  </div>
  ${body}`;
  fixImages();observeReveals();
}

function draw(){if(root)renderPage();else renderHome()}

const jobs=[getJson('data/coach.json')];
if(root){jobs.push(getJson('data/players.json'),getJson('data/stats.json').catch(()=>({})))}
Promise.all(jobs).then(([coach,players,live])=>{
  DATA=coach;
  if(!root)return;
  return Promise.all((players.players||[]).filter(p=>p.status==='main').map(p=>{
    const a=live[p.steam64]||live[p.vanity]||{};
    return a.hasDetail?getJson('data/stats/'+(p.steam64||p.vanity)+'.json').then(x=>(x.detail||{}).recent||[]).catch(()=>[]):[];
  })).then(l=>{TEAM=[].concat(...l)});
}).then(draw).catch(err=>{if(root)root.innerHTML=`<p class='empty'>${esc(err.message)}</p>`});
document.addEventListener('langchange',()=>{if(DATA)draw()});
})();
