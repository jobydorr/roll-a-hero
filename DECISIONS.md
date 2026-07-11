# Roll a Hero — Decisions Log

*What this is:* a short record of the important calls we made and **why** — especially the moments the project changed direction. A pivot is never "lost": come back here to see what we were thinking.

*Newest first. Last updated: 2026-07-11.*

---

### 2026-07-11 (latest) — A DM craft reference, and the rule for how to read it

**What we did.** Ingested 20 YouTube sources on world-building, campaigns, NPCs, monsters, dungeons, combat, travel and prep, and distilled them into **`DM_CRAFT.md`** (~29k words) — the standing brief for building and running our games. Then built **`DM_CRAFT_QUICK.md`**, a short router card.

**The problem it solves.** A 29k-word reference is useless if loading it costs ~40k tokens every time we want to invent a town. So the two files have strictly different jobs:

- **`DM_CRAFT_QUICK.md` is a *router*, not a summary.** It holds the laws, the build sequences, a **symptom→section triage table** (~45 symptoms → the exact section that fixes each), and the fillable templates. It's ~4k tokens and most prep can be done from it alone.
- **`DM_CRAFT.md` is opened one section at a time**, at whatever the card names. **Never end-to-end.** That's an ~800-token lookup instead of ~40,000.

**Why a router and not a summary.** A summary would throw away the worked examples — which are the actual value — and still be long. A router *increases* the big doc's usefulness instead of competing with it, because it tells you *when* to go deep and *where*.

**Two rules that keep it healthy:**
1. **`DM_CRAFT.md` is the source of truth.** The card contains nothing that isn't in the big doc; if they disagree, the big doc wins. If we ingest more sources, the card needs a sync pass.
2. **⚠️ The craft docs guide the GAME, not the APP.** `DM_CRAFT.md` is a craft reference for world-building and running sessions. It is **not** a source of feature ideas for the DM OS, and must never be mined for `BACKLOG.md` entries. App features get raised by Joby, separately. *(This corrected a first pass that did exactly that.)*

**Where the pointers live.** `CLAUDE.md` (auto-loaded every session), `COWORK_INSTRUCTIONS.md` (the version-controlled copy of the project instructions), and `README.md`.

**⚠️ REVISED, same day — the reference is NOT auto-consulted.** The first version of this made sessions read `DM_CRAFT_QUICK.md` before building any game content. **We reversed that.**

**Why.** A standing order to consult a framework before every creative task is a machine for producing formulaic output. Even with the "net, not a mould" wording, the pull is toward *checking boxes before having an idea* — and the reference is only useful *after* there's something to check. The risk isn't that it gives bad advice; it's that **reaching for it reflexively makes every town, villain, and dungeon come out the same shape.**

**What replaced it.** The standing order in `CLAUDE.md` is now a **brainstorming posture**, not a routing rule: *the first idea is almost always the trope — go past it. Don't recycle. Vary the shape, not the paint. Avoid formula and standardization unless it buys something real for the task at hand. Follow the weird thread. Specific beats generic. Kid-safe ≠ bland.* Plus the tell that we've drifted: **the content is fine, hits all the marks, and is completely forgettable.**

**The craft docs are now pulled, not pushed.** Joby points at them when he wants them. They remain excellent as a **diagnostic** — the triage table maps ~45 symptoms ("combat feels like maths," "players don't care about the world") to the section that addresses each. That's the use that can't homogenise anything, because it only fires when something is *already* wrong.

---

### 2026-07-11 (later) — Campaign One, revision two: banished zones, and the thing in the middle
Two rounds of stress-testing broke the first draft. The fixes below are canon and **load-bearing**; the reasoning is here so nobody "simplifies" one of them back out.

**Joby's fix: put the danger in the propaganda.** My first draft *removed monsters from the Fold* to protect the Act 3 reveal — a coward's fix that also starved the campaign of things to fight. Joby's version is better and does it properly: the Fold openly walls off the wild places into **banished zones**, and everyone knows unfolding lets the monsters out. So when a player asks *"don't the monsters come back?"* the answer is **yes, obviously, it's on the leaflet** — the question is asked, answered, and closed, and nobody digs further. **The Devouring hides behind a satisfying answer, not behind a blank space.** That's the whole misdirection, and it's sturdier than an omission. It also hands us the encounter engine: **portals lead into the zones**, so the zones *are* the dungeons.

Corollary, now a rule: **every Devouring seed must have a satisfying wrong answer available.** The first draft's seeding method (a word he won't finish, a fear he won't name) was three blank spaces in a row — exactly the pattern a sharp player reads as *there's a second thing in there*. He now speaks **complete sentences the party misreads.**

**Propaganda is now three claims** — unlimited power (starsalt), permanent safety (the zones), and **control** (he can *wrinkle* the world shut: pinch a road, seal a town). The third is the stated crime, and it answers *"why did he do it, and why then?"* completely — he seized the world the moment his machine was finished. A decoy has to answer that or Act 1 leaks.

**The Surveyors were his allies, not usurpers** (Joby). They helped fold the world and knew what it was for. They stopped him from undoing it — *and were not entirely wrong to* — then noticed the starsalt was a fortune and the world easier to hold if its architect were a monster. **The founders knew about the Devouring; the current leadership has inherited the rule without the reason** and reads the sealed warning as their own predecessors' propaganda. That's what keeps the reveal sealed for two acts, and it buys a hell of a beat: in Act 3 the party shows the Surveyor leader the proof and **he goes white**, having laughed at that warning his whole life. And it gives the Foldwright a real flaw — he tried to undo the Fold **for her**, knowing what it might release.

**The two problems that would have killed the campaign at the table, and the one idea that fixed both:**

1. *"Why don't we just stop burning starsalt?"* The chain (burn → world weakens → creases loosen → breaches) made the fix a **lamp ban, not an apocalypse.** A clever kid proposes rationing in session three and is *right*. "The Fold is failing regardless" was asserted, never earned.
2. *Unfolding is indefensible.* The heroes' plan was to deliberately release every monster on earth at once — a thing everyone knows from day one. Two adults and two kids reasonably say **"absolutely not."** "On purpose, prepared" is meaningless while nobody can say what *prepared* looks like.

**The fix — the geometry.** Fold a sheet with something eating in from one edge, and that edge ends up **buried in the middle, wrapped in layers of world.** The Fold never built a wall; it used the world's own body as padding. **The banished zones are the layers. The Devouring is in the innermost crease, still chewing outward.**
- The Fold is failing **because something is eating it.** No lamp ban saves you; burning starsalt only thins the layers faster. (Rationing = "good idea, helps, not enough, and nobody with the power will do it.")
- The **breaches are it** — that's why they worsen, and everyone blames the wrong man.
- The Devouring gets a **location and a clock** a nine-year-old can hold, and the journey gets a **direction**: each portal goes one layer deeper, *toward* it. The last zone is where it lives.

**And it makes the mission defensible — this is now the spine of Acts 2–3.** The wall is coming down either way. *Do nothing* and it snaps at once, into a world with no warning. *Unfold on purpose* and you go through the portals **one at a time**: get the lost people out, learn the land and what lives in it, find the old ways of fighting it, mark the door. Then the world comes undone into a world that **knows what's coming.** Kid version, say it out loud at the table: **"The wall is going to fall. We can be standing there ready — or asleep in bed."** Every region now has a *point* (rescue, scout, prepare) instead of being a checkbox.

**Starsalt physics, corrected.** The old draft said starsalt was destroyed by *burning* but harvested harmlessly — which contradicts itself, and would mean the Surveyors' mines are already enormous public dead zones. **They are, and that's the point.** Starsalt is destroyed by being **taken out of the ground and spent**. **The seams *are* the mines**, everyone can see the grey, and everyone has been told it's *"the Foldwright's blight."* So the Act 1 reveal isn't "there's a dead zone" — it's **"the dead zone is the mine"** — same decoy trick as the monsters. And the party learns it **with their own hands**, cutting raw starsalt for the Compass Spirit and watching the ground die under their fingers. Every direction costs a grey handprint.

**Two smaller fixes:** **wrinkles cost starsalt, a lot** (otherwise the Surveyors would simply box the party in every session), and **portals cannot be destroyed** — they *are* the creases, so the Surveyors can only hide and fence them, which is why they've never removed the problem. **The finale must be a fight with a describable Devouring**, not an abstraction and not a conversation; talking the Foldwright down is a *scene*, not the climax. This table has spent twenty sessions swinging swords.

### 2026-07-11 — Campaign One is *The Folded World* — foundation locked (see `CAMPAIGN.md`)
The first campaign's premise, factions, twists, and act structure are settled after a long brainstorm. The full bible lives in **`CAMPAIGN.md`**; this entry records the *choices* and, more importantly, **why** — because several of them look arbitrary until you see the trap they were dodging.

**The premise: the villain already won.** Joby's instinct, and it's the whole spine — the world opens in the aftermath. A mapmaker, **the Foldwright**, folded the world like a paper map. Heroes must set it right. Travel/journey is the campaign's shape. Tone: Dune + Harry Potter, a splash of Pokémon; no princess-rescuing.

**The design problem we spent the whole session solving — and the fix.** We want a late reveal that *the thing the Fold protects against is the real enemy.* That reveal dies instantly if the public reason to keep the Fold is **safety**, because safety implies a known danger. So the Fold's public benefit **cannot be protection**. It has to be good, and entirely self-contained.

- **The fix: the Fold makes `starsalt`.** The creases wring a glowing substance out of the land — it lights, warms, mends. The folded world is *closer, safer, and richer than it has ever been.* People love it for **prosperity**, not protection. Nothing about monsters. Reveal sealed.
- **And starsalt is the world's life being squeezed out.** Slow (a lifetime, not a season), visible only at the fenced-off **seams**. That's the hidden cost, it's kid-legible, and it means the pleasant world is genuinely damning without looking broken. Joby's constraint drove this: *"a world that is visibly deteriorating is hard to justify as a big bonus."* Correct — so it isn't visibly deteriorating.
- **The Foldwright stays the assumed villain** on the strength of what the Folding *cost*: cities crushed, towns erased, people dead. Propaganda says he did it out of greed, to hoard starsalt. That yields the sentence the whole campaign hangs on: *"A monster did a terrible thing to us. But the world it left behind is nicer, and we've built our lives on it."*

**The two-faction twist (Joby's, and it's the best structural idea in here).** The **Surveyors** (establishment; manage the Fold, hide the portals, broker starsalt) and the **Stillguard** (a loud "resistance" that says the Fold is unsustainable and the Foldwright is a monster) are **the same organization.** The Stillguard exists to absorb dissent — it recruits anyone who senses something's wrong and sends them on missions that go nowhere.

This **retired an earlier, weaker design** where the establishment *suppressed* the truth about the decay. Suppression is fragile; secrets leak. Outsourcing the alarm is sturdier and nastier: the decay is *publicly acknowledged* and therefore permanently parked — *"yes, terrible, the Stillguard are handling it."* Keep it this way. **Rank-and-file Stillguard are sincere** — the rot is only at the top, which buys us sympathetic enemies and future allies.

**The Foldwright's truth, in the order the table learns it:** (1) the world is being eaten; (2) he wasn't greedy — he folded the world to shield it from something, and lost the person he loved in the creases; (3) the thing he was shielding against is real, and unfolding lets it back in. He becomes an **ally**, and the **Devouring** becomes the final enemy. He was *not* driven out publicly — everyone believes he still rules, which is precisely what keeps anyone from noticing the Surveyors actually do. He's been in hiding, searching the folds for her.

**Why he's both help and hindrance (and it isn't a cheat):** he *wants the portals opened* — she's in there — and *dreads the final Unfold* — it's out there. Both, genuinely. That's why he's unreadable for two acts.

**Mechanics locked:** the **Compass Spirit** (a shy companion that unfurls into a projected compass rose) **drinks starsalt** to give the next direction, and its directions are **riddles**. So every leg of the journey is: win starsalt from the dangerous seams → feed the spirit → decipher the marker. Once the party learns what starsalt *is*, every direction they buy costs the world a little — the moral weight is built into the core loop. **The Unfold Rule:** open a portal and travel through it to unlock a region; **no region unfolds until all are unlocked**, then the world unfolds at once. Justification a kid accepts immediately: a folded sheet tears if you pull one crease while the others are set — **demonstrate it at the table with a real paper map.**

**Deliberately unsettled:** the **Devouring** is unnamed and undescribed on purpose — it's the last card, and it must be seeded only in ways that make sense in hindsight. Nobody in the world knows it exists, *including the Surveyors*.

**Then we stress-tested it, and it nearly fell over.** A skeptical read found leaks that would have killed the Act 3 reveal by session two. The fixes are canon now, and the ones below are **load-bearing — don't quietly undo them:**
- **The Fold folded away *distance*, never *monsters*.** The first draft said the wild places "and the monsters in them" were folded away. Combine that with "the world unfolds all at once" and a ten-year-old deduces *"so unfolding brings the monsters back"* — the Act 3 twist, free, in session one. Monsters still exist everywhere in the world; they simply have nothing to do with the Fold.
- **Starsalt is destroyed by *burning* it — the Fold only pressed it to the surface.** The draft said both "the creases squeeze it out" and "every lamp burns a piece of the world," which can't both be true: if the folding does the damage, burning is harmless and giving it back accomplishes nothing. Now: the Fold opened the wound, **burning is the bleeding**, and unburned starsalt is *reabsorbed when the world unfolds*. That is what makes the finale a real choice — *unfold, and everyone gives up the lamps* — instead of a switch.
- **The propaganda blames him for *pride*, not starsalt-greed.** Starsalt didn't exist before the Fold, so "he folded the world to hoard starsalt" is a story that collapses the moment a clever kid checks the dates — and the crack leads straight to Act 2. He folded it to *remake the world and rule it*.
- **Act One's turn is the betrayal + the mechanism, not "the world is dying."** The Stillguard *shout* that the world is dying at every rally, so it can't be a revelation. What's new is what starsalt *is*, and who the Stillguard *are*.
- **He can't do it himself, and now there's a reason.** He cannot walk in the world (most hated face alive), and **the Compass Spirit will not serve him** — it fled its maker and slept a lifetime rather than answer him. It woke for these heroes. He can only follow.
- **The Compass's starsalt cost is local and visible**, not an abstract share of a global total (which is a rounding error next to every lamp in the world, and the kids would say so). They cut it **raw from a seam with their hands, and the ground dies where they cut, in front of them, permanently.**
- **The Foldwright hides in the *creases*** (the unreachable folded interior) — *not* the seams, where the party harvests every leg. Otherwise they trip over him constantly in Act 1, and his dread is a signpost reading "something is out there."
- **Unlock ≠ unfold, and the prop has to show it.** Put a **seal** on every crease of the paper map. Unlocking a region takes its seal off; the map stays folded. The kids watch the checklist shrink and never once ask *"wait, is it unfolded now?"*
- **Act One needs a clock a nine-year-old can feel.** "The world dies in a lifetime" motivates nobody. A **seam is eating a place they love, this season, with people who have names.**
- **The top Surveyors get a real self-justification** (they were cartoon-villainous otherwise, which breaks our own "every faction is partly right" rule). Their best argument is also *true*: unfolding costs real people real warmth *today*, to save a world nobody alive has seen. The heroes have to actually answer that.

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
Twelve official 5E PDFs (Player's Handbook, DMG, Monster Manual, Xanathar's, Tasha's, Volo's, Mordenkainen's, Sword Coast, Ravnica, Eberron, Elemental Evil, Tortle 