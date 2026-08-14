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

  { "schema": 1, "id": "act1", "type": "folder",
    "title": "Act One — the rebellion is on a leash",
    "parent": null, "order": 10, "rev": 1,
    "tags": ["act1"], "leadsTo": [], "fields": {},
    "body": "Act One runs from the Lastlight ceremony to the turn. The staging ground for this act lives in the repo as ACT1.md; the bible is CAMPAIGN.md. What is pushed here is table-ready material. Each scene is a folder holding everything needed to run it; the people and monsters live in their own master folders and are pointed at with wikilinks." },

  { "schema": 1, "id": "f-lastlight", "type": "folder",
    "title": "LASTLIGHT — the opening scene",
    "parent": "act1", "order": 10, "rev": 5,
    "tags": ["act1", "session1"],
    "leadsTo": [], "fields": {},
    "body": "Session one, doubling as session zero. Everything needed to run the opening lives in this folder: the run sheet and the fairground encounter now; the handouts (reason cards, the Lastlight program) still to come. Cast on stage: [[npc-wenna|Wenna Ash]], [[npc-hettie|Hettie Sarn]] (seen, not met), and the boy who carries the reliquary — who is [[npc-finch|Finch]] on this page and NOWHERE at the table, because the party is not told his name today and does not learn it until his mother says it in [[b-comm-6|the last beat of the following scene]]. By the morning after they also have [[npc-tobin|Tobin Rell]]. What comes next is [[f-commission|THE COMMISSION]]." },

  { "schema": 1, "id": "sc-lastlight", "type": "scene",
    "title": "LASTLIGHT — the run sheet",
    "parent": "f-lastlight", "order": 10, "rev": 5,
    "tags": ["act1", "session1", "opening"], "leadsTo": [],
    "fields": {
      "setting": "The Lastlight fairground outside the west wall. The city is long and thin, built along its crease; beside it runs the Cinder Draw — not a field but a canyon, folded into itself and pushed down, lined with bridges and refinement towers descending out of sight. The Hearthspire stands new against the wall, its crown near the underside of the town above — where the clock tower's hands are moving this morning, for the first time in living memory.",
      "read_aloud": "The whole city is walking out through the west gate, and everyone is walking the same way you are. Overhead hangs the country in the sky — upside-down roofs, a road you could never follow, and the clock tower every kid here grew up watching. Somebody's little sister says it first: the hands are moving. They have never moved. The grownups say it must be the wind up there. Today is Lastlight. The last Draw in the world closes today, the blight gets healed at last, and the new tower — the Hearthspire, the safest ever built, they have said it a hundred times — lights tonight. There are gray-iced blight-cakes if you have a coin, and a paper lantern with one glowing grain of sunsalt in it if you are small enough.",
      "what_happens": "The ceremony runs in three beats — the honored crews onto the white wagons, the Rectors closing the canyon, a boy setting the reliquary into the chamber — and then the pull finds no slack. The tear rips down the tower's face to the boy, the clock tower falls out of the sky, the sealed monsters pour through taking people, and the party fights its first fight. In the dust Wenna asks her questions and two Surveyors at the edge file four new faces. The boy is never named today, by anyone."
    },
    "body": "WHAT THIS SCENE IS. Session one, doubling as session zero: the whole world on display, the first fight, and the machinery that collects the players' own material without anyone noticing a questionnaire.\n\nBEFORE ANYTHING HAPPENS — say the line: \"Each of you has your reason for being here today. I'll leave it to each of you to decide what that reason is.\" Nobody has to answer now. The adults take it as homework; each kid gets a reason card with four seeds and \"or make up your own\": someone you know is among the honored crews; you are looking for someone, and crowds are where you look; your family fought in the war and came to see what the peace bought; you came to work the crowd — perform, sell, compete, impress. Answers are collected in the dust, by [[npc-wenna|Wenna]]. Also, before the lighting, ask each hero: name one thing you carry that you would run back into danger for. Threaten it in the collapse.\n\n1 — THE FAIRGROUND. Run the read-aloud above. Let them wander: blight-cakes, grain-lanterns, the petition rail where a hoarse man says what he says every week (grateful for the Fold — and whose world is this, exactly?). Seed one thing per hero that does not line up (a stair with one step too many, a verse nobody else hears, a name that draws a blank). At the rope line a Surveyor is folding toy birds that actually flap, patient under a heap of children, its smile arriving a half-second late every time. During the speeches the ground shivers; the crowd does its little settling-joke laugh. Nobody runs.\n\n2 — THE HONORED CREWS. The Cinder Draw's last workers walk the aisle in garlands, and at the back come the faded — who do not walk so much as arrive, and when the crowd cheers, they wave: all together, once, like one hand. They are helped onto white wagons bound, the criers say, for their well-earned rest, and the send-off is celebrated like a wedding. The wagons roll out before the lighting. Nobody watches which way they turn. At the rope line an old woman with a ledger writes as each wagon passes, lips moving, counting — that is [[npc-hettie|Hettie Sarn]], and she is seen today, not met.\n\n3 — THE HEALING. READ ALOUD: \"The Rectors take their places along the canyon's rim — tall folded figures pleated into fans and crowns — and when they move, the Draw moves. The canyon closes down its whole length, bridges and towers and all, the way a drawer shuts on everything inside it. Where it was, there is a line in the earth. On one side of the line the grass is one green; on the other side, another. A stream runs up to the line and does not quite meet itself. A crow flies across and — skips. Ten thousand people watch a wound being hidden, and cheer a wound being healed.\"\n\n4 — THE LIGHTING. READ ALOUD: \"No lever. No torch. There is a small door at the tower's foot, built to take one offering, and a boy in his best shirt, seven or so, picked by lottery, carries a glass case holding the last crust of sunsalt ever scraped from the Cinder Draw. He sets the old light into the new tower while the whole city holds its breath. Far above him, the crown begins to glow.\"\n\n5 — THE TEAR. READ ALOUD: \"The light goes wrong. The crown of the Hearthspire comes apart — and the tear does not stay at the crown. It rips DOWN the tower's face like a seam giving way: down, and down, to the little door, toward the boy. The sky bucks. The clock tower — the one that started ticking this morning — comes loose from the ceiling of the world and falls, end over end, three seconds, into the fairground. The boy runs. He is fast, and he is lucky, and he clears the falling stone in front of everybody — and then something long and gray comes out of the tear sideways, unfolds, and takes him. Then the rest come through. You know them. Everybody knows them. They are the monsters from every story your grandmother ever told — the ones the Folding sealed away. And they are not just hungry. They are taking people. Roll initiative — if you choose to stand.\"\n\n6 — THE FIGHT. The crunch lives in [[enc-lastlight|the fairground encounter]]: [[cr-snatch-goblin|snatch-goblins]], [[cr-crease-wolf|crease-wolves]], and the penned [[cr-tear-ogre|tear-ogre]]. Three staging rules. First, the monsters take: a grabbed person is carried toward the tear and can be saved any time before it — rescues, not kills, are the fight's real scoreboard. Second, every hero gets both halves: one civilian staged into their path to save (afterward the civilian says something that assumes a history — family, teacher, or somebody you owe?), and one person carried through beyond their help. The fight writes the rescue list, and the boy from the tower stands at the top of it as the one nobody reached — a face and not a name, because no one at the table has been told what he is called. Third, the Rectors are spectacle, not allies with dice: far off they fold a falling slab away above the grandstand and pinch a street shut to pen the worst of it — and they never roll, never enter the party's corner, and never save anyone the heroes could have saved.\n\n7 — THE DUST. READ ALOUD: \"It is over fast — ten minutes that felt like an hour. The tear is patched, the way a torn page gets taped. The paper people bow to the survivors and go back to writing down faces. The clock face lies broken in the road, and its hands are still moving. Nobody can tell you how many people went through the tear. The number the ministry settles on by evening is eleven, and everybody who was standing where you were standing knows it was more than that.\"\n\nThen [[npc-wenna|Wenna Ash]] finds them — she was in the crowd all day and did not run — and does what recruiters do: she asks. What did you lose today? What have you lost before today? Why did you stand when everyone else ran? (This is the collection point for the reasons and the rest of the session-zero material; whatever they tell her is canon by morning.) She tells them the truth as she knows it: people went through that tear and are already being called fallen; her movement is the only one that goes in after the taken; the ministry permits it, records it, and never once helps; and what they have needed for years is somebody who can go in and come back out. Every word she believes. Most of it is true.\n\nAnd the two Surveyors at the edge of the ground have written down four new faces, and will file them by evening — which is how, tomorrow, the heroes acquire a clerk named [[npc-tobin|Tobin Rell]].\n\nEXITS AND PLANTS. Planted today, paid later: the white wagons nobody watched leave; the scar-line and its skipping crow; the clock hands that started this morning; the toy birds and their maker; Hettie counting; the boy at the tower's foot whose name nobody says; the one each hero could not reach. Play passes straight to [[f-commission|THE COMMISSION]], which begins in this dust and pays the birds off in its last beat." },

  { "schema": 1, "id": "f-npcs", "type": "folder",
    "title": "NPCs — the cast",
    "parent": null, "order": 20, "rev": 1,
    "tags": ["cast"], "leadsTo": [], "fields": {},
    "body": "Every named person in the campaign lives here — one sheet each, the single source of truth, no matter how many scenes they appear in. Scenes point at these sheets with wikilinks; hover a link for the peek, and use ＋ To the table on a sheet to put someone in the initiative roster." },

  { "schema": 1, "id": "f-monsters", "type": "folder",
    "title": "Monsters — the bestiary",
    "parent": null, "order": 30, "rev": 2,
    "tags": ["bestiary"], "leadsTo": [], "fields": {},
    "body": "Every campaign creature lives here — one sheet each, held IN this folder so the feed shows the full sheets, and linked from the scenes and encounters that use them. First residents, the Lastlight tear family: [[cr-snatch-goblin|the snatch-goblin]], [[cr-crease-wolf|the crease-wolf]], and [[cr-tear-ogre|the tear-ogre]]. The SRD starter creatures live separately in the 📖 Look up library; sheets here are this campaign's own." },

  { "schema": 1, "id": "enc-lastlight", "type": "encounter",
    "title": "The fairground fight — things through the tear",
    "parent": "f-lastlight", "order": 20, "rev": 4,
    "tags": ["act1", "session1"],
    "leadsTo": [],
    "fields": {
      "setup": "The Lastlight fairground, seconds after the tear. Initiative is opt-in — the fight starts when the heroes choose to stand. The scoreboard is rescues, not kills: every monster wants to leave with somebody, and a person carried into the tear is gone until the party goes in after them. Terrain to use hard: the grandstands (high ground, and one section groaning toward collapse), the fallen clockwork (cover, and a bell that can be rung), spilled grain-lanterns underfoot, the rope lines, and the scar-line where footing goes suddenly wrong.",
      "creatures": "Six [[cr-snatch-goblin|snatch-goblins]] in two waves of three, and three [[cr-crease-wolf|crease-wolves]]. Far off, one [[cr-tear-ogre|tear-ogre]] — penned by the Rectors, seen and never fought. Tuned for the table: four level-3 heroes (bard, fighter, two rangers). A player missing? Shed one goblin per empty chair and change nothing else.",
      "tactics": "Scripted opener, before initiative: the first thing through takes the boy from the tower. Goblins grab and drag toward the tear, twenty feet a turn — and any hit on a goblin makes it drop its person. Wolves never carry: they herd runners back toward the goblins and knock heroes down when they hunt in pairs. One rescue is staged into each hero's path, and one capture happens beyond each hero's reach, far side of the ground, no matter how well they fight. Give each hero a moment: the fighter holds the gap between the grandstands, the rangers make goblins drop captives with long shots, and the bard can steady the crowd itself — a stampede turned, a shouted verse that gives a dragged neighbor the nerve to twist free.",
      "reward": "No treasure — a fairground of witnesses. Every rescued civilian says something that assumes a history with their rescuer (bounded choice: family, teacher, or somebody you owe?). Wenna saw all of it, the Surveyors wrote all of it down, and the rescue list — the boy from the tower's foot at the top of it, still unnamed — now belongs to the party."
    },
    "body": "Runs inside [[f-lastlight|LASTLIGHT — the opening scene]]; the read-alouds and the session-zero machinery are in [[sc-lastlight|the run sheet]]. The Rectors fight the same disaster as pure spectacle — never in the party's corner, never with dice (staging rules in the run sheet, beat 6)." },

  { "schema": 1, "id": "f-commission", "type": "folder",
    "title": "THE COMMISSION — the morning after",
    "parent": "act1", "order": 20, "rev": 1,
    "tags": ["act1", "session2"], "leadsTo": [], "fields": {},
    "body": "The second scene of Act One, running from the settling dust of [[f-lastlight|LASTLIGHT]] to the moment the party walks out of a government building employed. There is no fight in it. Everything it does, it does by being kind to the heroes on camera.\n\nRead [[sc-commission|▶ RUN THESE IN ORDER]] and nothing else. That document is the whole scene in sequence, and every step in it links to the beat, the place, or the person it needs, so the rest of this folder is opened one piece at a time as play reaches it.\n\nThe two buildings this scene uses — [[loc-ossuary|the Ossuary]] and [[loc-setsquare|the Set Square]] — now live in [[f-locations|Locations]] with every other place in the city." },

  { "schema": 1, "id": "sc-commission", "type": "scene",
    "title": "▶ RUN THESE IN ORDER — the commission",
    "parent": "f-commission", "order": 10, "rev": 1,
    "tags": ["act1", "session2", "index"], "leadsTo": [],
    "fieldDefs": [
      ["order", "▶ Run these in order"],
      ["before", "Before you start"],
      ["truth", "What is actually happening"],
      ["after", "Where it leaves them"]
    ],
    "fields": {
      "order": "1. [[b-comm-1|In the dust — a Surveyor thanks them]] · the fairground, minutes after the fight\n2. [[b-comm-2|A night at the Ossuary]] · [[loc-ossuary|the hotel]], that evening\n3. [[b-comm-3|The awarding]] · [[loc-setsquare|the Set Square]], next morning — badges, purse, and a fold each\n4. [[b-comm-4|The commission and the lie]] · the same room, minutes later — the task force, and who they are told did this\n5. [[b-comm-5|Wenna's assignment]] · a Green Fields room across the city — where to look, and a clerk to carry the paper\n6. [[b-comm-6|The woman and the boy]] · the steps outside, on the way out\n\nSteps 3 and 4 are one conversation and should not be broken up. Everything else can breathe.",
      "before": "Have ready: the three things the Rector hands over (see [[b-comm-3|the awarding]]), and one folded paper bird made for real, which is given away in [[b-comm-6|the last beat]] and is the only prop that matters. Know that [[npc-tobin|Tobin Rell]] joins the party in step 5 and that he is already further gone than he looks. Know that nobody today says the name of the boy from the tower's foot until the last thirty seconds of the scene.",
      "truth": "The tear was not caused by anybody. It is the jam in the great fold, and it has been coming for a lifetime. The ministry names Red Flag because a public enemy with a human face keeps the grieving flowing into Green Fields, which the occupation owns, and away from the candle houses, which it does not. Every human in the scene believes what they are saying. The Rector knows better and is not lying either, in its own reckoning, because a useful account of a disaster is a kind of order and order is mercy.",
      "after": "Employed, decorated, and pointed at the wrong crease. They leave with a badge that opens checkpoints, coin, a folded case each, a handler who disagrees with their orders, an assignment at the Cinder Draw scar-line, and a paper bird from a five-year-old. The next session is the choice between the crease they were sent to and the tear they saw with their own eyes."
    },
    "body": "HOW TO RUN IT. This is a scene about being handled well, so play everyone in it as genuinely decent and let the wrongness sit underneath. Nobody sneers, nobody threatens, and the only person in the building who suspects anything is the junior clerk nobody introduces properly.\n\nThe children should come out of this feeling like heroes who were given medals, because that is what happens, and because the whole point of a leash is that it is offered as a gift. Do not tip it. The adults will notice that the party's names were known before they gave them, that the route was assigned rather than chosen, and that a boy died at the foot of a tower this morning and no official in a building full of officials has mentioned him.\n\nPACING. Ninety minutes at a comfortable pace. If time is short, run 1, 3, 4 and 6, and give Wenna's assignment to the Rector's office instead — but do not cut step 6 under any circumstances, because it is the reason the rest of the scene hurts later." },

  { "schema": 1, "id": "b-comm-1", "type": "beat",
    "title": "1 — In the dust: a Surveyor thanks them",
    "parent": "f-commission", "order": 20, "rev": 1,
    "tags": ["act1", "session2"], "leadsTo": [],
    "fields": {
      "hook": "They have just fought monsters in front of ten thousand people, and the first thing the government does is walk over and be delighted with them. It is the warmest reception any of them has ever had, and it is being conducted by something that is not a person.",
      "read_aloud": "\"One of the paper people is coming toward you, and it is smiling. It has to arrange the smile first — the creases move, and then the expression arrives, a half-second late, the way a word arrives in a language you are still learning. It is very tall up close, and it is made of one piece. 'You stood,' it says. 'Ten thousand of you, and four stood. Do you know how rarely that happens? I have written it down. I have written all of it down.' It looks at each of you in turn, and it says your name — and none of you has told it your name.\"",
      "if_they": "…ask how it knows their names, it is delighted to explain: it wrote them down, of course, that is what it is for, and it produces the page and shows them. Nothing is hidden and that is what makes it unsettling.\n\n…are hostile or suspicious, it is not offended in the least. It says that suspicion is reasonable after a day like this one, and offers the rooms anyway, and means it.\n\n…ask about the boy at the tower, it says it is very sorry and that the count is being taken and that they will be told. It will not be told. Nobody follows up. That is deliberate and should pass without comment.\n\n…ask what it wants, it says: nothing tonight. Tonight they should sleep somewhere warm. That is true.",
      "outcome": "The party is invited, as a token of the ministry's gratitude, to be guests at [[loc-ossuary|the Ossuary]] — the finest house in the city — for as long as they care to stay. A runner will bring word in the morning. Then it bows, and goes back to writing down faces."
    },
    "body": "The Surveyor here is [[npc-rector|the Rector of the Set Square]], though it does not say so and is not in ceremonial form. Use the same being tomorrow at the awarding, and let a player be the one to notice it is the same one; a world in which one official handles you personally from the first minute is a smaller and more watched world than one with a cast of thousands.\n\nRun it warm. The temptation is to play the Surveyors cold, and cold is both wrong and boring at a table with children in it. This thing is thrilled with them. It behaves like a proud schoolteacher who happens to be folded out of a single sheet of something that is not quite paper, and the horror is entirely in the geometry and the timing rather than in the manner." },

  { "schema": 1, "id": "b-comm-2", "type": "beat",
    "title": "2 — A night at the Ossuary",
    "parent": "f-commission", "order": 30, "rev": 1,
    "tags": ["act1", "session2"], "leadsTo": [],
    "fields": {
      "hook": "Hot water, clean sheets, and more food than any of them has seen at one table, on the worst night the city has had in living memory. Let them enjoy it, and let the enjoying be slightly difficult.",
      "read_aloud": "\"[[loc-ossuary|The Ossuary]] was a bone-house once, and the city has never bothered to rename it. Six floors of white stone with a lamp in every window — real sunsalt lamps, the whole face of the building lit, on a night when the rest of the street is dark. There is a bath the size of a cart. There is a bed each. Someone has already brought up your things from wherever you left them, folded, and there is a tray with more food on it than your family eats at a wedding. Outside and four floors down, people are still looking for people.\"",
      "if_they": "…go back out to help, let them, and let it matter: they can find one person tonight, and it should be someone small and alive and not the one everyone is thinking about. The ministry does not stop them and notes it approvingly in the morning.\n\n…try to leave the city, the doors are not locked and nobody follows. There is simply nowhere to go and a summons finds them wherever they are.\n\n…search their rooms or ask who packed their things, the answer is that the staff did, they are very sorry, they assumed it would be a kindness. It was a kindness. It is also the second time today somebody has handled their belongings without being asked.",
      "outcome": "Morning. A human runner, sixteen and out of breath, brings four summonses on ordinary paper: their names, the hour, and the address of [[loc-setsquare|the Set Square]]. Nothing folds itself, nothing flaps. The state does not need to be strange when it is simply being obeyed."
    },
    "body": "This beat exists to buy the scene its contrast. The party should be comfortable, fed, and well treated in a building full of light while the city grieves in the dark outside, because that is the arrangement the whole campaign is about, and it is much better felt in a bathtub than explained in a speech.\n\nKeep it short at the table — ten minutes — unless the players want to use the evening, in which case give them the night and let them find somebody." },

  { "schema": 1, "id": "b-comm-3", "type": "beat",
    "title": "3 — The awarding",
    "parent": "f-commission", "order": 40, "rev": 1,
    "tags": ["act1", "session2", "reward"], "leadsTo": [],
    "fields": {
      "hook": "The medal scene, played straight. Small, formal, and genuinely moving — about forty people in a room built for four hundred, and every one of them is there because these four went toward the monsters.",
      "read_aloud": "\"The room at the top of [[loc-setsquare|the Set Square]] is one enormous square of pale stone, and every line in it is true. There are forty chairs set out in the middle of a floor meant for four hundred, and they are full: the people you pulled out of the dust, and the families of the ones you did not. Nobody claps when you come in. They stand up.\n\nThe Rector is waiting, and it is dressed differently today — pleated into a great fan of a collar that opens behind its head like a hand of cards. On the table beside it there are three things and a stack of plain paper.\"",
      "if_they": "…refuse the honors, the Rector accepts this with real grace, sets their share aside, and says the offer does not expire. It genuinely does not. Nothing in this scene requires them to accept anything.\n\n…ask what the fold is made of, the Rector says: paper. It is telling the truth and the truth is not reassuring.\n\n…try to open a fold on a living thing, it will not close. It simply refuses, gently, the way a door refuses. The Rector, if present, says only that this was thought best.",
      "outcome": "Three gifts, given one hero at a time, by name, in front of the room.\n\nTHE BADGE. A Writ of Search, folded from one blank sheet in a single unbroken motion that takes about eight seconds and never doubles back. It carries their name inside the fold and it opens every checkpoint, gate, and rope line in the city. It is not magic. It is a leash, and it is the reason this act is called what it is called.\n\nTHE PURSE. A month's wages each, in coin, counted out loud. Concrete, unglamorous, and more money than two of them have ever held.\n\nTHE FOLD. One each: a stiff pale card the size of a hand, which opens along creases into a deep case that holds far more than the card could, and closes back to a card. It must be opened and closed by hand, and it will not close on anything living. Nobody explains why that rule was necessary."
    },
    "body": "This is the beat the children came for, so give it the full ceremony: names read out, the room standing, the Rector coming down off the platform to hand each thing over personally. Do not undercut it. The scene is only worth anything later if it is worth something now.\n\nThe folding itself is the spectacle, and it is worth slowing down for. A Rector at work is meant to be seen — that is the entire point of the ritual grade — so describe the hands and the eight seconds and the fact that it never goes back to correct anything, and let a player ask to watch closely. They can. It is happy to be watched.\n\nON THE FOLD AS AN ITEM. No dice attach to it. It is a pocket that holds a great deal, it is delightful, and it will quietly teach the table that this world folds space as a matter of course, which is the cosmology arriving as a toy rather than as a lecture." },

  { "schema": 1, "id": "b-comm-4", "type": "beat",
    "title": "4 — The commission and the lie",
    "parent": "f-commission", "order": 50, "rev": 1,
    "tags": ["act1", "session2", "red-flag"], "leadsTo": [],
    "fields": {
      "hook": "They are offered a job by the most powerful institution in the world, and they are told who to blame. One of those two things is false, and it is not the one they will doubt.",
      "read_aloud": "\"'Eleven people went through that seam,' the Rector says, 'and they are alive, and they are not coming back on their own. We would go in after them ourselves. We cannot. There are only so many of us — there have only ever been so many of us — and we have not been able to make more since the world stopped moving. So the work that is done in this world by hands is done by human hands, and it has been that way since before your grandmothers.'\n\nIt lets that sit.\n\n'What we are forming is a task force. Human, small, sanctioned, and paid. You would be the first four names on it.'\"",
      "if_they": "…ask why them, the answer is honest and slightly chilling: because everyone else ran, and because it was standing there with a pen.\n\n…ask what caused the tear, this is where the lie arrives. See the outcome field, and deliver it as settled fact rather than as an accusation — the way one reports weather.\n\n…ask about the boy at the tower's foot, the Rector says the count is eleven and does not distinguish among them. It will not name him. Nobody in this building names him all morning.\n\n…ask to see the tear themselves, the Rector says the seam at the Hearthspire was patched by its own order within the hour and is closed. It believes this. It is wrong, and [[npc-tobin|Tobin]] will say so before the day is out.",
      "outcome": "THE LIE, delivered plainly: the tear was made. A cell calling itself Red Flag — a scattering of refusers left over from the Fence War, who kept the old banner when the movement furled it — sabotaged the lighting of the Hearthspire in order to break the Accord and put the world back to war. They are named as terrorists, they are described as few and dangerous, and the party is asked, as part of the work, to bring back anything that shows a human hand in it.\n\nThen the second half of the commission: the searching itself is done under the Accord's right of search, which belongs to Green Fields and not to the ministry, so the party is to present themselves to a recruiter across the city. The Rector writes the address out by hand. It is [[npc-wenna|Wenna Ash]]."
    },
    "body": "WHY THE LIE IS THE RIGHT ONE. Canon already has the criers blaming the veiled figure on the high seat, which is where the world's cosmic anger is meant to go. This is the operational version, issued to people who are actually being sent somewhere, and it does a job the veil cannot: it makes the candle houses radioactive, so that every grieving person in the city walks toward Green Fields — which the occupation owns — instead of toward Red Flag, which it does not. Record it in CAMPAIGN.md §3 as standing practice.\n\nWHAT THE PARTY NOW BELIEVES. That there are terrorists, that the terrorists made the hole, and that they have been hired to help clean up after them. They will carry that for several sessions, and they will carry it while traveling with a man who has been reading a dead friend's field book and can no longer make the numbers work.\n\nDO NOT WINK. The Rector is not smirking, and it is not lying in the sense it would recognize. It has been given an account of the disaster by its own leadership and it is passing that account on. Everything else in the room is true: the eleven, the offer, the pay, and the fact that its order cannot spare a single one of itself to go in." },

  { "schema": 1, "id": "b-comm-5", "type": "beat",
    "title": "5 — Wenna's assignment, and a clerk",
    "parent": "f-commission", "order": 60, "rev": 1,
    "tags": ["act1", "session2"], "leadsTo": [],
    "fields": {
      "hook": "They met her in the dust last night and liked her. This morning she turns out to be their employer, and she is so glad they came that it is a little hard to look at.",
      "read_aloud": "\"The address the Rector wrote out is a room over a grain merchant's, with a hand-painted sign and a kettle going. There are maybe nine people in it, and half of them have the look you saw all over the fairground last night — the look of somebody who is counting a room to see who is missing. [[npc-wenna|Wenna Ash]] is standing on a chair pinning a paper to the wall, and when she sees you in the doorway she gets down so fast she nearly goes over.\"",
      "if_they": "…tell her the ministry named Red Flag, she goes quiet, and then she says carefully that she has heard the name and that she does not know, and that the people she has met who went that way were not monsters, they were just tired. It is the first crack of light in the whole scene and she does not know she has opened it.\n\n…ask why Green Fields and not the ministry, she gives the true answer, warmly and with pride: the right of search belongs to the movement, it was bought with the Accord, and it is the only thing in this world that human hands are allowed to do without asking.\n\n…ask about the boy at the tower, she says she does not know his name either, and that she is sorry, and that she has been trying since last night to find out. She has been. Nobody will tell her.",
      "outcome": "THE ASSIGNMENT. Wenna sends them to the scar-line at the Cinder Draw — the canyon the Rectors folded shut with garlands yesterday morning — on the reasoning that it is the newest seam in the world and the nearest thing to an open door. She believes this completely. It came down to her from above, which she does not think about, because assignments have always come down from above.\n\nTHE CLERK. Every expedition under the right of search carries a Registry man to keep the record; it is in the Accord. Theirs is [[npc-tobin|Tobin Rell]], junior, cheap, apologetic, and carrying a satchel too big for him. Introduce him as an inconvenience. He is their healer and their most dangerous secret and they have no idea."
    },
    "body": "TOBIN'S FIRST MOVE, and the hook for next session. On the way out, or on the road, once and quietly and never in front of Wenna, he says the thing he has been chewing on: they closed that seam yesterday morning in front of the entire city, and the tear at the Hearthspire's foot was patched in an hour by people who were in a hurry. So why are we being sent to the one that is shut?\n\nHe does not say the words goose chase. He does not say Red Flag. He asks one question, badly, and then apologizes for asking it, and the party can do what it likes with that.\n\nThis gives session three its choice: the crease they were assigned, or the tear they watched open. Both are playable, the Draw is a real scene and not a punishment, and the party learns in their second session that their handler and their employer do not agree. See [[npc-tobin|Tobin's sheet]] for how far gone he actually is." },

  { "schema": 1, "id": "b-comm-6", "type": "beat",
    "title": "6 — The woman and the boy",
    "parent": "f-commission", "order": 70, "rev": 1,
    "tags": ["act1", "session2", "payoff"], "leadsTo": [],
    "fields": {
      "hook": "The whole scene has been officials being kind to them in warm rooms. This is thirty seconds on a cold step with two people nobody arranged, and it is the only part of the day anybody at the table will remember in a month.",
      "read_aloud": "\"There is a woman sitting on the steps outside, and she has been there a while, because the stone is dry under her and wet everywhere else. There is a small boy with her, five or so, holding something in both hands. She stands up when she sees the badges.\n\n'They said you're the ones going in,' she says. 'They said there's a list.'\n\nThe boy comes forward on his own, without being told, and holds up what he is carrying. It is a paper bird. It is grubby and it has been held very tightly and one wing is bent. 'The tall one made it,' he says. 'At the fair. Before.'\"",
      "if_they": "…take the bird, the boy is enormously relieved and goes back to his mother. Give the actual folded prop to whichever player took it, and do not explain it.\n\n…ask what she wants, she says the thing she came to say: please bring back my son. And then, because they are strangers and she has to, she says his name.\n\n…ask why she is not inside with the families, she says she tried. She is not on the list of families. Nobody has put her son on any list, because nobody wrote his name down, because he was not with his family when it happened — he was at the front, in his best shirt, carrying a glass case.\n\n…promise her anything, let them. Write it down. Campaigns are made out of promises made on steps.",
      "outcome": "The party learns the name of the boy from the tower's foot, from his mother, on a step, twenty-four hours after watching him be taken — and they learn that in a building full of officials counting to eleven, not one of them said it.\n\nThe woman is [[npc-sela|Sela Orrin]]. The small boy is her surviving son, Rab. The taken one is [[npc-finch|Finch]]."
    },
    "body": "HOW TO PLAY IT. Do not signpost it. The party is walking out of a good morning, employed and decorated, and this happens on the way to the street. Keep it under a minute of real time and do not add music to it.\n\nThe bird is the whole design. The ministry gave them a badge that opens doors, coin, and a folded case that holds more than it should. A five-year-old gives them a bent paper bird that does nothing at all, made by the same hands that made the badge, on a day when it was still just a toy. Nobody has to point out the difference, and nobody should.\n\nUSE A REAL PROP. Fold one before the session and hand it across the table. It will end up in a dice bag and it will still be there in Act Three.\n\nWHY IT LANDS. Because the party watched this boy die — or thought they did — before anybody told them who he was, and because they have spent a whole morning being thanked by people who never once said his name. The theme of this campaign is a state that grieves in numbers, and this is the entire argument delivered in four lines by a child with a broken toy." },

  { "schema": 1, "id": "loc-ossuary", "type": "location",
    "title": "The Ossuary — the ministry's hotel",
    "parent": "f-locations", "order": 120, "rev": 2,
    "tags": ["act1", "city"], "leadsTo": [],
    "fields": {
      "looks": "Six floors of white stone at the top of the market street, with a sunsalt lamp burning in every single window — which on any ordinary night is the most expensive sight in the city and on this one is obscene. It was a bone-house before it was anything else, three centuries ago, and the city has never got round to renaming it. The vaults underneath are still down there and are used for wine.",
      "who_is_here": "Human staff, all of them, scrupulously kind and slightly frightened of the guests. Ministry visitors, contractors, and the occasional Green Fields delegate, who are put on separate floors by a management that regards this as simple good manners rather than politics.",
      "hidden": "The register. Every guest since the Accord is in it, in a fair hand, and the ledger for the last fifteen years has three pages that have been very neatly removed. Nobody on the staff will admit to knowing anything about it, and one of them is lying out of fear rather than loyalty."
    },
    "body": "The Ossuary earns its place by being genuinely lovely on the worst night of the city's life, which is the whole arrangement of this world reduced to one building: the occupation is warm, it is generous, it keeps its lamps lit while the street is dark, and it is very glad you came. Play the comfort straight and let the players feel however they feel about it." },

  { "schema": 1, "id": "loc-setsquare", "type": "location",
    "title": "The Set Square — the Rector's hall",
    "parent": "f-locations", "order": 130, "rev": 2,
    "tags": ["act1", "city", "surveyors"], "leadsTo": [],
    "fields": {
      "looks": "A public square that is a perfect square, and a building on its north side that is the same square stood upright — a drafting instrument the size of a civic hall, which is where the name comes from and which the city finds funnier than the order does. Inside, every line is true. There are no worn steps, no settled lintels, and no corner anywhere in the building that is not exactly a corner, and after ten minutes of it most people want to go and look at something crooked.",
      "who_is_here": "Human clerks on the lower floors, doing real and useful work with real and useful courtesy. The ritual grade above. [[npc-rector|The Rector of the Set Square]] holds the top floor, which is one room the size of the building's footprint and is where public foldings and awardings are performed.",
      "hidden": "The building has no stairs above the fourth floor and no lift, and nobody has ever thought to ask how the Rectors get up there. They fold flat and go under the doors. A hero who says the words out loud has worked out something true about Surveyors that will matter in a locked room in Act Two."
    },
    "body": "Give the party the ten minutes of trueness before the ceremony starts. Children notice a room with no crooked lines faster than adults do, and it is the cheapest possible way to teach the table what these beings actually are: not cruel, not cold, but incapable of leaving anything unfinished." },

  { "schema": 1, "id": "npc-rector", "type": "npc",
    "title": "The Rector of the Set Square — the one who is delighted with them",
    "parent": "f-npcs", "order": 50, "rev": 1,
    "tags": ["act1", "surveyors"], "leadsTo": [],
    "fields": {
      "looks": "Tall, narrow, and folded out of a single sheet of something between paper and porcelain. Its face is a pattern of creases and it builds an expression before it wears one, so every smile arrives about half a second after the moment that earned it. In the hall it wears the ritual grade: a great pleated collar that opens behind its head like a hand of cards.",
      "wants": "For the world to be finished, which it understands as the kindest thing that could possibly be done for anyone, and in the meantime for the eleven people in that seam to be brought home. It wants the second thing sincerely and will spend real money on it.",
      "voice": "Warm, precise, and thrilled by competence. It compliments people specifically rather than generally — not that they were brave, but that they went left when everyone else went right. It never raises its voice, never threatens, and has genuinely never needed to.",
      "secret": "It has no personal secret at all, which is the interesting thing about it. It passes on the Red Flag account because that is the account its leadership gave it, and it has not examined it, in the way that a decent officer does not examine the ministry's press. The only thing it is hiding is arithmetic: it knows the count was more than eleven, because it was standing there writing, and eleven is the number it has been given to say."
    },
    "body": "The party's first named Surveyor, and their handler at the top of the ladder for the whole of Act One. It should be warm, personally attentive, and impossible to dislike, because a table that likes it will be genuinely disturbed the first time it folds a street shut with people on it — which is scheduled for Act Two.\n\nRun it in both appearances of [[f-commission|THE COMMISSION]]: it is the Surveyor who congratulates them in the dust in [[b-comm-1|beat 1]], out of ceremonial dress, and the officiant who folds their badges in [[b-comm-3|beat 3]]. Let a player notice it is the same one. A world where one official takes a personal interest in you from the first minute is smaller and more watched than a world with a cast of thousands, and the children will feel that without being told.\n\nIts own name for itself is a fold rather than a sound — a precise gesture of the hands — and it will teach a hero to make it, badly, if asked. It is enormously pleased to be asked." },

  { "schema": 1, "id": "npc-sela", "type": "npc",
    "title": "Sela Orrin — the woman on the steps",
    "parent": "f-npcs", "order": 60, "rev": 1,
    "tags": ["act1", "taken", "haunted"], "leadsTo": [],
    "fields": {
      "looks": "Forty, in yesterday's clothes, having sat on a wet step long enough to dry the stone under her. She has a five-year-old with her, Rab, who holds her hand except for the ten seconds in which he does the bravest thing anybody does in this scene.",
      "wants": "Her son back. Beneath that, and harder to give her, she wants somebody official to write his name down, because the count is eleven and her son is not on any list of families, and a boy who is not on a list has not, in the only sense the state recognizes, been lost.",
      "voice": "Flat and practical, because she has been awake for thirty hours and has already cried everything she is going to cry in front of strangers. She does not plead. She states the position and waits, and it is much worse than pleading.",
      "secret": "She has no secret and she is not a plant, which the DM should hold onto, because this campaign is full of people who turn out to be something. She is exactly what she appears to be: one of the haunted, twenty-four hours in, before anybody has reached her. Both Green Fields and Red Flag will come for her within the month, and which one gets there first is worth deciding at the table rather than in advance."
    },
    "body": "Sela exists to put a face and a name on the count. She appears in [[b-comm-6|the last beat of THE COMMISSION]], on the steps, for under a minute, and she says the name of the boy the party watched be taken — [[npc-finch|Finch]] — which nobody in a building full of officials said all morning.\n\nRAB. Five. He carries a paper bird that a Surveyor folded for him at the fair the day before, and he gives it away to a stranger with a badge because he has worked out, in the way five-year-olds do, that this is a thing he can do to help. He does it without being told and without letting go of it easily. Play the bent wing.\n\nWHERE SHE GOES. She should come back. A mother who appears once and is never seen again is a prop, and this campaign has enough of those; a mother the party keeps running into — at a Green Fields meeting, at a rope line, eventually in a dark house with a candle in the window — is the whole argument of Act One happening to one family in the background. Her arc is a standing invitation and is deliberately unscheduled." },

  { "schema": 1, "id": "f-locations", "type": "folder",
    "title": "Locations — the places",
    "parent": null, "order": 40, "rev": 1,
    "tags": ["places"], "leadsTo": [], "fields": {},
    "body": "Every place in the campaign lives here — one sheet each, the single source of truth, no matter how many scenes use it. Scenes point at these sheets with wikilinks, the same way they point at people and creatures.\n\nStart at [[loc-index|▶ WHERE THEY CAN GO]], which lists the city in one screen and says what the party can actually DO at each place." },

  { "schema": 1, "id": "loc-index", "type": "note",
    "title": "▶ WHERE THEY CAN GO — Dunlath",
    "parent": "f-locations", "order": 10, "rev": 3,
    "tags": ["places", "index"], "leadsTo": [],
    "fieldDefs": [
      ["places", "▶ The city, and what they can do there"],
      ["ifthere", "If there is time"],
      ["state", "The state of the city this week"]
    ],
    "fields": {
      "places": "[[loc-clockface|The Clock Face]] — meet people, leave word, hire a runner. The city's meeting place, by accident.\n[[loc-petition|The Petition Rail]] — formally demand anything at all, including a name added to the count. Every word is filed.\n[[loc-lampoffice|The Lamp Office]] — buy light. The register on the wall does not add up, and nobody has ever added it.\n[[loc-sixtyone|Sixty-One Pairs]] — rummage, one roll each. The first buyer for anything brought back out of a crease.\n[[loc-longtable|The Long Table]] — half the room is dressed as clowns, half as bakers, and they are fighting about it. Food, rooms, every rumor in the city, and a guard company for hire.\n[[loc-wintergarden|The Winter Garden]] — the pleasure palace. Dining, a sixty-foot bar, a band, a gallery of games, and card rooms behind a curtain. Where the party has a good night.\n[[loc-rationhall|Hollam's]] — the great store. Six floors, everything on the household account, a free surgery on five. The porters will not let you carry anything.\n[[loc-foldingshop|The Folding Shop]] — commission a toy of anything. It gets the parts you did not say. The paper animals have got out.\n[[loc-ganny|Ganny Marle's Cellar]] — a painted sideshow banner and a coin to see THE IMPOSSIBLE CORNER. Something is coming through it.\n[[loc-scarline|The Scar-Line]] — walk where the canyon was. Their assignment, and the thinnest place in the city.\n[[loc-darkwindow|The Dark Window]] — the one unlit window on any street after dark. Knock and be lied to politely.\n\nAlso here, used by [[f-commission|THE COMMISSION]]: [[loc-ossuary|the Ossuary]] and [[loc-setsquare|the Set Square]].",
      "ifthere": "Two pieces are written to be dropped when the night has room for them, and they live in [[f-iftime|IF THERE IS TIME]]: [[b-slip|a slip]], which can happen anywhere at all and takes ninety seconds, and [[enc-ganny|the thing in Ganny's preserves]], which is fifteen minutes and is not a fight unless the party insists.",
      "state": "THE CITY IS DUNLATH AND IT IS RICH. Reach for roaring nineteenth-century midtown rather than anything medieval: plate glass, glass roofs, palms in brass pots, bands, crowds in good coats, a store that delivers to your door in a green van. This world was folded for plenty and the occupation's whole case rests on having delivered it. Nobody here is hungry.\n\nAND THE CITY IS STILL DRESSED FOR A PARTY. Lastlight was a festival — garlands, bunting, stalls, a fair — and the disaster arrived in the middle of it, so none of it has come down. Decorations across every street going slowly brown. A carousel nobody has dismantled. Half-struck stalls. The correct image is a city in party clothes with a hole in it, not a city in mourning, and the decorations are the single fastest way to put that on the table.\n\nIt is the week after. The Cinder Draw was formally closed with garlands, so the best-paid trade in the world ended on a Tuesday and nobody has a job. Eleven people are officially missing and everyone who was there knows the number is wrong. The price of a lamp has doubled, which is the first limit anyone in Dunlath has met in living memory. The town overhead hangs where it has always hung."
    },
    "body": "HOW TO USE THIS. The party has no assigned business in the city except the errand [[npc-wenna|Wenna]] gave them, so this list exists to be pointed at. When they say \"what's around,\" read them three or four of these and let them pick.\n\nNothing here is a quest chain. Each place is a room with something to do in it, and two of them hold a thing that matters later — [[loc-lampoffice|the Lamp Office]] register and the hoard in [[loc-ganny|Ganny's cellar]] — which the party can walk straight past without losing anything. Both are written so that noticing them is a reward and missing them costs nothing." },

  { "schema": 1, "id": "loc-clockface", "type": "location",
    "title": "The Clock Face — the meeting place",
    "parent": "f-locations", "order": 20, "rev": 2,
    "tags": ["city", "comedy"], "leadsTo": [],
    "fields": {
      "looks": "The face of the fallen clock tower lies in the middle of a street it is far too large to be taken out of — twelve feet across, glass gone, the numbers still legible, one hand snapped and the other bent. It came down through three roofs and the city has quietly given up on moving it. Bunting from the festival is still strung across the street above it, and somebody has run a line of it down to the clock and tied it off on the number nine.\n\nCHILDREN HAVE TAKEN THE CLOCK. There are six to ten of them on it at any hour, they have built a fort into the works, there is a rope ladder, and they charge adults a button to climb up. They have rules. The rules are extensive and are explained to anybody who will listen.",
      "who_is_here": "Everyone, eventually. Two coffee stalls and a man selling roast nuts have set up around the rim within a week, and none of them can be moved on because nobody can work out whose job it is. Runners wait here for work. Notices are wedged into the crack across the face. The tea woman pays the children's button toll every single day without comment.",
      "hidden": "Nothing is hidden here, and that is the point of it. This is the one place in the city where the party can be found by somebody who is looking for them, which will matter more than any secret."
    },
    "body": "WHAT THEY DO HERE. Meet people. Leave word. Hire a runner for a coin. Read the notices, which are mostly people looking for people. If the party needs to be found by an NPC — and over a long campaign they will, often — this is where it happens, and using one place for it every time makes the city feel like a place rather than a set of rooms.\n\nIt is also simply a good place to have a conversation, which a table with children in it needs more of than it needs another room with a door." },

  { "schema": 1, "id": "loc-petition", "type": "location",
    "title": "The Petition Rail — where you may say anything",
    "parent": "f-locations", "order": 30, "rev": 1,
    "tags": ["city", "registry"], "leadsTo": [],
    "fields": {
      "looks": "A brass rail outside the Registry, polished to a shine by a lifetime of hands, with a canvas awning over it and a clerk's desk at either end. Anyone at all may take the rail and say their grievance out loud. A human clerk writes down every word, reads it back, thanks them sincerely, and files it.",
      "who_is_here": "The queue, which today runs the length of the street and around the corner. Clerks who are unfailingly kind and slightly hollowed out. A hoarse man near the front who is here every single week and says the same thing: that the Fold is the best thing that ever happened to anybody, and that not one word of that explains why no human sits at any table where anything is decided.",
      "hidden": "Nothing has ever come of a petition. Not one, in a lifetime of them. The clerks do not know this, because each of them only sees their own share, and the filing is genuine — the words go into a real archive that is really kept. It is simply that the archive is where petitions are for."
    },
    "body": "WHAT THEY DO HERE. Formally demand anything, and be taken completely seriously. The most useful thing a party can do at this rail in Act One is get a name added to the count of the missing, which is exactly what [[npc-sela|Sela Orrin]] cannot do on her own and what the party's badges make possible in an afternoon.\n\nIt works, slowly, and it costs nothing, and every word said at the rail is written down with the speaker's name on it. Let that sit without comment.\n\nThe queue is its own resource: it is eleven days long, everyone in it is angry and talking, and it is the best place in the city to hear what people actually think. A man near the front will trade his place for a favor." },

  { "schema": 1, "id": "loc-lampoffice", "type": "location",
    "title": "The Lamp Office — where the city buys light",
    "parent": "f-locations", "order": 40, "rev": 3,
    "tags": ["city", "sunsalt", "clue"], "leadsTo": [],
    "fields": {
      "looks": "A showroom rather than a shop: a long polished counter, lamps displayed in lit racks from the plain to the frankly ostentatious, spare glass, wicks, grain-lanterns, and a card in the window advertising a model with a shade of colored glass that nobody needs and half the street has bought. Behind the counter, a slate board painted in two columns and updated every week by hand.\n\nSince the Draw closed, the price has doubled and there is a limit of one lamp per household, chalked on the door in a hand that was angry when it wrote it. This is the first limit anyone in Dunlath has met in living memory and the street is taking it very badly.",
      "who_is_here": "A queue that has become a small civilization, because these people have never queued for anything and have decided to do it properly. A man near the front has brought a folding table, a cloth, and lunch. Two women have hired boys to hold their places and the boys have unionized and are now charging double. Somebody is auctioning his position out loud and is up to nine coins. A clerk is doing his best.",
      "hidden": "THE COLUMNS DO NOT MATCH. The left column is what came down from the Hearthspire this week. The right is what was issued to households. The right is smaller, and not by a little, and the gap has been there every week the board has been kept. The clerk has never added them, because the two columns are two different jobs and nobody has ever asked him to compare them."
    },
    "body": "WHAT THEY DO HERE. Buy light, fuel and spare glass — genuinely useful, and this is also where the Compass Spirit will eat later, so the party will come back.\n\nTHE CLUE, AND HOW TO PLAY IT. The slate is on the wall in plain sight. A player who reads it and does the arithmetic finds a shortfall the clerk cannot explain and is not hiding. Do not push it, do not have anyone react, and do not let the clerk turn out to be in on anything — he is not. If nobody looks at the board, nothing is lost.\n\nWhat it is worth later: this is [[npc-hettie|Hettie Sarn]]'s entire case, sitting on a wall for free. What the Reactors take in has never matched what comes out refined. When she finally opens her ledger and turns it around, a party that read this board already knows she is right, and the scene becomes a confirmation instead of a lecture." },

  { "schema": 1, "id": "loc-sixtyone", "type": "location",
    "title": "Sixty-One Pairs — the crease-salvage shop",
    "parent": "f-locations", "order": 50, "rev": 1,
    "tags": ["city", "shop"], "leadsTo": [],
    "fields": {
      "looks": "A deep narrow shop with sixty-one unmatched boots hanging from the ceiling on strings, each waiting on a partner that has not turned up. Everything on the shelves came out of a crease at some point: objects that arrived folded and did not entirely open again, half a chair, a kettle that is also a little bit of a different kettle, a pair of spectacles with one lens that shows the room slightly earlier.",
      "who_is_here": "The owner, who buys by weight and sells by the story, and who has never once been through a crease herself and is not curious about doing so.",
      "hidden": "She pays cash for anything brought back out of a crease, no questions, better than anyone else in the city. She is not an agent of anybody. She simply has the only market for it, because everyone else is frightened of the stuff."
    },
    "body": "WHAT THEY DO HERE. Rummage — give each hero one roll and let them turn up something strange; the stock is a licence to hand out oddities without them being magic items. Buy cheap gear. And, once they start going into creases, SELL, which makes this the party's first reliable buyer and gives crease-diving an economy.\n\nThe boots are the point of the shop and worth describing every visit. Sixty-one things that arrived without their other half is the Folding stated as a joke, and a table full of children will start looking for matches." },

  { "schema": 1, "id": "loc-longtable", "type": "location",
    "title": "The Long Table — the Draw crews' eating house",
    "parent": "f-locations", "order": 60, "rev": 2,
    "tags": ["city", "hub", "comedy"], "leadsTo": [],
    "fields": {
      "looks": "A handsome, prosperous chophouse — good dark timber, brass fittings, a coal fire, and one enormous table running the whole length of the room, laid for sixty with proper plates. These were the best-paid workers in the world and they ate like it. Rooms upstairs, good ones. By the door, on a hook, a garland from the closing ceremony that nobody has taken down and nobody will touch.\n\nAND THEN: roughly half the room is dressed as clowns. Full white greasepaint, red noses, the whole business, and several of them are carrying marching-band instruments they cannot play. The other half are dressed as bakers — tall white hats, aprons, flour on everything. Along one wall stands a knot of men in mismatched salvaged armor, and one of them is wearing a saucepan on his head, and he is arguing with a baker.\n\nEvery one of them is enormous and still has coal dust in the creases of his hands.",
      "who_is_here": "The Cinder Draw's crews, four days unemployed and retraining at speed, in two factions and a splinter group. THE CLOWNS want to start a circus. THE BAKERS want to start a bakery. Both have already spent money on the outfits, which is precisely why neither can back down. The argument is conducted at full volume across the length of the table and has been running since Thursday.\n\nThe cook has fed all of them since they were apprentices and is the closest thing the room has to a mayor.",
      "hidden": "The hiring board by the kitchen door, which for a lifetime was the busiest board in the city, is empty. Everyone in the room can see it from where they are sitting, and nobody is looking at it."
    },
    "body": "WHAT THEY DO HERE. Eat extremely well, sleep upstairs, and hear absolutely everything — this is the rumor hub, and any news the party needs can arrive at this table without contrivance.\n\nHOW TO PLAY THE ROOM. The argument stops dead when strangers walk in. Then both factions immediately try to recruit the strangers, at once, over each other. A party that takes a side will be hugged. A party that refuses to take a side will be pursued to the door. Do not explain the joke — it is a room full of enormous filthy men in clown makeup shouting about pastry, and it explains itself from the doorway.\n\nTHE MEN IN ARMOR. A dozen or so, in breastplates cut from ore-cart panels and helmets with the lamp brackets still bolted on, and one saucepan. They think both factions are being ridiculous and want to form a guard company. Unlike the other two, they can actually do the job: these are people who spent thirty years inside the exact canyon the party has been sent to walk the rim of, and they know it better than any map exists for. THEY ARE HIREABLE, cheaply, and they will take it desperately seriously. Four more names the party becomes responsible for.\n\nTHE FAST FAVOR. The cook's brother is at [[loc-petition|the petition rail]] again, several drinks in, working up to saying the thing that gets a man written down, and she would like somebody to walk him home. Five minutes, no dice unless the party wants them.\n\nWHAT IS UNDERNEATH. Nobody in this room has any idea what to do and all of them are doing something. The garland is still on the hook. Play the comedy completely straight and do not undercut it with a sad beat; the sadness is already in the costumes." },

  { "schema": 1, "id": "loc-rationhall", "type": "location",
    "title": "Hollam's — the great store",
    "parent": "f-locations", "order": 70, "rev": 3,
    "tags": ["city", "registry", "affluence"], "leadsTo": [],
    "fields": {
      "looks": "A department store, six floors of one, and the grandest building on the street. Plate glass windows dressed for the festival and not yet changed. A central well with a glass roof over it and palms in brass pots on every landing. Counters for gloves, boots, cloth, lamps, luggage, toys, furniture, guns for sport, and a tearoom on four with a string trio in it. A cage lift with a boy in a red coat who announces the floors.\n\nEverything is charged to the household account, which every household in Dunlath has and nobody thinks about, and the goods follow you home in a green van.",
      "who_is_here": "Half the city, in their good coats, because Hollam's is somewhere to be seen as much as somewhere to buy. Shopgirls behind every counter. Two dozen uniformed porters in green, who are the most determined people in the building.",
      "hidden": "The account is a file. Every purchase, every delivery, and every visit to the surgery on five is entered under a name with a date, in front of the person concerned, because the record is what makes the account work. It is an entirely honest business and it holds a complete history of everyone in the city."
    },
    "body": "WHAT THEY DO HERE. Buy anything at all — this is where the party equips, and it is a genuine pleasure to shop in. There is also a very good surgery on the fifth floor, free with the account, with a real surgeon and no waiting, which is where a hurt party goes.\n\nTHE JOKE, visible from the door: THE PORTERS WILL NOT LET THEM CARRY ANYTHING. A porter takes a parcel out of a hero's hands mid-sentence. Refuse and a second porter is fetched to assist with the difficulty. Walk out with something and three of them follow the party down the street carrying it, at a respectful distance, and are still there an hour later. They will carry a drawn sword. They will carry the party's lunch. Getting away from them is a genuine problem the players have to solve, and the solution is never rudeness, because rudeness does not work on them at all.\n\nWHAT IT COSTS. Their injuries are on a file with dates, and so is everything they bought and where it was sent. Nothing comes of this in Act One. It comes up in Act Two, when somebody produces the dates and asks where they were.\n\nWHY IT MATTERS NOW. This is why [[npc-tobin|Tobin]]'s hands are worth more than they look. A party that decides on its own that it would rather not be written down has understood the occupation better than any speech could teach them, and they will have decided it inside a lovely shop that was nothing but kind to them.\n\n⚠ OPEN QUESTION FOR JOBY. Whether this is universal plenty administered as a right, or a rich market society with the supports dressed up as service, is undecided. Hollam's is written to read as either and nobody in Dunlath could tell you which. Settle it when it matters." },

  { "schema": 1, "id": "loc-wintergarden", "type": "location",
    "title": "The Winter Garden — the pleasure palace",
    "parent": "f-locations", "order": 75, "rev": 1,
    "tags": ["city", "affluence", "comedy", "hub"], "leadsTo": [],
    "fields": {
      "looks": "An enormous glass house of a building, lit up like a lantern from the street, and audible from two blocks away. Inside: full-grown palms in tubs, a floor of dining tables under the glass, a bar sixty feet long with a mirror behind it, a bandstand with an actual band on it, and a stage at the far end where a woman is singing something everybody knows. Garlands and bunting from Lastlight still up, going brown, and nobody has taken them down because nobody has decided the festival is over.\n\nUp the iron stairs is the gallery, and the gallery is games: skittles, a shooting gallery with tin ducks, ring toss, a strength machine with a bell on top, mechanical boxes that do a thing for a coin. Past the gallery, behind a curtain, are the card rooms and a wheel.",
      "who_is_here": "Everybody, loudly, at all hours. Families early, crews late. Waiters at a run. A doorman the size of a wardrobe who is very polite. Children are welcome on the floor and the gallery and are absolutely not permitted past the curtain, which is of course the only part any child wants to see.",
      "hidden": "Nothing sinister. It is exactly what it looks like, which in this campaign makes it restful. The one thing worth knowing is that the wheel is honest and the house still wins, and a hero who works out why has learned something useful about the whole world."
    },
    "body": "WHAT THEY DO HERE. Eat, drink, sleep upstairs, and — mainly — PLAY. This is the room where the boys get to do things rather than hear things, and it should be stocked with more games than the party can get through in a night. Everything is a d20 against a number: ring the bell on the strength machine, beat 14. Knock down nine tin ducks, beat 12. The skittles champion of the house is an eleven-year-old girl and she will take anybody on.\n\nBEHIND THE CURTAIN. Cards and a wheel, and the party is old enough and rich enough to be let through. Keep it simple and keep it short — one roll, win or lose, no systems. The point is the room, not the economy.\n\nWHY THIS PLACE EXISTS. There was no proper tavern in Dunlath and the city needed a heart that is loud and warm and full of light. It is also the correction to a drift: the campaign had become entirely somber, and this is the room that proves the world is worth saving. Let the party have a good night here early, so that everything that happens later has something to be measured against.\n\nRUN IT FESTIVE. The decorations are still up, the band does not stop, and the city has decided, without anybody saying so, that the party is not over yet." },

  { "schema": 1, "id": "loc-foldingshop", "type": "location",
    "title": "The Folding Shop — a Surveyor that makes toys",
    "parent": "f-locations", "order": 80, "rev": 2,
    "tags": ["city", "surveyors", "comedy"], "leadsTo": [],
    "fields": {
      "looks": "A single small room off a side street with a workbench and stacks of plain paper, and it is no longer tidy, because the animals got out. There are paper birds on every rafter, dozens of them, shuffling and resettling. A paper horse has been walking into the same wall for a week. A paper dog follows every customer to the door and stops dead at the threshold, every time, and looks up. A fish is doing lengths of the room near the ceiling. Everything for sale costs one coin.",
      "who_is_here": "A Surveyor, which is not on ministry business and is not stationed here. It keeps the shop because it likes to. It is delighted to be visited and is very good with children, allowing for the half-second delay on every expression.",
      "hidden": "It keeps the coins in a jar and has no use for them whatsoever. It does not know what it is saving them for and finds the question interesting when asked. Ask it what it does when the shop is shut and it says, truthfully, that it folds. It has stopped trying to catch the birds and is not troubled by any of it."
    },
    "body": "WHAT THEY DO HERE. Commission a toy. Describe anything at all and it will fold it while they wait, in one unbroken motion, for one coin — and it will get the parts right that they did not describe, because it was listening to how they said it rather than what they said. A hero who asks for \"a dog\" gets their own dog, the one from when they were small, and will not be able to explain how.\n\nThis is where the bird in [[b-comm-6|Rab's hands]] was made, at the fair, the day before.\n\nHOW TO PLAY IT. Warm, generous, and slightly too accurate. The horror in the Surveyors is never cruelty; it is that they are better at knowing you than you are comfortable with, and they use it to be kind. A table that loves this shop is a table that will feel Act Two properly." },

  { "schema": 1, "id": "loc-ganny", "type": "location",
    "title": "Ganny Marle's Cellar — THE IMPOSSIBLE CORNER, one coin",
    "parent": "f-locations", "order": 90, "rev": 2,
    "tags": ["city", "wrinkle", "clue", "comedy"], "leadsTo": [],
    "fields": {
      "looks": "A sideshow, run out of a house. There is a painted banner nailed across the whole front of the building — THE IMPOSSIBLE CORNER, in four colors, with an artist's impression that is wildly inaccurate — a lamp over the door, and a boy on a box outside doing the patter. One coin gets you down six steps into the cellar and a look through a hand-sized hole in the back wall.\n\nThrough the hole the cellar does not meet itself. The far corner is about two feet further away than the near one says it should be, and there is a draught coming out of it that smells of somewhere else.",
      "who_is_here": "Ganny Marle, eighty, in a good hat, entirely uninterested in what the wrinkle is or what it means and extremely interested in the coin. The boy outside, who is her grandson and is on commission.\n\nDIRECTLY ACROSS THE STREET: her neighbor has painted a bigger banner — A BETTER HOLE, HALF PRICE — and he does not have a hole. He has never had a hole. The banners have been escalating for a month and both of them are now running out of wall.",
      "hidden": "Something small has been coming through at night and eating her preserves, and she has not mentioned this to anybody because she does not want the ministry in her cellar. It has a hoard behind the wall. See [[enc-ganny|the thing in Ganny's preserves]]."
    },
    "body": "WHAT THEY DO HERE. Pay a coin and look, which is worth doing on its own — this is the first time most of the party will have seen a wrinkle up close and had time to study it, rather than being in a fight beside one.\n\nThen, if there is room in the night, [[enc-ganny|the preserves]]. Fifteen minutes, and the thing that comes out of the hole is not a fight unless the party makes it one.\n\nWHY THIS PLACE EXISTS. It is cheap, it is weird, and it is exactly the sort of thing children ask to go back to. It also quietly establishes that the fold has small holes in it all over the city, which is the fact the whole of Act One is built on and which nobody has to say out loud." },

  { "schema": 1, "id": "loc-scarline", "type": "location",
    "title": "The Scar-Line — where the canyon was",
    "parent": "f-locations", "order": 100, "rev": 1,
    "tags": ["city", "act1", "assignment"], "leadsTo": [],
    "fields": {
      "looks": "A line in the earth running the length of the city, arrow-straight, where two days ago there was a canyon with bridges and refinement towers descending out of sight. On one side of the line the grass is one green. On the other side it is another. A stream runs up to the line and does not quite meet itself on the far bank. A crow flies across and skips.",
      "who_is_here": "People, walking out to look at it the way people visit a grave — Draw families mostly, standing at the line and not saying much. No fence, no guard, and no ceremony now the garlands are down.",
      "hidden": "Where the stream fails to meet itself is the thinnest place in the city, and a hero who follows the water rather than the line will find it. It is not a way in. It is proof that a way in is possible, and it is the strongest argument the party can carry back to anybody."
    },
    "body": "WHAT THEY DO HERE. This is the errand [[npc-wenna|Wenna]] gave them, and it is a real place to walk around in rather than a punishment for following orders. Let them spend an hour on it. There is a great deal to notice and none of it requires a roll.\n\nWHAT IT IS NOT. It is not a way into the fold. It was closed two days ago by Rectors in front of the entire city and it is shut. That is the point of the assignment, and [[npc-tobin|Tobin]] said so before they set out.\n\nWHAT THEY GET ANYWAY. The stream, the two greens, and the crow. A party that pays attention leaves with the beginnings of a working theory about where the fold is thin, which is worth more than the errand was ever meant to give them." },

  { "schema": 1, "id": "loc-darkwindow", "type": "location",
    "title": "The Dark Window — the one unlit house",
    "parent": "f-locations", "order": 110, "rev": 1,
    "tags": ["city", "red-flag"], "leadsTo": [],
    "fields": {
      "looks": "After nightfall every window on every street in the city burns sunsalt, because light is the gift and the gift is free and refusing it would be strange. On any long street there is one window that does not. Behind the glass there is a small honest yellow flame of a kind most people in this city have never seen, and would not recognize as fire if asked.",
      "who_is_here": "Whoever answers the door: polite, unhurried, and frightened in a way that is easy to miss. They will say they have run out of lamp oil and that it is being seen to, and they will not invite anybody in.",
      "hidden": "It is a tallow candle. Tallow is not illegal and never has been — it is simply archaic, a thing the world has almost forgotten how to make, and no authority has ever thought to look for a house that refuses the gift rather than demanding more of it. The dark window is not a signal. It is an argument, addressed to nobody, and it has stayed safe for a generation precisely because nobody has worked out what it means."
    },
    "body": "WHAT THEY DO HERE. Notice it, which costs nothing and requires no roll — any hero who thinks to count windows on a dark street finds one. Then knock, if they like, and be lied to politely.\n\nHOW TO SEED IT. Mention one unlit window, once, in passing, on a night when the party is walking home from something else. Do not draw attention to it. Do not have anybody watch them from it. If they ask, the answer is lamp oil, and the door closes.\n\nWHEN IT PAYS OFF. Whenever you want. The party will meet Red Flag properly through [[npc-tobin|Tobin]] and eventually [[npc-hettie|Hettie Sarn]], and on the day somebody finally explains what an Unlit house is, a table that has already knocked on one will get there a beat ahead of the explanation.\n\nDO NOT let any authority investigate a dark window. The moment somebody in the ministry decodes it, the whole arrangement collapses and Red Flag stops being able to exist in plain sight." },

  { "schema": 1, "id": "f-iftime", "type": "folder",
    "title": "IF THERE IS TIME — fast pieces",
    "parent": "act1", "order": 30, "rev": 1,
    "tags": ["act1", "optional"], "leadsTo": [], "fields": {},
    "body": "Short material to deploy when a session has room and skip when it does not. Nothing in here is load-bearing and nothing in here has to happen.\n\n[[b-slip|A slip]] — ninety seconds, anywhere at all, no preparation.\n[[enc-ganny|The thing in Ganny's preserves]] — fifteen minutes, at [[loc-ganny|Ganny Marle's cellar]], and it plants something worth calling back to." },

  { "schema": 1, "id": "b-slip", "type": "beat",
    "title": "A slip — drop it anywhere",
    "parent": "f-iftime", "order": 10, "rev": 1,
    "tags": ["act1", "optional", "droppable"], "leadsTo": [],
    "fields": {
      "hook": "For about a minute and a half, somewhere perfectly ordinary stops meeting itself. Then it stops, and the door is a door again. It can happen in any room, on any street, at any point in any session, and it needs no preparation whatsoever.",
      "read_aloud": "Improvise from whatever is actually in the room. Three that work: \"The door you came through lets you out onto a street you know, three streets from the one you are on.\" · \"Going up, the stair has one step too many. Coming down, it has one too few. It does this twice more and then stops.\" · \"Somebody in the next room answers a question none of you asked, in a voice one of you knows.\"",
      "if_they": "…investigate immediately, give them the full ninety seconds and let them get somewhere genuinely interesting — a wrong street, a room in a house nobody lives in — and then close it while they are still inside, and let them walk home the long way. Nobody is hurt by a slip. The fold is loose, not hostile.\n\n…ignore it, so does everybody else. People in this city have lived with slips their whole lives and treat them the way other worlds treat a draught.\n\n…ask an adult about it, they get the settling-joke: the world is still lying down, love, it does that.",
      "outcome": "Nothing, most of the time, which is what makes it safe to use as often as you like. It costs no plot and buys atmosphere, and children will begin testing every doorway in the city, which is the correct response."
    },
    "body": "WHY IT IS WORTH HAVING. It is the campaign's whole cosmology delivered as a toy, it takes no preparation, and it can be dropped into a lull in any scene ever written.\n\nTHE CLUE IT PLANTS, IF YOU WANT IT. Slips cluster. They come in the days after a great pull of sunsalt, and a party that starts noting when they happen will eventually notice the pattern on their own. That is [[npc-hettie|Hettie Sarn]]'s ledger arriving through play rather than through a speech: when she finally opens the book and turns it around, the party is confirming something they already suspected instead of being told something new.\n\nTo use it that way, run slips deliberately rather than randomly — a cluster of two or three in the days after the Hearthspire draws, and none in the quiet weeks. Nobody needs to comment on it.\n\nESCALATION. Slips get more frequent as Act One goes on. That is not decoration; it is the same fact as everything else that is getting worse, and it needs no explanation at the table." },

  { "schema": 1, "id": "enc-ganny", "type": "encounter",
    "title": "The thing in Ganny's preserves",
    "parent": "f-iftime", "order": 20, "rev": 1,
    "tags": ["act1", "optional", "clue"], "leadsTo": [],
    "fields": {
      "setup": "[[loc-ganny|Ganny Marle]] mentions, once the party has paid their coin and had their look, that something has been at her preserves. Six jars in a fortnight, the lids off and set aside neatly rather than broken. She has not told the ministry because she does not want the ministry in her cellar.\n\nWait in the dark for twenty minutes of game time and something comes through the wrinkle.",
      "creatures": "One [[cr-snatch-goblin|snatch-goblin]] kit — knee-high, thin, and by itself. Use the sheet's numbers if it comes to dice, but halve the hit points and give it no interest whatsoever in fighting. It wants the jam. It is frightened of everything and it is very fast.",
      "tactics": "It is not an ambush and it does not attack. It freezes, it hides badly, and it bolts for the hole the moment anyone moves quickly. Anything the party does that is loud or sudden sends it back through the wrinkle, and it does not come back that night.\n\nWays this can go, all of them fine: corner it, catch it in a sack or a coat, feed it and watch what happens, block the hole and talk to it, follow it through the wrinkle before it closes, or kill it. If they are gentle it becomes almost tame within the hour, which children will find far more interesting than a corpse.",
      "reward": "THE HOARD, behind a loose stone in the cellar wall, and they find it whether the kit lives or dies. It is a magpie's pile of shiny nothing: buttons, three spoons, a bootlace, a brass curtain ring, a good deal of broken glass.\n\nAnd one thing that does not belong. Something that was on a person at the fairground two days ago — a garland ribbon in the Draw's colors, a child's shoe, a lamplighter's brass key. Something the party can recognize."
    },
    "body": "THE POINT OF THIS, and why it is worth fifteen minutes: the wrinkle in an old woman's cellar and the tear at the foot of the Hearthspire open into the same place.\n\nThat is a real, concrete, physical clue delivered by a goblin stealing jam, and it does three things at once. It proves [[npc-tobin|Tobin]]'s suspicion before he has earned the right to say it out loud. It tells the party that the way in does not have to be a great seam that Rectors are watching — the city is full of small holes. And it makes the thing they saw at the fairground personal again, because whatever is in that hoard belonged to somebody who is on the far side of it right now.\n\nHOW HARD TO PUSH. Not at all. Put the object in the pile and describe the pile. If nobody picks it up, [[npc-tobin|Tobin]] does, and writes it down, and says nothing — and the party can find it in his notes later, which is arguably better.\n\nIT IS NOT A FIGHT. The scoreboard of this campaign is rescues rather than kills, and this is the first chance after Lastlight to teach that with something small and frightened instead of something dangerous. A party that catches the kit in a coat and feeds it has learned more about how these sessions work than a party that rolls initiative." },

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
    "parent": "f-npcs", "order": 20, "rev": 3,
    "tags": ["act1", "registry", "red-flag"], "leadsTo": [],
    "fields": {
      "looks": "Young, inky, over-neat; carries a satchel of forms the way other men carry shields. Has never been in a fight and stands like it.",
      "wants": "To do his job well — he has never once done a job badly — and to find out what happened to Ellum Wick, which are no longer the same ambition and have not been for about four months.",
      "voice": "Apologetic precision. Clears his throat before bad news, and writes down what he sees, accurately, every night. When he says something dangerous he says it once, quietly, badly, and then apologizes for saying it.",
      "secret": "THREE, discovered in this order, and the order is the whole design. FIRST, he is a mender — his grandmother's outlawed art, her hearth-spirit riding in a wooden darning egg in his coat pocket — which surfaces in the first bad fight and hands the party a secret to keep FOR him. SECOND, he files nightly to a Registry office above Wenna's head that she has never dealt with, which is a secret he kept FROM them. THIRD, he copies those filings to a house with a dark window, and has done since he read the last legible page of Ellum Wick's field book.\n\nHe is a double agent and both sets of books are honest, because he is incapable of writing anything down wrong. He does not think of himself as Red Flag. He thinks of himself as a careful man who has checked the arithmetic twice and cannot make it come out."
    },
    "body": "Assigned to the party in [[b-comm-5|beat 5 of THE COMMISSION]], under the Accord's clause that no expedition enters the creases without a clerk to keep the record. Introduce him as an inconvenience. Through Act One he is the party's healer, and the inversion should be enjoyed: the ministry's watcher is the reason its quarry keeps getting back up.\n\nWHY HE IS ALREADY HALFWAY GONE (changed 2026-08-11). The campaign needs somebody who can put Red Flag's case to the party as a liberation fight rather than as the terrorism the Set Square describes, and it needs that in session two rather than session ten — otherwise the ministry's account stands unopposed for a third of the act. Tobin is that voice. He does not preach and he does not recruit; he asks one question at a time, and each one is a number that does not add up.\n\nHIS FIRST QUESTION, on the road out of [[b-comm-5|Wenna's room]]: they closed the Cinder Draw yesterday morning in front of the whole city, so why are we being sent to the one seam everybody watched them shut? He will not say the words goose chase and he will not say Red Flag. That question is the entire on-ramp.\n\nPLAYING THE BALANCE. He must stay likeable, useless in a fight, and easy to protect, because the children should own his safety long before they own his politics. Let them push him either way: a party that argues the ministry's case at him can genuinely slow him down, and a party that pushes will get further, faster, than anybody intended. He is not load-bearing — Red Flag reaches the party through [[npc-hettie|Hettie Sarn]] regardless, and Ellum's satchel can be found by anyone." },

  { "schema": 1, "id": "npc-finch", "type": "npc",
    "title": "Finch — the lamplighter",
    "parent": "f-npcs", "order": 30, "rev": 3,
    "tags": ["act1", "taken"], "leadsTo": [],
    "fields": {
      "looks": "Seven years old, best shirt, gap-toothed grin; was waving to the whole city right up until the sky reached out.",
      "wants": "To go home.",
      "voice": "Not yet — he is the face at the top of the rescue list, and for a whole day he is not even a name.",
      "secret": "⚠ THE PARTY DOES NOT LEARN HIS NAME UNTIL HIS MOTHER SAYS IT. He is never named at the ceremony, never named in the dust, and never named by any official in the Set Square, because the ministry counts to eleven and does not distinguish among them. His name reaches the table for the first time in [[b-comm-6|the last beat of THE COMMISSION]], on a step outside, from [[npc-sela|Sela Orrin]], twenty-four hours after they watched him be taken. Keep it off the table until then; the whole scene is built on it.\n\nHe is not declared anything, and that is the point. He is one of eleven, in a number the ministry settles on by evening, and no official says his name in the party's hearing at any stage. In truth the first monster through the tear carried him off alive, best shirt, glass reliquary and all, in front of ten thousand people."
    },
    "body": "Chosen by lottery to set the reliquary of the Cinder Draw's last crust into the Hearthspire's offering chamber. The tear ripped down the tower's face to the chamber; he outran the falling clock tower by a step and was taken by the first thing through. The party watched it happen, which makes them witnesses to something the state has since reduced to arithmetic.\n\nHis mother is [[npc-sela|Sela Orrin]] and his younger brother is Rab, five, who gives the party a paper bird in [[b-comm-6|the last beat of THE COMMISSION]]. Appears in: [[f-lastlight|LASTLIGHT]] (unnamed) and [[f-commission|THE COMMISSION]] (named, once, by his mother)." },

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
