"""Draws the town on the face as a front view of the cliff: DM and player versions."""
import sys, os, math

OUT = sys.argv[1]
W, H = 1500, 1640
INK = "#2b2118"; BROWN = "#6b4a23"; RED = "#a3352a"; ROCK = "#d9ccb0"; ROCK2 = "#c4b28f"
LEDGE = "#8a6a43"; HOUSE = "#efe3c8"; ROOF = "#9c5b3b"; ROAD = "#7a5a35"; GREEN = "#6f8f4e"
PANEL = "#efe3c8"

T = {6: 370, 5: 600, 4: 830, 3: 1060, 2: 1290, 1: 1520}
SLOT = (1010, T[6])
GATE = (612, T[1])


def svg(dm):
    o = []
    a = o.append
    a(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="Georgia, \'Times New Roman\', serif">')
    a('<defs>'
      f'<pattern id="scree" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r="1.6" fill="{BROWN}" opacity="0.35"/><circle cx="10" cy="10" r="1.2" fill="{BROWN}" opacity="0.3"/></pattern>'
      f'<pattern id="rock" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M0 20 L18 14 L30 24 M34 50 L52 44 L60 48 M10 44 L20 38" stroke="{ROCK2}" stroke-width="1.4" fill="none"/></pattern>'
      '</defs>')
    # The face. The light is even and sourceless, so nothing casts a shadow.
    a(f'<rect width="{W}" height="{H}" fill="{ROCK}"/><rect width="{W}" height="{H}" fill="url(#rock)"/>')
    a(f'<rect x="0" y="0" width="{W}" height="58" fill="{PANEL}" stroke="{BROWN}" stroke-width="2"/>')
    title = "THE TOWN ON THE FACE — side view · DM" if dm else "THE TOWN ON THE FACE"
    a(f'<text x="24" y="39" font-size="27" font-weight="bold" fill="{INK}" letter-spacing="2">{title}</text>')
    sub = "Looking at the cliff from out in the great space. Not to scale." if dm else "What you can see from the ledge."
    a(f'<text x="{W-24}" y="37" font-size="15" font-style="italic" fill="{BROWN}" text-anchor="end">{sub}</text>')

    def tag(x, y, t, anchor="start", size=13.5, color=None, bold=False):
        a(f'<text x="{x}" y="{y}" font-size="{size}" font-style="italic" fill="{color or BROWN}" text-anchor="{anchor}"{" font-weight=\"bold\"" if bold else ""}>{t}</text>')

    # ---- the ledge road: switchbacks from the slot down to the lowest gate ----
    bends = 8
    road = [(SLOT[0], SLOT[1] + 5)]
    for k in range(1, bends):
        y = SLOT[1] + 5 + (GATE[1] - 80 - SLOT[1]) * k / (bends - 1)
        road.append((760 if k % 2 else 1100, round(y)))
    road.append(GATE)
    for i in range(1, len(road) - 2):
        (x1, y1), (x2, y2), (x3, y3) = road[i - 1], road[i], road[i + 1]
        a(f'<polygon points="{x1},{y1+8} {x2},{y2+8} {x3},{y3-6}" fill="url(#scree)"/>')
    pts = " ".join(f"{x},{y}" for x, y in road)
    a(f'<polyline points="{pts}" fill="none" stroke="{ROAD}" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/>')
    a(f'<polyline points="{pts}" fill="none" stroke="#b89a6c" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>')

    # ---- the patrol's stair: up from the slot, and on past it ----
    stair = [(SLOT[0], SLOT[1] - 40), (1075, 250), (985, 175), (1050, 95)]
    a(f'<polyline points="{" ".join(f"{x},{y}" for x, y in stair)}" fill="none" stroke="{ROAD}" stroke-width="8" stroke-dasharray="3 5" stroke-linecap="round"/>')
    a(f'<text x="1066" y="92" font-size="30" font-weight="bold" fill="{INK}">?</text>')

    # ---- the slot doorway ----
    a(f'<rect x="{SLOT[0]-9}" y="{SLOT[1]-72}" width="18" height="72" fill="{INK}"/>')
    a(f'<rect x="{SLOT[0]-25}" y="{SLOT[1]-2}" width="60" height="10" fill="{LEDGE}"/>')

    # ---- the hoist rope, the whole height of the town ----
    a(f'<line x1="652" y1="{T[6]-30}" x2="652" y2="{T[1]}" stroke="{BROWN}" stroke-width="2.5"/>')
    a(f'<line x1="640" y1="{T[6]-30}" x2="674" y2="{T[6]-30}" stroke="{BROWN}" stroke-width="5"/>')
    basket_y = (T[3] + T[2]) // 2
    a(f'<rect x="640" y="{basket_y}" width="24" height="18" fill="#c9a26b" stroke="{BROWN}" stroke-width="2"/>')

    def ledge(x1, x2, y):
        a(f'<rect x="{x1}" y="{y}" width="{x2-x1}" height="16" fill="{LEDGE}" rx="3"/>')

    def house(x, y, w, h, flap=True):
        a(f'<rect x="{x}" y="{y-h}" width="{w}" height="{h}" fill="{HOUSE}" stroke="{BROWN}" stroke-width="1.5"/>')
        a(f'<polygon points="{x-4},{y-h} {x+w/2},{y-h-22} {x+w+4},{y-h}" fill="{ROOF}"/>')
        dx = x + w / 2 - 7
        a(f'<rect x="{dx}" y="{y-26}" width="14" height="26" fill="{BROWN}"/>')
        if flap:
            a(f'<rect x="{dx+3}" y="{y-9}" width="8" height="9" fill="{INK}"/>')

    def bunting(x1, x2, y):
        a(f'<path d="M{x1} {y} Q{(x1+x2)/2} {y+16} {x2} {y}" fill="none" stroke="{BROWN}" stroke-width="1"/>')
        n = max(2, int((x2 - x1) / 18))
        cols = ["#c0563f", "#d9a441", "#5f7fa3", "#7a9a55"]
        for k in range(1, n):
            t = k / n
            bx = x1 + (x2 - x1) * t
            by = y + 32 * t * (1 - t)
            a(f'<polygon points="{bx-5:.1f},{by:.1f} {bx+5:.1f},{by:.1f} {bx:.1f},{by+10:.1f}" fill="{cols[k % 4]}" opacity="0.75"/>')

    def stairs(xa, ya, xb, yb):
        a(f'<polyline points="{xa},{ya} {xa+30},{(ya+yb)/2} {xb},{yb}" fill="none" stroke="{ROAD}" stroke-width="5" stroke-dasharray="2 4"/>')

    def rook(bx, by):
        a(f'<path d="M{bx-9} {by} Q{bx-4} {by-6} {bx} {by} Q{bx+4} {by-6} {bx+9} {by}" fill="none" stroke="{INK}" stroke-width="2.2"/>')

    # 6 the top terrace, and the tower on it
    ledge(260, 560, T[6])
    a(f'<rect x="365" y="150" width="70" height="{T[6]-150}" fill="{HOUSE}" stroke="{BROWN}" stroke-width="2"/>')
    a(f'<polygon points="355,150 400,84 445,150" fill="{ROOF}"/>')
    a(f'<rect x="390" y="176" width="20" height="30" rx="10" fill="{INK}"/>')
    house(285, T[6], 50, 50, flap=False)
    house(470, T[6], 60, 46, flap=False)

    # 5 the cistern terrace, in two pieces joined by a rope bridge
    ledge(200, 345, T[5]); ledge(430, 600, T[5])
    a(f'<path d="M345 {T[5]+4} Q387 {T[5]+28} 430 {T[5]+4}" fill="none" stroke="{BROWN}" stroke-width="2"/>')
    house(450, T[5], 60, 55)
    house(525, T[5], 55, 70)
    bunting(450, 580, T[5] - 98)

    # 4 the hoist terrace: the treadwheel, the tall house, the rookery, the float
    ledge(150, 330, T[4]); ledge(430, 640, T[4])
    a(f'<path d="M330 {T[4]+4} Q380 {T[4]+28} 430 {T[4]+4}" fill="none" stroke="{BROWN}" stroke-width="2"/>')
    house(165, T[4], 50, 46)
    house(250, T[4], 55, 50)
    house(445, T[4], 55, 150)
    nest_y = T[4] - 176
    a(f'<ellipse cx="472" cy="{nest_y}" rx="26" ry="9" fill="#7d5a32" stroke="{INK}" stroke-width="1"/>')
    for ex in (462, 472, 482):
        a(f'<ellipse cx="{ex}" cy="{nest_y-5}" rx="4" ry="5" fill="#3d4a5c"/>')
    for dx, dy in [(-60, -40), (45, -55), (90, -10), (-95, 10), (30, -95), (125, -45), (-125, -30)]:
        rook(472 + dx, nest_y + dy)
    wy = T[4] - 38
    a(f'<circle cx="592" cy="{wy}" r="36" fill="none" stroke="{BROWN}" stroke-width="5"/>')
    for k in range(6):
        ang = k * math.pi / 3
        a(f'<line x1="592" y1="{wy}" x2="{592+36*math.cos(ang):.1f}" y2="{wy+36*math.sin(ang):.1f}" stroke="{BROWN}" stroke-width="2"/>')
    a(f'<path d="M505 {T[4]-4} L555 {T[4]-4} L563 {T[4]-22} L497 {T[4]-22} Z" fill="#5f7fa3" stroke="{INK}" stroke-width="1"/>')
    a(f'<circle cx="510" cy="{T[4]-3}" r="4" fill="{INK}"/><circle cx="550" cy="{T[4]-3}" r="4" fill="{INK}"/>')

    # 3 the mess: tables, the fountain and the parade giant, the house-crab
    ledge(120, 660, T[3])
    a(f'<rect x="270" y="{T[3]-22}" width="70" height="22" fill="#cdbb98" stroke="{BROWN}" stroke-width="1.5"/>')
    a(f'<rect x="295" y="{T[3]-90}" width="20" height="68" fill="#a7814d" stroke="{INK}" stroke-width="1"/>')
    a(f'<circle cx="305" cy="{T[3]-102}" r="14" fill="#a7814d" stroke="{INK}" stroke-width="1"/>')
    a(f'<line x1="295" y1="{T[3]-78}" x2="276" y2="{T[3]-46}" stroke="#a7814d" stroke-width="7"/>')
    a(f'<line x1="315" y1="{T[3]-78}" x2="334" y2="{T[3]-46}" stroke="#a7814d" stroke-width="7"/>')
    a(f'<rect x="160" y="{T[3]-16}" width="90" height="6" fill="{BROWN}"/>')
    a(f'<rect x="360" y="{T[3]-16}" width="100" height="6" fill="{BROWN}"/>')
    house(135, T[3], 46, 56)
    house(500, T[3] - 10, 60, 48, flap=False)
    for lx in (498, 512, 548, 562):
        a(f'<path d="M{lx} {T[3]-12} L{lx + (-10 if lx < 530 else 10)} {T[3]}" stroke="#b5452f" stroke-width="4" fill="none"/>')
    a(f'<path d="M490 {T[3]-30} q-18 -6 -16 8" stroke="#b5452f" stroke-width="5" fill="none"/>')
    a(f'<circle cx="540" cy="{T[3]-88}" r="3" fill="#7fa7c9"/><circle cx="546" cy="{T[3]-99}" r="4" fill="#7fa7c9"/><circle cx="541" cy="{T[3]-110}" r="3" fill="#7fa7c9"/>')
    bunting(140, 290, T[3] - 125)
    bunting(340, 500, T[3] - 118)
    a(f'<path d="M120 {T[3]+8} C55 {T[3]+220} 150 {T[1]-60} 70 {H-20}" fill="none" stroke="{BROWN}" stroke-width="6" stroke-dasharray="10 6"/>')

    # 2 the kennels
    ledge(140, 640, T[2])
    for k in range(4):
        x = 200 + k * 62
        a(f'<rect x="{x}" y="{T[2]-44}" width="56" height="44" fill="{HOUSE}" stroke="{BROWN}" stroke-width="1.5"/>')
        a(f'<rect x="{x+12}" y="{T[2]-30}" width="32" height="30" fill="{BROWN}" opacity="0.8"/>')
    a(f'<polygon points="194,{T[2]-44} 330,{T[2]-64} 452,{T[2]-44}" fill="{ROOF}"/>')
    house(500, T[2], 60, 58)

    # 1 the lowest gate and its gatehouse, where the road arrives
    ledge(180, 625, T[1])
    house(220, T[1], 55, 52)
    house(300, T[1], 60, 64)
    a(f'<rect x="505" y="{T[1]-96}" width="100" height="96" fill="#d8c8a6" stroke="{BROWN}" stroke-width="2"/>')
    a(f'<path d="M530 {T[1]} L530 {T[1]-50} Q555 {T[1]-76} 580 {T[1]-50} L580 {T[1]} Z" fill="{BROWN}"/>')
    a(f'<rect x="548" y="{T[1]-14}" width="14" height="14" fill="{INK}"/>')
    a(f'<circle cx="555" cy="{T[1]-62}" r="7" fill="#c79a3a" stroke="{INK}" stroke-width="1"/>')
    for k in range(5):
        a(f'<rect x="{505 + k*22}" y="{T[1]-108}" width="12" height="12" fill="#d8c8a6" stroke="{BROWN}" stroke-width="1.5"/>')
    bunting(505, 605, T[1] - 92)

    stairs(270, T[6] + 8, 220, T[5])
    stairs(215, T[5] + 8, 170, T[4])
    stairs(160, T[4] + 8, 135, T[3])
    stairs(130, T[3] + 8, 155, T[2])
    stairs(150, T[2] + 8, 195, T[1])

    if not dm:
        tag(SLOT[0] + 22, SLOT[1] - 50, "YOU ARE HERE", size=19, color=RED, bold=True)
        tag(455, 230, "the tower", size=17, color=INK, bold=True)
        tag(690, T[3] + 60, "the town", size=17, color=INK, bold=True)
        tag(930, (T[3] + T[2]) // 2, "the road down", anchor="middle", size=16)
        tag(1100, 130, "a stair going up", size=15)
        a(f'<rect x="1150" y="1380" width="320" height="90" fill="{PANEL}" stroke="{BROWN}" stroke-width="2" rx="8"/>')
        tag(1170, 1415, "Far out in the space behind you,", size=16)
        tag(1170, 1440, "a mountain hangs in nothing.", size=16)
        a('</svg>')
        return "\n".join(o) + "\n"

    # ---------------- DM layer ----------------
    # the way to the tower, for later
    a(f'<polyline points="985,175 720,140 445,160" fill="none" stroke="{RED}" stroke-width="3" stroke-dasharray="8 7"/>')
    tag(720, 128, "the way to the tower, for later", anchor="middle", color=RED)
    tag(1092, 230, "the patrol's stair (on the slate)", color=INK)
    tag(1098, 120, "the mark")
    tag(SLOT[0] - 18, SLOT[1] - 50, "THE SLOT DOORWAY", anchor="end", size=15, color=INK, bold=True)
    tag(SLOT[0] - 18, SLOT[1] - 32, "the safe room;", anchor="end")
    tag(SLOT[0] - 18, SLOT[1] - 15, "the convoy four wait here", anchor="end")
    # labels sit in the open mouth of a switchback, clear of the road
    def mouth(i, lines, color=None):
        (x0, y0_), (x1, y1_), (x2, y2_) = road[i - 1], road[i], road[i + 1]
        cx = (x0 + x1 + x2) / 3 + (-40 if x1 > 900 else 40)
        cy = (y0_ + y1_ + y2_) / 3 - 8 * (len(lines) - 1)
        for k, ln in enumerate(lines):
            tag(round(cx), round(cy + 16 * k), ln, anchor="middle", size=12.5, color=color)
    mouth(2, ["the convoy fight,", "on the switchbacks"], color=INK)
    mouth(6, ["scree: slide it,", "beat 12 Dex; over", "the edge, next bend, 1d6"])

    # the cistern, cut into the rock under terrace 5
    y0 = T[5] + 16
    a(f'<path d="M248 {y0} C230 {y0+28} 207 {y0+80} 212 {y0+125} L330 {y0+125} C335 {y0+80} 312 {y0+28} 294 {y0} Z" fill="#e8dcc2" stroke="{RED}" stroke-width="2.5" stroke-dasharray="7 5"/>')
    a(f'<line x1="271" y1="{y0+4}" x2="271" y2="{y0+96}" stroke="{BROWN}" stroke-width="1.5"/>')
    a(f'<rect x="263" y="{y0+94}" width="16" height="12" fill="#c9a26b" stroke="{BROWN}"/>')
    for px in (234, 252, 290, 308):
        a(f'<circle cx="{px}" cy="{y0+113}" r="6" fill="{INK}"/>')
    a(f'<ellipse cx="271" cy="{T[5]-14}" rx="34" ry="16" fill="{GREEN}" stroke="{INK}" stroke-width="1.5"/>')
    a(f'<circle cx="252" cy="{T[5]-26}" r="5" fill="#e6d36a" stroke="{INK}"/><circle cx="268" cy="{T[5]-28}" r="5" fill="#e6d36a" stroke="{INK}"/>')
    a(f'<circle cx="400" cy="{T[6]-12}" r="8" fill="{RED}"/>')

    # short tags on the drawing
    tag(400, T[6] + 36, "Finch was taken up here", anchor="middle", color=RED, bold=True)
    tag(455, 230, "the tower", size=15, color=INK, bold=True)
    tag(212, T[5] - 40, "the hatch-toad", anchor="end")
    tag(204, y0 + 62, "the cistern:", anchor="end", color=RED)
    tag(204, y0 + 79, "4 of the Lastlight", anchor="end", color=RED)
    tag(204, y0 + 96, "five, 30 ft down", anchor="end", color=RED)
    tag(510, nest_y - 30, "the nest", anchor="start", color=INK)
    tag(395, nest_y - 70, "the rookery", anchor="middle", color=INK)
    tag(592, wy - 46, "treadwheel", anchor="middle")
    tag(530, T[4] + 34, "the float", anchor="middle")
    tag(305, T[3] - 122, "parade giant", anchor="middle", color=INK)
    a(f'<rect x="322" y="{T[3]-15}" width="12" height="9" fill="#c79a3a" stroke="{RED}" stroke-width="2"/>')
    tag(305, T[3] + 34, "the hoard, behind a loose stone", anchor="middle", color=RED, bold=True)
    tag(530, T[3] - 70, "house-crab", anchor="middle", color=INK)
    tag(330, T[2] + 34, "the kennels", anchor="middle")
    tag(555, T[1] + 34, "gatehouse and gong", anchor="middle")
    tag(70, H - 34, "the chute", anchor="middle", color=INK)
    tag(672, basket_y + 14, "hoist basket", color=INK)

    def marker(n, cx, cy, r=20, fs=22):
        a(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{RED}"/><text x="{cx}" y="{cy+fs*0.36:.0f}" font-size="{fs}" font-weight="bold" fill="#fff" text-anchor="middle">{n}</text>')

    for n, y in T.items():
        marker(n, 70, y + 8)

    # the key, down the right-hand side
    kx, ky, kw = 1140, 300, 340
    entries = [
        ("6", "THE TOP TERRACE", ["Finch was taken up here, toward", "the tower. Nobody goes up this trip."]),
        ("5", "THE CISTERN", ["3 goblin guards; the hatch-toad sits", "on the lid. 4 of the Lastlight five", "are at the bottom. Haul them up", "on the bucket rope."]),
        ("4", "THE HOIST", ["Tear-ogre in the treadwheel, 2 goblins.", "Rope bridges. The float in the yard.", "Rookery: 6 cliff-rooks and the old", "rook. Nest: spyglass, 3 eggs."]),
        ("3", "THE MESS", ["About 15 goblins. The parade giant", "on the fountain (3 goblins inside).", "The house-crab in its tiny cottage.", "THE HOARD: a loose stone in the", "fountain's base. Chute starts here."]),
        ("2", "THE KENNELS", ["3 crease-wolves, 2 keepers.", "Opened on the alarm."]),
        ("1", "THE LOWEST GATE", ["4 goblins and the gong. The", "gatehouse is the house the crab wants."]),
    ]
    y = ky
    a(f'<rect x="{kx-14}" y="{ky-44}" width="{kw+20}" height="1010" fill="{PANEL}" stroke="{BROWN}" stroke-width="2" rx="8" opacity="0.96"/>')
    a(f'<text x="{kx}" y="{ky-16}" font-size="17" font-weight="bold" fill="{INK}" letter-spacing="2">THE KEY</text>')
    for n, head, lines in entries:
        marker(n, kx + 14, y + 8, r=13, fs=15)
        a(f'<text x="{kx+36}" y="{y+14}" font-size="15" font-weight="bold" fill="{RED}" letter-spacing="1">{head}</text>')
        for k, ln in enumerate(lines):
            a(f'<text x="{kx+36}" y="{y+34+17*k}" font-size="13.5" fill="{INK}">{ln}</text>')
        y += 46 + 17 * len(lines)
    rows = [
        ("THE ALARM", ["Gong or horn: 1d4+2 goblins a round", "for 3 rounds, then the kennels open."]),
        ("IN", ["The delivery, the small door,", "or the front gate."]),
        ("OUT", ["The big fight, back down the road.", "Shortcuts: the chute, the hoist", "basket, the float, the rook's eggs."]),
        ("LIGHT", ["From everywhere and nowhere.", "Nothing casts a shadow."]),
    ]
    y += 6
    a(f'<line x1="{kx}" y1="{y-14}" x2="{kx+kw-10}" y2="{y-14}" stroke="{BROWN}" stroke-width="1"/>')
    for head, lines in rows:
        a(f'<text x="{kx}" y="{y+6}" font-size="14" font-weight="bold" fill="{RED}">{head}</text>')
        for k, ln in enumerate(lines):
            a(f'<text x="{kx}" y="{y+25+17*k}" font-size="13.5" fill="{INK}">{ln}</text>')
        y += 38 + 17 * len(lines)

    a('</svg>')
    return "\n".join(o) + "\n"


os.makedirs(OUT, exist_ok=True)
for name, dm in (("town-side-dm.svg", True), ("town-side-player.svg", False)):
    with open(os.path.join(OUT, name), "w", encoding="utf-8", newline="\n") as f:
        f.write(svg(dm))
print("ok")
