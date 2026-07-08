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
    notebook:   'rollAHeroDmNotebook',
    initiative: 'rollAHeroDmInitiative',
    chart:      'rollAHeroDmChart',
    inbox:      'rollAHeroDmInbox',
    ui:         'rollAHeroDmUi',
    party:      'rollAHeroDmParty',
  };

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
      ['looks', 'Looks like'], ['wants', 'Wants'], ['voice', 'Voice'], ['secret', 'Secret'] ] },
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
  const EMPTY_WS = { schema: SCHEMA, campaign: null, base: {}, overlay: {}, conflicts: {} };

  // Mirrors normalize() in app.js:29 — backfill on load so the schema can grow
  // without a migration script.
  function migrate(w) {
    if (!w || typeof w !== 'object') return clone(EMPTY_WS);
    if (!w.schema) w.schema = SCHEMA;
    ['base', 'overlay', 'conflicts'].forEach(k => { if (!w[k] || typeof w[k] !== 'object') w[k] = {}; });
    if (!('campaign' in w)) w.campaign = null;
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
    emit({ type: 'docs', ids: [id] });
    return effective(id);
  }

  function createDoc(opts) {
    const o = opts || {};
    const type = DOC_TYPES[o.type] ? o.type : 'note';
    const id = 'loc_' + type + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    ws.base[id] = normalizeDoc({
      id, type, title: o.title || 'Untitled ' + DOC_TYPES[type].label.toLowerCase(),
      parent: o.parent || null, order: nextOrder(o.parent || null), rev: 0, origin: 'local',
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
  function loadCampaign() {
    const src = window.DM_CAMPAIGN;
    if (!src || !Array.isArray(src.docs) || !src.docs.length) {
      return Promise.resolve({ ok: false, reason: 'no-campaign' });
    }
    const result = mergeIncoming(src.docs.map(clone), new Set());
    if (src.campaign) ws.campaign = src.campaign;
    persist();
    emit({ type: 'docs' });
    return Promise.resolve(Object.assign({ ok: true }, result));
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

  /* --------------------------------- UI ----------------------------------- */
  const EMPTY_UI = {
    passOk: false, open: {}, focus: null,
    railA: true, railB: true, widthA: 268, widthB: 300, tab: 'initiative',
    editingBody: null,
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

    loadCampaign, mergeIncoming, backup,
    exportWorkspace, importWorkspace,

    getUi: () => ui,
    setUi: (partial) => { Object.assign(ui, partial); saveUi(); },
    saveUi,

    // Escape hatch for tests/console only. Never call this from a pane.
    _ws: () => ws,
    _reset: () => { ws = clone(EMPTY_WS); persist(); emit({ type: 'docs' }); },
  };
})();
