# Huỳnh Nguyên Bảo — Portfolio

Portfolio cá nhân của **Huỳnh Nguyên Bảo** — Backend / Full-stack Developer (FPT University, Cần Thơ). Site tĩnh: HTML, CSS, JavaScript; hỗ trợ VI/EN.

**Định hướng:** REST API, kiến trúc nhiều lớp, JWT, thiết kế CSDL (Code First & Database First) với ASP.NET Core và Spring Boot.

---

## Dự án

### 1. G1Mart

**Vai trò:** Backend Team Lead · Intern FPT Software (FU CT 2024, nhóm G1)

Nền tảng thương mại điện tử với **storefront** cho khách và **admin/staff** vận hành sản phẩm, kho, đơn hàng, voucher, banner, shipper, hoàn trả và báo cáo.

- API theo lớp: **Controller → Service → Repository → PostgreSQL**
- Spring Security + JWT, thanh toán COD / VNPay, Cloudinary, dashboard thống kê
- Monorepo: React 18 + Vite + MUI · Spring Boot 3.3 + Spring Data JPA · PostgreSQL · Swagger

**Stack:** React, Vite, MUI, Java 17, Spring Boot 3.3, Spring Data JPA, PostgreSQL, Cloudinary, VNPay, JWT, Swagger

| | |
|---|---|
| **Live demo** | https://g1mart.netlify.app/ |
| **GitLab** | https://gitlab.com/myproject31052003/G1Mart |

---

### 2. AccountMarket

**Vai trò:** Full-stack

Sàn mua bán tài khoản game: đăng nhập/đăng ký, cửa hàng, ví nội bộ, lịch sử mua và trang quản trị.

- Kiến trúc **Web → Business → DataAccess → Models**; Razor dùng DTO
- Luồng mua qua ví (transaction DB), nạp tiền **SePay Webhook** (idempotent)
- Cloudinary, MailKit gửi email; GitLab CI (SAST); CSDL **Azure SQL**

**Stack:** .NET 9, ASP.NET Core MVC, EF Core (Code First), SePay, MailKit, Cloudinary, JWT, Azure SQL

| | |
|---|---|
| **Live demo** | https://salegameaccount-aqlq.onrender.com/ |
| **GitLab** | https://gitlab.com/myproject31052003/salegameaccount |

---

### 3. FUS

**Vai trò:** Backend Team Lead

Mạng xã hội học tập: bài viết, bình luận, nhóm, tài liệu, sự kiện, tìm thành viên dự án, phản hồi và báo cáo vi phạm.

- Backend: **ClientService → APIService → Services → Repository → SQL Server**
- JWT Bearer, Cookie Auth, Google OAuth, Azure Blob
- Chat / thông báo realtime với **SignalR**; admin & dashboard theo vai trò
- .NET 8, EF Core Database First, MVC client + REST API

**Stack:** .NET 8, ASP.NET Core API, EF Core (Database First), SignalR, Azure Blob, Google OAuth, JWT, SQL Server

| | |
|---|---|
| **GitLab** | https://gitlab.com/g38592114/project |

---

## Liên hệ

- **Email:** [huynhnguyenbao3105@gmail.com](mailto:huynhnguyenbao3105@gmail.com)
- **Điện thoại:** 0939 082 419
- **CV:** [`assets/Huynh-Nguyen-Bao-VN.pdf`](assets/Huynh-Nguyen-Bao-VN.pdf) · [`assets/Huynh-Nguyen-Bao-EN.pdf`](assets/Huynh-Nguyen-Bao-EN.pdf)
