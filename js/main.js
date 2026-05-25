/**
 * main.js — Hành vi tương tác portfolio (Huỳnh Nguyên Bảo)
 *
 * Khối chức năng (theo thứ tự chạy):
 * 1. Năm footer (#year)
 * 2. Menu mobile (.nav-toggle ↔ #site-nav)
 * 3. Cuộn mượt tới anchor (#landing, #about, ...)
 * 4. Header khi scroll + thanh tiến độ (.scroll-progress__bar)
 * 5. Parallax nhẹ blob theo chuột (--pointer-x/y) — desktop
 * 6. Animation reveal / stagger khi section vào viewport
 * 7. Highlight link menu đang xem (section đang hiển thị)
 *
 * Tắt animation: user bật "reduce motion" trong OS → chỉ hiện nội dung, không observer.
 */
(function () {
  document.documentElement.classList.add("js-enabled");

  /* ——— 1. Footer: năm hiện tại ——— */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ——— 2. Menu mobile: hamburger mở/đóng .site-nav ——— */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  /* ——— 3. Smooth scroll: mọi link href="#..." ——— */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ——— 4. Header + thanh progress khi cuộn trang ——— */
  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress__bar");
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (header) {
    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);

      if (progressBar) {
        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || document.body.scrollTop;
        const height = doc.scrollHeight - doc.clientHeight;
        const pct = height > 0 ? (scrollTop / height) * 100 : 0;
        progressBar.style.width = pct + "%";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ——— 5. Blob nền theo con trỏ (chỉ desktop, có chuột) ——— */
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener(
      "mousemove",
      function (e) {
        var x = (e.clientX / window.innerWidth - 0.5) * 2;
        var y = (e.clientY / window.innerHeight - 0.5) * 2;
        document.documentElement.style.setProperty("--pointer-x", String(x));
        document.documentElement.style.setProperty("--pointer-y", String(y));
      },
      { passive: true }
    );
  }

  /** Gắn class stagger + delay CSS cho từng phần tử con (animation lần lượt) */
  function setupStaggerGroup(root, itemSelector, stepMs) {
    if (!root) return;
    root.classList.add("stagger-group");
    root.querySelectorAll(itemSelector).forEach(function (item, i) {
      item.classList.add("stagger-item");
      item.style.setProperty("--stagger-delay", String(i * stepMs) + "ms");
    });
  }

  function markVisible(el) {
    el.classList.add("is-visible");
    if (el.classList.contains("stagger-group")) {
      el.classList.add("is-visible");
    }
  }

  /* ——— 6. Reveal khi scroll: gán class .reveal / stagger cho từng khu vực HTML ——— */
  if (!prefersReduced) {
    document.querySelectorAll(".about-card").forEach(function (card) {
      setupStaggerGroup(card, ".tag-list li", 55);
    });

    document.querySelectorAll(".project-card").forEach(function (card) {
      card.classList.add("reveal", "reveal--scale");
      setupStaggerGroup(card, ".project-card__tags span", 45);
      setupStaggerGroup(card, ".project-card__actions .btn", 70);
      var demoGrid = card.querySelector(".demo-credentials-grid");
      if (demoGrid) {
        demoGrid.classList.add("stagger-group");
        demoGrid.querySelectorAll(".demo-credentials").forEach(function (box, i) {
          box.style.setProperty("--stagger-delay", String(i * 90) + "ms");
        });
      }
    });

    var timeline = document.querySelector(".timeline-card");
    if (timeline) {
      timeline.classList.add("reveal", "reveal--left");
      setupStaggerGroup(timeline, ".timeline-card__duties li", 50);
      timeline.querySelectorAll(".timeline-card__duty-heading").forEach(function (
        heading,
        i
      ) {
        heading.style.setProperty("--duty-delay", String(220 + i * 80) + "ms");
      });
      setupStaggerGroup(timeline, ".timeline-card__links .link-arrow", 80);
    }

    document.querySelectorAll(".section__header").forEach(function (headerEl, i) {
      headerEl.classList.add("reveal");
      headerEl.style.setProperty("--reveal-delay", String(i * 40) + "ms");
    });

    document.querySelectorAll(".about-card").forEach(function (card, i) {
      card.classList.add("reveal");
      card.style.setProperty("--reveal-delay", String(i * 85) + "ms");
    });

    var contact = document.querySelector(".contact-wrap");
    if (contact) {
      contact.classList.add("reveal", "reveal--scale");
      setupStaggerGroup(contact, ".contact-list__item", 90);
    }

    var footer = document.querySelector(".site-footer");
    if (footer) {
      footer.classList.add("reveal");
    }

    var revealEls = document.querySelectorAll(
      ".reveal, .site-footer, .demo-credentials-grid"
    );

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          markVisible(entry.target);
          if (entry.target.classList.contains("project-card")) {
            var grid = entry.target.querySelector(".demo-credentials-grid");
            if (grid) markVisible(grid);
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document
      .querySelectorAll(".reveal, .stagger-group, .site-footer, .section__header")
      .forEach(function (el) {
        el.classList.add("is-visible");
      });
    document.querySelectorAll(".stagger-item").forEach(function (el) {
      el.style.opacity = "1";
    });
    if (progressBar) progressBar.style.width = "0%";
  }

  /* ——— 7. Menu: class .is-active trên link trùng section đang nhìn ——— */
  var sectionIds = ["about", "experience", "projects", "contact"];
  var navLinks = document.querySelectorAll(".site-nav a[href^='#']");

  if (navLinks.length && !prefersReduced) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            var href = link.getAttribute("href");
            link.classList.toggle("is-active", href === "#" + id);
          });
        });
      },
      { threshold: 0.35, rootMargin: "-40% 0px -50% 0px" }
    );

    sectionIds.forEach(function (id) {
      var section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }
})();
