# Roll a Hero — Backlog

*What this is:* the running list of ideas and to-dos, so nothing gets forgotten. Reorder it freely — this is yours.

*Tags:* 🟢 can build anytime (fits today's browser-only app) · 🟠 bigger feature, needs design · 🔵 may need the "backend vs. browser-only" question answered first.

*Last updated: 2026-07-08.*

---

## 🔴 URGENT — surface next session (flagged by Joby 2026-07-07)

Two players rolled **Beast Master Rangers** and the builder had no way to finish them. Address ASAP next session:

1. **Beast Master animal companion** 🟢 — the Beast Master Ranger needs a way to **pick an animal companion**, and the companion's stats must be **included on the character sheet**. Currently missing entirely — these two heroes are incomplete.
2. **"Edit character" feature** 🟠 — a way to reopen and update a saved hero, so the two existing rangers (and anyone else) can be updated with new additions like the companion. Not just create-once. *(Note, found 2026-07-08: a rough path already exists — **Open** → the finish page → **"← Make changes"** walks back through the builder steps and re-saves on finish. Assess whether that's sufficient or a proper editor is wanted, rather than rebuilding from scratch.)*
3. **Full character write-up viewable ON the site** 🟢 — the complete write-up should be readable in the app, not only in the printable PDF.
4. **Deep review of the character builder** 🟠 — audit the whole builder for other empty/missing/dead-end parts like the Beast Master gap (class/subclass features that have no UI to actually choose them). Surface a findings list next session; **do nothing now.**

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

## Big rocks (major efforts)

- **DM tools — plan & run campaigns** 🟠 — the near-term new pillar, for you as the Dungeon Master. Likely pieces (to be shaped): a campaign + session planner, an NPC list, a simple encounter/monster builder, locations/world notes, a party tracker, and an easy initiative tracker for running a fight. Same north star as the rest of the app — simple and friendly, not a spreadsheet.
- **Living characters — leveling up** 🟠 — ⭐ explicitly "later" (Joby's word), but the other headline. Let a saved hero advance past level 3: more HP, higher-level spells + more spell slots, ability-score bumps at the right levels, and the subclass features that unlock as they level. Edit and re-print the sheet anytime. Stays browser-only (the character lives in that person's browser); add solid export so it's never lost.
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
- Where should DM tools live — same app with a "DM mode" toggle, or a separate companion page?

---

## Recently done (so you can see momentum)

- ✅ Saved-hero row: Open / Share / Export / Delete now sit on one line (2026-07-07)
- ✅ DM party view: **View** opens the hero's real character page (printable) instead of jumping to the print dialog; added **Remove** so the DM can clear a shared hero (also cleans up orphans) (2026-07-07)
- ✅ Sharing UX pass — per-hero **Share** dialog (remembers your name, pick an existing share page or make a new one, multi-campaign ready), explicit **Unshare**, and **Delete now also removes the shared copy**. Dropped the clunky "Share & back up" box; Import is a small button. Verified server-side (2026-07-07)
- ✅ Character sharing MVP — Firebase backend, local-first: Export/Import backup, Share-to-campaign, and a DM party page. Verified end-to-end (2026-07-07)
- ✅ Shipped & deployed live to a public link (2026-06-24)
- ✅ Daily Uses tracker — printable checkboxes for spell slots & limited-use features (2026-06-29)
- ✅ Grew to 8 classes + 9 races, each with specialties
- ✅ Printable character sheet + per-player cheat sheet + How-to-Play glossary
- ✅ Playstyle quiz with suggestions & reshuffle
