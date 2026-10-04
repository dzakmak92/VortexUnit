/* VortexUnit — front-end interactions. No third-party scripts. */
(function () {
  "use strict";

  /* ---- Header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav-toggle");
  function closeMenu() {
    document.body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menü öffnen");
    }
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });
    document.querySelectorAll(".mobile-menu a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- Highlight the section in view (one-page navigation) ---- */
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
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Footer year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Contact form → mailto (static site, no backend required) ---- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    function say(text) {
      if (!status) return;
      status.textContent = text;
      status.style.display = "block";
    }
    function val(name) {
      var el = form.elements[name];
      return el && el.value ? String(el.value).trim() : "";
    }
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
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        say("Bitte prüfen Sie Ihre E-Mail-Adresse.");
        form.elements.email.focus();
        return;
      }
      var topic = val("topic") || "Projekt";
      var company = val("company"), budget = val("budget");
      var subject = "Anfrage: " + topic + (company ? " – " + company : "");
      var body =
        "Name: " + name + "\n" +
        "E-Mail: " + email + "\n" +
        (company ? "Unternehmen: " + company + "\n" : "") +
        "Thema: " + topic + "\n" +
        "Budgetrahmen: " + (budget || "noch offen") + "\n\n" +
        message + "\n";
      window.location.href = "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      say("Ihr E-Mail-Programm wurde mit der Nachricht geöffnet. Falls nicht, schreiben Sie bitte direkt an " + to + ".");
    });
  }
})();
