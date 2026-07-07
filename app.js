/* Roll a Hero — walkthrough logic (vanilla JS, no build step). */
(function () {
  'use strict';

  const {
    ABILITIES, DC_TABLE, RACES, CLASSES, SPELLS, EQUIPMENT, ADVENTURING_PACK,
    TRAITS, MOTIVATIONS, QUIZ, GLOSSARY, LEVEL, XP, PROFICIENCY, STANDARD_ARRAY,
  } = window.DATA;

  const STORAGE_KEY = 'rollAHeroCharacters';

  /* ----------------------------- State ---------------------------------- */
  function blankAssign() { return { str: null, dex: null, con: null, int: null, wis: null, cha: null }; }
  function newCharacter() {
    return {
      id: null, step: 'welcome',
      quizAnswers: [], quizLayout: null, recommendations: null, altRecs: null,
      rollMethod: '4d6', pool: null, lastRoll: null, rollsUsed: 0, assigned: blankAssign(),
      race: null, raceChoice: {},
      klass: null, archetype: null, fightingStyle: null,
      spells: [], equipment: {}, motiveShown: null,
      story: { name: '', traits: [], backstory: '', motivations: [] },
    };
  }
  let state = newCharacter();
  let selectedChip = null;
  let rollTimer = null;

  /* --------------------------- Lookups & math --------------------------- */
  const getRace = () => RACES.find(r => r.id === state.race) || null;
  const getClass = () => CLASSES.find(c => c.id === state.klass) || null;
  const getArchetype = () => { const c = getClass(); return c && state.archetype ? c.archetypes.find(a => a.id === state.archetype) : null; };
  const getSpell = (id) => SPELLS.find(s => s.id === id);
  const modOf = (score) => Math.floor((score - 10) / 2);
  const fmtMod = (m) => (m >= 0 ? '+' : '') + m;

  function racialBonuses() {
    const r = getRace(); if (!r) return {};
    const b = Object.assign({}, r.bonuses);
    if (r.id === 'half-elf' && Array.isArray(state.raceChoice.boosts)) {
      state.raceChoice.boosts.forEach(k => { b[k] = (b[k] || 0) + 1; });
    }
    return b;
  }
  const baseScore = (key) => { const i = state.assigned[key]; return i == null || !state.pool ? null : state.pool[i]; };
  function finalScore(key) { const b = baseScore(key); if (b == null) return null; return b + (racialBonuses()[key] || 0); }
  const dexMod = () => { const d = finalScore('dex'); return d == null ? 0 : modOf(d); };

  // HP is always maxed: the full hit die for every level, plus Con each level.
  function computeHP() { const c = getClass(); if (!c) return 0; const con = finalScore('con'); return c.hitDie * LEVEL + LEVEL * (con == null ? 0 : modOf(con)); }
  function weaponHasShield() { return (state.equipment.weapon || '').includes('shield'); }
  function hasShield() {
    const c = getClass(); if (!c) return false;
    if (c.id === 'cleric') return true;     // shield is part of the cleric kit
    return weaponHasShield();               // fighter & paladin choose a shield with their weapon
  }
  function computeAC() {
    const c = getClass(); if (!c) return 10;
    if (c.id === 'barbarian') { const con = finalScore('con'); return 10 + dexMod() + (con == null ? 0 : modOf(con)); }
    let base, cap;
    if (c.id === 'cleric') { const chain = state.equipment.armor === 'chain-mail'; base = chain ? 16 : 14; cap = chain ? 0 : 2; }
    else { base = c.armor.base; cap = c.armor.dexCap; }
    let ac = base + Math.min(dexMod(), cap);
    if (hasShield()) ac += 2;
    if (state.fightingStyle === 'defense') ac += 1;
    return ac;
  }
  function weaponAttackBonus() {
    const c = getClass(); if (!c) return PROFICIENCY;
    let key = 'str';
    if (c.id === 'rogue' || c.id === 'wizard' || c.id === 'ranger' || c.id === 'bard') key = 'dex';
    else if (c.id === 'fighter' || c.id === 'paladin') key = (finalScore('dex') > finalScore('str')) ? 'dex' : 'str';
    return PROFICIENCY + modOf(finalScore(key) || 10);
  }
  function spellPlan() { const c = getClass(); if (!c) return null; if (c.spellcaster) return c.spell; const a = getArchetype(); return a && a.spell ? a.spell : null; }
  function spellNumbers() { const p = spellPlan(); if (!p) return null; const m = modOf(finalScore(p.ability) || 10); return { atk: PROFICIENCY + m, dc: 8 + PROFICIENCY + m }; }
  const buildHasSpells = () => !!spellPlan();

  /* ------------------------------ Flow ---------------------------------- */
  function steps() {
    const s = ['welcome', 'quiz', 'roll', 'race', 'class', 'assign'];
    if (buildHasSpells()) s.push('magic');
    s.push('story', 'gear', 'finish');
    return s;
  }
  function go(stepId) { state.step = stepId; selectedChip = null; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function next() { const f = steps(); const i = f.indexOf(state.step); if (i >= 0 && i < f.length - 1) go(f[i + 1]); }
  function prev() {
    if (state.step === 'howto') return go('finish');
    const f = steps(); const i = f.indexOf(state.step); if (i > 0) go(f[i - 1]);
  }
  const announce = (msg) => { document.getElementById('live').textContent = msg; };
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ------------------------- Completion checks -------------------------- */
  function raceComplete() {
    const r = getRace(); if (!r) return false;
    if (r.choice) {
      if (r.choice.key === 'ancestry') return !!state.raceChoice.ancestry;
      if (r.choice.key === 'boosts') return (state.raceChoice.boosts || []).length === 2;
    }
    return true;
  }
  function classComplete() { const c = getClass(); if (!c || !state.archetype) return false; if (c.fightingStyles && !state.fightingStyle) return false; return true; }
  const assignComplete = () => ABILITIES.every(a => state.assigned[a.key] != null);
  function magicComplete() {
    const p = spellPlan(); if (!p) return true;
    const chosen = state.spells.map(getSpell).filter(Boolean);
    return chosen.filter(s => s.lvl === 0).length === p.cantrips && chosen.filter(s => s.lvl >= 1).length === p.leveled;
  }
  const storyComplete = () => state.story.name.trim().length > 0;
  function gearComplete() { const c = getClass(); if (!c) return false; return EQUIPMENT[c.id].choices.every(ch => state.equipment[ch.key]); }

  /* --------------------------- localStorage ----------------------------- */
  function loadAll() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { return []; } }
  function saveAll(list) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {} }
  function persist() {
    if (!state.id) state.id = 'h' + Date.now();
    const list = loadAll();
    const snap = JSON.parse(JSON.stringify(state));
    const i = list.findIndex(x => x.id === state.id);
    if (i >= 0) list[i] = snap; else list.push(snap);
    saveAll(list);
  }
  // Run a function with `state` temporarily pointed at another hero's snapshot
  // (used to compute/print a shared hero without disturbing the current one).
  function withState(snap, fn) { const saved = state; state = snap; try { return fn(); } finally { state = saved; } }

  /* --------------------- Export / Import (the safety net) --------------- */
  // Nothing here ever deletes a saved hero — export copies out, import merges in.
  function download(filename, text) {
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  const slugName = (s) => (String(s || 'hero').trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'hero').toLowerCase();
  function exportCharacter(snap) {
    download(`roll-a-hero-${slugName(snap.story && snap.story.name)}.json`,
      JSON.stringify({ app: 'roll-a-hero', kind: 'character', version: 1, character: snap }, null, 2));
  }
  function exportAll() {
    download(`roll-a-hero-backup-${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify({ app: 'roll-a-hero', kind: 'backup', version: 1, characters: loadAll() }, null, 2));
  }
  // Accept a single character, a full backup, a bare array, or a bare snapshot.
  function importFromData(data) {
    let incoming = [];
    if (data && data.kind === 'character' && data.character) incoming = [data.character];
    else if (data && data.kind === 'backup' && Array.isArray(data.characters)) incoming = data.characters;
    else if (Array.isArray(data)) incoming = data;
    else if (data && data.id && data.story) incoming = [data];
    if (!incoming.length) throw new Error('No Roll a Hero characters found in that file.');
    const list = loadAll();
    let added = 0, updated = 0;
    incoming.forEach(ch => {
      if (!ch || typeof ch !== 'object') return;
      if (!ch.id) ch.id = 'h' + Date.now() + Math.floor(Math.random() * 1000);
      const i = list.findIndex(x => x.id === ch.id);
      if (i >= 0) { list[i] = ch; updated++; } else { list.push(ch); added++; }
    });
    saveAll(list);
    return { added, updated };
  }
  function importFromFile(file, done) {
    const reader = new FileReader();
    reader.onload = () => { try { done(null, importFromData(JSON.parse(reader.result))); } catch (e) { done(e); } };
    reader.onerror = () => done(new Error('Could not read that file.'));
    reader.readAsText(file);
  }

  /* ---------------- Profile, share records & share dialogs -------------- */
  const PROFILE_KEY = 'rollAHeroProfile';
  const SHARES_KEY = 'rollAHeroShares';
  const sharingAvailable = () => !!(window.RAHSync && window.RAHSync.available);
  // Campaign codes double as storage ids — normalise to a safe slug everywhere.
  const campaignSlug = (s) => String(s || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

  function getProfile() {
    let p; try { p = JSON.parse(localStorage.getItem(PROFILE_KEY)) || {}; } catch (e) { p = {}; }
    if (p.campaign && !p.campaigns) { p.campaigns = [campaignSlug(p.campaign)]; p.lastCampaign = p.campaigns[0]; delete p.campaign; } // migrate old {name,campaign}
    if (!Array.isArray(p.campaigns)) p.campaigns = [];
    return p;
  }
  function saveProfile(p) { try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) {} }

  // Local mirror of which campaigns each hero is shared to — keeps the UI instant;
  // reconciled against the server on the welcome screen (see reconcileShares).
  function getShares() { try { return JSON.parse(localStorage.getItem(SHARES_KEY)) || {}; } catch (e) { return {}; } }
  function setShares(m) { try { localStorage.setItem(SHARES_KEY, JSON.stringify(m)); } catch (e) {} }
  const sharedCampaignsOf = (charId) => getShares()[charId] || [];
  function addShareRecord(charId, camp) { const m = getShares(); const set = new Set(m[charId] || []); set.add(camp); m[charId] = [...set]; setShares(m); }
  function removeShareRecord(charId, camp) { const m = getShares(); m[charId] = (m[charId] || []).filter(c => c !== camp); if (!m[charId].length) delete m[charId]; setShares(m); }

  // Rebuild the local mirror from the server for the given campaigns, so "Shared"
  // badges and delete-also-unshares stay correct (incl. heroes shared before this).
  async function reconcileShares(campaigns) {
    if (!sharingAvailable() || !campaigns || !campaigns.length) return;
    const m = getShares();
    for (const camp of campaigns) {
      let ids; try { ids = await RAHSync.mySharedIds(camp); } catch (e) { continue; }
      const idset = new Set(ids);
      Object.keys(m).forEach(cid => { m[cid] = (m[cid] || []).filter(c => c !== camp); if (!m[cid].length) delete m[cid]; });
      idset.forEach(cid => { const set = new Set(m[cid] || []); set.add(camp); m[cid] = [...set]; });
    }
    setShares(m);
  }
  function refreshShareButtons(scope) {
    (scope || document).querySelectorAll('[data-share]').forEach(b => {
      if (sharedCampaignsOf(b.dataset.share).length) { b.classList.remove('btn-gold'); b.classList.add('btn-ghost'); b.innerHTML = `${icon('check')} Shared`; }
      else { b.classList.add('btn-gold'); b.classList.remove('btn-ghost'); b.innerHTML = `${icon('shield')} Share`; }
    });
  }

  /* ------------------------------- Modal -------------------------------- */
  function closeModal() { const m = document.querySelector('.modal-overlay'); if (m) m.remove(); document.removeEventListener('keydown', escClose); }
  function escClose(e) { if (e.key === 'Escape') closeModal(); }
  function openModal(contentHtml, wire) {
    closeModal();
    const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${contentHtml}</div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', escClose);
    if (wire) wire(overlay.querySelector('.modal'), closeModal);
  }

  // First-time (or new-page) share: name + pick an existing share page or make one.
  function openShareDialog(snap) {
    if (!sharingAvailable()) { alert('Sharing is offline right now. You can still “Export” this hero to a file.'); return; }
    const prof = getProfile();
    const camps = prof.campaigns || [];
    const already = sharedCampaignsOf(snap.id);
    const openCamps = camps.filter(c => !already.includes(c));
    const heroName = (snap.story && snap.story.name) || 'this hero';
    const choices = camps.map(c => {
      const isShared = already.includes(c);
      return `<label class="modal-choice"><input type="radio" name="camp" value="${escapeHtml(c)}" ${isShared ? 'disabled' : ''}><span>${escapeHtml(c)}${isShared ? ' — already shared' : ''}</span></label>`;
    }).join('');
    openModal(`
      <h3 class="modal-title">${icon('shield')} Share “${escapeHtml(heroName)}”</h3>
      <p class="modal-sub">Send a copy to a shared page your DM can see. Your hero stays saved right here in this browser.</p>
      <div class="field"><label>Your display name</label><input type="text" id="mdName" value="${escapeHtml(prof.name || '')}" placeholder="e.g. your first name" maxlength="40"></div>
      <div class="field"><label>Share page</label>
        ${camps.length ? `<div class="modal-choices">${choices}<label class="modal-choice"><input type="radio" name="camp" value="__new__"><span>＋ New share page…</span></label></div>` : ''}
        <input type="text" id="mdNewCamp" placeholder="Campaign code — ask your DM, or make one up" maxlength="60" ${camps.length ? 'style="display:none;margin-top:8px;"' : ''}>
        <p class="modal-hint">Everyone in your group types the <strong>same</strong> code. Your DM opens that code to see the whole party.</p>
      </div>
      <div class="modal-actions">
        <button class="btn btn-ghost btn-sm" data-cancel>Cancel</button><div class="spacer"></div>
        <button class="btn btn-gold btn-sm" data-confirm>${icon('shield')} Share</button>
      </div>`, (modal, close) => {
      const newInput = modal.querySelector('#mdNewCamp');
      const radios = [...modal.querySelectorAll('input[name="camp"]')];
      const sync = () => { const sel = modal.querySelector('input[name="camp"]:checked'); const showNew = !camps.length || (sel && sel.value === '__new__'); newInput.style.display = showNew ? 'block' : 'none'; if (showNew) newInput.focus(); };
      radios.forEach(r => r.onchange = sync);
      if (camps.length) {
        const pref = (prof.lastCampaign && openCamps.includes(prof.lastCampaign)) ? prof.lastCampaign : (openCamps[0] || '__new__');
        const t = radios.find(r => r.value === pref) || radios.find(r => r.value === '__new__'); if (t) t.checked = true;
      }
      sync();
      modal.querySelector('[data-cancel]').onclick = close;
      modal.querySelector('[data-confirm]').onclick = async () => {
        const name = (modal.querySelector('#mdName').value || '').trim().slice(0, 40);
        if (!name) { modal.querySelector('#mdName').focus(); return; }
        const sel = modal.querySelector('input[name="camp"]:checked');
        const code = (!camps.length || !sel || sel.value === '__new__') ? campaignSlug(newInput.value) : campaignSlug(sel.value);
        if (!code) { newInput.focus(); return; }
        const btn = modal.querySelector('[data-confirm]'); btn.disabled = true; btn.innerHTML = 'Sharing…';
        try {
          const p = getProfile(); p.name = name; p.campaigns = [...new Set([...(p.campaigns || []), code])]; p.lastCampaign = code; saveProfile(p);
          await RAHSync.shareCharacter(snap, code, name);
          addShareRecord(snap.id, code); announce('Shared “' + heroName + '”.'); close(); render();
        } catch (e) { btn.disabled = false; btn.innerHTML = `${icon('shield')} Share`; alert('Sharing didn\'t work: ' + ((e && e.message) || e) + '\n\nYour hero is still safe in this browser.'); }
      };
    });
  }

  // For an already-shared hero: see where it's shared and unshare, or add a page.
  function openManageShareDialog(snap) {
    const already = sharedCampaignsOf(snap.id);
    const heroName = (snap.story && snap.story.name) || 'this hero';
    const rows = already.map(c => `<div class="manage-row"><span>${escapeHtml(c)}</span><div class="spacer"></div><button class="btn btn-sm btn-ghost" data-unshare="${escapeHtml(c)}">Unshare</button></div>`).join('');
    openModal(`
      <h3 class="modal-title">${icon('shield')} Sharing for “${escapeHtml(heroName)}”</h3>
      <p class="modal-sub">Shared to ${already.length} page${already.length === 1 ? '' : 's'}. <strong>Unshare</strong> removes the copy from the DM's page — your hero here is untouched.</p>
      <div class="manage-list">${rows || '<p class="modal-hint">Not shared anywhere yet.</p>'}</div>
      <div class="modal-actions">
        <button class="btn btn-ghost btn-sm" data-cancel>Close</button><div class="spacer"></div>
        <button class="btn btn-gold btn-sm" data-add>＋ Share to another page</button>
      </div>`, (modal, close) => {
      modal.querySelector('[data-cancel]').onclick = close;
      modal.querySelector('[data-add]').onclick = () => { close(); openShareDialog(snap); };
      modal.querySelectorAll('[data-unshare]').forEach(b => b.onclick = async () => {
        const camp = b.dataset.unshare; b.disabled = true; b.textContent = '…';
        try { await RAHSync.unshareCharacter(snap.id, camp); removeShareRecord(snap.id, camp); announce('Unshared from “' + camp + '”.'); close(); render(); }
        catch (e) { b.disabled = false; b.textContent = 'Unshare'; alert('Could not unshare: ' + ((e && e.message) || e)); }
      });
    });
  }

  /* ----------------------------- Quiz logic ----------------------------- */
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const randPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Build a randomized-but-stable quiz layout: for each question, always include
  // any pinned group, fill up to `show` with a random selection of the rest, shuffle
  // the order, and pick one random wording variant per group. Cached on state so it
  // stays put while the user answers; rebuilt fresh for each new hero.
  function buildQuizLayout() {
    return QUIZ.map(q => {
      const pinned = q.groups.filter(g => g.pin);
      const rest = shuffle(q.groups.filter(g => !g.pin));
      const need = Math.max(0, (q.show || 5) - pinned.length);
      const chosen = shuffle(pinned.concat(rest.slice(0, need)));
      return { q: q.q, options: chosen.map(g => ({ tags: g.tags, label: randPick(g.variants) })) };
    });
  }
  function ensureQuizLayout() { if (!state.quizLayout) state.quizLayout = buildQuizLayout(); return state.quizLayout; }

  function scoreQuiz() {
    const sc = {};
    (state.quizLayout || []).forEach((q, qi) => {
      const opt = state.quizAnswers[qi];
      if (opt == null || !q.options[opt]) return;
      const tags = q.options[opt].tags;
      for (const k in tags) sc[k] = (sc[k] || 0) + tags[k];
    });
    return sc;
  }
  const rankClasses = (sc) => CLASSES.map(c => ({ c, s: sc[c.id] || 0 })).sort((a, b) => b.s - a.s);
  const rankRaces = (sc) => RACES.map(r => ({ r, s: sc[r.id] || 0 })).sort((a, b) => b.s - a.s);
  const rankArchetypes = (c, sc) => c.archetypes.map(a => ({ a, s: sc[a.id] || 0 })).sort((x, y) => y.s - x.s);
  const comboOf = (race, c, a) => ({ race: { id: race.id, name: race.name }, klass: { id: c.id, name: c.name }, arch: { id: a.id, name: a.name }, why: a.desc });
  const comboKey = (r) => r.race.id + '|' + r.klass.id + '|' + r.arch.id;

  // Sensible "classic" race pairings per class, so suggestions stay fitting even
  // when the quiz gives a race little signal — and so the randomizer has good
  // candidates to vary between.
  const RACE_AFFINITY = {
    fighter: { 'half-orc': 3, dwarf: 3, dragonborn: 3, human: 2, 'half-elf': 1 },
    rogue: { halfling: 3, elf: 3, tiefling: 2, human: 2, gnome: 1, 'half-elf': 1 },
    wizard: { gnome: 3, elf: 2, tiefling: 2, human: 2, 'half-elf': 1 },
    cleric: { human: 3, 'half-elf': 3, dwarf: 2, dragonborn: 2, halfling: 1 },
    barbarian: { 'half-orc': 3, dwarf: 3, dragonborn: 2, human: 2, halfling: 1 },
    paladin: { human: 3, dragonborn: 2, 'half-elf': 2, dwarf: 2, halfling: 1 },
    ranger: { elf: 3, halfling: 2, human: 2, 'half-elf': 2, dwarf: 1, gnome: 1 },
    bard: { 'half-elf': 3, tiefling: 2, human: 2, halfling: 2, gnome: 1, elf: 1 },
  };
  function pickArchetype(c, sc) {
    const ranked = rankArchetypes(c, sc); const best = ranked[0].s;
    return randPick(ranked.filter(x => x.s >= best - 1)).a; // random among near-best for variety
  }
  function pickRaceFor(c, sc, used) {
    const aff = RACE_AFFINITY[c.id] || {};
    const cands = RACES.filter(r => !used.has(r.id))
      .map(r => ({ r, w: (sc[r.id] || 0) * 1.5 + (aff[r.id] || 0) + Math.random() * 2.5 }))
      .sort((a, b) => b.w - a.w);
    return cands.length ? cands[0].r : RACES[0];
  }
  // The class/specialty stay tied to the quiz; the race pairing and (near-tied)
  // specialty are randomized, so the same answers give fresh combos each visit.
  function buildRecommendations() {
    const sc = scoreQuiz();
    const classes = CLASSES.map(c => ({ c, w: (sc[c.id] || 0) + Math.random() * 0.6 }))
      .sort((a, b) => b.w - a.w).map(x => x.c);
    const used = new Set(); const recs = [];
    for (let i = 0; i < 3 && i < classes.length; i++) {
      const c = classes[i], a = pickArchetype(c, sc), race = pickRaceFor(c, sc, used);
      used.add(race.id);
      recs.push(comboOf(race, c, a));
    }
    return recs;
  }

  // A handful of fresh, varied alternatives that aren't already in the primary list.
  // Pairs ranked classes with their 1st/2nd archetypes and a rotating set of fitting
  // races; lightly randomized so "shuffle" gives new ideas each press.
  function buildAltRecommendations() {
    const sc = scoreQuiz();
    const classRank = rankClasses(sc), raceRank = rankRaces(sc);
    const taken = new Set((state.recommendations || []).map(comboKey));
    const usedRaces = new Set((state.recommendations || []).map(r => r.race.id));
    // candidate races: the top scorers plus a couple of wildcards for flavor
    const top = raceRank.slice(0, 6).map(x => x.r);
    const wild = shuffle(raceRank.slice(6).map(x => x.r)).slice(0, 2);
    const raceQueue = shuffle(top.concat(wild));
    let ri = 0;
    const nextRace = () => {
      for (let k = 0; k < raceQueue.length; k++) { const r = raceQueue[(ri + k) % raceQueue.length]; if (!usedRaces.has(r.id)) { ri += k + 1; usedRaces.add(r.id); return r; } }
      const r = raceQueue[ri % raceQueue.length]; ri++; return r;
    };
    const combos = [];
    for (const cr of classRank) {
      for (const ar of rankArchetypes(cr.c, sc).slice(0, 2)) {
        const combo = comboOf(nextRace(), cr.c, ar.a);
        if (taken.has(comboKey(combo))) continue;
        taken.add(comboKey(combo));
        combos.push(combo);
        if (combos.length >= 3) return combos;
      }
    }
    return combos;
  }
  const isRec = (type, id) => state.recommendations ? state.recommendations.some(r =>
    (type === 'race' && r.race.id === id) || (type === 'class' && r.klass.id === id) || (type === 'arch' && r.arch.id === id)) : false;

  /* ------------------------------ Dice ---------------------------------- */
  const roll4d6 = () => { const d = [0, 0, 0, 0].map(() => 1 + Math.floor(Math.random() * 6)).sort((a, b) => a - b); return d[1] + d[2] + d[3]; };
  const rollPool = () => Array.from({ length: 6 }, roll4d6);

  function setMethod(m) {
    if (rollTimer) { clearInterval(rollTimer); rollTimer = null; }
    state.rollMethod = m; state.assigned = blankAssign();
    state.pool = (m === 'array') ? STANDARD_ARRAY.slice() : state.lastRoll; // keep the last dice roll, if any
    render();
    if (m === 'array') announce('Standard scores ready: ' + STANDARD_ARRAY.join(', '));
  }
  function doRoll() {
    if (rollTimer) clearInterval(rollTimer);
    if ((state.rollsUsed || 0) >= 2) return; // first roll + exactly one re-roll
    state.rollsUsed = (state.rollsUsed || 0) + 1;
    state.assigned = blankAssign();
    state.pool = rollPool(); state.lastRoll = state.pool;
    render();
    const dice = [...document.querySelectorAll('.die')];
    dice.forEach(d => d.classList.add('rolling'));
    let t = 0;
    rollTimer = setInterval(() => {
      dice.forEach(d => { d.textContent = 1 + Math.floor(Math.random() * 18); });
      t += 80;
      if (t >= 880) {
        clearInterval(rollTimer); rollTimer = null;
        dice.forEach((d, i) => { d.classList.remove('rolling'); d.textContent = state.pool[i]; });
        announce('You rolled: ' + state.pool.join(', '));
      }
    }, 80);
  }

  /* --------------------- Equipment / abilities helpers ------------------ */
  function resolvedEquipment() {
    const c = getClass(); if (!c) return []; const eq = EQUIPMENT[c.id]; const out = [];
    eq.choices.forEach(ch => { const o = ch.options.find(x => x.id === state.equipment[ch.key]); if (o) out.push(o.name); });
    out.push(...eq.auto);
    return out;
  }
  function specialAbilities() {
    const list = []; const r = getRace(), c = getClass(), a = getArchetype();
    if (r) list.push({ name: r.name + ': ' + r.signature.name, desc: r.signature.desc });
    if (c) c.features.forEach(f => list.push({ name: f.name, desc: f.desc }));
    if (c && c.fightingStyles && state.fightingStyle) { const st = c.fightingStyles.find(s => s.id === state.fightingStyle); if (st) list.push({ name: 'Fighting Style: ' + st.name, desc: st.desc }); }
    if (a && a.feature) list.push({ name: a.name + ': ' + a.feature.name, desc: a.feature.desc });
    return list;
  }
  function chosenSpellsGrouped() {
    const chosen = state.spells.map(getSpell).filter(Boolean);
    return {
      cant: chosen.filter(s => s.lvl === 0).map(s => s.name),
      lev: chosen.filter(s => s.lvl >= 1).sort((a, b) => a.lvl - b.lvl).map(s => s.name + (s.lvl > 1 ? ` (lvl ${s.lvl})` : '')),
    };
  }

  /* ------------------------------ Header -------------------------------- */
  function updateHeader() {
    document.getElementById('brandMark').innerHTML = icon('dice');
    const prog = document.getElementById('progress');
    if (state.step === 'welcome' || state.step === 'dm') { prog.hidden = true; return; }
    const build = steps().filter(s => s !== 'welcome');
    let idx = build.indexOf(state.step);
    if (state.step === 'howto') { prog.hidden = true; return; }
    prog.hidden = false;
    const pct = Math.round((idx / (build.length - 1)) * 100);
    document.getElementById('progressFill').style.width = pct + '%';
    const labels = { quiz: 'Playstyle', roll: 'Roll Dice', race: 'Choose Race', class: 'Choose Class', assign: 'Abilities', magic: 'Magic', story: 'Your Story', gear: 'Gear Up', finish: 'Finish' };
    document.getElementById('progressLabel').textContent = `Step ${idx + 1} of ${build.length} · ${labels[state.step] || ''}`;
  }

  /* ---------------------- Shared footer / wiring ------------------------ */
  function footer(opts) {
    const o = Object.assign({ back: true, next: true, nextLabel: 'Next →', nextDisabled: false, extra: '' }, opts || {});
    return `<div class="actions">
      ${o.back ? '<button class="btn btn-ghost" data-act="back">← Back</button>' : ''}
      <div class="spacer"></div>${o.extra}
      ${o.next ? `<button class="btn btn-primary" data-act="next" ${o.nextDisabled ? 'disabled' : ''}>${o.nextLabel}</button>` : ''}
    </div>`;
  }
  function wireFooter(host) {
    host.querySelectorAll('[data-act="back"]').forEach(b => b.onclick = prev);
    host.querySelectorAll('[data-act="next"]').forEach(b => b.onclick = next);
  }

  /* ============================ RENDERERS =============================== */
  const RENDER = {};

  RENDER.welcome = (host) => {
    const saved = loadAll();
    const prof = getProfile();
    const canShare = sharingAvailable();
    host.innerHTML = `
      <div class="step hero-splash">
        <div class="crest">${icon('dice')}</div>
        <h1 class="title">Roll a Hero</h1>
        <p class="lead" style="margin:0 auto;">Build your very own Dungeons &amp; Dragons character — step by step — and learn how to play along the way. No experience needed!</p>
        <div class="actions" style="justify-content:center;">
          <button class="btn btn-primary btn-lg" id="startBtn">${icon('star')} Start a New Hero</button>
        </div>
      </div>
      ${saved.length ? `
      <div class="panel">
        <div class="panel-head">
          <h2 class="title" style="font-size:22px;margin:0;">Your Saved Heroes</h2>
          <div class="spacer"></div>
          <button class="btn btn-sm btn-ghost" id="importBtn">${icon('book')} Import</button>
          <button class="btn btn-sm btn-ghost" id="backupAllBtn">${icon('scroll')} Back up all</button>
        </div>
        <div class="saved-list" id="savedList"></div>
      </div>`
      : `<div class="welcome-tools"><button class="btn btn-sm btn-ghost" id="importBtn">${icon('book')} Import a hero from a file</button></div>`}
      ${canShare ? `<div class="welcome-tools"><button class="btn btn-sm btn-ghost" id="dmViewBtn">${icon('shield')} DM: view a shared party</button></div>` : ''}
      <input type="file" id="importInput" accept="application/json,.json" hidden>
    `;
    document.getElementById('startBtn').onclick = () => { state = newCharacter(); go('quiz'); };

    if (saved.length) {
      const list = document.getElementById('savedList');
      saved.forEach(snap => {
        const r = RACES.find(x => x.id === snap.race), c = CLASSES.find(x => x.id === snap.klass);
        const a = c && snap.archetype ? c.archetypes.find(x => x.id === snap.archetype) : null;
        const row = document.createElement('div'); row.className = 'saved-row';
        row.innerHTML = `<span class="saved-name">${escapeHtml((snap.story && snap.story.name) || 'Unnamed Hero')}</span>
          <span class="saved-meta">${r ? r.name : '?'} ${c ? c.name : ''}${a ? ' · ' + a.name : ''} · Level ${LEVEL}</span>
          <div class="spacer"></div>
          <button class="btn btn-sm" data-open="${snap.id}">Open</button>
          ${canShare ? `<button class="btn btn-sm btn-gold" data-share="${snap.id}">${icon('shield')} Share</button>` : ''}
          <button class="btn btn-sm btn-ghost" data-export="${snap.id}">Export</button>
          <button class="btn btn-sm btn-ghost" data-del="${snap.id}">Delete</button>`;
        list.appendChild(row);
      });
      list.querySelectorAll('[data-open]').forEach(b => b.onclick = () => { const s = loadAll().find(x => x.id === b.dataset.open); if (s) { state = s; go('finish'); } });
      list.querySelectorAll('[data-export]').forEach(b => b.onclick = () => { const s = loadAll().find(x => x.id === b.dataset.export); if (s) exportCharacter(s); });
      // Share: first time opens the share dialog; once shared, opens "manage" (unshare / add page).
      list.querySelectorAll('[data-share]').forEach(b => b.onclick = () => {
        const s = loadAll().find(x => x.id === b.dataset.share); if (!s) return;
        if (sharedCampaignsOf(s.id).length) openManageShareDialog(s); else openShareDialog(s);
      });
      // Delete also removes the hero from any shared page it's on.
      list.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => {
        const s = loadAll().find(x => x.id === b.dataset.del);
        const shares = sharedCampaignsOf(b.dataset.del);
        const extra = shares.length ? ` It'll also be removed from ${shares.length > 1 ? 'its shared pages' : 'the shared page'}.` : '';
        if (!confirm(`Delete "${(s && s.story && s.story.name) || 'this hero'}" from this browser?${extra}\n\nTip: Export it first if you might want it back.`)) return;
        if (sharingAvailable() && shares.length) { for (const c of shares) { try { await RAHSync.unshareCharacter(b.dataset.del, c); } catch (e) {} removeShareRecord(b.dataset.del, c); } }
        saveAll(loadAll().filter(x => x.id !== b.dataset.del)); render();
      });
      // Instant "Shared" badges from the local mirror, then reconcile with the server.
      refreshShareButtons(list);
      if (canShare) { const prof = getProfile(); if (prof.campaigns.length) reconcileShares(prof.campaigns).then(() => refreshShareButtons(list)).catch(() => {}); }
    }

    // Import works with or without saved heroes (e.g. a fresh device).
    const importInput = document.getElementById('importInput');
    const importBtn = document.getElementById('importBtn');
    if (importBtn) importBtn.onclick = () => importInput.click();
    if (importInput) importInput.onchange = () => {
      const file = importInput.files && importInput.files[0]; if (!file) return;
      importFromFile(file, (err, res) => {
        importInput.value = '';
        if (err) { alert('Import failed: ' + err.message); return; }
        alert(`Imported ${res.added} new hero${res.added === 1 ? '' : 'es'}` + (res.updated ? `, updated ${res.updated}.` : '.'));
        render();
      });
    };
    const backupBtn = document.getElementById('backupAllBtn');
    if (backupBtn) backupBtn.onclick = () => { exportAll(); announce('Backed up all heroes to a file.'); };
    const dmBtn = document.getElementById('dmViewBtn');
    if (dmBtn) dmBtn.onclick = () => go('dm');
  };

  RENDER.dm = (host) => {
    const prof = getProfile();
    if (!sharingAvailable()) {
      host.innerHTML = `<div class="step"><p class="eyebrow">Dungeon Master</p><h2 class="title">${icon('shield')} The shared party</h2>
        <p class="note">Online sharing is offline right now — reconnect to the internet to view shared heroes.</p>
        <div class="actions"><button class="btn" id="dmBack">← Back</button></div></div>`;
      document.getElementById('dmBack').onclick = () => go('welcome');
      return;
    }
    if (!prof.dmCampaign) {
      host.innerHTML = `<div class="step"><p class="eyebrow">Dungeon Master</p><h2 class="title">${icon('shield')} View the shared party</h2>
        <p class="lead">Enter your group's campaign code to see every hero your players have shared. (Pick any code you like and give it to your players — they type the same one.)</p>
        <div class="field" style="max-width:440px;"><label>Campaign code</label><input type="text" id="dmCode" placeholder="e.g. dragons-of-summer" maxlength="60"></div>
        <div class="actions"><button class="btn btn-ghost" id="dmBack">← Back</button><div class="spacer"></div><button class="btn btn-primary" id="dmGo">Show the party →</button></div></div>`;
      const goShow = () => { const c = campaignSlug(document.getElementById('dmCode').value); if (!c) return; const p = getProfile(); p.dmCampaign = c; saveProfile(p); render(); };
      document.getElementById('dmGo').onclick = goShow;
      document.getElementById('dmCode').addEventListener('keydown', e => { if (e.key === 'Enter') goShow(); });
      document.getElementById('dmBack').onclick = () => go('welcome');
      return;
    }
    const camp = prof.dmCampaign;
    host.innerHTML = `<div class="step">
      <p class="eyebrow">Dungeon Master · campaign “${escapeHtml(camp)}”</p>
      <h2 class="title">${icon('shield')} The shared party</h2>
      <p class="lead" id="dmStatus">Loading shared heroes…</p>
      <div class="saved-list" id="dmList"></div>
      <div class="actions">
        <button class="btn btn-ghost" id="dmBack">← Back</button>
        <div class="spacer"></div>
        <button class="btn btn-sm btn-ghost" id="dmChange">Change code</button>
        <button class="btn btn-sm" id="dmRefresh">${icon('dice')} Refresh</button>
      </div></div>`;
    document.getElementById('dmBack').onclick = () => go('welcome');
    document.getElementById('dmRefresh').onclick = () => render();
    document.getElementById('dmChange').onclick = () => { const p = getProfile(); delete p.dmCampaign; saveProfile(p); render(); };
    const status = document.getElementById('dmStatus'); const list = document.getElementById('dmList');
    RAHSync.listCampaign(camp).then(rows => {
      rows = rows.filter(row => row && row.character);
      if (!rows.length) { status.innerHTML = 'No heroes shared here yet. Give your players the campaign code <strong>“' + escapeHtml(camp) + '”</strong> and have them tap <strong>Share</strong> on a hero.'; return; }
      status.textContent = `${rows.length} hero${rows.length === 1 ? '' : 'es'} shared with you.`;
      rows.forEach(row => {
        const snap = row.character;
        const info = withState(snap, () => { const r = getRace(), c = getClass(), a = getArchetype(); return { r: r, c: c, a: a, hp: computeHP(), ac: computeAC() }; });
        const el = document.createElement('div'); el.className = 'saved-row';
        el.innerHTML = `<div style="min-width:0;">
            <div class="saved-name">${escapeHtml(row.name || (snap.story && snap.story.name) || 'Unnamed Hero')}</div>
            <div class="saved-meta">by ${escapeHtml(row.ownerName || 'someone')} · ${info.r ? info.r.name : '?'} ${info.c ? info.c.name : ''}${info.a ? ' · ' + info.a.name : ''} · Lvl ${LEVEL} · ${info.hp} HP · AC ${info.ac}</div>
          </div>
          <div class="spacer"></div>
          <button class="btn btn-sm btn-primary" data-print>${icon('print')} View / Print</button>
          <button class="btn btn-sm btn-ghost" data-copy>${icon('star')} Save a copy</button>`;
        el.querySelector('[data-print]').onclick = () => withState(snap, () => { populateSheet(); populateReference(); window.print(); });
        el.querySelector('[data-copy]').onclick = (ev) => {
          importFromData({ kind: 'character', character: JSON.parse(JSON.stringify(snap)) });
          announce('Saved a copy to this browser.');
          ev.currentTarget.disabled = true; ev.currentTarget.innerHTML = `${icon('check')} Saved`;
        };
        list.appendChild(el);
      });
    }).catch(e => { status.innerHTML = 'Couldn\'t load the party: ' + escapeHtml(e && e.message ? e.message : String(e)); });
  };

  RENDER.quiz = (host) => {
    host.innerHTML = `
      <div class="step">
        <p class="eyebrow">Let's find your style</p>
        <h2 class="title">What kind of hero do you want to be?</h2>
        <p class="lead">Answer a few quick questions and we'll suggest some heroes that match. You can always change anything later — or skip straight to building.</p>
        <div id="quizBody"></div>
        ${footer({ back: true, next: false, extra: `<button class="btn btn-ghost" id="seeAll">Skip — I'll choose myself →</button>` })}
      </div>`;
    const body = document.getElementById('quizBody');
    const layout = ensureQuizLayout();
    layout.forEach((q, qi) => {
      const block = document.createElement('div'); block.className = 'panel';
      block.innerHTML = `<div class="spell-section-head" style="margin-top:0;">${qi + 1}. ${q.q}</div>
        <div class="card-grid" style="margin:8px 0 0;"></div>`;
      const grid = block.querySelector('.card-grid');
      q.options.forEach((opt, oi) => {
        const b = document.createElement('button'); b.className = 'choice-card' + (state.quizAnswers[qi] === oi ? ' selected' : '');
        b.innerHTML = `<div class="cc-desc" style="font-size:15px;color:var(--ink);">${opt.label}</div>`;
        b.onclick = () => { state.quizAnswers[qi] = oi; render(); updateQuizResult(); };
        grid.appendChild(b);
      });
      body.appendChild(block);
    });
    const result = document.createElement('div'); result.id = 'quizResult'; body.appendChild(result);
    updateQuizResult();
    document.getElementById('seeAll').onclick = () => { if (state.quizAnswers.filter(a => a != null).length) state.recommendations = buildRecommendations(); go('roll'); };
    wireFooter(host);

    function recCard(rec, isTop) {
      const card = document.createElement('button'); card.className = 'choice-card rec-card' + (isTop ? ' top' : '');
      card.innerHTML = `${isTop ? `<span class="rec-badge">${icon('star')} Best match</span>` : ''}
        <div class="rec-combo">${rec.race.name} ${rec.klass.name}</div>
        <div class="cc-sub">Specialty: ${rec.arch.name}</div>
        <div class="rec-why">${rec.why}</div>
        <div class="cc-meta"><span class="tag">Tap to build →</span></div>`;
      card.onclick = () => applyRecommendation(rec);
      return card;
    }
    function updateQuizResult() {
      const answered = state.quizAnswers.filter(a => a != null).length;
      const res = document.getElementById('quizResult'); if (!res) return;
      if (answered < layout.length) { res.innerHTML = `<p class="note">Answer all ${layout.length} questions to see your matches (${answered}/${layout.length} done).</p>`; return; }
      state.recommendations = buildRecommendations();
      state.altRecs = null;
      res.innerHTML = `<h3 class="spell-section-head">✨ Your top matches</h3>
        <p class="lead" style="font-size:16px;">Tap one to start building it — these are just friendly suggestions. You’ll still see <strong>every</strong> race and class in the next steps, and can change anything. Prefer to choose it all yourself? Hit “Skip” below.</p>
        <div class="rec-grid" id="topRecGrid"></div>
        <div style="text-align:center;margin:6px 0;"><button class="btn btn-ghost btn-sm" id="moreRecsBtn">Show me a few more heroes ↓</button></div>
        <div class="rec-grid" id="altRecGrid"></div>`;
      const grid = res.querySelector('#topRecGrid');
      state.recommendations.forEach((rec, i) => grid.appendChild(recCard(rec, i === 0)));
      document.getElementById('moreRecsBtn').onclick = renderAlts;
    }
    function renderAlts() {
      state.altRecs = buildAltRecommendations();
      const altGrid = document.getElementById('altRecGrid'); if (!altGrid) return;
      altGrid.innerHTML = '';
      state.altRecs.forEach(rec => altGrid.appendChild(recCard(rec, false)));
      const btn = document.getElementById('moreRecsBtn');
      if (btn) btn.innerHTML = `${icon('dice')} Shuffle these ideas`;
    }
  };

  function applyRecommendation(rec) {
    state.race = rec.race.id; state.raceChoice = {};
    state.klass = rec.klass.id; state.archetype = rec.arch.id;
    state.fightingStyle = null; state.spells = []; state.equipment = {};
    go('roll');
  }

  RENDER.roll = (host) => {
    const rolled = !!state.pool;
    const isArray = state.rollMethod === 'array';
    const used = state.rollsUsed || 0;
    let actionHtml;
    if (isArray) {
      actionHtml = `<div class="note" style="display:inline-block;text-align:left;">These are the balanced “standard” hero scores: <strong>15, 14, 13, 12, 10, 8</strong>. Pick this if you’d rather not leave it to luck!</div>`;
    } else {
      const label = used === 0 ? 'Roll the dice!' : (used === 1 ? `${icon('dice')} Roll again — last chance!` : 'These are your numbers!');
      const note = used >= 2
        ? 'You’ve used your one re-roll — these are your hero’s numbers!'
        : (used === 1 ? 'You have <strong>one re-roll</strong> left — roll again, or keep these.' : 'You get your roll plus <strong>one</strong> re-roll, so choose wisely!');
      actionHtml = `<button class="btn btn-primary btn-lg" id="rollBtn" ${used >= 2 ? 'disabled' : ''}>${label}</button>
        <div class="note" style="display:inline-block;margin-top:14px;">${note}</div>`;
    }
    host.innerHTML = `
      <div class="step">
        <p class="eyebrow">Step 1 · The dice decide</p>
        <h2 class="title">Roll for your hero's gifts</h2>
        <p class="lead">Every hero is shaped by six abilities. We'll roll six numbers for you (the higher, the better) and you'll place them on your abilities once you've picked who your hero is.</p>
        <div class="toggle-row">
          <button class="btn btn-sm ${!isArray ? 'btn-gold' : 'btn-ghost'}" data-method="4d6">${icon('dice')} Roll the dice</button>
          <button class="btn btn-sm ${isArray ? 'btn-gold' : 'btn-ghost'}" data-method="array">Use standard scores</button>
        </div>
        <div class="dice-tray">${(state.pool || [0, 0, 0, 0, 0, 0]).map(v => `<div class="die">${rolled ? v : '?'}</div>`).join('')}</div>
        ${rolled ? '<p style="text-align:center;color:var(--ink-soft);font-style:italic;margin:0 0 12px;">These are in no particular order for now — you’ll place each number onto an ability in a later step.</p>' : ''}
        <div style="text-align:center;">${actionHtml}</div>
        <div class="panel">
          <h3 class="spell-section-head" style="margin-top:0;">How to think about the six abilities</h3>
          <div class="ability-rows">
            ${ABILITIES.map(a => `<div class="ability-row" style="grid-template-columns:44px 1fr;cursor:default;">
              <span class="ar-icon">${icon(a.icon)}</span>
              <div><span class="ar-name">${a.name}</span><small>${a.blurb}</small></div>
            </div>`).join('')}
          </div>
        </div>
        ${footer({ nextDisabled: !rolled, nextLabel: 'Choose my hero →' })}
      </div>`;
    host.querySelectorAll('[data-method]').forEach(b => b.onclick = () => setMethod(b.dataset.method));
    const rb = document.getElementById('rollBtn'); if (rb) rb.onclick = doRoll;
    wireFooter(host);
  };

  RENDER.race = (host) => {
    const r = getRace();
    host.innerHTML = `
      <div class="step">
        <p class="eyebrow">Step 2 · Who are you?</p>
        <h2 class="title">Choose your race</h2>
        <p class="lead">Your race is the kind of creature your hero is. It gives you a boost to certain abilities and one special power. ${state.recommendations ? 'Stars show picks that match your quiz.' : ''}</p>
        <div class="card-grid" id="raceGrid"></div>
        <div id="raceChoice"></div>
        ${footer({ nextDisabled: !raceComplete(), nextLabel: 'Next: Class →' })}
      </div>`;
    const grid = document.getElementById('raceGrid');
    RACES.forEach(race => {
      const bonusTxt = Object.entries(race.bonuses).map(([k, v]) => `${k.toUpperCase()} +${v}`).join(', ');
      const card = document.createElement('button');
      card.className = 'choice-card' + (state.race === race.id ? ' selected' : '');
      card.innerHTML = `${isRec('race', race.id) ? `<span class="rec-badge">${icon('star')} Match</span>` : ''}
        <div class="cc-head"><span class="cc-icon">${icon(race.icon)}</span><span class="cc-name">${race.name}</span></div>
        <div class="cc-meta"><span class="tag bonus">${bonusTxt}</span><span class="tag">Speed ${race.speed}</span></div>
        <div class="cc-desc">${race.blurb}</div>
        <div class="signature"><span class="sig-name">${race.signature.name}.</span> ${race.signature.desc}</div>`;
      card.onclick = () => { if (state.race !== race.id) { state.race = race.id; state.raceChoice = {}; } render(); };
      grid.appendChild(card);
    });
    if (r && r.choice) renderRaceChoice(r);
    wireFooter(host);
  };

  function renderRaceChoice(r) {
    const wrap = document.getElementById('raceChoice');
    const panel = document.createElement('div'); panel.className = 'panel';
    panel.innerHTML = `<h3 class="spell-section-head" style="margin-top:0;">${r.choice.prompt}</h3><div class="card-grid" id="rcGrid"></div>`;
    wrap.appendChild(panel);
    const grid = panel.querySelector('#rcGrid');
    if (r.choice.key === 'ancestry') {
      r.choice.options.forEach(o => {
        const sel = state.raceChoice.ancestry === o.id;
        const b = document.createElement('button'); b.className = 'choice-card' + (sel ? ' selected' : '');
        b.innerHTML = `<div class="cc-head"><span class="cc-icon">${icon('flame')}</span><span class="cc-name" style="font-size:16px;">${o.name}</span></div>
          <div class="cc-desc">Breathe ${o.shape} of ${o.damage}, and shrug off ${o.damage} damage.</div>`;
        b.onclick = () => { state.raceChoice.ancestry = o.id; render(); };
        grid.appendChild(b);
      });
    } else if (r.choice.key === 'boosts') {
      const picks = state.raceChoice.boosts || [];
      panel.querySelector('.spell-section-head').innerHTML += ` <span class="pick-counter">(${picks.length}/2)</span>`;
      r.choice.options.forEach(o => {
        const sel = picks.includes(o.id);
        const b = document.createElement('button'); b.className = 'chip' + (sel ? ' selected' : '');
        b.textContent = o.name;
        b.onclick = () => {
          let p = state.raceChoice.boosts || [];
          if (sel) p = p.filter(x => x !== o.id); else if (p.length < 2) p = [...p, o.id];
          state.raceChoice.boosts = p; render();
        };
        grid.appendChild(b);
      });
      grid.className = 'chip-row';
    }
  }

  RENDER.class = (host) => {
    const c = getClass();
    host.innerHTML = `
      <div class="step">
        <p class="eyebrow">Step 3 · What do you do?</p>
        <h2 class="title">Choose your class</h2>
        <p class="lead">Your class is your hero's job and fighting style — warrior, sneak, wizard, or holy champion. Pick a class, then a specialty that makes your hero unique.</p>
        <div class="card-grid" id="classGrid"></div>
        <div id="classExtra"></div>
        ${footer({ nextDisabled: !classComplete(), nextLabel: assignAfterClassLabel() })}
      </div>`;
    const grid = document.getElementById('classGrid');
    CLASSES.forEach(cls => {
      const card = document.createElement('button'); card.className = 'choice-card' + (state.klass === cls.id ? ' selected' : '');
      card.innerHTML = `${isRec('class', cls.id) ? `<span class="rec-badge">${icon('star')} Match</span>` : ''}
        <div class="cc-head"><span class="cc-icon">${icon(cls.icon)}</span><span class="cc-name">${cls.name}</span></div>
        <div class="cc-meta"><span class="tag">HP ${cls.hitDie * LEVEL}+</span><span class="tag bonus">Best: ${cls.bestAbility.split('(')[0].trim()}</span>${cls.spellcaster ? '<span class="tag magic">Magic</span>' : ''}</div>
        <div class="cc-desc">${cls.blurb}</div>`;
      card.onclick = () => { if (state.klass !== cls.id) { state.klass = cls.id; state.archetype = null; state.fightingStyle = null; state.spells = []; state.equipment = {}; } render(); };
      grid.appendChild(card);
    });
    if (c) renderClassExtra(c);
    wireFooter(host);
  };
  function assignAfterClassLabel() { return 'Next: Place your numbers →'; }

  function renderClassExtra(c) {
    const wrap = document.getElementById('classExtra');
    // Archetypes
    const ap = document.createElement('div'); ap.className = 'panel';
    ap.innerHTML = `<h3 class="spell-section-head" style="margin-top:0;">Pick your ${c.name} specialty</h3><div class="card-grid" id="archGrid"></div>`;
    wrap.appendChild(ap);
    const ag = ap.querySelector('#archGrid');
    c.archetypes.forEach(a => {
      const card = document.createElement('button'); card.className = 'choice-card' + (state.archetype === a.id ? ' selected' : '');
      card.innerHTML = `${isRec('arch', a.id) ? `<span class="rec-badge">${icon('star')} Match</span>` : ''}
        <div class="cc-head"><span class="cc-name" style="font-size:17px;">${a.name}</span></div>
        <div class="cc-sub">${a.sub}</div>
        <div class="cc-desc">${a.desc}</div>
        <div class="cc-meta">${a.grantsSpells ? '<span class="tag magic">Learns a few spells</span>' : '<span class="tag">No spells</span>'}</div>
        <div class="signature"><span class="sig-name">${a.feature.name}.</span> ${a.feature.desc}</div>`;
      card.onclick = () => { if (state.archetype !== a.id) { state.archetype = a.id; state.spells = []; } render(); };
      ag.appendChild(card);
    });
    // Fighting style (Fighter, Paladin, Ranger)
    if (c.fightingStyles) {
      const fp = document.createElement('div'); fp.className = 'panel';
      fp.innerHTML = `<h3 class="spell-section-head" style="margin-top:0;">Pick a Fighting Style</h3>
        <p style="margin:0 0 8px;color:var(--ink-soft);">A signature combat trick your ${c.name} learns.</p><div class="card-grid" id="fsGrid"></div>`;
      wrap.appendChild(fp);
      const fg = fp.querySelector('#fsGrid');
      c.fightingStyles.forEach(s => {
        const card = document.createElement('button'); card.className = 'choice-card' + (state.fightingStyle === s.id ? ' selected' : '');
        card.innerHTML = `<div class="cc-name" style="font-size:16px;">${s.name}</div><div class="cc-desc">${s.desc}</div>`;
        card.onclick = () => { state.fightingStyle = s.id; render(); };
        fg.appendChild(card);
      });
    }
  }

  RENDER.assign = (host) => {
    const c = getClass();
    const recommended = new Set([...(c ? c.primary : []), 'con']);
    host.innerHTML = `
      <div class="step">
        <p class="eyebrow">Step 4 · Bring it together</p>
        <h2 class="title">Place your numbers</h2>
        <p class="lead">Tap a number, then tap the ability you want it on. The green-edged abilities are the best ones for a <strong>${c ? c.name : 'hero'}</strong>. Your race's bonus is added automatically, and the little <em>modifier</em> (like +2) is what you'll add to your dice rolls when you play.</p>
        <div class="toggle-row" style="justify-content:flex-start;">
          <button class="btn btn-sm btn-gold" id="autoBtn">✨ Auto-assign for me</button>
          <button class="btn btn-sm btn-ghost" id="clearBtn">Clear</button>
        </div>
        <div class="assign-wrap">
          <div><p style="font-family:var(--font-display);font-weight:700;margin:0 0 8px;">Your numbers</p><div class="score-pool" id="pool"></div></div>
          <div class="ability-rows" id="abilityRows"></div>
        </div>
        ${footer({ nextDisabled: !assignComplete(), nextLabel: buildHasSpells() ? 'Next: Magic →' : 'Next: Your Story →' })}
      </div>`;
    const pool = document.getElementById('pool');
    state.pool.forEach((v, i) => {
      const used = Object.values(state.assigned).includes(i);
      const chip = document.createElement('button');
      chip.className = 'score-chip' + (used ? ' used' : '') + (selectedChip === i ? ' selected' : '');
      chip.textContent = v;
      chip.disabled = used;
      chip.onclick = () => { selectedChip = (selectedChip === i ? null : i); render(); };
      pool.appendChild(chip);
    });
    const rows = document.getElementById('abilityRows');
    ABILITIES.forEach(a => {
      const idx = state.assigned[a.key];
      const base = idx == null ? null : state.pool[idx];
      const bonus = racialBonuses()[a.key] || 0;
      const fin = base == null ? null : base + bonus;
      const m = fin == null ? null : modOf(fin);
      const row = document.createElement('button');
      row.className = 'ability-row' + (recommended.has(a.key) ? ' recommended' : '') + (fin != null ? ' filled' : '');
      row.innerHTML = `<span class="ar-icon">${icon(a.icon)}</span>
        <span class="ar-name">${a.name}${bonus ? ` <span class="ar-bonus">(+${bonus} from race)</span>` : ''}<small>${a.blurb.split('.')[0]}.</small></span>
        <span class="ar-score">${fin != null ? fin : '<span class="ar-empty">tap…</span>'}</span>
        <span class="ar-mod ${m != null && m < 0 ? 'neg' : ''}">${m != null ? fmtMod(m) : '—'}</span>`;
      row.onclick = () => {
        if (selectedChip != null) { for (const k in state.assigned) if (state.assigned[k] === selectedChip) state.assigned[k] = null; state.assigned[a.key] = selectedChip; selectedChip = null; }
        else if (state.assigned[a.key] != null) { state.assigned[a.key] = null; }
        render();
      };
      rows.appendChild(row);
    });
    document.getElementById('autoBtn').onclick = () => { autoAssign(); render(); };
    document.getElementById('clearBtn').onclick = () => { state.assigned = blankAssign(); selectedChip = null; render(); };
    wireFooter(host);
  };
  function autoAssign() {
    const c = getClass();
    const prim = c ? c.primary.slice() : [];
    const order = [...new Set([...prim, 'con', ...ABILITIES.map(a => a.key)])];
    const sorted = state.pool.map((v, i) => ({ v, i })).sort((a, b) => b.v - a.v);
    state.assigned = blankAssign();
    order.forEach((key, idx) => { if (sorted[idx]) state.assigned[key] = sorted[idx].i; });
  }

  RENDER.magic = (host) => {
    const plan = spellPlan();
    const forced = plan.forced || [];
    forced.forEach(id => { if (!state.spells.includes(id)) state.spells.push(id); });
    const avail = SPELLS.filter(s => s.lists.includes(plan.listTag) && s.lvl <= plan.maxLevel);
    const cantrips = avail.filter(s => s.lvl === 0), leveled = avail.filter(s => s.lvl >= 1);
    const chosenC = state.spells.map(getSpell).filter(s => s && s.lvl === 0).length;
    const chosenL = state.spells.map(getSpell).filter(s => s && s.lvl >= 1).length;
    const c = getClass(), a = getArchetype();
    host.innerHTML = `
      <div class="step">
        <p class="eyebrow">Step 5 · Your spellbook</p>
        <h2 class="title">Choose your magic</h2>
        <p class="lead">${c.spellcaster ? `As a ${c.name}, you weave magic into your adventuring.` : `Your ${a.name} specialty lets you learn a little magic.`}
        ${plan.cantrips > 0 ? '<strong>Cantrips</strong> can be cast forever; <strong>spells</strong> are stronger but limited each day.' : 'Your <strong>spells</strong> are powerful magic you can use a limited number of times each day.'} When you cast at an enemy, you roll to hit (or they roll to dodge) — beat <strong>${spellNumbers().dc}</strong>.</p>
        ${plan.cantrips > 0 ? `<div class="spell-section-head">Cantrips <span class="pick-counter">— pick ${plan.cantrips} (${chosenC}/${plan.cantrips})</span></div>
        <div class="card-grid" id="cantripGrid"></div>` : ''}
        <div class="spell-section-head">Spells <span class="pick-counter">— pick ${plan.leveled} (${chosenL}/${plan.leveled})</span></div>
        <div class="card-grid" id="spellGrid"></div>
        ${footer({ nextDisabled: !magicComplete(), nextLabel: 'Next: Your Story →' })}
      </div>`;
    const render1 = (gridId, spellsArr, limit, isCantrip) => {
      const grid = document.getElementById(gridId);
      spellsArr.forEach(s => {
        const sel = state.spells.includes(s.id);
        const isForced = forced.includes(s.id);
        const count = isCantrip ? chosenC : chosenL;
        const atLimit = count >= limit && !sel;
        const card = document.createElement('button');
        card.className = 'choice-card spell-card' + (sel ? ' selected' : '') + (isForced ? ' forced' : '') + (atLimit ? ' disabled' : '');
        card.innerHTML = `${isForced ? `<span class="rec-badge">${icon('check')} Always known</span>` : ''}
          <div class="cc-head"><span class="cc-icon">${icon('spell')}</span><span class="cc-name">${s.name}</span></div>
          <div class="cc-meta"><span class="tag ${s.lvl === 0 ? '' : 'magic'}">${s.lvl === 0 ? 'Cantrip' : 'Level ' + s.lvl}</span><span class="tag">${s.type}</span></div>
          <div class="cc-desc">${s.desc}</div>`;
        if (!isForced) card.onclick = () => { if (sel) state.spells = state.spells.filter(x => x !== s.id); else if (!atLimit) state.spells.push(s.id); render(); };
        grid.appendChild(card);
      });
    };
    if (plan.cantrips > 0) render1('cantripGrid', cantrips, plan.cantrips, true);
    render1('spellGrid', leveled, plan.leveled, false);
    wireFooter(host);
  };

  RENDER.story = (host) => {
    if (!Array.isArray(state.story.motivations)) state.story.motivations = [];
    if (!Array.isArray(state.story.traits)) state.story.traits = [];
    host.innerHTML = `
      <div class="step">
        <p class="eyebrow">Step ${buildHasSpells() ? 6 : 5} · Make it yours</p>
        <h2 class="title">Your hero's story</h2>
        <p class="lead">This is the fun part — who is your hero, really? Give them a name and a personality. There are no wrong answers!</p>
        <div class="panel">
          <div class="field"><label for="nameInput">Hero's name</label><input type="text" id="nameInput" maxlength="40" placeholder="e.g. Thora Ironfist, Pip Quickfingers…" value="${escapeHtml(state.story.name)}" /></div>
          <div class="field"><label>Personality — pick a few words that fit (or none!)</label><div class="chip-row" id="traitRow"></div></div>
          <div class="field"><label>Why do you adventure? <span style="font-weight:400;color:var(--ink-soft);font-family:var(--font-body);">(pick up to 2)</span></label>
            <div class="chip-row" id="motiveRow"></div>
            <div style="margin-top:10px;"><button type="button" class="btn btn-sm btn-ghost" id="motiveShuffle">${icon('dice')} Show me different reasons</button> <span style="color:var(--ink-soft);font-style:italic;font-size:13px;">— if you pick one now, we’ll keep it.</span></div>
          </div>
          <div class="field"><label for="backstory">A little backstory (optional)</label><textarea id="backstory" placeholder="Use your adventure motives above as inspiration! Where are you from? Who taught you your skills? What are you searching for?">${escapeHtml(state.story.backstory)}</textarea></div>
        </div>
        ${footer({ nextDisabled: !storyComplete(), nextLabel: 'Next: Gear Up →' })}
      </div>`;
    const nameInput = document.getElementById('nameInput');
    nameInput.oninput = () => { state.story.name = nameInput.value; const nb = host.querySelector('[data-act="next"]'); nb.disabled = !storyComplete(); };
    const back = document.getElementById('backstory'); back.oninput = () => { state.story.backstory = back.value; };
    const tRow = document.getElementById('traitRow');
    TRAITS.forEach(t => {
      const chip = document.createElement('button'); chip.className = 'chip' + (state.story.traits.includes(t) ? ' selected' : ''); chip.textContent = t;
      chip.onclick = () => { if (state.story.traits.includes(t)) state.story.traits = state.story.traits.filter(x => x !== t); else state.story.traits.push(t); chip.classList.toggle('selected'); };
      tRow.appendChild(chip);
    });
    const mRow = document.getElementById('motiveRow');
    const buildMotiveShown = () => {
      const sel = state.story.motivations.slice();
      const rest = shuffle(MOTIVATIONS.filter(m => !sel.includes(m)));
      return shuffle(sel.concat(rest.slice(0, Math.max(0, 14 - sel.length)))); // keep picks, fill with random
    };
    if (!Array.isArray(state.motiveShown) || !state.motiveShown.length) state.motiveShown = buildMotiveShown();
    const paintMotives = () => {
      mRow.innerHTML = '';
      state.motiveShown.forEach(m => {
        const chip = document.createElement('button'); chip.type = 'button';
        chip.className = 'chip' + (state.story.motivations.includes(m) ? ' selected' : ''); chip.textContent = m;
        chip.onclick = () => {
          let arr = state.story.motivations;
          if (arr.includes(m)) arr = arr.filter(x => x !== m);
          else if (arr.length < 2) arr = [...arr, m];
          state.story.motivations = arr;
          mRow.querySelectorAll('.chip').forEach(c => c.classList.toggle('selected', state.story.motivations.includes(c.textContent)));
        };
        mRow.appendChild(chip);
      });
    };
    paintMotives();
    const motiveShuffle = document.getElementById('motiveShuffle');
    if (motiveShuffle) motiveShuffle.onclick = () => { state.motiveShown = buildMotiveShown(); paintMotives(); };
    wireFooter(host);
  };

  RENDER.gear = (host) => {
    const c = getClass(); const eq = EQUIPMENT[c.id];
    host.innerHTML = `
      <div class="step">
        <p class="eyebrow">Step ${buildHasSpells() ? 7 : 6} · Tools of the trade</p>
        <h2 class="title">Gear up</h2>
        <p class="lead">Pick your weapons and armor. Everything else an adventurer needs comes in your pack — already included.</p>
        <div id="choiceArea"></div>
        <div class="panel">
          <h3 class="spell-section-head" style="margin-top:0;">${icon('check')} Already in your pack</h3>
          <ul class="trait-list" style="font-size:14px;">${eq.auto.map(i => `<li>${i}</li>`).join('')}<li>An adventuring pack: ${ADVENTURING_PACK.join(', ')}.</li></ul>
        </div>
        ${footer({ nextDisabled: !gearComplete(), nextLabel: 'See my hero! →' })}
      </div>`;
    const area = document.getElementById('choiceArea');
    eq.choices.forEach(ch => {
      const p = document.createElement('div'); p.className = 'panel';
      p.innerHTML = `<h3 class="spell-section-head" style="margin-top:0;">${ch.prompt}</h3><div class="card-grid"></div>`;
      const grid = p.querySelector('.card-grid');
      ch.options.forEach(o => {
        const sel = state.equipment[ch.key] === o.id;
        const card = document.createElement('button'); card.className = 'choice-card' + (sel ? ' selected' : '');
        card.innerHTML = `<div class="cc-head"><span class="cc-icon">${icon(ch.key === 'armor' ? 'armor' : 'weapon')}</span><span class="cc-name" style="font-size:16px;">${o.name}</span></div><div class="cc-desc">${o.note}</div>`;
        card.onclick = () => { state.equipment[ch.key] = o.id; render(); };
        grid.appendChild(card);
      });
      area.appendChild(p);
    });
    wireFooter(host);
  };

  RENDER.finish = (host) => {
    persist();
    populateSheet();
    populateReference();
    const r = getRace(), c = getClass(), a = getArchetype();
    const sn = spellNumbers();
    host.innerHTML = `
      <div class="step">
        <p class="eyebrow">Your hero is ready!</p>
        <h2 class="title">${escapeHtml(state.story.name || 'Your Hero')}</h2>
        <p class="lead">Level ${LEVEL} ${r.name} ${c.name}${a ? ` — ${a.name}` : ''}. ${(state.story.motivations && state.story.motivations.length) ? 'Adventuring ' + state.story.motivations.map(s => s.toLowerCase()).join(' and ') + '.' : ''}</p>
        <div class="summary-grid">
          <div class="panel" style="margin:0;">
            <div class="stat-badges">
              <div class="stat-badge"><div class="sb-icon">${icon('hp')}</div><div class="sb-val">${computeHP()}</div><div class="sb-label">Hit Points</div></div>
              <div class="stat-badge"><div class="sb-icon">${icon('armor')}</div><div class="sb-val">${computeAC()}</div><div class="sb-label">Armor</div></div>
              <div class="stat-badge"><div class="sb-icon">${icon('speed')}</div><div class="sb-val">${r.speed}</div><div class="sb-label">Speed</div></div>
              <div class="stat-badge"><div class="sb-icon">${icon('weapon')}</div><div class="sb-val">${fmtMod(weaponAttackBonus())}</div><div class="sb-label">To Hit</div></div>
              ${sn ? `<div class="stat-badge"><div class="sb-icon">${icon('spell')}</div><div class="sb-val">${sn.dc}</div><div class="sb-label">Spell DC</div></div>` : ''}
            </div>
            <div class="mini-abilities">
              ${ABILITIES.map(ab => { const s = finalScore(ab.key), m = modOf(s); return `<div class="mini-ab"><div class="ma-name">${ab.short}</div><div class="ma-score">${s}</div><div class="ma-mod ${m < 0 ? 'neg' : ''}">${fmtMod(m)}</div></div>`; }).join('')}
            </div>
          </div>
          <div class="panel" style="margin:0;">
            <h3 class="spell-section-head" style="margin-top:0;">Special Abilities</h3>
            <ul class="trait-list" style="font-size:13.5px;">${specialAbilities().map(x => `<li><strong>${escapeHtml(x.name)}.</strong> ${x.desc}</li>`).join('')}</ul>
            ${renderFinishSpells()}
            ${renderFinishUses()}
          </div>
        </div>
        <div class="note">${icon('check')} Saved! Your hero is stored in this browser — you can reopen it from the welcome screen any time.</div>
        <div class="note">${icon('print')} <strong>Print / Save PDF</strong> gives you two pages: your character sheet, plus a <strong>cheat sheet</strong> explaining every racial power, class feature, and spell in plain words.</div>
        <div class="actions">
          <button class="btn btn-ghost" data-act="back">← Make changes</button>
          <div class="spacer"></div>
          <button class="btn btn-gold" id="howtoBtn">${icon('scroll')} How to Play</button>
          <button class="btn" id="newBtn">Start another hero</button>
          <button class="btn" id="exportBtn">${icon('book')} Save to file</button>
          ${sharingAvailable() ? `<button class="btn btn-gold" id="shareBtn">${icon('shield')} Share with DM</button>` : ''}
          <button class="btn btn-primary" id="printBtn">${icon('print')} Print / Save PDF</button>
        </div>
      </div>`;
    document.getElementById('printBtn').onclick = () => { populateSheet(); populateReference(); window.print(); };
    document.getElementById('howtoBtn').onclick = () => go('howto');
    document.getElementById('newBtn').onclick = () => { state = newCharacter(); go('quiz'); };
    document.getElementById('exportBtn').onclick = () => exportCharacter(JSON.parse(JSON.stringify(state)));
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.onclick = () => { persist(); openShareDialog(JSON.parse(JSON.stringify(state))); };
    wireFooter(host);
  };
  function renderFinishSpells() {
    const g = chosenSpellsGrouped(); const sn = spellNumbers();
    if (!g.cant.length && !g.lev.length) return '';
    return `<h3 class="spell-section-head">Spells ${sn ? `<span class="pick-counter">(to hit +${sn.atk}, dodge DC ${sn.dc})</span>` : ''}</h3>
      ${g.cant.length ? `<p style="margin:4px 0;"><strong>Cantrips:</strong> ${g.cant.join(', ')}</p>` : ''}
      ${g.lev.length ? `<p style="margin:4px 0;"><strong>Spells:</strong> ${g.lev.join(', ')}</p>` : ''}`;
  }
  function renderFinishUses() {
    if (!limitedResources().length) return '';
    return `<h3 class="spell-section-head">Daily Uses <span class="pick-counter" style="font-weight:400;font-size:12.5px;">— tick one each time you use it; refill when you rest</span></h3>
      <div class="uses-grid">${usesRowsHTML()}</div>`;
  }

  RENDER.howto = (host) => {
    host.innerHTML = `
      <div class="step howto">
        <p class="eyebrow">The only rules you need</p>
        <h2 class="title">${icon('scroll')} How to Play</h2>
        <p class="lead">D&D is a game of imagination. One person is the <strong>Dungeon Master (DM)</strong>, who describes the world and plays the monsters. Everyone else plays one hero. You say what you want to do, and the dice decide how it goes!</p>

        <h3>Attacking a monster</h3>
        <p>Roll a <strong>d20</strong> and add your <strong>To-Hit</strong> number. If you meet or beat the monster's <strong>Armor</strong>, you hit! Then roll your weapon's damage and add your ability modifier. The monster's Hit Points go down by that much.</p>

        <h3>Doing something risky — "beat this number"</h3>
        <p>When you try something that might fail (climbing a wall, sneaking past a guard, convincing a king), the DM decides how hard it is and picks a number. You roll <strong>one d20</strong> (20-sided die), add the matching ability's modifier (usually <strong>+1 or +2</strong>), and try to <strong>match or beat the number</strong>. This one rule also covers “saving” yourself from danger like dodging a fireball.</p>
        <table>
          <thead><tr><th>How hard is it?</th><th>Reach this number</th><th></th></tr></thead>
          <tbody>${DC_TABLE.map(d => `<tr><td>${d.label}</td><td class="dc">${d.dc}</td><td>${d.note}</td></tr>`).join('')}</tbody>
        </table>
        <p class="note"><strong>Example:</strong> You want to leap a chasm (Medium = 11). You roll a 9 and add your Strength modifier of +2 → that's 11, just enough. You make it!</p>
        <p>Every difficulty can be reached with your modifier’s help — except <strong>Nearly Impossible</strong>. That one is the stuff of legends: it takes a <strong>natural 20</strong> (a perfect roll on the die), and no modifiers count toward it.</p>

        <h3>Your numbers</h3>
        <ul class="trait-list" style="font-size:15px;">
          <li><strong>Hit Points (HP):</strong> your health. At 0, your hero falls unconscious.</li>
          <li><strong>Armor:</strong> the number enemies must beat to hit you.</li>
          <li><strong>Speed:</strong> how far (in feet) you can move on your turn.</li>
          <li><strong>Spell DC:</strong> when you cast a spell on a foe, that's the number they must beat to resist it.</li>
        </ul>

        <h3>One more handy trick: Advantage &amp; Disadvantage</h3>
        <p>Sometimes things are in your favor (or against you). With <strong>advantage</strong>, roll two d20s and keep the higher. With <strong>disadvantage</strong>, keep the lower. That's it — now go be a hero!</p>

        <h3>${icon('book')} Dictionary — words you'll hear at the table</h3>
        <p>Not sure what a word means? Here's a quick guide to everything that won't fit on your character sheet.</p>
        <dl class="glossary">
          ${[...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' })).map(g => `<dt>${g.term}</dt><dd>${g.def}</dd>`).join('')}
        </dl>

        <div class="actions"><button class="btn btn-primary" data-act="back">← Back to my hero</button></div>
      </div>`;
    wireFooter(host);
  };

  /* --------------------- Limited-use daily resources -------------------- */
  // Spell slots at level 3 by caster type: full (4×L1, 2×L2), half (3×L1), third (2×L1).
  function spellSlots() {
    const c = getClass(); if (!c) return {};
    if (c.spellcaster) return (c.spell.maxLevel >= 2) ? { 1: 4, 2: 2 } : { 1: 3 };
    const a = getArchetype();
    if (a && a.spell) return { 1: 2 };
    return {};
  }
  // Everything a level-3 hero can only do a limited number of times before resting.
  function limitedResources() {
    const c = getClass(); if (!c) return [];
    const out = [];
    const slots = spellSlots();
    if (slots[1]) out.push({ name: 'Level 1 spell slots', boxes: slots[1], per: 'long' });
    if (slots[2]) out.push({ name: 'Level 2 spell slots', boxes: slots[2], per: 'long' });
    const a = getArchetype();
    const chaMod = modOf(finalScore('cha') || 10);
    if (c.id === 'fighter') {
      out.push({ name: 'Second Wind', boxes: 1, per: 'short' });
      out.push({ name: 'Action Surge', boxes: 1, per: 'short' });
      if (a && a.id === 'battlemaster') out.push({ name: 'Maneuver dice (d8)', boxes: 4, per: 'short' });
    } else if (c.id === 'wizard') {
      out.push({ name: 'Arcane Recovery', boxes: 1, per: 'day' });
    } else if (c.id === 'cleric') {
      out.push({ name: 'Channel Divinity', boxes: 1, per: 'short' });
    } else if (c.id === 'barbarian') {
      out.push({ name: 'Rage', boxes: 3, per: 'long' });
    } else if (c.id === 'paladin') {
      out.push({ name: 'Channel Divinity', boxes: 1, per: 'short' });
      out.push({ name: 'Divine Sense', boxes: 1 + Math.max(chaMod, 0), per: 'long' });
      out.push({ name: 'Lay on Hands', pool: '15 HP', per: 'long' });
    } else if (c.id === 'bard') {
      out.push({ name: 'Bardic Inspiration (d6)', boxes: Math.max(chaMod, 1), per: 'long' });
    }
    const r = getRace();
    if (r) {
      if (r.id === 'dragonborn') out.push({ name: 'Breath Weapon', boxes: 1, per: 'short' });
      if (r.id === 'half-orc') out.push({ name: 'Relentless Endurance', boxes: 1, per: 'long' });
      if (r.id === 'tiefling') out.push({ name: 'Hellish Rebuke spell', boxes: 1, per: 'long' });
    }
    return out;
  }
  const REST_LABEL = { long: 'per long rest', short: 'per short rest', day: 'per day' };
  const buildHasCantrips = () => state.spells.map(getSpell).some(s => s && s.lvl === 0);
  // Shared checkbox rows, used on both the printable sheet and the finish summary.
  function usesRowsHTML() {
    const res = limitedResources();
    if (!res.length) return '<div class="use-none">No daily limits — your abilities are always ready or refresh every turn!</div>';
    let html = res.map(rsc => {
      const mid = rsc.pool
        ? `<span class="use-pool">${escapeHtml(rsc.pool)}</span>`
        : `<span class="use-boxes">${Array.from({ length: rsc.boxes }, () => '<span class="usebox"></span>').join('')}</span>`;
      return `<div class="use-row"><span class="use-name">${escapeHtml(rsc.name)}</span>${mid}<span class="use-when">${REST_LABEL[rsc.per]}</span></div>`;
    }).join('');
    if (buildHasCantrips()) html += '<div class="use-note">Cantrips have no limit — cast them as often as you like!</div>';
    return html;
  }

  /* ----------------------- Printable sheet fill ------------------------- */
  function populateSheet() {
    const r = getRace(), c = getClass(), a = getArchetype();
    const set = (f, v) => { const e = document.querySelector(`#printSheet [data-f="${f}"]`); if (e) e.innerHTML = v; };
    set('name', escapeHtml(state.story.name || 'Unnamed Hero'));
    set('class', c ? c.name + (a ? ` — ${a.name}` : '') : '');
    let raceLabel = r ? r.name : '';
    if (r && r.id === 'dragonborn' && state.raceChoice.ancestry) { const anc = r.choice.options.find(o => o.id === state.raceChoice.ancestry); raceLabel += ` (${anc.name.split('—')[0].trim()})`; }
    set('race', raceLabel);
    set('xp', String(XP)); set('level', String(LEVEL));
    set('hp', String(computeHP())); set('speed', (r ? r.speed : 30) + ' ft'); set('ac', String(computeAC()));
    set('gear', `<ul>${resolvedEquipment().map(g => `<li>${escapeHtml(g)}</li>`).join('')}</ul><div style="margin-top:5px"><span class="feat-name">Pack:</span> ${ADVENTURING_PACK.join(', ')}.</div>`);
    let sp = `<ul>${specialAbilities().map(x => `<li><span class="feat-name">${escapeHtml(x.name)}.</span></li>`).join('')}</ul>`;
    const g = chosenSpellsGrouped(), sn = spellNumbers();
    if (g.cant.length || g.lev.length) {
      sp += `<div style="margin-top:5px"><span class="feat-name">Magic${sn ? ` (to-hit +${sn.atk}, dodge DC ${sn.dc})` : ''}:</span></div>`;
      if (g.cant.length) sp += `<div><strong>Cantrips:</strong> ${g.cant.join(', ')}</div>`;
      if (g.lev.length) sp += `<div><strong>Spells:</strong> ${g.lev.join(', ')}</div>`;
    }
    set('spells', sp);
    set('uses', usesRowsHTML());
    document.getElementById('psAbilities').innerHTML = ABILITIES.map(ab => {
      const s = finalScore(ab.key), m = modOf(s);
      return `<div class="ps-ability"><div class="pa-label"><span class="pa-icon">${icon(ab.icon)}</span><span class="pa-name">${ab.name}</span></div>
        <div class="pa-box"><div class="pa-mod">${fmtMod(m)}</div><div class="pa-score">score ${s}</div></div></div>`;
    }).join('');
  }

  // Per-character printable cheat sheet (prints as page 2): full text of every
  // racial ability, class feature, specialty, and chosen spell — so each player
  // has a quick reference for what their stuff actually does.
  function populateReference() {
    const ref = document.getElementById('printReference'); if (!ref) return;
    const r = getRace(), c = getClass(), a = getArchetype();
    const name = escapeHtml(state.story.name || 'Unnamed Hero');
    let raceLine = r ? r.name : '';
    if (r && r.id === 'dragonborn' && state.raceChoice.ancestry) { const anc = r.choice.options.find(o => o.id === state.raceChoice.ancestry); raceLine += ` (${anc.damage})`; }
    let html = `<div class="pr-head"><div class="pr-title">${name} — Quick Reference</div>
      <div class="pr-sub">Level ${LEVEL} ${raceLine} ${c ? c.name : ''}${a ? ` — ${a.name}` : ''}</div></div>`;

    if (r) {
      let items = `<li><span class="pr-name">${escapeHtml(r.signature.name)}:</span> ${r.signature.desc}</li>`;
      items += r.traits.map(t => `<li>${escapeHtml(t)}</li>`).join('');
      if (r.id === 'dragonborn' && state.raceChoice.ancestry) {
        const anc = r.choice.options.find(o => o.id === state.raceChoice.ancestry);
        items += `<li><span class="pr-name">Breath Weapon:</span> breathe ${anc.shape} of ${anc.damage} (2d6; enemies roll Dexterity for half). You also resist ${anc.damage}.</li>`;
      }
      html += `<div class="pr-section"><h3>Racial Abilities — ${escapeHtml(r.name)}</h3><ul>${items}</ul></div>`;
    }
    if (c) {
      let items = c.features.map(f => `<li><span class="pr-name">${escapeHtml(f.name)}:</span> ${f.desc}</li>`).join('');
      if (c.fightingStyles && state.fightingStyle) { const st = c.fightingStyles.find(s => s.id === state.fightingStyle); if (st) items += `<li><span class="pr-name">Fighting Style — ${escapeHtml(st.name)}:</span> ${st.desc}</li>`; }
      html += `<div class="pr-section"><h3>Class Features — ${escapeHtml(c.name)}</h3><ul>${items}</ul></div>`;
    }
    if (a && a.feature) {
      html += `<div class="pr-section"><h3>Specialty — ${escapeHtml(a.name)} (${escapeHtml(a.sub)})</h3><ul><li><span class="pr-name">${escapeHtml(a.feature.name)}:</span> ${a.feature.desc}</li></ul></div>`;
    }
    const chosen = state.spells.map(getSpell).filter(Boolean);
    if (chosen.length) {
      const sn = spellNumbers();
      const cant = chosen.filter(s => s.lvl === 0), lev = chosen.filter(s => s.lvl >= 1).sort((x, y) => x.lvl - y.lvl);
      const line = (s) => `<li><span class="pr-name">${escapeHtml(s.name)}${s.lvl === 0 ? ' (cantrip)' : ` (level ${s.lvl})`}:</span> ${s.desc}</li>`;
      let sp = sn ? `<p class="pr-note">Casting at an enemy: your spell attack is <strong>+${sn.atk}</strong>, or they must beat <strong>${sn.dc}</strong> to resist.</p>` : '';
      if (cant.length) sp += `<ul>${cant.map(line).join('')}</ul>`;
      if (lev.length) sp += `<ul>${lev.map(line).join('')}</ul>`;
      html += `<div class="pr-section"><h3>Your Spells</h3>${sp}</div>`;
    }
    ref.innerHTML = html;
  }

  /* ------------------------------ Boot ---------------------------------- */
  function render() {
    updateHeader();
    const host = document.getElementById('app');
    (RENDER[state.step] || RENDER.welcome)(host);
  }
  render();
})();
