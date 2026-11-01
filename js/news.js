(function(){
const add=(l,o)=>Object.assign(I18N[l],o);
add('en',{
'nav.news':`News`,'news.title':`Latest ~News~`,'news.all':`All news →`,'news.back':`← Back to home`,'news.empty':`No news yet. Check back soon.`,
'news.type.new-player':`New player`,'news.type.transfer':`Transfer`,'news.type.promotion':`Promotion`,'news.type.demotion':`Demotion`,'news.type.announcement':`Announcement`
});
add('ro',{
'nav.news':`Noutăți`,'news.title':`Ultimele ~Noutăți~`,'news.all':`Toate noutățile →`,'news.back':`← Înapoi acasă`,'news.empty':`Nicio noutate încă. Revino curând.`,
'news.type.new-player':`Jucător nou`,'news.type.transfer':`Transfer`,'news.type.promotion':`Promovare`,'news.type.demotion':`Retrogradare`,'news.type.announcement':`Anunț`
});
add('hu',{
'nav.news':`Hírek`,'news.title':`Legfrissebb ~hírek~`,'news.all':`Összes hír →`,'news.back':`← Vissza a főoldalra`,'news.empty':`Még nincs hír. Nézz vissza hamarosan.`,
'news.type.new-player':`Új játékos`,'news.type.transfer':`Átigazolás`,'news.type.promotion':`Előléptetés`,'news.type.demotion':`Lefokozás`,'news.type.announcement':`Közlemény`
});

const sty=document.createElement('style');
sty.textContent=`
.news-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:22px}
.news-page .news-grid{grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))}
.news-card{display:flex;flex-direction:column;background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:transform .3s,border-color .3s,box-shadow .3s;scroll-margin-top:90px}
a.news-card:hover{transform:translateY(-6px);border-color:var(--yellow);box-shadow:0 16px 40px rgba(255,230,0,.12)}
.news-card.sel{border-color:var(--yellow);box-shadow:0 0 0 1px var(--yellow),0 16px 40px rgba(255,230,0,.15)}
.news-img{position:relative;background:linear-gradient(160deg,#1b1b20,#0c0c0f);overflow:hidden}
.news-img:not(:has(img)){aspect-ratio:16/10}
.news-img:has(img) .news-ph{display:none}
.news-img img{display:block;width:100%;height:auto}
.news-ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:3.4rem;letter-spacing:4px;color:var(--yellow);opacity:.35}
.news-tag{position:absolute;top:12px;left:12px;z-index:2;background:var(--yellow);color:#000;font-weight:800;font-size:.68rem;letter-spacing:1.5px;text-transform:uppercase;padding:4px 9px;border-radius:5px}
.news-body{padding:18px 20px 22px;display:flex;flex-direction:column;gap:8px}
.news-date{color:var(--muted);font-size:.78rem;letter-spacing:1.5px;text-transform:uppercase}
.news-body h3{font-family:'Rajdhani',sans-serif;font-size:1.5rem;letter-spacing:1px;line-height:1.15}
.news-body p{color:var(--muted);line-height:1.6;font-size:.95rem}
.news-home .news-body p{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.news-all{margin-top:24px}
.news-all a{color:var(--yellow);font-weight:700;letter-spacing:1px;text-transform:uppercase;font-size:.85rem}
.news-all a:hover{text-decoration:underline}
`;
document.head.appendChild(sty);
applyLang();

const list=document.getElementById('news-list');
if(!list)return;
const page=!!document.getElementById('news-root');
let DATA=null;
const L=o=>o&&typeof o==='object'?(o[LANG]||o.en||''):(o||'');

function card(n){
  const tag=`<span class='news-tag'>${esc(t('news.type.'+n.type))}</span>`;
  const img=n.image?`<img src='newsphotos/${encodeURIComponent(n.image)}' alt='${esc(L(n.title))}' loading='lazy'>`:'';
  const date=n.date?new Date(n.date+'T00:00:00').toLocaleDateString(LANG,{year:'numeric',month:'long',day:'numeric'}):'';
  const inner=`<div class='news-img'><span class='news-ph'>CN</span>${img}${tag}</div>
    <div class='news-body'><span class='news-date'>${esc(date)}</span><h3>${esc(L(n.title))}</h3><p>${esc(L(n.text))}</p></div>`;
  return page
    ?`<article class='news-card reveal' id='${esc(n.id)}'>${inner}</article>`
    :`<a class='news-card reveal' href='news.html#${encodeURIComponent(n.id)}'>${inner}</a>`;
}

function draw(){
  const items=[...DATA].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  const shown=page?items:items.slice(0,3);
  list.className=(page?'':'news-home ')+'news-grid';
  list.innerHTML=shown.length?shown.map(card).join(''):`<p class='empty'>${t('news.empty')}</p>`;
  list.querySelectorAll('.news-img img').forEach(i=>i.addEventListener('error',()=>i.remove(),{once:true}));
  observeReveals();
  if(page&&location.hash){const e=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(e){e.classList.add('sel');e.scrollIntoView({block:'center'})}}
}

if(page)document.body.classList.add('news-page');
getJson('data/news.json').then(d=>{DATA=d.news||[];draw()}).catch(err=>{list.innerHTML=`<p class='empty'>${esc(err.message)}</p>`});
document.addEventListener('langchange',()=>{if(DATA)draw()});
})();
