/* ============================================================
   TalkFlow — Conteúdo (cenários, decks, shadowing)
   Conteúdo original: inglês americano real do dia a dia
   ============================================================ */
"use strict";

const DATA = {

  /* ---------- CENÁRIOS DE CONVERSAÇÃO ---------- */
  scenarios: [
    {
      id: "cafe",
      icon: "☕",
      title: "Na cafeteria",
      level: "Iniciante",
      desc: "Peça seu café como um americano de verdade",
      steps: [
        {
          tutor: "Hey! Welcome in! What can I get started for you today?",
          tutor_pt: "Ei! Boas-vindas! O que posso começar para você hoje?",
          task: "Peça um latte grande, por favor.",
          hint: "Can I get a large latte, please?",
          accept: ["can i get a large latte please", "can i have a large latte please", "i'd like a large latte please", "could i get a large latte please", "can i get a latte please", "i'll have a large latte please"],
          tip: "\u201cCan I get…?\u201d é a forma número 1 de pedir nos EUA — mesmo que pareça \u201cposso pegar?\u201d ao pé da letra."
        },
        {
          tutor: "Great choice! For here or to go?",
          tutor_pt: "Ótima escolha! Aqui ou para viagem?",
          task: "Diga que é para viagem.",
          hint: "To go, please.",
          accept: ["to go please", "to go", "it's to go please", "for to go please", "to take out please", "takeout please"],
          tip: "\u201cTo go\u201d = para viagem. \u201cFor here\u201d = para consumir no local. As duas aparecem em TODO pedido nos EUA."
        },
        {
          tutor: "You got it. That'll be five forty-five. Want to add a muffin or anything?",
          tutor_pt: "Fechou. Fica cinco dólares e quarenta e cinco. Quer adicionar um muffin ou algo mais?",
          task: "Recuse e diga que é só isso.",
          hint: "No, thanks. That's it.",
          accept: ["no thanks that's it", "no thank you that's it", "no thanks that's all", "no thanks just that", "no that's it thanks", "nah thanks that's it", "no thanks that's everything"],
          tip: "\u201cYou got it\u201d foi o jeito dele dizer \u201cfechado!\u201d. E \u201cThat's it / That's all\u201d = \u201csó isso mesmo\u201d."
        },
        {
          tutor: "No problem. Can I get a name for the order?",
          tutor_pt: "Sem problema. Posso pegar um nome para o pedido?",
          task: "Diga: It's + o seu nome. (Ex.: It's John.)",
          hint: "It's John.",
          pattern: "^(it'?s|it is|my name'?s|my name is) ?[a-z']{2,20}$|^[a-z']{2,20}$",
          tip: "Nos cafés americanos eles chamam você pelo primeiro nome quando o pedido fica pronto — só o primeiro nome já resolve."
        },
        {
          tutor: "Thanks, John! Your order will be right up.",
          tutor_pt: "Obrigado, John! Seu pedido já vai sair.",
          task: "Agradeça de um jeito informal.",
          hint: "Thanks a lot!",
          accept: ["thanks", "thanks a lot", "thank you", "thanks so much", "thank you so much", "thank you very much", "thanks a bunch", "thanks man"],
          tip: "\u201cRight up\u201d = \u201cjá vai sair\u201d. Expressões assim você só aprende com inglês real."
        }
      ]
    },
    {
      id: "friends",
      icon: "👋",
      title: "Conhecendo gente nova",
      level: "Iniciante",
      desc: "Small talk e apresentações sem travar",
      steps: [
        {
          tutor: "Hey there! I'm Jake — I don't think we've met. I'm Sarah's friend.",
          tutor_pt: "Oi! Eu sou o Jake — acho que a gente ainda não se conheceu. Sou amigo da Sarah.",
          task: "Apresente-se: diga \u201cNice to meet you\u201d e o seu nome.",
          hint: "Hi Jake! Nice to meet you. I'm Maria.",
          pattern: "(nice to meet you)",
          tip: "\u201cNice to meet you\u201d é obrigatório ao conhecer alguém. Se a outra pessoa falar primeiro, responda \u201cNice to meet YOU too\u201d."
        },
        {
          tutor: "So, what do you do for a living?",
          tutor_pt: "Então, no que você trabalha? (o que você faz da vida?)",
          task: "Diga o que você faz. Ex.: \u201cI work as a nurse.\u201d",
          hint: "I work as a nurse.",
          pattern: "^(i work|i'm an? |i am an? |i'm a |i am a )",
          tip: "\u201cWhat do you do for a living?\u201d é a pergunta padrão. Responda com \u201cI work as a…\u201d ou \u201cI'm a…\u201d."
        },
        {
          tutor: "Oh, nice! So what do you do for fun around here?",
          tutor_pt: "Ah, legal! E o que você faz para se divertir por aqui?",
          task: "Diga o que você gosta de fazer. Comece com \u201cI like…\u201d",
          hint: "I like hanging out with friends.",
          pattern: "^(i like|i love|i enjoy)",
          tip: "\u201cHang out\u201d é O verbo americano para \u201csair / passar tempo com amigos\u201d. Vai aparecer o tempo todo."
        },
        {
          tutor: "Same here! Hey, we should hang out sometime.",
          tutor_pt: "Eu também! Ei, a gente deveria sair um dia desses.",
          task: "Aceite o convite e peça para ele te chamar: \u201cHit me up\u201d.",
          hint: "Sure! Hit me up anytime.",
          accept: ["sure hit me up anytime", "sure hit me up", "yeah hit me up anytime", "sure text me anytime", "for sure hit me up", "sounds good hit me up", "yes hit me up", "sure text me"],
          tip: "\u201cHit me up\u201d (HMU) = \u201cme chama / me manda mensagem\u201d. Resposta clássica para convites informais."
        },
        {
          tutor: "Cool! Well, I gotta run — but it was great meeting you!",
          tutor_pt: "Legal! Bom, preciso correr — mas foi ótimo te conhecer!",
          task: "Diga adeus de um jeito informal.",
          hint: "You too! Catch you later!",
          accept: ["you too catch you later", "you too see you later", "catch you later", "see you later take care", "you too see you", "take care see you", "you too take care", "see you later"],
          tip: "\u201cI gotta run\u201d = \u201cpreciso ir\u201d. \u201cCatch you later\u201d = \u201cfalou, até depois\u201d."
        }
      ]
    },
    {
      id: "call",
      icon: "📞",
      title: "Ligação do trabalho",
      level: "Intermediário",
      desc: "Reunião, relatório e telefone sem medo",
      steps: [
        {
          tutor: "Hi, this is Sarah from the office. Do you have a sec?",
          tutor_pt: "Oi, é a Sarah do escritório. Você tem um segundo?",
          task: "Diga que sim e pergunte o que houve: \u201cWhat's up?\u201d",
          hint: "Sure, Sarah. What's up?",
          accept: ["sure sarah what's up", "sure what's up", "yeah what's up", "yes what's up", "sure what's up sarah", "of course what's up", "yeah sure what's up", "hi sarah what's up"],
          tip: "Ao telefone, \u201cThis is + nome\u201d é o jeito de se identificar. \u201cDo you have a sec?\u201d = \u201ctem um minutinho?\u201d."
        },
        {
          tutor: "Hey, so we've got a team meeting at two PM tomorrow. Can you make it?",
          tutor_pt: "Então, temos reunião de equipe às duas da tarde amanhã. Você consegue ir?",
          task: "Confirme que consegue ir.",
          hint: "Yeah, I can make it.",
          accept: ["yeah i can make it", "yes i can make it", "sure i can make it", "yep i can make it", "yeah i'll be there", "yes i'll be there", "yeah i can make it to the meeting", "of course i can make it"],
          tip: "\u201cCan you make it?\u201d = \u201cconsegue estar lá?\u201d. \u201cMake it\u201d aqui não tem nada a ver com fabricar!"
        },
        {
          tutor: "Awesome. We're gonna go over the new project and split up the tasks.",
          tutor_pt: "Ótimo. Vamos revisar o novo projeto e dividir as tarefas.",
          task: "Diga que parece ótimo e que estará lá.",
          hint: "Sounds good. I'll be there.",
          accept: ["sounds good i'll be there", "sounds great i'll be there", "perfect i'll be there", "sounds good see you there", "ok i'll be there", "sounds good i'll be there then", "great i'll be there"],
          tip: "\u201cGo over\u201d = revisar / passar em revista. \u201cSounds good\u201d é o \u201cOK, combinado\u201d do americano."
        },
        {
          tutor: "Perfect. Oh, and could you send me the report before EOD?",
          tutor_pt: "Perfeito. Ah, e você poderia me mandar o relatório antes do fim do dia?",
          task: "Diga que sim, sem problema.",
          hint: "Sure, no problem.",
          accept: ["sure no problem", "yeah no problem", "sure no prob", "yes no problem", "no problem", "sure thing", "yeah sure no problem", "of course no problem"],
          tip: "EOD = \u201cend of day\u201d (fim do expediente). Siglas assim dominam o inglês corporativo americano."
        },
        {
          tutor: "You're the best, thanks! See you tomorrow.",
          tutor_pt: "Você é demais, obrigado! Até amanhã.",
          task: "Encerre a ligação de um jeito informal.",
          hint: "See you tomorrow! Bye!",
          accept: ["see you tomorrow bye", "see you tomorrow", "see ya tomorrow", "ok see you tomorrow", "alright see you tomorrow", "bye see you tomorrow", "see you bye", "great see you tomorrow"],
          tip: "\u201cSee ya\u201d é a pronúncia rápida de \u201csee you\u201d — escrita assim em mensagens o tempo todo."
        }
      ]
    },
    {
      id: "restaurant",
      icon: "🍔",
      title: "Pedindo no restaurante",
      level: "Iniciante",
      desc: "Peça comida sem aperto e no ponto certo",
      steps: [
        {
          tutor: "Hi folks! Welcome to Tony's Grill. Table for how many?",
          tutor_pt: "Oi, gente! Bem-vindos ao Tony's Grill. Mesa para quantos?",
          task: "Peça mesa para dois.",
          hint: "Table for two, please.",
          accept: ["table for two please", "table for 2 please", "a table for two please", "table for two", "table for two people please"],
          tip: "\u201cFolks\u201d = galera / gente. Garçons americanos tratam clientes assim o tempo todo."
        },
        {
          tutor: "Sure thing, right this way. Can I start you off with some drinks?",
          tutor_pt: "Claro, por aqui. Posso começar com as bebidas?",
          task: "Peça duas cocas-colas.",
          hint: "Can we get two Cokes, please?",
          accept: ["can we get two cokes please", "two cokes please", "can we have two cokes please", "can i get two cokes please", "we'll have two cokes please", "two coca colas please", "can we get two coca colas please", "two cokes"],
          tip: "\u201cCoke\u201d nos EUA serve para quase qualquer refrigerante de cola. \u201cCan we get…?\u201d é o plural do \u201cCan I get…?\u201d."
        },
        {
          tutor: "Coming right up. Are you ready to order, or do you need a minute?",
          tutor_pt: "Já estou indo. Prontos para pedir ou precisam de um minuto?",
          task: "Diga que está pronto e peça o hambúrguer com fritas.",
          hint: "I'm ready. I'll have the burger with fries.",
          accept: ["i'm ready i'll have the burger with fries", "i'll have the burger with fries", "i'm ready i'll have a burger and fries", "i'll have a burger with fries", "i'd like the burger with fries", "burger and fries please", "i'll have the burger and fries please", "i'm ready i'll have the burger and fries"],
          tip: "\u201cI'll have…\u201d é como o americano pede comida. \u201cI want\u201d soa grosso em restaurante."
        },
        {
          tutor: "Great choice! How would you like that cooked?",
          tutor_pt: "Ótima escolha! Como você quer o ponto da carne?",
          task: "Peça ao ponto: \u201cmedium\u201d.",
          hint: "Medium, please.",
          accept: ["medium please", "medium", "medium well please", "i'd like it medium please", "medium rare please", "i'd like it medium"],
          tip: "Pontos: rare (mal passada), medium rare, medium, medium well, well done (bem passada)."
        },
        {
          tutor: "You got it. Anything else for you folks tonight?",
          tutor_pt: "Fechou. Mais alguma coisa para vocês hoje?",
          task: "Diga que não, só isso, e agradeça.",
          hint: "No, that's it. Thanks!",
          accept: ["no that's it thanks", "no that's all thanks", "no that's it thank you", "no thanks that's it", "nope that's it thanks", "that's it thanks", "no that's everything thanks", "no that'll be all thanks"],
          tip: "\u201cThat'll be all\u201d é outra saída clássica: \u201cè só isso\u201d."
        }
      ]
    },
    {
      id: "slangtalk",
      icon: "😎",
      title: "Bater papo com gírias",
      level: "Intermediário",
      desc: "Conversa de amigo americano, com gírias reais",
      steps: [
        {
          tutor: "Yo! What's up, man? Long time no see!",
          tutor_pt: "Ei! E aí, cara? Quanto tempo!",
          task: "Responda o \u201cwhat's up\u201d e pergunte como ele está.",
          hint: "Hey! What's up? How you been?",
          accept: ["hey what's up how you been", "what's up how you been", "hey what's up how have you been", "hey what's up man how you been", "hey how you been what's up", "hey what's up how are you", "hey what's up how you doing"],
          tip: "\u201cLong time no see!\u201d = \u201cquanto tempo!\u201d. E \u201cHow you been?\u201d (sem o \u201chave\u201d) é fala real de americano."
        },
        {
          tutor: "Can't complain! Just been chillin', working a lot. Wanna hang out this weekend?",
          tutor_pt: "Não posso reclamar! Só relaxando, trabalhando bastante. Quer sair no fim de semana?",
          task: "Aceite com entusiasmo: \u201cI'm down\u201d / \u201cFor sure\u201d.",
          hint: "For sure! I'm down.",
          accept: ["for sure i'm down", "yeah i'm down", "for sure let's hang out", "yeah let's hang out", "i'm down", "for sure i'm down let's do it", "sounds good i'm down", "yeah i'm down let's do it"],
          tip: "\u201cI'm down\u201d = \u201ctopo / estou dentro\u201d. \u201cChillin'\u201d = \u201crelaxando\u201d. \u201cCan't complain\u201d = \u201cnão posso reclamar\u201d."
        },
        {
          tutor: "Sweet! There's this new taco spot downtown — the tacos there are legit, no cap.",
          tutor_pt: "Show! Tem esse lugar novo de tacos no centro — os tacos são ótimos, falando sério.",
          task: "Diga que parece incrível.",
          hint: "Oh nice! That sounds awesome.",
          accept: ["oh nice that sounds awesome", "that sounds awesome", "oh nice sounds awesome", "that sounds amazing", "nice that sounds great", "sounds lit", "oh nice that sounds amazing", "that sounds great"],
          tip: "\u201cLegit\u201d = autêntico / muito bom. \u201cNo cap\u201d = \u201csem mentira, falando sério\u201d. \u201cSpot\u201d = lugar."
        },
        {
          tutor: "Cool, it's a plan then. I'll hit you up Friday to figure out the details.",
          tutor_pt: "Legal, fechado então. Te chamo na sexta para resolvermos os detalhes.",
          task: "Feche combinando: \u201cWill do\u201d.",
          hint: "Will do! Talk to you later.",
          accept: ["will do talk to you later", "will do", "will do talk to you later man", "sounds good talk to you later", "will do see you later", "cool talk to you later", "perfect talk to you later", "will do see ya"],
          tip: "\u201cWill do\u201d = \u201cserá feito / fechou\u201d. \u201cFigure out\u201d = resolver / descobrir."
        },
        {
          tutor: "Later, dude!",
          tutor_pt: "Falou, cara!",
          task: "Responda o \u201clater\u201d.",
          hint: "Later!",
          accept: ["later", "later man", "see ya", "catch you later", "peace", "later dude", "see you later"],
          tip: "\u201cLater!\u201d sozinho já é despedida total entre amigos. \u201cPeace\u201d também funciona."
        }
      ]
    },
    {
      id: "hotel",
      icon: "🏨",
      title: "Check-in no hotel",
      level: "Viagem",
      desc: "Reserva, WiFi e tudo que precisa na chegada",
      steps: [
        {
          tutor: "Good evening! Welcome to the Grand Hotel. How can I help you tonight?",
          tutor_pt: "Boa noite! Bem-vindo ao Grand Hotel. Como posso ajudar?",
          task: "Diga que tem uma reserva em nome de Silva.",
          hint: "Hi, I have a reservation under Silva.",
          accept: ["hi i have a reservation under silva", "i have a reservation under silva", "hello i have a reservation under silva", "i have a reservation for silva", "hi i have a reservation the name is silva", "i have a reservation", "good evening i have a reservation under silva", "hi i've got a reservation under silva"],
          tip: "\u201cUnder + nome\u201d é como se diz que a reserva está no nome de alguém."
        },
        {
          tutor: "Let me check that for you… Yes, here it is — a double room for three nights, correct?",
          tutor_pt: "Deixa eu verificar… Sim, aqui está — quarto duplo para três noites, correto?",
          task: "Confirme: isso mesmo.",
          hint: "That's right.",
          accept: ["that's right", "that's correct", "yes that's right", "yep that's right", "yes that's correct", "correct", "yes that's right three nights", "exactly"],
          tip: "\u201cThat's right\u201d = \u201cisso mesmo\u201d. A confirmação mais comum do inglês americano."
        },
        {
          tutor: "Perfect. Your room is on the fifth floor, and breakfast is from seven to ten. Anything else?",
          tutor_pt: "Perfeito. Seu quarto é no quinto andar, e o café da manhã é das sete às dez. Mais alguma coisa?",
          task: "Pergunte a senha do WiFi.",
          hint: "Yeah, what's the WiFi password?",
          accept: ["yeah what's the wifi password", "what's the wifi password", "yes what's the wifi password", "what's the password for the wifi", "yeah how do i get the wifi password", "yes could i have the wifi password", "yes can i get the wifi password", "what's the wifi password please"],
          tip: "\u201cWhat's the WiFi password?\u201d — direto e educado. Alternativa: \u201cCould I get the WiFi password?\u201d"
        },
        {
          tutor: "It's grand twenty twenty-six, all lowercase. Enjoy your stay with us!",
          tutor_pt: "É grand dois mil e vinte e seis, tudo minúsculo. Aproveite a estadia!",
          task: "Agradeça.",
          hint: "Thanks a lot!",
          accept: ["thanks a lot", "thank you", "thanks", "thank you so much", "thanks so much", "thank you very much", "thanks a bunch", "thank you i appreciate it"],
          tip: "\u201cEnjoy your stay\u201d = \u201caproveite a estadia\u201d — você vai ouvir isso em todo hotel dos EUA."
        },
        {
          tutor: "My pleasure. If you need anything, just call the front desk.",
          tutor_pt: "Às ordens. Se precisar de qualquer coisa, é só ligar para a recepção.",
          task: "Se despeça: combine e deseje boa noite.",
          hint: "Will do. Good night!",
          accept: ["will do good night", "ok good night", "thank you good night", "will do goodnight", "sounds good good night", "good night", "great good night thank you", "will do thank you good night"],
          tip: "\u201cFront desk\u201d = recepção. \u201cMy pleasure\u201d = \u201càs ordens / foi um prazer\u201d."
        }
      ]
    }
  ],

  /* ---------- DECKS DE VOCABULÁRIO (repetição espaçada) ---------- */
  decks: [
    {
      id: "slang",
      icon: "😎",
      title: "Gírias americanas",
      desc: "As gírias que o americano fala de verdade",
      color: "#8b5cf6",
      cards: [
        { id: "s1",  term: "What's up?", pt: "E aí? Qual é a boa?", ex: "What's up, man? Long time no see!", ex_pt: "E aí, cara? Quanto tempo!", note: "Saudação informal. Resposta comum: \u201cNot much\u201d (nada demais)." },
        { id: "s2",  term: "hang out", pt: "sair, passar tempo com alguém", ex: "Let's hang out this weekend.", ex_pt: "Vamos sair no fim de semana.", note: "O verbo americano padrão para conviver com amigos." },
        { id: "s3",  term: "hit me up", pt: "me chama, me manda mensagem", ex: "Hit me up when you're in town.", ex_pt: "Me chama quando vier para a cidade.", note: "Abreviam como HMU em mensagens." },
        { id: "s4",  term: "I'm down", pt: "topo, estou dentro", ex: "Pizza? I'm down.", ex_pt: "Pizza? Topo.", note: "Aceitar convites com entusiasmo casual." },
        { id: "s5",  term: "no cap", pt: "sem mentira, falando sério", ex: "That movie was amazing, no cap.", ex_pt: "Aquele filme foi incrível, sem exagero.", note: "\u201cCap\u201d = mentira. Muito usado por jovens." },
        { id: "s6",  term: "legit", pt: "autêntico; muito bom", ex: "This burger place is legit.", ex_pt: "Esse hambúrguer é legítimo / demais.", note: "Também significa \u201cde verdade, sério\u201d." },
        { id: "s7",  term: "chill", pt: "relaxar; tranquilo", ex: "Let's just chill at home.", ex_pt: "Vamos só relaxar em casa.", note: "\u201cChill out\u201d também = \u201crelaxa!\u201d (acalmar-se)." },
        { id: "s8",  term: "broke", pt: "sem grana, liso", ex: "Can't go out tonight, I'm broke.", ex_pt: "Não posso sair hoje, estou liso.", note: "Nada a ver com \u201cbroken\u201d (quebrado)." },
        { id: "s9",  term: "gonna", pt: "forma falada de \u201cgoing to\u201d (vou)", ex: "I'm gonna call you later.", ex_pt: "Vou te ligar depois.", note: "100% da fala rápida. Evite só em escrita formal." },
        { id: "s10", term: "wanna", pt: "forma falada de \u201cwant to\u201d (quero)", ex: "Wanna grab a coffee?", ex_pt: "Quer pegar um café?", note: "\u201cYou wanna…?\u201d = \u201cquer…?\u201d" },
        { id: "s11", term: "gotta", pt: "forma falada de \u201cgot to\u201d (tenho que)", ex: "I gotta go, it's late.", ex_pt: "Tenho que ir, tá tarde.", note: "\u201cI gotta run\u201d = \u201ctenho que correr\u201d." },
        { id: "s12", term: "kinda", pt: "forma falada de \u201ckind of\u201d (meio que)", ex: "I'm kinda tired.", ex_pt: "Estou meio cansado.", note: "Suaviza a frase: \u201cI kinda like it\u201d = \u201ceu até gostei\u201d." },
        { id: "s13", term: "lemme", pt: "forma falada de \u201clet me\u201d (deixa eu)", ex: "Lemme check my schedule.", ex_pt: "Deixa eu ver minha agenda.", note: "Muito comum também escrita em mensagens." },
        { id: "s14", term: "gimme", pt: "forma falada de \u201cgive me\u201d (me dá)", ex: "Gimme a sec, I'm coming!", ex_pt: "Me dá um segundo, já vou!", note: "\u201cSec\u201d = \u201csecond\u201d (segundo)." },
        { id: "s15", term: "dunno", pt: "forma falada de \u201cdon't know\u201d (não sei)", ex: "I dunno, whatever you want.", ex_pt: "Sei lá, tanto faz.", note: "\u201cI dunno\u201d sai sem pensar na boca do americano." },
        { id: "s16", term: "my bad", pt: "foi mal, minha culpa", ex: "My bad, I didn't see your text.", ex_pt: "Foi mal, não vi sua mensagem.", note: "Desculpa rápida para erros pequenos." },
        { id: "s17", term: "for real", pt: "sério, é verdade", ex: "This traffic is crazy, for real.", ex_pt: "Esse trânsito é absurdo, sério.", note: "Como pergunta: \u201cFor real?\u201d = \u201csério?\u201d" },
        { id: "s18", term: "you bet", pt: "com certeza, claro", ex: "You coming? — You bet!", ex_pt: "Você vai? — Claro!", note: "Resposta animada e bem americana." },
        { id: "s19", term: "dude", pt: "cara, mano", ex: "Dude, check this out!", ex_pt: "Cara, olha isso!", note: "Funciona para qualquer gênero entre amigos." },
        { id: "s20", term: "fam", pt: "galera próxima, os brothers", ex: "What's up, fam?", ex_pt: "E aí, galera?", note: "Vem de \u201cfamily\u201d; usada para amigos chegados." },
        { id: "s21", term: "sus", pt: "suspeito, esquisito", ex: "That guy looks kinda sus.", ex_pt: "Aquele cara parece meio suspeito.", note: "Vem de \u201csuspicious\u201d. Virou febre com Among Us." },
        { id: "s22", term: "salty", pt: "chateado, amargurado", ex: "He's salty because he lost.", ex_pt: "Ele tá chateado porque perdeu.", note: "Nada a ver com salgado literal." },
        { id: "s23", term: "ghost", pt: "sumir, deixar de responder", ex: "She ghosted me after the date.", ex_pt: "Ela sumiu comigo depois do encontro.", note: "Verbo: to ghost someone = cortar contato do nada." },
        { id: "s24", term: "spill the tea", pt: "contar a fofoca", ex: "Come on, spill the tea!", ex_pt: "Qual é, conta a fofoca!", note: "\u201cTea\u201d = fofoca. \u201cThat's the tea\u201d = \u201cessa é a fofoca\u201d." },
        { id: "s25", term: "vibe", pt: "clima, energia", ex: "I love the vibe of this place.", ex_pt: "Amo o clima desse lugar.", note: "\u201cVibes\u201d também: \u201cgood vibes only\u201d." },
        { id: "s26", term: "lowkey", pt: "meio que, discretamente", ex: "I'm lowkey excited about it.", ex_pt: "Tô meio empolgado com isso.", note: "O oposto é \u201chighkey\u201d (super, abertamente)." },
        { id: "s27", term: "flex", pt: "se exibir, ostentar", ex: "He always flexes his new car.", ex_pt: "Ele sempre ostenta o carro novo.", note: "\u201cWeird flex but ok\u201d virou meme." },
        { id: "s28", term: "it's lit", pt: "tá incrível (festa, ambiente)", ex: "The party was lit!", ex_pt: "A festa tava incrível!", note: "\u201cLit\u201d = animado demais, pegando fogo." },
        { id: "s29", term: "throw shade", pt: "jogar indireta", ex: "Did you hear her throw shade at him?", ex_pt: "Você viu ela jogando indireta para ele?", note: "Crítica disfarçada de comentário casual." },
        { id: "s30", term: "grab a bite", pt: "comer algo rápido", ex: "Let's grab a bite before the movie.", ex_pt: "Vamos comer algo rápido antes do filme.", note: "\u201cGrab\u201d = pegar de passagem (grab a coffee, grab lunch)." },
        { id: "s31", term: "crash (at my place)", pt: "dormir na casa de alguém", ex: "You can crash at my place tonight.", ex_pt: "Pode dormir lá em casa hoje.", note: "\u201cMy place\u201d = minha casa. \u201cCrash\u201d também = apagar de sono." },
        { id: "s32", term: "spot", pt: "lugar, ponto de encontro", ex: "There's a cool spot near here.", ex_pt: "Tem um lugar legal perto daqui.", note: "\u201cThis new spot\u201d = \u201cesse lugar novo\u201d." }
      ]
    },
    {
      id: "phrasal",
      icon: "🔗",
      title: "Phrasal verbs essenciais",
      desc: "Os 24 que desbloqueiam qualquer conversa",
      color: "#0ea5e9",
      cards: [
        { id: "p1",  term: "figure out", pt: "descobrir, entender", ex: "I need to figure out how this works.", ex_pt: "Preciso descobrir como isso funciona.", note: "Impossível conversar sem ele." },
        { id: "p2",  term: "run out of", pt: "ficar sem", ex: "We ran out of milk.", ex_pt: "Ficamos sem leite.", note: "\u201cI'm running out of time\u201d = estou sem tempo." },
        { id: "p3",  term: "look forward to", pt: "estar ansioso por", ex: "I look forward to seeing you.", ex_pt: "Estou ansioso para ver você.", note: "Repare: depois vem -ING (look forward to seeing)." },
        { id: "p4",  term: "get along (with)", pt: "se dar bem (com)", ex: "I get along with my coworkers.", ex_pt: "Me dou bem com meus colegas.", note: "\u201cThey get along\u201d = eles se dão bem." },
        { id: "p5",  term: "give up", pt: "desistir", ex: "Never give up on your dreams.", ex_pt: "Nunca desista dos seus sonhos.", note: "\u201cGive up on someone\u201d = desistir de alguém." },
        { id: "p6",  term: "find out", pt: "descobrir, ficar sabendo", ex: "I found out she moved.", ex_pt: "Fiquei sabendo que ela se mudou.", note: "Descobrir por acaso ou por informação." },
        { id: "p7",  term: "come up with", pt: "criar, bolar (uma ideia)", ex: "He came up with a great idea.", ex_pt: "Ele bolo(u) uma ideia ótima.", note: "Sempre com ideias, planos, soluções." },
        { id: "p8",  term: "put off", pt: "adiar, deixar para depois", ex: "Don't put off your English practice.", ex_pt: "Não deixe sua prática de inglês para depois.", note: "\u201cProcrastinar\u201d em duas palavras." },
        { id: "p9",  term: "turn down", pt: "recusar (convite, oferta)", ex: "She turned down the job offer.", ex_pt: "Ela recusou a proposta de emprego.", note: "Não confunda: baixar o volume também é turn down." },
        { id: "p10", term: "pick up", pt: "buscar, pegar alguém", ex: "I'll pick you up at 8.", ex_pt: "Passo te pegar às 8.", note: "Também: pick up a language = aprender sem esforço." },
        { id: "p11", term: "drop off", pt: "deixar alguém em algum lugar", ex: "I'll drop you off at school.", ex_pt: "Te deixo na escola.", note: "Par oposto de pick up." },
        { id: "p12", term: "work out", pt: "malhar; dar certo", ex: "Don't worry, things will work out.", ex_pt: "Não se preocupe, vai dar certo.", note: "\u201cI work out\u201d = eu malho. O contexto decide." },
        { id: "p13", term: "show up", pt: "aparecer, dar as caras", ex: "He showed up late to the party.", ex_pt: "Ele chegou tarde na festa.", note: "Muito comum: \u201cHe didn't show up\u201d = ele não apareceu." },
        { id: "p14", term: "call off", pt: "cancelar", ex: "They called off the meeting.", ex_pt: "Cancelaram a reunião.", note: "Comum com eventos e compromissos." },
        { id: "p15", term: "check out", pt: "conferir, dar uma olhada", ex: "Check out this song!", ex_pt: "Confere essa música!", note: "\u201cCheck it out!\u201d = \u201colha isso!\u201d" },
        { id: "p16", term: "end up", pt: "acabar (fazendo algo)", ex: "We ended up staying home.", ex_pt: "Acabamos ficando em casa.", note: "Sempre seguido de -ING: end up doing." },
        { id: "p17", term: "deal with", pt: "lidar com", ex: "I'll deal with it tomorrow.", ex_pt: "Vou lidar com isso amanhã.", note: "Problemas, pessoas, situações difíceis." },
        { id: "p18", term: "bring up", pt: "mencionar, trazer à tona", ex: "Don't bring that up again.", ex_pt: "Não mencione isso de novo.", note: "Assuntos em conversa." },
        { id: "p19", term: "catch up", pt: "pôr em dia; saber as novidades", ex: "Let's catch up over coffee.", ex_pt: "Vamos pôr o papo em dia com um café.", note: "\u201cCatch up with a friend\u201d = colocar o papo em dia." },
        { id: "p20", term: "run into", pt: "esbarrar com alguém por acaso", ex: "I ran into an old friend.", ex_pt: "Encontrei um velho amigo por acaso.", note: "Sempre por acaso, sem marcação." },
        { id: "p21", term: "set up", pt: "organizar, marcar", ex: "Let's set up a meeting.", ex_pt: "Vamos marcar uma reunião.", note: "Também: montar (set up a tent)." },
        { id: "p22", term: "look up", pt: "pesquisar, procurar (informação)", ex: "Look it up online.", ex_pt: "Pesquisa isso na internet.", note: "\u201cGoogle it\u201d é o sinônimo moderno." },
        { id: "p23", term: "point out", pt: "apontar, destacar", ex: "She pointed out a mistake.", ex_pt: "Ela apontou um erro.", note: "Chamar atenção para algo específico." },
        { id: "p24", term: "fill in / fill out", pt: "preencher (formulário)", ex: "Fill out this form, please.", ex_pt: "Preencha este formulário, por favor.", note: "Fill in e fill out: os dois servem." }
      ]
    }
  ],

  /* ---------- SHADOWING (pronúncia + connected speech) ---------- */
  shadowing: [
    { id: "sh1",  sentence: "Whatcha doin'?", full: "What are you doing?", pt: "O que você está fazendo?", tip: "\u201cWhat are you\u201d vira \u201cwhatcha\u201d na fala rápida." },
    { id: "sh2",  sentence: "I'm gonna grab a coffee.", full: "I am going to grab a coffee.", pt: "Vou pegar um café.", tip: "\u201cgoing to\u201d vira \u201cgonna\u201d em praticamente toda conversa rápida." },
    { id: "sh3",  sentence: "Wanna grab a bite?", full: "Do you want to grab a bite?", pt: "Quer comer alguma coisa?", tip: "\u201cwant to\u201d vira \u201cwanna\u201d — e o \u201cdo you\u201d quase some." },
    { id: "sh4",  sentence: "I gotta run.", full: "I have got to run.", pt: "Tenho que ir correndo.", tip: "\u201cgot to\u201d vira \u201cgotta\u201d." },
    { id: "sh5",  sentence: "Lemme know if you need anything.", full: "Let me know if you need anything.", pt: "Me avise se precisar de qualquer coisa.", tip: "\u201clet me\u201d vira \u201clemme\u201d." },
    { id: "sh6",  sentence: "Gimme a sec.", full: "Give me a second.", pt: "Me dá um segundo.", tip: "\u201cgive me\u201d vira \u201cgimme\u201d; \u201csecond\u201d vira \u201csec\u201d." },
    { id: "sh7",  sentence: "I dunno, lemme think.", full: "I don't know, let me think.", pt: "Sei lá, deixa eu pensar.", tip: "\u201cdon't know\u201d vira \u201cdunno\u201d." },
    { id: "sh8",  sentence: "How's it going?", full: "How is it going?", pt: "E aí, como está indo?", tip: "Saudação nº 1 entre conhecidos. Resposta comum: \u201cIt's going great!\u201d" },
    { id: "sh9",  sentence: "It's up to you.", full: "It is up to you.", pt: "Você que decide / tanto faz.", tip: "Frase-chave para decisões em grupo." },
    { id: "sh10", sentence: "That'd be great.", full: "That would be great.", pt: "Isso seria ótimo.", tip: "\u201cwould\u201d vira \u201c'd\u201d: That'd, I'd, We'd." },
    { id: "sh11", sentence: "A coupla bucks.", full: "A couple of bucks.", pt: "Umas poucas moedas / uns trocados.", tip: "\u201ccouple of\u201d vira \u201ccoupla\u201d; \u201cbucks\u201d = dólares." },
    { id: "sh12", sentence: "Jeet yet?", full: "Did you eat yet?", pt: "Já comeu?", tip: "Redução extrema: \u201cdid you eat\u201d vira \u201cjeet\u201d — e americano fala assim mesmo!" }
  ],

  /* ---------- GÍRIA DO DIA ---------- */
  slangOfDay() {
    const all = this.decks[0].cards;
    const day = Math.floor(Date.now() / 864e5);
    return all[day % all.length];
  }
};
