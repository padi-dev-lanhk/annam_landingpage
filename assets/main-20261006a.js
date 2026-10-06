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

// ---------- Đa ngôn ngữ VI / EN / JA ----------
// Tiếng Việt là bản gốc trong HTML (mặc định). Đổi ngôn ngữ = duyệt mọi đoạn chữ + alt/aria-label/placeholder,
// tra từ điển VINALAND_DICT (assets/i18n-*.js) theo câu tiếng Việt gốc. Câu nào chưa có trong từ điển thì giữ tiếng Việt.
// Chữ do JS tự đặt (lỗi form, nút "Đang gửi…") dùng setText() để khi đổi ngôn ngữ vẫn dịch lại được.
const LANGS = ["vi", "en", "ja"];
const LANG_NAMES = { vi: "Tiếng Việt", en: "English", ja: "日本語" };
const DICT = window.VINALAND_DICT || {};
let LANG = "vi";
const norm = (s) => s.replace(/\s+/g, " ").trim();
function t(vi) {
  if (LANG === "vi" || !vi) return vi;
  const e = DICT[norm(vi)];
  return e ? e[LANGS.indexOf(LANG) - 1] : vi;
}
function setText(el, vi) {
  el.dataset.vi = vi;
  el.textContent = t(vi);
}

const applyLang = (() => {
  const ATTRS = ["alt", "aria-label", "placeholder"];
  const origText = new WeakMap(), origAttr = new WeakMap();
  const metaDesc = document.querySelector('meta[name="description"]');
  const orig = { title: document.title, desc: metaDesc?.content };
  const skip = (el) => el.tagName === "SCRIPT" || el.tagName === "STYLE" || el.hasAttribute("data-i18n-skip") || el.hasAttribute("data-vi");

  return function (lang) {
    LANG = lang;
    document.documentElement.lang = lang;
    document.title = t(orig.title);
    if (metaDesc) metaDesc.content = t(orig.desc);

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.nodeType === 1 && skip(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (n.nodeType === 3) {
        if (!n.data.trim()) continue;
        if (!origText.has(n)) origText.set(n, n.data);
        const o = origText.get(n), tr = t(o);
        // Giữ khoảng trắng đầu/cuối để chữ không dính vào thẻ <b>, <i> bên cạnh
        const next = tr === o ? o : o.match(/^\s*/)[0] + tr + o.match(/\s*$/)[0];
        if (n.data !== next) n.data = next;
        continue;
      }
      let saved = origAttr.get(n);
      for (const a of ATTRS) {
        if (!n.hasAttribute(a)) continue;
        if (!saved) origAttr.set(n, (saved = {}));
        if (!(a in saved)) saved[a] = n.getAttribute(a);
        n.setAttribute(a, t(saved[a]));
      }
    }
    document.querySelectorAll("[data-vi]").forEach((el) => { el.textContent = t(el.dataset.vi); });

    // Ảnh chụp app: bản EN/JA nằm ở assets/screenshots/<lang>/ cùng tên file với bản tiếng Việt
    document.querySelectorAll('img[src*="assets/screenshots/"], [data-zoom*="assets/screenshots/"]').forEach((el) => {
      const attr = el.tagName === "IMG" ? "src" : "data-zoom";
      let saved = origAttr.get(el);
      if (!saved) origAttr.set(el, (saved = {}));
      if (!(attr in saved)) saved[attr] = el.getAttribute(attr);
      el.setAttribute(attr, lang === "vi" ? saved[attr] : saved[attr].replace("assets/screenshots/", `assets/screenshots/${lang}/`));
    });
  };
})();

// Nút chọn ngôn ngữ trên header. Ưu tiên ?lang=en|ja trên URL, sau đó lựa chọn lần trước; mặc định tiếng Việt.
(function () {
  const box = document.getElementById("lang");
  const btn = box?.querySelector(".lang-btn"), menu = box?.querySelector(".lang-menu");
  const items = box ? [...box.querySelectorAll("[data-lang]")] : [];

  function setLang(lang) {
    applyLang(lang);
    if (!box) return;
    box.querySelector(".lang-code").textContent = lang.toUpperCase();
    items.forEach((b) => (b.dataset.lang === lang ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current")));
  }

  let start = new URLSearchParams(location.search).get("lang");
  if (!LANGS.includes(start)) try { start = localStorage.getItem("vinaland_lang"); } catch {}
  if (LANGS.includes(start) && start !== "vi") setLang(start);

  if (!box) return;
  function toggle(open) {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", open);
  }
  btn.addEventListener("click", () => toggle(menu.hidden));
  items.forEach((b) => b.addEventListener("click", () => {
    const lang = b.dataset.lang;
    toggle(false);
    btn.focus();
    if (lang === LANG) return;
    setLang(lang);
    try { localStorage.setItem("vinaland_lang", lang); } catch {}
    track("lang_change", { lang });
  }));
  document.addEventListener("click", (e) => { if (!menu.hidden && !box.contains(e.target)) toggle(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { toggle(false); btn.focus(); } });
})();

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
    // Số Việt Nam, hoặc số quốc tế có mã nước (+81…, +1…) cho khách xem bản EN/JA
    phone: (v) => {
      const p = v.replace(/[\s.()-]/g, "");
      return /^(\+?84|0)(3|5|7|8|9)\d{8}$/.test(p) || /^\+(?!84)\d{7,14}$/.test(p) ? "" : "Số điện thoại chưa đúng (ví dụ 0912 345 678).";
    },
    email: (v) => (v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Email chưa đúng định dạng." : ""),
  };
  function setErr(name, text) {
    const el = form.elements[name];
    const err = name === "consent" ? form.querySelector(".f-err-consent") : el.closest(".f").querySelector(".f-err");
    setText(err, text);
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
      "Đồng ý liên hệ": "Có", "Nguồn": p.source, "Trang": p.page, "Ngôn ngữ trang": LANG_NAMES[p.lang] || p.lang,
      "UTM": ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].filter((k) => p[k]).map((k) => k + "=" + p[k]).join(", ") || "(không có)",
      _replyto: p.email || undefined,
    };
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setText(msg, "");
    const bad = validate();
    if (bad) { bad.closest("details")?.setAttribute("open", ""); bad.focus(); track("form_error", { field: bad.name }); return; }

    // Honeypot + gửi quá nhanh (< 3 giây) → coi là bot, giả vờ thành công
    const isBot = form.elements.website.value !== "" || Date.now() - openedAt < 3000;
    const f = form.elements;
    const payload = {
      name: f.name.value.trim(), company: f.company.value.trim(), role: f.role.value, size: f.size.value,
      phone: f.phone.value.replace(/[\s.()-]/g, ""), email: f.email.value.trim(), plan: f.plan.value, need: f.need.value.trim(),
      consent: true, source: "Website Landing", page: location.href.split("?")[0], lang: LANG, ...UTM,
    };

    btn.disabled = true; btn.classList.add("loading"); setText(btn, "Đang gửi…");
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
      if (preview) setText(document.getElementById("doneText"),
        "Đây là bản xem trước: form chưa kết nối CRM nên thông tin chưa được gửi đi. Vui lòng liên hệ trực tiếp đội ngũ VinaLand để đặt lịch demo.");
      done.focus();
    } catch (err) {
      console.error("Gửi form demo thất bại:", err);
      track("form_submit_error");
      setText(msg, "Chưa gửi được yêu cầu. Vui lòng thử lại sau ít phút.");
      btn.disabled = false; btn.classList.remove("loading"); setText(btn, "Gửi yêu cầu demo");
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
