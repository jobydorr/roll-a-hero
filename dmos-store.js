/* Roll a Hero — Dungeon Master OS: the data layer. No DOM in this file.

   TWO RULES, both load-bearing:

   1. EVERY WRITE GOES THROUGH patch() / createDoc() / deleteDoc().
      Each one bumps a revision and persists. If a pane reaches into a doc
      returned by get() and mutates it, the revision doesn't change, the feed's
      keyed reconcile skips the node — and the screen lies. get() returns a
      fresh object every call precisely so that mutating it does nothing.

   2. AN INCOMING SYNC MAY ONLY: create a doc, fast-forward an untouched doc,
      or raise a conflict flag. It may NEVER modify or remove a doc the DM has
      touched. `base` (what Cowork authored) and `overlay` (what the DM changed)
      are stored separately forever and never merged into each other, which is
      what makes "Take theirs" reversible.

   Storage note: dm.html shares a localStorage origin with index.html, and
   app.js:190 swallows QuotaExceededError with `catch (e) {}`. So a full DM
   workspace could silently stop a PLAYER from saving a hero. write() below
   refuses to clear anything — it shouts instead. Do not copy app.js here. */
(function () {
  'use strict';

  const SCHEMA = 1;

  const KEY = {
    workspace:  'rollAHeroDmWorkspace',
    backup:     'rollAHeroDmWorkspaceBackup',
    quicknote:  'rollAHeroDmQuickNote',
    initiative: 'rollAHeroDmInitiative',
    chart:      'rollAHeroDmChart',
    inbox:      'rollAHeroDmInbox',
    ui:         'rollAHeroDmUi',
    party:      'rollAHeroDmParty',
    bestiary:   'rollAHeroDmBestiary',
  };

  // The Notebook is a reserved top-level folder in the SAME document store as the
  // story — so notebook sections and notes reuse the whole tree/feed/edit/reconcile
  // machinery for free. It's partitioned out of the story views by isInNotebook().
  // Notebook docs are DM-authored (origin 'local'), so they never appear in
  // campaign.js and survive every sync.
  const NB_ROOT = 'nb_root';

  /* Document types. Folders are documents too — that kills a whole class of
     "folders are special" bugs and makes the Scrivenings feed a plain DFS.
     Field keys are the push contract: Cowork fills these exact keys.
     Every icon name below exists in icons.js. */
  const DOC_TYPES = {
    folder:    { label: 'Folder',      icon: 'book',   fields: [] },
    beat:      { label: 'Story beat',  icon: 'scroll', fields: [
      ['hook', 'The hook — why do they care?'],
      ['read_aloud', 'Read aloud'],
      ['if_they', 'If they…'],
      ['outcome', 'Where it leaves them'] ] },
    scene:     { label: 'Scene',       icon: 'scroll', fields: [
      ['setting', 'Where we are'], ['read_aloud', 'Read aloud'], ['what_happens', 'What happens'] ] },
    encounter: { label: 'Encounter',   icon: 'sword',  fields: [
      ['setup', 'Setup'], ['creatures', 'Creatures'], ['tactics', 'Tactics'], ['reward', 'Reward'] ] },
    npc:       { label: 'NPC',         icon: 'cha',    fields: [
      ['looks', 'Looks like'], ['wants', 'Wants'], ['voice', 'Voice'], ['secret', 'Secret'] ],
      // Optional combat block — shown only once it has values (or after a
      // Quick-generate). Same field keys Cowork fills when it stats an NPC.
      statBlock: [
      ['hp', 'Hit points'], ['ac', 'Armor'], ['attack', 'Attack'], ['special', 'Special move'] ] },
    creature:  { label: 'Creature',    icon: 'shield', fields: [
      ['hp', 'Hit points'], ['ac', 'Armor'], ['speed', 'Speed'], ['attack', 'Attack'], ['trick', 'Signature trick'] ] },
    location:  { label: 'Location',    icon: 'armor',  fields: [
      ['looks', 'Looks like'], ['who_is_here', 'Who is here'], ['hidden', 'Hidden here'] ] },
    session:   { label: 'Session log', icon: 'star',   fields: [
      ['date', 'Date'], ['recap', 'Recap'], ['plan', 'Plan'], ['loose_ends', 'Loose ends'] ] },
    note:      { label: 'Note',        icon: 'book',   fields: [] },
  };

  const clone = (o) => JSON.parse(JSON.stringify(o));
  const nowISO = () => new Date().toISOString();

  /* ------------------------------ Plumbing ------------------------------- */
  const listeners = [];
  let quotaFull = false;
  const emit = (evt) => listeners.forEach(fn => { try { fn(evt); } catch (e) { console.error('[dmos] listener', e); } });

  function read(key, dflt) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : clone(dflt); }
    catch (e) { console.warn('[dmos] unreadable, using default:', key, e); return clone(dflt); }
  }
  const isQuota = (e) => e && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.code === 22 || e.code === 1014);

  // The ONE place anything is written. Never clears, never silently swallows.
  function write(key, obj) {
    try {
      localStorage.setItem(key, JSON.stringify(obj));
      if (quotaFull) { quotaFull = false; emit({ type: 'quota', full: false }); }
      return true;
    } catch (e) {
      if (!isQuota(e)) throw e;
      if (!quotaFull) { quotaFull = true; emit({ type: 'quota', full: true }); }
      console.error('[dmos] localStorage is full. Nothing was written, nothing was deleted.', e);
      return false;
    }
  }

  // Objects merge key-by-key; arrays and scalars replace wholesale.
  function merge(base, patch) {
    if (!patch || typeof patch !== 'object') return base;
    const out = Object.assign({}, base);
    for (const k of Object.keys(patch)) {
      const v = patch[k], b = base ? base[k] : undefined;
      const bothPlainObjects = v && typeof v === 'object' && !Array.isArray(v)
        && b && typeof b === 'object' && !Array.isArray(b);
      out[k] = bothPlainObjects ? merge(b, v) : v;
    }
    return out;
  }

  /* ------------------------------ Workspace ------------------------------ */
  // autoSync: whether boot merges campaign.js. True for the normal workspace (so
  // Cowork pushes appear); a fresh "New workspace" sets it false so it stays blank.
  const EMPTY_WS = { schema: SCHEMA, campaign: null, base: {}, overlay: {}, conflicts: {}, autoSync: true };

  // Mirrors normalize() in app.js:29 — backfill on load so the schema can grow
  // without a migration script.
  function migrate(w) {
    if (!w || typeof w !== 'object') return clone(EMPTY_WS);
    if (!w.schema) w.schema = SCHEMA;
    ['base', 'overlay', 'conflicts'].forEach(k => { if (!w[k] || typeof w[k] !== 'object') w[k] = {}; });
    if (!('campaign' in w)) w.campaign = null;
    if (typeof w.autoSync !== 'boolean') w.autoSync = true;
    return w;
  }

  let ws = migrate(read(KEY.workspace, EMPTY_WS));
  const persist = () => write(KEY.workspace, ws);

  function normalizeDoc(d) {
    const type = DOC_TYPES[d.type] ? d.type : 'note';
    return {
      schema: d.schema || SCHEMA,
      id: d.id,
      type,
      title: d.title || 'Untitled',
      parent: d.parent || null,
      order: typeof d.order === 'number' ? d.order : 100,
      rev: typeof d.rev === 'number' ? d.rev : 0,
      origin: d.origin || 'cowork',
      updated: d.updated || nowISO(),
      tags: Array.isArray(d.tags) ? d.tags : [],
      leadsTo: Array.isArray(d.leadsTo) ? d.leadsTo : [],
      fields: (d.fields && typeof d.fields === 'object') ? d.fields : {},
      body: typeof d.body === 'string' ? d.body : '',
    };
  }

  const isTouched = (id) => {
    const o = ws.overlay[id];
    return !!(o && ((o.patch && Object.keys(o.patch).length) || o.deletedAt));
  };

  /* The effective doc the UI sees: authored base with the DM's overlay on top.
     `rev` is a STRING ("baseRev.localRev") used purely as the feed's reconcile
     key — it changes whenever Cowork OR the DM changes the doc. */
  function effective(id) {
    const b = ws.base[id];
    if (!b) return null;
    const o = ws.overlay[id];
    if (o && o.deletedAt) return null;
    const d = o && o.patch ? merge(b, o.patch) : Object.assign({}, b);
    d.rev = (b.rev || 0) + '.' + ((o && o.localRev) || 0);
    d.baseRev = b.rev || 0;
    d.edited = isTouched(id);
    d.conflict = !!ws.conflicts[id];
    d.parkedEdit = !!(o && o.parked);
    return d;
  }

  const allDocs = () => Object.keys(ws.base).map(effective).filter(Boolean);
  const byOrder = (a, b) => (a.order - b.order) || String(a.title).localeCompare(String(b.title));

  /* One pass builds the whole tree. A doc whose parent was deleted floats back
     to the root rather than vanishing — losing a doc to a deleted folder is
     exactly the kind of silent loss this project doesn't do. */
  function tree() {
    const live = allDocs();
    const ids = new Set(live.map(d => d.id));
    const kids = new Map(live.map(d => [d.id, []]));
    const roots = [];
    live.forEach(d => {
      const p = d.parent && ids.has(d.parent) ? d.parent : null;
      if (p) kids.get(p).push(d); else roots.push(d);
    });
    roots.sort(byOrder);
    kids.forEach(a => a.sort(byOrder));
    return { roots, kids, byId: new Map(live.map(d => [d.id, d])) };
  }

  function descendantsOf(id) {
    const t = tree();
    const out = [];
    (function walk(pid) {
      const kids = pid === null ? t.roots : (t.kids.get(pid) || []);
      kids.forEach(c => { out.push(c); walk(c.id); });
    })(id === undefined ? null : id);
    return out;
  }

  function nextOrder(parent) {
    const t = tree();
    const kids = parent ? (t.kids.get(parent) || []) : t.roots;
    return kids.length ? kids[kids.length - 1].order + 100 : 100;
  }

  /* --------------------------- Mutations (rule 1) ------------------------- */
  function patch(id, partial) {
    if (!ws.base[id]) return null;
    const o = ws.overlay[id] || (ws.overlay[id] = { localRev: 0, patch: {} });
    o.patch = merge(o.patch || {}, partial);
    o.localRev = (o.localRev || 0) + 1;
    o.updated = nowISO();
    persist();
    // A creature/NPC's page HP is the source of truth for its max. If this edit
    // touched it and that doc is on the roster, keep the tracker's max in step.
    if (partial && partial.fields && 'hp' in partial.fields) syncRosterHpToDoc(id);
    emit({ type: 'docs', ids: [id] });
    return effective(id);
  }

  function createDoc(opts) {
    const o = opts || {};
    const type = DOC_TYPES[o.type] ? o.type : 'note';
    const id = o.id || ('loc_' + type + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6));
    if (ws.base[id]) return effective(id);   // idempotent when an explicit id is reused
    ws.base[id] = normalizeDoc({
      id, type, title: o.title || 'Untitled ' + DOC_TYPES[type].label.toLowerCase(),
      parent: o.parent || null, order: nextOrder(o.parent || null),
      rev: 0, origin: o.origin || 'local',
      body: o.body || '',
      fields: (o.fields && typeof o.fields === 'object') ? o.fields : {},
    });
    persist();
    emit({ type: 'docs', ids: [id] });
    return effective(id);
  }

  // Tombstone, not deletion. The authored base is left completely intact.
  function deleteDoc(id) {
    if (!ws.base[id]) return;
    const o = ws.overlay[id] || (ws.overlay[id] = { localRev: 0, patch: {} });
    o.deletedAt = nowISO();
    o.localRev = (o.localRev || 0) + 1;
    persist();
    emit({ type: 'docs', ids: [id] });
  }

  function restoreDoc(id) {
    const o = ws.overlay[id];
    if (!o || !o.deletedAt) return;
    delete o.deletedAt;
    o.localRev = (o.localRev || 0) + 1;
    persist();
    emit({ type: 'docs', ids: [id] });
  }

  const trash = () => Object.keys(ws.overlay)
    .filter(id => ws.overlay[id].deletedAt && ws.base[id])
    .map(id => Object.assign({}, ws.base[id], { deletedAt: ws.overlay[id].deletedAt }));

  /* --------------------------- Conflicts (rule 2) ------------------------- */
  function keepMine(id) {
    if (!ws.conflicts[id]) return;
    delete ws.conflicts[id];
    persist();
    emit({ type: 'docs', ids: [id] });
  }

  // Reversible: the DM's edit is parked, never destroyed. restoreMine() undoes it.
  function takeTheirs(id) {
    const inc = ws.conflicts[id];
    if (!inc) return;
    const b = ws.base[id];
    const o = ws.overlay[id];
    if (o && o.patch && Object.keys(o.patch).length) {
      o.parked = o.patch;
      o.patch = {};
      o.localRev = (o.localRev || 0) + 1;
    }
    ws.base[id] = Object.assign(clone(inc), { parent: b.parent, order: b.order });
    delete ws.conflicts[id];
    persist();
    emit({ type: 'docs', ids: [id] });
  }

  function restoreMine(id) {
    const o = ws.overlay[id];
    if (!o || !o.parked) return;
    o.patch = o.parked;
    delete o.parked;
    o.localRev = (o.localRev || 0) + 1;
    persist();
    emit({ type: 'docs', ids: [id] });
  }

  const conflicts = () => Object.keys(ws.conflicts);
  const backup = () => write(KEY.backup, { savedAt: nowISO(), workspace: ws });

  /* ------------------------------- Sync ---------------------------------- */
  /* `pendingIds` are doc ids referenced by inbox items the DM hasn't accepted
     yet — they must NOT be created here, they wait for the tray (Phase 2).
     Phase 1 passes an empty set, so campaign/docs/ seeds the workspace. */
  function mergeIncoming(docs, pendingIds) {
    backup(); // before ANY sync. Always. Costs nothing, saves a campaign.
    const pending = pendingIds || new Set();
    const out = { created: [], updated: [], conflicted: [], skipped: [], held: [] };

    for (const raw of docs) {
      if (!raw || !raw.id) { out.skipped.push(raw); continue; }
      const id = raw.id;
      const b = ws.base[id];

      if (!b) {
        if (pending.has(id)) { out.held.push(id); continue; } // awaiting review
        ws.base[id] = normalizeDoc(raw);
        out.created.push(id);
        continue;
      }
      if ((raw.rev || 0) <= (b.rev || 0)) { out.skipped.push(id); continue; }
      if (isTouched(id) || b.origin === 'local') {
        ws.conflicts[id] = normalizeDoc(raw);
        out.conflicted.push(id);
        continue;
      }
      // Untouched → fast-forward. But keep where the DM filed it.
      ws.base[id] = Object.assign(normalizeDoc(raw), { parent: b.parent, order: b.order });
      out.updated.push(id);
    }
    persist();
    emit({ type: 'docs' });
    return out;
  }

  /* The campaign is a committed JS file (campaign.js) that sets window.DM_CAMPAIGN,
     loaded by a <script> tag exactly like data.js. No fetch, so no server and no
     file:// problem: dm.html works on the live site AND by double-clicking it.
     Async only to keep the signature its callers already await. */
  function loadCampaign(force) {
    // A fresh workspace opts out of auto-seeding; boot passes no force, the
    // "Sync from campaign" tool passes true to pull campaign.js in on demand.
    if (!force && ws.autoSync === false) {
      return Promise.resolve({ ok: false, reason: 'no-campaign' });
    }
    const src = window.DM_CAMPAIGN;
    if (!src || !Array.isArray(src.docs) || !src.docs.length) {
      return Promise.resolve({ ok: false, reason: 'no-campaign' });
    }
    const result = mergeIncoming(src.docs.map(clone), new Set());
    if (src.campaign) ws.campaign = src.campaign;
    if (force) ws.autoSync = true;   // an explicit sync re-enables ongoing updates
    persist();
    emit({ type: 'docs' });
    return Promise.resolve(Object.assign({ ok: true }, result));
  }

  // Start over: back up the current workspace, then blank it. autoSync goes false
  // so a reload doesn't re-seed campaign.js. Export/Import make this reversible.
  function newWorkspace() {
    backup();
    ws = clone(EMPTY_WS);
    ws.autoSync = false;
    persist();
    write(KEY.quicknote, { date: nowISO().slice(0, 10), text: '', filed: false });
    emit({ type: 'docs' });
  }

  /* --------------------- Export / Import (the safety net) ----------------- */
  // Mirrors app.js's envelope. Import merges and never deletes.
  function exportWorkspace() {
    return JSON.stringify({
      app: 'roll-a-hero', kind: 'dm-workspace', version: 1, exportedAt: nowISO(),
      workspace: ws, notebook: read(KEY.notebook, { entries: [] }),
    }, null, 2);
  }

  function importWorkspace(data) {
    if (!data || data.kind !== 'dm-workspace' || !data.workspace) throw new Error('That is not a DM workspace file.');
    backup();
    const inc = migrate(data.workspace);
    let added = 0, kept = 0;
    for (const id of Object.keys(inc.base)) {
      if (ws.base[id]) { kept++; continue; }          // never overwrite what's here
      ws.base[id] = normalizeDoc(inc.base[id]);
      if (inc.overlay[id]) ws.overlay[id] = clone(inc.overlay[id]);
      added++;
    }
    if (!ws.campaign && inc.campaign) ws.campaign = inc.campaign;
    persist();
    emit({ type: 'docs' });
    return { added, kept };
  }

  /* ------------------------------ Notebook -------------------------------- */
  function ensureNotebook() {
    if (!ws.base[NB_ROOT]) {
      createDoc({ id: NB_ROOT, type: 'folder', title: 'Notebook', parent: null, origin: 'local' });
    }
    return NB_ROOT;
  }

  // Is this doc the notebook root, or nested anywhere beneath it?
  function isInNotebook(id) {
    let cur = id, guard = 0;
    while (cur && guard++ < 200) {
      if (cur === NB_ROOT) return true;
      const b = ws.base[cur];
      cur = b ? b.parent : null;
    }
    return false;
  }

  // The notebook's sections (folders directly under the root), each in order.
  function notebookSections() {
    if (!ws.base[NB_ROOT]) return [];
    return allDocs()
      .filter(d => d.parent === NB_ROOT && d.type === 'folder')
      .sort(byOrder);
  }

  // Flat destination list for the "file to…" dropdown: for each section, a
  // "new note here" target plus every existing note in it (to append to).
  function notebookTargets() {
    return notebookSections().map(sec => ({
      sectionId: sec.id,
      sectionTitle: sec.title,
      notes: allDocs().filter(d => d.parent === sec.id && d.type === 'note').sort(byOrder)
                      .map(n => ({ id: n.id, title: n.title })),
    }));
  }

  function createSection(title) {
    ensureNotebook();
    return createDoc({ type: 'folder', title: (title || 'New section').slice(0, 80), parent: NB_ROOT });
  }

  /* File text from the quick-note pad into the notebook.
       { text, date, sectionId, noteId? }
     noteId set  → append to that existing note (with a dated separator).
     noteId null → create a new note in the section, titled by its first line
                   (or the date), body = text. Returns the affected note doc. */
  function fileNote(opts) {
    const o = opts || {};
    const text = String(o.text || '').trim();
    if (!text) return null;
    ensureNotebook();
    const date = o.date || nowISO().slice(0, 10);

    if (o.noteId && ws.base[o.noteId]) {
      const cur = effective(o.noteId);
      const joined = (cur.body ? cur.body.replace(/\s+$/, '') + '\n\n' : '') + '— ' + date + ' —\n' + text;
      return patch(o.noteId, { body: joined });
    }

    let sectionId = o.sectionId;
    if (!sectionId || !ws.base[sectionId]) sectionId = createSection('General').id;
    const firstLine = text.split('\n').map(s => s.trim()).find(Boolean) || date;
    const title = firstLine.length > 48 ? firstLine.slice(0, 47) + '…' : firstLine;
    return createDoc({ type: 'note', title: title, parent: sectionId, body: '— ' + date + ' —\n' + text });
  }

  /* ---------------------------- Quick-note pad ---------------------------- */
  const EMPTY_QUICKNOTE = { date: nowISO().slice(0, 10), text: '', filed: false };
  function getQuickNote() {
    const q = read(KEY.quicknote, EMPTY_QUICKNOTE);
    if (!q.date) q.date = nowISO().slice(0, 10);
    if (typeof q.text !== 'string') q.text = '';
    return q;
  }
  function setQuickNote(partial) {
    const q = Object.assign(getQuickNote(), partial);
    write(KEY.quicknote, q);
    return q;
  }
  const clearQuickNote = () => setQuickNote({ text: '', filed: false });

  /* ---------------------- Initiative roster (at the table) ---------------- */
  /* The right-rail roster IS the turn order: `entries` in initiative order, a
     `turn` cursor into it, and a `round` counter. Each entry either references a
     workspace doc (kind 'doc' — a creature/NPC), a shared hero (kind 'hero',
     wired in the Firebase phase), or is a one-off (kind 'custom'). Kept in its
     own localStorage key, separate from the document store — a combat is
     ephemeral table state, not campaign content, and never syncs to Cowork. */
  const EMPTY_INIT = { round: 1, turn: 0, entries: [] };

  function getInitiative() {
    const s = read(KEY.initiative, EMPTY_INIT);
    if (!Array.isArray(s.entries)) s.entries = [];
    if (typeof s.round !== 'number' || s.round < 1) s.round = 1;
    if (typeof s.turn !== 'number' || s.turn < 0) s.turn = 0;
    if (s.turn >= s.entries.length) s.turn = 0;
    return s;
  }
  const writeInit = (s) => { write(KEY.initiative, s); emit({ type: 'initiative' }); return s; };
  const iniId = () => 'ini_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

  // Add an entry. For a doc/hero ref, refuse a duplicate so a name can't be
  // added to the same fight twice. Returns the new entry, or the existing one.
  function rosterAdd(entry) {
    const s = getInitiative();
    const e = Object.assign({ id: iniId(), kind: 'custom', ref: null, name: 'New', init: null }, entry || {});
    if (e.ref) { const dup = s.entries.find(x => x.ref === e.ref); if (dup) return dup; }
    s.entries.push(e);
    writeInit(s);
    return e;
  }
  function rosterPatch(id, partial) {
    const s = getInitiative();
    const e = s.entries.find(x => x.id === id); if (!e) return null;
    Object.assign(e, partial);
    writeInit(s);
    return e;
  }
  function rosterRemove(id) {
    const s = getInitiative();
    const i = s.entries.findIndex(x => x.id === id); if (i < 0) return;
    s.entries.splice(i, 1);
    if (s.turn > i) s.turn -= 1;            // keep the cursor on the same combatant
    if (s.turn >= s.entries.length) s.turn = 0;
    writeInit(s);
  }
  // Move an entry to a new index (drag-drop). The index is in the post-removal
  // list, matching how the UI computes a drop position.
  function rosterMove(id, toIndex) {
    const s = getInitiative();
    const from = s.entries.findIndex(x => x.id === id); if (from < 0) return;
    const [e] = s.entries.splice(from, 1);
    const to = Math.max(0, Math.min(s.entries.length, toIndex));
    s.entries.splice(to, 0, e);
    writeInit(s);
  }
  // Sort by initiative, high to low; entries with no number sink to the bottom
  // but keep their relative order. Resets the turn cursor to the top.
  function rosterSort() {
    const s = getInitiative();
    s.entries = s.entries
      .map((e, i) => [e, i])
      .sort((a, b) => {
        const av = a[0].init == null ? -Infinity : a[0].init;
        const bv = b[0].init == null ? -Infinity : b[0].init;
        return (bv - av) || (a[1] - b[1]);
      })
      .map(p => p[0]);
    s.turn = 0;
    writeInit(s);
  }
  // Advance/rewind the turn cursor, rolling the round counter on wrap.
  function initStep(dir) {
    const s = getInitiative();
    const n = s.entries.length; if (!n) return;
    let t = s.turn + (dir || 1);
    if (t >= n) { t = 0; s.round += 1; }
    else if (t < 0) { t = n - 1; s.round = Math.max(1, s.round - 1); }
    s.turn = t;
    writeInit(s);
  }
  // HP tracking. `hp` is current, `maxHp` the cap — either may be null (untracked).
  // Setting current clamps to [0, maxHp]; a damage/heal delta does the same.
  function rosterSetHp(id, cur, max) {
    const s = getInitiative();
    const e = s.entries.find(x => x.id === id); if (!e) return;
    if (max !== undefined) e.maxHp = (max == null ? null : Math.max(0, Math.round(max)));
    if (cur !== undefined) {
      if (cur == null) e.hp = null;
      else { let v = Math.max(0, Math.round(cur)); if (e.maxHp != null) v = Math.min(v, e.maxHp); e.hp = v; }
    }
    writeInit(s);
  }
  function rosterAdjustHp(id, delta) {   // delta < 0 = damage, > 0 = heal
    const s = getInitiative();
    const e = s.entries.find(x => x.id === id); if (!e || e.hp == null) return;
    let v = e.hp + Math.round(delta);
    if (e.maxHp != null) v = Math.min(v, e.maxHp);
    e.hp = Math.max(0, v);
    writeInit(s);
  }
  const clearInitiative = () => writeInit(clone(EMPTY_INIT));

  /* When a doc's HP field changes (an edit, or a ⚡ Stats generate), push the new
     max onto any roster entry that references it. A combatant sitting at full (or
     with no HP tracked yet) refills to the new max; a bloodied one keeps its
     current HP, only clamped down if the new max is lower. Called from patch(). */
  function syncRosterHpToDoc(id) {
    const d = effective(id); if (!d) return;
    const m = /\d+/.exec(String((d.fields && d.fields.hp) || ''));
    if (!m) return;                                   // no numeric page HP → nothing to sync
    const newMax = parseInt(m[0], 10);
    const s = getInitiative();
    let changed = false;
    s.entries.forEach(e => {
      if (e.kind !== 'doc' || e.ref !== id) return;
      const wasFull = e.hp == null || (e.maxHp != null && e.hp >= e.maxHp);
      e.maxHp = newMax;
      e.hp = (e.hp == null || wasFull) ? newMax : Math.min(e.hp, newMax);
      changed = true;
    });
    if (changed) writeInit(s);
  }

  /* --------------------------- Story flow chart --------------------------- */
  /* The story map derives its shape from the docs themselves (leadsTo links +
     [[wikilinks]]), so it can't drift from the campaign. The ONLY thing that
     lives here is where the DM has dragged each node — a pure presentation
     override, keyed by doc id. Auto-layout supplies a position for any node the
     DM hasn't touched; a stored one wins. Ephemeral like the roster: table
     furniture, never campaign content, never synced to Cowork. */
  function getChart() {
    const c = read(KEY.chart, { pos: {} });
    if (!c.pos || typeof c.pos !== 'object') c.pos = {};
    return c;
  }
  function setChartPos(id, x, y) {
    const c = getChart();
    c.pos[id] = { x: Math.round(x), y: Math.round(y) };
    write(KEY.chart, c);
    return c;
  }
  const clearChart = () => write(KEY.chart, { pos: {} });

  /* ------------------------------ Bestiary -------------------------------- */
  /* The shipped starter set (bestiary.js → window.DM_BESTIARY, public/SRD) plus
     the DM's PERSONAL library (this browser only, never the repo). getBestiary()
     merges them, personal first so a saved creature can shadow a shipped one by
     id. Each entry maps straight onto a creature document's fields. */
  const personalBestiary = () => {
    const raw = read(KEY.bestiary, { creatures: [] });
    return Array.isArray(raw.creatures) ? raw.creatures : [];
  };
  const shippedBestiary = () => {
    const src = window.DM_BESTIARY;
    return (src && Array.isArray(src.creatures)) ? src.creatures : [];
  };
  function getBestiary() {
    const personal = personalBestiary().map(c => Object.assign({ source: 'yours' }, c));
    const seen = new Set(personal.map(c => c.id));
    const shipped = shippedBestiary().filter(c => !seen.has(c.id)).map(c => Object.assign({ source: 'srd' }, c));
    return personal.concat(shipped);
  }
  function saveToBestiary(entry) {
    const list = personalBestiary();
    const e = Object.assign({}, entry);
    if (!e.id || !/^my_/.test(e.id)) e.id = 'my_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    e.name = (e.name || 'Creature').slice(0, 80);
    const i = list.findIndex(c => c.id === e.id);
    if (i >= 0) list[i] = e; else list.push(e);
    write(KEY.bestiary, { creatures: list });
    emit({ type: 'bestiary' });
    return e;
  }
  function removeFromBestiary(id) {
    write(KEY.bestiary, { creatures: personalBestiary().filter(c => c.id !== id) });
    emit({ type: 'bestiary' });
  }

  /* --------------------------------- UI ----------------------------------- */
  const EMPTY_UI = {
    passOk: false, open: {}, focus: null,
    railA: true, railB: true, widthA: 268, widthB: 300, tab: 'initiative',
    editingBody: null, quickNoteOpen: false, quickNotePos: null, quickNoteTarget: null,
    campaignCode: '',   // the code the DM reads the shared party from (remembered per-browser)
  };
  let ui = Object.assign(clone(EMPTY_UI), read(KEY.ui, EMPTY_UI));
  const saveUi = () => write(KEY.ui, ui);

  window.DMOS_STORE = {
    KEY, SCHEMA, DOC_TYPES,
    merge, clone, nowISO,

    subscribe: (fn) => { listeners.push(fn); return () => listeners.splice(listeners.indexOf(fn), 1); },
    isQuotaFull: () => quotaFull,

    get: effective,
    docs: allDocs,
    docCount: () => allDocs().length,
    tree, descendantsOf, nextOrder,
    campaign: () => ws.campaign,

    patch, createDoc, deleteDoc, restoreDoc, trash,
    conflicts, keepMine, takeTheirs, restoreMine,
    incoming: (id) => ws.conflicts[id] || null,

    // Notebook + quick-note pad
    NB_ROOT, ensureNotebook, isInNotebook, notebookSections, notebookTargets,
    createSection, fileNote,
    getQuickNote, setQuickNote, clearQuickNote,

    // Initiative roster (the right-rail "at the table" list)
    getInitiative, rosterAdd, rosterPatch, rosterRemove, rosterMove, rosterSort,
    initStep, clearInitiative, rosterSetHp, rosterAdjustHp,

    // Story flow chart (dragged node positions; the graph itself is derived)
    getChart, setChartPos, clearChart,

    // Creature library (shipped SRD starter + personal, this browser only)
    getBestiary, saveToBestiary, removeFromBestiary,

    loadCampaign, mergeIncoming, backup, newWorkspace,
    exportWorkspace, importWorkspace,

    getUi: () => ui,
    setUi: (partial) => { Object.assign(ui, partial); saveUi(); },
    saveUi,

    // Escape hatch for tests/console only. Never call this from a pane.
    _ws: () => ws,
    _reset: () => { ws = clone(EMPTY_WS); persist(); emit({ type: 'docs' }); },
  };
})();
