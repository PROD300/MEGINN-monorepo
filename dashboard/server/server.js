/**
 * Сбор и анализ юзер-тестов. Node stdlib, без зависимостей.
 * Запуск:  node server.js   (порт из env PORT, по умолчанию 8787)
 *
 * Считает из ЧИСТО СОБЫТИЙНЫХ данных (маршрут + клики по элементу + тайминг + устройство,
 * без записи экрана, пикселей и PII). ЕДИНИЦА — тестировщик (visitorId), а не сессия:
 * одна сессия = одно посещение, тестировщик может иметь несколько. Метрики честны к малому n
 * (counts + Adjusted-Wald CI). Данные режутся по РАУНДАМ (итерациям), визиты-«свои» исключаются.
 *
 * Эндпоинты:
 *   POST /collect                         — события от трекера → data/events.jsonl
 *   GET  /stats?funnel=&goal=&fc=&round=  — агрегаты одного флоу (round: current|all|<iso>)
 *   GET/POST /rounds                      — раунды теста (POST закрывает текущий снимком и открывает новый)
 *   POST /internal {visitorId}            — пометить визит «своим» (исключить из метрик)
 *   GET/POST /hypotheses                  — гипотезы проекта (data/hypotheses.json)
 *   GET/POST /baseline                    — снимок для before/after (data/baseline.json) [legacy]
 *   GET  /health                          — статус
 *
 * Опц. защита чтения: env DASH_KEY — тогда чтение требует ?key=... . /collect всегда открыт.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8787;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const EVENTS = path.join(DATA_DIR, "events.jsonl");
const HYPOTHESES = path.join(DATA_DIR, "hypotheses.json");
const BASELINE = path.join(DATA_DIR, "baseline.json");
const ROUNDS = path.join(DATA_DIR, "rounds.json");
const INTERNAL = path.join(DATA_DIR, "internal.json");
const KEY = process.env.DASH_KEY || null;

fs.mkdirSync(DATA_DIR, { recursive: true });

// ── пороги (PostHog/Hotjar/Mouseflow/Clarity) ────────────
const RAGE_WINDOW_MS = 1000, RAGE_MIN = 3, DEAD_WINDOW_MS = 2500, QUICKBACK_FALLBACK_MS = 4000;
const THRASH_WINDOW_MS = 12000, THRASH_MIN = 3, AFK_CAP_MS = 60000;
const FW = { rage: 5, quickback: 4, dead: 3, thrash: 3, repeated: 2, uturn: 2, hesitation: 2 };
const FCAP = { rage: 3, quickback: 2, dead: 3, thrash: 2, repeated: 2, uturn: 2, hesitation: 1 };
const FK = 12;
const SEV_MULT = { cosmetic: 0.25, minor: 0.5, major: 1, catastrophe: 2 };

// ── helpers ─────────────────────────────────────────────
function send(res, code, data, type) {
  res.writeHead(code, { "Content-Type": type || "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, ngrok-skip-browser-warning" });
  res.end(typeof data === "string" ? data : JSON.stringify(data));
}
function readBody(req){return new Promise((r)=>{let b="";req.on("data",(c)=>{b+=c;if(b.length>5e6)req.destroy();});req.on("end",()=>r(b));});}
function readJson(p, def){ try { return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p,"utf8")) : def; } catch { return def; } }
function readEvents(){ if(!fs.existsSync(EVENTS))return[]; return fs.readFileSync(EVENTS,"utf8").split("\n").filter(Boolean).map((l)=>{try{return JSON.parse(l);}catch{return null;}}).filter(Boolean); }
function rounds(){ return readJson(ROUNDS, []); }
function activeRoundStart(){ const r=rounds(); return r.length ? r[r.length-1].startedAt : null; }
function internalSet(){ return new Set(readJson(INTERNAL, [])); }
function parseUA(ua){ if(!ua)return{browser:"—",os:"—",type:"—"};
  const browser=/Edg/.test(ua)?"Edge":/Chrome/.test(ua)?"Chrome":/Firefox/.test(ua)?"Firefox":/Safari/.test(ua)?"Safari":"—";
  const os=/iPhone|iPad|iPod/.test(ua)?"iOS":/Android/.test(ua)?"Android":/Windows/.test(ua)?"Windows":/Mac OS X|Macintosh/.test(ua)?"macOS":/Linux/.test(ua)?"Linux":"—";
  const type=/Mobile|Android|iPhone/.test(ua)?"mobile":"desktop"; return{browser,os,type}; }
const ms=(a,b)=>new Date(b).getTime()-new Date(a).getTime();
function median(a){if(!a.length)return 0;const s=[...a].sort((x,y)=>x-y),m=s.length>>1;return s.length%2?s[m]:Math.round((s[m-1]+s[m])/2);}
function quantile(a,q){if(!a.length)return 0;const s=[...a].sort((x,y)=>x-y),pos=(s.length-1)*q,b=Math.floor(pos),r=pos-b;return s[b+1]!==undefined?Math.round(s[b]+r*(s[b+1]-s[b])):s[b];}
function awCI(x,n){if(!n)return null;const z=1.96,na=n+z*z,pa=(x+z*z/2)/na,m=z*Math.sqrt(pa*(1-pa)/na);return{x,n,p:x/n,lo:Math.max(0,pa-m),hi:Math.min(1,pa+m)};}
function confLevel(hits,total){if(!total||total<3||hits<=1)return"low";if(total<5)return"medium";return"high";}

// ── разбор сессии (одно посещение) ──────────────────────
function buildSession(sid, evs, screenStats, cfg){
  evs.sort((a,b)=>new Date(a.ts)-new Date(b.ts));
  const t0=new Date(evs[0].ts).getTime(), t1=new Date(evs[evs.length-1].ts).getTime();
  const start=evs.find((e)=>e.type==="session_start"); const device=parseUA(start&&start.ua);
  const visitorId=(evs.find((e)=>e.visitorId)||{}).visitorId||sid;
  const pv=evs.filter((e)=>e.type==="pageview"), clicks=evs.filter((e)=>e.type==="click"), views=pv.map((e)=>e.screen);
  const timeline=pv.map((e,i)=>{const at=new Date(e.ts).getTime();const next=i+1<pv.length?new Date(pv[i+1].ts).getTime():t1;
    const vc=clicks.filter((c)=>{const ct=new Date(c.ts).getTime();return c.screen===e.screen&&ct>=at&&ct<=next;});
    return{screen:e.screen,at:e.ts,ms:Math.max(0,next-at),clicks:vc.length,_cl:vc,_enter:at};});
  const fr={rage:0,quickback:0,dead:0,thrash:0,repeated:0,uturn:0,hesitation:0};
  const markers={}; const rageTargets=new Set(); const deadTargets=[];
  const mark=(s,sig)=>(markers[s]=markers[s]||new Set()).add(sig);
  for(const tl of timeline){
    const byT={}; for(const c of tl._cl)(byT[c.target||"—"]=byT[c.target||"—"]||[]).push(new Date(c.ts).getTime());
    for(const tgt in byT){const ts=byT[tgt].sort((a,b)=>a-b);let rage=false;
      for(let i=0;i+RAGE_MIN-1<ts.length;i++)if(ts[i+RAGE_MIN-1]-ts[i]<=RAGE_WINDOW_MS){rage=true;break;}
      if(rage){fr.rage++;mark(tl.screen,"rage");rageTargets.add(tl.screen+"|"+tgt);}
      else if(ts.length>=3&&ts[ts.length-1]-ts[0]>1000){fr.repeated++;mark(tl.screen,"repeated");}}
    const fc=tl._cl.length?new Date(tl._cl[0].ts).getTime():null;
    if(fc){const lat=fc-tl._enter;const p90=(screenStats[tl.screen]&&screenStats[tl.screen].firstActionP90)||0;
      if(p90&&lat>p90&&lat<AFK_CAP_MS){fr.hesitation=1;mark(tl.screen,"hesitation");}}
  }
  for(const c of clicks){ if(c.interactive===false)continue; if(rageTargets.has(c.screen+"|"+(c.target||"—")))continue;
    const ct=new Date(c.ts).getTime();
    if(!evs.some((e)=>(e.type==="click"||e.type==="pageview")&&new Date(e.ts).getTime()>ct))continue;
    const after=evs.filter((e)=>{const et=new Date(e.ts).getTime();return et>ct&&et<=ct+DEAD_WINDOW_MS;});
    if(!after.some((e)=>e.type==="pageview")&&!after.some((e)=>e.type==="click"&&e.target!==c.target)){fr.dead++;mark(c.screen,"dead");deadTargets.push((c.screen||"?")+" · "+(c.target||"—"));}}
  for(let i=1;i<views.length-1;i++){ if(views[i-1]===views[i+1]&&views[i]!==views[i-1]){fr.uturn++;mark(views[i],"uturn");
    const dwell=timeline[i]?timeline[i].ms:0;const md=(screenStats[views[i]]&&screenStats[views[i]].medianDwell)||QUICKBACK_FALLBACK_MS;
    if(dwell<Math.min(md,QUICKBACK_FALLBACK_MS)){fr.quickback++;mark(views[i],"quickback");}}}
  for(let i=0;i+THRASH_MIN-1<pv.length;i++){const win=pv.slice(i,i+THRASH_MIN);
    if(new Set(win.map((p)=>p.screen)).size<THRASH_MIN&&ms(win[0].ts,win[win.length-1].ts)<=THRASH_WINDOW_MS){fr.thrash++;win.forEach((p)=>mark(p.screen,"thrash"));break;}}
  const raw=Object.keys(FW).reduce((s,k)=>s+FW[k]*Math.min(fr[k],FCAP[k]),0);
  const frictionScore=Math.round(100*(1-Math.exp(-raw/FK)));
  const Nu=new Set(views).size,S=views.length,R=Math.max(1,cfg.R||1);
  let lostness=null; if(S>1&&Nu>0)lostness=+Math.sqrt(Math.pow(Nu/S-1,2)+Math.pow(R/Nu-1,2)).toFixed(2);
  const success=cfg.goal?views.includes(cfg.goal):null;
  let timeToTask=null; if(success){const g=pv.find((e)=>e.screen===cfg.goal);if(g)timeToTask=Math.max(0,new Date(g.ts).getTime()-t0);}
  let firstClick=null; const fcScreen=cfg.firstClickScreen||(views.length?views[0]:null);
  if(fcScreen){const fc=clicks.find((c)=>c.screen===fcScreen);if(fc)firstClick={screen:fcScreen,target:fc.target||"—",hit:cfg.firstClickTarget?(fc.target===cfg.firstClickTarget):null};}
  const lastClick=clicks.length?clicks[clicks.length-1]:null;
  const exit={screen:views.length?views[views.length-1]:null,lastClick:lastClick?(lastClick.target||"—"):null,dwell:timeline.length?timeline[timeline.length-1].ms:0};
  const flags=[]; if(views.length<=1)flags.push("зашёл и ушёл"); if(fr.rage)flags.push("rage-клики");
  if(fr.quickback)flags.push("быстрый возврат"); if(lostness!=null&&lostness>=0.5)flags.push("заблудился");
  if(fr.dead>=2)flags.push("dead-клики"); if(t1-t0<3000&&clicks.length===0)flags.push("быстрый выход");
  const cleanTl=timeline.map((s)=>({screen:s.screen,at:s.at,ms:s.ms,clicks:s.clicks,signals:[...(markers[s.screen]||[])]}));
  return{sessionId:sid,visitorId,startedAt:evs[0].ts,durationMs:Math.max(0,t1-t0),device,screens:[...new Set(views)],path:views,
    clicks:clicks.length,timeline:cleanTl,friction:fr,frictionScore,lostness,success,timeToTask,firstClick,exit,flags,deadTargets};
}

// ── агрегация по ОДНОМУ флоу, единица — тестировщик ─────
function aggregate(events, cfg){
  // привязка по метке U-теста: если в данных есть события с этой меткой — считаем строго по ней
  // (популяция = все помеченные), иначе откатываемся к привязке «по входу в первый экран воронки».
  const explicit=!!(cfg.task && events.some(e=>e.task===cfg.task));
  if(explicit) events=events.filter(e=>e.task===cfg.task);
  // пасс 1: распределения по экранам
  const bySession=new Map();
  for(const e of events){if(!bySession.has(e.sessionId))bySession.set(e.sessionId,[]);bySession.get(e.sessionId).push(e);}
  const dwellByScreen={},faByScreen={};
  for(const[,evs]of bySession){evs.sort((a,b)=>new Date(a.ts)-new Date(b.ts));const t1=new Date(evs[evs.length-1].ts).getTime();
    const pv=evs.filter((e)=>e.type==="pageview"),cl=evs.filter((e)=>e.type==="click");
    pv.forEach((e,i)=>{const at=new Date(e.ts).getTime();const next=i+1<pv.length?new Date(pv[i+1].ts).getTime():t1;
      (dwellByScreen[e.screen]=dwellByScreen[e.screen]||[]).push(Math.max(0,next-at));
      const fc=cl.find((c)=>c.screen===e.screen&&new Date(c.ts).getTime()>=at&&new Date(c.ts).getTime()<=next);
      if(fc)(faByScreen[e.screen]=faByScreen[e.screen]||[]).push(new Date(fc.ts).getTime()-at);});}
  const screenStats={}; for(const s in dwellByScreen)screenStats[s]={medianDwell:median(dwellByScreen[s]),firstActionP90:quantile(faByScreen[s]||[],0.9)};

  // пасс 2: сессии
  const sessions=[]; for(const[sid,evs]of bySession)sessions.push(buildSession(sid,evs,screenStats,cfg));

  // ── ТЕСТИРОВЩИКИ: группируем сессии по visitorId ──
  const byV=new Map(); for(const s of sessions){const v=s.visitorId||s.sessionId;if(!byV.has(v))byV.set(v,[]);byV.get(v).push(s);}
  const testers=[...byV.entries()].map(([vid,ss])=>{ss.sort((a,b)=>new Date(a.startedAt)-new Date(b.startedAt));
    const lost=ss.map(s=>s.lostness).filter(x=>x!=null);
    const ttt=ss.filter(s=>s.success&&s.timeToTask!=null).map(s=>s.timeToTask);
    return{visitorId:vid,sessions:ss,startedAt:ss[0].startedAt,device:ss[0].device,
      success:cfg.goal?ss.some(s=>s.success===true):null,timeToTask:ttt.length?Math.min(...ttt):null,
      lostness:lost.length?Math.min(...lost):null,frictionScore:Math.max(...ss.map(s=>s.frictionScore)),
      firstClick:(ss.find(s=>s.firstClick)||{}).firstClick||null,
      flags:[...new Set(ss.flatMap(s=>s.flags))],
      reachedScreens:new Set(ss.flatMap(s=>s.path)),
      paths:ss.map(s=>s.path),sessionCount:ss.length};});
  // ПОПУЛЯЦИЯ ФЛОУ: только дошедшие до стартового экрана флоу (иначе чужие флоу загрязняют воронку).
  // Без funnel (глобальный вид «Сессии») — все тестировщики.
  const pop=explicit?testers:((cfg.funnel&&cfg.funnel.length)?testers.filter(t=>t.reachedScreens.has(cfg.funnel[0])):testers);
  const N=pop.length;
  const reached=(step)=>pop.filter(t=>t.reachedScreens.has(step)).length;
  const popVids=new Set(pop.map(t=>t.visitorId));
  const popSessions=sessions.filter(s=>popVids.has(s.visitorId));
  const popEvents=events.filter(e=>popVids.has(e.visitorId));

  // клики/переходы/dead — по сессиям популяции (про экраны/элементы)
  const clicksByTarget={},transitions={},deadByTarget={};
  for(const e of popEvents)if(e.type==="click"&&e.target)clicksByTarget[e.target]=(clicksByTarget[e.target]||0)+1;
  for(const s of popSessions)for(let i=1;i<s.path.length;i++)transitions[s.path[i-1]+"→"+s.path[i]]=(transitions[s.path[i-1]+"→"+s.path[i]]||0)+1;
  for(const s of popSessions)for(const dt of s.deadTargets)deadByTarget[dt]=(deadByTarget[dt]||0)+1;

  // здоровье экранов (по визитам популяции)
  const sa={};
  for(const s of popSessions)s.timeline.forEach((tl,i)=>{const a=sa[tl.screen]=sa[tl.screen]||{dead:0,rage:0,exits:0,dwell:[],scores:[]};
    a.dwell.push(tl.ms);if(tl.signals.includes("dead"))a.dead++;if(tl.signals.includes("rage"))a.rage++;if(i===s.timeline.length-1)a.exits++;
    const raw=(tl.signals.includes("rage")?FW.rage:0)+(tl.signals.includes("quickback")?FW.quickback:0)+(tl.signals.includes("dead")?FW.dead:0)+(tl.signals.includes("thrash")?FW.thrash:0)+(tl.signals.includes("repeated")?FW.repeated:0)+(tl.signals.includes("uturn")?FW.uturn:0)+(tl.signals.includes("hesitation")?FW.hesitation:0);
    a.scores.push(Math.round(100*(1-Math.exp(-raw/FK))));});
  const screenHealth=Object.entries(sa).map(([screen,a])=>({screen,frictionScore:a.scores.length?Math.round(a.scores.reduce((x,y)=>x+y,0)/a.scores.length):0,
    visits:a.scores.length,dead:a.dead,rage:a.rage,exits:a.exits,medianDwell:median(a.dwell)})).sort((x,y)=>y.frictionScore-x.frictionScore);

  // воронка по тестировщикам + CI + контекст выхода + сплит устройств
  let funnel=null;
  if(cfg.funnel&&cfg.funnel.length){
    funnel=cfg.funnel.map((step,i)=>{const r=reached(step);const prev=i?reached(cfg.funnel[i-1]):r;
      const dropped=pop.filter(t=>(i?t.reachedScreens.has(cfg.funnel[i-1]):true)&&!t.reachedScreens.has(step));
      const ex={};dropped.forEach(t=>{const last=t.sessions[t.sessions.length-1].exit;if(last&&last.lastClick)ex[last.lastClick]=(ex[last.lastClick]||0)+1;});
      const byDevice={};["desktop","mobile"].forEach(d=>{const seg=pop.filter(t=>t.device.type===d);byDevice[d]={reached:seg.filter(t=>t.reachedScreens.has(step)).length,total:seg.length};});
      return{step,reached:r,ci:awCI(r,N),dropFromPrev:prev?Math.round((prev-r)/prev*100):0,
        exitClicks:Object.entries(ex).sort((a,b)=>b[1]-a[1]).slice(0,3),
        exitMedianDwell:median(dropped.map(t=>t.sessions[t.sessions.length-1].exit.dwell)),byDevice};});
    let md=0,mi=-1;funnel.forEach((f,i)=>{if(i&&f.dropFromPrev>md){md=f.dropFromPrev;mi=i;}});if(mi>=0)funnel[mi].biggestDrop=true;
  }
  const succHits=pop.filter(t=>t.success===true).length;
  const successMetric=cfg.goal?{hits:succHits,total:N,ci:awCI(succHits,N),conf:confLevel(succHits,N)}:null;
  const ttt=pop.filter(t=>t.success&&t.timeToTask!=null).map(t=>t.timeToTask);
  const timeOnTask={median:median(ttt),n:ttt.length,min:ttt.length?Math.min(...ttt):0,max:ttt.length?Math.max(...ttt):0};
  const fcT=pop.filter(t=>t.firstClick);const fcHits=fcT.filter(t=>t.firstClick.hit===true).length;
  const fcDist={};fcT.forEach(t=>{fcDist[t.firstClick.target]=(fcDist[t.firstClick.target]||0)+1;});
  const firstClick=cfg.firstClickTarget?{hits:fcHits,total:fcT.length,ci:awCI(fcHits,fcT.length),conf:confLevel(fcHits,fcT.length),dist:Object.entries(fcDist).sort((a,b)=>b[1]-a[1])}
    :(fcT.length?{dist:Object.entries(fcDist).sort((a,b)=>b[1]-a[1]),total:fcT.length}:null);
  const lostV=testers.map(t=>t.lostness).filter(x=>x!=null);
  const lostness=lostV.length?{avg:+(lostV.reduce((a,b)=>a+b,0)/lostV.length).toFixed(2),lost:pop.filter(t=>t.lostness!=null&&t.lostness>=0.5).length,total:lostV.length}:null;
  const segments=["desktop","mobile"].map(d=>{const seg=pop.filter(t=>t.device.type===d);const sh=seg.filter(t=>t.success===true).length;
    return{device:d,n:seg.length,success:cfg.goal?{hits:sh,total:seg.length,ci:awCI(sh,seg.length)}:null,medianFriction:median(seg.map(t=>t.frictionScore)),lost:seg.filter(t=>t.lostness!=null&&t.lostness>=0.5).length};}).filter(s=>s.n>0);
  let deviceGap=null;
  if(segments.length===2&&cfg.goal&&segments.every(s=>s.n>=3)){const a=segments[0].success.hits/segments[0].n,b=segments[1].success.hits/segments[1].n;
    if(Math.abs(a-b)>=0.3)deviceGap={worse:a<b?segments[0].device:segments[1].device,gap:Math.round(Math.abs(a-b)*100)};}
  const avgDuration=popSessions.length?Math.round(popSessions.reduce((a,s)=>a+s.durationMs,0)/popSessions.length):0;
  const problemTesters=pop.filter(t=>t.flags.length).length;
  const findings=buildFindings({testers:pop,N,funnel,screenHealth,deadByTarget,firstClick,lostness,cfg});

  // тестировщики наружу (для списка/drawer) — без служебных Set
  const testersOut=pop.map(t=>({visitorId:t.visitorId,startedAt:t.startedAt,device:t.device,success:t.success,
    timeToTask:t.timeToTask,lostness:t.lostness,frictionScore:t.frictionScore,flags:t.flags,sessionCount:t.sessionCount,
    screens:[...t.reachedScreens],sessions:t.sessions})).sort((a,b)=>b.frictionScore-a.frictionScore);

  return{
    generatedFor:{funnel:cfg.funnel||[],goal:cfg.goal||null,R:cfg.R||null,firstClickTarget:cfg.firstClickTarget||null,flowName:cfg.flowName||null},
    attribution:{mode:explicit?"tag":"funnel",task:cfg.task||null},
    totals:{testers:N,sessions:popSessions.length,events:popEvents.length,avgDurationMs:avgDuration,problemTesters},
    successMetric,timeOnTask,firstClick,lostness,segments,deviceGap,funnel,screenHealth,
    deadLeaderboard:Object.entries(deadByTarget).sort((a,b)=>b[1]-a[1]).slice(0,8),clicksByTarget,transitions,
    testers:testersOut,sessions:popSessions.sort((a,b)=>b.frictionScore-a.frictionScore||b.durationMs-a.durationMs),findings,
  };
}

// ── авто-находки (severity-anchored RICE), N — тестировщики ──
function buildFindings({testers,N,funnel,screenHealth,deadByTarget,firstClick,lostness,cfg}){
  const out=[];
  const push=(f)=>{const reach=f.hits/Math.max(1,N);const impact=SEV_MULT[f.severity]||0.5;const cl=confLevel(f.hits,N);
    const conf=cl==="high"?0.9:cl==="medium"?0.6:0.3;const effort=f.effort||1;
    out.push({...f,n_context:{hits:f.hits,total:N},confidence:cl,priority:+((reach*impact*conf)/effort).toFixed(2)});};
  if(funnel)funnel.forEach((step,i)=>{if(i&&step.dropFromPrev>=25){const hits=funnel[i-1].reached-step.reached;
    const ctx=step.exitClicks.length?`последний клик у ушедших: ${step.exitClicks.map(([k,v])=>`${k} (${v})`).join(", ")}; `:"";
    push({id:"F-drop-"+i,type:"drop-off",screen:cfg.funnel[i-1],element:step.exitClicks[0]?step.exitClicks[0][0]:null,
      title:`Отвал ${step.dropFromPrev}% перед «${step.step}»`,
      evidence:`${hits} из ${N} ушли, не дойдя до «${step.step}». ${ctx}медианное время на экране до выхода ${Math.round(step.exitMedianDwell/1000)}с.`,
      hits,severity:step.biggestDrop?"catastrophe":"major",
      fix_hypothesis:`Люди застревают на «${cfg.funnel[i-1]}» и не находят путь к «${step.step}». Усиль ведущий к следующему шагу элемент (заметность, формулировка, расположение), убери конкурирующие клики.`,
      success_criterion:`Ретест: отвал перед «${step.step}» < ${Math.max(10,step.dropFromPrev-20)}%.`});}});
  (screenHealth||[]).filter(s=>s.frictionScore>=45).slice(0,3).forEach((s,i)=>{const hits=testers.filter(t=>t.sessions.some(x=>x.timeline.some(tl=>tl.screen===s.screen&&tl.signals.length))).length;
    push({id:"F-frict-"+i,type:"friction",screen:s.screen,element:null,title:`Высокое трение на «${s.screen}» (${s.frictionScore}/100)`,
      evidence:`${s.dead} dead-клик(ов), ${s.rage} rage-клик(ов); ${s.exits} выход(ов) с экрана; медиана ${Math.round(s.medianDwell/1000)}с.`,
      hits,severity:s.frictionScore>=70?"catastrophe":"major",
      fix_hypothesis:`На «${s.screen}» элементы обманывают ожидания (клики без результата, раздражение). Проверь аффордансы: что выглядит кликабельным — должно реагировать; добавь состояние загрузки или недоступности.`,
      success_criterion:`Ретест: балл трения «${s.screen}» < 30, dead-кликов ≈ 0.`});});
  const td=Object.entries(deadByTarget).sort((a,b)=>b[1]-a[1])[0];
  if(td&&td[1]>=2){const[label,cnt]=td;const[screen,element]=label.split(" · ");
    push({id:"F-dead-0",type:"dead-click",screen,element,title:`Ложный аффорданс: «${element}»`,
      evidence:`${cnt} клик(ов) по «${element}» на «${screen}» без реакции (ни перехода, ни изменения).`,hits:cnt,severity:"major",
      fix_hypothesis:`«${element}» выглядит кликабельным, но ничего не делает. Сделай его интерактивным (раскрытие/переход) или убери признаки кликабельности.`,
      success_criterion:`Ретест: dead-кликов по «${element}» ≈ 0.`});}
  if(firstClick&&firstClick.total&&firstClick.hits!=null){const miss=firstClick.total-firstClick.hits;
    if(miss>=2&&firstClick.hits/firstClick.total<0.6)push({id:"F-fc-0",type:"first-click-miss",screen:cfg.firstClickScreen||(cfg.funnel&&cfg.funnel[0])||null,element:cfg.firstClickTarget||null,
      title:`Первый клик мимо у ${miss} из ${firstClick.total}`,
      evidence:`Только ${firstClick.hits}/${firstClick.total} начали с правильного элемента. Куда кликали: ${firstClick.dist.slice(0,3).map(([k,v])=>`${k} (${v})`).join(", ")}.`,
      hits:miss,severity:"major",
      fix_hypothesis:`На входном экране неочевидно, с чего начать — правильный первый шаг теряется. Подними целевой элемент в иерархии и переформулируй его, приглуши отвлекающие.`,
      success_criterion:`Ретест: правильный первый клик ≥ 70% (NN/g: верный первый клик ≈ 2–3× выше шанс успеха).`});}
  if(lostness&&lostness.lost>=2)push({id:"F-lost-0",type:"lostness",screen:null,element:null,
    title:`${lostness.lost} из ${lostness.total} заблудились (потерянность ≥ 0.5)`,
    evidence:`Средняя потерянность ${lostness.avg} (0 — идеально, ≥0.5 — точно заблудился). Люди ходят кругами вместо прямого пути.`,hits:lostness.lost,severity:"major",
    fix_hypothesis:`Навигация не ведёт по сценарию: лишние шаги, возвраты. Сократи путь к цели, проясни, где «дальше».`,
    success_criterion:`Ретест: средняя потерянность < 0.4.`});
  return out.sort((a,b)=>b.priority-a.priority);
}

// ── фильтр событий по раунду + исключение «своих» ───────
function scopedEvents(roundParam){
  let evs=readEvents(); const internal=internalSet();
  if(internal.size)evs=evs.filter(e=>!internal.has(e.visitorId));
  if(roundParam!=="all"){ let start=null;
    if(roundParam&&roundParam!=="current"){start=roundParam;} else {start=activeRoundStart();}
    if(start)evs=evs.filter(e=>new Date(e.ts)>=new Date(start));}
  return evs;
}

// ── роутинг ─────────────────────────────────────────────
const server=http.createServer(async(req,res)=>{
  const url=new URL(req.url,"http://localhost"); const route=url.pathname; const p=url.searchParams;
  if(req.method==="OPTIONS")return send(res,204,"");
  const needsKey=(route==="/stats"||route==="/baseline"||route==="/rounds"||(route==="/hypotheses"&&req.method==="GET"));
  if(KEY&&needsKey&&p.get("key")!==KEY)return send(res,401,{error:"unauthorized"});

  if(route==="/health")return send(res,200,{ok:true});

  if(route==="/collect"&&req.method==="POST"){const body=await readBody(req);let parsed;try{parsed=JSON.parse(body);}catch{return send(res,400,{error:"bad json"});}
    const events=Array.isArray(parsed.events)?parsed.events:[];if(events.length)fs.appendFileSync(EVENTS,events.map((e)=>JSON.stringify(e)).join("\n")+"\n");
    return send(res,200,{ok:true,accepted:events.length});}

  if(route==="/stats"&&req.method==="GET"){
    const funnel=p.get("funnel")?p.get("funnel").split(",").map((s)=>s.trim()).filter(Boolean):null;
    const cfg={funnel,goal:p.get("goal")||(funnel?funnel[funnel.length-1]:null),R:p.get("R")?+p.get("R"):(funnel?funnel.length:null),
      firstClickScreen:null,firstClickTarget:null,flowName:p.get("flow")||null,task:p.get("task")||null};
    if(p.get("fc")){const[scr,tgt]=p.get("fc").split("::");cfg.firstClickScreen=scr||null;cfg.firstClickTarget=tgt||null;}
    const out=aggregate(scopedEvents(p.get("round")),cfg);
    out.round={active:activeRoundStart(),count:rounds().length,viewing:p.get("round")||"current",list:rounds().map(r=>({id:r.id,label:r.label,startedAt:r.startedAt,endedAt:r.endedAt||null}))};
    const allEv=readEvents();
    out.dataMeta={lastEventAt:allEv.length?allEv[allEv.length-1].ts:null,firstEventAt:allEv.length?allEv[0].ts:null,totalEvents:allEv.length,internalExcluded:internalSet().size};
    return send(res,200,out);}

  if(route==="/rounds"){
    if(req.method==="GET")return send(res,200,{rounds:rounds(),active:activeRoundStart()});
    if(req.method==="POST"){const body=await readBody(req);let b={};try{b=body?JSON.parse(body):{};}catch{return send(res,400,{error:"bad json"});}
      const list=rounds(); if(list.length){list[list.length-1].endedAt=new Date().toISOString(); if(b.snapshot)list[list.length-1].snapshot=b.snapshot;}
      list.push({id:"r"+(list.length+1),startedAt:new Date().toISOString(),label:b.label||("Раунд "+(list.length+1))});
      fs.writeFileSync(ROUNDS,JSON.stringify(list,null,2)); return send(res,200,{ok:true,active:list[list.length-1]});}
    if(req.method==="DELETE"){const list=rounds(); const removed=list.pop()||null; if(list.length)delete list[list.length-1].endedAt;
      const prevSnapshot=list.length?(list[list.length-1].snapshot||null):null;
      fs.writeFileSync(ROUNDS,JSON.stringify(list,null,2)); return send(res,200,{ok:true,removed,prevSnapshot,active:activeRoundStart()});}}

  if(route==="/internal"&&req.method==="POST"){const body=await readBody(req);let b={};try{b=JSON.parse(body);}catch{return send(res,400,{error:"bad json"});}
    if(!b.visitorId)return send(res,400,{error:"no visitorId"}); const s=internalSet();s.add(b.visitorId);
    fs.writeFileSync(INTERNAL,JSON.stringify([...s],null,2)); return send(res,200,{ok:true,internal:[...s]});}

  if(route==="/hypotheses"){
    if(req.method==="GET")return send(res,200,readJson(HYPOTHESES,[]));
    if(req.method==="POST"){const body=await readBody(req);try{JSON.parse(body);fs.writeFileSync(HYPOTHESES,body);return send(res,200,{ok:true});}catch{return send(res,400,{error:"bad json"});}}}

  if(route==="/baseline"){
    if(req.method==="GET")return send(res,200,readJson(BASELINE,null));
    if(req.method==="POST"){const body=await readBody(req);try{JSON.parse(body);fs.writeFileSync(BASELINE,body);return send(res,200,{ok:true});}catch{return send(res,400,{error:"bad json"});}}}

  return send(res,404,{error:"not found"});
});
server.listen(PORT,()=>console.log(`[user-testing] сбор+анализ слушает :${PORT} · данные в ${DATA_DIR}`));
