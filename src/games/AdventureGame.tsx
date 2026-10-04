import {useState} from "react";
import type {Game} from "../types";
import {challenges} from "../data/challenges";
import type {Challenge} from "../data/challenges";
import {playSuccessSound} from "../utils/sounds";

const animalSounds:Record<string,string>={
 "🐱 Gato":"Miau! Miau!","🐶 Cachorro":"Au au!","🐮 Vaca":"Muuu!","🦁 Leão":"Rooar!","🐸 Sapo":"Coax!","🐴 Cavalo":"Irrrinchó!","🦆 Pato":"Quá quá!","🐑 Ovelha":"Bééé!","🐔 Galinha":"Cocoricó!","🐷 Porco":"Oinc oinc!","🐦 Pássaro":"Piu piu!","🐝 Abelha":"Zum zum!","🦗 Grilo":"Cri cri!","🦉 Coruja":"Uhu uhu!","🐺 Lobo":"Aúúú!","🦃 Peru":"Glu glu!"
};

function speakAnimal(animal:string){
 const sound=animalSounds[animal];
 if(!sound || !("speechSynthesis" in window)) return;
 window.speechSynthesis.cancel();
 const utterance=new SpeechSynthesisUtterance(sound);
 utterance.lang="pt-BR"; utterance.rate=.72; utterance.pitch=1.45;
 window.speechSynthesis.speak(utterance);
}

export function AdventureGame({game,onBack,onComplete,challengeList}:{game:Game;onBack:()=>void;onComplete:(stars:number,xp:number)=>void;challengeList?:Challenge[]}){
 const list=challengeList ?? challenges[game.id] ?? [];
 const [index,setIndex]=useState(0); const [earned,setEarned]=useState(0);
 const [message,setMessage]=useState("Escolha uma resposta!"); const [finished,setFinished]=useState(false);
 const isAnimalGame=game.id==="memoria"; const q=list[index];
 if(!q)return <section className="game-screen"><button className="back-button" onClick={onBack}>← Voltar</button><div className="challenge"><p className="challenge-title">Preparando esta aventura...</p></div></section>;
 function answer(value:string){
  if(value!==q.answer){setMessage("Ainda não! Tente outra vez. 💛");return;}
  const total=earned+1; setEarned(total); setMessage("🎉 "+q.success); playSuccessSound(); if(isAnimalGame) speakAnimal(value);
  setTimeout(()=>{if(index+1>=list.length){setFinished(true);onComplete(total,total*25)}else{setIndex(index+1);setMessage("Escolha uma resposta!")}},650);
 }
 if(finished)return <section className="game-screen"><button className="back-button" onClick={onBack}>← Voltar</button><div className="challenge finish-card"><div className="game-icon">🏆</div><p className="challenge-title">Aventura concluída!</p><p className="message">Você ganhou ⭐ {earned} e ⚡ {earned*25} XP.</p><p className="game-progress">Você completou {list.length} desafios!</p><button className="primary-button" onClick={onBack}>Continuar</button></div></section>;
 return <section className="game-screen"><button className="back-button" onClick={onBack}>← Voltar</button><div className="game-header"><span>{game.icon} {game.title}</span><strong>⭐ {earned}</strong></div><div className="challenge"><div className="question-badge">DESAFIO {index+1}</div><div className="objects" aria-hidden="true">{q.emoji}</div><p className="challenge-title">{q.prompt}</p>{isAnimalGame&&animalSounds[q.answer]&&<button className="sound-button" onClick={()=>speakAnimal(q.answer)} aria-label={"Ouvir "+animalSounds[q.answer]}>🔊 Ouvir: <strong>{animalSounds[q.answer]}</strong></button>}<p className="message" aria-live="polite">{message}</p><div className="answer-grid">{q.options.map((o,i)=><button key={o+i} className="answer-card" onClick={()=>answer(o)}>{o}</button>)}</div><p className="game-progress">{Math.round(((index+1)/list.length)*100)}% da aventura</p></div></section>;
}
