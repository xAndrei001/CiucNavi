(function(){
const add=(l,o)=>Object.assign(I18N[l],o);
add('en',{'cmp.title':`Head ~to Head~`,'cmp.back':`← Back to team`,'cmp.leads':`leads in`,'cmp.of':`of`,'cmp.cats':`categories`,'cmp.even':`Dead even`,'cmp.radar':`Skill profile`,'cmp.stats':`Stat by stat`,'cmp.nodata':`No data yet`,'cmp.pick':`Pick two players to compare.`});
add('ro',{'cmp.title':`Față ~în față~`,'cmp.back':`← Înapoi la echipă`,'cmp.leads':`conduce la`,'cmp.of':`din`,'cmp.cats':`categorii`,'cmp.even':`Egalitate perfectă`,'cmp.radar':`Profil de abilități`,'cmp.stats':`Statistică cu statistică`,'cmp.nodata':`Fără date încă`,'cmp.pick':`Alege doi jucători pentru comparație.`});
add('hu',{'cmp.title':`Szemtől ~szemben~`,'cmp.back':`← Vissza a csapathoz`,'cmp.leads':`vezet`,'cmp.of':`/`,'cmp.cats':`kategóriában`,'cmp.even':`Teljesen egyenlő`,'cmp.radar':`Képességprofil`,'cmp.stats':`Statisztikáról statisztikára`,'cmp.nodata':`Még nincs adat`,'cmp.pick':`Válassz ki két játékost az összehasonlításhoz.`});

const sty=document.createElement('style');
sty.textContent=`
.cmp-pick{display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:center;margin-bottom:26px}
.cmp-pick select{width:100%;background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:10px;padding:12px 14px;font:600 1rem Inter,sans-serif}
.cmp-pick select:focus{outline:none;border-color:var(--yellow)}
.cmp-vs{font-family:'Rajdhani',sans-serif;font-weight:700;font-size:1.6rem;color:var(--yellow);letter-spacing:2px}
.cmp-people{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-bottom:22px}
.cmp-card{display:grid;grid-template-columns:110px 1fr;gap:18px;align-items:center;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;border-top:3px solid var(--c)}
.cmp-card .ph{aspect-ratio:1/1;border-radius:12px;overflow:hidden;background:linear-gradient(160deg,#1b1b20,#0c0c0f);display:flex;align-items:center;justify-content:center}
.cmp-card img{width:100%;height:100%;object-fit:cover;object-position:50% 0}
.cmp-card h2{font-family:'Rajdhani',sans-serif;font-size:1.9rem;letter-spacing:1px;line-height:1}
.cmp-card .role{position:static;display:inline-block;margin-top:6px;background:var(--yellow);color:#000;font-weight:800;font-size:.66rem;letter-spacing:1.5px;text-transform:uppercase;padding:3px 9px;border-radius:5px}
.cmp-card .pr{display:block;margin-top:8px;font-family:'Rajdhani',sans-serif;font-size:1.7rem}
.cmp-sum{color:var(--muted);margin-bottom:10px}
.cmp-sum b{color:var(--c);font-family:'Rajdhani',sans-serif;font-size:1.2rem}
.cmp-row{display:grid;grid-template-columns:84px 1fr 84px;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid var(--border)}
.cmp-row:last-child{border-bottom:0}
.cmp-v{font-family:'Rajdhani',sans-serif;font-size:1.45rem;font-weight:700;color:var(--muted)}
.cmp-v.win{color:#fff}
.cmp-v.l{text-align:left}.cmp-v.r{text-align:right}
.cmp-mid label{display:block;text-align:center;font-size:.7rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);margin-bottom:5px}
.cmp-bars{display:flex;gap:4px}
.cmp-bars>div{flex:1;height:8px;background:var(--bg-2);border-radius:99px;overflow:hidden;display:flex}
.cmp-bars .la{justify-content:flex-end}
.cmp-bars i{display:block;height:100%;border-radius:99px;opacity:.45;animation:growx 1s cubic-bezier(.2,.8,.2,1)}
.cmp-bars i.win{opacity:1}
@media(max-width:720px){.cmp-pick{grid-template-columns:1fr}.cmp-vs{text-align:center}.cmp-people{grid-template-columns:1fr}.cmp-row{grid-template-columns:62px 1fr 62px}}
`;
document.head.appendChild(sty);
applyLang();

const root=document.getElementById('compare-root');
const C=window.Charts;
const COL=[C.PLC[0],C.PLC[1]];
let PL=[],LIVE={},A=null,B=null;
const DET={};
const detail=p=>{
  if(!p||!(LIVE[p.steam64]||{}).hasDetail)return Promise.resolve(null);
  return DET[p.steam64]||(DET[p.steam64]=getJson('data/stats/'+p.steam64+'.json').then(x=>x.detail||null).catch(()=>null));
};
const stat=p=>({...(p.stats||{}),...(LIVE[p.steam64]||{})});
const fmt={n:v=>v==null?'—':Math.round(v).toLocaleString(LANG),p:v=>v==null?'—':v.toFixed(1)+'%',d:v=>v==null?'—':v.toFixed(1)};

function row(label,a,b,f,col){
  const win=a!=null&&b!=null&&a!==b?(a>b?0:1):-1;
  const mx=Math.max(a||0,b||0,1e-9);
  const w=v=>v==null?0:Math.max(2,v/mx*100);
  return `<div class='cmp-row'><span class='cmp-v l${win===0?' win':''}'>${f(a)}</span>
    <div class='cmp-mid'><label>${esc(label)}</label><div class='cmp-bars'><div class='la'><i class='${win===0?'win':''}' style='width:${w(a)}%;background:${col[0]}'></i></div><div><i class='${win===1?'win':''}' style='width:${w(b)}%;background:${col[1]}'></i></div></div></div>
    <span class='cmp-v r${win===1?' win':''}'>${f(b)}</span></div>`;
}

function person(p,i){
  const s=stat(p),img=p.icon?`<img src='img/players/${encodeURIComponent(p.icon)}' width='600' height='600' data-ini='${esc(initials(p.name))}' alt='${esc(p.name)}'>`:'';
  return `<div class='cmp-card' style='--c:${COL[i]}'><div class='ph'>${img}</div><div><h2>${esc(p.name)}</h2><span class='role'>${esc(p.role)}</span><strong class='pr tier-${tierOf(numOf(s.premier))}'>${s.premier&&s.premier!=='-'?esc(s.premier):'—'}</strong></div></div>`;
}

function select(id,cur){
  return `<select id='${id}'>${PL.map(p=>`<option value='${slug(p.name)}'${slug(p.name)===cur?' selected':''}>${esc(p.name)}</option>`).join('')}</select>`;
}

async function draw(){
  const pa=PL.find(p=>slug(p.name)===A),pb=PL.find(p=>slug(p.name)===B);
  if(!pa||!pb){root.innerHTML=`<p class='empty'>${t('cmp.pick')}</p>`;return}
  const [da,db]=await Promise.all([detail(pa),detail(pb)]);
  const sa=stat(pa),sb=stat(pb);
  const rows=[
    [t('card.premier'),numOf(sa.premier),numOf(sb.premier),fmt.n],
    [t('card.hs'),numOf(sa.hs),numOf(sb.hs),fmt.p],
    [t('card.win'),numOf(sa.winrate),numOf(sb.winrate),fmt.p],
    [t('sum.matches'),sa.matches==null?null:Number(sa.matches),sb.matches==null?null:Number(sb.matches),fmt.n]
  ].map(r=>r.map((x,i)=>i>=1&&i<=2&&Number.isNaN(x)?null:x));
  const ax=[C.profileAxes(da),C.profileAxes(db)];
  const keys=C.orderAxes([...ax[0],...ax[1]].filter((x,i,arr)=>arr.findIndex(y=>y.key===x.key)===i));
  const val=(list,k)=>{const f=list.find(x=>x.key===k);return f?f.value:null};
  keys.forEach(k=>rows.push([k.label,val(ax[0],k.key),val(ax[1],k.key),fmt.d]));
  let la=0,lb=0;
  rows.forEach(r=>{if(r[1]!=null&&r[2]!=null){if(r[1]>r[2])la++;else if(r[2]>r[1])lb++}});
  const total=rows.filter(r=>r[1]!=null&&r[2]!=null).length;
  const lead=la===lb?`<b style='color:var(--text)'>${t('cmp.even')}</b>`:`<b style='--c:${la>lb?COL[0]:COL[1]}'>${esc((la>lb?pa:pb).name)}</b> ${t('cmp.leads')} ${Math.max(la,lb)} ${t('cmp.of')} ${total} ${t('cmp.cats')}`;
  let radar='';
  if(keys.length>=3&&da&&db){
    const mk=(list,color)=>({color,fill:.12,w:2.4,values:Object.fromEntries(list.map(x=>[x.key,x.value]))});
    radar=`<div class='panel reveal'><h3>${t('cmp.radar')}</h3>${C.radar(keys,[mk(ax[0],COL[0]),mk(ax[1],COL[1])])}${C.legend([{color:COL[0],name:pa.name},{color:COL[1],name:pb.name}])}</div>`;
  }
  root.innerHTML=`<a class='back' href='index.html#roster'>${t('cmp.back')}</a>
    <h2 class='section-title'>${t('cmp.title').replace(/~(.+?)~/g,'<span class=yellow>$1</span>')}</h2>
    <div class='cmp-pick'>${select('cmp-a',A)}<span class='cmp-vs'>VS</span>${select('cmp-b',B)}</div>
    <div class='cmp-people'>${person(pa,0)}${person(pb,1)}</div>
    <div class='panel reveal'><h3>${t('cmp.stats')}</h3><p class='cmp-sum'>${lead}</p>${rows.map(r=>row(r[0],r[1],r[2],r[3],COL)).join('')}</div>
    ${radar}`;
  document.getElementById('cmp-a').onchange=e=>{A=e.target.value;sync();draw()};
  document.getElementById('cmp-b').onchange=e=>{B=e.target.value;sync();draw()};
  fixImages();observeReveals();
}

function sync(){history.replaceState(null,'','compare.html?a='+A+'&b='+B)}

Promise.all([getJson('data/players.json'),getJson('data/stats.json').catch(()=>({}))]).then(([d,live])=>{
  LIVE=live;
  PL=(d.players||[]).filter(p=>p.steam64&&live[p.steam64]);
  const q=new URLSearchParams(location.search);
  const has=s=>PL.some(p=>slug(p.name)===s);
  A=has(q.get('a'))?q.get('a'):(PL[0]&&slug(PL[0].name));
  const other=PL.find(p=>slug(p.name)!==A);
  B=has(q.get('b'))&&q.get('b')!==A?q.get('b'):(other?slug(other.name):null);
  draw();
}).catch(err=>{root.innerHTML=`<p class='empty'>${esc(err.message)}</p>`});
document.addEventListener('langchange',()=>{if(A)draw()});
})();
