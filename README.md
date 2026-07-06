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
index.html            Startseite (Hero, Leistungen, Produkt-Showcase, Prozess, CTA)
leistungen.html       Leistungen im Detail (Software, SaaS, Daten, Cloud, KI, UX)
produkte.html         Produkte im Detail: SmartCart · Everly · ServiceMarket
ueber-uns.html        Über uns / Mission / Werte
kontakt.html          Kontaktseite mit Formular (mailto, kein Backend nötig)
impressum.html        Impressum (§ 5 DDG)
datenschutz.html      Datenschutzerklärung (DSGVO)
agb.html              Allgemeine Geschäftsbedingungen
404.html              Fehlerseite
assets/
  css/style.css       Komplettes Design-System (Dark-Hero + helle Sektionen)
  js/main.js          Navigation, Scroll-Animationen, Cookie-Hinweis, Formular
  img/                Logo, Favicon, OG-Cover (alles als SVG)
robots.txt · sitemap.xml · site.webmanifest
```

## 🎨 Design

- **Marke:** Vortex (Wirbel/Energie) + Unit (Struktur). Logo = drei verwirbelte
  Klingen mit Verlauf Violett → Purpur → Cyan.
- **Look:** dunkler „Premium-SaaS“-Hero (Aurora-Gradient, Grid, Glow) kombiniert mit
  hellen, gut lesbaren Inhaltssektionen. Glas-Karten, sanfte Scroll-Reveals.
- **Schrift:** System-Font-Stack (kein externer Font-Request → kein Google-Fonts-
  DSGVO-Problem). Optional später selbst gehostete Schrift möglich (siehe unten).
- **Sprache:** Deutsch (Zielmarkt & rechtliche Anforderungen).

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

Das Formular auf `kontakt.html` sendet **keine Daten an einen Server**. Beim Absenden
öffnet es das E-Mail-Programm der Besucher:innen mit vorbereiteter Nachricht an
`info@vortexunit.de`. Vorteile: kein Backend, kein weiterer Datenverarbeiter.

E-Mail-Adresse ändern: Attribut `data-mailto` im `<form>` in `kontakt.html` sowie die
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

## 🔤 Optional: Schrift selbst hosten

Möchten Sie z. B. „Space Grotesk“/„Inter“ verwenden, laden Sie die `woff2`-Dateien
herunter, legen Sie sie unter `assets/fonts/` ab, definieren Sie `@font-face` in
`style.css` und passen Sie die `--`Font-Variablen an. **Nicht** von Google-Servern
laden — sonst entsteht ein DSGVO-Thema. Selbst gehostet bleibt alles konform.

## 🧩 Produkte

Die dargestellten Produkte stammen aus den zugehörigen Repositories:

| Produkt | Kurzbeschreibung |
|---|---|
| **SmartCart** | Smarte Einkaufs-PWA: Listen, Mehrsprach-/Sprachsuche, KI-Rezepte, Familien-Sync, Ausgaben-Tracking. |
| **Everly** | Familien-App von Schwangerschaft bis Familienalltag; 7 Module, „Mum&Me“ dauerhaft kostenlos, local-first. |
| **ServiceMarket** | „Control-Room“-Dashboard für Dienstleister: Kalender, Agenda, „Up Next“, Auftrags-Pipeline. |

Die Produkt-Mockups auf der Seite sind schlanke, in den jeweiligen Markenfarben
gestaltete CSS-Nachbildungen (keine externen Screenshots → keine externen Requests).
Echte Screenshots können später als optimierte Bilder ergänzt werden.

---

© VortexUnit — Alle Rechte vorbehalten.
