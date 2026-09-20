// Four similar ensuite double rooms. Names are native trees of the region.
// TODO: swap Unsplash placeholders for real room photos in /public/images/rooms/.
// Each room has its own page at /stay/<slug>: `story` paragraphs, `gallery` (3 images), `goodFor`, `floor`, `view`, `size`.
// Floor/view/size are guesses — correct them.
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
    floor: "Ground floor",
    view: "The neem tree and the front lawn",
    size: "~280 sq ft + bathroom",
    goodFor: ["Couples", "Grandparents (no stairs)", "Light sleepers who like birdsong"],
    story: [
      "This is the room the house is named for. The old neem outside the window was on the plot before anything else, and the room was placed so its canopy fills the frame from the bed. Morning light comes through the timber-framed windows first here, filtered green.",
      "It is on the ground floor, a few steps from the living room and the veranda, which makes it the natural pick for grandparents, anyone who would rather not do stairs, and anyone who likes to be first to the coffee.",
      "The bathroom is stone-floored with a rain shower and hot water on demand. The bed is a king with a firm-side mattress; ask for a softer topper if you prefer it.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=75",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=75",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1400&q=75",
    ],
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
    floor: "Ground floor",
    view: "Boulders and the tamarind grove",
    size: "~280 sq ft + bathroom",
    goodFor: ["Couples", "Anyone who wants a proper lie-in", "Work-from-farm weeks"],
    story: [
      "Tamarind faces away from the lawn and the pool, towards the granite boulders and the old tamarind trees at the back of the plot. It is the quietest room in the house: no pool noise, no kitchen noise, just the breeze in the trees and the occasional argument between two mynas.",
      "The window seat is the reason regulars ask for this room by name. It is deep enough to read in, and the afternoon shade from the boulders keeps the room cool without the air-conditioning.",
      "There is a proper desk, and the Wi-Fi is strongest here — if you are stealing a Monday to work from the farm, this is the room.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=75",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=75",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=75",
    ],
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
    floor: "Ground floor",
    view: "The pool deck and lawn",
    size: "~300 sq ft + bathroom",
    goodFor: ["Families with young children", "Friends who live in the pool", "Anyone who swims before breakfast"],
    story: [
      "Jamun opens onto the pool side of the house. From the bed you can see the water; from the deck chairs outside your door you can see the kids in it. Families with small swimmers book this room first, and for good reason — it is the only one from which the pool is within earshot.",
      "It is also the largest of the four by a little, with space for the extra mattress without anyone tripping over it. The outdoor shower by the pool is a few steps away, so wet feet mostly stay outside.",
      "Evenings are the trade-off: it is the liveliest side of the house until the pool lights go off. If you want silence, Tamarind is the room. If you want to be in the middle of things, this is.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1400&q=75",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1400&q=75",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1400&q=75",
    ],
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
    floor: "Upper floor",
    view: "Open countryside to the east — sunrise side",
    size: "~280 sq ft + bathroom + private balcony",
    goodFor: ["Couples", "Anniversaries and proposals", "Sunrise people"],
    story: [
      "Up the glass-block stairwell, Amla is the room with the view. The balcony looks east over the boulders and the farmland beyond, which means it gets the sunrise first and the last of the evening colour on the hills opposite. People extend by a night because of this balcony.",
      "Being upstairs, it is a little removed from the ground-floor bustle — the right choice for an anniversary, or for the couple in a group of friends who want a door to close. The stairs are the only reason not to book it.",
      "The bathroom has a window of its own and the best water pressure in the house, for what it is worth. Tea on the balcony at six in the morning is the whole point of this room.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1400&q=75",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1400&q=75",
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1400&q=75",
    ],
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

export function getRoom(slug) {
  return rooms.find((r) => r.slug === slug);
}
