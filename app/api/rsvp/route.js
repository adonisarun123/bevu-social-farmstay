import nodemailer from "nodemailer";

// RSVP email endpoint — sends via Gmail SMTP.
// Required environment variables (set in Vercel → Project → Settings → Environment Variables):
//   SMTP_USER — the Gmail address that sends the mail (e.g. ankit.r@gmail.com)
//   SMTP_PASS — a Gmail App Password (Google Account → Security → 2-Step Verification → App passwords)
//   RSVP_TO   — where RSVPs are delivered (defaults to SMTP_USER)

export async function POST(request) {
  const { name, attending, guests, note } = await request.json().catch(() => ({}));

  if (!name || !attending) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    return Response.json(
      { error: "Email is not configured yet. Please use WhatsApp instead." },
      { status: 503 }
    );
  }

  const to = process.env.RSVP_TO || user;
  const accepted = attending === "yes";

  const lines = [
    `🏡 RSVP — Bevu Social Farmstay Griha Pravesh (20th June)`,
    ``,
    `Name: ${String(name).slice(0, 200)}`,
    accepted
      ? `Attending: Yes, joyfully! 🙏\nGuests: ${Math.min(Math.max(parseInt(guests, 10) || 1, 1), 20)}`
      : `Attending: Regretfully unable to make it 💐`,
  ];
  if (note) lines.push(`Note: ${String(note).slice(0, 1000)}`);
  lines.push(``, `— Sent from the Griha Pravesh invitation website`);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Griha Pravesh RSVP" <${user}>`,
      to,
      subject: `RSVP: ${String(name).slice(0, 80)} — ${accepted ? `accepting (${guests} guest${guests > 1 ? "s" : ""})` : "declining"}`,
      text: lines.join("\n"),
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("RSVP mail failed:", err?.message);
    return Response.json(
      { error: "Could not send right now. Please try WhatsApp instead." },
      { status: 502 }
    );
  }
}
