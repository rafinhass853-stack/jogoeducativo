import {useEffect,useState} from "react";
import {GameCard} from "./components/GameCard";
import {games} from "./data/games";
import {avatars,defaultProfile,levelFromXp,xpForNextLevel,type ChildProfile,type AvatarId} from "./data/profile";
import {AdventureGame} from "./games/AdventureGame";
import {BibleMap} from "./components/BibleMap";
import type {Challenge} from "./data/challenges";
import "./styles.css";

const PROFILE_KEY="mundo-do-saber-profile";

export default function App(){
 const [activeGame,setActiveGame]=useState<string|null>(null);
 const [profile,setProfile]=useState<ChildProfile>(()=>{try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||"")||defaultProfile}catch{return defaultProfile}});
 const [editing,setEditing]=useState(false);
 const [showBibleMap,setShowBibleMap]=useState(false);
 const [bibleQuestions,setBibleQuestions]=useState<Challenge[]|undefined>();
 const [bibleUnlocked,setBibleUnlocked]=useState(()=>Number(localStorage.getItem("mundo-do-saber-bible-unlocked")||0));
 const [bibleStageIndex,setBibleStageIndex]=useState(0);
 useEffect(()=>{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile))},[profile]);
 const game=games.find(g=>g.id===activeGame);
 if(game)return <AdventureGame game={game} onBack={()=>setActiveGame(null)} onComplete={(stars,xp)=>setProfile(p=>{const totalXp=p.xp+xp;return {...p,stars:p.stars+stars,xp:totalXp,level:levelFromXp(totalXp),completedGames:p.completedGames.includes(game.id)?p.completedGames:[...p.completedGames,game.id]}})}/>;
 const nextLevel=xpForNextLevel(profile.level),progress=profile.xp%100,avatar=avatars.find(a=>a.id===profile.avatar)||avatars[0];
 function saveProfile(name:string,age:number,avatarId:AvatarId){setProfile(p=>({...p,name:name.trim()||defaultProfile.name,age,avatar:avatarId}));setEditing(false)}
 if(showBibleMap)return <main className="app-shell"><button className="back-button" onClick={()=>setShowBibleMap(false)}>← Voltar aos jogos</button><BibleMap unlocked={bibleUnlocked} onPlay={(questions,stage)=>{setBibleQuestions(questions);setBibleStageIndex(stage);setShowBibleMap(false);setActiveGame("biblia")}}/></main>;
 return <main className="app-shell">
  <header className="hero"><div><span className="eyebrow">🌈 APRENDER BRINCANDO</span><h1>Mundo do Saber</h1><p>Jogos divertidos para aprender, pensar e crescer.</p></div><button className="profile-bubble" onClick={()=>setEditing(true)} aria-label="Editar perfil"><span className="avatar-large">{avatar.icon}</span><span>{profile.age} anos</span></button></header>
  <section className="profile-panel"><div className="profile-main"><div className="profile-avatar">{avatar.icon}</div><div><span className="section-kicker">OLÁ, APRENDIZ!</span><h2>{profile.name}</h2><p>Nível {profile.level} · {profile.xp} XP · {profile.stars} ⭐</p></div></div><div className="level-box"><div className="level-row"><strong>Próximo nível</strong><span>{profile.xp%100}/100 XP</span></div><div className="xp-track"><div style={{width:`${progress}%`}}/></div><small>Faltam {nextLevel-profile.xp} XP</small></div></section>
  {editing&&<ProfileEditor profile={profile} onCancel={()=>setEditing(false)} onSave={saveProfile}/>}
  <section className="daily-mission"><div><span className="section-kicker">🎯 MISSÃO DO DIA</span><h2>Complete uma aventura!</h2><p>Ganhe XP e estrelas enquanto aprende.</p></div><span className="mission-star">⭐</span></section>
  <section><div className="section-heading"><div><span className="section-kicker">🎮 ATIVIDADES</span><h2>Escolha uma aventura</h2></div><span className="stars">⭐ {profile.stars} estrelas</span></div><div className="game-grid">{games.map(g=><GameCard key={g.id} game={g} onClick={()=>g.id==="biblia"?setShowBibleMap(true):setActiveGame(g.id)}/>)}</div></section>
  <section className="values-banner"><div className="values-icon">❤️</div><div><span className="section-kicker">VALORES</span><h2>Aprender também é cuidar.</h2><p>Respeito, amizade, honestidade, responsabilidade e amor ao próximo.</p></div></section>
 </main>
}
function ProfileEditor({profile,onCancel,onSave}:{profile:ChildProfile;onCancel:()=>void;onSave:(name:string,age:number,avatar:AvatarId)=>void}){
 const[name,setName]=useState(profile.name),[age,setAge]=useState(profile.age),[avatar,setAvatar]=useState<AvatarId>(profile.avatar);
 return <div className="modal-backdrop"><section className="profile-editor" role="dialog" aria-modal="true"><div className="editor-head"><div><span className="section-kicker">👋 MEU PERFIL</span><h2>Vamos personalizar!</h2></div><button className="close-button" onClick={onCancel}>×</button></div><label>Meu nome<input value={name} maxLength={30} onChange={e=>setName(e.target.value)}/></label><label>Minha idade<select value={age} onChange={e=>setAge(Number(e.target.value))}>{[5,6,7,8,9,10].map(n=><option key={n} value={n}>{n} anos</option>)}</select></label><div><strong>Escolha seu personagem</strong><div className="avatar-grid">{avatars.map(a=><button type="button" key={a.id} className={avatar===a.id?"avatar-option selected":"avatar-option"} onClick={()=>setAvatar(a.id)}><span>{a.icon}</span><small>{a.label}</small></button>)}</div></div><div className="editor-actions"><button className="secondary-button" onClick={onCancel}>Cancelar</button><button className="primary-button" onClick={()=>onSave(name,age,avatar)}>Salvar perfil</button></div></section></div>
}