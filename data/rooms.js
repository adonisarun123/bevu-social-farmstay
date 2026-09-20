// Four similar ensuite double rooms. Names are native trees of the region.
// TODO: swap Unsplash placeholders for real room photos in /public/images/rooms/.
const shared = {
  bed: "King bed",
  bath: "Attached bathroom, hot water",
  ac: "Air-conditioned",
  occupancy: "2 adults + 1 child",
  extras: ["Fresh linen & towels", "Wardrobe & luggage rack", "Kettle with tea & coffee", "Mosquito-screened windows", "Wi-Fi"],
};

export const rooms = [
  {
    slug: "neem",
    name: "Neem",
    kannada: "Bevu",
    tag: "The namesake room",
    blurb: "Named for the tree the farmstay is named for. Morning light through timber-framed windows, and the lawn just beyond the sill.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=75",
    alt: "Warm bedroom with white linen and timber-framed windows",
    ...shared,
  },
  {
    slug: "tamarind",
    name: "Tamarind",
    kannada: "Hunase",
    tag: "Garden-facing",
    blurb: "Looks out over the boulders and native trees. The quietest room in the house — the one to book for a proper lie-in.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=75",
    alt: "Calm bedroom with earthy tones and a view of greenery",
    ...shared,
  },
  {
    slug: "jamun",
    name: "Jamun",
    kannada: "Nerale",
    tag: "Pool-side",
    blurb: "A few steps from the pool deck. Best for families who want the kids in the water and still within earshot.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=75",
    alt: "Bright bedroom with natural textures opening onto a deck",
    ...shared,
  },
  {
    slug: "amla",
    name: "Amla",
    kannada: "Nellikai",
    tag: "Upper floor",
    blurb: "Up the stairs, with the widest view of the countryside. Sunsets from here are the reason people extend by a night.",
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=75",
    alt: "Upper-floor bedroom with a wide view over the countryside",
    ...shared,
  },
];

export const inclusions = [
  "Breakfast for all guests",
  "Exclusive use of pool and lawn for whole-house bookings",
  "Filtered drinking water throughout the house",
  "Daily housekeeping",
  "Bonfire on request (weather permitting)",
  "Board games, books and a Bluetooth speaker in the living room",
  "Secure parking inside the gate",
  "Pet-friendly — bring the dog",
  "Caretaker on the property, hosts a phone call away",
];

export const houseRules = [
  { title: "Check-in / check-out", text: "Check-in from 1:00 PM, check-out by 11:00 AM. Early or late by arrangement." },
  { title: "Pool hours", text: "Sunrise to sunset. Children must be supervised by an adult at all times — there is no lifeguard." },
  { title: "Noise", text: "Music at a conversational level after 10 PM. Our neighbours are farmers who wake before dawn." },
  { title: "Pets", text: "Dogs are welcome — this is a pet-friendly farmstay. Keep them leashed near the pool and off the beds, and tell us when you book so we can set up a bowl and a bed." },
  { title: "Smoking", text: "Outdoors only, away from the lawn and rooms." },
  { title: "Groups & events", text: "Small celebrations welcome with a whole-house booking. Loud DJ events, no." },
];
