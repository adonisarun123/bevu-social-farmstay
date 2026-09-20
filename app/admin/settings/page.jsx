import { sql } from "@/lib/db";
import { rotateCalendarTokenAction } from "@/actions/admin";
import { site } from "@/data/site";
import { PageTitle, Card } from "@/components/ui";
import SubmitButton from "@/components/SubmitButton";

export default async function SettingsPage() {
  const t = await sql`SELECT value FROM settings WHERE key = 'calendar_token'`;
  const feed = `${site.url}/api/calendar?token=${t[0]?.value || ""}`;
  const env = ["DATABASE_URL", "AUTH_SECRET", "ADMIN_EMAIL", "SMTP_USER", "SMTP_PASS", "ENQUIRY_TO", "WA_PHONE_NUMBER_ID", "WA_TOKEN", "WA_ADMIN_NUMBERS", "WA_TEMPLATE_NAME"].map((k) => [k, Boolean(process.env[k])]);
  return (
    <>
      <PageTitle eyebrow="Settings" title="Integrations & health" />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-xl">Calendar feed</h2>
          <p className="mt-2 text-sm text-bark/75">Subscribe to this URL in Google Calendar (Other calendars → From URL) or Apple Calendar. Confirmed bookings, pending requests (marked "?") and blocks appear as all-day events and update every few hours. Anyone with the link can read your bookings — rotate it if it leaks.</p>
          <code className="mt-4 block break-all rounded-xl bg-cream p-3 text-xs">{feed}</code>
          <form action={rotateCalendarTokenAction} className="mt-4"><SubmitButton className="btn-ghost !py-2 text-xs" pendingText="…">Rotate link</SubmitButton></form>
        </Card>
        <Card>
          <h2 className="font-display text-xl">Environment</h2>
          <ul className="mt-3 divide-y divide-ink/5 text-sm">
            {env.map(([k, ok]) => <li key={k} className="flex items-center justify-between py-2"><code className="text-xs">{k}</code><span className={ok ? "text-forest" : "text-brick-dark"}>{ok ? "set" : "missing"}</span></li>)}
          </ul>
          <p className="mt-3 text-xs text-stone">Without SMTP_USER/SMTP_PASS no emails go out (requests, confirmations, password resets); everything else still works. Reset links are printed to the server log instead. New bookings, cancellations and enquiries go to every ADMIN_EMAIL by email and, when the WA_* variables are set, to every WA_ADMIN_NUMBERS on WhatsApp (Meta Cloud API; WA_TEMPLATE_NAME is needed for reliable delivery outside a 24-hour chat window).</p>
        </Card>
      </div>
    </>
  );
}
