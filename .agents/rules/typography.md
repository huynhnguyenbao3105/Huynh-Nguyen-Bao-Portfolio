---
description: Quy chuẩn 3 font chữ cốt lõi của website Huỳnh Nguyên Bảo Portfolio
globs: "**/*.{html,css,js}"
---

# Quy Chuẩn 3 Font Chữ Cốt Lõi

Khi chỉnh sửa CSS, HTML hoặc thêm thành phần giao diện mới trong dự án Portfolio này, chỉ sử dụng duy nhất 3 font chữ sau:

1. **Playfair Display (`var(--font-serif)`):**
   - Dùng cho: Lời chào (eyebrow text: *"Hi, I'm"*, *"Xin chào, tôi là"*, *"Hallo!"*, v.v.) và trích dẫn/tuyên ngôn editorial.
   - Kiểu dáng thường dùng: `font-style: italic`, `font-weight: 500`.

2. **Anton (`var(--font-display)`):**
   - Dùng cho: Tên thương hiệu / Display headline chính (*"HUYNH NGUYEN BAO"* / *"HUỲNH NGUYÊN BẢO"*).
   - Kiểu dáng: In hoa, đậm nét condensed mạnh mẽ.

3. **Plus Jakarta Sans (`var(--font-sans)`):**
   - Dùng cho: Toàn bộ body text, chức danh (*"BACKEND / FULL-STACK DEVELOPER"*), các thẻ badge/pill, bảng biểu, thẻ dự án, nút bấm và điều hướng.
   - Tuyệt đối không dùng các font ngoài khác (như Outfit, Roboto, Inter) nếu không được yêu cầu.
