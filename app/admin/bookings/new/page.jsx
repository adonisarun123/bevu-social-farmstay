import Link from "next/link";
import { rooms } from "@/data/rooms";
import ManualBookingForm from "@/components/admin/ManualBookingForm";
import { PageTitle } from "@/components/ui";

export default function NewBookingPage() {
  return (
    <>
      <Link href="/admin/bookings" className="text-sm text-brick">← Bookings</Link>
      <div className="mt-3"><PageTitle eyebrow="Manual booking" title="Add a booking" /></div>
      <p className="mt-3 max-w-2xl text-sm text-bark/75">For WhatsApp or phone bookings. Confirmed bookings block the calendar immediately; the guest gets no email from this form.</p>
      <div className="mt-8 max-w-3xl"><ManualBookingForm rooms={rooms.map((r) => ({ slug: r.slug, name: r.name }))} /></div>
    </>
  );
}
