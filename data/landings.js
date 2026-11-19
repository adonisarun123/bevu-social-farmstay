// Search-intent landing pages, served at the site root: /<slug>.
// Each page answers ONE distinct question a guest types into Google ("farmstay near Hosur",
// "pet friendly farmstay near Bangalore" …). Keep them distinct — near-duplicate pages that only swap
// a place name are "doorway pages" and get the whole set ignored. Add a page only when it has its own
// facts, its own FAQ and its own reason to exist.
//
// Text supports inline links: [label](/path). Facts here must match data/site.js, data/rooms.js and
// the house rules — never claim air-conditioning, a lifeguard, DJ events or anything not on the property.
// `metaTitle` ≤ 38 chars (the layout appends " · Bevu Social Farmstay").
import { ik } from "./gallery";
import { site } from "./site";

const ext = (f) => ik(`Exterior Photos/${f}`);
const pool = (f) => ik(`Pool Side Photos/${f}`);
const guest = (f) => ik(`Guest Building Photos/${f}`);
const main = (f) => ik(`Main Building Photos/${f}`);

const d = Object.fromEntries(site.location.distances.map((x) => [x.from.split(/[ ,]/)[0], x])); // Electronic, Hosur, Koramangala, Kempegowda

export const landings = [
  // ── 1. Head term ───────────────────────────────────────────────────────────
  {
    slug: "farmstay-near-bangalore",
    metaTitle: "Farmstay near Bangalore with Pool",
    eyebrow: "Farmstay near Bangalore",
    h1: "A farmstay near Bangalore you can reach before the weekend starts.",
    lead: `Four ensuite rooms, a private pool and an open lawn in boulder country past Hosur — about ${d.Electronic.km.replace("~", "")} from Electronic City.`,
    description: "Bevu Social Farmstay: a hand-built brick farmstay near Bangalore, past Hosur. 4 ensuite rooms, private pool, lawn, bonfire, home-cooked food. Pet-friendly. By room or whole house.",
    keywords: ["farmstay near Bangalore", "farm stay near Bangalore", "best farmstay near Bangalore", "farmhouse stay near Bangalore"],
    image: ext("main Building.png"),
    imageAlt: "Bevu Social Farmstay near Bangalore — the granite-and-brick main house under a clear sky",
    facts: [
      { label: "From Electronic City", value: d.Electronic.time },
      { label: "Ensuite king rooms", value: "4" },
      { label: "Sleeps", value: "8 adults + kids" },
      { label: "Pool", value: "Private" },
    ],
    intro: [
      "Most farmstays near Bangalore ask you to choose: close to the city but really a resort with a vegetable patch, or a real farm that is four hours away. Bevu is the short drive and the real countryside. It sits in the low, rocky farmland east of Hosur, just over the Tamil Nadu border, inside a 100-acre farm estate — tamarind, neem, granite boulders and very little else.",
      "The house was built by hand in brick and stone around the boulders that were already here. There are four ensuite king rooms across two buildings, a private swimming pool, a wide lawn with a fire pit, and a kitchen that cooks for you. You can book [one room](/stay) for the two of you, or take the whole house for your people.",
    ],
    sections: [
      {
        h: "What makes it a farmstay and not a resort",
        p: ["There is no reception desk, no buffet line and no activity coordinator with a whistle. There is a caretaker team on the property, hosts a phone call away, breakfast when you wake up, and a farm track that starts at the gate. Meals are home-style and cooked on site. If you want the difference spelled out, we wrote it down: [farmstay vs resort vs homestay](/blog/farmstay-vs-resort-vs-homestay)."],
        ul: [
          "Private pool, open sunrise to sunset — yours alone on a whole-house booking",
          "Lawn, hammocks, bonfire on request, outdoor dining table",
          "Breakfast included; lunch and dinner on request, vegetarian and non-vegetarian",
          "Dogs welcome — see the [pet-friendly page](/pet-friendly-farmstay-near-bangalore)",
          "Workshops on the wider farm — pottery, farming, horse riding, stargazing — on the [experiences page](/experiences)",
        ],
      },
      {
        h: "How far it really is",
        p: [`From Electronic City it is ${d.Electronic.km} and about ${d.Electronic.time} in normal traffic; from Koramangala or HSR, ${d.Koramangala.time}. The road is NH44 to Hosur and then a quiet district road towards Berigai. Leave before 4 PM on a Friday or on Saturday morning and it is an easy run — the [directions page](/location) has the pin and the timing advice, and there is a longer note on [the drive from Bangalore](/blog/driving-to-bevu-from-bangalore).`],
      },
      {
        h: "What we are honest about",
        p: ["There is no air-conditioning. The thick brick walls, high ceilings and fans keep the rooms comfortable for most of the year, and we explain why in [how a brick house stays cool](/blog/how-a-brick-house-stays-cool-without-ac) — but if you need an AC room in April, we are the wrong booking and would rather say so now. It is also a quiet place: music drops to conversation level at 10 PM and we do not host DJ nights."],
      },
    ],
    faq: [
      { q: "Which is the closest farmstay to south Bangalore?", a: `Farmstays on the Hosur side are the closest to Electronic City, HSR, Koramangala and Sarjapur Road because you leave on NH44 without crossing the city. Bevu Social Farmstay is ${d.Electronic.km} from Electronic City, about ${d.Electronic.time} in normal traffic.` },
      { q: "Can I book just one room at the farmstay?", a: "Yes. Each of the four ensuite king rooms can be booked on its own with breakfast, or you can take all four as a whole-house booking with exclusive use of the pool and lawn." },
      { q: "Is the farmstay good for a one-night trip?", a: "Yes — because the drive is short, one night works. Arrive by early afternoon on Saturday, leave after a late breakfast on Sunday. Two nights is better if you want a full day with no car in it." },
      { q: "Does the farmstay have air-conditioning?", a: "No. Rooms have ceiling fans, mosquito-screened windows and thick brick walls that stay cool. Most guests are comfortable from June to February; March to May afternoons are warm and best spent in the pool." },
    ],
    related: ["farmstay-near-hosur", "farmstay-with-swimming-pool-near-bangalore", "weekend-getaway-near-bangalore"],
    posts: ["how-to-choose-a-farmstay-near-bangalore", "farmstay-vs-resort-vs-homestay", "driving-to-bevu-from-bangalore"],
  },

  // ── 2. Hosur / Berigai / Shoolagiri ────────────────────────────────────────
  {
    slug: "farmstay-near-hosur",
    metaTitle: "Farmstay near Hosur & Shoolagiri",
    eyebrow: "Farmstay near Hosur",
    h1: "A farmstay near Hosur, on the quiet road to Berigai and Shoolagiri.",
    lead: `About ${d.Hosur.time} from Hosur town — a brick farmhouse with four rooms, a private pool and a lawn, for Hosur families, visiting relatives and teams from the industrial belt.`,
    description: "Farmstay near Hosur at Seekanapalli, Berigai — on Shoolagiri Road. 4 ensuite rooms, private pool, lawn, home-cooked meals. About 40 min from Hosur. Rooms or whole house.",
    keywords: ["farmstay near Hosur", "farmhouse in Hosur", "farm stay Hosur", "Shoolagiri farmstay", "Berigai farmstay", "resorts near Hosur"],
    image: ext("Main Building(1).png"),
    imageAlt: "Farmstay near Hosur — Bevu's main house seen from the boulders, with the lawn in front",
    facts: [
      { label: "From Hosur", value: d.Hosur.time },
      { label: "Distance", value: d.Hosur.km },
      { label: "Village", value: "Seekanapalli" },
      { label: "District", value: "Krishnagiri" },
    ],
    intro: [
      `Bevu Social Farmstay is at ${site.location.label}, ${site.location.area}. In plain terms: drive east out of Hosur towards Berigai, and we are in the farmland between Berigai and Shoolagiri, inside a 100-acre farm estate whose farm plots are managed by Sanctity Ferme. Café Tamarind is inside the same estate.`,
      "If you live or work in Hosur, this is the nearest place that feels properly away — close enough for a Saturday night with the family, or to put up relatives who are in town for a wedding and would rather wake up to birds than to the bypass.",
    ],
    sections: [
      {
        h: "Who it suits from Hosur",
        ul: [
          "Families who want a pool day and a night out of town without a long drive",
          "Hosts with guests visiting for a function — four rooms, breakfast included, parking inside the gate",
          "Small teams from the Hosur and Shoolagiri industrial areas, for a review day or an [offsite](/corporate-offsite-near-bangalore)",
          "Bangalore friends meeting Hosur friends halfway",
        ],
      },
      {
        h: "Getting here from Hosur, Bagalur and Shoolagiri",
        p: [`From Hosur town, take the Berigai road east; allow ${d.Hosur.time} for the ${d.Hosur.km}. From Bagalur and Shoolagiri it is shorter still. The last two or three kilometres are village road — fine for any car, slow after rain. Use the Google Maps pin on the [location page](/location) rather than searching the name; village roads confuse map search.`],
      },
      {
        h: "While you are here",
        p: ["Most guests do not leave the lawn. For those who do, the countryside between Hosur and Krishnagiri has more than people expect — reservoirs, hill temples and old forts within a short drive. We keep a running list in [places to visit near Hosur](/blog/places-to-visit-near-hosur-and-berigai), and the farm itself runs [workshops and guided sessions](/experiences) you can book with your stay."],
      },
    ],
    faq: [
      { q: "How far is Bevu Social Farmstay from Hosur?", a: `About ${d.Hosur.km} east of Hosur town, towards Berigai — roughly ${d.Hosur.time} by car.` },
      { q: "Is the farmstay in Hosur or in Shoolagiri?", a: "The postal address is Seekanapalli Village, Post Berigai, Hosur 635105, and the property is on Shoolagiri Road. It is in Krishnagiri district, Tamil Nadu, in the farmland between Berigai and Shoolagiri." },
      { q: "Is there a farmstay near Hosur with a swimming pool?", a: "Yes. Bevu has a private swimming pool for house guests, open sunrise to sunset, with loungers and a changing room beside it. There is no lifeguard, so children must be supervised." },
      { q: "Can we host a family function at the farmstay?", a: "Small gatherings — a birthday lunch, an anniversary dinner, a family reunion — work well with a whole-house booking. Amplified music, DJs and fireworks are not allowed, and quiet hours begin at 10 PM." },
    ],
    related: ["farmstay-near-bangalore", "farmhouse-for-groups-near-bangalore", "farmstay-near-electronic-city"],
    posts: ["places-to-visit-near-hosur-and-berigai", "what-is-around-berigai-and-shoolagiri", "best-time-to-visit-a-farmstay-near-bangalore"],
  },

  // ── 3. Homestay intent: hosted, room-wise ──────────────────────────────────
  {
    slug: "homestay-near-bangalore",
    metaTitle: "Homestay near Bangalore & Hosur",
    eyebrow: "Homestay near Bangalore",
    h1: "A homestay near Bangalore and Hosur — a room in a home, not a number on a corridor.",
    lead: "Book a single ensuite room with breakfast in a hand-built brick house, and share the pool, the lawn and the long table with whoever else is staying.",
    description: "Homestay near Bangalore and Hosur: book one ensuite king room with breakfast at Bevu Social Farmstay. Shared private pool, lawn, home-cooked meals, pet-friendly.",
    keywords: ["homestay near Bangalore", "homestay near Hosur", "best homestay near Bangalore", "homestay with pool near Bangalore", "bed and breakfast near Bangalore"],
    image: main("Sunlit Tropical Modern Living Room.png"),
    imageAlt: "Homestay near Bangalore — Bevu's living room with timber-framed glass doors opening to the trees",
    facts: [
      { label: "Book from", value: "1 room" },
      { label: "Each room", value: "King, ensuite" },
      { label: "Breakfast", value: "Included" },
      { label: "Check-in", value: site.checkIn },
    ],
    intro: [
      "A homestay is a stay in someone's house: a few rooms, home food, and people who know your name by the second cup of coffee. That is how Bevu runs. It was built as a family home, it has four guest rooms and no more, and the kitchen cooks what a home cooks — idli and filter coffee in the morning, a proper lunch, dinner when the fire is lit.",
      "You do not need a group to come. Couples, solo travellers and small families book a single room, and the house is shared the way a good homestay is: your room and bathroom are private, everything else is common.",
    ],
    sections: [
      {
        h: "The four rooms",
        p: ["Each is an ensuite king room with hot water, fresh linen, a kettle, mosquito-screened windows and Wi-Fi, sleeping two adults and a child. They are spread across the main house and the guest building beside the pool."],
        ul: [
          "[Neem](/stay/neem) — ground floor; the easy one for grandparents",
          "[Tamarind](/stay/tamarind) — the quiet one, looking out at boulders and trees",
          "[Jamun](/stay/jamun) — steps from the pool deck; families pick it",
          "[Amla](/stay/amla) — upper floor, the widest view, the sunset room",
        ],
      },
      {
        h: "What sharing the house means",
        p: ["On a room booking, the pool, lawn, living room and dining table are shared with other house guests — at most three other rooms. If you would rather have all of it to yourselves, a [whole-house booking](/farmhouse-for-groups-near-bangalore) makes the property private for your group. Either way, day visitors are not allowed in without prior arrangement, so it never turns into a public pool."],
      },
      {
        h: "Homestay, farmstay or both",
        p: ["Both. The house is the homestay; the land around it is the farm — tamarind and neem, a farm track for morning walks, and sessions like pottery, farm-to-table farming and horse riding run on the wider property. More on the labels in [farmstay vs resort vs homestay](/blog/farmstay-vs-resort-vs-homestay)."],
      },
    ],
    faq: [
      { q: "Is Bevu a homestay or a farmstay?", a: "It is a hosted four-room home on farmland, so both labels fit. You can book a single room with breakfast like a homestay, or the whole property like a private farmhouse." },
      { q: "Is the homestay suitable for couples?", a: "Yes. Amla, upstairs, is the pick for the view and privacy; Tamarind is the quiet one. Room bookings share the pool and lawn with other house guests." },
      { q: "Is food available at the homestay?", a: "Breakfast is included with every stay. Lunch and dinner are cooked on site on request and priced per person, with vegetarian and non-vegetarian menus. Tell us preferences and allergies when you book." },
      { q: "Is it safe for solo travellers and women travellers?", a: "The property is gated, a caretaker team stays on site, parking is inside the gate, and the hosts are a phone call away. Entry is for registered guests only." },
    ],
    related: ["farmstay-near-bangalore", "pet-friendly-farmstay-near-bangalore", "weekend-getaway-near-bangalore"],
    posts: ["farmstay-vs-resort-vs-homestay", "what-to-pack-for-a-farmstay-weekend", "a-weekend-at-bevu-loose-itinerary"],
  },

  // ── 4. Pet-friendly ────────────────────────────────────────────────────────
  {
    slug: "pet-friendly-farmstay-near-bangalore",
    metaTitle: "Pet-Friendly Farmstay near Bangalore",
    eyebrow: "Pet-friendly farmstay",
    h1: "A pet-friendly farmstay near Bangalore where the dog is a guest, not a surcharge.",
    lead: "A fenced lawn to run on, boulders to sniff, a farm track at sunrise — and a short enough drive that nobody gets car-sick.",
    description: "Pet-friendly farmstay near Bangalore, past Hosur: fenced lawn, farm walks, private pool, 4 ensuite rooms. Dogs welcome with a few simple rules. About 1 h 15 min from E-City.",
    keywords: ["pet friendly farmstay near Bangalore", "pet friendly resorts near Bangalore", "dog friendly stay near Bangalore", "pet friendly homestay near Bangalore"],
    image: ext("Garden.png"),
    imageAlt: "Pet-friendly farmstay near Bangalore — the garden path between the trees leading up to the house",
    facts: [
      { label: "Dogs", value: "Welcome" },
      { label: "Lawn", value: "Fenced" },
      { label: "Drive from E-City", value: d.Electronic.time },
      { label: "Nearest pet supplies", value: "Hosur" },
    ],
    intro: [
      "Plenty of places near Bangalore say pet-friendly and mean a cage near the car park. Bevu was planned around dogs from the first sketch: the lawn is fenced and wraps around the house, the rooms open close to it, there are outdoor showers by the pool for muddy paws, and the morning walk starts at the gate.",
      "The drive matters too. A little over an hour from south Bangalore is about as long as most dogs enjoy, which is one reason pet parents pick the Hosur side over the four-hour hill stations.",
    ],
    sections: [
      {
        h: "What your dog gets",
        ul: [
          "A wide fenced lawn — tell us if yours is a climber or a digger",
          "A water bowl and a spot for their own bed in your room",
          "Outdoor showers near the pool for rinsing off",
          "Shade under the neem and tamarind, and boulders that stay cool underneath",
          "A farm-track loop of about forty minutes at a dog's pace, best just after sunrise",
        ],
      },
      {
        h: "The rules, in full",
        p: ["They are short and they are the same for everyone, so no dog becomes the reason another guest has a bad weekend."],
        ul: [
          "Tell us when you book, and how many. One or two dogs per booking is easy; more needs a whole-house booking",
          "Fully vaccinated — there are village dogs in the area",
          "Leashed near the pool and at the lawn edges; there are farm animals beyond the fence",
          "Off the beds and sofas — bring their bedding",
          "Bring their food and medication; Hosur is the last place to buy either",
        ],
      },
      {
        h: "Room or whole house?",
        p: ["A confident, sociable dog is fine on a room booking, sharing the lawn with other guests. If yours is reactive, nervous or simply loud, take the [whole house](/farmhouse-for-groups-near-bangalore) — you get the lawn and pool to yourselves and nobody has to manage introductions. The longer packing-and-planning note is in [bringing your dog to Bevu](/blog/bringing-your-dog-to-bevu)."],
      },
    ],
    faq: [
      { q: "Is there an extra charge for pets?", a: "Ask us when you book — tell us the number and size of your dogs and we will confirm on WhatsApp along with the room rate. There are no hidden charges added at check-out." },
      { q: "Can my dog swim in the pool?", a: "House rules keep dogs leashed around the pool. If your dog is a swimmer, ask us when you book. There are outdoor showers beside the pool to cool them down." },
      { q: "Are cats or other pets allowed?", a: "The property is set up for dogs. If you are travelling with a cat or another pet, message us first — it depends on the animal and on who else is staying." },
      { q: "Are there vets nearby?", a: "The nearest veterinary clinics and pet shops are in Hosur, about 40 minutes away. Carry your dog's regular medication and a basic first-aid kit." },
    ],
    related: ["farmstay-near-bangalore", "homestay-near-bangalore", "weekend-getaway-near-bangalore"],
    posts: ["bringing-your-dog-to-bevu", "what-to-pack-for-a-farmstay-weekend", "how-to-choose-a-farmstay-near-bangalore"],
  },

  // ── 5. Pool ────────────────────────────────────────────────────────────────
  {
    slug: "farmstay-with-swimming-pool-near-bangalore",
    metaTitle: "Farmstay with Pool near Bangalore",
    eyebrow: "Farmstay with a private pool",
    h1: "A farmstay with a swimming pool near Bangalore — and nobody else in it.",
    lead: "A proper pool beside the stone guest building, with loungers, parasols and trees on three sides. House guests only; all yours on a whole-house booking.",
    description: "Farmstay with a private swimming pool near Bangalore and Hosur. Pool for house guests only, loungers, changing room, lit at night. 4 ensuite rooms, lawn and bonfire.",
    keywords: ["farmstay with swimming pool near Bangalore", "farmhouse with private pool near Bangalore", "private pool villa near Bangalore", "farmhouse with pool near Hosur"],
    image: pool("POOL(1).png"),
    imageAlt: "Farmstay with swimming pool near Bangalore — sun loungers and parasols on Bevu's pool deck",
    facts: [
      { label: "Pool hours", value: "Sunrise–sunset" },
      { label: "Who can use it", value: "House guests" },
      { label: "Lifeguard", value: "None" },
      { label: "Changing room", value: "Poolside" },
    ],
    intro: [
      "A pool changes a farm weekend. Children stop asking what there is to do, the afternoon heat stops mattering, and a group that arrived as four separate families ends up in one place. Ours sits beside the guest building, framed by trees, with a deck of loungers and parasols, an outdoor shower and a stone changing room.",
      "It is a private pool in the sense that matters: no day-pass crowd, no neighbouring villas, no strangers. On a room booking you share it with at most three other rooms. On a whole-house booking it is yours.",
    ],
    sections: [
      {
        h: "The details people ask about",
        ul: [
          "Open sunrise to sunset, as per the house rules",
          "Freshwater, filtered and cleaned daily",
          "Loungers, parasols and towels provided; kids' floats on request",
          "Changing room and washroom beside the deck",
          "No glass on the deck, shower before you swim, no swimming after drinking",
        ],
      },
      {
        h: "With children",
        p: ["There is no lifeguard, so an adult has to be at the pool whenever a child is — that is a house rule, not a suggestion. [Jamun](/stay/jamun) is the family pick, a few steps from the deck. Bring swimwear and arm floats that fit; we have a few floats but not every size. More in [a farmstay weekend with kids](/blog/farmstay-with-kids-near-bangalore)."],
      },
      {
        h: "Beyond the pool",
        p: ["The [lawn](/amenities#lawn) is the other half of the weekend — cricket and badminton in the afternoon, a long table for dinner, a bonfire once the stars are out. See the [pool and lawn page](/amenities) for everything, and the [gallery](/gallery) for photographs taken on the property."],
      },
    ],
    faq: [
      { q: "Is the swimming pool private?", a: "Yes. It is for house guests only — no day visitors or outside bookings. With a whole-house booking it is exclusively your group's." },
      { q: "What are the pool timings?", a: "Sunrise to sunset, every day. There is no lifeguard, so please keep to the hours and supervise children." },
      { q: "How deep is the pool? Is it safe for kids?", a: "Ask us for the current depth markings when you book. There is no lifeguard, so children must be supervised by an adult at all times, and non-swimmers should wear floats." },
      { q: "Can we book only the pool for a day outing?", a: "The pool is not rented by the day. Day visits are by prior arrangement only and depend on whether the house is free — message us with your date and group size." },
    ],
    related: ["farmhouse-for-groups-near-bangalore", "farmstay-near-bangalore", "weekend-getaway-near-bangalore"],
    posts: ["farmstay-with-kids-near-bangalore", "best-time-to-visit-a-farmstay-near-bangalore", "a-weekend-at-bevu-loose-itinerary"],
  },

  // ── 6. Whole-house / groups ────────────────────────────────────────────────
  {
    slug: "farmhouse-for-groups-near-bangalore",
    metaTitle: "Private Farmhouse for Groups, Bangalore",
    eyebrow: "Whole-house booking",
    h1: "A private farmhouse near Bangalore for your whole group — all four rooms, the pool and the lawn.",
    lead: "Eight adults comfortably, up to twelve with children. One booking, one gate, nobody else on the property.",
    description: "Book an entire farmhouse near Bangalore for family or friends: 4 ensuite rooms, private pool, lawn, bonfire, meals cooked on site. Sleeps 8 adults, up to 12 with kids.",
    keywords: ["farmhouse for group stay near Bangalore", "farmhouse for family get together near Bangalore", "private farmhouse near Bangalore", "farmhouse for birthday party near Bangalore", "villa for group near Hosur"],
    image: pool("pool(5).png"),
    imageAlt: "Private farmhouse for groups near Bangalore — Bevu's pool lit up at night",
    facts: [
      { label: "Rooms", value: "All 4" },
      { label: "Adults", value: "8" },
      { label: "With children", value: "Up to 12" },
      { label: "Pool & lawn", value: "Exclusive" },
    ],
    intro: [
      "The house was designed for this. One big living room instead of four small ones, one long dining table and a longer one outside, a pool you can see from the lawn and a lawn you can see from the kitchen. Take all four rooms and the property is closed to everyone else.",
      "It suits groups who want to be together rather than entertained: three generations of a family, college friends who can only find one free weekend a year, two or three families with children the same age.",
    ],
    sections: [
      {
        h: "What a whole-house booking includes",
        ul: [
          "All four ensuite king rooms — each sleeps two adults and a child; extra mattresses on request",
          "Exclusive use of the pool, lawn, living room and outdoor dining",
          "Breakfast for everyone; lunch, dinner and barbecue on request, priced per person",
          "Bonfire on request, weather permitting",
          "Daily housekeeping, a caretaker team on site, parking inside the gate",
          "Dogs welcome — more than two needs a heads-up",
        ],
      },
      {
        h: "Celebrations: what works here and what does not",
        p: ["A birthday lunch on the lawn, an anniversary dinner at the long table, a cake from the kitchen, a few balloons and a playlist on the speaker — yes, gladly. A DJ, a sound system, fireworks or a party that starts at midnight — no. Our neighbours are farmers who wake before dawn, music drops to conversation level at 10 PM, and that rule is the reason the place is as calm as it is. If the night you have in mind is loud, we are the wrong venue and will tell you so before you pay an advance."],
      },
      {
        h: "Planning the stay",
        p: ["Send us the dates, the headcount with children's ages, and food preferences. We confirm the rate, hold the dates on a part advance, and plan meals around your group. Weekends are the first dates to go, so the earlier the better; the cancellation terms are in the [booking policy](/policies/booking-and-cancellation). Groups built around a shared interest — riders, birders, cooks, a yoga circle — should look at the [meetup formats](/meetups) too."],
      },
    ],
    faq: [
      { q: "How many people can stay in the farmhouse?", a: "Eight adults comfortably in four king rooms, or up to twelve when some of the group are children on extra mattresses. Tell us the exact mix and we will say honestly whether it fits." },
      { q: "Can we bring our own cook or outside food?", a: "Meals are cooked on site by our team. If you have a specific need — a caterer for one meal, a birthday cake from the city — ask us when booking." },
      { q: "Is the farmhouse available for a bachelor or bachelorette weekend?", a: "Yes, for groups who are happy with the house rules: no amplified music, quiet after 10 PM, pool closed at sunset. If the plan is a late, loud party, please choose a venue built for that." },
      { q: "How far in advance should we book the whole house?", a: "Weekends and long weekends are the first to go, so book as early as you can. Weekdays are usually easier to get at short notice." },
    ],
    related: ["farmstay-with-swimming-pool-near-bangalore", "corporate-offsite-near-bangalore", "farmstay-near-bangalore"],
    posts: ["farmstay-with-kids-near-bangalore", "how-to-choose-a-farmstay-near-bangalore", "a-weekend-at-bevu-loose-itinerary"],
  },

  // ── 7. Weekend getaway ─────────────────────────────────────────────────────
  {
    slug: "weekend-getaway-near-bangalore",
    metaTitle: "Weekend Getaway near Bangalore",
    eyebrow: "Weekend getaway near Bangalore",
    h1: "A weekend getaway near Bangalore that does not cost you half the weekend in a car.",
    lead: "Under two hours from most of south and east Bangalore. Leave after lunch on Saturday and be in the pool by four.",
    description: "A weekend getaway near Bangalore within 2 hours: Bevu Social Farmstay past Hosur. Pool, lawn, bonfire, home food, farm walks. One or two nights, rooms or whole house.",
    keywords: ["weekend getaway near Bangalore", "one day trip near Bangalore", "places to stay near Bangalore within 100 km", "short trip from Bangalore", "staycation near Bangalore"],
    image: pool("Pool(4).png"),
    imageAlt: "Weekend getaway near Bangalore — poolside seating under parasols at Bevu on a bright afternoon",
    facts: [
      { label: "From Koramangala / HSR", value: d.Koramangala.time },
      { label: "From Electronic City", value: d.Electronic.time },
      { label: "Check-in", value: site.checkIn },
      { label: "Check-out", value: site.checkOut },
    ],
    intro: [
      "The arithmetic of a Bangalore weekend is unkind. Coorg, Chikmagalur and Wayanad are five to seven hours each way, which leaves one real day between two tired ones. The getaways that actually rest you are the ones under two hours — and the fastest direction out of south Bangalore is NH44 towards Hosur.",
      "Bevu is at the end of that road: a brick house among granite boulders, a private pool, a lawn, a fire in the evening, and food cooked for you. Close enough that you can decide on Thursday.",
    ],
    sections: [
      {
        h: "One night",
        ul: [
          "Saturday, 1 PM — leave after an early lunch; Saturday traffic is light",
          "By 3 PM — check in, pool until the light goes copper",
          "Evening — bonfire, dinner at the outdoor table, stars",
          "Sunday — farm walk at sunrise, long breakfast, last swim, on the road by noon",
        ],
      },
      {
        h: "Two nights",
        p: ["Leave before 4 PM on Friday to beat the Electronic City crawl, and you gain a whole Saturday with no car in it: a slow morning, a [workshop on the farm](/experiences) if you want one, the pool, a nap, another fire. This is the version we would book. A looser sketch is in [a weekend at Bevu](/blog/a-weekend-at-bevu-loose-itinerary)."],
      },
      {
        h: "Is it the right getaway for you?",
        p: ["It is, if the plan is to do very little in a beautiful place with people you like. It is not, if you want nightlife, room service at 2 AM, a spa menu or air-conditioning. The honest checklist is in [how to choose a farmstay near Bangalore](/blog/how-to-choose-a-farmstay-near-bangalore); the season-by-season picture is in [the best time to visit](/blog/best-time-to-visit-a-farmstay-near-bangalore)."],
      },
    ],
    faq: [
      { q: "What is a good weekend getaway within 100 km of Bangalore?", a: `The Hosur side is one of the quickest exits from south Bangalore. Bevu Social Farmstay is ${d.Electronic.km} from Electronic City — a farmstay with a private pool, lawn and home-cooked food, bookable by room or as a whole house.` },
      { q: "Can we do a one-day trip without staying overnight?", a: "Stays are overnight by default. Day visits are by prior arrangement and only when the house is free, so message us with the date and group size." },
      { q: "When should we leave Bangalore on a Friday?", a: "Before 4 PM if you can. After that the Electronic City to Hosur stretch of NH44 slows down and the drive can take two hours. Saturday mornings are an easy run." },
      { q: "What should we carry?", a: "Swimwear, a light layer for the evening, walking shoes, sunscreen, insect repellent and any medication. Towels, linen, filtered water and meals are taken care of. The full list is in our packing guide." },
    ],
    related: ["farmstay-near-bangalore", "farmstay-near-electronic-city", "homestay-near-bangalore"],
    posts: ["a-weekend-at-bevu-loose-itinerary", "what-to-pack-for-a-farmstay-weekend", "best-time-to-visit-a-farmstay-near-bangalore"],
  },

  // ── 8. Corporate offsite ───────────────────────────────────────────────────
  {
    slug: "corporate-offsite-near-bangalore",
    metaTitle: "Team Offsite Venue near Bangalore",
    eyebrow: "Small-team offsites",
    h1: "A corporate offsite venue near Bangalore for teams of eight to twelve.",
    lead: "A whole house for a leadership team or a founding team: a veranda to work on, a table that seats everyone, a pool for the break, and no other company in the next conference room.",
    description: "Small-team corporate offsite near Bangalore: private farmhouse for 8–12, Wi-Fi, work veranda, meals on site, pool and bonfire. 1 h 15 min from Electronic City. GST invoice.",
    keywords: ["corporate offsite near Bangalore", "team outing near Bangalore", "offsite venue near Bangalore", "team outing near Hosur", "leadership retreat near Bangalore"],
    image: main("Sunlit Modern Rustic Lounge.png"),
    imageAlt: "Corporate offsite venue near Bangalore — Bevu's lounge with tall windows and sofas",
    facts: [
      { label: "Team size", value: "8–12" },
      { label: "Booking", value: "Whole house" },
      { label: "From Electronic City", value: d.Electronic.time },
      { label: "Invoice", value: "GST" },
    ],
    intro: [
      "Large resorts are built for offsites of two hundred. For a team of ten they are too much: a windowless hall, a buffet, and three other companies doing trust falls on the same lawn. A small team needs the opposite — one private house where the conversation can keep going from the morning session to the pool to the fire.",
      "Bevu takes one group at a time. Book the whole house and the working day, the meals and the evening all happen in the same quiet place, a little over an hour from Electronic City.",
    ],
    sections: [
      {
        h: "What you get",
        ul: [
          "The entire property — four ensuite king rooms, living room, veranda, lawn and pool",
          "Wi-Fi through the house, and plenty of shaded outdoor seating for breakouts",
          "A dining table for the whole team; breakfast included, lunch, dinner and tea breaks arranged per head",
          "Bonfire in the evening, pool until sunset, a farm walk before the first session",
          "Optional sessions on the farm — pottery, mud building, a cooking workshop, stargazing — listed under [experiences](/experiences)",
          "GST invoice in your company's name",
        ],
      },
      {
        h: "What to know before you propose it internally",
        p: ["Rooms are king-bedded, so the house sleeps four on single occupancy, eight sharing king beds, and up to twelve with extra mattresses — larger teams sometimes come for the day and keep the night for the core group. There is no air-conditioning and no built-in conference hall; sessions run in the living room and on the veranda. Tell us what you need — a screen, extension boards, a whiteboard — and we will say plainly what we have and what you should bring. Quiet hours start at 10 PM."],
      },
      {
        h: "A day that works",
        p: ["Arrive by 10 AM, work until lunch, swim, a second session from four until sunset, then the fire. Teams who stay the night get the best hour of the offsite the next morning, over coffee, before anyone opens a laptop. There is a fuller template in [planning a small-team offsite near Bangalore](/blog/planning-a-small-team-offsite-near-bangalore)."],
      },
    ],
    faq: [
      { q: "How many people can you host for an offsite?", a: "Overnight, 8 comfortably and up to 12 with extra mattresses. Day sessions can take a somewhat larger group by prior arrangement — tell us your headcount." },
      { q: "Do you provide a GST invoice?", a: "Yes. Bevu Social Farmstay is GST-registered and issues a tax invoice in your company's name; share the GSTIN when booking." },
      { q: "Is there Wi-Fi good enough for video calls?", a: "There is Wi-Fi throughout the house, used by guests for everyday work and calls. For a critical presentation, carry a mobile hotspot as backup, as you would anywhere outside the city." },
      { q: "Can you arrange transport from Bangalore?", a: "We do not run transport. Most teams carpool or hire a tempo traveller from Bangalore; parking is inside the gate." },
    ],
    related: ["farmhouse-for-groups-near-bangalore", "farmstay-near-electronic-city", "farmstay-near-hosur"],
    posts: ["planning-a-small-team-offsite-near-bangalore", "driving-to-bevu-from-bangalore", "how-a-brick-house-stays-cool-without-ac"],
  },

  // ── 9. Electronic City / south & east Bangalore ────────────────────────────
  {
    slug: "farmstay-near-electronic-city",
    metaTitle: "Farmstay near Electronic City",
    eyebrow: "From Electronic City, HSR & Sarjapur Road",
    h1: "The farmstay near Electronic City: fifty kilometres, one highway, no city to cross.",
    lead: "If you live in Electronic City, HSR, Bommanahalli or along Sarjapur Road, you are already on the right side of Bangalore. The countryside is closer than Indiranagar on a bad evening.",
    description: "Farmstay near Electronic City, Bangalore: ~50 km via NH44 and Hosur. Private pool, 4 ensuite rooms, lawn, home-cooked meals. Easy from HSR, Sarjapur Road and Whitefield.",
    keywords: ["farmstay near Electronic City", "resorts near Electronic City", "weekend getaway near Electronic City", "farmhouse near Sarjapur Road", "farmstay near Attibele"],
    image: guest("Guest Building.png"),
    imageAlt: "Farmstay near Electronic City — Bevu's stone guest building opening onto the lawn",
    facts: [
      { label: "From Electronic City", value: d.Electronic.time },
      { label: "Distance", value: d.Electronic.km },
      { label: "Route", value: "NH44 → Hosur" },
      { label: "From the airport", value: d.Kempegowda.time },
    ],
    intro: [
      "South Bangalore has an advantage the rest of the city does not: the highway out of town starts at your doorstep. From Electronic City you are on NH44 immediately, across the state border at Attibele in minutes, and through Hosur into farmland before a podcast episode ends.",
      `Bevu Social Farmstay is ${d.Electronic.km} from Electronic City — about ${d.Electronic.time} in normal traffic. That makes it realistic for a Saturday night, a Friday team day, or a mid-week reset when you have leave to burn.`,
    ],
    sections: [
      {
        h: "The route",
        ul: [
          "Electronic City → Attibele → Hosur on NH44",
          "Leave the highway at Hosur and head east on the Berigai road",
          "Follow the Google Maps pin for the last few kilometres of village road",
          "From Sarjapur Road and Whitefield, Maps often suggests cutting across via Sarjapur and Bagalur instead of Hosur Road — check live traffic and take whichever is clear",
        ],
        p: ["The pin, live timing tips and a map are on the [location page](/location). The one rule that matters: on a Friday, be past Electronic City before 4 PM."],
      },
      {
        h: "Why it suits this side of town",
        p: ["Because it is repeatable. A place you can reach in a little over an hour becomes a habit rather than an annual trip — a pool day when the children have a long weekend, a quiet Tuesday night for two, a [team offsite](/corporate-offsite-near-bangalore) that does not need a travel budget. Rooms can be booked [one at a time](/homestay-near-bangalore) or [all four together](/farmhouse-for-groups-near-bangalore)."],
      },
      {
        h: "Before you go",
        p: ["Stock up in Hosur — it is the last town with supermarkets, fuel, ATMs and pharmacies. The longer version, with where to stop and when to leave, is in [driving to Bevu from Bangalore](/blog/driving-to-bevu-from-bangalore)."],
      },
    ],
    faq: [
      { q: "How far is the farmstay from Electronic City?", a: `About ${d.Electronic.km} — roughly ${d.Electronic.time} in normal traffic via NH44 and Hosur. Friday evenings after 4 PM can add 30 to 45 minutes.` },
      { q: "Do I need to cross Bangalore city to get there?", a: "Not from the south or east. From Electronic City, HSR, Bommanahalli and Sarjapur Road you leave directly on Hosur Road / NH44 or via Sarjapur–Bagalur, away from the city." },
      { q: "Is there a toll on the way?", a: "Yes, NH44 has a toll plaza near Attibele on the Karnataka–Tamil Nadu border. Keep FASTag topped up; the queue is longest on Sunday evenings heading back." },
      { q: "Can I reach by public transport?", a: "Buses and trains run from Bangalore to Hosur; from Hosur you will need a cab or auto for the last stretch to Berigai. Most guests drive." },
    ],
    related: ["weekend-getaway-near-bangalore", "farmstay-near-hosur", "corporate-offsite-near-bangalore"],
    posts: ["driving-to-bevu-from-bangalore", "what-to-pack-for-a-farmstay-weekend", "places-to-visit-near-hosur-and-berigai"],
  },
];

export const getLanding = (slug) => landings.find((l) => l.slug === slug);

// Short labels for footers, link grids and llms.txt.
export const landingLinks = landings.map((l) => ({ href: `/${l.slug}`, label: l.eyebrow.replace(/^From /, "Near "), title: l.metaTitle }));
