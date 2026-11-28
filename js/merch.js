(function(){


let CFG={currency:'RON',price:350,signedExtra:50,sizes:['XS','S','M','L','XL'],maxQty:10};
let ITEMS=[];
const ST={size:null,signed:false,qty:1,side:'front'};
const EXTS=['jpg'];
const money=n=>n+' '+CFG.currency;
const itemName=p=>p.name+' '+t('merch.teeSuffix');
const x=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function ph(name,side){
  const n=x(name);
  const big=side==='back';
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 440'><rect width='400' height='440' fill='#141418'/><path d='M120 60 L56 104 L90 166 L120 144 L120 384 L280 384 L280 144 L310 166 L344 104 L280 60 Q200 112 120 60Z' fill='#0e0e11' stroke='#ffe600' stroke-width='3'/><text x='200' y='${big?200:190}' text-anchor='middle' font-family='Arial Black,Arial,sans-serif' font-weight='900' font-size='${big?(n.length>8?30:40):22}' fill='#ffe600'>${big?n:'CIUC NAVI'}</text><text x='200' y='${big?236:224}' text-anchor='middle' font-family='Arial,sans-serif' font-weight='700' font-size='15' fill='#9a9aa5'>${big?'CIUC NAVI':n}</text><text x='200' y='416' text-anchor='middle' font-family='Arial,sans-serif' font-size='13' fill='#5d5d68' letter-spacing='3'>${side.toUpperCase()}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
const imgTag=(p,side,cls)=>`<img class='${cls||''}' src='img/merch/${p.slug}-${side}.jpg' data-slug='${p.slug}' data-side='${side}' data-ext='0' data-name='${esc(p.name)}' alt='${esc(itemName(p))} - ${side}' loading='lazy'>`;
function wireImgs(scope){
  (scope||document).querySelectorAll('img[data-side]').forEach(i=>{
    if(i._w)return;i._w=1;
    i.addEventListener('error',()=>{
      const n=Number(i.dataset.ext)+1;
      if(n<EXTS.length){i.dataset.ext=n;i.src='img/merch/'+i.dataset.slug+'-'+i.dataset.side+'.'+EXTS[n]}
      else{i.src=ph(i.dataset.name,i.dataset.side)}
    });
  });
}

function renderPreview(){
  const box=document.getElementById('merch-preview');
  if(!box||!ITEMS.length)return;
  box.innerHTML=`<div class='mc reveal'>
    <button class='mc-arrow mc-prev' aria-label='Previous'>&#8249;</button>
    <div class='mc-track'>${ITEMS.map(p=>`<a class='mc-item' href='merch.html'>
      <div class='mc-img'><span class='mc-tag'>${t('merch.tshirt')}</span>${imgTag(p,'front','f')}${imgTag(p,'back','b')}</div>
      <div class='mc-info'><div><h3>${esc(itemName(p))}</h3><p>XS - XL</p></div><span class='mc-price'>${money(CFG.price)}</span></div></a>`).join('')}</div>
    <button class='mc-arrow mc-next' aria-label='Next'>&#8250;</button>
  </div>
  <p class='mc-cta'><a class='btn' href='merch.html'>${t('merch.viewAll')}</a></p>`;
  const tr=box.querySelector('.mc-track'),pv=box.querySelector('.mc-prev'),nx=box.querySelector('.mc-next');
  const step=()=>{const it=tr.querySelector('.mc-item');return it?it.getBoundingClientRect().width+14:300};
  const upd=()=>{pv.disabled=tr.scrollLeft<4;nx.disabled=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-4};
  pv.onclick=()=>tr.scrollBy({left:-step(),behavior:'smooth'});
  nx.onclick=()=>tr.scrollBy({left:step(),behavior:'smooth'});
  tr.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',upd);
  upd();
  wireImgs(box);observeReveals();
}

function renderGrid(root){
  root.innerHTML=`<h2 class='section-title reveal'>${t('merch.title').replace(/~(.+?)~/g,'<span class=yellow>$1</span>')}</h2>
  <p class='mshop-sub'>${t('merch.sub')}</p>
  <div class='mgrid'>${ITEMS.map(p=>`<a class='mp reveal' href='merch.html?item=${p.slug}'>
    <div class='mc-img'><span class='mc-tag'>${t('merch.tshirt')}</span>${imgTag(p,'front','f')}${imgTag(p,'back','b')}</div>
    <div class='mc-info'><div><h3>${esc(itemName(p))}</h3><p>${t('merch.signedFrom')}${money(CFG.signedExtra)}</p></div><span class='mc-price'>${money(CFG.price)}</span></div></a>`).join('')}</div>`;
  wireImgs(root);observeReveals();
}

function renderDetail(root,p){
  const unit=()=>CFG.price+(ST.signed?CFG.signedExtra:0);
  root.innerHTML=`<a class='back' href='merch.html'>${t('merch.backLink')}</a>
  <div class='pd'>
    <div class='pd-gallery'>
      <div class='pd-main'>${imgTag(p,'front')}${imgTag(p,'back')}</div>
      <button class='pd-flip l' data-flip='1' aria-label='Previous photo'>&#8249;</button>
      <button class='pd-flip r' data-flip='1' aria-label='Next photo'>&#8250;</button>
      <div class='pd-thumbs'>
        <button class='pd-th' data-side='front'>${imgTag(p,'front')}<span>${t('merch.front')}</span></button>
        <button class='pd-th' data-side='back'>${imgTag(p,'back')}<span>${t('merch.back')}</span></button>
      </div>
    </div>
    <div class='pd-info'>
      <span class='role'>${t('merch.tshirt')}</span>
      <h1>${esc(itemName(p))}</h1>
      <div class='pd-price'>${money(CFG.price)}</div>
      <div class='pd-block'><h4>${t('merch.size')}</h4><div class='sizes'>${CFG.sizes.map(s=>`<button class='sz' data-size='${esc(s)}'>${esc(s)}</button>`).join('')}</div></div>
      <div class='pd-block'><h4>${t('merch.edition')}</h4><div class='opts'>
        <button class='opt' data-signed='0'>${t('merch.standard')}<b>${money(CFG.price)}</b></button>
        <button class='opt' data-signed='1'>${t('merch.signedOpt')}<b>+${money(CFG.signedExtra)}</b></button>
      </div></div>
      <div class='pd-block'><h4>${t('merch.qty')}</h4><div class='qty'><button data-q='-1'>&minus;</button><span id='pd-q'>1</span><button data-q='1'>+</button></div></div>
      <div class='pd-total'><span>${t('merch.total')}</span><strong id='pd-t'>${money(unit())}</strong></div>
      <button class='btn pd-buy' id='pd-buy'>${t('merch.checkout')}</button>
      <div class='pd-msg' id='pd-msg'></div>
    </div>
  </div>`;
  const imgs=root.querySelectorAll('.pd-main img');
  const upd=()=>{
    imgs.forEach(i=>i.classList.toggle('on',i.dataset.side===ST.side));
    root.querySelectorAll('.pd-th').forEach(b=>b.classList.toggle('active',b.dataset.side===ST.side));
    root.querySelectorAll('.sz').forEach(b=>b.classList.toggle('active',b.dataset.size===ST.size));
    root.querySelectorAll('.opt').forEach(b=>b.classList.toggle('active',(b.dataset.signed==='1')===ST.signed));
    document.getElementById('pd-q').textContent=ST.qty;
    document.getElementById('pd-t').textContent=money(unit()*ST.qty);
  };
  root.onclick=e=>{
    const b=e.target.closest('button');
    if(!b||!root.contains(b))return;
    if(b.dataset.flip){ST.side=ST.side==='front'?'back':'front'}
    else if(b.dataset.side){ST.side=b.dataset.side}
    else if(b.dataset.size){ST.size=b.dataset.size;document.getElementById('pd-msg').textContent=''}
    else if(b.dataset.signed!==undefined){ST.signed=b.dataset.signed==='1'}
    else if(b.dataset.q){ST.qty=Math.max(1,Math.min(CFG.maxQty,ST.qty+Number(b.dataset.q)))}
    else if(b.id==='pd-buy'){
      if(!ST.size){document.getElementById('pd-msg').textContent=t('merch.pick');return}
      checkout(p,unit()*ST.qty);return;
    }
    upd();
  };
  wireImgs(root);upd();
}

function checkout(p,total){
  const old=document.querySelector('.co-overlay');if(old)old.remove();
  const o=document.createElement('div');o.className='co-overlay';
  o.innerHTML=`<div class='co-box'><div class='co-ok'>&#10003;</div><h3>${t('merch.received')}</h3><p>${t('merch.receivedText')}</p>
    <p class='co-sum'>${esc(itemName(p))}<br>${t('merch.size')} ${esc(ST.size)} &middot; ${ST.signed?t('merch.signedShort'):t('merch.standard')} &middot; &times;${ST.qty}</p>
    <p class='co-total'>${money(total)}</p><p class='co-note'>${t('merch.demo')}</p>
    <button class='btn' id='co-close'>${t('merch.close')}</button></div>`;
  document.body.appendChild(o);
  const close=()=>o.remove();
  o.addEventListener('click',e=>{if(e.target===o||e.target.id==='co-close')close()});
  document.addEventListener('keydown',function k(e){if(e.key==='Escape'){close();document.removeEventListener('keydown',k)}});
}

function renderShop(){
  const root=document.getElementById('merch-root');
  if(!root)return;
  document.title='Merch | Ciuc Navi';
  const q=new URLSearchParams(location.search).get('item');
  const p=q?ITEMS.find(i=>i.slug===q.toLowerCase()):null;
  if(q&&!p){root.innerHTML=`<a class='back' href='merch.html'>${t('merch.backLink')}</a><p class='empty'>${t('merch.notfound')}</p>`;return}
  if(p)renderDetail(root,p);else renderGrid(root);
}

function draw(){renderPreview();renderShop()}

Promise.all([getJson('data/players.json'),getJson('data/merch.json').catch(()=>({}))]).then(([data,cfg])=>{
  CFG={...CFG,...cfg};
  ITEMS=(data.players||[]).filter(p=>p.status==='main'&&p.steam64).map(p=>({name:p.name,slug:slug(p.name)}));
  draw();
}).catch(err=>{
  const r=document.getElementById('merch-root');
  if(r)r.innerHTML=`<p class='empty'>${esc(err.message)}</p>`;
});
document.addEventListener('langchange',()=>{if(ITEMS.length)draw()});
})();
