import { MessageCircle } from "lucide-react";
import { site } from "@/data/site";

// Persistent floating WhatsApp button — the primary conversion action.
export default function WhatsAppFloat() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F8A5B] text-offwhite shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
