# Roll a Hero — Roadmap

*What this is:* the single place that tracks where this project has been, where it is now, and what's next. If a plan ever feels "lost in a directory," it should be here. Plain language; update it as things change.

*Last updated: 2026-07-08.*

> **▶ HANDOFF — start here (2026-07-08, later)**
>
> **What's in flight:** the **Dungeon Master OS** — a Scrivener-style workspace at `dm.html`. The week-old question *"where do DM tools live?"* is **settled: its own page** (see `DECISIONS.md`). **Phase 0 is done** — `campaign/` is gitignored, `app.js` exports its hero math as `window.RAH` (boot now guarded, since `dm.html` has no `#app`), and the welcome screen links to the OS.
>
> **Where to pick up:** **Phase 1 — shell + folder tree + story feed** (the phases are listed at the top of `BACKLOG.md`). Three things to know before you touch it:
> - `dm.html` **must not link `print.css`** — its line 8 hides `.app-header, .app, #live`.
> - `dm.html` shares a `localStorage` origin with `index.html`, and `saveAll()` (`app.js:190`) swallows quota errors. A full DM workspace could silently stop a *hero* from saving. Every DM write goes through one `save()` that surfaces `QuotaExceededError`.
> - The campaign lives in a **gitignored `campaign/`** folder. That 404, not the passcode, is what keeps the story from the players.
>
> ---
>
> **Previously (2026-07-08):** Character sharing is **built, verified, and LIVE**. Firebase project `roll-a-hero` (Firestore + anonymous auth); security rules published and confirmed with a real *server-side* round-trip (not just the client cache). A player taps **Share** on a hero → picks/creates a campaign code → the hero publishes. The DM opens **"DM: view a shared party"**, enters the same code, and can **View** each hero (full character page, printable), **Remove** it, or save a copy. **Unshare** lives in the dialog behind a shared hero's Share button, and **deleting a hero also removes its shared copy**. Local-first throughout: nothing leaves a browser unless you Share, existing heroes are never touched, and file **Export / Import** is the safety net.
>
> **Where to pick up next:** the **🔴 URGENT list at the top of `BACKLOG.md`** — two real players rolled **Beast Master Rangers** and the builder has no way to pick an animal companion, so those heroes are unfinished. Then the standing threads: a **private DM area** (today the DM page is reachable by anyone who knows a campaign code), and the two big pillars — **DM tools** and **leveling**.
>
> **Deploying:** commit → `git push` → GitHub Pages refreshes in ~1 min. Bump the `?v=` tag on every `index.html` asset when JS/CSS changes, and **hard-refresh** (`Ctrl+Shift+R`) to see it — the browser caches `index.html` itself.

---

## Where it stands right now

A friendly, kid-safe **Dungeons & Dragons character creator and beginner's primer**. It walks a complete newcomer through making a character — roll your abilities, pick a race and class, choose a specialty and spells, write your story, grab your gear — and teaches the basics of play along the way. At the end it prints a clean one-page character sheet plus a per-player cheat sheet (now with daily-use checkboxes). It's a plain website, no install — your friends just click a link.

**Status: SHIPPED & LIVE.** Built for four friends (two adults + a 9- and a 10-year-old) and deployed to a public link: **https://jobydorr.github.io/roll-a-hero/**. Now growing from "a character creator" into a fuller toolkit for planning and running games.

---

## The original plan — the character creator (built first)

The founding goal: a stripped-down, intuitive way for total beginners to make a character and learn to play.

| Piece | What it is | Status |
|------|------------|--------|
| Guided walkthrough | quiz → roll → race → class → abilities → magic → story → gear | ✅ Done |
| Simplified rules | one "roll a d20, beat this number" mechanic; tomato-analogy abilities | ✅ Done |
| Printable sheet | clean one-page sheet matching the reference image | ✅ Done |
| Beginner primer | a "How to Play" page + a plain-language glossary | ✅ Done |
| Share it | live on a public link, no install | ✅ Done |

---

## Built along the way (beyond the first sketch)

These came up during the build and got added:

- Grew from 4 classes to **8** (Fighter, Rogue, Wizard, Cleric, Barbarian, Paladin, Ranger, Bard), each with 2–3 specialties; all **9** PHB races
- A second printable page — a per-player **cheat sheet** explaining every ability and spell
- A **playstyle quiz** that suggests heroes, with reshuffle/variety
- A **Daily Uses tracker** (printable checkboxes for spell slots and limited-use features)
- Deployed live to GitHub Pages + this project-management setup

---

## What's next — expanding the toolkit (NEW DIRECTION, 2026-06-29)

The project is growing from "make a character once" into a **toolkit for playing and running an ongoing game**, with two new pillars:

### 🧙 DM tools — plan & run campaigns  *(the expansion we're reaching for now)*
A whole new side of the app **for you as the Dungeon Master**: plan and run campaigns and sessions, keep NPCs and locations, build simple encounters/monsters, jot session notes, and track the party (including an easy initiative tracker for running a fight). Same north star as the character creator — simple and friendly, not a spreadsheet.

### 📈 Living characters — leveling up  *(explicitly "later")*
Turn the one-and-done generator into a hero your friends **keep and grow**: more HP, new class features, higher-level spells and more spell slots, ability bumps at the right levels, and the subclass features that unlock as they advance. Edit and re-print the sheet whenever something changes.

*Immediate next steps: this PM scaffolding (these three files + a Cowork project pointing at the repo) is the groundwork. Then pick a pillar to start and settle the "big question" below. Nothing here is locked — this is the menu we order from. Details live in `BACKLOG.md`.*

---

## The big question — ✅ SETTLED (2026-07-07): add a small backend (local-first)

**Decided.** We're adding a small backend so characters can be shared. The goal: one site where users make a profile, build characters, hit **Share**, and the selected characters land on a **common page the DM can see** — so friends never have to send a PDF again. The GitHub Pages static site stays the frontend (no server to run); a free backend-as-a-service (**Supabase** preferred, **Firebase** the alternative) holds the shared data.

**Design guardrails (locked in):**
- **Local-first — nothing is ever lost.** Each browser's local save stays the source of truth; the backend only *publishes a copy*. If the backend ever vanished, every hero still lives in its owner's browser and in exported files.
- **Existing characters are protected.** The first build step, before anything else, is **Export/Backup** to capture the two characters friends have already made.
- **Kid-safe.** No passwords/emails for kids — profiles are display names + a shared campaign code, invite-only, zero personal info.

**Phased plan:** (0) Export/Backup → (1) profiles + Share-to-campaign → (2) live DM party page.

*(Full reasoning in `DECISIONS.md`.)*

---

## Product ambitions — ⚠️ DRAFT, nothing settled

*(Brainstorm only — written down so the ambition isn't lost; shape it however you want.)*

- Could grow from "a tool for our table" into something other new groups could use.
- Open questions: who's it for (brand-new players? family game nights? classrooms?), and does it stay free and simple or grow into something bigger?
- Nothing here is decided.
