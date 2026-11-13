# Wohnzimmer EG – 3D-Planer

Interaktiver 3D-Möbelplaner fürs Wohnzimmer im EG (Three.js, kein Build-Schritt).

**Live:** https://vincentization.github.io/wohnzimmer-planer/

- Möbel ziehen, mit `R` / `⇧R` drehen, Pfeiltasten schieben, `Entf` löschen
- Ansichten: 3D, Draufsicht, Augenhöhe (Mausrad / WASD = gehen)
- Wandabstände, Kollisionen und Balkontür-Aufschlag werden live geprüft
- Esstisch ausziehbar (2,00 → 2,80 m), Ecksofa spiegelbar
- Wände einzeln anklicken und streichen (Palette oder eigene Farbe); Wandfarben werden mit der Variante gespeichert
- Pflanzen in 9 Arten (Busch, Monstera, Geigenfeige, Strelitzie, Kentiapalme, Olivenbaum, Bogenhanf, Säulenkaktus, Pampasgras)
- Download-Symbol oben in der Ansicht speichert das aktuelle Bild als PNG (inkl. Wandabstände, ohne Bedienelemente)
- Gespeicherte Varianten sind für alle sichtbar (Supabase, siehe unten). Ist der Server nicht erreichbar, landet eine Variante vorerst im Browser und lässt sich später per Wolken-Symbol hochladen.
- Varianten als Link teilen: „Link teilen“ (aktuelle Anordnung) oder das Link-Symbol an einer gespeicherten Variante zeigt eine URL (und kopiert sie), in der die ganze Anordnung samt Wandfarben und Tischauszug steckt (komprimiert im `#v=…`-Hash, kein Server). Wer den Link öffnet, sieht die Variante und kann sie bei sich speichern.
- Inspirations-Galerie als Vollbild-Lightbox: einfach Bilder in `inspiration/` legen und pushen (Dateien mit `fav` im Namen kommen zuerst). Die Bildliste kommt von der GitHub-API, lokal erscheinen neue Bilder also erst nach dem Push.

## Lokal starten

```bash
python3 -m http.server 8000
```

Dann http://localhost:8000 öffnen.

## Gemeinsame Varianten (Supabase)

Tabelle `variants` im Supabase-Projekt `wnpmzexykrdxzhgnkyuo`, angelegt mit [supabase/migrations/20261113170000_create_variants.sql](supabase/migrations/20261113170000_create_variants.sql). Die Seite spricht die REST-API direkt mit dem Publishable Key an (in `app.js`, darf öffentlich sein). Erlaubt sind nur Lesen, Anlegen und Löschen. Kostenlose Projekte pausieren nach rund einer Woche ohne Zugriffe; im Supabase-Dashboard mit einem Klick wieder starten, die Daten bleiben erhalten.

## Deploy

GitHub Pages, Quelle: Branch `main`, Ordner `/`. Jeder Push auf `main` ist automatisch live.

GitHub Pages lässt Browser alle Dateien 10 Minuten cachen. Damit niemand den Cache leeren muss, vergleicht die Seite beim Öffnen und beim Zurückkehren in den Tab ihr `Last-Modified` mit dem am Server. Ist eine neuere Version online, holt sie die eigenen Dateien am Cache vorbei und lädt neu – bei ungespeicherten Änderungen stattdessen mit Hinweis „Neu laden“.

## Dateien

- `index.html` – Markup
- `style.css` – Layout und Farben (hell/dunkel)
- `app.js` – Raumdaten, Möbel, Interaktion
- `gallery.js` – Inspirations-Galerie (Lightbox)
- `inspiration/` – Inspirationsbilder
