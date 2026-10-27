// ---------- Bổ sung từ điển cho trang mẫu (demo-layout.html) ----------
// Nạp SAU assets/i18n-*.js rồi gộp thêm vào VINALAND_DICT. Chỉ chứa những câu mới
// viết cho bản bố cục mới; câu nào trùng với trang thật thì dùng lại bản dịch cũ.
// Dạng khoá: "câu tiếng Việt gốc": ["English", "日本語"]
Object.assign(window.VINALAND_DICT || (window.VINALAND_DICT = {}), {
  // --- head & thanh thông báo ---
  "VinaLand — demo bố cục": ["VinaLand — layout demo", "VinaLand — レイアウトデモ"],
  "MỚI": ["NEW", "新着"],
  "Trợ lý AI ghép khách với căn, có giải trình từng tiêu chí": [
    "An AI assistant matches customers with units and explains every criterion",
    "AIアシスタントが顧客と住戸をマッチングし、各基準の根拠も提示します",
  ],
  "Xem thử →": ["See it →", "見てみる →"],
  "Đóng thông báo": ["Close announcement", "お知らせを閉じる"],

  // --- hero ---
  "Giỏ hàng · Khách hàng · Đội Sales · AI": [
    "Inventory · Customers · Sales team · AI", "物件在庫 ・ 顧客 ・ 営業チーム ・ AI"],
  "Giỏ hàng luôn đúng": ["Inventory always right", "在庫は常に正確に"],
  "Khách không thất lạc": ["No customer slips away", "顧客を取りこぼさない"],
  "Sếp nắm cả sàn": ["Leaders see the whole agency", "経営陣は全社を把握"],
  "Một nguồn dữ liệu cho cả sàn, từ lúc có lead tới lúc bàn giao căn.": [
    "One source of data for the whole agency, from the first lead to unit handover.",
    "リード獲得から住戸の引き渡しまで、全社でひとつのデータ基盤。",
  ],
  "Xem giới thiệu": ["Watch the intro", "紹介動画を見る"],
  "Dữ liệu được bảo vệ, quyền lợi Sales được tôn trọng": [
    "Data stays protected, sales reps' interests respected", "データは保護され、営業担当の権利も尊重"],
  "Dự án": ["Projects", "プロジェクト"],
  "Giao diện VinaLand": ["The VinaLand interface", "VinaLandの画面"],
  "Hàng còn bao nhiêu, khách đang ở đâu, cơ hội nào sắp chốt — gom về một màn hình.": [
    "How much inventory is left, where each customer stands, which deals are about to close — all on one screen.",
    "残りの在庫、顧客の状況、クロージング間近の商談 — すべてを一画面に。",
  ],

  // Chú thích dưới ảnh hero — chữ nằm ở data-txt trên từng tab, không phải trong HTML.
  "Hàng còn bao nhiêu, khách đang ở đâu, cơ hội nào sắp chốt — cập nhật theo thời gian thực.": [
    "How much inventory is left, where each customer stands, which deals are about to close — updated in real time.",
    "残りの在庫、顧客の状況、クロージング間近の商談 — リアルタイムで更新。",
  ],
  "Quản lý theo dự án, phân khu, từng toà. Căn nào còn, căn nào đã cọc — cả sàn nhìn chung một màn hình.": [
    "Managed by project, zone and building. Which units are free, which are on deposit — one screen for the whole agency.",
    "案件・区画・棟ごとに管理。空き住戸と手付金済みの住戸を、全社が同じ画面で確認。",
  ],
  "Khách hàng thuộc về công ty. Gõ số điện thoại là biết ai đang phụ trách.": [
    "Customers belong to the company. Type a phone number and you see who owns them.",
    "顧客は会社のもの。電話番号を入力すれば担当者が分かります。",
  ],
  "Từ tư vấn, đàm phán, tới đặt cọc và chốt giao dịch — theo dõi được từng cơ hội.": [
    "From consultation and negotiation to deposit and closing — every opportunity tracked.",
    "商談・交渉から手付金、成約まで — ひとつひとつの商談を追跡。",
  ],
  "Hồ sơ dự án, phân khu, chính sách bán hàng và tài liệu — tập trung một chỗ cho cả sàn dùng.": [
    "Project records, zones, sales policies and documents — in one place for the whole agency.",
    "案件情報・区画・販売方針・資料を一か所にまとめ、全社で利用。",
  ],

  // --- mỗi phân hệ thay chỗ một công cụ ---
  // Tiêu đề cắt làm ba đoạn (đoạn giữa đổi màu) nên ba bản dịch phải ghép lại thành
  // câu đúng ngữ pháp của từng thứ tiếng, không dịch rời từng mảnh.
  "Mỗi phân hệ": ["Each module", "各モジュールが"],
  "thay chỗ một công cụ": ["replaces a tool", "いまの道具を"],
  "sàn đang dùng": ["your agency uses today", "ひとつずつ置き換えます"],
  "Không phải thêm một phần mềm nữa, mà bớt đi những thứ đang rời rạc.": [
    "Not one more piece of software — fewer scattered ones.",
    "ソフトを増やすのではなく、バラバラな道具を減らします。",
  ],
  "Giỏ hàng BĐS": ["Property inventory", "物件在庫"],
  "Thay cho:": ["Replaces:", "置き換える対象："],
  "mỗi dự án một file Excel riêng, không ai chắc bảng nào mới nhất": [
    "a separate Excel file per project, nobody sure which sheet is current",
    "案件ごとに別々のExcel、どれが最新か誰も分からない",
  ],
  "Khách hàng & Lead": ["Customers & leads", "顧客とリード"],
  "danh bạ và tin nhắn Zalo nằm trong điện thoại của từng nhân viên": [
    "contacts and Zalo chats living on each person's phone",
    "担当者それぞれのスマホに散らばる連絡先とZaloのやり取り",
  ],
  "trí nhớ của Sales và cuốn sổ tay mang theo người": [
    "a sales rep's memory and the notebook in their bag", "営業担当の記憶と持ち歩きの手帳"],
  "Lịch & Công việc": ["Calendar & tasks", "カレンダーとタスク"],
  "nhắc hẹn đặt trên điện thoại cá nhân, nghỉ việc là mất": [
    "reminders set on personal phones, gone the day they leave",
    "個人のスマホに入れたリマインダー、退職すれば消える"],
  "cuối tháng ngồi gộp Excel từ nhiều nguồn": [
    "month-end spent merging Excel files from several places", "月末に複数のExcelを手作業で集計"],
  "đi hỏi người có kinh nghiệm rồi ngồi chờ trả lời": [
    "asking a veteran, then waiting for the answer", "経験者に聞いて、回答を待つ"],
  "Các phân hệ VinaLand gom về một hệ thống": [
    "VinaLand modules brought into one system", "VinaLandの各モジュールをひとつのシステムに集約"],
  "Tất cả về chung một hồ sơ khách, một bảng hàng": [
    "Everything lands in one customer record and one inventory sheet",
    "すべてがひとつの顧客台帳とひとつの在庫表に",
  ],

  // --- bốn vấn đề thường gặp ---
  "Sàn càng lớn,": ["The bigger the agency,", "会社が大きくなるほど、"],
  "dữ liệu càng dễ thất lạc": ["the easier data goes missing", "データは失われやすくなる"],
  "Nguồn khách": ["Lead sources", "リード獲得元"],
  "Hotline": ["Hotline", "ホットライン"],
  "Sự kiện": ["Events", "イベント"],
  "Vận hành": ["Operations", "オペレーション"],
  "Nhân sự": ["People", "人材"],
  "Nhân sự nghỉ việc hoặc chuyển nhóm là mất luôn lịch sử chăm sóc. Người nhận phải hỏi khách lại từ đầu.": [
    "When someone leaves or moves team, the care history goes with them. Whoever takes over has to ask the customer everything again.",
    "担当者が退職・異動すると対応履歴ごと失われます。引き継いだ人は顧客に一から聞き直すことになります。",
  ],

  // --- toàn cảnh vận hành ---
  "Toàn cảnh vận hành": ["The whole operation", "運営の全体像を"],
  "trên một màn hình": ["on one screen", "一画面で"],
  "Mỗi vai trò một góc nhìn, theo đúng phạm vi quyền của mình.": [
    "Each role gets its own view, within exactly its permission scope.",
    "役割ごとに、権限の範囲に応じた画面を。",
  ],
  "Người quản lý xem toàn cảnh vận hành trên một màn hình": [
    "A manager reviewing the whole operation on one screen",
    "マネージャーが運営全体を一画面で確認している様子"],

  // --- trợ lý AI ---
  "AI lo phần tra cứu và gợi ý,": ["AI handles lookups and suggestions,", "AIが検索と提案を担い、"],
  "Sales lo phần tư vấn": ["sales reps handle the conversation", "営業は商談に集中"],
  "Tài chính sách bán hàng, tài liệu dự án lên hệ thống rồi tìm theo nội dung.": [
    "Upload sales policies and project documents, then search them by content.",
    "販売方針や案件資料をアップロードし、内容で検索できます。",
  ],
  "Gợi ý hai chiều, mỗi điểm số đều có lý do theo từng tiêu chí.": [
    "Suggestions both ways, every score explained criterion by criterion.",
    "双方向のレコメンド。スコアは基準ごとに根拠を提示します。",
  ],
  "Tính phí trước bạ, khoản vay, hoa hồng; nhắc cơ hội đang chững.": [
    "Works out registration fees, loans and commissions; flags deals that have stalled.",
    "登録税・ローン・手数料を計算し、停滞した商談を知らせます。",
  ],

  // --- phân quyền & bảo mật ---
  "Dữ liệu được bảo vệ,": ["Data protected,", "データは保護され、"],
  "quyền lợi Sales được tôn trọng": ["sales reps' interests respected", "営業担当の権利も尊重"],
  "Dữ liệu khách hàng được bảo vệ theo quyền từng vai trò": [
    "Customer data protected according to each role's permissions",
    "役割ごとの権限に応じて保護される顧客データ"],

  // --- sáu bước triển khai ---
  "Chuyển từ Excel sang hệ thống": ["From Excel to a system", "Excelからシステムへ"],
  "theo sáu bước": ["in six steps", "6つのステップで"],
  "Sơ đồ: dữ liệu từ file Excel và từ Zalo, điện thoại được đưa vào VinaLand qua ba việc — nhập theo file mẫu, kiểm tra trùng số điện thoại, đối chiếu số liệu rồi nhập thật": [
    "Diagram: data from Excel files and from Zalo and phones moves into VinaLand through three steps — import with the template, check for duplicate phone numbers, reconcile the figures, then import for real",
    "図：ExcelファイルやZalo・スマホにあるデータがVinaLandへ移る流れ。テンプレートで取り込み、電話番号の重複を確認し、数値を照合してから本番取り込み",
  ],
  "Trong giai đoạn pilot, hai bên cùng theo dõi bốn chỉ số: thời gian phản hồi lead · tỷ lệ lead được chăm sóc · tỷ lệ chuyển đổi · bàn giao không mất lịch sử": [
    "During the pilot both sides track four numbers: lead response time · share of leads followed up · conversion rate · handovers with history intact",
    "パイロット期間中は両社で4つの指標を追います：リード対応時間 ・ フォロー済みリードの比率 ・ 成約率 ・ 履歴を失わない引き継ぎ",
  ],

  // --- gói dịch vụ ---
  "Chọn gói theo": ["Pick a plan by", "プランは"],
  "quy mô đội Sales": ["the size of your sales team", "営業チームの規模に合わせて"],
  "Báo giá cụ thể sau buổi khảo sát, gồm đủ các khoản bên dưới.": [
    "A firm quote follows the survey session and covers every item below.",
    "正式なお見積りはヒアリング後にご提示し、下記の項目をすべて含みます。",
  ],
  "Phổ biến": ["Popular", "人気"],
  "Báo giá gồm bốn khoản": ["A quote covers four items", "お見積りの4つの項目"],

  // --- hỏi đáp & chân trang ---
  "Câu hỏi": ["Frequently asked", "よくある"],
  "thường gặp": ["questions", "ご質問"],
  "Liên hệ": ["Contact", "お問い合わせ"],
  "© 2026 VinaLand — phần mềm quản lý sàn bất động sản.": [
    "© 2026 VinaLand — real estate agency management software.",
    "© 2026 VinaLand — 不動産仲介会社向け管理ソフトウェア。",
  ],
  "Phim giới thiệu VinaLand": ["VinaLand intro film", "VinaLand紹介動画"],
  "Gọi điện": ["Call", "電話する"],

  // --- chữ do JS đặt ---
  "Đây là trang mẫu: form chưa nối với nơi nhận nên thông tin chưa được gửi đi. Liên hệ trực tiếp đội ngũ VinaLand để đặt lịch demo.": [
    "This is a layout demo: the form is not wired to a recipient yet, so nothing was sent. Please contact the VinaLand team directly to book a demo.",
    "こちらはレイアウトのデモです。フォームは送信先に接続されていないため、内容は送信されていません。デモのご予約はVinaLandへ直接ご連絡ください。",
  ],
});
