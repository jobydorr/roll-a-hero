/* Roll a Hero — game content, simplified from D&D 5e for brand-new players.
   Everything here is plain-language and tuned for kids + first-time adults.
   Exposed as a global DATA object. */
(function () {

  /* ---------------------------------------------------------------------------
     THE SIX ABILITIES  (blurbs use the user's tomato analogies, verbatim)
  --------------------------------------------------------------------------- */
  const ABILITIES = [
    { key: 'str', name: 'Strength', short: 'STR', icon: 'str',
      blurb: 'Your raw physical power. This is your ability to crush a tomato in your bare hands.' },
    { key: 'dex', name: 'Dexterity', short: 'DEX', icon: 'dex',
      blurb: 'Your agility, reflexes, and hand-eye coordination. This is your ability to dodge a tomato someone throws at you.' },
    { key: 'con', name: 'Constitution', short: 'CON', icon: 'con',
      blurb: 'Your stamina and endurance. This is your ability to eat a completely rotten tomato without getting sick.' },
    { key: 'int', name: 'Intelligence', short: 'INT', icon: 'int',
      blurb: 'Your memory and book smarts. This is knowing that a tomato is scientifically a fruit, not a vegetable.' },
    { key: 'wis', name: 'Wisdom', short: 'WIS', icon: 'wis',
      blurb: 'Your intuition and common sense. This is knowing that, despite being a fruit, a tomato definitely does not belong in a fruit salad.' },
    { key: 'cha', name: 'Charisma', short: 'CHA', icon: 'cha',
      blurb: 'Your charm and force of personality. This is being able to convince someone else to buy a tomato-based fruit salad (also known as salsa).' },
  ];

  /* ---------------------------------------------------------------------------
     "BEAT THIS NUMBER" DIFFICULTY TABLE  (rules-as-written, jargon removed)
  --------------------------------------------------------------------------- */
  // Single-d20 difficulty ladder. Players add their ability modifier (about +1 or +2,
  // more at the DM's discretion) on every tier EXCEPT the top one: Nearly Impossible
  // can only be passed by rolling a natural 20 — modifiers don't help there.
  const DC_TABLE = [
    { label: 'Very Easy', dc: 3, note: 'Almost anyone can do it.' },
    { label: 'Easy', dc: 7, note: 'A simple task.' },
    { label: 'Medium', dc: 11, note: 'Takes some real skill.' },
    { label: 'Hard', dc: 15, note: 'Only the talented manage it.' },
    { label: 'Very Hard', dc: 18, note: 'A heroic feat — you’ll need a great roll!' },
    { label: 'Nearly Impossible', dc: 20, note: 'A natural 20 only — modifiers can’t help here!' },
  ];

  /* ---------------------------------------------------------------------------
     RACES  (all 9 PHB races, collapsed + one simplified signature ability)
     bonuses: ability score increases.  speed in feet.
     choice: an optional sub-decision (Dragonborn ancestry, Half-Elf boosts).
  --------------------------------------------------------------------------- */
  const RACES = [
    {
      id: 'human', name: 'Human', icon: 'cha', speed: 30,
      bonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
      blurb: 'Ambitious, adaptable, and found everywhere. Humans have no single special trick — they are well-rounded heroes who can become anything they set their minds to.',
      signature: { name: 'Jack of All Trades', desc: 'A little bit good at everything — you get +1 to ALL six abilities.' },
      traits: ['+1 to every ability', 'Speak an extra language', 'Adaptable — fits any class'],
      tags: { human: 1 },
    },
    {
      id: 'dwarf', name: 'Dwarf', icon: 'shield', speed: 25,
      bonuses: { con: 2 },
      blurb: 'Short, strong, and stubborn. Dwarves are proud mountain folk who love stone, gold, and a good fight. They make brave, hardy heroes who can take a hit and keep going.',
      signature: { name: 'Dwarven Toughness', desc: 'You can see in the dark, and poison barely affects you.' },
      traits: ['See in the dark (60 ft)', 'Tough against poison', 'Hard to knock around', 'Speed 25 ft'],
      tags: { dwarf: 1 },
    },
    {
      id: 'elf', name: 'Elf', icon: 'dex', speed: 30,
      bonuses: { dex: 2 },
      blurb: 'Graceful, long-lived, and magical. Elves are quick and sharp-eyed, equally at home with a bow, a blade, or a spellbook.',
      signature: { name: 'Fey Senses', desc: 'Sharp senses, you see in the dark, and magic can never lull you to sleep.' },
      traits: ['See in the dark (60 ft)', 'Keen senses — great at noticing things', "Magic can't put you to sleep", 'Rest fully in just 4 hours'],
      tags: { elf: 1 },
    },
    {
      id: 'halfling', name: 'Halfling', icon: 'star', speed: 25,
      bonuses: { dex: 2 },
      blurb: 'Small, cheerful, and surprisingly brave. Halflings are lucky little folk who slip out of trouble, dodge danger, and always seem to land on their feet.',
      signature: { name: 'Lucky', desc: 'When you roll a 1 on a d20, you can re-roll it — and you must keep the new roll.' },
      traits: ['Lucky — re-roll natural 1s', 'Brave — hard to frighten', 'Nimble — slip past bigger creatures', 'Speed 25 ft'],
      tags: { halfling: 1 },
    },
    {
      id: 'dragonborn', name: 'Dragonborn', icon: 'flame', speed: 30,
      bonuses: { str: 2, cha: 1 },
      blurb: 'Proud dragon-people with gleaming scales and a breath of elemental power. Dragonborn are strong, honorable warriors descended from mighty dragons.',
      signature: { name: 'Breath Weapon', desc: 'Once per fight, breathe a blast of energy! Nearby enemies must dodge (roll Dexterity) or take 2d6 damage. You also resist your own element.' },
      traits: ['Breathe elemental energy (2d6)', 'Resist your chosen element', 'Strong and proud'],
      tags: { dragonborn: 1 },
      choice: {
        key: 'ancestry',
        prompt: 'Choose your dragon ancestor — this sets your breath weapon and what damage you shrug off:',
        options: [
          { id: 'red', name: 'Red Dragon — Fire', damage: 'fire', shape: 'a 15-ft cone' },
          { id: 'blue', name: 'Blue Dragon — Lightning', damage: 'lightning', shape: 'a 30-ft line' },
          { id: 'white', name: 'White Dragon — Cold', damage: 'cold', shape: 'a 15-ft cone' },
          { id: 'black', name: 'Black Dragon — Acid', damage: 'acid', shape: 'a 30-ft line' },
          { id: 'green', name: 'Green Dragon — Poison', damage: 'poison', shape: 'a 15-ft cone' },
          { id: 'gold', name: 'Gold Dragon — Fire', damage: 'fire', shape: 'a 15-ft cone' },
        ],
      },
    },
    {
      id: 'gnome', name: 'Gnome', icon: 'int', speed: 25,
      bonuses: { int: 2 },
      blurb: 'Tiny, brilliant, and bursting with curiosity. Gnomes are clever inventors and tricksters who love gadgets, jokes, and magic of all kinds.',
      signature: { name: 'Gnome Cunning', desc: 'Your mind is slippery and sharp — you are very hard to fool with magic that targets your thoughts.' },
      traits: ['See in the dark (60 ft)', 'Clever — resist mind magic', 'Inventive and curious', 'Speed 25 ft'],
      tags: { gnome: 1 },
    },
    {
      id: 'half-elf', name: 'Half-Elf', icon: 'cha', speed: 30,
      bonuses: { cha: 2 },
      blurb: 'Caught between two worlds, half-elves blend human ambition with elf grace. They are charming wanderers and natural diplomats who get along with almost anyone.',
      signature: { name: 'Best of Both Worlds', desc: 'Charming like an elf, adaptable like a human. You pick two more abilities to raise by +1.' },
      traits: ['See in the dark (60 ft)', "Magic can't put you to sleep", 'Charming — great with people', 'Pick two abilities to boost +1'],
      tags: { 'half-elf': 1 },
      choice: {
        key: 'boosts',
        prompt: 'Pick TWO abilities to raise by +1 (besides Charisma):',
        pickTwo: true,
        options: [
          { id: 'str', name: 'Strength +1' }, { id: 'dex', name: 'Dexterity +1' },
          { id: 'con', name: 'Constitution +1' }, { id: 'int', name: 'Intelligence +1' },
          { id: 'wis', name: 'Wisdom +1' },
        ],
      },
    },
    {
      id: 'half-orc', name: 'Half-Orc', icon: 'str', speed: 30,
      bonuses: { str: 2, con: 1 },
      blurb: 'Big, fierce, and unstoppable. Half-orcs are powerful warriors with the muscle to crush their foes and the sheer grit to keep fighting when others would fall.',
      signature: { name: 'Relentless', desc: 'When a hit would drop you to 0 HP, you stay standing with 1 HP instead (once per rest). Your critical hits also deal extra damage!' },
      traits: ['See in the dark (60 ft)', 'Refuse to fall — survive a killing blow', 'Savage crits — extra damage', 'Intimidating'],
      tags: { 'half-orc': 1 },
    },
    {
      id: 'tiefling', name: 'Tiefling', icon: 'flame', speed: 30,
      bonuses: { cha: 2, int: 1 },
      blurb: 'Marked by a fiendish ancestor with horns and a tail, tieflings are bold outsiders who carry a spark of infernal magic — and plenty of attitude.',
      signature: { name: 'Infernal Gift', desc: 'Fire can barely hurt you, and you were born knowing a little magic — you can make harmless flames and sounds at will.' },
      traits: ['See in the dark (60 ft)', 'Resist fire', 'Born with a spark of magic', 'Bold and unforgettable'],
      tags: { tiefling: 1 },
    },
  ];

  /* ---------------------------------------------------------------------------
     CLASSES  (the 4 Basic classes, each with 2-3 simplified archetypes)
     hp: total HP at level 3 BEFORE adding 3x Constitution modifier.
     spell: { listTag, ability, cantrips, leveled, maxLevel, forced } when caster.
  --------------------------------------------------------------------------- */
  const CLASSES = [
    {
      id: 'fighter', name: 'Fighter', icon: 'sword', hitDie: 10, hp: 22,
      primary: ['str', 'dex'], save: 'con',
      armor: { base: 16, label: 'Chain Mail', dexCap: 0 }, // heavy armor, fixed AC
      blurb: 'A master of weapons and armor. Fighters are the toughest front-line heroes — they hit hard, take hits, and never run out of ways to win a battle.',
      bestAbility: 'Strength (or Dexterity) and Constitution',
      features: [
        { name: 'Second Wind', desc: 'Once per fight, catch your breath to heal 1d10 + 3 HP — no magic needed.' },
        { name: 'Action Surge', desc: 'Once per fight, push yourself to take one extra action on your turn (like a second attack!).' },
      ],
      fightingStyles: [
        { id: 'defense', name: 'Defense', desc: '+1 Armor while you wear armor — harder to hit.' },
        { id: 'dueling', name: 'Dueling', desc: '+2 damage when fighting with a single one-handed weapon.' },
        { id: 'archery', name: 'Archery', desc: '+2 to hit with bows and other ranged weapons.' },
        { id: 'great-weapon', name: 'Great Weapon', desc: 'Re-roll 1s and 2s on damage with a big two-handed weapon.' },
      ],
      archetypes: [
        { id: 'champion', name: 'Champion', sub: 'Mighty Champion', grantsSpells: false,
          desc: 'Simple, tough, and deadly. You are a peak athlete whose critical hits land more often.',
          feature: { name: 'Improved Critical', desc: 'You score a critical hit on a roll of 19 OR 20 — not just 20.' },
          tags: { fighter: 2, champion: 3 } },
        { id: 'battlemaster', name: 'Battle Master', sub: 'Battle Master', grantsSpells: false,
          desc: 'A clever tactician. You know special combat maneuvers you can unleash in battle.',
          feature: { name: 'Combat Maneuvers', desc: 'You have 4 maneuver dice (d8). Spend one to Trip, Disarm, Push, or Rally an ally — adding the die to the effect.' },
          tags: { fighter: 2, battlemaster: 3 } },
        { id: 'eldritch-knight', name: 'Spellblade', sub: 'Eldritch Knight', grantsSpells: true,
          desc: 'Sword AND sorcery. You weave a few wizard spells between your weapon strikes — shields, sparks, and bursts of force.',
          feature: { name: 'War Magic', desc: 'You learn a handful of wizard spells (using Intelligence) to boost your fighting.' },
          spell: { listTag: 'ek', ability: 'int', cantrips: 2, leveled: 3, maxLevel: 1, forced: [] },
          tags: { fighter: 2, 'eldritch-knight': 3, hybrid: 3 } },
      ],
      tags: { fighter: 1 },
    },
    {
      id: 'rogue', name: 'Rogue', icon: 'dex', hitDie: 8, hp: 18,
      primary: ['dex'], save: 'dex',
      armor: { base: 11, label: 'Leather Armor', dexCap: 99 }, // light armor, 11 + Dex
      blurb: 'A sneaky, skillful scoundrel. Rogues strike from the shadows for huge damage, slip past danger, and are experts at sneaking, lockpicking, and trickery.',
      bestAbility: 'Dexterity',
      features: [
        { name: 'Sneak Attack', desc: 'When you catch a foe off guard (you have advantage, or an ally is right next to them), your strike deals an extra 2d6 damage!' },
        { name: 'Cunning Action', desc: 'Every turn you can Dash, Disengage, or Hide as a quick bonus action — you are always slippery.' },
        { name: 'Expert', desc: 'You are a true expert at two skills of your choice (like Sneaking and Lockpicking) — extra good at them.' },
      ],
      archetypes: [
        { id: 'thief', name: 'Master Burglar', sub: 'Thief', grantsSpells: false,
          desc: 'Lightning-fast hands and feet. You grab, use, and steal things in a blink, and climb like a cat.',
          feature: { name: 'Fast Hands', desc: 'Use objects, pick locks, or pick pockets super fast — and climb at full speed.' },
          tags: { rogue: 2, thief: 3 } },
        { id: 'assassin', name: 'Assassin', sub: 'Assassin', grantsSpells: false,
          desc: 'Deadly to anyone who never saw you coming. Your first strike against a surprised foe is devastating.',
          feature: { name: 'Assassinate', desc: 'You have advantage against anyone who has not acted yet, and a hit on a surprised foe is an automatic critical!' },
          tags: { rogue: 2, assassin: 3 } },
        { id: 'arcane-trickster', name: 'Trickster Mage', sub: 'Arcane Trickster', grantsSpells: true,
          desc: 'Thievery mixed with magic. You wield an invisible Mage Hand for mischief and learn a few wizard spells to charm, trick, and confuse.',
          feature: { name: 'Mage Hand Legerdemain', desc: 'Your invisible Mage Hand can pick locks and pockets from afar. You also learn wizard spells (using Intelligence).' },
          spell: { listTag: 'at', ability: 'int', cantrips: 3, leveled: 3, maxLevel: 1, forced: ['mage-hand'] },
          tags: { rogue: 2, 'arcane-trickster': 3, hybrid: 3 } },
      ],
      tags: { rogue: 1 },
    },
    {
      id: 'wizard', name: 'Wizard', icon: 'book', hitDie: 6, hp: 14,
      primary: ['int'], save: 'int',
      armor: { base: 10, label: 'No Armor (or Mage Armor)', dexCap: 99 }, // 10 + Dex
      blurb: 'A scholar of true magic. Wizards study a spellbook full of incredible spells — fireballs, shields, illusions, and more. Squishy, but the most flexible spellcaster of all.',
      bestAbility: 'Intelligence',
      spellcaster: true,
      spell: { listTag: 'wizard', ability: 'int', cantrips: 3, leveled: 4, maxLevel: 2, forced: [] },
      features: [
        { name: 'Spellbook', desc: 'You cast spells using Intelligence. You know cantrips you can cast forever, plus stronger spells you use a limited number of times each day.' },
        { name: 'Arcane Recovery', desc: 'Once a day you can take a short rest to recover some of your spent magic.' },
      ],
      archetypes: [
        { id: 'evoker', name: 'Battle Mage', sub: 'School of Evocation', grantsSpells: false,
          desc: 'Raw magical firepower. Your damage spells hit harder, and you can spare your friends from your own blasts.',
          feature: { name: 'Sculpt Spells', desc: 'When you cast an explosive spell, your allies in the blast automatically take no damage.' },
          tags: { wizard: 2, evoker: 3 } },
        { id: 'abjurer', name: 'Shield Mage', sub: 'School of Abjuration', grantsSpells: false,
          desc: 'A master of protection. You weave a magical ward around yourself that soaks up damage and recharges as you cast.',
          feature: { name: 'Arcane Ward', desc: 'A shield of force surrounds you, absorbing damage. It refills whenever you cast a protective spell.' },
          tags: { wizard: 2, abjurer: 3 } },
        { id: 'illusionist', name: 'Illusionist', sub: 'School of Illusion', grantsSpells: false,
          desc: 'Master of tricks and lies. Your illusions are extra convincing and you can reshape them on the fly.',
          feature: { name: 'Improved Illusions', desc: 'You can conjure a small illusion at will, and your illusions can fool even careful observers.' },
          tags: { wizard: 2, illusionist: 3 } },
      ],
      tags: { wizard: 1 },
    },
    {
      id: 'cleric', name: 'Cleric', icon: 'spell', hitDie: 8, hp: 18,
      primary: ['wis'], save: 'wis',
      armor: { base: 14, label: 'Scale Mail + Shield', dexCap: 2 }, // 14 + Dex(max 2) + shield handled in gear
      blurb: 'A holy healer and warrior of the gods. Clerics heal and protect their friends, blast foes with divine power, and can fight in armor on the front line.',
      bestAbility: 'Wisdom',
      spellcaster: true,
      spell: { listTag: 'cleric', ability: 'wis', cantrips: 3, leveled: 4, maxLevel: 2, forced: [] },
      features: [
        { name: 'Divine Spells', desc: 'You cast spells using Wisdom, granted by your god. You heal, protect, and smite with holy power.' },
        { name: 'Channel Divinity', desc: 'Once per fight, call on your god for a special power (it depends on your calling, below).' },
        { name: 'Turn Undead', desc: 'You can also use Channel Divinity to make zombies, skeletons, and ghosts flee in terror.' },
      ],
      archetypes: [
        { id: 'life', name: 'Healer', sub: 'Life Domain', grantsSpells: false,
          desc: 'The greatest healer of all. Your healing spells restore even more HP, and you wear heavy armor to stand strong.',
          feature: { name: 'Disciple of Life', desc: 'Whenever you heal someone with a spell, they get back extra HP. Your Channel Divinity heals a burst of HP to everyone nearby.' },
          tags: { cleric: 2, life: 3 } },
        { id: 'light', name: 'Light-Bringer', sub: 'Light Domain', grantsSpells: false,
          desc: 'A beacon of radiant fire. You blast foes with searing sunlight and shield allies from harm.',
          feature: { name: 'Warding Flare', desc: 'Flash light to spoil an attacker’s aim. Your Channel Divinity unleashes a burst of sunlight that burns nearby enemies.' },
          tags: { cleric: 2, light: 3 } },
        { id: 'war', name: 'Battle Priest', sub: 'War Domain', grantsSpells: false,
          desc: 'A warrior blessed by a god of battle. You fight on the front line in heavy armor and strike with holy fury.',
          feature: { name: 'War Priest', desc: 'Make an extra weapon attack as a bonus action. Your Channel Divinity adds +10 to a roll to hit.' },
          tags: { cleric: 2, war: 3, hybrid: 1 } },
      ],
      tags: { cleric: 1 },
    },
    {
      id: 'barbarian', name: 'Barbarian', icon: 'str', hitDie: 12, hp: 26,
      primary: ['str'], save: 'con',
      armor: { base: 0, label: 'Unarmored (10 + Dex + Con)', dexCap: 0 },
      blurb: 'A ferocious warrior powered by pure rage. Barbarians have the most health of anyone, shrug off blows that would fell others, and hit like a runaway cart.',
      bestAbility: 'Strength and Constitution',
      features: [
        { name: 'Rage', desc: 'Fly into a battle fury! While raging you deal +2 extra damage with melee hits and take only HALF damage from most attacks. You can rage a few times before you need a rest.' },
        { name: 'Unarmored Defense', desc: 'You don’t need armor — your raw toughness protects you. Your Armor is 10 + your Dexterity + your Constitution.' },
        { name: 'Reckless Attack', desc: 'You can throw caution aside to attack with advantage — but enemies get advantage against you until your next turn.' },
        { name: 'Danger Sense', desc: 'Your instincts are razor-sharp — you have advantage on dodging dangers you can see, like traps and fireballs.' },
      ],
      archetypes: [
        { id: 'berserker', name: 'Berserker', sub: 'Path of the Berserker', grantsSpells: false,
          desc: 'Rage in its purest, most violent form. When you’re furious, you become a whirlwind of attacks.',
          feature: { name: 'Frenzy', desc: 'While raging, you can make an extra attack as a bonus action each turn. (You’ll be worn out once the battle ends.)' },
          tags: { barbarian: 2, berserker: 3 } },
        { id: 'totem', name: 'Totem Warrior', sub: 'Path of the Totem — Bear', grantsSpells: false,
          desc: 'You draw power from a guardian spirit animal — the mighty bear, whose strength makes you almost impossible to hurt.',
          feature: { name: 'Spirit of the Bear', desc: 'While you rage, you resist EVERY kind of damage except psychic. Almost nothing can bring you down.' },
          tags: { barbarian: 2, totem: 3 } },
        { id: 'zealot', name: 'Zealot', sub: 'Path of the Zealot', grantsSpells: false,
          desc: 'A holy warrior filled with divine fury. The gods themselves fuel your rage — and make you very hard to keep down.',
          feature: { name: 'Divine Fury', desc: 'While raging, your first hit each turn deals bonus radiant damage, and if you fall in battle you’re far easier to bring back.' },
          tags: { barbarian: 2, zealot: 3 } },
      ],
      tags: { barbarian: 1 },
    },
    {
      id: 'paladin', name: 'Paladin', icon: 'shield', hitDie: 10, hp: 22,
      primary: ['str', 'cha'], save: 'cha',
      armor: { base: 16, label: 'Chain Mail + Shield', dexCap: 0 },
      blurb: 'A holy knight bound by a sacred oath. Paladins are armored champions who heal their friends, smite their foes with divine power, and inspire everyone around them.',
      bestAbility: 'Strength and Charisma',
      spellcaster: true,
      spell: { listTag: 'paladin', ability: 'cha', cantrips: 0, leveled: 3, maxLevel: 1, forced: [] },
      features: [
        { name: 'Divine Smite', desc: 'When you hit with a weapon, you can spend a spell to unleash holy energy for a burst of extra radiant damage (2d8 or more!).' },
        { name: 'Lay on Hands', desc: 'You have a well of healing power you can lay onto yourself or an ally by touch to heal wounds or cure poison.' },
        { name: 'Divine Sense', desc: 'You can sense powerful good or evil — like angels, fiends, or undead — lurking nearby.' },
      ],
      fightingStyles: [
        { id: 'defense', name: 'Defense', desc: '+1 Armor while you wear armor — harder to hit.' },
        { id: 'dueling', name: 'Dueling', desc: '+2 damage when fighting with a single one-handed weapon.' },
        { id: 'great-weapon', name: 'Great Weapon', desc: 'Re-roll 1s and 2s on damage with a big two-handed weapon.' },
        { id: 'protection', name: 'Protection', desc: 'Use your shield to make an attacker miss a friend right next to you.' },
      ],
      archetypes: [
        { id: 'devotion', name: 'Holy Knight', sub: 'Oath of Devotion', grantsSpells: false,
          desc: 'The classic shining paladin — honest, brave, and merciful. Your holy power makes your weapon deadly to evil.',
          feature: { name: 'Sacred Weapon', desc: 'Your Channel Divinity blesses your weapon to hit more easily and glow with light, and you can frighten away fiends and undead.' },
          tags: { paladin: 2, devotion: 3 } },
        { id: 'vengeance', name: 'Avenger', sub: 'Oath of Vengeance', grantsSpells: false,
          desc: 'A grim hunter who punishes wrongdoers. You single out the worst foe and pursue them relentlessly.',
          feature: { name: 'Vow of Enmity', desc: 'Your Channel Divinity marks one enemy — you attack them with advantage until one of you falls.' },
          tags: { paladin: 2, vengeance: 3 } },
        { id: 'ancients', name: 'Green Knight', sub: 'Oath of the Ancients', grantsSpells: false,
          desc: 'A guardian of light, life, and the wild. You fight to keep joy and beauty alive in the world.',
          feature: { name: 'Nature’s Wrath', desc: 'Your Channel Divinity snares foes in spectral vines, and your magic helps you shrug off harmful spells.' },
          tags: { paladin: 2, ancients: 3 } },
      ],
      tags: { paladin: 1 },
    },
    {
      id: 'ranger', name: 'Ranger', icon: 'dex', hitDie: 10, hp: 22,
      primary: ['dex', 'wis'], save: 'dex',
      armor: { base: 12, label: 'Studded Leather', dexCap: 99 },
      blurb: 'A wilderness warrior and expert tracker. Rangers strike from a distance with bow and blade, know the secrets of the wild, and can fight beside a loyal animal companion.',
      bestAbility: 'Dexterity and Wisdom',
      spellcaster: true,
      spell: { listTag: 'ranger', ability: 'wis', cantrips: 0, leveled: 3, maxLevel: 1, forced: [] },
      features: [
        { name: 'Favored Enemy', desc: 'Pick a kind of creature you’ve studied (beasts, undead, dragons…). You’re an expert at tracking and battling them.' },
        { name: 'Natural Explorer', desc: 'A master of the wild — you rarely get lost, are seldom surprised, and move easily through difficult ground.' },
        { name: 'Primeval Awareness', desc: 'You can sense whether certain creatures (like undead or beasts) are lurking in the area around you.' },
      ],
      fightingStyles: [
        { id: 'archery', name: 'Archery', desc: '+2 to hit with bows and other ranged weapons.' },
        { id: 'defense', name: 'Defense', desc: '+1 Armor while you wear armor — harder to hit.' },
        { id: 'dueling', name: 'Dueling', desc: '+2 damage when fighting with a single one-handed weapon.' },
        { id: 'two-weapon', name: 'Two-Weapon', desc: 'Add your modifier to the damage of your off-hand weapon when fighting with two.' },
      ],
      archetypes: [
        { id: 'hunter', name: 'Monster Hunter', sub: 'Hunter Conclave', grantsSpells: false,
          desc: 'A specialist slayer of monsters. You learn deadly techniques for taking down tough or numerous foes.',
          feature: { name: 'Hunter’s Prey', desc: 'You master one deadly signature trick, chosen when you take this specialty.' },
          choice: {
            key: 'prey', kind: 'options', prompt: 'Pick your signature trick:',
            options: [
              { id: 'colossus-slayer', name: 'Colossus Slayer', desc: 'Once each turn, when you hit a foe that is already wounded, deal an extra 1d8 damage.' },
              { id: 'giant-killer', name: 'Giant Killer', desc: 'When a big foe close by attacks you and misses, you can strike back at it immediately.' },
              { id: 'horde-breaker', name: 'Horde Breaker', desc: 'Once each turn when you attack, you can also strike a second foe standing right beside the first.' },
            ],
          },
          tags: { ranger: 2, hunter: 3 } },
        { id: 'beastmaster', name: 'Beast Master', sub: 'Beast Conclave', grantsSpells: false,
          desc: 'You bond with a loyal animal companion — a wolf, hawk, or big cat — that fights at your side and obeys your commands.',
          feature: { name: 'Animal Companion', desc: 'Your trained beast moves and attacks on your command, scouts ahead, and defends you fiercely.' },
          choice: { key: 'companion', kind: 'companion', prompt: 'Choose your animal companion:' },
          tags: { ranger: 2, beastmaster: 3 } },
        { id: 'gloomstalker', name: 'Gloom Stalker', sub: 'Gloom Stalker Conclave', grantsSpells: false,
          desc: 'A hunter of dark places, nearly invisible in shadow and deadly in the first moments of a fight.',
          feature: { name: 'Dread Ambusher', desc: 'You see in magical darkness, are almost impossible to spot, and strike with a lightning-fast extra attack on the first round of battle.' },
          tags: { ranger: 2, gloomstalker: 3 } },
      ],
      tags: { ranger: 1 },
    },
    {
      id: 'bard', name: 'Bard', icon: 'cha', hitDie: 8, hp: 18,
      primary: ['cha'], save: 'cha',
      armor: { base: 11, label: 'Leather Armor', dexCap: 99 },
      blurb: 'A magical performer who weaves spells through music and words. Bards do a little of everything — cast clever spells, heal and inspire their friends, charm their way past trouble, and hold their own in a fight.',
      bestAbility: 'Charisma',
      spellcaster: true,
      spell: { listTag: 'bard', ability: 'cha', cantrips: 2, leveled: 4, maxLevel: 2, forced: [] },
      features: [
        { name: 'Spellcasting', desc: 'You cast bard spells using Charisma — a flexible mix of magic for blasting, charming, healing, and trickery.' },
        { name: 'Bardic Inspiration', desc: 'As a bonus action, give an ally a glowing Inspiration die (d6). They can add it to a roll later for a clutch boost. You can do this a few times per rest.' },
        { name: 'Jack of All Trades', desc: 'You’re a little good at everything — add half your bonus to checks you aren’t even trained in.' },
        { name: 'Song of Rest', desc: 'During a short rest, your music helps your wounded friends heal a little extra.' },
      ],
      archetypes: [
        { id: 'lore', name: 'Loremaster', sub: 'College of Lore', grantsSpells: false,
          desc: 'A keeper of secrets, stories, and skills. You know a bit of everything and can twist fate with a word.',
          feature: { name: 'Cutting Words', desc: 'Use your Bardic Inspiration to magically subtract from an enemy’s attack, check, or damage — spoiling their moment.' },
          tags: { bard: 2, lore: 3 } },
        { id: 'valor', name: 'Warrior-Poet', sub: 'College of Valor', grantsSpells: false,
          desc: 'A daring battle-bard who fights on the front line and turns combat into an epic ballad.',
          feature: { name: 'Combat Inspiration', desc: 'You can wear better armor and fight with real weapons, and your Inspiration die can boost an ally’s attack and damage.' },
          tags: { bard: 2, valor: 3 } },
        { id: 'glamour', name: 'Glamour Bard', sub: 'College of Glamour', grantsSpells: false,
          desc: 'A dazzling, fey-touched performer whose charm can sway a whole crowd in an instant.',
          feature: { name: 'Mantle of Inspiration', desc: 'Spend Bardic Inspiration to instantly grant allies temporary HP and let them dart out of danger.' },
          tags: { bard: 2, glamour: 3 } },
      ],
      tags: { bard: 1 },
    },
  ];

  /* ---------------------------------------------------------------------------
     SPELLS  (curated, plain-language; lists tag which builds can choose them)
     lvl: 0 = cantrip (cast forever).  lists: wizard | cleric | ek | at
  --------------------------------------------------------------------------- */
  const SPELLS = [
    // Wizard / arcane cantrips
    { id: 'fire-bolt', name: 'Fire Bolt', lvl: 0, lists: ['wizard', 'ek'], type: 'attack',
      desc: 'Hurl a dart of fire. Roll to hit; on a hit it deals 1d10 fire damage. Your reliable ranged attack.' },
    { id: 'ray-of-frost', name: 'Ray of Frost', lvl: 0, lists: ['wizard', 'ek', 'at'], type: 'attack',
      desc: 'A freezing beam. Roll to hit for 1d8 cold damage and slow the target down.' },
    { id: 'shocking-grasp', name: 'Shocking Grasp', lvl: 0, lists: ['wizard', 'ek'], type: 'attack',
      desc: 'Lightning leaps from your hand. Roll to hit for 1d8 lightning damage; the target can’t fight back this turn.' },
    { id: 'mage-hand', name: 'Mage Hand', lvl: 0, lists: ['wizard', 'at'], type: 'utility',
      desc: 'Create a floating, ghostly hand to grab, push, or carry things from a distance.' },
    { id: 'minor-illusion', name: 'Minor Illusion', lvl: 0, lists: ['wizard', 'at'], type: 'utility',
      desc: 'Make a small sound or picture appear to trick someone — a fake noise, a hidden door, a scary growl.' },
    { id: 'prestidigitation', name: 'Prestidigitation', lvl: 0, lists: ['wizard', 'at'], type: 'utility',
      desc: 'Tiny magic tricks: clean a mess, light a candle, change a color, make a sparkle. Great for showing off.' },
    { id: 'light', name: 'Light', lvl: 0, lists: ['wizard', 'cleric', 'ek'], type: 'utility',
      desc: 'Touch an object and make it glow like a torch. Perfect for dark dungeons.' },
    { id: 'sacred-flame', name: 'Sacred Flame', lvl: 0, lists: ['cleric'], type: 'save',
      desc: 'Holy fire rains on a foe. They dodge (roll Dexterity) or take 1d8 radiant damage — hiding behind cover won’t help.' },
    { id: 'guidance', name: 'Guidance', lvl: 0, lists: ['cleric'], type: 'buff',
      desc: 'Touch an ally to add 1d4 to their next skill roll. A great little boost before a tricky task.' },
    // Wizard / arcane 1st level
    { id: 'magic-missile', name: 'Magic Missile', lvl: 1, lists: ['wizard', 'ek'], type: 'attack',
      desc: 'Three glowing darts streak out and ALWAYS hit — no roll needed. Each deals 1d4 + 1 force damage.' },
    { id: 'shield', name: 'Shield', lvl: 1, lists: ['wizard', 'ek'], type: 'buff',
      desc: 'In a flash, +5 Armor until your next turn — often turning a hit into a miss.' },
    { id: 'mage-armor', name: 'Mage Armor', lvl: 1, lists: ['wizard', 'ek'], type: 'buff',
      desc: 'Wrap yourself in magic armor. Your Armor becomes 13 + your Dexterity for 8 hours.' },
    { id: 'burning-hands', name: 'Burning Hands', lvl: 1, lists: ['wizard', 'ek'], type: 'save',
      desc: 'A fan of flames from your fingertips. Everyone in front dodges (Dexterity) or takes 3d6 fire damage.' },
    { id: 'thunderwave', name: 'Thunderwave', lvl: 1, lists: ['wizard', 'ek'], type: 'save',
      desc: 'A boom of force. Nearby foes take 2d8 thunder damage and get shoved back (Constitution save for half, no shove).' },
    { id: 'sleep', name: 'Sleep', lvl: 1, lists: ['wizard', 'at'], type: 'control',
      desc: 'Magical slumber drops the weakest enemies into a deep sleep — no save. Great for ending a fight early.' },
    { id: 'charm-person', name: 'Charm Person', lvl: 1, lists: ['wizard', 'at'], type: 'control',
      desc: 'Make someone see you as a friendly acquaintance (Wisdom save). Handy for talking your way out of trouble.' },
    { id: 'disguise-self', name: 'Disguise Self', lvl: 1, lists: ['wizard', 'at'], type: 'utility',
      desc: 'Change how you look — taller, shorter, a different face or outfit — to sneak in or fool a guard.' },
    { id: 'detect-magic', name: 'Detect Magic', lvl: 1, lists: ['wizard', 'cleric', 'at'], type: 'utility',
      desc: 'Sense magic nearby — glowing auras reveal magic items, traps, and spells.' },
    // Wizard 2nd level
    { id: 'scorching-ray', name: 'Scorching Ray', lvl: 2, lists: ['wizard'], type: 'attack',
      desc: 'Fire three rays of flame. Roll to hit with each; every hit deals 2d6 fire damage.' },
    { id: 'misty-step', name: 'Misty Step', lvl: 2, lists: ['wizard'], type: 'utility',
      desc: 'Vanish in silver mist and reappear up to 30 ft away — escape a grab or zip past danger.' },
    { id: 'invisibility', name: 'Invisibility', lvl: 2, lists: ['wizard'], type: 'utility',
      desc: 'Turn invisible until you attack or cast a spell. Perfect for sneaking or surprising a foe.' },
    { id: 'hold-person', name: 'Hold Person', lvl: 2, lists: ['wizard', 'cleric'], type: 'control',
      desc: 'Freeze a humanoid in place (Wisdom save). While held, every hit on them is a critical!' },
    // Cleric 1st level
    { id: 'cure-wounds', name: 'Cure Wounds', lvl: 1, lists: ['cleric'], type: 'heal',
      desc: 'Touch a wounded friend to heal 1d8 + your Wisdom HP. Your go-to heal.' },
    { id: 'healing-word', name: 'Healing Word', lvl: 1, lists: ['cleric'], type: 'heal',
      desc: 'Heal an ally 1d4 + your Wisdom HP from across the battlefield — and still do something else this turn.' },
    { id: 'bless', name: 'Bless', lvl: 1, lists: ['cleric'], type: 'buff',
      desc: 'Bless up to three allies — they each add 1d4 to their attacks and saves for the fight.' },
    { id: 'guiding-bolt', name: 'Guiding Bolt', lvl: 1, lists: ['cleric'], type: 'attack',
      desc: 'A flash of light streaks out. Roll to hit for 4d6 radiant damage, and the next ally to attack that foe has it easy.' },
    { id: 'shield-of-faith', name: 'Shield of Faith', lvl: 1, lists: ['cleric'], type: 'buff',
      desc: 'A shimmering field gives an ally +2 Armor for the whole fight.' },
    { id: 'command', name: 'Command', lvl: 1, lists: ['cleric'], type: 'control',
      desc: 'Speak a one-word order — "Flee!", "Drop!", "Halt!" — and the target must obey (Wisdom save).' },
    // Cleric 2nd level
    { id: 'spiritual-weapon', name: 'Spiritual Weapon', lvl: 2, lists: ['cleric'], type: 'attack',
      desc: 'Summon a floating magic weapon that fights for you. Roll to hit for 1d8 + Wisdom force damage every turn.' },
    { id: 'lesser-restoration', name: 'Lesser Restoration', lvl: 2, lists: ['cleric'], type: 'heal',
      desc: 'Cure a disease, or end being poisoned, blinded, deafened, or paralyzed.' },
    { id: 'aid', name: 'Aid', lvl: 2, lists: ['cleric'], type: 'buff',
      desc: 'Bless up to three allies with +5 maximum HP for the whole adventure — and heal them 5 right now.' },

    // --- More cantrips ---
    { id: 'chill-touch', name: 'Chill Touch', lvl: 0, lists: ['wizard', 'ek'], type: 'attack',
      desc: 'A ghostly skeletal hand grabs a foe. Roll to hit for 1d8 necrotic damage; they can’t heal until your next turn.' },
    { id: 'poison-spray', name: 'Poison Spray', lvl: 0, lists: ['wizard'], type: 'save',
      desc: 'A puff of toxic gas. The target dodges (Constitution) or takes 1d12 poison damage. Nasty up close.' },
    { id: 'dancing-lights', name: 'Dancing Lights', lvl: 0, lists: ['wizard', 'at'], type: 'utility',
      desc: 'Conjure up to four floating, glowing lights you can move around — light a room or create a distraction.' },
    { id: 'message', name: 'Message', lvl: 0, lists: ['wizard', 'at'], type: 'utility',
      desc: 'Whisper a secret message to someone you can see, even far away. Only they hear it, and they can whisper back.' },
    { id: 'toll-the-dead', name: 'Toll the Dead', lvl: 0, lists: ['cleric'], type: 'save',
      desc: 'A mournful bell rings for a foe. They dodge (Wisdom) or take 1d8 necrotic — 1d12 if they’re already hurt!' },
    { id: 'spare-the-dying', name: 'Spare the Dying', lvl: 0, lists: ['cleric'], type: 'heal',
      desc: 'Touch a dying creature to steady them — they stop slipping away and become stable. A lifesaver.' },
    { id: 'mending', name: 'Mending', lvl: 0, lists: ['wizard', 'cleric'], type: 'utility',
      desc: 'Repair a single break or tear in an object — a snapped rope, a torn cloak, a cracked key.' },

    // --- More 1st-level spells ---
    { id: 'chromatic-orb', name: 'Chromatic Orb', lvl: 1, lists: ['wizard', 'ek'], type: 'attack',
      desc: 'Hurl a sphere of your chosen element (fire, cold, lightning…). Roll to hit for a big 3d8 damage.' },
    { id: 'witch-bolt', name: 'Witch Bolt', lvl: 1, lists: ['wizard'], type: 'attack',
      desc: 'A beam of crackling blue energy. Roll to hit for 1d12 lightning — and you can keep zapping them each turn.' },
    { id: 'feather-fall', name: 'Feather Fall', lvl: 1, lists: ['wizard'], type: 'utility',
      desc: 'In a blink, you and your friends drift down from a fall like feathers — no damage from landing.' },
    { id: 'find-familiar', name: 'Find Familiar', lvl: 1, lists: ['wizard'], type: 'utility',
      desc: 'Summon a loyal little animal spirit (a cat, owl, frog…) that scouts, fetches, and helps you in combat.' },
    { id: 'silent-image', name: 'Silent Image', lvl: 1, lists: ['wizard', 'at'], type: 'utility',
      desc: 'Create a moving, person-sized illusion — a fake wall, a scary beast, a hidden door. It looks real (but makes no sound).' },
    { id: 'color-spray', name: 'Color Spray', lvl: 1, lists: ['wizard', 'at'], type: 'control',
      desc: 'A dazzling flash of colors leaves nearby enemies blinded and unable to act. Great for a quick escape.' },
    { id: 'inflict-wounds', name: 'Inflict Wounds', lvl: 1, lists: ['cleric'], type: 'attack',
      desc: 'Channel dark power into a touch. Roll to hit for a huge 3d10 necrotic damage — risky but devastating.' },
    { id: 'bane', name: 'Bane', lvl: 1, lists: ['cleric'], type: 'control',
      desc: 'Curse up to three foes (Charisma save). Each one subtracts 1d4 from their attacks and saves — the opposite of Bless.' },
    { id: 'sanctuary', name: 'Sanctuary', lvl: 1, lists: ['cleric'], type: 'buff',
      desc: 'Ward an ally so foes must resist (Wisdom) just to attack them — perfect for protecting the wounded.' },

    // --- More 2nd-level spells ---
    { id: 'flaming-sphere', name: 'Flaming Sphere', lvl: 2, lists: ['wizard'], type: 'save',
      desc: 'A rolling ball of fire you steer around the battlefield. Foes it touches dodge (Dexterity) or take 2d6 fire.' },
    { id: 'shatter', name: 'Shatter', lvl: 2, lists: ['wizard'], type: 'save',
      desc: 'A sudden, painful BOOM. Everything nearby dodges (Constitution) or takes 3d8 thunder damage.' },
    { id: 'web', name: 'Web', lvl: 2, lists: ['wizard'], type: 'control',
      desc: 'Fill an area with thick, sticky webbing that traps and slows any enemies caught inside.' },
    { id: 'blur', name: 'Blur', lvl: 2, lists: ['wizard'], type: 'buff',
      desc: 'Your body becomes a blurry, shifting image — attackers have trouble even seeing where to hit you.' },
    { id: 'prayer-of-healing', name: 'Prayer of Healing', lvl: 2, lists: ['cleric'], type: 'heal',
      desc: 'A short prayer heals up to six friends at once, restoring 2d8 + your Wisdom HP to each. Great after a fight.' },
    { id: 'silence', name: 'Silence', lvl: 2, lists: ['cleric'], type: 'control',
      desc: 'Create a bubble of total silence — no sound, no shouting, and no spoken spells can be cast inside.' },

    // --- Spells for the new classes (Barbarian has none) ---
    { id: 'vicious-mockery', name: 'Vicious Mockery', lvl: 0, lists: ['bard'], type: 'save',
      desc: 'Hurl a magical insult so cutting it actually hurts. The target dodges (Wisdom) or takes 1d4 psychic damage and fumbles its next attack.' },
    { id: 'divine-favor', name: 'Divine Favor', lvl: 1, lists: ['paladin'], type: 'buff',
      desc: 'Your weapon glows with holy light, dealing an extra 1d4 radiant damage on every hit for the whole fight.' },
    { id: 'heroism', name: 'Heroism', lvl: 1, lists: ['paladin', 'bard'], type: 'buff',
      desc: 'Fill an ally with bravery — they can’t be frightened and gain a few temporary HP at the start of each of their turns.' },
    { id: 'searing-smite', name: 'Searing Smite', lvl: 1, lists: ['paladin'], type: 'buff',
      desc: 'Your next weapon hit bursts into flame for an extra 1d6 fire damage and leaves the foe burning for more each turn.' },
    { id: 'hunters-mark', name: 'Hunter’s Mark', lvl: 1, lists: ['ranger'], type: 'buff',
      desc: 'Mark a target as your prey. You deal an extra 1d6 damage every time you hit it, and you can track it with ease.' },
    { id: 'goodberry', name: 'Goodberry', lvl: 1, lists: ['ranger'], type: 'heal',
      desc: 'Conjure up to ten magic berries. Eating one restores 1 HP and feeds a person for a whole day.' },
    { id: 'speak-with-animals', name: 'Speak with Animals', lvl: 1, lists: ['ranger', 'bard'], type: 'utility',
      desc: 'For ten minutes you can talk with animals and understand their replies — ask a squirrel what it saw, or befriend a guard dog.' },
    { id: 'ensnaring-strike', name: 'Ensnaring Strike', lvl: 1, lists: ['ranger'], type: 'control',
      desc: 'Your next hit sprouts grasping thorny vines that grab the foe and squeeze them for 1d6 each turn until they break free.' },
    { id: 'faerie-fire', name: 'Faerie Fire', lvl: 1, lists: ['bard'], type: 'control',
      desc: 'Outline creatures in glowing colored light (Dexterity save). They can’t hide, and everyone attacks them with advantage.' },
    { id: 'dissonant-whispers', name: 'Dissonant Whispers', lvl: 1, lists: ['bard'], type: 'save',
      desc: 'Whisper a horrible melody only one foe can hear. They take 3d6 psychic damage and flee in terror (Wisdom save for half, and no fleeing).' },
    { id: 'suggestion', name: 'Suggestion', lvl: 2, lists: ['bard'], type: 'control',
      desc: 'Magically suggest a reasonable course of action, and the target feels compelled to follow it (Wisdom save).' },
    { id: 'heat-metal', name: 'Heat Metal', lvl: 2, lists: ['bard'], type: 'save',
      desc: 'Make a metal weapon or suit of armor glow red-hot — whoever’s holding or wearing it takes 2d8 fire damage and may drop it.' },
  ];

  // Give the new classes access to fitting existing spells (so we reuse them
  // instead of duplicating). Each id below gains the listed class tag.
  const ADD_SPELL_LISTS = {
    bard: ['mage-hand', 'minor-illusion', 'prestidigitation', 'light', 'dancing-lights', 'message', 'mending',
      'healing-word', 'cure-wounds', 'charm-person', 'disguise-self', 'sleep', 'detect-magic', 'thunderwave',
      'invisibility', 'hold-person', 'shatter', 'silence', 'lesser-restoration'],
    paladin: ['bless', 'cure-wounds', 'shield-of-faith', 'command'],
    ranger: ['cure-wounds', 'fog-cloud', 'detect-magic'],
  };
  Object.keys(ADD_SPELL_LISTS).forEach(tag => ADD_SPELL_LISTS[tag].forEach(id => {
    const sp = SPELLS.find(s => s.id === id); if (sp && !sp.lists.includes(tag)) sp.lists.push(tag);
  }));

  /* ---------------------------------------------------------------------------
     EQUIPMENT  (per-class weapon/armor choices + a shared adventuring pack)
  --------------------------------------------------------------------------- */
  const ADVENTURING_PACK = [
    'Backpack', 'Bedroll', 'Tinderbox', '10 torches', '10 days of rations',
    'Waterskin', '50 ft of rope', 'A belt pouch with a few coins',
  ];

  const EQUIPMENT = {
    fighter: {
      auto: ['Chain mail armor', 'An explorer’s pack'],
      choices: [{
        key: 'weapon', prompt: 'Pick your main weapon:',
        options: [
          { id: 'longsword-shield', name: 'Longsword & Shield', note: 'Balanced — good attack and +2 Armor.' },
          { id: 'greatsword', name: 'Greatsword', note: 'A huge two-handed blade — big damage.' },
          { id: 'battleaxe-shield', name: 'Battleaxe & Shield', note: 'Chops hard and still guards you.' },
          { id: 'longbow', name: 'Longbow & arrows', note: 'Strike foes from far away.' },
        ],
      }],
    },
    rogue: {
      auto: ['Leather armor', 'Two daggers', 'Thieves’ tools', 'A burglar’s pack'],
      choices: [{
        key: 'weapon', prompt: 'Pick your main weapon:',
        options: [
          { id: 'rapier', name: 'Rapier', note: 'A quick, precise blade — uses Dexterity.' },
          { id: 'shortsword', name: 'Shortsword', note: 'Light and fast — great for sneak attacks.' },
          { id: 'shortbow', name: 'Shortbow & arrows', note: 'Sneak-attack from a safe distance.' },
        ],
      }],
    },
    wizard: {
      auto: ['Spellbook', 'A wand or staff (arcane focus)', 'A scholar’s pack'],
      choices: [{
        key: 'weapon', prompt: 'Pick a backup weapon:',
        options: [
          { id: 'quarterstaff', name: 'Quarterstaff', note: 'A sturdy walking staff — and a focus for magic.' },
          { id: 'dagger', name: 'Dagger', note: 'Light, sharp, and can be thrown.' },
        ],
      }],
    },
    cleric: {
      auto: ['A shield', 'A holy symbol', 'A priest’s pack'],
      choices: [
        { key: 'weapon', prompt: 'Pick your weapon:',
          options: [
            { id: 'mace', name: 'Mace', note: 'A classic blunt weapon for a holy warrior.' },
            { id: 'warhammer', name: 'Warhammer', note: 'Heavier hits, divine fury.' },
          ] },
        { key: 'armor', prompt: 'Pick your armor:',
          options: [
            { id: 'scale-mail', name: 'Scale Mail', note: 'Armor 14 + a little Dexterity.' },
            { id: 'chain-mail', name: 'Chain Mail', note: 'Armor 16, no Dexterity needed (best for Healers & Battle Priests).' },
          ] },
      ],
    },
    barbarian: {
      auto: ['No armor (your toughness protects you!)', 'Four javelins', 'An explorer’s pack'],
      choices: [{
        key: 'weapon', prompt: 'Pick your weapon:',
        options: [
          { id: 'greataxe', name: 'Greataxe', note: 'The classic barbarian chopper — huge damage.' },
          { id: 'greatsword', name: 'Greatsword', note: 'A massive two-handed blade.' },
          { id: 'battleaxe-handaxe', name: 'Battleaxe & Handaxe', note: 'Chop with one, throw the other.' },
          { id: 'two-handaxes', name: 'Two Handaxes', note: 'Fast — and you can hurl them.' },
        ],
      }],
    },
    paladin: {
      auto: ['Chain mail armor', 'A holy symbol', 'A priest’s pack'],
      choices: [{
        key: 'weapon', prompt: 'Pick your weapon:',
        options: [
          { id: 'longsword-shield', name: 'Longsword & Shield', note: 'Balanced — good attack and +2 Armor.' },
          { id: 'warhammer-shield', name: 'Warhammer & Shield', note: 'Heavy hits and a shield to guard you.' },
          { id: 'greatsword', name: 'Greatsword', note: 'A mighty two-handed blade — big damage, no shield.' },
          { id: 'halberd', name: 'Halberd', note: 'A long polearm that strikes from a step away.' },
        ],
      }],
    },
    ranger: {
      auto: ['Studded leather armor', 'A quiver of 20 arrows', 'An explorer’s pack'],
      choices: [{
        key: 'weapon', prompt: 'Pick your weapons:',
        options: [
          { id: 'longbow', name: 'Longbow & arrows', note: 'Strike from far away — great with the Archery style.' },
          { id: 'two-shortswords', name: 'Two Shortswords', note: 'Fight up close with a blade in each hand.' },
          { id: 'shortsword-shortbow', name: 'Shortsword & Shortbow', note: 'Switch between near and far.' },
        ],
      }],
    },
    bard: {
      auto: ['Leather armor', 'A dagger', 'An entertainer’s pack'],
      choices: [
        { key: 'weapon', prompt: 'Pick your weapon:',
          options: [
            { id: 'rapier', name: 'Rapier', note: 'A quick, elegant blade — uses Dexterity.' },
            { id: 'shortsword', name: 'Shortsword', note: 'Light and fast.' },
            { id: 'dagger', name: 'Dagger', note: 'Simple, sharp, and throwable.' },
          ] },
        { key: 'instrument', prompt: 'Pick your instrument:',
          options: [
            { id: 'lute', name: 'Lute', note: 'The classic bard’s instrument.' },
            { id: 'flute', name: 'Flute', note: 'Sweet and easy to carry.' },
            { id: 'drum', name: 'Drum', note: 'Keep the beat of battle.' },
            { id: 'violin', name: 'Violin', note: 'Stir hearts with a soaring tune.' },
          ] },
      ],
    },
  };

  /* ---------------------------------------------------------------------------
     STORY  (personality chips + motivations to spark imagination)
  --------------------------------------------------------------------------- */
  const TRAITS = [
    'Brave', 'Curious', 'Funny', 'Loyal', 'Clever', 'Kind', 'Greedy', 'Grumpy',
    'Cheerful', 'Shy', 'Bold', 'Honorable', 'Sneaky', 'Hot-headed', 'Calm', 'Proud',
  ];
  const MOTIVATIONS = [
    'To find fame and glory', 'To get rich on treasure', 'To protect the innocent',
    'To seek revenge', 'To explore the unknown', 'To prove myself', 'To find a lost family member',
    'To learn forbidden secrets', 'Because home is no longer safe', 'To follow a higher calling',
    'For the pure thrill of adventure', 'To break an ancient curse', 'To make my family proud',
    'To right an old wrong', 'To become a living legend', 'Just to see what’s out there',
    'To repay a debt I owe', 'To find where I truly belong', 'To honor a promise I made',
    'To hunt a terrible monster', 'To win back my family’s honor', 'To escape a dull, ordinary life',
    'To master my powers', 'To avenge a fallen friend', 'To search for a way back home',
    'To serve my god or goddess', 'To outshine a bitter rival', 'To uncover the truth about my past',
    'To save my village', 'To collect rare and magical things', 'To free those who are captured',
    'Because a prophecy chose me', 'To find a challenge worthy of me', 'To keep a dangerous secret safe',
    'To carry on a hero’s legacy', 'For the love of a good story',
  ];

  /* ---------------------------------------------------------------------------
     PLAYSTYLE QUIZ
     Each question has a POOL of option "groups". A group has a fixed tag-profile
     (its playstyle lean) plus several worded "variants". Each time the quiz loads,
     app.js shows a random subset of `show` groups (always including any pin:true
     group), in random order, picking one random variant per group. This gives lots
     of variety and rotating wording while keeping recommendations sensible.
     Slight redundancy between variants is intentional — it preserves variability.
  --------------------------------------------------------------------------- */
  const QUIZ = [
    {
      q: 'In a fight, where do you want to be?',
      show: 5,
      groups: [
        { tags: { fighter: 3, 'half-orc': 2, dwarf: 1, champion: 1, war: 1, barbarian: 2, paladin: 1 }, variants: [
          'Right in the thick of it, swinging hard!',
          'Toe-to-toe with the biggest monster in the room.',
          'Front and center, where the fighting is fiercest.',
          'Charging straight at the danger.' ] },
        { tags: { rogue: 3, halfling: 2, elf: 1, assassin: 1, thief: 1 }, variants: [
          'Sneaking around the edges for a surprise strike.',
          'In the shadows, picking the perfect moment.',
          'Behind the enemy before they even know I’m there.',
          'Off to the side, striking when no one’s looking.' ] },
        { tags: { wizard: 3, tiefling: 1, gnome: 1, evoker: 1 }, variants: [
          'Hanging back, slinging spells.',
          'Safely behind the front line, blasting away.',
          'At a distance, raining down magic.',
          'Far from the claws and teeth, thank you very much.' ] },
        { tags: { cleric: 3, 'half-elf': 1, human: 1, life: 2, paladin: 1, bard: 1 }, variants: [
          'Right beside my friends, keeping them standing.',
          'In the middle of the team, healing and shielding.',
          'Wherever someone needs help the most.',
          'Watching everyone’s back and patching them up.' ] },
        { tags: { fighter: 1, rogue: 1, elf: 1, 'half-elf': 1, battlemaster: 1, ranger: 2, hunter: 1 }, variants: [
          'Darting in and out — never standing still.',
          'Picking off enemies with a bow from range.',
          'Quick and mobile, striking then slipping away.',
          'Wherever I can move fast and stay tricky.' ] },
        { tags: { fighter: 1, cleric: 1, human: 2, war: 1, battlemaster: 1, paladin: 1, bard: 1, valor: 1 }, variants: [
          'Leading the charge and calling the shots.',
          'Out front, inspiring everyone to fight harder.',
          'Directing the team like a clever captain.' ] },
        { tags: { ranger: 3, elf: 1, halfling: 1, human: 1, hunter: 1, beastmaster: 1 }, variants: [
          'Out in the open, picking off foes with my bow.',
          'Roaming the flanks with my animal companion.',
          'A deadly shot from a safe distance.',
          'Using the wild around me to my advantage.' ] },
      ],
    },
    {
      q: 'How much magic do you want?',
      show: 5,
      groups: [
        { tags: { fighter: 2, rogue: 2, champion: 1, battlemaster: 1, thief: 1, assassin: 1, barbarian: 3 }, variants: [
          'None — just steel, muscle, and skill.',
          'I’d rather trust my blade than a spellbook.',
          'Zero magic. Pure grit.',
          'Who needs spells? I’ve got a sharp sword.' ] },
        // The hybrid path is pinned so it is ALWAYS offered (it's easy to miss otherwise).
        { pin: true, tags: { 'eldritch-knight': 3, 'arcane-trickster': 3, war: 2, hybrid: 3, fighter: 1, rogue: 1, paladin: 2, ranger: 2 }, variants: [
          'A little magic mixed into my fighting.',
          'Mostly weapons — but a few handy spells too.',
          'I want to swing a sword AND cast the odd spell.',
          'Half warrior, half spellcaster.' ] },
        { tags: { wizard: 3, evoker: 2, gnome: 1, bard: 1 }, variants: [
          'Tons of spells — that’s my whole thing.',
          'Give me a spellbook and let me wreck the place.',
          'Magic, magic, and more magic!',
          'I want to be a true master of the arcane.' ] },
        { tags: { wizard: 1, abjurer: 2, illusionist: 2, 'arcane-trickster': 1, bard: 1, glamour: 1 }, variants: [
          'Clever magic — shields, tricks, and illusions.',
          'Spells that protect and outsmart, not just blast.',
          'Magic that bends the rules and fools my enemies.' ] },
        { tags: { cleric: 3, life: 2, light: 1, paladin: 2 }, variants: [
          'Healing and protective magic for my friends.',
          'Holy power — mend wounds and smite evil.',
          'Magic that keeps the whole team alive.' ] },
        { tags: { wizard: 1, evoker: 1, tiefling: 1, dragonborn: 1, light: 1 }, variants: [
          'Raw elemental power — fire, frost, and lightning.',
          'I want to hurl the forces of nature at my foes.',
          'Big, booming elemental blasts.' ] },
        { tags: { bard: 3, 'half-elf': 1, tiefling: 1, lore: 1, glamour: 1, valor: 1 }, variants: [
          'Magic through music, words, and charm.',
          'I inspire my friends and bewitch my foes.',
          'A song or a clever word for every problem.' ] },
      ],
    },
    {
      q: 'What is your hero like?',
      show: 5,
      groups: [
        { tags: { 'half-orc': 3, dwarf: 2, dragonborn: 1, fighter: 1, barbarian: 3, paladin: 1 }, variants: [
          'Big, tough, and fearless.',
          'Strong as an ox and twice as stubborn.',
          'A wall of muscle nothing gets past.',
          'The one who carries the heavy stuff — and the team.' ] },
        { tags: { halfling: 2, gnome: 2, elf: 2, rogue: 1, 'arcane-trickster': 1, illusionist: 1 }, variants: [
          'Quick, clever, and a little bit tricky.',
          'Small, fast, and always one step ahead.',
          'Nimble and sneaky with a mischievous streak.',
          'The prankster who’s never quite caught.' ] },
        { tags: { gnome: 2, elf: 1, wizard: 2, evoker: 1, abjurer: 1, lore: 1 }, variants: [
          'Brainy and studious — knowledge is power.',
          'A bookworm who learns every secret.',
          'Curious, clever, and always thinking.',
          'The one with a plan (and a backup plan).' ] },
        { tags: { 'half-elf': 3, tiefling: 2, human: 1, cleric: 1, bard: 3, paladin: 1, glamour: 1 }, variants: [
          'Charming, bold, and unforgettable.',
          'The one who does all the talking.',
          'Confident and full of personality.',
          'A natural at winning people over.' ] },
        { tags: { cleric: 2, human: 1, 'half-elf': 1, dwarf: 1, life: 1, war: 1, paladin: 3, devotion: 1 }, variants: [
          'Honorable and devoted to a cause.',
          'A protector with a strong moral code.',
          'Faithful, brave, and dependable.' ] },
        { tags: { tiefling: 2, elf: 1, gnome: 1, 'arcane-trickster': 1, illusionist: 1, assassin: 1, gloomstalker: 1 }, variants: [
          'Mysterious — a bit of an outsider.',
          'Quiet, with secrets worth keeping.',
          'An enigma nobody quite figures out.' ] },
        { tags: { ranger: 3, elf: 1, halfling: 1, dwarf: 1, beastmaster: 1, hunter: 1 }, variants: [
          'A wild, outdoorsy survivor.',
          'More at home in forests than cities.',
          'Happier with animals than with people.',
          'Tough, weathered, and self-reliant.' ] },
      ],
    },
    {
      q: 'Pick a signature move:',
      show: 5,
      groups: [
        { tags: { champion: 3, 'half-orc': 2, fighter: 1, barbarian: 2, berserker: 1 }, variants: [
          'A mighty critical hit that ends fights.',
          'One devastating, bone-crunching swing.',
          'Hit so hard the monster goes flying.' ] },
        { tags: { battlemaster: 2, fighter: 1, war: 1 }, variants: [
          'A clever maneuver — trip, disarm, or shove.',
          'Outsmarting a foe right in the middle of battle.',
          'The perfect trick at the perfect moment.' ] },
        { tags: { assassin: 3, 'arcane-trickster': 2, rogue: 1, thief: 1 }, variants: [
          'Vanish, then strike from nowhere.',
          'One perfect hit before they even see me.',
          'Slip behind them and end it quietly.' ] },
        { tags: { wizard: 1, evoker: 2, tiefling: 1, dragonborn: 1 }, variants: [
          'Unleash a blast of elemental power.',
          'A spectacular burst of fire, frost, or lightning.',
          'Channel raw magic into one big boom.' ] },
        { tags: { life: 3, cleric: 2, light: 1, paladin: 1, bard: 1 }, variants: [
          'A glowing burst that heals my whole party.',
          'Pull a friend back from the brink.',
          'Holy light that mends every wound.' ] },
        { tags: { 'eldritch-knight': 2, 'arcane-trickster': 1, hybrid: 2, war: 1, paladin: 1 }, variants: [
          'A sword strike wreathed in magic.',
          'Blade in one hand, spell in the other.',
          'Cut them down, then zap them for good measure.' ] },
        { tags: { barbarian: 3, 'half-orc': 1, berserker: 2, totem: 1, zealot: 1 }, variants: [
          'Fly into an unstoppable rage.',
          'Shrug off a deadly blow and keep swinging.',
          'Get angrier — and tougher — the more I’m hit.' ] },
        { tags: { paladin: 3, devotion: 1, vengeance: 1, ancients: 1, light: 1 }, variants: [
          'Smite a foe with a burst of holy power.',
          'Strike down evil with a glowing blade.',
          'Heal a friend with a single touch.' ] },
        { tags: { ranger: 3, beastmaster: 2, hunter: 1, gloomstalker: 1 }, variants: [
          'Loose a perfect arrow across the battlefield.',
          'Send my animal companion in to attack.',
          'Vanish into the shadows and strike first.' ] },
        { tags: { bard: 3, lore: 1, valor: 1, glamour: 1 }, variants: [
          'An inspiring song that turns the tide.',
          'A magic word that drops a foe to their knees.',
          'Dazzle everyone with a stunning performance.' ] },
      ],
    },
  ];

  /* ---------------------------------------------------------------------------
     GLOSSARY  (plain-language dictionary of game words, for the How to Play page)
  --------------------------------------------------------------------------- */
  const GLOSSARY = [
    { term: 'Dungeon Master (DM)', def: 'The person who runs the game — they describe the world, play the monsters and townsfolk, and decide what happens when you try something.' },
    { term: 'd20 (and other dice)', def: 'Dice are named by their number of sides: a d20 has 20, a d6 has 6, and so on. “2d6” means roll two six-sided dice and add them together.' },
    { term: 'Ability Score', def: 'One of your six core numbers (Strength, Dexterity, etc.). Higher is better. Each one gives you a modifier.' },
    { term: 'Modifier', def: 'The small bonus (like +2) you add to a die roll, based on an ability score. It’s the number in the little box on your sheet.' },
    { term: 'Hit Points (HP)', def: 'Your health. Damage lowers it; healing raises it. At 0 HP your hero falls unconscious.' },
    { term: 'Armor / Armor Class (AC)', def: 'The number an enemy must reach on their attack roll to hit you. Bigger armor = harder to hit.' },
    { term: 'Speed', def: 'How far you can move on your turn, measured in feet.' },
    { term: 'Attack Roll ("to hit")', def: 'Roll a d20, add your To-Hit number, and compare it to the target’s Armor. Equal or higher = a hit!' },
    { term: 'Damage Roll', def: 'After you hit, roll your weapon or spell’s dice (plus your modifier) to see how many Hit Points the target loses.' },
    { term: 'Saving Throw ("a save")', def: 'A roll to avoid or resist danger — dodging a blast, shaking off poison, resisting a spell. In this game it’s just “roll a d20 and beat the number.”' },
    { term: 'Difficulty Number', def: 'The number you’re trying to reach on a risky roll. The DM picks it from Very Easy (3) up to Nearly Impossible (a natural 20).' },
    { term: 'Advantage', def: 'Things are in your favor: roll two d20s and keep the HIGHER one.' },
    { term: 'Disadvantage', def: 'Things are against you: roll two d20s and keep the LOWER one.' },
    { term: 'Critical Hit ("crit")', def: 'Rolling a natural 20 on an attack — an automatic hit, and you roll your damage dice twice!' },
    { term: 'Cantrip', def: 'A small spell so simple you can cast it as often as you like, forever. It never runs out.' },
    { term: 'Spell', def: 'A stronger bit of magic you can only cast a limited number of times before you need to rest.' },
    { term: 'Spell DC', def: 'When you cast a spell at an enemy, this is the number THEY must beat to resist or dodge it.' },
    { term: 'Action / Bonus Action / Reaction', def: 'On your turn you usually get one main Action (like attacking). Some quick things are a Bonus Action. A Reaction is a special move you can make even on someone else’s turn.' },
    { term: 'Turn / Round', def: 'In a fight, everyone takes one Turn. Once everybody has gone, that’s one Round, and it starts again.' },
    { term: 'Initiative', def: 'A roll at the start of a fight (d20 + Dexterity modifier) to see who goes first. Highest goes first.' },
    { term: 'Proficiency Bonus', def: 'A +2 bonus you add to things your hero is trained in — like attacking with your weapons or casting your spells.' },
    { term: 'Darkvision', def: 'The power to see in the dark (up to 60 feet) as if it were dim light. Many races have it.' },
    { term: 'Resistance', def: 'You take only HALF damage from a certain type (like fire or poison). Very handy!' },
    { term: 'Condition', def: 'A temporary status that changes what you can do — like Blinded, Frightened, Poisoned, or Stunned.' },
    { term: 'Short Rest / Long Rest', def: 'A short rest is about an hour to catch your breath; a long rest is a full night’s sleep that heals you and refills your magic.' },
    { term: 'NPC', def: 'A “non-player character” — anyone in the world played by the DM, like a shopkeeper, a king, or a goblin.' },
  ];

  /* ------------------- Beast Master animal companions --------------------
     The roster is every Beast the rules actually allow: Challenge 1/4 or lower,
     size Medium or smaller. Name / size / speed / base Armor were cross-referenced
     against the Monster Manual; everything else is translated into OUR simplified
     system (see DECISIONS.md — the books are flavor and inspiration, not the rules).

     Straight from the PHB's Ranger's Companion:
       • Hit Points = 4 x your ranger level  (so 12 at level 3 — and it scales itself
         the moment leveling arrives; nothing here needs changing).
       • "Add your proficiency bonus to the beast's AC, attack rolls, and damage
         rolls." That +2 is ALREADY baked into the numbers below, so nobody does
         arithmetic at the table.

     Instead of 42 bespoke stat lines we use three tiers keyed to the animal's role.
     'gentle' beasts genuinely have no attack — the card says so plainly, so a kid
     finds out before a fight, not during one. */
  const COMPANION_TIERS = {
    fierce: { label: 'Fierce', hit: 6, dmg: '1d6+4', note: 'A real fighter.' },
    swift: { label: 'Swift', hit: 6, dmg: '1d4+3', note: 'Quick and scrappy.' },
    gentle: { label: 'Gentle', hit: null, dmg: null, note: 'Does not fight — a scout and a friend.' },
  };
  const COMPANION_ROLES = [
    { id: 'fight', label: '🗡️ Fight beside me' },
    { id: 'scout', label: '🦅 Scout & fly' },
    { id: 'friend', label: '🐾 Just be my friend' },
  ];
  const COMPANION_GROUPS = [
    { id: 'hunters', name: '🐺 Hunters', blurb: 'Loyal beasts that fight at your side.' },
    { id: 'winged', name: '🦅 Winged', blurb: 'Fliers that scout far ahead.' },
    { id: 'crawly', name: '🐍 Creepy-Crawly', blurb: 'Small, sneaky, full of surprises.' },
    { id: 'water', name: '🐟 Water', blurb: 'Swimmers for rivers, lakes, and the deep.' },
    { id: 'gentle', name: '🐴 Gentle Beasts', blurb: 'Friends and helpers — not fighters.' },
  ];
  const COMPANIONS = [
    // --- Hunters -------------------------------------------------------------
    { id: 'wolf', name: 'Wolf', group: 'hunters', tier: 'fierce', size: 'Medium', ac: 15, speed: '40 ft.', classic: true, roles: ['fight'],
      attack: 'Bite', trick: { name: 'Pack Tactics', desc: 'Attacks with advantage whenever one of your friends is right next to its target.' },
      blurb: 'A loyal pack hunter — fiercest when it fights beside friends.' },
    { id: 'panther', name: 'Panther', group: 'hunters', tier: 'fierce', size: 'Medium', ac: 14, speed: '50 ft., climb 40 ft.', classic: true, roles: ['fight', 'scout'],
      attack: 'Claws', trick: { name: 'Pounce', desc: 'If it charges 20 ft. straight at a foe and hits, the foe must beat DC 12 Strength or be knocked flat.' },
      blurb: 'A silent, climbing cat that strikes from cover.' },
    { id: 'mastiff', name: 'Mastiff', group: 'hunters', tier: 'fierce', size: 'Medium', ac: 14, speed: '40 ft.', classic: true, roles: ['fight', 'friend'],
      attack: 'Bite', trick: { name: 'Keen Nose', desc: 'Advantage to track by smell — and its bite can bowl a foe right over.' },
      blurb: 'A big, brave, endlessly loyal dog.' },
    { id: 'boar', name: 'Boar', group: 'hunters', tier: 'fierce', size: 'Medium', ac: 13, speed: '40 ft.', roles: ['fight'],
      attack: 'Tusks', trick: { name: 'Charge', desc: 'If it runs 20 ft. first, its hit knocks the foe to the ground.' },
      blurb: 'Stubborn, tough, and very hard to stop once it starts running.' },
    { id: 'hyena', name: 'Hyena', group: 'hunters', tier: 'fierce', size: 'Medium', ac: 13, speed: '50 ft.', roles: ['fight'],
      attack: 'Bite', trick: { name: 'Pack Tactics', desc: 'Attacks with advantage whenever one of your friends is right next to its target.' },
      blurb: 'A cackling scavenger that never hunts alone.' },
    { id: 'giant-badger', name: 'Giant Badger', group: 'hunters', tier: 'fierce', size: 'Medium', ac: 12, speed: '30 ft., burrow 10 ft.', roles: ['fight'],
      attack: 'Claws', trick: { name: 'Tunneler', desc: 'Digs straight through earth — it can pop up where nobody expects it.' },
      blurb: 'Small eyes, huge claws, absolutely fearless.' },
    { id: 'giant-weasel', name: 'Giant Weasel', group: 'hunters', tier: 'fierce', size: 'Medium', ac: 15, speed: '40 ft.', roles: ['fight', 'scout'],
      attack: 'Bite', trick: { name: 'Keen Senses', desc: 'Advantage to notice things by hearing or smell.' },
      blurb: 'A lightning-quick hunter of burrows and tunnels.' },
    { id: 'jackal', name: 'Jackal', group: 'hunters', tier: 'swift', size: 'Small', ac: 14, speed: '40 ft.', roles: ['fight', 'scout'],
      attack: 'Bite', trick: { name: 'Pack Tactics', desc: 'Attacks with advantage whenever one of your friends is right next to its target.' },
      blurb: 'A clever desert dog that hunts with its friends.' },
    { id: 'baboon', name: 'Baboon', group: 'hunters', tier: 'swift', size: 'Small', ac: 14, speed: '30 ft., climb 30 ft.', roles: ['fight', 'scout'],
      attack: 'Bite', trick: { name: 'Pack Tactics', desc: 'Attacks with advantage whenever one of your friends is right next to its target.' },
      blurb: 'A noisy, clever climber with a mischievous streak.' },
    { id: 'giant-rat', name: 'Giant Rat', group: 'hunters', tier: 'swift', size: 'Small', ac: 14, speed: '30 ft.', roles: ['fight'],
      attack: 'Bite', trick: { name: 'Pack Tactics', desc: 'Attacks with advantage whenever one of your friends is right next to its target.' },
      blurb: 'Bigger than a cat — and it brings friends.' },
    { id: 'cat', name: 'Cat', group: 'hunters', tier: 'swift', size: 'Tiny', ac: 14, speed: '40 ft., climb 30 ft.', roles: ['scout', 'friend'],
      attack: 'Claws', trick: { name: 'Keen Nose', desc: 'Advantage to notice things by smell — and it always lands on its feet.' },
      blurb: 'Aloof, silent, and secretly entirely on your side.' },
    { id: 'weasel', name: 'Weasel', group: 'hunters', tier: 'swift', size: 'Tiny', ac: 15, speed: '30 ft.', roles: ['scout'],
      attack: 'Bite', trick: { name: 'Keen Senses', desc: 'Advantage to notice things by hearing or smell.' },
      blurb: 'A whip-fast little hunter that slips through any gap.' },
    { id: 'badger', name: 'Badger', group: 'hunters', tier: 'swift', size: 'Tiny', ac: 12, speed: '20 ft., burrow 5 ft.', roles: ['friend'],
      attack: 'Bite', trick: { name: 'Keen Nose', desc: 'Advantage to notice things by smell.' },
      blurb: 'Tiny, grumpy, and braver than it has any right to be.' },
    { id: 'rat', name: 'Rat', group: 'hunters', tier: 'swift', size: 'Tiny', ac: 12, speed: '20 ft.', roles: ['scout', 'friend'],
      attack: 'Bite', trick: { name: 'Keen Nose', desc: 'Advantage to notice things by smell.' },
      blurb: 'Overlooked, underestimated, and absolutely everywhere.' },

    // --- Winged --------------------------------------------------------------
    { id: 'hawk', name: 'Hawk', group: 'winged', tier: 'swift', size: 'Tiny', ac: 15, speed: '10 ft., fly 60 ft.', classic: true, roles: ['scout'],
      attack: 'Talons', trick: { name: 'Keen Sight', desc: 'Advantage to spot things by sight — it sees the whole world from above.' },
      blurb: 'A sharp-eyed flier that scouts far ahead of the party.' },
    { id: 'owl', name: 'Owl', group: 'winged', tier: 'swift', size: 'Tiny', ac: 13, speed: '5 ft., fly 60 ft.', roles: ['scout', 'friend'],
      attack: 'Talons', trick: { name: 'Flyby', desc: 'Swoops in, strikes, and glides away without being caught. It also sees in the dark.' },
      blurb: 'A silent night flier that misses nothing.' },
    { id: 'raven', name: 'Raven', group: 'winged', tier: 'swift', size: 'Tiny', ac: 14, speed: '10 ft., fly 50 ft.', roles: ['scout', 'friend'],
      attack: 'Beak', trick: { name: 'Mimicry', desc: 'Copies sounds and voices it has heard — perfect for a distraction.' },
      blurb: 'A clever trickster with a talent for voices.' },
    { id: 'eagle', name: 'Eagle', group: 'winged', tier: 'swift', size: 'Small', ac: 14, speed: '10 ft., fly 60 ft.', roles: ['scout'],
      attack: 'Talons', trick: { name: 'Keen Sight', desc: 'Advantage to spot things by sight, from a very long way off.' },
      blurb: 'Proud, powerful, and unmatched in the open sky.' },
    { id: 'blood-hawk', name: 'Blood Hawk', group: 'winged', tier: 'swift', size: 'Small', ac: 14, speed: '10 ft., fly 60 ft.', roles: ['fight', 'scout'],
      attack: 'Beak', trick: { name: 'Pack Tactics', desc: 'Attacks with advantage whenever one of your friends is right next to its target.' },
      blurb: 'A fierce red-feathered hawk that hunts in flocks.' },
    { id: 'bat', name: 'Bat', group: 'winged', tier: 'swift', size: 'Tiny', ac: 14, speed: '5 ft., fly 30 ft.', roles: ['scout'],
      attack: 'Bite', trick: { name: 'Echolocation', desc: 'Sees by sound — pitch darkness does not slow it down at all.' },
      blurb: 'It hears the shape of the room. Darkness means nothing.' },
    { id: 'pteranodon', name: 'Pteranodon', group: 'winged', tier: 'fierce', size: 'Medium', ac: 15, speed: '10 ft., fly 60 ft.', roles: ['fight', 'scout'],
      attack: 'Beak', trick: { name: 'Flyby', desc: 'Swoops in, strikes, and glides away without being caught.' },
      blurb: 'A leathery flying reptile out of a forgotten age.' },
    { id: 'flying-snake', name: 'Flying Snake', group: 'winged', tier: 'swift', size: 'Tiny', ac: 16, speed: '30 ft., fly 60 ft., swim 30 ft.', roles: ['scout', 'fight'],
      attack: 'Venomous Bite', trick: { name: 'Flyby', desc: 'Darts in, strikes, and flits away before anyone can grab it.' },
      blurb: 'A jewel-bright serpent with shimmering rainbow wings.' },

    // --- Creepy-Crawly -------------------------------------------------------
    { id: 'giant-wolf-spider', name: 'Giant Wolf Spider', group: 'crawly', tier: 'fierce', size: 'Medium', ac: 15, speed: '40 ft., climb 40 ft.', roles: ['fight'],
      attack: 'Venomous Bite', trick: { name: 'Spider Climb', desc: 'Walks straight up walls and across ceilings.' },
      blurb: 'A hunting spider the size of a big dog. Yes, really.' },
    { id: 'giant-venomous-snake', name: 'Giant Venomous Snake', group: 'crawly', tier: 'fierce', size: 'Medium', ac: 16, speed: '30 ft., swim 30 ft.', roles: ['fight'],
      attack: 'Venomous Bite', trick: { name: 'Quick Strike', desc: 'Lashes out faster than the eye can follow.' },
      blurb: 'A coiled serpent as long as you are tall.' },
    { id: 'giant-centipede', name: 'Giant Centipede', group: 'crawly', tier: 'swift', size: 'Small', ac: 15, speed: '30 ft., climb 30 ft.', roles: ['fight'],
      attack: 'Venomous Bite', trick: { name: 'Wall Crawler', desc: 'Scuttles up walls and along ceilings without slowing.' },
      blurb: 'A many-legged scuttler that goes where you cannot.' },
    { id: 'venomous-snake', name: 'Venomous Snake', group: 'crawly', tier: 'swift', size: 'Tiny', ac: 15, speed: '30 ft., swim 30 ft.', roles: ['fight'],
      attack: 'Venomous Bite', trick: { name: 'Slippery', desc: 'Hides in the smallest crack and strikes without warning.' },
      blurb: 'Small, quiet, and not to be trifled with.' },
    { id: 'spider', name: 'Spider', group: 'crawly', tier: 'swift', size: 'Tiny', ac: 14, speed: '20 ft., climb 20 ft.', roles: ['scout'],
      attack: 'Venomous Bite', trick: { name: 'Web Walker', desc: 'Climbs any surface and moves freely across webs.' },
      blurb: 'Small, patient, and always watching from a corner.' },
    { id: 'scorpion', name: 'Scorpion', group: 'crawly', tier: 'swift', size: 'Tiny', ac: 13, speed: '10 ft.', roles: ['fight'],
      attack: 'Venomous Sting', trick: { name: 'Armored Shell', desc: 'Its hard shell turns aside glancing blows.' },
      blurb: 'Tiny, armored, and best not stepped on.' },
    { id: 'stirge', name: 'Stirge', group: 'crawly', tier: 'swift', size: 'Tiny', ac: 16, speed: '10 ft., fly 40 ft.', roles: ['fight'],
      attack: 'Prick', trick: { name: 'Latch On', desc: 'Clings tight to a foe and saps their strength until it is pulled off.' },
      blurb: 'A darting, buzzing pest — on YOUR side, for once.' },
    { id: 'giant-fire-beetle', name: 'Giant Fire Beetle', group: 'crawly', tier: 'swift', size: 'Small', ac: 15, speed: '30 ft.', roles: ['friend', 'scout'],
      attack: 'Bite', trick: { name: 'Glowing', desc: 'Sheds a soft light 10 ft. all around it — a lantern that walks itself.' },
      blurb: 'A living lantern with a warm, friendly glow.' },
    { id: 'lizard', name: 'Lizard', group: 'crawly', tier: 'swift', size: 'Tiny', ac: 12, speed: '20 ft., climb 20 ft.', roles: ['scout', 'friend'],
      attack: 'Bite', trick: { name: 'Wall Climber', desc: 'Scampers up sheer walls and hangs upside down.' },
      blurb: 'A pocket-sized companion that goes anywhere.' },

    // --- Water ---------------------------------------------------------------
    { id: 'giant-crab', name: 'Giant Crab', group: 'water', tier: 'fierce', size: 'Medium', ac: 17, speed: '30 ft., swim 30 ft.', roles: ['fight'],
      attack: 'Pincer', trick: { name: 'Pincer Grab', desc: 'Catches a foe in its claw and holds them fast.' },
      blurb: 'An armored shell on legs — very, very hard to hurt.' },
    { id: 'giant-frog', name: 'Giant Frog', group: 'water', tier: 'fierce', size: 'Medium', ac: 13, speed: '30 ft., swim 30 ft.', roles: ['fight'],
      attack: 'Tongue', trick: { name: 'Long Tongue', desc: 'Yanks a foe right off their feet and drags them close.' },
      blurb: 'A frog the size of a dog, with a tongue like a whip.' },
    { id: 'octopus', name: 'Octopus', group: 'water', tier: 'swift', size: 'Small', ac: 14, speed: '5 ft., swim 30 ft.', roles: ['scout'],
      attack: 'Tentacles', trick: { name: 'Ink Cloud', desc: 'Vanishes underwater in a sudden burst of ink.' },
      blurb: 'Eight arms, endless curiosity, and a born escape artist.' },
    { id: 'quipper', name: 'Quipper', group: 'water', tier: 'swift', size: 'Tiny', ac: 15, speed: 'swim 40 ft.', roles: ['fight'],
      attack: 'Bite', trick: { name: 'Frenzy', desc: 'Attacks with advantage against any foe that is already hurt.' },
      blurb: 'A little river fish with an enormous attitude.' },
    { id: 'crab', name: 'Crab', group: 'water', tier: 'swift', size: 'Tiny', ac: 13, speed: '20 ft., swim 20 ft.', roles: ['friend'],
      attack: 'Pincer', trick: { name: 'Amphibious', desc: 'Breathes air and water equally well.' },
      blurb: 'A tiny, sideways-scuttling friend.' },
    { id: 'sea-horse', name: 'Sea Horse', group: 'water', tier: 'gentle', size: 'Tiny', ac: 13, speed: 'swim 20 ft.', roles: ['friend', 'scout'],
      attack: null, trick: { name: 'Water Breathing', desc: 'Breathes underwater and drifts along unnoticed. It watches — it does not fight.' },
      blurb: 'A gentle, drifting swimmer. Not a fighter at all.' },
    { id: 'frog', name: 'Frog', group: 'water', tier: 'gentle', size: 'Tiny', ac: 13, speed: '20 ft., swim 20 ft.', roles: ['friend'],
      attack: null, trick: { name: 'Standing Leap', desc: 'Leaps 10 ft. from a standstill. It does not fight — it hops.' },
      blurb: 'A cheerful hopper. Purely, proudly, a friend.' },

    // --- Gentle Beasts -------------------------------------------------------
    { id: 'deer', name: 'Deer', group: 'gentle', tier: 'gentle', size: 'Medium', ac: 15, speed: '50 ft.', roles: ['friend', 'scout'],
      attack: null, trick: { name: 'Fleet', desc: 'Faster than almost anything on four legs. It runs — it does not fight.' },
      blurb: 'Swift, graceful, and gentle.' },
    { id: 'goat', name: 'Goat', group: 'gentle', tier: 'gentle', size: 'Medium', ac: 12, speed: '40 ft.', roles: ['friend'],
      attack: null, trick: { name: 'Sure-Footed', desc: 'Climbs cliffs and narrow ledges without ever slipping.' },
      blurb: 'Stubborn, sure-footed, and weirdly lovable.' },
    { id: 'pony', name: 'Pony', group: 'gentle', tier: 'gentle', size: 'Medium', ac: 12, speed: '40 ft.', roles: ['friend'],
      attack: null, trick: { name: 'Steady', desc: 'Calm enough for a small rider, and brave enough to stay put.' },
      blurb: 'A small, steady mount and an even steadier friend.' },
    { id: 'mule', name: 'Mule', group: 'gentle', tier: 'gentle', size: 'Medium', ac: 12, speed: '40 ft.', roles: ['friend'],
      attack: null, trick: { name: 'Beast of Burden', desc: 'Carries an enormous load all day without complaint.' },
      blurb: 'Carries everything. Judges you silently.' },
  ];

  window.DATA = {
    ABILITIES, DC_TABLE, RACES, CLASSES, SPELLS, EQUIPMENT, ADVENTURING_PACK,
    TRAITS, MOTIVATIONS, QUIZ, GLOSSARY,
    COMPANIONS, COMPANION_GROUPS, COMPANION_TIERS, COMPANION_ROLES,
    LEVEL: 3, XP: 900, PROFICIENCY: 2,
    STANDARD_ARRAY: [15, 14, 13, 12, 10, 8],
  };
})();
