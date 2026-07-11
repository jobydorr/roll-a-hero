# Roll a Hero 🎲

A friendly, **kid-safe character creator and beginner's primer for Dungeons & Dragons**, built for brand-new players (works great for ages 9+ and total-beginner adults).

It walks you through making a Level 3 character step by step — roll your abilities, pick a race and class, choose a specialty and spells, write your story, grab your gear — and teaches the basics of play along the way. At the end you get a clean **one-page printable character sheet** (Print → *Save as PDF*), and your heroes are saved right in your browser.

Everything is **simplified** from the real D&D 5e rules so nobody gets overwhelmed: skills and saving throws become one easy "roll a d20, beat this number" mechanic, but attributes, modifiers, attacks, and armor all work the real way.

## What's inside
- **Playstyle quiz** that suggests heroes to match how you like to play (including "fight *and* cast a little magic" builds).
- **9 races** (Human, Dwarf, Elf, Halfling, Dragonborn, Gnome, Half-Elf, Half-Orc, Tiefling), each with a simple signature ability.
- **8 classes** (Fighter, Rogue, Wizard, Cleric, Barbarian, Paladin, Ranger, Bard), each with **2–3 specialties** — some of which grant a few spells.
- **Simplified spell cards** in plain language.
- A one-screen **How to Play** guide with a glossary, and a printable per-player **cheat sheet** with a daily-use tracker.

## Planning & direction
This project is steered from three plain-language files in this folder — the "command center" (also used to manage it from a Cowork project pointed at this repo):
- **[ROADMAP.md](ROADMAP.md)** — where it's been, where it is, what's next.
- **[DECISIONS.md](DECISIONS.md)** — the important calls and *why*.
- **[BACKLOG.md](BACKLOG.md)** — the running list of ideas.

## Running the game
Building the *app* and building the *game* are two different jobs:
- **[CAMPAIGN.md](CAMPAIGN.md)** — the campaign itself.
- **[DM_CRAFT.md](DM_CRAFT.md)** — a DM craft reference (~29k words) distilled from 20 sources: world-building, towns, cities, dungeons, campaigns, NPCs, monsters, combat, travel, prep. **A reference to reach for when wanted — not a process to follow.**
- **[DM_CRAFT_QUICK.md](DM_CRAFT_QUICK.md)** — a short router into the above: the laws, a symptom→section triage table (~45 symptoms → the section that addresses each), and templates. Handy when something feels off and you want to know why.

> These are **craft** references for *playing the game* — not a source of feature ideas for the app. And they're a **net, not a mould**: brainstorm first, check second. Working down a template produces a template.

## The two pages

Everything opens from the **RH main page** (`index.html`), a hub with two doors:

| Door | What it is |
|---|---|
| **Build a Hero** | the character builder your friends use |
| **Dungeon Master OS** | your private prep workspace (`dm.html`), behind a passcode |

The DM OS link is only on the main page, never inside the builder — so a player building a character has no path to your spoilers.

## Run it locally

It's a plain static site, no build step. Easiest: use the live link below. To run it on this machine, either:

- **Double-click `index.html`.** Everything works this way now — including the DM OS — because the campaign is a plain script file, not something fetched from disk.
- **Or match hosting** with a tiny server: `python -m http.server 8000`, then visit http://localhost:8000/ . (Handy during development; bump the `?v=` tags after editing so the browser doesn't serve a stale file.)

## Share it with friends (free hosted link via GitHub Pages)
1. Create a new repository on GitHub (e.g. `roll-a-hero`) and push this folder:
   ```bash
   git add -A
   git commit -m "Roll a Hero"
   git branch -M main
   git remote add origin https://github.com/<your-username>/roll-a-hero.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick **`main`** and **`/ (root)`**, then **Save**.
3. Wait ~1 minute. Your shareable link will be:
   `https://<your-username>.github.io/roll-a-hero/`

Send that link to your friends — nothing to install, it just opens in any brows