import nodemailer from "nodemailer";
import { site } from "@/data/site";

// Best-effort email. Silently no-ops when SMTP isn't configured.
export async function sendMail({ to, subject, text }) {
  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS || !to) return false;
  try {
    const t = nodemailer.createTransport({ service: "gmail", auth: { user: SMTP_USER, pass: SMTP_PASS } });
    await t.sendMail({ from: `"${site.name}" <${SMTP_USER}>`, to, subject, text });
    return true;
  } catch (e) {
    console.error("mail failed", e?.message);
    return false;
  }
}

export const adminEmail = () => process.env.ENQUIRY_TO || process.env.ADMIN_EMAIL || process.env.SMTP_USER;
