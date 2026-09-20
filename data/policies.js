// Policy pages at /policies/<slug>. Plain paragraphs and lists — edit freely.
// TODO: have these reviewed before go-live; the cancellation terms below are a sensible default, not legal advice.
import { site } from "./site";

export const policies = [
  {
    slug: "booking-and-cancellation",
    title: "Booking & Cancellation Policy",
    summary: "How bookings are confirmed, what the advance covers, and what happens if plans change.",
    updated: "2026-09-20",
    sections: [
      { h: "How a booking is confirmed", p: ["A request on the website or WhatsApp is not a confirmed booking. We confirm availability, agree the rate, and hold the dates once a part advance is received. The advance is normally 50% of the stay for rooms and 50% for whole-house bookings; the balance is settled on arrival.", "Rates quoted include breakfast and taxes as stated at the time of booking. Meals ordered during the stay are billed at check-out."] },
      { h: "If you cancel", ul: ["More than 14 days before check-in: full refund of the advance, minus any payment-gateway charges.", "7–14 days before check-in: 50% of the advance refunded, or the full advance carried forward to another date within six months.", "Less than 7 days before check-in, or no-show: the advance is not refundable. We'll still try to re-let the dates and refund if we do.", "Whole-house bookings for meetups and celebrations: the 14-day and 7-day thresholds become 30 and 14 days respectively, because a group booking is harder to re-let."] },
      { h: "If we cancel", p: ["If we have to cancel for reasons within our control, we refund the advance in full and, where possible, offer alternative dates at the same rate. For events outside anyone's control — severe weather warnings, official travel restrictions — we carry the advance forward to any date within twelve months."] },
      { h: "Changing dates", p: ["Date changes requested more than 7 days before check-in are free, subject to availability. Rate differences (weekday to weekend, or a seasonal rate) apply."] },
      { h: "Check-in and check-out", p: [`Check-in from ${site.checkIn}, check-out by ${site.checkOut}. Early check-in and late check-out are subject to availability and may carry a charge for stays beyond 2 PM.`] },
      { h: "Damage and conduct", p: ["Guests are responsible for damage beyond normal wear. Quiet hours are from 10 PM. We reserve the right to end a stay without refund where guests endanger themselves, our team, the property or the neighbourhood."] },
    ],
  },
  {
    slug: "house-rules",
    title: "House Rules",
    summary: "The short list of things that keep this place calm for the next guest.",
    updated: "2026-09-20",
    sections: [
      { h: "The pool", ul: ["Open sunrise to sunset. There is no lifeguard; children must be supervised by an adult at all times.", "No glass on the pool deck. Shower before swimming.", "Do not swim after drinking alcohol."] },
      { h: "Pets", ul: ["Dogs are welcome and must be vaccinated. Tell us when you book.", "Leashed near the pool and the lawn edges; off the beds and sofas.", "You are responsible for your dog's behaviour towards other guests, our team and the farm animals beyond the fence."] },
      { h: "Noise and neighbours", ul: ["Music at a conversational level after 10 PM. Our neighbours are farmers who wake before dawn.", "No DJ or amplified events. Fireworks are not allowed."] },
      { h: "Fire and smoking", ul: ["Smoking outdoors only, away from rooms and the lawn. Please use the ashtrays.", "The bonfire is lit by our team on request and must not be left unattended."] },
      { h: "The farm", ul: ["Please stay on the paths beyond the lawn; there are snakes and thorny scrub in the boulders.", "Don't feed the farm animals or the village dogs.", "Take your litter with you on walks."] },
      { h: "Visitors", p: ["Day visitors are welcome by prior arrangement only. The house and pool are for registered guests."] },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "What we collect when you book or enquire, and what we do with it.",
    updated: "2026-09-20",
    sections: [
      { h: "What we collect", p: ["When you create an account or request a booking we store your name, email, phone number, the dates and details of your stay, and any notes you give us. When you send an enquiry through the contact form we store the same details. Our website also uses Google Analytics, which collects anonymised usage data."] },
      { h: "Why we collect it", ul: ["To confirm and manage your booking and contact you about it, including on WhatsApp.", "To keep a record of past stays so we can host you better next time.", "To respond to enquiries.", "To understand how the website is used and improve it."] },
      { h: "Who we share it with", p: ["Nobody, other than the services that run this website: our database host (Neon), hosting (Vercel), email delivery, and Google Analytics. We do not sell or rent guest data. If you pay by bank transfer or UPI, the transaction is handled by your bank, not us."] },
      { h: "How long we keep it", p: ["Booking records are kept for as long as we run the farmstay, for our own accounts and so we can recognise returning guests. You can ask us to delete your account and personal details at any time by emailing " + site.email + "; we'll keep only what tax law requires."] },
      { h: "Your rights", p: ["You can see and correct your details from your account page, or ask us for a copy of what we hold. Write to " + site.email + "."] },
      { h: "Cookies", p: ["We use a session cookie to keep you signed in, and Google Analytics cookies for usage statistics. You can block analytics cookies in your browser without affecting bookings."] },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    summary: "The basics of using this website and booking through it.",
    updated: "2026-09-20",
    sections: [
      { h: "The website", p: [`${site.name} is operated by the owners of the property at ${site.location.label}, ${site.location.area}. By using the site or requesting a booking you agree to these terms, the Booking & Cancellation Policy and the House Rules.`] },
      { h: "Accounts", p: ["You are responsible for keeping your password private and for what is done under your account. Tell us at once if you think it has been misused."] },
      { h: "Bookings", p: ["A request is an offer to book; a booking exists only once we confirm it and receive the advance. Rates and availability shown on the site are indicative until confirmed. Descriptions and photographs are as accurate as we can make them, but a working farm changes with the seasons."] },
      { h: "Liability", p: ["You stay at your own risk. We take reasonable care of the property, but we are not liable for loss of or damage to your belongings, or for injury arising from activities you choose to undertake — including swimming, walking on the boulders, cycling and riding — except where the law says otherwise."] },
      { h: "Content", p: ["The text, photographs and logo on this site belong to us or our licensors. Please ask before reusing them."] },
      { h: "Governing law", p: ["These terms are governed by the laws of India. Disputes fall under the jurisdiction of the courts at Krishnagiri, Tamil Nadu."] },
      { h: "Contact", p: [`${site.email} · ${site.phoneDisplay}`] },
    ],
  },
];

export const getPolicy = (slug) => policies.find((p) => p.slug === slug);
