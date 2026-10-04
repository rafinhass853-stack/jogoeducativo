import {useMemo} from "react";
import {challenges,bibleBookNames} from "../data/challenges";
import type {Challenge} from "../data/challenges";

const worldNames=["🌎 Começo de Tudo","🔥 O Povo de Deus","👑 Reis e Profetas","🕊️ Jesus","🔥 A Igreja","👑 Esperança"];
const worldColors=["#7c5cff","#ef6c8f","#3aa981","#f2a93b","#e46a56","#4d7fd3"];

function stageQuestions(index:number,name:string):Challenge[]{
 const base=challenges.biblia[40+index];
 if(!base) return [];
 const distractors=bibleBookNames.filter(book=>book!==name).slice((index*3)%60,(index*3)%60+2);
 return [
  base,
  {prompt:"Qual livro da Bíblia estamos conhecendo nesta fase?",emoji:"📖",options:[name,...distractors],answer:name,success:"Isso! Estamos aprendendo sobre "+name+"."},
  {prompt:"Onde você encontra o tema “"+base.options[0]+"”?",emoji:"🔎",options:[name,...distractors],answer:name,success:"Muito bem! Esse tema aparece em "+name+"."}
 ];
}

export function BibleMap({unlocked,onPlay}:{unlocked:number;onPlay:(questions:Challenge[],stage:number)=>void}){
 const stages=useMemo(()=>bibleBookNames.map((name,i)=>({name,world:Math.floor(i/11),questions:stageQuestions(i,name)})),[]);
 return <section className="bible-map">
  <div className="map-hero"><span className="map-icon">📖</span><div><span className="section-kicker">📖 JORNADA BÍBLICA</span><h2>Do Gênesis ao Apocalipse</h2><p>Explore os 66 livros com perguntas curtas, histórias e ensinamentos.</p></div></div>
  {worldNames.map((world,wi)=><section className="bible-world" key={world}><div className="world-title"><span style={{color:worldColors[wi]}}>{world}</span><small>{stages.filter(s=>s.world===wi).length} fases</small></div><div className="bible-stages">
   {stages.filter(s=>s.world===wi).map(stage=>{const index=stages.indexOf(stage),open=index<=unlocked,done=index<unlocked;return <button key={stage.name} className={open?"bible-stage open":"bible-stage locked"} onClick={()=>open&&onPlay(stage.questions,index)} disabled={!open}><span className="stage-number">{done?"✓":index+1}</span><span className="stage-book">{stage.name}</span><span className="stage-stars">{done?"⭐⭐⭐":"⭐"}</span>{!open&&<span className="lock">🔒</span>}</button>})}
  </div></section>)}
 </section>;
}
