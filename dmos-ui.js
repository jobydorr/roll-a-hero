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
      <div class="doc-bodywrap">
        ${editingBody
          ? `<textarea class="doc-body-edit" data-act="edit-body" data-doc="${d.id}"
                       placeholder="Write here. Link to another document with [[its_id]].">${esc(d.body || '')}</textarea>`
          : `<div class="doc-body" data-act="open-body" data-doc="${d.id}">${
              d.body ? linkify(d.body) : '<p class="doc-empty">Click to write…</p>'}</div>`}
      </div>`;
    return el;
  }

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
  PAINT.rail = function () {
    document.getElementById('railHead').innerHTML = `
      <button class="rail-collapse" data-act="collapse-b" title="Hide this sidebar" aria-label="Hide sidebar">›</button>
      <div class="rail-title"><span>At the table</span></div>`;
    document.getElementById('railBody').innerHTML = `
      <div class="rail-section">
        <p class="rail-hint">Initiative, the party, and fast lookup arrive in the next phase.</p>
      </div>`;
  };

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
      <a class="peek-go" href="#/d/${d.id}" data-act="jump">Open it →</a></div>`;
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

    // Bound once, on permanent roots. Never removed. See the header comment.
    ['click', 'input', 'change', 'keydown', 'pointerdown', 'contextmenu'].forEach(t => on(ROOT.shell, t));
    on(ROOT.banner, 'click');
    ['click', 'input'].forEach(t => on(ROOT.modal, t));   // input drives live search
    on(ROOT.peek, 'click');
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
      if (modalOpen()) closeModal();
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
      if (evt.type === 'docs') mark('tree', 'feed');
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
