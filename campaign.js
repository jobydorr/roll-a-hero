/* Roll a Hero — the campaign, for the Dungeon Master OS.

   This file is COMMITTED and PUBLIC, exactly like data.js. That is fine and
   deliberate: the passcode on dm.html keeps players out of the running
   workspace, and nobody at the table is reading the repo. Content we build
   lands HERE — edit this file, commit, and it appears in the DM OS, the
   same way a new spell added to data.js appears in the builder. No server, no
   fetch, no separate files: dm.html loads this with a <script> tag.

   Your own edits inside the DM OS live in your browser and are layered on top
   of this; re-pushing here never clobbers them (see the merge rule in
   dmos-store.js). Bump `rev` on any doc you re-push under the same id.
   ⚠ The merge KEEPS the DM's parent/order on updates ("keep where the DM
   filed it") — so a re-push cannot MOVE a doc in an already-synced workspace.
   Structure changes need either a drag inside the OS or New workspace → Sync.
   ⚠ `campaign` must be a plain string — the UI renders it directly.

   ── CAMPAIGN ONE: THE FOLDED WORLD ──────────────────────────────────────────
   v7 (2026-08-11): every sheet is filed in exactly one place and is referred to
   from everywhere else with a [[wikilink]] in the prose. People live in the
   NPCs folder, creatures in the Monsters folder, and a scene that uses one
   names it rather than borrowing a copy of it. Casting is gone from the app
   entirely, so a document now appears exactly once in the story tree, always
   as its own sheet and always draggable — the rule the table asked for after
   borrowed placements proved impossible to tell apart from real filings.

   v6 (2026-08-10): scenes are folders that contain their components, and each
   of NPCs and Monsters has a top-level master folder holding every sheet.

   Act One (folder)
     └─ LASTLIGHT — the opening scene (folder)
          ├─ the run sheet (scene doc)
          └─ the fairground fight (encounter doc; handouts still to come)
   NPCs — the cast (folder):        Wenna, Tobin, Finch, Hettie
   Monsters — the bestiary (folder): snatch-goblin, crease-wolf, tear-ogre */
window.DM_CAMPAIGN = {
  "campaign": "The Folded World",
  "docs": [

  { "schema": 1, "id": "act1", "type": "folder",
    "title": "Act One — the rebellion is on a leash",
    "parent": null, "order": 10, "rev": 1,
    "tags": ["act1"], "leadsTo": [], "fields": {},
    "body": "Act One runs from the Lastlight ceremony to the turn. The staging ground for this act lives in the repo as ACT1.md; the bible is CAMPAIGN.md. What is pushed here is table-ready material. Each scene is a folder holding everything needed to run it; the people and monsters live in their own master folders and are pointed at with [[wikilinks]]." },

  { "schema": 1, "id": "f-lastlight", "type": "folder",
    "title": "LASTLIGHT — the opening scene",
    "parent": "act1", "order": 10, "rev": 4,
    "tags": ["act1", "session1"],
    "leadsTo": [], "fields": {},
    "body": "Session one, doubling as session zero. Everything needed to run the opening lives in this folder: the run sheet and the fairground encounter now; the handouts (reason cards, the Lastlight program) still to come. Cast on stage: [[npc-wenna|Wenna Ash]], [[npc-finch|Finch]], [[npc-hettie|Hettie Sarn]] (seen, not met) — and by the morning after, [[npc-tobin|Tobin Rell]]." },

  { "schema": 1, "id": "sc-lastlight", "type": "scene",
    "title": "LASTLIGHT — the run sheet",
    "parent": "f-lastlight", "order": 10, "rev": 3,
    "tags": ["act1", "session1", "opening"], "leadsTo": [],
    "fields": {
      "setting": "The Lastlight fairground outside the west wall. The city is long and thin, built along its crease; beside it runs the Cinder Draw — not a field but a canyon, folded into itself and pushed down, lined with bridges and refinement towers descending out of sight. The Hearthspire stands new against the wall, its crown near the underside of the town above — where the clock tower's hands are moving this morning, for the first time in living memory.",
      "read_aloud": "The whole city is walking out through the west gate, and everyone is walking the same way you are. Overhead hangs the country in the sky — upside-down roofs, a road you could never follow, and the clock tower every kid here grew up watching. Somebody's little sister says it first: the hands are moving. They have never moved. The grownups say it must be the wind up there. Today is Lastlight. The last Draw in the world closes today, the blight gets healed at last, and the new tower — the Hearthspire, the safest ever built, they have said it a hundred times — lights tonight. There are gray-iced blight-cakes if you have a coin, a paper lantern with one glowing grain of sunsalt in it if you are small enough, and a song everyone knows, with a verse about a harbor nobody has ever seen.",
      "what_happens": "The ceremony runs in three beats — the honored crews onto the white wagons, the Rectors closing the canyon, Finch setting the reliquary into the chamber — and then the pull finds no slack. The tear rips down the tower's face to the boy, the clock tower falls out of the sky, the sealed monsters pour through taking people, and the party fights its first fight. In the dust the criers call Finch fallen, Wenna asks her questions, and two Surveyors at the edge file four new faces."
    },
    "body": "WHAT THIS SCENE IS. Session one, doubling as session zero: the whole world on display, the first fight, and the machinery that collects the players' own material without anyone noticing a questionnaire.\n\nBEFORE ANYTHING HAPPENS — say the line: \"Each of you has your reason for being here today. I'll leave it to each of you to decide what that reason is.\" Nobody has to answer now. The adults take it as homework; each kid gets a reason card with four seeds and \"or make up your own\": someone you know is among the honored crews; you are looking for someone, and crowds are where you look; your family fought in the war and came to see what the peace bought; you came to work the crowd — perform, sell, compete, impress. Answers are collected in the dust, by [[npc-wenna|Wenna]]. Also, before the lighting, ask each hero: name one thing you carry that you would run back into danger for. Threaten it in the collapse.\n\n1 — THE FAIRGROUND. Run the read-aloud above. Let them wander: blight-cakes, grain-lanterns, the petition rail where a hoarse man says what he says every week (grateful for the Fold — and whose world is this, exactly?). Seed one thing per hero that does not line up (a stair with one step too many, a verse nobody else hears, a name that draws a blank). At the rope line a Surveyor is folding toy birds that actually flap, patient under a heap of children, its smile arriving a half-second late every time. During the speeches the ground shivers; the crowd does its little settling-joke laugh. Nobody runs.\n\n2 — THE HONORED CREWS. The Cinder Draw's last workers walk the aisle in garlands, and at the back come the faded — who do not walk so much as arrive, and when the crowd cheers, they wave: all together, once, like one hand. They are helped onto white wagons bound, the criers say, for their well-earned rest, and the send-off is celebrated like a wedding. The wagons roll out before the lighting. Nobody watches which way they turn. At the rope line an old woman with a ledger writes as each wagon passes, lips moving, counting — that is [[npc-hettie|Hettie Sarn]], and she is seen today, not met.\n\n3 — THE HEALING. READ ALOUD: \"The Rectors take their places along the canyon's rim — tall folded figures pleated into fans and crowns — and when they move, the Draw moves. The canyon closes down its whole length, bridges and towers and all, the way a drawer shuts on everything inside it. Where it was, there is a line in the earth. On one side of the line the grass is one green; on the other side, another. A stream runs up to the line and does not quite meet itself. A crow flies across and — skips. Ten thousand people watch a wound being hidden, and cheer a wound being healed.\"\n\n4 — THE LIGHTING. READ ALOUD: \"No lever. No torch. There is a small door at the tower's foot, built to take one offering, and a boy in his best shirt — Finch, seven, picked by lottery, you have heard his name all day — carries a glass case holding the last crust of sunsalt ever scraped from the Cinder Draw. He sets the old light into the new tower while the whole city holds its breath. Far above him, the crown begins to glow.\"\n\n5 — THE TEAR. READ ALOUD: \"The light goes wrong. The crown of the Hearthspire comes apart — and the tear does not stay at the crown. It rips DOWN the tower's face like a seam giving way: down, and down, to the little door, toward the boy. The sky bucks. The clock tower — the one that started ticking this morning — comes loose from the ceiling of the world and falls, end over end, three seconds, into the fairground. Finch runs. He is fast, and he is lucky, and he clears the falling stone in front of everybody — and then something long and gray comes out of the tear sideways, unfolds, and takes him. Then the rest come through. You know them. Everybody knows them. They are the monsters from every story your grandmother ever told — the ones the Folding sealed away. And they are not just hungry. They are taking people. Roll initiative — if you choose to stand.\"\n\n6 — THE FIGHT. The crunch lives in [[enc-lastlight|the fairground encounter]]: [[cr-snatch-goblin|snatch-goblins]], [[cr-crease-wolf|crease-wolves]], and the penned [[cr-tear-ogre|tear-ogre]]. Three staging rules. First, the monsters take: a grabbed person is carried toward the tear and can be saved any time before it — rescues, not kills, are the fight's real scoreboard. Second, every hero gets both halves: one civilian staged into their path to save (afterward the civilian says something that assumes a history — family, teacher, or somebody you owe?), and one person carried through beyond their help. The fight writes the rescue list; [[npc-finch|Finch]] is the name at the top everyone shares. Third, the Rectors are spectacle, not allies with dice: far off they fold a falling slab away above the grandstand and pinch a street shut to pen the worst of it — and they never roll, never enter the party's corner, and never save anyone the heroes could have saved.\n\n7 — THE DUST. READ ALOUD: \"It is over fast — ten minutes that felt like an hour. The tear is patched, the way a torn page gets taped. The paper people bow to the survivors and go back to writing down faces. The clock face lies broken in the road, and its hands are still moving. By sunset the criers are everywhere, all saying the same words: the tyrant struck at the cure. And brave little Finch — fallen. A hero. A state funeral to come. You were looking at him when it happened. Fallen is not the word.\"\n\nThen [[npc-wenna|Wenna Ash]] finds them — she was in the crowd all day and did not run — and does what recruiters do: she asks. What did you lose today? What have you lost before today? Why did you stand when everyone else ran? (This is the collection point for the reasons and the rest of the session-zero material; whatever they tell her is canon by morning.) She tells them the truth as she knows it: people went through that tear and are already being called fallen; her movement is the only one that goes in after the taken; the ministry permits it, records it, and never once helps; and what they have needed for years is somebody who can go in and come back out. Every word she believes. Most of it is true.\n\nAnd the two Surveyors at the edge of the ground have written down four new faces, and will file them by evening — which is how, tomorrow, the heroes acquire a clerk named [[npc-tobin|Tobin Rell]].\n\nEXITS AND PLANTS. Planted today, paid later: the white wagons nobody watched leave; the scar-line and its skipping crow; the clock hands that started this morning; the toy birds and their maker; Hettie counting; Finch \"fallen\"; the one each hero could not reach. The scene hands play to the transition: the Registry's summons (the Badge), the state funeral (the Empty Coffin), and the matter of the toys (the Paper Bird)." },

  { "schema": 1, "id": "f-npcs", "type": "folder",
    "title": "NPCs — the cast",
    "parent": null, "order": 20, "rev": 1,
    "tags": ["cast"], "leadsTo": [], "fields": {},
    "body": "Every named person in the campaign lives here — one sheet each, the single source of truth, no matter how many scenes they appear in. Scenes point at these sheets with [[wikilinks]]; hover a link for the peek, and use ＋ To the table on a sheet to put someone in the initiative roster." },

  { "schema": 1, "id": "f-monsters", "type": "folder",
    "title": "Monsters — the bestiary",
    "parent": null, "order": 30, "rev": 2,
    "tags": ["bestiary"], "leadsTo": [], "fields": {},
    "body": "Every campaign creature lives here — one sheet each, held IN this folder so the feed shows the full sheets, and linked from the scenes and encounters that use them. First residents, the Lastlight tear family: [[cr-snatch-goblin|the snatch-goblin]], [[cr-crease-wolf|the crease-wolf]], and [[cr-tear-ogre|the tear-ogre]]. The SRD starter creatures live separately in the 📖 Look up library; sheets here are this campaign's own." },

  { "schema": 1, "id": "enc-lastlight", "type": "encounter",
    "title": "The fairground fight — things through the tear",
    "parent": "f-lastlight", "order": 20, "rev": 3,
    "tags": ["act1", "session1"],
    "leadsTo": [],
    "fields": {
      "setup": "The Lastlight fairground, seconds after the tear. Initiative is opt-in — the fight starts when the heroes choose to stand. The scoreboard is rescues, not kills: every monster wants to leave with somebody, and a person carried into the tear is gone until the party goes in after them. Terrain to use hard: the grandstands (high ground, and one section groaning toward collapse), the fallen clockwork (cover, and a bell that can be rung), spilled grain-lanterns underfoot, the rope lines, and the scar-line where footing goes suddenly wrong.",
      "creatures": "Six [[cr-snatch-goblin|snatch-goblins]] in two waves of three, and three [[cr-crease-wolf|crease-wolves]]. Far off, one [[cr-tear-ogre|tear-ogre]] — penned by the Rectors, seen and never fought. Tuned for the table: four level-3 heroes (bard, fighter, two rangers). A player missing? Shed one goblin per empty chair and change nothing else.",
      "tactics": "Scripted opener, before initiative: the first thing through takes Finch. Goblins grab and drag toward the tear, twenty feet a turn — and any hit on a goblin makes it drop its person. Wolves never carry: they herd runners back toward the goblins and knock heroes down when they hunt in pairs. One rescue is staged into each hero's path, and one capture happens beyond each hero's reach, far side of the ground, no matter how well they fight. Give each hero a moment: the fighter holds the gap between the grandstands, the rangers make goblins drop captives with long shots, and the bard can steady the crowd itself — a stampede turned, a shouted verse that gives a dragged neighbor the nerve to twist free.",
      "reward": "No treasure — a fairground of witnesses. Every rescued civilian says something that assumes a history with their rescuer (bounded choice: family, teacher, or somebody you owe?). Wenna saw all of it, the Surveyors wrote all of it down, and the rescue list — [[npc-finch|Finch]] at the top — now belongs to the party."
    },
    "body": "Runs inside [[f-lastlight|LASTLIGHT — the opening scene]]; the read-alouds and the session-zero machinery are in [[sc-lastlight|the run sheet]]. The Rectors fight the same disaster as pure spectacle — never in the party's corner, never with dice (staging rules in the run sheet, beat 6)." },

  { "schema": 1, "id": "cr-snatch-goblin", "type": "creature",
    "title": "Snatch-goblin",
    "parent": "f-monsters", "order": 10, "rev": 1,
    "tags": ["tear", "minion"], "leadsTo": [],
    "fields": {
      "hp": "10", "ac": "12", "speed": "30 feet",
      "attack": "+3 to hit, 1d6 damage (small claws, smaller knives)",
      "trick": "The Snatch: instead of hurting somebody, it grabs a person its own size or smaller and drags them 20 feet toward the tear each turn. A grabbed person can twist free by beating 11 — and ANY hit on the goblin makes it drop whoever it is holding."
    },
    "body": "The classic goblin of the bad time, come through the tear sideways — knee-high greed with a sack. It does not especially want to fight; it wants to leave with somebody. Kill-count is beside the point in a snatch-goblin fight: drop-count is the fight. (SRD goblin chassis, reworded and reskinned.)" },

  { "schema": 1, "id": "cr-crease-wolf", "type": "creature",
    "title": "Crease-wolf",
    "parent": "f-monsters", "order": 20, "rev": 1,
    "tags": ["tear"], "leadsTo": [],
    "fields": {
      "hp": "14", "ac": "13", "speed": "40 feet",
      "attack": "+4 to hit, 2d4 damage (bite)",
      "trick": "Hunts folded: it slips through any gap — fence rails, table legs, a panicked crowd — without slowing, and when a packmate stands beside its target, a bitten hero must beat 12 or be knocked down."
    },
    "body": "The wolf from every grandmother's story, wrong in the daylight — it moves the way scissors move, and it looks flat when it turns. It never carries anyone; it herds runners back toward the goblins, which is worse. (SRD wolf chassis, reworded and reskinned.)" },

  { "schema": 1, "id": "cr-tear-ogre", "type": "creature",
    "title": "Tear-ogre — the penned one",
    "parent": "f-monsters", "order": 30, "rev": 1,
    "tags": ["tear", "heavy"], "leadsTo": [],
    "fields": {
      "hp": "30", "ac": "13", "speed": "30 feet",
      "attack": "+5 to hit, 1d8+3 damage (a fistful of fairground)",
      "trick": "The Sweep: once a round, everything beside it must beat 13 or be thrown 10 feet and knocked down."
    },
    "body": "The heavy that came through last at Lastlight — and the fight the party does NOT have. The Rectors pen it far off, a street folded shut around it, which is the crowd's first lesson in what the order can do and the table's first sight of the campaign's power ceiling. Statted here (Heroic band) for the day the party meets one inside, where no Rector is coming. (SRD ogre chassis, reworded and reskinned.)" },

  { "schema": 1, "id": "npc-wenna", "type": "npc",
    "title": "Wenna Ash — the recruiter",
    "parent": "f-npcs", "order": 10, "rev": 2,
    "tags": ["act1", "green-fields"], "leadsTo": [],
    "fields": {
      "looks": "Weathered and warm, dressed for standing all day. Scans every crowd face by face against a little sheaf of hand-drawn portraits, and does not run when the sky opens.",
      "wants": "The taken found and brought home, and her movement believed. She lays four places at her table and has three children, and cannot say why.",
      "voice": "Plain and steady. Never gives speeches; asks questions and then waits as long as it takes.",
      "secret": "She has no secrets of her own, which is the tragedy. She has never heard of the Armature; she does not know her expeditions are steered from above her head; and she does not know that the fourth place at her table belongs to the one taking Green Fields will never name. Everything she tells the party, she believes."
    },
    "body": "Green Fields' recruiter, six years in. Session one she works the Lastlight crowd, stands through the fight, and closes the session with the interview in the dust — which is also the campaign's collection point for the players' own material. The betrayal, when it lands, lands through her and not on her; she must be a person to the party long before then. Appears in: [[f-lastlight|LASTLIGHT]]." },

  { "schema": 1, "id": "npc-tobin", "type": "npc",
    "title": "Tobin Rell — the clerk sent to watch them",
    "parent": "f-npcs", "order": 20, "rev": 2,
    "tags": ["act1", "registry"], "leadsTo": [],
    "fields": {
      "looks": "Young, inky, over-neat; carries a satchel of forms the way other men carry shields. Has never been in a fight and stands like it.",
      "wants": "To do his job well — he has never once done a job badly — and to go unnoticed doing the other thing.",
      "voice": "Apologetic precision. Clears his throat before bad news, and writes down what he sees, accurately, every night.",
      "secret": "Two of them, discovered in this order: he is a mender (his grandmother's outlawed art; her hearth-spirit rides in a wooden darning egg in his coat pocket) — and he files nightly reports to a Registry office above Wenna's head that she has never dealt with. His doubt has a name: Ellum Wick, the friend who went into the creases two years ago and never came out."
    },
    "body": "Assigned to the party the morning after Lastlight, under the Accord's clause that no expedition enters the creases without a clerk to keep the record. Through Act One he is the party's healer — the ministry's watcher is the reason its quarry keeps getting back up. The party should learn his healing secret (a secret they keep FOR him) before they learn about the filings (the secret he kept FROM them). Appears in: [[f-lastlight|LASTLIGHT]] (aftermath)." },

  { "schema": 1, "id": "npc-finch", "type": "npc",
    "title": "Finch — the lamplighter",
    "parent": "f-npcs", "order": 30, "rev": 2,
    "tags": ["act1", "taken"], "leadsTo": [],
    "fields": {
      "looks": "Seven years old, best shirt, gap-toothed grin; was waving to the whole city right up until the sky reached out.",
      "wants": "To go home.",
      "voice": "Not yet — he is the name at the top of the rescue list.",
      "secret": "Publicly declared FALLEN — a hero's death, a state funeral, an empty coffin. In truth the first monster through the tear carried him off alive, best shirt, glass reliquary and all, in front of ten thousand people who are already softening what they saw."
    },
    "body": "Chosen by lottery to set the reliquary of the Cinder Draw's last crust into the Hearthspire's offering chamber. The tear ripped down the tower's face to the chamber; he outran the falling clock tower by a step and was taken by the first thing through. The party watched it happen, which makes them witnesses to something the ministry has already renamed. Working name. Appears in: [[f-lastlight|LASTLIGHT]]." },

  { "schema": 1, "id": "npc-hettie", "type": "npc",
    "title": "Hettie Sarn — the woman who did not clap",
    "parent": "f-npcs", "order": 40, "rev": 2,
    "tags": ["act1", "red-flag"], "leadsTo": [],
    "fields": {
      "looks": "Old and square-built, gray as weathered fence-wood, with a ledger under one arm. At the ceremony she is the only still thing in ten thousand people.",
      "wants": "To be proven wrong. She never is.",
      "voice": "Numbers first. Her method of recruitment is to open the ledger, turn it around, and wait.",
      "secret": "She ran the Cinder Draw for thirty-one years and accounted for more sunsalt than any living person. Her gray ledger shows the damage tracking the workings, the intake that never balances, and the shakes that follow the great pulls — and, kept quietest of all, a census of the faded, whose rest villages she has visited and found empty. Founder of the candle people."
    },
    "body": "Session one she is seen, not met: the old woman at the rope line, counting the white wagons into her ledger, not clapping. She is local — the farmland the gray ate was her family's. When the party finally crosses to her is an open question, and she is the only person who can carry the real rebellion after Tobin leaves. Appears in: [[f-lastlight|LASTLIGHT]] (unnamed)." }

  ]
};
