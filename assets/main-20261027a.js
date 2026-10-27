/* VinaLand — mã trang chủ, bản bố cục 27/10/2026.
   Tách ra từ demo-layout.html, bổ sung phần trang thật cần mà bản mẫu chưa có:
   đo sự kiện, menu kéo trên điện thoại, phóng to ảnh, gửi lead thật. */
/* ---------- Đo sự kiện ----------
   Đẩy vào dataLayer để GTM/GA4 đọc nếu có cài. KHÔNG đẩy thông tin cá nhân. */
window.dataLayer = window.dataLayer || [];
const UTM = (() => {
  const sp = new URLSearchParams(location.search), ra = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    if (sp.get(k)) ra[k] = sp.get(k).slice(0, 100);
  }
  // Giữ qua các trang trong cùng phiên: khách vào từ quảng cáo rồi mới điền form.
  try {
    if (Object.keys(ra).length) sessionStorage.setItem("vinaland_utm", JSON.stringify(ra));
    else Object.assign(ra, JSON.parse(sessionStorage.getItem("vinaland_utm") || "{}"));
  } catch {}
  return ra;
})();
function dem(su, du = {}) { window.dataLayer.push({ event: su, ...UTM, ...du }); }

/* ---------- Đa ngôn ngữ ----------
   Từ điển tra theo CHÍNH câu tiếng Việt nằm trong HTML (assets/i18n-*.js + bản bổ
   sung cho trang mẫu). Câu nào chưa có bản dịch thì giữ nguyên tiếng Việt, trang
   không vỡ. Chữ do JS đặt phải đi qua datChu() thì đổi ngôn ngữ mới dịch lại được. */
const LANGS = ["vi", "en", "ja"];
const DICT = window.VINALAND_DICT || {};
let LANG = "vi";
const gon = (s) => s.replace(/\s+/g, " ").trim();
function dich(vi) {
  if (LANG === "vi" || !vi) return vi;
  const d = DICT[gon(vi)];
  return d ? d[LANGS.indexOf(LANG) - 1] : vi;
}
function datChu(el, vi) { el.dataset.vi = vi; el.textContent = dich(vi); }

/* Ảnh chụp app bản EN/JA nằm ở assets/screenshots/<lang>/ cùng tên file. Mới chụp
   lại được từng này ảnh, nên phải giữ danh sách: đổi bừa đường dẫn sẽ ra ảnh 404. */
const ANH_DA_DICH = new Set(["01-dashboard.webp", "02-products.webp", "07-leads.webp",
  "11-opportunities.webp", "13-tasks.webp", "14-reports.webp", "17-permissions.webp",
  "20-ai-matching-sp.webp", "21-ai-matching-kh.webp", "m02-products.webp", "m04-leads.webp"]);
function duongAnh(src) {
  const ten = src.split("/").pop();
  return LANG !== "vi" && ANH_DA_DICH.has(ten) ? `assets/screenshots/${LANG}/${ten}` : src;
}
function datAnh(img, src) { img.dataset.goc = src; img.src = duongAnh(src); }

const apDungNgonNgu = (() => {
  const TRU = ["alt", "aria-label", "placeholder"];
  const chuGoc = new WeakMap(), truGoc = new WeakMap();
  const theMoTa = document.querySelector('meta[name="description"]');
  const goc = { tieuDe: document.title, moTa: theMoTa?.content };
  // Bỏ qua nhánh có data-i18n-skip (ô chọn ngôn ngữ) và nhánh do JS đặt chữ (data-vi).
  const boQua = (el) => el.tagName === "SCRIPT" || el.tagName === "STYLE"
    || el.hasAttribute("data-i18n-skip") || el.hasAttribute("data-vi");

  return function (lang) {
    LANG = lang;
    document.documentElement.lang = lang;
    document.title = dich(goc.tieuDe);
    if (theMoTa) theMoTa.content = dich(goc.moTa);

    const di = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.nodeType === 1 && boQua(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    for (let n = di.nextNode(); n; n = di.nextNode()) {
      if (n.nodeType === 3) {
        if (!n.data.trim()) continue;
        if (!chuGoc.has(n)) chuGoc.set(n, n.data);
        const o = chuGoc.get(n), tr = dich(o);
        // Giữ nguyên khoảng trắng hai đầu để chữ không dính vào thẻ <b>, <i> bên cạnh.
        n.data = tr === o ? o : o.match(/^\s*/)[0] + tr + o.match(/\s*$/)[0];
        continue;
      }
      let luu = truGoc.get(n);
      for (const a of TRU) {
        if (!n.hasAttribute(a)) continue;
        if (!luu) truGoc.set(n, (luu = {}));
        if (!(a in luu)) luu[a] = n.getAttribute(a);
        n.setAttribute(a, dich(luu[a]));
      }
    }
    for (const el of document.querySelectorAll("[data-vi]")) el.textContent = dich(el.dataset.vi);
    for (const img of document.querySelectorAll('img[src*="assets/screenshots/"]')) {
      if (!img.dataset.goc) img.dataset.goc = img.getAttribute("src");
      img.src = duongAnh(img.dataset.goc);
    }
  };
})();

/* Nút chọn ngôn ngữ. Thứ tự ưu tiên: ?lang=en|ja trên URL → lựa chọn lần trước →
   mặc định tiếng Việt. Tên ngôn ngữ trong bảng chọn viết bằng chính ngôn ngữ đó. */
(function () {
  const hop = document.getElementById("lang");
  if (!hop) return;
  const nut = hop.querySelector(".lang-btn"), bang = hop.querySelector(".lang-menu");
  const muc = [...hop.querySelectorAll("[data-lang]")];

  function dat(lang) {
    apDungNgonNgu(lang);
    hop.querySelector(".lang-code").textContent = lang.toUpperCase();
    for (const m of muc) {
      if (m.dataset.lang === lang) m.setAttribute("aria-current", "true");
      else m.removeAttribute("aria-current");
    }
  }
  let dau = new URLSearchParams(location.search).get("lang");
  if (!LANGS.includes(dau)) { try { dau = localStorage.getItem("vinaland_lang"); } catch {} }
  if (LANGS.includes(dau) && dau !== "vi") dat(dau);

  const mo = (b) => { bang.hidden = !b; nut.setAttribute("aria-expanded", b); };
  nut.addEventListener("click", () => mo(bang.hidden));
  for (const m of muc) m.addEventListener("click", () => {
    const lang = m.dataset.lang;
    mo(false);
    nut.focus();
    if (lang === LANG) return;
    dat(lang);
    try { localStorage.setItem("vinaland_lang", lang); } catch {}
  });
  document.addEventListener("click", (e) => { if (!bang.hidden && !hop.contains(e.target)) mo(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !bang.hidden) { mo(false); nut.focus(); } });
})();

/* Thanh thông báo — ba tin luân phiên, mỗi tin 3 giây, chạy vòng không dừng.
   Rê chuột hoặc đặt tiêu điểm vào thì hoãn đổi tin — đang đọc dở không bị cướp chữ. */
(function () {
  const bang = document.getElementById("ann");
  if (!bang) return;
  const tin = document.getElementById("ann-tin");
  const oNhan = tin.querySelector("b"), oChu = tin.querySelector("span"), oThem = tin.querySelector("i");

  const DS = [
    { nhan: "MỚI", chu: "Trợ lý AI ghép khách với căn, có giải trình từng tiêu chí",
      them: "Xem thử →", neo: "#ai" },
    { nhan: "BẢO MẬT", chu: "Phân quyền theo vai trò và phạm vi, bàn giao khách không mất lịch sử",
      them: "Xem cách làm →", neo: "#bao-mat" },
    { nhan: "TRIỂN KHAI", chu: "Chuyển từ Excel sang hệ thống theo sáu bước, có pilot trước khi mở rộng",
      them: "Xem lộ trình →", neo: "#trien-khai" },
  ];
  let i = 0, dangDoc = false, hen = null;

  // Chữ đi qua datChu() nên đổi ngôn ngữ giữa chừng vẫn dịch lại được.
  function ve(k) {
    const t = DS[k];
    datChu(oNhan, t.nhan);
    datChu(oChu, t.chu);
    datChu(oThem, t.them);
    tin.setAttribute("href", t.neo);
  }
  function doi() {
    if (dangDoc) { hen = setTimeout(doi, 800); return; }
    i = (i + 1) % DS.length;
    tin.classList.add("mo");
    setTimeout(() => { ve(i); tin.classList.remove("mo"); }, 220);
    hen = setTimeout(doi, 3000);
  }
  ve(0);
  hen = setTimeout(doi, 3000);
  for (const [su, co] of [["mouseenter", true], ["mouseleave", false], ["focusin", true], ["focusout", false]]) {
    bang.addEventListener(su, () => { dangDoc = co; });
  }
  bang.querySelector("button").addEventListener("click", () => { clearTimeout(hen); bang.remove(); });
})();

/* Tab chuyển ảnh trong hero.
   Dữ liệu nằm trên chính nút (data-shot / data-cap / data-txt) nên thêm bớt phân hệ
   chỉ cần sửa HTML, không phải đụng vào mã. */
(function () {
  const anh = document.getElementById("shot");
  const chu = document.getElementById("cap-txt");
  for (const t of document.querySelectorAll(".tab")) {
    t.addEventListener("click", () => {
      for (const o of document.querySelectorAll(".tab")) o.setAttribute("aria-selected", "false");
      t.setAttribute("aria-selected", "true");
      datAnh(anh, t.dataset.shot);
      datChu(chu, t.dataset.txt);
    });
  }
})();

/* Hộp thoại phim giới thiệu.
   KHÔNG đặt sẵn src trên thẻ video: phim nặng 15,5 MB, để sẵn src thì nhiều trình
   duyệt bắt đầu tải ngay khi mở trang dù người xem không bấm. Gán src lúc mở, gỡ
   lúc đóng — trang chỉ tải phim khi thật sự cần. Ảnh bìa 20 KB vẫn hiện ngay. */
(function () {
  const PHIM = "assets/video/gioi-thieu-vinaland.mp4";
  const hop = document.getElementById("hop-phim");
  const v = document.getElementById("phim");
  const nut = document.getElementById("mo-phim");
  if (!hop || !v || !nut) return;

  const mo = () => {
    if (!v.getAttribute("src")) v.setAttribute("src", PHIM);
    hop.classList.add("mo");
    document.body.style.overflow = "hidden";
    v.play().catch(() => {});   // trình duyệt chặn tự phát thì người xem tự bấm
  };
  const dong = () => {
    hop.classList.remove("mo");
    document.body.style.overflow = "";
    v.pause();
    // Gỡ src để dừng hẳn việc tải phần còn lại của phim.
    v.removeAttribute("src"); v.load();
  };

  nut.addEventListener("click", mo);
  for (const e of hop.querySelectorAll("[data-dong]")) e.addEventListener("click", dong);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && hop.classList.contains("mo")) dong(); });
})();

/* ---- nét nối từ thẻ phân hệ về hub ----------------------------------------
   Vẽ bằng JS chứ không cứng trong HTML vì điểm đầu mỗi nét phải nằm đúng giữa
   thẻ tương ứng, mà thẻ cao thấp khác nhau (mô tả một hay hai dòng) và còn đổi
   khi người đọc chỉnh cỡ chữ hoặc xoay máy. Chia đều sáu phần như site mẫu thì
   nét sẽ lệch khỏi tim thẻ ngay khi có một thẻ xuống dòng. */
(() => {
  const noi = document.querySelector(".noi");
  if (!noi) return;
  const svg = noi.querySelector("svg");
  const the = [...document.querySelectorAll(".mods .mod")];
  if (!the.length) return;
  const NS = "http://www.w3.org/2000/svg";

  function ve() {
    const k = noi.getBoundingClientRect();
    if (k.width < 2) return;                 // đang bị ẩn ở khổ hẹp
    const w = k.width, h = k.height;
    const dx = w * 0.62, dy = h / 2;          // tâm hub
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.textContent = "";

    const duong = the.map((t) => {
      const r = t.getBoundingClientRect();
      const y = r.top + r.height / 2 - k.top;
      // Hai điểm điều khiển: đoạn đầu chạy ngang khỏi thẻ rồi mới bẻ về tâm,
      // nhờ vậy nét rời thẻ theo phương ngang trông như nối vào cạnh thẻ.
      return `M0 ${y.toFixed(1)} C ${(w * 0.38).toFixed(1)} ${y.toFixed(1)}, ${(w * 0.34).toFixed(1)} ${dy.toFixed(1)}, ${dx.toFixed(1)} ${dy.toFixed(1)}`;
    });

    for (const d of duong) {
      const p = document.createElementNS(NS, "path");
      p.setAttribute("class", "n"); p.setAttribute("d", d);
      svg.appendChild(p);
    }
    duong.forEach((d, i) => {
      const p = document.createElementNS(NS, "path");
      p.setAttribute("class", "tia"); p.setAttribute("d", d);
      svg.appendChild(p);
      // Vạch dài 30px nên phải chạy quá cuối đường đúng 30px mới khuất hẳn.
      p.style.setProperty("--cuoi", `-${(p.getTotalLength() + 30).toFixed(0)}px`);
      // Lệch pha dần từ trên xuống: sáu tia thành một đợt sóng chạy về hub.
      p.style.setProperty("--tre", `${(i * 0.3).toFixed(2)}s`);
    });
  }

  ve();
  new ResizeObserver(ve).observe(noi);
  for (const t of the) new ResizeObserver(ve).observe(t);
  // Thẻ co lại sau khi font web về, lúc đó phải đo lại.
  if (document.fonts?.ready) document.fonts.ready.then(ve);
})();

/* Form đặt lịch demo — soát tại chỗ, bẫy bot, rồi đổi sang bảng cảm ơn.
   Trang mẫu này KHÔNG gắn nơi nhận: bấm gửi chỉ hiện bảng xem trước, không có lead
   nào bay đi. Muốn gửi thật thì thêm data-endpoint="..." vào thẻ <form>. */
(function () {
  const form = document.getElementById("form-demo");
  if (!form) return;
  const bao = document.getElementById("form-bao");
  const xong = document.getElementById("form-xong");
  const nut = form.querySelector('button[type="submit"]');
  const moLuc = Date.now();

  /* FormSubmit.co gửi thẳng về email, nhãn tiếng Việt cho người đọc mail.
     Giá trị các ô chọn giữ nguyên tiếng Việt dù trang đang ở EN/JA, để mail
     nhận được không đổi khuôn theo ngôn ngữ khách đang xem. */
  function khuonFormSubmit(g) {
    return {
      _subject: "[VinaLand] Yêu cầu demo mới: " + g.company, _template: "table", _captcha: "false",
      "Họ và tên": g.name, "Công ty": g.company, "Vai trò": g.role || "(không chọn)",
      "Số nhân viên kinh doanh": g.size, "Điện thoại": g.phone, "Email": g.email || "(không có)",
      "Gói quan tâm": g.plan || "Chưa rõ", "Nhu cầu": g.need || "(trống)", "Đồng ý liên hệ": "Có",
      "Nguồn": g.source, "Trang": g.page, "Ngôn ngữ trang": LANG,
      "UTM": Object.entries(UTM).map(([k, v]) => k + "=" + v).join(", ") || "(không có)",
      _replyto: g.email || undefined,
    };
  }

  const LUAT = {
    name: (v) => (v.trim().length < 2 ? "Vui lòng nhập họ và tên." : ""),
    company: (v) => (v.trim().length < 2 ? "Vui lòng nhập tên công ty." : ""),
    size: (v) => (v ? "" : "Vui lòng chọn quy mô."),
    // Số Việt Nam, hoặc số quốc tế có mã nước cho khách xem bản tiếng Anh/Nhật.
    phone: (v) => {
      const p = v.replace(/[\s.()-]/g, "");
      return /^(\+?84|0)(3|5|7|8|9)\d{8}$/.test(p) || /^\+(?!84)\d{7,14}$/.test(p)
        ? "" : "Số điện thoại chưa đúng (ví dụ 0912 345 678).";
    },
    email: (v) => (v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Email chưa đúng định dạng." : ""),
  };
  const DONG_Y = "Vui lòng đồng ý để chúng tôi liên hệ.";

  function datLoi(ten, chu) {
    const o = form.elements[ten];
    const cho = ten === "consent" ? form.querySelector(".f-err-consent") : o.parentElement.querySelector(".f-err");
    datChu(cho, chu);
    o.setAttribute("aria-invalid", chu ? "true" : "false");
  }
  function soat() {
    let dau = null;
    for (const [ten, luat] of Object.entries(LUAT)) {
      const loi = luat(form.elements[ten].value);
      datLoi(ten, loi);
      if (loi && !dau) dau = form.elements[ten];
    }
    const c = form.elements.consent.checked ? "" : DONG_Y;
    datLoi("consent", c);
    if (c && !dau) dau = form.elements.consent;
    return dau;
  }

  /* Soát lại khi đang gõ, KHÔNG dùng blur: dòng lỗi biến mất ngay lúc nhấn chuột làm
     form co lại, cú bấm kế tiếp trượt khỏi nút. Chỉ soát ô nào đang báo lỗi. */
  form.addEventListener("input", (e) => {
    const ten = e.target.name;
    if (e.target.getAttribute("aria-invalid") !== "true") return;
    if (LUAT[ten]) datLoi(ten, LUAT[ten](e.target.value));
  });
  form.addEventListener("change", (e) => {
    if (e.target.name === "consent") datLoi("consent", e.target.checked ? "" : DONG_Y);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    datChu(bao, "");
    const hong = soat();
    if (hong) { hong.closest("details")?.setAttribute("open", ""); hong.focus(); return; }

    // Ô bẫy có chữ, hoặc gửi chưa đầy 3 giây sau khi mở trang → coi là bot, im lặng cho qua.
    const bot = form.elements.website.value !== "" || Date.now() - moLuc < 3000;
    const f = form.elements;
    const goi = {
      name: f.name.value.trim(), company: f.company.value.trim(), role: f.role.value, size: f.size.value,
      phone: f.phone.value.replace(/[\s.()-]/g, ""), email: f.email.value.trim(),
      plan: f.plan.value, need: f.need.value.trim(), consent: true,
      source: "Website Landing", page: location.href.split("?")[0],
    };

    nut.disabled = true;
    datChu(nut, "Đang gửi…");
    dem("form_submit", { role: goi.role, size: goi.size, plan: goi.plan || "none" });
    const nghi = (ms) => new Promise((r) => setTimeout(r, ms));
    const diem = form.dataset.endpoint;
    let xemTruoc = false;
    try {
      if (bot) await nghi(600);
      else if (diem) {
        const res = await fetch(diem, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(diem.includes("formsubmit.co") ? khuonFormSubmit(goi) : goi),
        });
        const du = await res.json().catch(() => ({}));
        if (!res.ok || String(du.success) === "false") throw new Error("HTTP " + res.status);
      } else {
        xemTruoc = true;
        await nghi(600);
      }
      form.hidden = true;
      xong.hidden = false;
      if (xemTruoc) datChu(document.getElementById("form-xong-chu"),
        "Đây là trang mẫu: form chưa nối với nơi nhận nên thông tin chưa được gửi đi. Liên hệ trực tiếp đội ngũ VinaLand để đặt lịch demo.");
      xong.focus();
    } catch (err) {
      console.error("Gửi form demo thất bại:", err);
      datChu(bao, "Chưa gửi được yêu cầu. Vui lòng thử lại sau ít phút.");
      nut.disabled = false;
      datChu(nut, "Gửi yêu cầu demo");
    }
  });
})();


/* ---------- Bấm nút gọi hành động: ghi nhận và chọn sẵn gói ---------- */
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-cta]");
  if (!a) return;
  dem("cta_click", { cta: a.dataset.cta, plan: a.dataset.plan || undefined });
  // Bấm "Yêu cầu tư vấn" ở thẻ gói nào thì form chọn sẵn gói đó.
  if (a.dataset.plan) {
    const o = document.querySelector('#form-demo [name="plan"]');
    if (o) o.value = a.dataset.plan;
  }
});

/* ---------- Menu kéo trên điện thoại ---------- */
(function () {
  const keo = document.getElementById("drawer"), logo = document.getElementById("brand");
  if (!keo || !logo) return;
  // Cùng mốc với chỗ CSS giấu thanh menu ngang, để không có khoảng nào mất cả hai.
  const hep = window.matchMedia("(max-width: 860px)");
  const nutX = keo.querySelector(".keo-x");

  function mo() {
    keo.classList.add("mo");
    keo.setAttribute("aria-hidden", "false");
    logo.setAttribute("aria-expanded", "true");
    document.body.classList.add("khoa-cuon");
    nutX.focus({ preventScroll: true });
    dem("menu_open");
  }
  function dong(veLogo) {
    if (!keo.classList.contains("mo")) return;
    keo.classList.remove("mo");
    keo.setAttribute("aria-hidden", "true");
    logo.setAttribute("aria-expanded", "false");
    document.body.classList.remove("khoa-cuon");
    if (veLogo) logo.focus({ preventScroll: true });
  }
  logo.addEventListener("click", (e) => {
    if (!hep.matches) return; // màn rộng: logo về đầu trang như thường
    e.preventDefault();
    mo();
  });
  keo.addEventListener("click", (e) => {
    const el = e.target.closest("[data-keo-dong]");
    if (el) dong(el.classList.contains("keo-x") || el.classList.contains("keo-nen"));
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") dong(true); });
  // Xoay ngang máy thành màn rộng mà menu còn mở thì khoá cuộn kẹt lại.
  hep.addEventListener("change", () => dong(false));
})();

/* ---------- Phóng to ảnh chụp màn hình ---------- */
(function () {
  const hop = document.getElementById("zoom"), anh = document.getElementById("zoom-anh");
  if (!hop || !hop.showModal) return;
  document.addEventListener("click", (e) => {
    const nut = e.target.closest("[data-zoom]");
    if (!nut) return;
    // Lấy đúng ảnh đang hiện (đã đổi theo tab và theo ngôn ngữ), không lấy ảnh ban đầu.
    const trong = nut.querySelector("img");
    anh.src = trong ? trong.getAttribute("src") : nut.dataset.zoom;
    anh.alt = trong ? trong.alt : "";
    hop.showModal();
    dem("screenshot_zoom", { image: anh.src.split("/").pop() });
  });
  hop.addEventListener("click", (e) => { if (e.target === hop) hop.close(); });
})();
