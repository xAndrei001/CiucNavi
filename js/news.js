(function(){
const add=(l,o)=>Object.assign(I18N[l],o);
add('en',{
'nav.news':`News`,'news.title':`Latest ~News~`,'news.all':`All news →`,'news.back':`← Back to home`,'news.empty':`No news yet. Check back soon.`,
'news.filter.all':`All`,'news.type.breaking':`Breaking news`,'news.players':`Players involved`,'news.backList':`← All news`,'news.notfound':`News item not found.`,
'news.type.new-player':`New player`,'news.type.transfer':`Transfer`,'news.type.promotion':`Promotion`,'news.type.demotion':`Demotion`,'news.type.announcement':`Announcement`
});
add('ro',{
'nav.news':`Noutăți`,'news.title':`Ultimele ~Noutăți~`,'news.all':`Toate noutățile →`,'news.back':`← Înapoi acasă`,'news.empty':`Nicio noutate încă. Revino curând.`,
'news.filter.all':`Toate`,'news.type.breaking':`Breaking news`,'news.players':`Jucători implicați`,'news.backList':`← Toate noutățile`,'news.notfound':`Noutatea nu a fost găsită.`,
'news.type.new-player':`Jucător nou`,'news.type.transfer':`Transfer`,'news.type.promotion':`Promovare`,'news.type.demotion':`Retrogradare`,'news.type.announcement':`Anunț`
});
add('hu',{
'nav.news':`Hírek`,'news.title':`Legfrissebb ~hírek~`,'news.all':`Összes hír →`,'news.back':`← Vissza a főoldalra`,'news.empty':`Még nincs hír. Nézz vissza hamarosan.`,
'news.filter.all':`Mind`,'news.type.breaking':`Friss hír`,'news.players':`Érintett játékosok`,'news.backList':`← Összes hír`,'news.notfound':`A hír nem található.`,
'news.type.new-player':`Új játékos`,'news.type.transfer':`Átigazolás`,'news.type.promotion':`Előléptetés`,'news.type.demotion':`Lefokozás`,'news.type.announcement':`Közlemény`
});

const sty=document.createElement('style');
sty.textContent=`
.news-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:20px}
.nc{position:relative;padding:0 26px}
.nc-track{--per:5;display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:8px 0 14px;margin:-8px 0 -14px}
.nc-track::-webkit-scrollbar{display:none}
.nc-track .news-card{flex:0 0 calc((100% - (var(--per) - 1)*20px)/var(--per));scroll-snap-align:start;min-width:0}
@media(max-width:1300px){.nc-track{--per:4}}
@media(max-width:1000px){.nc-track{--per:3}}
@media(max-width:720px){.nc-track{--per:2}}
@media(max-width:480px){.nc-track{--per:1}}
.news-arrow{position:absolute;top:calc(50% - 22px);width:44px;height:44px;border-radius:50%;border:1px solid var(--border);background:rgba(8,8,10,.92);color:var(--yellow);font-size:1.7rem;line-height:1;cursor:pointer;z-index:3;transition:.2s}
.news-arrow:hover{background:var(--yellow);color:#000}
.news-arrow[hidden]{display:none}
.news-arrow.prev{left:-18px}.news-arrow.next{right:-18px}
.news-card{display:flex;flex-direction:column;background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:transform .3s,border-color .3s,box-shadow .3s;scroll-margin-top:90px}
a.news-card:hover{transform:translateY(-6px);border-color:var(--yellow);box-shadow:0 16px 40px rgba(255,230,0,.12)}
.news-detail{display:grid;grid-template-columns:minmax(0,420px) 1fr;gap:36px;align-items:start}
.news-detail .news-img{border:1px solid var(--border);border-radius:16px}
.nd-body{display:flex;flex-direction:column;gap:14px;min-width:0}
.nd-body h2{font-family:'Rajdhani',sans-serif;font-size:clamp(1.8rem,3.4vw,2.8rem);letter-spacing:1px;line-height:1.1}
.nd-body p{color:#d6d6dc;line-height:1.75;font-size:1.02rem;overflow-wrap:anywhere}
.nd-body h3{font-family:'Rajdhani',sans-serif;font-size:1.5rem;letter-spacing:1px;margin-top:10px;color:var(--yellow)}
.nd-body ul{color:#d6d6dc;line-height:1.75;padding-left:1.3em;list-style:disc}
.nd-body li::marker{color:var(--yellow)}
.nd-body strong{color:#fff}
.nd-body .tags{color:var(--yellow);font-weight:600}
.nd-players{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:6px;color:var(--muted);font-size:.8rem;letter-spacing:1.5px;text-transform:uppercase}
.nd-players a{background:var(--bg-2);border:1px solid var(--border);border-radius:99px;padding:5px 14px;color:var(--text);letter-spacing:0;text-transform:none;font-size:.9rem;font-weight:600}
.nd-players a:hover{border-color:var(--yellow);color:var(--yellow)}
#news-root .section-title[hidden]{display:none}
.news-back{display:inline-block;margin-bottom:26px;color:var(--muted);font-weight:600}
.news-back:hover{color:var(--yellow)}
@media(max-width:820px){.news-detail{grid-template-columns:1fr}}
.news-img{position:relative;background:linear-gradient(160deg,#1b1b20,#0c0c0f);overflow:hidden}
.news-card .news-img,.news-detail .news-img{aspect-ratio:3/4}
.news-img:has(img) .news-ph{display:none}
.news-img img{display:block;width:100%;height:auto}
.news-card .news-img img,.news-detail .news-img img{position:absolute;inset:0;height:100%;object-fit:cover}
.news-card .news-img img{transition:transform .5s}
a.news-card:hover .news-img img{transform:scale(1.05)}
.news-tag[data-t=breaking]{background:#ff3b30;color:#fff}
.news-tag[data-t=new-player]{background:#4ade80}
.news-tag[data-t=promotion]{background:#4cc9f0}
.news-tag[data-t=demotion]{background:#ff9f1c}
.news-tag[data-t=transfer]{background:#a78bfa}
.news-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px}
.news-chip{background:var(--bg-2);border:1px solid var(--border);border-radius:99px;padding:6px 16px;color:var(--muted);font:600 .82rem Inter,sans-serif;letter-spacing:.5px;cursor:pointer;transition:.2s}
.news-chip:hover{border-color:var(--yellow);color:var(--text)}
.news-chip[aria-pressed=true]{background:var(--yellow);border-color:var(--yellow);color:#000}
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

const md=x=>esc(x).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>');
const plain=x=>x.replace(/\s*\n+\s*/g,' ').replace(/#{1,6}\s+|\*+/g,'');
const dateOf=n=>n.date?new Date(n.date+'T00:00:00').toLocaleDateString(LANG,{year:'numeric',month:'long',day:'numeric'}):'';
const typeLabel=k=>t('news.type.'+k)==='news.type.'+k?String(k).replace(/-/g,' '):t('news.type.'+k);
const imgOf=n=>{
  const img=n.image?`<img src='img/news/${encodeURIComponent(n.image)}' alt='${esc(L(n.title))}' width='600' height='800' loading='lazy'>`:'';
  return `<div class='news-img'><span class='news-ph'>CN</span>${img}<span class='news-tag' data-t='${esc(n.type)}'>${esc(typeLabel(n.type))}</span></div>`;
};

function card(n){
  return `<a class='news-card' href='news.html?id=${encodeURIComponent(n.id)}'>${imgOf(n)}
    <div class='news-body'><span class='news-date'>${esc(dateOf(n))}</span><h3>${esc(L(n.title))}</h3><p>${esc(plain(L(n.text)))}</p></div></a>`;
}

function detail(n){
  const paras=L(n.text).split(/\n\n+/).map(x=>/^[*-]\s/.test(x)&&x.split('\n').every(l=>/^[*-]\s/.test(l))?`<ul>${x.split('\n').map(l=>`<li>${md(l.replace(/^[*-]\s+/,''))}</li>`).join('')}</ul>`:/^###\s/.test(x)?`<h3>${md(x.replace(/^###\s+/,''))}</h3>`:`<p${/^#\w/.test(x)?" class='tags'":''}>${md(x)}</p>`).join('');
  const pl=(n.players||[]).map(x=>`<a href='player.html?p=${slug(x)}'>${esc(x)}</a>`).join('');
  return `<a class='news-back' href='news.html'>${t('news.backList')}</a>
    <article class='news-detail'>${imgOf(n)}
      <div class='nd-body'><span class='news-date'>${esc(dateOf(n))}</span><h2>${esc(L(n.title))}</h2>${paras}${pl?`<div class='nd-players'>${t('news.players')}: ${pl}</div>`:''}</div></article>`;
}

const skelCard=()=>`<div class='news-card'><div class='skel' style='aspect-ratio:3/4;border:0;border-radius:0'></div><div class='news-body'><div class='skel' style='height:12px;width:45%'></div><div class='skel' style='height:22px'></div><div class='skel' style='height:56px'></div></div></div>`;
const skeleton=id=>page&&id
  ?`<div class='news-detail'><div class='skel' style='aspect-ratio:3/4'></div><div class='nd-body'><div class='skel' style='height:56px'></div><div class='skel' style='height:280px'></div></div></div>`
  :page?`<div class='news-grid'>${skelCard().repeat(4)}</div>`:`<div class='nc'><div class='nc-track'>${skelCard().repeat(5)}</div></div>`;

let FILTER='all';
function chips(items){
  const types=[...new Set(items.map(n=>n.type))];
  if(types.length<2)return '';
  return `<div class='news-chips' role='group'>${['all',...types].map(k=>`<button type='button' class='news-chip' data-f='${esc(k)}' aria-pressed='${FILTER===k}'>${esc(k==='all'?t('news.filter.all'):typeLabel(k))}</button>`).join('')}</div>`;
}

function carousel(){
  const tr=list.querySelector('.nc-track'),pv=list.querySelector('.prev'),nx=list.querySelector('.next');
  if(!tr)return;
  const sync=()=>{pv.hidden=tr.scrollLeft<=1;nx.hidden=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-1};
  const step=d=>{const c=tr.firstElementChild;tr.scrollBy({left:d*(c.offsetWidth+20),behavior:'smooth'})};
  pv.onclick=()=>step(-1);nx.onclick=()=>step(1);
  tr.addEventListener('scroll',sync,{passive:true});addEventListener('resize',sync);sync();
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
    list.className='';
    if(FILTER!=='all'&&!items.some(n=>n.type===FILTER))FILTER='all';
    const shown=FILTER==='all'?items:items.filter(n=>n.type===FILTER);
    const cards=shown.map(card).join('');
    list.innerHTML=!items.length?`<p class='empty'>${t('news.empty')}</p>`:chips(items)+(page?`<div class='news-grid'>${cards}</div>`:`<div class='nc'><button type='button' class='news-arrow prev' aria-label='Previous' hidden>&lsaquo;</button><div class='nc-track'>${cards}</div><button type='button' class='news-arrow next' aria-label='Next' hidden>&rsaquo;</button></div>`);
    if(!page)carousel();
  }
  list.querySelectorAll('.news-img img').forEach(i=>i.addEventListener('error',()=>i.remove(),{once:true}));
  observeReveals();
}

if(page)document.body.classList.add('news-page');
list.innerHTML=skeleton(new URLSearchParams(location.search).get('id'));
list.addEventListener('click',e=>{const b=e.target.closest('.news-chip');if(b&&DATA){FILTER=b.dataset.f;draw()}});
getJson('data/news.json').then(d=>{DATA=d.news||[];draw()}).catch(err=>{list.innerHTML=`<p class='empty'>${esc(err.message)}</p>`});
document.addEventListener('langchange',()=>{if(DATA)draw()});
})();
