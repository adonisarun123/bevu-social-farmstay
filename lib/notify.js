import { sendMail, adminEmail } from "@/lib/mail";

// ── WhatsApp (Meta WhatsApp Cloud API) ───────────────────────────────────────
// Env: WA_PHONE_NUMBER_ID, WA_TOKEN (System User token), WA_ADMIN_NUMBERS ("919999999999,918888888888").
// Optional WA_TEMPLATE_NAME (+ WA_TEMPLATE_LANG, default en): an approved template with ONE {{1}} body
// parameter. Without a template, Meta only delivers free-form text inside a 24-hour window after the
// recipient last messaged the business number — fine for testing, not for unattended alerts.
export const waConfigured = () =>
  Boolean(process.env.WA_PHONE_NUMBER_ID && process.env.WA_TOKEN && process.env.WA_ADMIN_NUMBERS);

export const waAdminNumbers = () =>
  String(process.env.WA_ADMIN_NUMBERS || "")
    .split(/[,;]+/)
    .map((n) => n.replace(/\D/g, ""))
    .filter((n) => n.length >= 10);

export async function sendWhatsApp({ to, text }) {
  const { WA_PHONE_NUMBER_ID, WA_TOKEN, WA_TEMPLATE_NAME, WA_TEMPLATE_LANG } = process.env;
  if (!WA_PHONE_NUMBER_ID || !WA_TOKEN || !to) return false;
  const body = WA_TEMPLATE_NAME
    ? {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: WA_TEMPLATE_NAME,
          language: { code: WA_TEMPLATE_LANG || "en" },
          // Template parameters can't contain newlines or 4+ consecutive spaces.
          components: [{ type: "body", parameters: [{ type: "text", text: text.replace(/\s*\n\s*/g, " · ").slice(0, 1000) }] }],
        },
      }
    : { messaging_product: "whatsapp", to, type: "text", text: { preview_url: false, body: text.slice(0, 4000) } };
  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${WA_PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${WA_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!r.ok) {
      console.error("whatsapp failed", r.status, (await r.text()).slice(0, 500));
      return false;
    }
    return true;
  } catch (e) {
    console.error("whatsapp failed", e?.message);
    return false;
  }
}

// ── Admin fan-out: every admin email + every admin WhatsApp number. Best-effort, never throws. ──
export async function notifyAdmins({ subject, text, whatsapp }) {
  const results = await Promise.allSettled([
    sendMail({ to: adminEmail(), subject, text }),
    ...waAdminNumbers().map((to) => sendWhatsApp({ to, text: whatsapp || `${subject}\n${text}` })),
  ]);
  return results.map((r) => r.status === "fulfilled" && r.value);
}
