(function(){
const add=(l,o)=>Object.assign(I18N[l],o);
add('en',{
'nav.dashboard':`Dashboard`,
'dash.title':`Team ~Dashboard~`,
'dash.avgPremier':`Avg. Premier`,'dash.avgHs':`Avg. HS%`,'dash.avgWin':`Avg. win rate`,'dash.matches':`Total matches`,
'dash.premierChart':`Premier rating by player`,'dash.hsChart':`Headshot accuracy`,'dash.winChart':`Win rate`,
'dash.radar':`Team skill radar`,'dash.radarTeam':`Team average`,
'dash.nodata':`Charts appear as soon as players register on Leetify.`,
'chart.perf':`Performance`,'chart.winrate':`Win rate`,'chart.hs':`Headshot %`,'chart.radar':`Skill profile`,
'chart.accuracy':`Accuracy & ratios`,'chart.vsTeam':`Compared to team average`,'chart.player':`Player`,'chart.team':`Team avg.`
});
add('ro',{
'nav.dashboard':`Panou`,
'dash.title':`Panou ~echipă~`,
'dash.avgPremier':`Premier mediu`,'dash.avgHs':`HS% mediu`,'dash.avgWin':`Rată victorii medie`,'dash.matches':`Meciuri totale`,
'dash.premierChart':`Rating Premier pe jucător`,'dash.hsChart':`Precizie headshot`,'dash.winChart':`Rată victorii`,
'dash.radar':`Radar abilități echipă`,'dash.radarTeam':`Media echipei`,
'dash.nodata':`Graficele apar imediat ce jucătorii se înregistrează pe Leetify.`,
'chart.perf':`Performanță`,'chart.winrate':`Rată victorii`,'chart.hs':`Headshot %`,'chart.radar':`Profil de abilități`,
'chart.accuracy':`Precizie și rapoarte`,'chart.vsTeam':`Comparat cu media echipei`,'chart.player':`Jucător`,'chart.team':`Media echipei`
});
add('hu',{
'nav.dashboard':`Irányítópult`,
'dash.title':`Csapat ~irányítópult~`,
'dash.avgPremier':`Átl. Premier`,'dash.avgHs':`Átl. HS%`,'dash.avgWin':`Átl. győzelmi arány`,'dash.matches':`Összes meccs`,
'dash.premierChart':`Premier érték játékosonként`,'dash.hsChart':`Fejlövés pontosság`,'dash.winChart':`Győzelmi arány`,
'dash.radar':`Csapat képességradar`,'dash.radarTeam':`Csapatátlag`,
'dash.nodata':`A diagramok megjelennek, amint a játékosok regisztrálnak a Leetify-on.`,
'chart.perf':`Teljesítmény`,'chart.winrate':`Győzelmi arány`,'chart.hs':`Fejlövés %`,'chart.radar':`Képességprofil`,
'chart.accuracy':`Pontosság és arányok`,'chart.vsTeam':`Csapatátlaghoz képest`,'chart.player':`Játékos`,'chart.team':`Csapatátlag`
});

const st=document.createElement('style');
st.textContent=`
.dash-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:22px;margin-bottom:22px}
.dash-grid .panel{margin-bottom:0}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:22px}
.kpi{background:linear-gradient(135deg,#17170a,var(--card));border:1px solid var(--border);border-radius:14px;padding:18px 20px}
.kpi strong{display:block;font-family:'Rajdhani',sans-serif;font-size:2.2rem;color:var(--yellow);line-height:1.1}
.kpi span{font-size:.72rem;color:var(--muted);text-transform:uppercase;letter-spacing:2px}
.bars{display:flex;flex-direction:column;gap:12px}
.bar-row{display:grid;grid-template-columns:130px 1fr 70px;align-items:center;gap:10px;font-size:.85rem}
.bar-label{color:var(--text);font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bar-track{height:10px;background:var(--bg-2);border-radius:99px;overflow:hidden;border:1px solid var(--border)}
.bar-fill{height:100%;border-radius:99px;transform-origin:left;animation:growx 1.1s cubic-bezier(.2,.8,.2,1)}
.bar-val{text-align:right;color:var(--yellow);font-weight:700}
@keyframes growx{from{transform:scaleX(0)}}
.cols{display:flex;align-items:flex-end;gap:14px;height:240px;padding-top:10px}
.col{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;min-width:0}
.col-bar{width:100%;max-width:56px;border-radius:8px 8px 0 0;background:linear-gradient(to top,#8a7d00,var(--yellow));transform-origin:bottom;animation:growy 1.1s cubic-bezier(.2,.8,.2,1)}
@keyframes growy{from{transform:scaleY(0)}}
.col-val{font-size:.8rem;color:var(--yellow);font-weight:700;margin-bottom:6px}
.col-name{font-size:.72rem;color:var(--muted);margin-top:8px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.radar{width:100%;max-width:440px;display:block;margin:0 auto}
.radar text{fill:#9a9aa5;font-size:11px;font-family:Inter,sans-serif}
.rad-poly{animation:fadein 1s ease-out}
@keyframes fadein{from{opacity:0}}
.legend{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:12px;font-size:.78rem;color:var(--muted)}
.legend i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px}
.gauges{display:flex;gap:30px;flex-wrap:wrap;justify-content:center}
.gauge{text-align:center;width:150px}
.gauge span{display:block;font-size:.72rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);margin-top:4px}
.g-arc{animation:garc 1.3s ease-out}
@keyframes garc{from{stroke-dasharray:0 400}}
.g-text{fill:#ffe600;font-family:Rajdhani,sans-serif;font-size:26px;font-weight:700}
.cmp{margin-bottom:18px}
.cmp-head{display:flex;justify-content:space-between;font-size:.78rem;margin-bottom:6px;color:var(--muted);text-transform:uppercase;letter-spacing:1px}
.cmp-head b{color:var(--text)}
.cmp .bar-track{margin-bottom:4px}
@media(prefers-reduced-motion:reduce){.bar-fill,.col-bar,.rad-poly,.g-arc{animation:none}}
`;
document.head.appendChild(st);

const PAL=['#ffe600','#4cc9f0','#f72585','#7ae582','#b388ff','#ff9f1c'];
const num=v=>{const n=parseFloat(String(v==null?'':v).replace(/[%,\s]/g,''));return isNaN(n)?null:n};
const pretty=k=>String(k).split('_').map(w=>['ct','t','hs','ms','adr','kd'].includes(w)?w.toUpperCase():(w?w[0].toUpperCase()+w.slice(1):w)).join(' ');
const PREF=['aim','positioning','utility'];
const prefIdx=k=>{const i=PREF.indexOf(k);return i<0?99:i};
function orderAxes(a){return a.slice().sort((x,y)=>prefIdx(x.key)-prefIdx(y.key))}
function ratingAxes(r){
  const e=Object.entries(r||{}).filter(([k,v])=>typeof v==='number'&&isFinite(v)&&v>1&&v<=100);
  return orderAxes(e.map(([k,v])=>({key:k,label:pretty(k),value:v}))).slice(0,8);
}
function radar(axes,series){
  const n=axes.length;if(n<3)return '';
  const c=200,R=118;
  const ang=i=>-Math.PI/2+i*2*Math.PI/n;
  const pt=(i,v)=>{const r=R*Math.max(0,Math.min(100,v))/100;return [c+r*Math.cos(ang(i)),c+r*Math.sin(ang(i))]};
  const f=a=>a.map(x=>x.toFixed(1)).join(',');
  let g='';
  [25,50,75,100].forEach(l=>{g+=`<polygon points='${axes.map((a,i)=>f(pt(i,l))).join(' ')}' fill='none' stroke='#2a2a31'/>`});
  axes.forEach((a,i)=>{
    const e=pt(i,100);
    g+=`<line x1='${c}' y1='${c}' x2='${e[0].toFixed(1)}' y2='${e[1].toFixed(1)}' stroke='#2a2a31'/>`;
    const lx=c+(R+16)*Math.cos(ang(i)),ly=c+(R+16)*Math.sin(ang(i))+4;
    const cs=Math.cos(ang(i));
    const an=cs>0.3?'start':(cs<-0.3?'end':'middle');
    g+=`<text x='${lx.toFixed(1)}' y='${ly.toFixed(1)}' text-anchor='${an}'>${esc(a.label)}</text>`;
  });
  series.forEach(s=>{
    const pts=axes.map((a,i)=>{const v=s.values[a.key];return f(pt(i,v==null?0:v))}).join(' ');
    g+=`<polygon class='rad-poly' points='${pts}' fill='${s.color}' fill-opacity='${s.fill}' stroke='${s.color}' stroke-width='${s.w}' stroke-linejoin='round'/>`;
  });
  return `<svg viewBox='-40 0 480 400' class='radar'>${g}</svg>`;
}
function bars(items,max){
  return `<div class='bars'>${items.map(it=>{
    const w=Math.max(2,Math.min(100,it.value/max*100));
    return `<div class='bar-row'><span class='bar-label'>${esc(it.label)}</span><div class='bar-track'><div class='bar-fill' style='width:${w}%;background:${it.color||'#ffe600'}'></div></div><span class='bar-val'>${esc(it.text)}</span></div>`;
  }).join('')}</div>`;
}
function columns(items,max){
  return `<div class='cols'>${items.map(it=>{
    const h=Math.max(3,Math.min(100,it.value/max*100));
    return `<div class='col'><span class='col-val'>${esc(it.text)}</span><div class='col-bar' style='height:${h*0.82}%'></div><span class='col-name'>${esc(it.name)}</span></div>`;
  }).join('')}</div>`;
}
function gauge(p,label,text){
  const r=52,c=2*Math.PI*r,v=Math.max(0,Math.min(100,p));
  return `<div class='gauge'><svg viewBox='0 0 140 140'><circle cx='70' cy='70' r='52' fill='none' stroke='#25252b' stroke-width='12'/><circle class='g-arc' cx='70' cy='70' r='52' fill='none' stroke='#ffe600' stroke-width='12' stroke-linecap='round' stroke-dasharray='${(c*v/100).toFixed(1)} ${c.toFixed(1)}' transform='rotate(-90 70 70)'/><text x='70' y='78' text-anchor='middle' class='g-text'>${esc(text)}</text></svg><span>${esc(label)}</span></div>`;
}
function compare(label,pv,tv,max,pt,tt){
  const w=x=>Math.max(2,Math.min(100,x/max*100));
  return `<div class='cmp'><div class='cmp-head'><span>${esc(label)}</span><span><b>${esc(pt)}</b> / ${esc(tt)}</span></div><div class='bar-track'><div class='bar-fill' style='width:${w(pv)}%;background:#ffe600'></div></div><div class='bar-track'><div class='bar-fill' style='width:${w(tv)}%;background:#4cc9f0'></div></div></div>`;
}
function legend(items){
  return `<div class='legend'>${items.map(i=>`<span><i style='background:${i.color}'></i>${esc(i.name)}</span>`).join('')}</div>`;
}
window.Charts={num,pretty,ratingAxes,orderAxes,radar,bars,columns,gauge,compare,legend,PAL};
})();
