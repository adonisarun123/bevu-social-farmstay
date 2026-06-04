"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const visitTypes = [
  "Family Stay",
  "Friends Group",
  "Corporate Offsite",
  "Wellness Retreat",
  "Other",
];

const inputClass =
  "w-full rounded-xl border border-sand bg-offwhite px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30";

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Ready for future booking-engine / API integration.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-sand bg-beige p-10 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-olive" aria-hidden="true" />
        <p className="mt-4 font-heading text-2xl font-semibold text-forest">Thank you!</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal/75">
          Thank you for your interest in Bevu Social Farmstay. Our team will
          contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-forest">Name</label>
        <input id="name" name="name" type="text" required placeholder="Your full name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-forest">Phone Number</label>
        <input id="phone" name="phone" type="tel" required placeholder="+91" className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-forest">Email</label>
        <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
      </div>
      <div>
        <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-forest">Preferred Date</label>
        <input id="date" name="date" type="date" className={inputClass} />
      </div>
      <div>
        <label htmlFor="guests" className="mb-1.5 block text-sm font-medium text-forest">Number of Guests</label>
        <input id="guests" name="guests" type="number" min="1" placeholder="e.g. 4" className={inputClass} />
      </div>
      <div>
        <label htmlFor="visitType" className="mb-1.5 block text-sm font-medium text-forest">Type of Visit</label>
        <select id="visitType" name="visitType" className={inputClass} defaultValue="">
          <option value="" disabled>Select an option</option>
          {visitTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-forest">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us a little about the stay you have in mind…"
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-offwhite shadow-md transition-all hover:-translate-y-0.5 hover:bg-laterite hover:shadow-lg sm:w-auto"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send Inquiry
        </button>
      </div>
    </form>
  );
}
