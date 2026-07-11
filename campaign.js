/* Roll a Hero — the campaign, for the Dungeon Master OS.

   This file is COMMITTED and PUBLIC, exactly like data.js. That is fine and
   deliberate: the passcode on dm.html keeps players out of the running
   workspace, and nobody at the table is reading the repo. Content we build in
   Cowork lands HERE — edit this file, commit, and it appears in the DM OS, the
   same way a new spell added to data.js appears in the builder. No server, no
   fetch, no separate files: dm.html loads this with a <script> tag.

   Your own edits inside the DM OS live in your browser and are layered on top of
   this; re-pushing here never clobbers them (see the merge rule in
   dmos-store.js).

   ── CLEAN SLATE ──────────────────────────────────────────────────────────────
   This campaign is intentionally EMPTY, ready for your first real campaign.
   (The old "Marrow's Rest" demo lives on in git history if you ever want it.)
   An empty `docs` array means loadCampaign() seeds nothing, so a fresh DM OS
   opens blank. To seed a campaign from Cowork again, add documents to `docs`
   below and commit — same contract as before. */
window.DM_CAMPAIGN = {
  "campaign": null,
  "docs": []
};
