# PRD — Cape Town Quiz

*Product Requirements Document · Draft 1 · 6 November 2026 · Owner: DJ van Styrum*

## 1. In one sentence

A free, playful multiple choice quiz on your phone that teaches visitors about Cape Town — its history, nature, food, people and hidden gems — while they explore the city.

## 2. Why build this?

- Visitors arrive curious but busy. Guidebooks are long; a quick quiz is fun and sticks in the memory.
- Most visitors only see the highlights (Table Mountain, the Waterfront). A quiz can point them to the city's deeper stories: the Bo-Kaap, District Six, Robben Island, fynbos, Cape Malay food, the three local languages.
- Learning by guessing works: when you guess first and then read the answer, you remember it better.

## 3. Who is it for?

| Person | Situation | What they want |
|---|---|---|
| **The tourist** (main user) | In Cape Town for a few days, phone in hand, waiting for a cable car, on a tour bus, at dinner | Quick fun, a few "wow, I didn't know that" moments, tips for what to see |
| **The family / group** | Travelling together | Something to play together and compete on |
| **The planner** | At home, before the trip | Get a feel for the city and ideas for the trip |
| **Partners** (later) | Hotels, guesthouses, tour operators | Something nice to offer their guests (e.g. a QR code in the room) |

## 4. Goals

1. **Fun**: people play more than one round.
2. **Learning**: after a round, a visitor knows at least 5 new things about Cape Town.
3. **Easy**: start playing within 5 seconds of opening the link. No app download, no sign-up.
4. **Correct**: every fact is checked and right.

**Not goals (for now):** making money, user accounts, a downloadable app, real-time multiplayer.

## 5. How it works (user experience)

1. **Start screen** — Title, a short welcome ("How well do you know Capetown?"), a big **Play** button, and a choice of theme (or "Mix of everything").
2. **Question** — One question at a time, 4 answer buttons, a progress bar ("Question 3 of 10"). Optional photo or illustration.
3. **Answer** — Tap an answer. It turns green (right) or red (wrong) and the right answer is shown. Below: a short **"Did you know?"** fact (2–3 sentences). Sometimes a **"Go see it"** tip with the place to visit.
4. **Next** — A button to go to the next question.
5. **Result screen** — Score, a fun title based on the score (e.g. "Tourist", "Local", "Honorary Capetonian"), the 3 most interesting facts from the round, and buttons: **Play again**, **Try another theme**, **Share my score**.

## 6. Content

### Themes (8)

1. **Table Mountain & nature** — mountain, fynbos, Cape Peninsula
2. **History** — from the Khoikhoi and San to today
3. **Freedom & democracy** — Robben Island, Mandela, District Six
4. **Food & drink** — bobotie, gatsby, koeksister, wine regions
5. **People, languages & culture** — isiXhosa, Afrikaans, English, Cape Malay culture, music
6. **Animals & the ocean** — penguins, whales, baboons, two oceans
7. **Neighbourhoods & landmarks** — Bo-Kaap, Waterfront, Kirstenbosch, Muizenberg
8. **Practical & fun facts** — weather, the "Cape Doctor" wind, the Noon Gun, safety tips

### Amount
- Start with **about 120 questions** (15 per theme). A round = **10 questions**, picked at random.
- Mix of difficulty: about half easy, a third medium, the rest hard.

### Each question has
- The question
- 4 answer options (1 right)
- The "Did you know?" fact
- Optional: "Go see it" tip, a picture, theme, difficulty, and a source (where the fact was checked)

### Tone
Friendly, light, a little humour. Respectful about painful history (apartheid, forced removals): no jokes there, short and honest.

### Example questions

**How high is Table Mountain?**
A) 685 m · **B) 1,085 m ✓** · C) 1,585 m · D) 2,085 m
*Did you know? The flat top is about 3 km wide. In 2011 Table Mountain was chosen as one of the New 7 Wonders of Nature.*

**When the "tablecloth" covers Table Mountain, which wind is usually blowing?**
**A) The south-easter ✓** · B) The north-wester · C) A sea breeze from the west · D) There is no wind
*Did you know? Locals call the strong south-easter the "Cape Doctor", because it is said to blow the pollution away.*

**Is the Cape of Good Hope the southernmost point of Africa?**
A) Yes · **B) No — it's Cape Agulhas ✓** · C) No — it's Cape Point · D) No — it's Robben Island
*Did you know? Cape Agulhas, about 150 km south-east, is the real tip of Africa and the official meeting point of the Atlantic and Indian Oceans.*

**How many of his 27 years in prison did Nelson Mandela spend on Robben Island?**
A) 5 · B) 10 · **C) 18 ✓** · D) 27
*Go see it: Ferries to Robben Island leave from the V&A Waterfront. Tours are often guided by former political prisoners.*

**Which birds can you meet up close at Boulders Beach in Simon's Town?**
A) Flamingos · **B) African penguins ✓** · C) Pelicans · D) Ostriches

**What is bobotie?**
**A) Spiced minced meat baked with an egg topping ✓** · B) A sweet fried dough twist · C) A type of fish · D) A drink made from rooibos
*Did you know? Bobotie comes from the Cape Malay kitchen and is often served with yellow rice and chutney.*

**What happens every day (except Sundays and public holidays) at noon on Signal Hill?**
A) A bell rings · **B) A cannon is fired ✓** · C) A flag is raised · D) Fireworks
*Did you know? The Noon Gun has been fired since 1806 — once used by ships in the harbour to set their clocks.*

> ⚠️ All facts must be checked once more before launch.

## 7. Features

### Must have (first version)
- Works great on a phone (also fine on tablet and computer)
- Choose a theme or "Mix"
- 10 random questions per round, answers in random order
- Right/wrong feedback + "Did you know?" fact after each question
- Result screen with score and a fun title
- Play again
- Works on a slow connection; loads fast
- Easy to read (big buttons, good contrast)

### Should have (soon after)
- Share score (e.g. WhatsApp, social media)
- Pictures with questions
- "Go see it" tips with a link to a map
- Remember the best score on the device (no account)
- Don't repeat questions already seen until all are played

### Could have (later)
- More languages (e.g. German, Dutch, French, Afrikaans)
- Timed "speed round"
- Group mode: pass the phone around, one score per player
- Location-based questions ("You're at the Waterfront — try these!")
- Daily question
- QR codes for hotels and tour operators
- A small "Cape Town Explorer" badge collection

## 8. Look and feel

- Bright, sunny and colourful — inspired by the Bo-Kaap houses, the ocean and the fynbos (protea pink, ocean blue, mountain green, sunny yellow).
- Simple illustrations (Table Mountain silhouette, penguin, protea flower).
- Small celebrations for good answers (e.g. a short confetti burst), never annoying.

## 9. Technical approach (in plain language)

- A **simple website** — no app store needed. Visitors open a link or scan a QR code.
- The questions live in **one separate list file**, so new questions can be added without touching the rest of the quiz.
- Hosted for free (for example on GitHub Pages, like the Pulse Africa website).
- No personal data collected. No cookies needed for the first version.

## 10. How we measure success

- People who start a round and finish it: target **70%+**
- People who play a second round: target **40%+**
- Average score: around **60%** (not too easy, not too hard)
- Feedback from a few real visitors: "fun" and "I learned something"

(Measuring the numbers needs simple, privacy-friendly visitor statistics — to decide later.)

## 11. Plan

| Step | What | Result |
|---|---|---|
| 1 | Approve this PRD ✅ | Clear plan |
| 2 | Write and fact-check ~120 questions ✅ | Question list |
| 3 | Design the look ✅ (first version) | Colours, logo, screens |
| 4 | Build the first version ✅ | Working quiz on the computer |
| 5 | Test with friends / a few visitors | Feedback, fixes |
| 6 | Put it online ✅ (QR code ✅) | Public link + QR code |

## 12. Decisions (answered by DJ, 6 November 2026)

1. **Who is it for first?** Tourists in general (no partner yet).
2. **Name:** Cape Town Quiz.
3. **Languages:** English only for now.
4. **Pictures:** Our own drawings, plus free photos.
5. **Commercial:** Free for now. A paid/branded version for partners perhaps later, once there is traction.
6. **Fact checking:** Use general information from the internet for now. A local expert review comes back on the table if there is a commercial roll-out.
