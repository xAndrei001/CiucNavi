(function(){
const add=(l,o)=>Object.assign(I18N[l],o);
add('en',{
'merch.viewAll':`Browse all merch`,'merch.teeSuffix':`Player Tee`,'merch.tshirt':`T-shirt`,
'merch.sub':`Official Ciuc Navi player tees. Front and back print, sizes XS to XL.`,
'merch.size':`Size`,'merch.edition':`Edition`,'merch.standard':`Standard`,'merch.signedOpt':`Signed by the player`,
'merch.qty':`Quantity`,'merch.total':`Total`,'merch.checkout':`Go to checkout`,'merch.pick':`Please choose a size first.`,
'merch.received':`Order received`,'merch.receivedText':`Thank you! We got your order.`,
'merch.demo':`Demo store: nothing is actually ordered or charged.`,'merch.close':`Close`,
'merch.front':`Front`,'merch.back':`Back`,'merch.backLink':`← Back to merch`,'merch.notfound':`Item not found.`,
'merch.signedShort':`Signed`,'merch.signedFrom':`Signed +`
});
add('ro',{
'merch.viewAll':`Vezi tot merch-ul`,'merch.teeSuffix':`Tricou jucător`,'merch.tshirt':`Tricou`,
'merch.sub':`Tricouri oficiale Ciuc Navi cu numele jucătorilor. Print față și spate, mărimi XS–XL.`,
'merch.size':`Mărime`,'merch.edition':`Ediție`,'merch.standard':`Standard`,'merch.signedOpt':`Semnat de jucător`,
'merch.qty':`Cantitate`,'merch.total':`Total`,'merch.checkout':`Mergi la checkout`,'merch.pick':`Alege mai întâi o mărime.`,
'merch.received':`Comandă primită`,'merch.receivedText':`Mulțumim! Am primit comanda ta.`,
'merch.demo':`Magazin demo: nu se comandă și nu se taxează nimic.`,'merch.close':`Înschide`,
'merch.front':`Față`,'merch.back':`Spate`,'merch.backLink':`← Înapoi la merch`,'merch.notfound':`Produsul nu a fost găsit.`,
'merch.signedShort':`Semnat`,'merch.signedFrom':`Semnat +`
});
add('hu',{
'merch.viewAll':`Összes merch megtekintése`,'merch.teeSuffix':`Játékospóló`,'merch.tshirt':`Póló`,
'merch.sub':`Hivatalos Ciuc Navi játékospólók. Elöl-hátul nyomat, XS-től XL-ig.`,
'merch.size':`Méret`,'merch.edition':`Kiadás`,'merch.standard':`Normál`,'merch.signedOpt':`A játékos által aláírt`,
'merch.qty':`Mennyiség`,'merch.total':`Összesen`,'merch.checkout':`Tovább a pénztárhoz`,'merch.pick':`Először válassz méretet.`,
'merch.received':`Rendelés megérkezett`,'merch.receivedText':`Köszönjük! Megkaptuk a rendelésedet.`,
'merch.demo':`Demó bolt: valójában nem rendelsz és nem fizetsz semmit.`,'merch.close':`Bezár`,
'merch.front':`Elöl`,'merch.back':`Hátul`,'merch.backLink':`← Vissza a merchhez`,'merch.notfound':`A termék nem található.`,
'merch.signedShort':`Aláírt`,'merch.signedFrom':`Aláírt +`
});

const sty=document.createElement('style');
sty.textContent=`
.mc{position:relative;padding:0 26px}
.mc-track{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-ms-overflow-style:none;scroll-behavior:smooth;padding:8px 2px}
.mc-track::-webkit-scrollbar{display:none}
.mc-track .mc-item{flex:0 0 calc((100% - 28px)/3)}
.mc-item,.mp{display:block;min-width:0;scroll-snap-align:start;background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:transform .3s,border-color .3s,box-shadow .3s}
.mc-item:hover,.mp:hover{transform:translateY(-6px);border-color:var(--yellow);box-shadow:0 16px 40px rgba(255,230,0,.12)}
.mc-img{position:relative;aspect-ratio:4/5;background:linear-gradient(160deg,#1b1b20,#0c0c0f);overflow:hidden}
.mc-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:opacity .4s,transform .5s}
.mc-img img.b{opacity:0}
.mc-item:hover .mc-img img.b,.mp:hover .mc-img img.b{opacity:1}
.mc-item:hover .mc-img img.f,.mp:hover .mc-img img.f{opacity:0}
.mc-tag{position:absolute;top:12px;left:12px;z-index:2;background:var(--yellow);color:#000;font-weight:800;font-size:.68rem;letter-spacing:1.5px;text-transform:uppercase;padding:4px 9px;border-radius:5px}
.mc-info{padding:14px 16px 16px;display:flex;justify-content:space-between;align-items:flex-end;gap:10px}
.mc-info h3{font-family:'Rajdhani',sans-serif;font-size:1.3rem;letter-spacing:1px;line-height:1.15;overflow-wrap:anywhere}
.mc-info p{color:var(--muted);font-size:.78rem}
.mc-price{color:var(--yellow);font-family:'Rajdhani',sans-serif;font-size:1.35rem;font-weight:700;white-space:nowrap}
.mc-arrow{position:absolute;top:calc(50% - 22px);width:44px;height:44px;border-radius:50%;border:1px solid var(--border);background:rgba(8,8,10,.92);color:var(--yellow);font-size:1.7rem;line-height:1;cursor:pointer;z-index:3;transition:.2s;display:flex;align-items:center;justify-content:center;padding-bottom:3px}
.mc-arrow:hover:not(:disabled){background:var(--yellow);color:#000}
.mc-arrow:disabled{opacity:.3;cursor:default}
.mc-prev{left:-6px}.mc-next{right:-6px}
.mc-cta{text-align:center;margin-top:26px}
.mshop-sub{color:var(--muted);margin:-18px 0 32px;max-width:640px}
.mgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:22px}
.pd{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:40px;align-items:start}
.pd-gallery{position:relative}
.pd-main{position:relative;aspect-ratio:4/5;border:1px solid var(--border);border-radius:20px;overflow:hidden;background:linear-gradient(160deg,#1b1b20,#0c0c0f)}
.pd-main img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;opacity:0;transition:opacity .35s}
.pd-main img.on{opacity:1}
.pd-flip{position:absolute;top:calc(50% - 20px);width:40px;height:40px;border-radius:50%;border:1px solid var(--border);background:rgba(8,8,10,.85);color:var(--yellow);font-size:1.4rem;cursor:pointer;z-index:3;display:flex;align-items:center;justify-content:center;padding-bottom:3px}
.pd-flip:hover{background:var(--yellow);color:#000}
.pd-flip.l{left:12px}.pd-flip.r{right:12px}
.pd-thumbs{display:flex;gap:12px;margin-top:14px}
.pd-th{width:92px;background:var(--card);border:2px solid var(--border);border-radius:12px;padding:4px;cursor:pointer;color:var(--muted);text-align:center;font-size:.7rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;transition:.2s}
.pd-th img{width:100%;aspect-ratio:1/1;object-fit:contain;border-radius:8px;display:block;background:#0c0c0f}
.pd-th.active{border-color:var(--yellow);color:#fff}
.pd-info h1{font-family:'Rajdhani',sans-serif;font-size:clamp(2rem,4vw,3rem);letter-spacing:2px;line-height:1.05;overflow-wrap:anywhere;margin:10px 0 6px}
.pd-info .role{position:static;display:inline-block}
.pd-price{font-family:'Rajdhani',sans-serif;font-size:2rem;color:var(--yellow);font-weight:700}
.pd-block{margin:22px 0}
.pd-block h4{font-size:.72rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
.sizes{display:flex;gap:10px;flex-wrap:wrap}
.sz{min-width:58px;padding:12px 0;background:var(--bg-2);border:1px solid var(--border);border-radius:10px;color:#f1f1f3;font-weight:700;cursor:pointer;transition:.2s}
.sz:hover{border-color:var(--yellow)}
.sz.active{background:var(--yellow);color:#000;border-color:var(--yellow)}
.opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.opt{text-align:left;padding:14px;background:var(--bg-2);border:1px solid var(--border);border-radius:12px;color:#f1f1f3;cursor:pointer;transition:.2s;font-size:.85rem}
.opt b{display:block;color:var(--yellow);font-family:'Rajdhani',sans-serif;font-size:1.25rem;margin-top:2px}
.opt.active{border-color:var(--yellow);background:rgba(255,230,0,.07)}
.qty{display:inline-flex;align-items:center;border:1px solid var(--border);border-radius:10px;overflow:hidden}
.qty button{width:44px;height:44px;background:var(--bg-2);color:#fff;border:none;font-size:1.2rem;cursor:pointer}
.qty button:hover{background:var(--yellow);color:#000}
.qty span{min-width:48px;text-align:center;font-weight:700}
.pd-total{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid var(--border);padding-top:18px;margin:26px 0 16px;color:var(--muted);text-transform:uppercase;letter-spacing:2px;font-size:.8rem}
.pd-total strong{font-family:'Rajdhani',sans-serif;font-size:2.2rem;color:var(--yellow);letter-spacing:1px}
.pd-buy{width:100%;padding:16px;font-size:1rem;text-transform:uppercase;letter-spacing:1.5px}
.pd-msg{color:#f25f5c;min-height:1.4em;margin-top:10px;font-size:.9rem}
.co-overlay{position:fixed;inset:0;background:rgba(0,0,0,.78);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px}
.co-box{background:var(--card);border:1px solid var(--yellow);border-radius:20px;padding:32px;max-width:440px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(255,230,0,.15)}
.co-ok{width:64px;height:64px;border-radius:50%;background:var(--yellow);color:#000;font-size:2rem;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.co-box h3{font-family:'Rajdhani',sans-serif;font-size:2rem;letter-spacing:2px;text-transform:uppercase}
.co-box p{color:var(--muted);margin:8px 0}
.co-sum{background:var(--bg-2);border:1px solid var(--border);border-radius:12px;padding:12px;color:#f1f1f3!important;font-weight:600}
.co-total{font-family:'Rajdhani',sans-serif;font-size:1.8rem;color:var(--yellow)!important}
.co-note{font-size:.78rem}
@media(max-width:860px){.pd{grid-template-columns:1fr;gap:26px}.mc-track .mc-item{flex-basis:calc((100% - 14px)/2)}}
@media(max-width:520px){.mc-track .mc-item{flex-basis:100%}.mc{padding:0 16px}.mc-prev{left:-8px}.mc-next{right:-8px}.opts{grid-template-columns:1fr}.mgrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}}
@media(prefers-reduced-motion:reduce){.mc-track{scroll-behavior:auto}}
`;
document.head.appendChild(sty);

let CFG={currency:'RON',price:350,signedExtra:50,sizes:['XS','S','M','L','XL'],maxQty:10};
let ITEMS=[];
const ST={size:null,signed:false,qty:1,side:'front'};
const EXTS=['png','jpg','jpeg','webp'];
const money=n=>n+' '+CFG.currency;
const itemName=p=>p.name+' '+t('merch.teeSuffix');
const x=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function ph(name,side){
  const n=x(name);
  const big=side==='back';
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 440'><rect width='400' height='440' fill='#141418'/><path d='M120 60 L56 104 L90 166 L120 144 L120 384 L280 384 L280 144 L310 166 L344 104 L280 60 Q200 112 120 60Z' fill='#0e0e11' stroke='#ffe600' stroke-width='3'/><text x='200' y='${big?200:190}' text-anchor='middle' font-family='Arial Black,Arial,sans-serif' font-weight='900' font-size='${big?(n.length>8?30:40):22}' fill='#ffe600'>${big?n:'CIUC NAVI'}</text><text x='200' y='${big?236:224}' text-anchor='middle' font-family='Arial,sans-serif' font-weight='700' font-size='15' fill='#9a9aa5'>${big?'CIUC NAVI':n}</text><text x='200' y='416' text-anchor='middle' font-family='Arial,sans-serif' font-size='13' fill='#5d5d68' letter-spacing='3'>${side.toUpperCase()}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
const imgTag=(p,side,cls)=>`<img class='${cls||''}' src='merchphotos/${p.slug}-${side}.png' data-slug='${p.slug}' data-side='${side}' data-ext='0' data-name='${esc(p.name)}' alt='${esc(itemName(p))} - ${side}' loading='lazy'>`;
function wireImgs(scope){
  (scope||document).querySelectorAll('img[data-side]').forEach(i=>{
    if(i._w)return;i._w=1;
    i.addEventListener('error',()=>{
      const n=Number(i.dataset.ext)+1;
      if(n<EXTS.length){i.dataset.ext=n;i.src='merchphotos/'+i.dataset.slug+'-'+i.dataset.side+'.'+EXTS[n]}
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
  ITEMS=(data.players||[]).filter(p=>p.status==='main').map(p=>({name:p.name,slug:slug(p.name)}));
  draw();
}).catch(err=>{
  const r=document.getElementById('merch-root');
  if(r)r.innerHTML=`<p class='empty'>${esc(err.message)}</p>`;
});
document.addEventListener('langchange',()=>{if(ITEMS.length)draw()});
})();
