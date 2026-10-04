import {useMemo} from "react";
import {challenges,bibleBookNames} from "../data/challenges";
import type {Challenge} from "../data/challenges";

const worldNames=["🌎 Começo de Tudo","🔥 O Povo de Deus","👑 Reis e Profetas","🕊️ Jesus","🔥 A Igreja","👑 Esperança"];
const worldColors=["#7c5cff","#ef6c8f","#3aa981","#f2a93b","#e46a56","#4d7fd3"];
const QUESTIONS_PER_BOOK=5;
const BOOK_START=200;

export function BibleMap({unlocked,onPlay}:{unlocked:number;onPlay:(questions:Challenge[],stage:number)=>void}){
 const stages=useMemo(()=>bibleBookNames.map((name,i)=>({
  name,world:Math.floor(i/11),questions:challenges.biblia.slice(BOOK_START+i*QUESTIONS_PER_BOOK,BOOK_START+(i+1)*QUESTIONS_PER_BOOK)
 })),[]);
 return <section className="bible-map">
  <div className="map-hero"><span className="map-icon">📖</span><div><span className="section-kicker">📖 JORNADA BÍBLICA EVANGÉLICA</span><h2>Do Gênesis ao Apocalipse</h2><p>Avance pelos 66 livros da Bíblia. Complete uma fase para desbloquear a próxima.</p></div></div>
  {worldNames.map((world,wi)=><section className="bible-world" key={world}><div className="world-title"><span style={{color:worldColors[wi]}}>{world}</span><small>{stages.filter(s=>s.world===wi).length} fases</small></div><div className="bible-stages">
   {stages.filter(s=>s.world===wi).map((stage,i)=>{
    const index=stages.indexOf(stage),open=index<=unlocked,done=index<unlocked;
    return <button key={stage.name} className={open?"bible-stage open":"bible-stage locked"} onClick={()=>open&&onPlay(stage.questions,index)} disabled={!open}>
      <span className="stage-number">{done?"✓":index+1}</span><span className="stage-book">{stage.name}</span><span className="stage-stars">{done?"⭐⭐⭐":"⭐"}</span>{!open&&<span className="lock">🔒</span>}
    </button>
   })}
  </div></section>)}
 </section>
}
