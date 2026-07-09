/* Roll a Hero — inline SVG icons (monochrome, use currentColor so CSS controls color).
   Exposed as a global ICONS map. Each value is an <svg> string sized by font/CSS. */
(function () {
  const wrap = (inner, vb = '0 0 24 24') =>
    `<svg viewBox="${vb}" class="icon" aria-hidden="true" focusable="false">${inner}</svg>`;

  const ICONS = {
    // --- The six abilities ---
    str: wrap('<path fill="currentColor" d="M3 9h3V7a1.2 1.2 0 0 1 2.4 0v10a1.2 1.2 0 0 1-2.4 0v-2H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Zm18 0h-3V7a1.2 1.2 0 0 0-2.4 0v10a1.2 1.2 0 0 0 2.4 0v-2h3a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1ZM8.4 11h7.2v2H8.4Z"/>'),
    dex: wrap('<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M3 21C5 12 12 5 21 3M21 3l-5 1.2M21 3l-1.2 5M13 11l-9 9"/>'),
    con: wrap('<path fill="currentColor" d="M12 21.3 4.3 14a5 5 0 0 1 7.1-7.05l.6.6.6-.6A5 5 0 0 1 19.7 14Z"/>'),
    int: wrap('<path fill="currentColor" d="M9 3a4 4 0 0 0-3.4 6.1A3.5 3.5 0 0 0 5 14.5 3.5 3.5 0 0 0 8.5 18H11V3Zm4 0v15h2.5A3.5 3.5 0 0 0 19 14.5a3.5 3.5 0 0 0-.6-5.4A4 4 0 0 0 15 3ZM11 19.5A2.5 2.5 0 0 1 8.5 22 2.5 2.5 0 0 1 6 19.5Zm2 0A2.5 2.5 0 0 0 15.5 22 2.5 2.5 0 0 0 18 19.5Z"/>'),
    wis: wrap('<path fill="currentColor" d="M12 5C6.5 5 2.7 9.2 1 12c1.7 2.8 5.5 7 11 7s9.3-4.2 11-7c-1.7-2.8-5.5-7-11-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>'),
    cha: wrap('<path fill="currentColor" d="m12 2 2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.8Z"/>'),
    // --- Sheet stats ---
    hp: wrap('<path fill="currentColor" d="M12 21.3 4.3 14a5 5 0 0 1 7.1-7.05l.6.6.6-.6A5 5 0 0 1 19.7 14Z"/>'),
    speed: wrap('<path fill="currentColor" d="M13 2 4.5 13.5H11l-1.5 8.5L20 9.5h-6.5Z"/>'),
    armor: wrap('<path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5Zm0 3.2 5 1.9V11c0 3.4-2.1 6-5 7.8Z"/>'),
    weapon: wrap('<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M14.5 3H21v6.5L9 21.5 2.5 15ZM21 3 9.5 14.5M6 12l6 6"/>'),
    spell: wrap('<path fill="currentColor" d="M12 2c.4 3.2 1.8 4.6 5 5-3.2.4-4.6 1.8-5 5-.4-3.2-1.8-4.6-5-5 3.2-.4 4.6-1.8 5-5ZM5 13c.25 1.9 1.1 2.75 3 3-1.9.25-2.75 1.1-3 3-.25-1.9-1.1-2.75-3-3 1.9-.25 2.75-1.1 3-3Zm12 1c.2 1.4.8 2 2.2 2.2-1.4.2-2 .8-2.2 2.2-.2-1.4-.8-2-2.2-2.2 1.4-.2 2-.8 2.2-2.2Z"/>'),
    // --- UI ---
    dice: wrap('<path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M12 2 3 7v10l9 5 9-5V7Zm0 0v6m0 0 9-3m-9 3L3 7m9 14V8"/>'),
    star: wrap('<path fill="currentColor" d="m12 2 2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.8 6.1 20.6l1.3-6.6L2.5 8.9l6.6-.8Z"/>'),
    scroll: wrap('<path fill="currentColor" d="M5 3h11a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a1 1 0 0 1 1-1Zm11 16a1 1 0 0 0 1-1V6a1 1 0 0 0-2 0v12a1 1 0 0 0 1 1ZM7 7h7v2H7Zm0 4h7v2H7Z"/>'),
    print: wrap('<path fill="currentColor" d="M7 3h10v4H7Zm-2 6h14a2 2 0 0 1 2 2v6h-4v3H7v-3H3v-6a2 2 0 0 1 2-2Zm4 6v4h6v-4Zm8-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>'),
    check: wrap('<path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="m4 12 5 5L20 6"/>'),
    book: wrap('<path fill="currentColor" d="M4 4a2 2 0 0 1 2-2h12v18H6a2 2 0 0 0-2 2ZM6 18h10v2H6a0 0 0 0 1 0 0Z"/>'),
    folder: wrap('<path fill="currentColor" d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3.8a1.5 1.5 0 0 1 1.06.44L10.7 6H19.5A1.5 1.5 0 0 1 21 7.5v10A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5Z"/>'),
    sword: wrap('<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M14.5 3H21v6.5L9 21.5 2.5 15ZM21 3 9.5 14.5M6 12l6 6"/>'),
    heart: wrap('<path fill="currentColor" d="M12 21.3 4.3 14a5 5 0 0 1 7.1-7.05l.6.6.6-.6A5 5 0 0 1 19.7 14Z"/>'),
    flame: wrap('<path fill="currentColor" d="M12 2c1 3 5 5 5 9a5 5 0 0 1-10 0c0-1.4.5-2.3 1.2-3.2C8.8 9 9 10 9.5 10.5 9 8 12 5 12 2Z"/>'),
    shield: wrap('<path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5Z"/>'),
  };

  window.ICONS = ICONS;
  // Helper: render an icon by name (returns empty string if missing).
  window.icon = (name) => ICONS[name] || '';
})();
