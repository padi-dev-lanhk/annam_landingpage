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

// ---------- Mục Chức năng: 4 nội dung chuyển bằng tab, mỗi lần chỉ hiện một ảnh ----------
(function () {
  const wrap = document.querySelector(".flows");
  const nav = document.querySelector(".flow-nav");
  const links = [...document.querySelectorAll(".flow-nav a")];
  const panels = [...document.querySelectorAll(".flow")];
  if (!wrap || !nav || !links.length || links.length !== panels.length) return;
  wrap.classList.add("has-tabs");
  const ids = new Set(panels.map((el) => el.id));

  function show(id) {
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href").slice(1) === id));
    panels.forEach((el) => el.classList.toggle("is-on", el.id === id));
  }

  nav.setAttribute("role", "tablist");
  links.forEach((a) => {
    a.setAttribute("role", "tab");
    a.addEventListener("click", (e) => {
      e.preventDefault();
      show(a.getAttribute("href").slice(1));
    });
  });

  // Link từ footer (#f-leads…) vẫn mở đúng tab rồi cuộn tới mục
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (!ids.has(id)) return;
    show(id);
    wrap.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const start = location.hash.slice(1);
  show(ids.has(start) ? start : panels[0].id);
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
      "Họ và tên": p.name, "Công ty": p.company, "Vai trò": p.role || "(không chọn)", "Số nhân viên kinh doanh": p.size,
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
    if (bad) { bad.closest("details")?.setAttribute("open", ""); bad.focus(); track("form_error", { field: bad.name }); return; }

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
