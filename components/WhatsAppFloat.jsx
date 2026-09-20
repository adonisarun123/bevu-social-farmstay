"use client";

import { MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={site.whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-sm font-medium text-white shadow-soft transition hover:scale-105 hover:bg-[#1ebe5b]"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
