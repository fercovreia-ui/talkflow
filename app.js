/* ============================================================
   TalkFlow — Lógica do app
   Metodologia: lições estruturadas, fala primeiro, correção imediata
   ============================================================ */
"use strict";

/* ---------------- Estado ---------------- */
const KEY = "talkflow_v1";
function loadState() {
  const def = { xp: 0, streak: 0, lastDay: null, daily: {}, srs: {}, scDone: {}, shBest: {}, words: {}, voice: null, rate: 0.95 };
  try { return Object.assign(def, JSON.parse(localStorage.getItem(KEY) || "{}")); }
  catch (e) { return def; }
}
let S = loadState();
function save() { localStorage.setItem(KEY, JSON.stringify(S)); }
function today() { return new Date().toISOString().slice(0, 10); }

function addXP(n) {
  const t = today();
  if (S.lastDay !== t) {
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    S.streak = (S.lastDay === y) ? (S.streak || 0) + 1 : 1;
    S.lastDay = t;
  }
  S.xp += n;
  S.daily[t] = (S.daily[t] || 0) + n;
  save();
  renderHeader();
}

/* ---------------- Voz: TTS ---------------- */
let VOICES = [];
function refreshVoices() { VOICES = window.speechSynthesis ? speechSynthesis.getVoices() : []; }
if (window.speechSynthesis) { refreshVoices(); speechSynthesis.onvoiceschanged = refreshVoices; }

// Pontuação: quanto maior, mais "americana" e natural é a voz
function voiceScore(v) {
  const n = (v.name || "").toLowerCase();
  let s = 0;
  if (/en[-_]us/i.test(v.lang)) s += 40;
  else if (/^en/i.test(v.lang)) s += 15;
  else return -1000; // nunca usar voz não-inglesa para falar inglês
  if (/natural|online/i.test(n)) s += 35;                    // vozes neurais do Edge
  if (/aria|jenny|guy|ana( |$)|emily|libby/i.test(n)) s += 25; // melhores en-US
  if (/google us english/i.test(n)) s += 25;
  if (/samantha|ava|allison|susan|nathan|zoe/i.test(n)) s += 20; // Apple
  if (/zira|david|mark|eric|michelle/i.test(n)) s += 12;      // Windows SAPI en-US
  if (/compact|espeak/i.test(n)) s -= 10;
  if (/japan|hong ?kong|china|india|kenya|nigeria|philippines|singapore/i.test(n)) s -= 30;
  return s;
}
function pickVoice() {
  refreshVoices();
  if (S.voice) {
    const sel = VOICES.find(v => v.name === S.voice);
    if (sel) return sel;
  }
  const en = VOICES.filter(v => /^en/i.test(v.lang));
  if (!en.length) return null;
  return en.slice().sort((a, b) => voiceScore(b) - voiceScore(a))[0];
}
function speakWith(voice, text, rate) {
  return new Promise(res => {
    if (!window.speechSynthesis) return res();
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (voice) { u.voice = voice; u.lang = voice.lang; }
      else { u.lang = "en-US"; }
      u.rate = rate || S.rate || 0.95;
      u.pitch = 1;
      u.onend = res; u.onerror = res;
      speechSynthesis.speak(u);
      setTimeout(res, 10000); // segurança
    } catch (e) { res(); }
  });
}
function speak(text, rate) {
  const v = pickVoice();
  if (v && voiceScore(v) >= 30) return speakWith(v, text, rate);
  return onlineSpeak(text, rate); // sem voz americana boa → tenta voz online; se falhar, usa a local
}

/* Voz americana online (reserva quando não há voz en-US instalada) */
let AUDIO = null;
function onlineSpeak(text, rate) {
  return new Promise(res => {
    const localFallback = () => speakWith(pickVoice(), text, rate).then(res);
    try {
      if (AUDIO) { AUDIO.pause(); AUDIO = null; }
      const voice = S.onlineVoice || "Joanna";
      const url = "https://api.streamelements.com/kappa/v2/speech?voice=" + voice + "&text=" + encodeURIComponent(text.slice(0, 500));
      AUDIO = new Audio(url);
      window.__lastAudio = AUDIO;
      const r = rate || S.rate || 0.95;
      AUDIO.playbackRate = Math.min(1.2, Math.max(0.55, r * 1.05));
      AUDIO.onended = res;
      AUDIO.onerror = localFallback;
      const p = AUDIO.play();
      if (p && p.catch) p.catch(localFallback);
      setTimeout(res, 15000);
    } catch (e) { localFallback(); }
  });
}

/* ---------------- Voz: STT (reconhecimento) ---------------- */
const HAS_SR = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
function micErrMsg(code) {
  if (code === "not-allowed") return "\ud83d\udd12 Microfone bloqueado! Toque em \u201cPermitir\u201d quando o navegador pedir, ou no cadeado \ud83d\udd10 ao lado do endere\u00e7o do site.";
  if (code === "service-not-allowed") return "\ud83d\udd12 Servi\u00e7o de voz bloqueado aqui. Abra o app no Chrome ou Edge de verdade e permita o microfone.";
  if (code === "audio-capture") return "\ud83c\udf99\ufe0f Nenhum microfone encontrado. Confira em Configura\u00e7\u00f5es \u2192 Privacidade \u2192 Microfone.";
  if (code === "language-not-supported") return "\ud83c\udfa7 Reconhecimento de ingl\u00eas n\u00e3o suportado aqui. Use Chrome ou Edge.";
  if (code === "network") return "\ud83c\udf10 O reconhecimento de fala precisa de internet.";
  return "\ud83d\udeb7 N\u00e3o ouvi nada. Checklist: 1) Fale perto e em voz clara 2) Toque no \u2699\ufe0f e use \u201cTestar microfone\u201d 3) Se a barra n\u00e3o mexer: Configura\u00e7\u00f5es \u2192 Privacidade \u2192 Microfone \u2192 ative tudo.";
}
function listen(onResult) {
  const SRc = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SRc) { onResult([], "unsupported"); return; }
  let r;
  try { r = new SRc(); } catch (e) { onResult([], "unsupported"); return; }
  r.lang = "en-US"; r.interimResults = false; r.maxAlternatives = 3;
  let got = false;
  r.onresult = e => { got = true; onResult(Array.from(e.results[0]).map(a => a.transcript)); };
  r.onerror = ev => { if (!got) onResult([], ev.error); };
  r.onend = () => { if (!got) onResult([], "empty"); };
  try { r.start(); } catch (e) { onResult([], "startfail"); }
}

/* ---------------- Autodiagnóstico do microfone ---------------- */
function runMicDiagnosis(el) {
  el.innerHTML = `
    <div class="fb wait">
      <b>\ud83d\udd0c Testando seu microfone — <u>fale qualquer coisa agora!</u></b>
      <div class="mic-meter-track" style="margin-top:10px"><div class="mic-meter" style="width:0%"></div></div>
    </div>`;
  const bar = el.querySelector(".mic-meter");
  const done = html => { if (el.isConnected) el.innerHTML = html; };
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const src = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    src.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    let peak = 0;
    const t0 = Date.now();
    const tick = () => {
      if (!el.isConnected) { stream.getTracks().forEach(t => t.stop()); ctx.close(); return; }
      analyser.getByteTimeDomainData(data);
      let max = 0;
      for (const v of data) max = Math.max(max, Math.abs(v - 128));
      peak = Math.max(peak, max);
      bar.style.width = Math.min(100, Math.round(peak / 128 * 160)) + "%";
      if (Date.now() - t0 < 4500) requestAnimationFrame(tick);
      else {
        stream.getTracks().forEach(t => t.stop()); ctx.close();
        const pct = Math.round(peak / 128 * 100);
        if (pct > 6) {
          done(`<div class="fb ok"><b>\ud83c\udf99\ufe0f Seu microfone FUNCIONA (n\u00edvel ${pct}%) — o problema \u00e9 que este navegador bloqueou o servi\u00e7o de voz.</b>
            <p class="small" style="margin-top:6px">Solu\u00e7\u00e3o: abra o app pelo atalho <b>TalkFlow</b> da \u00e1rea de trabalho (no Chrome). L\u00e1 o microfone reconhece a sua fala normalmente. \u2713</p></div>`);
        } else {
          done(`<div class="fb no"><b>\ud83d\udd07 Nenhum som chegou ao microfone (n\u00edvel ${pct}%).</b>
            <p class="small" style="margin-top:6px">No Windows:<br>1\ufe0f\u20e3 Configura\u00e7\u00f5es \u2192 <b>Privacidade e seguran\u00e7a \u2192 Microfone</b> \u2192 ative todas as op\u00e7\u00f5es<br>2\ufe0f\u20e3 Configura\u00e7\u00f5es \u2192 <b>Sistema \u2192 Som \u2192 Entrada</b> \u2192 escolha \u201cGrupo de microfones\u201d e fale para a barra de teste ali mexer</p></div>`);
        }
      }
    };
    requestAnimationFrame(tick);
  }).catch(e => {
    done(`<div class="fb no"><b>\ud83d\udd12 N\u00e3o consegui acessar o microfone (${esc(e.name || "erro")}).</b>
      <p class="small" style="margin-top:6px">Clique no cadeado/\u2139\ufe0f ao lado do endere\u00e7o do site \u2192 Microfone \u2192 <b>Permitir</b> \u2192 recarregue a p\u00e1gina (F5).</p></div>`);
  });
}

/* ---------------- Avaliação ---------------- */
function norm(s) {
  return String(s).toLowerCase()
    .replace(/[\u2019\u2018`]/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/\s+/g, " ").trim();
}
function lev(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}
function sim(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  return Math.max(0, 1 - lev(a, b) / Math.max(a.length, b.length));
}
function evalStep(heardAlts, step) {
  let best = { ok: false, score: 0, heard: "" };
  for (const raw of heardAlts) {
    const h = norm(raw);
    if (!h) continue;
    let score = 0;
    if (step.accept) {
      for (const a of step.accept) score = Math.max(score, sim(h, norm(a)));
    } else if (step.pattern) {
      score = new RegExp(step.pattern).test(h) ? 0.9 : 0.4;
    }
    if (score > best.score) best = { ok: score >= 0.8, score, heard: raw };
  }
  if (!best.ok && step.pattern && best.heard && new RegExp(step.pattern).test(norm(best.heard))) best.ok = true;
  return best;
}
function wordDiff(heard, expected) {
  const hT = norm(heard).split(" ").filter(Boolean), eT = norm(expected).split(" ").filter(Boolean);
  const used = new Array(hT.length).fill(false);
  return eT.map(e => {
    let i = hT.findIndex((h, k) => !used[k] && (h === e || (e.length > 4 && lev(h, e) <= 2)));
    if (i >= 0) { used[i] = true; return { w: e, ok: true }; }
    return { w: e, ok: false };
  });
}

/* ---------------- Utilidades ---------------- */
const $ = s => document.querySelector(s);
function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function shuffle(a) { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
function toast(msg) {
  const t = el(`<div class="toast">${msg}</div>`);
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 400); }, 2200);
}

/* ---------------- Cabeçalho / abas ---------------- */
function renderHeader() {
  $("#streak").textContent = "\ud83d\udd25 " + (S.streak || 0);
  $("#xp").textContent = "\u26a1 " + (S.xp || 0);
}
function renderTabbar() {
  document.querySelectorAll("#tabbar button").forEach(b => {
    b.classList.toggle("active", b.dataset.view === VIEW);
  });
}
let VIEW = "home";
function go(view) { VIEW = view; render(); window.scrollTo(0, 0); }

function render() { renderHeader(); renderTabbar(); ({ home: vHome, speak: vSpeak, vocab: vVocab, pron: vPron, progress: vProgress })[VIEW](); }

/* ---------------- Visão: Início ---------------- */
function vHome() {
  const sod = DATA.slangOfDay();
  const next = DATA.scenarios.find(s => !S.scDone[s.id]) || DATA.scenarios[0];
  const hour = new Date().getHours();
  const hi = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  const done = DATA.scenarios.filter(s => S.scDone[s.id]).length;
  const best = pickVoice();
  const voiceWarn = !(best && voiceScore(best) >= 30);
  $("#view").innerHTML = `
    ${voiceWarn ? `<div class="card warn-card" id="voiceWarn">
      <b>\ud83c\udfa7 Sotaque estranho na voz?</b>
      <p class="small" style="margin-top:4px">Este navegador n\u00e3o tem voz americana instalada. Duas solu\u00e7\u00f5es r\u00e1pidas:</p>
      <p class="small" style="margin-top:4px">1\ufe0f\u20e3 Abra este app no <b>Microsoft Edge</b> \u2014 a voz "Aria" soa americana de verdade.<br>2\ufe0f\u20e3 Ou toque em \u2699\ufe0f aqui em cima para escolher/testar vozes.</p>
    </div>` : ""}
    <section class="hero card">
      <div>
        <p class="muted">${hi}! Pronto para destravar a fala?</p>
        <h2>Sua meta: 1 cenário por dia</h2>
        <div class="row stats-mini">
          <span>\ud83d\udcaf ${done}/${DATA.scenarios.length} cenários</span>
          <span>\ud83d\udd25 ${S.streak || 0} dias</span>
        </div>
      </div>
      <button class="btn primary big" id="btnContinue">Continuar \u2192</button>
    </section>
    <section class="card slang-day">
      <p class="muted small">\ud83d\ude0e GIRIA DO DIA</p>
      <div class="row" style="justify-content:space-between;align-items:flex-start">
        <h2>${esc(sod.term)}</h2>
        <button class="icon-btn" id="btnSodAudio">\ud83d\udd0a</button>
      </div>
      <p><b>${esc(sod.pt)}</b></p>
      <p class="ex">"${esc(sod.ex)}"</p>
      <p class="muted small">${esc(sod.ex_pt)}</p>
    </section>
    <section class="grid2">
      <div class="card track" data-goto="speak">
        <div class="track-icon">\ud83d\udcac</div>
        <h3>Conversar</h3>
        <p class="muted small">${DATA.scenarios.length} cenários de fala real</p>
      </div>
      <div class="card track" data-goto="vocab">
        <div class="track-icon">\ud83d\udcd8</div>
        <h3>Vocabulário</h3>
        <p class="muted small">Gírias + phrasal verbs</p>
      </div>
      <div class="card track" data-goto="pron">
        <div class="track-icon">\ud83c\udf99\ufe0f</div>
        <h3>Pronúncia</h3>
        <p class="muted small">Shadowing de fala real</p>
      </div>
      <div class="card track" data-goto="progress">
        <div class="track-icon">\ud83d\udcc8</div>
        <h3>Progresso</h3>
        <p class="muted small">Ofensiva e XP</p>
      </div>
    </section>`;
  $("#btnContinue").onclick = () => openChat(next);
  $("#btnSodAudio").onclick = () => speak(sod.term);
  document.querySelectorAll("[data-goto]").forEach(c => c.onclick = () => go(c.dataset.goto));
}

/* ---------------- Visão: Conversar ---------------- */
function vSpeak() {
  $("#view").innerHTML = `
    <h1>Conversar</h1>
    <p class="muted">Fale em voz alta com o tutor. Fala primeiro, gramática depois.</p>
    <div id="scList" class="stack"></div>`;
  const list = $("#scList");
  for (const sc of DATA.scenarios) {
    const done = S.scDone[sc.id];
    list.appendChild(el(`
      <div class="card sc-card">
        <div class="row" style="align-items:center;gap:14px">
          <div class="sc-icon">${sc.icon}</div>
          <div style="flex:1">
            <div class="row" style="gap:8px;align-items:center">
              <h3 style="margin:0">${esc(sc.title)}</h3>
              <span class="badge">${esc(sc.level)}</span>
              ${done ? '<span class="badge ok">\u2713 feito</span>' : ""}
            </div>
            <p class="muted small" style="margin:4px 0 0">${esc(sc.desc)}</p>
          </div>
          <button class="btn primary">Falar</button>
        </div>
      </div>`));
    list.lastElementChild.querySelector(".btn").onclick = () => openChat(sc);
  }
}

/* ---------------- Overlay: Chat (metodologia Learna) ---------------- */
function openChat(sc) {
  let idx = 0, tries = 0, firstTry = 0, xpEarned = 0, hintShown = false, locked = false;

  const ov = el(`
    <div class="overlay">
      <div class="chat-wrap">
        <div class="chat-top">
          <button class="icon-btn" id="cBack">\u2190</button>
          <div style="flex:1">
            <b>${sc.icon} ${esc(sc.title)}</b>
            <div class="dots" id="cDots"></div>
          </div>
        </div>
        <div class="msgs" id="cMsgs"></div>
        <div id="cFeedback"></div>
        <div class="prompt" id="cPrompt">
          <p class="task" id="cTask"></p>
          <div class="row" id="cHintRow">
            <button class="btn ghost small" id="cHint">\ud83d\udca1 Dica</button>
            <div id="cHintBox" class="hint-box" style="display:none">
              <span id="cHintText"></span>
              <button class="icon-btn" id="cHintAudio">\ud83d\udd0a</button>
            </div>
          </div>
          <div class="row" style="gap:12px;align-items:center">
            ${HAS_SR ? '<button class="mic" id="cMic">\ud83c\udf99\ufe0f</button>' : '<div class="mic-off">\ud83c\udf99\ufe0f n\u00e3o suportado<br>use Chrome/Edge</div>'}
            <div class="txt-input">
              <input id="cInput" placeholder="${HAS_SR ? "…ou digite aqui" : "Digite sua resposta em inglês"}" autocomplete="off">
              <button class="icon-btn" id="cSend">\u27a4</button>
            </div>
          </div>
        </div>
      </div>
    </div>`);
  document.body.appendChild(ov);
  const msgs = ov.querySelector("#cMsgs");
  const dots = ov.querySelector("#cDots");
  const feedback = ov.querySelector("#cFeedback");
  const input = ov.querySelector("#cInput");

  function drawDots() {
    dots.innerHTML = sc.steps.map((_, i) => `<span class="dot ${i < idx ? "done" : i === idx ? "cur" : ""}"></span>`).join("");
  }

  function tutorSay() {
    const st = sc.steps[idx];
    const b = el(`
      <div class="msg tutor">
        <div class="bubble">
          <p>${esc(st.tutor)}</p>
          <p class="pt hidden">${esc(st.tutor_pt)}</p>
          <div class="row" style="gap:6px">
            <button class="chip audio">\ud83d\udd0a ouvir</button>
            <button class="chip slow">\ud83d\udc22 devagar</button>
            <button class="chip pt-btn">traduzir</button>
          </div>
        </div>
      </div>`);
    b.querySelector(".audio").onclick = () => speak(st.tutor);
    b.querySelector(".slow").onclick = () => speak(st.tutor, 0.65);
    b.querySelector(".pt-btn").onclick = () => b.querySelector(".pt").classList.toggle("hidden");
    msgs.appendChild(b);
    msgs.scrollTop = msgs.scrollHeight;
    speak(st.tutor);
  }

  function showTask() {
    const st = sc.steps[idx];
    hintShown = false;
    ov.querySelector("#cHintBox").style.display = "none";
    ov.querySelector("#cTask").innerHTML = `\ud83d\udde3\ufe0f ${esc(st.task)}`;
    feedback.innerHTML = "";
    locked = false;
    drawDots();
  }

  function userSay(text) {
    msgs.appendChild(el(`<div class="msg user"><div class="bubble"><p>${esc(text)}</p></div></div>`));
    msgs.scrollTop = msgs.scrollHeight;
  }

  function okFeedback(st, first) {
    const gain = first ? 12 : 6;
    xpEarned += gain;
    if (first) firstTry++;
    addXP(gain);
    locked = true;
    feedback.innerHTML = `
      <div class="fb ok">
        <b>\u2705 ${first ? "Perfeito!" : "Mandou bem!"} +${gain} XP</b>
        <p class="tip">${esc(st.tip || "")}</p>
        <button class="btn primary" id="fbNext">Continuar \u2192</button>
      </div>`;
    feedback.querySelector("#fbNext").onclick = next;
    speak(st.hint);
  }

  function failFeedback(heard) {
    const st = sc.steps[idx];
    const d = wordDiff(heard || "", st.hint).map(w => `<span class="${w.ok ? "w-ok" : "w-no"}">${esc(w.w)}</span>`).join(" ");
    feedback.innerHTML = `
      <div class="fb no">
        <b>\ud83d\udeb7 Quase! ${heard ? "Você disse: <i>" + esc(heard) + "</i>" : "Não consegui te ouvir — tenta de novo."}</b>
        ${heard ? `<p class="diff">${d}</p><p class="muted small"><span class="w-ok">\u25a0</span> acertou &nbsp;<span class="w-no">\u25a0</span> faltou</p>` : ""}
        <div class="row">
          <button class="btn primary" id="fbRetry">\ud83c\udf99\ufe0f Tentar de novo</button>
          <button class="btn ghost" id="fbReveal">\ud83d\udca1 Ver resposta</button>
        </div>
      </div>`;
    feedback.querySelector("#fbRetry").onclick = () => { feedback.innerHTML = ""; armMic(); input.focus(); };
    feedback.querySelector("#fbReveal").onclick = () => {
      revealHint();
      speak(st.hint);
    };
  }

  function revealHint() {
    const st = sc.steps[idx];
    hintShown = true;
    ov.querySelector("#cHintBox").style.display = "flex";
    ov.querySelector("#cHintText").textContent = st.hint;
  }

  function next() {
    idx++;
    if (idx >= sc.steps.length) return finish();
    tutorSay();
    showTask();
  }

  function finish() {
    locked = true;
    const bonus = 40;
    addXP(bonus); xpEarned += bonus;
    S.scDone[sc.id] = true; save();
    ov.querySelector("#cPrompt").innerHTML = "";
    feedback.innerHTML = `
      <div class="fb ok final">
        <div style="font-size:44px">\ud83c\udf89</div>
        <b>Cenário concluído! +${xpEarned} XP</b>
        <p>Acertos de primeira: <b>${firstTry}/${sc.steps.length}</b></p>
        <div class="row">
          <button class="btn ghost" id="fAgain">\ud83d\udd01 Repetir</button>
          <button class="btn primary" id="fDone">Continuar</button>
        </div>
      </div>`;
    feedback.querySelector("#fAgain").onclick = () => { ov.remove(); openChat(sc); };
    feedback.querySelector("#fDone").onclick = () => { ov.remove(); go("speak"); };
    speak("Great job! See you next time!");
  }

  function submit(text) {
    if (locked) return;
    const st = sc.steps[idx];
    const clean = String(text || "").trim();
    if (!clean) return;
    const r = evalStep([clean], st);
    userSay(clean);
    if (r.ok) okFeedback(st, tries === 0);
    else { tries++; failFeedback(clean); }
  }

  function armMic() {
    const mic = ov.querySelector("#cMic");
    if (!mic) return;
    mic.onclick = () => {
      if (locked) return;
      mic.classList.add("listening");
      feedback.innerHTML = `<div class="fb wait"><b>\ud83c\udf99\ufe0f Ouvindo… fale agora!</b></div>`;
      listen((alts, errCode) => {
        mic.classList.remove("listening");
        if (!alts.length) {
          if (errCode === "empty" || errCode === "no-speech") runMicDiagnosis(feedback);
          else feedback.innerHTML = `<div class="fb no"><b>${micErrMsg(errCode)}</b></div>`;
          return;
        }
        const st = sc.steps[idx];
        let best = { ok: false, score: -1, heard: "" };
        for (const a of alts) { const r = evalStep([a], st); if (r.score > best.score) best = { ...r, heard: a }; }
        userSay(best.heard || alts[0]);
        if (best.ok) okFeedback(st, tries === 0);
        else { tries++; failFeedback(best.heard || alts[0]); }
      });
    };
  }

  ov.querySelector("#cBack").onclick = () => { if (window.speechSynthesis) speechSynthesis.cancel(); ov.remove(); };
  ov.querySelector("#cHint").onclick = () => { revealHint(); speak(sc.steps[idx].hint); };
  ov.querySelector("#cHintAudio").onclick = () => speak(sc.steps[idx].hint);
  ov.querySelector("#cSend").onclick = () => { submit(input.value); input.value = ""; };
  input.onkeydown = e => { if (e.key === "Enter") { submit(input.value); input.value = ""; } };
  armMic();

  tutorSay();
  showTask();
}

/* ---------------- Visão: Vocabulário ---------------- */
function dueCards(deck) {
  const t = today();
  return deck.cards.filter(c => {
    const r = S.srs[c.id];
    return r && r.box > 0 && r.box < 5 && r.due <= t;
  });
}
function vVocab() {
  $("#view").innerHTML = `
    <h1>Vocabulário</h1>
    <p class="muted">Repetição espaçada: o que você erra volta mais vezes.</p>
    <div id="deckList" class="stack"></div>`;
  const list = $("#deckList");
  for (const deck of DATA.decks) {
    const known = deck.cards.filter(c => (S.srs[c.id] || {}).box >= 3).length;
    const due = dueCards(deck).length;
    const pct = Math.round(known / deck.cards.length * 100);
    list.appendChild(el(`
      <div class="card deck-card">
        <div class="row" style="gap:14px;align-items:center">
          <div class="sc-icon" style="background:${deck.color}1a">${deck.icon}</div>
          <div style="flex:1">
            <h3 style="margin:0">${esc(deck.title)}</h3>
            <p class="muted small" style="margin:4px 0 0">${esc(deck.desc)}</p>
            <div class="bar"><div class="bar-fill" style="width:${pct}%;background:${deck.color}"></div></div>
            <p class="muted small" style="margin:4px 0 0">${known}/${deck.cards.length} dominadas ${due ? `• <b style="color:#e67e22">${due} para revisar</b>` : ""}</p>
          </div>
        </div>
        <div class="row" style="margin-top:12px">
          <button class="btn primary" data-act="study">Estudar</button>
          ${due ? '<button class="btn warn" data-act="review">Revisar</button>' : ""}
          <button class="btn ghost" data-act="quiz">Quiz</button>
        </div>
      </div>`));
    const card = list.lastElementChild;
    card.querySelector('[data-act="study"]').onclick = () => openStudy(deck, "study");
    const rb = card.querySelector('[data-act="review"]'); if (rb) rb.onclick = () => openStudy(deck, "review");
    card.querySelector('[data-act="quiz"]').onclick = () => openQuiz(deck);
  }
}

/* ---------------- Overlay: Estudar cartões (SRS) ---------------- */
function openStudy(deck, mode) {
  const t = today();
  let queue;
  if (mode === "review") {
    queue = dueCards(deck);
  } else {
    const fresh = deck.cards.filter(c => !S.srs[c.id]);
    const due = deck.cards.filter(c => S.srs[c.id] && S.srs[c.id].box > 0 && S.srs[c.id].box < 5 && S.srs[c.id].due <= t);
    queue = fresh.length ? shuffle(fresh).slice(0, 10) : shuffle(due).slice(0, 10);
    if (!queue.length) queue = shuffle(deck.cards).slice(0, 10);
  }
  let i = 0, gained = 0;

  const ov = el(`
    <div class="overlay">
      <div class="study-wrap">
        <div class="chat-top">
          <button class="icon-btn" id="stBack">\u2190</button>
          <div style="flex:1">
            <b>${deck.icon} ${mode === "review" ? "Revisar" : "Estudar"} — ${esc(deck.title)}</b>
            <div class="bar"><div class="bar-fill" id="stBar" style="background:${deck.color};width:0%"></div></div>
          </div>
          <span class="muted small" id="stCount"></span>
        </div>
        <div class="flashcard" id="stCard"></div>
        <div id="stNav" class="row center" style="margin-top:16px"></div>
      </div>
    </div>`);
  document.body.appendChild(ov);
  const cardEl = ov.querySelector("#stCard"), nav = ov.querySelector("#stNav");

  function rate(id, knew) {
    const r = S.srs[id] || { box: 0, due: t };
    if (knew) r.box = Math.min(5, r.box + 1); else r.box = 0;
    r.due = new Date(Date.now() + [0, 1, 2, 4, 8, 16][r.box] * 864e5).toISOString().slice(0, 10);
    if (r.box >= 3 && !S.words[id]) S.words[id] = true;
    S.srs[id] = r; save();
  }

  function show() {
    if (i >= queue.length) return finish();
    const c = queue[i];
    ov.querySelector("#stBar").style.width = (i / queue.length * 100) + "%";
    ov.querySelector("#stCount").textContent = `${i + 1}/${queue.length}`;
    cardEl.innerHTML = `
      <p class="muted small">TOQUE NO CARTÃO PARA VIRAR</p>
      <h2 id="fTerm">${esc(c.term)}</h2>
      <div class="back" id="fBack" style="display:none">
        <p><b>${esc(c.pt)}</b></p>
        <p class="ex">"${esc(c.ex)}"</p>
        <p class="muted small">${esc(c.ex_pt)}</p>
        ${c.note ? `<p class="muted small">\ud83d\udca1 ${esc(c.note)}</p>` : ""}
      </div>
      <div class="row center" style="gap:8px;margin-top:8px">
        <button class="icon-btn" id="fAudio">\ud83d\udd0a</button>
        <button class="icon-btn" id="fSlow">\ud83d\udc22</button>
      </div>`;
    let flipped = false;
    const back = cardEl.querySelector("#fBack");
    cardEl.querySelector("#fAudio").onclick = e => { e.stopPropagation(); speak(c.term); };
    cardEl.querySelector("#fSlow").onclick = e => { e.stopPropagation(); speak(c.ex, 0.65); };
    cardEl.onclick = () => {
      flipped = !flipped;
      back.style.display = flipped ? "block" : "none";
      if (flipped) { speak(c.ex); nav.innerHTML = ""; drawNav(c); }
      else { nav.innerHTML = ""; }
    };
    function drawNav(c2) {
      nav.innerHTML = `
        <button class="btn no" id="nNo">\ud83d\ude2c Não sabia</button>
        <button class="btn primary" id="nYes">\u2705 Sabia</button>`;
      nav.querySelector("#nNo").onclick = () => { rate(c2.id, false); gained += 3; addXP(3); i++; show(); };
      nav.querySelector("#nYes").onclick = () => { rate(c2.id, true); gained += 3; addXP(3); i++; show(); };
    }
  }

  function finish() {
    cardEl.innerHTML = `
      <div style="font-size:44px">\ud83e\udd73</div>
      <h2>Cartões revistos!</h2>
      <p class="muted">+${gained} XP nesta rodada. Os cartões errados voltam amanhã.</p>`;
    nav.innerHTML = `<button class="btn primary" id="fOk">Continuar</button>`;
    ov.querySelector("#fOk").onclick = () => { ov.remove(); go("vocab"); };
    ov.querySelector("#stBar").style.width = "100%";
  }

  ov.querySelector("#stBack").onclick = () => ov.remove();
  show();
}

/* ---------------- Overlay: Quiz ---------------- */
function openQuiz(deck) {
  const pool = shuffle(deck.cards).slice(0, 8);
  const qs = pool.map((c, k) => {
    const wrong = shuffle(deck.cards.filter(x => x.id !== c.id)).slice(0, 3);
    const en2pt = k % 2 === 0;
    const opts = shuffle([c, ...wrong]);
    return {
      ask: en2pt ? `O que significa "${c.term}"?` : `Como se diz "${c.pt}"?`,
      right: en2pt ? c.pt : c.term,
      opts: opts.map(o => en2pt ? o.pt : o.term),
      card: c
    };
  });
  let i = 0, hits = 0, gained = 0;

  const ov = el(`
    <div class="overlay">
      <div class="study-wrap">
        <div class="chat-top">
          <button class="icon-btn" id="qBack">\u2190</button>
          <div style="flex:1"><b>\u26a1 Quiz — ${esc(deck.title)}</b>
            <div class="bar"><div class="bar-fill" id="qBar" style="background:${deck.color};width:0%"></div></div>
          </div>
        </div>
        <div class="card" id="qCard" style="min-height:280px"></div>
      </div>
    </div>`);
  document.body.appendChild(ov);
  const qCard = ov.querySelector("#qCard");

  function show() {
    if (i >= qs.length) return finish();
    const q = qs[i];
    ov.querySelector("#qBar").style.width = (i / qs.length * 100) + "%";
    qCard.innerHTML = `
      <p class="muted small">PERGUNTA ${i + 1}/${qs.length}</p>
      <h2 style="margin-bottom:18px">${esc(q.ask)}</h2>
      <div class="opts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>`;
    qCard.querySelectorAll(".opt").forEach(b => {
      b.onclick = () => {
        const isRight = b.textContent === q.right;
        qCard.querySelectorAll(".opt").forEach(x => x.disabled = true);
        if (isRight) { b.classList.add("right"); hits++; gained += 4; addXP(4); }
        else { b.classList.add("wrong"); qCard.querySelectorAll(".opt").forEach(x => { if (x.textContent === q.right) x.classList.add("right"); }); }
        speak(isRight ? q.card.ex : q.card.term);
        setTimeout(() => { i++; show(); }, isRight ? 900 : 1600);
      };
    });
  }
  function finish() {
    ov.querySelector("#qBar").style.width = "100%";
    qCard.innerHTML = `
      <div style="font-size:44px">${hits >= 6 ? "\ud83c\udfc6" : "\ud83d\udcaa"}</div>
      <h2>${hits}/${qs.length} certas!</h2>
      <p class="muted">+${gained} XP</p>
      <p class="ex">"${esc(qs[0].card.ex)}"</p>`;
    qCard.appendChild(el(`<div class="row" style="margin-top:16px"><button class="btn primary" id="qOk">Continuar</button></div>`));
    qCard.querySelector("#qOk").onclick = () => { ov.remove(); go("vocab"); };
  }
  ov.querySelector("#qBack").onclick = () => ov.remove();
  show();
}

/* ---------------- Visão: Pronúncia (shadowing) ---------------- */
function vPron() {
  $("#view").innerHTML = `
    <h1>Pronúncia</h1>
    <p class="muted">Shadowing: ouça, repita, compare. É assim que se pega o "sotaque americano" — nas reduções.</p>
    <div id="shList" class="stack"></div>`;
  const list = $("#shList");
  for (const sh of DATA.shadowing) {
    const best = S.shBest[sh.id] || 0;
    list.appendChild(el(`
      <div class="card sh-card">
        <div class="row" style="justify-content:space-between;align-items:center">
          <h3 style="margin:0">${esc(sh.sentence)}</h3>
          <div class="row" style="gap:6px">
            <button class="icon-btn audio">\ud83d\udd0a</button>
            <button class="icon-btn slow">\ud83d\udc22</button>
          </div>
        </div>
        <p class="muted small" style="margin:6px 0 0">${esc(sh.pt)} — ${esc(sh.tip)}</p>
        <div class="row" style="margin-top:10px;gap:10px;align-items:center">
          <button class="btn primary small" data-act="try">\ud83c\udf99\ufe0f Repetir</button>
          ${best ? `<span class="badge ${best >= 80 ? "ok" : ""}">melhor: ${best}%</span>` : ""}
        </div>
        <div class="sh-result" style="display:none;margin-top:10px"></div>
      </div>`));
    const card = list.lastElementChild;
    card.querySelector(".audio").onclick = () => speak(sh.sentence);
    card.querySelector(".slow").onclick = () => speak(sh.sentence, 0.6);
    card.querySelector('[data-act="try"]').onclick = () => {
      const res = card.querySelector(".sh-result");
      if (!HAS_SR) {
        res.style.display = "block";
        res.innerHTML = `<div class="fb no"><b>Reconhecimento de voz não suportado neste navegador. Use Chrome ou Edge.</b></div>`;
        return;
      }
      res.style.display = "block";
      res.innerHTML = `<div class="fb wait"><b>\ud83c\udf99\ufe0f Ouvindo… repita: "${esc(sh.sentence)}"</b></div>`;
      speak(sh.sentence).then(() => {
        listen((alts, errCode) => {
          if (!alts.length) {
            if (errCode === "empty" || errCode === "no-speech") runMicDiagnosis(res);
            else res.innerHTML = `<div class="fb no"><b>${micErrMsg(errCode)}</b></div>`;
            return;
          }
          let bestR = { score: 0, heard: "" };
          for (const a of alts) { const s = sim(norm(a), norm(sh.sentence)); if (s > bestR.score) bestR = { score: s, heard: a }; }
          const pct = Math.round(bestR.score * 100);
          const prev = S.shBest[sh.id] || 0;
          if (pct > prev) { S.shBest[sh.id] = pct; save(); }
          if (pct >= 80 && pct > prev) addXP(8);
          const d = wordDiff(bestR.heard || "", sh.sentence).map(w => `<span class="${w.ok ? "w-ok" : "w-no"}">${esc(w.w)}</span>`).join(" ");
          res.innerHTML = `
            <div class="fb ${pct >= 80 ? "ok" : "no"}">
              <b>${pct >= 80 ? "\u2705 Muito bom!" : "\ud83d\udeb7 Quase!"} ${pct}% ${pct >= 80 ? "+8 XP" : ""}</b>
              <p>Você disse: <i>${esc(bestR.heard)}</i></p>
              ${pct < 80 ? `<p class="diff">${d}</p>` : ""}
              <button class="btn ghost small" data-act="retry">\ud83d\udd01 De novo</button>
            </div>`;
          res.querySelector('[data-act="retry"]').onclick = () => card.querySelector('[data-act="try"]').click();
        });
      });
    };
  }
}

/* ---------------- Visão: Progresso ---------------- */
function vProgress() {
  const t = today();
  const days = [];
  for (let k = 6; k >= 0; k--) {
    const d = new Date(Date.now() - k * 864e5).toISOString().slice(0, 10);
    days.push({ d, xp: S.daily[d] || 0, label: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"][new Date(d + "T12:00").getDay()] });
  }
  const max = Math.max(30, ...days.map(x => x.xp));
  const done = DATA.scenarios.filter(s => S.scDone[s.id]).length;
  const words = Object.keys(S.words).length;
  const total = DATA.decks.reduce((a, d) => a + d.cards.length, 0);
  $("#view").innerHTML = `
    <h1>Progresso</h1>
    <div class="grid2">
      <div class="card center"><div style="font-size:32px">\u26a1</div><h2>${S.xp}</h2><p class="muted small">XP total</p></div>
      <div class="card center"><div style="font-size:32px">\ud83d\udd25</div><h2>${S.streak || 0}</h2><p class="muted small">dias de ofensiva</p></div>
      <div class="card center"><div style="font-size:32px">\ud83d\udcac</div><h2>${done}/${DATA.scenarios.length}</h2><p class="muted small">cenários falados</p></div>
      <div class="card center"><div style="font-size:32px">\ud83e\udde0</div><h2>${words}/${total}</h2><p class="muted small">palavras dominadas</p></div>
    </div>
    <div class="card">
      <h3>Últimos 7 dias</h3>
      <div class="chart">${days.map(x => `
        <div class="chart-col">
          <div class="chart-bar" style="height:${Math.round(x.xp / max * 100)}%" title="${x.xp} XP"></div>
          <span class="muted small">${x.label}</span>
        </div>`).join("")}</div>
    </div>
    <div class="card">
      <h3>Como usar (metodologia)</h3>
      <p class="small">1\ufe0f\u20e3 <b>Converse</b> com um cenário por dia — fale em voz alta.<br>
      2\ufe0f\u20e3 <b>Revise</b> os cartões que voltaram (5 min).<br>
      3\ufe0f\u20e3 <b>Sombra</b>: repita as frases de pronúncia até passar de 80%.</p>
    </div>
    <button class="btn danger" id="btnReset" style="margin-top:8px">Zerar progresso</button>`;
  $("#btnReset").onclick = () => {
    if (confirm("Tem certeza que quer apagar todo o progresso?")) {
      localStorage.removeItem(KEY);
      S = loadState(); render();
    }
  };
}

/* ---------------- Configurações: voz do tutor ---------------- */
function openSettings() {
  refreshVoices();
  const en = VOICES.filter(v => /^en/i.test(v.lang)).sort((a, b) => voiceScore(b) - voiceScore(a));
  const current = pickVoice();
  const rates = [["0.8", "\ud83d\udc22 Lenta"], ["0.95", "\u25b6\ufe0f Normal"], ["1.1", "\ud83d\udc00 R\u00e1pida"]];

  const rows = en.map(v => `
    <div class="voice-row ${current && v.name === current.name ? "sel" : ""}" data-v="${esc(v.name)}">
      <div class="vr-info">
        <b>${esc(v.name)}</b>
        <span class="muted small">${esc(v.lang)}${/natural|online/i.test(v.name) ? " \u2022 \u2b50 natural" : ""}</span>
      </div>
      <button class="icon-btn vr-test" data-v="${esc(v.name)}">\ud83d\udd0a</button>
    </div>`).join("");

  const ov = el(`
    <div class="overlay">
      <div class="study-wrap">
        <div class="chat-top">
          <button class="icon-btn" id="setBack">\u2190</button>
          <div style="flex:1"><b>\ud83c\uddfa\ud83c\uddf8 Voz do tutor</b></div>
        </div>
        <div class="card" style="overflow-y:auto;max-height:60vh">
          ${en.length ? `<p class="muted small" style="margin-bottom:10px">Escolha a voz em ingl\u00eas americano. Toque em \ud83d\udd0a para testar.</p>${rows}`
          : `<p><b>Nenhuma voz em ingl\u00eas encontrada neste navegador. \ud83d\udea9</b></p>
             <p class="small" style="margin-top:8px">Instale a voz americana do Windows:<br>
             <b>Configura\u00e7\u00f5es \u2192 Hora e Idioma \u2192 Fala \u2192 Adicionar vozes \u2192 Ingl\u00eas (Estados Unidos)</b><br>
             Ou abra o app no <b>Microsoft Edge</b>, que j\u00e1 traz vozes naturais americanas (Aria e Jenny).</p>`}
        </div>
        <div class="card" style="margin-top:12px">
          <p class="muted small">TESTAR MICROFONE</p>
          <button class="btn primary small" id="btnMicTest" style="margin-top:8px">\ud83c\udf99\ufe0f Testar agora</button>
          <div id="micTestArea" style="margin-top:10px"></div>
        </div>
        <div class="card" style="margin-top:12px">
          <p class="muted small">VELOCIDADE PADR\u00c3O</p>
          <div class="row" style="gap:8px;margin-top:8px">
            ${rates.map(([val, label]) => `<button class="btn small rate-btn ${String(S.rate) === val ? "primary" : "ghost"}" data-r="${val}">${label}</button>`).join("")}
          </div>
        </div>
        <div class="card" style="margin-top:12px">
          <p class="muted small">VOZ AMERICANA ONLINE (usada quando n\u00e3o h\u00e1 voz en-US boa instalada)</p>
          <div class="row" style="gap:8px;margin-top:8px">
            <button class="btn small ${((S.onlineVoice || "Joanna") === "Joanna") ? "primary" : "ghost"}" data-ov="Joanna">\ud83d\udc69 Joanna</button>
            <button class="btn small ${S.onlineVoice === "Matthew" ? "primary" : "ghost"}" data-ov="Matthew">\ud83d\udc68 Matthew</button>
          </div>
        </div>
        <div class="card" style="margin-top:12px">
          <p class="small">\ud83d\udca1 <b>Somando com sotaque estranho?</b> Seu sistema n\u00e3o tem voz americana instalada, e o app passa a usar uma <b>voz americana online autom\u00e1tica</b> quando isso acontece (precisa de internet).</p>
          <p class="small" style="margin-top:6px">Para uma voz ainda melhor offline: no <b>Microsoft Edge</b> as vozes \u201cAria\u201d e \u201cJenny (Natural)\u201d soam nativas de verdade. No Windows: Configura\u00e7\u00f5es \u2192 Hora e Idioma \u2192 Fala \u2192 Adicionar vozes \u2192 Ingl\u00eas (Estados Unidos).</p>
        </div>
      </div>
    </div>`);
  document.body.appendChild(ov);

  ov.querySelector("#setBack").onclick = () => ov.remove();
  ov.querySelectorAll(".voice-row").forEach(r => {
    r.onclick = () => {
      S.voice = r.dataset.v; save();
      ov.querySelectorAll(".voice-row").forEach(x => x.classList.toggle("sel", x === r));
      toast("\u2705 Voz salva!");
      speak("Hey! What's up? I'm gonna grab a coffee. Let's go!");
    };
  });
  ov.querySelectorAll(".vr-test").forEach(b => {
    b.onclick = e => {
      e.stopPropagation();
      const v = VOICES.find(x => x.name === b.dataset.v);
      speakWith(v, "Hey! What's up? I'm gonna grab a coffee.");
    };
  });
  ov.querySelectorAll(".rate-btn").forEach(b => {
    b.onclick = () => {
      S.rate = parseFloat(b.dataset.r); save();
      ov.querySelectorAll(".rate-btn").forEach(x => {
        const on = x === b;
        x.classList.toggle("primary", on); x.classList.toggle("ghost", !on);
      });
      speak("This is my normal speed.");
    };
  });
  ov.querySelectorAll("[data-ov]").forEach(b => {
    b.onclick = () => {
      S.onlineVoice = b.dataset.ov; save();
      ov.querySelectorAll("[data-ov]").forEach(x => {
        const on = x === b;
        x.classList.toggle("primary", on); x.classList.toggle("ghost", !on);
      });
      speak("Hey! What's up? I'm gonna grab a coffee.");
    };
  });

  // Teste de microfone: mede o volume que chega do mic
  const micArea = ov.querySelector("#micTestArea");
  ov.querySelector("#btnMicTest").onclick = async () => {
    micArea.innerHTML = `<p class="small">\u23f3 Pedindo permiss\u00e3o…</p>`;
    let stream, ctx;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      src.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      micArea.innerHTML = `
        <p class="small"><b>Fale agora em voz normal…</b></p>
        <div class="mic-meter-track"><div class="mic-meter" id="mmBar"></div></div>
        <p class="small muted" id="mmTxt">Aguardando som…</p>
        <p class="small muted">A barra tem que mexer quando voc\u00ea fala. Se mexer, o microfone est\u00e1 OK!</p>`;
      const bar = micArea.querySelector("#mmBar"), txt = micArea.querySelector("#mmTxt");
      let peak = 0, frames = 0;
      const tick = () => {
        if (!micArea.isConnected) { stream.getTracks().forEach(t => t.stop()); ctx.close(); return; }
        analyser.getByteTimeDomainData(data);
        let max = 0;
        for (const v of data) max = Math.max(max, Math.abs(v - 128));
        const pct = Math.min(100, Math.round(max / 128 * 160));
        bar.style.width = pct + "%";
        if (pct > 8) {
          peak = Math.max(peak, pct);
          txt.innerHTML = `\u2705 <b>Microfone capturando!</b> N\u00edvel m\u00e1ximo: ${peak}%`;
        } else {
          frames++;
          if (frames > 90 && peak <= 8) txt.innerHTML = `\u26a0\ufe0f Nada chegou no microfone. Veja: Configura\u00e7\u00f5es do Windows \u2192 Sistema \u2192 Som \u2192 Entrada \u2192 escolha \u201cGrupo de microfones\u201d e fale para a barra de teste ali mexer.`;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      setTimeout(() => {
        if (micArea.isConnected && peak <= 8) micArea.querySelector("#mmTxt") && (micArea.querySelector("#mmTxt").innerHTML += " <br>\ud83d\udc46 Se a barra n\u00e3o mexeu, o Windows est\u00e1 bloqueando: Configura\u00e7\u00f5es \u2192 Privacidade \u2192 Microfone \u2192 ative tudo.");
        stream.getTracks().forEach(t => t.stop());
        ctx.close();
      }, 12000);
    } catch (e) {
      micArea.innerHTML = `<p class="small">\u274c N\u00e3o consegui acessar o microfone (${esc(e.name || "erro")}).<br>1\ufe0f\u20e3 No navegador: clique no cadeado ao lado do endere\u00e7o \u2192 Microfone \u2192 Permitir.<br>2\ufe0f\u20e3 No Windows: Configura\u00e7\u00f5es \u2192 Privacidade \u2192 Microfone \u2192 ative tudo.</p>`;
    }
  };
}

/* ---------------- Boot ---------------- */
document.querySelectorAll("#tabbar button").forEach(b => b.onclick = () => go(b.dataset.view));
$("#btnSettings").onclick = openSettings;
render();
