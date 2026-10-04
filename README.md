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
index.html            Landingpage (Hero, Unternehmen, Creator, Ablauf, Kontaktformular)
impressum.html        Impressum (§ 5 DDG)
datenschutz.html      Datenschutzerklärung (DSGVO)
agb.html              Allgemeine Geschäftsbedingungen
404.html              Fehlerseite
leistungen.html · ueber-uns.html · kontakt.html · produkte.html
                      Nur noch Weiterleitungen auf die Startseite der Startseite
                      (damit alte Links nicht ins Leere laufen; noindex)
assets/
  css/style.css       Design-System „Ribbon“ (dunkel, Platin, ein Violett-Akzent)
  js/main.js          Navigation, Hero-Animation, Scroll-Reveal, Formular
  fonts/              Hanken Grotesk + Newsreader (selbst gehostet, SIL OFL)
  img/                Logo (hell/dunkel), Favicon (SVG), Social-Vorschaubild og-cover.png
robots.txt · sitemap.xml · site.webmanifest
```

## 🎨 Design

- **Logo:** ein einziges Band, oben eingerollt und in der Mitte einmal gefaltet, das ein V
  bildet. `assets/img/logo.svg` (Platin, für dunkle Flächen), `logo-light.svg` (für helle
  Flächen), `favicon.svg` (App-Icon auf Violett). Handgezeichnete Vektoren nach dem
  Identity-Sheet.
- **Wortmarke:** „VortexUnit“ in Newsreader (Serif); Claim „Software. Daten. Wachstum.“
- **Look:** dunkles Tintenblau, Platin-Schrift, ein Violett-Akzent. Im Hero dreht sich ein
  feines Möbius-Band (Canvas, pausiert außerhalb des Sichtfelds, statisch bei
  „Bewegung reduzieren“).
- **Aufbau:** bewusst wenig Text – Hero mit zwei Wegen (Unternehmen / Creator),
  Leistungs-Ticker, je eine Karte pro Zielgruppe, ein Satz als Statement, drei Schritte,
  Kontaktformular mit „Ich bin Unternehmen / Creator“.
- **Schriften selbst gehostet** (Hanken Grotesk, Newsreader; SIL OFL) – kein Request an Google.
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
