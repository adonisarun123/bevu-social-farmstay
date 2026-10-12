// Gallery photos live in ImageKit (Media Library folder /BSF/…); the site never serves the multi-MB
// PNG originals. components/Image.jsx routes these through the ImageKit CDN, which resizes per
// breakpoint (srcset), converts to WebP/AVIF and caches at the edge. Add photos at /admin/media.
//
// `tall` = portrait (3:4 tile). `concept` = interior visualisation rather than a photograph — shown
// with a small "concept" badge. Set it to false (or drop the key) once real photos replace them.

const IK = "https://ik.imagekit.io/bevusocialfarmstay/BSF";
export const ik = (path) => `${IK}/${path.split("/").map(encodeURIComponent).join("/")}`;

const ext = (f) => `Exterior Photos/${f}`;
const pool = (f) => `Pool Side Photos/${f}`;
const guest = (f) => `Guest Building Photos/${f}`;
const main = (f) => `Main Building Photos/${f}`;
const kitchen = (f) => `Kitchen /${f}`; // folder name has a trailing space in ImageKit

export const galleryCategories = ["All", "The House", "Pool & Lawn", "Rooms", "Bathrooms", "Interiors", "Kitchen"];

export const gallery = [
  // ── The House ──────────────────────────────────────────────────────────────
  { src: ik(ext("main Building.png")), alt: "Bevu Social Farmstay — the granite-and-brick main house under a clear sky", category: "The House", real: true, tall: true },
  { src: ik(ext("Garden.png")), alt: "Garden path between the trees leading up to the main house", category: "The House", real: true, tall: true },
  { src: ik(ext("Main Building(1).png")), alt: "Main house seen from the boulders, with the lawn in front", category: "The House", real: true, tall: true },
  { src: ik(guest("Guest Building.png")), alt: "The guest building — stone walls and timber doors opening onto the lawn", category: "The House", real: true },
  { src: ik(guest("Stairs(1).png")), alt: "Pendant lamps lighting the stairwell of the guest building at night", category: "The House", real: true, tall: true },
  { src: ik(guest("Warm Pendant Lights png.png")), alt: "Warm pendant lights along the brick stairwell", category: "The House", real: true, tall: true },

  // ── Pool & Lawn ────────────────────────────────────────────────────────────
  { src: ik(pool("Pool.png")), alt: "The private swimming pool, turquoise water framed by trees", category: "Pool & Lawn", real: true, tall: true },
  { src: ik(pool("POOL(1).png")), alt: "Sun loungers and parasols on the pool deck beside the stone guest building", category: "Pool & Lawn", real: true },
  { src: ik(pool("Poll.png")), alt: "Pool glimpsed through a granite archway", category: "Pool & Lawn", real: true, tall: true },
  { src: ik(pool("Pool(4).png")), alt: "Poolside seating under parasols on a bright afternoon", category: "Pool & Lawn", real: true, tall: true },
  { src: ik(pool("pool(5).png")), alt: "The pool lit up at night, glowing blue against the dark farm", category: "Pool & Lawn", real: true },
  { src: ik(pool("Pool(2).png")), alt: "Loungers lined up along the pool edge", category: "Pool & Lawn", real: true },
  { src: ik(pool("Pool(3).png")), alt: "Pool deck with loungers, looking towards the trees", category: "Pool & Lawn", real: true, tall: true },
  { src: ik(pool("Pool Washroom.png")), alt: "Poolside washroom and changing area in exposed stone and brick", category: "Pool & Lawn", real: true, tall: true },

  // ── Rooms (guest building) ─────────────────────────────────────────────────
  { src: ik(guest("Room(9).png")), alt: "Guest room with a double bed in blue linen beneath a curved brick wall", category: "Rooms", real: true, tall: true },
  { src: ik(guest("Room(4).png")), alt: "Double room with blue bedding, warm brick walls and a window seat", category: "Rooms", real: true },
  { src: ik(guest("Room(8).png")), alt: "Guest room with a wide window looking out onto the garden", category: "Rooms", real: true, tall: true },
  { src: ik(guest("Room(3).png")), alt: "Double bed with blue quilt, bedside lamps and a timber headboard", category: "Rooms", real: true },
  { src: ik(guest("Room(7).png")), alt: "Bedroom corner with blue linen, cane chair and soft evening light", category: "Rooms", real: true, tall: true },
  { src: ik(guest("room(1).png")), alt: "Guest room with white bedding and red cushions under a curved brick wall", category: "Rooms", real: true, tall: true },
  { src: ik(guest("Room.png")), alt: "Twin-pillow double bed in white and red, ceiling fan above", category: "Rooms", real: true },
  { src: ik(guest("Guest Room.png")), alt: "Guest room with white linen, red accents and a view to the verandah", category: "Rooms", real: true },
  { src: ik(guest("Room(5).png")), alt: "Reading corner and wardrobe in a guest room", category: "Rooms", real: true, tall: true },

  // ── Bathrooms ──────────────────────────────────────────────────────────────
  { src: ik(guest("washroom.png")), alt: "Ensuite bathroom in rose marble with a stone basin and mirror", category: "Bathrooms", real: true },
  { src: ik(guest("washroom(1).png")), alt: "Ensuite bathroom with marble walls, vanity and walk-in shower", category: "Bathrooms", real: true },
  { src: ik(guest("washroom(2).png")), alt: "Marble shower enclosure with brass fittings", category: "Bathrooms", real: true, tall: true },
  { src: ik(guest("Washroom(3).png")), alt: "Bathroom vanity in grey marble", category: "Bathrooms", real: true },
  { src: ik(guest("washroom(6).png")), alt: "Rose-marble bathroom with wall-hung WC", category: "Bathrooms", real: true, tall: true },

  // ── Interiors (main building visualisations) ───────────────────────────────
  { src: ik(main("Sunlit Tropical Modern Living Room.png")), alt: "Living room with timber-framed glass doors opening to the trees", category: "Interiors", concept: true },
  { src: ik(main("Flowering Chandelier in a Brick Atrium.png")), alt: "Floral chandelier hanging in the brick atrium", category: "Interiors", concept: true },
  { src: ik(main("Sunlit Terracotta Stairwell with Floral Chandelier.png")), alt: "Terracotta stairwell with a floral chandelier and skylight", category: "Interiors", concept: true, tall: true },
  { src: ik(main("Sunlit Rustic Loft Bedroom.png")), alt: "Loft bedroom with exposed brick and a wall of windows", category: "Interiors", concept: true, tall: true },
  { src: ik(main("Sunlit Rustic Daybed Retreat.png")), alt: "Daybed beneath arched windows in a brick room", category: "Interiors", concept: true, tall: true },
  { src: ik(main("Sunlit Rustic Lounge with Floral Accents.png")), alt: "Lounge with wooden sofas, cushions and fresh flowers", category: "Interiors", concept: true },
  { src: ik(main("Sunlit Curved Atrium Staircase.png")), alt: "Curved staircase rising through the brick atrium", category: "Interiors", concept: true, tall: true },
  { src: ik(main("Sunlit Terracotta Bench Nook.png")), alt: "Built-in bench nook under a window", category: "Interiors", concept: true, tall: true },
  { src: ik(main("Chandelier Beneath the Amber Skylight.png")), alt: "Chandelier beneath the amber skylight", category: "Interiors", concept: true, tall: true },
  { src: ik(main("Sunlit Rustic Living Room Retreat.png")), alt: "Living room with timber furniture and garden views", category: "Interiors", concept: true, tall: true },
  { src: ik(main("Sunlit Tropical Biophilic Living Room.png")), alt: "Light-filled living room opening onto greenery", category: "Interiors", concept: true },
  { src: ik(main("Sunlit Walnut Window Nook.png")), alt: "Walnut window seat looking out to the farm", category: "Interiors", concept: true },
  { src: ik(main("Sunlit Modern Rustic Lounge.png")), alt: "Lounge with ceiling fan, sofa and tall windows", category: "Interiors", concept: true },
  { src: ik(main("Modern Rustic Reading Room.png")), alt: "Reading room with floor cushions and garden light", category: "Interiors", concept: true, tall: true },
  { src: ik(main("Sunlit Terracotta Mezzanine Corridor.png")), alt: "Mezzanine corridor in terracotta brick", category: "Interiors", concept: true, tall: true },
  { src: ik(main("Warm Rustic Curved Shelf Nook.png")), alt: "Curved shelving nook in warm brick", category: "Interiors", concept: true, tall: true },
  { src: ik(main("Modern Stone-Clad Bathroom with Vanity.png")), alt: "Stone-clad bathroom with a floating vanity", category: "Interiors", concept: true, tall: true },
  { src: ik(main("Modern Marble Wet-Room Bathroom.png")), alt: "Marble wet-room bathroom", category: "Interiors", concept: true, tall: true },

  // ── Kitchen ────────────────────────────────────────────────────────────────
  { src: ik(kitchen("Rustic Kitchen with Green Tile and Light.png")), alt: "Farm kitchen with green tiles and a timber counter", category: "Kitchen", concept: true, tall: true },
  { src: ik(kitchen("Refined Modern L-Shaped Kitchen.png")), alt: "L-shaped kitchen with dark cabinetry and garden windows", category: "Kitchen", concept: true },
  { src: ik(kitchen("Crisp Modern L-Shaped Kitchen.png")), alt: "Kitchen with blue tiles, white cabinets and built-in oven", category: "Kitchen", concept: true },
  { src: ik(kitchen("Modern Navy and Oak Kitchen Corner.png")), alt: "Navy and oak kitchen corner with a fridge and pantry", category: "Kitchen", concept: true },
];
