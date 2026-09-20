import { requireUser } from "@/lib/auth";
import { rooms } from "@/data/rooms";
import BookingForm from "@/components/account/BookingForm";
import { PageTitle } from "@/components/ui";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export default async function BookPage({ searchParams }) {
  const user = await requireUser();
  const initial = { kind: searchParams?.kind, rooms: searchParams?.rooms, check_in: searchParams?.check_in, check_out: searchParams?.check_out };
  return (
    <>
      <PageTitle eyebrow="Request a stay" title="Pick your dates." />
      <p className="lead mt-4 max-w-2xl !text-base">Availability is live. Send the request and we'll confirm on WhatsApp — usually within a few hours — and hold it on a part advance. Check-in {site.checkIn}, check-out {site.checkOut}.</p>
      <div className="mt-8 max-w-3xl">
        <BookingForm rooms={rooms.map((r) => ({ slug: r.slug, name: r.name, tag: r.tag }))} user={user} initial={initial} />
      </div>
    </>
  );
}
