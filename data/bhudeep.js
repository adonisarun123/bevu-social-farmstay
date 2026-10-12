// BhuDeep by Sanctity Ferme Stays — a sister property we point guests to when Bevu is taken,
// or when two people want a place of their own. Facts below are taken from the property's
// Booking.com listing (Oct 2026); photos are the listing's photos, served from /public/images/bhudeep.
// Review this file whenever the listing changes.

const IMG = "/images/bhudeep";
const p = (id) => `${IMG}/bhudeep-${id}.jpg`;

export const bhudeep = {
  slug: "bhudeep",
  name: "BhuDeep",
  fullName: "BhuDeep by Sanctity Ferme Stays",
  kicker: "A sister stay nearby",
  tagline: "A one-bedroom earthen villa for two — round rooms, a sunken living pit and a peacock on the wall.",
  description:
    "BhuDeep is a hand-finished 1BHK earthen villa near Shoolagiri, a short drive from Bevu — built in traditional architecture with a circular plan, a sunken conversation pit, a spiral stair to the roof and a bedroom painted with a peacock. Breakfast, free Wi-Fi, free parking and pets welcome. Ideal for couples and nature lovers.",
  bookingUrl: "https://www.booking.com/hotel/in/bhudeep-by-sanctity-ferme-stays-near-bangalore.en-gb.html",
  address: { label: "Sanctity Ferme Stays", area: "Shoolagiri (Sūlagiri), Krishnagiri district, Tamil Nadu 635117" },
  hosts: "Sanctity Ferme Stays",
  languages: ["English", "Hindi"],
  checkIn: "1:00 PM – 11:30 PM",
  checkOut: "11:00 AM – 11:30 AM",
  sleeps: "2 adults · 1 double bed · cot for 0–3 on request",
  idealFor: "Couples, solo travellers, a parent and a grown child, anyone who wants the land without the crowd",

  facts: [
    { k: "Villa", v: "1 bedroom · 1 bathroom" },
    { k: "Sleeps", v: "2 (+ a cot)" },
    { k: "Breakfast", v: "Included, buffet" },
    { k: "Pets", v: "Welcome, no charge" },
    { k: "From Bevu", v: "A short drive" },
    { k: "From BLR airport", v: "~85 km" },
  ],

  features: [
    { title: "Entire villa to yourselves", text: "No shared walls, no other guests — the round house, its verandah and the garden around it are yours for the stay." },
    { title: "Breakfast included", text: "A buffet breakfast each morning. For lunch and dinner there's a fully equipped kitchen, or dhabas on the highway ten minutes away." },
    { title: "Kitchen with a swing", text: "Wood-and-stone counters, a hob, a fridge, and a cane swing chair by the window — a kitchen you'll actually want to sit in." },
    { title: "Balcony with garden views", text: "A spiral stair climbs from the living pit to a small upper deck under the tiled roof, looking out over the scrub and boulders." },
    { title: "Private bathroom, hot water", text: "Ensuite, earthen-finished like the rest of the house." },
    { title: "Free Wi-Fi & parking", text: "Wi-Fi throughout; park right by the villa, free." },
    { title: "Pet-friendly", text: "Dogs stay free. The garden is open and the countryside is theirs to sniff." },
    { title: "Quiet by design", text: "No parties or events, no smoking indoors. It's a place for two people and a book." },
  ],

  houseRules: [
    { title: "Check-in 1:00 PM – 11:30 PM", text: "Let the hosts know your arrival time in advance — the last stretch is village road and the gate is easier to find in daylight." },
    { title: "Check-out by 11:30 AM", text: "Late check-out is subject to the next booking; ask at the time of reserving." },
    { title: "Children welcome", text: "Children of any age can stay. Guests 11 and above are charged as adults. A cot for 0–3 years is free on request; there are no extra beds." },
    { title: "No smoking, no parties", text: "Smoking is not allowed in the villa. Parties and events — including hen and stag dos — are not accommodated." },
    { title: "Pets stay free", text: "Pets are allowed at no extra charge." },
    { title: "Cancellation", text: "Varies by rate and dates — the terms are shown on Booking.com before you confirm." },
  ],

  nearby: [
    { name: "Highway Darbar (restaurant, NH44)", dist: "10 km" },
    { name: "Mala Dhaba (restaurant, NH44)", dist: "10 km" },
    { name: "Sivasakthi Tea Stall", dist: "10 km" },
    { name: "Bevu Social Farmstay", dist: "A short drive" },
    { name: "Kempegowda International Airport", dist: "85 km" },
  ],

  faqs: [
    { question: "Is BhuDeep part of Bevu Social Farmstay?", answer: "No — BhuDeep is a separate villa run by Sanctity Ferme Stays, a little down the road from Bevu. We list it here as the stay we recommend when Bevu is taken, or when you're two people and the whole house is more than you need. Bookings go through Booking.com or directly with the hosts; message us on WhatsApp and we'll put you in touch." },
    { question: "How many people can stay at BhuDeep?", answer: "It's a one-bedroom villa with one double bed — two adults. A cot for an infant (0–3) is available free on request. There are no extra beds, so groups of three or more should look at Bevu's four rooms instead." },
    { question: "Is breakfast included?", answer: "Yes, a buffet breakfast is included. The villa also has a fully equipped kitchen, and there are dhabas on the highway about ten kilometres away." },
    { question: "Can we bring our dog?", answer: "Yes. Pets are allowed at no extra charge." },
    { question: "How far is it from Bangalore?", answer: "BhuDeep is near Shoolagiri on the Hosur side of the Tamil Nadu border — roughly the same drive as Bevu: a little over an hour from Electronic City via NH44, and about 85 km from Kempegowda International Airport." },
    { question: "Can we visit Bevu's pool while staying at BhuDeep?", answer: "BhuDeep doesn't have a pool. Day access to Bevu's pool and lawn depends on whether Bevu has guests — ask us on WhatsApp before you book and we'll tell you honestly." },
  ],

  // Hero + section images. ids are Booking.com photo ids; files live in /public/images/bhudeep.
  hero: { src: p("835522261"), alt: "BhuDeep from above at dusk — a round, tiled-roof earthen villa among scrub, fields and distant hills", position: "center 55%" },
  sections: {
    arrival: { src: p("835523375"), alt: "A stone path lit by lanterns leading to the round villa at dusk" },
    sign: { src: p("835523447"), alt: "A boulder painted with the BhuDeep name beside the garden path to the villa" },
    pit: { src: p("835523347"), alt: "The sunken circular living pit with cushions, a low round table and the spiral stair above" },
    pitTop: { src: p("835523482"), alt: "The conversation pit seen from the stair above — a circle of cushions around a wooden table" },
    bedroom: { src: p("835523493"), alt: "The bedroom — a white double bed under a peacock painted across the earthen wall" },
    bedWindow: { src: p("835523283"), alt: "The round bedroom with its deep-set windows and crisp white bedding" },
    kitchen: { src: p("835523413"), alt: "The kitchen — stone-topped wooden cabinets, a window seat and a cane swing chair" },
    verandah: { src: p("835523463"), alt: "The verandah — a timber pillar on a boulder plinth, stone floor, the scrub beyond" },
    stair: { src: p("835523516"), alt: "The black spiral stair rising from the living pit to the upper deck, lit at night" },
    roof: { src: p("835523535"), alt: "The villa's tiled roof tower against a grey sky, a bird on the ridge" },
  },
};

export const bhudeepGallery = [
  { src: p("835522261"), alt: "BhuDeep from above at dusk, fields and hills behind", tall: false },
  { src: p("835523245"), alt: "The entrance verandah — earthen walls, timber pillar and the garden beyond", tall: false },
  { src: p("835523430"), alt: "The villa in its garden by day, under a big tree", tall: false },
  { src: p("835523447"), alt: "The painted boulder and path leading to the villa", tall: false },
  { src: p("835523375"), alt: "Lantern-lit stone path to the villa at dusk", tall: false },
  { src: p("835523463"), alt: "Verandah pillar on a boulder plinth", tall: false },
  { src: p("835523347"), alt: "Sunken living pit with the spiral stair", tall: false },
  { src: p("835523398"), alt: "The living pit, cushions and folk-art frieze", tall: false },
  { src: p("835523482"), alt: "The conversation pit from above", tall: false },
  { src: p("835523516"), alt: "Spiral stair and living space lit at night", tall: false },
  { src: p("835523551"), alt: "The living space with its curved wall and stair", tall: false },
  { src: p("835523413"), alt: "Kitchen with the cane swing chair", tall: false },
  { src: p("835523493"), alt: "Bedroom with the peacock mural", tall: false },
  { src: p("835523504"), alt: "Bedroom, window and peacock", tall: false },
  { src: p("835523283"), alt: "The round bedroom and its windows", tall: false },
  { src: p("835523525"), alt: "Bedroom corner window, peacock feathers on the wall", tall: false },
  { src: p("835523314"), alt: "Detail of the peacock mural", tall: false },
  { src: p("835523535"), alt: "The tiled roof tower", tall: false },
];
