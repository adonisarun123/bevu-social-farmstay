import Link from "next/link";

// Server-rendered month grid. `days` from monthAvailability(); `rooms` = [{slug,name}]
const cls = { free: "bg-moss/70", confirmed: "bg-brick", requested: "bg-brass", blocked: "bg-ink/40" };

export default function Calendar({ year, month, days, rooms, basePath = "/admin/bookings" }) {
  const first = new Date(year, month - 1, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const prev = month === 1 ? { y: year - 1, m: 12 } : { y: year, m: month - 1 };
  const next = month === 12 ? { y: year + 1, m: 1 } : { y: year, m: month + 1 };
  const title = first.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const today = new Date(); const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="rounded-2xl bg-parchment p-4 ring-1 ring-ink/5 sm:p-6">
      <div className="flex items-center justify-between">
        <Link href={`${basePath}?y=${prev.y}&m=${prev.m}`} className="btn-ghost !px-4 !py-2 text-xs">← {new Date(prev.y, prev.m - 1, 1).toLocaleDateString("en-IN", { month: "short" })}</Link>
        <h2 className="font-display text-2xl">{title}</h2>
        <Link href={`${basePath}?y=${next.y}&m=${next.m}`} className="btn-ghost !px-4 !py-2 text-xs">{new Date(next.y, next.m - 1, 1).toLocaleDateString("en-IN", { month: "short" })} →</Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-stone">
        {rooms.map((r) => <span key={r.slug}>{r.name}</span>)}
        <span className="ml-auto flex gap-3"><i className="inline-block h-2.5 w-2.5 rounded-sm bg-moss/70" /> free <i className="inline-block h-2.5 w-2.5 rounded-sm bg-brick" /> confirmed <i className="inline-block h-2.5 w-2.5 rounded-sm bg-brass" /> requested <i className="inline-block h-2.5 w-2.5 rounded-sm bg-ink/40" /> blocked</span>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-stone">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d}>{d}</div>)}</div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: startPad }).map((_, i) => <div key={`p${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1; const key = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const info = days[key] || { rooms: {}, items: [] };
          const bookingsHere = info.items.filter((x) => x.type === "booking");
          const firstBooking = bookingsHere[0];
          return (
            <div key={key} className={`min-h-[76px] rounded-lg border p-1.5 text-left ${key === todayKey ? "border-brick" : "border-ink/10"} ${key < todayKey ? "opacity-60" : ""}`}>
              <div className="text-xs font-medium">{d}</div>
              <div className="mt-1 grid grid-cols-4 gap-0.5">{rooms.map((r) => <span key={r.slug} title={`${r.name}: ${info.rooms[r.slug] || "free"}`} className={`h-2 rounded-sm ${cls[info.rooms[r.slug] || "free"]}`} />)}</div>
              {firstBooking && <Link href={`/admin/bookings/${firstBooking.id}`} className="mt-1 block truncate text-[10px] leading-tight text-bark/80 hover:text-brick">{firstBooking.label}{bookingsHere.length > 1 ? ` +${bookingsHere.length - 1}` : ""}</Link>}
              {!firstBooking && info.items[0]?.type === "block" && <div className="mt-1 truncate text-[10px] text-stone">{info.items[0].label}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
