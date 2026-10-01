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
 * 7. Highlight link menu (theo vị trí cuộn, đã gộp vào khối 4)
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

      "header.logo": "Portfolio",
      "header.langGroupAria": "Ngôn ngữ",
      "header.langTooltip": "Chuyển ngôn ngữ",
      "header.menuAria": "Mở menu",

      "nav.about": "Giới thiệu",
      "nav.experience": "Kinh nghiệm",
      "nav.projects": "Dự án",
      "nav.contact": "Liên hệ",

      "landing.aria": "Trang chào mừng",
      "landing.eyebrow": "Xin chào, tôi là",
      "landing.name": "HUỲNH NGUYÊN BẢO",
      "landing.role": "BACKEND / FULL-STACK DEVELOPER",
      "landing.avatarAlt": "Ảnh chân dung Huỳnh Nguyên Bảo",
      "landing.scrollAria": "Cuộn xuống giới thiệu",
      "landing.scrollLabel": "Giới thiệu",

      "about.title": "Giới thiệu",
      "about.greeting": "Hallo!",
      "about.heroStatement":
        'tập trung vào kiến trúc hệ thống,<br>bảo mật API và tối ưu dữ liệu<br><span class="about-showcase__muted">để xây dựng những giải pháp<br>giải quyết bài toán thực tế</span>',
      "about.pill1": ".NET & ASP.NET Core",
      "about.pill2": "Spring Boot & Java",
      "about.pill3": "PostgreSQL & Database",
      "about.pill4": "REST API & Security",
      "about.pill5": "React & Full-stack",
      "about.pill6": "Docker & DevOps",

      "techSlider.badge": "CÔNG NGHỆ CỐT LÕI",
      "techSlider.eyebrow": "Nền tảng kỹ thuật và kiến trúc",
      "techSlider.dotnetCategory": "MICROSOFT ECOSYSTEM",
      "techSlider.dotnetFocus": "CLEAN ARCHITECTURE & SECURE APIS",
      "techSlider.dotnetTitle": ".NET & ASP.NET Core",
      "techSlider.dotnetDesc":
        "Xây dựng RESTful API hiệu năng cao với ASP.NET Core và Clean Architecture, bảo mật JWT, tối ưu EF Core và tích hợp cổng thanh toán trực tuyến.",
      "techSlider.javaCategory": "ENTERPRISE PLATFORM",
      "techSlider.javaFocus": "SPRING BOOT & SCALABLE SERVICES",
      "techSlider.javaTitle": "Spring Boot & Java",
      "techSlider.javaDesc":
        "Phát triển dịch vụ backend doanh nghiệp với Spring Boot, bảo mật qua Spring Security, tối ưu truy vấn Hibernate/JPA và quản trị giao dịch an toàn.",
      "techSlider.dockerCategory": "CONTAINER & DEVOPS",
      "techSlider.dockerFocus": "DOCKER & CI/CD AUTOMATION",
      "techSlider.dockerTitle": "Docker & DevOps",
      "techSlider.dockerDesc":
        "Đóng gói ứng dụng với Docker, đồng nhất môi trường phát triển qua Docker Compose, tự động hóa quy trình CI/CD và tối ưu hóa triển khai dịch vụ.",

      "techSlider.phpCategory": "WEB & BACKEND ECOSYSTEM",
      "techSlider.phpFocus": "LARAVEL & RESTFUL SERVICES",
      "techSlider.phpTitle": "PHP & Laravel Framework",
      "techSlider.phpDesc":
        "Xây dựng ứng dụng web chuẩn kiến trúc MVC với Laravel, tối ưu quan hệ Eloquent ORM, thiết kế RESTful API linh hoạt và quản trị MySQL hiệu quả.",

      "techSlider.nestCategory": "NODE.JS ECOSYSTEM",
      "techSlider.nestFocus": "TYPESCRIPT & ENTERPRISE ARCHITECTURE",
      "techSlider.nestTitle": "NestJS & TypeScript",
      "techSlider.nestDesc":
        "Phát triển backend module hóa chuẩn doanh nghiệp với NestJS & TypeScript, tận dụng Dependency Injection và sẵn sàng mở rộng kiến trúc vi dịch vụ.",

      "techSlider.figmaCategory": "UI/UX & PROTOTYPING",
      "techSlider.figmaFocus": "DESIGN SYSTEMS & WIREFRAMING",
      "techSlider.figmaTitle": "Figma UI/UX Design",
      "techSlider.figmaDesc":
        "Thiết kế giao diện người dùng hiện đại, xây dựng Design System chuẩn mực, wireframe và prototype tương tác cao giúp tối ưu hóa trải nghiệm sản phẩm.",

      "techSlider.githubCategory": "VERSION CONTROL & CI/CD",
      "techSlider.githubFocus": "CODE COLLABORATION & GITHUB ACTIONS",
      "techSlider.githubTitle": "GitHub & CI/CD Pipelines",
      "techSlider.githubDesc":
        "Quản lý mã nguồn tập trung với Gitflow, tối ưu quy trình Code Review và tự động hóa kiểm thử, phát hành liên tục qua GitHub Actions CI/CD.",

      "techSlider.gitlabCategory": "DEVOPS LIFECYCLE",
      "techSlider.gitlabFocus": "GITLAB CI/CD & PIPELINE AUTOMATION",
      "techSlider.gitlabTitle": "GitLab & DevOps Automation",
      "techSlider.gitlabDesc":
        "Quản trị toàn diện vòng đời DevOps trên GitLab, thiết lập pipeline tự động qua .gitlab-ci.yml, phân quyền repository và giám sát triển khai liên tục.",

      "about.softTitle": "Kỹ năng mềm",
      "about.techTitle": "Kỹ năng kỹ thuật",
      "about.goalTitle": "Định hướng",
      "about.goalP1":
        "Thiết kế API rõ ràng, bảo mật, tính nhất quán dữ liệu và code dễ bảo trì — từ sàn giao dịch, thương mại điện tử đến mạng xã hội học tập.",
      "about.goalP2":
        "Hướng tới vị trí <strong>Backend / Full-stack Developer</strong> sau tốt nghiệp: chuyên sâu REST API, kiến trúc nhiều lớp, JWT và thiết kế cơ sở dữ liệu (Code First &amp; Database First). Luôn học thêm qua nghiên cứu, làm việc nhóm và tận dụng AI để tăng năng suất, đồng thời nâng dần tiếng Anh để làm việc với tài liệu và đội ngũ quốc tế.",

      "who.eyebrow": "Về bản thân tôi",
      "who.title":
        'Chinh phục công nghệ <span class="who-title__muted">từ 2021</span>',
      "who.bio":
        "Kỹ sư Backend / Full-stack với niềm đam mê xây dựng các hệ thống web có khả năng mở rộng cao, bảo mật và trải nghiệm mượt mà. Tốt nghiệp Kỹ thuật Phần mềm tại Đại học FPT Cần Thơ, tôi đã tích lũy kinh nghiệm thực tế qua vai trò Team Lead tại FPT Software và các dự án thương mại điện tử, mạng xã hội quy mô lớn.",
      "who.authorRole": "Backend Developer",
      "who.role1": "Full-stack Developer",
      "who.org1": "AccountMarket — Sàn giao dịch",
      "who.time1": "03/2026 &rarr; 04/2026",
      "who.role2": "Backend Team Lead",
      "who.org2": "FUS — Mạng xã hội học tập",
      "who.time2": "05/2025 &rarr; 08/2025",
      "who.role3": "Backend Team Lead",
      "who.org3": "FPT Software — Dự án G1Mart",
      "who.time3": "04/2024 &rarr; 08/2024",
      "who.role4": "Cử nhân Kỹ thuật PM",
      "who.org4": "Đại học FPT Cần Thơ",
      "who.time4": "2021 &rarr; 2025",

      "process.eyebrow": "Cách tôi làm việc",
      "process.title": "Quy trình làm việc",
      "process.step1Title": "Discover",
      "process.step1Desc":
        "Thấu hiểu mục tiêu, yêu cầu người dùng và thách thức kỹ thuật thông qua nghiên cứu và chiến lược rõ ràng.",
      "process.step2Title": "Design",
      "process.step2Desc":
        "Chuyển hóa giải pháp thành kiến trúc hệ thống trực quan, tinh gọn, bảo mật và trải nghiệm người dùng tối ưu.",
      "process.step3Title": "Deliver",
      "process.step3Desc":
        "Kiểm thử toàn diện, tối ưu hóa hiệu năng và triển khai sản phẩm hoàn thiện với độ chính xác cao.",

      "exp.title": "Kinh nghiệm",
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

      "projects.title": "Dự án",
      "projects.g1mart.desc":
        "Nền tảng thương mại điện tử: <strong>storefront</strong> cho khách và <strong>admin/staff</strong> vận hành sản phẩm, kho, đơn, voucher, banner, shipper, hoàn trả, báo cáo. API <strong>Controller → Service → Repository → PostgreSQL</strong>, Spring Security + JWT, COD/VNPay, Cloudinary, dashboard thống kê. Monorepo: React 18 + Vite + MUI, Spring Boot 3.3 + Spring Data JPA, PostgreSQL, Swagger.",
      "projects.account.desc":
        "Sàn mua bán tài khoản game: đăng nhập/đăng ký, cửa hàng, ví nội bộ, lịch sử mua, trang quản trị. Kiến trúc <strong>Web → Business → DataAccess → Models</strong>; Razor dùng <strong>DTO</strong>. Luồng mua ví (transaction DB), nạp tiền qua <strong>SePay Webhook</strong> (idempotent), Cloudinary, MailKit gửi email; GitLab CI (SAST). CSDL <strong>Azure SQL</strong>.",
      "projects.fus.desc":
        "Mạng xã hội học tập: bài viết, bình luận, nhóm, tài liệu, sự kiện, tìm thành viên dự án, phản hồi, báo cáo vi phạm. Backend <strong>ClientService → APIService → Services → Repository → SQL Server</strong>; JWT Bearer, Cookie Auth, Google OAuth, Azure Blob, chat/thông báo <strong>SignalR</strong>; admin &amp; dashboard theo vai trò. .NET 8, EF Core Database First, MVC client + REST API.",
      "projects.liveDemo": "Live demo",

      "contact.title": "Liên hệ",
      "contact.lead":
        "Sẵn sàng trao đổi về cơ hội thực tập, fresher hoặc dự án phần mềm.",
      "contact.emailLabel": "Email",
      "contact.phoneLabel": "Điện thoại",
      "contact.cta": "Gửi email",

      "fab.tooltip": "Thao tác nhanh",
      "fab.scrollTop": "Lên đầu trang",
      "fab.ai": "Trợ lý AI",
      "fab.chat": "Nhắn tin",
      "fab.botTitle": "Trợ lý portfolio",
      "fab.botPlaceholder": "Hỏi về kỹ năng, dự án…",
      "fab.chatTitle": "Messages",
      "fab.chatEmpty": "Chưa có tin nhắn",
      "fab.botWelcome":
        "Xin chào! Mình có thể giúp bạn tìm hiểu về kỹ năng, kinh nghiệm và dự án của Bảo.",
      "fab.optSkills": "Kỹ năng",
      "fab.optExp": "Kinh nghiệm",
      "fab.optProjects": "Dự án",
      "fab.optContact": "Liên hệ",
      "fab.replySkills":
        "Bảo làm Backend / Full-stack với ASP.NET Core, Spring Boot, SQL và các stack web hiện đại.",
      "fab.replyExp":
        "Có kinh nghiệm thực tập tại FPT Software và các dự án cá nhân / học thuật.",
      "fab.replyProjects":
        "Xem phần Projects phía dưới để xem các sản phẩm nổi bật, hoặc hỏi mình chi tiết hơn.",
      "fab.replyContact":
        "Bạn có thể gửi email huynhnguyenbao3105@gmail.com hoặc nhắn Zalo 0939 082 419.",
      "fab.botFallback":
        "Cảm ơn câu hỏi! Đây là bản demo UI — hãy dùng các gợi ý bên dưới hoặc cuộn xem portfolio.",

      "footer.copy":
        '&copy; <span id="year"></span> Huỳnh Nguyên Bảo. Portfolio cá nhân.',
    },

    en: {
      "doc.title": "Huynh Nguyen Bao | Portfolio",
      "doc.description":
        "Huynh Nguyen Bao — Backend / Full-stack Developer. ASP.NET Core, Spring Boot. Former FPT Software intern.",

      "header.logo": "Portfolio",
      "header.langGroupAria": "Language",
      "header.langTooltip": "Switch language",
      "header.menuAria": "Open menu",

      "nav.about": "About",
      "nav.experience": "Experience",
      "nav.projects": "Projects",
      "nav.contact": "Contact",

      "landing.aria": "Landing",
      "landing.eyebrow": "Hi, I'm",
      "landing.name": "HUYNH NGUYEN BAO",
      "landing.role": "BACKEND / FULL-STACK DEVELOPER",
      "landing.avatarAlt": "Portrait of Huynh Nguyen Bao",
      "landing.scrollAria": "Scroll to about section",
      "landing.scrollLabel": "About",

      "about.title": "About",
      "about.greeting": "Hallo!",
      "about.heroStatement":
        'focus is on clean architecture,<br>secure APIs, and data integrity<br><span class="about-showcase__muted">to craft systems<br>that solve real problems</span>',
      "about.pill1": ".NET & ASP.NET Core",
      "about.pill2": "Spring Boot & Java",
      "about.pill3": "PostgreSQL & Database",
      "about.pill4": "REST API & Security",
      "about.pill5": "React & Full-stack",
      "about.pill6": "Docker & DevOps",

      "techSlider.badge": "CORE STACK",
      "techSlider.eyebrow": "Core Technologies and Architecture",
      "techSlider.dotnetCategory": "MICROSOFT ECOSYSTEM",
      "techSlider.dotnetFocus": "CLEAN ARCHITECTURE & SECURE APIS",
      "techSlider.dotnetTitle": ".NET & ASP.NET Core",
      "techSlider.dotnetDesc":
        "Engineering high-performance RESTful APIs with ASP.NET Core & Clean Architecture, JWT authentication, EF Core, and payment gateways.",
      "techSlider.javaCategory": "ENTERPRISE PLATFORM",
      "techSlider.javaFocus": "SPRING BOOT & SCALABLE SERVICES",
      "techSlider.javaTitle": "Spring Boot & Java",
      "techSlider.javaDesc":
        "Developing enterprise backend services with Spring Boot, Spring Security authorization, Hibernate/JPA queries, and safe transactions.",
      "techSlider.dockerCategory": "CONTAINER & DEVOPS",
      "techSlider.dockerFocus": "DOCKER & CI/CD AUTOMATION",
      "techSlider.dockerTitle": "Docker & DevOps",
      "techSlider.dockerDesc":
        "Containerizing applications with Docker, standardizing dev environments via Docker Compose, and automating CI/CD service delivery.",

      "techSlider.phpCategory": "WEB & BACKEND ECOSYSTEM",
      "techSlider.phpFocus": "LARAVEL & RESTFUL SERVICES",
      "techSlider.phpTitle": "PHP & Laravel Framework",
      "techSlider.phpDesc":
        "Building MVC web applications with Laravel, optimizing Eloquent ORM relations, designing RESTful APIs, and managing MySQL data.",

      "techSlider.nestCategory": "NODE.JS ECOSYSTEM",
      "techSlider.nestFocus": "TYPESCRIPT & ENTERPRISE ARCHITECTURE",
      "techSlider.nestTitle": "NestJS & TypeScript",
      "techSlider.nestDesc":
        "Building scalable modular backends with NestJS & TypeScript, leveraging Dependency Injection and robust microservices architecture.",

      "techSlider.figmaCategory": "UI/UX & PROTOTYPING",
      "techSlider.figmaFocus": "DESIGN SYSTEMS & WIREFRAMING",
      "techSlider.figmaTitle": "Figma UI/UX Design",
      "techSlider.figmaDesc":
        "Designing modern user interfaces, crafting consistent Design Systems, wireframes, and interactive prototypes for optimal experiences.",

      "techSlider.githubCategory": "VERSION CONTROL & CI/CD",
      "techSlider.githubFocus": "CODE COLLABORATION & GITHUB ACTIONS",
      "techSlider.githubTitle": "GitHub & CI/CD Pipelines",
      "techSlider.githubDesc":
        "Centralized version control with Gitflow, streamlined Code Review workflows, and continuous CI/CD pipelines via GitHub Actions.",

      "techSlider.gitlabCategory": "DEVOPS LIFECYCLE",
      "techSlider.gitlabFocus": "GITLAB CI/CD & PIPELINE AUTOMATION",
      "techSlider.gitlabTitle": "GitLab & DevOps Automation",
      "techSlider.gitlabDesc":
        "End-to-end DevOps on GitLab, configuring automated .gitlab-ci.yml pipelines, enterprise repo access, and deployment monitoring.",

      "about.softTitle": "Soft skills",
      "about.techTitle": "Technical skills",
      "about.goalTitle": "Focus",
      "about.goalP1":
        "I build clear, secure APIs with strong data consistency and maintainable code — from marketplaces and e-commerce to learning social platforms.",
      "about.goalP2":
        "Aiming for a <strong>Backend / Full-stack Developer</strong> role after graduation: deepening REST API design, layered architecture, JWT, and database design (Code First &amp; Database First). I keep learning through research, teamwork, and using AI to boost productivity, while improving English for international documentation and teams.",

      "who.eyebrow": "Who Am I",
      "who.title":
        'Pushing Boundaries <span class="who-title__muted">since 2021</span>',
      "who.bio":
        "A backend / full-stack developer passionate about engineering secure, scalable web architectures and intuitive digital experiences. Graduated in Software Engineering from FPT University Can Tho, I have gained solid hands-on experience through leading backend teams at FPT Software and building robust e-commerce &amp; learning platforms.",
      "who.authorRole": "Backend Developer",
      "who.role1": "Full-stack Developer",
      "who.org1": "AccountMarket — Marketplace",
      "who.time1": "03/2026 &rarr; 04/2026",
      "who.role2": "Backend Team Lead",
      "who.org2": "FUS — Social Learning Platform",
      "who.time2": "05/2025 &rarr; 08/2025",
      "who.role3": "Backend Team Lead",
      "who.org3": "FPT Software — G1Mart Project",
      "who.time3": "04/2024 &rarr; 08/2024",
      "who.role4": "B.S. Software Engineering",
      "who.org4": "FPT University Can Tho",
      "who.time4": "2021 &rarr; 2025",

      "process.eyebrow": "How I Work",
      "process.title": "Here's how it works",
      "process.step1Title": "Discover",
      "process.step1Desc":
        "Understanding your goals, users, and challenges through research and strategy.",
      "process.step2Title": "Design",
      "process.step2Desc":
        "Transforming insights into intuitive, beautiful, and functional product experiences.",
      "process.step3Title": "Deliver",
      "process.step3Desc":
        "Testing, refining, and launching the final product with clarity and precision.",

      "exp.title": "Experience",
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

      "projects.title": "Projects",
      "projects.g1mart.desc":
        "E-commerce platform with <strong>storefront</strong> and <strong>admin/staff</strong> ops for products, inventory, orders, vouchers, banners, shippers, returns, and reporting. API architecture: <strong>Controller → Service → Repository → PostgreSQL</strong>, Spring Security + JWT, COD/VNPay, Cloudinary, analytics dashboard. Monorepo: React 18 + Vite + MUI; Spring Boot 3.3 + Spring Data JPA; PostgreSQL; Swagger.",
      "projects.account.desc":
        "Game-account marketplace: auth, shop, internal wallet, purchase history, admin. Architecture: <strong>Web → Business → DataAccess → Models</strong>; Razor with <strong>DTO</strong>. Top-ups via <strong>SePay webhook</strong> (idempotent), Cloudinary, MailKit; GitLab CI (SAST). Database: <strong>Azure SQL</strong>.",
      "projects.fus.desc":
        "Learning social platform: posts, comments, groups, documents, events, project matching, feedback, and reports. Backend: <strong>ClientService → APIService → Services → Repository → SQL Server</strong>; JWT Bearer, Cookie Auth, Google OAuth, Azure Blob, real-time chat/notifications via <strong>SignalR</strong>; role-based admin dashboard. .NET 8, EF Core Database First, MVC client + REST API.",
      "projects.liveDemo": "Live demo",

      "contact.title": "Contact",
      "contact.lead":
        "Open to internship, fresher roles, or freelance software projects.",
      "contact.emailLabel": "Email",
      "contact.phoneLabel": "Phone",
      "contact.cta": "Send email",

      "fab.tooltip": "Quick actions",
      "fab.scrollTop": "Scroll to top",
      "fab.ai": "AI Assistant",
      "fab.chat": "Chat",
      "fab.botTitle": "Portfolio assistant",
      "fab.botPlaceholder": "Ask about skills, projects…",
      "fab.chatTitle": "Messages",
      "fab.chatEmpty": "No messages yet",
      "fab.botWelcome":
        "Hi! I can help you learn about Bao's skills, experience, and projects.",
      "fab.optSkills": "Skills",
      "fab.optExp": "Experience",
      "fab.optProjects": "Projects",
      "fab.optContact": "Contact",
      "fab.replySkills":
        "Bao works as a Backend / Full-stack developer with ASP.NET Core, Spring Boot, SQL, and modern web stacks.",
      "fab.replyExp":
        "Internship experience at FPT Software plus personal and academic projects.",
      "fab.replyProjects":
        "Scroll to Projects below for featured work, or ask me for more detail.",
      "fab.replyContact":
        "Email huynhnguyenbao3105@gmail.com or message on Zalo 0939 082 419.",
      "fab.botFallback":
        "Thanks for asking! This is a UI demo — try the suggestion chips or browse the portfolio.",

      "footer.copy":
        '&copy; <span id="year"></span> Huynh Nguyen Bao. Personal portfolio.',
    },
  };

  window.__PORTFOLIO_I18N = I18N;

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

    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      if (!key || dict[key] == null) return;
      el.setAttribute("title", dict[key]);
    });

    document.querySelectorAll("[data-i18n-tooltip]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-tooltip");
      if (!key || dict[key] == null) return;
      el.setAttribute("data-tooltip", dict[key]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (!key || dict[key] == null) return;
      el.setAttribute("alt", dict[key]);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (!key || dict[key] == null) return;
      el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll("[data-lang-toggle]").forEach(function (input) {
      input.checked = lang === "en";
    });

    try {
      window.dispatchEvent(
        new CustomEvent("portfolio:lang", { detail: { lang: lang } }),
      );
    } catch (e) {}
  }

  function initLanguage() {
    var stored = null;
    try {
      stored = localStorage.getItem(LANG_STORAGE_KEY);
    } catch (e) {}

    var initial = stored === "en" || stored === "vi" ? stored : "vi";
    applyLanguage(initial);

    document.querySelectorAll("[data-lang-toggle]").forEach(function (input) {
      input.addEventListener("change", function () {
        var next = input.checked ? "en" : "vi";
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

  /* ——— 3. Cuộn tới anchor: bù header cố định ——— */
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const SCROLL_EXTRA_GAP = 16;
  const NAV_TOP_CLEAR = 120;

  function getScrollOffset() {
    const headerEl = document.querySelector(".site-header");
    if (!headerEl) return 96;
    const top = parseFloat(window.getComputedStyle(headerEl).top) || 0;
    return headerEl.getBoundingClientRect().height + top + SCROLL_EXTRA_GAP;
  }

  function getScrollAnchor(sectionEl) {
    if (!sectionEl) return null;
    if (sectionEl.id === "landing") return sectionEl;
    return sectionEl.querySelector(".section__header") || sectionEl;
  }

  function scrollToHash(hash, behavior) {
    if (!hash || hash === "#") return;
    const section = document.querySelector(hash);
    const anchor = getScrollAnchor(section);
    if (!anchor) return;
    const top =
      anchor.getBoundingClientRect().top + window.scrollY - getScrollOffset();
    window.scrollTo({
      top: Math.max(0, top),
      behavior: behavior || (prefersReduced ? "auto" : "smooth"),
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      if (!document.querySelector(id)) return;
      e.preventDefault();
      scrollToHash(id);
      history.replaceState(null, "", id);
    });
  });

  if (window.location.hash && document.querySelector(window.location.hash)) {
    requestAnimationFrame(function () {
      scrollToHash(window.location.hash, "auto");
    });
  }

  /* ——— 4. Header + thanh progress + nav active khi cuộn ——— */
  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress__bar");
  const sectionIds = ["about", "experience", "projects", "contact"];
  const navLinks = document.querySelectorAll(".site-nav a[href^='#']");

  function updateNavActive() {
    if (!navLinks.length) return;

    if (window.scrollY < NAV_TOP_CLEAR) {
      navLinks.forEach(function (link) {
        link.classList.remove("is-active");
      });
      return;
    }

    const activationLine = getScrollOffset() + 8;
    let currentId = sectionIds[0];

    sectionIds.forEach(function (id) {
      const section = document.getElementById(id);
      if (!section) return;
      if (section.getBoundingClientRect().top <= activationLine) {
        currentId = id;
      }
    });

    const doc = document.documentElement;
    const atBottom =
      window.scrollY + window.innerHeight >= doc.scrollHeight - 2;
    if (atBottom) {
      currentId = sectionIds[sectionIds.length - 1];
    }

    navLinks.forEach(function (link) {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === "#" + currentId,
      );
    });
  }

  if (header) {
    var lastScrollY = window.scrollY;
    var navToggle = document.querySelector(".nav-toggle");
    var siteNav = document.getElementById("site-nav");

    const onScroll = function () {
      var y = window.scrollY || window.pageYOffset || 0;
      header.classList.toggle("is-scrolled", y > 12);

      if (y <= 8) {
        header.classList.remove("is-hidden");
      } else {
        header.classList.add("is-hidden");
        if (
          navToggle &&
          siteNav &&
          navToggle.getAttribute("aria-expanded") === "true"
        ) {
          navToggle.setAttribute("aria-expanded", "false");
          siteNav.classList.remove("is-open");
        }
      }
      lastScrollY = y;

      if (progressBar) {
        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || document.body.scrollTop;
        const height = doc.scrollHeight - doc.clientHeight;
        const pct = height > 0 ? (scrollTop / height) * 100 : 0;
        progressBar.style.width = pct + "%";
      }

      updateNavActive();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
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
      { passive: true },
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
        demoGrid
          .querySelectorAll(".demo-credentials")
          .forEach(function (box, i) {
            box.style.setProperty("--stagger-delay", String(i * 90) + "ms");
          });
      }
    });

    var fptRow = document.getElementById("who-row-fpt");
    var fptDetails = document.getElementById("who-fpt-details");
    if (fptRow && fptDetails) {
      fptRow.addEventListener("click", function () {
        var isOpen = fptRow.classList.toggle("is-open");
        fptRow.setAttribute("aria-expanded", String(isOpen));
        fptDetails.hidden = !isOpen;
      });
      fptRow.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fptRow.click();
        }
      });
    }

    var whoSection = document.querySelector(".who-section");
    if (whoSection) {
      var whoHeader = whoSection.querySelector(".who-header");
      var whoColLeft = whoSection.querySelector(".who-col-left");
      var whoColRight = whoSection.querySelector(".who-col-right");
      if (whoHeader) whoHeader.classList.add("reveal");
      if (whoColLeft) whoColLeft.classList.add("reveal", "reveal--left");
      if (whoColRight) whoColRight.classList.add("reveal");
    }

    var timeline = document.querySelector(".timeline-card");
    if (timeline) {
      timeline.classList.add("reveal", "reveal--left");
      setupStaggerGroup(timeline, ".timeline-card__duties li", 50);
      timeline
        .querySelectorAll(".timeline-card__duty-heading")
        .forEach(function (heading, i) {
          heading.style.setProperty(
            "--duty-delay",
            String(220 + i * 80) + "ms",
          );
        });
      setupStaggerGroup(timeline, ".timeline-card__links .link-arrow", 80);
    }

    document
      .querySelectorAll(".section__header")
      .forEach(function (headerEl, i) {
        headerEl.classList.add("reveal");
        headerEl.style.setProperty("--reveal-delay", String(i * 40) + "ms");
      });

    var techSlider = document.getElementById("techSlider");
    if (techSlider) {
      techSlider.classList.add("reveal");
    }

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
      ".reveal, .site-footer, .demo-credentials-grid",
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document
      .querySelectorAll(
        ".reveal, .stagger-group, .site-footer, .section__header",
      )
      .forEach(function (el) {
        el.classList.add("is-visible");
      });
    document.querySelectorAll(".stagger-item").forEach(function (el) {
      el.style.opacity = "1";
    });
    if (progressBar) progressBar.style.width = "0%";
  }

  /* ——— 7. Tech Slider (Vintage Microcars 3D Horizontal Carousel) ——— */
  function initTechSlider() {
    var slider = document.getElementById("techSlider");
    if (!slider) return;

    var slidesData = [
      {
        themeClass: "tech-slider--dotnet",
        bgText: ".NET",
        categoryKey: "techSlider.dotnetCategory",
        focusKey: "techSlider.dotnetFocus",
      },
      {
        themeClass: "tech-slider--java",
        bgText: "JAVA",
        categoryKey: "techSlider.javaCategory",
        focusKey: "techSlider.javaFocus",
      },
      {
        themeClass: "tech-slider--docker",
        bgText: "DOCKER",
        categoryKey: "techSlider.dockerCategory",
        focusKey: "techSlider.dockerFocus",
      },
      {
        themeClass: "tech-slider--php",
        bgText: "PHP",
        categoryKey: "techSlider.phpCategory",
        focusKey: "techSlider.phpFocus",
      },
      {
        themeClass: "tech-slider--nest",
        bgText: "NEST",
        categoryKey: "techSlider.nestCategory",
        focusKey: "techSlider.nestFocus",
      },
      {
        themeClass: "tech-slider--figma",
        bgText: "FIGMA",
        categoryKey: "techSlider.figmaCategory",
        focusKey: "techSlider.figmaFocus",
      },
      {
        themeClass: "tech-slider--github",
        bgText: "GITHUB",
        categoryKey: "techSlider.githubCategory",
        focusKey: "techSlider.githubFocus",
      },
      {
        themeClass: "tech-slider--gitlab",
        bgText: "GITLAB",
        categoryKey: "techSlider.gitlabCategory",
        focusKey: "techSlider.gitlabFocus",
      },
    ];

    var slides = Array.from(slider.querySelectorAll(".tech-slide"));
    var infoCards = Array.from(slider.querySelectorAll(".tech-info-card"));
    var bgTextEl = document.getElementById("techSliderBgText");
    var dots = Array.from(
      slider.querySelectorAll(".tech-slider__timeline-dot"),
    );
    var stage = document.getElementById("techSliderStage");

    var currentIndex = 0;
    var total = slidesData.length;

    function updateSlide(index) {
      var data = slidesData[index];

      // Update theme classes on root slider container
      slidesData.forEach(function (d) {
        slider.classList.remove(d.themeClass);
      });
      slider.classList.add(data.themeClass);
      slider.setAttribute("data-active-index", String(index));

      // Update Anton background text
      if (bgTextEl) {
        bgTextEl.textContent = data.bgText;
      }

      // Update 3D car positioning
      slides.forEach(function (slide, i) {
        slide.classList.remove(
          "tech-slide--active",
          "tech-slide--prev",
          "tech-slide--next",
          "tech-slide--hidden",
        );
        if (i === index) {
          slide.classList.add("tech-slide--active");
          slide.setAttribute("aria-hidden", "false");
        } else if (i === (index - 1 + total) % total) {
          slide.classList.add("tech-slide--prev");
          slide.setAttribute("aria-hidden", "true");
        } else if (i === (index + 1) % total) {
          slide.classList.add("tech-slide--next");
          slide.setAttribute("aria-hidden", "true");
        } else {
          slide.classList.add("tech-slide--hidden");
          slide.setAttribute("aria-hidden", "true");
        }
      });

      // Update timeline dots
      dots.forEach(function (dot, i) {
        dot.classList.toggle("tech-slider__timeline-dot--active", i === index);
      });

      // Update info cards
      infoCards.forEach(function (card, i) {
        card.classList.toggle("tech-info-card--active", i === index);
      });
    }

    function goToSlide(newIndex, isUserAction) {
      currentIndex = ((newIndex % total) + total) % total;
      updateSlide(currentIndex);
      if (isUserAction) {
        resetAutoPlay();
      }
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function (e) {
        e.preventDefault();
        var idx = parseInt(dot.getAttribute("data-slide"), 10);
        if (!isNaN(idx)) {
          goToSlide(idx, true);
        }
      });
    });

    // Clicking car slides:
    // IMPORTANT: "không cần hiển thị xem chi khi ấn vào xe"
    // Center car does NOT open any popup/modal.
    // Flanking cars transition smoothly to that slide.
    slides.forEach(function (slide) {
      slide.addEventListener("click", function (e) {
        var idx = parseInt(slide.getAttribute("data-index"), 10);
        if (!isNaN(idx) && idx !== currentIndex) {
          e.preventDefault();
          goToSlide(idx, true);
        }
      });
    });

    // Drag / Touch gestures for sliding
    if (stage) {
      var startX = 0;
      var currentX = 0;
      var isDragging = false;

      stage.addEventListener("pointerdown", function (e) {
        if (e.target.closest(".tech-slider__timeline-dot")) {
          return;
        }
        startX = e.clientX;
        currentX = e.clientX;
        isDragging = true;
      });

      window.addEventListener("pointermove", function (e) {
        if (!isDragging) return;
        currentX = e.clientX;
      });

      window.addEventListener("pointerup", function () {
        if (!isDragging) return;
        isDragging = false;
        var diffX = currentX - startX;
        if (diffX < -40) {
          goToSlide(currentIndex + 1, true);
        } else if (diffX > 40) {
          goToSlide(currentIndex - 1, true);
        }
      });

      window.addEventListener("pointercancel", function () {
        isDragging = false;
      });
    }

    // Keyboard navigation
    slider.tabIndex = 0;
    slider.style.outline = "none";
    slider.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide(currentIndex - 1, true);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToSlide(currentIndex + 1, true);
      }
    });

    // Language change sync
    window.addEventListener("portfolio:lang", function () {
      updateSlide(currentIndex);
    });

    // Auto-advance / Autoplay (tự động đổi slide công nghệ sau mỗi 4 giây)
    var AUTO_PLAY_INTERVAL = 4000;
    var autoPlayTimer = null;
    var isHovered = false;
    var isVisibleOnScreen = true;
    var prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function startAutoPlay() {
      if (prefersReducedMotion) return;
      stopAutoPlay();
      autoPlayTimer = setInterval(function () {
        if (!isHovered && isVisibleOnScreen && !document.hidden) {
          goToSlide(currentIndex + 1, false);
        }
      }, AUTO_PLAY_INTERVAL);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Pause on hover
    slider.addEventListener("mouseenter", function () {
      isHovered = true;
      stopAutoPlay();
    });

    slider.addEventListener("mouseleave", function () {
      isHovered = false;
      startAutoPlay();
    });

    // Pause when tab is inactive
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });

    // Only autoplay when slider is visible in viewport
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            isVisibleOnScreen = entry.isIntersecting;
            if (entry.isIntersecting) {
              startAutoPlay();
            } else {
              stopAutoPlay();
            }
          });
        },
        { threshold: 0.25 },
      );
      observer.observe(slider);
    } else {
      startAutoPlay();
    }

    // Initial setup
    updateSlide(0);
    startAutoPlay();
  }

  initTechSlider();
})();
