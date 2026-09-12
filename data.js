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
    },
    {
      id: "er",
      icon: "\ud83c\udfe5",
      title: "No pronto-socorro",
      level: "Sa\u00fade",
      desc: "Explique dor, alergia e plano de sa\u00fade",
      steps: [
        {
          tutor: "Good afternoon. What brings you in today?",
          tutor_pt: "Boa tarde. O que trouxe voc\u00ea aqui hoje?",
          task: "Diga que est\u00e1 com uma forte dor de est\u00f4mago.",
          hint: "I have a terrible stomachache.",
          accept: ["i have a terrible stomachache", "i have a bad stomachache", "i have a strong stomachache", "my stomach hurts a lot", "i have a bad stomach ache", "i have a terrible stomach ache"],
          tip: "Stomachache = dor de est\u00f4mago. Junte a parte do corpo + ache: headache, earache, backache, toothache."
        },
        {
          tutor: "I see. How long have you had these symptoms?",
          tutor_pt: "Entendo. H\u00e1 quanto tempo tem esses sintomas?",
          task: "Diga que come\u00e7ou desde ontem \u00e0 noite.",
          hint: "Since last night.",
          accept: ["since last night", "since yesterday", "since yesterday night", "since this morning", "for two days", "since two days ago"],
          tip: "\u201cHow long have you had…?\u201d \u00e9 a pergunta cl\u00e1ssica de m\u00e9dico. Responda com \u201cSince…\u201d (desde) ou \u201cFor…\u201d (h\u00e1)."
        },
        {
          tutor: "Okay. Are you allergic to any medication?",
          tutor_pt: "Ok. Voc\u00ea \u00e9 al\u00e9rgico a algum medicamento?",
          task: "Diga que sim: al\u00e9rgico \u00e0 penicilina. (Ou diga que n\u00e3o.)",
          hint: "Yes, I'm allergic to penicillin.",
          pattern: "^(yes|yeah|yep|sure)[^a-z]*(i'?m )?allerg|^(no|nope|nah)[^a-z]*(i'?m not|no allerg|not allerg)",
          tip: "Allergic to = al\u00e9rgico a. Nos EUA essa pergunta \u00e9 SEMPRE feita antes de receitar qualquer coisa."
        },
        {
          tutor: "Understood. The doctor will see you shortly. Please fill out this form.",
          tutor_pt: "Entendido. O m\u00e9dico vai te atender em breve. Por favor, preencha este formul\u00e1rio.",
          task: "Aceite e pergunte se aceitam seu plano de sa\u00fade.",
          hint: "Sure. Do you take my insurance?",
          accept: ["sure do you take my insurance", "ok do you take my insurance", "do you take my insurance", "sure do you accept my insurance", "do you accept my insurance", "sure do you take my health insurance"],
          tip: "\u201cDo you take my insurance?\u201d = \u201cvoc\u00eas aceitam meu plano de sa\u00fade?\u201d — \u201ctake\u201d no sentido de aceitar."
        },
        {
          tutor: "Yes, we do. Please have a seat, and we'll call your name.",
          tutor_pt: "Sim, aceitamos. Por favor, sente-se que vamos chamar seu nome.",
          task: "Agrade\u00e7a.",
          hint: "Thank you very much.",
          accept: ["thank you very much", "thanks", "thank you", "thanks a lot", "thank you so much", "thanks so much"],
          tip: "\u201cHave a seat\u201d = \u201csente-se\u201d. Voc\u00ea vai ouvir isso em consult\u00f3rios, recep\u00e7\u00f5es e restaurantes."
        }
      ]
    },
    {
      id: "interview",
      icon: "\ud83d\udcbc",
      title: "Entrevista de emprego",
      level: "Trabalho",
      desc: "As 5 perguntas cl\u00e1ssicas e como responder",
      steps: [
        {
          tutor: "Hi, come on in! Did you find the place okay?",
          tutor_pt: "Oi, entre! Conseguiu achar o lugar facilmente?",
          task: "Diga que sim e agrade\u00e7a pelo recebimento.",
          hint: "Yes, I did. Thank you for having me.",
          accept: ["yes i did thank you for having me", "yes thank you for having me", "yeah i did thanks for having me", "yes it was easy thank you for having me", "yes i did thanks for having me"],
          tip: "\u201cThanks for having me\u201d = \u201cobrigado pelo recebimento/oportunidade\u201d — frase de ouro para abrir entrevistas."
        },
        {
          tutor: "Great! So, tell me a little about yourself.",
          tutor_pt: "\u00d3timo! Ent\u00e3o, me conte um pouco sobre voc\u00ea.",
          task: "Apresente-se: comece com \u201cI'm…\u201d e fale seu trabalho e o que voc\u00ea ama.",
          hint: "I'm a hard worker and I love learning new things.",
          pattern: "^i(')?m ",
          tip: "\u201cTell me about yourself\u201d \u00e9 a pergunta n\u00ba 1 de TODA entrevista. Estrutura: quem voc\u00ea \u00e9 + experi\u00eancia + o que voc\u00ea ama."
        },
        {
          tutor: "Interesting. And why do you want to work with us?",
          tutor_pt: "Interessante. E por que voc\u00ea quer trabalhar conosco?",
          task: "Justifique: comece com \u201cBecause…\u201d.",
          hint: "Because your company is a leader and I want to grow.",
          pattern: "^(because|'cause) ",
          tip: "\u201cGrow\u201d = crescer profissionalmente. Conecte seus objetivos com a empresa — isso impressiona."
        },
        {
          tutor: "Nice answer. What are your salary expectations?",
          tutor_pt: "Boa resposta. Quais s\u00e3o suas expectativas salariais?",
          task: "Diga que busca algo em torno de cinco mil por m\u00eas. (Ou diga \u201cI'm flexible\u201d.)",
          hint: "I'm looking for something around five thousand a month.",
          pattern: "(around|about|flexible)",
          tip: "Salary expectations = expectativa salarial. Se n\u00e3o quiser dar n\u00famero, diga \u201cI'm flexible\u201d (sou flex\u00edvel)."
        },
        {
          tutor: "Perfect. We'll get back to you by Friday. It was great to meet you!",
          tutor_pt: "Perfeito. Retornamos at\u00e9 sexta. Foi um prazer te conhecer!",
          task: "Agrade\u00e7a e diga que fica no aguardo.",
          hint: "Thank you! I look forward to hearing from you.",
          accept: ["thank you i look forward to hearing from you", "thanks i look forward to hearing from you", "thank you i look forward to it", "thanks looking forward to hearing from you", "thank you looking forward to hearing from you"],
          tip: "\u201cI look forward to hearing from you\u201d = \u201cfico no aguardo\u201d — fechamento cl\u00e1ssico e profissional."
        }
      ]
    },
    {
      id: "airport",
      icon: "\u2708\ufe0f",
      title: "No aeroporto",
      level: "Viagem",
      desc: "Check-in, mala e embarque sem sufoco",
      steps: [
        {
          tutor: "Good morning! May I see your passport and ticket, please?",
          tutor_pt: "Bom dia! Posso ver seu passaporte e passagem, por favor?",
          task: "Entregue dizendo \u201chere you go\u201d.",
          hint: "Sure, here you go.",
          accept: ["sure here you go", "sure here it is", "of course here you go", "yes here you go", "sure here you are", "yes here it is"],
          tip: "\u201cHere you go\u201d = \u201caqui est\u00e1\u201d — a frase mais usada do mundo na hora de entregar qualquer coisa."
        },
        {
          tutor: "Thank you. Are you checking any bags today?",
          tutor_pt: "Obrigado. Vai despachar alguma mala hoje?",
          task: "Diga que sim, s\u00f3 uma mala.",
          hint: "Yes, just one suitcase.",
          accept: ["yes just one suitcase", "yes one suitcase", "yeah just one bag", "yes just one bag", "just one suitcase", "yes i have one suitcase", "yes just this one suitcase"],
          tip: "Checked bag = mala despachada. Carry-on = mala de m\u00e3o. \u201cCheck a bag\u201d = despachar mala."
        },
        {
          tutor: "Would you prefer a window or an aisle seat?",
          tutor_pt: "Voc\u00ea prefere assento na janela ou no corredor?",
          task: "Escolha janela.",
          hint: "A window seat, please.",
          accept: ["a window seat please", "window seat please", "window please", "i'd like a window seat please", "a window seat", "the window seat please"],
          tip: "Aisle seat = corredor. Window seat = janela. Middle seat = meio (todo americano evita!)."
        },
        {
          tutor: "Here's your boarding pass. Boarding starts at nine thirty at gate B12.",
          tutor_pt: "Aqui est\u00e1 seu cart\u00e3o de embarque. O embarque come\u00e7a \u00e0s nove e meia, port\u00e3o B12.",
          task: "Confirme perguntando a hora do embarque.",
          hint: "Great. What time does boarding start?",
          accept: ["great what time does boarding start", "what time does boarding start", "ok what time does boarding start", "great what time is boarding", "perfect what time does boarding start"],
          tip: "Boarding pass = cart\u00e3o de embarque. Gate = port\u00e3o. Boarding = embarque. \u201cOn time\u201d = no hor\u00e1rio."
        },
        {
          tutor: "At nine thirty sharp. Have a great flight!",
          tutor_pt: "Nove e meia em ponto. Tenha um \u00f3timo v\u00f4o!",
          task: "Agrade\u00e7a.",
          hint: "Thanks a lot! Have a nice day.",
          accept: ["thanks a lot have a nice day", "thanks a lot", "thank you have a nice day", "thank you very much have a nice day", "thanks have a nice day", "thank you you too"],
          tip: "\u201cHave a great flight\u201d \u00e9 o desejo padr\u00e3o nos aeroportos americanos. Responda sempre com um sorriso e \u201cThank you!\u201d"
        }
      ]
    },
    {
      id: "pharmacy",
      icon: "\ud83d\udc8a",
      title: "Na farm\u00e1cia",
      level: "Dia a dia",
      desc: "Pe\u00e7a rem\u00e9dio e entenda as instru\u00e7\u00f5es",
      steps: [
        {
          tutor: "Hi, welcome to the pharmacy. How can I help you?",
          tutor_pt: "Oi, bem-vindo \u00e0 farm\u00e1cia. Como posso ajudar?",
          task: "Diga que precisa de algo para dor de cabe\u00e7a.",
          hint: "I need something for a headache.",
          accept: ["i need something for a headache", "i need something for a headache please", "i need something for my headache", "i have a headache i need something", "i need something for the headache"],
          tip: "\u201cSomething for + problema\u201d \u00e9 o jeito de pedir rem\u00e9dio: something for a cold, for a cough, for pain."
        },
        {
          tutor: "Okay. Is it for you or for a child?",
          tutor_pt: "Ok. \u00c9 para voc\u00ea ou para uma crian\u00e7a?",
          task: "Diga que \u00e9 para voc\u00ea.",
          hint: "It's for me.",
          accept: ["it's for me", "for me", "it's for me thanks", "for myself", "it is for me"],
          tip: "Eles perguntam isso por causa das doses infantis. Responda direto: \u201cIt's for me\u201d ou \u201cIt's for my son\u201d."
        },
        {
          tutor: "Alright. Are you taking any other medication right now?",
          tutor_pt: "Certo. Est\u00e1 tomando algum outro medicamento agora?",
          task: "Diga que n\u00e3o est\u00e1 tomando nada.",
          hint: "No, I'm not taking anything.",
          accept: ["no i'm not taking anything", "no not taking anything", "no nothing", "no i'm not", "no i'm not taking any medication", "no i'm not taking anything right now"],
          tip: "\u201cTaking medication\u201d = tomando rem\u00e9dio. Nos EUA nunca se diz \u201cdrinking\u201d medicine!"
        },
        {
          tutor: "This one is very good. Two tablets every six hours, with food.",
          tutor_pt: "Esse \u00e9 muito bom. Dois comprimidos a cada seis horas, com comida.",
          task: "Confirme que entendeu e pergunte o pre\u00e7o.",
          hint: "Got it. How much is it?",
          accept: ["got it how much is it", "ok how much is it", "got it how much does it cost", "ok how much does it cost", "how much is it", "got it how much is it here"],
          tip: "\u201cGot it\u201d = \u201centendi\u201d. E \u201cHow much is it?\u201d \u00e9 o \u201cquanto custa\u201d universal."
        },
        {
          tutor: "That'll be eight ninety-nine. Have a nice day, and feel better!",
          tutor_pt: "Fica oito d\u00f3lares e noventa e nove. Bom dia para voc\u00ea, e melhoras!",
          task: "Agrade\u00e7a muito.",
          hint: "Thank you so much!",
          accept: ["thank you so much", "thanks so much", "thank you very much", "thanks a lot", "thank you"],
          tip: "\u201cFeel better!\u201d = \u201cmelhoras!\u201d — o desejo carinhoso americano quando algu\u00e9m est\u00e1 doente."
        }
      ]
    },
    {
      id: "rentcar",
      icon: "\ud83d\ude97",
      title: "Alugando um carro",
      level: "Viagem",
      desc: "Reserva, seguro e devolu\u00e7\u00e3o do carro",
      steps: [
        {
          tutor: "Welcome to Speedy Rentals! Do you have a reservation?",
          tutor_pt: "Bem-vindo \u00e0 Speedy Rentals! Voc\u00ea tem uma reserva?",
          task: "Diga que sim, em nome de Silva.",
          hint: "Yes, under the name Silva.",
          accept: ["yes under the name silva", "yes under silva", "yeah under the name silva", "yes i have a reservation under silva", "yes under the name of silva", "yes it's under the name silva"],
          tip: "\u201cUnder the name…\u201d serve para reserva de carro, hotel e restaurante. Uma \u00fanica frase para tudo!"
        },
        {
          tutor: "Perfect. Do you want insurance with that?",
          tutor_pt: "Perfeito. Quer seguro junto?",
          task: "Aceite o seguro completo.",
          hint: "Yes, full insurance, please.",
          accept: ["yes full insurance please", "yes full coverage please", "yes i want full insurance", "yes full insurance", "full insurance please", "yes i'd like full insurance please"],
          tip: "Full insurance / full coverage = cobertura total. Em d\u00favida, pergunte: \u201cWhat do you recommend?\u201d (o que voc\u00ea recomenda?)"
        },
        {
          tutor: "Great. The car has a full tank, so return it full, please. Do you need GPS or a child seat?",
          tutor_pt: "\u00d3timo. O carro est\u00e1 com o tanque cheio, ent\u00e3o devolva cheio, por favor. Precisa de GPS ou cadeirinha?",
          task: "Recuse e diga que \u00e9 s\u00f3 isso.",
          hint: "No, thanks. That's all.",
          accept: ["no thanks that's all", "no thanks that's it", "no that's all thanks", "nope that's it thanks", "no thanks just that", "no thank you that's all"],
          tip: "Full tank = tanque cheio. \u201cReturn it full\u201d = devolva cheio — pol\u00edtica padr\u00e3o das locadoras nos EUA."
        },
        {
          tutor: "Alright. Here are the keys. The car is in spot number seven. Enjoy!",
          tutor_pt: "Certo. Aqui est\u00e3o as chaves. O carro est\u00e1 na vaga n\u00famero sete. Aproveite!",
          task: "Pergunte onde devolve o carro.",
          hint: "Where can I return the car?",
          accept: ["where can i return the car", "where do i return the car", "where can i drop off the car", "where do i drop it off", "where can i drop it off", "where do i return it"],
          tip: "\u201cDrop off\u201d = devolver/deixar. Drop-off point = ponto de devolu\u00e7\u00e3o. Voc\u00ea j\u00e1 conhecia do pick up/drop off!"
        },
        {
          tutor: "Just here at the office, anytime before six PM. Have fun!",
          tutor_pt: "Aqui mesmo na loja, qualquer hor\u00e1rio antes das seis da tarde. Divirta-se!",
          task: "Agrade\u00e7a e se despe\u00e7a.",
          hint: "Thanks! See you soon.",
          accept: ["thanks see you soon", "thank you see you soon", "thanks see you", "thank you have a nice day", "thanks bye", "thanks have a good one"],
          tip: "\u201cHave a good one!\u201d = \u201ctenha um bom dia!\u201d — despedida super comum no balc\u00e3o."
        }
      ]
    },
    {
      id: "bank",
      icon: "\ud83c\udfe6",
      title: "No banco",
      level: "Dia a dia",
      desc: "Abra conta e entenda as taxas",
      steps: [
        {
          tutor: "Good morning. How may I help you today?",
          tutor_pt: "Bom dia. Como posso ajudar hoje?",
          task: "Diga que quer abrir uma conta corrente.",
          hint: "I'd like to open a checking account.",
          accept: ["i'd like to open a checking account", "i want to open a checking account", "i would like to open a checking account", "i'd like to open a bank account", "i want to open a bank account", "i'd like to open a checking account please"],
          tip: "Checking account = conta corrente. Savings account = conta poupan\u00e7a. \u201cI'd like to…\u201d = \u201ceu gostaria de…\u201d (educado)."
        },
        {
          tutor: "Sure. Do you have a social security number or an ITIN?",
          tutor_pt: "Claro. Voc\u00ea tem um n\u00famero de seguran\u00e7a social ou um ITIN?",
          task: "Diga que sim e entregue: \u201cHere is my SSN.\u201d",
          hint: "Yes, here is my SSN.",
          accept: ["yes here is my ssn", "yes here's my ssn", "yes here it is", "yes i have a ssn here it is", "yes here is my social security number", "yes here you go"],
          tip: "SSN = social security number (o \u201cCPF\u201d americano). Sem SSN, estrangeiros usam o ITIN."
        },
        {
          tutor: "Perfect. Would you like a debit card as well?",
          tutor_pt: "Perfeito. Gostaria de um cart\u00e3o de d\u00e9bito tamb\u00e9m?",
          task: "Aceite e pe\u00e7a com pagamento por aproxima\u00e7\u00e3o.",
          hint: "Yes, with contactless payment, please.",
          accept: ["yes with contactless payment please", "yes with contactless please", "yes please with contactless", "yes with contactless payment", "yes contactless please", "yes i'd like contactless please"],
          tip: "Debit card = d\u00e9bito. Credit card = cr\u00e9dito. Contactless = por aproxima\u00e7\u00e3o (\u201ctap to pay\u201d)."
        },
        {
          tutor: "No problem. Your card arrives by mail in five to seven business days.",
          tutor_pt: "Sem problema. Seu cart\u00e3o chega pelos correios em cinco a sete dias \u00fateis.",
          task: "Confirme e pergunte se h\u00e1 taxa mensal.",
          hint: "By mail? Is there a monthly fee?",
          accept: ["by mail is there a monthly fee", "ok is there a monthly fee", "by mail how much is the monthly fee", "is there a monthly fee", "okay is there a monthly fee", "got it is there a monthly fee"],
          tip: "\u201cBy mail\u201d = pelos correios. \u201cMonthly fee\u201d = taxa mensal — pergunte SEMPRE, muitos bancos cobram!"
        },
        {
          tutor: "This account has no monthly fees. Anything else I can do for you?",
          tutor_pt: "Esta conta n\u00e3o tem taxa mensal. Mais alguma coisa em que posso ajudar?",
          task: "Diga que \u00e9 tudo e agrade\u00e7a.",
          hint: "No, that's everything. Thank you!",
          accept: ["no that's everything thank you", "no that's all thank you", "no that's everything thanks", "no that's all thanks", "nope that's everything thank you", "no that's it thank you"],
          tip: "\u201cThat's everything\u201d = \u201c\u00e9 tudo\u201d. Varia\u00e7\u00f5es: \u201cThat's all\u201d, \u201cThat's it\u201d — tr\u00eas jeitos, um significado."
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
    },
    {
      id: "media",
      icon: "\ud83c\udfac",
      title: "Música & Filmes",
      desc: "Expressões dos clássicos que americano fala",
      color: "#e11d48",
      cards: [
        { id: "m1",  term: "let it be", pt: "deixa pra lá, deixa como está", ex: "Don't worry about it — let it be.", ex_pt: "Não se preocupe com isso — deixa pra lá.", note: "Clássico dos Beatles (1970). Ouça o refrão e perceba a calma da expressão." },
        { id: "m2",  term: "shake it off", pt: "não ligar, deixar rolar", ex: "He was rude? Just shake it off.", ex_pt: "Ele foi grosso? Só deixa rolar.", note: "Hit da Taylor Swift (2014) sobre ignorar as críticas." },
        { id: "m3",  term: "lose yourself", pt: "se entregar de corpo e alma", ex: "I lost myself in that series all weekend.", ex_pt: "Me entreguei de corpo e alma naquela série o fim de semana inteiro.", note: "Eminem (2002), tema do filme 8 Mile. Rápida de mais? Só a expressão importa!" },
        { id: "m4",  term: "can't stop the feeling", pt: "não consigo segurar a empolgação", ex: "Game day! I can't stop the feeling!", ex_pt: "Dia de jogo! Não consigo segurar a empolgação!", note: "Justin Timberlake (2016). Empolgação pura." },
        { id: "m5",  term: "take me home", pt: "me leva para casa", ex: "It's late — can you take me home?", ex_pt: "Tá tarde — você me leva pra casa?", note: "Hino \u201cTake Me Home, Country Roads\u201d (John Denver, 1971), cantado em todo bar dos EUA." },
        { id: "m6",  term: "I will survive", pt: "vou superar", ex: "Breakups hurt, but you will survive.", ex_pt: "Términos doem, mas você vai superar.", note: "Gloria Gaynor (1978), hino disco de superação." },
        { id: "m7",  term: "we are the champions", pt: "somos os campeões", ex: "We won the league — we are the champions!", ex_pt: "Ganhamos o campeonato — somos os campeões!", note: "Queen (1977). Toca em toda final de campeonato nos EUA." },
        { id: "m8",  term: "don't stop believin'", pt: "não pare de acreditar", ex: "Keep studying. Don't stop believin'!", ex_pt: "Continue estudando. Não pare de acreditar!", note: "Journey (1981). A cena final de The Sopranos eternizou a música." },
        { id: "m9",  term: "uptown / downtown", pt: "bairro nobre (norte) / centro", ex: "We're going downtown tonight.", ex_pt: "Vamos para o centro hoje à noite.", note: "\u201cUptown Funk\u201d (2014). Em NY: uptown = norte, downtown = sul/centro." },
        { id: "m10", term: "stand by me", pt: "ficar ao meu lado, me apoiar", ex: "Will you stand by me no matter what?", ex_pt: "Você fica do meu lado em qualquer situação?", note: "Clássico do Ben E. King (1961), também filme dos anos 80." },
        { id: "m11", term: "May the Force be with you", pt: "que a Força esteja com você (boa sorte!)", ex: "Job interview tomorrow? May the Force be with you!", ex_pt: "Entrevista amanhã? Boa sorte!", note: "Star Wars (1977). Americano de verdade diz isso para desejar sorte." },
        { id: "m12", term: "I'll be back", pt: "eu já volto", ex: "Grabbing coffee. I'll be back in ten.", ex_pt: "Vou pegar um café. Já volto em dez minutos.", note: "Arnold Schwarzenegger em O Exterminador do Futuro (1984). A frase mais imitada de Hollywood." },
        { id: "m13", term: "you never know", pt: "a gente nunca sabe", ex: "Buy a ticket — you never know, maybe you'll win!", ex_pt: "Compre um bilhete — nunca se sabe, talvez você ganhe!", note: "O espírito de Forrest Gump (1994): a vida é cheia de surpresas." },
        { id: "m14", term: "You had me at hello", pt: "já me conquistou no \u201coi\u201d", ex: "She said the job has free lunch — you had me at hello!", ex_pt: "Ela disse que o trabalho tem almoço grátis — já me convenceu logo de cara!", note: "Jerry Maguire (1996), a cena romântica mais imitada dos anos 90." },
        { id: "m15", term: "let it go", pt: "solte, deixe ir", ex: "He already apologized. Let it go.", ex_pt: "Ele já pediu desculpas. Deixa ir.", note: "O hit de Frozen (2013), cantado por toda criança americana." },
        { id: "m16", term: "To infinity and beyond", pt: "ao infinito e além", ex: "New project launching — to infinity and beyond!", ex_pt: "Novo projeto lançando — ao infinito e além!", note: "Buzz Lightyear, Toy Story (1995). Frase de motivação cômica." },
        { id: "m17", term: "an offer he can't refuse", pt: "uma oferta irrecusável", ex: "Free food and games? That's an offer he can't refuse.", ex_pt: "Comida e jogos de graça? Uma oferta que ele não recusa.", note: "O Poderoso Chefão (1972) — entrou de vez no inglês do dia a dia." },
        { id: "m18", term: "keep the change", pt: "fique com o troco", ex: "Here's twenty — keep the change.", ex_pt: "Aqui está vinte — fique com o troco.", note: "Cena de Home Alone (1990). Use em táxis e lanchonetes para dar gorjeta." },
        { id: "m19", term: "go the distance", pt: "ir até o fim, aguentar firme", ex: "Training for a marathon teaches you to go the distance.", ex_pt: "Treinar para uma maratona te ensina a ir até o fim.", note: "Tema de Rocky (1976): lutar até o último round." },
        { id: "m20", term: "Hakuna Matata", pt: "sem problemas, relaxa", ex: "Missed the bus? Hakuna Matata, there's another one in five.", ex_pt: "Perdeu o ônibus? Relaxa, tem outro em cinco minutos.", note: "O Rei Leão (1994), do suáli. Americanos usam para dizer \u201crelaxa\u201d." }
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
