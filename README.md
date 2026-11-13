# Wohnzimmer EG – 3D-Planer

Interaktiver 3D-Möbelplaner fürs Wohnzimmer im EG (Three.js, kein Build-Schritt).

**Live:** https://vincentization.github.io/wohnzimmer-planer/

- Möbel ziehen, mit `R` / `⇧R` drehen, Pfeiltasten schieben, `Entf` löschen
- Ansichten: 3D, Draufsicht, Augenhöhe (Mausrad / WASD = gehen)
- Wandabstände, Kollisionen und Balkontür-Aufschlag werden live geprüft
- Esstisch ausziehbar (2,00 → 2,80 m), Ecksofa spiegelbar
- Wände einzeln anklicken und streichen (Palette oder eigene Farbe); Wandfarben werden mit der Variante gespeichert
- Pflanzen in 9 Arten (Busch, Monstera, Geigenfeige, Strelitzie, Kentiapalme, Olivenbaum, Bogenhanf, Säulenkaktus, Pampasgras)
- Eigene Varianten werden im Browser gespeichert (localStorage)
- Varianten als Link teilen: „Link teilen“ (aktuelle Anordnung) oder das Link-Symbol an einer gespeicherten Variante zeigt eine URL (und kopiert sie), in der die ganze Anordnung samt Wandfarben und Tischauszug steckt (komprimiert im `#v=…`-Hash, kein Server). Wer den Link öffnet, sieht die Variante und kann sie bei sich speichern.
- Inspirations-Galerie als Vollbild-Lightbox: einfach Bilder in `inspiration/` legen und pushen (Dateien mit `fav` im Namen kommen zuerst). Die Bildliste kommt von der GitHub-API, lokal erscheinen neue Bilder also erst nach dem Push.

## Lokal starten

```bash
python3 -m http.server 8000
```

Dann http://localhost:8000 öffnen.

## Deploy

GitHub Pages, Quelle: Branch `main`, Ordner `/`. Jeder Push auf `main` ist automatisch live.

## Dateien

- `index.html` – Markup
- `style.css` – Layout und Farben (hell/dunkel)
- `app.js` – Raumdaten, Möbel, Interaktion
- `gallery.js` – Inspirations-Galerie (Lightbox)
- `inspiration/` – Inspirationsbilder
