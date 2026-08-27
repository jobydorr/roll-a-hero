/* dmos-notes-sync.js — mirrors the DM's Notebook to Firestore so a Claude Code
   session can read it.

   LOAD ORDER: after the Firebase compat SDK, firebase-config.js, and
   dmos-store.js. Exposes window.DMNotesSync.

   ── THE ONE RULE THIS FILE OBEYS ───────────────────────────────────────────
   localStorage is authoritative. This is a MIRROR, not storage. Nothing in
   here deletes or overwrites a local note, ever. The worst thing a bug in this
   file can do is leave the remote copy stale or fail to run — which is why
   there is a visible "last synced" line rather than a silent background job.

   Pull is deliberately additive: a remote doc whose id is already local is left
   alone. Only genuinely missing notes are created. That means two machines
   converge by gaining notes, never by losing them.

   To remove this feature entirely: delete the <script> tag in dm.html. The
   Notebook keeps working exactly as it did before, with every note intact.

   Data model:
     dmnotes/{notebookId}/docs/{docId}
       { docId, type, title, parent, order, body, fields, syncedAt, client }
   The notebook id is a long random string the DM holds. It must NOT be the
   party's campaign code — the players know that one, and these are spoilers. */
(function () {
  'use strict';

  var KEY = 'rollAHeroDmNotesSync';   // { id, lastPush, lastPull, auto }
  var cfg = window.FIREBASE_CONFIG;
  var hasSDK = typeof firebase !== 'undefined' && firebase && firebase.initializeApp;

  function readCfg() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function writeCfg(partial) {
    var c = Object.assign(readCfg(), partial || {});
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    return c;
  }

  function stub(reason) {
    window.DMNotesSync = {
      available: false, reason: reason,
      getConfig: readCfg, setId: function () {}, 
      push: function () { return Promise.reject(new Error(reason)); },
      pull: function () { return Promise.reject(new Error(reason)); },
    };
  }
  if (!cfg)    { stub('Firebase config missing'); return; }
  if (!hasSDK) { stub('Firebase SDK failed to load'); return; }

  var db, authReady;
  try {
    // firebase-sync.js may already have initialized the default app.
    if (!firebase.apps.length) firebase.initializeApp(cfg);
    db = firebase.firestore();
    authReady = new Promise(function (resolve, reject) {
      firebase.auth().onAuthStateChanged(function (u) { if (u) resolve(u); });
      firebase.auth().signInAnonymously().catch(reject);
    });
  } catch (e) {
    stub('Firebase init error: ' + (e && e.message));
    return;
  }

  // The id is a path segment, so keep it to a safe slug.
  var slug = function (s) {
    return String(s || '').trim().toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
  };
  var col = function (id) { return db.collection('dmnotes').doc(slug(id)).collection('docs'); };

  // Every document that lives under the Notebook root, in its effective (merged)
  // form — which is what the DM actually sees on screen.
  function notebookDocs() {
    var S = window.DMOS_STORE;
    if (!S || !S.docs) return [];
    return S.docs().filter(function (d) {
      return d && d.id && S.isInNotebook(d.id) && d.id !== S.NB_ROOT;
    });
  }

  function wireForm(d) {
    return {
      docId: d.id,
      type: d.type || 'note',
      title: String(d.title || ''),
      parent: d.parent || null,
      order: typeof d.order === 'number' ? d.order : 0,
      body: String(d.body || ''),
      fields: (d.fields && typeof d.fields === 'object') ? d.fields : {},
    };
  }

  var busy = false;

  var API = {
    available: true,
    ready: function () { return authReady; },
    getConfig: readCfg,
    slug: slug,

    setId: function (id) { return writeCfg({ id: slug(id) }); },
    setAuto: function (on) { return writeCfg({ auto: !!on }); },

    /* Push every notebook document up, overwriting the remote copy. Local is
       never read back from, so this cannot lose a note. Returns a count. */
    push: async function () {
      var c = readCfg();
      if (!c.id) throw new Error('No notebook id set');
      if (busy) throw new Error('A sync is already running');
      busy = true;
      try {
        await authReady;
        var docs = notebookDocs();
        var ref = col(c.id);
        var stamp = new Date().toISOString();
        // Chunk into batches — Firestore caps a write batch at 500 operations.
        for (var i = 0; i < docs.length; i += 400) {
          var batch = db.batch();
          docs.slice(i, i + 400).forEach(function (d) {
            var data = wireForm(d);
            data.syncedAt = stamp;
            data.client = 'dm-os';
            batch.set(ref.doc(d.id), data);
          });
          await batch.commit();
        }
        writeCfg({ lastPush: stamp, lastCount: docs.length });
        return { pushed: docs.length, at: stamp };
      } finally { busy = false; }
    },

    /* Pull is ADDITIVE ONLY. A remote note whose id already exists locally is
       skipped — never overwritten — so this can only ever add notes. */
    pull: async function () {
      var c = readCfg();
      if (!c.id) throw new Error('No notebook id set');
      var S = window.DMOS_STORE;
      await authReady;
      var qs = await col(c.id).get();
      var added = 0, skipped = 0;
      S.ensureNotebook();
      qs.docs.forEach(function (snap) {
        var r = snap.data() || {};
        if (!r.docId) return;
        if (S.get(r.docId)) { skipped++; return; }      // already here — leave it alone
        S.createDoc({
          id: r.docId, type: r.type || 'note', title: r.title || 'Note',
          parent: r.parent || S.NB_ROOT, body: r.body || '',
          fields: r.fields || {}, origin: 'local',
        });
        added++;
      });
      var stamp = new Date().toISOString();
      writeCfg({ lastPull: stamp });
      return { added: added, skipped: skipped, at: stamp };
    },

    /* What a Claude session reads. Kept here so the shape lives in one place. */
    read: async function (id) {
      await authReady;
      var qs = await col(id || readCfg().id).get();
      return qs.docs.map(function (d) { return d.data(); });
    },
  };

  window.DMNotesSync = API;
})();
