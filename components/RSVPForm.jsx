"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

// RSVP via WhatsApp — composes a pre-filled message to the hosts.
const HOST_WHATSAPP = "919717334639";

const inputClass =
  "w-full rounded-2xl border border-gold/40 bg-cream px-5 py-3.5 font-body text-base text-ink placeholder:text-ink/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25 transition";

export default function RSVPForm() {
  const [form, setForm] = useState({
    name: "",
    attending: "Joyfully Accept",
    guests: "1",
    note: "",
  });

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const lines = [
      `Hi Priyanka! RSVP for the Griha Pravesh on 20th June 🏡`,
      ``,
      `Name: ${form.name}`,
      `Response: ${form.attending}`,
      `Number of guests: ${form.guests}`,
    ];
    if (form.note.trim()) lines.push(`Message: ${form.note.trim()}`);
    const url = `https://wa.me/${HOST_WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid max-w-xl gap-5 text-left">
      <div>
        <label htmlFor="name" className="mb-1.5 block font-display text-lg font-semibold text-forest">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="Full name"
          value={form.name}
          onChange={update("name")}
          className={inputClass}
        />
      </div>

      <fieldset>
        <legend className="mb-2 font-display text-lg font-semibold text-forest">
          Will you be joining us?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {["Joyfully Accept", "Regretfully Decline"].map((option) => (
            <label
              key={option}
              className={`flex cursor-pointer items-center justify-center rounded-2xl border px-5 py-3.5 text-center font-body transition ${
                form.attending === option
                  ? "border-forest bg-forest text-cream shadow"
                  : "border-gold/40 bg-cream text-ink hover:border-gold"
              }`}
            >
              <input
                type="radio"
                name="attending"
                value={option}
                checked={form.attending === option}
                onChange={update("attending")}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="guests" className="mb-1.5 block font-display text-lg font-semibold text-forest">
          Number of Guests
        </label>
        <select id="guests" value={form.guests} onChange={update("guests")} className={inputClass}>
          {["1", "2", "3", "4", "5", "6+"].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="note" className="mb-1.5 block font-display text-lg font-semibold text-forest">
          A Note for the Family <span className="font-body text-sm font-normal text-ink/50">(optional)</span>
        </label>
        <textarea
          id="note"
          rows={3}
          placeholder="Your wishes and blessings…"
          value={form.note}
          onChange={update("note")}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-forest px-6 py-4 font-display text-base font-semibold tracking-wide text-cream shadow-lg transition-all hover:-translate-y-0.5 hover:bg-deepgreen hover:shadow-xl sm:px-9 sm:text-lg"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Send RSVP on WhatsApp
      </button>
      <p className="text-center text-sm italic text-ink/55">
        Your RSVP opens WhatsApp with a pre-filled message to the family.
      </p>
    </form>
  );
}
