/* VortexUnit — front-end interactions. No third-party scripts. */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header background once the page scrolls ---- */
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 12); }
  window.addEventListener("scroll", onScroll, { passive: true });
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
  if ("IntersectionObserver" in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var link = byId[e.target.id];
        if (link && e.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Footer year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Hero: a slowly turning Möbius ribbon, drawn as fine platinum rulings ---- */
  var canvas = document.getElementById("ribbon");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var W = 0, H = 0, dpr = 1, running = true, t0 = performance.now(), mx = 0, my = 0;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw(time) {
      var t = (time - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      var wide = W > 900;
      var cx = wide ? W * 0.7 : W * 0.5, cy = wide ? H * 0.5 : H * 0.3;
      var R = Math.min(wide ? W * 0.21 : W * 0.42, H * 0.36);
      var band = R * 0.42;
      var ax = 1.05 + Math.sin(t * 0.21) * 0.18 + my * 0.12;   // tilt
      var ay = t * 0.16 + mx * 0.25;                          // spin
      var cA = Math.cos(ax), sA = Math.sin(ax), cB = Math.cos(ay), sB = Math.sin(ay);
      var N = 190;
      ctx.lineWidth = 1;
      for (var i = 0; i < N; i++) {
        var u = (i / N) * Math.PI * 2;
        var pts = [];
        for (var k = 0; k < 2; k++) {
          var v = k === 0 ? -1 : 1;
          var r = R + v * band * Math.cos(u / 2);
          var x = r * Math.cos(u), yy = r * Math.sin(u), z = v * band * Math.sin(u / 2);
          // rotate around Y then X
          var x1 = x * cB + z * sB, z1 = -x * sB + z * cB;
          var y1 = yy * cA - z1 * sA, z2 = yy * sA + z1 * cA;
          var p = 900 / (900 + z2);
          pts.push([cx + x1 * p, cy + y1 * p, z2]);
        }
        var depth = (pts[0][2] + pts[1][2]) / 2;
        var near = Math.max(0, Math.min(1, 0.5 - depth / (R * 2.4)));
        var hueMix = (Math.sin(u + t * 0.4) + 1) / 2;
        var rC = Math.round(233 - hueMix * 109), gC = Math.round(230 - hueMix * 131), bC = Math.round(223 + hueMix * 32);
        ctx.strokeStyle = "rgba(" + rC + "," + gC + "," + bC + "," + (0.10 + near * (wide ? 0.62 : 0.32)).toFixed(3) + ")";
        ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[1][0], pts[1][1]); ctx.stroke();
      }
      if (running && !reduceMotion) requestAnimationFrame(draw);
    }
    size();
    window.addEventListener("resize", function () { size(); if (reduceMotion || !running) draw(performance.now()); });
    if (!reduceMotion) {
      window.addEventListener("pointermove", function (e) {
        mx = (e.clientX / window.innerWidth - 0.5); my = (e.clientY / window.innerHeight - 0.5);
      }, { passive: true });
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          var vis = entries[0].isIntersecting;
          if (vis && !running) { running = true; requestAnimationFrame(draw); }
          running = vis;
        }).observe(canvas);
      }
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) running = false;
        else if (!running) { running = true; requestAnimationFrame(draw); }
      });
    }
    requestAnimationFrame(draw);
  }

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
