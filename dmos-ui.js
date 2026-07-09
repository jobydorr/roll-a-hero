/* Roll a Hero — Dungeon Master OS: the render layer.

   THE TEARDOWN INVARIANT IS INVERTED FROM app.js. Read this before editing.

   In app.js, handlers are `.onclick` properties on nodes inside #app; replacing
   #app.innerHTML garbage-collects them, so no cleanup exists. Here, NO NODE EVER
   OWNS A HANDLER. A dozen delegated listeners are bound once at boot on four
   permanent roots (#dmos, #dmosFloat, #dmosModal, document) and never removed.
   Consequently any node inside a pane may be created, replaced, or discarded at
   any moment with zero cleanup — and NO PANE'S PAINT FUNCTION MAY EVER TOUCH A
   NODE OUTSIDE ITS OWN ROOT. That second sentence is the whole architecture.

   The only things needing explicit teardown are the four that live outside the
   DOM:  (1) `dragging`, cleared on pointerup/pointercancel;  (2) the rAF handle
   in flush();  (3) the pending-patch timer, flushed on beforeunload;  (4) the
   cross-tab `storage` listener. Nothing else may join this list without a
   comment saying why.

   Repainting is ONLY ever triggered by mark(pane). A pane that is "live" — being
   dragged, focused, or holding a text selection — has its dirty flag RETAINED,
   not dropped, and re-flushes on pointerup / focusout / selection-collapse. Do
   not add a force-repaint timeout; that is the same bug wearing a hat. */
(function () {
  'use strict';

  const STORE = window.DMOS_STORE;
  const DOC_TYPES = STORE.DOC_TYPES;
  const esc = (s) => window.RAH.escapeHtml(s == null ? '' : s);
  const ui = () => STORE.getUi();
  const announce = (msg) => { const l = document.getElementById('live'); if (l) l.textContent = msg; };

  const ROOT = {};
  const PAINT = {};

  /* ----- Outside-the-DOM state. Everything here needs explicit teardown. ---- */
  let dragging = null;
  let frame = 0;
  let pendTimer = 0;
  const pending = new Map();      // docId -> partial patch, coalesced while typing
  const dirty = new Set();
  const deferrals = {};
  let crossTab = false;
  let campaignStatus = null;      // result of the last loadCampaign()
  let peekTimer = 0, peekHideTimer = 0, peekFor = null;
  let focusBodyOnPaint = null;    // doc id whose body editor should take focus once
  let focusPadOnPaint = false;    // focus the quick-note pad on its next paint

  /* =============================== Repaint ================================= */
  function mark() {
    for (const p of arguments) dirty.add(p);
    if (!frame) frame = requestAnimationFrame(flush);
  }

  // A pane is "live" if repainting it would destroy work in progress.
  function isLive(root) {
    if (!root) return false;
    if (dragging) return true;
    const a = document.activeElement;
    if (a && a !== document.body && root.contains(a)
        && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable)) return true;
    const s = window.getSelection();
    if (s && s.rangeCount && !s.isCollapsed && s.anchorNode && root.contains(s.anchorNode)) return true;
    return false;
  }

  function flush() {
    frame = 0;
    const todo = Array.from(dirty);
    dirty.clear();
    for (const pane of todo) {
      const root = ROOT[pane];
      if (root && isLive(root)) {
        dirty.add(pane);                                   // retain, never drop
        deferrals[pane] = (deferrals[pane] || 0) + 1;
        showPill(pane, deferrals[pane]);
        continue;
      }
      deferrals[pane] = 0;
      showPill(pane, 0);
      try { PAINT[pane](); } catch (e) { console.error('[dmos] paint failed:', pane, e); }
    }
  }

  // Retried whenever a pane might have stopped being live.
  function retry() { if (dirty.size && !frame) frame = requestAnimationFrame(flush); }

  function showPill(pane, n) {
    const root = ROOT[pane];
    if (!root) return;
    const pill = root.querySelector(':scope > .pane-pill');
    if (!pill) return;
    if (n > 0) { pill.textContent = '⟳ ' + n + (n === 1 ? ' change' : ' changes'); pill.hidden = false; }
    else pill.hidden = true;
  }

  /* ========================== Event delegation ============================= */
  const ACT = {};

  function on(root, type, opts) {
    if (!root) return;
    root.addEventListener(type, (e) => {
      const el = e.target.closest && e.target.closest('[data-act]');
      if (!el || !root.contains(el)) return;
      const fn = ACT[el.dataset.act + (type === 'click' ? '' : ':' + type)];
      if (fn) fn(el, e);
    }, opts);
  }

  /* ============================== Routing ================================== */
  function parseHash() {
    const m = /^#\/(f|d)\/(.*)$/.exec(location.hash || '');
    if (!m) return { kind: 'f', id: null };
    return { kind: m[1], id: decodeURIComponent(m[2]) || null };
  }
  const gotoDoc = (id) => { location.hash = '#/d/' + encodeURIComponent(id); };
  const gotoFolder = (id) => { location.hash = '#/f/' + (id ? encodeURIComponent(id) : ''); };

  /* Which docs the feed shows.
       #/d/<id>  → just that document.
       #/f/<id>  → that document, then everything nested under it, stitched into
                   one scrolling read. The doc itself leads, even when it's a
                   folder: a folder's own prose is real content (it's where the
                   act's overview lives), and hiding it would make it unreachable.
       #/f/      → the whole campaign. */
  function feedDocs() {
    const f = parseHash();
    if (f.kind === 'd') { const d = STORE.get(f.id); return d ? [d] : []; }
    // Whole-campaign view: story only. The Notebook has its own sidebar section
    // and is read by focusing it directly (#/f/nb_root or a section/note).
    if (!f.id) return STORE.descendantsOf(null).filter(d => !STORE.isInNotebook(d.id));
    const self = STORE.get(f.id);
    const kids = STORE.descendantsOf(f.id);
    return self ? [self].concat(kids) : kids;
  }

  function pathOf(id) {
    const out = [];
    const byId = STORE.tree().byId;
    let cur = id ? byId.get(id) : null;
    const guard = new Set();
    while (cur && !guard.has(cur.id)) { guard.add(cur.id); out.unshift(cur); cur = cur.parent ? byId.get(cur.parent) : null; }
    return out;
  }

  /* ========================= Prose & wikilinks ============================= */
  const RX_LINK = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;

  // [[doc_npc_marla]] → "Marla Quickfoot". For anywhere a link can't be clicked:
  // the printed page and the peek summary. Never leak a raw id at the table.
  const unlink = (text) => String(text == null ? '' : text).replace(RX_LINK, (m, id, label) => {
    if (label) return label.trim();
    const t = STORE.get(id.trim());
    return t ? t.title : id.trim();
  });

  function linkify(text) {
    return esc(text)
      .replace(RX_LINK, (m, id, label) => {
        id = id.trim();
        const target = STORE.get(id);
        const name = label ? label.trim() : (target ? target.title : id);
        return target
          ? `<a class="wikilink" href="#/d/${id}" data-act="jump" data-target="${id}">${name}</a>`
          : `<span class="wikilink broken" title="No document with id &quot;${id}&quot;">${name}</span>`;
      })
      .split(/\n{2,}/)
      .map(p => '<p>' + p.replace(/\n/g, '<br>') + '</p>')
      .join('');
  }

  /* ============================ The feed pane ============================== */
  function conflictStripHTML(d) {
    return `<div class="note note-warn doc-conflict">
      <strong>Cowork sent a newer version of this.</strong> Yours is still showing — nothing was overwritten.
      <div class="actions" style="margin-top:10px;">
        <button class="btn btn-sm" data-act="keep-mine" data-doc="${d.id}">Keep mine</button>
        <button class="btn btn-sm btn-gold" data-act="take-theirs" data-doc="${d.id}">Take theirs</button>
        <button class="btn btn-sm btn-ghost" data-act="show-both" data-doc="${d.id}">Show me both</button>
      </div></div>`;
  }

  /* The reconcile key must fold in EVERYTHING that changes this node's HTML —
     not just `rev`. Conflict flags and the body-editor toggle don't move a
     revision (keepMine() only deletes a flag; open-body only touches UI state),
     so keying on `rev` alone silently renders a stale node. Anything you add to
     renderDocNode that isn't derived from `rev` belongs here too. */
  const nodeKey = (d) => [
    d.rev,
    d.conflict ? 'c' : '',
    d.parkedEdit ? 'p' : '',
    ui().editingBody === d.id ? 'e' : '',
  ].join('|');

  function renderDocNode(d) {
    const T = DOC_TYPES[d.type];
    const editingBody = ui().editingBody === d.id;
    const el = document.createElement('article');
    el.className = 'doc doc-' + d.type + (d.conflict ? ' has-conflict' : '');
    el.dataset.docId = d.id;
    el.dataset.rev = d.rev;
    el.dataset.key = nodeKey(d);
    el.innerHTML = `
      ${d.conflict ? conflictStripHTML(d) : ''}
      ${d.parkedEdit ? `<div class="note doc-parked">Your earlier edit is parked.
        <button class="btn btn-sm btn-ghost" data-act="restore-mine" data-doc="${d.id}">Put it back</button></div>` : ''}
      <header class="doc-head">
        <span class="doc-icon" aria-hidden="true">${icon(T.icon)}</span>
        <input class="doc-title" data-act="edit-title" data-doc="${d.id}"
               value="${esc(d.title)}" aria-label="Title of this ${esc(T.label)}">
        <span class="tag">${esc(T.label)}</span>
        ${d.edited ? '<span class="tag bonus" title="You have changed this since Cowork wrote it">edited</span>' : ''}
        <div class="spacer"></div>
        ${(d.type === 'npc' || d.type === 'creature') ? `<button class="btn btn-sm btn-ghost" data-act="statblock-menu" data-doc="${d.id}"
                title="Quick-generate a stat block">${icon('flame')} Stats</button>` : ''}
        ${d.type === 'creature' ? `<button class="btn btn-sm btn-ghost" data-act="save-bestiary" data-doc="${d.id}"
                title="Save to your creature library">${icon('book')} Save</button>` : ''}
        <button class="btn btn-sm btn-ghost" data-act="focus-doc" data-doc="${d.id}"
                title="Open just this document">${icon('scroll')}</button>
        <button class="btn btn-sm btn-ghost" data-act="delete-doc" data-doc="${d.id}"
                title="Move to trash (never really deleted)">✕</button>
      </header>
      ${T.fields.length ? `<div class="doc-fields">${T.fields.map(([k, prompt]) => `
        <label class="doc-field">
          <span class="doc-field-label">${esc(prompt)}</span>
          <textarea rows="1" data-act="edit-field" data-doc="${d.id}" data-field="${k}"
                    placeholder="…">${esc((d.fields || {})[k] || '')}</textarea>
        </label>`).join('')}</div>` : ''}
      ${T.statBlock ? statBlockFieldsHTML(d, T) : ''}
      <div class="doc-bodywrap">
        ${editingBody
          ? `<textarea class="doc-body-edit" data-act="edit-body" data-doc="${d.id}"
                       placeholder="Write here. Link to another document with [[its_id]].">${esc(d.body || '')}</textarea>`
          : `<div class="doc-body" data-act="open-body" data-doc="${d.id}">${
              d.body ? linkify(d.body) : '<p class="doc-empty">Click to write…</p>'}</div>`}
      </div>`;
    return el;
  }

  // The optional NPC combat block — rendered only once it has values (a fresh
  // NPC shows just the "⚡ Stats" header button until you generate or fill one).
  function statBlockFieldsHTML(d, T) {
    const has = (T.statBlock || []).some(([k]) => (d.fields || {})[k]);
    if (!has) return '';
    return `<div class="doc-fields doc-statblock">
      <div class="statblock-head">${icon('flame')} Stat block</div>
      ${T.statBlock.map(([k, prompt]) => `
        <label class="doc-field">
          <span class="doc-field-label">${esc(prompt)}</span>
          <textarea rows="1" data-act="edit-field" data-doc="${d.id}" data-field="${k}"
                    placeholder="…">${esc((d.fields || {})[k] || '')}</textarea>
        </label>`).join('')}</div>`;
  }

  // Quick-generate a stat block at a chosen power tier. The numbers are a
  // starting point the DM tweaks — calibrated loosely to a low-level table.
  const TIER_STATS = {
    normal:    { label: 'Normal',    hp: '11', ac: '12', speed: '30 feet', attack: '+3 to hit, 1d6+1 damage', special: '' },
    heroic:    { label: 'Heroic',    hp: '27', ac: '14', speed: '30 feet', attack: '+5 to hit, 1d8+3 damage', special: 'Once per fight: a second attack, or a burst — others beat 13 or take 2d6 (half on a success).' },
    legendary: { label: 'Legendary', hp: '52', ac: '16', speed: '30 feet', attack: '+7 to hit, 2d8+4 damage', special: 'Legendary — takes two turns each round and shrugs off one effect per turn.' },
    epic:      { label: 'Epic',      hp: '95', ac: '18', speed: '30 feet', attack: '+9 to hit, 3d8+5 damage', special: 'Epic — three turns a round, resists most single hits, and a signature area attack (others beat 16).' },
  };
  const TIER_ORDER = ['normal', 'heroic', 'legendary', 'epic'];
  function genStatsPatch(type, tier) {
    const t = TIER_STATS[tier] || TIER_STATS.normal;
    return type === 'creature'
      ? { hp: t.hp, ac: t.ac, speed: t.speed, attack: t.attack }
      : { hp: t.hp, ac: t.ac, attack: t.attack, special: t.special };
  }
  ACT['statblock-menu'] = (el) => {
    const id = el.dataset.doc;
    const items = TIER_ORDER.map(tier => menuItem('gen-stats', { doc: id, tier: tier }, 'flame', TIER_STATS[tier].label)).join('');
    openMenu(el, `<div class="menu-note">Quick-generate stats</div>${items}`);
  };
  ACT['gen-stats'] = (el) => {
    const id = el.dataset.doc, tier = el.dataset.tier;
    const d = STORE.get(id); if (!d) return;
    closeModal();
    const patch = genStatsPatch(d.type, tier);
    const hasStats = Object.keys(patch).some(k => (d.fields || {})[k]);
    const label = (TIER_STATS[tier] || {}).label || 'new';
    if (hasStats && !confirm('Replace the current stats with a ' + label + ' block?')) return;
    STORE.patch(id, { fields: patch });
    announce('Generated a ' + label + ' stat block.');
  };

  /* The keyed reconcile. Unchanged docs are never touched, so scroll position,
     a mid-edit textarea, and a live text selection all survive a NEIGHBOUR
     changing. If this is wrong, everything built on top of it is wrong. */
  PAINT.feed = function () {
    const head = document.getElementById('feedHead');
    const host = document.getElementById('feedDocs');
    const f = parseHash();
    const trail = pathOf(f.id);

    head.innerHTML = `
      <nav class="crumbs" aria-label="Where you are">
        <a href="#/f/" data-act="jump">${esc(STORE.campaign() || 'Campaign')}</a>
        ${trail.map(d => ` <span class="crumb-sep">›</span> <a href="#/${d.type === 'folder' ? 'f' : 'd'}/${d.id}" data-act="jump">${esc(d.title)}</a>`).join('')}
      </nav>`;

    const want = feedDocs();
    if (!want.length) { host.innerHTML = emptyFeedHTML(); return; }
    if (host.querySelector('.feed-empty')) host.innerHTML = '';

    // Index what's on screen; evict anything that isn't a doc node (e.g. a
    // leftover empty-state) so `cursor` below can only ever walk doc nodes.
    const have = new Map();
    Array.from(host.children).forEach(n => {
      if (n.dataset && n.dataset.docId) have.set(n.dataset.docId, n); else n.remove();
    });

    /* `cursor` walks the existing children in parallel with `want`. The one
       trap: anything that detaches the node `cursor` points at leaves cursor
       dangling, and the next insertBefore(_, cursor) throws NotFoundError. So
       ALWAYS advance cursor before removing the node it points at. */
    let cursor = host.firstChild;

    for (const d of want) {
      let node = have.get(d.id);

      if (node && node.dataset.key !== nodeKey(d)) {   // stale → drop and rebuild
        if (node === cursor) cursor = cursor.nextSibling;
        have.delete(d.id);
        node.remove();
        node = null;
      }

      if (!node) {
        host.insertBefore(renderDocNode(d), cursor);   // cursor null ⇒ append
      } else if (node === cursor) {
        cursor = cursor.nextSibling;                   // already in place
        have.delete(d.id);
      } else {
        host.insertBefore(node, cursor);               // out of order → move it
        have.delete(d.id);
      }
    }
    have.forEach(stale => stale.remove());
    host.querySelectorAll('textarea').forEach(autosize);

    // Opening the body editor should put the cursor in it — but only on the
    // paint that opened it, or we'd steal focus on every later repaint.
    if (focusBodyOnPaint) {
      const ta = host.querySelector(`[data-doc-id="${focusBodyOnPaint}"] .doc-body-edit`);
      focusBodyOnPaint = null;
      if (ta) { ta.focus(); ta.selectionStart = ta.selectionEnd = ta.value.length; }
    }
  };

  function emptyFeedHTML() {
    if (campaignStatus && campaignStatus.reason === 'no-campaign') {
      return `<div class="feed-empty"><div class="note">
        <strong>A blank workspace.</strong> Build it here — use the ＋ in the Story Folders
        sidebar to add a parent folder, then documents inside it — or brainstorm a campaign
        in Cowork and it will appear.
        <div class="actions" style="margin-top:12px;">
          <button class="btn btn-sm btn-primary" data-act="folder-menu" data-parent="">＋ Add a folder or document</button>
        </div></div></div>`;
    }
    if (campaignStatus && !campaignStatus.ok) {
      return `<div class="feed-empty"><div class="note note-warn">
        <strong>Couldn't load the campaign.</strong>
        <br>${esc(campaignStatus.reason)}${campaignStatus.detail ? ' — ' + esc(campaignStatus.detail) : ''}
        <br><br>Nothing was changed. Your workspace is untouched.</div></div>`;
    }
    return `<div class="feed-empty"><div class="note">
      <strong>Nothing in here yet.</strong>
      <div class="actions" style="margin-top:12px;">
        <button class="btn btn-sm btn-primary" data-act="folder-menu" data-parent="">＋ Add a folder or document</button>
      </div></div></div>`;
  }

  function autosize(ta) {
    ta.style.height = 'auto';
    ta.style.height = Math.max(ta.scrollHeight + 2, 34) + 'px';
  }

  /* ============================ The tree pane ============================== */
  PAINT.tree = function () {
    // The brand is a real link home. Before this, the ONLY route back to the
    // player app was on the passcode gate — which disappears once you unlock.
    document.getElementById('treeHead').innerHTML = `
      <a class="rail-title" href="index.html"
         title="Back to Roll a Hero — the player app your friends use">
        ${icon('dice')} <span>Roll a Hero</span>
      </a>
      <button class="rail-collapse" data-act="collapse-a" title="Hide this sidebar" aria-label="Hide sidebar">‹</button>`;

    const t = STORE.tree();
    const f = parseHash();
    const tr = STORE.trash();

    const storyRoots = t.roots.filter(d => d.id !== STORE.NB_ROOT);
    const nbSections = STORE.notebookSections();

    document.getElementById('treeBody').innerHTML = `
      <div class="rail-section">
        <div class="rail-section-head">Tools</div>
        <ul class="tool-list">
          <li><button class="tool" data-act="search">${icon('scroll')} <span>Search</span> <kbd class="tool-kbd">Ctrl K</kbd></button></li>
          <li><button class="tool tool-quicknote" data-act="quick-note">${icon('flame')} <span>Quick note</span></button></li>
          <li><button class="tool" data-act="today-notes">${icon('star')} <span>Today's notes</span></button></li>
          <li><button class="tool" data-act="story-map">${icon('flow')} <span>Story map</span></button></li>
          <li><button class="tool" data-act="sync">${icon('scroll')} <span>Sync from campaign</span></button></li>
          <li><button class="tool" data-act="new-workspace">${icon('star')} <span>New workspace</span></button></li>
          <li><button class="tool" data-act="export">${icon('print')} <span>Export workspace</span></button></li>
          <li><button class="tool" data-act="import">${icon('check')} <span>Import workspace</span></button></li>
          <li><button class="tool tool-lock" data-act="lock"
                      title="Lock the DM OS — the passcode will be needed again">${icon('shield')} <span>Lock</span></button></li>
        </ul>
      </div>
      <div class="rail-section">
        <div class="rail-section-head">Story Folders
          <button class="section-add" data-act="folder-menu" data-parent="" title="Add a parent folder or a document">＋</button></div>
        ${storyRoots.length ? `<ul class="tree">${storyRoots.map(d => treeNodeHTML(d, t, f, 0)).join('')}</ul>`
                         : `<p class="rail-hint">Nothing yet. Use the ＋ above to add a parent folder or a document.</p>`}
      </div>
      <div class="rail-section">
        <div class="rail-section-head">Notebook
          <button class="section-add" data-act="new-section" title="New notebook section">＋</button></div>
        ${nbSections.length ? `<ul class="tree">${nbSections.map(d => treeNodeHTML(d, t, f, 0)).join('')}</ul>`
                            : `<p class="rail-hint">No notes yet. Take a <button class="linklike" data-act="quick-note">Quick note</button>.</p>`}
      </div>
      ${tr.length ? `<div class="rail-section">
        <div class="rail-section-head">Trash (${tr.length})</div>
        <ul class="tree">${tr.map(d => `<li><div class="tree-row is-trash">
          <span class="tree-icon">${icon(DOC_TYPES[d.type].icon)}</span>
          <span class="tree-title">${esc(d.title)}</span>
          <button class="tree-restore" data-act="restore-doc" data-doc="${d.id}" title="Put it back">↩</button>
        </div></li>`).join('')}</ul></div>` : ''}`;
  };

  // A top-level folder (a "parent" — an Act) reads as a tome; a nested folder is a
  // plain folder. Everything else uses its doc-type icon.
  function docIconName(d) {
    if (d.type !== 'folder') return DOC_TYPES[d.type].icon;
    return (d.parent === null || d.parent === undefined) ? 'book' : 'folder';
  }

  function treeNodeHTML(d, t, focus, depth) {
    const kids = t.kids.get(d.id) || [];
    const open = !!ui().open[d.id];
    const selected = focus.id === d.id;
    const isFolder = d.type === 'folder';
    return `<li>
      <div class="tree-row${selected ? ' is-selected' : ''}${isFolder ? ' is-folder' : ''}" data-act="select-node" data-doc="${d.id}" style="--depth:${depth}">
        <span class="tree-handle" data-act="row-drag" data-doc="${d.id}" title="Drag to reorder" aria-hidden="true">⠿</span>
        ${kids.length
          ? `<button class="tree-twist${open ? ' is-open' : ''}" data-act="toggle-folder" data-doc="${d.id}"
                     aria-expanded="${open}" aria-label="${open ? 'Collapse' : 'Expand'} ${esc(d.title)}">▸</button>`
          : `<span class="tree-twist tree-twist-empty" aria-hidden="true"></span>`}
        <span class="tree-icon" aria-hidden="true">${icon(docIconName(d))}</span>
        <span class="tree-title">${esc(d.title)}</span>
        ${d.conflict ? '<span class="tag warn tree-badge" title="Cowork sent a newer version">!</span>' : ''}
        ${isFolder ? `<button class="row-add" data-act="folder-menu" data-parent="${d.id}" title="Add to “${esc(d.title)}”">＋</button>` : ''}
      </div>
      ${kids.length && open ? `<ul>${kids.map(k => treeNodeHTML(k, t, focus, depth + 1)).join('')}</ul>` : ''}
    </li>`;
  }

  /* ============================ The rail pane ============================== */
  /* The right rail is the "at the table" roster: one ordered list that IS the
     initiative order. Player heroes (Firebase phase), NPCs, and creatures share
     it. Drag the ⠿ handle to reorder; click a name for a scrollable stat card;
     add via the search box or a story wikilink's "＋ Initiative". */
  PAINT.rail = function () {
    const s = STORE.getInitiative();
    document.getElementById('railHead').innerHTML = `
      <button class="rail-collapse" data-act="collapse-b" title="Hide this sidebar" aria-label="Hide sidebar">›</button>
      <div class="rail-title"><span>At the table</span></div>`;

    const rows = s.entries.map((e, i) => rosterRowHTML(e, i, s)).join('');
    document.getElementById('railBody').innerHTML = `
      <div class="ini">
        ${partyPanelHTML()}
        <div class="ini-bar">
          <span class="ini-round">Round <strong>${s.round}</strong></span>
          <span class="spacer"></span>
          <button class="ini-step" data-act="ini-prev" title="Previous turn"${s.entries.length ? '' : ' disabled'} aria-label="Previous turn">‹</button>
          <button class="ini-step ini-step-next" data-act="ini-next" title="Next turn"${s.entries.length ? '' : ' disabled'}>Next ›</button>
        </div>
        <div class="ini-addbar">
          <input type="text" class="ini-search" data-act="ini-search" placeholder="Add a creature, NPC, or name…" autocomplete="off" spellcheck="false" aria-label="Add to initiative">
          <div class="ini-results" id="iniResults" hidden></div>
        </div>
        <button class="ini-lookup" data-act="lookup-open">${icon('book')} Look up a creature</button>
        <ol class="ini-list" id="iniList">${rows || `<li class="ini-empty">No one in the fight yet.<br><span class="rail-hint">Search above, or hover a name in the story and pick “＋ Initiative”.</span></li>`}</ol>
        ${s.entries.length ? `<div class="ini-tools">
          <button class="btn btn-sm btn-ghost" data-act="ini-sort" title="Order by initiative number, high to low">Sort by init</button>
          <span class="spacer"></span>
          <button class="btn btn-sm btn-ghost" data-act="ini-clear">Clear all</button>
        </div>` : ''}
      </div>`;
  };

  // What a roster entry resolves to right now — its ref doc may have been edited
  // or deleted since it was added. `side` drives the row's left-edge colour.
  function resolveEntry(e) {
    if (e.kind === 'doc' && e.ref) {
      const d = STORE.get(e.ref);
      if (d) {
        const T = DOC_TYPES[d.type] || {};
        return { name: d.title, side: d.type === 'npc' ? 'npc' : 'foe', icon: T.icon || 'shield', typeLabel: T.label || '', doc: d };
      }
      return { name: e.name || 'Removed', side: 'foe', icon: 'shield', typeLabel: 'No longer in the workspace', doc: null };
    }
    if (e.kind === 'hero') return { name: e.name || 'Hero', side: 'party', icon: 'star', typeLabel: 'Player character', doc: null };
    // A creature dropped straight onto the roster from Lookup — no story page, so
    // synthesize a doc-shaped object from its inline stats for the card/peek.
    if (e.kind === 'creature' && e.stats) {
      const synth = { type: 'creature', title: e.name, fields: e.stats, body: e.stats.notes || '' };
      return { name: e.name || 'Creature', side: 'foe', icon: 'shield', typeLabel: 'Creature', doc: synth };
    }
    return { name: e.name || 'Combatant', side: 'foe', icon: 'sword', typeLabel: 'One-off', doc: null };
  }

  // A creature's page — or an NPC with a stat block — carries a starting HP (its
  // hp field, first number). One-offs have none until the DM sets one.
  function hpFromDoc(d) {
    if (!d) return null;
    const m = /\d+/.exec(String((d.fields && d.fields.hp) || ''));
    if (!m) return null;
    const n = parseInt(m[0], 10);
    return { hp: n, maxHp: n };
  }
  // Colour the HP chip by how bloodied the combatant is.
  function hpClass(e) {
    if (e.hp == null) return 'ini-hp-set';
    if (e.hp <= 0) return 'hp-down';
    if (e.maxHp == null) return 'hp-ok';
    const r = e.hp / e.maxHp;
    return r <= 0.25 ? 'hp-crit' : (r <= 0.5 ? 'hp-low' : 'hp-ok');
  }

  function rosterRowHTML(e, i, s) {
    const info = resolveEntry(e);
    const isTurn = s.entries.length && i === s.turn;
    const hpChip = e.hp == null
      ? `<button class="ini-hp ini-hp-set" data-act="ini-hp" data-id="${e.id}" title="Set hit points">HP</button>`
      : `<button class="ini-hp ${hpClass(e)}" data-act="ini-hp" data-id="${e.id}" title="Adjust hit points">${e.hp}${e.maxHp != null ? `<span class="ini-hp-max">/${e.maxHp}</span>` : ''}</button>`;
    return `<li class="ini-row side-${info.side}${isTurn ? ' is-turn' : ''}" data-id="${e.id}">
      <span class="ini-handle" data-act="roster-drag" data-id="${e.id}" title="Drag to reorder" aria-hidden="true">⠿</span>
      <input class="ini-num" data-act="ini-num" data-id="${e.id}" type="text" inputmode="numeric" maxlength="3"
             value="${e.init == null ? '' : e.init}" title="Initiative" aria-label="Initiative for ${esc(info.name)}" placeholder="–">
      <button class="ini-name" data-act="roster-open" data-id="${e.id}" title="See stats">
        <span class="ini-ico" aria-hidden="true">${icon(info.icon)}</span>
        <span class="ini-name-text">${esc(info.name)}</span>
      </button>
      ${hpChip}
      <button class="ini-x" data-act="roster-remove" data-id="${e.id}" title="Remove" aria-label="Remove ${esc(info.name)}">×</button>
    </li>`;
  }

  /* ------------------------------ Roster acts ----------------------------- */
  ACT['ini-next'] = () => STORE.initStep(1);
  ACT['ini-prev'] = () => STORE.initStep(-1);
  ACT['ini-sort'] = () => STORE.rosterSort();
  ACT['ini-clear'] = () => { if (confirm('Clear everyone from the initiative list?\n\nYour creature and NPC pages are untouched.')) STORE.clearInitiative(); };
  ACT['roster-remove'] = (el) => STORE.rosterRemove(el.dataset.id);
  ACT['ini-num:change'] = (el) => {
    const v = el.value.trim();
    const n = v === '' ? null : parseInt(v, 10);
    STORE.rosterPatch(el.dataset.id, { init: (n == null || isNaN(n)) ? null : n });
  };

  // Add a workspace doc (creature/NPC) — from the search results or a story
  // wikilink's peek. Opens the rail if it was collapsed so the add is visible.
  ACT['roster-add-doc'] = (el) => {
    const d = STORE.get(el.dataset.doc); if (!d) return;
    STORE.rosterAdd(Object.assign({ kind: 'doc', ref: d.id, name: d.title }, hpFromDoc(d) || {}));
    hidePeek();
    if (!ui().railB) { STORE.setUi({ railB: true }); applyRails(); }
    announce('Added ' + d.title + ' to initiative.');
  };
  ACT['roster-add-custom'] = (el) => {
    const name = (el.dataset.name || '').trim(); if (!name) return;
    STORE.rosterAdd({ kind: 'custom', name });
    announce('Added ' + name + ' to initiative.');
  };
  ACT['roster-open'] = (el) => {
    hidePeek();
    const e = STORE.getInitiative().entries.find(x => x.id === el.dataset.id);
    if (e) openStatCard(e);
  };

  // The HP chip opens a small anchored editor: damage/heal by an amount, or set
  // current/max. A combatant with no HP yet gets a "give it hit points" form.
  ACT['ini-hp'] = (el) => openHpEditor(el);
  const hpAmt = () => { const i = ROOT.modal.querySelector('.hp-amt'); const n = i ? parseInt(i.value, 10) : NaN; return isNaN(n) ? null : Math.abs(n); };
  ACT['hp-damage'] = (el) => { const n = hpAmt(); if (n != null) STORE.rosterAdjustHp(el.dataset.id, -n); closeModal(); };
  ACT['hp-heal']   = (el) => { const n = hpAmt(); if (n != null) STORE.rosterAdjustHp(el.dataset.id, n); closeModal(); };
  ACT['hp-init']   = (el) => { const n = hpAmt(); if (n != null && n > 0) STORE.rosterSetHp(el.dataset.id, n, n); closeModal(); };
  ACT['hp-full']   = (el) => { const e = STORE.getInitiative().entries.find(x => x.id === el.dataset.id); if (e && e.maxHp != null) STORE.rosterSetHp(el.dataset.id, e.maxHp); closeModal(); };
  ACT['hp-clear']  = (el) => { STORE.rosterSetHp(el.dataset.id, null, null); closeModal(); };

  function openHpEditor(anchorEl) {
    const id = anchorEl.dataset.id;
    const e = STORE.getInitiative().entries.find(x => x.id === id); if (!e) return;
    const info = resolveEntry(e);
    let body;
    if (e.hp == null) {
      body = `<div class="hp-ed-title">${esc(info.name)}</div>
        <div class="hp-ed-row">
          <input type="text" class="hp-amt" inputmode="numeric" maxlength="4" placeholder="Max HP" autocomplete="off">
          <button class="btn btn-sm btn-primary" data-act="hp-init" data-id="${id}">Set</button>
        </div>
        <div class="hp-ed-hint">Give this combatant hit points to track at the table.</div>`;
    } else {
      body = `<div class="hp-ed-title">${esc(info.name)} — <strong>${e.hp}${e.maxHp != null ? ' / ' + e.maxHp : ''}</strong> HP</div>
        <div class="hp-ed-row">
          <input type="text" class="hp-amt" inputmode="numeric" maxlength="4" placeholder="amount" autocomplete="off">
          <button class="btn btn-sm" data-act="hp-damage" data-id="${id}" title="Subtract (Enter)">− Damage</button>
          <button class="btn btn-sm" data-act="hp-heal" data-id="${id}" title="Add">+ Heal</button>
        </div>
        <div class="hp-ed-row hp-ed-sub">
          ${e.maxHp != null ? `<button class="btn btn-sm btn-ghost" data-act="hp-full" data-id="${id}">Full</button>` : ''}
          <button class="btn btn-sm btn-ghost" data-act="hp-clear" data-id="${id}">Clear HP</button>
        </div>`;
    }
    openMenu(anchorEl, `<div class="hp-editor">${body}</div>`);
    const inp = ROOT.modal.querySelector('.hp-amt');
    if (inp) {
      inp.focus();
      inp.onkeydown = (ev) => {
        if (ev.key !== 'Enter') return;
        ev.preventDefault();
        const btn = ROOT.modal.querySelector('[data-act="hp-damage"], [data-act="hp-init"]');
        if (btn) btn.click();
      };
    }
  }

  // Live search as you type — matches workspace creatures & NPCs, plus an
  // always-present "add as a one-off". Updates ONLY #iniResults, so typing never
  // triggers a rail repaint (the pane would defer as "live" anyway).
  ACT['ini-search:input'] = (el) => renderIniResults(el.value);
  ACT['ini-search:keydown'] = (el, e) => {
    if (e.key === 'Escape') { el.value = ''; renderIniResults(''); return; }
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const first = document.querySelector('#iniResults .ini-result');
    el.blur();                       // so the add's repaint isn't deferred as live
    if (first) first.click();
  };
  function renderIniResults(query) {
    const box = document.getElementById('iniResults');
    if (!box) return;
    const q = query.trim().toLowerCase();
    if (!q) { box.hidden = true; box.innerHTML = ''; return; }
    const hits = STORE.docs()
      .filter(d => (d.type === 'creature' || d.type === 'npc') && !STORE.isInNotebook(d.id))
      .filter(d => d.title.toLowerCase().includes(q) || DOC_TYPES[d.type].label.toLowerCase().includes(q))
      .slice(0, 8)
      .map(d => `<button class="ini-result" data-act="roster-add-doc" data-doc="${d.id}">
        <span class="ini-ico" aria-hidden="true">${icon(DOC_TYPES[d.type].icon)}</span>
        <span class="ini-result-name">${esc(d.title)}</span>
        <span class="ini-result-type">${esc(DOC_TYPES[d.type].label)}</span></button>`).join('');
    box.innerHTML = hits + `<button class="ini-result ini-result-custom" data-act="roster-add-custom" data-name="${esc(query.trim())}">
      <span class="ini-ico" aria-hidden="true">${icon('sword')}</span>
      <span class="ini-result-name">Add “${esc(query.trim())}”</span>
      <span class="ini-result-type">one-off</span></button>`;
    box.hidden = false;
  }

  // Click a roster name → a sizable, scrollable stat card. For a creature/NPC it
  // shows that page's template fields + notes; a "one-off" has nothing to show.
  function openStatCard(e) {
    if (e.kind === 'hero' && e.snapshot && window.RAH && window.RAH.withState) { openHeroCard(e); return; }
    const info = resolveEntry(e);
    let inner;
    if (info.doc) {
      const d = info.doc, T = DOC_TYPES[d.type] || { fields: [] };
      const statRow = (k, v) => `<div class="stat-row"><div class="stat-k">${esc(k)}</div><div class="stat-v">${esc(v).replace(/\n/g, '<br>')}</div></div>`;
      const blockRows = (T.statBlock || []).map(([k, prompt]) => { const v = (d.fields || {})[k]; return v ? statRow(prompt, v) : ''; }).join('');
      const fieldRows = (T.fields || []).map(([k, prompt]) => { const v = (d.fields || {})[k]; return v ? statRow(prompt, v) : ''; }).join('');
      const bodyRow = d.body ? statRow('Notes', unlink(d.body)) : '';
      inner = (blockRows + fieldRows + bodyRow) || '<p class="modal-hint">Nothing written on this page yet.</p>';
    } else {
      inner = `<p class="modal-hint">${e.kind === 'hero' ? 'Player-character stats arrive with the party phase.' : 'A one-off combatant — no page to show.'}</p>`;
    }
    openModal(`
      <div class="stat-head">
        <span class="stat-ico" aria-hidden="true">${icon(info.icon)}</span>
        <div class="stat-heading">
          <div class="modal-title">${esc(info.name)}</div>
          ${info.typeLabel ? `<div class="stat-sub">${esc(info.typeLabel)}</div>` : ''}
        </div>
        ${info.doc && info.doc.id ? `<a class="btn btn-sm btn-ghost stat-open" href="#/d/${info.doc.id}" data-act="close-modal">Open page →</a>` : ''}
      </div>
      <div class="stat-body">${inner}</div>`, 'modal-wide stat-modal');
  }

  // Drag a roster row by its ⠿ handle to reorder. Flat list — no nesting.
  ACT['roster-drag:pointerdown'] = (el, e) => {
    const id = el.dataset.id;
    if (!STORE.getInitiative().entries.some(x => x.id === id)) return;
    dragging = { kind: 'roster', id: id, dropTarget: null, dropBefore: true };
    el.setPointerCapture(e.pointerId);
    const row = el.closest('.ini-row'); if (row) row.classList.add('row-dragging');
    document.body.classList.add('dmos-row-dragging');
    e.preventDefault();
  };
  function clearRosterMarks() {
    if (ROOT.rail) ROOT.rail.querySelectorAll('.drop-before, .drop-after')
      .forEach(n => n.classList.remove('drop-before', 'drop-after'));
  }

  /* ----------------------- Shared party (Firebase) ------------------------ */
  // The rail can pull the players' SHARED heroes into the roster. The DM types
  // their campaign code once (remembered in the store); we read that campaign
  // from Firebase via RAHSync. partyState is transient view state — the code
  // persists, the fetched list does not (a re-fetch is cheap and always current).
  let partyState = { status: 'idle', code: '', heroes: [], error: '' };
  const sharingOn = () => !!(window.RAHSync && window.RAHSync.available);

  function partyPanelHTML() {
    if (!sharingOn()) {
      return `<div class="party party-off"><span class="rail-hint">The shared-party connection isn’t available here, so player characters can’t be pulled in. (Creatures &amp; NPCs still work.)</span></div>`;
    }
    const code = ui().campaignCode || '';
    let list = '';
    if (partyState.status === 'loading') list = `<div class="party-status">Loading the party…</div>`;
    else if (partyState.status === 'error') list = `<div class="party-status party-err">${esc(partyState.error || 'Could not load that campaign.')}</div>`;
    else if (partyState.status === 'ok') {
      list = partyState.heroes.length
        ? partyState.heroes.map(partyHeroRowHTML).join('')
        : `<div class="party-status">No shared characters under “${esc(partyState.code)}” yet.</div>`;
    }
    return `<div class="party">
      <div class="party-row">
        <input class="party-code" data-act="party-code" type="text" value="${esc(code)}"
               placeholder="Campaign code" autocomplete="off" spellcheck="false" aria-label="Campaign code">
        <button class="btn btn-sm btn-ghost" data-act="party-load">Load</button>
      </div>
      ${list ? `<div class="party-list">${list}</div>` : ''}
    </div>`;
  }

  function partyHeroRowHTML(h) {
    const inFight = STORE.getInitiative().entries.some(e => e.ref === h._id);
    return `<div class="party-hero">
      <span class="ini-ico" aria-hidden="true">${icon('star')}</span>
      <span class="party-hero-name">${esc(h.name || 'Unnamed Hero')}${h._sub ? ` <span class="party-hero-sub">${esc(h._sub)}</span>` : ''}</span>
      ${inFight
        ? `<span class="party-in" title="Already in the fight">✓</span>`
        : `<button class="party-add" data-act="party-add" data-id="${esc(h._id)}" title="Add to initiative" aria-label="Add ${esc(h.name || 'hero')} to initiative">＋</button>`}
    </div>`;
  }

  ACT['party-code:change'] = (el) => STORE.setUi({ campaignCode: el.value.trim() });
  ACT['party-code:keydown'] = (el, e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    STORE.setUi({ campaignCode: el.value.trim() });
    el.blur();
    loadParty();
  };
  ACT['party-load'] = () => loadParty();
  ACT['party-add'] = (el) => {
    const h = partyState.heroes.find(x => x._id === el.dataset.id);
    if (!h) return;
    let hp = null;
    try { const n = window.RAH.withState(h.character, () => window.RAH.computeHP()); if (typeof n === 'number' && n > 0) hp = { hp: n, maxHp: n }; } catch (err) {}
    STORE.rosterAdd(Object.assign({ kind: 'hero', ref: h._id, name: h.name || 'Hero', snapshot: h.character }, hp || {}));
    announce('Added ' + (h.name || 'the hero') + ' to initiative.');
  };

  function loadParty() {
    if (!sharingOn()) return;
    const code = (ui().campaignCode || '').trim();
    if (!code) { announce('Type your campaign code first.'); return; }
    partyState = { status: 'loading', code: code, heroes: [], error: '' };
    mark('rail');
    window.RAHSync.listCampaign(code).then((rows) => {
      const heroes = (rows || []).map((h) => {
        let sub = '';
        try {
          sub = window.RAH.withState(h.character, () => {
            const r = window.RAH.getRace(), c = window.RAH.getClass();
            return [r ? r.name : '', c ? c.name : ''].filter(Boolean).join(' ');
          });
        } catch (err) { /* a malformed snapshot just shows no sub-line */ }
        return Object.assign({}, h, { _sub: sub });
      });
      partyState = { status: 'ok', code: code, heroes: heroes, error: '' };
      mark('rail');
    }).catch((err) => {
      partyState = { status: 'error', code: code, heroes: [], error: (err && err.message) || 'Could not reach the party.' };
      mark('rail');
    });
  }

  // A player's stat card: real HP/AC/abilities computed from their shared
  // snapshot, plus the full features/spells write-up. withState is SYNC-ONLY
  // (app.js warning) — everything below runs inside one synchronous pass.
  function openHeroCard(e) {
    const R = window.RAH;
    const d = R.withState(e.snapshot, () => {
      const r = R.getRace(), c = R.getClass(), a = R.getArchetype();
      const wis = R.finalScore('wis');
      const abil = ['str', 'dex', 'con', 'int', 'wis', 'cha'].map((k) => {
        const sc = R.finalScore(k);
        return { k: k, score: sc, mod: sc == null ? null : R.modOf(sc) };
      });
      return {
        level: R.charLevel(),
        race: r ? r.name : '', klass: c ? c.name : '', arch: a ? a.name : '',
        hp: R.computeHP(), ac: R.computeAC(),
        passive: wis == null ? null : 10 + R.modOf(wis),
        spell: R.spellNumbers(), abil: abil,
        ref: R.referenceHTML(false),
      };
    });
    const stat = (num, lab) => `<div class="hs-stat"><span class="hs-num">${num}</span><span class="hs-lab">${lab}</span></div>`;
    const top = `<div class="hs-top">
      ${stat(d.hp, 'HP')}${stat(d.ac, 'AC')}${d.passive == null ? '' : stat(d.passive, 'Passive')}
      ${d.spell ? stat('+' + d.spell.atk, 'Spell atk') + stat(d.spell.dc, 'Spell DC') : ''}
    </div>`;
    const abils = `<div class="hs-abils">${d.abil.map((x) =>
      `<div class="hs-ab"><span class="hs-ab-k">${x.k.toUpperCase()}</span><span class="hs-ab-v">${x.score == null ? '—' : x.score}</span><span class="hs-ab-m">${x.mod == null ? '' : R.fmtMod(x.mod)}</span></div>`).join('')}</div>`;
    openModal(`
      <div class="stat-head">
        <span class="stat-ico" aria-hidden="true">${icon('star')}</span>
        <div class="stat-heading">
          <div class="modal-title">${esc(e.name || 'Hero')}</div>
          <div class="stat-sub">Level ${d.level} ${esc(d.race)} ${esc(d.klass)}${d.arch ? ' — ' + esc(d.arch) : ''}</div>
        </div>
      </div>
      <div class="stat-body">
        ${top}${abils}
        <div class="writeup hs-ref">${d.ref}</div>
      </div>`, 'modal-wide stat-modal hero-modal');
  }

  /* --------------------------- Creature Lookup ---------------------------- */
  // Search the shipped SRD starter + the DM's personal library. Each hit can be
  // dropped into the STORY (a real creature page) or onto the ROSTER (a quick
  // combatant with inline stats, no page). Personal entries can be removed.
  let lookupTab = 'creatures';
  let lookupQuery = '';
  ACT['lookup-open'] = () => openLookupModal();
  ACT['lookup-input:input'] = (el) => { lookupQuery = el.value; renderLookup(); };
  ACT['lookup-tab'] = (el) => {
    lookupTab = el.dataset.tab;
    const inp = ROOT.modal.querySelector('#lookupInput'); if (inp) inp.focus();
    renderLookup();
  };

  function openLookupModal() {
    lookupTab = 'creatures'; lookupQuery = '';
    openModal(`
      <div class="modal-title">Look up</div>
      <div class="lookup-tabs">
        <button class="lookup-tab" data-act="lookup-tab" data-tab="creatures">Creatures</button>
        <button class="lookup-tab" data-act="lookup-tab" data-tab="spells">Spells</button>
        <button class="lookup-tab" data-act="lookup-tab" data-tab="terms">Terms</button>
      </div>
      <div class="search-box"><input type="text" id="lookupInput" data-act="lookup-input"
           placeholder="Search creatures by name or tag…" autocomplete="off" spellcheck="false"></div>
      <div class="lookup-results" id="lookupResults"></div>`, 'modal-wide modal-search modal-lookup');
    renderLookup();
    const inp = ROOT.modal.querySelector('#lookupInput'); if (inp) inp.focus();
  }
  function renderLookup() {
    ROOT.modal.querySelectorAll('.lookup-tab').forEach(b => b.classList.toggle('is-active', b.dataset.tab === lookupTab));
    const inp = ROOT.modal.querySelector('#lookupInput');
    if (inp) inp.placeholder = lookupTab === 'spells' ? 'Search spells…' : (lookupTab === 'terms' ? 'Search game terms…' : 'Search creatures by name or tag…');
    if (lookupTab === 'spells') renderLookupSpells(lookupQuery);
    else if (lookupTab === 'terms') renderLookupTerms(lookupQuery);
    else renderLookupCreatures(lookupQuery);
  }
  // Spells & Terms are read-only reference, straight from data.js (the builder's
  // own curated, kid-safe wording — one source, no drift).
  function renderLookupSpells(query) {
    const box = ROOT.modal.querySelector('#lookupResults'); if (!box) return;
    const q = query.trim().toLowerCase();
    const all = (window.DATA && window.DATA.SPELLS) || [];
    const list = q ? all.filter(s => s.name.toLowerCase().includes(q) || (s.desc || '').toLowerCase().includes(q)) : all;
    if (!list.length) { box.innerHTML = `<p class="modal-hint">No spells match “${esc(query.trim())}”.</p>`; return; }
    box.innerHTML = list.slice(0, 120).map(s => `<div class="lookup-row lookup-read">
      <div class="lookup-main">
        <div class="lookup-name">${esc(s.name)} <span class="lookup-src src-spell">${s.lvl === 0 ? 'Cantrip' : 'Level ' + s.lvl}</span></div>
        <div class="lookup-desc">${esc(s.desc || '')}</div>
      </div></div>`).join('');
  }
  function renderLookupTerms(query) {
    const box = ROOT.modal.querySelector('#lookupResults'); if (!box) return;
    const q = query.trim().toLowerCase();
    const all = (window.DATA && window.DATA.GLOSSARY) || [];
    const list = q ? all.filter(t => t.term.toLowerCase().includes(q) || (t.def || '').toLowerCase().includes(q)) : all;
    if (!list.length) { box.innerHTML = `<p class="modal-hint">No terms match “${esc(query.trim())}”.</p>`; return; }
    box.innerHTML = list.map(t => `<div class="lookup-row lookup-read">
      <div class="lookup-main">
        <div class="lookup-name">${esc(t.term)}</div>
        <div class="lookup-desc">${esc(t.def || '')}</div>
      </div></div>`).join('');
  }
  function renderLookupCreatures(query) {
    const box = ROOT.modal.querySelector('#lookupResults');
    if (!box) return;
    const q = query.trim().toLowerCase();
    let list = STORE.getBestiary();
    if (q) list = list.filter(c => (c.name || '').toLowerCase().includes(q) || (c.tags || []).some(t => String(t).toLowerCase().includes(q)));
    if (!list.length) {
      box.innerHTML = `<p class="modal-hint">${q ? 'No creatures match “' + esc(query.trim()) + '”.' : 'Nothing here yet — save a creature to your library, or ask Cowork to add one.'}</p>`;
      return;
    }
    box.innerHTML = list.slice(0, 80).map(c => {
      const bits = [c.hp && ('HP ' + esc(c.hp)), c.ac && ('AC ' + esc(c.ac))].filter(Boolean).join(' · ');
      return `<div class="lookup-row">
        <div class="lookup-main">
          <div class="lookup-name">${esc(c.name)} <span class="lookup-src ${c.source === 'yours' ? 'src-yours' : 'src-srd'}">${c.source === 'yours' ? 'Yours' : 'SRD'}</span></div>
          <div class="lookup-meta">${bits}${(c.tags && c.tags.length) ? ' · ' + esc(c.tags.join(', ')) : ''}</div>
        </div>
        <div class="lookup-actions">
          <button class="btn btn-sm btn-ghost" data-act="lookup-story" data-id="${esc(c.id)}">＋ Story</button>
          <button class="btn btn-sm btn-gold" data-act="lookup-roster" data-id="${esc(c.id)}">＋ Roster</button>
          ${c.source === 'yours' ? `<button class="lookup-del" data-act="lookup-remove" data-id="${esc(c.id)}" title="Remove from your library" aria-label="Remove ${esc(c.name)} from your library">×</button>` : ''}
        </div>
      </div>`;
    }).join('');
  }
  const bestiaryById = (id) => STORE.getBestiary().find(c => c.id === id) || null;
  const creatureFields = (c) => ({ hp: c.hp || '', ac: c.ac || '', speed: c.speed || '', attack: c.attack || '', trick: c.trick || '' });
  const firstNum = (s) => { const m = /\d+/.exec(String(s || '')); return m ? parseInt(m[0], 10) : null; };

  ACT['lookup-story'] = (el) => {
    const c = bestiaryById(el.dataset.id); if (!c) return;
    const f = parseHash();
    const parent = (f.kind === 'f' && f.id) ? f.id : null;   // into the focused folder, else root
    const d = STORE.createDoc({ type: 'creature', title: c.name, parent: parent, body: c.notes || '', fields: creatureFields(c) });
    if (parent) { const open = ui().open; open[parent] = true; STORE.setUi({ open }); }
    closeModal();
    gotoDoc(d.id);
    announce('Added ' + c.name + ' to the story.');
  };
  ACT['lookup-roster'] = (el) => {
    const c = bestiaryById(el.dataset.id); if (!c) return;
    const stats = { hp: c.hp || '', ac: c.ac || '', speed: c.speed || '', attack: c.attack || '', trick: c.trick || '', notes: c.notes || '' };
    const hp = firstNum(c.hp);
    STORE.rosterAdd(Object.assign({ kind: 'creature', name: c.name, stats: stats }, hp != null ? { hp: hp, maxHp: hp } : {}));
    if (!ui().railB) { STORE.setUi({ railB: true }); applyRails(); }
    announce('Added ' + c.name + ' to initiative.');
  };
  ACT['lookup-remove'] = (el) => {
    STORE.removeFromBestiary(el.dataset.id);
    const inp = ROOT.modal.querySelector('#lookupInput'); if (inp) lookupQuery = inp.value;
    renderLookup();
  };
  // Save a creature page to the personal library (this browser only).
  ACT['save-bestiary'] = (el) => {
    const d = STORE.get(el.dataset.doc); if (!d) return;
    const f = d.fields || {};
    STORE.saveToBestiary({ name: d.title, hp: f.hp || '', ac: f.ac || '', speed: f.speed || '', attack: f.attack || '', trick: f.trick || f.special || '', notes: d.body || '', tags: d.tags || [] });
    announce('Saved ' + d.title + ' to your creature library.');
  };

  /* ----------------------------- Today's notes ---------------------------- */
  // A quick "what did I jot today" view: notebook notes and session logs that
  // were created today or whose content is dated today (Quick Note stamps the
  // date; session logs carry a date field).
  ACT['today-notes'] = () => openTodayModal();
  ACT['today-open'] = (el) => { closeModal(); gotoDoc(el.dataset.doc); };
  function openTodayModal() {
    const today = STORE.nowISO().slice(0, 10);
    const isToday = (d) =>
      String(d.updated || '').slice(0, 10) === today
      || (d.body || '').indexOf(today) >= 0
      || (d.type === 'session' && String((d.fields || {}).date || '').indexOf(today) >= 0);
    const notes = STORE.docs()
      .filter(d => ((STORE.isInNotebook(d.id) && d.type === 'note') || d.type === 'session') && isToday(d))
      .sort((a, b) => String(b.updated || '').localeCompare(String(a.updated || '')));
    const snip = (d) => esc((d.body || Object.values(d.fields || {}).filter(Boolean).join(' · ') || '').replace(/\s+/g, ' ').trim().slice(0, 100));
    openModal(`
      <div class="modal-title">Today — ${esc(today)}</div>
      ${notes.length
        ? `<div class="today-list">${notes.map(d => `
            <button class="today-row" data-act="today-open" data-doc="${d.id}">
              <span class="today-ico" aria-hidden="true">${icon((DOC_TYPES[d.type] || {}).icon || 'book')}</span>
              <span class="today-main">
                <span class="today-name">${esc(d.title)} <span class="today-kind">${esc((DOC_TYPES[d.type] || {}).label || '')}</span></span>
                <span class="today-snip">${snip(d)}</span>
              </span></button>`).join('')}</div>`
        : `<p class="modal-hint">Nothing dated today yet. Take a Quick note, or any note dated ${esc(today)} will show up here.</p>`}
    `, 'modal-wide');
  }

  /* ============================= Story flow map =========================== */
  /* The Story map is a full-viewport AUTHORING surface — its own screen (the
     #dmosMap root), NOT a floating dialog. Every non-folder story doc is a card;
     the links already living ON those docs are the arrows —
       • leadsTo entries  → solid, arrow-headed, labelled edges
                            (coloured by kind: then / alt / knows), and
       • [[wikilinks]]     → thin dashed "mentions" edges (skipped when a flow
                            edge already joins the same pair).
     The graph is DERIVED on every (re)paint, so it can never drift from the
     story. Editing here goes straight through the store — createDoc / patch /
     deleteDoc — so a card you add or a link you draw shows up immediately in the
     Story Folders sidebar too. The ONLY chart-private state is where a card has
     been dragged (STORE.getChart().pos); auto-layout supplies the rest.

     Why its OWN root and not ROOT.modal: the right-click menus and the connect
     picker use ROOT.modal (openMenu / openModal), so the board must live
     elsewhere or those popovers would erase it. The board's pointer handlers are
     self-owned on its canvas (rebuilt each paint); popovers overlay it at a
     higher z-index and can rebuild the board via paintMap() without disturbing
     the DM's scroll. */
  const CHART = { PAD: 48, COL_W: 248, ROW_H: 108, BAND_GAP: 52, NODE_W: 176, NODE_H: 66 };
  const CHART_DOC_TYPES = ['beat', 'scene', 'encounter', 'npc', 'creature', 'location'];
  const EDGE_KINDS = { then: 'then', alt: 'alt', knows: 'knows' };   // known leadsTo kinds → styled markers
  const markerKind = (k) => EDGE_KINDS[k] || 'other';
  let mapOpen = false;
  let chartScale = 1;
  let chartState = null;   // { canvas, svg, scroll, zoomWrap, contentW, contentH, bands, nodesById, edges, miniScale }
  let chartDrag = null;    // { id, el, startX, startY, baseLeft, baseTop, moved }
  let chartPan = null;     // { startX, startY, sl, st, id }
  let chartLink = null;    // { fromId } — dragging a NEW connection from a card's port
  let miniDrag = false;    // panning via the mini-map
  let chartRaf = 0;
  let connectSrc = null;   // doc id the connect picker is wiring FROM
  let connectKind = 'then';
  let edgeEdit = null;     // { from, to } — the connection the edge editor is editing
  let edgeEditKind = 'then';

  const RX_LINK_G = /\[\[([^\]|]+?)(?:\|[^\]]+?)?\]\]/g;
  function linkTargetsIn(d) {
    const text = [d.body].concat(Object.values(d.fields || {})).filter(Boolean).join('\n');
    const rx = new RegExp(RX_LINK_G.source, 'g');
    const out = new Set(); let m;
    while ((m = rx.exec(text))) out.add(m[1].trim());
    return out;
  }
  // Walk to the top-level ancestor (the Act) so cards can be grouped by it.
  function topAncestor(d, byId) {
    let cur = d, guard = 0;
    while (cur && cur.parent && byId.get(cur.parent) && guard++ < 200) cur = byId.get(cur.parent);
    return cur;
  }

  // Build {nodes, edges, brokenBy, columns, pos} entirely from the live docs.
  function buildStoryGraph() {
    const byId = STORE.tree().byId;
    const nodes = STORE.descendantsOf(null)
      .filter(d => d.type !== 'folder' && !STORE.isInNotebook(d.id));
    const nodeIds = new Set(nodes.map(d => d.id));

    const edges = [], brokenBy = {};
    const flowUnordered = new Set();
    nodes.forEach(d => (d.leadsTo || []).forEach(l => {
      const to = String((l && l.to) || '').trim();
      if (to && nodeIds.has(to)) {
        edges.push({ from: d.id, to, type: 'flow', kind: (l.kind || 'then'), label: String(l.label || '').trim() });
        flowUnordered.add([d.id, to].sort().join('|'));
      } else {
        const t = to && STORE.get(to);
        (brokenBy[d.id] = brokenBy[d.id] || []).push(l.label ? l.label : (t ? t.title : (to || '???')));
      }
    }));
    const refSeen = new Set();
    nodes.forEach(d => linkTargetsIn(d).forEach(to => {
      if (to === d.id || !nodeIds.has(to)) return;
      if (flowUnordered.has([d.id, to].sort().join('|'))) return;      // a stronger link already shows
      if (refSeen.has(d.id + '>' + to) || refSeen.has(to + '>' + d.id)) return;
      refSeen.add(d.id + '>' + to);
      edges.push({ from: d.id, to, type: 'ref', kind: 'ref', label: '' });
    }));

    // Layout: one horizontal band per Act (top-level folder), Acts stacked in
    // tree order with a synthetic "Unfiled" band last. WITHIN a band, cards flow
    // left→right by their leadsTo depth — a beat sits left of the encounter it
    // leads to — so flow edges run across, not through, the cards. Cards sharing
    // a depth stack vertically. This is only the STARTING arrangement; a stored
    // position (a card the DM dragged) always wins.
    const bandOrder = [], bandMap = new Map();
    const ensureBand = (key, title) => {
      if (!bandMap.has(key)) { bandMap.set(key, { key, title, members: [] }); bandOrder.push(bandMap.get(key)); }
      return bandMap.get(key);
    };
    STORE.tree().roots.forEach(r => { if (r.type === 'folder' && r.id !== STORE.NB_ROOT) ensureBand(r.id, r.title); });
    nodes.forEach(d => {
      const top = topAncestor(d, byId);
      const key = (top && top.type === 'folder') ? top.id : '__unfiled__';
      ensureBand(key, key === '__unfiled__' ? 'Unfiled' : ((byId.get(key) || {}).title || 'Act')).members.push(d);
    });

    const flowEdges = edges.filter(e => e.type === 'flow');
    const stored = STORE.getChart().pos || {};
    const bands = [], auto = {};
    let bandTop = CHART.PAD;
    bandOrder.forEach(band => {
      if (!band.members.length) return;
      const ids = new Set(band.members.map(n => n.id));
      const local = flowEdges.filter(e => ids.has(e.from) && ids.has(e.to));
      const origIndex = {}; band.members.forEach((n, i) => { origIndex[n.id] = i; });
      // Longest-path depth via bounded relaxation (safe if the story loops back).
      const depth = {}; band.members.forEach(n => { depth[n.id] = 0; });
      for (let it = 0; it < band.members.length; it++) {
        let changed = false;
        local.forEach(e => { if (depth[e.to] < depth[e.from] + 1) { depth[e.to] = depth[e.from] + 1; changed = true; } });
        if (!changed) break;
      }
      // Within each depth column, order cards by the average row of the cards
      // that flow INTO them (a barycentre pass) so an edge lands beside its
      // source instead of crossing the whole band. Cards with no inbound flow
      // fall to the bottom in document order.
      const preds = {}; local.forEach(e => { (preds[e.to] = preds[e.to] || []).push(e.from); });
      const byDepth = {}; band.members.forEach(n => { (byDepth[depth[n.id]] = byDepth[depth[n.id]] || []).push(n); });
      const rowOf = {};
      let maxRows = 1;
      Object.keys(byDepth).map(Number).sort((a, b) => a - b).forEach(c => {
        const bary = (n) => {
          const rs = (preds[n.id] || []).map(p => rowOf[p]).filter(r => r != null);
          return rs.length ? rs.reduce((s, r) => s + r, 0) / rs.length : 1e6 + origIndex[n.id];
        };
        const group = byDepth[c].slice();
        if (c > 0) group.sort((a, b) => (bary(a) - bary(b)) || (origIndex[a.id] - origIndex[b.id]));
        group.forEach((n, r) => { rowOf[n.id] = r; auto[n.id] = { x: CHART.PAD + c * CHART.COL_W, y: bandTop + r * CHART.ROW_H }; });
        maxRows = Math.max(maxRows, group.length);
      });
      bands.push({ key: band.key, title: band.title, top: bandTop });
      bandTop += maxRows * CHART.ROW_H + CHART.BAND_GAP;
    });

    const pos = {};
    nodes.forEach(d => {
      const s = stored[d.id];
      pos[d.id] = (s && typeof s.x === 'number') ? { x: s.x, y: s.y } : (auto[d.id] || { x: CHART.PAD, y: CHART.PAD });
    });

    return { nodes, edges, brokenBy, bands, pos, byId };
  }

  ACT['story-map'] = () => openStoryMap();
  ACT['close-map'] = () => closeStoryMap();
  ACT['chart-reset'] = () => {
    if (!confirm('Reset the map to its automatic layout?\n\nThe cards you have dragged will snap back. Nothing in your campaign changes.')) return;
    STORE.clearChart();
    paintMap(false);
  };

  function openStoryMap() {
    chartState = null; chartDrag = null; chartPan = null; chartScale = 1;
    mapOpen = true;
    ROOT.map.hidden = false;
    paintMap(false);
  }
  function closeStoryMap() {
    mapOpen = false;
    ROOT.map.hidden = true;
    ROOT.map.innerHTML = '';
    chartState = null; chartDrag = null; chartPan = null;
  }

  // Re-derive and re-render the whole board. `preserveScroll` keeps the DM's
  // place after an edit; a fresh open passes false. All authoring calls this.
  function paintMap(preserveScroll) {
    if (!mapOpen) return;
    const prev = preserveScroll ? (() => { const s = ROOT.map.querySelector('#chartScroll'); return s ? { x: s.scrollLeft, y: s.scrollTop } : null; })() : null;

    const g = buildStoryGraph();
    const flowCount = g.edges.filter(e => e.type === 'flow').length;
    const brokenCount = Object.values(g.brokenBy).reduce((n, a) => n + a.length, 0);

    let maxX = 720, maxY = 440;
    Object.values(g.pos).forEach(p => { maxX = Math.max(maxX, p.x + CHART.NODE_W + CHART.PAD); maxY = Math.max(maxY, p.y + CHART.NODE_H + CHART.PAD); });

    const nodeHTML = (d) => {
      const T = DOC_TYPES[d.type] || { icon: 'scroll', label: '' };
      const p = g.pos[d.id], broken = g.brokenBy[d.id];
      return `<div class="chart-node type-${d.type}" data-doc="${d.id}" style="left:${p.x}px;top:${p.y}px">
        <span class="cn-ico" aria-hidden="true">${icon(T.icon)}</span>
        <span class="cn-main"><span class="cn-title">${esc(d.title)}</span><span class="cn-type">${esc(T.label)}</span></span>
        ${broken ? `<span class="cn-warn" title="Dangling link: ${esc(broken.join(', '))}">⚠</span>` : ''}
        <span class="cn-port" data-port="1" title="Drag to connect this card to another" aria-hidden="true"></span>
      </div>`;
    };
    const pathsHTML = g.edges.map((e, i) =>
      `<path class="ce ce-${e.kind}" data-edge="${i}"${e.type === 'flow' ? ` marker-end="url(#arw-${markerKind(e.kind)})"` : ''}></path>`).join('');
    // Every FLOW edge gets a clickable midpoint control — its label pill, or a
    // small ✎ nub when it has no label — that opens the edge editor. Reference
    // (wikilink) edges aren't editable here (they mirror the body text).
    const controlsHTML = g.edges.map((e, i) => {
      if (e.type !== 'flow') return '';
      const base = `class="chart-elabel${e.label ? '' : ' is-empty'}" data-act="edge-edit" data-edge="${i}" data-from="${e.from}" data-to="${e.to}" title="Edit this connection"`;
      return e.label ? `<button ${base}>${esc(e.label)}</button>` : `<button ${base} aria-label="Edit connection">✎</button>`;
    }).join('');
    const bandsHTML = g.bands.map((b) =>
      `<div class="chart-band" style="top:${Math.max(4, b.top - 26)}px">${esc(b.title)}</div>`).join('');
    const marker = (k) => `<marker id="arw-${k}" markerWidth="11" markerHeight="11" refX="8" refY="4" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0,0 L8,4 L0,8 Z" class="arw arw-${k}"></path></marker>`;
    const legend = (cls, label) => `<span class="chart-leg"><span class="chart-leg-line ${cls}"></span>${label}</span>`;
    const emptyHint = g.nodes.length ? '' :
      `<div class="chart-empty"><strong>An empty board.</strong><br>Right-click anywhere to add your first card — or build story folders in the sidebar and they will appear here.</div>`;

    ROOT.map.innerHTML = `
      <div class="map-shell">
        <div class="map-bar">
          <span class="map-ico" aria-hidden="true">${icon('flow')}</span>
          <div class="map-heading">
            <div class="map-title">Story map</div>
            <div class="map-sub">${g.nodes.length} ${g.nodes.length === 1 ? 'card' : 'cards'} · ${flowCount} ${flowCount === 1 ? 'link' : 'links'}${brokenCount ? ` · <span class="chart-warn-txt">${brokenCount} dangling</span>` : ''}</div>
          </div>
          <div class="chart-legend">
            ${legend('ce-then', 'Leads to')}${legend('ce-alt', 'Alternative')}${legend('ce-knows', 'Knows')}${legend('ce-ref', 'Mentions')}
          </div>
          <div class="spacer"></div>
          <div class="map-zoom">
            <button class="map-zoom-btn" data-act="zoom-out" title="Zoom out" aria-label="Zoom out">−</button>
            <button class="map-zoom-btn map-zoom-pct" data-act="zoom-fit" title="Fit the whole map"><span class="zoom-pct">100%</span></button>
            <button class="map-zoom-btn" data-act="zoom-in" title="Zoom in" aria-label="Zoom in">+</button>
          </div>
          <button class="btn btn-sm btn-ghost" data-act="chart-reset" title="Snap every card back to the automatic layout">Reset layout</button>
          <button class="btn btn-sm btn-primary" data-act="close-map">Done</button>
        </div>
        <div class="map-scroll" id="chartScroll">
          <div class="map-zoomwrap" id="chartZoom">
            <div class="chart-canvas" id="chartCanvas" style="width:${maxX}px;height:${maxY}px">
              <svg class="chart-edges" id="chartEdges" width="${maxX}" height="${maxY}"><defs>${['then', 'alt', 'knows', 'other'].map(marker).join('')}</defs>${pathsHTML}<path class="ce ce-then ce-temp" id="chartTemp" marker-end="url(#arw-then)"></path></svg>
              ${bandsHTML}
              ${g.nodes.map(nodeHTML).join('')}
              ${controlsHTML}
              ${emptyHint}
            </div>
          </div>
          <div class="map-minimap" id="chartMini" hidden aria-hidden="true"><div class="mini-inner" id="chartMiniInner"></div></div>
        </div>
        <div class="map-hint">Drag a card's ○ handle onto another to connect · Click an arrow to edit it · Right-click for more · Drag the board to pan</div>
      </div>`;

    const canvas = ROOT.map.querySelector('#chartCanvas');
    const svg = ROOT.map.querySelector('#chartEdges');
    const scroll = ROOT.map.querySelector('#chartScroll');
    const zoomWrap = ROOT.map.querySelector('#chartZoom');
    if (!canvas || !svg) return;
    const nodesById = new Map();
    canvas.querySelectorAll('.chart-node').forEach(el => nodesById.set(el.dataset.doc, el));
    chartState = { canvas, svg, scroll, zoomWrap, contentW: maxX, contentH: maxY, bands: g.bands, nodesById, edges: g.edges, miniScale: 0 };
    wireChart(canvas, scroll);
    wireMinimap();
    applyZoom();
    chartLayoutEdges();
    renderMinimap();
    if (prev) { scroll.scrollLeft = prev.x; scroll.scrollTop = prev.y; }
    updateMinimapViewport();
  }

  /* ------------------------------- Zoom ----------------------------------- */
  // The canvas is scaled with a CSS transform; the wrapper takes the SCALED size
  // so the scrollbars stay honest. Drag/create maths divide client deltas by the
  // scale to convert back to unscaled canvas coordinates.
  function applyZoom() {
    if (!chartState) return;
    chartState.canvas.style.transformOrigin = '0 0';
    chartState.canvas.style.transform = 'scale(' + chartScale + ')';
    chartState.zoomWrap.style.width = (chartState.contentW * chartScale) + 'px';
    chartState.zoomWrap.style.height = (chartState.contentH * chartScale) + 'px';
    const pct = ROOT.map.querySelector('.zoom-pct');
    if (pct) pct.textContent = Math.round(chartScale * 100) + '%';
    updateMinimapViewport();
  }
  const setZoom = (s) => { chartScale = Math.max(0.4, Math.min(1.6, +s.toFixed(2))); applyZoom(); };
  ACT['zoom-in'] = () => setZoom(chartScale + 0.1);
  ACT['zoom-out'] = () => setZoom(chartScale - 0.1);
  ACT['zoom-fit'] = () => {
    if (!chartState) return;
    const s = chartState.scroll;
    const sc = Math.min((s.clientWidth - 24) / chartState.contentW, (s.clientHeight - 24) / chartState.contentH);
    setZoom(Math.max(0.4, Math.min(1, sc)));
    s.scrollLeft = 0; s.scrollTop = 0;
  };

  /* ------------------------- Board pointer wiring -------------------------- */
  // Self-owned on the freshly-built canvas (rebuilt every paint, so nothing to
  // tear down). Left-drag a card = move (persist) or, if it never moved, a click
  // = jump. Left-drag the empty board = pan. Right-click = a context menu.
  function wireChart(canvas, scroll) {
    canvas.onpointerdown = (e) => {
      if (e.button && e.button !== 0) return;              // right/middle → context menu
      // A card's ○ port starts a NEW connection drag (checked before the card).
      const port = e.target.closest('.cn-port');
      if (port) {
        const card = port.closest('.chart-node');
        chartLink = { fromId: card.dataset.doc };
        canvas.classList.add('linking');
        try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
        e.preventDefault();
        return;
      }
      // An edge control (label/nub) is a click that opens the editor — don't pan,
      // don't preventDefault, so the delegated click still fires.
      if (e.target.closest('.chart-elabel')) return;
      const el = e.target.closest('.chart-node');
      if (el && canvas.contains(el)) {
        chartDrag = { id: el.dataset.doc, el, startX: e.clientX, startY: e.clientY, baseLeft: el.offsetLeft, baseTop: el.offsetTop, moved: false };
        try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
        e.preventDefault();
      } else {
        chartPan = { startX: e.clientX, startY: e.clientY, sl: scroll.scrollLeft, st: scroll.scrollTop, id: e.pointerId };
        canvas.classList.add('panning');
        try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
        e.preventDefault();
      }
    };
    canvas.onpointermove = (e) => {
      if (chartLink) {
        const from = chartState.nodesById.get(chartLink.fromId);
        if (from) drawTempEdge({ x: from.offsetLeft, y: from.offsetTop, w: from.offsetWidth, h: from.offsetHeight }, canvasPoint(e));
        const over = document.elementFromPoint(e.clientX, e.clientY);
        const card = over && over.closest ? over.closest('.chart-node') : null;
        highlightLinkTarget(card && card.dataset.doc !== chartLink.fromId ? card : null);
      } else if (chartDrag) {
        const rawX = e.clientX - chartDrag.startX, rawY = e.clientY - chartDrag.startY;
        if (!chartDrag.moved && Math.abs(rawX) + Math.abs(rawY) < 4) return;
        if (!chartDrag.moved) { chartDrag.moved = true; chartDrag.el.classList.add('dragging'); }
        chartDrag.el.style.left = Math.max(0, chartDrag.baseLeft + rawX / chartScale) + 'px';
        chartDrag.el.style.top = Math.max(0, chartDrag.baseTop + rawY / chartScale) + 'px';
        chartScheduleEdges();
      } else if (chartPan) {
        scroll.scrollLeft = chartPan.sl - (e.clientX - chartPan.startX);
        scroll.scrollTop = chartPan.st - (e.clientY - chartPan.startY);
      }
    };
    const finish = (e) => {
      if (chartLink) {
        const link = chartLink; chartLink = null;
        canvas.classList.remove('linking');
        try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
        const temp = chartState.svg.querySelector('#chartTemp'); if (temp) temp.removeAttribute('d');
        highlightLinkTarget(null);
        const over = document.elementFromPoint(e.clientX, e.clientY);
        const target = over && over.closest ? over.closest('.chart-node') : null;
        if (target && target.dataset.doc !== link.fromId) connectCards(link.fromId, target.dataset.doc);
      } else if (chartDrag) {
        const d = chartDrag; chartDrag = null;
        d.el.classList.remove('dragging');
        try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
        if (d.moved) { STORE.setChartPos(d.id, d.el.offsetLeft, d.el.offsetTop); chartGrowCanvas(); }
        else { closeStoryMap(); gotoDoc(d.id); }
      } else if (chartPan) {
        const p = chartPan; chartPan = null;
        canvas.classList.remove('panning');
        try { canvas.releasePointerCapture(p.id); } catch (_) {}
      }
    };
    canvas.onpointerup = finish;
    canvas.onpointercancel = () => {
      if (chartLink) { chartLink = null; canvas.classList.remove('linking'); const t = chartState.svg.querySelector('#chartTemp'); if (t) t.removeAttribute('d'); highlightLinkTarget(null); }
      if (chartDrag) { chartDrag.el.classList.remove('dragging'); chartDrag = null; }
      if (chartPan) { canvas.classList.remove('panning'); chartPan = null; }
    };
    canvas.oncontextmenu = (e) => {
      e.preventDefault();
      const el = e.target.closest('.chart-node');
      if (el) openCardMenu(el, e); else openCanvasMenu(e);
    };
    // Ctrl/⌘-wheel zooms (plain wheel keeps scrolling). Not passive, so we can
    // preventDefault the browser's own page zoom.
    scroll.onwheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      setZoom(chartScale + (e.deltaY < 0 ? 0.1 : -0.1));
    };
    scroll.onscroll = () => updateMinimapViewport();
  }

  // Draw the in-progress connection line from a card's border toward the cursor.
  function drawTempEdge(a, pt) {
    const temp = chartState && chartState.svg.querySelector('#chartTemp');
    if (!temp) return;
    const p1 = borderPoint(a, pt);
    const dx = pt.x - p1.x, s = Math.sign(dx) || 1, k = Math.max(26, Math.abs(dx) * 0.45);
    temp.setAttribute('d', `M${p1.x},${p1.y} C${p1.x + s * k},${p1.y} ${pt.x - s * k},${pt.y} ${pt.x},${pt.y}`);
  }
  function highlightLinkTarget(cardEl) {
    if (!chartState) return;
    chartState.canvas.querySelectorAll('.chart-node.link-target').forEach(n => n.classList.remove('link-target'));
    if (cardEl) cardEl.classList.add('link-target');
  }
  // Write a new leadsTo (kind 'then', no label) unless the pair is already linked.
  function connectCards(fromId, toId) {
    const src = STORE.get(fromId); if (!src) return;
    if ((src.leadsTo || []).some(l => l.to === toId)) { announce('Those cards are already connected.'); return; }
    STORE.patch(src.id, { leadsTo: (src.leadsTo || []).concat([{ to: toId, label: '', kind: 'then' }]) });
    paintMap(true);
    announce('Connected “' + src.title + '”. Click the arrow to label it.');
  }

  // Esc mid-gesture cancels it (rather than closing the whole map).
  function cancelChartGesture() {
    if (chartLink) { chartLink = null; if (chartState) { chartState.canvas.classList.remove('linking'); const t = chartState.svg.querySelector('#chartTemp'); if (t) t.removeAttribute('d'); } highlightLinkTarget(null); }
    if (chartDrag) { chartDrag.el.classList.remove('dragging'); chartDrag = null; paintMap(true); }
    if (chartPan) { if (chartState) chartState.canvas.classList.remove('panning'); chartPan = null; }
  }
  const chartBusy = () => !!(chartLink || chartDrag || chartPan);

  /* ------------------------------- Mini-map ------------------------------- */
  // A corner overview for big campaigns: every card as a tiny rect, plus a frame
  // showing the current viewport. Shown only when there is off-screen content;
  // click or drag it to pan. Rects are rebuilt on paint/move; the frame tracks
  // scroll and zoom.
  const MINI_MAX = { w: 200, h: 148 };
  function renderMinimap() {
    if (!chartState) return;
    const inner = ROOT.map.querySelector('#chartMiniInner');
    if (!inner) return;
    const sm = Math.min(MINI_MAX.w / chartState.contentW, MINI_MAX.h / chartState.contentH);
    chartState.miniScale = sm;
    inner.style.width = (chartState.contentW * sm) + 'px';
    inner.style.height = (chartState.contentH * sm) + 'px';
    let html = '';
    chartState.nodesById.forEach((el, id) => {
      const d = STORE.get(id);
      html += `<div class="mini-node type-${d ? d.type : 'note'}" style="left:${el.offsetLeft * sm}px;top:${el.offsetTop * sm}px;width:${Math.max(3, el.offsetWidth * sm)}px;height:${Math.max(2, el.offsetHeight * sm)}px"></div>`;
    });
    html += `<div class="mini-view" id="chartMiniView"></div>`;
    inner.innerHTML = html;
    updateMinimapViewport();
  }
  function updateMinimapViewport() {
    if (!chartState) return;
    const mini = ROOT.map.querySelector('#chartMini');
    const view = ROOT.map.querySelector('#chartMiniView');
    const s = chartState.scroll;
    if (!mini || !s) return;
    const needs = chartState.contentW * chartScale > s.clientWidth + 4 || chartState.contentH * chartScale > s.clientHeight + 4;
    mini.hidden = !needs;
    if (!view || !needs) return;
    const sm = chartState.miniScale || 0;
    view.style.left = (s.scrollLeft / chartScale * sm) + 'px';
    view.style.top = (s.scrollTop / chartScale * sm) + 'px';
    view.style.width = (s.clientWidth / chartScale * sm) + 'px';
    view.style.height = (s.clientHeight / chartScale * sm) + 'px';
  }
  function wireMinimap() {
    const mini = ROOT.map.querySelector('#chartMini');
    if (!mini) return;
    const jump = (e) => {
      const inner = ROOT.map.querySelector('#chartMiniInner');
      const r = inner.getBoundingClientRect();
      const sm = chartState.miniScale || 1, s = chartState.scroll;
      const cx = (e.clientX - r.left) / sm, cy = (e.clientY - r.top) / sm;   // unscaled content coords
      s.scrollLeft = cx * chartScale - s.clientWidth / 2;
      s.scrollTop = cy * chartScale - s.clientHeight / 2;
    };
    mini.onpointerdown = (e) => { miniDrag = true; try { mini.setPointerCapture(e.pointerId); } catch (_) {} jump(e); e.preventDefault(); };
    mini.onpointermove = (e) => { if (miniDrag) jump(e); };
    mini.onpointerup = (e) => { miniDrag = false; try { mini.releasePointerCapture(e.pointerId); } catch (_) {} };
    mini.onpointercancel = () => { miniDrag = false; };
  }

  /* ---------------------------- Edge editor ------------------------------- */
  // Click an arrow's label (or its ✎ nub) → change the connection's kind/label,
  // or remove it. Edits the matching leadsTo entry on the SOURCE card.
  ACT['edge-edit'] = (el) => openEdgeEditor(el.dataset.from, el.dataset.to);
  ACT['edge-kind'] = (el) => {
    edgeEditKind = el.dataset.kind;
    ROOT.modal.querySelectorAll('.connect-kind').forEach(b => b.classList.toggle('is-active', b.dataset.kind === edgeEditKind));
  };
  ACT['edge-save'] = () => {
    if (!edgeEdit) return;
    const src = STORE.get(edgeEdit.from); if (!src) { closeModal(); return; }
    const label = (ROOT.modal.querySelector('#edgeLabel') || {}).value || '';
    let done = false;
    const next = (src.leadsTo || []).map(l => {
      if (!done && l.to === edgeEdit.to) { done = true; return Object.assign({}, l, { kind: edgeEditKind, label: label.trim() }); }
      return l;
    });
    STORE.patch(src.id, { leadsTo: next });
    closeModal(); paintMap(true); announce('Updated the connection.');
  };
  ACT['edge-remove'] = () => {
    if (!edgeEdit) return;
    const src = STORE.get(edgeEdit.from);
    if (src) STORE.patch(src.id, { leadsTo: (src.leadsTo || []).filter(l => l.to !== edgeEdit.to) });
    closeModal(); paintMap(true); announce('Removed the connection.');
  };
  function openEdgeEditor(from, to) {
    const src = STORE.get(from), tgt = STORE.get(to);
    if (!src || !tgt) return;
    const link = (src.leadsTo || []).find(l => l.to === to) || { kind: 'then', label: '' };
    edgeEdit = { from, to }; edgeEditKind = link.kind || 'then';
    const kindBtn = (k, label) => `<button class="connect-kind${k === edgeEditKind ? ' is-active' : ''}" data-act="edge-kind" data-kind="${k}"><span class="chart-leg-line ce-${k}"></span>${label}</button>`;
    openModal(`
      <div class="modal-title">Connection</div>
      <p class="modal-hint">${esc(src.title)} → ${esc(tgt.title)}</p>
      <div class="connect-kinds">${kindBtn('then', 'Leads to')}${kindBtn('alt', 'Alternative')}${kindBtn('knows', 'Knows')}</div>
      <input type="text" id="edgeLabel" class="connect-label" placeholder="Label (optional) — e.g. “if they ring it”" maxlength="60" value="${esc(link.label || '')}" autocomplete="off">
      <div class="modal-actions" style="flex-wrap:wrap; gap:8px;">
        <button class="btn btn-sm btn-ghost" data-act="edge-remove">Remove link</button>
        <div class="spacer"></div>
        <button class="btn btn-sm btn-ghost" data-act="close-modal">Cancel</button>
        <button class="btn btn-sm btn-primary" data-act="edge-save">Save</button>
      </div>`, 'modal-wide');
    const inp = ROOT.modal.querySelector('#edgeLabel');
    if (inp) { inp.focus(); inp.selectionStart = inp.selectionEnd = inp.value.length; }
  }

  /* --------------------------- Board authoring ---------------------------- */
  // A point in the viewport → unscaled canvas coordinates.
  function canvasPoint(e) {
    const r = chartState.canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) / chartScale, y: (e.clientY - r.top) / chartScale };
  }
  // Which Act band a y-coordinate falls in → its folder id (or '' for none), so
  // a card added there is filed under that Act.
  function bandFolderAt(y) {
    const bands = chartState ? chartState.bands : [];
    for (let i = 0; i < bands.length; i++) {
      const top = bands[i].top - CHART.BAND_GAP / 2;
      const bottom = (i + 1 < bands.length) ? bands[i + 1].top - CHART.BAND_GAP / 2 : Infinity;
      if (y >= top && y < bottom) return bands[i].key === '__unfiled__' ? '' : bands[i].key;
    }
    return '';
  }

  function openCanvasMenu(e) {
    const pt = canvasPoint(e);
    const x = Math.max(0, Math.round(pt.x - CHART.NODE_W / 2)), y = Math.max(0, Math.round(pt.y - CHART.NODE_H / 2));
    const parent = bandFolderAt(pt.y);
    const items = `<div class="menu-note">Add a card here</div>` + CHART_DOC_TYPES.map(t =>
      menuItem('map-new', { type: t, parent, x, y }, DOC_TYPES[t].icon, DOC_TYPES[t].label)).join('');
    openMenuAtPoint(e.clientX, e.clientY, items);
  }
  ACT['map-new'] = (el) => {
    const type = el.dataset.type, parent = el.dataset.parent || null;
    closeModal();
    const d = STORE.createDoc({ type, parent });
    STORE.setChartPos(d.id, +el.dataset.x, +el.dataset.y);
    if (parent) { const open = ui().open; open[parent] = true; STORE.setUi({ open }); }
    paintMap(true);
    announce('Added a ' + (DOC_TYPES[type] ? DOC_TYPES[type].label.toLowerCase() : 'card') + '. It is in the Story Folders too.');
  };

  function openCardMenu(cardEl, e) {
    const id = cardEl.dataset.doc, d = STORE.get(id);
    if (!d) return;
    const links = (d.leadsTo || []).filter(l => l && l.to && STORE.get(l.to));
    let items = `<div class="menu-note">${esc(d.title)}</div>`;
    items += menuItem('connect-open', { doc: id }, 'flow', 'Connect to a card…');
    items += menuItem('map-follow-menu', { doc: id }, 'scroll', 'New card it leads to…');
    items += '<div class="menu-sep"></div>';
    items += menuItem('map-open', { doc: id }, 'book', 'Open in the story');
    items += menuItem('map-rename', { doc: id }, 'check', 'Rename…');
    if (links.length) {
      items += '<div class="menu-sep"></div>';
      items += links.map(l => menuItem('map-unlink', { doc: id, to: l.to }, 'sword',
        'Unlink: ' + ((STORE.get(l.to) || {}).title || l.to))).join('');
    }
    items += '<div class="menu-sep"></div>';
    items += menuItem('map-delete', { doc: id }, 'flame', 'Delete card');
    openMenuAtPoint(e.clientX, e.clientY, items);
  }
  ACT['map-open'] = (el) => { closeStoryMap(); gotoDoc(el.dataset.doc); };
  ACT['map-rename'] = (el) => {
    const d = STORE.get(el.dataset.doc); if (!d) return;
    closeModal();
    openTextPromptModal({
      title: 'Rename card', placeholder: 'Title', submitLabel: 'Rename',
      onSubmit: (name) => { STORE.patch(d.id, { title: name }); paintMap(true); announce('Renamed.'); },
    });
  };
  ACT['map-delete'] = (el) => {
    const d = STORE.get(el.dataset.doc); if (!d) return;
    closeModal();
    if (!confirm('Move “' + d.title + '” to the trash?\n\nIt is never really deleted — restore it from the Story Folders sidebar.')) return;
    STORE.deleteDoc(d.id);
    paintMap(true);
    announce('Moved to trash.');
  };
  ACT['map-unlink'] = (el) => {
    const src = STORE.get(el.dataset.doc); if (!src) return;
    const to = el.dataset.to;
    STORE.patch(src.id, { leadsTo: (src.leadsTo || []).filter(l => l.to !== to) });
    closeModal();
    paintMap(true);
    announce('Removed a connection.');
  };
  // "New card it leads to…" → pick a type, create it beside the source, link it.
  ACT['map-follow-menu'] = (el) => {
    const src = el.dataset.doc;
    const items = `<div class="menu-note">New card it leads to</div>` + CHART_DOC_TYPES.map(t =>
      menuItem('map-follow-new', { src, type: t }, DOC_TYPES[t].icon, DOC_TYPES[t].label)).join('');
    openMenu(el, items);
  };
  ACT['map-follow-new'] = (el) => {
    const srcId = el.dataset.src, type = el.dataset.type;
    const src = STORE.get(srcId); if (!src) return;
    closeModal();
    const byId = STORE.tree().byId, top = topAncestor(src, byId);
    const parent = (top && top.type === 'folder') ? top.id : (src.parent || null);
    const d = STORE.createDoc({ type, parent });
    // Place it to the right of the source so the new flow edge reads left→right.
    const srcEl = chartState && chartState.nodesById.get(srcId);
    if (srcEl) STORE.setChartPos(d.id, srcEl.offsetLeft + CHART.COL_W, srcEl.offsetTop);
    STORE.patch(srcId, { leadsTo: (src.leadsTo || []).concat([{ to: d.id, label: '', kind: 'then' }]) });
    if (parent) { const open = ui().open; open[parent] = true; STORE.setUi({ open }); }
    paintMap(true);
    announce('Added a linked ' + DOC_TYPES[type].label.toLowerCase() + '.');
  };

  /* ----------------------------- Connect picker --------------------------- */
  // Right-click a card → "Connect to…" → this searchable list of the other cards.
  // Choose a link kind (colours the arrow) and an optional label, then pick a
  // target; a leadsTo entry is written onto the SOURCE doc.
  ACT['connect-open'] = (el) => { closeModal(); openConnectPicker(el.dataset.doc); };
  ACT['connect-kind'] = (el) => {
    connectKind = el.dataset.kind;
    ROOT.modal.querySelectorAll('.connect-kind').forEach(b => b.classList.toggle('is-active', b.dataset.kind === connectKind));
  };
  ACT['connect-search:input'] = (el) => renderConnectList(el.value);
  ACT['connect-pick'] = (el) => {
    const src = STORE.get(connectSrc); if (!src) return;
    const labelEl = ROOT.modal.querySelector('#connectLabel');
    const label = labelEl ? labelEl.value.trim() : '';
    const next = (src.leadsTo || []).concat([{ to: el.dataset.to, label, kind: connectKind }]);
    STORE.patch(src.id, { leadsTo: next });
    closeModal();
    paintMap(true);
    announce('Connected “' + src.title + '”.');
  };
  function openConnectPicker(srcId) {
    const src = STORE.get(srcId); if (!src) return;
    connectSrc = srcId; connectKind = 'then';
    const kindBtn = (k, label) => `<button class="connect-kind${k === 'then' ? ' is-active' : ''}" data-act="connect-kind" data-kind="${k}"><span class="chart-leg-line ce-${k}"></span>${label}</button>`;
    openModal(`
      <div class="modal-title">Connect “${esc(src.title)}” to…</div>
      <p class="modal-hint">Draw an arrow from this card to another. Pick the kind, add an optional label, then choose the destination.</p>
      <div class="connect-kinds">${kindBtn('then', 'Leads to')}${kindBtn('alt', 'Alternative')}${kindBtn('knows', 'Knows')}</div>
      <input type="text" id="connectLabel" class="connect-label" placeholder="Label (optional) — e.g. “if they ring it”" maxlength="60" autocomplete="off">
      <div class="search-box"><input type="text" id="connectSearch" data-act="connect-search" placeholder="Search cards to connect to…" autocomplete="off" spellcheck="false"></div>
      <div class="connect-list" id="connectList"></div>`, 'modal-wide modal-search');
    renderConnectList('');
    const inp = ROOT.modal.querySelector('#connectSearch'); if (inp) inp.focus();
  }
  function renderConnectList(query) {
    const box = ROOT.modal.querySelector('#connectList'); if (!box) return;
    const src = STORE.get(connectSrc); if (!src) return;
    const existing = new Set((src.leadsTo || []).map(l => l.to));
    const q = query.trim().toLowerCase();
    let list = STORE.docs().filter(d => d.type !== 'folder' && !STORE.isInNotebook(d.id) && d.id !== connectSrc && !existing.has(d.id));
    if (q) list = list.filter(d => d.title.toLowerCase().includes(q) || DOC_TYPES[d.type].label.toLowerCase().includes(q));
    if (!list.length) { box.innerHTML = `<p class="modal-hint">${q ? 'No cards match “' + esc(query.trim()) + '”.' : 'No other cards to connect to yet.'}</p>`; return; }
    box.innerHTML = list.slice(0, 60).map(d => {
      const path = pathLabel(d.id);
      return `<button class="search-row connect-row" data-act="connect-pick" data-to="${d.id}">
        <span class="search-icon">${icon(DOC_TYPES[d.type].icon)}</span>
        <span class="search-main"><span class="search-title">${esc(d.title)} <span class="search-area">${esc(DOC_TYPES[d.type].label)}${path ? ' · ' + esc(path) : ''}</span></span></span>
      </button>`;
    }).join('');
  }

  // A popup menu anchored at an arbitrary point (right-click), reusing the modal
  // root + its click-outside close, mirroring openMenu()'s clamping.
  function openMenuAtPoint(x, y, itemsHTML) {
    ROOT.modal.innerHTML = `<div class="menu-overlay" data-act="modal-backdrop"><div class="menu" role="menu">${itemsHTML}</div></div>`;
    const box = ROOT.modal.querySelector('.menu');
    box.style.left = x + 'px';
    box.style.top = (y + 2) + 'px';
    const b = box.getBoundingClientRect();
    if (b.right > window.innerWidth - 8) box.style.left = Math.max(8, window.innerWidth - 8 - b.width) + 'px';
    if (b.bottom > window.innerHeight - 8) box.style.top = Math.max(8, y - b.height - 2) + 'px';
  }

  // Bezier between two card boxes, exiting/entering each box's border along the
  // line joining their centres. Returns the path string and the curve midpoint
  // (for placing the edge label).
  function borderPoint(box, target) {
    const cx = box.x + box.w / 2, cy = box.y + box.h / 2;
    const dx = target.x - cx, dy = target.y - cy;
    if (!dx && !dy) return { x: cx, y: cy };
    const s = 1 / Math.max(Math.abs(dx) / (box.w / 2), Math.abs(dy) / (box.h / 2));
    return { x: cx + dx * s, y: cy + dy * s };
  }
  function edgeGeom(a, b) {
    const ac = { x: a.x + a.w / 2, y: a.y + a.h / 2 }, bc = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
    const p1 = borderPoint(a, bc), p2 = borderPoint(b, ac);
    const dx = p2.x - p1.x, dy = p2.y - p1.y;
    const horiz = Math.abs(dx) >= Math.abs(dy);
    const k = Math.max(26, (horiz ? Math.abs(dx) : Math.abs(dy)) * 0.45);
    const sx = Math.sign(dx) || 1, sy = Math.sign(dy) || 1;
    const c1 = horiz ? { x: p1.x + sx * k, y: p1.y } : { x: p1.x, y: p1.y + sy * k };
    const c2 = horiz ? { x: p2.x - sx * k, y: p2.y } : { x: p2.x, y: p2.y - sy * k };
    const t = 0.5, mt = 0.5;
    const mid = {
      x: mt * mt * mt * p1.x + 3 * mt * mt * t * c1.x + 3 * mt * t * t * c2.x + t * t * t * p2.x,
      y: mt * mt * mt * p1.y + 3 * mt * mt * t * c1.y + 3 * mt * t * t * c2.y + t * t * t * p2.y,
    };
    return { d: `M${p1.x},${p1.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`, mid };
  }
  function chartLayoutEdges() {
    if (!chartState) return;
    const box = {};
    chartState.nodesById.forEach((el, id) => { box[id] = { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight }; });
    chartState.edges.forEach((e, i) => {
      const pathEl = chartState.svg.querySelector(`path[data-edge="${i}"]`);
      const lab = chartState.canvas.querySelector(`.chart-elabel[data-edge="${i}"]`);
      const a = box[e.from], b = box[e.to];
      if (!a || !b || !pathEl) { if (pathEl) pathEl.removeAttribute('d'); return; }
      const geo = edgeGeom(a, b);
      pathEl.setAttribute('d', geo.d);
      if (lab) { lab.style.left = geo.mid.x + 'px'; lab.style.top = geo.mid.y + 'px'; }
    });
  }
  const chartScheduleEdges = () => { if (!chartRaf) chartRaf = requestAnimationFrame(() => { chartRaf = 0; chartLayoutEdges(); }); };

  // Grow the canvas so a card dragged past the edge stays reachable via scroll.
  // Keeps the scaled wrapper and the SVG in step with the new content size.
  function chartGrowCanvas() {
    if (!chartState) return;
    let maxX = 720, maxY = 440;
    chartState.nodesById.forEach(el => {
      maxX = Math.max(maxX, el.offsetLeft + el.offsetWidth + CHART.PAD);
      maxY = Math.max(maxY, el.offsetTop + el.offsetHeight + CHART.PAD);
    });
    chartState.canvas.style.width = maxX + 'px';
    chartState.canvas.style.height = maxY + 'px';
    chartState.svg.setAttribute('width', maxX);
    chartState.svg.setAttribute('height', maxY);
    chartState.contentW = maxX; chartState.contentH = maxY;
    applyZoom();
    chartLayoutEdges();
    renderMinimap();
  }

  /* ============================== The banner =============================== */
  PAINT.banner = function () {
    const parts = [];
    if (STORE.isQuotaFull()) parts.push(`<div class="note note-warn">
      <strong>Your workspace is full.</strong> Nothing was lost and nothing was deleted — but new
      changes are no longer being saved. Export a copy, then remove some documents.
      <button class="btn btn-sm btn-gold" data-act="export">Export now</button></div>`);
    if (crossTab) parts.push(`<div class="note">
      <strong>This workspace changed in another tab.</strong> Reload to see it.
      <button class="btn btn-sm" data-act="reload">Reload</button></div>`);
    ROOT.banner.innerHTML = parts.join('');
  };

  /* ===================== The Quick Note floating window ==================== */
  // A non-modal pad that never navigates you away. Its text lives in localStorage,
  // so nothing here is lost until you Clear it. Filing moves text into the Notebook
  // (which is just documents — see dmos-store). The float is a full-rebuild pane;
  // isLive(ROOT.float) defers repaints while you're typing, so the pad is stable.
  function targetOptionsHTML() {
    const targets = STORE.notebookTargets();
    let html = `<option value="new-section">＋ New section…</option>`;
    targets.forEach(sec => {
      html += `<optgroup label="${esc(sec.sectionTitle)}">`;
      html += `<option value="new:${sec.sectionId}">＋ New note here</option>`;
      sec.notes.forEach(n => { html += `<option value="note:${n.id}">→ ${esc(n.title)}</option>`; });
      html += `</optgroup>`;
    });
    return html;
  }

  PAINT.float = function () {
    const host = ROOT.float;
    if (!ui().quickNoteOpen) { host.innerHTML = ''; return; }
    const q = STORE.getQuickNote();
    const pos = ui().quickNotePos;
    const posStyle = pos ? `left:${pos.x}px; top:${pos.y}px; right:auto; bottom:auto;` : '';
    host.innerHTML = `
      <div class="quicknote" style="${posStyle}" role="dialog" aria-label="Quick note">
        <div class="qn-head" data-act="qn-drag">
          <span class="qn-title">${icon('flame')} Quick Note</span>
          <input type="date" class="qn-date" value="${esc(q.date)}" data-act="qn-date" title="Date stamped on filed notes">
          <button class="qn-close" data-act="close-quicknote" title="Close — your notes stay" aria-label="Close">×</button>
        </div>
        <textarea class="qn-pad" data-act="qn-input" spellcheck="true"
                  placeholder="Jot fast. Nothing here is lost until you press Clear.">${esc(q.text)}</textarea>
        <div class="qn-file">
          <select class="qn-target" data-act="qn-target" aria-label="Where to file">${targetOptionsHTML()}</select>
          <button class="btn btn-sm" data-act="file-selection" disabled title="Select text in the pad first">File selection</button>
          <button class="btn btn-sm btn-primary" data-act="file-all">File all →</button>
        </div>
        <div class="qn-newsection" hidden>
          <input type="text" class="qn-newsection-input" data-act="qn-newsection"
                 placeholder="Name the new section, then File…" maxlength="80">
        </div>
        <div class="qn-foot">
          <button class="btn btn-sm btn-ghost" data-act="clear-note">Clear</button>
          <span class="qn-hint">Filing copies notes into the Notebook. Clear erases the pad.</span>
        </div>
      </div>`;
    // Restore the chosen destination, else default to the first section's new note.
    const sel = host.querySelector('.qn-target');
    const want = ui().quickNoteTarget;
    const targets = STORE.notebookTargets();
    if (want && [...sel.options].some(o => o.value === want)) sel.value = want;
    else if (targets.length) sel.value = 'new:' + targets[0].sectionId;
    syncNewSectionField();

    updateSelButton();
    if (focusPadOnPaint) {
      focusPadOnPaint = false;
      const pad = host.querySelector('.qn-pad');
      pad.focus(); pad.selectionStart = pad.selectionEnd = pad.value.length;
    }
  };

  function updateSelButton() {
    const host = ROOT.float;
    const pad = host && host.querySelector('.qn-pad');
    const btn = host && host.querySelector('[data-act="file-selection"]');
    if (!pad || !btn) return;
    btn.disabled = pad.selectionStart === pad.selectionEnd;
  }

  // Rebuild just the destination <select> in place (filing changes the notebook
  // but must not disturb the pad the DM is typing in).
  function refreshQuickNoteTargets() {
    const sel = ROOT.float.querySelector('.qn-target');
    if (!sel) return;
    const cur = sel.value;
    sel.innerHTML = targetOptionsHTML();
    if ([...sel.options].some(o => o.value === cur)) sel.value = cur;
    else if (STORE.notebookTargets().length) sel.value = 'new:' + STORE.notebookTargets()[0].sectionId;
    STORE.setUi({ quickNoteTarget: sel.value });
  }

  // Show/hide the inline "new section" name field based on the dropdown value.
  function syncNewSectionField() {
    const sel = ROOT.float && ROOT.float.querySelector('.qn-target');
    const wrap = ROOT.float && ROOT.float.querySelector('.qn-newsection');
    if (!sel || !wrap) return;
    wrap.hidden = sel.value !== 'new-section';
  }

  // Resolve the dropdown into a filing destination. Returns null (without filing)
  // if "New section" is chosen but not yet named — it reveals and focuses the
  // inline field instead of a native prompt.
  function resolveTarget() {
    const sel = ROOT.float.querySelector('.qn-target');
    const v = sel.value;
    if (v === 'new-section') {
      const input = ROOT.float.querySelector('.qn-newsection-input');
      const name = input ? input.value.trim() : '';
      if (!name) {
        const wrap = ROOT.float.querySelector('.qn-newsection');
        if (wrap) wrap.hidden = false;
        if (input) input.focus();
        announce('Type a name for the new section, then file.');
        return null;
      }
      const sec = STORE.createSection(name);
      if (input) input.value = '';
      return { sectionId: sec.id, noteId: null, label: sec.title, createdSection: true };
    }
    if (v.indexOf('new:') === 0) {
      const sid = v.slice(4); const s = STORE.get(sid);
      return { sectionId: sid, noteId: null, label: s ? s.title : 'section' };
    }
    if (v.indexOf('note:') === 0) {
      const nid = v.slice(5); const n = STORE.get(nid);
      return { sectionId: n ? n.parent : null, noteId: nid, label: n ? n.title : 'note' };
    }
    return null;
  }

  // After a successful file: refresh the dropdown, point it at where the note
  // went, hide the new-section field, and repaint the tree.
  function afterFile(dest) {
    const sel = ROOT.float && ROOT.float.querySelector('.qn-target');
    if (sel) {
      sel.innerHTML = targetOptionsHTML();
      const want = dest.noteId ? 'note:' + dest.noteId : 'new:' + dest.sectionId;
      if ([...sel.options].some(o => o.value === want)) sel.value = want;
      STORE.setUi({ quickNoteTarget: sel.value });
    }
    syncNewSectionField();
    mark('tree');
  }

  /* ============================ Debounced writes =========================== */
  // Coalesce keystrokes. The doc's rev doesn't move until this flushes, so the
  // node the DM is typing into is never replaced mid-word.
  function patchDebounced(id, partial) {
    pending.set(id, STORE.merge(pending.get(id) || {}, partial));
    if (!pendTimer) pendTimer = setTimeout(flushPending, 400);
  }
  function flushPending() {
    if (pendTimer) { clearTimeout(pendTimer); pendTimer = 0; }
    if (!pending.size) return;
    const entries = Array.from(pending);
    pending.clear();
    entries.forEach(([id, p]) => STORE.patch(id, p));
  }

  /* ================================ Actions ================================ */
  ACT['select-node'] = (el) => {
    const d = STORE.get(el.dataset.doc);
    if (!d) return;
    const hasKids = (STORE.tree().kids.get(d.id) || []).length > 0;
    (d.type === 'folder' || hasKids) ? gotoFolder(d.id) : gotoDoc(d.id);
  };

  ACT['toggle-folder'] = (el, e) => {
    e.stopPropagation();
    const open = ui().open;
    open[el.dataset.doc] = !open[el.dataset.doc];
    STORE.setUi({ open });
    mark('tree');
  };

  ACT['focus-doc'] = (el) => gotoDoc(el.dataset.doc);

  ACT['edit-title:input'] = (el) => patchDebounced(el.dataset.doc, { title: el.value });
  ACT['edit-field:input'] = (el) => {
    autosize(el);
    patchDebounced(el.dataset.doc, { fields: { [el.dataset.field]: el.value } });
  };
  ACT['edit-body:input'] = (el) => { autosize(el); patchDebounced(el.dataset.doc, { body: el.value }); };
  ACT['edit-body:keydown'] = (el, e) => { if (e.key === 'Escape') { e.stopPropagation(); el.blur(); } };

  ACT['open-body'] = (el) => {
    focusBodyOnPaint = el.dataset.doc;
    STORE.setUi({ editingBody: el.dataset.doc });
    mark('feed');
  };

  // The ＋ on the Story Folders header (data-parent="") and on each folder row
  // (data-parent="<id>"). Only the header can add a top-level ("parent") folder.
  ACT['folder-menu'] = (el) => {
    const parent = el.dataset.parent || '';
    const atRoot = parent === '';
    let items = menuItem('create-child', { type: 'folder', parent: parent },
      atRoot ? 'book' : 'folder', atRoot ? 'New parent folder' : 'New folder');
    items += '<div class="menu-sep"></div>';
    items += DOC_MENU_TYPES.map(t =>
      menuItem('create-child', { type: t, parent: parent }, DOC_TYPES[t].icon, 'New ' + DOC_TYPES[t].label.toLowerCase())).join('');
    openMenu(el, items);
  };

  ACT['create-child'] = (el) => {
    const type = el.dataset.type;
    const parent = el.dataset.parent || null;
    closeModal();
    if (type === 'folder') {
      openTextPromptModal({
        title: parent ? 'New folder' : 'New parent folder',
        placeholder: 'Folder name', submitLabel: 'Add',
        onSubmit: (name) => {
          const f = STORE.createDoc({ type: 'folder', title: name, parent: parent });
          const open = ui().open; if (parent) open[parent] = true; STORE.setUi({ open });
          gotoFolder(f.id); mark('tree');
          announce('Added folder “' + f.title + '”.');
        },
      });
      return;
    }
    const d = STORE.createDoc({ type: type, parent: parent });
    const open = ui().open; if (parent) open[parent] = true; STORE.setUi({ open });
    gotoDoc(d.id); mark('tree');
    announce('Added a new ' + (DOC_TYPES[type] ? DOC_TYPES[type].label.toLowerCase() : 'document') + '.');
  };

  ACT['delete-doc'] = (el) => {
    const d = STORE.get(el.dataset.doc);
    if (!d) return;
    const kids = (STORE.tree().kids.get(d.id) || []).length;
    const extra = kids ? `\n\nIts ${kids} nested document${kids === 1 ? '' : 's'} will move back to the top level.` : '';
    if (!confirm(`Move "${d.title}" to the trash?${extra}\n\nIt is never really deleted — you can put it back.`)) return;
    STORE.deleteDoc(d.id);
    announce('Moved to trash.');
  };
  ACT['restore-doc'] = (el) => { STORE.restoreDoc(el.dataset.doc); announce('Restored.'); };

  ACT['keep-mine'] = (el) => { STORE.keepMine(el.dataset.doc); announce('Kept your version.'); };
  ACT['take-theirs'] = (el) => { STORE.takeTheirs(el.dataset.doc); announce('Took the new version. Your edit is parked.'); };
  ACT['restore-mine'] = (el) => { STORE.restoreMine(el.dataset.doc); announce('Your edit is back.'); };
  ACT['show-both'] = (el) => openDiffModal(el.dataset.doc);

  ACT['collapse-a'] = () => { STORE.setUi({ railA: !ui().railA }); applyRails(); };
  ACT['collapse-b'] = () => { STORE.setUi({ railB: !ui().railB }); applyRails(); };
  ACT['reload'] = () => location.reload();

  // Re-gate the DM OS: clear the remembered unlock and reload, so boot shows the
  // passcode again. Non-destructive — the workspace content stays in localStorage.
  ACT['lock'] = () => { STORE.setUi({ passOk: false }); location.reload(); };

  /* ------------------------- Quick note + notebook ------------------------ */
  ACT['quick-note'] = () => { focusPadOnPaint = true; STORE.setUi({ quickNoteOpen: true }); mark('float'); };
  ACT['close-quicknote'] = () => { STORE.setUi({ quickNoteOpen: false }); mark('float'); };
  ACT['qn-date:change'] = (el) => STORE.setQuickNote({ date: el.value });
  ACT['qn-target:change'] = (el) => {
    STORE.setUi({ quickNoteTarget: el.value });
    syncNewSectionField();
    if (el.value === 'new-section') { const inp = ROOT.float.querySelector('.qn-newsection-input'); if (inp) inp.focus(); }
  };
  ACT['qn-input:input'] = (el) => { STORE.setQuickNote({ text: el.value, filed: false }); updateSelButton(); };
  ACT['qn-input:keyup'] = () => updateSelButton();
  ACT['qn-input:mouseup'] = () => updateSelButton();

  ACT['new-section'] = () => openTextPromptModal({
    title: 'New notebook section',
    hint: 'A place to file notes — e.g. “Session 3”, “NPCs I improvised”, “Loose threads”.',
    placeholder: 'Section name',
    submitLabel: 'Add section',
    onSubmit: (name) => {
      const sec = STORE.createSection(name);
      const open = ui().open; open[STORE.NB_ROOT] = true; STORE.setUi({ open });
      refreshQuickNoteTargets();
      mark('tree');
      announce('Added section “' + sec.title + '”.');
    },
  });

  ACT['file-all'] = () => {
    const pad = ROOT.float.querySelector('.qn-pad');
    if (!pad.value.trim()) { announce('Nothing to file yet.'); return; }
    const dest = resolveTarget();
    if (!dest) return;
    const q = STORE.getQuickNote();
    STORE.fileNote({ text: pad.value, date: q.date, sectionId: dest.sectionId, noteId: dest.noteId });
    pad.value = ''; STORE.clearQuickNote();
    afterFile(dest); updateSelButton();
    announce('Filed to “' + dest.label + '”.');
  };

  ACT['file-selection'] = () => {
    const pad = ROOT.float.querySelector('.qn-pad');
    const s = pad.selectionStart, e = pad.selectionEnd;
    if (s === e || !pad.value.slice(s, e).trim()) { announce('Select some text in the pad first.'); return; }
    const dest = resolveTarget();
    if (!dest) return;
    const q = STORE.getQuickNote();
    STORE.fileNote({ text: pad.value.slice(s, e), date: q.date, sectionId: dest.sectionId, noteId: dest.noteId });
    // Copy, not cut — the text stays in the pad so you can file it more than once
    // or keep working with it. Clear is the only thing that erases the pad.
    pad.focus(); pad.selectionStart = s; pad.selectionEnd = e;
    afterFile(dest); updateSelButton();
    announce('Filed the selection to “' + dest.label + '”. It is still in the pad.');
  };

  ACT['clear-note'] = () => {
    const pad = ROOT.float.querySelector('.qn-pad');
    if (!pad.value.trim()) { pad.value = ''; STORE.clearQuickNote(); updateSelButton(); return; }
    openModal(`
      <div class="modal-title">Clear the quick note?</div>
      <p class="modal-hint">There are notes in the pad. File them into the notebook first, or clear without filing?</p>
      <div class="modal-actions" style="flex-wrap:wrap; gap:8px;">
        <button class="btn btn-sm btn-ghost" data-act="close-modal">Cancel</button>
        <div class="spacer"></div>
        <button class="btn btn-sm" data-act="clear-discard">Just clear</button>
        <button class="btn btn-sm btn-primary" data-act="clear-file">File, then clear</button>
      </div>`);
  };
  ACT['clear-discard'] = () => {
    closeModal();
    const pad = ROOT.float.querySelector('.qn-pad');
    pad.value = ''; STORE.clearQuickNote(); updateSelButton();
    announce('Cleared the pad.');
  };
  ACT['clear-file'] = () => {
    closeModal();
    const pad = ROOT.float.querySelector('.qn-pad');
    const dest = resolveTarget();
    if (!dest) return;
    const q = STORE.getQuickNote();
    STORE.fileNote({ text: pad.value, date: q.date, sectionId: dest.sectionId, noteId: dest.noteId });
    pad.value = ''; STORE.clearQuickNote();
    afterFile(dest); updateSelButton();
    announce('Filed to “' + dest.label + '”, then cleared.');
  };

  ACT['sync'] = async () => {
    announce('Syncing from the campaign…');
    const res = await STORE.loadCampaign(true);   // explicit → force, even in a fresh workspace
    campaignStatus = res;
    if (!res.ok) { mark('feed'); announce('Nothing to sync.'); return; }
    const bits = [];
    if (res.created.length) bits.push(res.created.length + ' new');
    if (res.updated.length) bits.push(res.updated.length + ' updated');
    if (res.conflicted.length) bits.push(res.conflicted.length + ' needing your call');
    announce(bits.length ? 'Synced: ' + bits.join(', ') + '.' : 'Already up to date.');
    mark('tree', 'feed');
  };

  function downloadWorkspace() {
    const blob = new Blob([STORE.exportWorkspace()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'dm-workspace-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  ACT['export'] = () => { downloadWorkspace(); announce('Exported your workspace to a file.'); };
  ACT['import'] = () => document.getElementById('importWs').click();

  ACT['new-workspace'] = () => openModal(`
    <div class="modal-title">Start a new workspace?</div>
    <p class="modal-hint">This clears everything and gives you a blank slate to build a
      different campaign in. Your current workspace downloads as a backup first, so nothing
      is lost — re-open it any time with <strong>Import workspace</strong>.</p>
    <div class="modal-actions" style="flex-wrap:wrap; gap:8px;">
      <button class="btn btn-sm btn-ghost" data-act="close-modal">Cancel</button>
      <div class="spacer"></div>
      <button class="btn btn-sm btn-primary" data-act="new-workspace-go">Back up &amp; start fresh</button>
    </div>`);
  ACT['new-workspace-go'] = () => {
    closeModal();
    downloadWorkspace();
    STORE.newWorkspace();
    STORE.setUi({ open: {}, focus: '#/f/', quickNoteOpen: false, quickNoteTarget: null });
    campaignStatus = { ok: false, reason: 'no-campaign' };
    location.hash = '#/f/';
    mark('tree', 'feed', 'float');
    announce('Started a new workspace. Your old one was downloaded as a backup.');
  };

  ACT['modal-backdrop'] = (el, e) => { if (e.target === el) closeModal(); };
  ACT['close-modal'] = () => closeModal();

  ACT['search'] = () => openSearchModal();
  ACT['search-input:input'] = (el) => renderSearchResults(el.value);
  ACT['search-open'] = (el) => {
    const id = el.dataset.doc;
    closeModal();
    if (STORE.isInNotebook(id)) {
      const open = ui().open; open[STORE.NB_ROOT] = true;
      const p = STORE.get(id); if (p && p.parent) open[p.parent] = true;
      STORE.setUi({ open });
    }
    gotoDoc(id);
    mark('tree');
  };


  /* ============================ Modal + peek =============================== */
  function openModal(html, extraClass) {
    ROOT.modal.innerHTML = `<div class="modal-overlay" data-act="modal-backdrop">
      <div class="modal ${extraClass || ''}" role="dialog" aria-modal="true">${html}</div></div>`;
    const first = ROOT.modal.querySelector('input, select, button');
    if (first) first.focus();
  }
  const closeModal = () => { ROOT.modal.innerHTML = ''; };
  const modalOpen = () => !!ROOT.modal.firstChild;

  // A styled replacement for window.prompt — no more "localhost says" dialogs.
  function openTextPromptModal(o) {
    openModal(`
      <div class="modal-title">${esc(o.title)}</div>
      ${o.hint ? `<p class="modal-hint">${esc(o.hint)}</p>` : ''}
      <div class="field"><input type="text" id="promptInput" placeholder="${esc(o.placeholder || '')}" maxlength="${o.maxlength || 80}"></div>
      <div class="modal-actions">
        <button class="btn btn-sm btn-ghost" data-act="close-modal">Cancel</button>
        <div class="spacer"></div>
        <button class="btn btn-sm btn-primary" id="promptOk">${esc(o.submitLabel || 'OK')}</button>
      </div>`);
    const input = ROOT.modal.querySelector('#promptInput');
    const submit = () => { const v = input.value.trim(); if (!v) { input.focus(); return; } closeModal(); o.onSubmit(v); };
    ROOT.modal.querySelector('#promptOk').onclick = submit;
    input.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } };
    input.focus();
  }

  // A small anchored popup menu (reuses the modal root + its click-outside close).
  function menuItem(act, data, iconName, label) {
    const attrs = Object.keys(data).map(k => `data-${k}="${esc(String(data[k]))}"`).join(' ');
    return `<button class="menu-item" data-act="${act}" ${attrs}>${icon(iconName)} <span>${esc(label)}</span></button>`;
  }
  function openMenu(anchorEl, itemsHTML) {
    const r = anchorEl.getBoundingClientRect();
    ROOT.modal.innerHTML = `<div class="menu-overlay" data-act="modal-backdrop"><div class="menu" role="menu">${itemsHTML}</div></div>`;
    const box = ROOT.modal.querySelector('.menu');
    box.style.left = r.left + 'px';
    box.style.top = (r.bottom + 4) + 'px';
    const b = box.getBoundingClientRect();
    if (b.right > window.innerWidth - 8) box.style.left = Math.max(8, window.innerWidth - 8 - b.width) + 'px';
    if (b.bottom > window.innerHeight - 8) box.style.top = Math.max(8, r.top - b.height - 4) + 'px';
  }

  const DOC_MENU_TYPES = ['beat', 'scene', 'encounter', 'npc', 'creature', 'location', 'session', 'note'];

  /* ============================ App-wide search =========================== */
  const pathLabel = (id) => pathOf(id).slice(0, -1).map(d => d.title).join(' › ');

  // Substring match across every document — story folders AND the notebook —
  // over title, template fields, and body. The narrow-then-browse idea from the
  // companion picker, applied to the whole workspace.
  function searchDocs(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out = [];
    STORE.docs().forEach(d => {
      if (d.id === STORE.NB_ROOT || d.type === 'folder') { /* still searchable by title only */ }
      const original = [d.title].concat(Object.values(d.fields || {})).concat([d.body]).filter(Boolean).join('   ');
      const hay = original.toLowerCase();
      const idx = hay.indexOf(q);
      if (idx < 0) return;
      const from = Math.max(0, idx - 30), to = Math.min(original.length, idx + q.length + 55);
      const rel = idx - from;
      const raw = original.slice(from, to);
      const snip = (from > 0 ? '… ' : '')
        + esc(raw.slice(0, rel)) + '<mark>' + esc(raw.slice(rel, rel + q.length)) + '</mark>' + esc(raw.slice(rel + q.length))
        + (to < original.length ? ' …' : '');
      out.push({
        id: d.id, title: d.title, type: d.type,
        area: STORE.isInNotebook(d.id) ? 'Notebook' : 'Story',
        path: pathLabel(d.id),
        titleHit: d.title.toLowerCase().indexOf(q) >= 0,
        snip: snip.replace(/\n+/g, ' '),
      });
    });
    out.sort((a, b) => (b.titleHit - a.titleHit) || a.title.localeCompare(b.title));
    return out.slice(0, 40);
  }

  function renderSearchResults(query) {
    const box = ROOT.modal.querySelector('#searchResults');
    if (!box) return;
    const q = query.trim();
    if (!q) { box.innerHTML = '<p class="modal-hint">Type to search across every folder and note.</p>'; return; }
    const res = searchDocs(query);
    if (!res.length) { box.innerHTML = `<p class="modal-hint">No matches for “${esc(q)}”.</p>`; return; }
    box.innerHTML = res.map(r => `
      <button class="search-row" data-act="search-open" data-doc="${r.id}">
        <span class="search-icon">${icon(DOC_TYPES[r.type] ? DOC_TYPES[r.type].icon : 'scroll')}</span>
        <span class="search-main">
          <span class="search-title">${esc(r.title)} <span class="search-area">${r.area}${r.path ? ' · ' + esc(r.path) : ''}</span></span>
          <span class="search-snip">${r.snip}</span>
        </span>
      </button>`).join('');
  }

  function openSearchModal() {
    openModal(`
      <div class="search-box"><input type="text" id="searchInput" data-act="search-input"
           placeholder="Search all story &amp; notebook…" autocomplete="off" spellcheck="false"></div>
      <div class="search-results" id="searchResults"><p class="modal-hint">Type to search across every folder and note.</p></div>`, 'modal-wide modal-search');
    ROOT.modal.querySelector('#searchInput').focus();
  }

  function openDiffModal(id) {
    const mine = STORE.get(id);
    const theirs = STORE.incoming(id);
    if (!mine || !theirs) return;
    const keys = Array.from(new Set(Object.keys(mine.fields || {}).concat(Object.keys(theirs.fields || {}))));
    const row = (label, a, b) => `<tr><th>${esc(label)}</th><td>${esc(a || '—')}</td><td>${esc(b || '—')}</td></tr>`;
    openModal(`
      <div class="modal-title">${esc(mine.title)}</div>
      <p class="modal-hint">Nothing has been overwritten. Yours is what you're reading in the feed.</p>
      <div class="diff-wrap"><table class="diff">
        <thead><tr><th></th><th>Yours</th><th>Cowork's (rev ${theirs.rev})</th></tr></thead>
        <tbody>
          ${row('Title', mine.title, theirs.title)}
          ${keys.map(k => row(k.replace(/_/g, ' '), (mine.fields || {})[k], (theirs.fields || {})[k])).join('')}
          ${row('Body', mine.body, theirs.body)}
        </tbody></table></div>
      <div class="modal-actions">
        <button class="btn btn-sm" data-act="keep-mine" data-doc="${id}">Keep mine</button>
        <div class="spacer"></div>
        <button class="btn btn-sm btn-gold" data-act="take-theirs" data-doc="${id}">Take theirs</button>
      </div>`, 'modal-wide');
  }

  /* Peek: a NON-modal popover. No focus trap, no overlay — the whole point is
     that you never lose your place. Hover a link; the feed doesn't move. */
  function showPeek(link) {
    const d = STORE.get(link.dataset.target);
    if (!d) return;
    peekFor = link;
    const T = DOC_TYPES[d.type];
    const summary = unlink(d.body || Object.values(d.fields || {}).filter(Boolean)[0] || '').slice(0, 260);
    ROOT.peek.innerHTML = `<div class="peek" role="note">
      <div class="peek-head">${icon(T.icon)} <strong>${esc(d.title)}</strong> <span class="tag">${esc(T.label)}</span></div>
      <p class="peek-body">${esc(summary) || '<em>Nothing written here yet.</em>'}</p>
      <div class="peek-actions">
        <a class="peek-go" href="#/d/${d.id}" data-act="jump">Open it →</a>
        ${(d.type === 'creature' || d.type === 'npc') ? `<button class="peek-add" data-act="roster-add-doc" data-doc="${d.id}">＋ Initiative</button>` : ''}
      </div></div>`;
    const box = ROOT.peek.firstChild;
    const r = link.getBoundingClientRect();
    const top = r.bottom + 8;
    box.style.left = Math.max(12, Math.min(r.left, window.innerWidth - box.offsetWidth - 12)) + 'px';
    box.style.top = (top + box.offsetHeight > window.innerHeight ? r.top - box.offsetHeight - 8 : top) + 'px';
  }
  function hidePeek() {
    clearTimeout(peekTimer); clearTimeout(peekHideTimer);
    peekTimer = peekHideTimer = 0; peekFor = null;
    if (ROOT.peek) ROOT.peek.innerHTML = '';
  }

  // Hover a roster name → a compact, non-modal preview. The rail hugs the right
  // edge, so this sits to the LEFT of the row. A click still opens the full card.
  function rosterPeekHTML(e) {
    const info = resolveEntry(e);
    const head = `<div class="peek-head">${icon(info.icon)} <strong>${esc(info.name)}</strong>${info.typeLabel ? ` <span class="tag">${esc(info.typeLabel)}</span>` : ''}</div>`;
    const hpLine = e.hp != null ? `<div class="rp-hp">${e.hp}${e.maxHp != null ? ' / ' + e.maxHp : ''} HP</div>` : '';
    let body = '';
    if (e.kind === 'hero' && e.snapshot && window.RAH && window.RAH.withState) {
      const R = window.RAH;
      const d = R.withState(e.snapshot, () => ({
        hp: R.computeHP(), ac: R.computeAC(),
        sub: (() => { const r = R.getRace(), c = R.getClass(); return 'Lvl ' + R.charLevel() + ' ' + (r ? r.name : '') + ' ' + (c ? c.name : ''); })(),
        ab: ['str', 'dex', 'con', 'int', 'wis', 'cha'].map(k => k.toUpperCase() + ' ' + R.fmtMod(R.modOf(R.finalScore(k) || 10))).join('  '),
      }));
      body = `<div class="rp-sub">${esc(d.sub)}</div><div class="rp-stats">HP ${d.hp} · AC ${d.ac}</div><div class="rp-abils">${esc(d.ab)}</div>`;
    } else if (info.doc) {
      const f = info.doc.fields || {};
      const stats = [];
      if (f.hp && e.hp == null) stats.push('HP ' + esc(String(f.hp).trim()));
      if (f.ac) stats.push('AC ' + esc(String(f.ac).trim()));
      body = (stats.length ? `<div class="rp-stats">${stats.join(' · ')}</div>` : '')
        + (f.speed ? `<div class="rp-line">${esc(f.speed)}</div>` : '')
        + (f.attack ? `<div class="rp-line"><strong>Attack:</strong> ${esc(f.attack)}</div>` : '');
    } else {
      body = `<div class="rp-sub">One-off combatant</div>`;
    }
    return head + hpLine + body + `<div class="rp-more">Click for full stats →</div>`;
  }
  function showRosterPeek(nameEl) {
    const id = nameEl.dataset.id;
    const e = STORE.getInitiative().entries.find(x => x.id === id); if (!e) return;
    peekFor = nameEl;
    ROOT.peek.innerHTML = `<div class="peek roster-peek" role="note">${rosterPeekHTML(e)}</div>`;
    const box = ROOT.peek.firstChild;
    const r = nameEl.getBoundingClientRect();
    let left = r.left - box.offsetWidth - 12;
    if (left < 8) left = Math.min(r.right + 12, window.innerWidth - box.offsetWidth - 8);
    let top = r.top - 4;
    if (top + box.offsetHeight > window.innerHeight - 8) top = window.innerHeight - 8 - box.offsetHeight;
    box.style.left = Math.max(8, left) + 'px';
    box.style.top = Math.max(8, top) + 'px';
  }

  /* ============================== Rail sizing ============================== */
  function applyRails() {
    const u = ui();
    ROOT.shell.style.setProperty('--rail-a', (u.railA ? u.widthA : 0) + 'px');
    ROOT.shell.style.setProperty('--rail-b', (u.railB ? u.widthB : 0) + 'px');
    ROOT.shell.classList.toggle('rail-a-closed', !u.railA);
    ROOT.shell.classList.toggle('rail-b-closed', !u.railB);
  }

  /* Under 900px the rails become fixed overlay drawers (see dmos.css). Leaving
     them open there would bury the story feed, so close them on the way in.
     The reopen tabs are always available, so nothing becomes unreachable. */
  const NARROW = window.matchMedia('(max-width: 900px)');
  function syncNarrow() {
    if (NARROW.matches) {
      const u = ui();
      if (u.railA || u.railB) STORE.setUi({ railA: false, railB: false });
    }
    applyRails();
  }

  ACT['grip:pointerdown'] = (el, e) => {
    const which = el.dataset.grip;
    const u = ui();
    dragging = { kind: 'grip', which, startX: e.clientX, startW: which === 'a' ? u.widthA : u.widthB };
    el.setPointerCapture(e.pointerId);
    document.body.classList.add('dmos-resizing');
    e.preventDefault();
  };

  // Reorder tree items by dragging the ⠿ handle (never the whole row, so a click
  // can't accidentally start a drag). Siblings only.
  ACT['row-drag:pointerdown'] = (el, e) => {
    const id = el.dataset.doc;
    const d = STORE.get(id); if (!d) return;
    dragging = { kind: 'tree', id, parent: d.parent || null, dropTarget: null };
    el.setPointerCapture(e.pointerId);
    const row = el.closest('.tree-row'); if (row) row.classList.add('row-dragging');
    document.body.classList.add('dmos-row-dragging');
    e.preventDefault();
  };

  // Drag the Quick Note window by its header (but not when the pointer starts on a
  // control inside the header, like the date box or close button).
  ACT['qn-drag:pointerdown'] = (el, e) => {
    if (e.target.closest('input, button, select, textarea')) return;
    const box = ROOT.float.querySelector('.quicknote').getBoundingClientRect();
    dragging = { kind: 'float', startX: e.clientX, startY: e.clientY, baseX: box.left, baseY: box.top };
    el.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  function onPointerMove(e) {
    if (!dragging) return;
    if (dragging.kind === 'grip') {
      const dx = e.clientX - dragging.startX;
      const raw = dragging.which === 'a' ? dragging.startW + dx : dragging.startW - dx;
      const w = Math.max(180, Math.min(560, raw));
      // Poke CSS directly: no model change, no repaint, no jank.
      if (dragging.which === 'a') { ui().widthA = w; ROOT.shell.style.setProperty('--rail-a', w + 'px'); }
      else { ui().widthB = w; ROOT.shell.style.setProperty('--rail-b', w + 'px'); }
      return;
    }
    if (dragging.kind === 'float') {
      const el = ROOT.float.querySelector('.quicknote'); if (!el) return;
      const x = Math.max(4, Math.min(window.innerWidth - 80, dragging.baseX + (e.clientX - dragging.startX)));
      const y = Math.max(4, Math.min(window.innerHeight - 40, dragging.baseY + (e.clientY - dragging.startY)));
      el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.right = 'auto'; el.style.bottom = 'auto';
      ui().quickNotePos = { x: x, y: y };
      return;
    }
    if (dragging.kind === 'roster') {
      clearRosterMarks();
      dragging.dropTarget = null; dragging.dropBefore = true;
      const under = document.elementFromPoint(e.clientX, e.clientY);
      const row = under && under.closest ? under.closest('.ini-row') : null;
      if (!row) return;
      const tid = row.dataset.id;
      if (!tid || tid === dragging.id) return;
      const r = row.getBoundingClientRect();
      const before = (e.clientY - r.top) / r.height < 0.5;
      row.classList.add(before ? 'drop-before' : 'drop-after');
      dragging.dropTarget = tid; dragging.dropBefore = before;
      return;
    }
    if (dragging.kind === 'tree') {
      clearDropMarks();
      dragging.dropTarget = null; dragging.dropInto = null;
      const under = document.elementFromPoint(e.clientX, e.clientY);
      const row = under && under.closest ? under.closest('.tree-row') : null;
      if (!row) return;
      const tid = row.dataset.doc;
      if (!tid || tid === dragging.id) return;
      const td = STORE.get(tid);
      if (!td) return;
      // A folder dropped into its own subtree would make a cycle — refuse it.
      const cyclic = pathOf(tid).some(a => a.id === dragging.id);
      if (cyclic) return;
      const r = row.getBoundingClientRect();
      const y = (e.clientY - r.top) / r.height;   // 0 (top) .. 1 (bottom)
      if (td.type === 'folder' && y > 0.25 && y < 0.75) {
        row.classList.add('drop-into');            // drop INTO the folder
        dragging.dropInto = tid;
        return;
      }
      const before = y < 0.5;                       // reorder as a sibling of this row
      row.classList.add(before ? 'drop-before' : 'drop-after');
      dragging.dropTarget = tid; dragging.dropBefore = before;
    }
  }

  function clearDropMarks() {
    if (ROOT.tree) ROOT.tree.querySelectorAll('.drop-before, .drop-after, .drop-into')
      .forEach(n => n.classList.remove('drop-before', 'drop-after', 'drop-into'));
  }

  // Move the dragged doc INTO a folder (append at the end).
  function reparentInto(id, folderId) {
    STORE.patch(id, { parent: folderId, order: STORE.nextOrder(folderId) });
  }

  // Place the dragged doc next to a target row, adopting that row's parent — so
  // this both reorders within a folder AND moves an item between folders. One
  // patch, an interpolated order between the new neighbours.
  function reorderAt(id, targetId, before) {
    const target = STORE.get(targetId); if (!target) return;
    const parent = target.parent || null;
    const sibs = STORE.docs()
      .filter(x => (x.parent || null) === parent && x.id !== id)
      .sort((a, b) => (a.order - b.order) || a.title.localeCompare(b.title));
    const ti = sibs.findIndex(x => x.id === targetId);
    if (ti < 0) return;
    const at = before ? ti : ti + 1;
    const prev = sibs[at - 1], next = sibs[at];
    let order;
    if (prev && next) order = (prev.order + next.order) / 2;
    else if (prev) order = prev.order + 100;
    else if (next) order = next.order - 100;
    else order = 100;
    STORE.patch(id, { parent, order });
  }

  function endDrag() {
    if (!dragging) return;
    const drag = dragging;
    dragging = null;
    document.body.classList.remove('dmos-resizing', 'dmos-row-dragging');
    if (drag.kind === 'tree') {
      clearDropMarks();
      const dr = ROOT.tree.querySelector('.row-dragging');
      if (dr) dr.classList.remove('row-dragging');
      if (drag.dropInto) reparentInto(drag.id, drag.dropInto);
      else if (drag.dropTarget) reorderAt(drag.id, drag.dropTarget, drag.dropBefore);
      else mark('tree');   // repaint to clear any lingering drag visuals
    } else if (drag.kind === 'roster') {
      clearRosterMarks();
      const dr = ROOT.rail.querySelector('.row-dragging');
      if (dr) dr.classList.remove('row-dragging');
      if (drag.dropTarget) {
        // Index into the list with the dragged row removed — matches rosterMove.
        const ids = STORE.getInitiative().entries.map(x => x.id).filter(x => x !== drag.id);
        let idx = ids.indexOf(drag.dropTarget);
        if (idx < 0) { mark('rail'); }
        else { if (!drag.dropBefore) idx += 1; STORE.rosterMove(drag.id, idx); }
      } else mark('rail');
    } else {
      STORE.saveUi();      // grip widths / float position
    }
    retry();
  }

  /* ================================= Print ================================= */
  // Minimal, but it ships from day one: without it the first Ctrl+P at the table
  // yields forty pages of sidebar. (print.css is deliberately NOT linked here —
  // its line 8 hides .app-header/.app/#live.)
  function fillPrint() {
    const docs = feedDocs();
    const para = (s) => esc(unlink(s)).split(/\n{2,}/).map(p => '<p>' + p.replace(/\n/g, '<br>') + '</p>').join('');
    ROOT.print.innerHTML = docs.length
      ? docs.map(d => `<section class="p-doc">
          <h2>${esc(d.title)}</h2>
          ${DOC_TYPES[d.type].fields.map(([k, prompt]) => (d.fields || {})[k]
            ? `<h3>${esc(prompt)}</h3>${para(d.fields[k])}` : '').join('')}
          ${d.body ? `<div>${para(d.body)}</div>` : ''}
        </section>`).join('')
      : '<p>Nothing to print.</p>';
  }

  /* ================================= Boot ================================== */
  function bind() {
    ROOT.shell = document.getElementById('dmos');
    ROOT.tree = document.getElementById('paneTree');
    ROOT.feed = document.getElementById('paneFeed');
    ROOT.rail = document.getElementById('paneRail');
    ROOT.float = document.getElementById('dmosFloat');
    ROOT.modal = document.getElementById('dmosModal');
    ROOT.peek = document.getElementById('dmosPeek');
    ROOT.banner = document.getElementById('dmosBanner');
    ROOT.print = document.getElementById('dmosPrint');
    ROOT.map = document.getElementById('dmosMap');

    // Bound once, on permanent roots. Never removed. See the header comment.
    ['click', 'input', 'change', 'keydown', 'pointerdown', 'contextmenu'].forEach(t => on(ROOT.shell, t));
    on(ROOT.banner, 'click');
    ['click', 'input'].forEach(t => on(ROOT.modal, t));   // input drives live search
    on(ROOT.peek, 'click');
    // The Story map is its own full-viewport root. Its toolbar buttons are
    // delegated here; the board's own pointer/context handlers are self-owned on
    // the canvas (rebuilt each paint).
    on(ROOT.map, 'click');
    // The float is a separate root, so it needs its own delegated events: the pad
    // fires input/keyup/mouseup, the date/target fire change, the header drags.
    ['click', 'input', 'change', 'keyup', 'mouseup', 'pointerdown'].forEach(t => on(ROOT.float, t));

    NARROW.addEventListener('change', syncNarrow);

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', endDrag);
    document.addEventListener('pointerup', retry);
    document.addEventListener('focusout', () => setTimeout(retry, 0));
    document.addEventListener('selectionchange', () => {
      const s = window.getSelection();
      if (!s || s.isCollapsed) retry();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (!modalOpen()) openSearchModal();
        return;
      }
      if (e.key !== 'Escape') return;
      if (modalOpen()) closeModal();       // a menu/picker over the map closes first
      else if (mapOpen && chartBusy()) cancelChartGesture();   // cancel a drag/link, keep the map
      else if (mapOpen) closeStoryMap();
      else if (ROOT.peek.firstChild) hidePeek();
    });

    // Leaving a body editor commits it and hands the node back to the reconcile.
    document.addEventListener('focusout', (e) => {
      if (e.target.classList && e.target.classList.contains('doc-body-edit')) {
        flushPending();
        STORE.setUi({ editingBody: null });
        mark('feed');
      }
    });

    // Peek. Hover only — a plain click is a jump.
    ROOT.feed.addEventListener('mouseover', (e) => {
      const link = e.target.closest && e.target.closest('a.wikilink');
      if (!link || link === peekFor) return;
      clearTimeout(peekTimer);
      peekTimer = setTimeout(() => showPeek(link), 350);
    });
    ROOT.feed.addEventListener('mouseout', (e) => {
      if (!e.target.closest || !e.target.closest('a.wikilink')) return;
      clearTimeout(peekTimer);
      peekHideTimer = setTimeout(hidePeek, 250);
    });
    ROOT.peek.addEventListener('mouseover', () => clearTimeout(peekHideTimer));
    ROOT.peek.addEventListener('mouseout', () => { peekHideTimer = setTimeout(hidePeek, 250); });
    ROOT.feed.addEventListener('scroll', hidePeek, { passive: true });

    // Same hover-peek for the roster rows (positioned to the left of the rail).
    // The name button has child <span>s, so mouseover/out fire as the pointer
    // crosses them; use relatedTarget so we only react on true enter/leave of the
    // whole name — otherwise the mid-name mouseout kills the pending show timer.
    ROOT.rail.addEventListener('mouseover', (e) => {
      const nameEl = e.target.closest && e.target.closest('.ini-name');
      if (!nameEl) return;
      const from = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest('.ini-name') : null;
      if (from === nameEl) return;              // moving within the same name — ignore
      clearTimeout(peekHideTimer);
      if (nameEl === peekFor) return;           // already showing for this row
      clearTimeout(peekTimer);
      peekTimer = setTimeout(() => showRosterPeek(nameEl), 250);
    });
    ROOT.rail.addEventListener('mouseout', (e) => {
      const fromName = e.target.closest && e.target.closest('.ini-name');
      if (!fromName) return;
      const to = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest('.ini-name') : null;
      if (to === fromName) return;              // still within the same name — not leaving
      clearTimeout(peekTimer);
      peekHideTimer = setTimeout(hidePeek, 250);
    });
    ROOT.rail.addEventListener('scroll', hidePeek, { capture: true, passive: true });

    window.addEventListener('hashchange', () => {
      STORE.setUi({ focus: location.hash, editingBody: null });
      hidePeek();
      mark('feed', 'tree');
    });

    window.addEventListener('storage', (e) => {
      if (!e.key || e.key.indexOf('rollAHeroDm') !== 0) return;
      crossTab = true;
      mark('banner');
    });

    // Teardown for the one timer that outlives the DOM.
    window.addEventListener('beforeunload', flushPending);
    document.addEventListener('visibilitychange', () => { if (document.hidden) flushPending(); });
    window.addEventListener('beforeprint', fillPrint);

    STORE.subscribe((evt) => {
      if (evt.type === 'docs') mark('tree', 'feed', 'rail');   // roster names track their docs
      else if (evt.type === 'initiative') mark('rail');
      if (evt.type === 'quota') mark('banner');
    });

    // Import (drag-in works on file:// too, which is the whole point).
    const imp = document.getElementById('importWs');
    imp.onchange = () => {
      const file = imp.files && imp.files[0];
      imp.value = '';
      if (file) readWorkspaceFile(file);
    };
    document.addEventListener('dragover', (e) => { e.preventDefault(); });
    document.addEventListener('drop', (e) => {
      e.preventDefault();
      const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) readWorkspaceFile(file);
    });
  }

  function readWorkspaceFile(file) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const res = STORE.importWorkspace(JSON.parse(r.result));
        alert(`Imported ${res.added} document${res.added === 1 ? '' : 's'}.` +
              (res.kept ? ` ${res.kept} you already had were left alone.` : ''));
      } catch (e) { alert('Import failed: ' + e.message); }
    };
    r.onerror = () => alert('Could not read that file.');
    r.readAsText(file);
  }

  window.DMOS_UI = {
    bind, mark, flush, isLive, ACT, ROOT, PAINT,
    applyRails, syncNarrow, flushPending, parseHash, feedDocs, linkify,
    setCampaignStatus: (s) => { campaignStatus = s; },
    campaignStatus: () => campaignStatus,
    _dragging: () => dragging,
  };
})();
