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
