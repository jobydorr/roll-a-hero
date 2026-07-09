/* Roll a Hero — a starter bestiary for the Dungeon Master OS.

   COMMITTED and PUBLIC, like data.js / campaign.js. Everything here is drawn from
   the 5e SRD, which is released under Creative Commons (CC-BY-4.0) — so it is
   legal to ship in a public repo. Stats are SRD-accurate; the flavour is reworded
   into this app's friendly, kid-safe voice.

   The COPYRIGHTED books (Monster Manual, etc.) are NOT here and never will be —
   they stay gitignored and local. To add a monster from those, ask in Cowork:
   I read the local book and write you an ORIGINAL, reworded creature into this
   file or your personal library. Only the derived stat block ships; the book's
   text never does.

   Loaded by dm.html with a <script> tag. The DM OS reads window.DM_BESTIARY and
   merges it with your personal library (saved in your browser only). Each field
   maps straight onto a creature document's fields. */
window.DM_BESTIARY = {
  creatures: [
    {
      id: "srd_goblin", name: "Goblin", tags: ["humanoid", "small"],
      hp: "7", ac: "15", speed: "30 feet",
      attack: "+4 to hit, 1d6+2 (scimitar or shortbow)",
      trick: "Nimble Escape — it can Disengage or Hide as a bonus action, so it darts in and out of cover.",
      notes: "Cowardly alone, dangerous in numbers and tunnels. Usually flees once the fight turns against it."
    },
    {
      id: "srd_wolf", name: "Wolf", tags: ["beast"],
      hp: "11", ac: "13", speed: "40 feet",
      attack: "+4 to hit, 2d4+2 — and the target must beat 11 or be knocked to the ground.",
      trick: "Pack Tactics — it attacks with advantage whenever one of its packmates is next to the target.",
      notes: "Hunts in a pack; tries to surround and trip the weakest-looking hero."
    },
    {
      id: "srd_giant_rat", name: "Giant Rat", tags: ["beast", "small"],
      hp: "7", ac: "12", speed: "30 feet",
      attack: "+4 to hit, 1d4+2 (bite).",
      trick: "Pack Tactics — advantage when a packmate is beside the target.",
      notes: "Comes in swarms out of cellars and sewers. Scary in a pack, harmless alone."
    },
    {
      id: "srd_skeleton", name: "Skeleton", tags: ["undead"],
      hp: "13", ac: "13", speed: "30 feet",
      attack: "+4 to hit, 1d6+2 (shortsword or shortbow).",
      trick: "Falls to a heap of bones at 0 HP — no getting back up. Takes extra damage from a good bludgeoning hit.",
      notes: "Mindless; does exactly what it was last told. Rattles menacingly, feels no fear."
    },
    {
      id: "srd_zombie", name: "Zombie", tags: ["undead"],
      hp: "22", ac: "8", speed: "20 feet",
      attack: "+3 to hit, 1d6+1 (slam).",
      trick: "Undead Fortitude — when it drops, it beats a save of 5 + the damage taken or clings to 1 HP (unless the blow was radiant).",
      notes: "Slow, clumsy, and hard to put down for good. Just keeps shambling forward."
    },
    {
      id: "srd_bandit", name: "Bandit", tags: ["humanoid"],
      hp: "11", ac: "12", speed: "30 feet",
      attack: "+3 to hit, 1d6+1 (scimitar) or +3, 1d8+1 (light crossbow).",
      trick: "Not brave — surrenders or runs once about half of them are down.",
      notes: "Roadside trouble, in it for coin, not a cause. A good scare often ends the fight."
    },
    {
      id: "srd_guard", name: "Guard", tags: ["humanoid"],
      hp: "11", ac: "16", speed: "30 feet",
      attack: "+3 to hit, 1d6+1 (spear).",
      trick: "Calls for backup — shouts, and more guards arrive in a round or two.",
      notes: "Town watch: armoured and disciplined, but not looking to die for the job."
    },
    {
      id: "srd_giant_spider", name: "Giant Spider", tags: ["beast"],
      hp: "26", ac: "14", speed: "30 feet, climb 30 feet",
      attack: "+5 to hit, 1d8+3 plus poison — the target beats 11 or takes 2d8 poison (half on a success).",
      trick: "Web — once per turn it can restrain a target (beat 12 to break free). It walks its own webs freely.",
      notes: "Drops from the ceiling, webs a hero, and drags them off. Hates fire."
    },
    {
      id: "srd_orc", name: "Orc", tags: ["humanoid"],
      hp: "15", ac: "13", speed: "30 feet",
      attack: "+5 to hit, 1d12+3 (greataxe).",
      trick: "Aggressive — as a bonus action it can dash straight toward an enemy it can see.",
      notes: "Charges the nearest fight with a roar. Big swings, little patience."
    },
    {
      id: "srd_black_bear", name: "Black Bear", tags: ["beast"],
      hp: "19", ac: "11", speed: "40 feet, climb 30 feet",
      attack: "+3 to hit, 1d6+2 (bite) and +3, 2d4+2 (claws).",
      trick: "Keen Smell — it notices hidden or unseen creatures nearby by scent.",
      notes: "Not evil — just hungry or protecting cubs. Usually leaves if given room."
    },
    {
      id: "srd_ogre", name: "Ogre", tags: ["giant", "big"],
      hp: "59", ac: "11", speed: "40 feet",
      attack: "+6 to hit, 2d8+4 (greatclub).",
      trick: "Big and slow — it winds up its swings, so a clever hero can read them coming.",
      notes: "A wall of muscle with a short temper and a shorter memory. A real threat to low-level heroes."
    }
  ]
};
