# Wohnzimmer EG – 3D-Planer

Interaktiver 3D-Möbelplaner fürs Wohnzimmer im EG (Three.js, kein Build-Schritt).

**Live:** https://vincentization.github.io/wohnzimmer-planer/

- Möbel ziehen, mit `R` / `⇧R` drehen, Pfeiltasten schieben, `Entf` löschen
- Ansichten: 3D, Draufsicht, Augenhöhe (Mausrad / WASD = gehen)
- Wandabstände, Kollisionen und Balkontür-Aufschlag werden live geprüft
- Esstisch ausziehbar (2,00 → 2,80 m), Ecksofa spiegelbar
- Eigene Varianten werden im Browser gespeichert (localStorage)

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
