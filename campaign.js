/* Roll a Hero — the campaign, for the Dungeon Master OS.

   This file is COMMITTED and PUBLIC, exactly like data.js. That is fine and
   deliberate: the passcode on dm.html keeps players out of the running
   workspace, and nobody at the table is reading the repo. Content we build in
   Cowork lands HERE — edit this file, commit, and it appears in the DM OS, the
   same way a new spell added to data.js appears in the builder. No server, no
   fetch, no separate files: dm.html loads this with a <script> tag.

   Your own edits inside the DM OS live in your browser and are layered on top of
   this; re-pushing here never clobbers them (see the merge rule in
   dmos-store.js). */
window.DM_CAMPAIGN = {
  "campaign": "Marrow's Rest",
  "docs": [
    {
      "schema": 1,
      "id": "fold_act_one",
      "type": "folder",
      "title": "Act One — The Bell That Won't Ring",
      "parent": null,
      "order": 100,
      "rev": 1,
      "updated": "2026-07-08T15:00:00Z",
      "tags": [
        "act-1"
      ],
      "leadsTo": [],
      "fields": {},
      "body": "The village of Marrow's Rest has a bell tower, and the bell has not rung in eleven years. Everyone in town has a different reason why, and every one of them is a lie — not a cruel lie. A frightened one.\n\nStart the party at the market. Let them hear the silence before they hear the story."
    },
    {
      "schema": 1,
      "id": "doc_beat_hollow_bell",
      "type": "beat",
      "title": "The Hollow Bell",
      "parent": "fold_act_one",
      "order": 300,
      "rev": 4,
      "updated": "2026-07-08T15:00:00Z",
      "tags": [
        "act-1",
        "mystery"
      ],
      "leadsTo": [
        {
          "to": "doc_enc_belfry_ambush",
          "label": "if they ring it",
          "kind": "then"
        },
        {
          "to": "doc_beat_quiet_road",
          "label": "if they walk away",
          "kind": "alt"
        }
      ],
      "fields": {
        "hook": "A child's chalk drawing on the tower door shows the bell with a face. Underneath, in a shaky hand: DON'T WAKE HER.",
        "read_aloud": "The rope hangs down through the dark like something asleep. Dust turns slowly in a bar of light. Somewhere above you, very faintly, something breathes in time with the wind.",
        "if_they": "…climb the tower, they find [[doc_creature_bell_wight]] curled in the bell's throat.\n…ask around town first, [[doc_npc_marla]] will tell them the truth for the price of a hot meal.\n…ring the bell without looking up, go straight to [[doc_enc_belfry_ambush]].",
        "outcome": "The party learns the bell isn't cursed. It's occupied — and whatever is in there is more frightened of Marrow's Rest than the town is of it."
      },
      "body": "This is the beat that teaches the table how this campaign works: the scary thing is usually a scared thing.\n\n[[doc_npc_marla]] is the shortcut. She's been feeding the creature scraps for years and has never told a soul, because she assumed she'd be blamed. If the party is kind to her, she hands them the whole mystery in one conversation. If they bully her, she tells them to ring the bell and see for themselves — which is how you land on [[doc_enc_belfry_ambush]].\n\nThe link below is deliberately broken, to prove the feed survives a dangling reference: [[doc_beat_quiet_road]]."
    },
    {
      "schema": 1,
      "id": "doc_npc_marla",
      "type": "npc",
      "title": "Marla Quickfoot",
      "parent": "fold_act_one",
      "order": 400,
      "rev": 2,
      "updated": "2026-07-08T15:00:00Z",
      "tags": [
        "act-1",
        "friendly"
      ],
      "leadsTo": [
        {
          "to": "doc_creature_bell_wight",
          "label": "knows the truth about",
          "kind": "knows"
        }
      ],
      "fields": {
        "looks": "A halfling baker in her sixties, flour to the elbows, one shoe always untied. She never looks up at the tower, not once, not even by accident.",
        "wants": "To stop being afraid of the thing she's been feeding. And, quietly, for someone to tell her she did the right thing.",
        "voice": "Talks fast and cheerfully about nothing. Goes very still and quiet the moment anyone says the word 'bell'.",
        "secret": "Eleven years ago she found [[doc_creature_bell_wight]] hiding in the belfry, alone and starving. She has left bread on the tower steps every night since. She has never told anyone, because she was certain the town would blame her for it."
      },
      "body": "Marla is the emotional centre of Act One. Play her warm and busy and completely unwilling to discuss the tower.\n\nIf the party is gentle with her — buys bread, helps carry a sack, asks about her day before asking about the bell — she cracks. That's the design: kindness is the key that fits this lock, not persuasion, not intimidation, and definitely not a d20.\n\nIf someone insists on rolling, let them roll, then have her answer the *kindness* rather than the number."
    },
    {
      "schema": 1,
      "id": "doc_creature_bell_wight",
      "type": "creature",
      "title": "The Bell Wight",
      "parent": "fold_act_one",
      "order": 500,
      "rev": 1,
      "updated": "2026-07-08T15:00:00Z",
      "tags": [
        "act-1",
        "not-really-a-monster"
      ],
      "leadsTo": [],
      "fields": {
        "hp": "22",
        "ac": "13",
        "speed": "30 feet, and it climbs walls like a spider",
        "attack": "+4 to hit, 1d6+2 — but only ever to push someone away from the stairs. It has never once pressed an attack.",
        "trick": "Toll — once per fight, it strikes the bell with its head. Everyone who can hear it must beat 11 or be knocked back and deafened until the end of their next turn. It hates doing this."
      },
      "body": "Not undead. Not evil. A shy, sound-eating thing that crawled into the bell as a child and grew up in the dark, and has been living on [[doc_npc_marla]]'s bread ever since.\n\nIt fights only to be left alone. If a player ever speaks to it kindly — or offers it food — it stops fighting immediately and hides behind the bell.\n\nRemember the table rule: nobody dies here. If a hero drops, the wight panics, drags them somewhere soft, and flees."
    },
    {
      "schema": 1,
      "id": "doc_enc_belfry_ambush",
      "type": "encounter",
      "title": "Up in the Belfry",
      "parent": "fold_act_one",
      "order": 600,
      "rev": 3,
      "updated": "2026-07-08T15:00:00Z",
      "tags": [
        "act-1",
        "combat",
        "avoidable"
      ],
      "leadsTo": [],
      "fields": {
        "setup": "The rope moves. Something above screams — a sound like a bell rung underwater — and [[doc_creature_bell_wight]] comes down the inside of the tower headfirst.",
        "creatures": "1 × the Bell Wight. That is the whole encounter. Do not add more.",
        "tactics": "It fights to reach the stairs and get past them, never to finish anyone. Every round, describe it looking for a way out. If anyone offers it food, speaks softly, or steps aside — the fight is over that instant.",
        "reward": "Nothing you can carry. If they solve it without hurting it, the bell rings at dusk on its own, and every person in Marrow's Rest comes out into the street to hear it."
      },
      "body": "This is a fight the party is meant to *win by stopping*.\n\nRun one round of real combat so the danger is honest. Then, on round two, have the wight do something no monster does: it hesitates. It looks at the stairs. It looks at the hero blocking them. Let a player notice.\n\nIf they fight it to zero anyway, it collapses and Marla comes running up the stairs shouting for them to stop — and the story continues, just sadder. That's allowed. Nothing dies."
    }
  ]
};
