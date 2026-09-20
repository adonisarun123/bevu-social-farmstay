import { chromium } from "playwright";
const out = process.env.SHOT_DIR || "/tmp";
const base = "http://localhost:3111";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const p = await ctx.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push("pageerror: " + e.message));
p.on("response", (r) => { if (r.status() >= 500) errors.push(`HTTP ${r.status()} ${r.url()}`); });
const step = async (name, fn) => { try { await fn(); console.log("✓", name); } catch (e) { console.log("✗", name, "-", e.message.split("\n")[0]); await p.screenshot({ path: `${out}/fail_${name.replace(/\W+/g, "_")}.png` }); } };
const shot = (n) => p.screenshot({ path: `${out}/${n}.png`, fullPage: true });
const wait = (ms) => p.waitForTimeout(ms);
const signOut = async () => { await p.waitForLoadState("networkidle"); const [r] = await Promise.all([p.waitForResponse((x) => x.url().includes("/api/auth/signout") && x.request().method() === "POST", { timeout: 15000 }), p.click("text=Sign out")]); await p.waitForURL(base + "/", { timeout: 15000 }); const c = (await ctx.cookies()).map((x) => x.name); if (c.includes("authjs.session-token")) throw new Error("session cookie still present"); };

// 1. First registration → admin
await step("register owner (first user → admin)", async () => {
  await p.goto(base + "/register"); await p.fill("#name", "Ankit Owner"); await p.fill("#email", "owner@bevu.test"); await p.fill("#phone", "+919717334639"); await p.fill("#password", "Owner1234!");
  await p.click("button[type=submit]"); await p.waitForURL("**/admin", { timeout: 15000 });
  await p.waitForSelector("text=Needs a decision");
});
await shot("admin_dashboard_empty");

// 2. Rates
await step("add default room + house rates", async () => {
  await p.goto(base + "/admin/rates");
  const f = p.locator("form").last();
  await f.locator("select[name=kind]").selectOption("room"); await f.locator("input[name=weekday]").fill("6500"); await f.locator("input[name=weekend]").fill("7500"); await f.locator("button[type=submit]").click();
  await p.waitForSelector("text=Rate saved"); await wait(500);
  await p.goto(base + "/admin/rates");
  const g = p.locator("form").last();
  await g.locator("select[name=kind]").selectOption("house"); await g.locator("input[name=weekday]").fill("24000"); await g.locator("input[name=weekend]").fill("28000"); await g.locator("button[type=submit]").click();
  await p.waitForSelector("text=Rate saved"); await p.goto(base + "/admin/rates");
  await p.waitForSelector("text=Whole house · Standard");
});
await shot("admin_rates");

// 3. Block Amla in November
await step("block Amla 10–12 Nov", async () => {
  await p.goto(base + "/admin/availability");
  await p.selectOption("#room_slug", "amla"); await p.fill("#start_date", "2026-11-10"); await p.fill("#end_date", "2026-11-12"); await p.fill("#reason", "Repainting");
  await p.click("form:has(#room_slug) button[type=submit]"); await p.waitForSelector("text=Block added"); await p.goto(base + "/admin/availability"); await p.waitForSelector("text=Repainting");
});

// 4. Sign out, register guest
await step("sign out admin", async () => { await p.goto(base + "/admin"); await signOut(); });
await step("register guest", async () => {
  await p.goto(base + "/register"); await p.fill("#name", "Priya Guest"); await p.fill("#email", "priya@bevu.test"); await p.fill("#phone", "+918888888888"); await p.fill("#password", "Guest1234!");
  await p.click("button[type=submit]"); await p.waitForURL("**/account", { timeout: 15000 }); await p.waitForSelector("text=Hello, Priya");
});

// 5. Book Neem, Fri 9 → Sun 11 Oct (Fri+Sat = weekend nights → 7500*2)
await step("guest requests Neem 9–11 Oct, sees estimate", async () => {
  await p.goto(base + "/account/book?kind=room&rooms=neem"); await p.fill("#check_in", "2026-10-09"); await p.fill("#check_out", "2026-10-11");
  await p.waitForSelector("text=Available — 2 nights", { timeout: 10000 });
  const txt = await p.locator("text=Available — 2 nights").textContent(); if (!txt.includes("15,000")) throw new Error("estimate wrong: " + txt);
  await shot("guest_booking_form");
  await p.click("text=Request this stay"); await p.waitForURL("**/account/bookings/*", { timeout: 15000 }); await p.waitForSelector("text=Request sent");
});
await shot("guest_booking_detail");

// 6. Blocked room rejected; whole house fine
await step("Amla blocked 10–12 Nov is unavailable; Tamarind free", async () => {
  await p.goto(base + "/account/book?kind=room&rooms=amla"); await p.fill("#check_in", "2026-11-11"); await p.fill("#check_out", "2026-11-13");
  await p.waitForSelector("text=Not available", { timeout: 10000 });
  await p.goto(base + "/account/book?kind=room&rooms=tamarind"); await p.fill("#check_in", "2026-11-11"); await p.fill("#check_out", "2026-11-13");
  await p.waitForSelector("text=Available — 2 nights", { timeout: 10000 });
});
await step("guest cannot open /admin", async () => { const r = await p.goto(base + "/admin"); if (!p.url().includes("/account")) throw new Error("not redirected: " + p.url()); });

// 7. Admin confirms
await step("sign out guest, sign in admin", async () => {
  await p.goto(base + "/account"); await signOut();
  await p.goto(base + "/login"); await p.fill("#email", "owner@bevu.test"); await p.fill("#password", "Owner1234!"); await p.click("button[type=submit]"); await p.waitForURL("**/admin", { timeout: 15000 });
});
await step("dashboard shows 1 pending; confirm it", async () => {
  await p.waitForSelector("text=Priya Guest"); await p.click("text=Priya Guest"); await p.waitForURL("**/admin/bookings/*");
  await p.click("button:has-text('Confirm')"); await wait(1500); await p.waitForSelector("span:has-text('Confirmed')", { timeout: 10000 });
});
await shot("admin_booking_confirmed");
await step("house request over a confirmed room shows as unavailable to a guest (API)", async () => {
  const r = await (await p.request.get(base + "/api/availability?kind=house&check_in=2026-10-10&check_out=2026-10-12&adults=6")).json(); if (r.ok !== false) throw new Error(JSON.stringify(r));
});
await step("manual booking clash → error → override", async () => {
  await p.goto(base + "/admin/bookings/new"); await p.fill("#guest_name", "Walk-in Rao"); await p.fill("#guest_phone", "+917777777777");
  await p.fill("#check_in", "2026-10-10"); await p.fill("#check_out", "2026-10-12"); // neem checked by default → clash
  await p.click("button:has-text('Add booking')"); await p.waitForSelector("text=clash", { timeout: 10000 });
  await p.check("input[name=force]"); await p.click("button:has-text('Add booking')"); await p.waitForURL("**/admin/bookings/*", { timeout: 15000 }); await p.waitForSelector("text=Walk-in Rao");
});
await step("calendar renders October with bookings", async () => {
  await p.goto(base + "/admin/bookings?y=2026&m=10"); await p.waitForSelector("text=October 2026"); await p.waitForSelector("text=Priya Guest");
});
await shot("admin_calendar");
await step("enquiry via contact API lands in inbox", async () => {
  const r = await p.request.post(base + "/api/enquiry", { data: { name: "Walk-in Test", phone: "+917777777777", email: "w@test.com", checkin: "2026-12-24", checkout: "2026-12-26", adults: 4, kids: 2, type: "house", message: "Christmas with the dogs?" } });
  if (!r.ok()) throw new Error("status " + r.status());
  await p.goto(base + "/admin/enquiries"); await p.waitForSelector("text=Walk-in Test");
});
await step("guests page + CSV export", async () => {
  await p.goto(base + "/admin/guests"); await p.waitForSelector("text=Priya Guest");
  const r = await p.request.get(base + "/admin/guests/export"); const t = await r.text(); if (!t.startsWith("name,email")) throw new Error(t.slice(0, 80));
});
await step("guest profile page + demote-last-admin guard", async () => {
  await p.click("main table a:has-text('Ankit Owner')"); await p.waitForURL("**/admin/guests/*"); await p.selectOption("#role", "guest"); await p.click("main button:has-text('Save')"); await wait(1200);
  await p.goto(base + "/admin"); if (p.url().includes("/login")) throw new Error("last admin got demoted");
});
await step("public pricing reads DB rates", async () => {
  const html = await (await p.request.get(base + "/stay")).text(); if (!html.includes("6,500")) throw new Error("rate not on /stay");
  const llm = await (await p.request.get(base + "/llms.txt")).text(); if (!llm.includes("₹6,500")) throw new Error("rate not in llms.txt");
});
await step("guest sees confirmed status + can cancel", async () => {
  await p.goto(base + "/admin"); await signOut();
  await p.goto(base + "/login"); await p.fill("#email", "priya@bevu.test"); await p.fill("#password", "Guest1234!"); await p.click("button[type=submit]"); await p.waitForURL("**/account");
  await p.waitForSelector("span:has-text('Confirmed')"); await p.click("text=Neem"); await p.waitForURL("**/account/bookings/*");
  await p.click("button:has-text('Cancel request')"); await wait(1500); await p.waitForSelector("span:has-text('Cancelled')", { timeout: 10000 });
});

// ── New: edit stay, calendar feed, reset password, policies ──────────────────
await step("admin: edit booking dates → clash → override", async () => {
  await p.goto(base + "/account"); await signOut();
  await p.goto(base + "/login"); await p.fill("#email", "owner@bevu.test"); await p.fill("#password", "Owner1234!"); await p.click("button[type=submit]"); await p.waitForURL("**/admin", { timeout: 15000 });
  await p.goto(base + "/admin/bookings?status=confirmed"); await p.click("main table a:has-text('Walk-in Rao')"); await p.waitForURL("**/admin/bookings/*");
  await p.click("summary:has-text('Change dates')");
  const f = p.locator("form:has(input[name=keep_amount])");
  await f.locator("input[name=check_in]").fill("2026-11-11"); await f.locator("input[name=check_out]").fill("2026-11-13");
  await f.locator("input[type=checkbox][name=rooms][value=neem]").uncheck(); await f.locator("input[type=checkbox][name=rooms][value=amla]").check(); // amla blocked 10–12 Nov → clash
  await f.locator("button:has-text('Save changes')").click(); await p.waitForSelector("text=clash", { timeout: 10000 });
  await f.locator("input[name=force]").check(); await f.locator("button:has-text('Save changes')").click(); await p.waitForSelector("text=Saved.", { timeout: 10000 });
  await p.reload(); await p.waitForSelector("text=11 Nov 2026");
});
await step("calendar feed serves ICS with the bookings", async () => {
  await p.goto(base + "/admin/settings"); const url = await p.locator("code").first().textContent();
  const r = await p.request.get(url.trim().replace(/^https?:\/\/[^/]+/, base)); const t = await r.text();
  if (!t.startsWith("BEGIN:VCALENDAR") || !t.includes("Walk-in Rao") || !t.includes("Blocked")) throw new Error(t.slice(0, 120));
  const bad = await p.request.get(base + "/api/calendar?token=nope"); if (bad.status() !== 403) throw new Error("token not enforced");
});
await step("password reset: request → token → new password works", async () => {
  await signOut();
  await p.goto(base + "/forgot-password"); await p.fill("#email", "priya@bevu.test"); await p.click("button[type=submit]"); await p.waitForSelector("text=we've sent a reset link");
  const rows = await (await fetch("http://localhost:5555", { method: "POST", body: JSON.stringify({ query: "select token from password_resets order by created_at desc limit 1", params: [] }) })).json();
  const token = rows.rows[0][0];
  await p.goto(base + "/reset-password?token=" + token); await p.fill("#password", "NewPass1234!"); await p.click("button[type=submit]"); await p.waitForURL("**/account?reset=1", { timeout: 15000 });
  await signOut();
  await p.goto(base + "/login"); await p.fill("#email", "priya@bevu.test"); await p.fill("#password", "NewPass1234!"); await p.click("button[type=submit]"); await p.waitForURL("**/account", { timeout: 15000 });
  await p.goto(base + "/reset-password?token=" + token); await p.fill("#password", "Again12345!"); await p.click("button[type=submit]"); await p.waitForSelector("text=invalid or has expired");
});
await step("policies render + footer links + honeypot blocks enquiry", async () => {
  for (const s of ["booking-and-cancellation", "house-rules", "privacy", "terms"]) { const r = await p.request.get(base + "/policies/" + s); if (r.status() !== 200) throw new Error(s + " " + r.status()); }
  const r = await p.request.post(base + "/api/enquiry", { data: { name: "Bot", phone: "1", website: "spam.com" } }); if (!r.ok()) throw new Error("honeypot response");
  const rows = await (await fetch("http://localhost:5555", { method: "POST", body: JSON.stringify({ query: "select count(*)::int from enquiries where name='Bot'", params: [] }) })).json(); if (rows.rows[0][0] !== "0") throw new Error("bot enquiry stored");
});
console.log(errors.length ? "ERRORS:\n" + errors.join("\n") : "no page errors / 5xx");
await b.close();
