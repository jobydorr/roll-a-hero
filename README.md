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

**Double-click `start-roll-a-hero.cmd`.** It starts the little server, opens the Dungeon Master OS, and prints both addresses. Leave the black window open while you play; close it to stop. *(Make a desktop shortcut: right-click the file → Send to → Desktop.)*

| | |
|---|---|
| Players | http://localhost:8000/ |
| Dungeon Master | http://localhost:8000/dm.html |

**The DM OS needs the server** — it can't be opened by double-clicking `dm.html`. Browsers won't let a page read files from its own folder, so it couldn't load your `campaign/`. (The player app *can* be opened by double-clicking `index.html`, though the server matches hosting more closely.)

The launcher runs [`serve.py`](serve.py) rather than a bare `python -m http.server`, for two reasons worth knowing:

- **It binds to `127.0.0.1`.** The default binds *every* network interface, so anyone on your Wi-Fi could open `http://<your-laptop-ip>:8000/campaign/docs/` and read the whole campaign — directory listing and all — without ever touching the passcode. Gitignoring `campaign/` keeps the story off the internet; loopback binding keeps it off the living room.
- **It sends `Cache-Control: no-store`**, so you never have to remember `Ctrl+Shift+R` after changing a file.

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
| `dm.html` + `dmos-*.js` + `dmos.css` | The Dungeon Master OS — a separate, passcode-gated workspace |
| `serve.py` + `start-roll-a-hero.cmd` | The local server and its double-clickable launcher |
| `campaign/`  | Your campaign. **Gitignored on purpose** — it never reaches the public site |

## A note on rules
Simplified from the **D&D 5e Basic Rules / Player's Handbook** for teaching. It's meant as an on-ramp — once players are comfortable, the full rules add all the depth that was trimmed here.
