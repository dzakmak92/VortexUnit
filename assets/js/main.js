/* VortexUnit — front-end interactions. No third-party scripts. */
(function () {
  "use strict";
  /* Always open at the top (the hero), unless a link points to a section */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) window.scrollTo(0, 0);
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

  /* ---- Header background once the page scrolls ---- */
  var header = document.querySelector(".site-header");
  var lastY = window.scrollY;
  function onScroll() {
    if (!header) return;
    var y = window.scrollY;
    header.classList.toggle("scrolled", y > 12);
    // slide away while scrolling down (so it never covers the film), come back on any scroll up
    if (Math.abs(y - lastY) > 6) {
      var down = y > lastY && y > 120 && !document.body.classList.contains("nav-open");
      header.classList.toggle("hide", down);
      lastY = y;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  if (header) header.addEventListener("focusin", function () { header.classList.remove("hide"); });
  onScroll();

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav-toggle");
  function closeMenu() {
    document.body.classList.remove("nav-open");
    if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Menü öffnen"); }
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });
    document.querySelectorAll(".mobile-menu a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---- Highlight the section in view ---- */
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (hasIO && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var link = byId[e.target.id];
        if (link && e.isIntersecting) { navLinks.forEach(function (a) { a.classList.remove("active"); }); link.classList.add("active"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---- Run something once when an element scrolls into view ---- */
  function whenVisible(el, fn, threshold) {
    if (!el) return;
    if (!hasIO || reduceMotion) { fn(el); return; }
    var o = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { fn(e.target); o.unobserve(e.target); } });
    }, { threshold: threshold || 0.3 });
    o.observe(el);
  }

  /* ---- Scroll reveal ---- */
  document.querySelectorAll(".reveal").forEach(function (el) { whenVisible(el, function (t) { t.classList.add("in"); }, 0.12); });

  /* ---- Footer year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Hero exit: as the page scrolls, the hero fades, lifts and blurs while the film takes over ---- */
  var heroBox = document.querySelector(".hero"), heroExit = 0;
  function onHeroScroll() {
    if (!heroBox) return;
    heroExit = Math.max(0, Math.min(1, window.scrollY / (window.innerHeight * 0.2)));
    heroBox.style.setProperty("--exit", heroExit.toFixed(3));
    // the first caption only appears once the hero has mostly gone
    document.documentElement.style.setProperty("--intro", Math.max(0, Math.min(1, (heroExit - 0.55) / 0.45)).toFixed(3));
  }
  window.addEventListener("scroll", onHeroScroll, { passive: true });
  onHeroScroll();

  /* ---- Hero: light particles spiralling upward around the ribbon (the vortex); on exit they scatter into dust ---- */
  var sw = document.getElementById("swirl");
  if (sw && sw.getContext && !reduceMotion) {
    var sctx = sw.getContext("2d"), SW = 0, SH = 0, sdpr = 1, parts = [], sRun = true;
    function sSize() {
      sdpr = Math.min(window.devicePixelRatio || 1, 2);
      SW = sw.clientWidth; SH = sw.clientHeight;
      sw.width = Math.round(SW * sdpr); sw.height = Math.round(SH * sdpr);
      sctx.setTransform(sdpr, 0, 0, sdpr, 0, 0);
    }
    function spawn(p) {
      p = p || {};
      p.a = Math.random() * Math.PI * 2;            // angle around the axis
      p.y = 1.05 + Math.random() * 0.1;             // height (1 = bottom, 0 = top)
      p.v = 0.0009 + Math.random() * 0.0016;        // rise speed
      p.w = 0.018 + Math.random() * 0.03;           // spin speed
      p.r = 0.6 + Math.random() * 1.8;              // dot size
      p.c = Math.random() < 0.55 ? "124,99,255" : (Math.random() < 0.5 ? "255,255,255" : "185,169,255");
      return p;
    }
    for (var i = 0; i < 140; i++) { var p = spawn(); p.y = Math.random() * 1.1; parts.push(p); }
    function sDraw() {
      sctx.clearRect(0, 0, SW, SH);
      var wide = SW > 980;
      var cx = wide ? SW * 0.72 : SW * 0.5, top = wide ? SH * 0.12 : SH * 0.5, bottom = SH * 0.98;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.v; p.a += p.w;
        if (p.y < -0.05) spawn(p);
        var h = Math.max(0, Math.min(1, p.y));
        var radius = ((wide ? 70 : 50) + (1 - h) * (wide ? 230 : 150)) * (1 + heroExit * 3.2);   // widens as it climbs; scatters on exit
        var x = cx + Math.cos(p.a) * radius - heroExit * (cx - SW / 2);
        var yy = top + h * (bottom - top) + Math.sin(p.a) * radius * (0.18 + heroExit * 0.5);
        var front = Math.sin(p.a) > 0;
        var alpha = (front ? 0.85 : 0.35) * Math.min(1, (1.05 - p.y) * 3) * Math.min(1, p.y * 6 + 0.2);
        sctx.beginPath();
        sctx.fillStyle = "rgba(" + p.c + "," + alpha.toFixed(3) + ")";
        sctx.shadowColor = "rgba(124,99,255,.8)"; sctx.shadowBlur = front ? 8 : 0;
        sctx.arc(x, yy, p.r * (front ? 1.3 : 1), 0, Math.PI * 2);
        sctx.fill();
      }
      if (sRun) requestAnimationFrame(sDraw);
    }
    sSize(); window.addEventListener("resize", sSize);
    if (hasIO) new IntersectionObserver(function (e) { var v = e[0].isIntersecting; if (v && !sRun) { sRun = true; requestAnimationFrame(sDraw); } sRun = v; }).observe(sw);
    requestAnimationFrame(sDraw);
  }

  /* ---- Background film: hidden on the hero, played in full through the four scenes, then it gives way to the offer.
          60 frames in 5 sprite sheets; each scene caption is pinned to its moment of the film. ---- */
  var bg = document.querySelector(".bgfilm"), fc = document.getElementById("film");
  if (bg && fc && fc.getContext) {
    var fctx = fc.getContext("2d"), veil = bg.querySelector(".veil"), sheets = [], FR = 60, PER = 12, COLS = 4, FW = 960, FH = 540, current = -1;
    var heroEl = document.querySelector(".hero"), endEl = document.getElementById("angebot");
    var scenes = Array.prototype.slice.call(document.querySelectorAll("[data-scene]"));
    var sceneFrame = [5, 22, 41, 57];                       // chaos, vortex, milestones, result
    var anchors = [], fadeIn = 0, fadeOut = 0, sceneY = [], vh = window.innerHeight;
    function topOf(el) { var y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; }
    function layout() {
      vh = window.innerHeight;
      var d = Math.min(window.devicePixelRatio || 1, 2);
      fc.width = Math.round(window.innerWidth * d); fc.height = Math.round(vh * d);
      fadeIn = topOf(heroEl);                                 // film fades in while the hero dissolves
      fadeOut = endEl ? topOf(endEl) - vh * 0.75 : document.body.scrollHeight;  // last frame as the offer arrives, then it fades
      sceneY = scenes.map(function (el) { return topOf(el) + el.offsetHeight / 2 - vh / 2; });
      anchors = [[fadeIn, 0]].concat(sceneY.map(function (y, i) { return [y, sceneFrame[i] || 0]; })).concat([[fadeOut, FR - 1]]);
      current = -1; update();
    }
    function frameAt(y) {
      if (y <= anchors[0][0]) return 0;
      for (var i = 1; i < anchors.length; i++) {
        var a = anchors[i - 1], b = anchors[i];
        if (y <= b[0]) return a[1] + (b[1] - a[1]) * (y - a[0]) / Math.max(1, b[0] - a[0]);
      }
      return FR - 1;
    }
    function drawFrame(n) {
      var sh = sheets[Math.floor(n / PER)];
      if (!sh || !sh.complete || !sh.naturalWidth) return false;
      var k = n % PER, sx = (k % COLS) * FW, sy = Math.floor(k / COLS) * FH;
      var cw = fc.width, ch = fc.height, scale = Math.max(cw / FW, ch / FH);
      var dw = FW * scale, dh = FH * scale;
      var dx = cw * 0.5 - dw * (cw > ch ? 0.5 : 0.56), dy = (ch - dh) / 2;
      dx = Math.max(cw - dw, Math.min(0, dx));
      fctx.drawImage(sh, sx, sy, FW, FH, dx, dy, dw, dh);
      return true;
    }
    function clamp(v) { return Math.max(0, Math.min(1, v)); }
    function update() {
      var y = window.scrollY;
      var vis = clamp((y - fadeIn) / (vh * 0.2)) * (1 - clamp((y - fadeOut + vh * 0.2) / (vh * 0.6)));
      bg.style.opacity = vis.toFixed(3);
      if (vis > 0) {
        var n = Math.max(0, Math.min(FR - 1, Math.round(frameAt(y))));
        if (n !== current && drawFrame(n)) current = n;
      }
      // the veil lifts while a scene is centred, and returns over the content sections
      var near = 0;
      for (var i = 0; i < sceneY.length; i++) near = Math.max(near, 1 - Math.abs(y - sceneY[i]) / (vh * 0.7));
      if (veil) veil.style.opacity = (1 - clamp(near) * 0.92).toFixed(3);
    }
    for (var si = 0; si < 5; si++) {
      var im = new Image();
      im.decoding = "async";
      im.onload = function () { current = -1; update(); };
      im.src = "assets/img/hf/film-" + si + ".webp";
      sheets.push(im);
    }
    var ticking = false;
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; update(); }); } }, { passive: true });
    window.addEventListener("resize", layout);
    window.addEventListener("load", layout);
    layout();
  }

  /* ---- Milestone counters count up to 1K, 10K, 100K, one after another ---- */
  function fmt(v) { return v >= 1000 ? Math.round(v / 1000) + "K" : String(Math.round(v)); }
  whenVisible(document.querySelector("[data-milestones]"), function (el) {
    el.querySelectorAll("[data-count]").forEach(function (b, i) {
      var target = +b.getAttribute("data-count");
      if (reduceMotion) { b.textContent = fmt(target); return; }
      setTimeout(function () {
        var t0 = performance.now(), dur = 1000;
        (function step(t) {
          var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
          b.textContent = fmt(target * e);
          if (k < 1) requestAnimationFrame(step);
        })(t0);
      }, i * 500);
    });
  }, 0.6);

  /* ---- Business card: today's tasks complete themselves, then the day starts again ---- */
  var tasks = document.querySelectorAll("[data-tasks] li");
  whenVisible(document.querySelector("[data-tasks]"), function () {
    if (reduceMotion) { tasks.forEach(function (li) { li.classList.add("done"); }); return; }
    var k = 0;
    setInterval(function () {
      if (k === tasks.length) { tasks.forEach(function (li) { li.classList.remove("done"); }); k = 0; return; }
      tasks[k++].classList.add("done");
    }, 1100);
  }, 0.4);

  /* ---- Creator card: the income line draws and new memberships keep arriving ---- */
  whenVisible(document.querySelector("[data-income]"), function (el) {
    el.classList.add("in");
    var toast = el.querySelector("[data-toast]");
    if (reduceMotion || !toast) return;
    var msgs = ["+ Neue Mitgliedschaft", "+ Kurs verkauft", "+ Abo verlängert", "+ Neuer Kunde"], k = 0;
    function show() { toast.firstChild.nodeValue = msgs[k++ % msgs.length] + " "; toast.classList.remove("show"); void toast.offsetWidth; toast.classList.add("show"); }
    setTimeout(show, 1600); setInterval(show, 3600);
  }, 0.4);

  /* ---- Steps: the progress line fills ---- */
  whenVisible(document.querySelector("[data-steps]"), function (el) { el.classList.add("in"); }, 0.4);

  /* ---- Audience buttons preselect the contact form ---- */
  document.querySelectorAll("[data-audience]").forEach(function (a) {
    a.addEventListener("click", function () {
      var r = document.querySelector('input[name="audience"][value="' + a.getAttribute("data-audience") + '"]');
      if (r) r.checked = true;
    });
  });

  /* ---- Contact form → mailto (static site, no backend required) ---- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    function say(text) { if (status) { status.textContent = text; status.style.display = "block"; } }
    function val(name) { var el = form.elements[name]; return el && el.value ? String(el.value).trim() : ""; }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var to = form.getAttribute("data-mailto") || "info@vortexunit.de";
      var name = val("name"), email = val("email"), message = val("message");
      if (!name || !email || !message) {
        say("Bitte füllen Sie Name, E-Mail und Nachricht aus.");
        var first = !name ? form.elements.name : !email ? form.elements.email : form.elements.message;
        if (first) first.focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say("Bitte prüfen Sie Ihre E-Mail-Adresse."); form.elements.email.focus(); return; }
      var who = val("audience") || "Unternehmen";
      var body = "Name: " + name + "\nE-Mail: " + email + "\nIch bin: " + who + "\n\n" + message + "\n";
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent("Anfrage (" + who + ") über vortexunit.de") + "&body=" + encodeURIComponent(body);
      say("Ihr E-Mail-Programm wurde mit der Nachricht geöffnet. Falls nicht, schreiben Sie bitte direkt an " + to + ".");
    });
  }
})();
