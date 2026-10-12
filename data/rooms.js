// Four ensuite double rooms — two in the main house, two in the guest building by the pool. Names are native trees of the region.
// Photos live in ImageKit (Media Library /BSF/Main Building Photos and /BSF/Guest Building Photos); see data/gallery.js.
// Each room has its own page at /stay/<slug>: `story` paragraphs, `gallery` (4 shots: room, bed, bathroom, detail), `goodFor`, `floor`, `view`, `size`.
// Floor/view/size/building are best guesses from the photos — correct them.
import { ik } from "./gallery";
const main = (f) => ik(`Main Building Photos/${f}`);
const guest = (f) => ik(`Guest Building Photos/${f}`);
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
    image: main("Sunlit Rustic Bedroom Retreat.png"),
    alt: "Neem room — king bed under a curved brick wall, morning light through timber-framed windows",
    building: "Main house",
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
      { kind: "Room", src: main("Sunlit Rustic Bedroom Retreat.png"), alt: "Neem room — king bed, brick walls and timber-framed windows onto the garden" },
      { kind: "Bed", src: main("Sunlit Rustic Bedroom Retreat (1).png"), alt: "The king bed in the Neem room, dressed in white linen" },
      { kind: "Bathroom", src: main("Modern Stone-Clad Bathroom with Vanity.png"), alt: "Neem room ensuite — stone-clad walls and a floating vanity" },
      { kind: "Detail", src: main("Sunlit Terracotta Bench Nook.png"), alt: "Built-in bench nook by the window in the Neem room" },
    ],
    ...shared,
  },
  {
    slug: "tamarind",
    name: "Tamarind",
    kannada: "Hunase",
    tag: "Garden-facing",
    blurb: "Looks out over the boulders and native trees. The quietest room in the house — the one to book for a proper lie-in.",
    image: guest("Room.png"),
    alt: "Tamarind room — double bed in white linen with red cushions under a curved brick wall",
    building: "Guest building",
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
      { kind: "Room", src: guest("Room.png"), alt: "Tamarind room — double bed in white and red, ceiling fan and warm brick walls" },
      { kind: "Bed", src: guest("room(1).png"), alt: "The bed in the Tamarind room, white linen and red cushions" },
      { kind: "Bathroom", src: guest("washroom.png"), alt: "Tamarind room ensuite in rose marble with a stone basin" },
      { kind: "Detail", src: guest("Guest Room.png"), alt: "Tamarind room looking out towards the verandah" },
    ],
    ...shared,
  },
  {
    slug: "jamun",
    name: "Jamun",
    kannada: "Nerale",
    tag: "Pool-side",
    blurb: "A few steps from the pool deck. Best for families who want the kids in the water and still within earshot.",
    image: guest("Room(4).png"),
    alt: "Jamun room — king bed in blue linen, brick walls and a window seat by the pool side",
    building: "Guest building",
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
      { kind: "Room", src: guest("Room(4).png"), alt: "Jamun room — king bed in blue linen, brick walls and a window seat" },
      { kind: "Bed", src: guest("Room(9).png"), alt: "The bed in the Jamun room with the window beyond" },
      { kind: "Bathroom", src: guest("washroom(1).png"), alt: "Jamun room ensuite — grey marble vanity and walk-in shower" },
      { kind: "Detail", src: guest("Room(8).png"), alt: "Window in the Jamun room looking onto the garden" },
    ],
    ...shared,
  },
  {
    slug: "amla",
    name: "Amla",
    kannada: "Nellikai",
    tag: "Upper floor",
    blurb: "Up the stairs, with the widest view of the countryside. Sunsets from here are the reason people extend by a night.",
    image: main("Sunlit Rustic Loft Bedroom.png"),
    alt: "Amla room — upper-floor loft bedroom with exposed brick and a wall of windows",
    building: "Main house",
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
      { kind: "Room", src: main("Sunlit Rustic Loft Bedroom.png"), alt: "Amla room — the upper-floor loft bedroom with a wall of windows" },
      { kind: "Bed", src: main("Sunlit Rustic Daybed Retreat.png"), alt: "Daybed beneath the arched windows in the Amla room" },
      { kind: "Bathroom", src: main("Modern Marble Wet-Room Bathroom.png"), alt: "Amla room ensuite — a marble wet-room with its own window" },
      { kind: "Detail", src: main("Sunlit Terracotta Mezzanine Corridor.png"), alt: "The mezzanine corridor leading to the Amla room" },
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
