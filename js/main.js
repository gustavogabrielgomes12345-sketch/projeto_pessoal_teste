/* ==========================================================================
   BLOG TEMPLATE — main.js
   Vanilla JS, sem dependências. Cada bloco é independente e opcional:
   remova o que não precisar sem quebrar o resto.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Ano automático no rodapé ---------- */
  var anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* ---------- Dark mode com persistência ---------- */
  var themeToggle = document.getElementById("theme-toggle");
  var root = document.documentElement;
  var STORAGE_KEY = "blog-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  var savedTheme = localStorage.getItem(STORAGE_KEY);
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* ---------- Barra de progresso de leitura (só existe em posts) ---------- */
  var progressBar = document.getElementById("reading-progress");
  var article = document.querySelector(".post-content");
  if (progressBar && article) {
    window.addEventListener("scroll", function () {
      var articleTop = article.offsetTop;
      var articleHeight = article.offsetHeight;
      var scrolled = window.scrollY - articleTop;
      var percent = Math.min(Math.max((scrolled / articleHeight) * 100, 0), 100);
      progressBar.style.width = percent + "%";
    }, { passive: true });
  }

  /* ---------- Lazy-load extra para navegadores sem suporte nativo ---------- */
  if (!("loading" in HTMLImageElement.prototype)) {
    var lazyImages = document.querySelectorAll("img[loading='lazy']");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          io.unobserve(img);
        }
      });
    });
    lazyImages.forEach(function (img) { io.observe(img); });
  }

  /* ---------- Prévia de código de arquivos técnicos (RSS/Sitemap) ---------- */
  var codePreview = document.getElementById("raw-code-preview");
  if (codePreview) {
    var src = codePreview.getAttribute("data-src");
    if (src) {
      fetch(src)
        .then(function (res) { return res.text(); })
        .then(function (text) { codePreview.textContent = text; })
        .catch(function () {
          codePreview.textContent = "Não foi possível carregar o conteúdo agora. Você pode abrir o arquivo diretamente pelo link acima.";
        });
    }
  }

})();
