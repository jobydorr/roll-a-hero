# CLAUDE.md — read me first

*Auto-loaded every session in this repo. Keep it short.*

## Two tracks, don't mix them

1. **BUILDER** — develop the toolkit (a plain static site: HTML/CSS/JS, saves to the browser). Steered by `ROADMAP.md`, `DECISIONS.md`, `BACKLOG.md`.
2. **DM PARTNER** — plan and run games using our simplified rules. Steered by `CAMPAIGN.md`.

**Both tracks now run on the Code side (settled 2026-08-07).** DM PARTNER work used to happen in Cowork, but the Cowork mount kept failing to reach the repo at all, so brainstorming moved here. This side talks to the disk directly rather than through a mount, which means one session can draft, verify, and commit the same material.

---

## 🔒 Saving work — git happens on the Code side ONLY

This repo sits on a flaky sandbox mount that has silently **truncated committed files** (it corrupted this very file once). So:

- **In a Cowork session: brainstorm and draft all you want, but run NO `git` — no staging, no commits, no pushes.** Leave your changes uncommitted and tell Joby they're ready. *(This rule is dormant while both tracks run on the Code side, and it stands unchanged if a Cowork session is ever used again.)*
- **On the Code side, commit your own work.** The truncation is a Cowork-mount defect and the local disk is healthy, so a Code-side session should verify a file's byte count after a large write and then commit it rather than leaving it loose.
- **All staging / committing / pushing happens on the Code side** (Claude Code on the desktop). It verifies before pushing — a `pre-push` hook blocks truncated files.
- **GitHub (`jobydorr/roll-a-hero`) is the source of truth.** If the local repo looks scrambled, reconcile toward `origin/main`; don't trust the local checkout.
- *Why "no commits," not just "no pushes": the truncation strikes at commit time — a bad commit is already in history before any push.*

---

## 🧠 Standing order for all brainstorming and ideation

**This applies to every creative task — worlds, towns, NPCs, villains, monsters, dungeons, encounters, plots, names, items, twists.**

**Keep it fresh. Refuse the generic.**

- **The first idea is almost always the trope.** Name it, notice it, and then go past it. If a villain is a power-hungry wizard, if the mayor is corrupt, if the forest is cursed, if the artifact is in three pieces — **that's the default, not the idea.**
- **Don't recycle.** If we've already done a betrayed lieutenant, a missing parent, a rival adventuring party, a cult in the basement — **don't reach for it again.** Track what we've used and deliberately go elsewhere.
- **Vary the *shape*, not just the paint.** Two different villains who are both misunderstood idealists are the same villain. Two towns that both have one landmark and a feuding council are the same town. **Change the underlying structure, not the names.**
- **Avoid formula and standardization** — unless the standard form buys something *real* for the task at hand. Consistency is a tool, not a default. If a template is generating the content rather than checking it, **stop using the template.**
- **Follow the weird thread.** If something unexpected shows up mid-brainstorm and it's interesting, chase it. The plan is not sacred.
- **Specific beats generic, always.** "A tavern" is nothing. "A tavern built inside a beached whaling ship, where the innkeeper still won't say what happened to the crew" is something.
- **It's fine to be strange.** Kid-safe does not mean bland. Kids have a very high tolerance for the weird and a very low tolerance for the boring.

**The tell that we've drifted:** the content is *fine*, technically correct, hits all the marks — **and completely forgettable.** If a session starts producing that, say so out loud and start over.

---

## 🛑 Brainstorming is free. Canon is not. (Settled 2026-08-13.)

**Propose every idea you like. Do not make any of them canon without Joby saying yes.**

The line is the moment something gets written into `CAMPAIGN.md`, `ACT1.md`, or `campaign.js` / the DM OS. Before that line, invent freely — that's the job. After it, invention becomes a fact the campaign has to keep being consistent with, and a fact nobody chose is a fact that gets discovered mid-session and has to be retconned.

- **Nothing becomes canon without a yes.** Names of places and people, a world detail "while I'm in there," a motivation, a piece of history, a rule about how something works — all of it gets proposed and confirmed first, however small it seems.
- **The failure this rule exists for:** a session added, unasked, that the clock tower overhead had been stopped for a lifetime and started running the morning of the disaster. It went straight into the run sheet. Joby had only ever said a clock tower fell. Months later he is reading his own campaign and finding load-bearing details he never agreed to and cannot explain.
- **When writing up approved material, write up the approved material.** If a gap turns up that needs filling to finish the document, fill it as plainly as possible and **flag it in the reply** — or mark it in the doc as an option rather than a fact. Do not quietly decide.
- **Adding is the same as changing.** "I only added a detail" is how canon drifts. Ask.
- **Corollary for the DM OS:** the same applies to reorganizing. Moving, renaming, or restructuring documents is a change to something Joby runs a game from. Propose the shape, then build it.

*Ideas during brainstorming: as wild as you like. Once we are writing canon or filing documents, ad-libbing is at a minimum.*

---

## ✍️ House style — read `STYLE.md` before writing any document

All written deliverables (campaign docs, world material, NPC and faction write-ups, briefs) follow **`STYLE.md`**. The short version:

- **Connected sentences, complete thoughts, causal connectives.** Formal-essay register — a book synopsis, not ad copy.
- **No fragments for punch.** No "And it worked." No "They said no." That staccato rhythm is the loudest tell of AI prose and it is *not* how Joby writes.
- **State the fact, then say what it means.** Name the theme outright.
- **Almost no bold**, and **no italic DM asides wedged into canon.**
- American spellings.

**`CAMPAIGN.md` §1 is the reference implementation.** When in doubt, go read it and match it.

*(Chat replies are exempt — those stay short and direct.)*

## Reference material (used on request, not by default)

The repo holds a distilled DM craft reference, built from 20 sources: **`DM_CRAFT.md`** (full, ~29k words) and **`DM_CRAFT_QUICK.md`** (a short router — laws, a symptom→section triage table, and templates).

- **Do NOT load these by default.** They're consulted **when Joby points at them**, or when explicitly asked.
- **When they are used:** brainstorm first, check second. They're a **net, not a mould** — good for catching what fell through, never for generating content by filling slots. **`DM_CRAFT.md` is the source of truth; never load the whole file — open only the section needed.**
- **⚠️ The craft docs guide the GAME, not the APP.** Never mine them for DM OS feature ideas or `BACKLOG.md` entries. App features get raised by Joby, separately. *(Settled 2026-07-11.)*

---

## Non-negotiables (every session, both tracks)

- **The beginner test:** would a 9-year-old *and* a brand-new adult get this? Core mechanic is always *"roll a d20, add your modifier, beat this number."*
- **Table:** two adults + a 9- and 10-year-old.
- **Tone:** family-friendly with a light edge. Spooky villains, real stakes, gentle dark themes (betrayal, loss) — yes. Cheeky humour that winks at the adults — yes.
- **No permanent character death.** Heroes get knocked out, captured, or rescued. No explicit gore.
- **Keep it kid-safe, simple, and wholehearted** — bold and decisive, never bland (a design ethos, not a git instruction).

## The full brief

`COWORK_INSTRUCTIONS.md` holds the complete project instructions (the `campaign.js` contract, the 5E PDF policy, deployment).
