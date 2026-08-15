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
   v12 (2026-08-14): THE WAY IN. The Reactor is NOT a dungeon and the party never
   goes inside the tower — the dungeon is the fold itself, and it belongs to the
   session after this one. The directive is deliberately plain: eleven people are
   on the other side, go in and bring back who you can, the order will open the
   way and hold it. Two beats and then stop — the tear site with its ring and the
   sound of voices under the ground, and the opening, which is where the session
   ends with the party stepping through. Nothing on the far side is written yet
   and nothing should be said about it at the table.

   v11 (2026-08-14): the scar-line errand is CUT — there is no goose chase, and
   the assignment was never false. The Hearthspire is no longer "patched"
   anywhere: nothing was repaired, because repair needs slack; the ground around
   its base came apart and a ring of Rectors holds it permanently, which is the
   first visible evidence that the occupation spends what it cannot replace.
   Tobin no longer voices a suspicion on day one. The warden sheet is in the
   bestiary but unused in Act One. And the paper-as-material reading is gone from
   every document: the Surveyors are folded things and the cosmology uses folding
   to teach a shape, but a broken interdimensional condenser is not a torn page
   with tape on it.

   v10 (2026-08-14): Red Flag becomes the public instrument of blame, and it is
   public before anybody asks the party for anything. A crier with a bell and a
   paper works the road while the dust is still settling (LASTLIGHT beat 5), a
   printed sheet is in every room at the Ossuary that night (THE COMMISSION beat
   2), warrants are up on the boards at every crossing on the walk to the Set
   Square the next morning (beat 3), and the Rector then says it out loud, in
   quoted dialogue, as the fourth telling and the one that carries a signature
   (beat 4). CAMPAIGN.md §3 records the frame-up as standing practice, and its
   §6 opening was reconciled to what the OS actually runs — the geography, the
   criers' two-part story, no Wenna in the dust, no reason cards, and the boy
   left unnamed until his mother says it.

   v9 (2026-08-13): places get their own master folder, Locations, alongside NPCs
   and Monsters, fronted by a ▶ WHERE THEY CAN GO index that says what the party
   can DO at each one rather than only what it looks like. Ten places in the city
   plus the two THE COMMISSION already used. A separate IF THERE IS TIME folder
   under Act One holds short optional material: a slip, which can be dropped
   anywhere in ninety seconds, and the thing in Ganny's preserves, which is
   fifteen minutes and plants a clue. The city is named DUNLATH (settled by Joby,
   2026-08-13).

   v8 (2026-08-11): Act One gains its second scene, THE COMMISSION. A scene that
   runs as a chain of events now files as a folder holding ONE index document —
   titled so it is unmistakable in the tree — whose "Run these in order" field is
   a numbered list of [[wikilinks]] to a beat document per step, with the places
   and the people linked alongside. The index is the only thing the DM reads at
   speed; everything else is opened when its step arrives. This is the standing
   layout for any sequence of events from here on.

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
     ├─ LASTLIGHT — the opening scene (folder)
     │    ├─ the run sheet (scene doc)
     │    └─ the fairground fight (encounter doc; handouts still to come)
     ├─ THE COMMISSION — the morning after (folder)
     │    ├─ ▶ RUN THESE IN ORDER (scene doc — the index; read this one)
     │    └─ six beat docs, one per step, numbered 1–6
     └─ IF THERE IS TIME — fast pieces (folder): a slip, Ganny's preserves
   NPCs — the cast (folder):        Wenna, Tobin, Finch, Hettie, Sela, the Rector
   Monsters — the bestiary (folder): snatch-goblin, crease-wolf, tear-ogre
   Locations — the places (folder):  ▶ WHERE THEY CAN GO (index) + a sheet per
     place. Master folders CONTAIN their sheets; scenes point at them by link.
     The Ossuary and the Set Square moved here from THE COMMISSION in v9. */
window.DM_CAMPAIGN = {
  "campaign": "The Folded World",
  "docs": [
    {
      "schema": 1,
      "id": "world-fold",
      "type": "note",
      "title": "▶ THE FOLDED WORLD — the shape of things",
      "parent": null,
      "order": 5,
      "rev": 2,
      "tags": [
        "world",
        "index"
      ],
      "leadsTo": [],
      "fieldDefs": [
        [
          "shape",
          "The shape of it — show them the pictures"
        ],
        [
          "history",
          "The history, the way the world tells it"
        ],
        [
          "seen",
          "What they can see from the street"
        ],
        [
          "truth",
          "What is actually true — you only"
        ]
      ],
      "fields": {
        "shape": "PLAYER-FACING. Show the pictures while you say it.\n\n\"The world is not a ball. It is a shape with flat sides — a lot of them — folded closed like a paper lantern, and we live on the faces of it.\n\nBetween the faces there are gaps. Look through a gap and you see the other faces: land, sideways or upside down from where you are standing, with roads on it and rivers and roofs. The nearest one hangs over Dunlath close enough to count the chimneys.\n\nAnd inside our shape there is another one, smaller. And inside that, another. On a clear night you can see a long way in, lit at the edges.\n\nThe sun is outside all of it, and the light comes in through the gaps. That is why the days go strange at the corners, and why nothing here throws a proper shadow at noon.\n\nOut in the dark there are other worlds folded up like ours, going round the same sun. Nobody has been to one.\"\n\nThe shapes shift, very slowly, over ages — which is why no old map is right and why the creases wander.",
        "history": "PLAYER-FACING. This is the whole history as any Dunlath nine-year-old would tell it, and every word of it is what the world believes.\n\n\"Before all this, the world was wide. It took a season to cross what you can walk in a day now. Grain rotted before it reached the city. A letter came a year too late to matter. And in the empty country between towns there were things that ate people — whole villages, some years. Your great-grandparents called it the bad time, and they were not being dramatic.\n\nThen a man set out to fix it. The finest wizard anyone had heard of, and he could reach under the world and take hold of the cloth it is made from. He reached further down than anyone ever had — and he found marks in that cloth that nobody here had made. Creases, left by hands that were not hands. Something on the other side noticed him looking.\n\nThey came through to us. Tall, courteous, folded people, made of something like paper. For a whole year they did nothing but measure — the roads, the rivers, the distance between one town and the next. That is why we call them what we call them.\n\nThey brought a gift, and the gift is the reason your lamp is lit: sunsalt, a crystal of the light of their own world. And they brought an idea. Fold your world, they said, and the folding will press sunsalt out of it the way a press gets cider out of apples, and there will be no more want and no more distance, ever again.\n\nSo he folded it. He is the Foldwright, and everything you can see is his work.\n\nHe folded the wild country away into sealed pockets and shut the monsters of the bad time inside them, and that is why children walk to the next village on their own now. He folded the far places close together, so a thing grown three hundred miles away is on your table the same week. And when the work was done he had passed through his own folding and come out the other side of being a man — finished, they say. The first and only one of us ever raised into their kind.\n\nHe sits a high seat that no road goes to, veiled from the crown of his head to the floor, because none may look on the face that folded the world. His ministry keeps the roads and the ledgers in his name, and they are ever so sorry about the fences.\n\nNot everyone was grateful. A generation ago there was a war about it, and it was long and it was ugly, and you cannot kill a Surveyor — strike one down and it comes apart into flat pieces and slides off through the air and is back inside a month. So the war ended at a table instead. That is the Accord: nobody is punished for the war, every household is provided for, anyone may stand up and petition, and anyone may go looking for what the creases took.\n\nAnd here we are. Nobody in this city is hungry. Nobody is cold. There is a lamp in every window and a fair share for every house. The ground shakes now and then, and everybody will tell you the same thing about that: it is only the settling. The world easing itself into its finished shape.\"",
        "seen": "The land overhead, close enough to make out roofs and a road and a clock tower.\nScar-lines: dead straight seams in the ground where something was folded shut.\nCreases, where the land changes angle for no reason at all.\nWrinkles — a cellar corner, a stair, a doorway that does not meet itself.\nLight coming in low and wrong at the corners of the sky.\nAnd sunsalt in every lamp, which is the world being pressed, though nobody puts it that way.",
        "truth": "DM ONLY. None of this is known to anyone in Dunlath, and the party must not learn it early. Full account in CAMPAIGN.md §1.\n\n• IT NEVER FINISHED. The Foldwright read the design halfway through and understood that the world was not being folded into a shelter but into an ENVELOPE — a copy of the Surveyors' own dimension, folded, finished, closed, and addressed. Something had already begun to arrive at the center to collect it.\n• So he jammed the working at its midpoint, pinned the half-arrived thing there, and it cost him the greater part of himself. He fled into the Snarl with the machine that governs the fold, and he is there now, hollowed, holding it.\n• THE SHAKING IS NOT THE SETTLING. It is his grip slipping, and it is getting worse.\n• The cities that went into the creases went in with everyone living in them, and the folding creased the memory shut too, so the world does not know what it lost.\n• The veiled figure on the high seat is not the Foldwright. It is the First Surveyor, wearing a dead man's name because the name carries authority the paper people never could.\n• And one rebellion is owned by the people it petitions.\n\nThe Surveyors are not from another folded world in this orbit. They are INTERDIMENSIONAL — they came through portals from their own dimension entirely, which is where the Finished World is."
      },
      "body": "The first thing to read. Everything in the first three fields is common knowledge — a nine-year-old in Dunlath could tell you all of it — so the party knows it already and finds none of it strange. It gets strange when something stops working.\n\nShow the geometry pictures while you read the shape. The words do half the job and the picture does the other half, and children get the nested-shell idea instantly from a drawing and slowly from a paragraph."
    },
    {
      "schema": 1,
      "id": "act1",
      "type": "folder",
      "title": "Act One — the rebellion is on a leash",
      "parent": null,
      "order": 10,
      "rev": 1,
      "tags": [
        "act1"
      ],
      "leadsTo": [],
      "fields": {},
      "body": "Act One runs from the Lastlight ceremony to the turn. The staging ground for this act lives in the repo as ACT1.md; the bible is CAMPAIGN.md. What is pushed here is table-ready material. Each scene is a folder holding everything needed to run it; the people and monsters live in their own master folders and are pointed at with wikilinks."
    },
    {
      "schema": 1,
      "id": "f-lastlight",
      "type": "folder",
      "title": "LASTLIGHT — the opening scene",
      "parent": "act1",
      "order": 10,
      "rev": 7,
      "tags": [
        "act1",
        "session1"
      ],
      "leadsTo": [],
      "fields": {},
      "body": "Before anything else, read [[world-fold|▶ THE FOLDED WORLD]] — it is the world in one page and it has the words to say at the table.\n\nSession one. Everything needed to run the opening lives in this folder: the run sheet and the fairground encounter now; the handouts (the Lastlight program) still to come. Cast on stage: [[npc-wenna|Wenna Ash]], [[npc-hettie|Hettie Sarn]] (seen, not met), and the boy who carries the reliquary — who is [[npc-finch|Finch]] on this page and NOWHERE at the table, because the party is not told his name today and does not learn it until his mother says it in [[b-comm-6|the last beat of the following scene]]. By the morning after they also have [[npc-tobin|Tobin Rell]]. What comes next is [[f-commission|THE COMMISSION]]."
    },
    {
      "schema": 1,
      "id": "b-last-1",
      "type": "beat",
      "title": "1 — The walk up: through Dunlath to the gate",
      "parent": "f-lastlight",
      "order": 10,
      "rev": 2,
      "tags": [
        "act1",
        "session1"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "The best day of the year, and the whole city is walking the same direction. Open here so the players get twenty minutes of a world worth saving before anything happens to it.",
        "read_aloud": "\"The whole city is walking out through the west gate, and everyone is walking the same way you are. Overhead hangs the country in the sky — upside-down roofs, a road you could never follow, and the clock tower every kid here grew up watching. Somebody's little sister says it first: the hands are moving. They have never moved. The grownups say it must be the wind up there.\"",
        "env": "• SIGHTS — fresh bunting across every street, not a day old. Garlands on every house door. The Emporium standing open and completely empty. Shutters down on the Glasshouse with a board reading BACK TONIGHT — LATE.\n• PEOPLE — best cloth, festival ribbons pinned on, everybody slightly too warm and determined not to mention it.\n• SOUNDS — bells from three directions not agreeing with each other. A drum somewhere ahead. The crowd, which is the sound of people certain that today is going to be good.\n• SMELLS — hot fat, honey, crushed grass once they are past the gate, and the faint mineral smell of sunsalt.\n• UNDERFOOT — swept stone, dropped ribbon, paper flags. Somebody is selling them on the corner and somebody else is giving them away.\n• ODD, and nobody can explain it — every window in the city has a lamp lit, in broad daylight. It is simply the custom on this day.",
        "if_they": "…look at anything, it is open, bright and free today. Every shop is shut with a note on the door. Every window has a lamp lit in broad daylight, which is the custom and which nobody can explain. Children have paper flags. Somebody is selling them at the corner and somebody else is giving them away.\n\n…dawdle, let them. The crowd carries them along at its own pace and they will not miss anything.\n\n…go through the gate, the ground drops away and the whole valley is in front of them. Hand straight to [[b-last-2|the fairground]].",
        "outcome": "Out through the west gate and down the slope, in a crowd, in the best mood any of them has been in for a year."
      },
      "body": "SEED ONE THING PER HERO that does not line up, said once and not explained — a stair with one step too many, a verse of a song nobody else seems to hear, a name that draws a blank from someone who should know it. Do not follow up. These are the players' threads, not yours.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "b-last-2",
      "type": "beat",
      "title": "2 — The fairground: the view, and the games",
      "parent": "f-lastlight",
      "order": 20,
      "rev": 6,
      "tags": [
        "act1",
        "session1",
        "comedy"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "The establishing shot of the entire campaign, and then half an hour of a fair. Let them play. Everything that happens later is measured against how good this was.",
        "read_aloud": "\"Below the gate the ground opens out, and you can see the whole of it at once.\n\nThe fairground first — tents, ropes, banners, ten thousand people and more coming. Beyond it, standing over everything, the Hearthspire: white and new and gleaming, banded towers and arches at the base with pipework curving between them, and out of the middle one spire going up and up to a crown that is not lit yet.\n\nAnd past the tower, the country of the Draws. Straight-sided channels cut into the flats, running for miles, dropping so far down you cannot see the bottom of them from here. All of them dead and dry except the last one, and along the rim of that one, tall folded figures are taking their places.\n\nAnd down at the rope line, sitting on the grass with a heap of children all over it, there is one of the paper people. It is folding birds. It takes a square of paper, its hands move for a second or two, and it hands the bird to whichever child is nearest — and the birds FLAP. Properly flap, on their own, and get a little way up before they come down. It has been doing this since the gates opened. It does not appear to want anything.\"",
        "env": "• SIGHTS — tents, rope lines and banners; the Hearthspire white and unlit standing over all of it; the grandstand being fussed over by people in good coats; the Draws beyond, going down out of sight.\n• SOUNDS — a drum, a barker, a hundred children, and under it the crowd, which is the noise of people certain today will be good.\n• SMELLS — hot fat, sugar, trampled grass, animals, and ten thousand warm people.\n• UNDERFOOT — churned grass going to mud in the busy lanes, sawdust laid over the worst of it, dropped food everywhere.\n• IN THEIR HANDS — a gray-iced blight-cake, a paper lantern with one grain of sunsalt in it, a ribbon, a dyed feather.\n• THE BIRD-FOLDER — a paper person at the rope line, buried in children, folding birds that flap. Give one to any hero who goes near it. This is the single most important object in the session and nobody at the table should know that.\n• ODD, said once and not explained — a stair with one step too many, a verse of the song nobody else seems to hear, a name that draws a blank from somebody who should know it.",
        "if_they": "…want to play, see the games below. Give each a single roll and move on fast.\n\n…wander the stalls: gray-iced blight-cakes for a coin, paper lanterns with one glowing grain of sunsalt inside for anyone small enough to be given one free, ribbons, dyed feathers, roast nuts, and a man at a petition rail saying what he says every week — grateful for the Fold, and whose world is this exactly — while half the crowd nods and keeps walking toward the food.\n\n…go to the bird-folder, it will fold one for any hero who asks, and for any hero who does not ask but stands there long enough. It is endlessly patient, it is being climbed on, and it is having a lovely time. Ask the player what their bird looks like.\n\n…ask it anything, it answers honestly and at slightly too much length, the way somebody does when a child has finally asked them about their hobby.",
        "outcome": "Fed, hot, carrying a paper bird and a ribbon, and enjoying themselves. Then the drums change and everybody starts moving toward the grandstand — [[b-last-3|the ceremony]]."
      },
      "body": "THE GAMES. One roll each, no consequences, purely for the fun of it. Award something silly and worthless for a win.\n\n• Knock the hat off the post with a beanbag — beat 12.\n• Guess the weight of a stone brought up out of the Draw — beat 15. Nobody has ever won this and the stone is heavier than it has any right to be.\n• The greased pole, with a ham on the top — beat 14, and a crowd gathers.\n• Race a paper bird against another child's, down the length of a rope — beat 10, and you may cheat.\n• Have your trade guessed by a man in a red coat, or win a cake — beat 13 to stump him. He will guess a hero's trade correctly and unnervingly fast.\n• Blight-cake eating, against a nine-year-old, for a ribbon — beat 16, and the nine-year-old is a professional.\n\nTHE BIRD-FOLDER IS THE ONE THING TO MAKE SURE THEY SEE. It is in the read-aloud on purpose, so it cannot be missed: the same hands, the same fold and the same toy come back in [[b-comm-6|the last beat of THE COMMISSION]], where a five-year-old hands the party a bent one on a step. That payoff is worth more than anything else in this session and it costs nothing here — just let the kids have a paper bird each.\n\nAlso here and NOT to be pointed at: an old woman at the rope line with a ledger under her arm, writing, not smiling. That is [[npc-hettie|Hettie Sarn]]. And a woman working through the crowd looking at faces against a sheaf of little drawings — [[npc-wenna|Wenna Ash]], who will find them properly this evening.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "b-last-3",
      "type": "beat",
      "title": "3 — The ceremony: the crews, the wagons, the healing",
      "parent": "f-lastlight",
      "order": 30,
      "rev": 2,
      "tags": [
        "act1",
        "session1"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "The state at its most generous and most beautiful, doing something enormous in public, and every disturbing thing in it is going past too fast and too pleasantly for anyone to catch.",
        "read_aloud": "THE CREWS: \"The Cinder Draw's last workers come down the aisle in garlands, and the noise is deafening, and they are loving it. And at the back come the faded — the ones who worked the deepest, longest. They do not walk so much as arrive. And when the crowd cheers them, they wave: all together, once, like one hand.\"\n\nTHE HEALING: \"The Rectors take their places along the canyon's rim — tall folded figures pleated into fans and crowns — and when they move, the Draw moves. The canyon closes down its whole length, bridges and towers and all, the way a drawer shuts on everything inside it. Where it was, there is a line in the earth. On one side of the line the grass is one green; on the other side, another. A stream runs up to the line and does not quite meet itself. A crow flies across and — skips. Ten thousand people watch a wound being hidden, and cheer a wound being healed.\"",
        "env": "• SIGHTS — the roped aisle, garlands, the grandstand full; the Rectors spaced along the canyon rim a long way off and very visible; two Surveyors at the edge with tablets, writing all day.\n• SOUNDS — a roar for the crews, and then, when the Draw closes, nothing at all. The loudest thing that happens today is the silence after.\n• SMELLS — crushed grass, hot bodies in good cloth, and the faint mineral smell of sunsalt off the lamps.\n• UNDERFOOT — packed in shoulder to shoulder, and nobody can go anywhere. That is not hostility, it is ten thousand people.\n• LIGHT — flat midday, no shadows worth the name, everything a bit too bright to look at directly.\n• THE WAGONS — white, clean, quiet on their wheels, and gone before the main event.",
        "if_they": "…ask about the faded, anyone will tell them warmly: they gave the most, so they get the best rest. White wagons, a good village, and no more work ever again.\n\n…watch the wagons go, they roll out before the lighting and nobody watches which way they turn. The old woman at the rope line writes down each one as it passes, lips moving, counting.\n\n…try to reach the crews or the wagons, the crowd is ten thousand deep and cheerful and immovable. No hostility, no guards. They simply cannot get there, today.",
        "outcome": "The Draw is shut, the wagons are gone, the crowd is at its loudest, and the drums stop for [[b-last-4|the lighting]]."
      },
      "body": "HOW IT IS LAID OUT. A grandstand for the ministry and the guilds. A roped aisle from the fairground to the tower's foot. Ten thousand standing. Rectors spaced along the rim of the Draw, a long way off and very visible. Two Surveyors at the edge of the ground with tablets, writing down faces, all day, cheerfully.\n\nWHO IS HERE: [[npc-hettie|Hettie Sarn]] at the rope line with her ledger. [[npc-wenna|Wenna Ash]] working the crowd. The honored crews. The faded. The Rectors. Everybody in Dunlath.\n\nTHE THREE THINGS GOING PAST TOO FAST: the faded waving in unison; the white wagons leaving before the main event with nobody watching them go; and an old woman counting them. Say each once. Do not linger and do not repeat them.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "b-last-4",
      "type": "beat",
      "title": "4 — The lighting, and the tear",
      "parent": "f-lastlight",
      "order": 40,
      "rev": 2,
      "tags": [
        "act1",
        "session1"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "Ninety seconds from the most beautiful thing any of them has ever seen to the worst. Do not rush it and do not warn them.",
        "read_aloud": "THE LIGHTING: \"No lever. No torch. There is a small door at the tower's foot, built to take one offering, and a boy in his best shirt, seven or so, picked by lottery, carries a glass case holding the last crust of sunsalt ever scraped from the Cinder Draw. He sets the old light into the new tower while the whole city holds its breath. Far above him, the crown begins to glow.\"\n\nTHE TEAR: \"The light goes wrong. The crown of the Hearthspire comes apart — and the tear does not stay at the crown. It rips DOWN the tower's face like a seam giving way: down, and down, to the little door, toward the boy. The sky bucks. The clock tower — the one that started ticking this morning — comes loose from the ceiling of the world and falls, end over end, three seconds, into the fairground. The boy runs. He is fast, and he is lucky, and he clears the falling stone in front of everybody — and then something long and gray comes out of the tear sideways, unfolds, and takes him. Then the rest come through. You know them. Everybody knows them. They are the monsters from every story your grandmother ever told — the ones the Folding sealed away. And they are not just hungry. They are taking people. Roll initiative — if you choose to stand.\"",
        "env": "• BEFORE — the drums stop and ten thousand people go quiet at once. It is the quietest the day ever gets and it is worth a real silence at the table.\n• LIGHT — the crown waking is warm, slow and genuinely lovely. What comes after is not a color anybody here has a word for.\n• SOUNDS — the tower opening is not a crack or a bang. It is a long tearing, and it comes from directly overhead.\n• UNDERFOOT — the ground bucks once, hard, and everybody standing goes down or nearly.\n• THE FALL — three seconds, end over end, and it lands in the fairground.\n• AFTER — dropped grain-lanterns all through the grass, still glowing. That is what the fight is lit by.",
        "if_they": "…try to reach the boy, they are four hundred yards away in a crowd of ten thousand that has just begun to run. Nobody gets there. This is not a failure and should never be framed as one.\n\n…run instead of standing, let them, and let them get somebody out. Initiative is opt-in and the fight starts when they choose it.",
        "outcome": "Straight into [[enc-lastlight|the fairground fight]]. Nobody has said the boy's name, and nobody will until [[b-comm-6|his mother says it]] tomorrow."
      },
      "body": "THE BOY IS NOT NAMED. Not by the criers, not by an official, not by you. See [[npc-finch|his sheet]].\n\nBEFORE THE LIGHTING, ask each hero: name one thing you carry that you would run back into danger for. Then threaten it in the collapse.\n\nThe clock tower falling is three seconds long. Count it out loud.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "b-last-5",
      "type": "beat",
      "title": "5 — The dust",
      "parent": "f-lastlight",
      "order": 60,
      "rev": 5,
      "tags": [
        "act1",
        "session1"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "Ten minutes that felt like an hour, and then the quiet. Let it be quiet for a moment before anybody official arrives.",
        "read_aloud": "\"It is over fast — ten minutes that felt like an hour. Whatever the paper people have done to the tower they are still doing: a ring of them has come down off the ceremony and taken places on the ground at its foot, evenly spaced, facing outward, and none of them has moved since. The rest bow to the survivors and go back to writing down faces. The clock face lies broken in the road, and its hands are still moving. Nobody can tell you how many people went through. The number the ministry settles on by evening is eleven, and everybody who was standing where you were standing knows it was more than that.\"\n\nBY DUSK, IF THEY ARE STILL OUT: \"A crier comes up the road with a bell and a paper, and he is not shouting a number. He is shouting a name. Red Flag — refusers, the ones who kept the war banner when the movement furled it — broke the Hearthspire. Sabotage at the lighting. Enemies of the Accord. Anyone with knowledge is to present themselves at the Registry, and there is a reward. He rings the bell and goes on to the next corner, and behind him the crowd begins saying the name to each other as though they had known it all along.\"",
        "env": "• SIGHTS — the festival is still up: bunting, half-struck stalls, a carousel nobody has dismantled. The clock face lying broken in the road with its hands still moving.\n• SOUNDS — ten thousand people calling names, which does not sound like screaming at all; it sounds like a crowd looking for its coats. A bell ringing somewhere that nobody is answering.\n• SMELLS — hot fat still coming off a stall nobody went back to turn off. Crushed sugar, and dust over everything.\n• UNDERFOOT — mud, trampled paper flags, and grain-lanterns still glowing in the grass.\n• THE RING — a dozen paper people walk down off the ceremony, take places on the ground at the tower's foot, and do not move again. Say it once. Do not explain it.\n• LIGHT — an ordinary bright afternoon carrying on as though nothing has happened, which is the worst of it.",
        "if_they": "…look for the boy from the tower, he is gone, and so are others, and nobody official will say a number until evening.\n\n…help, there is a great deal of it to do and they should be allowed to do it until they are exhausted. It will be noticed.\n\n…count for themselves, they will get more than eleven, and so will everyone else who tries.\n\n…press the crier, he does not know anything. He was handed the paper an hour ago, he is on his ninth corner, he is nineteen, and he is thrilled to have been given something important to do.",
        "outcome": "Two Surveyors at the edge of the ground have written down four new faces and will file them by evening.\n\nAnd one of them is walking over. Hand straight to [[b-comm-1|THE COMMISSION, beat 1]] — the congratulations, the rooms at [[loc-ossuary|the Ossuary]], and the summons in the morning."
      },
      "body": "Play the quiet. The fight is over, the paper people are bowing to survivors and going back to writing down faces, and the hands on the broken clock are still moving in the road.\n\nTHE COUNT IS THE ONLY THING TO PLANT. Eleven is the number the ministry settles on. Everyone who was standing where the party was standing knows it was more. Say it once and let it sit.\n\nNobody recruits them today. [[npc-wenna|Wenna]] does not appear until [[b-comm-5|THE COMMISSION, beat 5]], where she is their contact between the awarding and going off with [[npc-tobin|Tobin]].\n\nTHE NAME GOES OUT BEFORE ANYBODY ASKS THE PARTY FOR ANYTHING, and that order matters. By the time [[b-comm-4|the Rector says it to their faces]] tomorrow they will have heard it from a crier, read it on a sheet at the Ossuary, and seen it on a warrant board on the walk up. An accusation the whole city is already repeating is much harder to doubt than one official saying it in a warm room.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "sc-lastlight",
      "type": "scene",
      "title": "▶ RUN THESE IN ORDER — Lastlight",
      "parent": "f-lastlight",
      "order": 5,
      "rev": 9,
      "tags": [
        "act1",
        "session1",
        "opening",
        "index"
      ],
      "leadsTo": [],
      "fieldDefs": [
        [
          "order",
          "▶ Run these in order"
        ],
        [
          "setting",
          "The lie of the land"
        ],
        [
          "before",
          "Before anything happens"
        ],
        [
          "after",
          "Where it leaves them"
        ]
      ],
      "fields": {
        "order": "0. [[world-fold|▶ THE FOLDED WORLD]] · read the shape and the history first, and show the pictures\n1. [[b-last-1|The walk up]] · through Dunlath to the west gate\n2. [[b-last-2|The fairground]] · the view, the stalls, and the games — give this real time\n3. [[b-last-3|The ceremony]] · the crews, the wagons, the healing of the Draw\n4. [[b-last-4|The lighting, and the tear]] · ninety seconds, no warning\n5. [[enc-lastlight|The fairground fight]] · initiative is opt-in; rescues, not kills\n6. [[b-last-5|The dust]] · the quiet, the count of eleven, and a Surveyor walking over\n\nThen play hands straight to [[f-commission|THE COMMISSION]].",
        "setting": "THE LIE OF THE LAND, west to east: [[loc-olddraws|the old Draws]] out on the flats, then the Cinder Draw — the last working in the world — then [[loc-hearthspire|the Hearthspire]] standing over the fairground, then rising ground, then Dunlath on the height behind its wall. Beneath all of it, the old sunsalt works. From the west gate you look down the slope and see the tower first and canyon country beyond it.\\n\\nThe fairground is on the flats below the city, in the tower's shadow. The Cinder Draw is a straight-sided channel cut into the plain, running dead straight for miles and dropping hundreds of feet sheer, lined with stepped ledges, bridges, and refinement towers built down its walls in tiers. Overhead hangs the town above, where the clock tower's hands are moving this morning for the first time in living memory.",
        "before": "Say the line, before anything: “Each of you has your reason for being here today. I’ll leave it to each of you to decide what that reason is.”\n\nThen leave it alone. Nobody has to answer, today or at all. Why the heroes came to Lastlight is theirs, and this campaign does not dig into it until later sessions — there is no questionnaire and no card to fill in.",
        "after": "Exhausted, carrying a rescue list, and about to be thanked by the government. Planted today and paid later: the white wagons nobody watched leave; the scar-line and its skipping crow; the clock hands that started this morning; the toy birds and their maker; [[npc-hettie|Hettie]] counting; the boy at the tower’s foot whose name nobody says; the one each hero could not reach; and the name the criers were shouting before the dust had settled."
      },
      "body": "Session one: the whole world on display, and the first fight.\n\nSPEND THE TIME UP FRONT. Steps 1 and 2 are most of the first hour and they are not filler — everything after the tear is measured against how good the fair was. Do not hurry to the disaster.\n\nThe fight’s three staging rules live on [[enc-lastlight|the encounter]]."
    },
    {
      "schema": 1,
      "id": "f-npcs",
      "type": "folder",
      "title": "NPCs — the cast",
      "parent": null,
      "order": 20,
      "rev": 1,
      "tags": [
        "cast"
      ],
      "leadsTo": [],
      "fields": {},
      "body": "Every named person in the campaign lives here — one sheet each, the single source of truth, no matter how many scenes they appear in. Scenes point at these sheets with wikilinks; hover a link for the peek, and use ＋ To the table on a sheet to put someone in the initiative roster."
    },
    {
      "schema": 1,
      "id": "f-monsters",
      "type": "folder",
      "title": "Monsters — the bestiary",
      "parent": null,
      "order": 30,
      "rev": 2,
      "tags": [
        "bestiary"
      ],
      "leadsTo": [],
      "fields": {},
      "body": "Every campaign creature lives here — one sheet each, held IN this folder so the feed shows the full sheets, and linked from the scenes and encounters that use them. First residents, the Lastlight tear family: [[cr-snatch-goblin|the snatch-goblin]], [[cr-crease-wolf|the crease-wolf]], and [[cr-tear-ogre|the tear-ogre]]. The SRD starter creatures live separately in the 📖 Look up library; sheets here are this campaign's own."
    },
    {
      "schema": 1,
      "id": "enc-lastlight",
      "type": "encounter",
      "title": "The fairground fight — things through the tear",
      "parent": "f-lastlight",
      "order": 50,
      "rev": 4,
      "tags": [
        "act1",
        "session1"
      ],
      "leadsTo": [],
      "fields": {
        "setup": "The Lastlight fairground, seconds after the tear. Initiative is opt-in — the fight starts when the heroes choose to stand. The scoreboard is rescues, not kills: every monster wants to leave with somebody, and a person carried into the tear is gone until the party goes in after them. Terrain to use hard: the grandstands (high ground, and one section groaning toward collapse), the fallen clockwork (cover, and a bell that can be rung), spilled grain-lanterns underfoot, the rope lines, and the scar-line where footing goes suddenly wrong.",
        "creatures": "Six [[cr-snatch-goblin|snatch-goblins]] in two waves of three, and three [[cr-crease-wolf|crease-wolves]]. Far off, one [[cr-tear-ogre|tear-ogre]] — penned by the Rectors, seen and never fought. Tuned for the table: four level-3 heroes (bard, fighter, two rangers). A player missing? Shed one goblin per empty chair and change nothing else.",
        "tactics": "Scripted opener, before initiative: the first thing through takes the boy from the tower. Goblins grab and drag toward the tear, twenty feet a turn — and any hit on a goblin makes it drop its person. Wolves never carry: they herd runners back toward the goblins and knock heroes down when they hunt in pairs. One rescue is staged into each hero's path, and one capture happens beyond each hero's reach, far side of the ground, no matter how well they fight. Give each hero a moment: the fighter holds the gap between the grandstands, the rangers make goblins drop captives with long shots, and the bard can steady the crowd itself — a stampede turned, a shouted verse that gives a dragged neighbor the nerve to twist free.",
        "reward": "No treasure — a fairground of witnesses. Every rescued civilian says something that assumes a history with their rescuer (bounded choice: family, teacher, or somebody you owe?). Wenna saw all of it, the Surveyors wrote all of it down, and the rescue list — the boy from the tower's foot at the top of it, still unnamed — now belongs to the party."
      },
      "body": "Runs inside [[f-lastlight|LASTLIGHT — the opening scene]]; the read-alouds and the session-zero machinery are in [[sc-lastlight|the run sheet]]. The Rectors fight the same disaster as pure spectacle — never in the party's corner, never with dice (staging rules in the run sheet, beat 6)."
    },
    {
      "schema": 1,
      "id": "f-commission",
      "type": "folder",
      "title": "THE COMMISSION — the morning after",
      "parent": "act1",
      "order": 20,
      "rev": 1,
      "tags": [
        "act1",
        "session2"
      ],
      "leadsTo": [],
      "fields": {},
      "body": "The second scene of Act One, running from the settling dust of [[f-lastlight|LASTLIGHT]] to the moment the party walks out of a government building employed. There is no fight in it. Everything it does, it does by being kind to the heroes on camera.\n\nRead [[sc-commission|▶ RUN THESE IN ORDER]] and nothing else. That document is the whole scene in sequence, and every step in it links to the beat, the place, or the person it needs, so the rest of this folder is opened one piece at a time as play reaches it.\n\nThe two buildings this scene uses — [[loc-ossuary|the Ossuary]] and [[loc-setsquare|the Set Square]] — now live in [[f-locations|Locations]] with every other place in the city."
    },
    {
      "schema": 1,
      "id": "sc-commission",
      "type": "scene",
      "title": "▶ RUN THESE IN ORDER — the commission",
      "parent": "f-commission",
      "order": 10,
      "rev": 4,
      "tags": [
        "act1",
        "session2",
        "index"
      ],
      "leadsTo": [],
      "fieldDefs": [
        [
          "order",
          "▶ Run these in order"
        ],
        [
          "before",
          "Before you start"
        ],
        [
          "truth",
          "What is actually happening"
        ],
        [
          "after",
          "Where it leaves them"
        ]
      ],
      "fields": {
        "order": "1. [[b-comm-1|In the dust — a Surveyor thanks them]] · the fairground, minutes after the fight\n2. [[b-comm-2|A night at the Ossuary]] · [[loc-ossuary|the hotel]], that evening\n3. [[b-comm-3|The Set Square]] · the walk up through the government quarter, then badges, purse, and a fold each\n4. [[b-comm-4|The commission and the lie]] · the same room, minutes later — the task force, and who they are told did this\n5. [[b-comm-5|Wenna's office]] · across the courtyard — the one signature that opens a crease, and a clerk to carry the paper\n6. [[b-comm-6|The woman and the boy]] · the steps outside, on the way out\n\nSteps 3 and 4 are one conversation and should not be broken up. Everything else can breathe.",
        "before": "Have ready: the three things the Rector hands over (see [[b-comm-3|the awarding]]), and one folded paper bird made for real, which is given away in [[b-comm-6|the last beat]] and is the only prop that matters. Know that [[npc-tobin|Tobin Rell]] joins the party in step 5 and that he is already further gone than he looks. Know that nobody today says the name of the boy from the tower's foot until the last thirty seconds of the scene.",
        "truth": "The tear was not caused by anybody. It is the jam in the great fold, and it has been coming for a lifetime. The ministry names Red Flag because a public enemy with a human face keeps the grieving flowing into Green Fields, which the occupation owns, and away from the candle houses, which it does not. Every human in the scene believes what they are saying. The Rector knows better and is not lying either, in its own reckoning, because a useful account of a disaster is a kind of order and order is mercy.\n\nThe public campaign started before the dust settled — criers by dusk, printed sheets that night, warrants on the boards by morning — so the Rector in step 4 is confirming something the party has already been handed three times rather than breaking news to them. That is what makes it hard to argue with.",
        "after": "Employed, decorated, and pointed at the wrong crease. They leave with a badge that opens checkpoints, coin, a folded case each, a handler who disagrees with their orders, their names on a movement's roll, an assignment at the tower they watched break, and a paper bird from a five-year-old. The next session goes into the Hearthspire."
      },
      "body": "HOW TO RUN IT. This is a scene about being handled well, so play everyone in it as genuinely decent and let the wrongness sit underneath. Nobody sneers, nobody threatens, and the only person in the building who suspects anything is the junior clerk nobody introduces properly.\n\nThe children should come out of this feeling like heroes who were given medals, because that is what happens, and because the whole point of a leash is that it is offered as a gift. Do not tip it. The adults will notice that the party's names were known before they gave them, that the route was assigned rather than chosen, and that a boy died at the foot of a tower this morning and no official in a building full of officials has mentioned him.\n\nPACING. Ninety minutes at a comfortable pace. If time is short, run 1, 3, 4 and 6, and give Wenna's assignment to the Rector's office instead — but do not cut step 6 under any circumstances, because it is the reason the rest of the scene hurts later."
    },
    {
      "schema": 1,
      "id": "b-comm-1",
      "type": "beat",
      "title": "1 — In the dust: a Surveyor thanks them",
      "parent": "f-commission",
      "order": 20,
      "rev": 3,
      "tags": [
        "act1",
        "session2"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "They have just fought monsters in front of ten thousand people, and the first thing the government does is walk over and be delighted with them. It is the warmest reception any of them has ever had, and it is being conducted by something that is not a person.",
        "read_aloud": "\"Ten minutes ago this was a fair. The grass is gone — it is mud and trampled sugar and paper flags pressed flat, and there is a smell of hot fat still coming off a stall nobody has gone back to turn off. Somewhere behind you a bell is ringing and nobody is answering it. And over all of it is the sound of ten thousand people calling names, which does not sound like screaming at all. It sounds like a crowd looking for its coats.\n\nOne of the paper people is coming toward you, and it is smiling. It has to arrange the smile first — the creases move, and then the expression arrives, a half-second late, the way a word arrives in a language you are still learning. It is very tall up close, and it is made of one piece.\n\n‘You stood,’ it says. ‘Ten thousand of you, and four stood. Do you know how rarely that happens? I have written it down. I have written all of it down.’\n\nIt looks at each of you in turn, and it says your name — and none of you has told it your name.\"",
        "env": "• THE SURVEYOR UP CLOSE — very tall, and made of one piece. No seam, no join, nothing stuck on anywhere. It arranges the smile first and then the expression arrives, about half a second late.\n• ITS VOICE — unhurried, warm, and very slightly too loud for the distance, like somebody who learned volume out of a book.\n• WHAT IS NOT THERE — no bodies, and no blood. People were taken, not killed, and nobody has said that out loud yet. Let a player be the one to notice.\n• UNDERFOOT — churned mud, crushed sugar, paper flags pressed flat, and grain-lanterns still glowing in the muck.\n• AROUND THEM — survivors sitting down wherever they stopped. Somebody laughing much too loud, because that is a thing people do.\n• LIGHT — bright mid-afternoon, and the day has hours left in it, which feels wrong.",
        "if_they": "…ask how it knows their names, it is delighted to explain: it wrote them down, of course, that is what it is for, and it produces the page and shows them. Nothing is hidden and that is what makes it unsettling.\n\n…are hostile or suspicious, it is not offended in the least. It says that suspicion is reasonable after a day like this one, and offers the rooms anyway, and means it.\n\n…ask about the boy at the tower, it says it is very sorry and that the count is being taken and that they will be told. It will not be told. Nobody follows up. That is deliberate and should pass without comment.\n\n…ask what it wants, it says: nothing tonight. Tonight they should sleep somewhere warm. That is true.",
        "outcome": "The party is invited, as a token of the ministry's gratitude, to be guests at [[loc-ossuary|the Ossuary]] — the finest house in the city — for as long as they care to stay. A runner will bring word in the morning. Then it bows, and goes back to writing down faces."
      },
      "body": "The Surveyor here is [[npc-rector|the Rector of the Set Square]], though it does not say so and is not in ceremonial form. Use the same being tomorrow at the awarding, and let a player be the one to notice it is the same one; a world in which one official handles you personally from the first minute is a smaller and more watched world than one with a cast of thousands.\n\nRun it warm. The temptation is to play the Surveyors cold, and cold is both wrong and boring at a table with children in it. This thing is thrilled with them. It behaves like a proud schoolteacher who happens to be folded out of a single sheet of something that is not quite paper, and the horror is entirely in the geometry and the timing rather than in the manner.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "b-comm-2",
      "type": "beat",
      "title": "2 — A night at the Ossuary",
      "parent": "f-commission",
      "order": 30,
      "rev": 4,
      "tags": [
        "act1",
        "session2"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "Hot water, clean sheets, and more food than any of them has seen at one table, on the worst night the city has had in living memory. Let them enjoy it, and let the enjoying be slightly difficult.",
        "read_aloud": "\"[[loc-ossuary|The Ossuary]] was a bone-house three hundred years ago and the city never bothered to rename it. The vaults are still down there. They keep the wine in them now.\n\nAbove ground it is the finest house in Dunlath, and tonight every window on its face is lit while the rest of the street is dark. Hot water, deep as a cart. A bed each. Supper is a whole roast bird apiece, bread still warm, honey, and a bowl of small sharp apples — more food than your family eats at a wedding, and nobody is going to ask you to pay for any of it.\n\nThe window does not shut all the way. Four floors down and a long way off, people are still calling names.\n\nAnd there is a printed sheet on the table beside the supper, and the ink is new enough to smell, and there is one in every room in the house tonight. RED FLAG BREAKS THE HEARTHSPIRE. Refusers. Enemies of the Accord. Eleven souls. A reward, and an address.\"",
        "env": "• WARMTH — the floors are warm underfoot and there is no fire anywhere in the building. Nobody who lives here finds that worth mentioning.\n• SIGHTS — every window on the face of the house lit while the whole street outside is dark. Marble, deep rugs, and three hundred years of somebody else's ancestors in the vaults downstairs.\n• SOUNDS — the house is very quiet. All the noise is outside and four floors down, and the window does not shut all the way.\n• SMELLS — hot water, soap, roast bird, warm bread. Under it, faintly, something mineral and old coming up the stairs from the vaults.\n• TEXTURE — more linen than any of them has touched in their lives, and a bell-pull beside each bed that genuinely summons a person.\n• THE STAFF — unfailingly kind and a little too attentive, and they have already unpacked everybody's belongings as a kindness.",
        "if_they": "…go back out to help, let them, and let it matter: they can find one person tonight, and it should be someone small and alive and not the one everyone is thinking about. The ministry does not stop them and notes it approvingly in the morning.\n\n…try to leave the city, the doors are not locked and nobody follows. There is simply nowhere to go and a summons finds them wherever they are.\n\n…search their rooms or ask who packed their things, the answer is that the staff did, they are very sorry, they assumed it would be a kindness. It was a kindness. It is also the second time today somebody has handled their belongings without being asked.\n\n…ask the staff who Red Flag is, they drop their voices without noticing they have done it, and everything they know came off the same sheet an hour ago. By morning they will know it the way people know things they have always known.\n\n…ask whether anybody doubts it, nobody in the building does. There is no dissenting voice in the Ossuary tonight and there should not be one.",
        "outcome": "Morning, and it has rained in the night — a low grey wet morning, the first bad weather in a fortnight.\n\nA human runner, sixteen and out of breath, brings four summonses on ordinary paper: their names, the hour, and the address of [[loc-setsquare|the Set Square]]. Nothing folds itself, nothing flaps. The state does not need to be strange when it is simply being obeyed."
      },
      "body": "This beat exists to buy the scene its contrast. The party should be comfortable, fed, and well treated in a building full of light while the city grieves in the dark outside, because that is the arrangement the whole campaign is about, and it is much better felt in a bathtub than explained in a speech.\n\nKeep it short at the table — ten minutes — unless the players want to use the evening, in which case give them the night and let them find somebody.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "b-comm-3",
      "type": "beat",
      "title": "3 — The Set Square: the walk up, and the awarding",
      "parent": "f-commission",
      "order": 40,
      "rev": 7,
      "tags": [
        "act1",
        "session2",
        "reward"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "The medal scene, played straight, in the most important room in the city. Forty chairs carried into an office that was never meant to hold them, and every person in them is there because these four went toward the monsters.",
        "read_aloud": "THE WALK. \"The city on the way is wrong in a way that takes a minute to place, and then you have it: the festival is still up. Bunting across every street, garlands on every door, sodden now and dripping. [[loc-rationhall|The Emporium]] is packed to the pillars. And on three corners between here and there, somebody is standing in the rain showing a little drawing to strangers.\n\nAt every crossing a board has gone up overnight, and each one carries a warrant with three names on it that nobody in this city has ever heard, and BY ORDER, FOR THE BREAKING OF THE HEARTHSPIRE along the bottom. People are stopping to read them in the rain. Under one of them somebody has written something, and somebody else has already scrubbed it half away.\n\nThen the government quarter, and it is beautiful. White colonnades down both sides of a processional way, fountains running in the wet, plane trees in rows, courtyards opening off courtyards, clerks going between the buildings under oiled cloth.\n\nAnd the whole quarter looks like architecture and is not quite. The colonnades are right, the pediments are right, every corner is exactly a corner — and then you notice the CREASES. Long clean fold-lines running up the face of a building, mostly matched left to right the way a paper boat matches itself. A stair rail folded out of the same piece as the stair. A doorway whose whole surround is one continuous sheet with the wall, pleated into moulding. Nothing is stuck on. Nothing is jointed. Nothing was carried here.\n\nAnd here and there, one crease that does not match: a pilaster with a fold through it that runs off at a slight angle and never comes back.\"\n\nTHE WAY IN. \"The building is full of people and every one of them is human. Clerks come out of doorways to look at you. Somebody starts clapping in the corridor before you have even reached the stairs and you never do find out who, and it follows you all the way up — and there is a whole delegation waiting on the landing, officials in very good coats, two guild masters, somebody from the Lamp Office, all of them wanting to shake your hands and all of them slightly competitive about getting to you first. Not one of them was at the fairground yesterday. Every one of them is completely sincere.\"\n\nTHE OFFICE. \"Then they take you up to the top of the Set Square, and it is not a hall. It is an office — the highest office in Dunlath, and you can feel that in the doorway. Very large, near enough oval, with a great pale desk at the far end, rugs deep enough to lose a coin in, and tall windows down one whole side looking out over the quarter to the tower beyond it.\n\nForty chairs have been carried in for this, which is plainly not what the room is for, and they are full: the people you pulled out of the dust, and the families of the ones you did not. More are standing along the walls. Nobody claps when you come in. They stand up.\n\nThe Rector is waiting beside the desk, dressed differently today, pleated into a great fan of a collar that opens behind its head like a hand of cards. On the desk there are three things and a stack of plain paper.\"\n\nTHE FOLDING. \"It takes one blank sheet and it does not hurry. Its hands move for about eight seconds, and they never once go back to correct anything, and the room is completely silent while they do. What it holds out to you afterward has your name written inside the fold in a hand that never lifted, and edges like a knife, and it is warm.\"",
        "env": "• WEATHER — it rained in the night and has not stopped. The first bad weather in a fortnight, and the whole city is sodden.\n• THE FESTIVAL, STILL UP — bunting sagging and dripping across every street, garlands going brown on the doors, a carousel nobody has dismantled. Nobody has taken any of it down and nobody has said why not.\n• SOUNDS — rain on oiled cloth, and the fountains in the government quarter running anyway, in the wet, because nobody thought to turn them off.\n• SMELLS — wet stone, wet wool, and bunting starting to go sour.\n• THE QUARTER — white colonnades, plane trees in rows, courtyards opening off courtyards. Long clean fold-lines up every façade, matched left to right — and here and there one that does not match, running off at a slight angle and never coming back.\n• THE RECEPTION — humans everywhere, and it is a celebration. Applause starting in the corridor from somebody they never identify and following them up the stairs; clerks out of doorways; a delegation on the landing in very good coats, warm, sincere, and mildly competitive about who reaches them first. None of these people were at the fairground.\n• AND THEN THE ROOM, WHERE THE APPLAUSE STOPS AT THE DOOR — inside are the people they pulled out of the dust and the families of the ones they did not, and those people do not clap. They stand up. Play both receptions and do not comment on the difference.\n• THE OFFICE — deep rugs, warm underfoot, and no fire in it anywhere. Forty mismatched chairs carried in for this, and the sound of forty people getting to their feet at once.",
        "if_they": "…refuse the honors, the Rector accepts this with real grace, sets their share aside, and says the offer does not expire. It genuinely does not. Nothing in this scene requires them to accept anything.\n\n…ask what the fold is made of, the Rector says: paper. It is telling the truth and the truth is not reassuring.\n\n…try to open a fold on a living thing, it will not close. It simply refuses, gently, the way a door refuses. The Rector, if present, says only that this was thought best.",
        "outcome": "Three gifts, given one hero at a time, by name, in front of the room.\n\nTHE BADGE. A Writ of Search, folded from one blank sheet in a single unbroken motion that takes about eight seconds and never doubles back. It carries their name inside the fold and it opens every checkpoint, gate, and rope line in the city. It is not magic. It is a leash, and it is the reason this act is called what it is called.\n\nTHE PURSE. A month's wages each, in coin, counted out loud. Concrete, unglamorous, and more money than two of them have ever held.\n\nTHE FOLD. One each: a stiff pale card the size of a hand, which opens along creases into a deep case that holds far more than the card could, and closes back to a card. It must be opened and closed by hand, and it will not close on anything living. Nobody explains why that rule was necessary."
      },
      "body": "This is the beat the children came for, so give it the full ceremony: names read out, the room standing, the Rector coming down off the platform to hand each thing over personally. Do not undercut it. The scene is only worth anything later if it is worth something now.\n\nThe folding itself is the spectacle, and it is worth slowing down for. A Rector at work is meant to be seen — that is the entire point of the ritual grade — so describe the hands and the eight seconds and the fact that it never goes back to correct anything, and let a player ask to watch closely. They can. It is happy to be watched.\n\nON THE FOLD AS AN ITEM. No dice attach to it. It is a pocket that holds a great deal, it is delightful, and it will quietly teach the table that this world folds space as a matter of course, which is the cosmology arriving as a toy rather than as a lecture.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "b-comm-4",
      "type": "beat",
      "title": "4 — The commission and the lie",
      "parent": "f-commission",
      "order": 50,
      "rev": 8,
      "tags": [
        "act1",
        "session2",
        "red-flag"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "They are offered a job by the most powerful institution in the world, and they are told who to blame. One of those two things is false, and it is not the one they will doubt.",
        "read_aloud": "\"'Eleven people went through that seam,' the Rector says, 'and they are alive, and they are not coming back on their own. We would go in after them ourselves. We cannot. There are only so many of us — there have only ever been so many of us — and we have not been able to make more since the world stopped moving. So the work that is done in this world by hands is done by human hands, and it has been that way since before your grandmothers.'\n\nIt lets that sit.\n\n'What we are forming is a task force. Human, small, sanctioned, and paid. You would be the first four names on it.'\"\n\nTHE NAME, and it must be unmistakable — say it close to as written:\n\n\"'You will have heard it in the street by now,' the Rector says, 'and I would rather you heard it here as well, plainly, so that nobody has to guess at what is being asked of them.\n\n'The Hearthspire did not fail. It was broken. A cell calling itself Red Flag — refusers left over from the Fence War, who kept the old banner when the movement furled it — put a hand into the lighting, in order to break the Accord and put this world back to war. There are not many of them and they are not fools. Eleven people are on the far side of a seam this morning because of them, and one of those is a child.\n\n'We are not asking you to hunt anybody. Four people do not hunt anybody, and it is not what you are for. We are asking you to bring back anything at all that shows a human hand in it.'\n\nIt says all of this the way one reports weather, and then it waits, courteously, in case they have questions.\"",
        "env": "• THE SAME ROOM, MINUTES LATER — and the staff are already carrying the forty chairs back out around them while this conversation happens. They are not listening. This is their fourth trip.\n• SOUNDS — chair legs on stone, rain on tall windows, and the Rector's voice, which never once rises.\n• THE DESK — the three gifts are gone off it now. The stack of plain paper is still there, and it is a very large stack.\n• LIGHT — grey wet morning through the windows, and the room is warm and well lit with nothing burning in it.\n• IN THEIR HANDS — the writ, which is warm, and which none of them has quite stopped noticing.\n• THE ROOM'S MOOD — brisk and kind and slightly hurried, the way any office is when the ceremony is over and there is a day to get on with.",
        "if_they": "…ask why them, the answer is honest and slightly chilling: because everyone else ran, and because it was standing there with a pen.\n\n…ask why the order does not go in itself, it says it cannot spare anyone, and that those who go in do not come out. It is telling the truth and it does not elaborate.\n\n…ask why the movement and not the ministry, it says the searching is theirs and that it is glad they exist. Warmly, and it means it. One line, and then move on — a being explaining its own treaty at length is exposition, and a being cheerfully handing over the one job it cannot do is the whole relationship in four seconds.\n\n…ask what caused the tear, the Rector answers before they have finished asking. The words are in the read-aloud and it is worth saying them close to as written, as settled fact rather than as an accusation.\n\n…ask about the boy at the tower's foot, the Rector says the count is eleven and does not distinguish among them. It will not name him. Nobody in this building names him all morning.\n\n…ask to see the tear themselves, the Rector says the site is contained. It uses that word and no other, and it is telling the exact truth: containment is being maintained at this moment by members of its own order who will not be leaving. It does not say closed, it is not asked what is at the crown, and it does not volunteer.",
        "outcome": "THE LIE IS NOW ON THE RECORD, said out loud by the highest official in the city: Red Flag broke the tower, and the party is asked to bring back anything showing a human hand in it. This is the fourth time in under a day they have been given the name — the crier in the dust, the sheet at the Ossuary, the warrants on the walk up — and it is the one that carries a signature.\n\nTHE DIRECTIVE, and it should be as plain as this: 'Eleven people are on the other side of that seam. Go in, and bring back who you can. My order will open the way for you and hold it while you are inside, and that is the whole of what we are able to do.'\n\nTHEN IT WALKS THEM DOWNSTAIRS ITSELF. The searching belongs to the movement — it says so in one line and does not explain the history — so the highest official in the city takes four strangers down a flight to a junior clerk in the smallest office on the corridor, and is perfectly cheerful about it. That walk states the whole relationship and nobody has to describe it. See [[b-comm-5|beat 5]]."
      },
      "body": "KEEP THE DIRECTIVE SIMPLE. Go in, bring back who you can, we will open it and hold it. That is the entire brief and it should take fifteen seconds. Everything about who is allowed to do what stays in the walk downstairs, where it is shown rather than said.\n\nWHY THE LIE IS THE RIGHT ONE. Canon already has the criers blaming the veiled figure on the high seat, which is where the world's cosmic anger is meant to go. This is the operational version, issued to people who are actually being sent somewhere, and it does a job the veil cannot: it makes the candle houses radioactive, so that every grieving person in the city walks toward Green Fields — which the occupation owns — instead of toward Red Flag, which it does not. It is recorded in CAMPAIGN.md §3 as standing practice.\n\nWHAT THE PARTY NOW BELIEVES. That there are terrorists, that the terrorists made the hole, and that they have been hired to help clean up after them. They will carry that for several sessions, and they will carry it while traveling with a man who has been reading a dead friend's field book and can no longer make the numbers work.\n\nDO NOT WINK. The Rector is not smirking, and it is not lying in the sense it would recognize. It has been given an account of the disaster by its own leadership and it is passing that account on. Everything else in the room is true: the eleven, the offer, the pay, and the fact that its order cannot spare a single one of itself to go in.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "b-comm-5",
      "type": "beat",
      "title": "5 — Wenna's office, and a clerk",
      "parent": "f-commission",
      "order": 60,
      "rev": 6,
      "tags": [
        "act1",
        "session2"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "A junior clerk in the smallest office on a very grand corridor holds the one power the beings who run the world signed away and cannot take back. Nobody in the room mentions this, least of all her.",
        "read_aloud": "\"Across a courtyard in the rain, into a lesser building, down a corridor of very large doors — and hers is the last one and the smallest. GREEN FIELDS · OFFICE OF SEARCH, on a card in a brass frame built for something longer.\n\nInside: one room, a kettle going, mismatched chairs, and nine people in a space meant for four. Half of them have the look you saw all over the fairground yesterday, which is the look of somebody counting a room to see who is missing.\n\n[[npc-wenna|Wenna Ash]] is standing on a chair pinning a paper to the wall, and the paper is a list of names, and it is not finished. When she sees you in the doorway she gets down so fast she nearly goes over.\"",
        "env": "• THE CONTRAST — a corridor of enormous doors, very quiet, very polished, and hers is the last one and the smallest. A card in a brass frame built for a much longer name.\n• INSIDE — one room, nine people in a space meant for four, mismatched chairs, and a kettle going that somebody keeps having to move so people can get past.\n• WARMTH — bodies and the kettle, not the floor. Nobody has thought about it; the party might.\n• SOUNDS — too many people talking at once, rain on one window, and underneath it the enormous quiet of the grand offices on the other side of the wall.\n• SMELLS — wet coats, tea, and paper. A great deal of paper.\n• THE WALLS — the list of names she is pinning up, unfinished. Older lists underneath it, layered, going back years, and nobody has ever taken one down.\n• THE PEOPLE — volunteers rather than staff. Somebody's mother. Somebody's brother. Half of them have the look the party saw all over the fairground, which is the look of somebody counting a room to see who is missing.",
        "if_they": "…tell her the ministry named Red Flag, she goes quiet, and then she says carefully that she has heard the name and that she does not know, and that the people she has met who went that way were not monsters, they were just tired. It is the first crack of light in the whole scene and she does not know she has opened it.\n\n…ask why her and not the ministry, she gives the true answer, warmly and with pride: the right of search belongs to the movement, it was bought with the Accord, and it is the only thing in this world that human hands may do without asking.\n\n…ask what happens if she says no, she laughs, because it has never once occurred to her to say no to somebody volunteering to go in. Then she stops laughing, because she has just realized it is a real question and that the answer is nothing at all would happen. Nobody would make them go.\n\n…ask about the boy at the tower, she says she does not know his name either, and that she is sorry, and that she has been trying since last night to find out. She has been. Nobody will tell her.",
        "outcome": "SHE SIGNS THEM ONTO THE ROLL, and this is the actual moment the party joins something. Their names go on a movement's list in her own hand, and the writ in their pocket becomes usable on the only door it was never going to open by itself.\n\nTHE ASSIGNMENT is the tear site, tomorrow morning. Not the tower — there is nothing in the tower. The ground at its foot is where the world came open, the order will open a way there and hold it, and the party goes in and brings back who they can. She sends the paper across that afternoon so they are expected. Nobody is being sent anywhere false.\n\nTHE CLERK. Every expedition under the right of search carries a Registry man to keep the record; it is in the Accord. Theirs is [[npc-tobin|Tobin Rell]], junior, cheap, apologetic, and carrying a satchel too big for him. Introduce him as an inconvenience. He is their healer and their most dangerous secret and they have no idea.\n\nThey leave employed by [[npc-wenna|Wenna]], paid by the ministry, and accompanied by a clerk who files nightly to an office none of them has heard of. Three masters on the first day, every strand of it handed over as a kindness. Then [[f-wreck|THE WAY IN]]."
      },
      "body": "SHE IS PROUD OF THE OFFICE and will say so unprompted: the movement has a door inside the ministry's own walls, which she reads as human hands finally at the table. She is not naive to be proud of it. She is simply looking at it from underneath.\n\nGIVE THE PARTY THE VERB HERE. This is the first thing in two sessions that is not handed to them — she has to put their names down, and she is allowed to want a reason first. Let them give her one. Whatever they say is the closest thing to a stated motive this campaign will have for a while, so write it down.\n\nTOBIN SAYS NOTHING DANGEROUS TODAY. He is an inconvenience with a satchel and a form to be signed, he is bad at introductions, and that is all. He does not raise a suspicion with people he met an hour ago, because he is a careful man and because it would get him folded away. His turn comes when the party has been somewhere with him. See [[npc-tobin|his sheet]].",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "b-comm-6",
      "type": "beat",
      "title": "6 — The woman and the boy",
      "parent": "f-commission",
      "order": 70,
      "rev": 2,
      "tags": [
        "act1",
        "session2",
        "payoff"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "The whole scene has been officials being kind to them in warm rooms. This is thirty seconds on a cold step with two people nobody arranged, and it is the only part of the day anybody at the table will remember in a month.",
        "read_aloud": "\"There is a woman sitting on the steps outside, and she has been there a while, because the stone is dry under her and wet everywhere else. There is a small boy with her, five or so, holding something in both hands. She stands up when she sees the badges.\n\n'They said you're the ones going in,' she says. 'They said there's a list.'\n\nThe boy comes forward on his own, without being told, and holds up what he is carrying. It is a paper bird. It is grubby and it has been held very tightly and one wing is bent. 'The tall one made it,' he says. 'At the fair. Before.'\"",
        "env": "• OUTSIDE, AND SMALL — after an oval office with forty chairs in it, this is two people sitting on a step. Let the scale drop all at once.\n• THE STONE — wet everywhere except the patch she is sitting on, which is dry, and which tells you exactly how long she has been there without her saying so.\n• LIGHT — the rain has eased and it is brightening, and the whole city is steaming slightly.\n• SOUNDS — ordinary. Carts, a crier a street away, somebody's shop shutter. The day going on, which is the point.\n• THE BIRD — grubby, gone soft at the folds from being held, one wing bent where somebody gripped it too hard. It does not flap. It has not flapped in a while.\n• THE BOY — five, clean, in clothes somebody dressed him in carefully this morning.",
        "if_they": "…take the bird, the boy is enormously relieved and goes back to his mother. Give the actual folded prop to whichever player took it, and do not explain it.\n\n…ask what she wants, she says the thing she came to say: please bring back my son. And then, because they are strangers and she has to, she says his name.\n\n…ask why she is not inside with the families, she says she tried. She is not on the list of families. Nobody has put her son on any list, because nobody wrote his name down, because he was not with his family when it happened — he was at the front, in his best shirt, carrying a glass case.\n\n…promise her anything, let them. Write it down. Campaigns are made out of promises made on steps.",
        "outcome": "The party learns the name of the boy from the tower's foot, from his mother, on a step, twenty-four hours after watching him be taken — and they learn that in a building full of officials counting to eleven, not one of them said it.\n\nThe woman is [[npc-sela|Sela Orrin]]. The small boy is her surviving son, Rab. The taken one is [[npc-finch|Finch]]."
      },
      "body": "HOW TO PLAY IT. Do not signpost it. The party is walking out of a good morning, employed and decorated, and this happens on the way to the street. Keep it under a minute of real time and do not add music to it.\n\nThe bird is the whole design. The ministry gave them a badge that opens doors, coin, and a folded case that holds more than it should. A five-year-old gives them a bent paper bird that does nothing at all, made by the same hands that made the badge, on a day when it was still just a toy. Nobody has to point out the difference, and nobody should.\n\nUSE A REAL PROP. Fold one before the session and hand it across the table. It will end up in a dice bag and it will still be there in Act Three.\n\nWHY IT LANDS. Because the party watched this boy die — or thought they did — before anybody told them who he was, and because they have spent a whole morning being thanked by people who never once said his name. The theme of this campaign is a state that grieves in numbers, and this is the entire argument delivered in four lines by a child with a broken toy.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "loc-ossuary",
      "type": "location",
      "title": "The Ossuary — the ministry's hotel",
      "parent": "f-locations",
      "order": 120,
      "rev": 2,
      "tags": [
        "act1",
        "city"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "Six floors of white stone at the top of the market street, with a sunsalt lamp burning in every single window — which on any ordinary night is the most expensive sight in the city and on this one is obscene. It was a bone-house before it was anything else, three centuries ago, and the city has never got round to renaming it. The vaults underneath are still down there and are used for wine.",
        "who_is_here": "Human staff, all of them, scrupulously kind and slightly frightened of the guests. Ministry visitors, contractors, and the occasional Green Fields delegate, who are put on separate floors by a management that regards this as simple good manners rather than politics.",
        "hidden": "The register. Every guest since the Accord is in it, in a fair hand, and the ledger for the last fifteen years has three pages that have been very neatly removed. Nobody on the staff will admit to knowing anything about it, and one of them is lying out of fear rather than loyalty."
      },
      "body": "The Ossuary earns its place by being genuinely lovely on the worst night of the city's life, which is the whole arrangement of this world reduced to one building: the occupation is warm, it is generous, it keeps its lamps lit while the street is dark, and it is very glad you came. Play the comfort straight and let the players feel however they feel about it."
    },
    {
      "schema": 1,
      "id": "loc-setsquare",
      "type": "location",
      "title": "The Set Square — the Rector's hall",
      "parent": "f-locations",
      "order": 130,
      "rev": 5,
      "tags": [
        "act1",
        "city",
        "surveyors"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "The government quarter, and the handsomest thing in Dunlath after [[loc-wintergarden|the Glasshouse]]: white colonnades down both sides of a processional way, fountains, plane trees in rows, courtyard opening off courtyard. At the head of it, the Set Square — a public square that is a perfect square, and a building on its north side that is the same square stood upright, which is where the name comes from and which the city finds funnier than the order does.\n\nAnd the whole quarter looks like architecture and is not quite. The colonnades are right, the pediments are right, every corner is exactly a corner — and then you notice the CREASES. Long clean fold-lines running up the face of a building, mostly matched left to right the way a paper boat matches itself. A stair rail folded out of the same piece as the stair. A doorway whose whole surround is one continuous sheet with the wall, pleated into moulding. Nothing is stuck on. Nothing is jointed. Nothing was carried here.\n\nAnd here and there, one crease that does not match: a pilaster with a fold through it that runs off at a slight angle and never comes back.",
        "who_is_here": "Human clerks on the lower floors, doing real and useful work with real and useful courtesy. The ritual grade above.\n\nAt the top, the office of [[npc-rector|the Rector of the Set Square]] — the highest office in the city, and an OFFICE: very large, near enough oval, with a great pale desk, rugs deep enough to lose a coin in, and tall windows down one side looking out over the quarter to the tower beyond. This is the room the city is actually run from, and being called to it is the local equivalent of being called before a head of state.\n\nAnd across the courtyard, in a lesser building, at the end of a corridor of much larger doors: GREEN FIELDS · OFFICE OF SEARCH, which is [[npc-wenna|Wenna Ash]] and a kettle. The permitted rebellion has a desk inside the building it petitions, and nobody on either side finds that strange.",
        "hidden": "The creases that do not match are NEWER than the ones that do. The quarter was folded true, and something has been very slowly folding it wrong ever since. A mason will tell you, if asked, that they patch a crease every few years and there are more of them now than when he started."
      },
      "body": "Give the party the walk before the ceremony. Children notice a building with no worn step faster than adults do, and the creases are the cheapest possible way to teach the table what these beings actually are: not cruel and not cold, but incapable of leaving anything unfinished — and working in a material nobody here can name."
    },
    {
      "schema": 1,
      "id": "npc-rector",
      "type": "npc",
      "title": "The Rector of the Set Square — the one who is delighted with them",
      "parent": "f-npcs",
      "order": 50,
      "rev": 1,
      "tags": [
        "act1",
        "surveyors"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "Tall, narrow, and folded out of a single sheet of something between paper and porcelain. Its face is a pattern of creases and it builds an expression before it wears one, so every smile arrives about half a second after the moment that earned it. In the hall it wears the ritual grade: a great pleated collar that opens behind its head like a hand of cards.",
        "wants": "For the world to be finished, which it understands as the kindest thing that could possibly be done for anyone, and in the meantime for the eleven people in that seam to be brought home. It wants the second thing sincerely and will spend real money on it.",
        "voice": "Warm, precise, and thrilled by competence. It compliments people specifically rather than generally — not that they were brave, but that they went left when everyone else went right. It never raises its voice, never threatens, and has genuinely never needed to.",
        "secret": "It has no personal secret at all, which is the interesting thing about it. It passes on the Red Flag account because that is the account its leadership gave it, and it has not examined it, in the way that a decent officer does not examine the ministry's press. The only thing it is hiding is arithmetic: it knows the count was more than eleven, because it was standing there writing, and eleven is the number it has been given to say."
      },
      "body": "The party's first named Surveyor, and their handler at the top of the ladder for the whole of Act One. It should be warm, personally attentive, and impossible to dislike, because a table that likes it will be genuinely disturbed the first time it folds a street shut with people on it — which is scheduled for Act Two.\n\nRun it in both appearances of [[f-commission|THE COMMISSION]]: it is the Surveyor who congratulates them in the dust in [[b-comm-1|beat 1]], out of ceremonial dress, and the officiant who folds their badges in [[b-comm-3|beat 3]]. Let a player notice it is the same one. A world where one official takes a personal interest in you from the first minute is smaller and more watched than a world with a cast of thousands, and the children will feel that without being told.\n\nIts own name for itself is a fold rather than a sound — a precise gesture of the hands — and it will teach a hero to make it, badly, if asked. It is enormously pleased to be asked."
    },
    {
      "schema": 1,
      "id": "npc-sela",
      "type": "npc",
      "title": "Sela Orrin — the woman on the steps",
      "parent": "f-npcs",
      "order": 60,
      "rev": 1,
      "tags": [
        "act1",
        "taken",
        "haunted"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "Forty, in yesterday's clothes, having sat on a wet step long enough to dry the stone under her. She has a five-year-old with her, Rab, who holds her hand except for the ten seconds in which he does the bravest thing anybody does in this scene.",
        "wants": "Her son back. Beneath that, and harder to give her, she wants somebody official to write his name down, because the count is eleven and her son is not on any list of families, and a boy who is not on a list has not, in the only sense the state recognizes, been lost.",
        "voice": "Flat and practical, because she has been awake for thirty hours and has already cried everything she is going to cry in front of strangers. She does not plead. She states the position and waits, and it is much worse than pleading.",
        "secret": "She has no secret and she is not a plant, which the DM should hold onto, because this campaign is full of people who turn out to be something. She is exactly what she appears to be: one of the haunted, twenty-four hours in, before anybody has reached her. Both Green Fields and Red Flag will come for her within the month, and which one gets there first is worth deciding at the table rather than in advance."
      },
      "body": "Sela exists to put a face and a name on the count. She appears in [[b-comm-6|the last beat of THE COMMISSION]], on the steps, for under a minute, and she says the name of the boy the party watched be taken — [[npc-finch|Finch]] — which nobody in a building full of officials said all morning.\n\nRAB. Five. He carries a paper bird that a Surveyor folded for him at the fair the day before, and he gives it away to a stranger with a badge because he has worked out, in the way five-year-olds do, that this is a thing he can do to help. He does it without being told and without letting go of it easily. Play the bent wing.\n\nWHERE SHE GOES. She should come back. A mother who appears once and is never seen again is a prop, and this campaign has enough of those; a mother the party keeps running into — at a Green Fields meeting, at a rope line, eventually in a dark house with a candle in the window — is the whole argument of Act One happening to one family in the background. Her arc is a standing invitation and is deliberately unscheduled."
    },
    {
      "schema": 1,
      "id": "f-locations",
      "type": "folder",
      "title": "Locations — the places",
      "parent": null,
      "order": 40,
      "rev": 1,
      "tags": [
        "places"
      ],
      "leadsTo": [],
      "fields": {},
      "body": "Every place in the campaign lives here — one sheet each, the single source of truth, no matter how many scenes use it. Scenes point at these sheets with wikilinks, the same way they point at people and creatures.\n\nStart at [[loc-index|▶ WHERE THEY CAN GO]], which lists the city in one screen and says what the party can actually DO at each place."
    },
    {
      "schema": 1,
      "id": "loc-index",
      "type": "note",
      "title": "▶ WHERE THEY CAN GO — Dunlath",
      "parent": "f-locations",
      "order": 10,
      "rev": 7,
      "tags": [
        "places",
        "index"
      ],
      "leadsTo": [],
      "fieldDefs": [
        [
          "places",
          "▶ The city, and what they can do there"
        ],
        [
          "land",
          "The lie of the land"
        ],
        [
          "ifthere",
          "If there is time"
        ],
        [
          "state",
          "The state of the city this week"
        ]
      ],
      "fields": {
        "places": "[[loc-clockface|The Clock Face]] — meet people, leave word, hire a runner. The city's meeting place, by accident.\n[[loc-petition|The Petition Rail]] — formally demand anything at all, including a name added to the count. Every word is filed.\n[[loc-lampoffice|The Lamp Office]] — buy light. The register on the wall does not add up, and nobody has ever added it.\n[[loc-sixtyone|Sixty-One Pairs]] — rummage, one roll each. The first buyer for anything brought back out of a crease.\n[[loc-longtable|The Long Table]] — half the room is dressed as clowns, half as bakers, and they are fighting about it. Food, rooms, every rumor in the city, and a guard company for hire.\n[[loc-wintergarden|The Glasshouse]] — a garden under a glass roof, kept warm by no fire at all. Food, drink, players, a games yard, and dice behind a curtain. Where the party has a good night.\n[[loc-rationhall|The Emporium]] — a covered market the size of a cathedral. Take what your household needs; a clerk marks it on the roll. The porters will not let you carry anything.\n[[loc-foldingshop|The Folding Shop]] — commission a toy of anything. It gets the parts you did not say. The paper animals have got out.\n[[loc-ganny|Ganny Marle's Cellar]] — a painted sideshow banner and a coin to see THE IMPOSSIBLE CORNER. Something is coming through it.\n[[loc-scarline|The Scar-Line]] — walk where the canyon was. Their assignment, and the thinnest place in the city.\n[[loc-hearthspire|The Hearthspire]] — the tower, and the wound they watched open. A ring of Rectors has been standing on the ground at its foot for eleven days.\n[[loc-olddraws|The Old Draws]] — stand at the rim of a dead one and look down. Hundreds of feet, and you cannot see the floor.\n[[loc-darkwindow|The Dark Window]] — the one unlit window on any street after dark. Knock and be lied to politely.\n\nAlso here, used by [[f-commission|THE COMMISSION]]: [[loc-ossuary|the Ossuary]] and [[loc-setsquare|the Set Square]].",
        "land": "West to east: [[loc-olddraws|the old Draws]] on the flats → the Cinder Draw, the last of them, now [[loc-scarline|the scar-line]] → [[loc-hearthspire|the Hearthspire]] standing over the fairground → rising ground → DUNLATH on the height behind its wall. Beneath all of it, the old sunsalt works running east from the Draws and up into the city's undercroft.\n\nFrom the west gate you look DOWN the slope: the tower first, canyon country beyond it, and the town above hanging over the whole business. The city is on the high ground and everything that fed it is below.",
        "ifthere": "Two pieces are written to be dropped when the night has room for them, and they live in [[f-iftime|IF THERE IS TIME]]: [[b-slip|a slip]], which can happen anywhere at all and takes ninety seconds, and [[enc-ganny|the thing in Ganny's preserves]], which is fifteen minutes and is not a fight unless the party insists.",
        "state": "THE CITY IS DUNLATH AND IT IS RICH. The blend to reach for: MEDIEVAL AESTHETICS, the material prosperity of ROME ON STEROIDS, the festive confidence of the GILDED AGE, all run by a totalitarian state. Colonnades, covered markets, fountains, porters with handcarts, crowds in good cloth at public games and feasts. No steam, no factories, no machinery — nothing more advanced than an ancient primitive flintlock, and one of those would be a marvel. This world was folded for plenty and the occupation's case rests on having delivered it. Nobody here is hungry.\n\nWHERE THE WONDER GOES: sunsalt. Heat and light without fire, seeded as hints and never explained — a floor warm underfoot with nothing burning under it, a hall lit with no flame in it, fruit trees under glass in winter. Marvel rather than machinery.\n\nAND THE DARK IS THE UNDERTOW, not the weather. The surface is a confident, wealthy, celebrating city, and the horror surfaces in the cracks — a thing said too courteously, a record being kept, two Surveyors at a corner table who never eat anything — while the table is still laughing at the clowns.\n\nAND THE CITY IS STILL DRESSED FOR A PARTY. Lastlight was a festival — garlands, bunting, stalls, a fair — and the disaster arrived in the middle of it, so none of it has come down. Decorations across every street going slowly brown. A carousel nobody has dismantled. Half-struck stalls. The correct image is a city in party clothes with a hole in it, not a city in mourning, and the decorations are the single fastest way to put that on the table.\n\nIt is the week after. The Cinder Draw was formally closed with garlands, so the best-paid trade in the world ended on a Tuesday and nobody has a job. Eleven people are officially missing and everyone who was there knows the number is wrong. The price of a lamp has doubled, which is the first limit anyone in Dunlath has met in living memory. The warrants are still up on the boards with three names on them that nobody has ever heard, and nobody has been arrested. The town overhead hangs where it has always hung."
      },
      "body": "HOW TO USE THIS. The party has no assigned business in the city except the errand [[npc-wenna|Wenna]] gave them, so this list exists to be pointed at. When they say \"what's around,\" read them three or four of these and let them pick.\n\nNothing here is a quest chain. Each place is a room with something to do in it, and two of them hold a thing that matters later — [[loc-lampoffice|the Lamp Office]] register and the hoard in [[loc-ganny|Ganny's cellar]] — which the party can walk straight past without losing anything. Both are written so that noticing them is a reward and missing them costs nothing."
    },
    {
      "schema": 1,
      "id": "loc-clockface",
      "type": "location",
      "title": "The Clock Face — the meeting place",
      "parent": "f-locations",
      "order": 20,
      "rev": 3,
      "tags": [
        "city",
        "comedy"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "The face of the fallen clock tower lies in the middle of a street it is far too large to be taken out of — twelve feet across, glass gone, the numbers still legible, one hand snapped and the other bent. It came down through three roofs and the city has quietly given up on moving it. Bunting from the festival is still strung across the street above it, and somebody has run a line of it down to the clock and tied it off on the number nine.\n\nCHILDREN HAVE TAKEN THE CLOCK. There are six to ten of them on it at any hour, they have built a fort into the works, there is a rope ladder, and they charge adults a button to climb up. They have rules. The rules are extensive and are explained to anybody who will listen.",
        "who_is_here": "Everyone, eventually. Two honey-cake stalls and a man selling hot roast nuts have set up around the rim within a week, and none of them can be moved on because nobody can work out whose job it is. Runners wait here for work. Notices are wedged into the crack across the face. The tea woman pays the children's button toll every single day without comment.",
        "hidden": "Nothing is hidden here, and that is the point of it. This is the one place in the city where the party can be found by somebody who is looking for them, which will matter more than any secret."
      },
      "body": "WHAT THEY DO HERE. Meet people. Leave word. Hire a runner for a coin. Read the notices, which are mostly people looking for people. If the party needs to be found by an NPC — and over a long campaign they will, often — this is where it happens, and using one place for it every time makes the city feel like a place rather than a set of rooms.\n\nIt is also simply a good place to have a conversation, which a table with children in it needs more of than it needs another room with a door."
    },
    {
      "schema": 1,
      "id": "loc-petition",
      "type": "location",
      "title": "The Petition Rail — where you may say anything",
      "parent": "f-locations",
      "order": 30,
      "rev": 1,
      "tags": [
        "city",
        "registry"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "A brass rail outside the Registry, polished to a shine by a lifetime of hands, with a canvas awning over it and a clerk's desk at either end. Anyone at all may take the rail and say their grievance out loud. A human clerk writes down every word, reads it back, thanks them sincerely, and files it.",
        "who_is_here": "The queue, which today runs the length of the street and around the corner. Clerks who are unfailingly kind and slightly hollowed out. A hoarse man near the front who is here every single week and says the same thing: that the Fold is the best thing that ever happened to anybody, and that not one word of that explains why no human sits at any table where anything is decided.",
        "hidden": "Nothing has ever come of a petition. Not one, in a lifetime of them. The clerks do not know this, because each of them only sees their own share, and the filing is genuine — the words go into a real archive that is really kept. It is simply that the archive is where petitions are for."
      },
      "body": "WHAT THEY DO HERE. Formally demand anything, and be taken completely seriously. The most useful thing a party can do at this rail in Act One is get a name added to the count of the missing, which is exactly what [[npc-sela|Sela Orrin]] cannot do on her own and what the party's badges make possible in an afternoon.\n\nIt works, slowly, and it costs nothing, and every word said at the rail is written down with the speaker's name on it. Let that sit without comment.\n\nThe queue is its own resource: it is eleven days long, everyone in it is angry and talking, and it is the best place in the city to hear what people actually think. A man near the front will trade his place for a favor."
    },
    {
      "schema": 1,
      "id": "loc-lampoffice",
      "type": "location",
      "title": "The Lamp Office — where the city buys light",
      "parent": "f-locations",
      "order": 40,
      "rev": 4,
      "tags": [
        "city",
        "sunsalt",
        "clue"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "The lampwrights' hall: a stone room off the market with a long counter, and lamps hung in rows on chains from the beams — plain tin ones for a kitchen, and beside them, lit, the ones with shades of colored glass that cost four times as much and that half the street has bought because a neighbor bought one. Spare glass, wicks, grain-lanterns, and the sunsalt itself kept in a locked chest behind the counter and measured out with a spoon.\n\nOn the wall, a slate painted in two columns and chalked up fresh every week.\n\nSince the Draw closed, the price has doubled and there is a limit of one lamp to a household, written on the door in a hand that was angry when it wrote it. It is the first limit anyone in Dunlath has met in living memory and the street is taking it extremely badly.",
        "who_is_here": "A queue that has become a small civilization, because these people have never queued for anything and have decided to do it properly. A man near the front has brought a folding table, a cloth, and lunch. Two women have hired boys to hold their places and the boys have unionized and are now charging double. Somebody is auctioning his position out loud and is up to nine coins. A clerk is doing his best.",
        "hidden": "THE COLUMNS DO NOT MATCH. The left column is what came down from the Hearthspire this week. The right is what was issued to households. The right is smaller, and not by a little, and the gap has been there every week the board has been kept. The clerk has never added them, because the two columns are two different jobs and nobody has ever asked him to compare them."
      },
      "body": "WHAT THEY DO HERE. Buy light, fuel and spare glass — genuinely useful, and this is also where the Compass Spirit will eat later, so the party will come back.\n\nTHE CLUE, AND HOW TO PLAY IT. The slate is on the wall in plain sight. A player who reads it and does the arithmetic finds a shortfall the clerk cannot explain and is not hiding. Do not push it, do not have anyone react, and do not let the clerk turn out to be in on anything — he is not. If nobody looks at the board, nothing is lost.\n\nWhat it is worth later: this is [[npc-hettie|Hettie Sarn]]'s entire case, sitting on a wall for free. What the Reactors take in has never matched what comes out refined. When she finally opens her ledger and turns it around, a party that read this board already knows she is right, and the scene becomes a confirmation instead of a lecture."
    },
    {
      "schema": 1,
      "id": "loc-sixtyone",
      "type": "location",
      "title": "Sixty-One Pairs — the crease-salvage shop",
      "parent": "f-locations",
      "order": 50,
      "rev": 1,
      "tags": [
        "city",
        "shop"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "A deep narrow shop with sixty-one unmatched boots hanging from the ceiling on strings, each waiting on a partner that has not turned up. Everything on the shelves came out of a crease at some point: objects that arrived folded and did not entirely open again, half a chair, a kettle that is also a little bit of a different kettle, a pair of spectacles with one lens that shows the room slightly earlier.",
        "who_is_here": "The owner, who buys by weight and sells by the story, and who has never once been through a crease herself and is not curious about doing so.",
        "hidden": "She pays cash for anything brought back out of a crease, no questions, better than anyone else in the city. She is not an agent of anybody. She simply has the only market for it, because everyone else is frightened of the stuff."
      },
      "body": "WHAT THEY DO HERE. Rummage — give each hero one roll and let them turn up something strange; the stock is a licence to hand out oddities without them being magic items. Buy cheap gear. And, once they start going into creases, SELL, which makes this the party's first reliable buyer and gives crease-diving an economy.\n\nThe boots are the point of the shop and worth describing every visit. Sixty-one things that arrived without their other half is the Folding stated as a joke, and a table full of children will start looking for matches."
    },
    {
      "schema": 1,
      "id": "loc-longtable",
      "type": "location",
      "title": "The Long Table — the Draw crews' eating house",
      "parent": "f-locations",
      "order": 60,
      "rev": 3,
      "tags": [
        "city",
        "hub",
        "comedy"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "A handsome, prosperous eating hall — good dark timber, a great hearth, hanging lamps, and one enormous table running the whole length of the room, laid for sixty with proper plates. These were the best-paid workers in the world and they ate like it. Rooms upstairs, good ones. By the door, on a hook, a garland from the closing ceremony that nobody has taken down and nobody will touch.\n\nAND THEN: roughly half the room is dressed as clowns. Full white greasepaint, red noses, the whole business, and several of them are carrying horns and a drum they cannot play. The other half are dressed as bakers — tall white hats, aprons, flour on everything. Along one wall stands a knot of men in mismatched salvaged armor, and one of them is wearing a saucepan on his head, and he is arguing with a baker.\n\nEvery one of them is enormous and still has coal dust in the creases of his hands.",
        "who_is_here": "The Cinder Draw's crews, four days unemployed and retraining at speed, in two factions and a splinter group. THE CLOWNS want to start a circus. THE BAKERS want to start a bakery. Both have already spent money on the outfits, which is precisely why neither can back down. The argument is conducted at full volume across the length of the table and has been running since Thursday.\n\nThe cook has fed all of them since they were apprentices and is the closest thing the room has to a mayor.",
        "hidden": "The hiring board by the kitchen door, which for a lifetime was the busiest board in the city, is empty. Everyone in the room can see it from where they are sitting, and nobody is looking at it."
      },
      "body": "WHAT THEY DO HERE. Eat extremely well, sleep upstairs, and hear absolutely everything — this is the rumor hub, and any news the party needs can arrive at this table without contrivance.\n\nHOW TO PLAY THE ROOM. The argument stops dead when strangers walk in. Then both factions immediately try to recruit the strangers, at once, over each other. A party that takes a side will be hugged. A party that refuses to take a side will be pursued to the door. Do not explain the joke — it is a room full of enormous filthy men in clown makeup shouting about pastry, and it explains itself from the doorway.\n\nTHE MEN IN ARMOR. A dozen or so, in breastplates cut from ore-cart panels and helmets with the lamp brackets still bolted on, and one saucepan. They think both factions are being ridiculous and want to form a guard company. Unlike the other two, they can actually do the job: these are people who spent thirty years inside the exact canyon the party has been sent to walk the rim of, and they know it better than any map exists for. THEY ARE HIREABLE, cheaply, and they will take it desperately seriously. Four more names the party becomes responsible for.\n\nTHE FAST FAVOR. The cook's brother is at [[loc-petition|the petition rail]] again, several drinks in, working up to saying the thing that gets a man written down, and she would like somebody to walk him home. Five minutes, no dice unless the party wants them.\n\nWHAT IS UNDERNEATH. Nobody in this room has any idea what to do and all of them are doing something. The garland is still on the hook. Play the comedy completely straight and do not undercut it with a sad beat; the sadness is already in the costumes."
    },
    {
      "schema": 1,
      "id": "loc-rationhall",
      "type": "location",
      "title": "The Emporium — everything, under one roof",
      "parent": "f-locations",
      "order": 70,
      "rev": 4,
      "tags": [
        "city",
        "registry",
        "affluence"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "A covered market the size of a cathedral, and the proudest building in Dunlath. A vaulted stone roof on two ranks of pillars, a fountain at the crossing, and light coming down from high windows onto more goods than a person can take in at one look: cloth, boots, salt, oil, timber, rope, knives, cook-pots, saddlery, hides, honey, apples in barrels, lamps, and a whole aisle of nothing but bells.\n\nGarlands from the festival are still wound round every pillar. The floor is warm underfoot. There is no fire anywhere in the building and nobody remarks on it.",
        "who_is_here": "Half the city, in good cloth, because the Emporium is somewhere to be seen as much as somewhere to go. Stallholders and their apprentices shouting across the aisles. A physician's stall near the fountain with a real surgeon at it and no queue. And porters — dozens of them, in green, with handcarts — who are the most determined people in Dunlath.\n\nAt the door sits a clerk with the roll, who marks down what each household takes.",
        "hidden": "The roll is a census. Every portion drawn, every yard of cloth, every visit to the physician goes down under a name with a date, in the open, in front of the person concerned, because the record is exactly what makes the fairness real and auditable. It is the most honest institution in the city and it holds a complete history of everyone in it."
      },
      "body": "WHAT THEY DO HERE. Get anything they need, in comfort, for nothing — a citizen's portion is a right rather than a favor, and taking it is the ordinary business of a Tuesday. The party equips here. The surgeon by the fountain is excellent and free, which is where a hurt party goes.\n\nTHE JOKE, visible from the door: THE PORTERS WILL NOT LET THEM CARRY ANYTHING. A porter takes a sack out of a hero's hands mid-sentence and puts it on his cart. Refuse, and a second porter is fetched to assist with the difficulty. Leave, and three of them follow the party through the streets with their shopping, at a respectful distance, and are still behind them an hour later. They will carry a drawn sword. They will carry the party's lunch. Losing them is a real problem the players have to solve, and rudeness does not work on them even slightly.\n\nWHAT IT COSTS. Their injuries are on the roll with dates, and so is everything they took and where it went. Nothing comes of this in Act One. It comes up in Act Two, when somebody produces the dates and asks where they were.\n\nWHY IT MATTERS NOW. This is why [[npc-tobin|Tobin]]'s hands are worth more than they look. A party that decides on its own that it would rather not be written down has understood the occupation better than a speech could teach them, and they will have decided it inside a beautiful building that was nothing but generous to them.\n\n⚠ OPEN QUESTION FOR JOBY. Whether this is plenty administered as a right of citizenship or a rich market with its supports dressed as service is undecided. The Emporium reads as either and nobody in Dunlath could tell you which."
    },
    {
      "schema": 1,
      "id": "loc-wintergarden",
      "type": "location",
      "title": "The Glasshouse — the great hall of pleasures",
      "parent": "f-locations",
      "order": 75,
      "rev": 2,
      "tags": [
        "city",
        "affluence",
        "comedy",
        "hub",
        "sunsalt"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "The single most extravagant building in the world, and everybody in Dunlath will tell you so within a minute of meeting you. A hall the size of a barn-field roofed in GLASS — thousands of leaded panes in an iron frame, which in a world where a good window is a wealthy man's boast is a wonder people travel to stand under.\n\nUnder it, a garden that has no business existing: fruit trees in tubs, vines up the pillars, flowers out of season, all of it kept warm through the winter by a floor that is warm underfoot with no fire under it anywhere. Long tables, a kitchen at one end going all day, casks along the wall, a raised floor where players and singers work in shifts and never stop, and lamps that burn without flame.\n\nEvery garland from the festival is still up and there are fresh ones.",
        "who_is_here": "Everybody, loudly, at all hours. Families in the afternoon, crews at night. Servers at a run. A doorkeeper the size of a wardrobe who is extremely polite. Jugglers, a bear that is very obviously a man in a bear's hide and is beloved anyway, and a fire-eater who is not permitted indoors and works the door instead.\n\nChildren run free in the garden and the games yard, and are absolutely not allowed behind the curtain at the back, which is of course the only part any child wants to see.",
        "hidden": "Nothing sinister, which in this campaign is restful. Two things are worth knowing. The floor is warm because there is a sunsalt stone in the undercroft the size of a loaf, and it cost more than the glass did. And the dice behind the curtain are honest and the house still wins, and a hero who works out why has learned something true about the whole world."
      },
      "body": "WHAT THEY DO HERE. Eat, drink, sleep upstairs, and — mainly — PLAY. This is the room where the boys act instead of listen, so stock it with more than they can get through in a night. Everything is one d20 against a number and nothing needs a new rule:\n\n• Skittles down the long alley — beat 12. The house champion is an eleven-year-old girl and she will take anybody on, for money.\n• The ring toss over the horns of a very patient goat — beat 15.\n• Arm-wrestling the doorkeeper — beat 17, and he goes easy on children in a way he thinks is subtle.\n• Climbing the greased pole for the ham at the top — beat 14, and everybody in the hall stops to watch.\n• Guessing which of three cups, run by a man who is cheating — beat 20, because he is cheating.\n\nBEHIND THE CURTAIN. Dice, and the party is grown and rich enough to be let through. One roll, win or lose, no systems — the point is the room, not an economy.\n\nWHY IT EXISTS. Dunlath had no tavern and the campaign had gone entirely somber. This is the room that proves the world is worth saving. Give the party a good night here EARLY, so everything that happens afterward has something to be measured against.\n\nTHE UNDERTOW, played light. There is one table in the corner where two Surveyors sit among the noise, quite still, not eating or drinking anything, watching the room with evident pleasure. Nobody minds them. They come most nights. Mention them once, do not explain them, and go back to the clowns."
    },
    {
      "schema": 1,
      "id": "loc-foldingshop",
      "type": "location",
      "title": "The Folding Shop — a Surveyor that makes toys",
      "parent": "f-locations",
      "order": 80,
      "rev": 2,
      "tags": [
        "city",
        "surveyors",
        "comedy"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "A single small room off a side street with a workbench and stacks of plain paper, and it is no longer tidy, because the animals got out. There are paper birds on every rafter, dozens of them, shuffling and resettling. A paper horse has been walking into the same wall for a week. A paper dog follows every customer to the door and stops dead at the threshold, every time, and looks up. A fish is doing lengths of the room near the ceiling. Everything for sale costs one coin.",
        "who_is_here": "A Surveyor, which is not on ministry business and is not stationed here. It keeps the shop because it likes to. It is delighted to be visited and is very good with children, allowing for the half-second delay on every expression.",
        "hidden": "It keeps the coins in a jar and has no use for them whatsoever. It does not know what it is saving them for and finds the question interesting when asked. Ask it what it does when the shop is shut and it says, truthfully, that it folds. It has stopped trying to catch the birds and is not troubled by any of it."
      },
      "body": "WHAT THEY DO HERE. Commission a toy. Describe anything at all and it will fold it while they wait, in one unbroken motion, for one coin — and it will get the parts right that they did not describe, because it was listening to how they said it rather than what they said. A hero who asks for \"a dog\" gets their own dog, the one from when they were small, and will not be able to explain how.\n\nThis is where the bird in [[b-comm-6|Rab's hands]] was made, at the fair, the day before.\n\nHOW TO PLAY IT. Warm, generous, and slightly too accurate. The horror in the Surveyors is never cruelty; it is that they are better at knowing you than you are comfortable with, and they use it to be kind. A table that loves this shop is a table that will feel Act Two properly."
    },
    {
      "schema": 1,
      "id": "loc-ganny",
      "type": "location",
      "title": "Ganny Marle's Cellar — THE IMPOSSIBLE CORNER, one coin",
      "parent": "f-locations",
      "order": 90,
      "rev": 2,
      "tags": [
        "city",
        "wrinkle",
        "clue",
        "comedy"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "A sideshow, run out of a house. There is a painted banner nailed across the whole front of the building — THE IMPOSSIBLE CORNER, in four colors, with an artist's impression that is wildly inaccurate — a lamp over the door, and a boy on a box outside doing the patter. One coin gets you down six steps into the cellar and a look through a hand-sized hole in the back wall.\n\nThrough the hole the cellar does not meet itself. The far corner is about two feet further away than the near one says it should be, and there is a draught coming out of it that smells of somewhere else.",
        "who_is_here": "Ganny Marle, eighty, in a good hat, entirely uninterested in what the wrinkle is or what it means and extremely interested in the coin. The boy outside, who is her grandson and is on commission.\n\nDIRECTLY ACROSS THE STREET: her neighbor has painted a bigger banner — A BETTER HOLE, HALF PRICE — and he does not have a hole. He has never had a hole. The banners have been escalating for a month and both of them are now running out of wall.",
        "hidden": "Something small has been coming through at night and eating her preserves, and she has not mentioned this to anybody because she does not want the ministry in her cellar. It has a hoard behind the wall. See [[enc-ganny|the thing in Ganny's preserves]]."
      },
      "body": "WHAT THEY DO HERE. Pay a coin and look, which is worth doing on its own — this is the first time most of the party will have seen a wrinkle up close and had time to study it, rather than being in a fight beside one.\n\nThen, if there is room in the night, [[enc-ganny|the preserves]]. Fifteen minutes, and the thing that comes out of the hole is not a fight unless the party makes it one.\n\nWHY THIS PLACE EXISTS. It is cheap, it is weird, and it is exactly the sort of thing children ask to go back to. It also quietly establishes that the fold has small holes in it all over the city, which is the fact the whole of Act One is built on and which nobody has to say out loud."
    },
    {
      "schema": 1,
      "id": "loc-scarline",
      "type": "location",
      "title": "The Scar-Line — where the canyon was",
      "parent": "f-locations",
      "order": 100,
      "rev": 3,
      "tags": [
        "city",
        "act1",
        "assignment"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "A line in the earth, arrow-straight, miles long, where two days ago there was a channel dropping hundreds of feet with bridges across it and refinement towers built down its walls in tiers. All of that is inside the line now. On one side of it the grass is one green. On the other side it is another. A stream runs up to the line and does not quite meet itself on the far bank. A crow flies across and skips.\n\nIt is the newest thing in the world and it looks like it has always been there, which is the part people cannot stop staring at.",
        "who_is_here": "People, walking out to look at it the way people visit a grave — Draw families mostly, standing at the line and not saying much. No fence, no guard, and no ceremony now the garlands are down.",
        "hidden": "Where the stream fails to meet itself is the thinnest place in the city, and a hero who follows the water rather than the line will find it. It is not a way in. It is proof that a way in is possible, and it is the strongest argument the party can carry back to anybody."
      },
      "body": "WHAT THEY DO HERE. Nothing is assigned here (changed 2026-08-14 — the errand to the scar-line is cut, and the party goes to [[loc-hearthspire|the tower]] instead). This is somewhere they can wander to on their own, and it rewards an hour without asking for a single roll.\n\nWHAT IT ACTUALLY IS, for the DM only and not yet for the table: a portal site by the book's own definition, since a stream that does not meet itself across a join is two things that should line up and do not. Nobody has taught the party that portals exist and nobody should, here. It is a loaded gun left on a table in session three and fired in session ten.\n\nWHAT THEY GET NOW. The stream, the two greens, and the crow, and the beginnings of a theory about where the fold is thin."
    },
    {
      "schema": 1,
      "id": "loc-olddraws",
      "type": "location",
      "title": "The Old Draws — the workings that came before",
      "parent": "f-locations",
      "order": 104,
      "rev": 1,
      "tags": [
        "city",
        "sunsalt",
        "act1"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "Channels cut into the flats west of the tower, straight as a ruled line, running for miles. Not trenches — they drop hundreds of feet, sheer, and from the rim you cannot see the floor. Hard edges, stepped ledges down the sides, ramps, bridges spanning the gap, and refinement towers built into the walls in tiers going down into the dark.\n\nAll of them dry, dead and silent. Worked out generations ago and never filled in, because nothing in the world is big enough to fill them.",
        "who_is_here": "Nobody. A rope fence in the places nearest the road, mostly ignored. Children dare each other down the first two ledges and no further. Somebody has painted a line and a number on the wall of the nearest one, a long way down, and nobody knows who or when.",
        "hidden": "At every Draw retired before the Cinder, THE GRAY STOPS DEAD AT THE RIM, level as a tide line, the year that working closed. No blight has ever been known to do that. [[npc-hettie|Hettie Sarn]] has the dates."
      },
      "body": "WHY THEY ARE HERE. Scale, mostly. Standing at the rim of a dead one is how the table understands what was taken out of this world to light it, and it is free — no encounter, no roll, just a place to stand and look down.\n\nBENEATH THEM: the old sunsalt works. Galleries, sluices and lifting shafts running east from the Draws and up into Dunlath's undercroft, which is how the city was fed for two hundred years before [[loc-hearthspire|the Hearthspire]] was raised. Sealed at both ends, unmapped, and entirely still there.\n\nMention the works once and move on. It is a road under the city for whenever this campaign needs one."
    },
    {
      "schema": 1,
      "id": "loc-hearthspire",
      "type": "location",
      "title": "The Hearthspire — the tower, and the seam",
      "parent": "f-locations",
      "order": 105,
      "rev": 4,
      "tags": [
        "city",
        "act1",
        "tear",
        "assignment"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "Not one shaft but a works: fat smooth cylinders and arches banded together at the base, clean pipework curving between them, stepped galleries around the outside — and out of the middle of it one spire going up and up to a crown. All of it white stone and something like porcelain. No soot, no rust, nothing weathered anywhere on it. It was finished eleven days ago and it gleams.\n\nIt stands on the flats below the city with the fairground at its foot and the canyon country behind it. The crown is broken open and it is still lit. The wound runs the whole height of the face, top to bottom, down to the small door at the base that was built to take one offering.\n\nThe ground around the foot of it is the part nobody can look away from. From the rope line you can watch a bird fly into that ground and take a very long time to come out the other side.",
        "who_is_here": "A ring of Rectors standing on the ground at the tower's foot, evenly spaced, facing outward, in shifts that change without a word. They have been there since the hour it happened. Outside them a human cordon of bored guards, and outside that a steady trickle of people who have come to stand and look, and a woman selling hot nuts to them, because this is Dunlath.",
        "hidden": "The ring is not guarding the tower. It is holding the ground, because time and distance came apart around the base and have not gone back, and holding it is the only thing anybody can do — repair would need slack and there is none. So the ring is permanent, and it is being paid for out of a population that cannot make more of itself. Every Rector standing in that field is one that is never doing anything else again."
      },
      "body": "WHY IT MATTERS. This is where the tear happened, where eleven people went, and where the party goes in. [[f-wreck|THE WAY IN]] is the whole of it. Nobody enters the tower and there is no reason to — the way through is in the ground at its foot, and the order opens it for them.\n\nWHAT A LOOK FROM THE ROPE LINE GETS THEM, no roll required: the crown is still lit eleven days on, and nobody official has said one word about that. The ring has not moved. And the ground at the base does something to everything that crosses it.\n\nTHE WORD THE MINISTRY USES IS CONTAINED. Never closed, never healed, never repaired. It is a status rather than a claim about the world, and it happens to be entirely true."
    },
    {
      "schema": 1,
      "id": "loc-darkwindow",
      "type": "location",
      "title": "The Dark Window — the one unlit house",
      "parent": "f-locations",
      "order": 110,
      "rev": 1,
      "tags": [
        "city",
        "red-flag"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "After nightfall every window on every street in the city burns sunsalt, because light is the gift and the gift is free and refusing it would be strange. On any long street there is one window that does not. Behind the glass there is a small honest yellow flame of a kind most people in this city have never seen, and would not recognize as fire if asked.",
        "who_is_here": "Whoever answers the door: polite, unhurried, and frightened in a way that is easy to miss. They will say they have run out of lamp oil and that it is being seen to, and they will not invite anybody in.",
        "hidden": "It is a tallow candle. Tallow is not illegal and never has been — it is simply archaic, a thing the world has almost forgotten how to make, and no authority has ever thought to look for a house that refuses the gift rather than demanding more of it. The dark window is not a signal. It is an argument, addressed to nobody, and it has stayed safe for a generation precisely because nobody has worked out what it means."
      },
      "body": "WHAT THEY DO HERE. Notice it, which costs nothing and requires no roll — any hero who thinks to count windows on a dark street finds one. Then knock, if they like, and be lied to politely.\n\nHOW TO SEED IT. Mention one unlit window, once, in passing, on a night when the party is walking home from something else. Do not draw attention to it. Do not have anybody watch them from it. If they ask, the answer is lamp oil, and the door closes.\n\nWHEN IT PAYS OFF. Whenever you want. The party will meet Red Flag properly through [[npc-tobin|Tobin]] and eventually [[npc-hettie|Hettie Sarn]], and on the day somebody finally explains what an Unlit house is, a table that has already knocked on one will get there a beat ahead of the explanation.\n\nDO NOT let any authority investigate a dark window. The moment somebody in the ministry decodes it, the whole arrangement collapses and Red Flag stops being able to exist in plain sight."
    },
    {
      "schema": 1,
      "id": "f-iftime",
      "type": "folder",
      "title": "IF THERE IS TIME — fast pieces",
      "parent": "act1",
      "order": 30,
      "rev": 1,
      "tags": [
        "act1",
        "optional"
      ],
      "leadsTo": [],
      "fields": {},
      "body": "Short material to deploy when a session has room and skip when it does not. Nothing in here is load-bearing and nothing in here has to happen.\n\n[[b-slip|A slip]] — ninety seconds, anywhere at all, no preparation.\n[[enc-ganny|The thing in Ganny's preserves]] — fifteen minutes, at [[loc-ganny|Ganny Marle's cellar]], and it plants something worth calling back to."
    },
    {
      "schema": 1,
      "id": "b-slip",
      "type": "beat",
      "title": "THE ONE THAT GOT OUT — a paper animal, loose",
      "parent": "f-iftime",
      "order": 10,
      "rev": 2,
      "tags": [
        "city",
        "side",
        "comedy"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "Ten minutes, no dice needed, drop it into any street at any time. It announces itself from a hundred yards away and nobody has to notice anything subtle.",
        "read_aloud": "\"Somebody up the street shouts. Then a lot of people shout. And then something comes round the corner at knee height, going flat out.\n\nIt is a horse. It is made of paper, it is about the size of a cat, and when it turns you can see it has no thickness at all. Behind it, in order: a man in an apron carrying a broom, three children, a dog having the best day of its life, and a woman shouting that it is HERS and that she PAID for it.\"",
        "env": "• THE STREET — everything stops. Shutters go up, people come out to watch, and somebody is taking bets within about a minute.\n• THE HORSE — silent. That is the one unnerving note in an otherwise silly scene: it makes no sound at all, on stone or anywhere else.\n• IT IS ENJOYING ITSELF — it doubles back, it waits, it lets people almost reach it. This is not a frightened animal.\n• THE CROWD — helpful, loud, and actively making everything worse. At least one adult is taking it far too seriously.\n• THE OWNER — a woman with a receipt, which she will produce, twice.",
        "if_they": "…grab it, they get it, and it goes flat in their hands and slides out between their fingers like a dropped card. No damage and no roll — purely funny.\n\n…corner it, it folds under the door behind it. There is no door in this city it cannot get under.\n\n…get clever — block the street, herd it, drop a coat over it — let that work. Any actual plan should succeed. Reward thinking, not rolling.\n\n…stop chasing it and put a hand out, it comes straight over. It was never running away, it was playing, and nobody in the street had thought of that.",
        "outcome": "The woman gets her horse back. The man in the apron is from [[loc-foldingshop|the Folding Shop]], he is mortified, and he owes them one: a commission of their own, free, of anything they can describe. Do not mention the parts it adds that they did not ask for."
      },
      "body": "WHY THIS ONE. It replaces the old slip, which asked the players to notice something subtle and was therefore dead on the table. This announces itself, needs no setup, and the solution is the opposite of the first thing everybody tries.\n\nTHE REAL PRIZE IS THE PAYOFF — a free commission at the Folding Shop is a toy the party will play with for a whole session.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "enc-ganny",
      "type": "encounter",
      "title": "The thing in Ganny's preserves",
      "parent": "f-iftime",
      "order": 40,
      "rev": 1,
      "tags": [
        "act1",
        "optional",
        "clue"
      ],
      "leadsTo": [],
      "fields": {
        "setup": "[[loc-ganny|Ganny Marle]] mentions, once the party has paid their coin and had their look, that something has been at her preserves. Six jars in a fortnight, the lids off and set aside neatly rather than broken. She has not told the ministry because she does not want the ministry in her cellar.\n\nWait in the dark for twenty minutes of game time and something comes through the wrinkle.",
        "creatures": "One [[cr-snatch-goblin|snatch-goblin]] kit — knee-high, thin, and by itself. Use the sheet's numbers if it comes to dice, but halve the hit points and give it no interest whatsoever in fighting. It wants the jam. It is frightened of everything and it is very fast.",
        "tactics": "It is not an ambush and it does not attack. It freezes, it hides badly, and it bolts for the hole the moment anyone moves quickly. Anything the party does that is loud or sudden sends it back through the wrinkle, and it does not come back that night.\n\nWays this can go, all of them fine: corner it, catch it in a sack or a coat, feed it and watch what happens, block the hole and talk to it, follow it through the wrinkle before it closes, or kill it. If they are gentle it becomes almost tame within the hour, which children will find far more interesting than a corpse.",
        "reward": "THE HOARD, behind a loose stone in the cellar wall, and they find it whether the kit lives or dies. It is a magpie's pile of shiny nothing: buttons, three spoons, a bootlace, a brass curtain ring, a good deal of broken glass.\n\nAnd one thing that does not belong. Something that was on a person at the fairground two days ago — a garland ribbon in the Draw's colors, a child's shoe, a lamplighter's brass key. Something the party can recognize."
      },
      "body": "THE POINT OF THIS, and why it is worth fifteen minutes: the wrinkle in an old woman's cellar and the tear at the foot of the Hearthspire open into the same place.\n\nThat is a real, concrete, physical clue delivered by a goblin stealing jam, and it does three things at once. It proves [[npc-tobin|Tobin]]'s suspicion before he has earned the right to say it out loud. It tells the party that the way in does not have to be a great seam that Rectors are watching — the city is full of small holes. And it makes the thing they saw at the fairground personal again, because whatever is in that hoard belonged to somebody who is on the far side of it right now.\n\nHOW HARD TO PUSH. Not at all. Put the object in the pile and describe the pile. If nobody picks it up, [[npc-tobin|Tobin]] does, and writes it down, and says nothing — and the party can find it in his notes later, which is arguably better.\n\nIT IS NOT A FIGHT. The scoreboard of this campaign is rescues rather than kills, and this is the first chance after Lastlight to teach that with something small and frightened instead of something dangerous. A party that catches the kit in a coat and feeds it has learned more about how these sessions work than a party that rolls initiative."
    },
    {
      "schema": 1,
      "id": "f-reference",
      "type": "folder",
      "title": "Quick reference — for the table",
      "parent": null,
      "order": 50,
      "rev": 1,
      "tags": [
        "reference"
      ],
      "leadsTo": [],
      "fields": {},
      "body": "Things to grab mid-session. Lists, not reading."
    },
    {
      "schema": 1,
      "id": "ref-names",
      "type": "note",
      "title": "Names — when you need one right now",
      "parent": "f-reference",
      "order": 10,
      "rev": 1,
      "tags": [
        "reference"
      ],
      "leadsTo": [],
      "fieldDefs": [
        [
          "given",
          "Given names"
        ],
        [
          "family",
          "Family names"
        ],
        [
          "signs",
          "Shops, signs and inns"
        ],
        [
          "note",
          "The register"
        ]
      ],
      "fields": {
        "given": "Wenna · Hettie · Sela · Maud · Nell · Bry · Ossa · Tamsin · Annis · Perr · Ivy · Corrin\n\nTobin · Ellum · Rab · Bram · Ivo · Hask · Merrit · Pell · Osric · Wend · Dellow · Corr",
        "family": "Ash · Sarn · Rell · Wick · Orrin · Marle · Delk · Tarrow · Bind · Crale · Hollam · Vane · Quist · Brede · Loom · Skell · Ganty · Pyle",
        "signs": "The Bell and Barrow · Skell & Daughters · The Nine Lamps · Crale's Rope · The Good Hour · Bind the Younger · Tarrow's Salt · The Half Bushel · Pyle's, for Boots",
        "note": "Short, hard, plain, Anglo. One or two syllables. No apostrophes, no invented letters, nothing that sounds elvish. If it would suit a nineteenth-century mill town, it suits Dunlath."
      },
      "body": "Take the next unused one. Cross it off in your own copy."
    },
    {
      "schema": 1,
      "id": "ref-street",
      "type": "note",
      "title": "Dunlath at street level",
      "parent": "f-reference",
      "order": 20,
      "rev": 1,
      "tags": [
        "reference",
        "city"
      ],
      "leadsTo": [],
      "fieldDefs": [
        [
          "see",
          "What you see"
        ],
        [
          "hear",
          "What you hear and smell"
        ],
        [
          "sale",
          "What's for sale"
        ],
        [
          "wear",
          "What people are wearing"
        ],
        [
          "crack",
          "The crack it shows through"
        ]
      ],
      "fields": {
        "see": "Bunting across every street, a month up and going brown. A carousel nobody has dismantled. Half-struck stalls. Lamps burning in daylight because nobody has thought to put them out. Colonnades, fountains, handcarts, litters. The town overhead.",
        "hear": "Hammering, always, somewhere. Hawkers. Somebody practicing an instrument badly. Bells on the hour from three directions, none of them agreeing. Hot fat, honey, wet stone, and the faint mineral smell of sunsalt near a good lamp.",
        "sale": "Honey-cakes, blight-cakes, roast nuts, paper flags left over from the festival at half price, hot pies, ribbons, dyed feathers, small bells, salt in twists of paper, and lamp oil at a price people have started remarking on.",
        "wear": "Good cloth on everybody, because everybody has it. Colors — this is a rich city and it dresses like one. Festival ribbons still pinned to coats a month later, which nobody has decided to stop doing.",
        "crack": "One thing per session, mentioned once and not explained. A Surveyor writing at a corner. A white wagon going out through a gate with nobody watching it. A window that stays dark. A patch of ground where two paving stones do not quite meet."
      },
      "body": "Skim before any city session. Take one line from each field and you have a street."
    },
    {
      "schema": 1,
      "id": "cr-snatch-goblin",
      "type": "creature",
      "title": "Snatch-goblin",
      "parent": "f-monsters",
      "order": 10,
      "rev": 1,
      "tags": [
        "tear",
        "minion"
      ],
      "leadsTo": [],
      "fields": {
        "hp": "10",
        "ac": "12",
        "speed": "30 feet",
        "attack": "+3 to hit, 1d6 damage (small claws, smaller knives)",
        "trick": "The Snatch: instead of hurting somebody, it grabs a person its own size or smaller and drags them 20 feet toward the tear each turn. A grabbed person can twist free by beating 11 — and ANY hit on the goblin makes it drop whoever it is holding."
      },
      "body": "The classic goblin of the bad time, come through the tear sideways — knee-high greed with a sack. It does not especially want to fight; it wants to leave with somebody. Kill-count is beside the point in a snatch-goblin fight: drop-count is the fight. (SRD goblin chassis, reworded and reskinned.)"
    },
    {
      "schema": 1,
      "id": "cr-crease-wolf",
      "type": "creature",
      "title": "Crease-wolf",
      "parent": "f-monsters",
      "order": 20,
      "rev": 1,
      "tags": [
        "tear"
      ],
      "leadsTo": [],
      "fields": {
        "hp": "14",
        "ac": "13",
        "speed": "40 feet",
        "attack": "+4 to hit, 2d4 damage (bite)",
        "trick": "Hunts folded: it slips through any gap — fence rails, table legs, a panicked crowd — without slowing, and when a packmate stands beside its target, a bitten hero must beat 12 or be knocked down."
      },
      "body": "The wolf from every grandmother's story, wrong in the daylight — it moves the way scissors move, and it looks flat when it turns. It never carries anyone; it herds runners back toward the goblins, which is worse. (SRD wolf chassis, reworded and reskinned.)"
    },
    {
      "schema": 1,
      "id": "cr-tear-ogre",
      "type": "creature",
      "title": "Tear-ogre — the penned one",
      "parent": "f-monsters",
      "order": 30,
      "rev": 1,
      "tags": [
        "tear",
        "heavy"
      ],
      "leadsTo": [],
      "fields": {
        "hp": "30",
        "ac": "13",
        "speed": "30 feet",
        "attack": "+5 to hit, 1d8+3 damage (a fistful of fairground)",
        "trick": "The Sweep: once a round, everything beside it must beat 13 or be thrown 10 feet and knocked down."
      },
      "body": "The heavy that came through last at Lastlight — and the fight the party does NOT have. The Rectors pen it far off, a street folded shut around it, which is the crowd's first lesson in what the order can do and the table's first sight of the campaign's power ceiling. Statted here (Heroic band) for the day the party meets one inside, where no Rector is coming. (SRD ogre chassis, reworded and reskinned.)"
    },
    {
      "schema": 1,
      "id": "npc-wenna",
      "type": "npc",
      "title": "Wenna Ash — the recruiter",
      "parent": "f-npcs",
      "order": 10,
      "rev": 2,
      "tags": [
        "act1",
        "green-fields"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "Weathered and warm, dressed for standing all day. Scans every crowd face by face against a little sheaf of hand-drawn portraits, and does not run when the sky opens.",
        "wants": "The taken found and brought home, and her movement believed. She lays four places at her table and has three children, and cannot say why.",
        "voice": "Plain and steady. Never gives speeches; asks questions and then waits as long as it takes.",
        "secret": "She has no secrets of her own, which is the tragedy. She has never heard of the Armature; she does not know her expeditions are steered from above her head; and she does not know that the fourth place at her table belongs to the one taking Green Fields will never name. Everything she tells the party, she believes."
      },
      "body": "Green Fields' recruiter, six years in. Session one she works the Lastlight crowd, stands through the fight, and closes the session with the interview in the dust — which is also the campaign's collection point for the players' own material. The betrayal, when it lands, lands through her and not on her; she must be a person to the party long before then. Appears in: [[f-lastlight|LASTLIGHT]]."
    },
    {
      "schema": 1,
      "id": "npc-tobin",
      "type": "npc",
      "title": "Tobin Rell — the clerk sent to watch them",
      "parent": "f-npcs",
      "order": 20,
      "rev": 4,
      "tags": [
        "act1",
        "registry",
        "red-flag"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "Young, inky, over-neat; carries a satchel of forms the way other men carry shields. Has never been in a fight and stands like it.",
        "wants": "To do his job well — he has never once done a job badly — and to find out what happened to Ellum Wick, which are no longer the same ambition and have not been for about four months.",
        "voice": "Apologetic precision. Clears his throat before bad news, and writes down what he sees, accurately, every night. When he says something dangerous he says it once, quietly, badly, and then apologizes for saying it.",
        "secret": "THREE, discovered in this order, and the order is the whole design. FIRST, he is a mender — his grandmother's outlawed art, her hearth-spirit riding in a wooden darning egg in his coat pocket — which surfaces in the first bad fight and hands the party a secret to keep FOR him. SECOND, he files nightly to a Registry office above Wenna's head that she has never dealt with, which is a secret he kept FROM them. THIRD, he copies those filings to a house with a dark window, and has done since he read the last legible page of Ellum Wick's field book.\n\nHe is a double agent and both sets of books are honest, because he is incapable of writing anything down wrong. He does not think of himself as Red Flag. He thinks of himself as a careful man who has checked the arithmetic twice and cannot make it come out."
      },
      "body": "Assigned to the party in [[b-comm-5|beat 5 of THE COMMISSION]], under the Accord's clause that no expedition enters the creases without a clerk to keep the record. Introduce him as an inconvenience. Through Act One he is the party's healer, and the inversion should be enjoyed: the ministry's watcher is the reason its quarry keeps getting back up.\n\nWHY HE IS ALREADY HALFWAY GONE (changed 2026-08-11). The campaign needs somebody who can put Red Flag's case to the party as a liberation fight rather than as the terrorism the Set Square describes, and it needs that in session two rather than session ten — otherwise the ministry's account stands unopposed for a third of the act. Tobin is that voice. He does not preach and he does not recruit; he asks one question at a time, and each one is a number that does not add up.\n\nHIS FIRST QUESTION IS NOT ASKED ON DAY ONE (changed 2026-08-14). He does not volunteer a dangerous thought to four strangers he met an hour ago; a careful man does not, and saying it out loud is what gets a man folded away. On the first day he is an inconvenience with a satchel. The on-ramp comes after they have been inside the tower together and he has written the day up — because what he cannot do is record something he did not see, and the ministry's account of that tower and his own eyes are about to stop matching.\n\nPLAYING THE BALANCE. He must stay likeable, useless in a fight, and easy to protect, because the children should own his safety long before they own his politics. Let them push him either way: a party that argues the ministry's case at him can genuinely slow him down, and a party that pushes will get further, faster, than anybody intended. He is not load-bearing — Red Flag reaches the party through [[npc-hettie|Hettie Sarn]] regardless, and Ellum's satchel can be found by anyone."
    },
    {
      "schema": 1,
      "id": "npc-finch",
      "type": "npc",
      "title": "Finch — the lamplighter",
      "parent": "f-npcs",
      "order": 30,
      "rev": 3,
      "tags": [
        "act1",
        "taken"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "Seven years old, best shirt, gap-toothed grin; was waving to the whole city right up until the sky reached out.",
        "wants": "To go home.",
        "voice": "Not yet — he is the face at the top of the rescue list, and for a whole day he is not even a name.",
        "secret": "⚠ THE PARTY DOES NOT LEARN HIS NAME UNTIL HIS MOTHER SAYS IT. He is never named at the ceremony, never named in the dust, and never named by any official in the Set Square, because the ministry counts to eleven and does not distinguish among them. His name reaches the table for the first time in [[b-comm-6|the last beat of THE COMMISSION]], on a step outside, from [[npc-sela|Sela Orrin]], twenty-four hours after they watched him be taken. Keep it off the table until then; the whole scene is built on it.\n\nHe is not declared anything, and that is the point. He is one of eleven, in a number the ministry settles on by evening, and no official says his name in the party's hearing at any stage. In truth the first monster through the tear carried him off alive, best shirt, glass reliquary and all, in front of ten thousand people."
      },
      "body": "Chosen by lottery to set the reliquary of the Cinder Draw's last crust into the Hearthspire's offering chamber. The tear ripped down the tower's face to the chamber; he outran the falling clock tower by a step and was taken by the first thing through. The party watched it happen, which makes them witnesses to something the state has since reduced to arithmetic.\n\nHis mother is [[npc-sela|Sela Orrin]] and his younger brother is Rab, five, who gives the party a paper bird in [[b-comm-6|the last beat of THE COMMISSION]]. Appears in: [[f-lastlight|LASTLIGHT]] (unnamed) and [[f-commission|THE COMMISSION]] (named, once, by his mother)."
    },
    {
      "schema": 1,
      "id": "npc-hettie",
      "type": "npc",
      "title": "Hettie Sarn — the woman who did not clap",
      "parent": "f-npcs",
      "order": 40,
      "rev": 3,
      "tags": [
        "act1",
        "red-flag"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "Old and square-built, gray as weathered fence-wood, with a ledger under one arm. At the ceremony she is the only still thing in ten thousand people. Two fingers gone on the left hand, taken by the work, and she uses the hand anyway and does not explain it.",
        "wants": "To be proven wrong. She never is.",
        "voice": "Numbers first. Her method of recruitment is to open the ledger, turn it around, and wait. She will let a silence run for as long as it takes and has never once filled one.",
        "secret": "She ran the Cinder Draw for thirty-one years and accounted for more sunsalt than any living person. Her gray ledger shows the damage tracking the workings, the intake that never balances, and the shakes that follow the great pulls — and, kept quietest of all, a census of the faded, whose rest villages she has visited and found empty. Founder of the candle people."
      },
      "body": "Session one she is seen, not met: the old woman at the rope line, counting the white wagons into her ledger, not clapping. Local — the farmland the gray ate was her family's.\n\nPLAY HER AS THE MOST BORING PERSON IN THE ROOM until the ledger opens. She does not argue, does not persuade, and does not raise her voice. She hands you an arithmetic problem and lets you do it yourself, which is why she cannot be dismissed as a crank.\n\nWhen the party crosses to her is open. She is the one who carries the real rebellion after [[npc-tobin|Tobin]] goes. Appears in: [[f-lastlight|LASTLIGHT]] (unnamed, at the rope line)."
    },
    {
      "id": "cr-warden",
      "type": "creature",
      "title": "Surveyor warden — the ones upstairs",
      "parent": "f-monsters",
      "order": 40,
      "tags": [
        "surveyor",
        "act1"
      ],
      "fields": {
        "hp": "22",
        "ac": "15",
        "speed": "30 feet, and it can fold flat and go under a door",
        "attack": "+5 to hit, 2d6 damage — it opens an arm into an edge and closes it again",
        "trick": "COMES UNDONE, NEVER DIES. At 0 hp it parts along its creases into a drift of flat panes that slide away through the air and are gone. It is not dead, nothing is left on the floor, and three rounds later it re-forms at the top of the next flight — unless the party has already gone past it. The way to beat a warden is to stop trying to beat it."
      },
      "body": "The order's working grade, not its ritual grade: no fans, no crowns, nothing ceremonial. Very tall, very plain, and unfailingly polite even while fighting — it will apologize for the stairs. Two is a real fight for four level-3 heroes and three is a hard one. Not used in Act One as written — the party is let past the ring rather than fighting through it — and kept here because this is the order's working grade and the party will meet it eventually.\n\nTHIS IS WHERE THE TABLE LEARNS THE CAMPAIGN'S COMBAT GRAMMAR, so let the first one come apart dramatically and then let the party hear it re-forming above them. Nobody in this campaign kills a paper man. They get past him, and they meet him again, and he remembers.",
      "schema": 1,
      "rev": 2,
      "leadsTo": []
    },
    {
      "id": "f-wreck",
      "type": "folder",
      "title": "THE WAY IN — the tear site",
      "parent": "act1",
      "order": 25,
      "tags": [
        "act1",
        "session3"
      ],
      "fields": {},
      "body": "",
      "schema": 1,
      "rev": 2,
      "leadsTo": []
    },
    {
      "id": "sc-wreck",
      "type": "scene",
      "title": "▶ RUN THESE IN ORDER — the way in",
      "parent": "f-wreck",
      "order": 10,
      "tags": [
        "act1",
        "session3",
        "index"
      ],
      "fieldDefs": [
        [
          "order",
          "▶ Run these in order"
        ],
        [
          "setting",
          "The lie of the land"
        ],
        [
          "before",
          "Before you start"
        ],
        [
          "after",
          "Where it leaves them"
        ]
      ],
      "fields": {
        "order": "1. [[b-wreck-1|The tear site]] · the held ground, the ring, and the sound coming out of it\n2. [[b-wreck-2|They open the way]] · the order opens it, the party walks through, STOP\n\nThis is short on purpose. It is the last half hour of the session and the whole of it is getting them to the edge and letting them step over it.",
        "setting": "[[loc-hearthspire|The Hearthspire]] on the flats below Dunlath, eleven days dead and still lit at the crown. Nobody goes into the tower — there is nothing in the tower. The ground at its foot is where the world came open, and that ground is being held by a ring of Rectors who have not moved since the day of the fair.",
        "before": "Know that the directive is simple and was given yesterday: eleven people are on the other side, go in and bring back who you can. Know that the order is going to open the way for them, in daylight, politely, and that this is a favor rather than a breach. And know that you are stopping the session the moment the last hero is through.",
        "after": "Inside. Whatever is in there is next session and the table should go home not knowing."
      },
      "body": "HOW TO RUN IT. Do not put an obstacle in front of this. The party has a writ, a signature, and an appointment, and every single person they meet is expecting them and glad they came. The tension is not whether they will be allowed in. It is that they are being allowed in.\n\nTHIRTY MINUTES, AND THEN STOP. If the session has run long, this is still worth reaching — walking through the hole is a far better place to leave the table than anywhere else in the evening.",
      "schema": 1,
      "rev": 2,
      "leadsTo": []
    },
    {
      "id": "b-wreck-1",
      "type": "beat",
      "title": "1 — The tear site: the ring, and what is under it",
      "parent": "f-wreck",
      "order": 20,
      "tags": [
        "act1",
        "session3"
      ],
      "fields": {
        "hook": "They have seen the paper people be magnificent. This is the first time they see them working, and working is worse: a dozen of them standing in a field, doing nothing at all, and having done nothing at all for eleven days.",
        "read_aloud": "\"You can see it from the top of the slope. The tower is still white, still gleaming, without a mark of weather on it, and the crown at the top is still lit — eleven days on, at midday, glowing away up there like a lamp somebody forgot.\n\nAt the foot of it there is a ring of the paper people. A dozen or so, evenly spaced, facing outward, standing on the grass. They are not holding anything and not looking at anything, and every so often one of them is replaced by another and neither of them says a word about it.\n\nThe ground inside the ring is wrong. A bird flies into it and takes far too long to come out the other side. The grass moves in a wind that reaches you a moment later than it should. Somebody's dog will not go near it, and neither will the hot-nut woman, who has set her stall exactly as close as she is willing to stand and no closer.\n\nAnd if you stand still and stop talking, you can hear something under it. A long way off and very faint, and it is a great many people.\"",
        "env": "• THE WALK OUT — west gate, down the slope, past the fairground, which is still half struck: stalls part dismantled, rope lines down, a carousel standing on its own with nobody near it.\n• SOUNDS — the city noise thins out about a hundred yards from the ring and then stops. People near the rope talk quietly without having decided to.\n• SMELLS — wet grass, and nothing whatsoever from the tower. No smoke, no burning, no dust. The worst disaster in living memory does not smell of anything.\n• UNDERFOOT — grass trampled flat by eleven days of people coming to look, and then a line where the trampling stops and nobody has walked at all.\n• WHO IS HERE — Draw families mostly, standing the way people stand at a grave. A bored human cordon. The hot-nut woman, doing steady business at the exact edge of where she is willing to stand.\n• AND UNDER ALL OF IT — voices, faint, a long way off, and only if everybody stops talking. Make them stop talking to hear it.",
        "if_they": "…show the writ, the human cordon waves them through without reading it. The ring is different: one of them turns, takes their names, thanks them with enormous sincerity, and is plainly expecting them, because Wenna's paper went across yesterday afternoon.\n\n…ask what the sound is, the answer is: the people who went through. It says this kindly and without drama, as though it had assumed they knew, and it is the reason the party is about to do something insane.\n\n…ask why the order does not go in and get them itself, the answer is polite and complete: it cannot spare anyone. Push, and it says that those who go in do not come out, and that this has been established. It will not say how many times.\n\n…ask about the crown still being lit, the warden on duty says it is being monitored. That is all it says, and it is not being evasive — it genuinely believes that is the answer.",
        "outcome": "Expected, thanked, and standing at the edge of ground that nobody else will walk on. Then [[b-wreck-2|they open the way]]."
      },
      "body": "THE IMAGE TO LAND is a dozen enormously powerful beings standing in a field doing nothing, forever, because it is the only thing anybody can do. Everything the party works out later about what this occupation is spending hangs off having seen it.\n\nKEEP THE HOT-NUT WOMAN. A catastrophe with a snack stall parked at the edge of it is exactly this city.\n\nTHE SOUND IS THE HOOK, and it should arrive before anybody asks them to go in. Voices, a long way off, from a place that is forty feet away. That is what makes the next beat a decision instead of an order.",
      "schema": 1,
      "rev": 3,
      "leadsTo": [],
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "id": "b-wreck-2",
      "type": "beat",
      "title": "2 — They open the way",
      "parent": "f-wreck",
      "order": 30,
      "tags": [
        "act1",
        "session3",
        "payoff"
      ],
      "fields": {
        "hook": "Everything the party has been given this week was handed over by somebody being kind to them. This is the last of it, and it is a hole in the world.",
        "read_aloud": "\"Four of them come in off the ring and stand around a patch of ordinary grass, and they do not hurry. Their hands move for about eight seconds — the same unhurried, never-going-back-to-correct-anything way you watched one fold a writ in an office two days ago — and the air in front of you stops agreeing with itself.\n\nThere is a way. It is about the size of a door and it is not a door, and looking straight at it is difficult in a way you cannot explain to each other afterward. Through it, or past it, or under it, there is somewhere with a different light in it.\n\nAnd the sound is not faint anymore.\n\nThe one who took your names says: 'We will hold it open. We cannot hold it open indefinitely, and we cannot come with you.' It says the second part apologetically, the way you would decline an invitation you actually wanted. 'Bring back who you can.'\"",
        "env": "• THE EIGHT SECONDS — the same unhurried hands they watched fold a writ two days ago. No chanting, no gesture anybody could copy, nothing anyone would call a ritual. It looks like competent work.\n• THE WAY ITSELF — about the size of a door, standing in open air with nothing holding it up and nothing around it. Looking straight at it is difficult in a way nobody manages to describe to each other afterward.\n• THROUGH IT — a different light, warmer than this one, and plainly the wrong time of day.\n• THE DRAUGHT — air coming out of it, and it is warm, and it smells of somewhere outdoors.\n• SOUND — the voices stop being faint. That is the change everybody at the table will feel, and it is the whole argument for going in.\n• THE AUDIENCE — the cordon, the people at the rope, and the hot-nut woman have all stopped what they were doing and are watching four young people decide.",
        "if_they": "…ask how long they have, it says as long as it can manage, and it will not give a number, because it does not have one and will not invent one to comfort them.\n\n…ask how they get back, it says: the same way. Do not resolve tonight whether that is true.\n\n…ask what is in there, every one of them says the same thing in slightly different words: nobody knows. They are not hiding anything. Nobody has ever come back to tell them.\n\n…refuse, nobody makes them, nobody is angry, and the offer does not expire. The eleven stay where they are, and so does the sound.\n\n…go through, go around the table and let each player say how their hero does it. That is the last thing that happens tonight.",
        "outcome": "STOP HERE, the moment the last hero is through. No description of the far side, no fight, no explanation. The table goes home standing in a doorway."
      },
      "body": "THIS IS THE CLIFFHANGER and it does not need dressing up. Four people who could not save a boy eleven days ago are walking into the place he went, on purpose, because they can hear him.\n\nPLAY THE OPENING AS A COURTESY, not a ritual. Nobody chants. It is four polite beings doing an eight-second piece of work for some young people they think very highly of, and the horror is entirely in how normal it is for them.\n\nDO NOT LET ANYONE SAY WHAT IS ON THE OTHER SIDE, including the party once they are through. Next session opens on it.",
      "schema": 1,
      "rev": 3,
      "leadsTo": [],
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "b-pantry",
      "type": "beat",
      "parent": "f-iftime",
      "leadsTo": [],
      "rev": 1,
      "title": "THE WRONG ROOM — a man whose pantry is somewhere else",
      "order": 20,
      "tags": [
        "city",
        "side",
        "comedy"
      ],
      "fields": {
        "hook": "Ten minutes. The world folds space as a matter of course, and here that is not a horror, it is a man being extremely annoyed about his pantry.",
        "read_aloud": "\"A man is standing in his own doorway holding a lamp. He has clearly been waiting all day for somebody official, and you have badges.\n\n'Right,' he says. 'Look at it. Just look at it.'\n\nHe opens the pantry door. Behind it is not a pantry. It is somebody else's cellar — barrels, a swept floor, a lamp burning that nobody lit, and a coat on a hook that is not his coat. The light in there is a different time of day.\n\n'That has been like that since Tuesday,' he says. 'My preserves are in there.'\"",
        "env": "• THE FLAT — ordinary, tidy, and one door in it is wrong.\n• THROUGH THE DOOR — cool air, a different light, and the smell of somebody else's cooking.\n• THE MAN — not frightened in the slightest. He is annoyed, he has written it all down, and he would like somebody to sign something.\n• THE COAT — good cloth, and it has hung there since Tuesday, and nobody has come for it.\n• THE NEIGHBORS — completely uninterested. Two doors down a woman says hers did that last year and it sorted itself out.",
        "if_they": "…go through, they can, and it is a cellar, and it is somebody's, and they should feel like burglars. Nothing in it is dangerous. Getting back is walking back.\n\n…ask what caused it, the honest answer is that the ministry pinched a street shut three streets over last week and this is the sort of thing that happens. Everybody knows this. Nobody finds it remarkable.\n\n…try to fix it, they cannot, and neither can anybody they can reach today.\n\n…take the coat, let them. Somebody is going to want it back eventually.",
        "outcome": "He wants two things: his preserves, and somebody with a badge to witness his petition at [[loc-petition|the Petition Rail]] so it goes in properly. Both are easy and both cost the party nothing but an afternoon."
      },
      "body": "WHY THIS ONE. It is the cosmology arriving as an inconvenience rather than a lecture — a folded world is a place where a man loses his pantry and files a form about it, and that does more for the setting than any amount of explaining.\n\nIT IS NOT A PORTAL and must never be run as one. It is the edge of a wrinkle the ministry made on purpose, three streets away, for reasons nobody told this man.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "b-measuring",
      "type": "beat",
      "parent": "f-iftime",
      "leadsTo": [],
      "rev": 1,
      "title": "THE MEASURING — a Surveyor that will not move",
      "order": 30,
      "tags": [
        "city",
        "side",
        "comedy"
      ],
      "fields": {
        "hook": "Fifteen minutes of comedy that teaches the table exactly what these beings are like. No danger, no dice, and one real fact handed over by accident.",
        "read_aloud": "\"There is one of the paper people standing in the middle of the street. It has been there since dawn. Carts are going round it. A queue of three people has formed behind it for no reason anybody can explain.\n\nIt is holding one arm out and turning, very slowly, about a degree at a time. It has completed two full circles this morning.\"",
        "env": "• THE STREET — has adapted completely. Traffic flows around it. A stall has moved six feet and nobody discussed it.\n• THE QUEUE — three people who do not know why they are queueing and are now far too committed to leave.\n• IT IS DELIGHTED TO BE ASKED anything at all, and answers at once, at length, and with total honesty.\n• AND THE ANSWERS ARE USELESS — not evasive and not coded. Genuinely honest, about a subject nobody present has the words for.\n• TIME — it will still be there tomorrow. It will be gone the day after, with no announcement.",
        "if_they": "…ask what it is doing, it says it is measuring. Ask what it is measuring and it gives the true answer, which involves three words nobody at the table has ever heard and one gesture. It will repeat this as many times as they like.\n\n…ask why here, it says because this is where it is. That is not a joke and it does not have a second answer.\n\n…ask whether something is wrong, it says no. It is telling the truth, and it is the only reassuring thing it says all day.\n\n…keep at it politely, they get ONE real thing, given freely because they asked properly: it is measuring how far apart two things are, and the answer this morning is different from the answer yesterday.",
        "outcome": "Nothing happens and nobody is in danger. The party walks away with a joke, a very clear sense of what these beings are, and one number that changed overnight."
      },
      "body": "WHY THIS ONE. The comedy and the dread are made of the same material, which is the whole trick with these beings — a table can laugh at this for fifteen minutes and still leave the street uneasy.\n\nTHE ONE REAL FACT is the distance changing. Give it freely rather than making them win it, do not explain it, do not have anybody react to it, and do not raise it again.",
      "fieldDefs": [
        [
          "hook",
          "The hook — why do they care?"
        ],
        [
          "read_aloud",
          "Read aloud"
        ],
        [
          "env",
          "The place — quick sketch"
        ],
        [
          "if_they",
          "If they…"
        ],
        [
          "outcome",
          "Where it leaves them"
        ]
      ]
    }
  ]
};
