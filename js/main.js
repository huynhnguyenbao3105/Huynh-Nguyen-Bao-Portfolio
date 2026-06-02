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

  /* ——— 0. i18n: chuyển ngôn ngữ VI/EN ——— */
  var LANG_STORAGE_KEY = "portfolio_lang";

  var I18N = {
    vi: {
      "doc.title": "Huỳnh Nguyên Bảo | Portfolio",
      "doc.description":
        "Portfolio Huỳnh Nguyên Bảo — Backend / Full-stack Developer, ASP.NET Core, Spring Boot, thực tập FPT Software.",

      "header.logo": "My Portfolio",
      "header.langGroupAria": "Ngôn ngữ",
      "header.menuAria": "Mở menu",

      "nav.about": "Giới thiệu",
      "nav.experience": "Kinh nghiệm",
      "nav.projects": "Dự án",
      "nav.contact": "Liên hệ",

      "landing.aria": "Trang chào mừng",
      "landing.badge": "Backend / Full-stack · Cần Thơ",
      "landing.eyebrow": "Xin chào, tôi là",
      "landing.name": "Huỳnh Nguyên Bảo",
      "landing.lead":
        'Học <strong>Kỹ thuật phần mềm</strong> tại <strong>FPT University</strong> (<strong>2021–2025</strong>). Tập trung <strong>backend / full-stack</strong> với <strong>ASP.NET Core</strong>, <strong>Spring Boot</strong> và kiến trúc nhiều lớp.',
      "landing.stackAria": "Công nghệ chính",
      "landing.stack1": "+3 Project",
      "landing.ctaExplore": "Khám phá portfolio",
      "landing.ctaContact": "Liên hệ",
      "landing.ctaDownloadCV": "Tải CV",
      "landing.frameLabel": "Huỳnh Nguyên Bảo",
      "landing.avatarAlt": "Ảnh chân dung Huỳnh Nguyên Bảo",
      "landing.scrollAria": "Cuộn xuống giới thiệu",
      "landing.scrollLabel": "Giới thiệu",

      "about.kicker": "Giới thiệu",
      "about.title": "Về tôi",
      "about.langTitle": "Ngoại Ngữ",
      "about.langBody": "<strong>Tiếng Anh</strong> — TOEIC 500+;",
      "about.softTitle": "Kỹ năng mềm",
      "about.techTitle": "Kỹ năng kỹ thuật",
      "about.goalTitle": "Định hướng",
      "about.goalP1":
        "Thiết kế API rõ ràng, bảo mật, tính nhất quán dữ liệu và code dễ bảo trì — từ sàn giao dịch, thương mại điện tử đến mạng xã hội học tập.",
      "about.goalP2":
        "Hướng tới vị trí <strong>Backend / Full-stack Developer</strong> sau tốt nghiệp: chuyên sâu REST API, kiến trúc nhiều lớp, JWT và thiết kế cơ sở dữ liệu (Code First &amp; Database First). Luôn học thêm qua nghiên cứu, làm việc nhóm và tận dụng AI để tăng năng suất, đồng thời nâng dần tiếng Anh để làm việc với tài liệu và đội ngũ quốc tế.",

      "exp.kicker": "Kinh nghiệm",
      "exp.title": "Thực tập",
      "exp.meta1": "INTERN FPT Software",
      "exp.meta2": "Thực tập 2024",
      "exp.projectTitle": "Dự án G1Mart",
      "exp.role": "Backend Team Lead",
      "exp.summary":
        "Điều phối nhóm backend, theo dõi milestone và review kỹ thuật cho hệ thống thương mại điện tử <strong>G1Mart</strong>. Xây dựng REST API <strong>Spring Boot 3.3</strong>, Java 17, PostgreSQL, Spring Security, JWT — sản phẩm, biến thể, giỏ hàng, đơn hàng, voucher, kho, nhân viên và phân quyền; tích hợp <strong>VNPay</strong>, <strong>Cloudinary</strong>, Swagger. Rà soát logic pricing, promotion và order processing.",
      "exp.h4_1": "Quản lý &amp; Giám sát Tiến độ",
      "exp.li_1_1":
        "Chủ trì điều phối và phân chia hạng mục công việc cho nhóm Backend; thiết lập quy trình theo dõi tiến độ chặt chẽ qua các công cụ quản lý nhằm đảm bảo dự án vận hành đúng lộ trình (milestones).",
      "exp.li_1_2":
        "Thúc đẩy sự kết nối và giải quyết xung đột thông tin giữa các thành viên, duy trì hiệu suất làm việc tối ưu của toàn đội ngũ.",
      "exp.h4_2": "Kiểm soát Nghiệp vụ &amp; Đồng bộ Dữ liệu",
      "exp.li_2_1":
        "Trực tiếp rà soát, chuẩn hóa hệ thống logic phức tạp liên quan đến giá sản phẩm (pricing), các chiến dịch khuyến mãi (promotions), và toàn bộ luồng nghiệp vụ đơn hàng (order processing).",
      "exp.li_2_2":
        "Đảm bảo tính toàn vẹn dữ liệu (data integrity), ngăn chặn triệt để tình trạng sai lệch thông tin hệ thống, tối ưu hóa trải nghiệm người dùng cuối.",
      "exp.h4_3": "Báo cáo &amp; Tham vấn Chuyên gia",
      "exp.li_3_1":
        "Duy trì kênh trao đổi thường kỳ với Mentor/Cố vấn chuyên môn để định hình chiến lược và phương án kiến trúc triển khai tối ưu.",
      "exp.li_3_2":
        "Chủ động đề xuất giải pháp trong các buổi code review, nhanh chóng nhận diện và xử lý dứt điểm các điểm nghẽn kỹ thuật (technical bottlenecks) phát sinh trong quá trình vận hành.",
      "exp.linkDemo": "Live demo",
      "exp.linkRepo": "Mã nguồn GitLab",

      "projects.kicker": "Dự án",
      "projects.title": "Sản phẩm &amp; mã nguồn",
      "projects.g1mart.desc":
        "Nền tảng thương mại điện tử: <strong>storefront</strong> cho khách và <strong>admin/staff</strong> vận hành sản phẩm, kho, đơn, voucher, banner, shipper, hoàn trả, báo cáo. API <strong>Controller → Service → Repository → PostgreSQL</strong>, Spring Security + JWT, COD/VNPay, Cloudinary, dashboard thống kê. Monorepo: React 18 + Vite + MUI, Spring Boot 3.3 + Spring Data JPA, PostgreSQL, Swagger.",
      "projects.account.desc":
        "Sàn mua bán tài khoản game: đăng nhập/đăng ký, cửa hàng, ví nội bộ, lịch sử mua, trang quản trị. Kiến trúc <strong>Web → Business → DataAccess → Models</strong>; Razor dùng <strong>DTO</strong>. Luồng mua ví (transaction DB), nạp tiền qua <strong>SePay Webhook</strong> (idempotent), Cloudinary, MailKit gửi email; GitLab CI (SAST). CSDL <strong>Azure SQL</strong>.",
      "projects.fus.desc":
        "Mạng xã hội học tập: bài viết, bình luận, nhóm, tài liệu, sự kiện, tìm thành viên dự án, phản hồi, báo cáo vi phạm. Backend <strong>ClientService → APIService → Services → Repository → SQL Server</strong>; JWT Bearer, Cookie Auth, Google OAuth, Azure Blob, chat/thông báo <strong>SignalR</strong>; admin &amp; dashboard theo vai trò. .NET 8, EF Core Database First, MVC client + REST API.",
      "projects.liveDemo": "Live demo",

      "contact.kicker": "Liên hệ",
      "contact.title": "Liên hệ công việc",
      "contact.lead":
        "Sẵn sàng trao đổi về cơ hội thực tập, fresher hoặc dự án phần mềm.",
      "contact.emailLabel": "Email",
      "contact.phoneLabel": "Điện thoại",
      "contact.cta": "Gửi email",

      "footer.copy":
        "&copy; <span id=\"year\"></span> Huỳnh Nguyên Bảo. Portfolio cá nhân.",
    },

    en: {
      "doc.title": "Huynh Nguyen Bao | Portfolio",
      "doc.description":
        "Huynh Nguyen Bao — Backend / Full-stack Developer. ASP.NET Core, Spring Boot. Former FPT Software intern.",

      "header.logo": "My Portfolio",
      "header.langGroupAria": "Language",
      "header.menuAria": "Open menu",

      "nav.about": "About",
      "nav.experience": "Experience",
      "nav.projects": "Projects",
      "nav.contact": "Contact",

      "landing.aria": "Landing",
      "landing.badge": "Backend / Full-stack · Can Tho",
      "landing.eyebrow": "Hi, I'm",
      "landing.name": "Huynh Nguyen Bao",
      "landing.lead":
        "Studying <strong>Software Engineering</strong> at <strong>FPT University</strong> (<strong>2021–2025</strong>). Focused on <strong>backend / full-stack</strong> with <strong>ASP.NET Core</strong>, <strong>Spring Boot</strong>, and layered architecture.",
      "landing.stackAria": "Core stack",
      "landing.stack1": "3+ Projects",
      "landing.ctaExplore": "Explore portfolio",
      "landing.ctaContact": "Contact",
      "landing.ctaDownloadCV": "Download CV",
      "landing.frameLabel": "Huynh Nguyen Bao",
      "landing.avatarAlt": "Portrait of Huynh Nguyen Bao",
      "landing.scrollAria": "Scroll to about section",
      "landing.scrollLabel": "About",

      "about.kicker": "About",
      "about.title": "About me",
      "about.langTitle": "Languages",
      "about.langBody": "<strong>English</strong> — TOEIC 500+;",
      "about.softTitle": "Soft skills",
      "about.techTitle": "Technical skills",
      "about.goalTitle": "Focus",
      "about.goalP1":
        "I build clear, secure APIs with strong data consistency and maintainable code — from marketplaces and e-commerce to learning social platforms.",
      "about.goalP2":
        "Aiming for a <strong>Backend / Full-stack Developer</strong> role after graduation: deepening REST API design, layered architecture, JWT, and database design (Code First &amp; Database First). I keep learning through research, teamwork, and using AI to boost productivity, while improving English for international documentation and teams.",

      "exp.kicker": "Experience",
      "exp.title": "Internship",
      "exp.meta1": "INTERN FPT Software",
      "exp.meta2": "Internship 2024",
      "exp.projectTitle": "G1Mart Project",
      "exp.role": "Backend Team Lead",
      "exp.summary":
        "Led the backend team, tracked milestones, and reviewed implementation for the <strong>G1Mart</strong> e-commerce system. Built REST APIs with <strong>Spring Boot 3.3</strong>, Java 17, PostgreSQL, Spring Security, and JWT for products, variants, cart, orders, vouchers, inventory, staff, and RBAC; integrated <strong>VNPay</strong>, <strong>Cloudinary</strong>, and Swagger. Audited pricing, promotions, and order processing flows.",
      "exp.h4_1": "Project tracking &amp; coordination",
      "exp.li_1_1":
        "Coordinated backend tasks and milestones; set up tracking to keep delivery on schedule.",
      "exp.li_1_2":
        "Improved team communication and resolved blockers to maintain execution speed.",
      "exp.h4_2": "Business logic &amp; data consistency",
      "exp.li_2_1":
        "Standardized complex pricing, promotions, and order-processing logic.",
      "exp.li_2_2":
        "Ensured data integrity and reduced inconsistencies impacting user experience.",
      "exp.h4_3": "Stakeholder communication",
      "exp.li_3_1":
        "Worked with mentors regularly to refine technical direction and architecture.",
      "exp.li_3_2":
        "Proposed solutions in code reviews and addressed technical bottlenecks during delivery.",
      "exp.linkDemo": "Live demo",
      "exp.linkRepo": "GitLab repo",

      "projects.kicker": "Projects",
      "projects.title": "Work & code",
      "projects.g1mart.desc":
        "E-commerce platform with <strong>storefront</strong> and <strong>admin/staff</strong> ops for products, inventory, orders, vouchers, banners, shippers, returns, and reporting. API architecture: <strong>Controller → Service → Repository → PostgreSQL</strong>, Spring Security + JWT, COD/VNPay, Cloudinary, analytics dashboard. Monorepo: React 18 + Vite + MUI; Spring Boot 3.3 + Spring Data JPA; PostgreSQL; Swagger.",
      "projects.account.desc":
        "Game-account marketplace: auth, shop, internal wallet, purchase history, admin. Architecture: <strong>Web → Business → DataAccess → Models</strong>; Razor with <strong>DTO</strong>. Top-ups via <strong>SePay webhook</strong> (idempotent), Cloudinary, MailKit; GitLab CI (SAST). Database: <strong>Azure SQL</strong>.",
      "projects.fus.desc":
        "Learning social platform: posts, comments, groups, documents, events, project matching, feedback, and reports. Backend: <strong>ClientService → APIService → Services → Repository → SQL Server</strong>; JWT Bearer, Cookie Auth, Google OAuth, Azure Blob, real-time chat/notifications via <strong>SignalR</strong>; role-based admin dashboard. .NET 8, EF Core Database First, MVC client + REST API.",
      "projects.liveDemo": "Live demo",

      "contact.kicker": "Contact",
      "contact.title": "Let’s talk",
      "contact.lead":
        "Open to internship, fresher roles, or freelance software projects.",
      "contact.emailLabel": "Email",
      "contact.phoneLabel": "Phone",
      "contact.cta": "Send email",

      "footer.copy":
        "&copy; <span id=\"year\"></span> Huynh Nguyen Bao. Personal portfolio.",
    },
  };

  function applyLanguage(lang) {
    var dict = I18N[lang] || I18N.vi;

    document.documentElement.lang = lang;
    document.title = dict["doc.title"] || document.title;

    var metaDesc = document.getElementById("meta-description");
    if (metaDesc && dict["doc.description"]) {
      metaDesc.setAttribute("content", dict["doc.description"]);
    }

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key || dict[key] == null) return;
      el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (!key || dict[key] == null) return;
      el.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (!key || dict[key] == null) return;
      el.setAttribute("aria-label", dict[key]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (!key || dict[key] == null) return;
      el.setAttribute("alt", dict[key]);
    });

    var cvLink = document.querySelector("[data-cv-download]");
    if (cvLink) {
      if (lang === "en") {
        cvLink.setAttribute("href", "assets/Huynh-Nguyen-Bao-EN.pdf");
        cvLink.setAttribute("download", "Huynh-Nguyen-Bao-CV-EN.pdf");
      } else {
        cvLink.setAttribute("href", "assets/Huynh-Nguyen-Bao-VN.pdf");
        cvLink.setAttribute("download", "Huynh-Nguyen-Bao-CV-VI.pdf");
      }
    }

    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      var btnLang = btn.getAttribute("data-lang-set");
      var active = btnLang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function initLanguage() {
    var stored = null;
    try {
      stored = localStorage.getItem(LANG_STORAGE_KEY);
    } catch (e) {}

    var initial = stored === "en" || stored === "vi" ? stored : "vi";
    applyLanguage(initial);

    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = btn.getAttribute("data-lang-set");
        if (next !== "vi" && next !== "en") return;
        try {
          localStorage.setItem(LANG_STORAGE_KEY, next);
        } catch (e) {}
        applyLanguage(next);
      });
    });
  }

  initLanguage();

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
