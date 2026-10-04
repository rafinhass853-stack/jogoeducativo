import {useState} from "react";
import type {Game} from "../types";
import {challenges} from "../data/challenges";
import type {Challenge} from "../data/challenges";

export function AdventureGame({game,onBack,onComplete,challengeList}:{game:Game;onBack:()=>void;onComplete:(stars:number,xp:number)=>void;challengeList?:Challenge[]}){
 const list=challengeList ?? challenges[game.id] ?? [];
 const [index,setIndex]=useState(0);
 const [earned,setEarned]=useState(0);
 const [message,setMessage]=useState("Escolha a resposta correta!");
 const [finished,setFinished]=useState(false);
 const q=list[index];

 if(!q)return <section className="game-screen"><button className="back-button" onClick={onBack}>← Voltar</button><div className="challenge"><p className="challenge-title">Preparando esta aventura...</p></div></section>;

 function answer(value:string){
  if(value!==q.answer){setMessage("Quase! Tente outra vez. 😊");return;}
  const total=earned+1; setEarned(total); setMessage("🎉 "+q.success);
  setTimeout(()=>{
   if(index+1>=list.length){setFinished(true);onComplete(total,total*25)}
   else{setIndex(index+1);setMessage("Escolha a resposta correta!")}
  },500);
 }

 if(finished)return <section className="game-screen"><button className="back-button" onClick={onBack}>← Voltar</button><div className="challenge"><div className="game-icon">🏆</div><p className="challenge-title">Aventura concluída!</p><p className="message">Você ganhou ⭐ {earned} e ⚡ {earned*25} XP.</p><p className="game-progress">Você completou {list.length} desafios!</p><button className="primary-button" onClick={onBack}>Continuar</button></div></section>;

 return <section className="game-screen">
  <button className="back-button" onClick={onBack}>← Voltar</button>
  <div className="game-header"><span>{game.icon} {game.title}</span><strong>⭐ {earned}</strong></div>
  <div className="challenge">
   <p className="challenge-title">{q.prompt}</p>
   <div className="objects" aria-hidden="true">{q.emoji}</div>
   <p className="message" aria-live="polite">{message}</p>
   <div className="answer-grid">{q.options.map((o,i)=><button key={o+i} onClick={()=>answer(o)}>{o}</button>)}</div>
   <p className="game-progress">Desafio {index+1} de {list.length} · {Math.round(((index+1)/list.length)*100)}%</p>
  </div>
 </section>
}