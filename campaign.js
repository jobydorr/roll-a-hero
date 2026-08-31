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
      "rev": 4,
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
        "history": "PLAYER-FACING. This is the whole history as any Dunlath nine-year-old would tell it, and every word of it is what the world believes.\n\n\"Before all this, the world was wide. It took a season to cross what you can walk in a day now. Grain rotted before it reached the city. A letter came a year too late to matter. And in the empty country between towns there were things that ate people — whole villages, some years. Your great-grandparents called it the bad time, and they were not being dramatic.\n\nThen a man set out to fix it. The finest wizard anyone had heard of, and he could reach under the world and take hold of the cloth it is made from. He reached further down than anyone ever had — and he found marks in that cloth that nobody here had made. Creases, left by hands that were not hands. Something on the other side noticed him looking.\n\nThey came through to us. Tall, courteous, folded people, made of something like paper. For a whole year they did nothing but measure — the roads, the rivers, the distance between one town and the next. That is why we call them what we call them.\n\nThey brought a gift, and the gift is the reason your lamp is lit: sunsalt, a crystal of the light of their own world. And they brought an idea. Fold your world, they said, and the folding will press sunsalt out of it the way a press gets cider out of apples, and there will be no more want and no more distance, ever again.\n\nSo it was folded.\n\nThe wild country went away into sealed pockets with the monsters of the bad time shut inside them, and that is why children walk to the next village on their own now. The far places came close together, so a thing grown three hundred miles away is on your table the same week. And the man who did it — well. Nobody says. Ask three people what became of him and you will get three answers and a shrug, and the ministry has never said one word about him in your lifetime or your mother's.\n\nThere is no king of this world and no throne in it. There is the ministry, which keeps the roads and the ledgers and the rations, and which will show you the procedure if you ask who is in charge.\n\nNow: you will hear a name. THE FOLDWRIGHT. Everybody has heard it and nobody agrees what it means. Your gran might use it like a swear. A man at the rail might say it like a promise. Half the people you know think it is a title out of an old song and not a person at all, and most people have never once put it together with the man in this story. It is the sort of name that turns up painted on a wall and scrubbed off by dinnertime.\n\nNot everyone was grateful. A generation ago there was a war about it, and it was long and it was ugly, and you cannot kill a Surveyor — strike one down and it comes apart into flat pieces and slides off through the air and is back inside a month. So the war ended at a table instead. That is the Accord: nobody is punished for the war, every household is provided for, anyone may stand up and petition, and anyone may go looking for what the creases took.\n\nAnd here we are. Nobody in this city is hungry. Nobody is cold. There is a lamp in every window and a fair share for every house. The ground shakes now and then, and everybody will tell you the same thing about that: it is only the settling. The world easing itself into its finished shape.\"",
        "seen": "The land overhead, close enough to make out roofs and a road and a clock tower.\nScar-lines: dead straight seams in the ground where something was folded shut.\nCreases, where the land changes angle for no reason at all.\nWrinkles — a cellar corner, a stair, a doorway that does not meet itself.\nLight coming in low and wrong at the corners of the sky.\nAnd sunsalt in every lamp, which is the world being pressed, though nobody puts it that way.",
        "truth": "DM ONLY. None of this is known to anyone in Dunlath, and the party must not learn it early. Full account in CAMPAIGN.md §1.\n\n• IT NEVER FINISHED. The Foldwright read the design halfway through and understood that the world was not being folded into a shelter but into an ENVELOPE — a copy of the Surveyors' own dimension, folded, finished, closed, and addressed. Something had already begun to arrive at the center to collect it.\n• So he jammed the working at its midpoint, pinned the half-arrived thing there, and it cost him the greater part of himself. He fled into the Snarl with the machine that governs the fold, and he is there now, hollowed, holding it.\n• THE SHAKING IS NOT THE SETTLING. It is his grip slipping, and it is getting worse.\n• The cities that went into the creases went in with everyone living in them, and the folding creased the memory shut too, so the world does not know what it lost.\n• THERE IS NO FIGURE AT THE TOP OF THIS WORLD. No throne, no veil, nobody wearing his name. The First Surveyor governs as an administrator and a signature, and the humans three floors below it think of it as a department. That was chosen on purpose: a figurehead can be hated, and a procedure cannot.\n• THE MINISTRY HAS NEVER ACKNOWLEDGED THE MAN, in three generations. Not to deny him, not to condemn him. That silence is why his name is loose in the world meaning six different things — and it is the one real crack in the arrangement, because a name nobody will explain is a name anybody can fill.\n• RED FLAG HAS FILLED IT WITH HOPE. THE FOLDWRIGHT LIVES is their article of faith: a prisoner, or in hiding, or working still in the creases, depending who you ask. Find him and restore him and the resistance becomes a war it could win. They are right that he lives, roughly right about where, and catastrophically wrong about what finding him gets them.\n• And one rebellion is owned by the people it petitions.\n\nThe Surveyors are not from another folded world in this orbit. They are INTERDIMENSIONAL — they came through portals from their own dimension entirely, which is where the Finished World is."
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
      "rev": 7,
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
      "body": "THE GAMES. One roll each, no consequences, purely for the fun of it — and every one has a real prize, because a worthless prize is not worth rolling for. All of it is junk and all of it should be described like treasure.\n\n• Knock the hat off the post with a beanbag — beat 12 — WIN: the hat.\n• Guess the weight of a stone brought up out of the Draw — beat 15 — WIN: a whole silver piece, and nobody has ever won it, and the stone is heavier than it has any right to be.\n• The greased pole, with a ham on the top — beat 14 — WIN: the ham. It is an enormous ham and a crowd gathers.\n• Race a paper bird against another child's, down the length of a rope — beat 10, and you may cheat — WIN: the other child's bird, which you should absolutely give back.\n• Have your trade guessed by a man in a red coat — beat 13 to stump him — WIN: a cake. He will guess one hero's trade correctly and unnervingly fast, and that hero gets no cake.\n• Blight-cake eating against a nine-year-old — beat 16 — WIN: a blue ribbon that says CHAMPION, and the nine-year-old is a professional and will want a rematch all day.\n\nTHE BIRD-FOLDER IS THE ONE THING TO MAKE SURE THEY SEE. It is in the read-aloud on purpose, so it cannot be missed: the same hands, the same fold and the same toy come back in [[b-comm-6|the last beat of THE COMMISSION]], where a five-year-old hands the party a bent one on a step. That payoff is worth more than anything else in this session and it costs nothing here — just let the kids have a paper bird each.\n\nAlso here and NOT to be pointed at: an old woman at the rope line with a ledger under her arm, writing, not smiling. That is [[npc-hettie|Hettie Sarn]]. And a woman working through the crowd looking at faces against a sheaf of little drawings — [[npc-wenna|Wenna Ash]], who will find them properly this evening.",
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
      "rev": 10,
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
      "body": "Play the quiet. The fight is over, the paper people are bowing to survivors and going back to writing down faces, and the hands on the broken clock are still moving in the road.\n\nTHE COUNT IS THE ONLY THING TO PLANT. Eleven is the number the ministry settles on. Everyone who was standing where the party was standing knows it was more. Say it once and let it sit.\n\nNobody recruits them today. [[npc-wenna|Wenna]] does not appear until [[b-comm-5|THE COMMISSION, beat 6]], where she is their contact between the awarding and going off with [[npc-tobin|Tobin]].\n\nTHE NAME GOES OUT BEFORE ANYBODY ASKS THE PARTY FOR ANYTHING, and that order matters. By the time [[b-comm-4|the Rector says it to their faces]] tomorrow they will have heard it from a crier, read it on a sheet at the Ossuary, and seen it on a warrant board on the walk up. An accusation the whole city is already repeating is much harder to doubt than one official saying it in a warm room.",
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
      "rev": 7,
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
        "order": "⚠ BEAT 1 WAS PLAYED AT THE END OF SESSION ONE. Session two opens at step 2.\n\n1. [[b-comm-1|In the dust — a Surveyor thanks them]] · the fairground, minutes after the fight\n2. [[b-comm-dusk|Toward dusk — three people find them]] · the same field, afternoon into evening\n3. [[b-comm-2|A night at the Ossuary]] · [[loc-ossuary|the hotel]], that night\n4. [[b-comm-3|The Set Square]] · the walk up through the government quarter, then badges, purse, and a fold each\n5. [[b-comm-4|The commission and the lie]] · the same room, minutes later — the task force, and who they are told did this\n6. [[b-comm-5|Wenna's office]] · across the courtyard — the one signature that opens a crease, and a clerk to carry the paper\n7. [[b-comm-6|The woman and the boy]] · the steps outside, on the way out\n\nSteps 4 and 5 are one conversation and should not be broken up. Everything else can breathe.\n\nSTEP 2 CAN END THE EVENING SOMEWHERE ELSE. If they take [[loc-ganny|Ganny Marle]] up on it, the night runs in her cellar instead of at the hotel, and that is a good place for it to go.",
        "before": "Have ready: the three things the Rector hands over (see [[b-comm-3|the awarding]]), and one folded paper bird made for real, which is given away in [[b-comm-6|the last beat]] and is the only prop that matters. Know that [[npc-tobin|Tobin Rell]] joins the party in step 6 and that he is already further gone than he looks. Know that nobody today says the name of the boy from the tower's foot until the last thirty seconds of the scene.",
        "truth": "The tear was not caused by anybody. It is the jam in the great fold, and it has been coming for a lifetime. The ministry names Red Flag because a public enemy with a human face keeps the grieving flowing into Green Fields, which the occupation owns, and away from the candle houses, which it does not. Every human in the scene believes what they are saying. The Rector knows better and is not lying either, in its own reckoning, because a useful account of a disaster is a kind of order and order is mercy.\n\nThe public campaign started before the dust settled — criers by dusk, printed sheets that night, warrants on the boards by morning — so the Rector in step 5 is confirming something the party has already been handed three times rather than breaking news to them. That is what makes it hard to argue with.",
        "after": "Employed, decorated, and pointed at the wrong crease. They leave with a badge that opens checkpoints, coin, a folded case each, a handler who disagrees with their orders, their names on a movement's roll, an assignment at the tower they watched break, and a paper bird from a five-year-old. The next session is [[f-wreck|THE WAY IN]]."
      },
      "body": "HOW TO RUN IT. This is a scene about being handled well, so play everyone in it as genuinely decent and let the wrongness sit underneath. Nobody sneers, nobody threatens, and the only person in the building who suspects anything is the junior clerk nobody introduces properly.\n\nThe children should come out of this feeling like heroes who were given medals, because that is what happens, and because the whole point of a leash is that it is offered as a gift. Do not tip it. The adults will notice that the party's names were known before they gave them, that the route was assigned rather than chosen, and that a boy died at the foot of a tower this morning and no official in a building full of officials has mentioned him.\n\nPACING. Two hours at a comfortable pace. If time is short, run 1, 4, 5 and 7, and give Wenna's assignment to the Rector's office instead — but do not cut step 7 under any circumstances, because it is the reason the rest of the scene hurts later. Step 2's two standing offers keep and can be delivered anywhere later; only Ganny's expires, because hers is tonight."
    },
    {
      "schema": 1,
      "id": "b-comm-1",
      "type": "beat",
      "title": "1 — In the dust: a Surveyor thanks them",
      "parent": "f-commission",
      "order": 20,
      "rev": 4,
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
        "outcome": "The party is invited, as a token of the ministry's gratitude, to be guests at [[loc-ossuary|the Ossuary]] — the finest house in the city — for as long as they care to stay. A runner will bring word in the morning. Then it bows, and goes back to writing down faces.\n\nIT DOES NOT END THE AFTERNOON. There are hours of daylight left and the party is now the most famous thing in Dunlath — go on to [[b-comm-dusk|beat 2]]."
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
      "title": "3 — A night at the Ossuary",
      "parent": "f-commission",
      "order": 30,
      "rev": 5,
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
      "title": "4 — The Set Square: the walk up, and the awarding",
      "parent": "f-commission",
      "order": 40,
      "rev": 12,
      "tags": [
        "act1",
        "session2",
        "reward"
      ],
      "leadsTo": [],
      "fields": {
        "hook": "The medal scene, played straight, in the most important room in the city. Forty chairs carried into an office that was never meant to hold them, and every person in them is there because these four went toward the monsters.",
        "read_aloud": "THE ESCORT. \"There is one of the paper people waiting at the bottom of the stairs, and it is not the tall ceremonial sort from the canyon rim. This one is plain — no fan, no crown, nothing pleated for show — and it is holding a tablet and a stylus the way a man holds a clipboard he has held for twenty years. You have seen this kind before, at the edge of the fairground, writing down faces.\n\n'Good morning,' it says. 'I am to walk you up. It is raining and I have been given an umbrella for you, which I do not think is large enough for four, and I have decided not to raise that.' It waits by the door, patient as furniture, and it will wait as long as they take.\"\n\nTHE WALK. \"The city on the way is wrong in a way that takes a minute to place, and then you have it: the festival is still up. Bunting across every street, garlands on every door, sodden now and dripping. [[loc-rationhall|The Emporium]] is packed to the pillars. And on three corners between here and there, somebody is standing in the rain showing a little drawing to strangers.\n\nAt every crossing a board has gone up overnight, and each one carries a warrant with three names on it that nobody in this city has ever heard, and BY ORDER, FOR THE BREAKING OF THE HEARTHSPIRE along the bottom. People are stopping to read them in the rain.\n\nAnd then, on the long blank wall where the processional way turns, in red paint about a foot high and running badly in the wet:\n\nTHE FOLDWRIGHT LIVES.\n\nA man in ministry grey is working at it with a brush and a bucket and getting nowhere — the rain is helping the paint more than it is helping him, and there is a pink wash spreading down the white stone under it. Clerks are going past on both sides of him without looking up. One woman touches the wall as she passes, the way you would touch a doorframe on the way out.\n\nThen the government quarter, and it is beautiful. White colonnades down both sides of a processional way, fountains running in the wet, plane trees in rows, courtyards opening off courtyards, clerks going between the buildings under oiled cloth.\n\nAnd the whole quarter looks like architecture and is not quite. The colonnades are right, the pediments are right, every corner is exactly a corner — and then you notice the CREASES. Long clean fold-lines running up the face of a building, mostly matched left to right the way a paper boat matches itself. A stair rail folded out of the same piece as the stair. A doorway whose whole surround is one continuous sheet with the wall, pleated into moulding. Nothing is stuck on. Nothing is jointed. Nothing was carried here.\n\nAnd here and there, one crease that does not match: a pilaster with a fold through it that runs off at a slight angle and never comes back.\"\n\nTHE WAY IN. \"The building is full of people and every one of them is human. Clerks come out of doorways to look at you. Somebody starts clapping in the corridor before you have even reached the stairs and you never do find out who, and it follows you all the way up — and there is a whole delegation waiting on the landing, officials in very good coats, two guild masters, somebody from the Lamp Office, all of them wanting to shake your hands and all of them slightly competitive about getting to you first. Not one of them was at the fairground yesterday. Every one of them is completely sincere.\"\n\nTHE OFFICE. \"Then they take you up to the top of the Set Square, and it is not a hall. It is an office — the highest office in Dunlath, and you can feel that in the doorway. Very large, near enough oval, with a great pale desk at the far end, rugs deep enough to lose a coin in, and tall windows down one whole side looking out over the quarter to the tower beyond it.\n\nForty chairs have been carried in for this, which is plainly not what the room is for, and they are full: the people you pulled out of the dust, and the families of the ones you did not. More are standing along the walls. Nobody claps when you come in. They stand up.\n\nThe Rector is waiting beside the desk, dressed differently today, pleated into a great fan of a collar that opens behind its head like a hand of cards. On the desk there are three things and a stack of plain paper.\"\n\nTHE FOLDING. \"It takes one blank sheet and it does not hurry. Its hands move for about eight seconds, and they never once go back to correct anything, and the room is completely silent while they do. What it holds out to you afterward has your name written inside the fold in a hand that never lifted, and edges like a knife, and it is warm.\"",
        "env": "• WEATHER — it rained in the night and has not stopped. The first bad weather in a fortnight, and the whole city is sodden.\n• THE FESTIVAL, STILL UP — bunting sagging and dripping across every street, garlands going brown on the doors, a carousel nobody has dismantled. Nobody has taken any of it down and nobody has said why not.\n• SOUNDS — rain on oiled cloth, and the fountains in the government quarter running anyway, in the wet, because nobody thought to turn them off.\n• SMELLS — wet stone, wet wool, and bunting starting to go sour.\n• THE QUARTER — white colonnades, plane trees in rows, courtyards opening off courtyards. Long clean fold-lines up every façade, matched left to right — and here and there one that does not match, running off at a slight angle and never coming back.\n• THE RECEPTION — humans everywhere, and it is a celebration. Applause starting in the corridor from somebody they never identify and following them up the stairs; clerks out of doorways; a delegation on the landing in very good coats, warm, sincere, and mildly competitive about who reaches them first. None of these people were at the fairground.\n• AND THEN THE ROOM, WHERE THE APPLAUSE STOPS AT THE DOOR — inside are the people they pulled out of the dust and the families of the ones they did not, and those people do not clap. They stand up. Play both receptions and do not comment on the difference.\n• THE OFFICE — deep rugs, warm underfoot, and no fire in it anywhere. Forty mismatched chairs carried in for this, and the sound of forty people getting to their feet at once.",
        "if_they": "…ASK THE ESCORT ABOUT THE WALL — and this is the beat, so give it room. It is not evasive, not uncomfortable, and not hiding anything. It simply has no procedure for the question, and what that sounds like is worse than a denial. Play it warm and unhurried throughout.\n\n  · \"What does it say?\" — it reads the words out, accurately, and then stops, because it has answered.\n  · \"Who is the Foldwright?\" — a pause a half-second too long, and then: 'I do not have that.' Not I don't know. The tone of a clerk who has checked a drawer.\n  · \"Was there a Foldwright?\" — 'I could not say.' It means this literally and it is not embarrassed.\n  · \"Then why is a man scrubbing it off?\" — 'Because it is on the wall.' Entirely true, entirely sufficient, and it moves on.\n  · Push harder and it becomes APOLOGETIC — genuinely sorry to be unhelpful — and offers to make a note of the question. IT THEN MAKES THE NOTE. Stylus, tablet, right there, while they watch. Do not comment on this and do not let anybody in the fiction comment on it.\n\n…ask it about anything else, it is chatty, precise, and good company. The weather, the quarter, how long it has held this post, whether it enjoys the work. Only the one subject produces the blank.\n\n…watch it as they pass the wall, it does not look at the graffiti. Not avoiding it — it simply does not route around it, does not hurry them past, and does not turn its head.\n\n…ask anybody what it means, get a different answer every time, and let every one of them be sincere. A clerk says it is kids. An old porter says it like it is obvious and does not elaborate. A woman says her mother used to say it when something went right. A Green Fields steward says carefully that it is not their slogan and that they would rather not be associated with it.\n\n…ask who the Foldwright is, nobody agrees and most are vague. A name out of a song. A title somebody used to hold. A bogeyman. A promise. Almost nobody connects it to the man in the story of how the world got folded, and anybody who does says it the way you repeat a rumor.\n\n…ask the man with the brush, he says he is not paid to know and that this is his fourth wall since dawn, which is the most informative thing anybody says about it all day.\n\n…try to follow the paint, there is a trail of drips going off around the corner and it stops at a gutter. It rained all night. There is nothing to find and they should be allowed to look.\n\n…refuse the honors, the Rector accepts this with real grace, sets their share aside, and says the offer does not expire. It genuinely does not. Nothing in this scene requires them to accept anything.\n\n…ask what the fold is made of, the Rector says: paper. It is telling the truth and the truth is not reassuring.\n\n…try to open a fold on a living thing, it will not close. It simply refuses, gently, the way a door refuses. The Rector, if present, says only that this was thought best.",
        "outcome": "Three gifts, given one hero at a time, by name, in front of the room.\n\nTHE BADGE. A Writ of Search, folded from one blank sheet in a single unbroken motion that takes about eight seconds and never doubles back. It carries their name inside the fold and it opens every checkpoint, gate, and rope line in the city. It is not magic. It is a leash, and it is the reason this act is called what it is called.\n\nTHE PURSE. A month's wages each, in coin, counted out loud. Concrete, unglamorous, and more money than two of them have ever held.\n\nTHE FOLD. One each: a stiff pale card the size of a hand, which opens along creases into a deep case that holds far more than the card could, and closes back to a card. It must be opened and closed by hand, and it will not close on anything living. Nobody explains why that rule was necessary."
      },
      "body": "This is the beat the children came for, so give it the full ceremony: names read out, the room standing, the Rector coming down off the platform to hand each thing over personally. Do not undercut it. The scene is only worth anything later if it is worth something now.\n\nThe folding itself is the spectacle, and it is worth slowing down for. A Rector at work is meant to be seen — that is the entire point of the ritual grade — so describe the hands and the eight seconds and the fact that it never goes back to correct anything, and let a player ask to watch closely. They can. It is happy to be watched.\n\nON THE FOLD AS AN ITEM. No dice attach to it. It is a pocket that holds a great deal, it is delightful, and it will quietly teach the table that this world folds space as a matter of course, which is the cosmology arriving as a toy rather than as a lecture.\n\nTHE THREE WORDS ON THE WALL are the party's first contact with the only thing the underground has instead of a plan, and they meet it on the way to being decorated by the government, which is the right order. Do not explain them. Do not let a single NPC give a straight answer. THE POINT IS THE CONTRADICTION — the name means a hero, a bogeyman, or nothing at all depending entirely on who is asked, and the ministry has not said one word about it in living memory.\n\nTHE RED IS DELIBERATE. Warrants in black on a board, a name in red on a wall, and one man with a bucket losing to the rain. If a player asks why red, nobody knows, and the honest answer is that Red Flag kept the war's banner when the movement furled it.\n\nPAIR IT WITH THE WARRANTS, which is why both are on this walk: one board names three people nobody has heard of, one wall names somebody everybody has heard of and nobody can define, and the party has no way to weigh either.\n\nWHO COLLECTS THEM, AND WHY IT IS NOT THE RECTOR. The escort is a plain, low-grade Surveyor with a tablet — the same sort the party watched writing down faces at the edge of the fairground. [[npc-rector|The Rector]] is an extremely senior official and does not fetch people from hotels, however well the city thinks of them; it meets them at the top of the building, where it already is.\n\nTHE ESCORT IS THE POINT OF THIS WALK. It exists so the party has something to interrogate about the wall, and so that what they get back is an institution with no answer rather than an institution with a lie. Three generations of official silence, delivered in fifteen seconds by something being perfectly polite.\n\nAND IT WRITES THE QUESTION DOWN. That is the only consequence in the scene and it should pass without remark. The party asked about the Foldwright, and now that is on a page somewhere. Let them work out what that means on their own time, or never.",
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
      "title": "5 — The commission and the lie",
      "parent": "f-commission",
      "order": 50,
      "rev": 10,
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
        "outcome": "THE LIE IS NOW ON THE RECORD, said out loud by the highest official in the city: Red Flag broke the tower, and the party is asked to bring back anything showing a human hand in it. This is the fourth time in under a day they have been given the name — the crier in the dust, the sheet at the Ossuary, the warrants on the walk up — and it is the one that carries a signature.\n\nTHE DIRECTIVE, and it should be as plain as this: 'Eleven people are on the other side of that seam. Go in, and bring back who you can. My order will open the way for you and hold it while you are inside, and that is the whole of what we are able to do.'\n\nTHEN IT WALKS THEM DOWNSTAIRS ITSELF. The searching belongs to the movement — it says so in one line and does not explain the history — so the highest official in the city takes four strangers down a flight to a junior clerk in the smallest office on the corridor, and is perfectly cheerful about it. That walk states the whole relationship and nobody has to describe it. See [[b-comm-5|beat 6]]."
      },
      "body": "KEEP THE DIRECTIVE SIMPLE. Go in, bring back who you can, we will open it and hold it. That is the entire brief and it should take fifteen seconds. Everything about who is allowed to do what stays in the walk downstairs, where it is shown rather than said.\n\nWHY THE LIE IS THE RIGHT ONE. The criers give the disaster to the fold itself first — an old wound, an unquiet crease, nobody's fault — which is where the world's cosmic anger has always been sent and which explains nothing while sounding like it does. This is the operational version, issued to people who are actually being sent somewhere, and it does a job a nameless crease cannot: it makes the candle houses radioactive, so that every grieving person in the city walks toward Green Fields — which the occupation owns — instead of toward Red Flag, which it does not. It is recorded in CAMPAIGN.md §3 as standing practice.\n\nWHAT THE PARTY NOW BELIEVES. That there are terrorists, that the terrorists made the hole, and that they have been hired to help clean up after them. They will carry that for several sessions, and they will carry it while traveling with a man who has been reading a dead friend's field book and can no longer make the numbers work.\n\nDO NOT WINK. The Rector is not smirking, and it is not lying in the sense it would recognize. It has been given an account of the disaster by its own leadership and it is passing that account on. Everything else in the room is true: the eleven, the offer, the pay, and the fact that its order cannot spare a single one of itself to go in.",
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
      "title": "6 — Wenna's office, and a clerk",
      "parent": "f-commission",
      "order": 60,
      "rev": 7,
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
      "title": "7 — The woman and the boy",
      "parent": "f-commission",
      "order": 70,
      "rev": 3,
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
      "rev": 3,
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
      "body": "The party's first named Surveyor, and their handler at the top of the ladder for the whole of Act One. It should be warm, personally attentive, and impossible to dislike, because a table that likes it will be genuinely disturbed the first time it folds a street shut with people on it — which is scheduled for Act Two.\n\nRun it in both appearances of [[f-commission|THE COMMISSION]]: it is the Surveyor who congratulates them in the dust in [[b-comm-1|beat 1]], out of ceremonial dress, and the officiant who folds their badges in [[b-comm-3|beat 4]]. Let a player notice it is the same one. A world where one official takes a personal interest in you from the first minute is smaller and more watched than a world with a cast of thousands, and the children will feel that without being told.\n\nIts own name for itself is a fold rather than a sound — a precise gesture of the hands — and it will teach a hero to make it, badly, if asked. It is enormously pleased to be asked.\n\nWHAT IT DOES NOT DO (settled 2026-08-27). It does not run its own errands. It does not fetch people, deliver messages, or leave its own building for anybody's convenience, and public esteem does not change that — four decorated strangers are still four strangers. A plain tablet-carrying Surveyor walks the party up in [[b-comm-3|beat 4]]; the Rector is waiting at the top, where it already was.\n\n⚠ WORTH A RULING: it does appear personally in the dust at the fairground in [[b-comm-1|beat 1]], which is either the exception that proves it — a catastrophe at its own ceremony is where a senior official turns up — or a contradiction to fix. Joby's call."
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
      "rev": 8,
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
        "places": "[[loc-clockface|The Clock Face]] — meet people, leave word, hire a runner. The city's meeting place, by accident.\n[[loc-petition|The Petition Rail]] — formally demand anything at all, including a name added to the count. Every word is filed.\n[[loc-lampoffice|The Lamp Office]] — buy light. The register on the wall does not add up, and nobody has ever added it.\n[[loc-sixtyone|Sixty-One Pairs]] — rummage, one roll each. The first buyer for anything brought back out of a crease.\n[[loc-longtable|The Long Table]] — half the room is dressed as clowns, half as bakers, and they are fighting about it. Food, rooms, every rumor in the city, and a guard company for hire.\n[[loc-wintergarden|The Glasshouse]] — a garden under a glass roof, kept warm by no fire at all. Food, drink, players, a games yard, and dice behind a curtain. Where the party has a good night.\n[[loc-rationhall|The Emporium]] — a covered market the size of a cathedral. Take what your household needs; a clerk marks it on the roll. The porters will not let you carry anything.\n[[loc-bottles|Nine Hundred Bottles]] — potions and remedies. Describe the complaint and a boy goes up a ladder and brings back one specific bottle.\n[[loc-proving|The Proving Floor]] — arms and armor, showroom-style, with a sixty-yard range out the back where they can try anything before buying.\n[[loc-sugar|The Sugar Vault]] — a sweet shop run like a bank. Four hundred numbered drawers and no descriptions.\n[[loc-foldingshop|The Folding Shop]] — commission a toy of anything. It gets the parts you did not say. The paper animals have got out.\n[[loc-ganny|Ganny Marle's Cellar]] — a painted sideshow banner and a coin to see THE IMPOSSIBLE CORNER. Something is coming through it.\n[[loc-scarline|The Scar-Line]] — walk where the canyon was. Their assignment, and the thinnest place in the city.\n[[loc-hearthspire|The Hearthspire]] — the tower, and the wound they watched open. A ring of Rectors has been standing on the ground at its foot for eleven days.\n[[loc-olddraws|The Old Draws]] — stand at the rim of a dead one and look down. Hundreds of feet, and you cannot see the floor.\n[[loc-darkwindow|The Dark Window]] — the one unlit window on any street after dark. Knock and be lied to politely.\n\nAlso here, used by [[f-commission|THE COMMISSION]]: [[loc-ossuary|the Ossuary]] and [[loc-setsquare|the Set Square]].",
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
      "rev": 4,
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
      "body": "WHAT THEY DO HERE. Meet people. Leave word. Hire a runner for a coin. Read the notices, which are mostly people looking for people. If the party needs to be found by an NPC — and over a long campaign they will, often — this is where it happens, and using one place for it every time makes the city feel like a place rather than a set of rooms.\n\nIt is also simply a good place to have a conversation, which a table with children in it needs more of than it needs another room with a door.\n\nRUNNERS, AND THIS IS THE USEFUL PART. A penny hires a boy who will find anybody in Dunlath inside the hour and is weirdly good at it. The party will use this to send messages — and it also runs the other way, which is how a folded slip from [[f-unanswered|THE UNANSWERED]] reaches them wherever they happen to be standing, with no scene needed to deliver it."
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
      "rev": 5,
      "tags": [
        "city",
        "sunsalt",
        "clue"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "The lampwrights' hall: a stone room off the market with a long counter, and lamps hung in rows on chains from the beams — plain tin ones for a kitchen, and beside them, lit, the ones with shades of colored glass that cost four times as much and that half the street has bought because a neighbor bought one. Spare glass, wicks, grain-lanterns, and the sunsalt itself kept in a locked chest behind the counter and measured out with a spoon.\n\nOn the wall, a slate painted in two columns and chalked up fresh every week.\n\nSince the Draw closed, the price has doubled and there is a limit of one lamp to a household, written on the door in a hand that was angry when it wrote it. It is the first limit anyone in Dunlath has met in living memory and the street is taking it extremely badly.",
        "who_is_here": "A queue that has become a small civilization, because these people have never queued for anything and have decided to do it properly. A man near the front has brought a folding table, a cloth, and lunch. Two women have hired boys to hold their places and the boys have unionized and are now charging double. Somebody is auctioning his position out loud and is up to nine coins. A clerk is doing his best.",
        "stock": "PRICES DOUBLED THIS WEEK and everybody is talking about it. Both numbers are given because the old one is what people quote at you in outrage.\n\nHousehold cell, one month of light · was 2 sp · NOW 4 sp\nPocket cell, about eight hours · was 5 cp · NOW 1 sp\nLantern, the fitting itself · 5 sp · one-off, they last for years\nGrain-lantern, paper, one grain, children's · 1 cp · these are the fairground ones\nStanding stone, warms a room, one year · 4 gp · what a well-off house has under the floor\nLamplighter's pole cell · not for sale at any price · issued to the trade only",
        "game": "THE REGISTER IS PUBLIC AND ANYBODY MAY ASK. That is the toy, and it is free.\n\nTHE RULE: name a household or an address at the counter and the clerk reads out what it has drawn, out loud, from the register. No roll, no fee, no permission. It has always worked this way and nobody has ever thought it strange.\n\nWHAT THEY GET: anybody's consumption, going back years. Who is burning far more than a house that size should. Who stopped drawing anything at all on a particular date. Who has never drawn a single cell — which is what an Unlit house looks like on paper, and which nobody in this office has ever noticed.\n\nDO NOT POINT AT ANY OF THAT. Answer exactly what they ask and let them work out what to ask.",
        "hidden": "THE COLUMNS DO NOT MATCH. The left column is what came down from the Hearthspire this week. The right is what was issued to households. The right is smaller, and not by a little, and the gap has been there every week the board has been kept. The clerk has never added them, because the two columns are two different jobs and nobody has ever asked him to compare them."
      },
      "body": "WHAT THEY DO HERE. Buy light, fuel and spare glass — genuinely useful, and this is also where the Compass Spirit will eat later, so the party will come back.\n\nTHE CLUE, AND HOW TO PLAY IT. The slate is on the wall in plain sight. A player who reads it and does the arithmetic finds a shortfall the clerk cannot explain and is not hiding. Do not push it, do not have anyone react, and do not let the clerk turn out to be in on anything — he is not. If nobody looks at the board, nothing is lost.\n\nWhat it is worth later: this is [[npc-hettie|Hettie Sarn]]'s entire case, sitting on a wall for free. What the Reactors take in has never matched what comes out refined. When she finally opens her ledger and turns it around, a party that read this board already knows she is right, and the scene becomes a confirmation instead of a lecture.",
      "fieldDefs": [
        [
          "looks",
          "Looks like"
        ],
        [
          "who_is_here",
          "Who is here"
        ],
        [
          "stock",
          "What they sell"
        ],
        [
          "game",
          "The game, and what you win"
        ],
        [
          "hidden",
          "Hidden here"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "loc-sixtyone",
      "type": "location",
      "title": "Sixty-One Pairs — the crease-salvage shop",
      "parent": "f-locations",
      "order": 50,
      "rev": 3,
      "tags": [
        "city",
        "shop"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "A deep narrow shop with sixty-one unmatched boots hanging from the ceiling on strings, each waiting on a partner that has not turned up. Everything on the shelves came out of a crease at some point: objects that arrived folded and did not entirely open again, half a chair, a kettle that is also a little bit of a different kettle, a pair of spectacles with one lens that shows the room slightly earlier.",
        "who_is_here": "The owner, who buys by weight and sells by the story, and who has never once been through a crease herself and is not curious about doing so.",
        "stock": "NOTHING IS PRICED AND EVERYTHING IS NEGOTIABLE. Whatever the pile gives up, he names a price of a few coppers to a few silver, and a hero who haggles gets it for half. He enjoys being haggled with and thinks less of anybody who does not.",
        "game": "THE RULE: ONE ROLL EACH per visit. Roll a d10 and that is what the pile gives up today.\n\n1 · A boot. Just the one. It is a very good boot. · 2 cp\n2 · Forty feet of sound rope with somebody else's knot in the middle · 5 sp\n3 · A lamp-cell with about an hour left in it · 5 sp\n4 · A key with no lock. He has a whole box and will let them dig. · 1 cp\n5 · A Draw crew's tool nobody can identify. An old Draw hand would know it instantly. · 2 sp\n6 · Spectacles that are somehow right for whoever picked them up · 1 sp\n7 · A water-damaged ledger from an office nobody has heard of. Three pages legible. · 3 cp\n8 · A genuinely good knife, and he knows what he has · 3 gp\n9 · A coat that fits nobody and is warmer than it should be · 8 sp\n10 · Something that came out of a crease and he does not know it. Roll again — it is that, except subtly wrong, and it is the best thing in the shop. · he charges the normal price",
        "hidden": "She pays cash for anything brought back out of a crease, no questions, better than anyone else in the city. She is not an agent of anybody. She simply has the only market for it, because everyone else is frightened of the stuff."
      },
      "body": "WHAT THEY DO HERE. Rummage — give each hero one roll and let them turn up something strange; the stock is a licence to hand out oddities without them being magic items. Buy cheap gear. And, once they start going into creases, SELL, which makes this the party's first reliable buyer and gives crease-diving an economy.\n\nThe boots are the point of the shop and worth describing every visit. Sixty-one things that arrived without their other half is the Folding stated as a joke, and a table full of children will start looking for matches.",
      "fieldDefs": [
        [
          "looks",
          "Looks like"
        ],
        [
          "who_is_here",
          "Who is here"
        ],
        [
          "stock",
          "What they sell"
        ],
        [
          "game",
          "The game, and what you win"
        ],
        [
          "hidden",
          "Hidden here"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "loc-longtable",
      "type": "location",
      "title": "The Long Table — the Draw crews' eating house",
      "parent": "f-locations",
      "order": 60,
      "rev": 4,
      "tags": [
        "city",
        "hub",
        "comedy"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "A handsome, prosperous eating hall — good dark timber, a great hearth, hanging lamps, and one enormous table running the whole length of the room, laid for sixty with proper plates. These were the best-paid workers in the world and they ate like it. Rooms upstairs, good ones. By the door, on a hook, a garland from the closing ceremony that nobody has taken down and nobody will touch.\n\nAND THEN: roughly half the room is dressed as clowns. Full white greasepaint, red noses, the whole business, and several of them are carrying horns and a drum they cannot play. The other half are dressed as bakers — tall white hats, aprons, flour on everything. Along one wall stands a knot of men in mismatched salvaged armor, and one of them is wearing a saucepan on his head, and he is arguing with a baker.\n\nEvery one of them is enormous and still has coal dust in the creases of his hands.",
        "who_is_here": "The Cinder Draw's crews, four days unemployed and retraining at speed, in two factions and a splinter group. THE CLOWNS want to start a circus. THE BAKERS want to start a bakery. Both have already spent money on the outfits, which is precisely why neither can back down. The argument is conducted at full volume across the length of the table and has been running since Thursday.\n\nThe cook has fed all of them since they were apprentices and is the closest thing the room has to a mayor.",
        "stock": "FOOD AND BEDS · price\nA bowl and bread · 3 cp\nThe proper dinner, three courses, enormous · 8 cp\nAle · 1 cp · Good wine, by the jug · 4 cp\nA bed in the long room, twenty snoring strangers · 2 cp\nA real room with a door · 5 sp a night\nTravel rations bought outright, 10 days · 5 gp · no roll, no clerk, no limit — this is where the party solves the Emporium\n\nHIRE, and they are used to being asked\nA guide who knows the old workings · 1 gp a day\nTwo porters and a handcart · 5 sp a day\nA guard company, six men, out-of-work Draw crew · 3 gp a day · they are brave, sober, unemployed since Tuesday, and they will not go into a crease for any money",
        "game": "THE WAGER BOARD. A slate by the door where anybody may post a bet and anybody may take it. The house holds the money and takes a tenth. It pays out the same day, every time, which is why the room trusts it.\n\nTHE RULE: take a wager, roll a d20 against the number on the slate, and the room watches. Win and you take the stake. Lose and it goes on the slate as a new bet against you, which is how feuds start in here.\n\nPOSTED THIS WEEK (roll a d6 or pick):\n1 · Eat the whole dinner in the time it takes the kitchen to cook another · beat 15 · stake 2 sp\n2 · Carry both porters across the room at once · beat 16 · stake 5 sp\n3 · Name every crew that worked the Cinder Draw, in order · beat 18 · stake 1 gp · nobody has done it\n4 · Get the clowns and the bakers to sit at one table · beat 17 · stake 3 sp · and the whole room will help or hinder\n5 · Hold a full jug at arm's length while the room counts to fifty · beat 14 · stake 2 sp\n6 · Out-sing the woman by the fire · beat 16 · stake 4 sp · she is very good and she is extremely gracious about losing\n\nTHE COSTUME WAR runs under all of it and never resolves. Half the room is dressed as clowns and half as bakers, both are adamant they were here first, and any hero who takes a side is immediately and permanently a hero to one half of the room.",
        "hidden": "The hiring board by the kitchen door, which for a lifetime was the busiest board in the city, is empty. Everyone in the room can see it from where they are sitting, and nobody is looking at it."
      },
      "body": "WHAT THEY DO HERE. Eat extremely well, sleep upstairs, and hear absolutely everything — this is the rumor hub, and any news the party needs can arrive at this table without contrivance.\n\nHOW TO PLAY THE ROOM. The argument stops dead when strangers walk in. Then both factions immediately try to recruit the strangers, at once, over each other. A party that takes a side will be hugged. A party that refuses to take a side will be pursued to the door. Do not explain the joke — it is a room full of enormous filthy men in clown makeup shouting about pastry, and it explains itself from the doorway.\n\nTHE MEN IN ARMOR. A dozen or so, in breastplates cut from ore-cart panels and helmets with the lamp brackets still bolted on, and one saucepan. They think both factions are being ridiculous and want to form a guard company. Unlike the other two, they can actually do the job: these are people who spent thirty years inside the exact canyon the party has been sent to walk the rim of, and they know it better than any map exists for. THEY ARE HIREABLE, cheaply, and they will take it desperately seriously. Four more names the party becomes responsible for.\n\nTHE FAST FAVOR. The cook's brother is at [[loc-petition|the petition rail]] again, several drinks in, working up to saying the thing that gets a man written down, and she would like somebody to walk him home. Five minutes, no dice unless the party wants them.\n\nWHAT IS UNDERNEATH. Nobody in this room has any idea what to do and all of them are doing something. The garland is still on the hook. Play the comedy completely straight and do not undercut it with a sad beat; the sadness is already in the costumes.",
      "fieldDefs": [
        [
          "looks",
          "Looks like"
        ],
        [
          "who_is_here",
          "Who is here"
        ],
        [
          "stock",
          "What they sell"
        ],
        [
          "game",
          "The game, and what you win"
        ],
        [
          "hidden",
          "Hidden here"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "loc-rationhall",
      "type": "location",
      "title": "The Emporium — everything, under one roof",
      "parent": "f-locations",
      "order": 70,
      "rev": 5,
      "tags": [
        "city",
        "registry",
        "affluence"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "A covered market the size of a cathedral, and the proudest building in Dunlath. A vaulted stone roof on two ranks of pillars, a fountain at the crossing, and light coming down from high windows onto more goods than a person can take in at one look: cloth, boots, salt, oil, timber, rope, knives, cook-pots, saddlery, hides, honey, apples in barrels, lamps, and a whole aisle of nothing but bells.\n\nGarlands from the festival are still wound round every pillar. The floor is warm underfoot. There is no fire anywhere in the building and nobody remarks on it.",
        "who_is_here": "Half the city, in good cloth, because the Emporium is somewhere to be seen as much as somewhere to go. Stallholders and their apprentices shouting across the aisles. A physician's stall near the fountain with a real surgeon at it and no queue. And porters — dozens of them, in green, with handcarts — who are the most determined people in Dunlath.\n\nAt the door sits a clerk with the roll, who marks down what each household takes.",
        "stock": "NOTHING HERE IS BOUGHT. Everything on the roll is free, and a clerk marks what you take against your household. That is the whole system and it works, which is the point of it.\n\nON THE ROLL · per household · per month\nBread and meal · as much as you can eat · nobody has ever been refused\nSalt, oil, dried fish, apples, root vegetables · unlimited\nPreserved rations, travel · 10 days per person · THIS is the one with a limit\nCloth · one bolt · plain colors free, dyed costs money\nBlankets, pots, brooms, crockery · one of each, replaced when broken\nSoap, candles for a shrine, needles and thread · unlimited\n\nNOT ON THE ROLL, and this is what sends the party elsewhere:\nRope, tools, lamp-cells, weapons, armor, anything in quantity, anything dyed, anything anybody would call nice. The roll feeds a household. It does not equip an expedition.\n\nTHE FRICTION, and use it: four heroes drawing ten days' rations each is FORTY DAYS and that is four households' worth. The clerk is apologetic, immovable, and will suggest they come back next month. A writ does not help. Buying it outright at the Long Table does.",
        "hidden": "The roll is a census. Every portion drawn, every yard of cloth, every visit to the physician goes down under a name with a date, in the open, in front of the person concerned, because the record is exactly what makes the fairness real and auditable. It is the most honest institution in the city and it holds a complete history of everyone in it."
      },
      "body": "WHAT THEY DO HERE. Get anything they need, in comfort, for nothing — a citizen's portion is a right rather than a favor, and taking it is the ordinary business of a Tuesday. The party equips here. The surgeon by the fountain is excellent and free, which is where a hurt party goes.\n\nTHE JOKE, visible from the door: THE PORTERS WILL NOT LET THEM CARRY ANYTHING. A porter takes a sack out of a hero's hands mid-sentence and puts it on his cart. Refuse, and a second porter is fetched to assist with the difficulty. Leave, and three of them follow the party through the streets with their shopping, at a respectful distance, and are still behind them an hour later. They will carry a drawn sword. They will carry the party's lunch. Losing them is a real problem the players have to solve, and rudeness does not work on them even slightly.\n\nWHAT IT COSTS. Their injuries are on the roll with dates, and so is everything they took and where it went. Nothing comes of this in Act One. It comes up in Act Two, when somebody produces the dates and asks where they were.\n\nWHY IT MATTERS NOW. This is why [[npc-tobin|Tobin]]'s hands are worth more than they look. A party that decides on its own that it would rather not be written down has understood the occupation better than a speech could teach them, and they will have decided it inside a beautiful building that was nothing but generous to them.\n\n⚠ OPEN QUESTION FOR JOBY. Whether this is plenty administered as a right of citizenship or a rich market with its supports dressed as service is undecided. The Emporium reads as either and nobody in Dunlath could tell you which.",
      "fieldDefs": [
        [
          "looks",
          "Looks like"
        ],
        [
          "who_is_here",
          "Who is here"
        ],
        [
          "stock",
          "What they sell"
        ],
        [
          "hidden",
          "Hidden here"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "loc-wintergarden",
      "type": "location",
      "title": "The Glasshouse — the great hall of pleasures",
      "parent": "f-locations",
      "order": 75,
      "rev": 3,
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
        "stock": "FOOD, DRINK AND A BED · price\nSupper, and it is very good · 1 sp\nA jug of anything · 3 cp\nA room upstairs · 8 sp a night · the best beds in Dunlath and they know it\nThe bath house, an afternoon · 2 sp · the water is hot and no fire heats it\nA place in the garden for the day, with a chair · free · this is why the city loves it",
        "game": "EVERYTHING IS ONE d20 AGAINST A NUMBER. A copper to enter unless said otherwise.\n\nSKITTLES, down the long alley · beat 12 · 1 cp to play\nWIN: three coppers. Beat the house champion — an eleven-year-old girl who will take anybody on — and it is 1 sp and the room applauds. She wins on a 14 or better.\n\nRING TOSS over the horns of a very patient goat · beat 15 · 1 cp\nWIN: a paper flower, and the goat is yours for the evening. People take the goat seriously. The goat does not.\n\nARM-WRESTLING THE DOORKEEPER · beat 17 · free\nWIN: your drinks are free all night and he tells everyone. He goes easy on children and loses to them theatrically, which they should be allowed to enjoy.\n\nTHE LONG SLIDE, the glasshouse's polished floor with a run-up · beat 10 · free\nWIN: nothing at all, and every child in the building joins in within two minutes. Fail and you go into a tub of fruit trees.\n\nDICE BEHIND THE CURTAIN · adults only, and the doorkeeper means it · stake what you like\nWIN: double. Beat 13 to win a round, and let them play as many rounds as they like.\nTHE HOUSE STILL WINS OVER A NIGHT and the dice are honest. A hero who works out why has learned something true about the whole world.",
        "hidden": "Nothing sinister, which in this campaign is restful. Two things are worth knowing. The floor is warm because there is a sunsalt stone in the undercroft the size of a loaf, and it cost more than the glass did. And the dice behind the curtain are honest and the house still wins, and a hero who works out why has learned something true about the whole world."
      },
      "body": "WHAT THEY DO HERE. Eat, drink, sleep upstairs, and — mainly — PLAY. This is the room where the boys act instead of listen, so stock it with more than they can get through in a night. Everything is one d20 against a number and nothing needs a new rule:\n\n• Skittles down the long alley — beat 12. The house champion is an eleven-year-old girl and she will take anybody on, for money.\n• The ring toss over the horns of a very patient goat — beat 15.\n• Arm-wrestling the doorkeeper — beat 17, and he goes easy on children in a way he thinks is subtle.\n• Climbing the greased pole for the ham at the top — beat 14, and everybody in the hall stops to watch.\n• Guessing which of three cups, run by a man who is cheating — beat 20, because he is cheating.\n\nBEHIND THE CURTAIN. Dice, and the party is grown and rich enough to be let through. One roll, win or lose, no systems — the point is the room, not an economy.\n\nWHY IT EXISTS. Dunlath had no tavern and the campaign had gone entirely somber. This is the room that proves the world is worth saving. Give the party a good night here EARLY, so everything that happens afterward has something to be measured against.\n\nTHE UNDERTOW, played light. There is one table in the corner where two Surveyors sit among the noise, quite still, not eating or drinking anything, watching the room with evident pleasure. Nobody minds them. They come most nights. Mention them once, do not explain them, and go back to the clowns.",
      "fieldDefs": [
        [
          "looks",
          "Looks like"
        ],
        [
          "who_is_here",
          "Who is here"
        ],
        [
          "stock",
          "What they sell"
        ],
        [
          "game",
          "The game, and what you win"
        ],
        [
          "hidden",
          "Hidden here"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "loc-foldingshop",
      "type": "location",
      "title": "The Folding Shop — a Surveyor that makes toys",
      "parent": "f-locations",
      "order": 80,
      "rev": 3,
      "tags": [
        "city",
        "surveyors",
        "comedy"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "A single small room off a side street with a workbench and stacks of plain paper, and it is no longer tidy, because the animals got out. There are paper birds on every rafter, dozens of them, shuffling and resettling. A paper horse has been walking into the same wall for a week. A paper dog follows every customer to the door and stops dead at the threshold, every time, and looks up. A fish is doing lengths of the room near the ceiling. Everything for sale costs one coin.",
        "who_is_here": "A Surveyor, which is not on ministry business and is not stationed here. It keeps the shop because it likes to. It is delighted to be visited and is very good with children, allowing for the half-second delay on every expression.",
        "stock": "COMMISSIONS · price · ready when\nPalm-sized, still — a bird, a mouse, a flower · 2 sp · while you wait\nPalm-sized, moving — it flaps, it hops, it opens · 5 sp · while you wait\nCat-sized, moving · 1 gp · next day\nDog-sized, moving · 5 gp · three days\nChild-sized · 20 gp · a week, and he will want to talk about it at length\nA portrait of somebody, folded · 3 gp · two days, and it is uncanny\n\nTHEY LAST until somebody unfolds them, which is difficult on purpose and which a paper animal will resist. They are not magic and they take no damage rolls. They are toys, and they are wonderful, and the party will get more out of them than out of most magic items.",
        "game": "THE RULE: describe what you want in ONE SENTENCE. He builds exactly that — and adds one thing you did not ask for, every single time, and he does not think of this as a flaw.\n\nWHAT IT ADDED (roll a d6, or pick):\n1 · It has your face. Slightly. Enough that other people notice before you do.\n2 · It has an extra pair of legs, and they work, and it is much faster than it should be.\n3 · It is hollow, and something rattles inside it, and he will not say what.\n4 · It is wearing something — a tiny hat, a collar, a coat — that nobody mentioned.\n5 · It is a matched pair. You asked for one. There are two, and they stay together.\n6 · It does one thing on its own, once a day, at the same time each day. Decide what at the table and never explain it.\n\nHE IS A SURVEYOR and he is the same hands that fold the writs and the birds at the fairground. He is delighted by children and works cheaply for them.",
        "hidden": "It keeps the coins in a jar and has no use for them whatsoever. It does not know what it is saving them for and finds the question interesting when asked. Ask it what it does when the shop is shut and it says, truthfully, that it folds. It has stopped trying to catch the birds and is not troubled by any of it."
      },
      "body": "WHAT THEY DO HERE. Commission a toy. Describe anything at all and it will fold it while they wait, in one unbroken motion, for one coin — and it will get the parts right that they did not describe, because it was listening to how they said it rather than what they said. A hero who asks for \"a dog\" gets their own dog, the one from when they were small, and will not be able to explain how.\n\nThis is where the bird in [[b-comm-6|Rab's hands]] was made, at the fair, the day before.\n\nHOW TO PLAY IT. Warm, generous, and slightly too accurate. The horror in the Surveyors is never cruelty; it is that they are better at knowing you than you are comfortable with, and they use it to be kind. A table that loves this shop is a table that will feel Act Two properly.",
      "fieldDefs": [
        [
          "looks",
          "Looks like"
        ],
        [
          "who_is_here",
          "Who is here"
        ],
        [
          "stock",
          "What they sell"
        ],
        [
          "game",
          "The game, and what you win"
        ],
        [
          "hidden",
          "Hidden here"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "loc-ganny",
      "type": "location",
      "title": "Ganny Marle's Cellar — THE IMPOSSIBLE CORNER, one coin",
      "parent": "f-locations",
      "order": 90,
      "rev": 6,
      "tags": [
        "city",
        "wrinkle",
        "clue",
        "comedy"
      ],
      "leadsTo": [],
      "fields": {
        "looks": "A sideshow run out of a house. A painted banner nailed across the whole front of the building — THE IMPOSSIBLE CORNER, in four colors, with an artist's impression that is wildly inaccurate — a lamp over the door, and a boy on a box outside doing the patter.\n\nOne penny gets you six steps down into the cellar and a look through a hand-sized hole in a partition. Behind it the corner does not meet itself: the far wall sits about two feet further off than it has any business being, and there is a draught coming out of it that smells of somewhere else. It is a good trick and it is only a trick.\n\nThe rest of the cellar is preserves. Shelves of them, floor to ceiling, a lifetime of them. And at the back, behind the shelves, low down, a hole in the brickwork the size of a hand, with cold air coming out of it that does not smell of Dunlath.",
        "who_is_here": "Ganny Marle, eighty, in a good hat, apparently uninterested in what the wrinkle is and extremely interested in the coin — which is a performance she has been giving for a very long time. The boy outside is her grandson, he is on commission, and he knows nothing at all.\n\nDIRECTLY ACROSS THE STREET: her neighbor has painted a bigger banner — A BETTER HOLE, HALF PRICE — and he does not have a hole. He has never had a hole. The banners have been escalating for a month and both of them are running out of wall.",
        "game": "THE LOOK · 1 cp · six steps down and a look through the partition. No roll. Everybody pays, including the party, and she will not waive it for badges.\n\nSPOTTING THE TRICK · no roll either. Any hero who says they want a proper look at it gets to work it out — the mirror, the paint, the pipe. Do not hide it and do not make them roll for it; it is far better as a thing the party catches her at.\nWHAT SHE DOES WHEN CAUGHT: she is delighted. She has been running it for years, the ministry has been down those steps and written NOVELTY on a form, and she will tell them so with some pride.\n\nTHE REAL BUSINESS is at the back of the cellar and it is not a game. It runs as [[enc-ganny|the thing in Ganny's preserves]], and it happens at night.\n\nTHE BANNER WAR, across the street, free, and it never resolves. He does not have a hole. He is now advertising two. Any hero who gets involved on either side has made a friend and an enemy for the rest of the campaign.",
        "hidden": "GANNY MARLE IS RED FLAG, and she is infrastructure rather than a believer. She is a node: the hole at the back of her cellar comes out in a handful of other cellars across Dunlath, and for years the underground has used those holes to move paper and small parcels — never people, because nothing bigger than a cat has ever fitted through one. She receives, and she passes on, and she makes arguments to nobody. That is deliberate. It keeps her likeable, and it leaves [[npc-hettie|Hettie Sarn]] as the one who actually puts the case.\n\nWHAT SHE HAS NOT TOLD ANYBODY, HER OWN PEOPLE INCLUDED. The hole does not only go across the city. Something has been coming through from somewhere else, at night, and it is not arriving from a cellar three streets away.\n\nWHY SHE HAS NOT ASKED RED FLAG FOR HELP — the question the party will ask, and three answers that are all true at once.\n· THERE IS NOBODY TO SEND. Red Flag is bookkeepers, couriers and candle houses. It has an eighty-year-old with a ledger and a clerk who will not draw the mace on his own belt. It does not have fighters, and a party that later joins it ought to already know that.\n· ASKING IS THE ONE THING SHE CANNOT DO. No node knows the others, and that is the whole of the network's safety. To report a problem is to report that her node is compromised, and a compromised node gets closed. Close her hole and she is an old woman with a fake one, useful to nobody.\n· AND NOT TONIGHT OF ALL NIGHTS. The name went out with the criers this evening and there will be warrants by morning. Every person she might have called is going to ground on the one night she needs somebody.\n\nSO SHE ASKS THE PARTY, AND SHE IS NOT SETTLING. Four armed strangers who fought monsters in public this morning can walk into any street in this city tonight and nobody will ask them a single question. They are better than anything Red Flag could have sent her.\n\n⚠ HOW MUCH OF THIS SHE EVER SAYS OUT LOUD IS OPEN. None of it has to surface in Act One. What the party should leave the cellar with is the knowledge that the hole goes somewhere it should not, and the clear sense that she knew more than she said.\n\n⚠ UNRULED: whether the hole is still growing. It was a finger's width when her husband found it and it is a hand's width now. Kept here as a plain fact with no props attached — cut the line if it is not wanted."
      },
      "body": "WHAT THIS PLACE ACTUALLY IS, and the party learns it in this order.\n\nFIRST, THE ATTRACTION IS A SWINDLE. THE IMPOSSIBLE CORNER is a mirror, a forced-perspective paint job and a draught off a length of pipe, and it has been for years. One penny, thank you very much. Any hero who asks for a proper look works it out, and Ganny is not remotely embarrassed to be caught — she has been caught before, by the ministry, which came down, looked, wrote NOVELTY on a form, and never came back.\n\nSECOND, THERE IS A REAL ONE. At the back of the cellar, behind the preserve shelves and low down, there is a hole in the brickwork about the size of a hand. It is a literal hole and it is also a tear in the fold, and it goes to two kinds of somewhere: other cellars across Dunlath, which she has known about for years — and, deeper, and by no route she understands, into the fold itself, which is new and is what is coming out of it at night.\n\nWHY THE FAKE IS THE BEST COVER IN THE CITY. The whole street reads as two old frauds escalating at each other with banners, and the ministry's own doctrine says a wrinkle that size is a surface fault rather than a door. Nobody looks twice at a joke, and nobody investigates a thing they have already decided is impossible.\n\nTHE BANNER WAR ACROSS THE STREET never stops being funny and now does real work. Her neighbor genuinely does not have a hole. He is now advertising two.\n\nWHY THIS PLACE EXISTS. It is cheap, it is weird, it is exactly the sort of thing children ask to go back to — and it quietly establishes that the fold has small holes all over this city, which is the fact Act One is built on and which nobody ever has to say out loud.",
      "fieldDefs": [
        [
          "looks",
          "Looks like"
        ],
        [
          "who_is_here",
          "Who is here"
        ],
        [
          "game",
          "The game, and what you win"
        ],
        [
          "hidden",
          "Hidden here"
        ]
      ]
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
      "rev": 2,
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
      "body": "WHAT THEY DO HERE. Notice it, which costs nothing and requires no roll — any hero who thinks to count windows on a dark street finds one. Then knock, if they like, and be lied to politely.\n\nHOW TO SEED IT. Mention one unlit window, once, in passing, on a night when the party is walking home from something else. Do not draw attention to it. Do not have anybody watch them from it. If they ask, the answer is lamp oil, and the door closes.\n\nWHEN IT PAYS OFF. Whenever you want. The party will meet Red Flag properly through [[npc-tobin|Tobin]] and eventually [[npc-hettie|Hettie Sarn]], and on the day somebody finally explains what an Unlit house is, a table that has already knocked on one will get there a beat ahead of the explanation.\n\nDO NOT let any authority investigate a dark window. The moment somebody in the ministry decodes it, the whole arrangement collapses and Red Flag stops being able to exist in plain sight.\n\nWHAT THE PEOPLE BEHIND THAT WINDOW BELIEVE, once the party is ever told: that the Foldwright lives. A prisoner somewhere no road goes, or in hiding, or working still inside the creases — they argue about which and they paint the same three words regardless. It is not a theory, it is the proposition that this arrangement had an author and that an author can be found. They are right that he lives. They are catastrophically wrong about what finding him will get them, and the party will be the ones who have to bring that news back."
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
      "rev": 4,
      "tags": [
        "act1",
        "optional",
        "clue"
      ],
      "leadsTo": [],
      "fields": {
        "setup": "[[loc-ganny|Ganny Marle]] asks for this herself, out on the fairground at dusk — see [[b-comm-dusk|THE COMMISSION beat 2]]. Her pitch is a pest problem and nothing more: six jars of preserves gone in a fortnight, the lids taken off and set aside neatly rather than broken, and other things besides that she does not itemize.\n\nShe takes them down, lights one lamp, moves a shelf, and shows them the real hole at the back of the cellar — which is the first thing all evening she has not made a joke about.\n\nThen they wait in the dark. Inside twenty minutes of game time, something comes through.",
        "creatures": "One [[cr-snatch-goblin|snatch-goblin]] kit — knee-high, thin, and by itself. Use the sheet's numbers if it comes to dice, but halve the hit points and give it no interest whatsoever in fighting. It wants the jam. It is frightened of everything and it is very fast.",
        "tactics": "It is not an ambush and it does not attack. It freezes, it hides badly, and it bolts for the hole the moment anyone moves quickly. Anything the party does that is loud or sudden sends it back through the wrinkle, and it does not come back that night.\n\nWays this can go, all of them fine: corner it, catch it in a sack or a coat, feed it and watch what happens, block the hole and talk to it, follow it through the wrinkle before it closes, or kill it. If they are gentle it becomes almost tame within the hour, which children will find far more interesting than a corpse.",
        "reward": "THE HOARD, behind a loose stone in the cellar wall, and they find it whether the kit lives or dies. A magpie's pile of shiny nothing: buttons, three spoons, a bootlace, a brass curtain ring, and a great deal of broken glass.\n\nAnd one thing that does not belong — something that was on a person at the fairground this morning, and that the party can recognize: a garland ribbon in the Draw's colors, a child's shoe, a lamplighter's brass key.\n\nTHAT OBJECT IS THE WHOLE POINT. It did not come from a cellar three streets away, which means this hole and the tear at the foot of the Hearthspire open into the same place, and the news is being delivered by a knee-high goblin with jam on it.\n\nAND THEN GANNY GOES QUIET. She does not explain and she should not be made to. What the party leaves with is the object, a standing welcome to her cellar at any hour with no questions asked in either direction, as much preserve as they can carry, and the clear sense that an old woman in a good hat knew more than she was saying."
      },
      "body": "THE POINT OF THIS, and why it is worth fifteen minutes: the hole in an old woman's cellar and the tear at the foot of the Hearthspire open into the same place.\n\nThat is a real, concrete, physical clue delivered by a goblin stealing jam, and it does three things at once. It proves what [[npc-tobin|Tobin]] suspects before he has earned the right to say it out loud. It tells the party the way in does not have to be a great seam with Rectors standing on it. And it makes the fairground personal again, because whatever is in that hoard belonged to somebody who is on the far side of it right now.\n\nHOW HARD TO PUSH. Not at all. Put the object in the pile and describe the pile. If nobody picks it up, [[npc-tobin|Tobin]] does later, and writes it down, and says nothing, and the party finds it in his notes — which is arguably better.\n\nIT IS NOT A FIGHT. The scoreboard is rescues rather than kills, and this is the first chance after Lastlight to teach that with something small and frightened instead of something dangerous. A party that catches the kit in a coat and feeds it has learned more about how these sessions work than a party that rolls initiative.\n\n⚠ DO NOT LET THEM FOLLOW IT THROUGH. The hole is a hand's width and it is not a door; a kit gets through because a kit is the size of a cat. The party's first entrance into the fold is [[f-wreck|THE WAY IN]] and it is the end of a session, so do not spend it in a cellar. If somebody tries, the answer is simply that they do not fit."
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
      "rev": 7,
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
        "stats": "LEVEL 3 CLERIC · Healer (Life Domain) · casts on WISDOM\n\nHit points 22 · Armor 12 (no armor — a padded coat and a lot of flinching)\nSpell save DC 13 · Spell attack +5 · Wisdom +3 · Speed 30 ft\nInitiative +0 · he will forget to roll it\n\nIN A FIGHT HE DOES NOT ATTACK. He owns a mace because the Registry issues one and he has never taken it off his belt. If he is ever forced to swing it: +2 to hit, 1d6. He would rather be behind somebody.",
        "spells": "SLOTS PER DAY: four 1st-level, two 2nd-level. Cantrips are unlimited.\n\nCANTRIPS\nSpare the Dying · touch a dying creature to steady them — they stop slipping away and become stable. THIS IS THE ONE THAT MATTERS at this table.\nMending · repair a single break or tear in an object — a snapped rope, a torn cloak, a cracked key.\nToll the Dead · a mournful bell rings for a foe. They dodge (Wisdom) or take 1d8 necrotic — 1d12 if they are already hurt. He hates using it.\n\n1st LEVEL\nCure Wounds · touch a wounded friend to heal 1d8+3. His go-to.\nHealing Word · heal an ally 1d4+3 from across the fight, and still do something else that turn. This is how he saves somebody he cannot reach.\nBless · up to three allies each add 1d4 to their attacks and saves for the fight.\nShield of Faith · a shimmering field gives one ally +2 Armor for the whole fight.\n\n2nd LEVEL\nLesser Restoration · cure a disease, or end being poisoned, blinded, deafened or paralyzed.\nPrayer of Healing · a short prayer heals up to six friends 2d8+3 each. Ten minutes, so it is an after-the-fight spell, and it is what keeps this party going without potions.\n\nDISCIPLE OF LIFE — whenever he heals with a spell, add 2 + the spell's level on top. Cure Wounds therefore restores 1d8+3+3.\n\nCHANNEL DIVINITY, once per fight · Preserve Life. He heals a burst of HP shared out among everyone nearby, up to 15 points total, and it cannot take anybody above half their maximum.",
        "at_table": "THE RULE OF THUMB: he keeps the party standing and he never wins a fight for them.\n\nHE HEALS ON HIS TURN AND DOES NOTHING ELSE, and he heals whoever is worst off rather than whoever is most important. He does not tactically triage. He is not a soldier.\n\nHE PANICS USEFULLY. He will use Healing Word from behind cover, Spare the Dying on his hands and knees, and Bless because somebody told him once that it helps. He announces what he is doing a half-second after doing it.\n\nHE WILL RUN OUT. Six leveled slots and then he is a man with a mace he does not use. That is deliberate — when the slots are gone the fight gets frightening, and the party learns to protect the thing that is protecting them.\n\nIF HE DROPS, he is unconscious and stable at 0 and NOT dying (§7 rule: no permanent death). The children will be scared anyway, which is the point of him.",
        "secret": "⚠ CHANGED 2026-08-27, AND THE OLD VERSION IS FLAGGED BELOW, NOT DELETED.\n\nHE HEALS OPENLY. Tobin is a full cleric and the party's healer, and none of that is hidden, licensed, registered or illegal. Joby cut that layer deliberately: the table needs a healer, not a subplot about permits.\n\nWHAT IS STILL SECRET, and both of these still work exactly as written: he files nightly to a Registry office above [[npc-wenna|Wenna]]'s head that she has never dealt with — a secret he keeps FROM the party — and he copies those filings to a house with a dark window, and has done since he read the last legible page of Ellum Wick's field book. He is a double agent and both sets of books are honest, because he is incapable of writing anything down wrong.\n\n❓ OPEN, FOR JOBY: the original first secret was that his healing was his grandmother's outlawed art, with a hearth-spirit riding in a wooden darning egg in his coat pocket — a secret the party would keep FOR him, which is what made them love him before they trusted him. That mechanism is now gone and nothing replaces it. Joby said we would work out his other secret later. THE DARNING EGG IS WORTH KEEPING regardless of what the secret becomes: he turns it over in his pocket when he is frightened, it was his grandmother's, and it costs nothing."
      },
      "body": "Assigned to the party in [[b-comm-5|beat 6 of THE COMMISSION]], under the Accord's clause that no expedition enters the creases without a clerk to keep the record. Introduce him as an inconvenience. Through Act One he is the party's healer, and the inversion should be enjoyed: the ministry's watcher is the reason its quarry keeps getting back up.\n\nWHY HE IS ALREADY HALFWAY GONE (changed 2026-08-11). The campaign needs somebody who can put Red Flag's case to the party as a liberation fight rather than as the terrorism the Set Square describes, and it needs that in session two rather than session ten — otherwise the ministry's account stands unopposed for a third of the act. Tobin is that voice. He does not preach and he does not recruit; he asks one question at a time, and each one is a number that does not add up.\n\nWHAT IS IN THE BOTTOM OF HIS SATCHEL. Petitions he has copied out and kept, which is not allowed and which he knows is not allowed. He files them every night, nothing has ever come of a single one, and he cannot let it alone — a man who records the truth faithfully cannot bear a record that goes nowhere. He mentions it once, on the road, as an embarrassed complaint about his own job rather than as an offer, and the party asks to see them. That is [[f-unanswered|THE UNANSWERED]], and it is how side work reaches them for the rest of the campaign.\n\nHIS FIRST QUESTION IS NOT ASKED ON DAY ONE (changed 2026-08-14). He does not volunteer a dangerous thought to four strangers he met an hour ago; a careful man does not, and saying it out loud is what gets a man folded away. On the first day he is an inconvenience with a satchel. The on-ramp comes after they have been inside the tower together and he has written the day up — because what he cannot do is record something he did not see, and the ministry's account of that tower and his own eyes are about to stop matching.\n\nPLAYING THE BALANCE. He must stay likeable, useless in a fight, and easy to protect, because the children should own his safety long before they own his politics. Let them push him either way: a party that argues the ministry's case at him can genuinely slow him down, and a party that pushes will get further, faster, than anybody intended. He is not load-bearing — Red Flag reaches the party through [[npc-hettie|Hettie Sarn]] regardless, and Ellum's satchel can be found by anyone.",
      "fieldDefs": [
        [
          "looks",
          "Looks like"
        ],
        [
          "wants",
          "Wants"
        ],
        [
          "voice",
          "Voice"
        ],
        [
          "stats",
          "Stats — level 3 cleric"
        ],
        [
          "spells",
          "Spells and slots"
        ],
        [
          "at_table",
          "How he plays at the table"
        ],
        [
          "secret",
          "Secret"
        ]
      ]
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
      "rev": 4,
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
      "body": "Session one she is seen, not met: the old woman at the rope line, counting the white wagons into her ledger, not clapping. Local — the farmland the gray ate was her family's.\n\nPLAY HER AS THE MOST BORING PERSON IN THE ROOM until the ledger opens. She does not argue, does not persuade, and does not raise her voice. She hands you an arithmetic problem and lets you do it yourself, which is why she cannot be dismissed as a crank.\n\nWhen the party crosses to her is open. She is the one who carries the real rebellion after [[npc-tobin|Tobin]] goes. Appears in: [[f-lastlight|LASTLIGHT]] (unnamed, at the rope line).\n\nSHE DOES NOT PAINT THE WALL. Her own people believe the Foldwright lives and will come back and put it right; Hettie keeps a ledger. Asked about the three words she says she has no opinion on things she cannot count, and that if a man did this then a man could be found, and that she would like to ask him some questions about the intake figures. She is the only person in the movement whose hope is not a hope."
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
      "rev": 2,
      "title": "THE WRONG ROOM — a door that shows a different room every time",
      "order": 20,
      "tags": [
        "city",
        "side",
        "toy"
      ],
      "fields": {
        "hook": "Ten to fifteen minutes. A door the players can operate, a rule they can work out by trying it, and a stranger on the other side doing exactly the same thing.",
        "read_aloud": "\"A man is standing in his own doorway holding a lamp, and he has been waiting all day for somebody official, and you have badges.\n\n'Right,' he says. 'Watch. Just watch.'\n\nHe opens the pantry door. Behind it is a stairwell going down, lit, with somebody's boots on the third step. He shuts it. He opens it again. Now it is a kitchen with a meal half-made on the table and nobody in it. He shuts it. He opens it again. Dark. Something dripping.\n\n'Since Tuesday,' he says. 'And once — ONCE, mind — it was my pantry. My preserves are in there.'\"",
        "env": "• THE FLAT — ordinary, tidy, and one door in it is wrong.\n• EACH ROOM — a different light, a different temperature, a different smell coming out. The dark one is colder than the others and they will notice.\n• THE MAN — not frightened, ANNOYED, and he has been keeping a tally in chalk on the doorframe. It is not a very good tally.\n• THE NEIGHBORS — completely uninterested. Two doors down a woman says hers did that last year and it sorted itself out.\n• NO DANGER ANYWHERE IN THIS. Nothing comes through at them. The tension is entirely whether they can work the door.",
        "if_they": "…just start opening and shutting it, good, that is the whole game. There are SIX rooms and they come round in a fixed order: stairwell, kitchen, dark one, a cellar with barrels, a room with a window and rain on it, and the pantry. Then it repeats. Tell them nothing and let them count.\n\n…work out the cycle, the task is to be standing there with the door open when the pantry comes round and get an arm in fast. No roll needed if they have counted. One roll if they are guessing.\n\n…hold the door open, the room stays. It only changes when it is shut and opened again, and they will discover this by accident within about four tries.\n\n…go through into one of them, they can, and they had better be back before somebody shuts the door. That is the only real danger and it is one they invent themselves.\n\n…look at the cellar with the barrels, there is a note on the floor, weighted with a cup. Somebody on the other side has been doing exactly this since Tuesday and has written: WHO IS DOING THIS. There are five earlier notes under it.",
        "outcome": "The preserves, if they timed it. And a correspondent — the party can leave a note in the cellar room and get an answer next cycle, which is a two-way door onto somewhere nobody has identified, opening on a schedule they now know. Let them invent uses for that; they will."
      },
      "body": "WHY THE OVERHAUL. The old version was a door to look at and an errand to run. This one is a machine with a rule the players discover by operating it, which is the difference between a side piece and window dressing.\n\nSIX ROOMS, FIXED ORDER, AND IT ONLY CHANGES WHEN THE DOOR SHUTS. That is the entire ruleset. Do not explain it, do not let anybody in the fiction explain it, and let the table have the pleasure of working it out.\n\nIT IS NOT A PORTAL and must never be run as one. It is the ragged edge of a wrinkle the ministry pinched three streets over last week, and the rooms are all somewhere perfectly ordinary.\n\nTHE CORRESPONDENT IS UNDECIDED ON PURPOSE. Nobody has said who is on the other end. Leave it that way until it is wanted.",
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
      "rev": 2,
      "title": "THE MEASURING — a Surveyor that needs a second pair of hands",
      "order": 30,
      "tags": [
        "city",
        "side",
        "toy"
      ],
      "fields": {
        "hook": "Fifteen minutes. The players do a completely absurd job with total precision while a city goes about its business around them, and they take the reading themselves.",
        "read_aloud": "\"There is one of the paper people standing in the middle of the street. It has been there since dawn. Carts are going round it. A queue of three people has formed behind it for no reason anybody can explain.\n\nIt turns and looks at you — which takes a moment, because it has to arrange the face first — and it says: 'Oh. Oh, good. Are your arms steady? Mine are, but I cannot be in two places, and I have been standing here since dawn hoping somebody sensible would come past.'\"",
        "env": "• THE STREET — has adapted completely. Traffic flows round it. A stall has moved six feet and nobody discussed it.\n• THE QUEUE — three people who do not know why they are queueing and are now far too committed to leave.\n• THE JOB — hold a thin rod perfectly upright, somewhere awkward, and call out the instant it says now.\n• WHERE IT WANTS THEM — pick the worst place available: a roof ridge, a windowsill over the street, the middle of a busy junction, the back of a cart that will not stop moving.\n• INTERRUPTIONS, one per attempt, and always mundane — a cart, a dog, a kid asking what they are doing, the stall-holder wanting his roof back.",
        "if_they": "…help, run it as three or four attempts. Each one fails for an ordinary reason and each failure is funny. Let them solve the logistics themselves — somebody has to hold the ladder, somebody has to shoo the dog.\n\n…ask what they are measuring, it says: how far apart two things are. It points at one of them. The other one is not visible from here.\n\n…ask why it matters, it says it does not know, and that this is not its part of the work. Entirely honest and weirdly reassuring.\n\n…refuse or wander off, it thanks them anyway, with real warmth, and is still there tomorrow.\n\n…succeed, THEY read the number off the rod and call it out. It writes it down. Then it asks them to do it once more, please, if they would not mind.",
        "outcome": "The second reading does not match the first. Nor does the third. It thanks them with total sincerity, writes all three down, says 'yes' in the tone of somebody whose suspicion has been confirmed, and goes back to standing there.\n\nThe party has personally taken a measurement between two fixed things and got a different answer three times in ten minutes. Nobody explains it and nobody ever brings it up."
      },
      "body": "WHY THE OVERHAUL. The old version was a bit performed at the table — ask a question, receive a useless answer. Now the players do the work and produce the unsettling fact themselves, which is worth ten times as much and is also much funnier.\n\nPLAY IT AS A NICE DAY OUT. It is grateful, it is chatty, it apologizes for the roof. The dread is entirely in the numbers and should never be in its manner.\n\nTHE FACT IS THE ACT ONE CLOCK, arriving sideways: the ground is not steady, and the distances are moving. Do not connect it to anything for them.",
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
      "id": "f-unanswered",
      "type": "folder",
      "title": "THE UNANSWERED — jobs nobody was ever going to do",
      "parent": "act1",
      "order": 35,
      "rev": 2,
      "tags": [
        "jobs"
      ],
      "leadsTo": [],
      "fields": {},
      "body": ""
    },
    {
      "schema": 1,
      "id": "unans-index",
      "type": "note",
      "title": "▶ THE BOARD — take one, any time",
      "parent": "f-unanswered",
      "order": 10,
      "rev": 9,
      "tags": [
        "jobs",
        "index"
      ],
      "leadsTo": [],
      "fieldDefs": [
        [
          "how",
          "▶ How the party gets these"
        ],
        [
          "open",
          "On the board now"
        ],
        [
          "rule",
          "How to run one"
        ],
        [
          "more",
          "Writing a new one"
        ]
      ],
      "fields": {
        "how": "TWO STEPS, and neither of them needs the party to go looking for anything.\n\nFIRST, [[npc-tobin|TOBIN]] MENTIONS IT ONCE, on the road, as a complaint about his own job. He files petitions every night, nothing has ever come of one, and he has started keeping the ones that bother him in the bottom of his satchel — which he is embarrassed about, because it is not his to keep. He does not pitch it as work. He says it the way somebody tells you about a thing at the office that is quietly driving them mad, and then the party asks to see them, which is the whole handoff.\n\nAFTER THAT IT IS A RUNNER. A boy from [[loc-clockface|the Clock Face]] finds them wherever they are, hands over a folded slip, and holds his hand out for the penny. That costs one line and it works anywhere, at any time, in the middle of anything — which means a job can be put in front of the party whenever an evening needs one, with no scene required to deliver it.\n\nWHY THIS WAY. The party never has to be told a job board exists, nobody has to be recruited into anything, and the clerk at the third desk stays offstage where she costs nothing.",
        "open": "1. [[unans-bakehouse|The thing under the bakehouse]] · it came up through the floor. Dark, close, and it bites\n2. [[unans-aisle|Aisle nine]] · the Emporium's porters will not go down one aisle anymore\n3. [[unans-garden|The garden guest]] · something landed in a rich family's garden and will not leave\n4. [[unans-dog|The dog in the Old Draws]] · four days down a canyon, and something else is down there too\n\nNone expires. Take one, take all four, or come back in Act Two and they are still here.",
        "rule": "EVERY ONE IS: GO SOMEWHERE, DEAL WITH SOMETHING, GET PAID. Half an hour to an hour each. Three of the four have a monster in them and all four have coin and one thing worth keeping. Pay runs eight to fifty gold, which is deliberately calibrated so that one good job buys a healing potion at [[loc-bottles|Nine Hundred Bottles]].\n\nThe party's badge gets them through the gate, the rope line or the front door. After that it is entirely on them.",
        "more": "WRITING A NEW ONE takes four lines: somebody wants something dealt with, it is somewhere you can walk to, there is a thing there, and it pays. Reuse the bestiary and change the room.\n\nThe pile is bottomless by design, so a new slip can be produced at the table whenever an evening needs one."
      },
      "body": "WHY A PETITION PILE AND NOT A NOTICE BOARD. It costs one sentence, and it means the jobs come from ordinary people who asked the government first and got nothing. But that is background. The jobs are: there is a thing, go and deal with it, here is your money.\n\nTHE ONE LINE TO HAVE READY, if a runner turns up and the table wants to know what this is: \"Tobin's stack. The ones nobody was ever going to do.\" That is enough and nothing else needs saying."
    },
    {
      "schema": 1,
      "id": "unans-dog",
      "type": "beat",
      "leadsTo": [],
      "rev": 5,
      "title": "The dog in the Old Draws",
      "parent": "f-unanswered",
      "order": 50,
      "tags": [
        "jobs",
        "city"
      ],
      "fields": {
        "hook": "Twenty minutes, entirely physical, and it is the one on this board a nine-year-old will pick.",
        "read_aloud": "PETITION 4,502:\n\n\"There is a dog down in the third old working. It has been down there four days. You can hear it from the rim. The ministry says the workings are sealed and it is still down there, and now it has stopped barking at night, which it did not used to do.\"",
        "env": "• THE RIM — a canyon edge, hundreds of feet, and you cannot see the floor. Everyone in Dunlath has dropped something in and counted.\n• THE SOUND — it echoes wrong. It sounds close, then far, then close. The fold does that and nobody here knows why.\n• THE LEDGES — old stepped workings going down the wall in tiers, some sound, some not, all of them older than anybody watching.\n• THE AUDIENCE — half a dozen people at the rim who all have an opinion and none of whom is going down.\n• GEAR — rope is cheap and the Long Table will lend it. Nobody has to buy anything.",
        "if_they": "…go down, it is a climb with real consequence — rope, old ledges, one bad step, somebody on belay. Three or four checks, and a failure costs time or gear rather than a hero.\n\n…follow the sound, it lies. The echo is folded and the dog is not where it sounds. Working that out halves the descent.\n\n…find out why it stopped barking at night, that is because something else moved in on the second day. Two [[cr-snatch-goblin|snatch-goblins]] have a nest on the fourth ledge and have been feeding the dog, which is either sweet or sinister depending on how they are played, and both are fine.\n\n…fight them, it is a fight on ledges over a drop, which is as good as this campaign's terrain gets.",
        "outcome": "THE PAY: eight gold, which is everything she has, and she will try to give them more.\n\nTHE LOOT: whatever has been keeping the dog alive down there has a stash — a Draw crew's abandoned kit, forty years old and bone dry. A good rope, a crowbar, two sealed ration tins, and a foreman's brass whistle that is much louder than it has any right to be.\n\nAND THE DOG, which is filthy, delighted, uninjured, and now theirs if they want it."
      },
      "body": "WHY IT EARNS ITS PLACE. It is a rescue with a rope and a canyon and no enemy, the scoreboard of this campaign is rescues, and the boys will remember the dog longer than they remember any villain.\n\nTHE ECHO IS THE ONLY STRANGE THING and it is never explained. Sound folds. Leave it.",
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
      "id": "unans-bakehouse",
      "type": "beat",
      "leadsTo": [],
      "rev": 2,
      "title": "The thing under the bakehouse",
      "parent": "f-unanswered",
      "order": 20,
      "tags": [
        "jobs",
        "city",
        "fight"
      ],
      "fields": {
        "hook": "Forty minutes. A hole in a floor, a dark space under a city, and something down there that bites. The most straightforward fight on the board.",
        "read_aloud": "PETITION 4,530:\n\n\"There is a hole in my bakehouse floor that was not there on Tuesday and something came up out of it and took a whole tray of buns and bit my boy on the arm. I have boarded it over. It is pushing the boards up at night. I have asked twice.\"",
        "env": "• THE BAKEHOUSE — hot, floury, and lovely, and there is a hole in the middle of the floor with a flour barrel standing on the boards.\n• THE HOLE — drops eight feet into the old sunsalt works. Brick, arched, dry, and going both ways into the dark.\n• DOWN THERE — cold, smells of stone and something sweetish. Old rails in the floor. Sound carries much too far.\n• THE FLOOR IS COVERED IN CRUMBS, all the way along, which is the trail and which nobody needs a roll to follow.\n• THE BAKER — furious, generous, and will absolutely feed them first.",
        "if_they": "…go down, it is a proper little dungeon crawl: three chambers, a collapsed section they have to squeeze or clear, and a chamber at the end with the nest in it.\n\n…follow the crumbs, it works, and it is the right answer, and let them feel clever for it.\n\n…fight, it is two [[cr-snatch-goblin|snatch-goblins]] and they are NOT frightened kits — these are grown, they are cornered, and they will use the dark. Add a third if the party is fresh.\n\n…try to talk to them, that works too and is harder, and a party that gets them out alive should be rewarded for it exactly as well as a party that fights.",
        "outcome": "THE PAY: fifteen gold from the baker, and bread for the party for as long as they are in Dunlath, which he means literally and will honor forever.\n\nTHE LOOT: the nest is lined with stolen everything, and in it is a working lamplighter's pole with a good sunsalt cell still in it — a light source that never goes out, which is worth more than the coin and which they will use constantly."
      },
      "body": "WHY IT WORKS. Hole, dark, monster, loot, bread forever. Nothing in it needs explaining and a nine-year-old knows exactly what to do from the first sentence.\n\nAND IT PLANTS THE UNDERCROFT. The old sunsalt works run under the whole city, sealed and unmapped, and this is the party's first time in them. Do not point at that. They will remember the tunnels on their own the next time they need a road nobody watches.",
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
      "id": "unans-aisle",
      "type": "beat",
      "leadsTo": [],
      "rev": 2,
      "title": "Aisle nine",
      "parent": "f-unanswered",
      "order": 30,
      "tags": [
        "jobs",
        "city",
        "fight"
      ],
      "fields": {
        "hook": "Half an hour. A fight in a warehouse the size of a cathedral, on top of a mountain of other people's shopping. Pure playground.",
        "read_aloud": "PETITION 4,544, filed by the porters' guild:\n\n\"Nobody will work aisle nine. Three of my lads have been bitten and one has been up on the shelving since Thursday morning. Management says there is nothing in aisle nine. Management has not been down aisle nine.\"",
        "env": "• [[loc-rationhall|THE EMPORIUM]] — a covered market the size of a cathedral, pillars, galleries, and shelving thirty feet high.\n• AISLE NINE — dry goods. Sacks, barrels, crates, bolts of cloth, and a great deal of it stacked far higher than anybody should have stacked it.\n• THE LIGHT — good everywhere else and bad here, because three lamp-cells in this aisle have been taken.\n• THE NOISE — the whole market going on around them, cheerfully, fifty feet away.\n• THE MAN ON THE SHELVING — still up there. Has been since Thursday. He is fine and he is not coming down.",
        "if_they": "…go in, it is one [[cr-crease-wolf|crease-wolf]], and this is the perfect room for it: it goes flat, it goes THROUGH the shelving, and it is never where they swung.\n\n…climb, absolutely, and everything they climb can fall over. Encourage this. Toppling a run of shelving onto it should work and should be spectacular.\n\n…use the goods — flour to see it, oil to slow it, a bolt of cloth as a net, barrels rolled down the aisle. Say yes to all of it.\n\n…worry about the damage, the porters do not care in the slightest and management will care enormously.",
        "outcome": "THE PAY: twenty gold from the porters' guild, out of their own pockets, which matters to them.\n\nTHE LOOT: whatever they broke open in the fight is on the floor and nobody is counting. One good coil of rope, a lamp-cell, and a crate of something ridiculous — let a player decide what was in the crate they landed on.\n\nAND: the porters now know them, which means the party has friends who carry everything in this city and hear everything in it."
      },
      "body": "WHY IT WORKS. It is a fight in a toy shop. The room is the weapon, everything is climbable, everything falls over, and there is no penalty for wrecking any of it.\n\nSAY YES. Every improvised idea in this fight should work. That is the entire point of running it in a warehouse.",
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
      "id": "unans-garden",
      "type": "beat",
      "leadsTo": [],
      "rev": 2,
      "title": "The garden guest",
      "parent": "f-unanswered",
      "order": 40,
      "tags": [
        "jobs",
        "city",
        "fight",
        "comedy"
      ],
      "fields": {
        "hook": "Half an hour, and it is the funny one. Something enormous is in a very rich family's very beautiful garden, and it will not leave, and they are beside themselves.",
        "read_aloud": "PETITION 4,551, on much better paper than the others:\n\n\"There is an animal in the garden. It came over the wall on Tuesday, or possibly through it. It has eaten the fish, it has ruined the lawn, and it is sleeping in my wife's summerhouse. We are hosting on Saturday. I will pay anything. ANYTHING.\"",
        "env": "• THE HOUSE — marble, colonnades, a fountain, and a garden under glass at one end with fruit trees that have no business growing here.\n• THE GARDEN — wrecked. Beds flattened, an ornamental pond with no fish in it, and a set of tracks across the lawn that stop dead in the middle of it.\n• THE SUMMERHOUSE — painted, delicate, and there is something the size of a cart asleep in it, breathing.\n• THE FAMILY — watching from the upstairs windows. All of them. Including three children who are absolutely thrilled and will shout advice.\n• THE STAFF — have quietly stopped going outside and are enjoying themselves.",
        "if_they": "…look at the tracks, they start in the middle of the lawn. It did not come over the wall. It came through a wrinkle and the wrinkle is gone.\n\n…fight it, it is a [[cr-tear-ogre|tear-ogre]] and that is a hard fight for level three. It is also asleep, slow to wake, and not hunting anybody.\n\n…be clever, this is the intended route and it should work: it is hungry and lost, and it will follow food. A cart of meat from the Long Table walks it out through the gates and down to the flats, slowly, in front of the entire street.\n\n…let the children out to help, the parents will faint and the kids at the table will love it.",
        "outcome": "THE PAY: he said anything and he meant it — fifty gold, and he is embarrassed it is not more, and he will tell everyone at Saturday's party who did it.\n\nTHE LOOT: the wife insists they take something from the house. Let a player pick from a shelf of genuinely lovely useless things, and let one of them turn out to be useful later.\n\nAND: an invitation to Saturday. Which is a whole other evening if you want one."
      },
      "body": "WHY IT WORKS. Big animal, beautiful house, rich people panicking, and two routes that both pay — hit it, or lead it out with a cart of meat in front of the whole street.\n\nTHE TEAR-OGRE IS A REAL THREAT and the party has seen one penned at Lastlight. If they pick the fight, let it be genuinely frightening, and let them run if they need to. Nothing here punishes them for choosing the sausages.",
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
      "id": "loc-bottles",
      "type": "location",
      "parent": "f-locations",
      "leadsTo": [],
      "rev": 4,
      "title": "Nine Hundred Bottles — potions, tonics and remedies",
      "order": 62,
      "tags": [
        "city",
        "shop"
      ],
      "fields": {
        "looks": "A tall narrow shop with every wall shelved floor to ceiling, and every shelf packed with small stoppered bottles, and every bottle lit from behind. Hundreds of them. Ladders on brass rails run the length of both walls and the shop boy goes up and down them at terrifying speed. The sign outside is a painted count, and somebody repaints the number whenever the stock changes; it currently reads NINE HUNDRED AND FOUR.",
        "who_is_here": "[[npc-merrit|Merrit Quist]], the proprietor, who does not sell you anything until he has asked three questions: where does it hurt, when did it start, and did anything touch you. Then he sends the boy up a ladder and the boy comes down with one specific bottle. He is never wrong and he is quietly delighted with himself about it.\n\nThe shop boy goes up and down the brass rails at terrifying speed and will race anybody.",
        "stock": "★ THE LASTLIGHT DEBT: one bottle each, free, any time, of any type they wish — offered on the field in [[b-comm-dusk|THE COMMISSION beat 2]]. Merrit takes a complaint, never an order; see [[npc-merrit|his sheet]] for how that sets the ceiling.\n\nTHE ONES THAT MATTER. Always in stock, no permit, no questions.\n\nPotion of Healing · 50 gp · drink it, roll 2d4+2, get that many hit points back. Takes your action.\nPotion of Greater Healing · 150 gp · 4d4+4. They keep four behind the counter and will look pleased if somebody buys one.\nAntitoxin · 50 gp · advantage on saves against poison for one hour.\nPotion of Climbing · 75 gp · climb speed equal to your walking speed, and advantage on climbing, for one hour.\nPotion of Water Breathing · 180 gp · breathe underwater for one hour. Two in stock and they have been there a while.\n\nTHE CHEAP SHELF, by the door. A few coppers to a couple of silver each, no rolls, no mechanics, and the party should buy these constantly.\n\nGlowdrop · 2 sp · you glow, faintly and unhelpfully, for an hour.\nA Good Bellow · 2 sp · your voice is enormous for ten minutes. Cannot be turned down.\nFastcolor · 1 sp · your hair is whatever color is on the label until you wash it. Twice.\nHearthdrop · 3 sp · you do not feel the cold for two hours. Genuinely useful in autumn and not worth a single die roll.\nSavor · 5 cp · whatever you eat next tastes of whatever you said out loud. Extremely popular with children and with soldiers.\nStopnose · 1 sp · you cannot smell anything for an hour. Sells better than anybody expects.",
        "hidden": "Nothing sinister. It is a good shop run by good people at fair prices. The one thing worth knowing is that everything on these walls is made with refined sunsalt, which is why it works, and why the price of every bottle went up the same week the price of a lamp did."
      },
      "body": "WHAT THEY BUY. Healing potions, and this is where the party restocks. Full list in WHAT THEY SELL. No restrictions, no permits, nothing complicated — they buy as many as they can afford.\n\nSTOCK LIMIT, the only one: four Greater Healing and two Water Breathing at any time, and the shelf refills in about a week. Everything else is unlimited.\n\nTHE TOY IS THE THREE QUESTIONS. Do not let the party point at a shelf. Make them describe the complaint and then produce the bottle. Kids will invent injuries purely to find out what comes back down the ladder.\n\nTHE LADDERS ARE CLIMBABLE and the boy will race anybody.",
      "fieldDefs": [
        [
          "looks",
          "Looks like"
        ],
        [
          "who_is_here",
          "Who is here"
        ],
        [
          "stock",
          "What they sell"
        ],
        [
          "hidden",
          "Hidden here"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "loc-proving",
      "type": "location",
      "parent": "f-locations",
      "leadsTo": [],
      "rev": 3,
      "title": "The Proving Floor — arms, armor, and a range out the back",
      "order": 64,
      "tags": [
        "city",
        "shop"
      ],
      "fields": {
        "looks": "Not a forge and not a junk shop — a showroom. A long marble hall with weapons mounted in racks down both sides at eye height, each with a little brass plate, and armor on stands in the middle like statues wearing it. Everything is polished. Nothing is dusty. There is a carpet.",
        "who_is_here": "Fitters rather than smiths, in aprons over good clothes, who will take a hero's measurements without being asked and bring things over unprompted. They are pushy in the way of very good salespeople and they are extremely nice about it.",
        "stock": "Everything here matches what a hero can carry on their own sheet, so a purchase can be written straight onto it.\n\nMELEE · price · damage · notes\nDagger · 2 gp · 1d4 piercing · finesse, light, throw 20 ft\nQuarterstaff · 2 sp · 1d6 bludgeoning\nHandaxe · 5 gp · 1d6 slashing · light, throw 20 ft\nMace · 5 gp · 1d6 bludgeoning\nShortsword · 10 gp · 1d6 piercing · finesse, light\nBattleaxe · 10 gp · 1d8 slashing\nLongsword · 15 gp · 1d8 slashing\nWarhammer · 15 gp · 1d8 bludgeoning\nRapier · 25 gp · 1d8 piercing · finesse\nHalberd · 20 gp · 1d10 slashing · two-handed, reach — hits from 10 ft\nGreataxe · 30 gp · 1d12 slashing · two-handed\nGreatsword · 50 gp · 2d6 slashing · two-handed\n\nRANGED\nShortbow · 25 gp · 1d6 piercing · range 80 ft\nLongbow · 50 gp · 1d8 piercing · range 150 ft, two-handed\nArrows, 20 · 1 gp\n\nARMOR · price · Armor Class\nLeather · 10 gp · 11 + your Dex modifier\nStudded leather · 45 gp · 12 + your Dex modifier\nScale mail · 50 gp · 14 + your Dex modifier, maximum +2\nChain mail · 75 gp · 16, flat. Dex does not apply.\nShield · 10 gp · +2 Armor. Takes a hand.\n\nKIT, on a table by the door\nRope, 50 ft · 1 gp · Torches, 10 · 1 sp · Tinderbox · 5 sp · Bedroll · 1 gp · Rations, 10 days · 5 gp · Waterskin · 2 sp · Backpack · 2 gp · Crowbar · 2 gp · Grappling hook · 2 gp · Explorer's pack, the lot · 10 gp",
        "game": "THE RANGE, out the back. Sixty yards, straw targets, a sand bank, and a bored man who resets everything.\n\nTHE RULE: anybody may try anything in the shop that they are thinking of buying, free, as many times as they like. Give every hero one roll with whatever they pick and describe what happens. Nobody is charged and nobody is hurried.\n\nTHE HOUSE SHOT · beat 18 · the small target at the full sixty yards. Free to attempt, once a day.\nWIN: your name goes on the board by the door, and the shop gives you a quiver of twenty arrows and a tenth off anything you buy that day, forever, because they remember.\nTHERE ARE ELEVEN NAMES ON THE BOARD. One has been there forty years and the fitters will tell you about him unprompted.\n\nAND THE PLATE ON THE STAND. It is enormous, nobody is buying it, and the fitters will help anybody into it who asks. Beat 12 to walk in it without going over. There is no prize. Everybody wants to do it.",
        "hidden": "The back half of the building is a covered range — sixty yards, straw targets, a sand bank, and a bored man who resets everything. Anybody may try anything they are thinking of buying, and most of the shop's custom comes from people who came in to look."
      },
      "body": "WHAT THEY BUY. Everything in the Player's Handbook equipment lists, at book prices. This is the party's armory and it should be simple.\n\nTHE TOY IS THE RANGE, and it is why this place exists. They can shoot, throw, or swing anything in the shop before buying it. Give every hero one roll on the range with whatever they want to try and describe what happens. That is fifteen minutes of pure fun and it costs the campaign nothing.\n\nLET THEM TRY ON THE PLATE. It is on a stand, it is enormous, and the fitters will help anybody into it who asks. Nobody is buying it. Everybody wants to wear it.\n\nTHE HOUSE COMPETITION: hit the small target at sixty yards and your name goes on the board by the door. There are eleven names on it. One of them has been there forty years.",
      "fieldDefs": [
        [
          "looks",
          "Looks like"
        ],
        [
          "who_is_here",
          "Who is here"
        ],
        [
          "stock",
          "What they sell"
        ],
        [
          "game",
          "The game, and what you win"
        ],
        [
          "hidden",
          "Hidden here"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "loc-sugar",
      "type": "location",
      "parent": "f-locations",
      "leadsTo": [],
      "rev": 3,
      "title": "The Sugar Vault — a confectioner with a ridiculous reputation",
      "order": 66,
      "tags": [
        "city",
        "shop",
        "comedy"
      ],
      "fields": {
        "looks": "A shop built to look like a bank, because the joke has been running for sixty years. Marble counter, brass grilles, and behind them a wall of small numbered drawers going up two storeys with a rolling ladder in front of them. You do not browse. You present yourself at the counter and make a withdrawal.",
        "who_is_here": "Clerks in green visors who take the order with total gravity, write it into a ledger, and hand it over in a paper packet sealed with wax. Nobody in this building has ever smiled at a customer and the whole city finds this hilarious.\n\n[[npc-hask|Hask Bind]] is the one the party meets, and he comes to them — he stands in the mud of the fairground at dusk and makes a formal presentation of Drawer 400. See [[b-comm-dusk|THE COMMISSION beat 2]].",
        "stock": "A copper a packet unless marked. The printed list on the counter has numbers and no descriptions, so ordering is a gamble unless somebody tells you what is good — and everybody in Dunlath has an opinion about the numbers.\n\nWHAT COMES BACK, if they order blind (roll a d8, or just pick):\n1 · Glass buttons. Hard, sour, and they last an hour. Universally agreed to be the best value in the city.\n2 · Something that fizzes so violently that children hold their mouths open to show each other.\n3 · A single enormous humbug. One. It is the size of an egg and it costs the same as everything else.\n4 · Salt liquorice. Nobody likes this. Everybody orders it once.\n5 · Honeycomb shards, and the packet is mostly dust, and the dust is the good part.\n6 · Little sugar animals, and no two packets have the same animals in them.\n7 · Something faintly warm that stays faintly warm. Nobody will explain it. It is delicious.\n8 · A packet of thirty tiny different things, which is the one to order if the table cannot decide.\n\nNAMED DRAWERS, the ones people ask for:\nDrawer 12 · 1 cp · the glass buttons. What a local orders.\nDrawer 88 · 2 cp · the fizzing ones. What a nine-year-old orders.\nDrawer 201 · 5 cp · a packet you are not allowed to open in the shop. The clerks are firm about this and will not say why.\nDrawer 400 · 4 gp · more than a week's wages, and the clerks will not say what is in it. Not dangerous, not magic, and genuinely worth the money. See below.",
        "hidden": "⚠ DRAWER 400 — PROPOSED, NOT YET RULED. Written in so the beat is runnable; change it freely.\n\nWHAT IS IN THE PACKET. Twelve pieces, numbered, and a small printed card that tells you the order to eat them in, because it is a sequence rather than an assortment. The twelfth is the same sweet as the first and tastes nothing like it. Let the players actually do it, in order, at the table.\n\nAND THE PART THAT OUTLIVES THE EVENING. The shop gives them a drawer. Their names go on the brass plate, the drawer is theirs, and they may leave things in it. A private numbered drawer behind a brass grille in a building run like a bank is a stash, a dead drop and a running joke for the rest of the campaign, and it costs the game nothing.\n\nNothing here is dangerous and nothing here is magic, which was the standing constraint on Drawer 400 and still holds."
      },
      "body": "WHY THIS EXISTS. It is a sweet shop run like a bank vault, it is enormously silly, and the boys will want to go back every single session. Opulence at pocket-money prices.\n\nTHE TOY IS THE DRAWERS. Four hundred numbered drawers and a printed list on the counter with numbers but no descriptions. Ordering is a gamble unless somebody tells you what is good, and everybody in Dunlath has an opinion about the numbers.\n\nCHEAP, HARMLESS, MEMORABLE: a copper each. Let players order by number and roll for what comes back if you like. Nothing here has a mechanical effect and nothing needs one.\n\nDRAWER 400 IS DELIBERATELY UNDECIDED. Somebody will eventually spend the money. Decide then, at the table, and make it worth it.",
      "fieldDefs": [
        [
          "looks",
          "Looks like"
        ],
        [
          "who_is_here",
          "Who is here"
        ],
        [
          "stock",
          "What they sell"
        ],
        [
          "hidden",
          "Hidden here"
        ]
      ]
    },
    {
      "schema": 1,
      "id": "ref-party",
      "type": "note",
      "title": "▶ THE PARTY — what the table actually told us",
      "parent": "f-reference",
      "order": 5,
      "rev": 1,
      "tags": [
        "party",
        "players",
        "session1"
      ],
      "leadsTo": [],
      "fieldDefs": [
        [
          "source",
          "Where this came from"
        ],
        [
          "century",
          "Century (Ben)"
        ],
        [
          "sam",
          "Sam Silkweed (Harlan)"
        ],
        [
          "aramil",
          "Aramil Quingalor (Harlan)"
        ],
        [
          "jef",
          "Jef Blackstone (Rowan)"
        ],
        [
          "use",
          "How to use it — suggestions, not canon"
        ]
      ],
      "fields": {
        "source": "Collected in play at SESSION ONE (Lastlight), which is the session that was built to harvest exactly this. Everything in the four boxes below is what Joby heard at his own table. It is player-authored and it outranks anything invented in this repo.\n\nJef's fuller backstory lives on his shared character sheet in the OS rather than here.",
        "century": "Once served a powerful and benevolent leader, who was killed. Century now wanders looking for purpose.",
        "sam": "Essentially retiring. World-weary and done with the life he has led until now. This is a last hurrah, and he is passing through.",
        "aramil": "Backstory is still thin, but a strong revolutionary spirit is already showing. Hearing that the world is a colonial domain of the Surveyors — with none of the political detail — was enough on its own to start him radicalizing.",
        "jef": "Has a workable backstory already, on his shared sheet in the OS. What the table showed is that he is most engaged when he is hitting something.",
        "use": "NOT CANON. Nothing below has been agreed and none of it should be run without Joby saying yes. It is here so the openings are visible.\n\nCENTURY is a man looking for someone worth serving, in a campaign that will offer him three false answers before the true one — the ministry that decorates him, the movement that recruits him, and the faction that is right about everything and wrong about the method. A leader who was killed also rhymes hard with what is actually at the center of this world, and that rhyme is free.\n\nSAM is the only hero with nothing at stake, which makes him the one whose stake, when it arrives, will land hardest. Passing through also means he is not from Dunlath and can have known other places, which is worth something in a world that has forgotten some of them.\n\nARAMIL IS THE MOST URGENT OF THE FOUR. A nine-year-old radicalizing on his own means the campaign's central trap — that the permitted rebellion is owned by the occupation — is going to be personal rather than theoretical, and it means Red Flag may reach the party through a player instead of through [[npc-tobin|Tobin]] or [[npc-hettie|Hettie]]. Do not slow him down. Let him get there early and let the betrayal cost him something.\n\nJEF sets a pacing rule for every session from here: put something in front of him to hit, early, and do not make him sit through half an evening of talking to earn it."
      },
      "body": "WHY THIS DOCUMENT EXISTS. `CAMPAIGN.md` §8 lists the missing player material as the highest-priority open question in the entire campaign, by a wide margin — the note there is that until each region holds a piece of a PLAYER's story, the emotional spine of twenty sessions belongs to a non-player character. Session one was built to collect it. This is the collection.\n\nKEEP ADDING TO IT. Anything a player says in character that sounds like a fact about their hero goes in here the same night, in their words, before it is forgotten."
    },
    {
      "schema": 1,
      "id": "f-sessions",
      "type": "folder",
      "title": "SESSION LOGS — what actually happened",
      "parent": null,
      "order": 60,
      "rev": 1,
      "tags": [
        "log"
      ],
      "leadsTo": [],
      "fields": {},
      "body": ""
    },
    {
      "schema": 1,
      "id": "log-01",
      "type": "session",
      "title": "Session 1 — Lastlight",
      "parent": "f-sessions",
      "order": 10,
      "rev": 4,
      "tags": [
        "log",
        "session1"
      ],
      "leadsTo": [],
      "fields": {
        "date": "Played shortly before 2026-08-27. FILL IN THE ACTUAL DATE.",
        "recap": "WHAT WAS RUN: [[f-lastlight|LASTLIGHT]] end to end — the walk up through Dunlath, the fairground and its games, the ceremony (the crews, the faded, the white wagons, the healing of the Cinder Draw), the lighting and the tear, and [[enc-lastlight|the fairground fight]].\n\nWHERE IT STOPPED: after the fight, with the party invited to stay at [[loc-ossuary|the Ossuary]] and told they would be awarded the following day. That is [[b-comm-1|THE COMMISSION beat 1]], so session one ran one beat into scene two.\n\nIT WENT WELL.\n\n⚠ THE REST OF THIS FIELD IS BLANK ON PURPOSE. What the heroes actually did in the fight, who they saved, who they could not reach, what they said to each other, what the players found funny — none of that is recorded here, because only Joby was at the table. Fill it in, or paste it from your own notes.",
        "plan": "SESSION TWO PICKS UP AT [[b-comm-dusk|THE COMMISSION beat 2]] — the field as the light goes, and the three people who come to them — because beat 1 is already played. Run beats 2 through 7: Merrit Quist, Hask Bind and Ganny Marle on the fairground and the crier at dusk, the night at the Ossuary and the printed sheet naming Red Flag, the walk up through the wet city past the warrant boards, the awarding, the commission and the lie, Wenna's office and the clerk, and the woman and the boy on the steps.\n\nTHE EVENING CAN GO TO [[loc-ganny|GANNY'S CELLAR]] INSTEAD OF THE HOTEL, if they take her up on it. That runs as [[enc-ganny|the thing in Ganny's preserves]].\n\nHAVE READY: a real folded paper bird for [[b-comm-6|beat 7]].\n\nSOMETHING FOR JEF TO HIT. Scene two still has no fight in it, and neither does [[f-wreck|THE WAY IN]] — Ganny's cellar is a catch rather than a kill. If the evening needs a real one, [[f-unanswered|the board]] and [[f-iftime|IF THERE IS TIME]] are both stocked.",
        "loose_ends": "PLANTED AND NOT YET PAID: the white wagons nobody watched leave; the scar-line and its skipping crow; the clock hands that started that morning; the bird-folder at the rope line and any birds the heroes were given; [[npc-hettie|Hettie]] counting at the rope line; the boy at the tower's foot, still unnamed; the one each hero could not reach; and the criers naming Red Flag by dusk.\n\nTO RECORD WHEN KNOWN: the rescue list from the fight, any keepsakes named, and anything a player said in character that sounds like a fact about their hero — that goes to [[ref-party|▶ THE PARTY]] the same night."
      },
      "body": "HOW THIS FOLDER WORKS. One document per session. The recap is what happened, the plan is what the next one opens on, and the loose ends are the promises the table is now owed.\n\nJOBY KEEPS HIS OWN NOTES IN THE OS TOO, and those are the primary record — this log is the tidied version. When he says the notes are ready, they get read and anything not already here gets folded in. Nothing is copied across automatically and nothing here should contradict them.\n\n⚠ NOTHING IN A RECAP IS INVENTED. If it was not witnessed or reported, the field says so and stays blank."
    },
    {
      "schema": 1,
      "id": "b-comm-dusk",
      "type": "beat",
      "title": "2 — Toward dusk: three people find them",
      "parent": "f-commission",
      "order": 25,
      "rev": 1,
      "tags": [
        "act1",
        "session2"
      ],
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
      ],
      "body": "WHAT CHANGES HERE. The Rector goes back to writing down faces, and over the next hour the party finds out what being famous in this city actually means. Everyone in Dunlath was on this field this morning, and everyone saw four people go the wrong way.\n\nRUN THE THREE IN ANY ORDER, and let them overlap and interrupt each other. Two of them are giving things away. Only [[loc-ganny|Ganny]] wants something, and hers is the only one with a job in it.\n\nTHEY HAVE NO MONEY AND NO BADGE YET. The purse and the writ are tomorrow. Everything offered this afternoon is offered on the strength of what they did — nothing is bought and nothing is earned, all of it is given. Do not say that out loud. Just make sure nobody pays for anything today.\n\nTHE BEAT IS TEMPTATION. There is a hot bath and a bed waiting at [[loc-ossuary|the Ossuary]] and three reasons not to walk up there yet. If they go straight to the hotel anyway that is fine, and all of this keeps.\n\nLET THE DAY GET DARK ON THEM. It starts in bright afternoon and ends at dusk with the lanterns being rehung, and Ganny should arrive last, when the light is already going.\n\n⚠ NOBODY HERE HAS A FIGHT IN THEM. Ganny's cellar tonight is a catch rather than a kill, and the nearest real fight is [[unans-index|the board]], which the party cannot reach until [[npc-tobin|Tobin]] joins them tomorrow. Worth knowing before you sit down.\n\nCLOSE ON THE CRIER. The bell and the name are already written at the end of [[b-last-5|LASTLIGHT beat 5]]. Play it here, at dusk, after the giving, so that the warmth curdles while they are still holding the presents.",
      "fields": {
        "hook": "None of them has ever been given anything in their life, and this afternoon they cannot cross a field without somebody putting something into their hands.",
        "read_aloud": "MERRIT QUIST, mid-afternoon, working. “There is a man crossing the mud with a wooden crate on his hip, and a boy behind him carrying a ladder, which is the single most useless object on this field, and the boy is carrying it anyway. The man is going survivor to survivor — kneeling, asking questions, handing out small bottles — and he has been at it for hours.\n\nHe gets to you, and he looks at the four of you a moment longer than he looked at anybody else.\n\n‘Merrit Quist. Nine Hundred Bottles, up on the hill.’ He sets the crate down in the mud without checking what is under it. ‘I am going to ask each of you three questions, and I would like a truthful answer, because I have been lied to all afternoon by people who wanted to be brave about it.\n\n‘Where does it hurt. When did it start. And did anything touch you.’”\n\nHASK BIND, any time, and he has been waiting a while. “There is a man in a green visor and sleeve garters standing at the edge of the field, and he is mud to the knee, and he has not once looked down at it. He is holding a flat wooden case in both hands, the way you carry a full cup.\n\n‘Hask Bind. The Sugar Vault.’ He opens the case. Inside, bedded in tissue, are four paper packets sealed with green wax.\n\n‘Drawer four hundred,’ he says, as though that settles the matter, and hands one to each of you. ‘There is a card inside. Read the card first.’\n\nSomebody in the crowd behind him says something about it, and he does not turn around.”\n\nGANNY MARLE, last, with the light going. “The stalls have started lighting up again, because a crowd is a crowd. And there is an old woman in a very good hat who has been standing about thirty feet off for some time now, not queueing with the others, waiting for a gap.\n\nWhen she gets one she crosses quickly for eighty.\n\n‘Ganny Marle. The Impossible Corner — you’ll have seen the banner.’ A pause, and something goes over her face that is not grief. ‘I came down to look at it. The big one.’\n\nAnd then, and it costs her something to say: ‘I have a problem in my cellar, and I would rather not take it to the ministry. Something has been getting in. Six jars of preserves in a fortnight and other things besides, and it is not a rat.’ She looks the four of you over the way a person prices a horse. ‘Come tonight. It comes out at night.’”",
        "env": "• THE HOUR — bright afternoon at the start of this beat and dusk by the end of it. Say it twice and let it get dark on them.\n• THE FIELD — half the stalls have reopened, because a crowd is a crowd and this stock will not keep. Hot fat, sugar, and one man still trying to sell garlands.\n• THE LIGHT — grain-lanterns picked out of the grass and rehung on the posts. By dusk the field is better lit than it was at noon.\n• THE CROWD — they are being looked at. People point, people bring their children over, and somebody shakes their hands and cannot say why. This has never happened to any of them before.\n• UNDERNEATH IT — names still being called, further off now, and by fewer voices.\n• THE TOWER — white, unmarked, and the crown still lit. Nobody on this field can quite stop looking at it.",
        "if_they": "…ask [[npc-merrit|Merrit]] for a named potion, he does not take orders and is not rude about it. He asks what they want to be able to DO, and then sends the boy up the ladder. Whatever comes down is the right bottle, and he is never wrong — which means the ceiling on this gift sits wherever you set it, in character, in the moment.\n\n…try to pay any of the three, none of them takes it. Merrit is insulted. [[npc-hask|Hask]] states that the transaction has already been recorded. Ganny says she is paying THEM, and that they have not agreed to anything yet.\n\n…ask Hask what is in the packet, he says he is not able to discuss the contents of a drawer. Asked again, he says the same sentence with the same intonation.\n\n…open the packet in front of him, he watches without expression until somebody reads the card, and then says ‘in order’ and waits.\n\n…ask [[loc-ganny|Ganny]] what the thing in her cellar is, she says that if she knew what it was she would not need them, which is true.\n\n…ask Ganny why not the ministry, she says that a ministry matter in your cellar means you do not have a cellar. Every adult on this field would say the same, and it is the most ordinary sentence anybody says to them all day.\n\n…ask Ganny why THEM — this is the good question and the real answer is on [[loc-ganny|her sheet]]. What she gives them is the plain half of it: four armed strangers who fought monsters in public this morning can walk into any street in this city tonight without one person asking them why.\n\n…refuse all three, nothing is withdrawn and nobody is offended. It is all still there tomorrow.\n\n…go looking for more of this, let them have it. Half the field wants to give them something, and most of it is a garland, a drink, or a hand on the shoulder.",
        "outcome": "THREE STANDING OFFERS, and only one of them has an hour attached.\n\n[[loc-bottles|NINE HUNDRED BOTTLES]] — one bottle each, free, whenever they come. [[npc-merrit|Merrit Quist]] will not take an order, only a complaint.\n\n[[loc-sugar|THE SUGAR VAULT]] — Drawer 400 in the hand, and a drawer of their own with their names on the brass. See [[npc-hask|Hask Bind]].\n\n[[loc-ganny|GANNY MARLE]] — tonight, in her cellar. It runs as [[enc-ganny|the thing in Ganny's preserves]], and it is the only thing on this field that expires.\n\nTHEN THE BELL. The crier comes up the road with a paper and a name, exactly as written at the end of [[b-last-5|LASTLIGHT beat 5]]. Run it here if it has not been run already.\n\nAnd then [[b-comm-2|the Ossuary]], whenever they finally go up."
      }
    },
    {
      "schema": 1,
      "id": "npc-merrit",
      "type": "npc",
      "title": "Merrit Quist — the man who is never wrong",
      "parent": "f-npcs",
      "order": 70,
      "rev": 1,
      "tags": [
        "act1",
        "city",
        "shop"
      ],
      "leadsTo": [],
      "fieldDefs": null,
      "body": "Proprietor of [[loc-bottles|Nine Hundred Bottles]]. He enters the party's life on the field at Lastlight in [[b-comm-dusk|THE COMMISSION beat 2]], working, with a crate on his hip.\n\nHE IS NOT A REWARD-GIVER, and the gift lands far better if the party has watched him do it for three other people first. He came down because there are hundreds of injured people on a field and he owns nine hundred bottles. They are one stop on a long afternoon.\n\nHOW HE WORKS, AND IT NEVER CHANGES. Three questions — where does it hurt, when did it start, did anything touch you — and then he produces one specific bottle. He does not sell from a list and he does not take orders. A hero who names a potion gets asked what they want to be able to do instead, and then the boy goes up the ladder.\n\n⚠ THAT IS ALSO THE DIAL. The standing offer is one potion each, of any type they wish. Because Merrit answers a need rather than an order, the ceiling sits wherever you put it, in character, in the moment — and a man who is never wrong can decline to hand a nine-year-old something enormous without anybody at the table feeling refused.\n\nTHE BOY WITH THE LADDER is worth keeping. He carries it everywhere, including places with no shelves in them, and he will race anybody.",
      "fields": {
        "looks": "Fifties, dry, and spotless on a field of mud that he does not appear to have noticed. Rolled sleeves, a leather apron with about forty small pockets in it, and reading glasses pushed up on his head that he never once uses.",
        "wants": "To be handed a complaint he has not heard before. He has been waiting years for one and has begun to suspect he has heard them all.",
        "voice": "Brisk, precise, and entirely without bedside manner. He interrupts, he corrects, and he is kind in a way that never once sounds like it.",
        "secret": "He has none, and neither does the shop. The only thing worth knowing is already on [[loc-bottles|the shop's sheet]]: every bottle on those walls is made with refined sunsalt, which is why they work, and which is why the price of a remedy went up the same week the price of a lamp did.\n\n⚠ PROPOSED, NOT RULED: that he has noticed that coincidence, and has not followed the thought anywhere, because he has a business to run."
      }
    },
    {
      "schema": 1,
      "id": "npc-hask",
      "type": "npc",
      "title": "Hask Bind — the clerk who does not smile",
      "parent": "f-npcs",
      "order": 80,
      "rev": 1,
      "tags": [
        "act1",
        "city",
        "shop",
        "comedy"
      ],
      "leadsTo": [],
      "fieldDefs": null,
      "body": "A counter clerk at [[loc-sugar|the Sugar Vault]], and the entire joke of that shop delivered by one man. He appears on the field in [[b-comm-dusk|THE COMMISSION beat 2]] with a flat case and four sealed packets.\n\nPLAY HIM ABSOLUTELY STRAIGHT. He is not being funny and he does not know that he is funny. He is standing in a foot of mud conducting a formal presentation, because a presentation was resolved upon and he is the one who came to make it. Never let him crack. The children will do all of the work.\n\nHE WILL NOT DISCUSS THE CONTENTS OF A DRAWER. That is the line, and it is the same line every time with the same intonation. It is not a secret, it is policy, and he would say so if anybody asked him the right way.\n\nWHAT HE ACTUALLY HANDS OVER is on [[loc-sugar|the Sugar Vault's sheet]]: Drawer 400, and a drawer of their own.",
      "fields": {
        "looks": "Thirty-odd, green visor, sleeve garters, and mud to the knee that he has not once looked down at. Carries a flat wooden case in both hands, the way a man carries a full cup across a room.",
        "wants": "For the presentation to be made correctly. Past that, for the ledger to balance, which it does.",
        "voice": "Complete sentences, no contractions, no volume at all. He answers the question he was asked and then stops, which reads as rudeness and is not.",
        "secret": "⚠ PROPOSED, NOT RULED. The Vault did not send him. He put it to the owner across the counter, the owner said do it if you like, and he has been rehearsing the wording since. He will not tell anybody this, and if the party ever gets it out of him it should cost him something to admit."
      }
    }
  ]
};
