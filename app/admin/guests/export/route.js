import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { sql, toDateStr } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "admin") return new NextResponse("Forbidden", { status: 403 });
  const rows = await sql`
    SELECT u.name, u.email, u.phone, u.role, u.created_at,
           count(b.id) FILTER (WHERE b.status IN ('confirmed','completed'))::int AS stays,
           coalesce(sum(b.amount) FILTER (WHERE b.status IN ('confirmed','completed')),0)::float AS spent,
           max(b.check_in) AS last_stay, u.admin_notes
    FROM users u LEFT JOIN bookings b ON b.user_id = u.id GROUP BY u.id ORDER BY u.name`;
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = ["name,email,phone,role,joined,stays,spent,last_stay,notes", ...rows.map((r) => [r.name, r.email, r.phone, r.role, toDateStr(r.created_at), r.stays, r.spent, toDateStr(r.last_stay), r.admin_notes].map(esc).join(","))].join("\n");
  return new NextResponse(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="bevu-guests-${toDateStr(new Date())}.csv"` } });
}
