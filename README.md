# VortexUnit — Unternehmenswebsite

Marketing- und Unternehmenswebsite für **VortexUnit** — _Dienstleistungen in der
automatischen Datenverarbeitung_. Domain: **vortexunit.de**.

Die Seite ist ein **statisches Website-Projekt** (HTML/CSS/JS) ohne Build-Schritt,
ohne Framework und **ohne externe Requests** (keine Google Fonts, keine CDNs, kein
Tracking). Dadurch ist sie schnell, überall hostbar und **DSGVO-freundlich by
default**.

---

## 📁 Struktur

```
index.html            Landingpage (Hero, Leistungen, Ablauf, Vorteile, Beispiele, FAQ, Kontaktformular)
impressum.html        Impressum (§ 5 DDG)
datenschutz.html      Datenschutzerklärung (DSGVO)
agb.html              Allgemeine Geschäftsbedingungen
404.html              Fehlerseite
leistungen.html · ueber-uns.html · kontakt.html · produkte.html
                      Nur noch Weiterleitungen auf die passenden Abschnitte der Startseite
                      (damit alte Links nicht ins Leere laufen; noindex)
assets/
  css/style.css       Design-System „Ruhe“ (hell, ein Violett-Akzent, sanfte Farbwolke)
  js/main.js          Navigation, Abschnitts-Markierung, Scroll-Reveal, Formular
  fonts/              Hanken Grotesk 400–800 (selbst gehostet, SIL OFL – siehe OFL.txt)
  img/                Logo, Favicon (SVG), Social-Vorschaubild og-cover.png (1200×630)
robots.txt · sitemap.xml · site.webmanifest
```

## 🎨 Design

- **Richtung „Ruhe“:** heller, ruhiger Auftritt für B2B-Kunden – Off-White, Tinte, ein
  Violett-Akzent (#6B4FE8). Die Logo-Farben Violett/Cyan erscheinen nur als weiche
  Farbwolke hinter dem Hero und dem Seitenkopf.
- **Schrift:** Hanken Grotesk, **selbst gehostet** unter `assets/fonts/` – kein Request an
  Google, also DSGVO-unbedenklich.
- **Aufbau der Landingpage (auf Conversion ausgelegt):** Hero mit Nutzenversprechen und
  zwei CTAs → Vertrauenspunkte → Technologien → typische Probleme → Leistungen (Bento-Raster)
  → Ablauf in 4 Schritten → Vorteile → Beispielprojekte (vorher/nachher) → FAQ → Kontakt.
  Jeder Abschnitt führt zum Erstgespräch.
- **Keine eigenen Produkte auf der Seite** – bewusst reine Dienstleistungs-Landingpage.
- **Sprache:** Deutsch, Sie-Form.

## ✅ VOR DEM LIVE-GANG AUSFÜLLEN (wichtig!)

Die rechtlichen Seiten enthalten Platzhalter in der Form `[ … ]` (im Text gelb
markiert). Diese **müssen** durch echte Daten ersetzt werden — ein vollständiges
Impressum ist in Deutschland gesetzlich vorgeschrieben.

**`impressum.html`:**
- [ ] Rechtsform (Einzelunternehmen / UG / GmbH …)
- [ ] Vor- und Nachname des Inhabers / der Geschäftsführung
- [ ] Vollständige Anschrift (Straße, Hausnummer, PLZ, Ort — kein Postfach)
- [ ] Telefonnummer
- [ ] Registergericht + Registernummer (falls eingetragen)
- [ ] USt-IdNr. bzw. Hinweis auf Kleinunternehmerregelung (§ 19 UStG)
- [ ] Inhaltlich Verantwortliche/r (§ 18 Abs. 2 MStV)

**`datenschutz.html`:**
- [ ] Verantwortlicher (Name + Anschrift)
- [ ] Hosting-Anbieter (Name/Anschrift) + AVV
- [ ] Zuständige Landes-Datenschutzbehörde
- [ ] Abschnitt „Produkte/SaaS“ ergänzen, sobald Login/Zahlung (z. B. Stripe) läuft
- [ ] Datum „Stand“

**`agb.html`:**
- [ ] Firmierung/Anschrift, Preise/USt, Zahlungsintervalle & -dienstleister
- [ ] Laufzeiten/Kündigungsfristen, ggf. Widerrufsbelehrung (B2C), Gerichtsstand
- [ ] Datum „Stand“

> 💡 Für maximale Rechtssicherheit die Texte einmal anwaltlich prüfen lassen — die
> Vorlagen decken den aktuellen Stand (keine externen Dienste) ab.

## 📬 Kontaktformular

Das Formular im Abschnitt **Kontakt** der Startseite sendet **keine Daten an einen Server**. Beim Absenden
öffnet es das E-Mail-Programm der Besucher:innen mit vorbereiteter Nachricht an
`info@vortexunit.de`. Vorteile: kein Backend, kein weiterer Datenverarbeiter.

E-Mail-Adresse ändern: Attribut `data-mailto` im `<form>` in `index.html` sowie die
`info@vortexunit.de`-Verweise anpassen. **Empfehlung:** eine Postfach-Adresse
`info@vortexunit.de` einrichten (statt einer privaten Adresse).

Wer ein echtes Server-Formular möchte (z. B. Formspree, eigenes Backend, Supabase
Edge Function): `action`/`method` bzw. den `submit`-Handler in `assets/js/main.js`
anpassen und den Datenschutz-Abschnitt entsprechend ergänzen.

## 🚀 Deployment

Reine statische Dateien — überall lauffähig. Optionen:

- **GitHub Pages:** Repo-Settings → Pages → Branch wählen. Für die Domain eine
  `CNAME`-Datei mit `vortexunit.de` hinzufügen und DNS auf GitHub zeigen lassen.
- **Netlify / Vercel / Cloudflare Pages:** Repo verbinden, kein Build-Command,
  Publish-Verzeichnis = Projektwurzel.
- **Klassisches Webhosting:** Dateien per FTP in das Web-Root hochladen.

Danach unter `vortexunit.de` erreichbar. Alle absoluten URLs in `sitemap.xml`,
`robots.txt` und den `og:`/`canonical`-Tags zeigen bereits auf `https://vortexunit.de`.
