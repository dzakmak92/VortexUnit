/* VortexUnit — front-end interactions. No third-party scripts. */
(function () {
  "use strict";

  /* ---- Header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".mobile-menu a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Active nav link ---- */
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path || (path === "index.html" && href === "index.html")) {
      a.classList.add("active");
    }
  });

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

  /* ---- Cookie / privacy notice (no tracking cookies used; informational) ---- */
  var cookie = document.querySelector(".cookie");
  if (cookie) {
    var KEY = "vx-privacy-ack";
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    if (!stored) {
      setTimeout(function () { cookie.classList.add("show"); }, 900);
    }
    cookie.querySelectorAll("[data-cookie-ack]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        cookie.classList.remove("show");
        try { localStorage.setItem(KEY, "1"); } catch (e) {}
      });
    });
  }

  /* ---- Contact form → mailto (static site, no backend required) ---- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var to = form.getAttribute("data-mailto") || "info@vortexunit.de";
      var name = (form.elements.name && form.elements.name.value || "").trim();
      var email = (form.elements.email && form.elements.email.value || "").trim();
      var subject = (form.elements.subject && form.elements.subject.value || "Anfrage über vortexunit.de").trim();
      var message = (form.elements.message && form.elements.message.value || "").trim();
      var body =
        "Name: " + name + "\n" +
        "E-Mail: " + email + "\n\n" +
        message + "\n";
      var href = "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      window.location.href = href;
      var status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = "Ihr E-Mail-Programm wurde geöffnet. Falls nicht, schreiben Sie bitte direkt an " + to + ".";
        status.style.display = "block";
      }
    });
  }
})();
