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
const rect = (a, b, c, d) => [[a, b], [c, b], [c, d], [a, d]];

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

const M = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85, ...o });
const MAT = {
  wall: M(0xf2f0ea, { roughness: 0.95 }), floor: M(0xa5714a, { roughness: 0.7 }), ctx: M(0xb9b4aa),
  glass: M(0xa9c6d6, { transparent: true, opacity: 0.2, roughness: 0.1, depthWrite: false }),
  kamin: M(0x8d8a84), schrank: M(0xe6e1d6),
  ofen: M(0xa39e95, { roughness: 1 }), ofenHood: M(0xb3aea5, { roughness: 1 }), fire: M(0x1c1a18, { roughness: 0.9 }), hearth: M(0x4a4744, { roughness: 0.5 }),
  oak: M(0xb88a58, { roughness: 0.6 }), boucle: M(0x4b4743, { roughness: 1 }), leather: M(0x7a4e33, { roughness: 0.55 }),
  bronze: M(0x8d6b3f, { metalness: 0.6, roughness: 0.4 }), sofa: M(0x9a958c, { roughness: 1 }), sofa2: M(0x8a857c, { roughness: 1 }),
  side: M(0x3f3a35, { roughness: 0.6 }), rug: M(0xcfc6b5, { roughness: 1 }), plant: M(0x4e6b45), pot: M(0x6d6157),
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
  const cut = $('optCut').checked, top = cut ? 1.15 : H;
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
  // Öffnungen: Brüstung / Sturz / Glas (W = Fenster, B = Balkontür, I = Innentür)
  for (const o of ROOM.openings) {
    const ring = [o.poly];
    const sill = o.kind === 'W' ? 0.81 : 0, head = o.kind === 'I' ? 2.01 : (o.kind === 'W' ? 2.37 : 2.26);
    if (sill > 0) roomG.add(extrude(ring, 0, Math.min(sill, top), MAT.wall));
    if (!cut) roomG.add(extrude(ring, head, H, MAT.wall));
    if (o.kind !== 'I') { const gl = extrude(ring, sill, Math.min(head, top), MAT.glass); gl.castShadow = false; roomG.add(gl); }
  }
  // Alter Kaminzug sitzt zwischen den beiden Scan-Wänden
  const [kx0, ky0, , ky1] = ROOM.kamin, kx1 = SCAN_WALLS[1][0];
  const kamin = rect(kx0, ky0, kx1, ky1);
  roomG.add(extrude([kamin], 0, top, MAT.kamin));
  // Gemauerter Eckkamin: Korpus bis 1,10 m, darüber schmalere Haube bis Decke
  roomG.add(extrude([OFEN.hearth], 0, 0.02, MAT.hearth));
  roomG.add(extrude([OFEN.body], 0, Math.min(1.10, top), MAT.ofen));
  if (top > 1.10) roomG.add(extrude([OFEN.hood], 1.10, top, MAT.ofenHood));
  roomG.add(extrude([OFEN.fire], 0.32, 0.92, MAT.fire));
  const scan = SCAN_WALLS.map(([a, b, c, d]) => rect(a, b, c, d));
  scan.forEach(r => roomG.add(extrude([r], 0, top, MAT.wall)));
  wallParts = [...ROOM.walls.map(p => p[0]), kamin, OFEN.body, OFEN.hearth, ...scan];
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
  sideboard() {
    const g = group(bx(2.33, 0.72, 0.38, MAT.side, 0, 0.12));
    for (const sx of [-1.05, 1.05]) for (const sz of [-0.14, 0.14]) g.add(bx(0.03, 0.12, 0.03, MAT.bronze, sx, 0, sz));
    return g;
  },
  // L-Ecksofa: langer Schenkel 2,94 × 1,00, kurzer Schenkel 1,00 breit, 2,20 lang ab Rückenkante (m = -1: gespiegelt)
  sofa: (s, m = 1) => group(
    bx(2.94, 0.42, 1.0, MAT.sofa), bx(2.94, 0.38, 0.2, MAT.sofa2, 0, 0.42, 0.4),
    bx(1.0, 0.42, 1.2, MAT.sofa, 0.97 * m, 0, -1.1), bx(0.2, 0.38, 2.2, MAT.sofa2, 1.37 * m, 0.42, -0.6),
    bx(0.18, 0.2, 1.0, MAT.sofa2, -1.38 * m, 0.42, 0)),
  sofaR: () => BUILD.sofa(null, -1),
  coffee(s) {
    if (s.round) {   // runde Platte auf drei Beinen
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
  rug() { const m = bx(3.0, 0.012, 2.0, MAT.rug); m.castShadow = false; return group(m); },
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
  plant() {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), MAT.plant);
    s.position.y = 0.85; s.scale.y = 1.3; s.castShadow = true;
    return group(cyl(0.18, 0.35, MAT.pot), s);
  },
};
// main: Material(ien), die die gewählte Farbe bekommen (weitere etwas dunkler)
// versions: Ausführungen; ihre Felder (w, d, h, …) überschreiben die des Typs, die erste ist Standard
const TYPES = {
  table:     { name: 'Esstisch', w: 2.0, d: 0.9, set: true, main: ['oak'] },
  bench:     { name: 'Bank', w: 2.0, d: 0.55, set: true, main: ['boucle'] },
  chair:     { name: 'Stuhl', w: 0.5, d: 0.55, set: true, main: ['boucle'] },
  sideboard: { name: 'Sideboard', w: 2.33, d: 0.38, main: ['side'] },
  sofa:      { name: 'Ecksofa', w: 2.94, d: 1.0, main: ['sofa', 'sofa2'], foot: [[-1.47, -0.5, 1.47, 0.5], [0.47, -1.7, 1.47, -0.5]] },
  sofaR:     { name: 'Ecksofa (gespiegelt)', w: 2.94, d: 1.0, main: ['sofa', 'sofa2'], foot: [[-1.47, -0.5, 1.47, 0.5], [-1.47, -1.7, -0.47, -0.5]] },
  coffee:    { name: 'Couchtisch', main: ['oak'], versions: [
    { id: 'rect', label: 'Rechteckig', w: 1.05, d: 0.6, h: 0.4 },
    { id: 'square', label: 'Quadratisch', w: 0.8, d: 0.8, h: 0.38 },
    { id: 'round', label: 'Rund', w: 0.9, d: 0.9, h: 0.38, round: true },
  ] },
  armchair:  { name: 'Sessel', w: 0.8, d: 0.85, main: ['sofa', 'sofa2'] },
  rug:       { name: 'Teppich', w: 3.0, d: 2.0, soft: true, main: ['rug'] },
  shelf:     { name: 'Regal', w: 0.8, d: 0.35, main: ['schrank'] },
  plant:     { name: 'Pflanze', w: 0.5, d: 0.5, main: ['pot'] },
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
    items: [...setAt(2.15, 1.36, 0), { type: 'sideboard', x: 1.40, y: 2.95, rot: 0 },
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
  if (t.round) { const r = t.w / 2; return [Array.from({ length: 20 }, (_, k) => [p.x + r * Math.cos(k * Math.PI / 10), p.y + r * Math.sin(k * Math.PI / 10)])]; }
  let rects = t.foot || [[-t.w / 2, -t.d / 2, t.w / 2, t.d / 2]];
  if (p.type === 'table' && tableExt) { const sd = extSideOf(p); rects = [[sd > 0 ? -1.0 : -1.8, -t.d / 2, sd > 0 ? 1.8 : 1.0, t.d / 2]]; }
  const c = Math.cos(p.rot * Math.PI / 180), s = Math.sin(p.rot * Math.PI / 180);
  // lokale Tiefe z entspricht Plan -y
  return rects.map(([x0, z0, x1, z1]) => rect(x0, z0, x1, z1).map(([lx, lz]) => [p.x + lx * c + lz * s, p.y + lx * s - lz * c]));
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

// ---------------------------------------------------------------- Anzeige: Auswahl, Abstände, Hervorhebung
const labelsEl = $('labels');
const dimG = new THREE.Group(); scene.add(dimG);
let dims = [];   // {a, b, val}
const selBox = new THREE.BoxHelper(undefined, 0xd08a3c); selBox.visible = false; scene.add(selBox);

function computeDims(p) {
  dims = [];
  if (!p || !$('optDims').checked) return;
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
  if (!selected) { el.innerHTML = '<p class="sel-empty">Ein Möbelstück anklicken, um es zu bewegen und Abstände zu sehen.</p>'; selBox.visible = false; return; }
  const p = selected, t = spec(p);
  const w = p.type === 'table' && tableExt ? 2.8 : t.w;
  const iss = issues(p), minD = dims.length ? Math.min(...dims.map(x => x.val)) : null;
  const stdColor = '#' + MAT[t.main[0]].color.getHexString();
  el.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><strong>${t.name}</strong>
      <span class="num" style="color:var(--muted);font-size:12px">${t.round ? 'Ø ' + de(w) : de(w) + ' × ' + de(t.d)} m</span></div>
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
  // Ausführung wechseln (Wandmöbel danach neu an die Wand setzen, weil sich die Tiefe ändert) / Farbe wählen
  el.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { p.v = b.dataset.v; rebuild(p); if (t.wall) snapToWall(p); markCustom(); refresh(); });
  el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { p.color = b.dataset.c || undefined; rebuild(p); markCustom(); refresh(); });
  $('delSel').onclick = delSel;
  if (p.type === 'table') {
    $('extSel').onclick = () => setExt(!tableExt);
    $('moveSet').onclick = () => { moveWithSet = !moveWithSet; renderSel(); };
  }
  if (p.type.startsWith('sofa')) $('flipSofa').onclick = () => { p.type = p.type === 'sofa' ? 'sofaR' : 'sofa'; rebuild(p); markCustom(); refresh(); };
  selBox.setFromObject(p.obj); selBox.visible = true;
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
  selected = p; controls.enabled = false;
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
  else if (downAt && Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) < 4) { selected = null; refresh(); }
  downAt = null;
});
function rotateSel(deg) {
  if (!selected) return;
  const p = selected, partners = setPartners(p), a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
  p.rot += deg; place(p);
  for (const q of partners) { const dx = q.x - p.x, dy = q.y - p.y; q.x = p.x + dx * c - dy * s; q.y = p.y + dx * s + dy * c; q.rot += deg; place(q); }
  markCustom(); refresh();
}
function delSel() { if (!selected) return; furnG.remove(selected.obj); pieces = pieces.filter(p => p !== selected); selected = null; markCustom(); refresh(); }
window.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || !selected) return;
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
function setCut(on) { const c = $('optCut'); if (c.checked !== on) { c.checked = on; buildRoom(); refresh(); } }
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
      if (!v.preset) tableExt = !!v.ext;
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
    note: new Date().toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' }), items: snapshot(), ext: tableExt });
  activeVariant = id; inp.value = '';
  $('vstore').textContent = persist() ? 'Gespeichert in diesem Browser.' : 'Speichern ist in diesem Browser gesperrt – die Variante gilt nur bis zum Neuladen.';
  renderVariants();
};

// ---------------------------------------------------------------- Hinzufügen
for (const t of ADDABLE) {
  const b = document.createElement('button'); b.className = 'btn'; b.textContent = '+ ' + TYPES[t].name;
  b.onclick = () => {
    // Lowboard landet mittig unter einem vorhandenen TV, Teppich unter dem Couchtisch, sonst Wandmöbel an der Südwand, Rest frei im Raum
    const tv = t === 'lowboard' && pieces.find(q => q.type === 'tv');
    const coffee = t === 'rug' && pieces.find(q => q.type === 'coffee');
    const at = tv ? { x: tv.x, y: tv.y } : coffee ? { x: coffee.x, y: coffee.y, rot: coffee.rot } : TYPES[t].wall ? { x: 7.95, y: 0.6 } : { x: 6.2, y: 1.6 };
    const p = addPiece({ type: t, ...at });
    p.fromSet = false;   // einzeln hinzugefügte Stühle gehören nicht zum Set
    if (TYPES[t].wall) snapToWall(p);
    selected = p; markCustom(); refresh();
  };
  $('addrow').appendChild(b);
}

// ---------------------------------------------------------------- Optionen + Start
$('optCut').onchange = () => { cutAuto = false; buildRoom(); refresh(); };
$('optDims').onchange = refresh;

function resize() {
  const r = stage.getBoundingClientRect(); renderer.setSize(r.width, r.height, false);
  camera.aspect = r.width / Math.max(r.height, 1); camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(stage);
$('area').textContent = de(ROOM.area);
buildRoom(); setView('3d'); resize();
loadItems(PRESETS[0].items);
(function loop() { requestAnimationFrame(loop); controls.update(); renderer.render(scene, camera); updateLabels(); })();
