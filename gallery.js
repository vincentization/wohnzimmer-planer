// Inspirations-Galerie: Vollbild-Lightbox für alle Bilder im Ordner inspiration/
// GitHub Pages kann keine Ordner auflisten → die Liste kommt von der GitHub-API (öffentliches Repo, kein Token nötig).
(() => {
  const API = 'https://api.github.com/repos/vincentization/wohnzimmer-planer/contents/inspiration';
  const $ = id => document.getElementById(id);
  const lb = $('lb'), img = $('lbImg'), count = $('lbCount'), status = $('galStatus');
  let images = null, i = 0;

  async function list() {
    if (images) return images;
    const r = await fetch(API);
    if (!r.ok) throw new Error(r.status);
    const names = (await r.json())
      .filter(f => f.type === 'file' && /\.(png|jpe?g|webp|gif|avif)$/i.test(f.name))
      .map(f => f.name)
      .sort((a, b) => b.startsWith('fav') - a.startsWith('fav') || a.localeCompare(b, 'de', { numeric: true }));   // Favoriten zuerst
    return (images = names.map(n => 'inspiration/' + encodeURIComponent(n)));
  }

  function show(n) {
    i = (n + images.length) % images.length;
    img.classList.add('loading');
    img.src = images[i];
    count.textContent = `${i + 1} / ${images.length}`;
    for (const k of [i + 1, i - 1]) new Image().src = images[(k + images.length) % images.length];   // Nachbarn vorladen
  }
  img.onload = () => img.classList.remove('loading');

  async function open() {
    status.textContent = 'Lädt …';
    try { await list(); } catch { status.textContent = 'Bilder konnten nicht geladen werden. Bitte später erneut versuchen.'; return; }
    if (!images.length) { status.textContent = 'Keine Bilder im Ordner gefunden.'; return; }
    status.textContent = '';
    lb.hidden = false; document.body.style.overflow = 'hidden';
    show(i); $('lbClose').focus();
  }
  function close() {
    lb.hidden = true; document.body.style.overflow = ''; img.removeAttribute('src');
    $('galOpen').focus();
  }

  $('galOpen').onclick = open;
  $('lbClose').onclick = close;
  $('lbPrev').onclick = () => show(i - 1);
  $('lbNext').onclick = () => show(i + 1);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });   // Klick auf den Hintergrund schließt

  // Alle Tasten abfangen, solange die Lightbox offen ist (sonst würden sie Möbel verschieben/löschen)
  window.addEventListener('keydown', e => {
    if (lb.hidden) return;
    e.stopImmediatePropagation();
    if (e.key === 'Enter' || e.key === ' ') return;   // Buttons per Tastatur auslösen lassen
    e.preventDefault();
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(i - 1);
    else if (e.key === 'ArrowRight') show(i + 1);
    else if (e.key === 'Tab') {   // Fokus in der Lightbox halten
      const f = [...lb.querySelectorAll('button')], k = f.indexOf(document.activeElement);
      f[(k + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  }, true);

  // Wischen auf Touch-Geräten
  let x0 = null;
  img.addEventListener('pointerdown', e => { x0 = e.clientX; });
  img.addEventListener('pointerup', e => {
    if (x0 !== null && Math.abs(e.clientX - x0) > 50) show(i + (e.clientX < x0 ? 1 : -1));
    x0 = null;
  });
})();
