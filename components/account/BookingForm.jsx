"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { requestBookingAction } from "@/actions/bookings";
import SubmitButton from "@/components/SubmitButton";
import { field, label, Notice, money } from "@/components/ui";

const todayStr = () => new Date().toISOString().slice(0, 10);

export default function BookingForm({ rooms, user, initial = {} }) {
  const [state, action] = useFormState(requestBookingAction, {});
  const [kind, setKind] = useState(initial.kind || "room");
  const [sel, setSel] = useState(initial.rooms ? initial.rooms.split(",") : [rooms[0]?.slug].filter(Boolean));
  const [checkIn, setCheckIn] = useState(initial.check_in || "");
  const [checkOut, setCheckOut] = useState(initial.check_out || "");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const formRef = useRef(null);
  const [avail, setAvail] = useState(null); // {ok, nights, amount, pending, error}
  const [checking, setChecking] = useState(false);

  const ready = checkIn && checkOut && checkOut > checkIn && (kind === "house" || sel.length > 0);
  const query = useMemo(() => ready ? `/api/availability?kind=${kind}&rooms=${sel.join(",")}&check_in=${checkIn}&check_out=${checkOut}&adults=${adults}&children=${children}` : null, [ready, kind, sel, checkIn, checkOut, adults, children]);

  useEffect(() => {
    if (!query) { setAvail(null); return; }
    let live = true; setChecking(true);
    const t = setTimeout(() => {
      fetch(query).then((r) => r.json()).then((j) => { if (live) setAvail(j); }).catch(() => live && setAvail({ ok: false, error: "Couldn't check availability." })).finally(() => live && setChecking(false));
    }, 300);
    return () => { live = false; clearTimeout(t); };
  }, [query]);

  const largeGroup = Boolean(avail?.warning);
  // Large groups get a confirmation pop-up before the request goes out.
  const onSubmit = (e) => {
    if (largeGroup && !confirmOpen) { e.preventDefault(); setConfirmOpen(true); }
  };
  const confirmAndSend = () => { setConfirmOpen(false); formRef.current?.requestSubmit(); };

  const toggle = (slug) => setSel((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));

  return (
    <form ref={formRef} action={action} onSubmit={onSubmit} className="card p-6 md:p-8">
      <input type="hidden" name="kind" value={kind} />
      {kind === "room" && sel.map((s) => <input key={s} type="hidden" name="rooms" value={s} />)}

      <span className={label}>What would you like?</span>
      <div className="grid grid-cols-2 gap-2">
        {[{ v: "room", t: "One or more rooms" }, { v: "house", t: "The whole house" }].map((o) => (
          <button type="button" key={o.v} onClick={() => setKind(o.v)} className={`rounded-xl border px-4 py-3 text-sm transition ${kind === o.v ? "border-brick bg-brick text-cream" : "border-ink/15 hover:border-ink/40"}`}>{o.t}</button>
        ))}
      </div>

      {kind === "room" && (
        <div className="mt-5">
          <span className={label}>Rooms</span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {rooms.map((r) => (
              <button type="button" key={r.slug} onClick={() => toggle(r.slug)} className={`rounded-xl border px-3 py-3 text-left text-sm transition ${sel.includes(r.slug) ? "border-brick bg-brick/10" : "border-ink/15 hover:border-ink/40"}`}>
                <div className="font-display text-lg">{r.name}</div>
                <div className="text-[11px] text-stone">{r.tag}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div><label className={label} htmlFor="check_in">Check-in</label><input id="check_in" name="check_in" type="date" required min={todayStr()} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={field} /></div>
        <div><label className={label} htmlFor="check_out">Check-out</label><input id="check_out" name="check_out" type="date" required min={checkIn || todayStr()} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={field} /></div>
        <div><label className={label} htmlFor="adults">Adults</label><input id="adults" name="adults" type="number" min="1" max="30" value={adults} onChange={(e) => setAdults(Number(e.target.value))} className={field} /></div>
        <div><label className={label} htmlFor="children">Children</label><input id="children" name="children" type="number" min="0" max="20" value={children} onChange={(e) => setChildren(Number(e.target.value) || 0)} className={field} /></div>
        <div><label className={label} htmlFor="pets">Dogs</label><input id="pets" name="pets" type="number" min="0" max="4" defaultValue={0} className={field} /></div>
        <div><label className={label} htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" required defaultValue={user.phone || ""} placeholder="+91" className={field} /></div>
        <div className="sm:col-span-2"><label className={label} htmlFor="notes">Anything we should know</label><textarea id="notes" name="notes" rows={3} className={field} placeholder="Occasion, food preferences, arrival time…" /></div>
      </div>

      {/* Availability readout */}
      <div className="mt-5 rounded-xl border border-ink/10 bg-cream px-4 py-3 text-sm">
        {!ready && <span className="text-stone">Pick dates{kind === "room" ? " and rooms" : ""} to check availability.</span>}
        {ready && checking && <span className="text-stone">Checking…</span>}
        {ready && !checking && avail && avail.error && <span className="text-brick-dark">{avail.error}</span>}
        {ready && !checking && avail && !avail.error && (
          avail.ok ? (
            <span className="text-forest">
              Available — {avail.nights} night{avail.nights > 1 ? "s" : ""}{avail.amount != null ? `, about ${money(avail.amount)} incl. breakfast` : ""}.
              {avail.pending > 0 && <span className="text-stone"> Another request is pending for these dates; we'll confirm on a first-come basis.</span>}
            </span>
          ) : (
            <span className="text-brick-dark">Not available for those dates{kind === "room" ? " — try other rooms or dates" : ""}.</span>
          )
        )}
      </div>
      {ready && !checking && avail?.warning && (
        <div className="mt-3 rounded-xl border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm text-amber-900">{avail.warning}</div>
      )}

      <Notice error={state?.error} />
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SubmitButton pendingText="Sending request…" disabled={!ready || checking || (avail && !avail.ok)}>Request this stay</SubmitButton>
        <span className="text-xs text-stone">No payment now. We confirm on WhatsApp and hold it on a part advance. By requesting you accept the <a href="/policies/booking-and-cancellation" target="_blank" className="text-brick">cancellation policy</a> and <a href="/policies/house-rules" target="_blank" className="text-brick">house rules</a>.</span>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4" role="dialog" aria-modal="true" aria-labelledby="large-group-title">
          <div className="card w-full max-w-md bg-cream p-6 md:p-8">
            <h3 id="large-group-title" className="font-display text-2xl">A quick note on your group size</h3>
            <p className="mt-3 text-sm text-bark/85">Our current bedding is for <strong>12 guests</strong>. You're requesting for <strong>{adults + children}</strong>.</p>
            <p className="mt-2 text-sm text-bark/85">We can still send your request — hosting a larger group is <strong>subject to the owners' discretion</strong>. We'll talk through options with you on WhatsApp (extra floor mattresses, a split stay) before confirming.</p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setConfirmOpen(false)} className="rounded-full border border-ink/20 px-5 py-2.5 text-sm hover:border-ink/50">Go back</button>
              <button type="button" onClick={confirmAndSend} className="rounded-full bg-brick px-5 py-2.5 text-sm text-cream hover:bg-brick-dark">Send request anyway</button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
