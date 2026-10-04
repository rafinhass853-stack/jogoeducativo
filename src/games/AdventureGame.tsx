import {useState} from "react";
import type {Game} from "../types";

type Challenge={prompt:string;emoji:string;options:string[];answer:string;success:string};

const challenges:Record<string,Challenge[]> = {
  letras:[
    {prompt:"Qual palavra começa com a letra B?",emoji:"🔤",options:["BOLA","CASA","SAPO"],answer:"BOLA",success:"Muito bem! B de BOLA!"},
    {prompt:"Qual é a primeira letra de 'MALA'?",emoji:"🧳",options:["M","P","T"],answer:"M",success:"Isso! M de MALA!"},
    {prompt:"Complete: _ATO",emoji:"🐱",options:["G","P","R"],answer:"G",success:"Perfeito! GATO!"}
  ],
  memoria:[
    {prompt:"Qual animal faz 'miau'?",emoji:"🐾",options:["🐱 Gato","🐶 Cachorro","🐮 Vaca"],answer:"🐱 Gato",success:"Acertou! O gato faz miau!"},
    {prompt:"Qual animal vive na água?",emoji:"🌊",options:["🐟 Peixe","🦁 Leão","🐘 Elefante"],answer:"🐟 Peixe",success:"Muito bem! O peixe vive na água!"},
    {prompt:"Qual animal tem tromba?",emoji:"🐘",options:["🐘 Elefante","🐔 Galinha","🐸 Sapo"],answer:"🐘 Elefante",success:"Isso! O elefante tem tromba!"}
  ],
  cores:[
    {prompt:"Qual objeto é vermelho?",emoji:"🎨",options:["🍎 Maçã","🍌 Banana","🥦 Brócolis"],answer:"🍎 Maçã",success:"Muito bem! A maçã é vermelha!"},
    {prompt:"Qual objeto é amarelo?",emoji:"🌈",options:["🍌 Banana","🍇 Uva","🥕 Cenoura"],answer:"🍌 Banana",success:"Isso! A banana é amarela!"},
    {prompt:"Qual forma tem três lados?",emoji:"🔺",options:["🔺 Triângulo","⚪ Círculo","⬜ Quadrado"],answer:"🔺 Triângulo",success:"Perfeito! O triângulo tem três lados!"}
  ],
  valores:[
    {prompt:"Um amigo caiu. O que fazemos?",emoji:"❤️",options:["Ajudamos","Rimos","Ignoramos"],answer:"Ajudamos",success:"Que bonito! Ajudar é um ato de amor."},
    {prompt:"Encontramos um brinquedo que não é nosso. O que fazemos?",emoji:"🤝",options:["Devolvemos","Escondemos","Pegamos"],answer:"Devolvemos",success:"Muito bem! Isso é honestidade."},
    {prompt:"Alguém está falando. O que fazemos?",emoji:"👂",options:["Escutamos","Gritamos","Interrompemos"],answer:"Escutamos",success:"Isso! Respeitar também é saber ouvir."}
  ],
  biblia:[
    {prompt:"Quem construiu a arca?",emoji:"📖",options:["Noé","Davi","Pedro"],answer:"Noé",success:"Muito bem! Noé construiu a arca."},
    {prompt:"Quem derrotou Golias?",emoji:"🪨",options:["Davi","Moisés","Daniel"],answer:"Davi",success:"Isso! Davi enfrentou Golias com fé e coragem."},
    {prompt:"Qual ensinamento combina com o Bom Samaritano?",emoji:"❤️",options:["Ajudar o próximo","Ser egoísta","Ignorar quem precisa"],answer:"Ajudar o próximo",success:"Muito bem! Devemos cuidar do nosso próximo."}
  ],
  ciencias:[
    {prompt:"Qual destes animais nasce de um ovo?",emoji:"🔬",options:["🐔 Galinha","🐶 Cachorro","🐱 Gato"],answer:"🐔 Galinha",success:"Correto! A galinha nasce de um ovo."},
    {prompt:"O que precisamos para respirar?",emoji:"🌱",options:["Ar","Areia","Pedra"],answer:"Ar",success:"Muito bem! Precisamos de ar para respirar."},
    {prompt:"Qual astro ilumina a Terra durante o dia?",emoji:"☀️",options:["Sol","Lua","Estrela-do-mar"],answer:"Sol",success:"Isso! O Sol é a nossa principal fonte de luz."}
  ]
};

export function AdventureGame({game,onBack,onComplete}:{game:Game;onBack:()=>void;onComplete:(stars:number,xp:number)=>void}){
  const list=challenges[game.id]||challenges.valores;
  const [index,setIndex]=useState(0);
  const [earned,setEarned]=useState(0);
  const [message,setMessage]=useState("Escolha a resposta correta!");
  const [finished,setFinished]=useState(false);
  const q=list[index];

  function answer(value:string){
    if(value!==q.answer){setMessage("Quase! Tente outra vez. 😊");return;}
    const total=earned+1; setEarned(total); setMessage("🎉 "+q.success);
    setTimeout(()=>{
      if(index+1>=list.length){setFinished(true);onComplete(total,total*25);}
      else{setIndex(index+1);setMessage("Escolha a resposta correta!");}
    },650);
  }

  if(finished)return <section className="game-screen"><button className="back-button" onClick={onBack}>← Voltar</button><div className="challenge"><div className="game-icon">🏆</div><p className="challenge-title">Aventura concluída!</p><p className="message">Você ganhou ⭐ {earned} e ⚡ {earned*25} XP.</p><button className="primary-button" onClick={onBack}>Continuar</button></div></section>;

  return <section className="game-screen"><button className="back-button" onClick={onBack}>← Voltar</button><div className="game-header"><span>{game.icon} {game.title}</span><strong>⭐ {earned}</strong></div><div className="challenge"><p className="challenge-title">{q.prompt}</p><div className="objects" aria-hidden="true">{q.emoji}</div><p className="message" aria-live="polite">{message}</p><div className="answer-grid">{q.options.map(o=><button key={o} onClick={()=>answer(o)}>{o}</button>)}</div><p className="game-progress">Desafio {index+1} de {list.length}</p></div></section>;
}