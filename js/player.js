(function(){
function boot(){
const root=document.getElementById('player-root');
const want=(new URLSearchParams(location.search).get('p')||'').toLowerCase();
let ST=null,tab='stats';

const pretty=k=>k.split('_').map(w=>w?w[0].toUpperCase()+w.slice(1):w).join(' ');

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

function statsTab(){
  const C=window.Charts;
  const {p,s,detail}=ST;
  const d=detail||{};const st=d.stats||{};
  if(!C||!detail)return `<div class='panel'><h3>${t('nodata.title')}</h3><p class='note'>${t('nodata.text')}</p></div>`;
  let h='';
  const g=(v,label)=>v==null?'':C.gauge(v,label,v.toFixed(1)+'%');
  const pc=k=>typeof st[k]==='number'?C.pctv(st[k]):null;
  const opens=[pc('ct_opening_duel_success_percentage'),pc('t_opening_duel_success_percentage')].filter(x=>x!=null);
  const open=opens.length?opens.reduce((a,b)=>a+b,0)/opens.length:null;
  const gauges=[g(C.num(s.winrate),t('chart.winrate')),g(pc('accuracy_head'),t('chart.hs')),g(pc('spray_accuracy'),t('chart.spray')),g(pc('counter_strafing_good_shots_ratio'),t('chart.cs')),g(open,t('chart.open')),g(pc('trade_kills_success_percentage'),t('chart.trade'))].join('');
  const tile=(k,v)=>v==null||v===''||v==='-'?'':`<div class='kv'><strong>${esc(v)}</strong><span>${esc(k)}</span></div>`;
  const tiles=[
    tile(t('tile.premier'),s.premier),
    tile(t('tile.matches'),s.matches),
    typeof st.reaction_time_ms==='number'?tile(C.statLabel('reaction_time_ms'),C.fmtStat('reaction_time_ms',st.reaction_time_ms)):'',
    typeof st.preaim==='number'?tile(C.statLabel('preaim'),C.fmtStat('preaim',st.preaim)):'',
    typeof st.flashbang_hit_foe_per_flashbang==='number'?tile(C.statLabel('flashbang_hit_foe_per_flashbang'),C.fmtStat('flashbang_hit_foe_per_flashbang',st.flashbang_hit_foe_per_flashbang)):'',
    typeof st.he_foes_damage_avg==='number'?tile(C.statLabel('he_foes_damage_avg'),C.fmtStat('he_foes_damage_avg',st.he_foes_damage_avg)):''
  ].join('');
  h+=`<div class='panel reveal'><h3>${t('chart.perf')}</h3><div class='gauges'>${gauges}</div><div class='tiles'>${tiles}</div></div>`;
  const axes=C.orderAxes(C.profileAxes(d));
  if(axes.length>=3){
    const pv={};axes.forEach(a=>{pv[a.key]=a.value});
    h+=`<div class='panel reveal'><h3>${t('chart.radar')}</h3>${C.radar(axes,[{color:'#ffe600',fill:.25,w:2.6,values:pv}])}</div>`;
  }
  h+=C.ranksPanel(d.ranks,s.premier);
  h+=C.playerMaps(d.recent);
  h+=C.formPanel(d.recent);
  h+=C.ratingsPanel(d.rating);
  h+=C.statGroups(st);
  return h;
}

function render(){
  if(!ST){return}
  const {p,s,info}=ST;
  if(!p){root.innerHTML=`<a class='back' href='index.html#roster'>${t('player.back')}</a><p class='empty'>${t('player.notfound')}</p>`;return}
  document.title=p.name+' | Ciuc Navi';
  const img=p.icon?`<img src='icons/${encodeURIComponent(p.icon)}' alt='${esc(p.name)}' data-ini='${esc(initials(p.name))}'>`:`<span class='initials'>${esc(initials(p.name))}</span>`;
  const l=p.links||{};
  const leet=p.steam64?`https://leetify.com/app/profile/${encodeURIComponent(p.steam64)}`:'';
  const links=(l.steam?`<a class='btn btn-ghost btn-small' href='${esc(l.steam)}' target='_blank' rel='noopener'>Steam</a>`:'')+(leet?`<a class='btn btn-ghost btn-small' href='${esc(leet)}' target='_blank' rel='noopener'>Leetify</a>`:'');
  const prem=s.premier&&s.premier!=='-'?s.premier:'—';

  let body='';
  if(tab==='stats'){
    body=statsTab();
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
  fixImages();observeReveals();
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
}
if(window.Charts){boot()}else{
  const s=document.createElement('script');s.src='js/charts.js';s.onload=boot;s.onerror=boot;document.head.appendChild(s);
}
})();
