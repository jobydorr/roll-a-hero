# Roll a Hero — Roadmap

*What this is:* the single place that tracks where this project has been, where it is now, and what's next. If a plan ever feels "lost in a directory," it should be here. Plain language; update it as things change.

*Last updated: 2026-07-09.*

> **▶ HANDOFF — start here (2026-07-09 — paused mid-session; everything below is pushed & LIVE)**
>
> **The shape (naming — Joby set this, use it):** the **RH main page** (`index.html`) is a hub with two doors — **Build a Hero** (the character builder, for everyone) and **Dungeon Master OS** (`dm.html`, passcode `bugbear`, for the DM). The DM OS link is on the main page only, never inside the builder, so a player has no path from their character sheet to the DM's spoilers. The header "Roll a Hero" title is a home link site-wide.
>
> **How campaign content works:** the campaign is **`campaign.js`** (`window.DM_CAMPAIGN`), committed and public, loaded by a `<script>` tag like `data.js`. **To push content from Cowork, edit `campaign.js` and commit** — same as adding a spell to `data.js`. No fetch, no server; the live site works and double-clicking `dm.html` works. `DMOS_STORE.loadCampaign(force)` reads that global. (Why it's public and there's no server: `DECISIONS.md`, top entries. Short version — Joby only needs players kept out via the passcode, not code-level secrecy.)
>
> **What the DM OS has now (all built & verified this session):**
> - Three-column Scrivener workspace: nestable folder tree, continuous story feed (a folder stitches its docs into one read), typed docs with template fields, `[[wikilinks]]` with hover-peek, conflict-safe merge, print.
> - **Notebook + Quick Note.** Notebook = its own left-sidebar area (sections + notes), separate from Story Folders; notes open in the center feed. Quick Note = a floating pad (date box) that persists until you Clear it; **File all** or **File selection** (a *copy*, leaves the pad) into a section (new note) or an existing note (append). Built on the shared doc store via a reserved `nb_root`, partitioned out of story views by `isInNotebook()`.
> - **App-wide search** (Search tool / **Ctrl+K**) over every doc's title/fields/body, story + notebook, highlighted.
> - **Folder management:** parent (top-level) folders show a tome icon, child folders a folder icon (`docIconName()`); a **＋** on the Story Folders header adds a *parent* folder or a root doc; a **＋** on each folder adds a subfolder or doc *inside* it (popup menu, no native prompts). "New folder"/"New document" are gone from Tools.
> - **Drag** (by the ⠿ handle only): reorder between rows, or drop onto a folder's middle to **move an item into it** (works across folders; cycle-guarded).
> - **New workspace** (Tools): backs up to a file, then blanks the workspace. `ws.autoSync` (default true) stops a reload from re-seeding `campaign.js`; "Sync from campaign" forces it. Gives Export/Import real use (save/switch campaigns).
> - **Lock** (Tools) re-gates the passcode. **The passcode is remembered per-browser** (`passOk` in localStorage) — by design, per Joby's choice.
> - **"At the table" right sidebar (NEW, 2026-07-09).** The right rail is now the **initiative roster**: one drag-ordered list that IS the turn order — player heroes + NPCs + creatures together. Click a name → scrollable stat card. Add a creature/NPC via a story wikilink's peek ("＋ Initiative") or the rail search box (name/type). Round/turn cursor, per-row init number, "sort by init". State lives on `rollAHeroDmInitiative` in `dmos-store.js` (`getInitiative`/`rosterAdd`/`rosterMove`/`initStep`); UI is `PAINT.rail` + a `roster` drag branch in `dmos-ui.js`.
> - **Players from the REAL shared party (NEW).** `dm.html` now loads Firebase (RAHSync). The rail has a **campaign-code field** (`ui.campaignCode`, remembered, empty by default) → **Load** → `RAHSync.listCampaign(code)` → **＋** adds each shared hero as a `kind:'hero'` roster entry holding its snapshot. Its stat card computes real HP/AC/abilities/spells via `window.RAH.withState(snapshot, …)` + `referenceHTML`. (`withState` is SYNC-ONLY — compute in one pass.) Verified live: code `dungeon-dads` → Century, Aramil Quingalor, Sam Silkweed.
>
> **Also shipped this session (player-facing builder):** the header "Roll a Hero" logo is a site-wide home link (hover cue); a persistent **My Heroes** button jumps to the saved-heroes list; fixed a stray progress bar that leaked onto the hub (`[hidden]{display:none!important}` in `styles.css`).
>
> **⏸ Paused mid-session. ONE outstanding user action for Joby:** **hard-refresh (Ctrl+Shift+R)** the live site, then **Delete the stray "Aramil Quingalor"** from their own *Your Saved Heroes*. It landed there via a My Heroes bug (fixed in `d58d71f` — it used to `persist()` a DM-*viewed* shared hero). Deleting it is **local-only and safe**, verified 4 ways incl. a live Firestore round-trip: the player's shared copy is untouched (the DM doesn't own that doc; `firestore.rules` forbids the delete; no unshare is even called since the DM never Shared it).
>
> **Where to pick up next (Joby's call):** the roster works but could grow — **per-row HP / damage tracking** at the table (not in Joby's original spec; easy add), hover-preview (not just click) for stat cards, or a **Lookup** tab (rules/spells search). Still open from before: the **story flow chart** (unbuilt), a "today's notes" view. Minor: the hero card's passive perception is shown as 10+WIS baseline (the builder doesn't model skill proficiency).
>
> **Deferred, agreed:** the DM can only truly *delete* a shared hero their current browser owns; for others, "Remove" hides it locally (`rollAHeroDmHidden`). Real fix = a "campaign owner" concept in `firestore.rules`, bundled with the **Private DM area / accounts** item in `BACKLOG.md`.
>
> **Everything is pushed & LIVE** — `origin/main` @ `d58d71f`, working tree clean. The whole prior backlog + this session went out together (RH main page hub, DM OS, roster, party). Note: the passcode-gated **Dungeon Master OS door is now visible to players** on the front page (by design). Future `git push` deploys in ~1 min; bump `?v=` on changed assets and hard-refresh. Nothing secret in the repo by design.
>
> **Local dev:** `python -m http.server 8000` in the repo, then `http://localhost:8000/`. (Preview tooling uses `.claude/launch.json`. Note: `requestAnimationFrame` is throttled in a backgrounded preview tab, so in `preview_eval` tests call `DMOS_UI.flush()` to force a synchronous paint instead of awaiting rAF.)
>
> **Traps that cost real debugging (don't relearn them):**
> - `dm.html` **must not link `print.css`** — its line 8 hides `.app-header, .app, #live`. `dmos.css` owns `@media print` for that page.
> - `dm.html` shares a `localStorage` origin with `index.html`, and `saveAll()` (`app.js:190`) swallows quota errors. A full DM workspace could silently stop a *hero* from saving. Every DM write goes through one `write()` in `dmos-store.js` that surfaces `QuotaExceededError`.
> - **The feed's reconcile key is `nodeKey(d)`, not `rev`.** Conflict flags and the body-editor toggle change a node's HTML without moving a revision, so they're folded into `nodeKey`. Anything you add to `renderDocNode` that isn't derived from `rev` must go there too.
> - **Never detach the node `cursor` points at** in `PAINT.feed` without advancing `cursor` first, or it throws `NotFoundError` on every repaint of the first doc — silently, because `flush()` catches paint errors into the console.
> - **Assert on computed style, not on the attribute you just set**, and **watch `console.error` in UI tests** (`flush()` swallows paint errors). Both traps cost real debugging this session; the `[hidden]{display:none!important}` at the top of `dmos.css` exists because an author `display` rule was beating the browser's `[hidden]`.
> - **Never `persist()` a hero the DM only *viewed*.** "DM: view a shared party" loads a player's hero into `state` and leaves it there after "Back to party" clears `viewCtx`. Any save-on-navigation must guard `!viewCtx && (editCtx || !state.id)` — a viewed shared hero keeps the player's id and has no `editCtx`. The My Heroes button hit exactly this and wrote another player's hero into the DM's list (fixed `d58d71f`).
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
