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
  css/style.css       Design-System „Pearl“ (hell, Glas, Violett)
  js/main.js          Navigation, Hero-Animation, Scroll-Reveal, Formular
  fonts/              Hanken Grotesk + Newsreader (selbst gehostet, SIL OFL)
  img/                Favicons/App-Icons (PNG), og-cover.png, hf/ = Higgsfield-Bilder & Film
robots.txt · sitemap.xml · site.webmanifest
```

## 🎨 Design

- **Logo & Bildwelt aus Higgsfield:** Wortbildmarke (Band-V mit „VORTEXUNIT“ und
  „Software. Data. Growth.“), Hero-Spirale, Glas-Icons, „Vom Chaos zur Klarheit“,
  Meilenstein-Pfad und der Film (Band steigt durch Ringe zum V) wurden mit Higgsfield
  erzeugt und liegen unter `assets/img/hf/` (WebP). Der Film ist in 5 Sprite-Sheets à
  12 Bildern zerlegt und wird beim Scrollen abgespielt.
- **Look „Pearl“:** helles Perl-Lavendel, Glas-Karten, Violett #6B4FE8, Serif-Headlines
  (Newsreader) + Hanken Grotesk – nach dem Higgsfield-Seitenkonzept.
- **Animationen:** aufsteigender Partikel-Wirbel im Hero, Scroll-Film „Ihr Weg nach
  oben“, Chaos→Klarheit mit abhakender Checkliste, Meilensteine mit Zählern (1K/10K/100K),
  sich selbst erledigende Aufgaben (Unternehmen), wachsende Einnahmenkurve mit
  Benachrichtigungen (Creator), füllende Schrittlinie. Alles pausiert bzw. ist statisch bei
  „Bewegung reduzieren“.
- **Schriften selbst gehostet** (SIL OFL) – kein Request an Google oder Higgsfield.
- **Sprache:** Deutsch, Sie-Form.

## ✅ VOR DEM LIVE-GANG AUSFÜLLEN (wichtig!)

Die rechtlichen Seiten enthalten Platzhalter in der Form `[ … ]` (im Text gelb
markiert). Diese **müssen** durch echte Daten ersetzt werden — ein vollständiges
Impressum ist in Deutschland gesetzlich vorgeschrieben.

Alle drei Seiten sind auf **österreichisches Recht** umgestellt (ECG, UGB, MedienG,
GewO, DSGVO/DSG, Österreichische Datenschutzbehörde; Kleinunternehmer gem.
§ 6 Abs. 1 Z 27 UStG; Hosting Vercel). Offen sind nur noch:

- [ ] Vor- und Nachname des Inhabers (Impressum, Datenschutz, AGB + `/en/`)
- [ ] Straße und Hausnummer in 1220 Wien (Impressum, Datenschutz, AGB + `/en/`)

Gesucht/ersetzt werden die gelb markierten `<span class="ph">`-Felder.

> 💡 Für maximale Rechtssicherheit die Texte einmal anwaltlich prüfen lassen — die
> Vorlagen decken den aktuellen Stand (keine externen Dienste) ab.

## 🌐 Sprachen

Deutsch im Wurzelverzeichnis, Englisch unter `/en/` (`index.html`, `imprint.html`,
`privacy.html`, `terms.html`). Der DE/EN-Schalter im Header führt jeweils zur
entsprechenden Seite; `hreflang`-Tags und `sitemap.xml` sind gesetzt. Texte im
Skript (Formularmeldungen, Menü, Einnahmen-Toasts) wählt `main.js` anhand von
`<html lang>`. Die englischen Rechtstexte sind Übersetzungen; verbindlich ist die
deutsche Fassung. Bei Textänderungen beide Sprachen pflegen.

## 📬 Kontaktformular

Das Formular im Abschnitt **Kontakt** der Startseite sendet **keine Daten an einen Server**. Beim Absenden
öffnet es das E-Mail-Programm der Besucher:innen mit vorbereiteter Nachricht an
`contact@vortexunit.de`. Vorteile: kein Backend, kein weiterer Datenverarbeiter.

E-Mail-Adresse ändern: Attribut `data-mailto` im `<form>` in `index.html` sowie die
`contact@vortexunit.de`-Verweise anpassen. **Empfehlung:** eine Postfach-Adresse
`contact@vortexunit.de` einrichten (statt einer privaten Adresse).

Wer ein echtes Server-Formular möchte (z. B. Formspree, eigenes Backend, Supabase
Edge Function): `action`/`method` bzw. den `submit`-Handler in `assets/js/main.js`
anpassen und den Datenschutz-Abschnitt entsprechend ergänzen.

## 🚀 Deployment

Reine statische Dateien — überall lauffähig. Optionen:

- **GitHub Pages:** Repo-Settings → Pages → Branch wählen. Für die Domain eine
  `CNAME`-Datei mit `vortexunit.de` hinzufügen und DNS auf GitHub zeigen lassen.
- **Vercel (gewählt):** Repo importieren, Framework „Other“, kein Build-Command,
  Output-Verzeichnis = Projektwurzel. `vercel.json` setzt Sicherheits-Header und
  Caching. Danach unter Settings → Domains `vortexunit.de` + `www.vortexunit.de`
  hinzufügen und die angezeigten DNS-Einträge beim Domain-Anbieter setzen.
- **Klassisches Webhosting:** Dateien per FTP in das Web-Root hochladen.

Danach unter `vortexunit.de` erreichbar. Alle absoluten URLs in `sitemap.xml`,
`robots.txt` und den `og:`/`canonical`-Tags zeigen bereits auf `https://vortexunit.de`.
