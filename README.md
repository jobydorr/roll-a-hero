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

## Run it locally
It's a plain static site — no build step, no dependencies. Either:

- **Quickest:** double-click `index.html`. *(Saving/printing all work; a couple of browsers are picky about local files, so if anything looks off, use the server method below.)*
- **Recommended (matches hosting):** from this folder run a tiny web server and open the address it prints:
  ```bash
  python -m http.server 8000
  # then visit http://localhost:8000
  ```

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

Send that link to your friends — nothing to install, it just opens in any browser.

## Files
| File | What it does |
|------|--------------|
| `index.html` | App shell + the printable character-sheet template |
| `styles.css` | The hybrid-fantasy look of the walkthrough (screen only) |
| `print.css`  | The clean black-and-white one-page sheet (print only) |
| `data.js`    | All the game content — races, classes, spells, gear, quiz |
| `app.js`     | The step-by-step walkthrough logic |
| `icons.js`   | Inline SVG icons |

## A note on rules
Simplified from the **D&D 5e Basic Rules / Player's Handbook** for teaching. It's meant as an on-ramp — once players are comfortable, the full rules add all the depth that was trimmed here.
