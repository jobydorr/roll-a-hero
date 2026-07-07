/* firebase-sync.js — thin Firebase layer for character sharing (LOCAL-FIRST).

   Loaded as a classic <script> AFTER the Firebase compat SDK + firebase-config.js.
   Exposes window.RAHSync. If Firebase isn't configured or the SDK can't load
   (offline, blocked), RAHSync.available stays false and the app quietly falls back
   to offline-only — the sharing buttons hide, everything else keeps working.

   Data model:
     campaigns/{campaignId}/characters/{ownerUid__charId}
       { ownerUid, ownerName, campaign, charId, name, race, klass, archetype,
         character: <full local snapshot>, sharedAt }

   The full local character snapshot lives under `character` so a DM can print an
   identical sheet; the flat fields are just for quick list rendering. */
(function () {
  'use strict';

  const cfg = window.FIREBASE_CONFIG;
  const hasSDK = typeof firebase !== 'undefined' && firebase && firebase.initializeApp;

  function stub(reason) {
    window.RAHSync = { available: false, reason: reason, ready: () => Promise.reject(new Error(reason)) };
  }
  if (!cfg) { stub('Firebase config missing'); return; }
  if (!hasSDK) { stub('Firebase SDK failed to load'); return; }

  let db, authReady;
  try {
    firebase.initializeApp(cfg);
    db = firebase.firestore();
    authReady = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(u => { if (u) resolve(u); });
      firebase.auth().signInAnonymously().catch(reject);
    });
  } catch (e) {
    stub('Firebase init error: ' + (e && e.message));
    return;
  }

  const uid = () => (firebase.auth().currentUser || {}).uid || null;
  // Campaign codes become collection ids, so keep them to a safe slug.
  const slug = (s) => String(s || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
  const charCol = (campaign) => db.collection('campaigns').doc(slug(campaign)).collection('characters');
  const docId = (u, charId) => u + '__' + charId;

  function summarize(snap) {
    return {
      charId: snap.id || null,
      name: (snap.story && snap.story.name) || 'Unnamed Hero',
      race: snap.race || null,
      klass: snap.klass || null,
      archetype: snap.archetype || null,
    };
  }

  window.RAHSync = {
    available: true,
    ready: () => authReady,
    uid: uid,
    slug: slug,

    // Publish (or update) a character to a campaign. Only overwrites the caller's
    // own doc (id is namespaced by uid), so players can't clobber each other.
    shareCharacter: async function (snap, campaign, ownerName) {
      await authReady;
      const u = uid();
      const id = docId(u, snap.id);
      const data = Object.assign(summarize(snap), {
        ownerUid: u,
        ownerName: String(ownerName || 'Someone').slice(0, 40),
        campaign: slug(campaign),
        character: snap,
        sharedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      await charCol(campaign).doc(id).set(data);
      return id;
    },

    // Remove one of the caller's own shared characters.
    unshareCharacter: async function (charId, campaign) {
      await authReady;
      await charCol(campaign).doc(docId(uid(), charId)).delete();
    },

    // All characters shared to a campaign (newest first) — the DM party view.
    listCampaign: async function (campaign) {
      await authReady;
      const qs = await charCol(campaign).orderBy('sharedAt', 'desc').get();
      return qs.docs.map(d => d.data());
    },

    // charIds the caller has already shared to this campaign (to show Shared/Unshare).
    mySharedIds: async function (campaign) {
      await authReady;
      const qs = await charCol(campaign).where('ownerUid', '==', uid()).get();
      return qs.docs.map(d => d.data().charId).filter(Boolean);
    },
  };
})();
