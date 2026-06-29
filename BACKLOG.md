# Roll a Hero — Backlog

*What this is:* the running list of ideas and to-dos, so nothing gets forgotten. Reorder it freely — this is yours.

*Tags:* 🟢 can build anytime (fits today's browser-only app) · 🟠 bigger feature, needs design · 🔵 may need the "backend vs. browser-only" question answered first.

*Last updated: 2026-06-29.*

---

## Big rocks (major efforts)

- **DM tools — plan & run campaigns** 🟠 — the near-term new pillar, for you as the Dungeon Master. Likely pieces (to be shaped): a campaign + session planner, an NPC list, a simple encounter/monster builder, locations/world notes, a party tracker, and an easy initiative tracker for running a fight. Same north star as the rest of the app — simple and friendly, not a spreadsheet.
- **Living characters — leveling up** 🟠 — ⭐ explicitly "later" (Joby's word), but the other headline. Let a saved hero advance past level 3: more HP, higher-level spells + more spell slots, ability-score bumps at the right levels, and the subclass features that unlock as they level. Edit and re-print the sheet anytime. Stays browser-only (the character lives in that person's browser); add solid export so it's never lost.
- **Connect DM ↔ players** 🔵 — the dream where your campaign can see your players' characters. This one likely needs the "backend vs. browser-only" question answered (shareable save-files vs. real accounts). Parked here until we decide.

## Smaller / anytime

- **Save & manage multiple characters** 🟢 — the welcome screen already lists saved heroes; polish renaming, duplicating, and deleting.
- **Export / import a character** 🟢 — save a hero to a file to back it up or move it to another device/browser (also the simplest first step toward sharing with a DM).
- **More starting options** 🟢 — more backgrounds/personalities, a fun name generator, optional alignment.
- **Spell & feature polish** 🟢 — keep expanding the curated spell lists; small wording passes.
- **Accessibility & mobile pass** 🟢 — double-check it's comfy on a tablet/phone and screen-reader friendly (kids may use tablets).
- **"How to be a DM" primer** 🟢 — a friendly beginner's guide for whoever runs the game, matching the player primer.

## Tooling / housekeeping

- **Automate cache-busting on updates** 🟢 — today we bump the `?v=` version by hand when JS/CSS changes so players get updates; could automate it so it's never forgotten.
- **A light test pass** 🟢 — a few automated checks so future changes don't quietly break the generator (HP/AC/spell-slot math, the quiz, save/load).

---

## To do / Needs addressing
*(Raw notes — not yet triaged.)*

- Settle the big question: browser-only + shareable files, or add a backend? (blocks "Connect DM ↔ players").
- Does leveling need real higher-level rules baked in (more PHB data per class), or stay simplified like the rest of the app?
- Where should DM tools live — same app with a "DM mode" toggle, or a separate companion page?

---

## Recently done (so you can see momentum)

- ✅ Shipped & deployed live to a public link (2026-06-24)
- ✅ Daily Uses tracker — printable checkboxes for spell slots & limited-use features (2026-06-29)
- ✅ Grew to 8 classes + 9 races, each with specialties
- ✅ Printable character sheet + per-player cheat sheet + How-to-Play glossary
- ✅ Playstyle quiz with suggestions & reshuffle
