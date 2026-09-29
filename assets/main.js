const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- Tracking: đẩy sự kiện vào dataLayer (GTM/GA4 đọc nếu có). KHÔNG đẩy PII ----------
window.dataLayer = window.dataLayer || [];
const UTM = (() => {
  const sp = new URLSearchParams(location.search), out = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => { if (sp.get(k)) out[k] = sp.get(k).slice(0, 100); });
  try {
    if (Object.keys(out).length) sessionStorage.setItem("vinaland_utm", JSON.stringify(out));
    else Object.assign(out, JSON.parse(sessionStorage.getItem("vinaland_utm") || "{}"));
  } catch {}
  return out;
})();
function track(event, data = {}) {
  window.dataLayer.push({ event, ...UTM, ...data });
}

// ---------- CTA click + chọn sẵn gói khi bấm "Yêu cầu tư vấn" ----------
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-cta]");
  if (!a) return;
  track("cta_click", { cta: a.dataset.cta, plan: a.dataset.plan || undefined });
  if (a.dataset.plan) {
    const sel = document.querySelector('#demoForm [name="plan"]');
    if (sel) sel.value = a.dataset.plan;
  }
});

// ---------- Menu cạnh phần Giải pháp: highlight mục đang ở giữa màn hình ----------
(function () {
  const links = [...document.querySelectorAll(".flow-nav a")];
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.remove("active"));
        byId.get(e.target.id)?.classList.add("active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll(".flow").forEach((el) => io.observe(el));
})();

// ---------- "Một ngày làm việc": tab 5 bước, hỗ trợ phím mũi tên ----------
(function () {
  const tabs = [...document.querySelectorAll(".day-step")];
  if (!tabs.length) return;
  function select(tab, focus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => { select(t); track("ai_step_view", { step: i + 1 }); });
    t.addEventListener("keydown", (e) => {
      const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      select(tabs[(i + d + tabs.length) % tabs.length], true);
    });
  });
})();

// ---------- AI Matching: tab 2 chiều (tìm khách cho SP / tìm SP cho khách) ----------
(function () {
  const tabs = [...document.querySelectorAll(".aim-tab")];
  if (!tabs.length) return;
  function select(tab, focus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => { select(t); track("matching_tab", { tab: i + 1 }); });
    t.addEventListener("keydown", (e) => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      select(tabs[(i + d + tabs.length) % tabs.length], true);
    });
  });
})();

// ---------- Phóng to ảnh chụp màn hình ----------
(function () {
  const dlg = document.getElementById("zoom"), img = document.getElementById("zoomImg");
  if (!dlg || !dlg.showModal) return;
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-zoom]");
    if (!b) return;
    img.src = b.dataset.zoom;
    img.alt = b.querySelector("img")?.alt || b.textContent.trim();
    dlg.showModal();
    track("screenshot_zoom", { image: b.dataset.zoom.split("/").pop() });
  });
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
})();

// ---------- Trợ lý tính toán: tự lần lượt trả lời 3 câu hỏi mẫu ----------
(function () {
  const qEl = document.getElementById("xcQ"), aEl = document.getElementById("xcA");
  if (!qEl) return;
  const lbl = document.getElementById("xcLbl"), big = document.getElementById("xcBig");
  const bar = document.getElementById("xcBar"), leg = document.getElementById("xcLeg"), src = document.getElementById("xcSrc");
  const dots = [...document.querySelectorAll("#xcDots i")];
  // Số minh hoạ. Mỗi cảnh ghi rõ công thức và giả định (yêu cầu: kết quả do công thức nghiệp vụ tính, không do AI đoán)
  const SCENES = [
    { q: "Căn 5,8 tỷ sang tên hết bao nhiêu?", label: "Tổng phí sang tên", big: "148,5 triệu",
      parts: [["Thuế thu nhập cá nhân", "116 triệu", 116, "#6366f1"], ["Lệ phí trước bạ", "29 triệu", 29, "#a855f7"], ["Phí công chứng", "3,5 triệu", 3.5, "#ec4899"]],
      src: "Công thức: thuế TNCN 2% và lệ phí trước bạ 0,5% trên giá chuyển nhượng; công chứng theo biểu phí. Giả định: giá trên hợp đồng 5,8 tỷ." },
    { q: "Căn 5,8 tỷ, vay 70% trong 25 năm, lãi 8,5%/năm thì tháng đầu trả bao nhiêu?", label: "Tháng đầu tiên, giảm dần về sau", big: "42,3 triệu",
      parts: [["Tiền gốc", "13,5 triệu", 13.5, "#0ea5e9"], ["Tiền lãi", "28,8 triệu", 28.8, "#6366f1"]],
      src: "Công thức: gốc chia đều, lãi tính trên dư nợ giảm dần. Giả định: lãi suất cố định 8,5%/năm; lãi thực tế theo ngân hàng." },
    { q: "Bán căn 4,5 tỷ thì em nhận hoa hồng bao nhiêu?", label: "Hoa hồng thực nhận", big: "48,6 triệu",
      parts: [["Thực nhận", "48,6 triệu", 48.6, "#10b981"], ["Thuế thu nhập cá nhân 10%", "5,4 triệu", 5.4, "#f59e0b"]],
      src: "Công thức: tỷ lệ hoa hồng × giá bán, trừ thuế TNCN 10%. Giả định: tỷ lệ 1,2% theo chính sách của sàn." },
  ];
  function show(s) {
    lbl.textContent = s.label; big.textContent = s.big; src.textContent = s.src;
    bar.innerHTML = s.parts.map((p) => `<i style="--f:${p[2]};--c:${p[3]}"></i>`).join("");
    leg.innerHTML = s.parts.map((p) => `<div><i style="--c:${p[3]}"></i><span>${p[0]}</span><b>${p[1]}</b></div>`).join("");
  }
  const mark = (i) => dots.forEach((d, j) => d.classList.toggle("on", i === j));
  if (reduceMotion) { qEl.textContent = SCENES[0].q; show(SCENES[0]); mark(0); return; }
  let visible = false;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(qEl);
  (async function loop() {
    for (let i = 0; ; i = (i + 1) % SCENES.length) {
      while (!visible) await wait(300);
      const s = SCENES[i];
      mark(i); aEl.classList.add("busy"); qEl.textContent = "";
      await wait(300);
      for (let k = 1; k <= s.q.length; k++) { qEl.textContent = s.q.slice(0, k); await wait(28); }
      await wait(450);
      show(s); aEl.classList.remove("busy");
      await wait(5200);
    }
  })();
})();

// ---------- Form đặt lịch demo: validate, chống spam, gửi lead ----------
(function () {
  const form = document.getElementById("demoForm");
  if (!form) return;
  const msg = document.getElementById("formMsg"), done = document.getElementById("demoDone");
  const btn = form.querySelector('button[type="submit"]');
  const openedAt = Date.now();
  let started = false;

  form.addEventListener("input", () => {
    if (!started) { started = true; track("form_start"); }
  });

  const RULES = {
    name: (v) => (v.trim().length < 2 ? "Vui lòng nhập họ và tên." : ""),
    company: (v) => (v.trim().length < 2 ? "Vui lòng nhập tên công ty." : ""),
    role: (v) => (!v ? "Vui lòng chọn vai trò." : ""),
    size: (v) => (!v ? "Vui lòng chọn quy mô." : ""),
    phone: (v) => (!/^(\+?84|0)(3|5|7|8|9)\d{8}$/.test(v.replace(/[\s.-]/g, "")) ? "Số điện thoại chưa đúng (ví dụ 0912 345 678)." : ""),
    email: (v) => (v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Email chưa đúng định dạng." : ""),
  };
  function setErr(name, text) {
    const el = form.elements[name];
    const err = name === "consent" ? form.querySelector(".f-err-consent") : el.closest(".f").querySelector(".f-err");
    err.textContent = text;
    el.setAttribute("aria-invalid", text ? "true" : "false");
  }
  function validate() {
    let first = null;
    for (const [name, rule] of Object.entries(RULES)) {
      const e = rule(form.elements[name].value);
      setErr(name, e);
      if (e && !first) first = form.elements[name];
    }
    const c = form.elements.consent.checked ? "" : "Vui lòng đồng ý để chúng tôi liên hệ.";
    setErr("consent", c);
    if (c && !first) first = form.elements.consent;
    return first;
  }
  // Kiểm tra lại khi đang gõ/chọn (không dùng blur: lỗi biến mất lúc mousedown làm form co lại, cú click kế tiếp trượt)
  form.addEventListener("input", (e) => {
    const n = e.target.name;
    if (e.target.getAttribute("aria-invalid") !== "true") return;
    if (RULES[n]) setErr(n, RULES[n](e.target.value));
    else if (n === "consent") setErr("consent", e.target.checked ? "" : "Vui lòng đồng ý để chúng tôi liên hệ.");
  });

  // FormSubmit.co (giai đoạn test): gửi email với nhãn tiếng Việt, bảng gọn. Sau này thay bằng API ghi lead vào CRM.
  function toFormSubmit(p) {
    return {
      _subject: "[VinaLand] Yêu cầu demo mới: " + p.company, _template: "table", _captcha: "false",
      "Họ và tên": p.name, "Công ty": p.company, "Vai trò": p.role, "Số nhân viên kinh doanh": p.size,
      "Điện thoại": p.phone, "Email": p.email || "(không có)", "Gói quan tâm": p.plan || "Chưa rõ", "Nhu cầu": p.need || "(trống)",
      "Đồng ý liên hệ": "Có", "Nguồn": p.source, "Trang": p.page,
      "UTM": ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].filter((k) => p[k]).map((k) => k + "=" + p[k]).join(", ") || "(không có)",
      _replyto: p.email || undefined,
    };
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";
    const bad = validate();
    if (bad) { bad.focus(); track("form_error", { field: bad.name }); return; }

    // Honeypot + gửi quá nhanh (< 3 giây) → coi là bot, giả vờ thành công
    const isBot = form.elements.website.value !== "" || Date.now() - openedAt < 3000;
    const f = form.elements;
    const payload = {
      name: f.name.value.trim(), company: f.company.value.trim(), role: f.role.value, size: f.size.value,
      phone: f.phone.value.replace(/[\s.-]/g, ""), email: f.email.value.trim(), plan: f.plan.value, need: f.need.value.trim(),
      consent: true, source: "Website Landing", page: location.href.split("?")[0], ...UTM,
    };

    btn.disabled = true; btn.classList.add("loading"); btn.textContent = "Đang gửi…";
    const endpoint = form.dataset.endpoint;
    let preview = false;
    try {
      if (isBot) await wait(600);
      else if (endpoint) {
        const body = endpoint.includes("formsubmit.co") ? toFormSubmit(payload) : payload;
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body) });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || String(data.success) === "false") throw new Error("HTTP " + res.status + " " + (data.message || ""));
      } else {
        preview = true; // Chưa cấu hình endpoint ghi lead về CRM
        await wait(600);
      }
      track("form_submit", { role: payload.role, size: payload.size, plan: payload.plan || "none" });
      form.hidden = true; done.hidden = false;
      if (preview) document.getElementById("doneText").textContent =
        "Đây là bản xem trước: form chưa kết nối CRM nên thông tin chưa được gửi đi. Vui lòng liên hệ trực tiếp đội ngũ VinaLand để đặt lịch demo.";
      done.focus();
    } catch (err) {
      console.error("Gửi form demo thất bại:", err);
      track("form_submit_error");
      msg.textContent = "Chưa gửi được yêu cầu. Vui lòng thử lại sau ít phút.";
      btn.disabled = false; btn.classList.remove("loading"); btn.textContent = "Gửi yêu cầu demo";
    }
  });
})();

// ---------- Menu mobile: bấm logo → menu trượt từ trái ----------
(function () {
  const drawer = document.getElementById("drawer"), logo = document.getElementById("navLogo");
  if (!drawer || !logo) return;
  const mobile = window.matchMedia("(max-width: 960px)");
  const closeBtn = drawer.querySelector(".drawer-x");
  function open() {
    drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false");
    logo.setAttribute("aria-expanded", "true"); document.body.classList.add("no-scroll");
    closeBtn.focus({ preventScroll: true });
    track("menu_open");
  }
  function close(restoreFocus) {
    if (!drawer.classList.contains("open")) return;
    drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true");
    logo.setAttribute("aria-expanded", "false"); document.body.classList.remove("no-scroll");
    if (restoreFocus) logo.focus({ preventScroll: true });
  }
  logo.addEventListener("click", (e) => {
    if (!mobile.matches) return; // desktop: logo về đầu trang như thường
    e.preventDefault(); open();
  });
  drawer.addEventListener("click", (e) => {
    const el = e.target.closest("[data-drawer-close]");
    if (el) close(el.classList.contains("drawer-x") || el.classList.contains("drawer-backdrop"));
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(true); });
  mobile.addEventListener("change", () => close(false));
})();
