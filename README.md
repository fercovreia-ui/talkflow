# TalkFlow — Inglês americano de verdade 🇺🇸

App web para treinar a **fluência falada** em inglês americano, com foco em **gírias**,
**phrasal verbs** e **reduções de fala reais** (gonna, wanna, whatcha...).

## Como funciona

- 💬 **Conversar**: cenários guiados onde você responde **falando** (reconhecimento de voz)
  e recebe correção palavra por palavra
- 📚 **Vocabulário**: flashcards com repetição espaçada + quiz (32 gírias + 24 phrasal verbs)
- 🎤 **Pronúncia**: shadowing com pontuação de similaridade
- 📊 **Progresso**: XP, ofensiva diária 🔥 e gráfico dos últimos 7 dias

Metodologia inspirada em tutores de IA: lições estruturadas, fala primeiro,
correção imediata, tradução em tempo real.

## Tecnologia

HTML + CSS + JavaScript puro, sem dependências. Todo o progresso fica salvo
no próprio aparelho (localStorage). Requer **HTTPS** (ou localhost) para o
reconhecimento de voz funcionar.

## Rodar localmente

```bash
python -m http.server 8123
# abra http://localhost:8123
```

Navegadores suportados: Chrome e Edge (fala e escuta), Safari (iPhone).
