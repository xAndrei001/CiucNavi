(function(){
const add=(l,o)=>Object.assign(I18N[l],o);
add('en',{
'nav.coach':`Coach`,
'coach.title':`Head ~Coach~`,'coach.view':`View profile →`,
'coach.awards':`Coach awards`,'coach.stats':`Coach stats`,'coach.about':`About the coach`,
'coach.maps':`Best maps under the coach`,'coach.mapsNote':`Team results across the recent matches of the registered players. Maps with fewer than 3 games are hidden.`,
'coach.nomaps':`Map data appears after the next stats update.`,
'coach.ct':`CT round win rate`,'coach.t':`T round win rate`,'coach.pistol':`Pistol round win rate`,'coach.ot':`Overtime win rate`,
'coach.best':`Best map`,'coach.worst':`Weakest map`,'coach.notfound':`Coach data not found.`
});
add('ro',{
'nav.coach':`Antrenor`,
'coach.title':`Antrenor ~principal~`,'coach.view':`Vezi profilul →`,
'coach.awards':`Premiile antrenorului`,'coach.stats':`Statistici antrenor`,'coach.about':`Despre antrenor`,
'coach.maps':`Cele mai bune hărți sub antrenor`,'coach.mapsNote':`Rezultatele echipei în meciurile recente ale jucătorilor înregistrați. Hărțile cu mai puțin de 3 meciuri sunt ascunse.`,
'coach.nomaps':`Datele pe hărți apar după următoarea actualizare a statisticilor.`,
'coach.ct':`Rate de runde câștigate CT`,'coach.t':`Rate de runde câștigate T`,'coach.pistol':`Runde pistol câștigate`,'coach.ot':`Prelungiri câștigate`,
'coach.best':`Cea mai bună hartă`,'coach.worst':`Cea mai slabă hartă`,'coach.notfound':`Datele antrenorului nu au fost găsite.`
});
add('hu',{
'nav.coach':`Edző`,
'coach.title':`Vezéredző`,'coach.view':`Profil megtekintése →`,
'coach.awards':`Edzői díjak`,'coach.stats':`Edzői statisztikák`,'coach.about':`Az edzőről`,
'coach.maps':`Legjobb pályák az edző alatt`,'coach.mapsNote':`A csapat eredményei a regisztrált játékosok legutóbbi meccsei alapján. A 3-nál kevesebb meccses pályák rejtve vannak.`,
'coach.nomaps':`A pályaadatok a következő statisztikafrissítés után jelennek meg.`,
'coach.ct':`CT kör győzelmi arány`,'coach.t':`T kör győzelmi arány`,'coach.pistol':`Pisztolykör győzelmi arány`,'coach.ot':`Hosszabbítás győzelmi arány`,
'coach.best':`Legjobb pálya`,'coach.worst':`Leggyengébb pálya`,'coach.notfound':`Az edző adatai nem találhatók.`
});

const sty=document.createElement('style');
sty.textContent=`
.coach{position:relative;display:grid;grid-template-columns:minmax(200px,270px) 1fr;border:1px solid var(--border);border-radius:18px;overflow:hidden;background:linear-gradient(135deg,#17170a 0%,var(--card) 55%)}
.coach::before{content:'COACH';position:absolute;right:-6px;bottom:-22px;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:7rem;line-height:1;letter-spacing:6px;color:rgba(255,230,0,.04);pointer-events:none}
.coach-photo{position:relative;display:block;min-height:270px;background:#0c0c0f;overflow:hidden}
.coach-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:38% 18%;transition:transform .6s}
.coach:hover .coach-photo img{transform:scale(1.04)}
.coach-photo::after{content:'';position:absolute;inset:0;background:linear-gradient(to right,transparent 55%,#141418 100%),linear-gradient(to top,rgba(8,8,10,.7),transparent 40%);pointer-events:none}
.coach-photo .initials{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:5rem}
.coach-tag{position:absolute;left:14px;bottom:14px;z-index:2;background:var(--yellow);color:#000;font-weight:800;font-size:.68rem;letter-spacing:2px;text-transform:uppercase;padding:5px 10px;border-radius:6px}
.coach-body{position:relative;z-index:1;padding:22px 28px;display:flex;flex-direction:column;justify-content:center;gap:16px;min-width:0}
.coach-id h3{font-family:'Rajdhani',sans-serif;font-size:clamp(1.8rem,3vw,2.4rem);letter-spacing:3px;line-height:1;overflow-wrap:anywhere}
.coach-id p{color:var(--muted);margin:6px 0 12px;font-size:.92rem}
.coach-links{display:flex;gap:10px;flex-wrap:wrap}
.fun-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.fs{position:relative;background:rgba(16,16,19,.88);border:1px solid var(--border);border-radius:14px;padding:18px 18px 16px;overflow:hidden;transition:border-color .25s,transform .25s;min-width:0}
.fs::before{content:'';position:absolute;left:0;top:0;width:100%;height:3px;background:linear-gradient(90deg,var(--yellow),transparent)}
.fs:hover{border-color:var(--yellow);transform:translateY(-3px)}
.fs strong{display:block;font-family:'Rajdhani',sans-serif;font-size:2.3rem;color:var(--yellow);line-height:1.1}
.fs span{display:block;font-size:.75rem;letter-spacing:1.5px;text-transform:uppercase;color:#f1f1f3;font-weight:700}
.fs em{display:block;font-style:normal;font-size:.76rem;color:var(--muted);margin-top:4px;line-height:1.35}
.coach .fun-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.coach .fs{padding:12px 14px 10px;border-radius:12px}
.coach .fs strong{font-size:1.6rem}
.coach .fs span{font-size:.66rem;letter-spacing:1.2px}
.coach .fs em{font-size:.66rem;margin-top:2px}
#coach.section{padding-top:0;padding-bottom:60px}
#coach .section-title{font-size:1.9rem;margin-bottom:22px}
#coach .section-title::before{height:26px}
.coach-bio{color:var(--muted);line-height:1.7;font-size:1.02rem}
@media(max-width:860px){
.coach{grid-template-columns:1fr}
.coach-photo{min-height:240px}
.coach-photo::after{background:linear-gradient(to top,#141418,transparent 55%)}
.coach-body{padding:20px}
.coach::before{font-size:4.5rem}
.coach .fun-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(max-width:420px){.coach .fun-grid{grid-template-columns:1fr}.fun-grid{grid-template-columns:1fr}.fs strong{font-size:2rem}}
`;
document.head.appendChild(sty);

const L=o=>(o&&typeof o==='object')?(o[LANG]||o.en||''):(o==null?'':o);
const imgTag=d=>d.icon?`<img src='icons/${encodeURIComponent(d.icon)}' alt='${esc(d.name)}' data-ini='${esc(initials(d.name))}'>`:`<span class='initials'>${esc(initials(d.name))}</span>`;
const funTiles=d=>(d.fun||[]).map(f=>`<div class='fs'><strong>${esc(f.v)}</strong><span>${esc(L(f.l))}</span><em>${esc(L(f.c))}</em></div>`).join('');
const title=k=>t(k).replace(/~(.+?)~/g,'<span class=yellow>$1</span>');
let DATA=null,TEAM=null;
const root=document.getElementById('coach-root');

function keepOrder(){
  const s=document.getElementById('coach'),b=document.getElementById('bench');
  if(s&&b&&s.nextElementSibling!==b)b.before(s);
  const a=document.getElementById('nav-coach'),n=document.querySelector(`.nav-links a[href='#bench']`);
  if(a&&n&&a.nextElementSibling!==n)n.before(a);
}

function renderHome(){
  const d=DATA;
  if(!d||!document.getElementById('bench'))return;
  let sec=document.getElementById('coach');
  if(!sec){
    sec=document.createElement('section');sec.className='section';sec.id='coach';
    document.getElementById('bench').before(sec);
    const nl=document.querySelector(`.nav-links a[href='#bench']`);
    if(nl){const a=document.createElement('a');a.href='#coach';a.id='nav-coach';nl.before(a)}
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
  if(root){
    const all=[];
    (players.players||[]).filter(p=>p.status==='main').forEach(p=>{
      const a=live[p.steam64]||live[p.vanity]||{};
      ((a.detail||{}).recent||[]).forEach(x=>all.push(x));
    });
    TEAM=all;
  }
  draw();
}).catch(err=>{if(root)root.innerHTML=`<p class='empty'>${esc(err.message)}</p>`});
document.addEventListener('langchange',()=>{if(DATA)draw()});
})();
