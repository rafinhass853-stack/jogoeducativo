let audioContext:AudioContext|null=null;

function ctx(){
 if(!audioContext) audioContext=new AudioContext();
 if(audioContext.state==="suspended") void audioContext.resume();
 return audioContext;
}

function tone(frequency:number,duration:number,start=0,type:OscillatorType="sine",gainValue=.08){
 const ac=ctx(),now=ac.currentTime+start;
 const osc=ac.createOscillator(),gain=ac.createGain();
 osc.type=type;osc.frequency.setValueAtTime(frequency,now);
 gain.gain.setValueAtTime(.0001,now);
 gain.gain.exponentialRampToValueAtTime(gainValue,now+.02);
 gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
 osc.connect(gain);gain.connect(ac.destination);osc.start(now);osc.stop(now+duration+.03);
}

export function playAnimalSound(answer:string){
 if(answer.includes("Gato")){tone(520,.18,0,"sine",.09);tone(760,.28,.16,"sine",.1);return;}
 if(answer.includes("Cachorro")){tone(180,.12,0,"square",.08);tone(130,.16,.13,"square",.08);return;}
 if(answer.includes("Vaca")){tone(150,.5,0,"sawtooth",.06);tone(110,.35,.45,"sawtooth",.05);return;}
 if(answer.includes("Leão")){tone(100,.25,0,"sawtooth",.07);tone(70,.4,.22,"sawtooth",.06);return;}
 if(answer.includes("Sapo")){tone(260,.12,0,"square",.07);tone(180,.12,.14,"square",.06);tone(260,.12,.28,"square",.07);return;}
 if(answer.includes("Pássaro")){tone(1100,.1,0,"sine",.06);tone(1500,.1,.11,"sine",.06);tone(1250,.12,.22,"sine",.06);return;}
 if(answer.includes("Cavalo")){tone(300,.08,0,"sawtooth",.06);tone(420,.12,.09,"sawtooth",.06);tone(620,.18,.22,"sawtooth",.05);return;}
 if(answer.includes("Pato")){tone(280,.12,0,"square",.08);tone(220,.14,.14,"square",.08);return;}
 if(answer.includes("Abelha")){tone(210,.7,0,"sawtooth",.025);return;}
 if(answer.includes("Grilo")){tone(1800,.07,0,"square",.035);tone(1800,.07,.12,"square",.035);tone(1800,.07,.24,"square",.035);}
}

export function playSuccessSound(){
 tone(660,.12,0,"sine",.06);tone(880,.16,.12,"sine",.06);tone(1040,.2,.27,"sine",.06);
}
