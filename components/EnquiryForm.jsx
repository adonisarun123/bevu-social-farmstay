"use client";

import { useState } from "react";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { site } from "@/data/site";

const field = "w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-sm outline-none transition placeholder:text-stone focus:border-brick focus:ring-2 focus:ring-brick/20";
const label = "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-bark/70";

export default function EnquiryForm() {
  const [data, setData] = useState({ name: "", phone: "", checkin: "", checkout: "", adults: "2", kids: "0", type: "room", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | fallback
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const buildMessage = () =>
    `Hi Bevu Social Farmstay, I'd like to enquire about a stay.\n\n` +
    `Name: ${data.name}\nPhone: ${data.phone}\n` +
    `Check-in: ${data.checkin || "flexible"}\nCheck-out: ${data.checkout || "flexible"}\n` +
    `Guests: ${data.adults} adults, ${data.kids} children\n` +
    `Booking: ${data.type === "house" ? "Whole house" : "Room(s)"}\n` +
    (data.message ? `\n${data.message}` : "");

  const openWhatsApp = () => window.open(site.whatsappHref(buildMessage()), "_blank", "noopener");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("mail failed");
      setStatus("sent");
    } catch {
      setStatus("fallback");
      openWhatsApp();
    }
  };

  if (status === "sent") {
    return (
      <div className="card flex flex-col items-center p-10 text-center">
        <CheckCircle2 size={40} className="text-moss" />
        <h3 className="mt-4 font-display text-2xl">Got it, {data.name.split(" ")[0] || "thank you"}.</h3>
        <p className="mt-2 max-w-sm text-sm text-bark/75">We'll come back to you within a few hours with availability and rates. Want a faster answer? Send the same on WhatsApp.</p>
        <button type="button" onClick={openWhatsApp} className="btn-whatsapp mt-6"><MessageCircle size={18} /> Also send on WhatsApp</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={label} htmlFor="name">Name</label><input id="name" required className={field} placeholder="Your name" value={data.name} onChange={set("name")} /></div>
        <div><label className={label} htmlFor="phone">Phone / WhatsApp</label><input id="phone" required type="tel" className={field} placeholder="+91" value={data.phone} onChange={set("phone")} /></div>
        <div><label className={label} htmlFor="checkin">Check-in</label><input id="checkin" type="date" className={field} value={data.checkin} onChange={set("checkin")} /></div>
        <div><label className={label} htmlFor="checkout">Check-out</label><input id="checkout" type="date" className={field} value={data.checkout} onChange={set("checkout")} /></div>
        <div><label className={label} htmlFor="adults">Adults</label><input id="adults" type="number" min="1" max="12" className={field} value={data.adults} onChange={set("adults")} /></div>
        <div><label className={label} htmlFor="kids">Children</label><input id="kids" type="number" min="0" max="8" className={field} value={data.kids} onChange={set("kids")} /></div>
        <div className="sm:col-span-2">
          <span className={label}>Booking type</span>
          <div className="grid grid-cols-2 gap-2">
            {[{ v: "room", t: "One or more rooms" }, { v: "house", t: "The whole house" }].map((o) => (
              <label key={o.v} className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm transition ${data.type === o.v ? "border-brick bg-brick text-cream" : "border-ink/15 hover:border-ink/40"}`}>
                <input type="radio" name="type" value={o.v} className="sr-only" checked={data.type === o.v} onChange={set("type")} />{o.t}
              </label>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2"><label className={label} htmlFor="message">Anything else</label><textarea id="message" rows={3} className={field} placeholder="Occasion, food preferences, questions…" value={data.message} onChange={set("message")} /></div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60"><Send size={16} /> {status === "sending" ? "Sending…" : "Send enquiry"}</button>
        <button type="button" onClick={openWhatsApp} className="btn-whatsapp"><MessageCircle size={18} /> Send on WhatsApp instead</button>
      </div>
      {status === "fallback" && <p className="mt-3 text-xs text-bark/70">Email isn't set up yet, so we opened WhatsApp with your enquiry pre-filled.</p>}
      <p className="mt-4 text-xs text-stone">By prior booking only. We reply on WhatsApp within a few hours, usually sooner.</p>
    </form>
  );
}
