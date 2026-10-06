// Liệt kê câu tiếng Việt trong index.html / main.js chưa có bản dịch EN/JA trong assets/i18n-*.js,
// và key trong từ điển không còn dùng ở đâu. Chạy: node tools/check-i18n.mjs  (không cần cài gì)
import { readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const html = read("index.html");
const pick = (re) => html.match(re)?.[1];
const dictFile = pick(/src="assets\/(i18n-[^"]+\.js)"/), mainFile = pick(/src="assets\/(main-[^"]+\.js)"/);
const ctx = { window: {} };
vm.runInNewContext(read("assets/" + dictFile), ctx);
const DICT = ctx.window.VINALAND_DICT;

const VI = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&middot;/g, "·").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
const norm = (s) => decode(s).replace(/\s+/g, " ").trim();

// Bỏ <head>, script, svg, comment và khối data-i18n-skip (nút chọn ngôn ngữ)
const body = html
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace(/<svg[\s\S]*?<\/svg>/g, "")
  .replace(/<div class="lang"[^>]*data-i18n-skip[\s\S]*?<\/ul>\s*<\/div>/, "");
const found = new Set();
for (const m of body.split("</head>")[1].matchAll(/>([^<>]+)</g)) found.add(norm(m[1]));
for (const m of body.matchAll(/\s(?:alt|aria-label|placeholder)="([^"]*)"/g)) found.add(norm(m[1]));
found.add(norm(pick(/<title>([^<]+)<\/title>/)));
found.add(norm(pick(/<meta name="description" content="([^"]+)"/)));
for (const m of read("assets/" + mainFile).matchAll(/"([^"\n]*[^\x00-\x7F][^"\n]*)"/g)) {
  if (DICT[norm(m[1])]) found.add(norm(m[1]));
}

const missing = [...found].filter((s) => s && VI.test(s) && !DICT[s]);
const unused = Object.keys(DICT).filter((k) => !found.has(k));
const broken = Object.entries(DICT).filter(([, v]) => !Array.isArray(v) || v.length !== 2 || v.some((x) => !x)).map(([k]) => k);

console.log(`Từ điển: ${dictFile} (${Object.keys(DICT).length} câu)`);
console.log(`\nChưa dịch (${missing.length}) — địa chỉ văn phòng cố ý giữ tiếng Việt:`);
missing.forEach((s) => console.log("  - " + s));
console.log(`\nKey không còn dùng (${unused.length}):`);
unused.forEach((s) => console.log("  - " + s));
if (broken.length) { console.log("\nKey thiếu bản EN hoặc JA:"); broken.forEach((s) => console.log("  - " + s)); process.exitCode = 1; }
