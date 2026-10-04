export type Challenge={prompt:string;emoji:string;options:string[];answer:string;success:string};

const forms=[
 (p:string)=>p,
 (p:string)=>`Vamos pensar: ${p}`,
 (p:string)=>`Desafio surpresa: ${p}`,
 (p:string)=>`Hora de aprender! ${p}`,
 (p:string)=>`Você consegue? ${p}`
];

function makeSeeds(seeds:Array<[string,string,string[],string,string]>):Challenge[]{
 return seeds.flatMap(([prompt,emoji,options,answer,success])=>forms.map((f,i)=>({
  prompt:i?f(prompt):prompt,emoji,options,answer,success
 })));
}

const numbersSeeds:Array<[string,string,string[],string,string]>=Array.from({length:40},(_,i)=>{
 const a=(i%10)+1,b=(Math.floor(i/10)%4)+1,c=a+b;
 return [`Quanto é ${a} + ${b}?`,"🔢",[String(c-1),String(c),String(c+1)],String(c),`Muito bem! ${a} + ${b} = ${c}.`];
});
numbersSeeds.push(...Array.from({length:40},(_,i)=>{
 const a=(i%10)+5,b=(Math.floor(i/10)%5)+1,c=a-b;
 return [`Quanto é ${a} - ${b}?`,"➖",[String(c-1),String(c),String(c+1)],String(c),`Isso! ${a} - ${b} = ${c}.`];
}));
numbersSeeds.push(...Array.from({length:40},(_,i)=>{
 const a=(i%8)+2,b=(Math.floor(i/8)%4)+2,c=a*b;
 return [`Qual é o resultado de ${a} × ${b}?`,"✖️",[String(c-2),String(c),String(c+2)],String(c),`Perfeito! ${a} × ${b} = ${c}.`];
}));
numbersSeeds.push(...Array.from({length:40},(_,i)=>{
 const a=(i%9)+1,b=(Math.floor(i/9)%5)+1,c=a+b;
 return [`Você tem ${a} maçãs e ganha mais ${b}. Quantas ficam?`,"🍎",[String(c-1),String(c),String(c+2)],String(c),`Excelente! Agora são ${c} maçãs.`];
}));
numbersSeeds.push(...Array.from({length:40},(_,i)=>{
 const a=(i%10)+1,b=(Math.floor(i/10)%6)+1,c=Math.max(a,b);
 return [`Qual número é maior: ${a} ou ${b}?`,"🔎",[String(Math.min(a,b)),String(c),String(c+1)],String(c),`Isso! ${c} é o maior.`];
}));

const letterWords=[
 ["B","BOLA"],["C","CASA"],["D","DADO"],["F","FADA"],["G","GATO"],["J","JANELA"],["L","LUA"],["M","MALA"],["P","PATO"],["R","RATO"],
 ["S","SAPO"],["T","TATU"],["V","VACA"],["A","AVIÃO"],["E","ESCOLA"],["I","IGREJA"],["O","OVO"],["U","UVA"],["N","NAVIO"],["K","KIWI"],
 ["Q","QUEIJO"],["X","XÍCARA"],["Z","ZEBRA"],["H","HOJE"],["B","BONECA"],["C","CORAÇÃO"],["D","DINOSSAURO"],["M","MACACO"],["P","PIPA"],["S","SOL"],
 ["T","TIGRE"],["V","VIOLÃO"],["A","AMIGO"],["E","ELEFANTE"],["F","FOCA"],["G","GIRASSOL"],["L","LEÃO"],["R","ROSA"],["U","URSO"],["N","NUVEM"]
];
const lettersSeeds=letterWords.map(([letter,word],i)=>{
 const others=[letterWords[(i+1)%40][0],letterWords[(i+2)%40][0]];
 return [`Qual é a primeira letra de “${word}”?`,"🔤",[letter,others[0],others[1]],letter,`Muito bem! ${word} começa com ${letter}.`] as [string,string,string[],string,string];
});

const animals=[
 ["🐱 Gato","miau"],["🐶 Cachorro","late"],["🐮 Vaca","mugir"],["🦁 Leão","rugir"],["🐘 Elefante","tem tromba"],["🐸 Sapo","pula"],["🐟 Peixe","vive na água"],["🐦 Pássaro","voa"],["🐴 Cavalo","galopa"],["🐰 Coelho","tem orelhas compridas"],
["🦒 Girafa","tem pescoço comprido"],["🐢 Tartaruga","tem casco"],["🐧 Pinguim","vive em regiões frias"],["🐝 Abelha","produz mel"],["🦋 Borboleta","tem asas"],["🐍 Cobra","rasteja"],["🐒 Macaco","gosta de subir em árvores"],["🐼 Panda","come bambu"],["🦓 Zebra","tem listras"],["🦒 Girafa","é muito alta"],
["🐊 Crocodilo","vive perto da água"],["🦉 Coruja","é conhecida por seus grandes olhos"],["🐔 Galinha","bota ovos"],["🦆 Pato","nada"],["🐑 Ovelha","tem lã"],["🐐 Cabra","pode viver em lugares montanhosos"],["🐪 Camelo","vive bem no deserto"],["🦌 Cervo","tem chifres"],["🦔 Ouriço","tem espinhos"],["🐿️ Esquilo","guarda alimentos"],
["🐙 Polvo","tem oito braços"],["🦀 Caranguejo","anda de lado"],["🐋 Baleia","é mamífero marinho"],["🐬 Golfinho","vive no mar"],["🦈 Tubarão","é um peixe"],["🦩 Flamingo","tem pernas longas"],["🦜 Papagaio","pode imitar sons"],["🐝 Abelha","vive em colmeias"],["🐞 Joaninha","é um inseto"],["🦗 Grilo","pode saltar"]
];
const memorySeeds=animals.map(([animal,trait],i)=>{
 const other1=animals[(i+7)%animals.length][0],other2=animals[(i+13)%animals.length][0];
 return [`Qual animal combina com esta característica: ${trait}?`,"🧠",[animal,other1,other2],animal,`Acertou! ${animal} combina com essa característica.`] as [string,string,string[],string,string];
});

const science=[
 ["vermelha","🍎 Maçã","🍌 Banana","🥦 Brócolis"],["amarela","🍌 Banana","🍇 Uva","🥦 Brócolis"],["verde","🥦 Brócolis","🍎 Maçã","🍌 Banana"],["azul","🌊 Água do mar","🍎 Maçã","🍌 Banana"],
 ["três lados","🔺 Triângulo","⚪ Círculo","⬜ Quadrado"],["quatro lados","⬜ Quadrado","⚪ Círculo","🔺 Triângulo"],["redonda","⚪ Círculo","🔺 Triângulo","⬜ Quadrado"],["tem seis lados","⬡ Hexágono","⚪ Círculo","🔺 Triângulo"],
 ["nasce de ovo","🐔 Galinha","🐶 Cachorro","🐱 Gato"],["vive na água","🐟 Peixe","🦁 Leão","🐘 Elefante"],["tem asas","🦋 Borboleta","🐘 Elefante","🐢 Tartaruga"],["tem casco","🐢 Tartaruga","🐦 Pássaro","🐰 Coelho"],
 ["usamos para respirar","💨 Ar","🪨 Pedra","🏖️ Areia"],["astro que ilumina o dia","☀️ Sol","🌙 Lua","⭐ Estrela"],["estrela que vemos à noite","⭐ Estrela","☀️ Sol","🌳 Árvore"],["planeta onde vivemos","🌍 Terra","🔴 Marte","🌙 Lua"],
 ["derrete com calor","🧊 Gelo","🪨 Pedra","🪵 Madeira"],["fica sólido quando congela","💧 Água","💨 Ar","☀️ Luz"],["planta precisa para crescer","🌱 Água","🪨 Pedra","🧸 Brinquedo"],["parte da planta que absorve água","🌿 Raiz","🌸 Flor","🍎 Fruto"],
 ["órgão usado para enxergar","👁️ Olho","👂 Ouvido","👃 Nariz"],["órgão usado para ouvir","👂 Ouvido","👁️ Olho","👄 Boca"],["usamos para sentir cheiros","👃 Nariz","👂 Ouvido","✋ Mão"],["usamos para tocar objetos","✋ Mão","👁️ Olho","👂 Ouvido"],
 ["fonte de luz natural","☀️ Sol","💡 Lâmpada","🕯️ Vela"],["fonte de luz criada por pessoas","💡 Lâmpada","☀️ Sol","🌙 Lua"],["material que pode ser reciclado","📦 Papelão","🪨 Pedra","🍌 Casca de banana"],["material transparente comum","🪟 Vidro","🪨 Pedra","🧱 Tijolo"],
 ["meio de transporte que voa","✈️ Avião","🚲 Bicicleta","🚗 Carro"],["meio de transporte que navega","🚢 Navio","🚲 Bicicleta","🚗 Carro"],["animal mamífero","🐶 Cachorro","🐔 Galinha","🐟 Peixe"],["animal que é inseto","🐝 Abelha","🐶 Cachorro","🐟 Peixe"],
 ["estado da água em forma de gelo","🧊 Sólido","💧 Líquido","💨 Gasoso"],["estado da água que bebemos","💧 Líquido","🧊 Sólido","💨 Gasoso"],["o que produz sombra","☀️ Luz bloqueada por um objeto","🌧️ Chuva","💨 Vento"],["o que ajuda a empurrar um barco a vela","💨 Vento","🪨 Pedra","🌱 Planta"],
 ["dia seguinte ao domingo","📅 Segunda-feira","📅 Sexta-feira","📅 Quarta-feira"],["estação mais fria em muitos lugares","❄️ Inverno","☀️ Verão","🌸 Primavera"],["estação das flores","🌸 Primavera","❄️ Inverno","🍂 Outono"],["estação associada a folhas caindo","🍂 Outono","🌸 Primavera","☀️ Verão"]
];
const scienceSeeds=science.map(([trait,correct,a,b])=>[`Qual opção é ${trait}?`,"🔬",[correct,a,b],correct,`Muito bem! A resposta é ${correct}.`] as [string,string,string[],string,string]);

const values=[
 ["ajudar um amigo","Ajudar","Rir dele","Ignorar"],["encontrar algo que não é seu","Devolver","Esconder","Pegar"],["alguém está falando","Escutar","Gritar","Interromper"],["cometer um erro","Admitir e tentar corrigir","Culpar alguém","Esconder"],["receber ajuda","Agradecer","Zombar","Ignorar"],["prometer algo","Cumprir","Esquecer de propósito","Mentir"],["ver alguém triste","Perguntar se precisa de ajuda","Zombar","Ir embora"],["brincar em grupo","Compartilhar","Excluir todos","Tomar tudo"],["na fila","Esperar sua vez","Passar na frente","Empurrar"],["em uma discussão","Conversar com respeito","Gritar","Ofender"],
["quando ganha","Ser gentil","Humilhar","Provocar"],["quando perde","Aprender e continuar","Brigar","Desistir de tudo"],["com um animal","Cuidar dele","Machucar","Assustar"],["com material escolar","Cuidar","Quebrar","Jogar fora sem motivo"],["em casa","Ajudar nas tarefas adequadas à idade","Deixar toda a bagunça","Ignorar todos"],["na escola","Respeitar colegas e professores","Desobedecer sempre","Atrair brigas"],["sobre uma notícia","Verificar antes de espalhar","Inventar","Compartilhar sem saber"],["quando alguém é diferente","Respeitar","Zombar","Excluir"],["quando alguém precisa falar","Dar atenção","Fingir que não ouviu","Interromper"],
["uma atitude honesta","Dizer a verdade","Inventar vantagem","Esconder a verdade para ganhar"],["uma atitude responsável","Cumprir combinados","Deixar tudo para os outros","Culpar alguém"],["uma atitude paciente","Esperar com calma","Ficar gritando","Empurrar"],["uma atitude corajosa","Fazer o certo mesmo com medo","Fazer algo perigoso","Machucar alguém"],["uma atitude humilde","Reconhecer que ainda pode aprender","Achar que sabe tudo","Desprezar os outros"],["uma atitude generosa","Compartilhar","Guardar tudo para si","Tomar dos outros"],["uma atitude grata","Agradecer","Reclamar de tudo","Desprezar ajuda"],["uma atitude cuidadosa","Pensar antes de agir","Agir sem pensar","Quebrar objetos"],["uma atitude justa","Tratar as pessoas com equilíbrio","Escolher sempre o amigo","Trapacear"],["uma atitude gentil","Usar palavras respeitosas","Ofender","Zombar"],
["ao pedir desculpas","Reconhecer o erro","Dizer que o outro merece","Rir"],["ao receber uma crítica","Ouvir e aprender","Ofender","Ignorar sempre"],["ao ver bullying","Procurar um adulto de confiança","Participar","Aplaudir"],["ao dividir um brinquedo","Combinar turnos","Esconder","Tomar"],["ao cuidar do ambiente","Não jogar lixo no chão","Sujar","Desperdiçar"],["ao usar água","Evitar desperdício","Deixar torneira aberta","Brincar com desperdício"],["ao usar energia","Apagar luz quando não precisa","Deixar tudo ligado","Desperdiçar"],["ao trabalhar em equipe","Cooperar","Impedir os outros","Desistir do grupo"],["ao fazer uma tarefa","Tentar com atenção","Estragar de propósito","Não começar"],["ao ajudar alguém","Ajudar sem humilhar","Cobrar para ajudar","Zombar"]
];
const valuesSeeds=values.map(([s,a,b,c])=>[`Qual é uma boa atitude quando precisamos ${s}?`,"❤️",[a,b,c],a,`Muito bem! ${a} é uma boa escolha.`] as [string,string,string[],string,string]);

const bible=[
 ["Deus é apresentado como criador de quê?","🌎","Tudo o que existe","Somente uma cidade","Somente um animal"],
 ["Quem recebeu a missão de construir uma arca?","🛶","Noé","Elias","Pedro"],
 ["Qual ensinamento podemos aprender com Noé?","🌧️","Confiar em Deus e obedecer","Desistir diante de dificuldades","Zombar dos outros"],
 ["Quem foi chamado para sair de sua terra e seguir a direção de Deus?","⭐","Abraão","Pilatos","Herodes"],
 ["Qual qualidade aparece na história de Abraão?","🧭","Fé","Preguiça","Desrespeito"],
 ["Quem era filho de Abraão e Sara?","👶","Isaque","Samuel","Josué"],
 ["Quem foi vendido pelos próprios irmãos e depois chegou a uma posição de liderança no Egito?","🌾","José","Davi","Jonas"],
 ["Que ensinamento a história de José pode inspirar?","🤝","Perdoar e permanecer fiel","Guardar vingança","Desistir de todos"],
 ["Quem conduziu os israelitas para fora do Egito?","🔥","Moisés","Salomão","Timóteo"],
 ["Qual sinal é associado à história de Moisés e sua chamada?","🔥","Uma sarça em chamas","Uma torre de pedra","Um barco"],
 ["O que os Dez Mandamentos ensinam de forma geral?","📜","Orientações para viver com Deus e com o próximo","Como ficar rico","Como vencer jogos"],
 ["Quem sucedeu Moisés na liderança do povo na entrada da Terra Prometida?","🗺️","Josué","Pedro","Lucas"],
 ["Quem era conhecida por sua coragem e liderança entre os juízes?","🛡️","Débora","Marta","Maria Madalena"],
 ["Quem derrotou Golias?","🪨","Davi","Moisés","Noé"],
 ["Que qualidade Davi demonstrou ao enfrentar Golias?","💪","Coragem e confiança em Deus","Orgulho de ser invencível","Vingança"],
 ["Quem pediu sabedoria a Deus para governar?","👑","Salomão","Jonas","André"],
 ["Qual é uma ideia central de muitos Provérbios?","🧠","Buscar sabedoria e agir com justiça","Ignorar conselhos","Ser egoísta"],
 ["O que os Salmos frequentemente expressam?","🎵","Louvor, oração e confiança em Deus","Receitas","Mapas"],
 ["Quem foi lançado na cova dos leões por permanecer fiel a Deus?","🦁","Daniel","Davi","José"],
 ["Que ensinamento a história de Daniel destaca?","🙏","Fidelidade e coragem","Mentira","Covardia"],
 ["Quem foi engolido por um grande peixe após fugir de sua missão?","🐟","Jonas","Elias","Josué"],
 ["O que a história de Jonas ensina, entre outras coisas?","🌊","É importante ouvir a Deus e ter misericórdia","Nunca pedir ajuda","Desprezar outras pessoas"],
 ["Quem foi escolhido por Deus para ser mãe de Jesus?","👩","Maria","Marta","Rute"],
 ["Quem era o pai terreno de Jesus segundo os Evangelhos?","🪚","José","João","Pedro"],
 ["Onde Jesus nasceu?","⭐","Belém","Jerusalém","Nazaré"],
 ["Quem batizou Jesus?","💧","João Batista","Pedro","Tomé"],
 ["Qual foi uma mensagem central do ensino de Jesus?","❤️","Amar a Deus e ao próximo","Buscar vingança","Desprezar os pobres"],
 ["O que Jesus ensinou sobre perdoar?","🤍","Perdoar é uma atitude importante","Nunca perdoar","Perdoar apenas amigos"],
 ["Quem são chamados de bem-aventurados em um conhecido ensino de Jesus?","⛰️","Pessoas que buscam viver segundo os valores do Reino de Deus","Somente os mais ricos","Somente os mais fortes"],
 ["O que a parábola do Bom Samaritano ensina?","❤️","Ajudar o próximo com compaixão","Ignorar quem sofre","Ajudar somente amigos"],
 ["O que a parábola do filho que retorna ao pai destaca?","🏠","Perdão e acolhimento","Vingança","Orgulho"],
 ["O que Jesus ensinou sobre crianças?","👧","Que devemos recebê-las com carinho e valorizar sua fé","Que elas não importam","Que devem ser ignoradas"],
 ["Quem era conhecido como pescador antes de seguir Jesus?","🎣","Pedro","Paulo","Lucas"],
 ["Quem foi chamado Saulo antes de ser conhecido como Paulo?","📖","Paulo","Mateus","Tiago"],
 ["O que Paulo fez depois de sua transformação?","✉️","Anunciou a mensagem de Jesus e escreveu cartas","Tornou-se rei do Egito","Construiu a arca"],
 ["O que Atos dos Apóstolos conta principalmente?","🕊️","A expansão da comunidade cristã e a ação do Espírito Santo","A história dos reis do Egito","A construção do templo de Salomão"],
 ["Qual fruto do Espírito é uma boa atitude com outras pessoas?","🍇","Amor","Crueldade","Inveja"],
 ["O que 1 Coríntios 13 é especialmente conhecido por ensinar?","❤️","Sobre o amor","Sobre astronomia","Sobre agricultura"],
 ["Qual é o último livro da Bíblia?","📖","Apocalipse","Gênesis","Salmos"]
];
const bibleSeeds=bible.map(([p,e,a,b,c])=>[p,e,[a,b,c],a,`Muito bem! Podemos aprender sobre isso na Bíblia: ${a}.`] as [string,string,string[],string,string]);

export const challenges:Record<string,Challenge[]> = {
 numeros:makeSeeds(numbersSeeds),
 letras:makeSeeds(lettersSeeds),
 memoria:makeSeeds(memorySeeds),
 cores:makeSeeds(scienceSeeds),
 valores:makeSeeds(valuesSeeds),
 biblia:makeSeeds(bibleSeeds)
};