# Project notes

Decisions, progress, learnings and key takeaways for the Cape Town Quiz. Newest at the top.

## 2026-11-06 — First working version of the quiz

### Decisions (DJ answered the PRD's open questions)
- For tourists in general, no partner yet. Name stays **Cape Town Quiz**. English only.
- Pictures: own drawings + free photos. First version uses only our own drawings (made in code); free photos can be added later.
- Free for now. Maybe a paid/branded partner version later, once there is traction.
- Facts: general information from the internet is fine for now. A local expert review only if there's a commercial roll-out.

### Progress
- Built the first version. Files:
  - `index.html` — the page (start screen, question screen, result screen)
  - `style.css` — the look (colours of Bo-Kaap houses, ocean and fynbos; fonts Fredoka + Inter)
  - `app.js` — how the game works
  - `questions.js` — **all 120 questions** (15 per theme). This is the only file to edit to add or change questions.
  - `favicon.svg` — the little icon in the browser tab
- Features: pick a theme or "mix", 10 random questions per round (easy ones first), shuffled answers, right/wrong colours, "Did you know?" fact, "Go see it" tips, score + fun title (from "Fresh off the plane" to "Honorary Capetonian"), "3 things you learned", play again, share score, best score remembered on the phone, avoids repeating questions until all in a theme are seen, confetti for right answers.
- No sign-up, no cookies, no tracking.
- Tested on phone size and desktop: works, no errors.
- To preview: run `python3 -m http.server 8766` in this folder and open http://localhost:8766 (also set up in `.claude/launch.json`).

### Fact checking
- Questions written from well-known facts and checked online where less certain:
  - African penguin listed as Critically Endangered by IUCN in October 2024 — confirmed.
  - Mensa is the only constellation named after a place on Earth (Table Mountain) — confirmed.
  - Langa march 1960 led by Philip Kgosana — confirmed; crowd estimates vary (about 30,000, some say up to 50,000), so the question says "around 30,000 (estimates vary)".
  - Boulders Beach penguin colony: sources only say it started "in the 1980s" (not the often-quoted "two pairs in 1982"), so the question uses "the 1980s".
- Still worth a second check before a big launch: "114 bends" on Chapman's Peak Drive, "Moaning Minnie" nickname of Green Point Lighthouse, Hermanus "about 1.5 hours away", the 1974 date of "Mannenberg".

### Learnings
- Keeping questions in a separate file means new questions can be added without touching the game itself.

### Next steps (ideas)
- Play it yourself and with a few friends; note questions that are too easy/hard or unclear.
- Put it online (e.g. GitHub Pages, like Pulse Africa) and make a QR code.
- Later: free photos, map links in "Go see it" tips.

## 2026-11-06 — Project started

### Progress
- Created the project folder with CLAUDE.md, Memory.md and PRD.md.
- PRD.md describes the first version (the "MVP"): a free, mobile-friendly web quiz, no app download or sign-up needed.

### Decisions (proposed in the PRD — DJ to confirm)
- Format: a website that works well on a phone.
- Language: English first.
- 8 themes, about 120 questions to start; a round is 10 questions.
- Every answer shows a short "Did you know?" fact, so people learn even when they get it wrong.

### Open questions
- See the "Open questions" section at the bottom of PRD.md.
