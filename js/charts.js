(function(){
const add=(l,o)=>Object.assign(I18N[l],o);
add('en',{
'nav.dashboard':`Dashboard`,
'dash.title':`Team ~Dashboard~`,
'dash.avgPremier':`Avg. Premier`,'dash.avgHs':`Avg. HS%`,'dash.avgWin':`Avg. win rate`,'dash.matches':`Total matches`,
'dash.premierChart':`Premier rating by player`,'dash.hsChart':`Headshot accuracy`,'dash.winChart':`Win rate`,
'dash.radar':`Team skill radar`,'dash.radarTeam':`Team average`,
'dash.nodata':`Charts appear as soon as players register on Leetify.`,
'dash.maps':`Team strengths by map`,'dash.mapsNote':`Win rate across the recent matches of every registered player. Maps with fewer than 3 games are hidden.`,
'dash.best':`Strongest map`,'dash.worst':`Weakest map`,'dash.games':`games`,'dash.nomaps':`Map data appears after the next stats update.`,
'chart.perf':`Performance`,'chart.winrate':`Win rate`,'chart.hs':`Headshot accuracy`,'chart.spray':`Spray control`,'chart.cs':`Counter-strafing`,'chart.open':`Opening duels`,'chart.trade':`Trading`,'chart.radar':`Skill profile`,
'axis.aim':`Aim`,'axis.positioning':`Positioning`,'axis.utility':`Utility`,'axis.cs':`Counter-strafing`,'axis.spray':`Spray control`,'axis.trade':`Trading`,'axis.open':`Opening duels`,
'grp.aim':`Aim & mechanics`,'grp.util':`Utility`,'grp.open':`Opening duels`,'grp.trade':`Trading`,'grp.other':`Other`,
'lower':`Lower is better`,
'rank.premier':`Premier`,'rank.faceit':`FACEIT`,'rank.level':`Level`,'rank.elo':`ELO`,'rank.wingman':`Wingman`,'rank.renown':`Renown`,'rank.leetify':`Leetify`,'rank.competitive':`Competitive`,
'map.title':`Map performance`,'map.form':`Recent form`,'map.formNote':`Last matches, newest on the right.`,'map.win':`Win`,'map.loss':`Loss`,'map.tie':`Tie`,'map.none':`Map data appears after the next stats update.`,
'rt.aim':`Aim`,'rt.positioning':`Positioning`,'rt.utility':`Utility`,'rt.clutch':`Clutch`,'rt.opening':`Opening`,'rt.ct_leetify':`CT side`,'rt.t_leetify':`T side`,
'tile.premier':`Premier`,'tile.matches':`Matches`
});
add('ro',{
'nav.dashboard':`Panou`,
'dash.title':`Panou ~echipă~`,
'dash.avgPremier':`Premier mediu`,'dash.avgHs':`HS% mediu`,'dash.avgWin':`Rată victorii medie`,'dash.matches':`Meciuri totale`,
'dash.premierChart':`Rating Premier pe jucător`,'dash.hsChart':`Precizie headshot`,'dash.winChart':`Rată victorii`,
'dash.radar':`Radar abilități echipă`,'dash.radarTeam':`Media echipei`,
'dash.nodata':`Graficele apar imediat ce jucătorii se înregistrează pe Leetify.`,
'dash.maps':`Punctele forte ale echipei pe hărți`,'dash.mapsNote':`Rată de victorii în meciurile recente ale fiecărui jucător înregistrat. Hărțile cu mai puțin de 3 meciuri sunt ascunse.`,
'dash.best':`Cea mai bună hartă`,'dash.worst':`Cea mai slabă hartă`,'dash.games':`meciuri`,'dash.nomaps':`Datele pe hărți apar după următoarea actualizare a statisticilor.`,
'chart.perf':`Performanță`,'chart.winrate':`Rată victorii`,'chart.hs':`Precizie headshot`,'chart.spray':`Control spray`,'chart.cs':`Counter-strafing`,'chart.open':`Dueluri de deschidere`,'chart.trade':`Trade-uri`,'chart.radar':`Profil de abilități`,
'axis.aim':`Aim`,'axis.positioning':`Poziționare`,'axis.utility':`Utilitare`,'axis.cs':`Counter-strafing`,'axis.spray':`Control spray`,'axis.trade':`Trade-uri`,'axis.open':`Dueluri de deschidere`,
'grp.aim':`Aim și mecanică`,'grp.util':`Utilitare`,'grp.open':`Dueluri de deschidere`,'grp.trade':`Trade-uri`,'grp.other':`Altele`,
'lower':`Mai mic = mai bine`,
'rank.premier':`Premier`,'rank.faceit':`FACEIT`,'rank.level':`Nivel`,'rank.elo':`ELO`,'rank.wingman':`Wingman`,'rank.renown':`Renown`,'rank.leetify':`Leetify`,'rank.competitive':`Competitive`,
'map.title':`Performanță pe hărți`,'map.form':`Forma recentă`,'map.formNote':`Ultimele meciuri, cele mai noi în dreapta.`,'map.win':`Victorie`,'map.loss':`Înfrângere`,'map.tie':`Egal`,'map.none':`Datele pe hărți apar după următoarea actualizare.`,
'rt.aim':`Aim`,'rt.positioning':`Poziționare`,'rt.utility':`Utilitare`,'rt.clutch':`Clutch`,'rt.opening':`Deschidere`,'rt.ct_leetify':`Partea CT`,'rt.t_leetify':`Partea T`,
'tile.premier':`Premier`,'tile.matches':`Meciuri`
});
add('hu',{
'nav.dashboard':`Irányítópult`,
'dash.title':`Csapat ~irányítópult~`,
'dash.avgPremier':`Átl. Premier`,'dash.avgHs':`Átl. HS%`,'dash.avgWin':`Átl. győzelmi arány`,'dash.matches':`Összes meccs`,
'dash.premierChart':`Premier érték játékosonként`,'dash.hsChart':`Fejlövés pontosság`,'dash.winChart':`Győzelmi arány`,
'dash.radar':`Csapat képességradar`,'dash.radarTeam':`Csapatátlag`,
'dash.nodata':`A diagramok megjelennek, amint a játékosok regisztrálnak a Leetify-on.`,
'dash.maps':`A csapat erősségei pályánként`,'dash.mapsNote':`Győzelmi arány minden regisztrált játékos legutóbbi meccsei alapján. A 3-nál kevesebb meccses pályák rejtve vannak.`,
'dash.best':`Legerősebb pálya`,'dash.worst':`Leggyengébb pálya`,'dash.games':`meccs`,'dash.nomaps':`A pályaadatok a következő statisztikafrissítés után jelennek meg.`,
'chart.perf':`Teljesítmény`,'chart.winrate':`Győzelmi arány`,'chart.hs':`Fejlövés pontosság`,'chart.spray':`Spray kontroll`,'chart.cs':`Counter-strafe`,'chart.open':`Nyitó párharcok`,'chart.trade':`Trade`,'chart.radar':`Képességprofil`,
'axis.aim':`Célzás`,'axis.positioning':`Pozícionálás`,'axis.utility':`Utility`,'axis.cs':`Counter-strafe`,'axis.spray':`Spray kontroll`,'axis.trade':`Trade`,'axis.open':`Nyitó párharcok`,
'grp.aim':`Célzás és mechanika`,'grp.util':`Utility`,'grp.open':`Nyitó párharcok`,'grp.trade':`Trade`,'grp.other':`Egyéb`,
'lower':`Alacsonyabb a jobb`,
'rank.premier':`Premier`,'rank.faceit':`FACEIT`,'rank.level':`Szint`,'rank.elo':`ELO`,'rank.wingman':`Wingman`,'rank.renown':`Renown`,'rank.leetify':`Leetify`,'rank.competitive':`Competitive`,
'map.title':`Pálya teljesítmény`,'map.form':`Friss forma`,'map.formNote':`Utolsó meccsek, a legfrissebb jobbra.`,'map.win':`Győzelem`,'map.loss':`Vereség`,'map.tie':`Döntetlen`,'map.none':`A pályaadatok a következő frissítés után jelennek meg.`,
'rt.aim':`Célzás`,'rt.positioning':`Pozícionálás`,'rt.utility':`Utility`,'rt.clutch':`Clutch`,'rt.opening':`Nyitás`,'rt.ct_leetify':`CT oldal`,'rt.t_leetify':`T oldal`,
'tile.premier':`Premier`,'tile.matches':`Meccsek`
});

const sty=document.createElement('style');
sty.textContent=`
.dash-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:22px;margin-bottom:22px}
.dash-grid .panel{margin-bottom:0}
.dash-grid .wide{grid-column:1/-1}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:22px}
.kpi{background:linear-gradient(135deg,#17170a,var(--card));border:1px solid var(--border);border-radius:14px;padding:18px 20px}
.kpi strong{display:block;font-family:'Rajdhani',sans-serif;font-size:2.2rem;color:var(--yellow);line-height:1.1}
.kpi span{font-size:.72rem;color:var(--muted);text-transform:uppercase;letter-spacing:2px}
.bar-track{height:10px;background:var(--bg-2);border-radius:99px;overflow:hidden;border:1px solid var(--border)}
.bar-fill{height:100%;border-radius:99px;transform-origin:left;animation:growx 1.1s cubic-bezier(.2,.8,.2,1)}
@keyframes growx{from{transform:scaleX(0)}}
.meters{display:flex;flex-direction:column;gap:14px}
.meter-top{display:flex;justify-content:space-between;gap:12px;font-size:.88rem;margin-bottom:5px}
.meter-top span{font-weight:600;color:var(--text)}
.meter-top b{color:var(--yellow)}
.meter small{display:block;color:var(--muted);font-size:.72rem;margin-top:3px}
.cols{display:flex;align-items:flex-end;gap:12px;height:240px;padding-top:10px}
.col{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;min-width:0}
.col-bar{width:100%;max-width:56px;border-radius:8px 8px 0 0;background:linear-gradient(to top,#8a7d00,var(--yellow));transform-origin:bottom;animation:growy 1.1s cubic-bezier(.2,.8,.2,1)}
@keyframes growy{from{transform:scaleY(0)}}
.col-val{font-size:.78rem;color:var(--yellow);font-weight:700;margin-bottom:6px}
.col-name{font-size:.72rem;color:var(--muted);margin-top:8px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.radar{width:100%;max-width:460px;display:block;margin:0 auto}
.radar text{fill:#b4b4be;font-size:11px;font-family:Inter,sans-serif}
.rad-poly{animation:fadein 1s ease-out}
@keyframes fadein{from{opacity:0}}
.legend{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:12px;font-size:.78rem;color:var(--muted)}
.legend i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px}
.gauges{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:18px;margin-bottom:18px}
.gauge{text-align:center}
.gauge svg{width:100%;max-width:130px}
.gauge span{display:block;font-size:.7rem;text-transform:uppercase;letter-spacing:1.2px;color:var(--muted);margin-top:2px}
.g-arc{animation:garc 1.3s ease-out}
@keyframes garc{from{stroke-dasharray:0 400}}
.g-text{fill:#ffe600;font-family:Rajdhani,sans-serif;font-size:25px;font-weight:700}
.sc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
.sc{background:var(--bg-2);border:1px solid var(--border);border-radius:12px;padding:14px 16px;transition:border-color .2s;min-width:0}
.sc:hover{border-color:var(--yellow)}
.sc-l{display:block;font-size:.76rem;color:var(--muted);line-height:1.3;min-height:2em;margin-bottom:4px}
.sc strong{display:block;font-family:Rajdhani,sans-serif;font-size:1.7rem;color:var(--yellow);line-height:1.1;margin-bottom:8px}
.sc em{display:block;font-style:normal;font-size:.68rem;color:#8a8a96;margin-top:6px}
.rk-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px}
.rk{border:1px solid var(--c,#25252b);border-radius:14px;padding:16px;background:linear-gradient(160deg,color-mix(in srgb,var(--c,#555) 14%,#141418),#141418);min-width:0}
.rk-t{display:block;font-size:.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--c,#9a9aa5);font-weight:700}
.rk strong{display:block;font-family:Rajdhani,sans-serif;font-size:2rem;line-height:1.15;color:#f1f1f3;overflow-wrap:anywhere}
.rk small{display:block;color:var(--muted);font-size:.8rem;margin-top:2px}
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px}
.form{display:flex;gap:6px;flex-wrap:wrap}
.fm{width:26px;height:26px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:800;color:#0a0a0a}
.fm.w{background:#7ae582}.fm.l{background:#f25f5c}.fm.t{background:#9a9aa5}
.callouts{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:18px}
.co{border:1px solid var(--border);border-radius:12px;padding:12px 16px;background:var(--bg-2)}
.co span{display:block;font-size:.68rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted)}
.co strong{font-family:Rajdhani,sans-serif;font-size:1.5rem;color:#f1f1f3}
.co em{font-style:normal;margin-left:8px;font-weight:700}
.co.good em{color:#7ae582}.co.bad em{color:#f25f5c}
@media(max-width:520px){.cols{height:200px;gap:8px}.sc-grid{grid-template-columns:1fr 1fr}.sc strong{font-size:1.4rem}.fm{width:22px;height:22px}}
@media(prefers-reduced-motion:reduce){.bar-fill,.col-bar,.rad-poly,.g-arc{animation:none}}
`;
document.head.appendChild(sty);

const PLC=['#4cc9f0','#f72585','#7ae582','#b388ff','#ff9f1c'];
const num=v=>{const n=parseFloat(String(v==null?'':v).replace(/[%,\s]/g,''));return isNaN(n)?null:n};
const pretty=k=>String(k).split('_').map(w=>['ct','t','hs','ms','adr','kd'].includes(w)?w.toUpperCase():(w?w[0].toUpperCase()+w.slice(1):w)).join(' ');
const li=()=>({en:0,ro:1,hu:2}[LANG]||0);
const pctv=v=>Math.abs(v)<=1?v*100:v;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

const S={
reaction_time_ms:{g:'aim',u:'ms',lo:1,l:['Reaction time','Timp de reacție','Reakcióidő']},
accuracy_enemy_spotted:{g:'aim',u:'pct',l:['Accuracy vs. spotted enemies','Precizie vs. inamici văzuți','Pontosság látott ellenfélnél']},
accuracy_head:{g:'aim',u:'pct',l:['Headshot accuracy','Precizie headshot','Fejlövés pontosság']},
spray_accuracy:{g:'aim',u:'pct',l:['Spray accuracy','Precizie spray','Spray pontosság']},
counter_strafing_good_shots_ratio:{g:'aim',u:'pct',l:['Counter-strafing (good shots)','Counter-strafing (focuri bune)','Counter-strafe (jó lövések)']},
preaim:{g:'aim',u:'deg',lo:1,l:['Pre-aim error','Eroare pre-aim','Pre-aim eltérés']},
flashbang_hit_foe_per_flashbang:{g:'util',u:'n2',l:['Enemies flashed per flashbang','Inamici orbiți per flashbang','Elvakított ellenfél / flashbang']},
flashbang_hit_foe_avg_duration:{g:'util',u:'sec',l:['Avg. enemy blind time','Timp mediu de orbire (inamici)','Átl. ellenfél vakítási idő']},
flashbang_hit_friend_per_flashbang:{g:'util',u:'n2',lo:1,l:['Teammates flashed per flashbang','Coechipieri orbiți per flashbang','Elvakított csapattárs / flashbang']},
flashbang_hit_friend_avg_duration:{g:'util',u:'sec',lo:1,l:['Avg. teammate blind time','Timp mediu de orbire (coechipieri)','Átl. csapattárs vakítási idő']},
flashbang_leading_to_kill:{g:'util',u:'n2',l:['Flashes leading to a kill','Flashuri care duc la kill','Gyilkossághoz vezető flash']},
flashbang_thrown:{g:'util',u:'n2',l:['Flashbangs thrown','Flashbang-uri aruncate','Eldobott flashbang']},
he_foes_damage_avg:{g:'util',u:'n1',l:['HE damage to enemies','Damage HE în inamici','HE sebzés ellenfelekre']},
he_friends_damage_avg:{g:'util',u:'n1',lo:1,l:['HE damage to teammates','Damage HE în coechipieri','HE sebzés csapattársakra']},
utility_on_death_avg:{g:'util',u:'n1',lo:1,l:['Unused utility on death','Utilitare nefolosite la moarte','Fel nem használt utility halálkor']},
ct_opening_duel_success_percentage:{g:'open',u:'pct',l:['CT opening duels won','Dueluri de deschidere câștigate (CT)','Megnyert nyitó párharcok (CT)']},
t_opening_duel_success_percentage:{g:'open',u:'pct',l:['T opening duels won','Dueluri de deschidere câștigate (T)','Megnyert nyitó párharcok (T)']},
ct_opening_aggression_success_rate:{g:'open',u:'pct',l:['CT opening aggression success','Succes agresivitate deschidere (CT)','Nyitó agresszió sikere (CT)']},
t_opening_aggression_success_rate:{g:'open',u:'pct',l:['T opening aggression success','Succes agresivitate deschidere (T)','Nyitó agresszió sikere (T)']},
trade_kills_success_percentage:{g:'trade',u:'pct',l:['Trade kills success','Succes trade kills','Trade gyilkosságok sikere']},
traded_deaths_success_percentage:{g:'trade',u:'pct',l:['Deaths traded by teammates','Morți răzbunate de coechipieri','Csapattárs által visszaadott halálok']},
trade_kill_opportunities_per_round:{g:'trade',u:'n2',l:['Trade opportunities per round','Oportunități de trade pe rundă','Trade lehetőség / kör']}
};
function unitOf(k){
  if(S[k])return S[k].u;
  if(k.endsWith('_ms'))return 'ms';
  if(k.includes('duration'))return 'sec';
  if(k.endsWith('_percentage')||k.endsWith('_rate')||k.includes('accuracy')||k.endsWith('_ratio'))return 'pct';
  return 'n2';
}
function fmtStat(k,v){
  const u=unitOf(k);
  if(u==='pct')return pctv(v).toFixed(1)+'%';
  if(u==='ms')return Math.round(v)+' ms';
  if(u==='sec')return v.toFixed(2)+' s';
  if(u==='deg')return v.toFixed(1)+'°';
  if(u==='n1')return v.toFixed(1);
  return Number.isInteger(v)?String(v):v.toFixed(2);
}
const statLabel=k=>S[k]?S[k].l[li()]:pretty(k);

function profileAxes(d){
  d=d||{};const r=d.rating||{},s=d.stats||{},out=[];
  ['aim','positioning','utility'].forEach(k=>{const v=r[k];if(typeof v==='number'&&v>1&&v<=100)out.push({key:k,label:t('axis.'+k),value:v})});
  const p=k=>typeof s[k]==='number'?pctv(s[k]):null;
  const cs=p('counter_strafing_good_shots_ratio');if(cs!=null)out.push({key:'cs',label:t('axis.cs'),value:cs});
  const sp=p('spray_accuracy');if(sp!=null)out.push({key:'spray',label:t('axis.spray'),value:sp});
  const tr=p('trade_kills_success_percentage');if(tr!=null)out.push({key:'trade',label:t('axis.trade'),value:tr});
  const o=[p('ct_opening_duel_success_percentage'),p('t_opening_duel_success_percentage')].filter(x=>x!=null);
  if(o.length)out.push({key:'open',label:t('axis.open'),value:o.reduce((a,b)=>a+b,0)/o.length});
  return out;
}
const AXIS_ORDER=['aim','positioning','utility','cs','spray','trade','open'];
function orderAxes(a){return a.slice().sort((x,y)=>AXIS_ORDER.indexOf(x.key)-AXIS_ORDER.indexOf(y.key))}

function radar(axes,series){
  const n=axes.length;if(n<3)return '';
  const c=200,R=118;
  const ang=i=>-Math.PI/2+i*2*Math.PI/n;
  const pt=(i,v)=>{const r=R*clamp(v,0,100)/100;return [c+r*Math.cos(ang(i)),c+r*Math.sin(ang(i))]};
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
    g+=`<polygon class='rad-poly' points='${pts}' fill='${s.color}' fill-opacity='${s.fill}' stroke='${s.color}' stroke-width='${s.w}' stroke-linejoin='round'${s.dash?` stroke-dasharray='${s.dash}'`:''}/>`;
  });
  return `<svg viewBox='-50 0 500 400' class='radar'>${g}</svg>`;
}
function columns(items,max){
  return `<div class='cols'>${items.map(it=>{
    const h=clamp(it.value/max*100,3,100);
    return `<div class='col'><span class='col-val'>${esc(it.text)}</span><div class='col-bar' style='height:${h*0.82}%'></div><span class='col-name'>${esc(it.name)}</span></div>`;
  }).join('')}</div>`;
}
function meters(items,max){
  return `<div class='meters'>${items.map(it=>{
    const w=clamp(it.value/(max||100)*100,2,100);
    return `<div class='meter'><div class='meter-top'><span>${esc(it.label)}</span><b>${esc(it.text)}</b></div><div class='bar-track'><div class='bar-fill' style='width:${w}%;background:${it.color||'#ffe600'}'></div></div>${it.sub?`<small>${esc(it.sub)}</small>`:''}</div>`;
  }).join('')}</div>`;
}
function gauge(p,label,text){
  const r=52,c=2*Math.PI*r,v=clamp(p,0,100);
  return `<div class='gauge'><svg viewBox='0 0 140 140'><circle cx='70' cy='70' r='52' fill='none' stroke='#25252b' stroke-width='12'/><circle class='g-arc' cx='70' cy='70' r='52' fill='none' stroke='#ffe600' stroke-width='12' stroke-linecap='round' stroke-dasharray='${(c*v/100).toFixed(1)} ${c.toFixed(1)}' transform='rotate(-90 70 70)'/><text x='70' y='78' text-anchor='middle' class='g-text'>${esc(text)}</text></svg><span>${esc(label)}</span></div>`;
}
function legend(items){
  return `<div class='legend'>${items.map(i=>`<span><i style='background:${i.color}'></i>${esc(i.name)}</span>`).join('')}</div>`;
}

function ratingsPanel(r){
  const e=Object.entries(r||{}).filter(([k,v])=>typeof v==='number'&&isFinite(v));
  if(!e.length)return '';
  const lab=k=>{const x=t('rt.'+k);return x==='rt.'+k?pretty(k):x};
  const big=e.filter(([k,v])=>v>1&&v<=100),small=e.filter(([k,v])=>!(v>1&&v<=100));
  let h=`<div class='panel reveal'><h3>${t('sec.rating')}</h3>`;
  if(big.length)h+=`<div class='gauges'>${big.map(([k,v])=>gauge(v,lab(k),String(Math.round(v)))).join('')}</div>`;
  if(small.length)h+=`<div class='tiles'>${small.map(([k,v])=>`<div class='kv'><strong>${(v>0?'+':'')+v.toFixed(2)}</strong><span>${esc(lab(k))}</span></div>`).join('')}</div>`;
  return h+'</div>';
}

function statGroups(stats){
  const e=Object.entries(stats||{}).filter(([k,v])=>typeof v==='number'&&isFinite(v));
  if(!e.length)return '';
  const G={aim:[],util:[],open:[],trade:[],other:[]};
  e.forEach(([k,v])=>{(G[(S[k]&&S[k].g)||'other']).push([k,v])});
  return ['aim','util','open','trade','other'].filter(g=>G[g].length).map(g=>{
    const cards=G[g].map(([k,v])=>{
      const u=unitOf(k);
      const bar=u==='pct'?`<div class='bar-track'><div class='bar-fill' style='width:${clamp(pctv(v),2,100)}%;background:#ffe600'></div></div>`:'';
      return `<div class='sc'><span class='sc-l'>${esc(statLabel(k))}</span><strong>${esc(fmtStat(k,v))}</strong>${bar}${S[k]&&S[k].lo?`<em>${t('lower')}</em>`:''}</div>`;
    }).join('');
    return `<div class='panel reveal'><h3>${t('grp.'+g)}</h3><div class='sc-grid'>${cards}</div></div>`;
  }).join('');
}

const SKILL=['Silver I','Silver II','Silver III','Silver IV','Silver Elite','Silver Elite Master','Gold Nova I','Gold Nova II','Gold Nova III','Gold Nova Master','Master Guardian I','Master Guardian II','Master Guardian Elite','Distinguished Master Guardian','Legendary Eagle','Legendary Eagle Master','Supreme Master First Class','The Global Elite'];
const TIER=[[30000,'#ffd700'],[25000,'#eb4b4b'],[20000,'#d32ce6'],[15000,'#8847ff'],[10000,'#4b69ff'],[5000,'#8ec7ff'],[0,'#b0c3d9']];
const tierColor=v=>(TIER.find(x=>v>=x[0])||TIER[6])[1];
function ranksPanel(r,premierText){
  r=r||{};const cards=[];
  const prem=num(r.premier)||num(premierText);
  if(prem)cards.push(`<div class='rk' style='--c:${tierColor(prem)}'><span class='rk-t'>${t('rank.premier')}</span><strong>${Math.round(prem).toLocaleString()}</strong></div>`);
  const lvl=num(r.faceit),elo=num(r.faceit_elo);
  if(lvl||elo)cards.push(`<div class='rk' style='--c:#ff5500'><span class='rk-t'>${t('rank.faceit')}</span><strong>${lvl?t('rank.level')+' '+lvl:Math.round(elo).toLocaleString()+' '+t('rank.elo')}</strong>${lvl&&elo?`<small>${Math.round(elo).toLocaleString()} ${t('rank.elo')}</small>`:''}</div>`);
  const sk=v=>{const n=num(v);return n&&n>=1&&n<=18?SKILL[Math.round(n)-1]:(n?String(n):null)};
  const wm=sk(r.wingman);if(wm)cards.push(`<div class='rk' style='--c:#7ae582'><span class='rk-t'>${t('rank.wingman')}</span><strong>${esc(wm)}</strong></div>`);
  const cp=typeof r.competitive==='number'?sk(r.competitive):null;if(cp)cards.push(`<div class='rk' style='--c:#4cc9f0'><span class='rk-t'>${t('rank.competitive')}</span><strong>${esc(cp)}</strong></div>`);
  const rn=num(r.renown);if(rn)cards.push(`<div class='rk' style='--c:#b388ff'><span class='rk-t'>${t('rank.renown')}</span><strong>${Math.round(rn).toLocaleString()}</strong></div>`);
  const lf=num(r.leetify);if(lf)cards.push(`<div class='rk' style='--c:#ffe600'><span class='rk-t'>${t('rank.leetify')}</span><strong>${lf%1?lf.toFixed(2):lf}</strong></div>`);
  if(!cards.length)return '';
  return `<div class='panel reveal'><h3>${t('sec.ranks')}</h3><div class='rk-grid'>${cards.join('')}</div></div>`;
}

const mapName=m=>String(m||'?').replace(/^(de|cs|ar)_/,'').split('_').map(w=>w?w[0].toUpperCase()+w.slice(1):w).join(' ');
function mapRows(list){
  const m={};
  (list||[]).forEach(x=>{
    if(!x||!x.m)return;
    const r=m[x.m]=m[x.m]||{map:x.m,w:0,l:0,t:0};
    if(x.o==='win')r.w++;else if(x.o==='loss')r.l++;else r.t++;
  });
  return Object.values(m).map(r=>{const n=r.w+r.l+r.t;return {...r,n,wr:r.w/n*100}});
}
const wrColor=v=>v>=55?'#7ae582':(v>=45?'#ffe600':'#f25f5c');
function mapMeters(rows){
  return meters(rows.map(r=>({label:mapName(r.map),value:r.wr,text:r.wr.toFixed(0)+'%',sub:r.w+'W - '+r.l+'L'+(r.t?' - '+r.t+'T':'')+'  ('+r.n+' '+t('dash.games')+')',color:wrColor(r.wr)})),100);
}
function playerMaps(recent){
  const rows=mapRows(recent).filter(r=>r.n>=2).sort((a,b)=>b.wr-a.wr||b.n-a.n);
  if(!rows.length)return `<div class='panel reveal'><h3>${t('map.title')}</h3><p class='note'>${t('map.none')}</p></div>`;
  return `<div class='panel reveal'><h3>${t('map.title')}</h3>${mapMeters(rows)}</div>`;
}
function formPanel(recent){
  const list=(recent||[]).filter(x=>x&&x.o).slice().sort((a,b)=>(Date.parse(a.d)||0)-(Date.parse(b.d)||0)).slice(-20);
  if(!list.length)return '';
  const sq=list.map(x=>{
    const c=x.o==='win'?'w':(x.o==='loss'?'l':'t');
    const l=c==='w'?'W':(c==='l'?'L':'T');
    return `<span class='fm ${c}' title='${esc(mapName(x.m))} - ${esc(t(c==='w'?'map.win':(c==='l'?'map.loss':'map.tie')))}'>${l}</span>`;
  }).join('');
  return `<div class='panel reveal'><h3>${t('map.form')}</h3><div class='form'>${sq}</div><p class='note' style='margin-top:12px'>${t('map.formNote')}</p></div>`;
}

window.Charts={num,pretty,pctv,profileAxes,orderAxes,radar,columns,meters,gauge,legend,ratingsPanel,statGroups,ranksPanel,mapRows,mapName,mapMeters,playerMaps,formPanel,fmtStat,statLabel,wrColor,PLC};
})();
