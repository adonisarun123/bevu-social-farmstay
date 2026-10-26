import { sql, fmtDate } from "@/lib/db";
import { requireAdminPage } from "@/lib/auth";
import { setTeamRoleAction, resendInviteAction } from "@/actions/admin";
import { roleLabel } from "@/lib/roles";
import { PageTitle, Card, Notice } from "@/components/ui";
import SubmitButton from "@/components/SubmitButton";
import TeamInviteForm from "@/components/admin/TeamInviteForm";

export const metadata = { title: "Team" };

export default async function TeamPage({ searchParams }) {
  const me = await requireAdminPage();
  const team = await sql`SELECT id, name, email, role, created_at, last_login_at FROM users WHERE role IN ('admin','manager') ORDER BY (role = 'admin') DESC, name`;
  const link = typeof searchParams?.link === "string" ? searchParams.link : "";
  return (
    <>
      <PageTitle eyebrow="Team" title="Admins & managers" />
      <div className="mt-4 max-w-3xl space-y-2">
        {searchParams?.error === "last-admin" && <Notice error="You can't remove or demote the last admin." />}
        {searchParams?.sent && <Notice ok="Invite link re-sent." />}
        {link && <><Notice ok="Email isn't set up, so share this link with them yourself (valid 7 days):" /><code className="block break-all rounded-xl bg-cream p-3 text-xs">{link}</code></>}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
        <Card className="!p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wider text-stone"><tr><th className="p-4">Person</th><th className="p-4">Role</th><th className="p-4">Last sign-in</th><th className="p-4"></th></tr></thead>
            <tbody className="divide-y divide-ink/5">
              {team.map((u) => (
                <tr key={u.id}>
                  <td className="p-4"><div className="font-medium">{u.name}{u.id === me.id && <span className="ml-2 text-xs text-stone">(you)</span>}</div><div className="text-xs text-stone">{u.email}</div></td>
                  <td className="p-4">
                    <form action={setTeamRoleAction} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={u.id} />
                      <select name="role" defaultValue={u.role} className="rounded-full border border-ink/15 bg-white/70 px-3 py-1 text-xs">
                        <option value="manager">Manager</option><option value="admin">Admin</option>
                      </select>
                      <SubmitButton className="btn-ghost !px-3 !py-1 text-xs" pendingText="…">Save</SubmitButton>
                    </form>
                  </td>
                  <td className="p-4 text-xs text-stone">{u.last_login_at ? fmtDate(u.last_login_at) : "Not yet — invite pending"}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      {!u.last_login_at && <form action={resendInviteAction}><input type="hidden" name="id" value={u.id} /><SubmitButton className="btn-ghost !px-3 !py-1 text-xs" pendingText="…">Resend invite</SubmitButton></form>}
                      <form action={setTeamRoleAction}><input type="hidden" name="id" value={u.id} /><input type="hidden" name="role" value="guest" /><SubmitButton className="!px-3 !py-1 text-xs text-brick-dark hover:underline" pendingText="…">Remove</SubmitButton></form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <div className="space-y-6">
          <Card>
            <h2 className="font-display text-xl">Add someone</h2>
            <p className="mt-2 text-sm text-bark/75">New people get an email to set their password. Existing guest accounts are upgraded and keep their password.</p>
            <div className="mt-5"><TeamInviteForm /></div>
          </Card>
          <Card>
            <h2 className="font-display text-xl">Who can do what</h2>
            <ul className="mt-3 space-y-2 text-sm text-bark/80">
              <li><strong>{roleLabel("manager")}</strong>: dashboard, bookings (confirm, decline, edit, add), date blocks, guests (view and notes), enquiries.</li>
              <li><strong>{roleLabel("admin")}</strong>: all of the above plus rates, media, settings, guest CSV export and this team page.</li>
              <li className="text-stone">Removing someone turns them back into a guest. Access ends on their next click.</li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
