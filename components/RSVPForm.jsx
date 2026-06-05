"use client";

import { useState } from "react";
import { Check, X, Minus, Plus, MessageCircle, Send, Loader2, PartyPopper } from "lucide-react";

// RSVP: primary Send button emails via the /api/rsvp SMTP endpoint;
// WhatsApp remains as a secondary option.
const HOST_WHATSAPP = "919717334639";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("yes");
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  function buildMessage() {
    let m = `🏡 RSVP — Bevu Social Farmstay Griha Pravesh (20th June)\n\n`;
    m += `Name: ${name.trim() || "A guest"}\n`;
    if (attending === "yes") {
      m += `Attending: Yes, joyfully! 🙏\nGuests: ${guests}\n`;
    } else {
      m += `Attending: Regretfully unable to make it 💐\n`;
    }
    if (note.trim()) m += `Note: ${note.trim()}\n`;
    m += `\nWith warm wishes 🌸`;
    return m;
  }

  function sendWhatsApp() {
    const url = `https://wa.me/${HOST_WHATSAPP}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function sendRSVP() {
    if (!name.trim()) {
      setErrorMsg("Please enter your name first.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), attending, guests, note: note.trim() }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Could not send right now. Please try WhatsApp.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network issue — please try WhatsApp instead.");
      setStatus("error");
    }
  }

  const toggleBase =
    "flex flex-1 cursor-pointer flex-col items-center gap-1.5 rounded-lg border px-2 py-3.5 text-[0.95rem] transition-all duration-300";

  return (
    <div className="mx-auto max-w-[520px] text-center">
      {/* Name */}
      <div className="field mb-5 text-left">
        <label
          htmlFor="rName"
          className="mb-2 block font-smallcaps text-[0.7rem] uppercase tracking-[0.18em] text-gold"
        >
          Your Name
        </label>
        <input
          id="rName"
          type="text"
          placeholder="e.g. Sharma Family"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Attending toggle */}
      <div className="mb-5 text-left">
        <p className="mb-2 font-smallcaps text-[0.7rem] uppercase tracking-[0.18em] text-gold">
          Can You Make It?
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setAttending("yes")}
            aria-pressed={attending === "yes"}
            className={`${toggleBase} ${
              attending === "yes"
                ? "border-gold bg-gold/10 text-cream"
                : "border-[var(--line)] bg-cream/[0.04] text-creamdim"
            }`}
          >
            <Check className={`h-[22px] w-[22px] ${attending === "yes" ? "text-gold" : "text-creamdim"}`} strokeWidth={1.5} aria-hidden="true" />
            Joyfully Accept
          </button>
          <button
            type="button"
            onClick={() => setAttending("no")}
            aria-pressed={attending === "no"}
            className={`${toggleBase} ${
              attending === "no"
                ? "border-terra bg-terra/10 text-cream"
                : "border-[var(--line)] bg-cream/[0.04] text-creamdim"
            }`}
          >
            <X className={`h-[22px] w-[22px] ${attending === "no" ? "text-terra" : "text-creamdim"}`} strokeWidth={1.5} aria-hidden="true" />
            Regretfully Decline
          </button>
        </div>
      </div>

      {/* Guests stepper */}
      <div
        className={`mb-5 overflow-hidden text-left transition-all duration-300 ${
          attending === "no" ? "pointer-events-none max-h-0 opacity-0" : "max-h-32 opacity-100"
        }`}
      >
        <p className="mb-2 font-smallcaps text-[0.7rem] uppercase tracking-[0.18em] text-gold">
          Number of Guests (incl. you)
        </p>
        <div className="flex w-fit items-center overflow-hidden rounded-lg border border-[var(--line)]">
          <button
            type="button"
            onClick={() => setGuests(Math.max(1, guests - 1))}
            aria-label="Fewer guests"
            className="grid h-12 w-[50px] place-items-center bg-cream/[0.04] text-xl text-gold transition-colors hover:bg-gold/15"
          >
            <Minus className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="min-w-[60px] text-center font-serif text-2xl text-cream">{guests}</span>
          <button
            type="button"
            onClick={() => setGuests(Math.min(20, guests + 1))}
            aria-label="More guests"
            className="grid h-12 w-[50px] place-items-center bg-cream/[0.04] text-xl text-gold transition-colors hover:bg-gold/15"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Note */}
      <div className="field mb-5 text-left">
        <label
          htmlFor="rMsg"
          className="mb-2 block font-smallcaps text-[0.7rem] uppercase tracking-[0.18em] text-gold"
        >
          A Note for Ankit <span className="normal-case tracking-normal opacity-60">(optional)</span>
        </label>
        <textarea
          id="rMsg"
          rows={3}
          placeholder="Looking forward to it! See you on the 20th."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[74px] resize-y"
        />
      </div>

      {status === "sent" ? (
        <div className="mt-7 rounded-lg border border-gold/40 bg-gold/[0.08] px-6 py-7" role="status">
          <PartyPopper className="mx-auto h-8 w-8 text-gold" strokeWidth={1.4} aria-hidden="true" />
          <p className="mt-3 font-serif text-xl text-cream">Thank you, {name.trim()}!</p>
          <p className="mt-1 text-[0.92rem] text-creamdim">
            Your RSVP has been sent. We can&rsquo;t wait to celebrate with you.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-7 flex flex-col gap-3">
            <button
              type="button"
              onClick={sendRSVP}
              disabled={status === "sending"}
              className="btn-gold disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              )}
              {status === "sending" ? "Sending…" : "Send RSVP"}
            </button>
            <button
              type="button"
              onClick={sendWhatsApp}
              className="inline-flex items-center justify-center gap-2.5 rounded-[46px] border border-[var(--line)] bg-transparent px-6 py-3 font-smallcaps text-[0.76rem] uppercase tracking-[0.14em] text-gold transition-colors duration-300 hover:border-gold hover:text-goldsoft"
            >
              <MessageCircle className="h-[17px] w-[17px]" strokeWidth={1.5} aria-hidden="true" />
              RSVP via WhatsApp instead
            </button>
          </div>
          {status === "error" && (
            <p className="mt-4 text-[0.85rem] text-terra" role="alert">
              {errorMsg}
            </p>
          )}
          <p className="mt-4 text-[0.78rem] text-creamdim opacity-70">
            Send delivers your RSVP straight to the family.
          </p>
        </>
      )}
    </div>
  );
}
