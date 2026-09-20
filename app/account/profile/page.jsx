import { requireUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import ProfileForm from "@/components/account/ProfileForm";
import { PageTitle } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const u = await requireUser();
  const rows = await sql`SELECT name, email, phone FROM users WHERE id = ${u.id}`;
  return (
    <>
      <PageTitle eyebrow="Profile" title="Your details." />
      <div className="mt-8 max-w-lg"><ProfileForm user={rows[0]} /></div>
    </>
  );
}
