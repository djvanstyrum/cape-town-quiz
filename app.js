/* Cape Town Quiz — how the quiz works.
   Questions live in questions.js; this file only handles the game. */

(function () {
  "use strict";

  var ROUND_SIZE = 10;
  var LEVEL_LABEL = { 1: "● Easy", 2: "●● Medium", 3: "●●● Hard" };
  var LETTERS = ["A", "B", "C", "D"];

  /* Fun titles by score (out of 10) */
  var RANKS = [
    { min: 0, title: "Fresh off the plane", text: "Everyone starts somewhere! Now you know a lot more than when you landed.", colour: "#7BC4E8" },
    { min: 4, title: "Curious tourist", text: "Not bad at all — you've clearly been paying attention.", colour: "#8CC63F" },
    { min: 6, title: "Seasoned traveller", text: "You know your way around. Time to explore the hidden gems!", colour: "#F7C548" },
    { min: 8, title: "Almost a local", text: "Impressive! You'd fit right in at a Sunday braai.", colour: "#F08A3C" },
    { min: 10, title: "Honorary Capetonian", text: "A perfect score! The Mother City is proud of you. Lekker!", colour: "#E8457A" }
  ];

  /* Small drawn icons for each theme */
  var ICONS = {
    mountain: '<path d="M2 30 L10 18 L13 14 L27 13 L30 18 L34 30 Z" fill="#2F7D5B"/><path d="M13 14 L27 13 L27.5 15 L12.6 15.8 Z" fill="#fff"/><circle cx="29" cy="7" r="3.5" fill="#F7C548"/>',
    castle: '<path d="M6 32 V14 h4 v3 h3 v-3 h4 v3 h3 v-3 h4 v3 h3 v-3 h4 V32 Z" fill="#F08A3C"/><path d="M16 32 v-8 a4 4 0 0 1 8 0 v8 Z" fill="#1F2A44"/>',
    dove: '<path d="M5 22 C10 14 18 12 22 16 L30 9 L28 18 C26 25 18 29 10 27 Z" fill="#1E6FB8"/><circle cx="25" cy="15" r="1.3" fill="#fff"/><path d="M30 9 l5 1 -4 2 z" fill="#F7C548"/>',
    food: '<ellipse cx="20" cy="25" rx="15" ry="6" fill="#E8457A"/><ellipse cx="20" cy="22" rx="12" ry="5" fill="#F7C548"/><path d="M14 17 q2 -6 0 -10 M20 17 q2 -6 0 -10 M26 17 q2 -6 0 -10" stroke="#5D6781" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
    music: '<path d="M14 28 V9 L30 6 V24" stroke="#8E5BC9" stroke-width="3" fill="none"/><circle cx="11" cy="28" r="4.5" fill="#8E5BC9"/><circle cx="27" cy="24" r="4.5" fill="#8E5BC9"/>',
    penguin: '<ellipse cx="20" cy="23" rx="10" ry="13" fill="#1F2A44"/><ellipse cx="20" cy="25" rx="6" ry="9.5" fill="#fff"/><circle cx="20" cy="11" r="6.5" fill="#1F2A44"/><circle cx="22.5" cy="10" r="1.3" fill="#fff"/><path d="M26 12 l5 1.5 -5 1 z" fill="#F08A3C"/>',
    house: '<path d="M4 32 V17 L11 11 L18 17 V32 Z" fill="#E8457A"/><path d="M18 32 V15 L26 9 L35 15 V32 Z" fill="#8CC63F"/><rect x="9" y="20" width="4" height="5" fill="#fff"/><rect x="24" y="19" width="4" height="5" fill="#fff"/>',
    sun: '<circle cx="20" cy="20" r="8" fill="#F7C548"/><g stroke="#F08A3C" stroke-width="2.5" stroke-linecap="round"><path d="M20 4v5M20 31v5M4 20h5M31 20h5M8.7 8.7l3.5 3.5M27.8 27.8l3.5 3.5M8.7 31.3l3.5-3.5M27.8 12.2l3.5-3.5"/></g>'
  };
  function icon(name) {
    return '<svg viewBox="0 0 40 40" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  /* ---------- Safe local storage (works even if blocked) ---------- */
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }

  /* ---------- Helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function showScreen(name) {
    var screens = document.querySelectorAll(".screen");
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove("active");
    $("screen-" + name).classList.add("active");
    window.scrollTo(0, 0);
  }

  /* Give every question a stable id, so we can remember which were seen */
  QUESTIONS.forEach(function (q, i) { q.id = q.theme + "-" + i; });

  /* ---------- Game state ---------- */
  var state = { theme: null, round: [], index: 0, score: 0, answered: [] };

  /* Pick 10 questions, preferring ones this visitor hasn't seen yet */
  function pickQuestions(theme) {
    var pool = QUESTIONS.filter(function (q) { return !theme || q.theme === theme; });
    var seen = load("ctq-seen", []);
    var fresh = pool.filter(function (q) { return seen.indexOf(q.id) === -1; });
    var picked;
    if (fresh.length >= ROUND_SIZE) {
      picked = shuffle(fresh).slice(0, ROUND_SIZE);
    } else {
      // Not enough unseen ones left: use what's fresh, top up with older ones,
      // and start the "seen" list again for this pool.
      var old = shuffle(pool.filter(function (q) { return fresh.indexOf(q) === -1; }));
      picked = shuffle(fresh).concat(old).slice(0, ROUND_SIZE);
      var poolIds = pool.map(function (q) { return q.id; });
      seen = seen.filter(function (id) { return poolIds.indexOf(id) === -1; });
      save("ctq-seen", seen);
    }
    // Easy questions first, harder ones later, for a nice build-up
    return shuffle(picked).sort(function (a, b) { return a.level - b.level; });
  }

  function startRound(theme) {
    state.theme = theme || null;
    state.round = pickQuestions(state.theme);
    state.index = 0;
    state.score = 0;
    state.answered = [];
    showScreen("question");
    showQuestion();
  }

  function showQuestion() {
    var q = state.round[state.index];
    var total = state.round.length;

    $("q-counter").textContent = "Question " + (state.index + 1) + " of " + total;
    $("q-score").textContent = "★ " + state.score;
    $("progress-bar").style.width = (state.index / total * 100) + "%";
    $("q-theme").textContent = THEMES[q.theme].name;
    $("q-level").textContent = LEVEL_LABEL[q.level] || "";
    $("q-text").textContent = q.q;
    $("feedback").hidden = true;

    var options = shuffle([q.answer].concat(q.wrong));
    var box = $("answers");
    box.innerHTML = "";
    options.forEach(function (text, i) {
      var b = document.createElement("button");
      b.className = "answer";
      b.type = "button";
      b.innerHTML = '<span class="letter">' + LETTERS[i] + "</span><span>" + escapeHtml(text) + "</span>";
      b.addEventListener("click", function () { choose(b, text === q.answer); });
      box.appendChild(b);
    });
  }

  function choose(button, isRight) {
    var q = state.round[state.index];
    var buttons = $("answers").querySelectorAll(".answer");
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      b.disabled = true;
      var label = b.lastChild.textContent;
      if (label === q.answer) b.classList.add("correct");
      else if (b === button) b.classList.add("wrong");
      else b.classList.add("faded");
    }

    if (isRight) state.score++;
    state.answered.push({ q: q, right: isRight });

    var seen = load("ctq-seen", []);
    if (seen.indexOf(q.id) === -1) { seen.push(q.id); save("ctq-seen", seen); }

    var cheers = ["Lekker! That's right.", "Spot on!", "Correct — well done!", "Yes! You know your stuff."];
    var oops = ["Not quite.", "Oops — close, but no.", "Good guess, but no."];
    var title = $("feedback-title");
    title.textContent = isRight
      ? cheers[Math.floor(Math.random() * cheers.length)]
      : oops[Math.floor(Math.random() * oops.length)] + " The answer is: " + q.answer + ".";
    title.className = "feedback-title " + (isRight ? "good" : "bad");
    $("feedback-fact").textContent = q.fact;

    var tip = $("feedback-tip");
    if (q.tip) {
      tip.innerHTML = "<strong>Go see it:</strong> " + escapeHtml(q.tip);
      tip.hidden = false;
    } else {
      tip.hidden = true;
    }

    $("q-score").textContent = "★ " + state.score;
    $("progress-bar").style.width = ((state.index + 1) / state.round.length * 100) + "%";
    $("btn-next").textContent = state.index + 1 < state.round.length ? "Next question →" : "See my result →";
    $("feedback").hidden = false;
    if (isRight) confetti(18);

    // Gently bring the fact into view on small screens
    setTimeout(function () {
      $("feedback").scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 60);
  }

  function next() {
    state.index++;
    if (state.index < state.round.length) {
      showQuestion();
      window.scrollTo(0, 0);
    } else {
      showResult();
    }
  }

  function rankFor(score, total) {
    var outOf10 = Math.round(score / total * 10);
    var r = RANKS[0];
    RANKS.forEach(function (x) { if (outOf10 >= x.min) r = x; });
    return r;
  }

  function showResult() {
    var total = state.round.length;
    var rank = rankFor(state.score, total);

    $("result-score").textContent = state.score + " / " + total;
    $("result-title").textContent = rank.title;
    $("result-text").textContent = rank.text;
    $("result-badge").innerHTML =
      '<svg viewBox="0 0 96 96"><circle cx="48" cy="48" r="44" fill="' + rank.colour + '"/>' +
      '<path d="M18 62 L32 46 L36 40 L60 39 L64 46 L78 62 Z" fill="#fff" opacity=".95"/>' +
      '<circle cx="66" cy="28" r="7" fill="#fff" opacity=".9"/></svg>';

    // Best score per theme (or "mix")
    var key = state.theme || "mix";
    var best = load("ctq-best", {});
    var label = state.theme ? THEMES[state.theme].name : "Mix of everything";
    if (best[key] === undefined || state.score > best[key]) {
      var hadBest = best[key] !== undefined;
      best[key] = state.score;
      save("ctq-best", best);
      $("result-best").textContent = hadBest ? "New personal best for " + label + "!" : "";
    } else {
      $("result-best").textContent = "Your best for " + label + ": " + best[key] + " / " + total;
    }

    // Three facts to take home: prefer the ones they got wrong (most to learn)
    var picks = state.answered.filter(function (a) { return !a.right; })
      .concat(state.answered.filter(function (a) { return a.right; }))
      .slice(0, 3);
    $("result-facts").innerHTML = picks.map(function (a) {
      return '<li><span class="fq">' + escapeHtml(a.q.q) + "</span>" +
        '<span class="fa">Answer: ' + escapeHtml(a.q.answer) + "</span> " + escapeHtml(a.q.fact) + "</li>";
    }).join("");

    $("share-msg").hidden = true;
    showScreen("result");
    if (state.score >= total * 0.8) confetti(60);
  }

  function share() {
    var total = state.round.length;
    var rank = rankFor(state.score, total);
    var text = "I scored " + state.score + "/" + total + " on the Cape Town Quiz and I'm a \"" + rank.title + "\"! Can you beat me?";
    var url = location.protocol.indexOf("http") === 0 ? location.href.split("#")[0] : "";
    var msg = $("share-msg");

    if (navigator.share) {
      navigator.share({ title: "Cape Town Quiz", text: text, url: url || undefined }).catch(function () {});
      return;
    }
    var full = url ? text + " " + url : text;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(full).then(function () {
        msg.textContent = "Copied! Paste it into WhatsApp or any message.";
        msg.hidden = false;
      }, function () {
        msg.textContent = full;
        msg.hidden = false;
      });
    } else {
      msg.textContent = full;
      msg.hidden = false;
    }
  }

  function confetti(n) {
    var layer = $("confetti");
    var colours = ["#E8457A", "#F7C548", "#1E6FB8", "#8CC63F", "#F08A3C", "#8E5BC9"];
    for (var i = 0; i < n; i++) {
      var bit = document.createElement("span");
      bit.className = "confetti-bit";
      bit.style.left = Math.random() * 100 + "vw";
      bit.style.background = colours[i % colours.length];
      bit.style.animationDelay = Math.random() * 0.3 + "s";
      bit.style.animationDuration = 1 + Math.random() * 0.8 + "s";
      layer.appendChild(bit);
      setTimeout(function (b) { return function () { b.remove(); }; }(bit), 2400);
    }
  }

  /* ---------- Start screen ---------- */
  function buildStartScreen() {
    var list = $("theme-list");
    list.innerHTML = "";
    Object.keys(THEMES).forEach(function (key) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "theme-card";
      b.innerHTML = icon(THEMES[key].icon) + "<span>" + escapeHtml(THEMES[key].name) + "</span>";
      b.addEventListener("click", function () { startRound(key); });
      list.appendChild(b);
    });

    var best = load("ctq-best", {});
    var keys = Object.keys(best);
    if (keys.length) {
      var top = keys.reduce(function (a, k) { return best[k] > best[a] ? k : a; }, keys[0]);
      var name = top === "mix" ? "Mix of everything" : (THEMES[top] ? THEMES[top].name : top);
      $("best-score").textContent = "Your best so far: " + best[top] + " / " + ROUND_SIZE + " (" + name + ")";
    } else {
      $("best-score").textContent = QUESTIONS.length + " questions · 10 per round · about 3 minutes";
    }
  }

  function goHome() {
    buildStartScreen();
    showScreen("start");
  }

  $("btn-play-mix").addEventListener("click", function () { startRound(null); });
  $("btn-next").addEventListener("click", next);
  $("btn-home").addEventListener("click", goHome);
  $("btn-again").addEventListener("click", function () { startRound(state.theme); });
  $("btn-themes").addEventListener("click", goHome);
  $("btn-share").addEventListener("click", share);

  buildStartScreen();
})();
