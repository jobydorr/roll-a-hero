# Roll a Hero — Roadmap

*What this is:* the single place that tracks where this project has been, where it is now, and what's next. If a plan ever feels "lost in a directory," it should be here. Plain language; update it as things change.

*Last updated: 2026-08-27.*

> **▶▶ START HERE — 2026-08-27 (evening). This is the newest block; everything below it is history, including the earlier 2026-08-27 block.**
>
> **STATE:** working tree clean, `HEAD` == `origin/main`, everything pushed. Live asset versions on `dm.html`: campaign `v50`, dmos-ui `v45`, dmos-store `v17`, dmos-notes-sync `v1`, dmos.css `v32`. Joby runs from `localhost:8000` (`python -m http.server 8000`, or the `roll-a-hero` entry in `.claude/launch.json`).
>
> **⚠ READ FIRST, IN THIS ORDER:** `CLAUDE.md` → this block → the DM OS itself, starting at **`▶ THE FOLDED WORLD`** and **`Quick reference › ▶ THE PARTY`** → `STYLE.md` before writing any prose.
>
> ---
>
> **THE BIG CANON CHANGE THIS SESSION: THERE IS NO THRONE.** Joby ran session one without naming the Foldwright or presenting him as a ruling power, and rather than retcon the table we took it as canon. It is better than what it replaced, and it touched eighteen passages in the bible and six documents in the OS.
>
> The Surveyors never claimed his name and never seated anyone. They have said **nothing whatsoever** about the man for three generations, and the official account of the Folding is written in the passive voice with no author in it. There is no figure at the top of this world — an Accord, a ministry, a procedure, and a procedure cannot be hated properly, which is exactly why they chose one. The name survived anyway, **detached from the deed**: meaningless to some, a name to conjure with or to spit for others, and to most an old word out of a song. That the Foldwright and the man who folded the world are the same person is **not common knowledge** — it is a mythos that will not die, because the one institution that could settle it has never acknowledged there is a question.
>
> **Red Flag has filled that silence with hope.** `THE FOLDWRIGHT LIVES` is their article of faith and their graffiti — prisoner, hiding, or working still in the creases, depending who you ask. Find him, restore him, and the resistance becomes a war it could win. They are right that he lives, roughly right about where, and **catastrophically wrong about what finding him gets them.** Act Two's reveal is no longer *the tyrant is a puppet* but ***the messiah is the culprit***, and the heroes carry that news back to the people who have been praying for him. Hettie is the exception: she does not paint the wall, because she keeps a ledger.
>
> ---
>
> **ALSO SHIPPED TODAY**
> - **Tobin is a full cleric** — level 3, Healer (Life Domain), stats/spells/how-he-plays on his sheet, all pulled from `data.js` so both sides of the screen use identical wording. Healing is **not** outlawed for him any more; that layer is cut. ❗ His old first secret (the outlawed mending the party would keep *for* him) is gone and **nothing replaces it** — that secret was what made the kids love him early. Flagged on his sheet, Joby's to solve.
> - **NOTEBOOK SYNC IS LIVE AND PROVEN.** `dmos-notes-sync.js` mirrors Joby's OS Notebook to Firestore; the rules are published; a full loop was verified (note filed → pushed → read back from a Claude session). **This is how a session reads his notes.** See the memory note — it is manual (he presses Push in Tools → Notebook sync) and it is a mirror, never storage.
> - The graffiti moved to the **walk up to the Set Square** (`THE COMMISSION › 3`), in **red**, half-scrubbed in the rain, on the same walk as the Red Flag warrant boards.
> - **A plain low-grade Surveyor escorts them**, not the Rector — who does not run errands, now recorded on its sheet. The escort has *no procedure* for questions about the Foldwright ("I do not have that"), and if pushed it **writes the question down.**
> - Session one's log, and the correction that play stopped one beat into scene two.
>
> ---
>
> **⚠ THE THING MOST LIKELY TO BE GOT WRONG NEXT.** Nearly every correction Joby gave across a long session traced to one root: **material that was literary rather than playable.** Jobs with nothing to hit, side pieces the players could only look at, a cliffhanger made of arithmetic, a clue that needed a paragraph of backstory to land. **Two nine-year-olds are at this table.** The test for any new piece is whether a player can *operate* it — a thing that pushes back with a rule they can learn. Ganny's cellar, the paper horse and the door that cycles rooms are the models. And **Jef's note is a pacing rule**: something to hit, early, every session.
>
> **OPEN, AND ALL JOBY'S TO RULE:**
> - **The Rector in the dust.** It appears personally at the fairground in `THE COMMISSION › 1`, which either proves the errand rule (a catastrophe at its own ceremony) or contradicts it. Flagged on its sheet, undecided.
> - **Tobin's replacement secret** (above).
> - **Scene 4 — the first lost place.** Unbuilt, and it is what session three's cliffhanger opens onto. Nothing about what is in there is decided.
> - The transition collection (the Badge, the Empty Coffin, the Paper Bird) still waits on Joby's alteration ideas.
>
> **RUN ORDER AS IT STANDS:** session one = LASTLIGHT (played, stopped at `THE COMMISSION › 1`). Session two opens at `THE COMMISSION › 2` — which as of 2026-08-31 is a NEW beat, the field as the light goes, where Merrit Quist, Hask Bind and Ganny Marle come to them; the Ossuary night is now › 3 and the scene renumbered to seven beats. Session three = `THE WAY IN`, two beats, ending on the party stepping through the portal. Then Scene 4, which does not exist yet.
>
> ---
>
> **▶▶ START HERE — 2026-08-27. This block is the newest; everything below it is history.**
>
> **SESSION ONE HAS BEEN PLAYED AND IT WENT WELL.** The campaign is live. It ran LASTLIGHT end to end and stopped one beat into scene two — on the invitation to the Ossuary and the promise of an awarding — so **session two opens at `THE COMMISSION › 2`, the night at the Ossuary.**
>
> **THE PLAYERS ARE IN THE DOCUMENT AT LAST.** `CAMPAIGN.md` §8 has called this the highest-priority open item since revision five. Three of four heroes now have a stake, in their own players' words, recorded in the OS at **`Quick reference › ▶ THE PARTY`**: Century once served a powerful, benevolent leader who was killed and now wanders looking for purpose; Sam Silkweed is retiring, world-weary, a last hurrah, passing through; Aramil Quingalor is radicalizing on nothing more than hearing the world is a colonial domain; Jef Blackstone has a backstory on his own sheet and is most engaged when hitting something, which is a pacing rule rather than a character note. **This material is player-authored and outranks anything invented in this repo.** Aramil is the live wire — Red Flag may reach this party through a player rather than through Tobin or Hettie.
>
> **⏸ PARKED, AWAITING JOBY'S DECISION — the shared Notebook.** He wants the OS Notebook to be readable by both of us, so that he writes notes in it, Claude reads them, and the session log gets built from three sources: his notes, Claude's reading of them, and this conversation. **The mechanism is proven, not guessed:** Firestore is already wired up for shared heroes, and a Claude session can sign in anonymously with the app's public config from the browser pane and read a campaign path (verified 2026-08-27). A `notebook` path currently returns `permission-denied`, so it needs rules published. **The build is: a sync layer in `dmos-store.js`, a notebook-id field and status indicator in the UI, and a new match block in `firestore.rules` that only Joby can publish from the Firebase console.** One decision outstanding: the notebook must sit under a long, unguessable id rather than the party's campaign code, because players know that code and DM notes are spoilers — a curtain, not a vault, same stance as `dm.html`'s passcode. **Do not build this until he says go.**
>
> **What shipped this session (all committed; check `git log`).**
> - **Red Flag became the public instrument of blame.** It existed in one beat doc; it now arrives four times — a crier while the dust is still settling, a printed sheet in every room at the Ossuary, warrants on the boards on the walk up, and then the Rector saying it in quoted dialogue as the one telling that carries a signature. `CAMPAIGN.md` §3 records the frame-up as standing practice.
> - **The bible was reconciled to the OS** under a rule Joby set: *the DM OS is the source of truth for what actually happens in the campaign, and where the bible disagrees, whatever is consistent with the rest of the OS wins.* §6's geography, criers, recruitment sequence and session-zero kit all now match what the OS runs.
> - **THE WAY IN replaced the wreck.** The Reactor is NOT a dungeon — the fold is. The party never enters the tower; the order opens the ground at its foot and holds it while they step through, and that is the session-three cliffhanger. The scar-line goose chase is cut entirely; there was never supposed to be one.
> - **The paper-as-material reading is gone.** The Surveyors are folded things and the cosmology uses folding to teach a shape, but a broken interdimensional condenser is not a torn page with tape on it. Nothing is "patched" anywhere.
> - **Every beat has an environment sketch** — a real draggable `env` header, bullets not prose.
> - **Shops, jobs and toys.** Nine Hundred Bottles (potions, with stats), the Proving Floor (arms, matched to `data.js`'s own `WEAPON_STATS`, with a range out the back), the Sugar Vault. Every shop has a priced inventory; every mini-game has a number to beat and a stated prize. THE UNANSWERED is a job board with things to fight, surfaced through Tobin's satchel and delivered by runners.
> - **DM OS bug fix:** the same creature can now go on the initiative list as many times as you like, numbered. `rosterAdd` used to de-duplicate by ref and silently return the existing row.
>
> **Standing lesson from this session, worth carrying.** Repeated corrections all had one root: material that was literary rather than playable. Jobs with nothing to hit, side pieces the players could only look at, a cliffhanger made of arithmetic. **Two nine-year-olds are at this table.** The test for any new piece is whether a player can *operate* it — a thing that pushes back with a rule they can learn — not whether it reads well. Ganny's cellar and the paper horse are the models; the first drafts of the pantry, the measuring and the job board are the anti-models.
>
> **Next up:** Tobin's full cleric NPC sheet (owed, requested, not built); Scene 4, the first lost place, which is what session three's cliffhanger opens onto; and the parked Notebook decision above.
>
> ---
>
> **▶▶ START HERE — fresh session, 2026-08-11. Everything below this block is history; read this first.**
>
> **Where we are.** Campaign One (*The Folded World*) is designed through revision nine, the opening scene is locked and written, and the first session's material is live in the DM OS. All work is committed and pushed; working tree clean; local == `origin/main`.
>
> **Read in this order:** `CLAUDE.md` → this block → `ACT1.md` (the Act One runbook — scenes, the built encounter, cast, props, threads, state of play) → `CAMPAIGN.md` §1 (the whole story in four minutes) and `STYLE.md` before writing any prose. `DECISIONS.md` top entries hold the reasoning for revisions six through nine.
>
> **The campaign in four sentences.** A human wizard bargained with folded beings from another dimension, believing the Folding would buy his world limitless power through sunsalt, and he jammed the working at its midpoint when he realized the fold was an envelope with a recipient. Those beings — the Surveyors, openly alien, courteous, and unkillable — now rule the half-folded world behind a veiled false Foldwright, while the true one hides hollowed inside the creases with the machine that holds everything still. A permitted rebellion recruits the heroes to rescue people the creases have taken, not knowing its own leadership is the invaders wearing human shapes. And the thing pinned at the center is still eating, the invaders mean to finish the delivery, and the only cure is the one the real rebellion has preached all along: unfold the world and give it back.
>
> **Table facts that constrain everything:** four level-3 heroes (bard, fighter, two rangers); a nine- and a ten-year-old at the table; **no human is ever a combat encounter** and **Surveyors come undone rather than die** (§7 rules 1–2), so no fight leaves a corpse.
>
> **Next up, in agreed order:** (1) lock NPC stats — Wenna, Tobin as the Act One healer, Surveyor wardens; (2) build Scene 3, the wrecked Hearthspire; (3) make the props — reason cards and the folded-sheet map; (4) the transition scenes (the Badge, the Empty Coffin, the Paper Bird) once **Joby's alteration ideas land — he has them for all three and they are not yet given.**
>
> **Open questions waiting on Joby** (`CAMPAIGN.md` §8): what would unconvince the First Surveyor (Q7), what the Reactor deeps do with the faded (Q17), the field still's pieces and instability (Q18), mender limits (Q19), Ellum Wick's rescue and whether Tobin returns (Q20), plus the standing #1 — the players' own material, which session one is built to harvest.
>
> **DM OS state.** `campaign.js` v6 seeds: Act One → LASTLIGHT (folder) → the run sheet + the fairground encounter; master folders **NPCs — the cast** (Wenna, Tobin, Finch, Hettie) and **Monsters — the bestiary** (snatch-goblin, crease-wolf, tear-ogre). The rule is **sheets live in the master folders and get added to scenes**; an added sheet renders as the identical editable card, and ✕ inside a scene removes it from that scene only.
>
> **⚠ Two things Joby must do in his browser once (the deploy is live):** hard-refresh `dm.html` (Ctrl+Shift+R), then **Tools → New workspace → Sync from campaign** — a re-push can never re-file docs in a workspace that already synced them (the merge keeps the DM's filing), so this is the only way to land the current structure. It backs up automatically first. **And restore Wenna Ash and Hettie Sarn from Trash (↩)** — they were trashed by the old ✕ behavior, which is fixed as of dmos-ui v36.
>
> **A note on how the last stretch went, worth carrying forward.** The add-existing-NPC feature was built three times because I kept adding distinctions Joby never asked for — read-only embeds, "cast" badges, greyed tree rows, missing handles — and shipped a ✕ that silently trashed sheets globally. His correction is the standing rule: *one kind of card everywhere, deletions isolated, don't invent states the user didn't ask for.* Prefer the plainest thing that satisfies the request.
>
> ---
>
> **▶ HANDOFF — 2026-08-13, campaign session (this is the newest; older handoffs follow).**
>
> **Read these before touching anything, in this order:** `CLAUDE.md`'s new rule *Brainstorming is free, canon is not* → `STYLE.md` (three rules added this session) → the DM OS itself, starting at **▶ THE FOLDED WORLD** at the top of the tree. Live asset versions are on `dm.html`; as of now dmos-ui `v42`, dmos-store `v16`, dmos.css `v32`, campaign `v28`. All pushed.
>
> **THE RULE THAT MATTERS MOST.** Nothing goes into `CAMPAIGN.md`, `ACT1.md` or `campaign.js` without Joby saying yes first — names, world details, motivations, history, rules about how something works, however small. It exists because a session once decided unasked that the clock tower overhead had been stopped for a lifetime and started running the morning of the disaster, filed it straight into the run sheet as fact, and Joby found it months later unable to explain his own campaign. **Propose, then build.** Corollary: reorganizing the DM OS is also a change, so propose the shape first.
>
> **THE HOUSE VOICE MOVED, twice, and both are in `STYLE.md`.** (1) *We are not always misty-eyed* — there are two nine-year-old boys at this table and everything built before this session was somber. Comic relief, hijinks and the occasional zany thing get sprinkled in deliberately, and the jokes must be **visible from the doorway**, not subtle social comedy nobody catches. (2) *Lean toward prosperity*, and the blend is precise: **medieval aesthetics, the material prosperity of Rome on steroids, the festive confidence of the Gilded Age, run by a totalitarian state.** No steam, no factories, nothing past a rare primitive flintlock — I imported plate glass, a cage lift and a delivery van by taking "midtown Manhattan" literally, and it was wrong. Sunsalt is where the wonder goes: heat and light without fire, hinted, never explained. The dark is the undertow, not the weather. (3) *Sketches, not prose* — the long-form register governs `CAMPAIGN.md` and NOT the DM OS. A doc there is read mid-session with four people waiting: hit the note and stop, keep bodies short, leave Joby room to improvise.
>
> **THE STANDING LAYOUT, confirmed and to be used for every scene and encounter from here:** one index doc titled so it cannot be missed (`▶ RUN THESE IN ORDER — <scene>`), whose first field is a numbered list of `[[wikilinks]]`, one beat doc per step, places and people linked alongside. Joby runs the table off the index and opens the rest as each step arrives. LASTLIGHT and THE COMMISSION are both built this way; copy them.
>
> **Shipped this session (all live):**
> - **▶ THE FOLDED WORLD** at the top of the tree — the cosmology in words a nine-year-old can hold (the world folded like a letter into an envelope; flat faces like a paper lantern; the land overhead is *another face of the same structure seen across the inside*), the history the world tells itself, and a DM-only field for what is actually true. **The geometry is player-facing** and Joby shows nested-polyhedron pictures alongside it. Several such structures orbit one sun; the Surveyors are **interdimensional**, through portals from their own dimension, and are NOT one of those structures.
> - **Dunlath**, the city, with a `Locations` master folder: the Clock Face, the Petition Rail, the Lamp Office, Sixty-One Pairs, the Long Table, the Emporium, the Glasshouse, the Folding Shop, Ganny Marle's Cellar, the Scar-Line, the Hearthspire, the Old Draws, the Dark Window, the Ossuary, the Set Square. Plus a `Quick reference` folder (names list, street-level sketch).
> - **The geography, from Joby's own sketch** — west to east: the old Draws on the flats → the Cinder Draw (now the scar-line) → the Hearthspire over the fairground → rising ground → Dunlath on the height. Old sunsalt works run underground from the Draws up into the city's undercroft: sealed, unmapped, and available as a road under the city whenever wanted.
> - **LASTLIGHT rebuilt** as five beats plus the encounter, with the walk up through the city, the fairground view and six one-roll games, the ceremony's arrangement, and the tear.
> - **THE COMMISSION** — six beats, and its senses. Wenna's office is now **on the government complex**, three doors from the Rector, the smallest door on a grand corridor: the permitted rebellion has a desk inside the building it petitions. The Rector's room is an **oval office**, not a hall. The government quarter is **folded rather than built** — matched creases up every façade, and here and there one that does not match, and the mismatched ones are newer.
> - **`campaign.js` is now written programmatically** (`json.dumps`) and validates as JSON on every write. Do not hand-splice it; I broke it that way twice this session. Round-trip it in Python instead.
>
> **Open threads — ask Joby, do not decide:**
> - **The clock hands.** He still does not accept why the sky-clock started moving. I argued it is a machine jammed by the same jam, so the hands moving = the grip slipping, but he never ruled. It is currently canon in the run sheet. Resolve or cut.
> - **The Red Flag frame-up** (the ministry blaming them for the tear) lives only in the beat doc. It has not been promoted to `CAMPAIGN.md` §3.
> - **The economy** is deliberately undecided and flagged inside the Emporium: universal plenty as a right, or a rich market with supports dressed as service.
> - **Two bits of session-zero machinery he may want gone**, since he cut the reason cards: the "name one thing you carry you would run back for" question in Lastlight beat 4, and the rescued-civilian bounded choice (family / teacher / somebody you owe) on the encounter sheet.
> - **The Hearthspire "against the wall"** was changed to follow his sketch, which puts it out on the flats. Flagged, not confirmed.
> - `dm-workspace-2026-08-13 LastLight.json` — his workspace export — got swept into a commit by a `git add -A` of mine. Offered to remove it; no answer yet.
>
> **Still unbuilt from the audit:** the Registry, the fairground fight's how-to-run note, a doc for the items the party now carries (writ, purse, fold, paper bird), the rescue list, a session log, and Beat 4's physical anchor.
>
> ---
>
> **▶ HANDOFF — 2026-08-11, app-work session.**
>
> **Casting is GONE. A document lives in exactly one folder, and everywhere else names it with a `[[wikilink]]`.** v33–v36 built "casting" (a scene borrowing a sheet filed elsewhere, shown as an extra tree row and an extra feed card) and it failed at the table: a borrowed row was drawn by the same code as a real one, so it looked identical while behaving nothing like it — dragging it refiled the underlying sheet without moving the row, removing it trashed the whole sheet, and an act plus a scene inside it could borrow the same person into three indistinguishable rows. It is removed from the tree, the feed, and the ＋ menu. **The reasoning is in `DECISIONS.md`, 2026-08-11 — read that before re-proposing anything shaped like it.** Old workspaces keep their `cast` entries as inert data; the story map and connection editors already filtered them out and still do.
>
> **Current LIVE asset versions:** dmos-ui `v42`, dmos-store `v16`, dmos.css `v32`, campaign `v7`. (app `v21`, data `v16`, styles `v17`, icons `v19`, bestiary `v1` unchanged.) All pushed and live.
>
> **Shipped this session (all verified in a running app, all pushed):**
> - **Casting removed** (`v39`) + **campaign v7**: LASTLIGHT and the fairground encounter now name their people and creatures with wikilinks only. Every tree row is a real filing with a drag handle.
> - **Links render in fields** (`v42`). Fields were permanent textareas, so a `[[link]]` in one showed as raw brackets forever. Fields now read as prose and become a textarea on click, exactly like the body.
> - **Type `[[` to link** (`v42`). A filtered document list at the caret; ↑↓ moves, Enter/Tab accepts, Esc dismisses. Works in bodies and fields. The older select-text→Link marker still exists.
> - **The card's headers belong to the document** (`v42`). Add, rename, remove, and drag-reorder headers per card. `DOC_TYPES[type].fields` is still the default; a doc only gets its own arrangement (`d.fieldDefs`, `[key,label]` pairs) once changed. Removing a header keeps its text, so re-adding by the same name restores the writing.
> - **"Keep mine" stays kept** (`v16`). Declining a `campaign.js` revision left base at the old rev, so the identical conflict was re-raised on every single reload. The declined rev is now recorded and skipped; a genuinely newer rev still asks.
> - **The conflict notice names `campaign.js`, not Cowork** (`v40`) — it never came from Cowork, and the wording sent Joby hunting for a session that was not involved.
>
> **⚠ The workspace-per-origin trap — this cost most of a session.** App code and `campaign.js` live on disk and are shared by every page. **The workspace (folders, sheets, edits, trash) lives in browser storage, which is per ORIGIN.** `file://`, `localhost:8000`, and `jobydorr.github.io` are three separate campaigns that happen to run the same code, and nothing syncs between them. Joby was on `file://`, which the Chrome browser tools **cannot reach at all** — so a session cannot read or repair his data there. **He is moving to `localhost:8000`** (`python -m http.server 8000`) via Export workspace → Import workspace; confirm that landed before assuming which origin holds the real campaign. See [[dm-os-workspace-origins]] in memory.
>
> **Open threads / pick up here:**
> - **Confirm the Export→Import to `localhost:8000` succeeded** and that the tree looks right, then treat that origin as the only working copy.
> - Joby should click **Keep mine** once more on LASTLIGHT after a hard refresh; that one sticks.
> - Everything under the older handoff below still stands (backstory check, leveling, bestiary).
>
> ---
>
> **▶ HANDOFF — earlier app-work session (history below).**
>
> **Workflow rules — read `CLAUDE.md`, this is load-bearing.** Git happens on the **Code side ONLY**. Cowork brainstorms and drafts files but runs **NO git** (no stage/commit/push): a flaky Cowork sandbox mount truncates writes *at commit time* and has corrupted committed files before. GitHub (`jobydorr/roll-a-hero`) is the source of truth — if the local repo looks scrambled, `git fetch` and reconcile toward `origin/main`. A **`pre-push` hook** (`.git/hooks/pre-push`, local to this clone) blocks pushing a truncated text file (empty / no trailing newline); override with `git push --no-verify` only after confirming. Root cause is now diagnosed: the **Cowork mount is the injector**; the local disk is healthy (fsck clean, real NTFS, not OneDrive). The `/tmp`-assemble workaround in the CAMPAIGN HANDOFF below is fine belt-and-suspenders on the Cowork side, but the rule is simply **Cowork drafts, Code commits.** See [[push-workflow]] in memory.
>
> **Current LIVE asset versions** (`dm.html` + `index.html`): app `v21`, data `v16`, styles `v17`, icons `v19`, dmos-store `v14`, dmos-ui `v36` (2026-08-10: add-existing NPC/monster — a sheet added to a scene renders as the IDENTICAL, fully editable card it is at home, in the feed and the tree alike; the only difference is ✕, which inside a scene removes it from that scene only and never deletes; trashing a sheet now warns which other places lose it. See BACKLOG — v33–v35 overbuilt this and v36 is the simplification), dmos.css `v27`, bestiary `v1`, campaign `v6` (2026-08-10: The Folded World — scenes are FOLDERS holding their components (LASTLIGHT holds the run sheet + the fairground encounter), the master folders CONTAIN their sheets as children (NPCs: the four cast sheets; Monsters: snatch-goblin, crease-wolf, tear-ogre), and containers CAST the sheets they use via `leadsTo` kind `cast` — LASTLIGHT casts its four NPCs, the encounter casts its three creatures, and the DM OS shows each cast member's full sheet inside the container. Masters contain, scenes cast. Two contract notes: the `campaign` value must be a plain string, and **the merge keeps the DM's parent/order on updates, so a re-push can never MOVE a doc in an already-synced workspace** — structure changes need a drag in the OS or New workspace → Sync). Deploy = `git push` → GitHub Pages (~1 min); bump `?v=` on changed assets + hard-refresh (Ctrl+Shift+R).
>
> **Shipped this session (all LIVE, verified):**
> - **Clean slate.** `campaign.js` cleared of the "Marrow's Rest" demo → `{ campaign:null, docs:[] }`. Joby is building his first real campaign ("The Folded World" — see the CAMPAIGN HANDOFF below) via Cowork-draft → Code-commit → **Tools → Sync from campaign**. To clear the demo from his browser he runs **Tools → New workspace** once.
> - **DM OS tree/feed pass.** The story feed **indents** cards by depth (cards widened); a **distinct icon per doc type**; **story beats can nest documents** (never a folder); a tree **"unroll all"** control.
> - **Buffs / debuffs / marks on the "at the table" roster.** Effect icon per combatant (green buff / red debuff / purple mark / gold mixed). The menu is **DATA-DRIVEN from each PC's sheet** — scans other PCs' chosen spells (by `data.js` spell `type`) + class features, so real picks (Bless, Hunter's Mark…) auto-appear (`heroGrants`/`EFFECT_META` in `dmos-ui.js`). Round counter ticks + auto-clears; rounds override on apply; generic DEBUFFS library for DM-inflicted conditions.
> - **Weapon/armor stats + magic items** (commits `1693fcb`, `50027d6`). `data.js` `WEAPON_STATS`; a stat-bearing "Weapons & Equipment" section in **`referenceHTML()`** shows per-item damage/type/range + to-hit and armor AC on **both** the character sheet and the DM OS hero card (both render `referenceHTML`), derived from equipment ids → **no re-share**. `state.magicItems` (free-text, editable in the Gear step) renders in a "Magic Items" section → sheet + DM OS after the player re-Shares.
> - **Git reliability:** diagnosed the mount truncation, installed the pre-push hook, and rewrote `CLAUDE.md` + `COWORK_INSTRUCTIONS.md` so they no longer tell Cowork to commit. **The CAMPAIGN HANDOFF's note to "leave Joby's uncommitted DM OS work alone" is RESOLVED** — that work is committed & live.
>
> **Open threads / pick up here:**
> - **Backstory:** players report backstories that aren't showing; shared copies are empty even after recent re-shares. The code path is correct (saves/displays/shares), so it's most likely just not re-shared. **Definitive check:** a player hard-refreshes → opens their hero's Story step — text still there ⇒ re-Share; blank ⇒ a real bug to fix.
> - **Leveling is now structurally required** by the campaign's escalating-mission design (see CAMPAIGN HANDOFF). Player material is still the #1 DM-partner blocker.
> - Standing backlog: grow the SRD bestiary, the in-app "DM's Assistant", private DM area / accounts.
>
> **Party (live `dungeon-dads`):** 4 shared heroes — Century (Ben), Aramil Quingalor (Harlan), Sam Silkweed (Harlan, was Drew), and a NEW one **Jef Blackstone (Rowan)** with a full backstory. Aramil/Sam/Century have no written backstory in their shares yet.

> **▶ RESOLVED (2026-08-07) — the Surveyor species question: Joby settled it; revisions six through eight are applied**
>
> **Revision eight (same day, Joby's four clarifications):** the faded do not go to the rest villages — the villages are shells and the white wagons drive back into the Reactors, where the faded lie in holding-creases past the sealed doors (findable; what is done with them is §8 Q17). The Mending got concrete mechanics: a mend is paid from the mender's own thread (or from raw sunsalt at the world's expense), guided by hearth-spirits — small kin of the Compass Spirit living in homely things — with a direct D&D translation for cleric players. **The opening scene is replaced** (supersedes "the opening is written" in the CAMPAIGN HANDOFF below): the campaign now opens at the ceremonial closing of the Cinder Draw and the lighting of the Hearthspire, the first city-wall Reactor, whose first pull finds a fold with no slack left and tears — the clock tower still falls, the taken are made publicly, the ministry blames the tyrant's spite, and Hettie Sarn gets her scene at the rope line. And a new §6 section, "Session One Is Session Zero," carries five instruments for harvesting the missing player material in play, since Joby may get nothing more before the table meets.
>
> **Revision seven landed the same day, on Joby's six adjustments:** the Draws become the Reactors — tower-and-root extraction constructs whose damage lands *inside* the fold (the first dungeon is now a Reactor infiltration, exiting into a half-grayed lost place); Green Fields gains its history (the Fence War and the Accord, the peace within which the occupation completed itself — Red Flag began with the refusers and the veterans who saw the delegation come back wrong); Tobin is a secret mender (healing is outlawed; clerics draw on the Mending, the world's own knitting-back) whose lost friend Ellum Wick is one of the taken, found first as a trail of clues; and the party's raw-sunsalt source is the field still, assembled from pieces carried by the folded-away apprentices. New §8 questions: the Reactor deeps (Q17), still mechanics (Q18), mender limits (Q19), Ellum's rescue and Tobin's return (Q20). **Next declared by Joby: incorporating the players — he has ideas, still no backstories.**
>
> Joby answered the open question himself and went further than either drafted direction: the Surveyors are now an openly alien order, and the change reached the whole cosmology rather than just the Factions section. `CAMPAIGN.md` was rewritten end to end (revision six) and the reasoning is logged at the top of `DECISIONS.md`. The whole thing in four sentences, replacing the four in the CAMPAIGN HANDOFF below: a human wizard bargained with beings from a folded dimension, believing the Folding would buy his world limitless power through sunsalt, and jammed the working at its midpoint when he understood the fold was an envelope with a recipient. The beings rule the half-folded world openly and courteously behind a veiled false Foldwright, while the true one — human, hollowed, and guilty — hides inside the creases with the machine. A permitted rebellion recruits the heroes to rescue people the creases have taken, not knowing its own leadership is the invaders in folded human disguise, running the search for the man. And the thing pinned at the center is still eating, the invaders mean to finish the fold and complete the delivery, and the only cure is the one Red Flag has preached all along — unfold the world and give it back.
>
> **The two rules that deliver the table goal (now §7 rules 1 and 2, outranking all others):** no human being is ever a combat encounter, and Surveyors come undone into panes and reassemble elsewhere rather than die — so no fight in the campaign leaves a corpse, and beaten enemies recur.
>
> **What this supersedes in the CAMPAIGN HANDOFF below:** its four-sentence story; the "invented a tyrant to serve" framing (the throne now holds the First Surveyor wearing the Foldwright's name); "cast the Surveyor leader" (done — merged into the false Foldwright); and the cinch (now the jam). Everything else there still stands: recruitment shape, Tobin's conversion as the door, the opening scene, the leveling dependency, and the #1 blocker — **the player material — which is unchanged and still outranks everything.**
>
> **New questions for Joby, from `CAMPAIGN.md` §8:** what would it take to unconvince the First Surveyor (Q7), does any rank-and-file Surveyor defect to the party's side (Q14), and what happens to the invaders if the heroes win (Q16).
>
> **`ACT1.md` now exists (2026-08-09) — the Act One runbook and staging ground** (scenes, encounters, cast sheets, props, clocks, state of play; sections mirror the DM OS doc types for later transfer to `campaign.js`). It carries the homework protocol for collecting each hero's reason-for-coming (Joby's line at the top of session one, bounded reason cards for the kids, Wenna's interview as the in-fiction due date). **Scene 1 (LASTLIGHT) is LOCKED (2026-08-10)** in both `ACT1.md` and the bible's §6 — Finch at the offering chamber, the tear ripping down the tower's face, the first monster taking him, and the Rectors (the order's ritual grade, working name) leading the ceremony and fighting the disaster as spectacle-not-allies. The 2026-08-09 canon deltas (canyon Draws, linear cities, far-Reactor wagons, classic tear-monsters, the capture instrument) are **absorbed into the bible** — `ACT1.md` §8 is clear and stays as the mechanism. The transition collection is chosen (the Badge, the Empty Coffin, the Paper Bird) with Joby's alteration ideas pending — recorded in `ACT1.md` Scene 2, deliberately unbuilt. **Next, agreed: build Encounter 1** (monster stat blocks with a capture move, the scripted Finch opener, terrain, staged saves/losses, Rector display beats), then lock NPC stats, then the wreck, then the DM OS push.

> **▶ CAMPAIGN HANDOFF — start here for DM-partner work (2026-07-14, revision five)**
>
> *The builder handoff below is unchanged and still accurate; nothing shipped in the app this window. This was **all DM PARTNER work** — designing Campaign One.*
>
> **Read these three, in order:** `CAMPAIGN.md` (the bible — §1 is the whole story in four minutes), `STYLE.md` (how we write; **read before producing any document**), and the two 2026-07-14 entries in `DECISIONS.md` (why the campaign is shaped as it is).
>
> **The whole thing in four sentences.** A wizard folded the world up small to shut out something terrible, and everyone believes he has been ruling as a tyrant ever since. A rebellion recruits the heroes to go into the folds and find the machine that controls the world. But the rebellion is run by the real villains, who want the machine themselves — and the tyrant turns out to be a broken old man holding the world together in the dark. And the thing he folded the world to stop is still inside it, still eating, and it is getting out.
>
> **What revisions four and five fixed.** The audit found that our best idea had eaten our conflict — with the Surveyors and their fake rebellion revealed as one organization, nothing in the world was arguing about anything. Revision four added a third faction; revision five discovered it was standing on the wrong side of its own argument, and swapped the two rebellions. The result:
>
> - **The Folding is believed to have been clean, and the Fold took the memory of what it took.** The world does not mourn its lost cities because it cannot remember them. This gives the party something to *discover*, and it hands us the Stillguard's real recruiting pool: **the haunted** — the woman who lays four places for three children, the man with a map of a city nobody has heard of. Called mad their whole lives, and correct about everything.
> - **The world visibly folds overhead — the town above.** Every city has an inverted country in its sky with a clock tower its people can see and never reach. The creases everyone can see are neat and orderly, which is why the folded-sheet propaganda is unbreakable and why the Snarl lands as betrayal.
> - **Two rebellions, and they changed places.** **Green Fields** (the fake one, placeholder name) does not attack the Fold — it attacks the *fist around it*: keep the Fold, break the tyrant's grip, let the world belong to everyone. Decent, popular, sincere at the bottom, and run from the top by the Surveyor leadership, because a liberation movement is a search party if you point it at the creases. **Red Flag** (the real one, placeholder name) wants the world **unfolded and given back** — the seams exist only because the world is folded, so the burning stops when the Fold does. They are right about the crime, the criminals, and the cure, and **catastrophically wrong about the method**, which they learn from the heroes one door at a time.
> - **The mission escalates instead of being briefed.** Session one is not "find the machine" — it is ***go in and find him***. Six rungs, each bought by walking through a door. The party's verb never changes; its meaning changes six times. **The Armature is not named in Act One**, and neither rebellion's rank and file has heard of it.
> - **Every faction has two floors.** A leadership that knows what it's for, and a rank and file that carries out its orders believing something else. Almost everyone the heroes fight is decent; almost everyone who gives an order is not. Never let a faction speak with one voice.
> - **Tier one / tier two.** Tier two is the zone monsters (why a careless unfolding is a massacre). Tier one is the Devouring — not their king, a different category of thing. The party spends two acts solving a tier-two problem and arrives at the machine, which is a good answer to the wrong question.
>
> **The opening is written** (`CAMPAIGN.md` §6): the Green Fields crier in the square nobody stops for, the foldquake, the clock tower falling out of the sky, the things that come through with it, the fight inside ten minutes, and Wenna Ash afterward in the dust — while two Surveyors at the edge write down four new faces, which is how the party acquires a handler.
>
> **Recruitment, settled: Green Fields recruits, Red Flag inherits.** Wenna is sincere rank-and-file and the betrayal lands *through* her, not on her. The leash is attached **over her head** — Tobin the handler reports to people she has never met, and the first time the party sees him file something she wasn't told about is the first loose thread. Tobin stays *verging*, not committed, and **his conversion is the door**: the scene where he's taken to see the friend he's mourned for two years, alive in a dark house, proves the rebellion is a puppet and hands the heroes Red Flag in one move. Both gut-punches survive — Act One *the rebellion is a puppet*, Act Two *the villain is the victim*.
>
> **Next actions, in order.**
> - **Get the player material — this is still the #1 blocker.** Read what all four picked in the builder (`data.js` has the 16 traits and 36 motivations). One kid already chose *"to find a lost family member"* and *"to free those who are captured"* — a bullseye into the zones. For the others: **one bounded multiple-choice question by text — *what did the Folding take from your hero?*** Note the new constraint: a hero who *remembers* what was taken is one of the haunted, which is a hook rather than a problem.
> - **Answer the second half of the same question:** why is each hero in that city on the day the tower falls? (`CAMPAIGN.md` §8, Q2.)
> - **Then build the zones** — five to seven, outermost to innermost. Each must hold a piece of the Foldwright, a monster or a lost town, **and** a piece of a player's story. Shelved until the player material lands, deliberately.
> - Decide the **Devouring** (it needs a face and a fight), **name the fake resistance** (*Stillguard* is not settled; it must sit comfortably beside *the Unlit*), and cast **the Surveyor leader** — the only character who can carry the philosophical weight of the ending, since an appetite cannot argue.
>
> **⚡ New builder dependency, and it is real.** The escalating-mission structure means the heroes must credibly become people who could take the machine. **Leveling is no longer a someday-feature; the campaign structurally requires it.**
>
> **Do not propose the Stillguard-recruiter-in-a-back-room opening.** It was raised and rejected. The opening we have is the square, the tower, and the fight.
>
> **⚠ Tooling hazard, learned the hard way.** The Cowork workspace mount **silently truncates large writes** — it committed a damaged `CAMPAIGN.md` twice before it was caught. **Assemble long documents in `/tmp`, `cp` them into the repo, and verify with `cmp` and `wc -c` before committing.** The mount also cannot delete files, which corrupts git's index; if git reports `index file corrupt`, run with `GIT_INDEX_FILE=/tmp/rah-index`.
>
> **Committed as of 2026-08-07.** The campaign documents this block describes — `CAMPAIGN.md`, `DECISIONS.md`, and `ROADMAP.md` — went in on the Code side at `1f286c7`, so nothing here is still waiting. The standing rule is unchanged: per `CLAUDE.md`, Cowork drafts and runs no git, and the Code side commits.
>
> **The working tree is clean.** The DM OS work this block previously told you to leave alone shipped on 2026-07-21 (`1693fcb`, `50027d6`), and local `main` is level with `origin/main`, so a session starting here begins from a clean checkout rather than from someone else's work in progress.

> **▶ HANDOFF — start here (2026-07-10 — paused for context; everything below is pushed & LIVE)**
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
> **⏸ This window (2026-07-10) — handed off for context. No half-done work; tree clean, all pushed.** What shipped this window (all live): the **Story map became a full-viewport authoring board** (drag a card's **○ handle** onto another to connect; **click an arrow** → edit its kind/label or remove; a **mini-map** for large campaigns) — that's the big story-flow-chart pillar, now an authoring surface, not just a view. **Link from highlighted text** (select in a doc *body* → floating **🔗 Link** marker → pick a doc by title → inserts `[[id|text]]`, which also appears on the map as a "mentions" edge). **Roster HP now syncs** when a doc's HP changes or ⚡ Stats regenerates (`syncRosterHpToDoc` in `dmos-store.js`, called from `patch()` on a `fields.hp` change) — fixes "AC updates in the rail but HP didn't." A **＋ To the table** button on every NPC/creature doc header. **Creature-block 📖 Look up** (`creature-fill`) fills a creature block from the library. **Randomized stat tiers** (`TIER_STATS` ranges rolled per generate, plus original per-tier special moves). **Stats render at the top** of NPC blocks (divider moved beneath). A **density pass** trimmed padding across the DM OS. Also captured (write-up only, not built): a **BACKLOG design note for an in-app "DM's Assistant"** — an AI chat that would build cards by driving the store's functions via the Anthropic API; Joby chose to just capture the trade-offs (backend/key, cost, the local-first shift) and decide the approach later. Joby should **hard-refresh (Ctrl+Shift+R)** once.
>
> **Where to pick up next (Joby's call):** the "At the table" system and the **story map** (now a full authoring surface) are done, and **roster HP sync** shipped this window. Open items in `BACKLOG.md`: **grow the SRD bestiary** (more starter monsters — just data in `bestiary.js`, or ask Cowork to author ORIGINAL reworded creatures from the local books — the book text never enters the repo); the **in-app "DM's Assistant"** big rock (write-up only so far — Joby must pick the backend/key approach before any build); and the standing big rocks — **leveling up** and a **private DM area / accounts**. Minor: the hero card's passive perception is 10+WIS baseline (the builder doesn't model skill proficiency).
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
