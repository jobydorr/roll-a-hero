# Roll a Hero — Backlog

*What this is:* the running list of ideas and to-dos, so nothing gets forgotten. Reorder it freely — this is yours.

*Tags:* 🟢 can build anytime (fits today's browser-only app) · 🟠 bigger feature, needs design · 🔵 may need the "backend vs. browser-only" question answered first.

*Last updated: 2026-07-08.*

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

A Scrivener-style workspace, being built in phases. Shape settled 2026-07-08 (see `DECISIONS.md`); story content is authored with Cowork and pushed into the workspace through a **review inbox** that never auto-files.

- ✅ **Phase 0 — safety net & docs.** `campaign/` gitignored; `window.RAH` export + guarded boot in `app.js`; DM OS link on the welcome screen.
- ✅ **Phase 1 — shell + folder tree + story feed.** Three resizable/collapsible columns, nestable folders (folders *are* documents), continuous "Scrivenings" feed, typed docs with template fields, `[[wikilinks]]` with hover-peek, conflict handling, Export/Import, print. **Passcode is `bugbear`** — change it at the top of `dmos-boot.js`.
- ⬜ **Phase 2 — review inbox.** Cowork pushes land in a tray with a suggested folder + confidence + reasoning. Confident items pre-file; nothing merges without a click.
- ⬜ **Phase 3 — Sidebar B.** Tabbed rail: Initiative (one-click seed from an encounter, drag or type to order, HP/KO, survives a reload) · Party (live shared heroes) · Lookup (creatures, companions, spells, glossary).
- ⬜ **Phase 4 — notebook + floating fast-notes.** Dated entry log that cannot lose data; "Clear notes" empties only the window. Highlight → pin to notebook.
- ⬜ **Phase 5 — story flow chart.** Derived from beats + `leadsTo` links, so it adapts as the campaign grows. Drag to arrange; click a node to jump.
- ⬜ **Phase 6 — print.** Print a doc, a folder, or the initiative card.

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
