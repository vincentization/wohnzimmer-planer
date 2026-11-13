// Wohnzimmer EG – 3D-Möbelplaner (Three.js r147, ohne Build-Schritt)
// Plan-Koordinaten in Metern: (x, y) → Welt (x, 0, -y)

// ---------------------------------------------------------------- Raumdaten (Bauplan + Scan)
const ROOM = {"walls": [[[[5.87, 0.0], [5.87, 0.219], [9.861, 0.219], [9.861, 0.505], [10.08, 0.505], [10.08, 0.0]]], [[[9.861, 2.0], [9.861, 3.736], [6.854, 3.736], [6.854, 3.266], [6.854, 3.141], [6.729, 3.141], [4.95, 3.141], [4.95, 2.2], [4.8, 2.2], [4.8, 3.131], [4.8, 3.141], [4.8, 3.266], [4.95, 3.266], [6.729, 3.266], [6.729, 4.05], [6.854, 4.05], [6.854, 3.861], [9.861, 3.861], [9.861, 4.05], [10.08, 4.05], [10.08, 2.0]]], [[[-0.7052, 0.1477], [-0.5155, 0.2571], [-0.4935, 0.219], [3.98, 0.219], [3.98, 0.0], [-0.62, 0.0]]], [[[3.734, 3.63], [3.869, 3.63], [3.869, 3.276], [3.97, 3.276], [3.97, 3.141], [3.63, 3.141], [3.63, 3.276], [3.734, 3.276]]], [[[0.219, 3.276], [2.73, 3.276], [2.73, 3.141], [0.219, 3.141], [0.219, 2.641], [-0.4935, 2.641], [-0.5155, 2.6029], [-0.7052, 2.7123], [-0.62, 2.86], [0.0, 2.86], [0.0, 4.05], [0.219, 4.05]]], [[[-1.07, 0.93], [-0.851, 0.93], [-0.851, 0.8386], [-0.8253, 0.7942], [-1.015, 0.6847], [-1.07, 0.78]]], [[[-1.015, 2.1753], [-0.8253, 2.0658], [-0.851, 2.0214], [-0.851, 1.925], [-1.07, 1.925], [-1.07, 2.08]]]], "openings": [{"kind": "W", "poly": [[-1.08, 1.925], [-0.841, 1.925], [-0.841, 0.93], [-1.08, 0.93]]}, {"kind": "W", "poly": [[-0.7139, 2.7173], [-0.5068, 2.5979], [-0.8167, 2.0608], [-1.0237, 2.1803]]}, {"kind": "W", "poly": [[-0.8167, 0.7992], [-0.5068, 0.2621], [-0.7139, 0.1427], [-1.0237, 0.6797]]}, {"kind": "W", "poly": [[9.851, 0.505], [9.851, 2.0], [10.09, 2.0], [10.09, 0.505]]}, {"kind": "B", "poly": [[3.98, 0.229], [4.925, 0.229], [4.925, -0.01], [3.98, -0.01]]}, {"kind": "B", "poly": [[4.925, 0.229], [5.87, 0.229], [5.87, -0.01], [4.925, -0.01]]}, {"kind": "I", "poly": [[3.63, 3.286], [3.63, 3.131], [2.73, 3.131], [2.73, 3.286]]}, {"kind": "I", "poly": [[4.8, 3.276], [4.8, 3.131], [3.97, 3.131], [3.97, 3.276]]}], "floor": [[[[-0.851, 2.0214], [-0.4935, 2.641], [0.219, 2.641], [0.219, 3.141], [4.8, 3.141], [4.8, 2.2], [5.5, 2.2], [5.5, 3.141], [6.854, 3.141], [6.854, 3.736], [9.861, 3.736], [9.861, 3.141], [9.861, 0.219], [-0.4935, 0.219], [-0.851, 0.8386]]]], "context": [[[[3.869, 3.266], [3.869, 4.05], [6.729, 4.05], [6.729, 3.266]]], [[[0.219, 3.276], [0.219, 4.05], [3.734, 4.05], [3.734, 3.276]]]], "kamin": [4.95, 2.25, 5.5, 3.141], "area": 31.6744, "swings": [{"k": "line", "pts": [[3.98, 0.219], [3.98, 1.164]]}, {"k": "arc", "c": [3.98, 0.219], "r": 0.945, "a0": 0.0, "a1": 90.0}, {"k": "line", "pts": [[5.87, 0.219], [5.87, 1.164]]}, {"k": "arc", "c": [5.87, 0.219], "r": 0.945, "a0": 90.0, "a1": 180.0}, {"k": "line", "pts": [[3.63, 3.141], [3.63, 2.241]]}, {"k": "arc", "c": [3.63, 3.141], "r": 0.9, "a0": 180.0, "a1": -90.0}, {"k": "line", "pts": [[4.8, 3.141], [4.8, 2.311]]}, {"k": "arc", "c": [4.8, 3.141], "r": 0.83, "a0": 180.0, "a1": -90.0}]};
const H = 2.44;
// Wände am alten Kaminzug lt. Scan: 15 cm stark, lichter Abstand ca. 40 cm
const SCAN_WALLS = [[4.80, 1.90, 4.95, 3.141], [5.35, 1.90, 5.50, 3.141]];
// Eckkamin lt. Skizze vom 12.11.2026 (±5 cm)
const OFEN = (() => {
  const body = [[5.50, 2.33], [5.84, 2.33], [6.57, 2.85], [6.57, 3.141], [5.50, 3.141]];
  const hood = [[5.50, 2.62], [5.72, 2.62], [6.37, 3.141], [5.50, 3.141]];
  // Feuerraum-Öffnung auf der Schrägseite, 0,60 breit
  const A = [5.84, 2.33], B = [6.57, 2.85], L = Math.hypot(B[0] - A[0], B[1] - A[1]);
  const u = [(B[0] - A[0]) / L, (B[1] - A[1]) / L], n = [u[1], -u[0]];   // n zeigt in den Raum
  const at = (s, k) => [A[0] + u[0] * s + n[0] * k, A[1] + u[1] * s + n[1] * k];
  const s0 = L / 2 - 0.30, s1 = L / 2 + 0.30;
  const fire = [at(s0, 0.006), at(s1, 0.006), at(s1, -0.02), at(s0, -0.02)];
  const hearth = [at(-0.10, 0), at(L + 0.05, 0), at(L + 0.05, 0.40), at(-0.10, 0.40)];
  return { body, hood, fire, hearth };
})();
// Balkontür-Flügel (Aufschlag nach innen) als freizuhaltende Fläche
const SWING = [[3.98, 0.219], [5.87, 0.219], [5.87, 1.17], [3.98, 1.17]];

const de = (v, d = 2) => v.toFixed(d).replace('.', ',');
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const $ = id => document.getElementById(id);
// Umschalter in der 3D-Ansicht (aria-pressed)
const isOn = id => $(id).getAttribute('aria-pressed') === 'true';
const setOn = (id, on) => $(id).setAttribute('aria-pressed', String(on));
const rect = (a, b, c, d) => [[a, b], [c, b], [c, d], [a, d]];
// Alter Kaminzug sitzt zwischen den beiden Scan-Wänden
const KAMIN = rect(ROOM.kamin[0], ROOM.kamin[1], SCAN_WALLS[1][0], ROOM.kamin[3]);
const SCAN = SCAN_WALLS.map(([a, b, c, d]) => rect(a, b, c, d));
const OPEN_H = { W: [0.81, 2.37], B: [0, 2.26], I: [0, 2.01] };   // Öffnungen: Brüstung, Sturz (W = Fenster, B = Balkontür, I = Innentür)

// ---------------------------------------------------------------- Szene
THREE.ColorManagement.legacyMode = false;
const canvas = $('c'), stage = $('stage');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 100);
const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;
const CENTER = new THREE.Vector3(4.6, 0, -1.6);
const P2W = (x, y) => new THREE.Vector3(x, 0, -y);

scene.add(new THREE.HemisphereLight(0xffffff, 0xb8b0a4, 0.75));
const sun = new THREE.DirectionalLight(0xfff3e2, 0.7);
sun.position.set(2, 9, 6); sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 30 });
sun.target.position.copy(CENTER); scene.add(sun, sun.target);

const setBg = () => { scene.background = new THREE.Color(css('--stage')); };
setBg();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setBg);

// Laminat wie im Foto: graubraune Eichendielen, 20 cm breit, 1,20 m lang, versetzt verlegt, Dielen laufen Richtung Erker (Plan-x).
// Wird als Kachel von 2,40 × 1,60 m auf eine Canvas gemalt; der Boden hat UVs in Metern (Plan-Koordinaten).
function floorTexture() {
  const PX = 400, TW = 2.4, TH = 1.6, ROWS = 8, PL = 1.2;
  const c = document.createElement('canvas'); c.width = TW * PX; c.height = TH * PX;
  const g = c.getContext('2d'), rowH = c.height / ROWS, plankW = PL * PX;
  const rng = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
  const rnd = rng(11);
  function plank(x0, y0, seed) {   // gleiche seed → identische Diele (für den nahtlosen Umbruch)
    const r = rng(seed), l = 0.86 + r() * 0.28;
    g.save(); g.beginPath(); g.rect(x0, y0, plankW, rowH); g.clip();
    g.fillStyle = `rgb(${128 * l | 0},${96 * l | 0},${74 * l | 0})`; g.fillRect(x0, y0, plankW, rowH);
    for (let i = 0; i < 30; i++) {   // Maserung: feine, leicht gewellte Längsstreifen
      const y = y0 + r() * rowH, a = 0.05 + r() * 0.1, ph = r() * 6, amp = 1 + r() * 3;
      g.strokeStyle = r() < 0.7 ? `rgba(45,30,20,${a})` : `rgba(235,210,180,${a * 0.6})`;
      g.lineWidth = 0.6 + r() * 2.2;
      g.beginPath();
      for (let x = x0; x <= x0 + plankW + 24; x += 24) g.lineTo(x, y + Math.sin(x / 110 + ph) * amp);
      g.stroke();
    }
    g.fillStyle = 'rgba(30,20,12,0.55)'; g.fillRect(x0, y0, 2, rowH);           // Stoßfuge
    g.fillStyle = 'rgba(30,20,12,0.45)'; g.fillRect(x0, y0, plankW, 1.5);       // Längsfuge
    g.fillStyle = 'rgba(255,240,220,0.08)'; g.fillRect(x0, y0 + 1.5, plankW, 1.5);   // leichte Fase
    g.restore();
  }
  for (let row = 0; row < ROWS; row++) {
    const y0 = row * rowH, off = rnd() * plankW;
    for (let k = 0; k < 2; k++) {
      const seed = 1000 + row * 10 + k, x0 = off + k * plankW;
      plank(x0, y0, seed); plank(x0 - c.width, y0, seed);   // rechts überstehender Teil erscheint links wieder
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1 / TW, 1 / TH);
  t.encoding = THREE.sRGBEncoding; t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}

const M = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85, ...o });
const MAT = {
  wall: M(0xf2f0ea, { roughness: 0.95 }), floor: M(0xffffff, { map: floorTexture(), roughness: 0.55 }), ctx: M(0xb9b4aa),
  glass: M(0xa9c6d6, { transparent: true, opacity: 0.2, roughness: 0.1, depthWrite: false }),
  kamin: M(0x8d8a84), schrank: M(0xe6e1d6),
  ofen: M(0xa39e95, { roughness: 1 }), ofenHood: M(0xb3aea5, { roughness: 1 }), fire: M(0x1c1a18, { roughness: 0.9 }), hearth: M(0x4a4744, { roughness: 0.5 }),
  oak: M(0xb88a58, { roughness: 0.6 }), boucle: M(0x4b4743, { roughness: 1 }), leather: M(0x7a4e33, { roughness: 0.55 }),
  bronze: M(0x8d6b3f, { metalness: 0.6, roughness: 0.4 }), sofa: M(0x9a958c, { roughness: 1 }), sofa2: M(0x8a857c, { roughness: 1 }),
  side: M(0x3f3a35, { roughness: 0.6 }), rug: M(0xcfc6b5, { roughness: 1 }), plant: M(0x4e6b45), pot: M(0x6d6157),
  plantL: M(0x6a8a50), snake: M(0x44603d, { roughness: 0.6 }), olive: M(0x8a9874, { roughness: 1 }), cactus: M(0x5a7a4c),
  trunk: M(0x6a5644, { roughness: 1 }), soil: M(0x3a2e25, { roughness: 1 }), straw: M(0xb9a77e), plume: M(0xe3d8c2, { roughness: 1 }),
};

function shapeFrom(rings) {
  const s = new THREE.Shape(rings[0].map(([x, y]) => new THREE.Vector2(x, y)));
  for (const h of rings.slice(1)) s.holes.push(new THREE.Path(h.map(([x, y]) => new THREE.Vector2(x, y))));
  return s;
}
// Extrusion in Plan-Koordinaten, dann in Welt drehen (Plan y → -z, Extrusion → +y)
function extrude(rings, h0, h1, mat) {
  const g = new THREE.ExtrudeGeometry(shapeFrom(rings), { depth: h1 - h0, bevelEnabled: false });
  g.rotateX(-Math.PI / 2); g.translate(0, h0, 0);
  const m = new THREE.Mesh(g, mat); m.castShadow = m.receiveShadow = true; return m;
}
function flat(rings, y, mat) {
  const g = new THREE.ShapeGeometry(shapeFrom(rings)); g.rotateX(-Math.PI / 2); g.translate(0, y, 0);
  const m = new THREE.Mesh(g, mat); m.receiveShadow = true; return m;
}

// ---------------------------------------------------------------- Raum
const roomG = new THREE.Group(); scene.add(roomG);
let wallParts = [];   // Grundrisse aller festen Teile (für Kollision + Abstände)
function buildRoom() {
  roomG.clear();
  const cut = isOn('optCut'), top = cut ? 1.15 : H;
  ROOM.floor.forEach(p => roomG.add(flat(p, 0, MAT.floor)));
  ROOM.context.forEach(p => roomG.add(flat(p, -0.002, MAT.ctx)));
  // Türaufschläge als feine Spur auf dem Boden
  const swMat = new THREE.LineBasicMaterial({ color: 0x5a4632, transparent: true, opacity: 0.45 });
  for (const sw of ROOM.swings) {
    let pts;
    if (sw.k === 'line') pts = sw.pts.map(([x, y]) => P2W(x, y));
    else {
      const a1 = sw.a1 < sw.a0 ? sw.a1 + 360 : sw.a1; pts = [];
      for (let i = 0; i <= 32; i++) { const a = (sw.a0 + (a1 - sw.a0) * i / 32) * Math.PI / 180; pts.push(P2W(sw.c[0] + sw.r * Math.cos(a), sw.c[1] + sw.r * Math.sin(a))); }
    }
    pts.forEach(p => p.y = 0.004);
    roomG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), swMat));
  }
  ROOM.walls.forEach(p => roomG.add(extrude(p, 0, top, MAT.wall)));
  // Öffnungen: Brüstung / Sturz / Glas
  for (const o of ROOM.openings) {
    const ring = [o.poly], [sill, head] = OPEN_H[o.kind];
    if (sill > 0) roomG.add(extrude(ring, 0, Math.min(sill, top), MAT.wall));
    if (!cut) roomG.add(extrude(ring, head, H, MAT.wall));
    if (o.kind !== 'I') { const gl = extrude(ring, sill, Math.min(head, top), MAT.glass); gl.castShadow = false; roomG.add(gl); }
  }
  roomG.add(extrude([KAMIN], 0, top, MAT.kamin));
  // Gemauerter Eckkamin: Korpus bis 1,10 m, darüber schmalere Haube bis Decke
  roomG.add(extrude([OFEN.hearth], 0, 0.02, MAT.hearth));
  roomG.add(extrude([OFEN.body], 0, Math.min(1.10, top), MAT.ofen));
  if (top > 1.10) roomG.add(extrude([OFEN.hood], 1.10, top, MAT.ofenHood));
  roomG.add(extrude([OFEN.fire], 0.32, 0.92, MAT.fire));
  SCAN.forEach(r => roomG.add(extrude([r], 0, top, MAT.wall)));
  wallParts = [...ROOM.walls.map(p => p[0]), KAMIN, OFEN.body, OFEN.hearth, ...SCAN];
  buildPaint(top, cut);
}

// ---------------------------------------------------------------- Möbel (lokal: x = Länge, z = Tiefe, Vorderseite -z)
function bx(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y + h / 2, z); m.castShadow = m.receiveShadow = true; return m;
}
function cyl(r, h, mat, x = 0, y = 0, z = 0, seg = 20) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
  m.position.set(x, y + h / 2, z); m.castShadow = true; return m;
}
const group = (...parts) => { const g = new THREE.Group(); parts.forEach(p => g.add(p)); return g; };
// Pflanzen-Bausteine
const SPH = new THREE.SphereGeometry(1, 14, 10), UP = new THREE.Vector3(0, 1, 0), FWD = new THREE.Vector3(0, 0, 1);
const hr = k => { const v = Math.sin(k * 12.9898 + 4.1) * 43758.5453; return v - Math.floor(v); };   // feste Zufallszahl je k
function ell(rx, ry, rz, mat, x, y, z) { const m = new THREE.Mesh(SPH, mat); m.scale.set(rx, ry, rz); m.position.set(x, y, z); m.castShadow = true; return m; }
function stick(a, b, r, mat, seg = 6) {   // Zylinder von Punkt a nach Punkt b, oben etwas dünner
  const A = new THREE.Vector3(...a), d = new THREE.Vector3(...b).sub(A);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.75, r, d.length(), seg), mat);
  m.position.copy(A).addScaledVector(d, 0.5); m.quaternion.setFromUnitVectors(UP, d.normalize()); m.castShadow = true; return m;
}
function leaf(at, dir, len, wid, mat, th = 0.012) {   // flaches Ellipsoid, beginnt bei at und zeigt in Richtung dir
  const d = new THREE.Vector3(...dir).normalize(), m = new THREE.Mesh(SPH, mat);
  m.scale.set(wid / 2, th / 2, len / 2); m.position.set(...at).addScaledVector(d, len / 2);
  m.quaternion.setFromUnitVectors(FWD, d); m.castShadow = true; return m;
}
function pot(r, h) {   // konischer Topf mit Erde
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.78, h, 24), MAT.pot);
  m.position.y = h / 2; m.castShadow = m.receiveShadow = true;
  return group(m, cyl(r * 0.93, 0.01, MAT.soil, 0, h - 0.03, 0, 24));
}
const BUILD = {
  // 2,00 × 0,90. Ausgezogen nur zu einer Seite (side = ±1): zwei Einlegeplatten à 0,40 → 2,80
  table(ext, side = 1) {
    const g = new THREE.Group();
    const L = ext ? 2.8 : 2.0, D = 0.9, leg = 0.08, ins = 0.03, off = ext ? side * 0.4 : 0;
    g.add(bx(L, 0.04, D, MAT.oak, off, 0.71));
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(bx(leg, 0.71, leg, MAT.oak, off + sx * (L / 2 - ins - leg / 2), 0, sz * (D / 2 - ins - leg / 2)));
    const ax = L - 2 * (ins + leg), az = D - 2 * (ins + leg);   // Zarge
    for (const sz of [-1, 1]) g.add(bx(ax, 0.09, 0.025, MAT.oak, off, 0.62, sz * (D / 2 - ins - 0.02)));
    for (const sx of [-1, 1]) g.add(bx(0.025, 0.09, az, MAT.oak, off + sx * (L / 2 - ins - 0.02), 0.62, 0));
    if (ext) for (const sx of [1.0, 1.4]) g.add(bx(0.004, 0.002, D, MAT.fire, side * sx, 0.75));   // Fugen der Einlegeplatten
    return g;
  },
  bench: () => group(   // Rückenlehne auf +z
    bx(2.0, 0.1, 0.48, MAT.boucle, 0, 0.37, -0.03), bx(2.0, 0.42, 0.08, MAT.leather, 0, 0.45, 0.23),
    bx(0.05, 0.37, 0.5, MAT.bronze, -0.85), bx(0.05, 0.37, 0.5, MAT.bronze, 0.85)),
  chair: () => group(   // Lehne auf +z
    bx(0.5, 0.08, 0.48, MAT.boucle, 0, 0.39, -0.02), bx(0.5, 0.42, 0.06, MAT.leather, 0, 0.47, 0.22),
    cyl(0.03, 0.39, MAT.bronze), bx(0.5, 0.025, 0.05, MAT.bronze), bx(0.05, 0.025, 0.5, MAT.bronze)),
  // Korpus aus Platten mit Fächern; fronts: je Fach 'C' = Tür (geschlossen) oder 'O' = offen mit Einlegeböden. Rückseite lokal +z
  sideboard(s) {
    const T = 0.02, H = s.h - s.legs, y0 = s.legs, n = s.fronts.length, cw = (s.w - T) / n, front = -s.d / 2;
    const xAt = k => -s.w / 2 + T / 2 + k * cw;   // Mitte der k-ten senkrechten Platte
    const g = group(bx(s.w, T, s.d, MAT.side, 0, y0), bx(s.w, T, s.d, MAT.side, 0, y0 + H - T), bx(s.w, H, T, MAT.side, 0, y0, s.d / 2 - T / 2));
    for (let k = 0; k <= n; k++) g.add(bx(T, H, s.d, MAT.side, xAt(k), y0));   // Seiten + Trennwände
    for (let k = 0; k < n; k++) {
      const cx = xAt(k + 0.5);
      if (s.fronts[k] === 'C') {
        g.add(bx(cw - T, H - 2 * T, T, MAT.side, cx, y0 + T, front + T / 2));   // Tür
        g.add(bx(0.004, H - 0.02, 0.004, MAT.fire, xAt(k) + T / 2 + 0.002, y0 + 0.01, front));   // Fugen links/rechts
        g.add(bx(0.004, H - 0.02, 0.004, MAT.fire, xAt(k + 1) - T / 2 - 0.002, y0 + 0.01, front));
      } else for (let j = 1; j <= s.shelves; j++) g.add(bx(cw - T, T, s.d - T, MAT.side, cx, y0 + j * H / (s.shelves + 1) - T / 2, -T / 2));
    }
    const lx = s.w / 2 - 0.06, lz = s.d / 2 - 0.05;
    if (s.legs > 0.02) for (const sx of [-lx, lx]) for (const sz of [-lz, lz]) g.add(bx(0.03, s.legs, 0.03, MAT.bronze, sx, 0, sz));
    return g;
  },
  // L-Ecksofa: langer Schenkel 2,94 × 1,00, kurzer Schenkel 1,00 breit, 2,20 lang ab Rückenkante (m = -1: gespiegelt)
  sofa: (s, m = 1) => group(
    bx(2.94, 0.42, 1.0, MAT.sofa), bx(2.94, 0.38, 0.2, MAT.sofa2, 0, 0.42, 0.4),
    bx(1.0, 0.42, 1.2, MAT.sofa, 0.97 * m, 0, -1.1), bx(0.2, 0.38, 2.2, MAT.sofa2, 1.37 * m, 0.42, -0.6),
    bx(0.18, 0.2, 1.0, MAT.sofa2, -1.38 * m, 0.42, 0)),
  sofaR: () => BUILD.sofa(null, -1),
  coffee(s) {
    if (s.shape) {   // runde Platte auf drei Beinen
      const r = s.w / 2, g = group(cyl(r, 0.04, MAT.oak, 0, s.h - 0.04, 0, 48));
      for (let k = 0; k < 3; k++) { const a = k * 2 * Math.PI / 3; g.add(cyl(0.02, s.h - 0.04, MAT.bronze, Math.cos(a) * r * 0.6, 0, Math.sin(a) * r * 0.6)); }
      return g;
    }
    const g = group(bx(s.w, 0.05, s.d, MAT.oak, 0, s.h - 0.05), bx(s.w - 0.1, 0.04, s.d - 0.1, MAT.oak, 0, 0.05));   // Platte + Ablage
    const lx = s.w / 2 - 0.045, lz = s.d / 2 - 0.05;
    for (const sx of [-lx, lx]) for (const sz of [-lz, lz]) g.add(bx(0.04, s.h - 0.05, 0.04, MAT.bronze, sx, 0, sz));
    return g;
  },
  armchair: () => group(
    bx(0.8, 0.42, 0.85, MAT.sofa), bx(0.8, 0.4, 0.18, MAT.sofa2, 0, 0.42, 0.33),
    bx(0.14, 0.2, 0.85, MAT.sofa2, -0.33, 0.42), bx(0.14, 0.2, 0.85, MAT.sofa2, 0.33, 0.42)),
  rug(s) {   // flache Platte; rund/organisch aus dem Umriss extrudiert
    let m;
    if (s.shape) {
      const geo = new THREE.ExtrudeGeometry(new THREE.Shape(outline(s, 72).map(([x, z]) => new THREE.Vector2(x, -z))), { depth: 0.012, bevelEnabled: false });
      geo.rotateX(-Math.PI / 2); m = new THREE.Mesh(geo, MAT.rug); m.receiveShadow = true;
    } else m = bx(s.w, 0.012, s.d, MAT.rug);
    m.castShadow = false; return group(m);
  },
  shelf: () => group(bx(0.8, 1.9, 0.35, MAT.schrank)),
  tv() {   // 42″ an der Wand, Bildmitte ca. 1,10 m, Rückseite lokal +z
    const sc = bx(0.93, 0.52, 0.004, MAT.fire, 0, 0.84, -0.007); sc.castShadow = false;
    return group(bx(0.95, 0.56, 0.035, MAT.side, 0, 0.82, 0.0125), sc, bx(0.3, 0.2, 0.025, MAT.bronze, 0, 1.0, 0.0175));
  },
  lowboard(s) {   // Korpus auf Füßen, Fronten mit Fugen, Rückseite lokal +z
    const body = s.h - s.legs, g = group(bx(s.w, body, s.d, MAT.oak, 0, s.legs));
    for (let k = 1; k < s.doors; k++) g.add(bx(0.006, body - 0.02, 0.004, MAT.fire, -s.w / 2 + k * s.w / s.doors, s.legs + 0.01, -s.d / 2));
    const lx = s.w / 2 - 0.06, lz = s.d / 2 - 0.04;
    for (const sx of [-lx, lx]) for (const sz of [-lz, lz]) g.add(bx(0.03, s.legs, 0.03, MAT.bronze, sx, 0, sz));
    return g;
  },
  plant(s) {   // Blätter im Goldenen Winkel verteilt, Streuung über hr(k) → jedes Exemplar sieht gleich aus
    const g = new THREE.Group(), GA = 2.39996, cs = a => [Math.cos(a), Math.sin(a)];
    switch (s.id) {
      case 'monstera':
        g.add(pot(0.2, 0.32));
        for (let k = 0; k < 11; k++) {
          const [c, n] = cs(k * GA), r = 0.06 + 0.12 * hr(k), tip = [c * r, 0.5 + 0.4 * hr(k + 20), n * r];
          g.add(stick([c * 0.03, 0.3, n * 0.03], tip, 0.008, MAT.plantL));
          g.add(leaf(tip, [c, -0.15 - 0.3 * hr(k + 40), n], 0.3, 0.26, MAT.plant));
        }
        break;
      case 'ficus':   // Geigenfeige: Stamm, große Blätter im oberen Drittel
        g.add(pot(0.2, 0.38), stick([0, 0.36, 0], [0.03, 1.55, 0.01], 0.025, MAT.trunk));
        for (let k = 0; k < 26; k++) {
          const [c, n] = cs(k * GA), y = 0.85 + 0.7 * k / 26;
          g.add(leaf([0.03 * y / 1.55 + c * 0.02, y, n * 0.02], [c, 0.35 + 0.4 * hr(k + 9), n], 0.24, 0.17, MAT.plant));
        }
        break;
      case 'strelitzia':   // Paradiesvogelblume: lange Stiele mit aufrechten Paddelblättern
        g.add(pot(0.22, 0.4));
        for (let k = 0; k < 9; k++) {
          const [c, n] = cs(k * GA), out = 0.06 + 0.12 * hr(k), top = [c * out, 0.95 + 0.45 * hr(k + 3), n * out];
          g.add(stick([c * 0.04, 0.38, n * 0.04], top, 0.01, MAT.plantL));
          g.add(leaf(top, [c * 0.3, 1, n * 0.3], 0.45, 0.17, MAT.plant, 0.01));
        }
        break;
      case 'palm':   // Kentiapalme: überhängende Wedel mit Fiederblättern
        g.add(pot(0.22, 0.42));
        for (let k = 0; k < 8; k++) {
          const [c, n] = cs(k * Math.PI / 4 + 0.3 * hr(k)), h = 1.1 + 0.35 * hr(k + 5);
          const p0 = [c * 0.03, 0.4, n * 0.03], p1 = [c * 0.15, h, n * 0.15], p2 = [c * 0.42, h - 0.18, n * 0.42];
          g.add(stick(p0, p1, 0.01, MAT.plantL), stick(p1, p2, 0.007, MAT.plantL));
          for (let j = 0; j < 6; j++) {
            const t = (j + 0.5) / 6, at = p1.map((v, i) => v + (p2[i] - v) * t);
            for (const sg of [-1, 1]) g.add(leaf(at, [-n * sg + c * 0.3, -0.5, c * sg + n * 0.3], 0.22 - 0.08 * t, 0.045, MAT.plant, 0.006));
          }
        }
        break;
      case 'olive':   // Olivenbaum im eckigen Kübel
        g.add(bx(0.4, 0.4, 0.4, MAT.pot), bx(0.36, 0.01, 0.36, MAT.soil, 0, 0.385));
        g.add(stick([0, 0.38, 0], [0.04, 0.95, 0.02], 0.035, MAT.trunk), stick([0.04, 0.95, 0.02], [-0.02, 1.3, 0.03], 0.028, MAT.trunk),
          stick([0.04, 0.95, 0.02], [0.17, 1.32, -0.05], 0.018, MAT.trunk));
        for (let k = 0; k < 13; k++) {
          const [c, n] = cs(k * GA), r = 0.08 + 0.16 * hr(k), rr = 0.11 + 0.05 * hr(k + 3);
          g.add(ell(rr, 0.08, rr, MAT.olive, c * r, 1.32 + 0.28 * hr(k + 7), n * r));
        }
        break;
      case 'snake':   // Bogenhanf: steife, aufrechte Blätter
        g.add(pot(0.15, 0.3));
        for (let k = 0; k < 10; k++) {
          const [c, n] = cs(k * GA), r = 0.02 + 0.06 * hr(k), tl = 0.1 + 0.12 * hr(k + 4);
          g.add(leaf([c * r, 0.24, n * r], [c * tl, 1, n * tl], 0.5 + 0.4 * hr(k + 2), 0.07, MAT.snake, 0.01));
        }
        break;
      case 'cactus': {   // Säulenkaktus mit zwei Armen
        const C = MAT.cactus;
        g.add(pot(0.16, 0.26), cyl(0.075, 1.0, C, 0, 0.24, 0, 12), ell(0.075, 0.075, 0.075, C, 0, 1.24, 0));
        for (const [x, z, y, hh, r] of [[0.17, 0, 0.7, 0.3, 0.05], [-0.14, 0.03, 0.9, 0.2, 0.045]]) {
          g.add(stick([0, y, 0], [x, y, z], r, C, 10), ell(r, r, r, C, x, y, z), cyl(r, hh, C, x, y, z, 10), ell(r, r, r, C, x, y + hh, z));
        }
        break;
      }
      case 'grass': {   // Pampasgras in hoher Bodenvase
        const v = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.13, 0.55, 24), MAT.pot);
        v.position.y = 0.275; v.castShadow = true; g.add(v);
        for (let k = 0; k < 11; k++) {
          const [c, n] = cs(k * GA), sp = 0.12 + 0.2 * hr(k), tip = [c * sp, 1.3 + 0.45 * hr(k + 1), n * sp];
          g.add(stick([0, 0.5, 0], tip, 0.006, MAT.straw, 4), leaf(tip, [c * sp, tip[1] - 0.5, n * sp], 0.32, 0.08, MAT.plume, 0.06));
        }
        break;
      }
      default: {   // Busch
        const b = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), MAT.plant);
        b.position.y = 0.85; b.scale.y = 1.3; b.castShadow = true;
        g.add(cyl(0.18, 0.35, MAT.pot), b);
      }
    }
    return g;
  },
};
// main: Material(ien), die die gewählte Farbe bekommen (weitere etwas dunkler)
// versions: Ausführungen; ihre Felder (w, d, h, …) überschreiben die des Typs, die erste ist Standard
const TYPES = {
  table:     { name: 'Esstisch', w: 2.0, d: 0.9, set: true, main: ['oak'] },
  bench:     { name: 'Bank', w: 2.0, d: 0.55, set: true, main: ['boucle'] },
  chair:     { name: 'Stuhl', w: 0.5, d: 0.55, set: true, main: ['boucle'] },
  sideboard: { name: 'Sideboard', main: ['side'], anchorBack: true, versions: [
    { id: 'std', label: 'Standard', w: 2.33, d: 0.38, h: 0.84, legs: 0.12, fronts: 'CCCC' },
    { id: 'low', label: 'Lang & niedrig', w: 2.2, d: 0.42, h: 0.55, legs: 0.08, fronts: 'CCCC' },
    { id: 'high', label: 'Highboard', w: 1.2, d: 0.4, h: 1.3, legs: 0.1, fronts: 'CC' },
    { id: 'openWide', label: 'Offen, breit', w: 2.0, d: 0.38, h: 0.75, legs: 0.1, fronts: 'OOOO', shelves: 1 },
    { id: 'openTall', label: 'Offen, hoch', w: 1.0, d: 0.35, h: 1.1, legs: 0.05, fronts: 'OO', shelves: 2 },
    { id: 'mixed', label: 'Halb offen', w: 1.8, d: 0.4, h: 0.8, legs: 0.1, fronts: 'CCOO', shelves: 1 },
  ] },
  sofa:      { name: 'Ecksofa', w: 2.94, d: 1.0, main: ['sofa', 'sofa2'], foot: [[-1.47, -0.5, 1.47, 0.5], [0.47, -1.7, 1.47, -0.5]] },
  sofaR:     { name: 'Ecksofa (gespiegelt)', w: 2.94, d: 1.0, main: ['sofa', 'sofa2'], foot: [[-1.47, -0.5, 1.47, 0.5], [-1.47, -1.7, -0.47, -0.5]] },
  coffee:    { name: 'Couchtisch', main: ['oak'], versions: [
    { id: 'rect', label: 'Rechteckig', w: 1.05, d: 0.6, h: 0.4 },
    { id: 'square', label: 'Quadratisch', w: 0.8, d: 0.8, h: 0.38 },
    { id: 'round', label: 'Rund', w: 0.9, d: 0.9, h: 0.38, shape: 'ellipse' },
  ] },
  armchair:  { name: 'Sessel', w: 0.8, d: 0.85, main: ['sofa', 'sofa2'] },
  rug:       { name: 'Teppich', soft: true, main: ['rug'], versions: [
    { id: 'std', label: 'Standard', w: 3.0, d: 2.0 },
    { id: 'smallRect', label: 'Klein', w: 2.0, d: 1.4 },
    { id: 'big', label: 'Groß', w: 4.0, d: 3.0 },
    { id: 'square', label: 'Quadratisch', w: 2.5, d: 2.5 },
    { id: 'runner', label: 'Läufer 5 m', w: 5.0, d: 0.8 },
    { id: 'circleL', label: 'Rund groß', w: 2.4, d: 2.4, shape: 'ellipse' },
    { id: 'circleS', label: 'Rund klein', w: 1.2, d: 1.2, shape: 'ellipse' },
    { id: 'oval', label: 'Oval', w: 2.6, d: 1.7, shape: 'ellipse' },
    { id: 'organic', label: 'Organisch', w: 2.6, d: 1.8, shape: 'blob' },
  ] },
  shelf:     { name: 'Regal', w: 0.8, d: 0.35, main: ['schrank'] },
  plant:     { name: 'Pflanze', main: ['pot'], versions: [
    { id: 'bush', label: 'Busch', w: 0.5, d: 0.5 },
    { id: 'monstera', label: 'Monstera', w: 0.85, d: 0.85, shape: 'ellipse' },
    { id: 'ficus', label: 'Geigenfeige', w: 0.55, d: 0.55, shape: 'ellipse' },
    { id: 'strelitzia', label: 'Strelitzie', w: 0.6, d: 0.6, shape: 'ellipse' },
    { id: 'palm', label: 'Kentiapalme', w: 1.1, d: 1.1, shape: 'ellipse' },
    { id: 'olive', label: 'Olivenbaum', w: 0.65, d: 0.65, shape: 'ellipse' },
    { id: 'snake', label: 'Bogenhanf', w: 0.35, d: 0.35, shape: 'ellipse' },
    { id: 'cactus', label: 'Säulenkaktus', w: 0.45, d: 0.4, shape: 'ellipse' },
    { id: 'grass', label: 'Pampasgras', w: 0.7, d: 0.7, shape: 'ellipse' },
  ] },
  tv:        { name: 'TV an der Wand (42″)', w: 0.95, d: 0.06, soft: true, wall: true, main: ['side'] },
  lowboard:  { name: 'TV-Lowboard', wall: true, main: ['oak'], versions: [
    { id: 'std', label: 'Standard', w: 1.6, d: 0.4, h: 0.45, legs: 0.1, doors: 3 },
    { id: 'slim', label: 'Schmal & hoch', w: 1.2, d: 0.25, h: 0.75, legs: 0.12, doors: 2 },
    { id: 'deep', label: 'Tief & niedrig', w: 1.8, d: 0.55, h: 0.3, legs: 0.04, doors: 3 },
  ] },
};
const PALETTE = [
  { name: 'Standard', hex: '' }, { name: 'Eiche hell', hex: '#c8a273' }, { name: 'Nussbaum', hex: '#6e4b33' },
  { name: 'Weiß', hex: '#eeebe4' }, { name: 'Sand', hex: '#d6c6a8' }, { name: 'Grau', hex: '#8f8d87' },
  { name: 'Anthrazit', hex: '#3d3d3b' }, { name: 'Schwarz', hex: '#1e1d1c' }, { name: 'Salbei', hex: '#8da487' },
  { name: 'Terrakotta', hex: '#b4623e' }, { name: 'Petrol', hex: '#2e5d64' }, { name: 'Senf', hex: '#c6993b' },
];
// Typ + gewählte Ausführung zusammengeführt
function spec(p) {
  const t = TYPES[p.type], v = t.versions && (t.versions.find(x => x.id === p.v) || t.versions[0]);
  return v ? { ...t, ...v } : t;
}
// Umriss runder/organischer Formen in lokalen Koordinaten (x, z), passt genau in w × d.
// Wird für das 3D-Modell und für Kollision/Abstände verwendet.
function outline(s, n = 48) {
  const pts = Array.from({ length: n }, (_, k) => {
    const a = k * 2 * Math.PI / n;
    const r = s.shape === 'blob' ? 1 + 0.13 * Math.sin(2 * a + 0.6) + 0.09 * Math.sin(3 * a + 2.1) + 0.05 * Math.sin(5 * a + 0.3) : 1;
    return [Math.cos(a) * r, Math.sin(a) * r];
  });
  const fit = (v, i, size) => { const vs = pts.map(p => p[i]), lo = Math.min(...vs), hi = Math.max(...vs); return ((v - lo) / (hi - lo) - 0.5) * size; };
  return pts.map(([x, z]) => [fit(x, 0, s.w), fit(z, 1, s.d)]);
}
const ADDABLE = ['tv', 'lowboard', 'chair', 'armchair', 'coffee', 'rug', 'shelf', 'plant', 'sideboard'];

// ---------------------------------------------------------------- Varianten (rot in Grad gegen Uhrzeigersinn von oben)
function setAt(x, y, rot) {   // Tisch mit Bank (Süd) und 5 Stühlen um Tischmitte
  const c = Math.cos(rot * Math.PI / 180), s = Math.sin(rot * Math.PI / 180);
  const P = (lx, ly, r) => ({ x: x + lx * c - ly * s, y: y + lx * s + ly * c, rot: rot + r });
  return [
    { type: 'table', ...P(0, 0, 0) },
    { type: 'bench', ...P(0, -0.855, 0) },
    { type: 'chair', ...P(-0.6, 0.855, 180) }, { type: 'chair', ...P(0, 0.855, 180) }, { type: 'chair', ...P(0.6, 0.855, 180) },
    { type: 'chair', ...P(-1.325, 0, -90) }, { type: 'chair', ...P(1.325, 0, 90) },
  ];
}
const PRESETS = [
  { id: 'A', name: 'Variante A', note: 'Sofa steht wie heute',
    items: [...setAt(2.15, 1.36, 0), { type: 'sideboard', x: 1.40, y: 2.95, rot: 180 },
      { type: 'sofa', x: 9.361, y: 2.266, rot: 90 }, { type: 'coffee', x: 8.16, y: 1.75, rot: 90 }] },
];

// ---------------------------------------------------------------- Zustand
const furnG = new THREE.Group(); scene.add(furnG);
let pieces = [];        // {uid,type,x,y,rot,fromSet,extSide,obj}
let uidN = 1, selected = null, activeVariant = 'A';
let tableExt = false;   // Esstisch ausgezogen (2,80 m)
let moveWithSet = true; // Tisch zieht Bank + Stühle mit

// Auszugsrichtung: weg vom Erker (Westen) → die lokale Tischachse, die eher nach Osten zeigt
const extSideOf = p => p.extSide || (Math.cos(p.rot * Math.PI / 180) >= -1e-6 ? 1 : -1);
function makeObj(p) {
  const s = spec(p);
  const o = p.type === 'table' ? BUILD.table(tableExt, extSideOf(p)) : BUILD[p.type](s);
  // Farbe: Hauptmaterial(ien) durch eingefärbte Kopie ersetzen
  const tinted = new Map(p.color ? s.main.map((k, i) => {
    const m = MAT[k].clone(); m.color.set(p.color); if (i) m.color.multiplyScalar(0.88); return [MAT[k], m];
  }) : []);
  o.traverse(m => { m.userData.uid = p.uid; if (tinted.has(m.material)) m.material = tinted.get(m.material); });
  return o;
}
function rebuild(p) { furnG.remove(p.obj); p.obj = makeObj(p); furnG.add(p.obj); place(p); }
function place(p) { p.obj.position.copy(P2W(p.x, p.y)); p.obj.rotation.y = p.rot * Math.PI / 180; }
function addPiece(d) {
  const p = { uid: uidN++, type: d.type, x: d.x, y: d.y, rot: d.rot || 0, fromSet: !!TYPES[d.type].set, extSide: d.extSide, v: d.v, color: d.color };
  p.obj = makeObj(p); furnG.add(p.obj); pieces.push(p); place(p); return p;
}
function loadItems(items) { furnG.clear(); pieces = []; selected = null; items.forEach(addPiece); refresh(); }
// Nur der Stirnstuhl auf der Auszugsseite rückt um 0,80 nach außen
function shiftEndChairs(delta) {
  for (const t of pieces.filter(p => p.type === 'table')) {
    const c = Math.cos(t.rot * Math.PI / 180), s = Math.sin(t.rot * Math.PI / 180), side = extSideOf(t);
    for (const q of pieces) {
      if (q.type !== 'chair' || !q.fromSet) continue;
      const dx = q.x - t.x, dy = q.y - t.y, lx = dx * c + dy * s, ly = -dx * s + dy * c;
      if (Math.sign(lx) === side && Math.abs(lx) > 1.0 && Math.abs(lx) < 2.4 && Math.abs(ly) < 0.5) { q.x += c * side * delta; q.y += s * side * delta; place(q); }
    }
  }
}
function setExt(on) {
  if (on === tableExt) return;
  tableExt = on;
  for (const p of pieces.filter(p => p.type === 'table')) { p.extSide = on ? extSideOf({ rot: p.rot }) : undefined; rebuild(p); }
  shiftEndChairs(on ? 0.8 : -0.8);
  markCustom(); refresh();
}
// Wandmöbel (TV, Lowboard): an die nächste Wand setzen, Rückseite zur Wand
function snapToWall(p) {
  let best = null;
  for (const d of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const t = rayDist([p.x, p.y], d); if (t < (best ? best.t : 3)) best = { t, d }; }
  if (!best) return;
  const [dx, dy] = best.d, off = spec(p).d / 2 + 0.005;   // Mitte liegt halbe Tiefe vor der Wand
  p.rot = Math.atan2(dx, -dy) * 180 / Math.PI;
  p.x += dx * (best.t - off); p.y += dy * (best.t - off); place(p);
}
const snapshot = () => pieces.map(({ type, x, y, rot, extSide, v, color }) =>
  ({ type, x: +x.toFixed(3), y: +y.toFixed(3), rot: +rot.toFixed(1), ...(extSide ? { extSide } : {}), ...(v ? { v } : {}), ...(color ? { color } : {}) }));

// ---------------------------------------------------------------- Geometrie 2D (Plan)
function footprint(p) {
  const t = spec(p);
  let polys = t.shape ? [outline(t)] : (t.foot || [[-t.w / 2, -t.d / 2, t.w / 2, t.d / 2]]).map(r => rect(...r));
  if (p.type === 'table' && tableExt) { const sd = extSideOf(p); polys = [rect(sd > 0 ? -1.0 : -1.8, -t.d / 2, sd > 0 ? 1.8 : 1.0, t.d / 2)]; }
  const c = Math.cos(p.rot * Math.PI / 180), s = Math.sin(p.rot * Math.PI / 180);
  // lokale Tiefe z entspricht Plan -y
  return polys.map(poly => poly.map(([lx, lz]) => [p.x + lx * c + lz * s, p.y + lx * s - lz * c]));
}
const segsOf = poly => poly.map((a, i) => [a, poly[(i + 1) % poly.length]]);
function segX(a, b, c, d) {
  const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]));
  return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0;
}
function inPoly(pt, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function polyHit(A, B) {
  for (const [a, b] of segsOf(A)) for (const [c, d] of segsOf(B)) if (segX(a, b, c, d)) return true;
  return A.some(p => inPoly(p, B)) || B.some(p => inPoly(p, A));
}
function shrink(poly, e) {   // leicht verkleinern, damit Berührung keine Kollision ist
  const cx = poly.reduce((s, p) => s + p[0], 0) / poly.length, cy = poly.reduce((s, p) => s + p[1], 0) / poly.length;
  return poly.map(([x, y]) => { const dx = x - cx, dy = y - cy, l = Math.hypot(dx, dy) || 1; return [x - dx / l * e, y - dy / l * e]; });
}
function rayDist(o, dir) {
  let best = Infinity;
  for (const poly of wallParts) for (const [a, b] of segsOf(poly)) {
    const ex = b[0] - a[0], ey = b[1] - a[1];
    const den = dir[0] * ey - dir[1] * ex; if (Math.abs(den) < 1e-9) continue;
    const t = ((a[0] - o[0]) * ey - (a[1] - o[1]) * ex) / den;
    const u = ((a[0] - o[0]) * dir[1] - (a[1] - o[1]) * dir[0]) / den;
    if (t > 1e-6 && u >= 0 && u <= 1) best = Math.min(best, t);
  }
  return best;
}
function issues(p) {
  const out = [], fp = footprint(p).map(r => shrink(r, 0.01));
  const solid = p.type === 'rug' ? wallParts.filter(w => w !== OFEN.hearth) : wallParts;   // Teppich darf über die flache Ofenplatte ragen
  if (fp.some(r => solid.some(w => polyHit(r, w)))) out.push('steht in einer Wand');
  if (TYPES[p.type].soft) return out;
  if (fp.some(r => polyHit(r, SWING))) out.push('im Aufschlag der Balkontür');
  for (const q of pieces) {
    if (q === p || TYPES[q.type].soft) continue;
    if (p.fromSet && q.fromSet && p.type !== q.type && (p.type === 'table' || q.type === 'table')) continue;   // Stühle unter Tisch erlaubt
    if (footprint(q).some(r2 => fp.some(r => polyHit(r, shrink(r2, 0.01))))) { out.push('überschneidet ' + TYPES[q.type].name); break; }
  }
  return out;
}

// ---------------------------------------------------------------- Wandfarben
// Jede raumseitige Wandfläche bekommt eine Farbschicht 3 mm vor der Wand. Flächen in derselben Flucht
// (einschließlich Brüstung und Sturz der Öffnungen) bilden zusammen eine Wand, die man anklicken und einfärben kann.
const WALL_PALETTE = [
  { name: 'Standard', hex: '' }, { name: 'Altweiß', hex: '#ece6d8' }, { name: 'Greige', hex: '#cfc6b8' },
  { name: 'Sand', hex: '#dccbad' }, { name: 'Hellgrau', hex: '#c8cac6' }, { name: 'Salbei', hex: '#a9b8a0' },
  { name: 'Olivgrün', hex: '#7d8462' }, { name: 'Taubenblau', hex: '#8e9eab' }, { name: 'Petrol', hex: '#335b63' },
  { name: 'Terrakotta', hex: '#c07a5a' }, { name: 'Ocker', hex: '#c9a25a' }, { name: 'Anthrazit', hex: '#4a4b4a' },
];
const area2 = poly => poly.reduce((s, [x, y], i) => { const [x2, y2] = poly[(i + 1) % poly.length]; return s + x * y2 - x2 * y; }, 0);
const SOLIDS = [...ROOM.walls.map(p => p[0]), KAMIN, ...SCAN];
const CHIMNEY_AREA = rect(4.8, 2.2, 5.5, 3.141);   // Aussparung im Boden am Kaminzug (Nische zwischen den Scan-Wänden)
const inRoom = pt => (inPoly(pt, ROOM.floor[0][0]) || inPoly(pt, CHIMNEY_AREA)) && !SOLIDS.some(s => inPoly(pt, s));
const WALLS = (() => {
  // 1. Kanten aller Wand- und Öffnungs-Umrisse abtasten; sichtbar ist, was 3 cm davor im Raum liegt
  const STEP = 0.025, OFF = 0.03, pcs = [];
  const srcs = [...SOLIDS.map(poly => ({ poly, kind: 'S', chim: poly === KAMIN || SCAN.includes(poly) })), ...ROOM.openings.map(o => ({ poly: o.poly, kind: o.kind }))];
  for (const { poly, kind, chim } of srcs) {
    const sg = Math.sign(area2(poly));
    for (const [a, b] of segsOf(poly)) {
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); if (L < 0.02) continue;
      const n = [sg * dy / L, -sg * dx / L], N = Math.max(1, Math.round(L / STEP)), at = t => [a[0] + dx * t, a[1] + dy * t];
      let i0 = -1;
      for (let i = 0; i <= N; i++) {
        const q = at((i + 0.5) / N), ok = i < N && inRoom([q[0] + n[0] * OFF, q[1] + n[1] * OFF]);
        if (ok && i0 < 0) i0 = i;
        else if (!ok && i0 >= 0) { pcs.push({ a: at(i0 / N), b: at(i / N), n, kind, chim, off: n[0] * a[0] + n[1] * a[1] }); i0 = -1; }
      }
    }
  }
  // 2. Gleiche Richtung, gleiche Flucht (±2,5 cm) und lückenlos (±6 cm) → eine Wand
  pcs.forEach(p => { const s = [p.a, p.b].map(q => -p.n[1] * q[0] + p.n[0] * q[1]); p.s0 = Math.min(...s); p.s1 = Math.max(...s); });
  const root = pcs.map((_, i) => i), find = i => root[i] === i ? i : (root[i] = find(root[i]));
  for (let i = 0; i < pcs.length; i++) for (let j = i + 1; j < pcs.length; j++) {
    const p = pcs[i], q = pcs[j];
    if (p.n[0] * q.n[0] + p.n[1] * q.n[1] > 0.999 && Math.abs(p.off - q.off) < 0.025 && p.s0 < q.s1 + 0.06 && q.s0 < p.s1 + 0.06) root[find(i)] = find(j);
  }
  const groups = new Map();
  pcs.forEach((p, i) => { const r = find(i); if (!groups.has(r)) groups.set(r, []); groups.get(r).push(p); });
  // 3. Name nach Himmelsrichtung (Plan: +x = Ost, +y = Nord); die Wand liegt entgegen der Raumnormalen
  const DIR = ['Ost', 'Nordost', 'Nord', 'Nordwest', 'West', 'Südwest', 'Süd', 'Südost'];
  const dirOf = v => DIR[((Math.round(Math.atan2(v[1], v[0]) / (Math.PI / 4)) % 8) + 8) % 8];
  return [...groups.values()].map(ps => {
    const solid = ps.filter(p => p.kind === 'S'), ref = solid[0] || ps[0], n = ref.n;
    const s0 = Math.min(...ps.map(p => p.s0)), s1 = Math.max(...ps.map(p => p.s1));
    const mx = ps.reduce((s, p) => s + p.a[0] + p.b[0], 0) / (2 * ps.length);
    const name = solid.some(p => p.chim) ? `Kaminzug, ${dirOf(n)}seite` : `${dirOf([-n[0], -n[1]])}wand${mx < 0 ? ' (Erker)' : ''}`;
    const key = `${Math.round(Math.atan2(n[1], n[0]) * 180 / Math.PI)}:${ref.off.toFixed(2)}:${s0.toFixed(1)}`;
    return { key, name, len: s1 - s0, pieces: ps, mat: MAT.wall.clone(), mesh: null };
  }).filter(w => w.len >= 0.03);
})();
const paintG = new THREE.Group(); scene.add(paintG);
let wallColors = {};   // Wand-key → '#rrggbb'
let selWall = null;    // key der gewählten Wand
function buildPaint(top, cut) {
  paintG.clear();
  for (const w of WALLS) {
    const pos = [];
    for (const p of w.pieces) {
      const [sill, head] = OPEN_H[p.kind] || [0, 0];
      const spans = p.kind === 'S' ? [[0, top]] : [[0, Math.min(sill, top)], ...(cut ? [] : [[head, H]])];
      const A = [p.a[0] + p.n[0] * 0.003, p.a[1] + p.n[1] * 0.003], B = [p.b[0] + p.n[0] * 0.003, p.b[1] + p.n[1] * 0.003];
      const front = (B[1] - A[1]) * p.n[0] - (B[0] - A[0]) * p.n[1] > 0;   // Vorderseite zeigt in den Raum
      for (const [h0, h1] of spans) {
        if (h1 - h0 < 0.005) continue;
        const a0 = [A[0], h0, -A[1]], b0 = [B[0], h0, -B[1]], b1 = [B[0], h1, -B[1]], a1 = [A[0], h1, -A[1]];
        pos.push(...(front ? [a0, b0, b1, a0, b1, a1] : [a0, b1, b0, a0, a1, b1]).flat());
      }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.computeVertexNormals();
    w.mesh = new THREE.Mesh(g, w.mat); w.mesh.receiveShadow = true; w.mesh.userData.wall = w.key; paintG.add(w.mesh);
  }
}
function paintWalls() {
  for (const w of WALLS) {
    w.mat.color.copy(wallColors[w.key] ? new THREE.Color(wallColors[w.key]) : MAT.wall.color);
    w.mat.emissive.setHex(w.key === selWall ? 0xd08a3c : 0); w.mat.emissiveIntensity = 0.12;   // gewählte Wand leicht aufgehellt
  }
}
function setWallColor(keys, hex) {
  for (const k of keys) { if (hex) wallColors[k] = hex; else delete wallColors[k]; }
  paintWalls(); markCustom();
}

// ---------------------------------------------------------------- Anzeige: Auswahl, Abstände, Hervorhebung
const labelsEl = $('labels');
const dimG = new THREE.Group(); scene.add(dimG);
let dims = [];   // {a, b, val}
const selBox = new THREE.BoxHelper(undefined, 0xd08a3c); selBox.visible = false; scene.add(selBox);

function computeDims(p) {
  dims = [];
  if (!p || !isOn('optDims')) return;
  const pts = footprint(p).flat(), xs = pts.map(q => q[0]), ys = pts.map(q => q[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  for (const [o, d] of [[[x1, cy], [1, 0]], [[x0, cy], [-1, 0]], [[cx, y1], [0, 1]], [[cx, y0], [0, -1]]]) {
    const t = rayDist(o, d); if (!isFinite(t) || t > 6 || t < 0.05) continue;   // anliegende Seiten nicht bemaßen
    dims.push({ a: o, b: [o[0] + d[0] * t, o[1] + d[1] * t], val: t });
  }
}
function drawDims() {
  dimG.clear();
  const mat = new THREE.LineBasicMaterial({ color: new THREE.Color(css('--sel') || '#d08a3c') });
  for (const d of dims) dimG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([P2W(...d.a).setY(0.02), P2W(...d.b).setY(0.02)]), mat));
}
function updateLabels() {
  labelsEl.innerHTML = '';
  const r = canvas.getBoundingClientRect();
  for (const d of dims) {
    const v = P2W((d.a[0] + d.b[0]) / 2, (d.a[1] + d.b[1]) / 2).setY(0.05).project(camera);
    if (v.z > 1) continue;
    const el = document.createElement('div'); el.className = 'lbl' + (d.val < 0.6 ? ' bad' : '');
    el.textContent = de(d.val) + ' m';
    el.style.left = ((v.x + 1) / 2 * r.width) + 'px'; el.style.top = ((1 - v.y) / 2 * r.height) + 'px';
    labelsEl.appendChild(el);
  }
}
// Problemfälle rot einfärben (Original-Material bleibt in userData.base)
function highlight() {
  for (const p of pieces) {
    const bad = issues(p).length > 0;
    p.obj.traverse(m => {
      if (!m.isMesh) return;
      const base = m.userData.base || (m.userData.base = m.material);
      if (!bad) m.material = base;
      else if (m.material === base) { m.material = base.clone(); m.material.emissive.setHex(0x9a1b14); m.material.emissiveIntensity = 0.55; }
    });
  }
}
function renderSel() {
  const el = $('sel');
  if (!selected && selWall) { renderWallSel(el); selBox.visible = false; return; }
  if (!selected) { el.innerHTML = '<p class="sel-empty">Ein Möbelstück anklicken, um es zu bewegen und Abstände zu sehen, oder eine Wand anklicken, um sie zu streichen.</p>'; selBox.visible = false; return; }
  const p = selected, t = spec(p);
  const w = p.type === 'table' && tableExt ? 2.8 : t.w;
  const iss = issues(p), minD = dims.length ? Math.min(...dims.map(x => x.val)) : null;
  const stdColor = '#' + MAT[t.main[0]].color.getHexString();
  el.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><strong>${t.name}</strong>
      <span class="num" style="color:var(--muted);font-size:12px">${t.shape === 'ellipse' && t.w === t.d ? 'Ø ' + de(w) : de(w) + ' × ' + de(t.d)} m</span></div>
    <dl class="kv" style="margin:8px 0">
      <dt>Position</dt><dd class="num">${de(p.x)} / ${de(p.y)} m</dd>
      <dt>Drehung</dt><dd class="num">${Math.round(((p.rot % 360) + 360) % 360)}°</dd>
      ${minD !== null ? `<dt>Nächste Wand</dt><dd class="num">${de(minD)} m</dd>` : ''}
    </dl>
    ${iss.length ? `<p class="warn">⚠ ${iss.join(', ')}</p>` : '<p class="okc">Frei gestellt</p>'}
    ${t.versions ? `<div class="opt"><span class="opt-l">Ausführung</span><div class="row">
      ${t.versions.map(v => `<button class="btn" data-v="${v.id}" aria-pressed="${v.id === t.id}">${v.label}</button>`).join('')}</div></div>` : ''}
    <div class="opt"><span class="opt-l">Farbe</span><div class="swatches">
      ${PALETTE.map(c => `<button class="sw" data-c="${c.hex}" title="${c.name}" aria-label="Farbe ${c.name}" aria-pressed="${(p.color || '') === c.hex}" style="background:${c.hex || stdColor}"></button>`).join('')}</div></div>
    <div class="row" style="margin-top:12px">
      <button class="btn" data-r="90" title="90° gegen den Uhrzeigersinn">↺ 90°</button><button class="btn" data-r="-90" title="90° im Uhrzeigersinn">↻ 90°</button>
      ${p.type === 'table' ? `<button class="btn" id="extSel">${tableExt ? 'Zusammenschieben (2,00)' : 'Ausziehen (2,80)'}</button>
        <button class="btn" id="moveSet">Set mitnehmen: ${moveWithSet ? 'an' : 'aus'}</button>` : ''}
      ${p.type.startsWith('sofa') ? '<button class="btn" id="flipSofa">L spiegeln</button>' : ''}
      <button class="btn" id="delSel">Entfernen</button>
    </div>`;
  el.querySelectorAll('[data-r]').forEach(b => b.onclick = () => rotateSel(+b.dataset.r));
  // Ausführung wechseln: Wandmöbel neu an die Wand setzen; bei anchorBack bleibt die Rückkante stehen (Tiefe wächst nach vorn)
  el.querySelectorAll('[data-v]').forEach(b => b.onclick = () => {
    p.v = b.dataset.v;
    if (t.anchorBack) {
      const grow = (spec(p).d - t.d) / 2, a = p.rot * Math.PI / 180;   // Verschiebung Richtung Vorderseite (lokal -z)
      p.x -= grow * Math.sin(a); p.y += grow * Math.cos(a);
    }
    rebuild(p); if (t.wall) snapToWall(p); markCustom(); refresh();
  });
  el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { p.color = b.dataset.c || undefined; rebuild(p); markCustom(); refresh(); });
  $('delSel').onclick = delSel;
  if (p.type === 'table') {
    $('extSel').onclick = () => setExt(!tableExt);
    $('moveSet').onclick = () => { moveWithSet = !moveWithSet; renderSel(); };
  }
  if (p.type.startsWith('sofa')) $('flipSofa').onclick = () => { p.type = p.type === 'sofa' ? 'sofaR' : 'sofa'; rebuild(p); markCustom(); refresh(); };
  selBox.setFromObject(p.obj); selBox.visible = true;
}
function renderWallSel(el) {
  const w = WALLS.find(x => x.key === selWall), cur = wallColors[w.key] || '', std = '#' + MAT.wall.color.getHexString();
  const custom = cur && !WALL_PALETTE.some(c => c.hex === cur);
  el.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><strong>${w.name}</strong>
      <span class="num" style="color:var(--muted);font-size:12px">${de(w.len)} m</span></div>
    <div class="opt"><span class="opt-l">Wandfarbe</span><div class="swatches">
      ${WALL_PALETTE.map(c => `<button class="sw" data-wc="${c.hex}" title="${c.name}" aria-label="Wandfarbe ${c.name}" aria-pressed="${cur === c.hex}" style="background:${c.hex || std}"></button>`).join('')}
      <label class="sw sw-custom${custom ? ' on' : ''}" title="Eigene Farbe"${custom ? ` style="background:${cur}"` : ''}><input type="color" id="wcPick" value="${cur || std}" aria-label="Eigene Wandfarbe"></label>
    </div></div>
    <div class="row" style="margin-top:12px">
      <button class="btn" id="wAll">Farbe für alle Wände</button>
      <button class="btn" id="wReset">Alle zurücksetzen</button>
    </div>`;
  el.querySelectorAll('[data-wc]').forEach(b => b.onclick = () => { setWallColor([w.key], b.dataset.wc); renderSel(); });
  const pick = $('wcPick');
  pick.oninput = () => setWallColor([w.key], pick.value);   // live, ohne das Panel neu zu zeichnen (Farbwähler bleibt offen)
  pick.onchange = () => renderSel();
  $('wAll').onclick = () => { setWallColor(WALLS.map(x => x.key), cur); renderSel(); };
  $('wReset').onclick = () => { wallColors = {}; paintWalls(); markCustom(); renderSel(); };
}
function refresh() { computeDims(selected); drawDims(); highlight(); renderSel(); renderVariants(); }

// ---------------------------------------------------------------- Interaktion
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let drag = null, downAt = null;
function ndcOf(e) { const r = canvas.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); }
function floorHit() { const v = new THREE.Vector3(); ray.setFromCamera(ndc, camera); return ray.ray.intersectPlane(floorPlane, v) ? v : null; }
const byUid = uid => pieces.find(p => p.uid === uid);
function setPartners(p) {
  if (p.type !== 'table' || !moveWithSet) return [];
  return pieces.filter(q => q !== p && q.fromSet && q.type !== 'table' && Math.hypot(q.x - p.x, q.y - p.y) < 1.8);
}
canvas.addEventListener('pointerdown', e => {
  ndcOf(e); ray.setFromCamera(ndc, camera);
  const hits = ray.intersectObjects(furnG.children, true).filter(h => h.object.userData.uid);
  // Teppich nur wählen, wenn nichts anderes getroffen
  hits.sort((a, b) => (byUid(a.object.userData.uid).type === 'rug') - (byUid(b.object.userData.uid).type === 'rug'));
  if (!hits.length) { drag = null; downAt = [e.clientX, e.clientY]; return; }
  const p = byUid(hits[0].object.userData.uid), f = floorHit();
  selected = p; selWall = null; paintWalls(); controls.enabled = false;
  drag = { p, off: f ? [p.x - f.x, p.y + f.z] : [0, 0], partners: setPartners(p).map(q => ({ q, dx: q.x - p.x, dy: q.y - p.y })) };
  canvas.setPointerCapture(e.pointerId); refresh();
});
canvas.addEventListener('pointermove', e => {
  if (!drag) return; ndcOf(e); const f = floorHit(); if (!f) return;
  const snap = 0.05, { p } = drag;   // 5-cm-Raster
  p.x = Math.round((f.x + drag.off[0]) / snap) * snap; p.y = Math.round((-f.z + drag.off[1]) / snap) * snap; place(p);
  for (const { q, dx, dy } of drag.partners) { q.x = p.x + dx; q.y = p.y + dy; place(q); }
  markCustom(); computeDims(p); drawDims(); selBox.setFromObject(p.obj);
});
canvas.addEventListener('pointerup', e => {
  if (drag) { if (TYPES[drag.p.type].wall) snapToWall(drag.p); drag = null; controls.enabled = true; refresh(); }
  else if (downAt && Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) < 4) { ndcOf(e); selected = null; selWall = wallHit(); paintWalls(); refresh(); }
  downAt = null;
});
// Klick ohne Möbel: nächste Fläche im Raum; ist es eine Farbschicht, wird die Wand gewählt
function wallHit() {
  ray.setFromCamera(ndc, camera);
  const h = ray.intersectObjects([...roomG.children.filter(o => o.isMesh), ...paintG.children], false)[0];
  return (h && h.object.userData.wall) || null;
}
function rotateSel(deg) {
  if (!selected) return;
  const p = selected, partners = setPartners(p), a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
  p.rot += deg; place(p);
  for (const q of partners) { const dx = q.x - p.x, dy = q.y - p.y; q.x = p.x + dx * c - dy * s; q.y = p.y + dx * s + dy * c; q.rot += deg; place(q); }
  markCustom(); refresh();
}
function delSel() { if (!selected) return; furnG.remove(selected.obj); pieces = pieces.filter(p => p !== selected); selected = null; markCustom(); refresh(); }
window.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT') return;
  if (!selected) { if (e.key === 'Escape' && selWall) { selWall = null; paintWalls(); refresh(); } return; }
  const st = e.shiftKey ? 0.01 : 0.05;
  const mv = { ArrowLeft: [-st, 0], ArrowRight: [st, 0], ArrowUp: [0, st], ArrowDown: [0, -st] }[e.key];
  if (e.key === 'r' || e.key === 'R') rotateSel(e.shiftKey ? 90 : -90);
  else if (e.key === 'Delete' || e.key === 'Backspace') delSel();
  else if (e.key === 'Escape') { selected = null; refresh(); return; }
  else if (mv) { [selected, ...setPartners(selected)].forEach(q => { q.x += mv[0]; q.y += mv[1]; place(q); }); markCustom(); refresh(); }
  else return;
  e.preventDefault();
});

// ---------------------------------------------------------------- Ansichten
let view = '3d', cutAuto = true;
const EYE = 1.6;
// Gehen in der Augenhöhe-Ansicht: Mausrad vor/zurück, W/A/S/D bzw. Pfeile ohne Auswahl
function walk(fwd, side) {
  const d = new THREE.Vector3().subVectors(controls.target, camera.position); d.y = 0; if (d.lengthSq() < 1e-9) return; d.normalize();
  const m = new THREE.Vector3(-d.z, 0, d.x).multiplyScalar(side).add(d.multiplyScalar(fwd));
  camera.position.add(m); controls.target.add(m); camera.position.y = EYE; controls.update();
}
canvas.addEventListener('wheel', e => { if (view !== 'eye') return; e.preventDefault(); walk(-Math.sign(e.deltaY) * 0.25, 0); }, { passive: false });
window.addEventListener('keydown', e => {
  if (view !== 'eye' || e.target.tagName === 'INPUT') return;
  const k = e.key.toLowerCase(), st = 0.15;
  const m = { w: [st, 0], s: [-st, 0], a: [0, -st], d: [0, st] }[k] || (!selected && { arrowup: [st, 0], arrowdown: [-st, 0], arrowleft: [0, -st], arrowright: [0, st] }[k]);
  if (m) { e.preventDefault(); walk(...m); }
});
function setCut(on) { if (isOn('optCut') !== on) { setOn('optCut', on); buildRoom(); refresh(); } }
function setView(v) {
  view = v;
  for (const [id, k] of [['v3d', '3d'], ['vtop', 'top'], ['veye', 'eye']]) $(id).setAttribute('aria-pressed', String(k === v));
  if (v === 'eye') setCut(false); else if (cutAuto) setCut(true);
  // Augenhöhe: Drehpunkt direkt vor dem Auge → Umsehen statt Umkreisen
  const eye = v === 'eye';
  controls.enableZoom = controls.enablePan = controls.screenSpacePanning = !eye;
  controls.rotateSpeed = eye ? 0.35 : 1;
  controls.minPolarAngle = eye ? 0.35 : 0; controls.maxPolarAngle = eye ? Math.PI - 0.35 : Math.PI / 2 - 0.02;
  controls.enableRotate = v !== 'top';
  if (v === '3d') { camera.fov = 42; camera.position.set(4.4, 10.5, 5.6); controls.target.copy(CENTER); }
  if (v === 'top') { camera.fov = 40; camera.position.set(CENTER.x, 15.5, CENTER.z + 0.001); controls.target.copy(CENTER); }
  if (eye) {
    camera.fov = 65; camera.position.set(8.75, EYE, -1.75);
    const dir = new THREE.Vector3(0.3 - 8.75, -0.06 * 8.45, -1.3 + 1.75).normalize();
    controls.target.copy(camera.position).addScaledVector(dir, 0.05);
  }
  camera.updateProjectionMatrix(); controls.update();
}
$('v3d').onclick = () => setView('3d');
$('vtop').onclick = () => setView('top');
$('veye').onclick = () => setView('eye');

// ---------------------------------------------------------------- Varianten speichern (localStorage)
const LS = 'wohnzimmer-eg-varianten-v1';
let saved = [];
try { saved = JSON.parse(localStorage.getItem(LS) || '[]'); } catch { saved = []; }
function persist() { try { localStorage.setItem(LS, JSON.stringify(saved)); return true; } catch { return false; } }
function markCustom() { if (activeVariant && !activeVariant.startsWith('*')) activeVariant = '*' + activeVariant; renderVariants(); }
function renderVariants() {
  const el = $('vlist'); el.innerHTML = '';
  const all = [...PRESETS.map(v => ({ ...v, preset: true })), ...saved.map((v, i) => ({ ...v, idx: i }))];
  for (const v of all) {
    const b = document.createElement('button'); b.className = 'vbtn';
    const on = activeVariant === v.id || activeVariant === '*' + v.id;
    b.setAttribute('aria-pressed', String(on));
    b.innerHTML = `<span><span></span>${on && activeVariant.startsWith('*') ? ' <small>(geändert)</small>' : ''}<br><small></small></span>`;
    b.querySelector('span span').textContent = v.name;
    b.querySelector('br + small').textContent = v.note || 'eigene Variante';
    if (!v.preset) {
      const x = document.createElement('span'); x.className = 'x'; x.textContent = '×'; x.title = 'Variante löschen'; x.setAttribute('role', 'button');
      x.onclick = ev => { ev.stopPropagation(); saved.splice(v.idx, 1); persist(); renderVariants(); };
      b.appendChild(x);
    }
    b.onclick = () => {
      // Voreinstellung übernimmt den aktuellen Auszugszustand, gespeicherte Varianten ihren eigenen
      if (!v.preset) { tableExt = !!v.ext; wallColors = { ...(v.walls || {}) }; }
      selWall = null; paintWalls();
      loadItems(v.items);
      if (v.preset && tableExt) shiftEndChairs(0.8);
      activeVariant = v.id; refresh();
    };
    el.appendChild(b);
  }
}
$('vsave').onclick = () => {
  const inp = $('vname'), id = 'S' + Date.now();
  saved.push({ id, name: inp.value.trim() || ('Variante ' + (saved.length + 1)),
    note: new Date().toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' }), items: snapshot(), ext: tableExt, walls: { ...wallColors } });
  activeVariant = id; inp.value = '';
  $('vstore').textContent = persist() ? 'Gespeichert in diesem Browser.' : 'Speichern ist in diesem Browser gesperrt – die Variante gilt nur bis zum Neuladen.';
  renderVariants();
};

// ---------------------------------------------------------------- Hinzufügen (Symbole, 24er-Raster, Strich)
const ICON = {
  tv: '<rect x="3" y="4.5" width="18" height="11.5" rx="1"/><path d="M8.5 19.5h7"/>',
  lowboard: '<rect x="2.5" y="10" width="19" height="7" rx="1"/><path d="M8.8 10v7M15.2 10v7M5 17v2.5M19 17v2.5"/>',
  chair: '<path d="M7.5 3v18M7.5 13h9.5v8"/>',
  armchair: '<path d="M5.5 10.5V7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3.5"/><path d="M3 10.5h3.5v4h11v-4H21V18H3z"/><path d="M5 18v2M19 18v2"/>',
  coffee: '<rect x="2.5" y="8" width="19" height="2.5" rx=".6"/><path d="M5 10.5V18M19 10.5V18M5 15h14"/>',
  rug: '<rect x="4" y="5" width="16" height="14" rx="1"/><rect x="7.5" y="8.5" width="9" height="7" rx=".5"/><path d="M6 5V2.5M10 5V2.5M14 5V2.5M18 5V2.5M6 19v2.5M10 19v2.5M14 19v2.5M18 19v2.5"/>',
  shelf: '<rect x="5" y="2.5" width="14" height="19" rx="1"/><path d="M5 9h14M5 15h14M8 9V5.5M10.5 9V6M14.5 15v-3.5M16.5 15v-3"/>',
  plant: '<path d="M7 14.5h10l-1.4 7H8.4z"/><path d="M12 14.5V8"/><path d="M12 11.5c-3.5 0-5.5-2-5.5-5.5 3.5 0 5.5 2 5.5 5.5zM12 9.5c0-3.5 2-5.5 5.5-5.5 0 3.5-2 5.5-5.5 5.5z"/>',
  sideboard: '<rect x="3" y="5.5" width="18" height="12" rx="1"/><path d="M12 5.5v12M10 11.5h.01M14 11.5h.01M5.5 17.5V20M18.5 17.5V20"/>',
};
for (const t of ADDABLE) {
  const b = document.createElement('button'); b.className = 'btn ibtn';
  b.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[t]}</svg>`;
  b.title = TYPES[t].name; b.setAttribute('aria-label', TYPES[t].name + ' hinzufügen');
  b.onclick = () => {
    // Lowboard landet mittig unter einem vorhandenen TV, Teppich unter dem Couchtisch, sonst Wandmöbel an der Südwand, Rest frei im Raum
    const tv = t === 'lowboard' && pieces.find(q => q.type === 'tv');
    const coffee = t === 'rug' && pieces.find(q => q.type === 'coffee');
    const at = tv ? { x: tv.x, y: tv.y } : coffee ? { x: coffee.x, y: coffee.y, rot: coffee.rot } : TYPES[t].wall ? { x: 7.95, y: 0.6 } : { x: 6.2, y: 1.6 };
    const p = addPiece({ type: t, ...at });
    p.fromSet = false;   // einzeln hinzugefügte Stühle gehören nicht zum Set
    if (TYPES[t].wall) snapToWall(p);
    selected = p; selWall = null; paintWalls(); markCustom(); refresh();
  };
  $('addrow').appendChild(b);
}

// ---------------------------------------------------------------- Optionen + Start
$('optCut').onclick = () => { cutAuto = false; setOn('optCut', !isOn('optCut')); buildRoom(); refresh(); };
$('optDims').onclick = () => { setOn('optDims', !isOn('optDims')); refresh(); };

function resize() {
  const r = stage.getBoundingClientRect(); renderer.setSize(r.width, r.height, false);
  camera.aspect = r.width / Math.max(r.height, 1); camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(stage);
$('area').textContent = de(ROOM.area);
buildRoom(); setView('3d'); resize();
loadItems(PRESETS[0].items);
(function loop() { requestAnimationFrame(loop); controls.update(); renderer.render(scene, camera); updateLabels(); })();
