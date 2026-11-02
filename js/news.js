(function(){
const add=(l,o)=>Object.assign(I18N[l],o);
add('en',{
'nav.news':`News`,'news.title':`Latest ~News~`,'news.all':`All news →`,'news.back':`← Back to home`,'news.empty':`No news yet. Check back soon.`,
'news.type.breaking':`Breaking news`,'news.players':`Players involved`,'news.backList':`← All news`,'news.notfound':`News item not found.`,
'news.type.new-player':`New player`,'news.type.transfer':`Transfer`,'news.type.promotion':`Promotion`,'news.type.demotion':`Demotion`,'news.type.announcement':`Announcement`
});
add('ro',{
'nav.news':`Noutăți`,'news.title':`Ultimele ~Noutăți~`,'news.all':`Toate noutățile →`,'news.back':`← Înapoi acasă`,'news.empty':`Nicio noutate încă. Revino curând.`,
'news.type.breaking':`Breaking news`,'news.players':`Jucători implicați`,'news.backList':`← Toate noutățile`,'news.notfound':`Noutatea nu a fost găsită.`,
'news.type.new-player':`Jucător nou`,'news.type.transfer':`Transfer`,'news.type.promotion':`Promovare`,'news.type.demotion':`Retrogradare`,'news.type.announcement':`Anunț`
});
add('hu',{
'nav.news':`Hírek`,'news.title':`Legfrissebb ~hírek~`,'news.all':`Összes hír →`,'news.back':`← Vissza a főoldalra`,'news.empty':`Még nincs hír. Nézz vissza hamarosan.`,
'news.type.breaking':`Friss hír`,'news.players':`Érintett játékosok`,'news.backList':`← Összes hír`,'news.notfound':`A hír nem található.`,
'news.type.new-player':`Új játékos`,'news.type.transfer':`Átigazolás`,'news.type.promotion':`Előléptetés`,'news.type.demotion':`Lefokozás`,'news.type.announcement':`Közlemény`
});

const sty=document.createElement('style');
sty.textContent=`
.news-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:20px}
.news-card{display:flex;flex-direction:column;background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:transform .3s,border-color .3s,box-shadow .3s;scroll-margin-top:90px}
a.news-card:hover{transform:translateY(-6px);border-color:var(--yellow);box-shadow:0 16px 40px rgba(255,230,0,.12)}
.news-detail{display:grid;grid-template-columns:minmax(0,420px) 1fr;gap:36px;align-items:start}
.news-detail .news-img{border:1px solid var(--border);border-radius:16px}
.nd-body{display:flex;flex-direction:column;gap:14px;min-width:0}
.nd-body h2{font-family:'Rajdhani',sans-serif;font-size:clamp(1.8rem,3.4vw,2.8rem);letter-spacing:1px;line-height:1.1}
.nd-body p{color:#d6d6dc;line-height:1.75;font-size:1.02rem;overflow-wrap:anywhere}
.nd-body .tags{color:var(--yellow);font-weight:600}
.nd-players{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:6px;color:var(--muted);font-size:.8rem;letter-spacing:1.5px;text-transform:uppercase}
.nd-players a{background:var(--bg-2);border:1px solid var(--border);border-radius:99px;padding:5px 14px;color:var(--text);letter-spacing:0;text-transform:none;font-size:.9rem;font-weight:600}
.nd-players a:hover{border-color:var(--yellow);color:var(--yellow)}
#news-root .section-title[hidden]{display:none}
.news-back{display:inline-block;margin-bottom:26px;color:var(--muted);font-weight:600}
.news-back:hover{color:var(--yellow)}
@media(max-width:820px){.news-detail{grid-template-columns:1fr}}
.news-img{position:relative;background:linear-gradient(160deg,#1b1b20,#0c0c0f);overflow:hidden}
.news-card .news-img{aspect-ratio:3/4}
.news-detail .news-img:not(:has(img)){aspect-ratio:16/10}
.news-img:has(img) .news-ph{display:none}
.news-img img{display:block;width:100%;height:auto}
.news-card .news-img img{position:absolute;inset:0;height:100%;object-fit:cover}
.news-ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:3.4rem;letter-spacing:4px;color:var(--yellow);opacity:.35}
.news-tag{position:absolute;top:12px;left:12px;z-index:2;background:var(--yellow);color:#000;font-weight:800;font-size:.68rem;letter-spacing:1.5px;text-transform:uppercase;padding:4px 9px;border-radius:5px}
.news-body{padding:18px 20px 22px;display:flex;flex-direction:column;gap:8px}
.news-date{color:var(--muted);font-size:.78rem;letter-spacing:1.5px;text-transform:uppercase}
.news-body h3{font-family:'Rajdhani',sans-serif;font-size:1.5rem;letter-spacing:1px;line-height:1.15}
.news-body p{color:var(--muted);line-height:1.6;font-size:.95rem}
.news-card .news-body p{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
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

const dateOf=n=>n.date?new Date(n.date+'T00:00:00').toLocaleDateString(LANG,{year:'numeric',month:'long',day:'numeric'}):'';
const typeLabel=k=>t('news.type.'+k)==='news.type.'+k?String(k).replace(/-/g,' '):t('news.type.'+k);
const imgOf=n=>{
  const img=n.image?`<img src='img/news/${encodeURIComponent(n.image)}' alt='${esc(L(n.title))}' loading='lazy'>`:'';
  return `<div class='news-img'><span class='news-ph'>CN</span>${img}<span class='news-tag'>${esc(typeLabel(n.type))}</span></div>`;
};

function card(n){
  return `<a class='news-card reveal' href='news.html?id=${encodeURIComponent(n.id)}'>${imgOf(n)}
    <div class='news-body'><span class='news-date'>${esc(dateOf(n))}</span><h3>${esc(L(n.title))}</h3><p>${esc(L(n.text).replace(/\s*\n+\s*/g,' '))}</p></div></a>`;
}

function detail(n){
  const paras=L(n.text).split(/\n\n+/).map(x=>`<p${/^#/.test(x)?" class='tags'":''}>${esc(x)}</p>`).join('');
  const pl=(n.players||[]).map(x=>`<a href='player.html?p=${slug(x)}'>${esc(x)}</a>`).join('');
  return `<a class='news-back' href='news.html'>${t('news.backList')}</a>
    <article class='news-detail'>${imgOf(n)}
      <div class='nd-body'><span class='news-date'>${esc(dateOf(n))}</span><h2>${esc(L(n.title))}</h2>${paras}${pl?`<div class='nd-players'>${t('news.players')}: ${pl}</div>`:''}</div></article>`;
}

function draw(){
  const items=[...DATA].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  const id=new URLSearchParams(location.search).get('id');
  const one=page&&id&&items.find(x=>x.id===id);
  if(page)document.querySelector('#news-root .section-title').hidden=!!id;
  if(page&&id){
    list.className='';
    list.innerHTML=one?detail(one):`<a class='news-back' href='news.html'>${t('news.backList')}</a><p class='empty'>${t('news.notfound')}</p>`;
    if(one)document.title=L(one.title)+' | Ciuc Navi';
  }else{
    const shown=page?items:items.slice(0,4);
    list.className=(page?'':'news-home ')+'news-grid';
    list.innerHTML=shown.length?shown.map(card).join(''):`<p class='empty'>${t('news.empty')}</p>`;
  }
  list.querySelectorAll('.news-img img').forEach(i=>i.addEventListener('error',()=>i.remove(),{once:true}));
  observeReveals();
}

if(page)document.body.classList.add('news-page');
getJson('data/news.json').then(d=>{DATA=d.news||[];draw()}).catch(err=>{list.innerHTML=`<p class='empty'>${esc(err.message)}</p>`});
document.addEventListener('langchange',()=>{if(DATA)draw()});
})();
