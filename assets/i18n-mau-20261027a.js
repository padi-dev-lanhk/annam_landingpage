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
  // Hai tin còn lại của thanh thông báo — chữ nằm trong mã, không có trong HTML.
  "BẢO MẬT": ["SECURITY", "セキュリティ"],
  "Phân quyền theo vai trò và phạm vi, bàn giao khách không mất lịch sử": [
    "Permissions by role and scope; handovers keep the full history",
    "役割と範囲に基づく権限。引き継いでも履歴は残ります",
  ],
  "Xem cách làm →": ["See how →", "やり方を見る →"],
  "TRIỂN KHAI": ["ROLLOUT", "導入"],
  "Chuyển từ Excel sang hệ thống theo sáu bước, có pilot trước khi mở rộng": [
    "Move from Excel to a system in six steps, with a pilot before you scale",
    "Excelからシステムへ6つのステップで。拡大前にパイロット運用",
  ],
  "Xem lộ trình →": ["See the roadmap →", "ロードマップを見る →"],

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
  /* Địa chỉ văn phòng. Tên đường là tên riêng nên không dịch nghĩa: bản tiếng Anh
     bỏ dấu cho dễ đọc và gõ lại, bản tiếng Nhật xếp từ lớn tới nhỏ theo lối Nhật
     nhưng giữ nguyên tên đường bằng chữ Latin để còn tra bản đồ được. */
  "539 Vũ Tông Phan, Khương Đình, Thanh Xuân, Hà Nội": [
    "539 Vu Tong Phan, Khuong Dinh Ward, Thanh Xuan District, Hanoi",
    "ハノイ市タインスアン区クオンディン坊 539 Vu Tong Phan",
  ],
  "47 Hồ Bá Kiện, Phường 15, Quận 10, TP. Hồ Chí Minh": [
    "47 Ho Ba Kien, Ward 15, District 10, Ho Chi Minh City",
    "ホーチミン市10区15坊 47 Ho Ba Kien",
  ],
  "Phim giới thiệu VinaLand": ["VinaLand intro film", "VinaLand紹介動画"],
  "Phóng to ảnh giao diện": ["Enlarge the interface screenshot", "画面のスクリーンショットを拡大"],
  "Gọi điện": ["Call", "電話する"],

  // --- chữ do JS đặt ---
  "Đây là trang mẫu: form chưa nối với nơi nhận nên thông tin chưa được gửi đi. Liên hệ trực tiếp đội ngũ VinaLand để đặt lịch demo.": [
    "This is a layout demo: the form is not wired to a recipient yet, so nothing was sent. Please contact the VinaLand team directly to book a demo.",
    "こちらはレイアウトのデモです。フォームは送信先に接続されていないため、内容は送信されていません。デモのご予約はVinaLandへ直接ご連絡ください。",
  ],
});

/* ---------- Đợt viết lại lời 27/10/2026 ----------
   Câu tiếng Việt trên trang đổi cách diễn đạt nên khoá từ điển đổi theo. Câu nào
   chỉ đổi lời mà không đổi ý thì giữ nguyên bản dịch cũ. */
Object.assign(window.VINALAND_DICT, {
  "Trợ lý AI gợi ý khách nào hợp căn nào, kèm lý do cho từng gợi ý": [
    "An AI assistant matches customers with units and explains every criterion",
    "AIアシスタントが顧客と住戸をマッチングし、各基準の根拠も提示します",
  ],
  "Phân quyền theo vai trò, bàn giao khách vẫn giữ nguyên lịch sử": [
    "Permissions by role and scope; handovers keep the full history",
    "役割と範囲に基づく権限。引き継いでも履歴は残ります",
  ],
  "Chuyển dữ liệu từ Excel qua sáu bước, chạy thử một nhóm trước khi mở rộng": [
    "Move from Excel to a system in six steps, with a pilot before you scale",
    "Excelからシステムへ6つのステップで。拡大前にパイロット運用",
  ],
  "Cả sàn làm việc": [
    "One floor, one set of records",
    "全社がひとつの台帳で",
  ],
  "trên một bảng hàng": [
    "one inventory sheet",
    "ひとつの在庫表と",
  ],
  "và một danh sách khách": [
    "and one customer list",
    "ひとつの顧客リストで動く",
  ],
  "Từ lúc khách để lại số đến lúc bàn giao căn, mọi thứ nằm ở một chỗ.": [
    "From the moment a customer leaves a phone number to the day you hand over the unit, everything sits in one place.",
    "顧客が電話番号を残した時点から住戸を引き渡す日まで、すべてがひとつの場所に。",
  ],
  "Phân quyền rõ ràng, công sức của Sales không bị xoá": [
    "Clear permissions, and no sales rep's work gets wiped",
    "権限は明確に。営業担当の積み上げは消えません",
  ],
  "Còn bao nhiêu căn, khách đang ở bước nào, deal nào sắp chốt. Đội ngũ thao tác tới đâu, số đổi tới đó.": [
    "How much inventory is left, where each customer stands, which deals are about to close — updated in real time.",
    "残りの在庫、顧客の状況、クロージング間近の商談 — リアルタイムで更新。",
  ],
  "Chia theo dự án, phân khu, từng toà. Căn nào còn, căn nào đã cọc, cả sàn nhìn chung một bảng.": [
    "Managed by project, zone and building. Which units are free, which are on deposit — one screen for the whole agency.",
    "案件・区画・棟ごとに管理。空き住戸と手付金済みの住戸を、全社が同じ画面で確認。",
  ],
  "Gõ số điện thoại là ra khách này ai đang chăm, đã trao đổi những gì.": [
    "Customers belong to the company. Type a phone number and you see who owns them.",
    "顧客は会社のもの。電話番号を入力すれば担当者が分かります。",
  ],
  "Mỗi cơ hội đi qua từng bước: tư vấn, đàm phán, đặt cọc rồi chốt. Chững ở đâu nhìn ra ngay.": [
    "From consultation and negotiation to deposit and closing — every opportunity tracked.",
    "商談・交渉から手付金、成約まで — ひとつひとつの商談を追跡。",
  ],
  "Hồ sơ dự án, phân khu, chính sách bán hàng và tài liệu để chung một chỗ cho cả sàn dùng.": [
    "Project records, zones, sales policies and documents — in one place for the whole agency.",
    "案件情報・区画・販売方針・資料を一か所にまとめ、全社で利用。",
  ],
  "Còn bao nhiêu căn, khách đang ở bước nào, deal nào sắp chốt. Tất cả trên một màn hình.": [
    "How much inventory is left, where each customer stands, which deals are about to close — all on one screen.",
    "残りの在庫、顧客の状況、クロージング間近の商談 — すべてを一画面に。",
  ],
  "thay cho một thứ": [
    "replaces a tool",
    "いまの道具を",
  ],
  "sàn đang dùng tạm": [
    "your agency uses today",
    "ひとつずつ置き換えます",
  ],
  "Không phải cài thêm một phần mềm nữa, mà bỏ bớt những thứ đang dùng tạm.": [
    "Not one more piece of software — fewer scattered ones.",
    "ソフトを増やすのではなく、バラバラな道具を減らします。",
  ],
  "mỗi dự án một file Excel, không ai chắc bảng nào mới nhất": [
    "a separate Excel file per project, nobody sure which sheet is current",
    "案件ごとに別々のExcel、どれが最新か誰も分からない",
  ],
  "danh bạ và tin nhắn Zalo nằm trong máy từng người": [
    "contacts and Zalo chats living on each person's phone",
    "担当者それぞれのスマホに散らばる連絡先とZaloのやり取り",
  ],
  "trí nhớ của Sales và cuốn sổ mang theo người": [
    "a sales rep's memory and the notebook in their bag",
    "営業担当の記憶と持ち歩きの手帳",
  ],
  "lịch hẹn đặt trên điện thoại riêng, người nghỉ là mất theo": [
    "reminders set on personal phones, gone the day they leave",
    "個人のスマホに入れたリマインダー、退職すれば消える",
  ],
  "cuối tháng ngồi gộp số từ nhiều file Excel": [
    "month-end spent merging Excel files from several places",
    "月末に複数のExcelを手作業で集計",
  ],
  "hỏi người có kinh nghiệm rồi chờ người ta rảnh": [
    "asking a veteran, then waiting for the answer",
    "経験者に聞いて、回答を待つ",
  ],
  "Tất cả dồn về một hồ sơ khách và một bảng hàng": [
    "Everything lands in one customer record and one inventory sheet",
    "すべてがひとつの顧客台帳とひとつの在庫表に",
  ],
  "Sàn càng đông người,": [
    "The more people on the floor,",
    "人が増えるほど、",
  ],
  "dữ liệu càng dễ rơi rớt": [
    "the more data slips through",
    "データはこぼれ落ちやすくなる",
  ],
  "Bốn chuyện sàn phân phối nào cũng gặp.": [
    "Four things every brokerage runs into.",
    "どの仲介会社にも起きる4つのこと。",
  ],
  "Lead rơi rụng": [
    "Leads slip away",
    "リードがこぼれる",
  ],
  "Khách từ Facebook, Zalo, hotline, sự kiện nằm rải rác trong máy từng người. Cuối ngày không ai biết còn ai chưa được gọi.": [
    "Leads from Facebook, Zalo, the hotline and events sit on individual phones. Nobody knows which ones haven't been called.",
    "Facebook、Zalo、電話、イベントからのリードが担当者ごとの端末に散在。まだ連絡していない顧客が誰にも分かりません。",
  ],
  "Bảng hàng mỗi nơi một bản": [
    "A different inventory sheet everywhere",
    "在庫表が場所ごとにバラバラ",
  ],
  "Mỗi dự án một file Excel, mỗi đợt mở bán một bảng giá. Sales chào nhầm căn đã có người cọc, quản lý không nắm được còn bao nhiêu.": [
    "One Excel file per project, one price list per launch. Reps pitch units that already have a deposit, and managers can't keep track of stock.",
    "プロジェクトごとにExcel、販売期ごとに価格表。手付金済みの住戸を誤って案内し、管理者も在庫を把握できません。",
  ],
  "Không nhìn được tiến độ": [
    "No view of what is moving",
    "進捗が見えない",
  ],
  "Giám đốc kinh doanh chờ tới cuối tháng mới biết kết quả. Deal chững lại hay việc quá hạn thì phải có người báo mới hay.": [
    "Sales directors only see results at month end. Stalled deals and overdue tasks go unnoticed.",
    "営業部長が結果を知るのは月末だけ。停滞した商談や期限切れのタスクに誰も気づけません。",
  ],
  "Bàn giao là mất lịch sử": [
    "Handover means losing the history",
    "引き継ぐと履歴が消える",
  ],
  "Một người nghỉ hoặc chuyển nhóm là lịch sử chăm sóc đi theo. Người nhận lại phải hỏi khách từ đầu.": [
    "When someone leaves or moves team, the care history goes with them. Whoever takes over has to ask the customer everything again.",
    "担当者が退職・異動すると対応履歴ごと失われます。引き継いだ人は顧客に一から聞き直すことになります。",
  ],
  "Mỗi vai trò nhìn thấy đúng phần việc và phần dữ liệu của mình.": [
    "Each role gets its own view, within exactly its permission scope.",
    "役割ごとに、権限の範囲に応じた画面を。",
  ],
  "Còn hàng theo trạng thái": [
    "What is left, by status",
    "ステータス別の残り在庫",
  ],
  "Đang bán, đã cọc, đã bán, dừng bán. Đội ngũ thao tác tới đâu, số đổi tới đó.": [
    "For sale, deposited, sold, on hold — updated as your team works.",
    "販売中・手付金済み・成約・販売停止 — チームの操作に合わせて更新されます。",
  ],
  "Đang có bao nhiêu lead, bao nhiêu đã thành khách, tỷ lệ chuyển đổi là bao nhiêu.": [
    "Current leads, how many became customers, and the conversion rate.",
    "現在のリード数、顧客化した数、そして転換率。",
  ],
  "Mỗi bước có bao nhiêu deal và tổng giá trị bao nhiêu: mới, tư vấn, đàm phán, cọc, chốt, mất.": [
    "Deal count and value at each step: new, consulting, negotiating, deposit, won, lost.",
    "各ステップの商談数と金額：新規、提案、交渉、手付金、成約、失注。",
  ],
  "Báo cáo theo người, dự án, nguồn hàng": [
    "Reports by rep, project and inventory source",
    "担当者・プロジェクト・物件ソース別のレポート",
  ],
  "Lọc theo nhóm và theo thời gian để biết ai đang ra số, dự án nào đang chững.": [
    "Filter by team and period: who's delivering, which projects are stalling.",
    "チームと期間で絞り込み：成果を出しているのは誰か、停滞しているプロジェクトはどれか。",
  ],
  "Người quản lý xem cả sàn đang chạy thế nào trên một màn hình": [
    "A manager checking how the whole floor is doing on one screen",
    "マネージャーが全社の動きを一画面で確認している様子",
  ],
  "Việc tra cứu để AI làm,": [
    "Let AI do the looking up,",
    "調べ物はAIに任せ、",
  ],
  "Sales tập trung vào khách": [
    "so sales can stay with the customer",
    "営業は顧客に集中",
  ],
  "AI đọc dữ liệu của chính doanh nghiệp, và chỉ đọc trong phạm vi quyền của người đang dùng.": [
    "Works directly on your company's data, within each user's permission scope.",
    "自社のデータ上で、各ユーザーの権限範囲内で動作します。",
  ],
  "Tập xử lý tình huống khách từ chối, xong buổi nào có chấm điểm và góp ý buổi đó.": [
    "Practice handling customer objections, with a score and feedback after each session.",
    "顧客の反論への対応を練習し、毎回スコアとフィードバックを受け取れます。",
  ],
  "Đưa chính sách bán hàng và tài liệu dự án lên hệ thống, cần gì thì hỏi thẳng theo nội dung.": [
    "Upload sales policies and project documents, then search them by content.",
    "販売方針や案件資料をアップロードし、内容で検索できます。",
  ],
  "AI Matching: ghép khách với căn": [
    "AI Matching — pair customers with units",
    "AI Matching — 顧客と住戸のマッチング",
  ],
  "Tìm căn cho khách hoặc tìm khách cho căn. Mỗi gợi ý đều kèm lý do theo từng tiêu chí.": [
    "Suggestions both ways, every score explained criterion by criterion.",
    "双方向のレコメンド。スコアは基準ごとに根拠を提示します。",
  ],
  "Trợ lý tính toán và nhắc việc": [
    "A calculator that also nudges you",
    "計算と、やるべきことの通知",
  ],
  "Tính phí trước bạ, khoản vay, hoa hồng. Cơ hội nào chững thì nhắc.": [
    "Works out registration fees, loans and commissions; flags deals that have stalled.",
    "登録税・ローン・手数料を計算し、停滞した商談を知らせます。",
  ],
  "Ai xem được gì là do sàn đặt,": [
    "Who sees what is your call,",
    "誰が何を見るかは会社が決める、",
  ],
  "không phải do phần mềm": [
    "not the software's",
    "ソフトではなく",
  ],
  "Xem, sửa, nhập, xuất trong phạm vi toàn công ty, theo nhóm hoặc chỉ của mình. Quản trị viên tự chỉnh ma trận quyền ngay trên giao diện.": [
    "View, edit, import and export at company, team or individual level. Admins adjust the permission matrix themselves in the UI.",
    "閲覧・編集・取り込み・書き出しを全社・チーム・個人の範囲で設定。権限マトリクスは管理者が画面上で調整できます。",
  ],
  "Thông tin chủ nhà tách riêng": [
    "Separate permission for owner details",
    "物件オーナー情報は個別権限",
  ],
  "Lịch sử chăm sóc đi theo khách": [
    "The care history stays with the customer",
    "対応履歴は顧客について回る",
  ],
  "Bàn giao có ghi người chuyển và người nhận, nên công sức của Sales không mất.": [
    "Customer handovers record who handed over and who received — reps' work is never erased.",
    "顧客の引き継ぎでは引き渡し元と引き継ぎ先を記録。営業担当者の努力が消えることはありません。",
  ],
  "Mã OTP, thiết bị tin cậy, khoá lại sau nhiều lần đăng nhập sai, và nhật ký mọi thay đổi dữ liệu quan trọng.": [
    "OTP codes, trusted devices, failed-login limits, and a log of changes to important data.",
    "OTPコード、信頼済みデバイス、ログイン失敗回数の制限、重要データの変更ログ。",
  ],
  "Dữ liệu khách hàng chỉ mở đúng phạm vi quyền của từng vai trò": [
    "Customer data opens only as far as each role's permissions reach",
    "顧客データは役割の権限の範囲でのみ開きます",
  ],
  "Hai bên đi cùng nhau từ buổi khảo sát đến lúc nghiệm thu.": [
    "We're with you from assessment to sign-off.",
    "現状調査から検収まで伴走します。",
  ],
  "Rà lại file Excel đang dùng, dọn chỗ trùng và chỗ thiếu.": [
    "Review your current Excel files, clean up duplicates and gaps.",
    "現在のExcelファイルを確認し、重複や欠損を整理。",
  ],
  "Nhập theo file mẫu vào môi trường thử rồi đối chiếu lại số liệu.": [
    "Import via template into a test environment and reconcile the numbers.",
    "テスト環境にテンプレートで取り込み、数値を照合。",
  ],
  "Hướng dẫn theo từng vai trò, có tài liệu để sau này sàn tự đào tạo người mới.": [
    "Role-based training, with materials for retraining in-house.",
    "役割別のトレーニングと、社内研修用の資料を提供。",
  ],
  "Cho một nhóm hoặc một dự án chạy trước trên dữ liệu thật.": [
    "One team or one project runs on real data.",
    "1チームまたは1プロジェクトで実データを使って運用。",
  ],
  "Rà lại dữ liệu và quyền, mở rộng ra toàn sàn rồi bàn giao vận hành.": [
    "Re-check data and permissions, roll out company-wide, hand over operations.",
    "データと権限を再確認し、全社へ展開して運用を引き継ぎ。",
  ],
  "Chạy pilot, hai bên cùng nhìn vào bốn con số: thời gian phản hồi lead · tỷ lệ lead được chăm · tỷ lệ chuyển đổi · bàn giao không mất lịch sử": [
    "During the pilot both sides track four numbers: lead response time · share of leads followed up · conversion rate · handovers with history intact",
    "パイロット期間中は両社で4つの指標を追います：リード対応時間 ・ フォロー済みリードの比率 ・ 成約率 ・ 履歴を失わない引き継ぎ",
  ],
  "Khảo sát xong mới có báo giá cụ thể, gồm đủ bốn khoản bên dưới.": [
    "A firm quote follows the survey session and covers every item below.",
    "正式なお見積りはヒアリング後にご提示し、下記の項目をすべて含みます。",
  ],
  "Dọn dữ liệu về một mối": [
    "Get the data into one place",
    "データをひとつにまとめる",
  ],
  "Sàn lớn, nhiều đầu mối": [
    "Large floors, many moving parts",
    "大規模・多拠点の運営",
  ],
  "Kênh tiếp nhận, thời gian phản hồi và cách xử lý sự cố đều ghi trong hợp đồng.": [
    "Support channels, response times and incident handling are set out in the contract.",
    "受付窓口、対応時間、障害対応は契約書に明記します。",
  ],
  "Tuỳ số dự án, khối lượng dữ liệu và mức tuỳ chỉnh. Sau buổi khảo sát chúng tôi gửi lộ trình sáu bước kèm mốc thời gian cho đúng sàn của anh chị, chứ không có mốc chung cho mọi sàn.": [
    "It depends on the number of projects, the data volume and how much customization you need. A specific six-step plan is sent after the assessment — there's no single timeline for every agency.",
    "プロジェクト数、データ量、カスタマイズの程度によります。6ステップの具体的なスケジュールは現状調査の後にお送りします。すべての会社に共通の目安はありません。",
  ],
  "Được. Tải file mẫu từ hệ thống, điền vào rồi nhập lên, hệ thống kiểm tra trùng số điện thoại trước khi ghi. Nếu dữ liệu đang nằm ở phần mềm khác thì hai bên khảo sát khả năng chuyển đổi trước khi cam kết.": [
    "Yes. Import from Excel using the template from the system, with a duplicate phone check before saving. For data in other software, we assess the migration together before committing.",
    "はい。システムのテンプレートでExcelから取り込み、保存前に電話番号の重複をチェックします。他のソフトウェアにあるデータは、移行の可否を双方で調査してからお約束します。",
  ],
  "Hiện chưa. Lead nhập tay hoặc nhập từ Excel, có trường ghi nguồn khách. Nếu sàn cần nối với tổng đài hay form trên website thì chúng tôi khảo sát tích hợp và báo giá riêng.": [
    "There's no automatic connection yet. Leads are entered manually or from Excel, with a source field. If you need a call center or website form connection, we'll assess the integration and quote it separately.",
    "現時点では自動連携はありません。リードは手入力またはExcelで登録し、流入元の項目があります。コールセンターやWebフォームとの連携が必要な場合は、調査のうえ個別にお見積もりします。",
  ],
  "Do chính doanh nghiệp đặt trong ma trận phân quyền: toàn công ty, theo nhóm, hoặc chỉ khách của mình. Riêng tên và số điện thoại chủ nhà ký gửi có quyền xem tách riêng.": [
    "It follows the permission matrix you configure: company-wide, by team, or own customers only. Sensitive details such as consigning owners' names and phone numbers have their own view permission.",
    "自社で設定する権限マトリクスに従います（全社、チーム単位、または自分の顧客のみ）。委託オーナーの氏名や電話番号などの機密情報には、個別の閲覧権限があります。",
  ],
  "Không. AI chỉ đọc được đúng phần dữ liệu mà người đang đăng nhập có quyền xem. Phạm vi dữ liệu và nơi xử lý ghi rõ trong hợp đồng trước khi bật tính năng.": [
    "No. The AI only accesses data within the signed-in user's permission scope. The data scope and where it's processed are stated in the contract before it's turned on.",
    "いいえ。AIはログイン中のユーザーの権限範囲内のデータにのみアクセスします。データの範囲と処理場所は、有効化の前に契約書で明記します。",
  ],
  "Buổi demo 45 phút, chạy trên dữ liệu mẫu hoặc trên chính bảng hàng của sàn. Nhận được yêu cầu, chúng tôi gọi lại để hẹn giờ.": [
    "A 45-minute demo on sample data or your own inventory sheet. Our consultants will get back to you to confirm the time.",
    "サンプルデータまたは貴社の物件表を使った45分のデモです。担当コンサルタントから日時確認のご連絡をいたします。",
  ],
  "Cảm ơn anh chị. Chúng tôi sẽ gọi lại để hẹn giờ demo.": [
    "Thank you. A VinaLand consultant will contact you to confirm the demo time.",
    "ありがとうございます。VinaLand の担当者より、デモの日時確認のご連絡をいたします。",
  ],
  "Cả sàn đang chạy thế nào,": [
    "How the whole floor is doing,",
    "全社がいまどう動いているか、",
  ],
  "xem trên một màn hình": [
    "on one screen",
    "一画面で確認",
  ],
});

/* Tiêu đề hero rút ngắn lại cho vừa ba dòng. */
Object.assign(window.VINALAND_DICT, {
  "Một bảng hàng": ["One inventory sheet,", "ひとつの在庫表、"],
  "một danh sách khách": ["one customer list,", "ひとつの顧客リスト、"],
  "cho cả sàn": ["for the whole floor", "それを全社で"],
});
