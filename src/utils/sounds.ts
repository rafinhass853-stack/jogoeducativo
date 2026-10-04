let audioContext: AudioContext | null = null;

function getContext(){
 const AudioCtx=window.AudioContext || (window as typeof window & {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;
 if(!AudioCtx) return null;
 if(!audioContext) audioContext=new AudioCtx();
 return audioContext;
}

function tone(from:number,to:number,duration:number,start=0,type:OscillatorType="sine",volume=.22){
 const ac=getContext();
 if(!ac) return;
 if(ac.state==="suspended") void ac.resume();
 const now=ac.currentTime+start;
 const osc=ac.createOscillator();
 const gain=ac.createGain();
 osc.type=type;
 osc.frequency.setValueAtTime(from,now);
 osc.frequency.exponentialRampToValueAtTime(Math.max(20,to),now+duration);
 gain.gain.setValueAtTime(.0001,now);
 gain.gain.linearRampToValueAtTime(volume,now+.015);
 gain.gain.setValueAtTime(volume,now+duration*.7);
 gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
 osc.connect(gain); gain.connect(ac.destination);
 osc.start(now); osc.stop(now+duration+.03);
}

export function playAnimalSound(answer:string){
 const a=answer.toLowerCase();
 if(a.includes("gato")){tone(650,420,.18,0,"sine",.28);tone(900,520,.32,.16,"sine",.3);return;}
 if(a.includes("cachorro")){tone(220,120,.13,0,"square",.24);tone(180,100,.16,.14,"square",.24);return;}
 if(a.includes("vaca")){tone(180,95,.55,0,"sawtooth",.18);return;}
 if(a.includes("leão")){tone(140,65,.65,0,"sawtooth",.24);return;}
 if(a.includes("sapo")){tone(330,180,.12,0,"square",.22);tone(280,150,.12,.14,"square",.22);tone(330,180,.12,.28,"square",.22);return;}
 if(a.includes("pássaro")){tone(900,1500,.11,0,"sine",.2);tone(1200,1800,.11,.12,"sine",.2);tone(1000,1600,.13,.24,"sine",.2);return;}
 if(a.includes("cavalo")){tone(260,500,.1,0,"sawtooth",.2);tone(450,700,.12,.11,"sawtooth",.2);tone(650,900,.16,.24,"sawtooth",.18);return;}
 if(a.includes("pato")){tone(320,220,.14,0,"square",.25);tone(270,190,.16,.15,"square",.25);return;}
 if(a.includes("abelha")){tone(180,230,.8,0,"sawtooth",.08);return;}
 if(a.includes("grilo")){tone(1900,1900,.07,0,"square",.12);tone(1900,1900,.07,.12,"square",.12);tone(1900,1900,.07,.24,"square",.12);return;}
}

export function playSuccessSound(){
 tone(660,820,.12,0,"sine",.18);
 tone(820,1040,.16,.12,"sine",.18);
 tone(1040,1320,.2,.28,"sine",.18);
}
