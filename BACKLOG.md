# Roll a Hero — Backlog

*What this is:* the running list of ideas and to-dos, so nothing gets forgotten. Reorder it freely — this is yours.

*Tags:* 🟢 can build anytime (fits today's browser-only app) · 🟠 bigger feature, needs design · 🔵 may need the "backend vs. browser-only" question answered first.

*Last updated: 2026-07-09.*

---

## ✅ URGENT list — all 4 done (2026-07-08)

1. ✅ **Beast Master animal companion** — 42 companions (every Beast the rules allow), a browsable picker, and the companion now prints on the character sheet + cheat sheet. The two rangers are unblocked.
2. ✅ **"Edit character" feature** — an **Edit / review screen** that autodetects what a hero is missing and jumps straight to the screen that fixes it. (The old path really did require clicking "← Make changes" five times; now it's one click.)
3. ✅ **Full character write-up viewable ON the site** — a **Full write-up** screen (from the hero page) shows the whole hero: stats, abilities, the full text of every racial power / class feature / spell, the companion, equipment, and daily uses. It reuses the cheat sheet's builder (`referenceHTML()`), so print and screen can't drift apart. *Bonus fix: the player's own **backstory, personality traits, and motivations** were captured by the builder but appeared literally nowhere — not on the sheet, not on the cheat sheet. They're in the write-up now.*
4. ✅ **Deep review of the character builder** — findings below.

### Audit findings (all 24 archetypes, cross-referenced against the PHB)

**Real dead-ends — both now fixed:**
- **Beast Master → Animal Companion.** Granted a companion; no data, no picker, absent from the sheet. *(fixed)*
- **Hunter → Hunter's Prey.** Text said *"Pick a trick…"* with nothing to pick with. Now three PHB options. *(fixed)*

**Flavor gaps — both now fixed (2026-07-08)** ✅
- **Ranger → Favored Enemy.** Now a real choice: 14 creature types (the PHB's 13 + humanoids). *(fixed)*
- **Ranger → Natural Explorer.** Now a real choice: the PHB's 8 terrains. *(fixed)*

These are **class-level** choices, so they needed a new `class.choices` mechanism (the app only had `race.choice` and `archetype.choice`). Stored in `state.classChoice`; the sheet reads "Favored Enemy — Dragons" rather than a bare feature name. Any future class-level choice now has a home.

**Intentional simplifications (not bugs, don't "fix"):** Battle Master maneuvers are a fixed set of 4 (PHB: choose 3 of ~16); spells are fixed known-lists (PHB: prepared daily).

**Verified correct:** the Ranger's level-3 kit matches the PHB exactly (Favored Enemy, Natural Explorer, Fighting Style, Spellcasting, Primeval Awareness, Archetype), 3 spells known, and `spellSlots()` gives half-casters `{1:3}` — the PHB's three 1st-level slots.

---

## ✅ SHIPPED — character sharing (Firebase, local-first)

Decided 2026-07-07 (see `DECISIONS.md`). Backend: **Firebase** project `roll-a-hero` (Firestore + anonymous auth). Built, verified server-side, and deployed live.

1. ✅ **Export / Import / Back-up** — save any hero (or all heroes) to a file; import merges in and never deletes. The safety net.
2. ✅ **Profiles + Share-to-campaign** — per-hero **Share** dialog: remembers your display name, pick an existing share page or make a new one (multi-campaign ready).
3. ✅ **DM party page** — "DM: view a shared party" lists every shared hero with live stats; each has **View** (opens the real character page, printable) and **Remove**.
4. ✅ **Unshare** (in the dialog behind a shared hero's Share button) and **delete-also-unshares**.
5. ✅ `firestore.rules` published and re-verified with a forced server-side round-trip (write → server read → delete) under the live rules.

*Files: `firebase-config.js` (non-secret, safe public), `firebase-sync.js` (`window.RAHSync`), `firestore.rules`.*

---

## 🔨 Active now — the Dungeon Master OS (`dm.html`)

A Scrivener-style workspace reached from the **RH main page**. Shape and the big simplification settled 2026-07-08 (see `DECISIONS.md`). Cowork authors story content directly in **`campaign.js`** (committed, public, loaded like `data.js`) — edit, commit, it appears. No server, no fetch.

- ✅ **Phase 0 — safety net & docs.** `window.RAH` export + guarded boot in `app.js`; hero math shared with the DM OS.
- ✅ **Phase 1 — shell + folder tree + story feed.** Three resizable/collapsible columns, nestable folders (folders *are* documents), continuous "Scrivenings" feed, typed docs with template fields, `[[wikilinks]]` with hover-peek, conflict-safe merge, Export/Import, print. **Passcode is `bugbear`** (top of `dmos-boot.js`).
- ✅ **Structure + simplification.** `index.html` is the RH main page (hub); DM OS link removed from the builder; campaign moved to `campaign.js`; server/launcher deleted.
- 🔨 **Sidebar B — "At the table" rail (2026-07-09).** Not tabs in the end — one unified **initiative roster**: player heroes + NPCs + creatures in a single drag-ordered list that IS the turn order, with a round/turn cursor, per-row init number, "sort by init", and **per-row HP** (auto-filled for creatures from their page and players from computed HP; a damage/heal editor with clamping). ✅ **Players pulled from the real shared party** via a campaign-code field (Firebase/RAHSync). Click a name → scrollable stat card; hover → quick-preview. Still ⬜ **Lookup** (creatures, companions, spells, glossary).
- ✅ **Notebook + Quick Note (2026-07-08).** A **Notebook** in the left sidebar with its own sections (its own organization files), separate from Story Folders; notebook notes open and edit in the center feed like any doc. A **Quick Note** tool opens a floating pad (with a date box) that never navigates you away and persists until you Clear it. File the whole pad *or* a highlighted piece into a chosen section (new note) or an existing note (append, with a dated separator). **Clear** prompts to file first if there's unfiled text. Built on the existing document store (reserved `nb_root`), so notes get editing/links/backup for free.
  - ✅ *App-wide keyword search* (Search tool / Ctrl+K) — a modal palette over every doc's title/fields/body, story **and** notebook, with highlighted matches (2026-07-08).
  - ✅ *Drag-reorder* tree items by a ⠿ handle (siblings only), so a click can't start a drag; ✅ *File selection* is a copy, not a cut; ✅ the "+ New section" flow is an inline field, and no DM-OS action uses a native `prompt` anymore (2026-07-08).
  - ✅ *Folder management* (2026-07-08): parent (top-level) folders now show a distinct tome icon vs child folders; a ＋ on the Story Folders header adds a **parent** folder or a doc at root; a ＋ on any folder adds a subfolder or doc **inside** it (via a popup menu, no native prompts); "New folder"/"New document" left the Tools list. Drag now **reparents** — drop onto a folder's middle to move an item in, or between rows to reorder (works across folders). **New workspace** (Tools) backs up and blanks the workspace (`autoSync` flag stops a reload from re-seeding `campaign.js`), giving Export/Import real use.
  - ⬜ *Follow-ups:* a "today's notes" quick view. Minor: reordering/moving a *story* doc records a local overlay, so it shows an "edited" badge and would conflict on a Cowork re-push — harmless, but tidy up if it annoys.
- ⬜ **NPC stat blocks + quick-generate** 🟢 *(Joby, 2026-07-09).* The NPC template (`DOC_TYPES.npc`: looks / wants / voice / secret) has **no room for combat stats**, so an NPC who might fight has nowhere to hold HP/AC/attack — and a stat block Cowork generates behind the scenes (in `campaign.js`) has nowhere to land in the OS either. Add a **stat-block space to the NPC template** (HP/AC/attack/etc., the way the creature type already has), so the DM can fill it in-app *and* a Cowork-authored block has a home. Plus a **Quick-generate** button that drops a menu — **Normal / Heroic / Legendary / Epic** — and fills tier-appropriate stats for the DM to tweak. (Bonus: once NPCs carry HP, the initiative roster auto-fills their HP like creatures do.)
- ⬜ **Roster HP sync on generate** 🟢 *(Joby, 2026-07-09).* When an NPC/monster's stats are quick-generated (or edited) and that creature is **already on the initiative roster** (a `kind:'doc'` entry referencing it), auto-fill/update its HP tracker box to the new max. Today the roster snapshots HP at add-time, so generating stats after adding leaves the tracker blank. Sync the doc's `hp` → the roster entry when they're linked.
- ✅ **Story flow chart — now an authoring surface (2026-07-09).** A **Story map** in Tools → its **own full-viewport board** (the `#dmosMap` root, NOT a floating dialog), showing every non-folder story doc as a card, wired by the links already on the docs: **`leadsTo`** entries become solid, arrow-headed, labelled edges (coloured by kind — *leads to* green / *alternative* gold / *knows* blue), and **`[[wikilinks]]`** become thin dashed "mentions" edges (skipped when a stronger `leadsTo` already joins the pair). Auto-layout is **flow-directed swimlanes**: one horizontal band per Act (top-level folder), and within a band cards flow left→right by `leadsTo` depth with a barycentre row-sort so edges run *beside* cards, not through them.
  - **Authoring (edits flow straight to the store, so they appear in Story Folders too):** **right-click a card** → *Connect to a card…* (a searchable picker with kind Leads-to/Alternative/Knows + an optional label; writes a `leadsTo` onto the source doc), *New card it leads to…* (creates a doc beside it and links it), *Open*, *Rename*, *Unlink: X* per existing link, *Delete* (→ Trash). **Right-click the board** → *Add a card here* (type menu) — the new doc is filed under whichever **Act band** was clicked and placed where you clicked.
  - **Navigation/UX:** **drag** a card to rearrange (position persists per-browser in `rollAHeroDmChart` via `getChart`/`setChartPos`/`clearChart`); **click** a card to jump to it in the feed; **drag the board** to pan; **zoom** with the toolbar −/Fit/+ or Ctrl/⌘-wheel; **Reset layout** snaps back to auto; **Esc**/**Done** closes. A dangling `leadsTo` shows a ⚠ on the card + a header count instead of a broken edge. Derived fresh on every (re)paint, so it can't drift from the story; its right-click menus/pickers live in `#dmosModal` and overlay the board (z: map 48 < modal 50). Files: the *Story flow map* section of `dmos-ui.js`, styles under *Story map* in `dmos.css`, the `#dmosMap` root in `dm.html`, the `flow` icon in `icons.js`.
- 💤 **Review inbox — dropped.** Was going to stage Cowork pushes for approval. Moot now that content lands via `campaign.js`; if unsure where a doc goes, Cowork asks in chat. `mergeIncoming()` still keeps the DM's edits safe across re-pushes.

## Big rocks (major efforts)
- **Living characters — leveling up** 🟠 — ⭐ deferred by Joby 2026-07-08: *"we can work on that when the time comes for them to actually need to level up."* Let a saved hero advance past level 3.

  **The foundation is already built** (2026-07-08) — don't rebuild it:
  - Heroes carry their own `level`; HP math and the companion's HP (`4 × level`) already read from it.
  - `requirements(snap)` returns every choice a hero owes, and **each requirement is tagged with the level it unlocks at**.
  - The Edit/review screen already surfaces new requirements automatically — proven when the Beast Master companion requirement appeared and existing rangers instantly showed "⚠ Needs 1 thing" with no migration.

  **Three things remain:**
  1. **A per-level gains table** — what each class gets at 4, 5, 6… (the real work). Blocked on the open question below.
  2. **A "What's new at level N" panel** — the review screen shows what a hero *owes*, not what it *gained*. Automatic gains (more HP, extra spell slot, Extra Attack at 5) aren't choices, so they'd never appear as requirements. Players would level up and see nothing.
  3. **A "Level Up" button** — nothing can actually change `level` yet.
- **Connect DM ↔ players** ✅ decided → now the **Active now** effort above. The dream where your campaign can see your players' characters. Unblocked 2026-07-07: we're adding a small backend, local-first.
- **Private DM area / accounts** 🟠 — flagged by Joby 2026-07-07. Right now *anyone* who opens the site can reach the DM view, and any known campaign code can be read. Add a real gate: the DM signs in (Google/email via Firebase Auth) and Firestore rules restrict a campaign's reads to its owner (+ maybe a members list). Fine to stay open for a family table today; needed before this becomes more than that.
  - **Sub-item, deferred by Joby 2026-07-08 (the "remove your own hero" caveat):** a shared hero can only be *deleted* by the exact anonymous browser session that shared it (`firestore.rules`: delete needs `ownerUid == auth.uid`). So the DM can't truly delete a hero shared from another device — including their *own* hero shared from their player browser. **Shipped workaround:** the DM party "Remove" now hides such a hero from the DM's view locally (`rollAHeroDmHidden`, reversible via "Show N hidden"). The real fix is a "campaign owner" concept in the rules so the DM can delete anything in *their* campaign — which lands naturally with this Private-DM-area work.

## Smaller / anytime

- **Save & manage multiple characters** 🟢 — the welcome screen already lists saved heroes; polish renaming, duplicating, and deleting.
- ~~**Export / import a character**~~ ✅ done (2026-07-07) — per-hero **Export**, **Back up all**, and **Import** (merges, never deletes).
- **More starting options** 🟢 — more backgrounds/personalities, a fun name generator, optional alignment.
- **Spell & feature polish** 🟢 — keep expanding the curated spell lists; small wording passes.
- **Accessibility & mobile pass** 🟢 — double-check it's comfy on a tablet/phone and screen-reader friendly (kids may use tablets).
- **"How to be a DM" primer** 🟢 — a friendly beginner's guide for whoever runs the game, matching the player primer.

## Tooling / housekeeping

- **Automate cache-busting on updates** 🟢 — today we bump the `?v=` version by hand in `index.html` when JS/CSS changes (currently at **v=9**) so players get updates; could automate it so it's never forgotten. ⚠️ Gotcha: `?v=` only busts the CSS/JS — the browser also caches `index.html` itself, so after deploying you need a **hard refresh** (`Ctrl+Shift+R`) to see changes. This bit us on 2026-07-07.
- **A light test pass** 🟢 — a few automated checks so future changes don't quietly break the generator (HP/AC/spell-slot math, the quiz, save/load).

---

## To do / Needs addressing
*(Raw notes — not yet triaged.)*

- ✅ Settled (2026-07-07): add a small backend, local-first. See "Active now" above and `DECISIONS.md`.
- Does leveling need real higher-level rules baked in (more PHB data per class), or stay simplified like the rest of the app?
- ~~Where should DM tools live — same app with a "DM mode" toggle, or a separate companion page?~~ ✅ Settled (2026-07-08): **a separate page**, `dm.html`, in this repo. See `DECISIONS.md`.

---

## Recently done (so you can see momentum)

- ✅ **Ranger flavor gaps closed** — Favored Enemy (14 types) + Natural Explorer (8 terrains) via a new class-level `choices` mechanism; picks show on the sheet, cheat sheet, and write-up (2026-07-08)
- ✅ **DM: "Read the party's stories"** — every shared hero's personality, motivations, and backstory on one page for campaign prep (2026-07-08)
- ✅ **Edit screen labels** — rows now say what they *change* ("Name, personality & backstory") not just what's *missing* (2026-07-08)
- ✅ **Full write-up on-site** — the complete hero readable in the app (stats, full ability/spell text, companion, gear, daily uses) plus the player's own story, which had never been displayed anywhere (2026-07-08)
- ✅ **Beast Master companions + requirements engine** — 42 animals, a filtered/searchable picker, and a one-click **Edit / review** screen that autodetects what a hero is missing. Hunter's Prey fixed for free by the same engine. Per-character `level` field added, so leveling up is now a data change rather than a rewrite (2026-07-08)
- ✅ Saved-hero row: Open / Share / Export / Delete now sit on one line (2026-07-07)
- ✅ DM party view: **View** opens the hero's real character page (printable) instead of jumping to the print dialog; added **Remove** so the DM can clear a shared hero (also cleans up orphans) (2026-07-07)
- ✅ Sharing UX pass — per-hero **Share** dialog (remembers your name, pick an existing share page or make a new one, multi-campaign ready), explicit **Unshare**, and **Delete now also removes the shared copy**. Dropped the clunky "Share & back up" box; Import is a small button. Verified server-side (2026-07-07)
- ✅ Character sharing MVP — Firebase backend, local-first: Export/Import backup, Share-to-campaign, and a DM party page. Verified end-to-end (2026-07-07)
- ✅ Shipped & deployed live to a public link (2026-06-24)
- ✅ Daily Uses tracker — printable checkboxes for spell slots & limited-use features (2026-06-29)
- ✅ Grew to 8 classes + 9 races, each with specialties
- ✅ Printable character sheet + per-player cheat sheet + How-to-Play glossary
- ✅ Playstyle quiz with suggestions & reshuffle
