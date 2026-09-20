"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <section className="wrap flex min-h-[70vh] flex-col items-start justify-center pt-24">
      <span className="eyebrow">Something broke</span>
      <h1 className="h-display mt-4">The boulders are fine. This page isn't.</h1>
      <p className="lead mt-4 max-w-md">Try again in a moment. If it keeps happening, WhatsApp us and we'll sort your booking by hand.</p>
      <div className="mt-8 flex gap-3"><button type="button" onClick={() => reset()} className="btn-primary">Try again</button><Link href="/" className="btn-ghost">Back home</Link></div>
      {error?.digest && <p className="mt-6 text-xs text-stone">Reference: {error.digest}</p>}
    </section>
  );
}
