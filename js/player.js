(function(){
const root=document.getElementById('player-root');
const want=(new URLSearchParams(location.search).get('p')||'').toLowerCase();
let ST=null,tab='stats';

const pretty=k=>k.split('_').map(w=>['ct','t','hs','ms','adr','kd'].includes(w)?w.toUpperCase():(w?w[0].toUpperCase()+w.slice(1):w)).join(' ');

function fmt(k,v){
  if(typeof v!=='number')return String(v);
  const key=k.toLowerCase();
  const pc=['ratio','percentage','accuracy','winrate','success'].some(x=>key.includes(x));
  if(pc)return (Math.abs(v)<=1?v*100:v).toFixed(1)+'%';
  if(key.endsWith('_ms'))return Math.round(v)+' ms';
  return Number.isInteger(v)?v.toLocaleString():v.toFixed(2);
}

function grid(obj){
  const e=Object.entries(obj||{}).filter(([k,v])=>v!==null&&v!==''&&typeof v!=='object');
  if(!e.length)return '';
  return `<div class='kv-grid'>${e.map(([k,v])=>`<div class='kv'><strong>${esc(fmt(k,v))}</strong><span>${esc(pretty(k))}</span></div>`).join('')}</div>`;
}

function crosshairSVG(c){
  const col=c.color||'#00ff00';
  const len=(parseFloat(c.size)||3)*5;
  const th=Math.max(1.5,(parseFloat(c.thickness)||1)*2.5);
  const gap=Math.max(0,6+(isNaN(parseFloat(c.gap))?-1:parseFloat(c.gap))*2.5);
  const o=60;
  const bars=[[o-gap-len,o-th/2,len,th],[o+gap,o-th/2,len,th],[o-th/2,o-gap-len,th,len],[o-th/2,o+gap,th,len]];
  const rect=(b,fill,pad)=>`<rect x='${b[0]-pad}' y='${b[1]-pad}' width='${b[2]+pad*2}' height='${b[3]+pad*2}' fill='${fill}'/>`;
  let s=`<svg viewBox='0 0 120 120' width='160' height='160'>`;
  if(c.outline!==false&&c.outline!=='false')s+=bars.map(b=>rect(b,'#000',1)).join('');
  s+=bars.map(b=>rect(b,col,0)).join('');
  if(c.dot===true||c.dot==='true')s+=`<rect x='${o-th/2}' y='${o-th/2}' width='${th}' height='${th}' fill='${col}'/>`;
  return s+'</svg>';
}

function settingsHTML(set){
  const order=['mouse','video','viewmodel','gear'];
  const keys=[...order.filter(k=>set&&set[k]),...Object.keys(set||{}).filter(k=>!order.includes(k))];
  return keys.map(g=>{
    const items=Object.entries(set[g]||{});
    return `<div class='panel'><h3>${esc(I18N[LANG]['set.'+g]||I18N.en['set.'+g]||pretty(g))}</h3><div class='kv-grid'>${items.map(([k,v])=>{
      const label=I18N[LANG]['set.'+k]||I18N.en['set.'+k]||pretty(k);
      return `<div class='kv'><strong>${v===''||v==null?'—':esc(v)}</strong><span>${esc(label)}</span></div>`;
    }).join('')}</div></div>`;
  }).join('');
}

function render(){
  if(!ST){return}
  const {p,s,detail,info}=ST;
  if(!p){root.innerHTML=`<a class='back' href='index.html#roster'>${t('player.back')}</a><p class='empty'>${t('player.notfound')}</p>`;return}
  document.title=p.name+' | Ciuc Navi';
  const img=p.icon?`<img src='icons/${encodeURIComponent(p.icon)}' alt='${esc(p.name)}' data-ini='${esc(initials(p.name))}'>`:`<span class='initials'>${esc(initials(p.name))}</span>`;
  const l=p.links||{};
  const leet=p.steam64?`https://leetify.com/app/profile/${encodeURIComponent(p.steam64)}`:'';
  const links=(l.steam?`<a class='btn btn-ghost btn-small' href='${esc(l.steam)}' target='_blank' rel='noopener'>Steam</a>`:'')+(leet?`<a class='btn btn-ghost btn-small' href='${esc(leet)}' target='_blank' rel='noopener'>Leetify</a>`:'');
  const prem=s.premier&&s.premier!=='-'?s.premier:'—';

  let body='';
  if(tab==='stats'){
    const sum=[[t('card.premier'),s.premier],[t('card.hs'),s.hs],[t('card.win'),s.winrate],[t('sum.matches'),s.matches]].filter(x=>x[1]!==undefined&&x[1]!==''&&x[1]!=='-');
    if(sum.length)body+=`<div class='panel'><h3>${t('sec.summary')}</h3><div class='kv-grid'>${sum.map(x=>`<div class='kv'><strong>${esc(x[1])}</strong><span>${esc(x[0])}</span></div>`).join('')}</div></div>`;
    const d=detail||{};
    const r=grid(d.rating),st=grid(d.stats),rk=grid(d.ranks);
    if(r)body+=`<div class='panel'><h3>${t('sec.rating')}</h3>${r}</div>`;
    if(st)body+=`<div class='panel'><h3>${t('sec.stats')}</h3>${st}</div>`;
    if(rk)body+=`<div class='panel'><h3>${t('sec.ranks')}</h3>${rk}</div>`;
    if(!r&&!st&&!rk)body+=`<div class='panel'><h3>${t('nodata.title')}</h3><p class='note'>${t('nodata.text')}</p></div>`;
  }else{
    const c=(info&&info.crosshair)||{};
    const code=c.code||'';
    body+=`<div class='panel'><h3>${t('xh.title')}</h3><div class='crosshair-box'><div class='xh-preview'>${crosshairSVG(c)}</div><div><div class='note'>${t('xh.code')}</div><div class='code-row'><div class='code'>${code?esc(code):t('xh.empty')}</div>${code?`<button class='btn btn-small' id='copy-xh'>${t('xh.copy')}</button>`:''}</div><p class='note' style='margin-top:12px'>${t('xh.note')}</p></div></div></div>`;
    body+=settingsHTML(info&&info.settings);
  }

  root.innerHTML=`<a class='back' href='index.html#roster'>${t('player.back')}</a>
  <div class='p-hero'>
    <div class='p-img'>${img}</div>
    <div class='p-info'>
      <span class='role'>${esc(p.role)}</span>
      <h1>${esc(p.name)}</h1>
      <p class='p-tag'>${esc(p.tag||'')}</p>
      <div class='p-premier'><strong>${esc(prem)}</strong><span>${t('card.premier')}</span></div>
      <div class='p-links'>${links}</div>
    </div>
  </div>
  <div class='tabs'>
    <button class='tab-btn ${tab==='stats'?'active':''}' data-tab='stats'>${t('tab.stats')}</button>
    <button class='tab-btn ${tab==='settings'?'active':''}' data-tab='settings'>${t('tab.settings')}</button>
  </div>
  <div>${body}</div>`;

  root.querySelectorAll('.tab-btn').forEach(b=>b.addEventListener('click',()=>{tab=b.dataset.tab;render()}));
  const cp=document.getElementById('copy-xh');
  if(cp)cp.addEventListener('click',()=>{
    navigator.clipboard.writeText(info.crosshair.code).then(()=>{cp.textContent=t('xh.copied');setTimeout(()=>{cp.textContent=t('xh.copy')},1500)});
  });
  fixImages();
  const u=document.getElementById('stats-updated');
  if(u&&ST.live._updated)u.textContent=t('updated')+': '+ST.live._updated+'. ';
}

Promise.all([getJson('data/players.json'),getJson('data/stats.json').catch(()=>({})),getJson('data/player-details.json').catch(()=>({}))]).then(([data,live,details])=>{
  const p=(data.players||[]).find(x=>slug(x.name)===want);
  let s={},detail=null;
  if(p){
    const auto=live[p.steam64]||live[p.vanity]||{};
    const {detail:dd,...flat}=auto;
    s={...(p.stats||{}),...flat};detail=dd||null;
  }
  ST={p,s,detail,info:p?details[slug(p.name)]:null,live};
  render();
}).catch(err=>{root.innerHTML=`<p class='empty'>${esc(err.message)}</p>`});
document.addEventListener('langchange',render);
})();
