// Journal posts. Each `body` is a list of blocks: { h: "heading" } | { p: "paragraph" } | { ul: ["item", ...] } | { quote: "..." }
// `metaTitle` (≤38 chars) is the <title>; `title` is the H1.
// Add a post by appending an object here — no other file needs changing. Newest first.
// TODO: swap Unsplash cover images for your own photos.

export const categories = ["Getting here", "The house", "Guests", "Around Bevu", "Wellness", "Food"];

export const posts = [
  {
    slug: "driving-to-bevu-from-bangalore",
    metaTitle: "Driving to Bevu from Bangalore",
    title: "Driving to Bevu from Bangalore: the road, the stops, the last turn",
    excerpt: "Ninety minutes on a good day, two hours on a Friday. Here's how to make the drive part of the weekend rather than the price of it.",
    category: "Getting here",
    date: "2026-09-14",
    readMins: 4,
    cover: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=75",
    coverAlt: "Open country road at golden hour",
    body: [
      { p: "Most of our guests come from south Bangalore, and most of them ask the same question the night before: how long will it really take? The honest answer is between an hour and fifteen minutes and two hours, and the difference is almost entirely about when you leave." },
      { h: "The route" },
      { p: "It is one road for most of the way. Take Hosur Road / NH44 south past Electronic City, Attibele and the Karnataka–Tamil Nadu border. Once you are through Hosur, leave the highway and head east on the district road towards Berigai and Shoolagiri. The landscape changes fast here — the highway's warehouses give way to boulders, tamarind trees and small farms. The pin we send on booking brings you to the gate; the last two or three kilometres are village road, fine for any car, just take them slowly after rain." },
      { h: "When to leave" },
      { ul: ["Friday after 4 PM: the Electronic City to Hosur stretch crawls. Budget two hours and put on a podcast.", "Friday before 3 PM, or Saturday before 9 AM: usually a clean run, under an hour and a half from Koramangala.", "Coming back: Sunday evening is fine until about 6 PM. After that the toll plaza and Attibele slow down."] },
      { h: "Where to stop" },
      { p: "Hosur is the last town with everything: fuel, ATMs, pharmacies, a supermarket. If there is anything specific you or your dog can't do without, buy it there. We keep the kitchen stocked and there are small village shops nearby, but not for a particular brand of oat milk." },
      { h: "The last turn" },
      { p: "Google Maps occasionally tries to send people down a farm track. Follow our pin, not the search result for our name, and if the road you are on suddenly looks like it belongs to someone's cows, call us — we'll talk you in. Most people arrive with the last of the light on the brick, which is exactly how the house likes to be met." },
    ],
  },
  {
    slug: "why-we-built-with-earth-by-hand",
    metaTitle: "Why We Built by Hand, from Earth",
    title: "Why we built this house by hand, from the soil under it",
    excerpt: "It would have been faster to pour concrete. Here is why we didn't, and what a house made of handcrafted brick and stone actually feels like to sleep in.",
    category: "The house",
    date: "2026-08-30",
    readMins: 5,
    cover: "/images/house-build.jpg",
    coverAlt: "The brick house under construction, boulders in the foreground",
    body: [
      { p: "When the plot was still rock and scrub, the easy plan was obvious: level it, pour a slab, put up a concrete frame, fill the walls with cement block, paint it something cheerful. It is what most weekend homes around Hosur are. We did almost none of that." },
      { h: "Building around the boulders" },
      { p: "The granite outcrops were the reason we bought the land. Blasting them would have given us a flatter site and a duller one. So the house was drawn around them — the front steps go past one, the lawn flows between two more, and the pool sits where the ground naturally falls away. Nothing was moved that could be left alone." },
      { h: "Walls that breathe" },
      { p: "The walls are handcrafted brick, laid by masons from the villages around us, on stone plinths. Brick and earth walls are heavy, and that mass is the point: they take the day's heat slowly and give it back slowly, so the rooms stay cool through the afternoon and comfortable at night without the air-conditioning running all day. They also breathe. A brick house in the rains smells like rain, not like paint." },
      { h: "The tower" },
      { p: "The curved tower on the front is the one thing people photograph first. Its vertical slit is made of glass blocks, and it lights the stairwell from sunrise to sunset without a single bulb. It also pulls warm air up and out — old logic, no moving parts." },
      { h: "What it cost us" },
      { p: "Time, mostly. A house like this goes up at the speed of the people laying it, and a good mason will not be hurried. We lost a season to the monsoon. We would do it again. Every wall here holds a little quiet, and you feel it the moment you walk in." },
      { quote: "We built this home the slow way — by hand, from the soil beneath our feet." },
    ],
  },
  {
    slug: "bringing-your-dog-to-bevu",
    metaTitle: "Bringing Your Dog to Bevu",
    title: "Bringing your dog to Bevu: what to know before you pack the car",
    excerpt: "We are pet-friendly and mean it. A few practical notes so the weekend is as good for the dog as it is for you.",
    category: "Guests",
    date: "2026-08-18",
    readMins: 3,
    cover: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1600&q=75",
    coverAlt: "Happy dog running on a green lawn",
    body: [
      { p: "Bevu was planned as a pet-friendly farmstay from the first sketch, not as an afterthought. The lawn is the main reason: a wide, fenced stretch of grass wrapped around the boulders, which for most city dogs is the largest patch of green they have ever been let loose on." },
      { h: "What we provide" },
      { ul: ["A water bowl and a spot for their bed in your room", "A fenced lawn — but tell us if your dog is a climber or a digger", "Outdoor showers near the pool for muddy paws", "Plenty of shade, and the boulders stay cool underneath even in April"] },
      { h: "What we ask" },
      { ul: ["Tell us when you book, and how many. One or two dogs per booking is easy; a pack needs a whole-house booking.", "Leashed near the pool and at the lawn edges. There are farm animals and free-roaming birds beyond the fence.", "Off the beds and the sofas — bring their own bedding.", "Bring their food, medication and anything they are fussy about. Hosur is the nearest place to buy dog food.", "Fully vaccinated, please. There are village dogs in the area."] },
      { h: "Around the farm" },
      { p: "The morning walk is the highlight. Take the farm track out past the tamarind trees just after sunrise — the birds are loud, the ground is cool, and there is nobody around. Most dogs sleep through lunch after it. So do most owners." },
    ],
  },
  {
    slug: "a-weekend-at-bevu-loose-itinerary",
    metaTitle: "A Weekend at Bevu, Loosely",
    title: "A weekend at Bevu, loosely: an itinerary you are free to ignore",
    excerpt: "Nothing here is scheduled. But if you like knowing what a good weekend looks like before you arrive, this is roughly how they go.",
    category: "Guests",
    date: "2026-08-04",
    readMins: 4,
    cover: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=1600&q=75",
    coverAlt: "Green lawn with trees and outdoor seating at golden hour",
    body: [
      { h: "Friday" },
      { p: "Arrive with the last light, ideally. Check-in is from 1 PM, but the house is at its best around six, when the brick goes copper and the pool lights come on. Drop the bags, walk the lawn, get in the water before dinner. Dinner is on the outdoor table if the weather allows, which it usually does. Then the fire." },
      { h: "Saturday" },
      { p: "Someone will wake early because the birds insist. Coffee on the veranda, then either the farm walk or the lawn for yoga — it faces east, and the boulders change colour as the sun clears the trees. Breakfast is late and long. The middle of the day belongs to the pool, the hammocks and the board games. Lunch is the big meal. The afternoon disappears. Evening: bonfire, again, because nobody objected to the first one." },
      { h: "Sunday" },
      { p: "Slow. A last swim, a breakfast that turns into brunch, a look at the sky to decide whether to leave at three or gamble on five. Check-out is 11 AM, but ask us — if the house is free that night, we're relaxed about it." },
      { h: "What people actually do" },
      { ul: ["Families: the pool, then the pool, then cricket, then the pool.", "Friends: long dinners, longer arguments over board games, stars.", "Teams: a working morning on the veranda, swim at lunch, the real conversations by the fire.", "Couples: the upper-floor room, the sunset, and not much else."] },
    ],
  },
  {
    slug: "yoga-day-first-gathering",
    metaTitle: "Yoga Day: Our First Gathering",
    title: "Yoga Day at Bevu: our first gathering, before the first guest",
    excerpt: "We opened the gates for the first time on International Yoga Day, with a session on the lawn before the house was even finished. It set the tone.",
    category: "Wellness",
    date: "2026-07-01",
    readMins: 3,
    cover: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=75",
    coverAlt: "Person practising yoga outdoors at sunrise",
    body: [
      { p: "The lawn was barely in, the pool deck was still being tiled, and there were boulders in the driveway that had not yet decided where to live. We held our first gathering anyway, on the morning of 21 June — International Yoga Day — with a small group of friends and a session led by Sachin Saxena." },
      { p: "It was the first time anyone other than the masons had stood on the property early in the morning, and it told us what we had suspected: the lawn faces the right way. The sun comes up over the trees to the east, the boulders go from grey to gold in about twenty minutes, and the birds are relentless. It is a hard place to stay distracted." },
      { h: "Why it matters for how we host" },
      { p: "We are not a wellness retreat and don't intend to become one. But the property has a stillness to it that we want guests to be able to find — so there are quiet corners deliberately left quiet, mats available for the lawn at sunrise, and no music before breakfast unless you bring your own. If you would like to bring a teacher, or a small group for a weekend of practice, take the whole house and we will build the days around you." },
      { quote: "Breathe deeply. Move mindfully. Live sustainably. Travel responsibly." },
    ],
  },
  {
    slug: "what-is-around-berigai-and-shoolagiri",
    metaTitle: "What's Around Berigai & Shoolagiri",
    title: "What's around: the countryside between Hosur and the hills",
    excerpt: "Most guests never leave the property, and that is fine. For the ones who do, here's what the boulder country around Berigai and Shoolagiri has to offer.",
    category: "Around Bevu",
    date: "2026-07-20",
    readMins: 4,
    cover: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=75",
    coverAlt: "Rolling farmland at golden hour",
    body: [
      { p: "Bevu sits in the low, rocky farmland east of Hosur, between the Bangalore highway and the hills that rise towards the Eastern Ghats. It is not a tourist area, which is exactly why we like it: no traffic, no queues, and roads that go through villages rather than around them." },
      { h: "On foot, from the gate" },
      { p: "The farm track past the tamarinds is the best walk, especially early. Beyond it are small holdings of ragi, groundnut and mango, granite outcrops that make good sunset seats, and more birds than you would expect. Ask us for the loop — it is about forty minutes at a dog's pace." },
      { h: "A short drive" },
      { ul: ["Shoolagiri and Berigai — the nearest villages, for chai, a temple, and the weekly market if your timing is right.", "Hosur — twenty-odd minutes back towards the highway; the town for anything you forgot.", "The hill forts and lakes of the Krishnagiri countryside — a half-day drive-and-picnic if you want one; we'll point you to whichever is in season."] },
      { h: "Our advice" },
      { p: "Come for two nights, leave the property once at most, and spend the time you saved in the pool. The countryside is best seen from the lawn at six in the evening with a drink in hand." },
    ],
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
