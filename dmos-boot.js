/* Roll a Hero — Dungeon Master OS: boot. The only file here with a top-level
   side effect (same discipline as app.js's single render() call). */
(function () {
  'use strict';

  /* THE PASSCODE IS A CURTAIN, NOT A VAULT.
     Anyone can View Source and read the next line. That is fine and expected.
     The real protection is that campaign/ is gitignored, so the public site has
     literally nothing to show: a stranger who types this passcode gets an empty
     workspace and a manifest.json that 404s.
     Do NOT "fix" this by adding real auth — you would break the DM's local
     workflow and protect nothing that isn't already absent.
     See DECISIONS.md, 2026-07-08.                                            */
  const PASSCODE = 'bugbear';

  const gate = document.getElementById('dmGate');
  const shell = document.getElementById('dmos');

  /* app.js?v=14 has no window.RAH. A browser holding the old cached file would
     otherwise die deep inside a paint with a baffling error. (BACKLOG.md:78 —
     ?v= doesn't bust index.html itself, so stale caches are a real event here.) */
  if (!window.RAH || !window.DMOS_STORE || !window.DMOS_UI) {
    gate.innerHTML = `<div class="panel gate-panel">
      <h1 class="title">Almost…</h1>
      <p class="lead">Your browser is holding an old copy of this app.</p>
      <p class="modal-hint">Press <strong>Ctrl+Shift+R</strong> (or Cmd+Shift+R) to force a fresh load.</p>
    </div>`;
    return;
  }

  const STORE = window.DMOS_STORE;
  const UI = window.DMOS_UI;

  UI.bind();
  UI.applyRails();

  function showGate() {
    gate.hidden = false;
    shell.hidden = true;
    const input = document.getElementById('dmPass');
    const msg = document.getElementById('gateMsg');
    const tryUnlock = () => {
      if (input.value === PASSCODE) { STORE.setUi({ passOk: true }); start(); return; }
      msg.textContent = 'That is not the passcode.';
      input.select();
    };
    document.getElementById('unlockBtn').onclick = tryUnlock;
    input.onkeydown = (e) => { if (e.key === 'Enter') tryUnlock(); };
    input.focus();
  }

  function start() {
    gate.hidden = true;
    shell.hidden = false;

    // Restore where the DM was reading. The hash is the feed's address.
    // editingBody is transient: never reopen into an editor, and never let a
    // stale id point at a document that was deleted last session.
    const ui = STORE.getUi();
    STORE.setUi({ editingBody: null });
    if (!location.hash && ui.focus) location.hash = ui.focus;
    else STORE.setUi({ focus: location.hash });

    UI.mark('tree', 'feed', 'rail', 'banner');

    // Then reach for the campaign folder. A 404 is a normal state, not an error:
    // it is exactly what a stranger on the public site sees.
    STORE.loadCampaign().then((res) => {
      UI.setCampaignStatus(res);

      // First run: open the top-level folders so the tree isn't a wall of triangles.
      const u = STORE.getUi();
      if (!Object.keys(u.open).length) {
        const open = {};
        STORE.tree().roots.forEach(d => { open[d.id] = true; });
        STORE.setUi({ open });
      }
      UI.mark('tree', 'feed');

      if (res.ok) {
        const n = res.created.length + res.updated.length;
        if (n) console.info('[dmos] synced', res);
        if (res.conflicted.length) console.warn('[dmos] conflicts awaiting your call:', res.conflicted);
      } else {
        console.info('[dmos] no campaign loaded:', res.reason, res.detail || '');
      }
    });
  }

  STORE.getUi().passOk ? start() : showGate();
})();
