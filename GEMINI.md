# Quy Chuẩn Typography & Font Chữ Website Portfolio

Dự án này tuân thủ nghiêm ngặt hệ thống 3 font chữ cốt lõi (được định nghĩa trong `:root` của `css/styles.css`). Khi chỉnh sửa hoặc phát triển giao diện mới, chỉ sử dụng 3 font chữ này, **không tự ý thêm các font ngoài (như Outfit, Roboto, v.v.)**:

---

### 1. Playfair Display (`var(--font-serif)`)
- **Định dạng:** `"Playfair Display", Georgia, "Times New Roman", serif;`
- **Phong cách:** Serif cổ điển, thanh lịch, giàu tính thẩm mỹ editorial (thường dùng ở dạng `font-style: italic`, trọng số `font-weight: 500`).
- **Mục đích sử dụng:**
  - Lời chào / Tiêu đề phụ (Eyebrow text): *"Hi, I'm"*, *"Xin chào, tôi là"*, *"Hallo!"*, `section__eyebrow`, `who-eyebrow`.
  - Câu tuyên ngôn / Trích dẫn mang tính nghệ thuật (Hero Statement ở Section About).

---

### 2. Anton (`var(--font-display)`)
- **Định dạng:** `"Anton", "Arial Narrow", sans-serif;`
- **Phong cách:** Display sans-serif dạng cô đọng (condensed), cực đậm, góc cạnh, dứt khoát, thường hiển thị in hoa (`text-transform: uppercase`).
- **Mục đích sử dụng:**
  - Tên nhân vật chính ở Hero: *"HUYNH NGUYEN BAO"* / *"HUỲNH NGUYÊN BẢO"*.
  - Các tiêu đề lớn cần sự tác động thị giác mạnh mẽ (High-impact display headlines).

---

### 3. Plus Jakarta Sans (`var(--font-sans)`)
- **Định dạng:** `"Plus Jakarta Sans", system-ui, sans-serif;`
- **Phong cách:** Geometric sans-serif hiện đại, gọn gàng, hỗ trợ dấu tiếng Việt chuẩn xác, tính khả đọc cực cao.
- **Mục đích sử dụng:**
  - Font chữ mặc định của website cho toàn bộ nội dung (Body text, paragraphs).
  - Chức danh chuyên môn: *"BACKEND / FULL-STACK DEVELOPER"*.
  - Nội dung thẻ kỹ năng (pills / badges), thẻ dự án (projects), bảng kinh nghiệm (experience table), các nút bấm (buttons), thanh điều hướng (navbar), chân trang (footer).
