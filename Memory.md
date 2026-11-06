# Project notes

Decisions, progress, learnings and key takeaways for the Cape Town Quiz. Newest at the top.

## 2026-11-06 — QR code made

### Progress
- Made a QR code that opens https://djvanstyrum.github.io/cape-town-quiz/ — in the `qr` folder:
  - `cape-town-quiz-qr.png` — image to share or put in documents
  - `cape-town-quiz-qr.svg` — sharp at any size (best for professional printing)
  - `poster.html` — a printable A4 poster ("Scan to play!"). Open it in a browser and print (Cmd+P).
- Tested: the QR code reads back as exactly the quiz link. The poster fits on one A4 page.
- The QR code has extra error correction, so it still scans if slightly damaged or dirty.
- Online too: https://djvanstyrum.github.io/cape-town-quiz/qr/poster.html

### Learnings
- The QR code points to the web address, not to the files. As long as the address stays the same, the QR code keeps working even when we change the quiz.

## 2026-11-06 — Quiz is live

### Progress
- The quiz is online for everyone at **https://djvanstyrum.github.io/cape-town-quiz/** (GitHub Pages, free).
- Code is on GitHub in a **public** repository: https://github.com/djvanstyrum/cape-town-quiz (public is needed for free GitHub Pages). Anyone can see all files, including CLAUDE.md, Memory.md and PRD.md, so never put secrets or sensitive details in them.
- Commits use DJ's private GitHub "noreply" email, so the real email address isn't stored in the code history (same as Pulse Africa).
- Checked the live site: it loads all 120 questions and 8 themes.

### How it works from now on
- Every change sent to GitHub ("push") appears on the live site automatically, usually within 1–2 minutes. Just ask: "save this to GitHub".

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
