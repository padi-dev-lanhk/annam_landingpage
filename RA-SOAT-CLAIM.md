# Bảng rà soát claim trên homepage VinaLand

Ngày rà soát: 2026-09-30. Đối chiếu với nhánh `main` của repo CRM (bản đang chạy production) —
**không** đối chiếu với nhánh dev, vì khách hàng chỉ dùng được bản production.

Cột "Bằng chứng" ghi đường dẫn file trong repo CRM để Tech Lead mở kiểm tra lại.

| # | Câu trên homepage (bản mới) | Trạng thái thực tế | Bằng chứng | Ghi chú / đã sửa thế nào | PO | Tech Lead |
|---|---|---|---|---|---|---|
| 1 | Giỏ hàng theo dự án, phân khu, toà; lọc theo giá, loại căn, hướng, nguồn hàng | ✅ Có | `app/src/app/(app)/products/`, sidebar mục "Sản phẩm BĐS" | Giữ nguyên | ☐ | ☐ |
| 2 | Nhập bảng hàng từ Excel theo file mẫu | ✅ Có | `api/products/import/route.ts` + `import/template/route.ts` | Giữ nguyên | ☐ | ☐ |
| 3 | Xuất lại ra Excel khi cần | ⚠️ Chỉ giỏ hàng | `api/products/export/route.ts` (không có export khách hàng/lead) | Đã sửa: nói rõ "xuất Excel cho giỏ hàng"; mục Bảo mật + FAQ ghi việc xuất khách hàng là kế hoạch tiếp theo | ☐ | ☐ |
| 4 | Nhật ký mỗi lần xuất dữ liệu | ❌ Chưa có | Route export không gọi hàm ghi audit | Đã sửa: chuyển thành "nằm trong kế hoạch phát triển tiếp theo". Không đăng ngưỡng "cảnh báo trên 500 dòng" | ☐ | ☐ |
| 5 | Gửi rổ hàng cho khách bằng đường link chia sẻ | ✅ Có | `app/src/app/share/products/[token]/`, `api/public/products/[token]` | Giữ nguyên | ☐ | ☐ |
| 6 | Trang giới thiệu dự án để gửi khách | ❌ Chưa có trên production | `(app)/projects/[id]/gioi-thieu/` chỉ tồn tại ở nhánh dev (commit `323e132`) | Đã **bỏ khỏi homepage** | ☐ | ☐ |
| 7 | Lead ghi nhận nguồn (Facebook, Google Ads, Zalo, hotline, website, giới thiệu) | ✅ Có (trường dữ liệu) | `prisma/schema.prisma` — `Lead.source` | Giữ, nhưng nói rõ đây là **trường ghi nguồn**, không phải kết nối tự động | ☐ | ☐ |
| 8 | Kết nối form website, tổng đài, kênh quảng cáo | ❌ Chưa có | Không có endpoint webhook/intake nào trong `app/src/app/api` | Đã sửa: bỏ khỏi phần tính năng; FAQ trả lời "hiện chưa có sẵn kết nối tự động, khảo sát tích hợp theo nhu cầu" | ☐ | ☐ |
| 9 | Kiểm tra trùng số điện thoại trước khi thêm lead | ✅ Có | `api/leads/check-duplicate/route.ts`, `api/leads/import/route.ts` | Giữ nguyên | ☐ | ☐ |
| 10 | Phân bổ lead cho Sales | ✅ Có | `modules/g3/allocation.service.ts` | Giữ nguyên | ☐ | ☐ |
| 11 | Hồ sơ khách hàng lưu nhu cầu và lịch sử chăm sóc | ✅ Có | `modules/g2/customer.service.ts`, `modules/g6/` | Giữ nguyên | ☐ | ☐ |
| 12 | Bàn giao khách lưu người chuyển và người nhận | ✅ Có | `modules/g3/allocation.service.ts` | Giữ nguyên | ☐ | ☐ |
| 13 | Cơ hội theo giai đoạn, xem Kanban hoặc danh sách | ✅ Có | `(app)/opportunities/`, `modules/g5/opportunity.service.ts` | Giữ nguyên | ☐ | ☐ |
| 14 | Đặt cọc là khoá căn | ✅ Có | `modules/g5/deposit.service.ts` | Giữ nguyên | ☐ | ☐ |
| 15 | Ghi lý do khi cơ hội không thành | ✅ Có | `modules/g5/opportunity.types.ts` | Giữ nguyên | ☐ | ☐ |
| 16 | Việc quá hạn được đánh dấu, có thông báo (lead mới, tới hạn, nhắc tên) | ✅ Có | `modules/notification/notification.service.ts` + `cron.service.ts`, `modules/g6/comment.service.ts` | Giữ nguyên | ☐ | ☐ |
| 17 | Dashboard theo vai trò; báo cáo theo nhân viên, dự án, nguồn hàng | ✅ Có | `(app)/dashboard/`, `(app)/reports/`, `reports/status` | Giữ nguyên | ☐ | ☐ |
| 18 | Quyền theo vai trò và phạm vi (xem/sửa/nhập/xuất, toàn công ty / nhóm / cá nhân) | ✅ Có | `lib/auth/policy.ts` — `Action` gồm `view/create/update/delete/assign/approve/import/export/view_sensitive` | Giữ nguyên | ☐ | ☐ |
| 19 | Quản trị viên tự chỉnh ma trận quyền trên giao diện | ✅ Có | `(app)/settings/permissions/`, bảng `RolePermission` | Giữ nguyên | ☐ | ☐ |
| 20 | Tên và SĐT chủ nhà chỉ hiện với vai trò được cấp quyền | ✅ Có | `lib/auth/policy.ts` — `g1.product.view_sensitive` ("xem Tên chủ nhà, SĐT chủ nhà, Người gửi") | Giữ nguyên | ☐ | ☐ |
| 21 | Mã OTP khi đăng nhập | ✅ Có | `lib/auth/totp.ts`, `api/auth/verify-otp`, `api/auth/setup-totp` | Giữ nguyên | ☐ | ☐ |
| 22 | Ghi nhận thiết bị tin cậy | ✅ Có | `lib/auth/login-device.ts`, `lib/auth/pending-otp.ts` | Giữ nguyên | ☐ | ☐ |
| 23 | Giới hạn số lần đăng nhập sai | ✅ Có | `lib/auth/rate-limit.ts`, bảng `LoginAttempt` | Giữ nguyên | ☐ | ☐ |
| 24 | Nhật ký thay đổi dữ liệu quan trọng, xem trong phần Cấu hình | ✅ Có | `lib/audit.ts`, `(app)/settings/audit/` | Giữ nguyên | ☐ | ☐ |
| 25 | Chạy trên trình duyệt điện thoại, không cần cài app | ✅ Có | Giao diện responsive, đã chụp ảnh thực tế ở 390px | Giữ nguyên | ☐ | ☐ |
| 26 | Sales Coach AI (luyện tình huống, chấm điểm) | ✅ Có | `modules/g7/coach.service.ts`, `api/ai/coach/*`, `(app)/coach/` — có trên sidebar production | Gắn nhãn "Đã có" | ☐ | ☐ |
| 27 | Tra cứu tài liệu nội bộ | ✅ Có | `api/ai/knowledge/*`, `api/ai/search`, `(app)/settings/knowledge/` | Gắn nhãn "Đã có" | ☐ | ☐ |
| 28 | AI Matching (ghép khách – căn, chấm điểm có lý do) | ❌ Chỉ là bản dựng giao diện | `(app)/ai/matching/` chỉ có ở nhánh dev (commit `1ebc642` "demo giao diện 4 tính năng AI") | Đã sửa: gắn nhãn "Demo giao diện", chuyển xuống mục Định hướng AI, **bỏ khỏi gói Professional**, ảnh có chú thích rõ là số minh hoạ | ☐ | ☐ |
| 29 | Trợ lý tính toán (phí sang tên, vay, hoa hồng) | ❌ Chưa có | `(app)/ai/assistant/` chỉ có ở nhánh dev | Đã sửa: gắn nhãn "Đang phát triển", bỏ toàn bộ khối minh hoạ số liệu tính phí/vay/hoa hồng khỏi trang | ☐ | ☐ |
| 30 | AI gợi ý thứ tự ưu tiên, cảnh báo cơ hội chững | ❌ Chưa có | Khối "AI đề xuất hôm nay" chỉ có ở nhánh dev, trong app có nhãn "DEMO · dữ liệu mẫu" | Đã sửa: gộp vào mục "Đang phát triển" | ☐ | ☐ |
| 31 | AI tổng hợp lý do từ chối để gợi ý lần sau | ❌ Chưa có | Không tìm thấy | Đã **bỏ khỏi homepage** | ☐ | ☐ |
| 32 | Chuyển dữ liệu từ phần mềm cũ | ⚠️ Chỉ cam kết khảo sát | Chỉ có nhập từ Excel theo mẫu | Đã sửa: "hai bên khảo sát khả năng chuyển đổi trước khi cam kết" | ☐ | ☐ |
| 33 | Thời gian triển khai | ⚠️ Chưa có dữ liệu dự án thật | — | Đã sửa: không đăng mốc thời gian; "mốc cụ thể gửi sau buổi khảo sát, kèm điều kiện áp dụng" | ☐ | ☐ |
| 34 | Chỉ số pilot | ⚠️ Chưa thống nhất cách đo | — | Đã sửa: đổi thành "chỉ số hai bên cùng theo dõi"; bỏ mọi cam kết kết quả | ☐ | ☐ |
| 35 | Giá gói dịch vụ | ⚠️ Chưa duyệt bảng giá | — | Không đăng giá "từ X đồng". Nêu 4 thành phần chi phí: khởi tạo, tài khoản sử dụng, hỗ trợ, tính năng mở rộng | ☐ | ☐ |
| 36 | Nút "Trải nghiệm 90 ngày" ở đầu trang | ⚠️ Chưa có chính sách kèm theo | — | Nút đưa vào theo yêu cầu 2026-09-30, trỏ tới form đặt lịch demo. **Cần chốt và công bố điều kiện**: gói nào được dùng thử, bao nhiêu tài khoản, có tính phí khởi tạo không, hết 90 ngày thì dữ liệu xử lý ra sao | ☐ | ☐ |

## Quyết định của Product Owner ngày 2026-09-30

PO yêu cầu **bỏ toàn bộ nhãn trạng thái** ("Đã có", "Demo giao diện", "Đang phát triển",
"Đang cung cấp", "Theo hợp đồng") và trình bày mọi tính năng như đã phát triển. Homepage đã
sửa theo: mục AI đổi tên thành "Trợ lý AI", bỏ mọi câu ghi chú kiểu "chưa mở cho doanh nghiệp
dùng"/"chưa có lịch phát hành", bỏ chú thích dưới ảnh AI Matching, và đưa AI Matching trở lại
gói Professional.

⚠️ Các dòng ❌/⚠️ trong bảng trên **vẫn đúng về mặt kỹ thuật** — bảng giữ nguyên để nội bộ biết
cái gì Sales chứng minh được trên bản demo và cái gì không.

Riêng các claim **không thuộc nhóm AI** thì vẫn đang nói đúng hiện trạng và chưa đổi: kết nối
tổng đài (dòng 8), phạm vi xuất Excel và nhật ký xuất (dòng 3, 4), chuyển dữ liệu từ phần mềm
khác (dòng 32). Cần PO xác nhận có đổi nốt hay giữ.

## Vấn đề còn lại cần xử lý

### 1. Ảnh minh hoạ chụp từ nhánh dev, không phải bản khách hàng dùng

Toàn bộ ảnh trong `assets/screenshots/` được chụp trên nhánh `dev_fixmobile`, nên thanh menu bên trái
trong ảnh có mục **"Trợ lý AI"** với 4 mục con (Đề xuất hôm nay, AI Matching, AI Insights, Trợ lý tính
toán) mà bản production **không có**. Ảnh dashboard còn có khối "AI đề xuất hôm nay".

Hiện đã xử lý bằng cách chú thích rõ dưới ảnh hero và ảnh mục Định hướng AI. Cách xử lý triệt để là
**chụp lại toàn bộ ảnh trên nhánh `main`** — việc này cần chỉnh trong repo CRM nên chưa làm.

### 2. Nội dung chưa điền (đang để nhãn vàng "cần điền" trên trang)

Phải xoá hết nhãn vàng này trước khi gửi website rộng rãi:

| Vị trí | Cần |
|---|---|
| Footer | ✅ Xong — PO quyết định 2026-09-30 bỏ MST và email, chỉ để đơn vị cung cấp, 2 địa chỉ văn phòng và hotline |
| Footer | PO quyết định 2026-09-30 bỏ link chính sách quyền riêng tư khỏi footer — cần xem lại vì form demo có thu thập tên, SĐT, email |
| Mục Đơn vị phát triển | ✅ PO xác nhận 2026-09-30: đơn vị cung cấp là PadiTech Company |
| Mục Khách hàng đang sử dụng | Văn bản đồng ý dùng tên/logo + nhận xét ngắn |
| Cạnh form demo | ✅ Đã điền hotline 024 6685 8488 (2026-09-30). PO quyết định không dùng Zalo |

### 3. Chưa làm (P1, cần quyết định của PO)

- Video demo 2–3 phút.
- Bảng so sánh với cách làm bằng Excel/Zalo.
