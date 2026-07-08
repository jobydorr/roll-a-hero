# Roll a Hero — Decisions Log

*What this is:* a short record of the important calls we made and **why** — especially the moments the project changed direction. A pivot is never "lost": come back here to see what we were thinking.

*Newest first. Last updated: 2026-07-08.*

---

### 2026-07-08 — Simplify: an RH main page, and the campaign is a committed file (no server)
Joby's words, after previewing: *"All I wanted was a separate set of pages I can access from the front page… is this really the easiest way?"* It wasn't, and this entry **supersedes** the two below it (the gitignored `campaign/` folder and the loopback-bound local server). The mistake was mine: Joby said the campaign should be *private*, and the only thing they meant was **a player shouldn't be able to reach the DM OS from the character builder.** I heard "hidden even from someone reading the code," and that stricter reading is what forced files-fetched-over-a-server, which forced the launcher, which forced the loopback fix. All of it, gone.

**What we settled instead:**
- **Naming.** The landing page is the **RH main page** (a.k.a. *roll a hero main page*). The **hero builder** and the **DM OS** are the two things you reach from it. Use these names.
- **`index.html` is the RH main page** — a hub with two doors (*Build a Hero*, *Dungeon Master OS*). The DM OS link was **removed from inside the builder**, which is the whole of Joby's privacy requirement: a player in the builder has no path to the DM OS. The passcode on `dm.html` is the gate; that's enough for a family table.
- **The campaign lives in `campaign.js`, committed and public, loaded by a `<script>` tag exactly like `data.js`.** Content we build in Cowork lands there — edit, commit, done — the same way a new spell lands in `data.js`. Joby was explicit: *"I dont care at all about anyone digging through the code."* So there is nothing to hide at the file level, and therefore **no fetch, no server, no launcher, no `file://` problem.** The live site works; double-clicking `dm.html` works. Deleted: `serve.py`, `start-roll-a-hero.cmd`, the `campaign/` folder, the `campaign/` gitignore block; `.claude/launch.json` is back to plain `python -m http.server` (for local dev preview only — nobody needs it to *use* the app).
- The DM's own edits inside the workspace still live in `localStorage` and are layered over the committed base by the existing merge rule, so re-pushing `campaign.js` never clobbers their notes. Verified: a local edit survives a re-sync.

The lesson worth keeping: **when a non-technical requirement ("private") drives a heavy technical design, restate it in plain terms and check it before building.** One clarifying question here would have saved three turns.

### 2026-07-08 — The local server binds to loopback, and there's a launcher *(SUPERSEDED — see above)*
*Kept for the record. The server, launcher, and gitignored `campaign/` folder described here were all removed once the campaign became a committed `campaign.js`. The loopback-binding lesson still stands in principle, but there is no longer a local server that serves private content.*

Two problems, one file. **The launcher:** the DM OS can't be opened by double-clicking `dm.html` — browsers refuse to let a `file://` page read its own folder, so it could never load `campaign/`. That made "start a server" a prerequisite for every session. `start-roll-a-hero.cmd` → `serve.py` now does it in one double-click.

**The hole it closed, which matters more.** `python -m http.server 8000` binds **every network interface** by default. Verified on this machine: while the server ran, `http://192.168.1.213:8000/campaign/docs/` served a full directory listing and every story file to *anything on the home Wi-Fi* — the kids' tablets included. They'd never even load `dm.html`, so the passcode was irrelevant. We had carefully gitignored `campaign/` to keep the story off the internet while leaving it wide open on the living-room network.

`serve.py` binds `127.0.0.1`, and **`.claude/launch.json` runs the same `serve.py`** (with `--no-browser`) rather than its own `python -m http.server`. One implementation, no drift: a fix applied to one launch path and not the other would have been worse than no fix, because it creates confidence without protection. **Do not "helpfully" restore the default bind** to preview from a phone — that re-opens the hole. If you ever genuinely need LAN access, move the campaign out of the served directory first.

Three details that cost real debugging, so they're written down:
- **Find the interpreter, don't assume `python`.** Explorer launches the `.cmd` with the *saved* PATH, which on this machine has the Python Launcher (`py.exe`) but **not** `python.exe`. A shell has both, so a launcher tested only from a shell reports "Python isn't installed" on a machine that plainly has it. The `.cmd` tries `py -3`, `py`, `python`, `python3` and **proves each runs** — `where` also finds the WindowsApps stub that exists, resolves, and does nothing but offer to open the Microsoft Store.
- **`ThreadingHTTPServer`, never `socketserver.TCPServer`.** Single-threaded serving handles one connection at a time; a browser opens several and holds them, so the next request hangs forever and the app appears to freeze. This is why `python -m http.server` itself switched to threading in 3.7.
- `serve.py` sends `Cache-Control: no-store`, retiring the manual hard-refresh ritual for local work. The `?v=` tags in the HTML still matter for the *deployed* site.

### 2026-07-08 — DM tools live on their own page (`dm.html`), and the campaign is never published
This settles the open question that sat in `BACKLOG.md` for a week: *"Where should DM tools live — same app with a 'DM mode' toggle, or a separate companion page?"* **Answer: a separate page in the same repo.** Three reasons:
- **The player app stays kid-simple.** `app.js` is already 1,783 lines; a workspace would double it, and a kid clicking around the character builder could stumble into the DM's spoilers.
- **The shapes are incompatible.** The builder is a single centered column that wipes `#app.innerHTML` on every step. The DM OS is a persistent three-column workspace with drag state, a floating notes window, and live text selection — it needs an inverted render model (delegated listeners, keyed subtree reconciles) that the builder neither needs nor wants.
- **Privacy comes free.** `dm.html` reuses `styles.css`, `data.js`, `icons.js`, and `firebase-sync.js`, but the *campaign content* lives in a **gitignored `campaign/` folder** that never reaches GitHub Pages.

**The passcode on `dm.html` is a curtain, not a vault — and that is on purpose.** Anyone can View Source and read it. It is not the security boundary. **The security boundary is that `campaign/` is gitignored**, so a stranger (or a curious 10-year-old) who gets past the passcode on the live site sees an empty workspace and a `campaign/manifest.json` that 404s. There is nothing there to find. *Do not "fix" this by adding real auth* — you'd break the DM's local workflow and protect nothing that isn't already absent. If the DM ever needs the campaign on a second device, that's the moment to revisit (encrypted files, or Firebase behind a real login), not before.

Two consequences worth writing down:
- **Two data flows, never conflated.** Player data flows **in, read-only** — the OS calls the existing `RAHSync.listCampaign()` to see the party's shared heroes. Player HP the DM tracks during a fight lives only in the DM's tracker and **never writes back** to a player's hero. Story data flows **nowhere**.
- **`dm.html` borrows the hero math rather than copying it.** It loads `app.js` for a new `window.RAH` export block (and `app.js`'s boot is now guarded by `if (document.getElementById('app'))`, since `dm.html` has no `#app`). Copying `computeHP`/`computeAC` would mean the initiative tracker eventually shows a different AC than the player's printed sheet — at the table, in front of a 9-year-old. ⚠ `withState()` is **sync-only** (`try/finally`): hand it an `async` function and it restores `state` at the first `await`, then silently computes the wrong hero.

### 2026-07-08 — A requirements engine drives completeness, editing, and (later) leveling
Rather than bolt on an "edit character" screen, we added **one declarative `requirements(snap)`** that returns every choice a hero still owes, each tagged with the level it unlocks at. Everything reads from it: the ⚠ badge on the saved-hero list, the Edit screen's "Fix this →" jumps, and `classComplete()`. **When leveling arrives, new requirements simply appear at higher levels and the same screen points the player at them** — leveling becomes "satisfy new requirements," not a separate system. Two enabling model changes: a per-character `level` (replacing the hardcoded global in HP math) and `archetypeChoice` (mirroring the proven `race.choice`). A `normalize()` pass backfills both on load, so heroes saved by the old app open without error.

### 2026-07-08 — Animal companions: PHB rules, hand-curated stats, three tiers
The Beast Master roster is **every Beast the rules allow** (Challenge 1/4 or lower, Medium or smaller) — 42 animals. Two calls worth remembering:
- **The Monster Manual scrape is not trustworthy.** Its stat blocks are two-column and the OCR bleeds adjacent creatures together — it "gave" the frog a +9 attack and the hawk a piranha's Blood Frenzy. Name / size / speed / AC sit on fixed lines and extracted cleanly; **attacks and tricks were hand-curated.** If anyone re-derives this data, don't trust an automated scrape.
- **Three tiers, not 42 stat lines.** `fierce` (+6, 1d6+4), `swift` (+6, 1d4+3), `gentle` (no attack — the card says so plainly, so a kid learns it before a fight, not during one). HP is `4 × level` **straight from the PHB's Ranger's Companion**, so it scales itself when leveling lands; the proficiency bonus is pre-baked into AC and attacks so nobody does arithmetic at the table.
- 42 choices would overwhelm a beginner, so the picker borrows the trick the app already uses for classes: **narrow first, browse second** — a "what do you want your friend to do?" filter, then the PHB's classic examples, then groups, plus search.

### 2026-07-07 — Character sharing MVP built on Firebase (compat SDK, anonymous auth, Firestore)
Implemented the sharing feature end-to-end and verified it against the live project. Technical shape, chosen to fit the app's no-build, `<script>`-tag style:
- **Firebase compat SDK** loaded from the gstatic CDN as plain `<script>` globals (not the ES-module build) — no bundler needed. Config is a global in `firebase-config.js`; `firebase-sync.js` exposes `window.RAHSync`. If the SDK/config can't load, the app **degrades gracefully to offline-only** (sharing UI hides; build/print/backup still work).
- **Anonymous Auth** gives every browser a stable id with no passwords/emails (kid-safe). **Firestore** stores shared heroes at `campaigns/{code}/characters/{ownerUid__charId}`, with the full local snapshot under `character` so the DM prints an identical sheet.
- **Local-first preserved:** `localStorage` stays the source of truth; Share only *publishes a copy*. New **Export/Import** (single hero or full backup) is the safety net and never deletes.
- **Security:** `firestore.rules` (in repo) — anyone signed in can *read* a campaign (so the DM sees the party; the campaign code is the practical gate), but you can only *write/delete your own* heroes. Still needs pasting into the console to replace "test mode."

### 2026-07-07 — Big question SETTLED: add a small backend (local-first) for character sharing
The open architectural fork is **decided: we're adding a small backend.** Joby wants easy sharing — one site where users make a profile, build characters, hit **Share**, and the selected characters appear on a **common page the DM can see**, ending the "friends have to send me a PDF" problem. That requires data to meet in a shared place, so we're adding a free backend-as-a-service (**Supabase** preferred; **Firebase** the alternative) while the GitHub Pages static site stays the frontend — no server for Joby to run.

**Guardrails locked in:**
- **Local-first — nothing is ever lost.** Each browser's `localStorage` stays the source of truth; the backend only *publishes a copy*. If the backend ever vanished, every hero still lives in its owner's browser and in exported files.
- **Existing characters are protected (the non-negotiable).** The **first** build step, before anything else, is **Export/Backup** to capture the two characters friends have already made. Migration is copy-out-then-up — never move, never delete.
- **Kid-safe.** No passwords/emails for kids — profiles are display names + a shared **campaign code**, invite-only, zero personal info collected.

**Phased plan:** (0) Export/Backup → (1) profiles + Share-to-campaign → (2) live DM party page.

**One human step pending:** Joby creates a free Supabase (or Firebase) project and pastes back the two keys (~5 min, one-time). Nothing else is blocked — step (0) can start immediately with no backend at all.

### 2026-07-07 — Official D&D 5E rulebooks are reference/inspiration, not canon
Twelve official 5E PDFs (Player's Handbook, DMG, Monster Manual, Xanathar's, Tasha's, Volo's, Mordenkainen's, Sword Coast, Ravnica, Eberron, Elemental Evil, Tortle Package) live in the repo root alongside the code and `.md` files. **How we use them:** as source material and inspiration — for stories, settings, factions, NPCs, monsters, and encounters — NOT as a rules catalogue to import wholesale. Our simplified system ("roll a d20, add your modifier, beat this number") stays the law of the land; these books supply the *spirit and flavor* of real D&D. When building campaign content, the project is encouraged to reach into them for ideas and then translate to our simplified mechanics. Note: the PDFs are large binaries sitting in the folder, so they don't show up in Cowork's "context files" sidebar — but they're readable from the repo anytime.

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
