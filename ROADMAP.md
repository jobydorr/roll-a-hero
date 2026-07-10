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
> - **"At the table" right sidebar (NEW, 2026-07-09).** The right rail is now the **initiative roster**: one drag-ordered list that IS the turn order — player heroes + NPCs + creatures together. Click a name → scrollable stat card. Add a creature/NPC via a story wikilink's peek ("＋ Initiative"), the rail search box (name/type), or the **＋ To the table** button in that creature/NPC's own doc header (`roster-add-doc`, dedup-safe). **HP now stays in sync:** editing a doc's HP (or ⚡ Stats) updates a linked roster entry's max (`syncRosterHpToDoc` in the store, called from `patch()` on an `fields.hp` change) — full/untracked refill, bloodied clamps. Round/turn cursor, per-row init number, "sort by init". State lives on `rollAHeroDmInitiative` in `dmos-store.js` (`getInitiative`/`rosterAdd`/`rosterMove`/`initStep`); UI is `PAINT.rail` + a `roster` drag branch in `dmos-ui.js`.
> - **Players from the REAL shared party (NEW).** `dm.html` now loads Firebase (RAHSync). The rail has a **campaign-code field** (`ui.campaignCode`, remembered, empty by default) → **Load** → `RAHSync.listCampaign(code)` → **＋** adds each shared hero as a `kind:'hero'` roster entry holding its snapshot. Its stat card computes real HP/AC/abilities/spells via `window.RAH.withState(snapshot, …)` + `referenceHTML`. (`withState` is SYNC-ONLY — compute in one pass.) Verified live: code `dungeon-dads` → Century, Aramil Quingalor, Sam Silkweed.
> - **Roster polish (2026-07-09):** per-row **HP tracking** (auto-fills for creatures from their page's hp field, players from computed HP; a damage/heal editor clamped to `[0,max]` via `rosterSetHp`/`rosterAdjustHp`; colour-coded chip). **Hover-preview** stat cards to the left of the rail (relatedTarget-aware so the name button's child spans don't break the hover); click a name = the full scrollable card.
> - **NPC stat blocks + quick-generate (2026-07-09):** the NPC template has an *optional* combat block (`DOC_TYPES.npc.statBlock` = hp/ac/attack/special) rendered only once it has values, so non-combat NPCs stay clean. A **⚡ Stats** button drops a Normal/Heroic/Legendary/Epic menu (`TIER_STATS`) — now **randomized ranges** rolled per generate, not fixed numbers — that fills tier-appropriate stats (works on creatures too). The block renders **above** the roleplay fields (stats at top). Creature pages also get a **📖 Look up** button (`creature-fill`) to drop a library creature's stats into the block. Once a doc has HP it auto-fills in the roster, and later HP edits sync there (`syncRosterHpToDoc`). Also this session: a **density pass** trimmed DM-OS padding throughout (`.doc`/fields/tools/tree/feed in `dmos.css`).
> - **Creature Lookup + personal library (2026-07-09):** `bestiary.js` (public, **SRD-licensed** starter of 11) + a **personal library** in localStorage (`rollAHeroDmBestiary`, this browser only). A **📖 Look up** button in the rail opens a **tabbed** modal: **Creatures** (＋Story makes a page in the focused folder / ＋Roster drops an inline `kind:'creature'` combatant whose card renders from `entry.stats`; **Save** on any creature page adds to the library; SRD vs Yours badges, removable), **Spells** and **Terms** (read-only reference straight from `data.js` SPELLS/GLOSSARY). **Copyright:** SRD ships; the Monster Manual stays gitignored — Cowork authors ORIGINAL, reworded creatures into `bestiary.js` or the DM's library from the local books on request; the book text never enters the repo.
> - **Today's notes (2026-07-09):** Tools entry → a modal of notebook notes + session logs created today or dated today (Quick Note stamps the date); click a row to open it.
> - **Story map — an authoring board (2026-07-09).** Tools → **Story map** opens its **own full-viewport surface** (the `#dmosMap` root, deliberately NOT a floating dialog). Every non-folder story doc is a card; the links already on the docs draw the arrows — `leadsTo` → solid, arrow-headed, labelled edges coloured by kind (*then* green / *alt* gold / *knows* blue), and `[[wikilinks]]` → dashed "mentions" edges (suppressed when a stronger `leadsTo` already joins the pair). Auto-layout = **flow-directed swimlanes**: one band per Act (top-level folder), cards flowing left→right by `leadsTo` depth with a barycentre row-sort so edges run beside cards. It's a real **authoring surface**: **right-click a card** → *Connect to…* (searchable picker, kind + optional label → writes a `leadsTo` onto the source doc), *New card it leads to…*, *Open*, *Rename*, *Unlink: X*, *Delete*; **right-click the board** → *Add a card here* (filed under the clicked Act band, placed at the cursor). All edits go through `createDoc`/`patch`/`deleteDoc`, so a card or link made here shows up in **Story Folders** immediately. And the reverse: a `[[wikilink]]` made in a doc's body (now easy — highlight text → **🔗 Link** marker → pick by title) appears on the map as a "mentions" edge. Also: a card's **○ handle drags card-to-card to connect**; **clicking an arrow** (label pill or ✎ nub) opens an **edge editor** (change kind/label, remove); a **mini-map** appears when the board overflows (click/drag to pan). Plus **drag** to move (persists in `rollAHeroDmChart` — `getChart`/`setChartPos`/`clearChart`), **click** to jump, **drag the board** to pan, **zoom** (−/Fit/+ or Ctrl-wheel), **Reset layout**, **Esc/Done** to close (Esc mid-drag cancels the gesture). Dangling `leadsTo` → a ⚠ on the card + a header count. The board is derived fresh each paint; its right-click menus/pickers/edge-editor live in `#dmosModal` and overlay it (z: map 48 < modal 50). Code: the *Story flow map* section of `dmos-ui.js`; styles under *Story map* in `dmos.css`; `#dmosMap` root in `dm.html`; `flow` icon in `icons.js`.
>
> **Also shipped this session (player-facing builder):** the header "Roll a Hero" logo is a site-wide home link (hover cue); a persistent **My Heroes** button jumps to the saved-heroes list; fixed a stray progress bar that leaked onto the hub (`[hidden]{display:none!important}` in `styles.css`).
>
> **⏸ Handed off to a fresh window (context limit). No half-done work — the tree is clean and everything is pushed.** Low-priority carryover (may already be done): Joby should **hard-refresh (Ctrl+Shift+R)** the live site once to pick up the latest, and can **Delete the stray "Aramil Quingalor"** from their own *Your Saved Heroes* — it landed there via a since-fixed My Heroes bug (`d58d71f`). Deleting it is **local-only and safe**, verified 4 ways incl. a live Firestore round-trip: the player's shared copy is untouched (the DM doesn't own that doc; `firestore.rules` forbids the delete; no unshare is even called).
>
> **Where to pick up next (Joby's call):** the "At the table" system AND the **story flow chart** are now built — the map is a full authoring surface (drag-to-connect, in-place edge editing, and a mini-map all shipped). Quick wins still queued in `BACKLOG.md`: **grow the SRD bestiary** (more starter monsters — just data in `bestiary.js`), and **sync roster HP when stats are generated** (today the roster snapshots HP at add-time, so a later quick-generate leaves the tracker blank). Minor: the hero card's passive perception is 10+WIS baseline (the builder doesn't model skill proficiency).
>
> **Deferred, agreed:** the DM can only truly *delete* a shared hero their current browser owns; for others, "Remove" hides it locally (`rollAHeroDmHidden`). Real fix = a "campaign owner" concept in `firestore.rules`, bundled with the **Private DM area / accounts** item in `BACKLOG.md`.
>
> **Everything is pushed & LIVE** — `origin/main`, working tree clean. The whole backlog + this session went out together (RH main page hub, DM OS, roster, party, HP tracking, NPC stat blocks, creature/spells/terms Lookup, Today's notes, **the Story map authoring board**). Note: the passcode-gated **Dungeon Master OS door is now visible to players** on the front page (by design). Future `git push` deploys in ~1 min; bump `?v=` on changed assets (`dm.html` is now at dmos-store `v12` / dmos-ui `v27` / dmos.css `v20` / icons `v17` / bestiary `v1`) and **hard-refresh (Ctrl+Shift+R)**. Nothing secret in the repo by design.
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
> - **Delegated non-click handlers need the `:type` suffix.** `on(root, type)` dispatches `ACT[dataset.act + ':' + type]` for non-click events. So a search input's live handler is `ACT['x:input']`, NOT `ACT['x']` (that only fires on click). The creature Lookup search silently did nothing until this was fixed.
> - **Delegated hover breaks on child elements.** `mouseover`/`mouseout` fire as the pointer crosses a button's inner spans; the mid-element `mouseout` sets a hide timer that clears the pending show timer, so the peek never appears. Use `e.relatedTarget.closest(sel)` to ignore moves *within* the same element (mouseenter/leave semantics). Bit the roster hover-preview.
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
