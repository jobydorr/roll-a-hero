# Roll a Hero — Decisions Log

*What this is:* a short record of the important calls we made and **why** — especially the moments the project changed direction. A pivot is never "lost": come back here to see what we were thinking.

*Newest first. Last updated: 2026-06-29.*

---

### 2026-06-29 — Expand into a fuller toolkit (DM tools + leveling), and manage it from Cowork
The project grows from a one-time character creator into a bigger toolkit with two new pillars: **DM tools to plan and run campaigns** (the near-term expansion) and, later, **living characters that level up**. To steer this the same way as the Trading Journal, we set up the same PM model: the project's direction lives in plain files in the repo (`ROADMAP.md`, `DECISIONS.md`, `BACKLOG.md`) so it can be seen and steered, and a **Cowork project pointing at this repo folder becomes the command center**. This machine stays the work desk; GitHub is the live site + backup.

### 2026-06-29 — Open question flagged: stay browser-only, or add a backend?
Surfaced (not yet decided) the architectural fork the new pillars create. The app is currently a static page that saves to the browser — no server, no accounts. Leveling can stay that way; full DM↔player campaign sharing probably can't. We'll choose between "client-only + shareable save-files" and "add a backend with accounts" before building the DM-↔-player connection in earnest. Recorded now so the choice is deliberate, not accidental.

### 2026-06-24 — Shipped and went live to a public link
Backed the project up to GitHub and deployed it to a free public GitHub Pages link so the friends can just click it — no install. (Different from the Trading Journal, which is a *private* backup; this one is meant to be shared, so public is fine — there's nothing private in it.) Updates: change the files, push, and the live site refreshes itself in about a minute (bump the `?v=` cache tag so people actually get the new version).

### 2026-06-23 — Keep it radically simplified
The whole design rule: strip D&D down so a 9-year-old and a brand-new adult can play, while keeping the real feel. One "roll a d20 and beat this number" mechanic instead of skills/saves/proficiency math; plain-language spell cards; tomato analogies for the six abilities. Everything we add should pass the "would a beginner get this?" test — including the new DM and leveling features.

### 2026-06-23 — Start everyone at level 3; 8 classes; 9 races
Chose level 3 (where every class has its specialty) and grew to 8 classes + all 9 PHB races for variety, with a playstyle quiz so the choices don't overwhelm. This quietly set the stage for leveling later — level 3 is a starting point, not a ceiling.

### 2026-06-23 — Built as a plain static website (no install, no build step)
Made it a single static site (HTML/CSS/JS that saves to the browser) so it's the easiest possible thing to share and maintain — anyone opens a link, nothing to install. This is the decision the new "big question" (browser-only vs. backend) may revisit.
