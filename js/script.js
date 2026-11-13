/**
 * Zenius AI — interaktivitas halaman.
 * Tanpa framework, menggunakan vanilla DOM + IntersectionObserver.
 */

(function () {
  "use strict";

  // ----- Navigasi mobil -----
  const navToggle = document.querySelector(".nav__toggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      // Tutup menu saat tautan diklik
      navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          navLinks.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    });

    // Tutup menu saat ukuran layar diperbesar (klik di luar / rotasi)
    function closeOnResize() {
      if (window.innerWidth > 768) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
    window.addEventListener("resize", closeOnResize);
  }

  // ----- Smooth scroll untuk tautan dalam halaman -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80; // ruang untuk sticky header
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // ----- Scroll reveal (fade-in) -----
  const revealElements = document.querySelectorAll(
    ".card, .step, .contact__form"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
  }

  // ----- Formulir kontak (simulasi pengiriman) -----
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm && formFeedback) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value.trim();

      let hasError = false;

      if (!name) {
        showFeedback("Nama tidak boleh kosong.", false);
        hasError = true;
      }
      if (!email || !isValidEmail(email)) {
        showFeedback("Alamat email tidak valid.", false);
        hasError = true;
      }
      if (!service) {
        showFeedback("Pilih layanan yang tertarik.", false);
        hasError = true;
      }
      if (message.length < 10) {
        showFeedback("Pesan terlalu singkat (minimal 10 karakter).", false);
        hasError = true;
      }

      if (!hasError) {
        // Simulasi pengiriman API — tidak ada API key di sini.
        showFeedback("Pesan terkirim! Tim kami akan menanggapinya dalam 1–2 hari kerja.");
        contactForm.reset();
        setTimeout(function () {
          hideFeedback();
        }, 6000);
      }
    });
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function showFeedback(text, isSuccess) {
    formFeedback.textContent = text;
    formFeedback.style.color = isSuccess
      ? "var(--color-success)"
      : "var(--color-text)";
  }

  function hideFeedback() {
    formFeedback.textContent = "";
  }
})();
