import type {
  Article,
  Destination,
  Experience,
  FestivalEvent,
  GalleryItem,
  StateInfo,
  Testimonial,
} from "@/lib/types";

export const SITE = {
  name: "Explore India",
  tagline: "A Billion Stories Await",
  description:
    "Independent route planning for festivals, heritage cities, wildlife trails, and slow travel moments across India.",
  url: "https://www.explore-india.example",
  email: "hello@exploreindia.example",
  phone: "+91 98765 43210",
};

export const REGIONS = [
  "North",
  "South",
  "East",
  "West",
  "Northeast",
  "Central",
] as const;

export const THEMES = [
  "Heritage & Culture",
  "Beaches & Islands",
  "Hill Stations",
  "Wildlife & Nature",
  "Spiritual & Pilgrimage",
  "Adventure & Trekking",
  "Cuisine & Food Trails",
] as const;

export const EXPERIENCE_CATEGORIES = [
  "Festivals",
  "Wellness & Yoga",
  "Art & Crafts",
  "Train Journeys",
  "River Cruises",
  "Desert Safaris",
] as const;

export const heroSlides = [
  {
    id: "jaipur-dusk",
    title: "Write the map with a slower pulse.",
    subtitle: "Heritage cities",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "leh-highland",
    title: "Ride high passes, long light, and deep silence.",
    subtitle: "Mountain routes",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "kerala-backwaters",
    title: "Trade rush for river mornings and old houses.",
    subtitle: "Backwaters & coasts",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

export const destinations: Destination[] = [
  {
    id: "jaipur",
    slug: "jaipur",
    name: "Jaipur",
    nameHi: "जयपुर",
    state: "Rajasthan",
    stateSlug: "rajasthan",
    region: "North",
    themes: ["Heritage & Culture", "Cuisine & Food Trails"],
    tagline: "Pink sandstone lanes, palace stories, and rooftop dinners.",
    summary: "A city of courtyards and craft traditions, paced for markets, forts, and evening walks.",
    description:
      "Jaipur pairs dramatic architecture with a deeply lived urban rhythm. Start in the old city for bazaars and havelis, then move slowly between forts, museums, and hidden cafés that open after dark.",
    bestTime: "October to March",
    duration: "3 to 5 days",
    budget: "Mid-range",
    highlights: ["Amer Fort", "Hawa Mahal", "Johri Bazaar", "Chokhi Dhani"],
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=900&q=80",
    ],
    status: "PEAK WEEK",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    featured: true,
  },
  {
    id: "leh",
    slug: "leh",
    name: "Leh",
    nameHi: "लेह",
    state: "Ladakh",
    stateSlug: "ladakh",
    region: "North",
    themes: ["Adventure & Trekking", "Hill Stations", "Spiritual & Pilgrimage"],
    tagline: "High desert air, prayer flags, and long, open roads.",
    summary: "A cold, luminous landscape made for monasteries, passes, and slow acclimatization.",
    description:
      "Leh rewards thoughtful pacing. The mountain air changes the rhythm of the day, and the best trips balance cultural visits with road days, short hikes, and room for altitude adjustment.",
    bestTime: "June to September",
    duration: "4 to 7 days",
    budget: "Mid-range",
    highlights: ["Shanti Stupa", "Magnetic Hill", "Thiksey Monastery", "Pangong Lake"],
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=900&q=80",
    ],
    status: "OPEN ROUTES",
    coordinates: { lat: 34.1526, lng: 77.5772 },
    featured: true,
  },
  {
    id: "varanasi",
    slug: "varanasi",
    name: "Varanasi",
    nameHi: "वाराणसी",
    state: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    region: "North",
    themes: ["Spiritual & Pilgrimage", "Heritage & Culture", "Cuisine & Food Trails"],
    tagline: "Ghat walks, temple bells, and a river that never stops telling a story.",
    summary: "A city of ritual, memory, and luminous early-morning movement across the Ganga.",
    description:
      "Varanasi is less about checklists than atmosphere. The real experience comes from moving with the rhythm of the ghats, listening to chants, and letting the city open in layers rather than all at once.",
    bestTime: "October to March",
    duration: "2 to 4 days",
    budget: "Budget",
    highlights: ["Dashashwamedh Ghat", "Kashi Vishwanath", "Banaras Silk", "Sunrise boat ride"],
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80",
    ],
    status: "FESTIVAL NOW",
    coordinates: { lat: 25.3176, lng: 82.9739 },
    featured: true,
  },
  {
    id: "munnar",
    slug: "munnar",
    name: "Munnar",
    nameHi: "മുന്നാർ",
    state: "Kerala",
    stateSlug: "kerala",
    region: "South",
    themes: ["Hill Stations", "Wildlife & Nature", "Cuisine & Food Trails"],
    tagline: "Tea gardens, misty roads, and a slower cliffside rhythm.",
    summary: "Cooler air, rolling plantations, and easy-to-love waterfalls in South India.",
    description:
      "Munnar feels suspended between forest and farm. There are viewpoints, walking trails, and a gentle pace that makes it ideal for a reset between longer city circuits.",
    bestTime: "September to May",
    duration: "3 to 5 days",
    budget: "Mid-range",
    highlights: ["Tea Museum", "Anamudi Peak", "Eravikulam National Park", "Attukal Waterfalls"],
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    ],
    status: "IN SEASON",
    coordinates: { lat: 10.0889, lng: 77.0595 },
    featured: true,
  },
  {
    id: "goa",
    slug: "goa",
    name: "Goa",
    nameHi: "गोवा",
    state: "Goa",
    stateSlug: "goa",
    region: "West",
    themes: ["Beaches & Islands", "Cuisine & Food Trails", "Heritage & Culture"],
    tagline: "Golden beaches, Portuguese corners, and all-day sea light.",
    summary: "A naturally spread-out coastal break with churches, markets, and easy beach hopping.",
    description:
      "Goa works whether you want a straightforward beach stay or a layered route through old quarter lanes, seafood shacks, and cliffs at sunset. It is easiest to enjoy when the itinerary leaves room for drift.",
    bestTime: "November to February",
    duration: "3 to 6 days",
    budget: "Mid-range",
    highlights: ["Baga Beach", "Old Goa churches", "Palolem", "Anjuna Flea Market"],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
    ],
    status: "IN SEASON",
    coordinates: { lat: 15.2993, lng: 74.1239 },
    featured: true,
  },
  {
    id: "kaziranga",
    slug: "kaziranga",
    name: "Kaziranga",
    nameHi: "কাজিরাঙা",
    state: "Assam",
    stateSlug: "assam",
    region: "Northeast",
    themes: ["Wildlife & Nature", "Adventure & Trekking"],
    tagline: "Grassland drives, riverside stays, and big-cat sightings at dawn.",
    summary: "One of India’s most rewarding wildlife routes, best understood with early starts and quiet patience.",
    description:
      "Kaziranga is a place to trust the rhythm of the day. Elephant and jeep safaris, riverside stays, and forest roads create a complete wild-India circuit without overpacking the schedule.",
    bestTime: "November to April",
    duration: "2 to 4 days",
    budget: "Mid-range",
    highlights: ["Rhino safari", "Mihimukh", "River cruise", "Folk music evening"],
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    ],
    status: "OPEN ROUTES",
    coordinates: { lat: 26.5775, lng: 93.1711 },
    featured: true,
  },
  {
    id: "puri",
    slug: "puri",
    name: "Puri",
    nameHi: "पुरी",
    state: "Odisha",
    stateSlug: "odisha",
    region: "East",
    themes: ["Spiritual & Pilgrimage", "Beaches & Islands", "Cuisine & Food Trails"],
    tagline: "Salt air, temple drums, and a long coastal evening.",
    summary: "An easygoing East Coast stop where beaches and temple rituals sit side by side.",
    description:
      "Puri balances spiritual rhythm with quiet seaside ease. The best visits combine temple mornings, local seafood, and a slow stretch of sand before sunset.",
    bestTime: "October to February",
    duration: "2 to 4 days",
    budget: "Budget",
    highlights: ["Jagannath Temple", "Sunset beach walk", "Raghurajpur crafts", "Seafood thali"],
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
    ],
    status: "FESTIVAL NOW",
    coordinates: { lat: 19.8135, lng: 85.8312 },
    featured: true,
  },
  {
    id: "khajuraho",
    slug: "khajuraho",
    name: "Khajuraho",
    nameHi: "खजुराहो",
    state: "Madhya Pradesh",
    stateSlug: "madhya-pradesh",
    region: "Central",
    themes: ["Heritage & Culture", "Adventure & Trekking"],
    tagline: "Stone carvings, deep quiet, and one of India’s most evocative temple circles.",
    summary: "A compact, high-value heritage route shaped around sculpture, sunsets, and local guides.",
    description:
      "Khajuraho works beautifully as a short stop between longer itineraries. It rewards early exploration, evening walks, and a good guide who can explain the visual storytelling in the carvings.",
    bestTime: "September to March",
    duration: "2 to 3 days",
    budget: "Mid-range",
    highlights: ["Western Group of Temples", "Light and sound show", "Local crafts", "Sunset viewpoint"],
    image:
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    ],
    status: "OPEN ROUTES",
    coordinates: { lat: 24.8318, lng: 79.9185 },
    featured: true,
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

export function getFeaturedDestinations() {
  return destinations.filter((d) => d.featured).slice(0, 8);
}

export const states: StateInfo[] = [
  {
    slug: "jammu-kashmir",
    name: "Jammu & Kashmir",
    region: "North",
    summary: "Alpine meadows, houseboats on serene Dal Lake, and snow-capped Pir Panjal peaks.",
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "ladakh",
    name: "Ladakh",
    region: "North",
    summary: "High-altitude roads, ancient Buddhist monasteries, and glacier-light desert landscapes.",
    image:
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: ["leh"],
  },
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    region: "North",
    summary: "Pine-scented mountain valleys, sacred rivers, and high Himalayan passes.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "punjab",
    name: "Punjab",
    region: "North",
    summary: "The golden reflection of Harmandir Sahib, fertile fields, and world-renowned culinary warmth.",
    image:
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "uttar-pradesh",
    name: "Uttar Pradesh",
    region: "North",
    summary: "Sacred ghats along the eternal Ganga, Mughal marble architecture, and ancient spiritual centers.",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: ["varanasi"],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    region: "North",
    summary: "Sandstone fortresses, desert dunes at dusk, and royal haveli traditions.",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: ["jaipur"],
  },
  {
    slug: "gujarat",
    name: "Gujarat",
    region: "West",
    summary: "The shimmering white salt desert of Kutch, ancient stepwells, and Asiatic lion reserves.",
    image:
      "https://images.unsplash.com/photo-1609137144820-7f2878d65a25?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "maharashtra",
    name: "Maharashtra",
    region: "West",
    summary: "Coastal sea forts, rock-cut UNESCO caves of Ajanta & Ellora, and vibrant urban energy.",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "goa",
    name: "Goa",
    region: "West",
    summary: "Golden palm-fringed sands, Portuguese colonial quarters, and laid-back coastal culture.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: ["goa"],
  },
  {
    slug: "karnataka",
    name: "Karnataka",
    region: "South",
    summary: "The carved stone ruins of Hampi, opulent palaces, and mist-covered coffee hills of Coorg.",
    image:
      "https://images.unsplash.com/photo-1600100397608-f010f44487b3?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "kerala",
    name: "Kerala",
    region: "South",
    summary: "Serene backwater lagoons, Ayurvedic wellness retreats, and emerald tea hill ranges.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: ["munnar"],
  },
  {
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    region: "South",
    summary: "Towering Dravidian temple gopurams, coastal shore heritage, and classical Carnatic arts.",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "andhra-pradesh",
    name: "Andhra Pradesh",
    region: "South",
    summary: "The grand red canyon of Gandikota, historic coastal temple towns, and fertile river deltas.",
    image:
      "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "telangana",
    name: "Telangana",
    region: "South",
    summary: "Historic Charminar architecture, massive granite forts, and rich royal culinary heritage.",
    image:
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "madhya-pradesh",
    name: "Madhya Pradesh",
    region: "Central",
    summary: "Sculpted stone temple marvels of Khajuraho, dense tiger reserves, and ancient stupas.",
    image:
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: ["khajuraho"],
  },
  {
    slug: "chhattisgarh",
    name: "Chhattisgarh",
    region: "Central",
    summary: "The majestic horseshoe curve of Chitrakote Falls and deep tribal heartland forests.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "odisha",
    name: "Odisha",
    region: "East",
    summary: "The gigantic chariot stone wheels of Konark Sun Temple, sacred coastline, and craft villages.",
    image:
      "https://images.unsplash.com/photo-1598890777032-bde17b8ec5a1?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: ["puri"],
  },
  {
    slug: "west-bengal",
    name: "West Bengal",
    region: "East",
    summary: "Colonial heritage facades, Darjeeling toy train views of Kanchenjunga, and Sundarban mangroves.",
    image:
      "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "bihar",
    name: "Bihar",
    region: "East",
    summary: "The revered Mahabodhi Tree of enlightenment, ancient Nalanda ruins, and sacred river trails.",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "jharkhand",
    name: "Jharkhand",
    region: "East",
    summary: "Cascading forest waterfalls, mineral-rich plateau hilltops, and lush national parks.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "assam",
    name: "Assam",
    region: "Northeast",
    summary: "Home of the great Indian one-horned rhino, mighty Brahmaputra river, and tea estates.",
    image:
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: ["kaziranga"],
  },
  {
    slug: "meghalaya",
    name: "Meghalaya",
    region: "Northeast",
    summary: "Living bio-engineered root bridges, cascading Nohkalikai waterfall, and clean cloud villages.",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "nagaland",
    name: "Nagaland",
    region: "Northeast",
    summary: "The vibrant Hornbill tribal festival, emerald Dzukou Valley, and mist-draped peaks.",
    image:
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "manipur",
    name: "Manipur",
    region: "Northeast",
    summary: "The world's only floating national park on pristine Loktak Lake with rich cultural arts.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "mizoram",
    name: "Mizoram",
    region: "Northeast",
    summary: "Evergreen rolling hills, dramatic Vantawng waterfall, and tranquil bamboo-clad villages.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "tripura",
    name: "Tripura",
    region: "Northeast",
    summary: "The floating palace of Neermahal on Rudrasagar Lake and ancient rock-carved Unakoti.",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    region: "Northeast",
    summary: "Perched high-altitude Tawang Buddhist monastery, Sela snow pass, and dawn-lit Himalayan peaks.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "sikkim",
    name: "Sikkim",
    region: "Northeast",
    summary: "High-altitude glacial lakes, sacred Kanchenjunga panoramas, and orchid-lined trails.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    region: "North",
    summary: "Rishikesh yoga sanctuaries along sacred Ganga, Valley of Flowers, and Garhwal Himalayas.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "haryana",
    name: "Haryana",
    region: "North",
    summary: "Sacred mythological water sarovars of Kurukshetra and peaceful wetland bird sanctuaries.",
    image:
      "https://images.unsplash.com/photo-1500382017468-f049863256f0?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
  {
    slug: "delhi",
    name: "Delhi",
    region: "North",
    summary: "Monumental Mughal gates, ancient minarets, lush gardens, and centuries of capital history.",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    destinationSlugs: [],
  },
];

export function getState(slug: string) {
  return states.find((state) => state.slug === slug);
}

export const experiences: Experience[] = [
  {
    id: "holi-rajasthan",
    slug: "holi-rajasthan",
    title: "Holi in Rajasthan",
    category: "Festivals",
    region: "North",
    summary: "A color-soaked festival route shaped by rooftop breakfasts and folk music.",
    description:
      "Experience the late-winter festival in Jaipur and nearby towns with local hosts, small-group processions, and food stops built around the city’s vibrant street life.",
    duration: "3 days",
    season: "March",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Color procession", "Heritage haveli stay", "Local sweets", "Music evening"],
  },
  {
    id: "ayurveda-kerala",
    slug: "ayurveda-kerala",
    title: "Ayurveda Reset in Kerala",
    category: "Wellness & Yoga",
    region: "South",
    summary: "A slow reset with herbal treatments, yoga, and quiet river mornings.",
    description:
      "Begin with gentle practice and restorative therapies in a setting that focuses on breath, temple gardens, and unhurried time near the water.",
    duration: "5 days",
    season: "Year-round",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Daily yoga", "Herbal treatment", "Riverfront meals", "Nature walks"],
  },
  {
    id: "crafts-udaipur",
    slug: "crafts-udaipur",
    title: "Block Print & Blue Pottery Workshops",
    category: "Art & Crafts",
    region: "North",
    summary: "Hands-on studio time with artisans, processes, and local design stories.",
    description:
      "From block printing to pottery, these workshops give travelers a practical route into the textures and techniques behind regional craft economies.",
    duration: "2 days",
    season: "October to March",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Workshop access", "Local artisan studio", "Craft market", "Material stories"],
  },
  {
    id: "rail-kashmir",
    slug: "rail-kashmir",
    title: "Mountain Rail Loop",
    category: "Train Journeys",
    region: "North",
    summary: "A scenic rail passage with stopovers in valleys, hill towns, and tea houses.",
    description:
      "Use the rails to move with more room than a road itinerary gives you, opening the way for small-town stops and photograph-friendly towns.",
    duration: "4 days",
    season: "April to October",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Window seat views", "Tea stops", "Hill town stays", "Local storytelling"],
  },
  {
    id: "brahmaputra-river",
    slug: "brahmaputra-river",
    title: "Brahmaputra River Cruise",
    category: "River Cruises",
    region: "Northeast",
    summary: "A flexible river route shaped by birdlife, villages, and island mornings.",
    description:
      "Move between riverbanks and ferry towns with a cruise schedule that leaves space for the region’s pace and its layered sounds.",
    duration: "3 days",
    season: "November to March",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Sunrise cruise", "Riverbank villages", "Birdwatching", "Local meals"],
  },
  {
    id: "desert-safari-jaisalmer",
    slug: "desert-safari-jaisalmer",
    title: "Desert Safari in Jaisalmer",
    category: "Desert Safaris",
    region: "North",
    summary: "Golden-hour drives, camel trails, and twilight camp meals under an open sky.",
    description:
      "Set out at dusk for the sands and stay long enough to feel the deeper quiet of the desert beyond the photo stops.",
    duration: "2 days",
    season: "October to March",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Camel safari", "Camp dinner", "Stargazing", "Folk performance"],
  },
];

export function getExperience(slug: string) {
  return experiences.find((exp) => exp.slug === slug);
}

export const articles: Article[] = [
  {
    id: "railways-quiet",
    slug: "railways-quiet",
    title: "Why the quietest itineraries often start on the rails",
    excerpt: "Long-distance trains can be the difference between a checklist and a real rhythm.",
    category: "Travel Notes",
    author: "Aarav Mehta",
    date: "2025-01-11",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=80",
    content: [
      "The best India journeys usually begin not with a booking engine but with a decision about tempo. Trains make room for conversation, observation, and the kind of unplanned break that eventually becomes the memory you keep.",
      "A slow route allows scenery to become part of the story. You notice the tea stall at the platform edge, the family boarding with a suitcase tied with bright cloth, the way the evening light changes before a station arrives.",
      "For many travelers, a rail leg is the cue to stop forcing the itinerary into a perfect shape. Let the train create the structure; add only the stops that matter most.",
    ],
    pullQuote: "The train is not just transport — it is part of the route’s atmosphere.",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    ],
    relatedSlugs: ["festival-rituals", "market-lanterns"],
    tags: ["trains", "slow travel", "routes"],
  },
  {
    id: "festival-rituals",
    slug: "festival-rituals",
    title: "Festival rituals that are worth arriving early for",
    excerpt: "The first hour of a festival is often the most honest version of the city.",
    category: "Culture",
    author: "Nisha Sen",
    date: "2025-02-25",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Crowds are part of the event, but they are not the whole experience. The texture of a festival usually arrives in the quiet before the music, in the stencil of the lanterns, in the rhythm of preparing the first dish that belongs to that day.",
      "Arriving early invites connection rather than performance. You may catch the first prayers, the first cup of chai cooling near a temple wall, or a procession taking shape before the main streets fill up.",
      "This kind of timing makes the city feel less like a backdrop and more like a living host. Festival travel works best when it leaves room for those margins.",
    ],
    pullQuote: "You do not visit a festival for the spectacle alone; you go for the tempo of the day.",
    gallery: [
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    ],
    relatedSlugs: ["railways-quiet", "market-lanterns"],
    tags: ["festivals", "culture", "timing"],
  },
  {
    id: "market-lanterns",
    slug: "market-lanterns",
    title: "The markets that glow after sunset",
    excerpt: "The best bazaar evenings are the ones where the night itself starts telling you where to go.",
    category: "Street Life",
    author: "Kabir Rao",
    date: "2025-03-17",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    content: [
      "A lot of travelers think of markets in terms of shopping lists, but in India the evening bazaar is often a better guide to a city than any tour page. The best ones are layered: food, conversation, craft, and the slowly moving light of dusk.",
      "Before you buy, spend time noticing how people move through the space. Where do they stop for chai? Where are the lanes lined with perfume and metal? That pattern tells you how the neighbourhood is lived in.",
      "The real magic often happens after sunset, once the stall lights turn on and the whole block becomes more intimate, more talkative, and more memorable.",
    ],
    pullQuote: "Night markets are not destinations; they are the city’s most honest conversation.",
    gallery: [
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    ],
    relatedSlugs: ["railways-quiet", "festival-rituals"],
    tags: ["markets", "night", "bazaars"],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export const events: FestivalEvent[] = [
  {
    id: "diwali-delhi",
    slug: "diwali-delhi",
    name: "Diwali in Delhi",
    location: "Delhi",
    region: "North",
    startDate: "2025-10-20",
    endDate: "2025-10-22",
    description: "Lantern-lit evenings, sweets, and rooftop views of the city’s festive glow.",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    month: 10,
  },
  {
    id: "navratri-ahmedabad",
    slug: "navratri-ahmedabad",
    name: "Navratri in Ahmedabad",
    location: "Ahmedabad",
    region: "West",
    startDate: "2025-09-22",
    endDate: "2025-10-02",
    description: "Garba nights, community circles, and a city that turns movement into celebration.",
    image:
      "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1200&q=80",
    month: 9,
  },
  {
    id: "bihu-assam",
    slug: "bihu-assam",
    name: "Bihu Festival",
    location: "Assam",
    region: "Northeast",
    startDate: "2025-04-14",
    endDate: "2025-04-17",
    description: "A spring celebration of music, food, and a deeply rooted rural rhythm.",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    month: 4,
  },
  {
    id: "tulip-gulmarg",
    slug: "tulip-gulmarg",
    name: "Tulip Festival, Gulmarg",
    location: "Gulmarg",
    region: "North",
    startDate: "2025-04-18",
    endDate: "2025-05-10",
    description: "Fields of color, alpine air, and a landscape designed for gentle hours.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    month: 4,
  },
];

export const gallery: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Blue hour in Jaipur",
    caption: "Courtyard light cutting down the pink walls.",
    category: "Heritage & Culture",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=80",
    location: "Jaipur, Rajasthan",
  },
  {
    id: "gallery-2",
    title: "Riverside calm",
    caption: "A slow morning along the backwaters.",
    category: "Coastal Life",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    location: "Kerala",
  },
  {
    id: "gallery-3",
    title: "Tea terraces",
    caption: "Mist over a working tea estate.",
    category: "Hill Stations",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    location: "Munnar, Kerala",
  },
  {
    id: "gallery-4",
    title: "Golden shore",
    caption: "A beach day with all the room in the world.",
    category: "Beaches & Islands",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    location: "Goa",
  },
  {
    id: "gallery-5",
    title: "Forest edge",
    caption: "Wildlife sightings before the day gets fully warm.",
    category: "Wildlife & Nature",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    location: "Kaziranga, Assam",
  },
  {
    id: "gallery-6",
    title: "Temple bells",
    caption: "A call to the morning across the river.",
    category: "Spiritual & Pilgrimage",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    location: "Varanasi, Uttar Pradesh",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ananya S.",
    location: "Mumbai",
    trip: "Golden Triangle + Rajasthan",
    quote:
      "The route felt paced for real life, not a faked brochure. Every stop had a reason, and the travel notes felt human.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "t2",
    name: "Rahul P.",
    location: "Bengaluru",
    trip: "Kerala & Tamil Nadu",
    quote:
      "We loved how the platform mixed practical planning with local character. It felt like a friend who knew the roads well.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "t3",
    name: "Meera N.",
    location: "New Delhi",
    trip: "Leh & Ladakh",
    quote:
      "A thoughtful itinerary for a place where altitude and weather matter. It gave us confidence without making the trip feel rigid.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
  },
];

export const faqs = [
  {
    q: "Do I need a long lead time for a first trip to India?",
    a: "For most first-time itineraries, planning 6–10 weeks ahead helps with flights, trains, and festival timing. For remote mountain routes, a little more lead time is useful because weather and road conditions shift quickly.",
  },
  {
    q: "Is it better to build a city stay and a nature stop together?",
    a: "Usually yes, especially if the trip is under 10 days. Pairing one dense city with a quieter landscape gives contrast without making the route too fragmented.",
  },
  {
    q: "How flexible should I be with scenery and weather?",
    a: "Very flexible in mountain and monsoon regions. Those routes reward a weather-aware approach more than a fixed checklist, especially if you want good light and slower travel.",
  },
];

export const travelEssentials = [
  {
    title: "Passport & visa",
    body: "Keep passport copies, note visa requirements, and verify the latest advisory before booking flights or train segments.",
    icon: "passport",
  },
  {
    title: "Best time windows",
    body: "India’s climate shifts dramatically by region. Mountain routes are best in shoulder seasons, while the deserts and coasts respond to winter dryness.",
    icon: "calendar",
  },
  {
    title: "Budget rhythm",
    body: "Set a realistic daily cap for transport, food, and local guide costs before adding special experiences or premium stays.",
    icon: "wallet",
  },
  {
    title: "Health & safety",
    body: "Carry a refillable water bottle, check local advice for weather alerts, and keep emergency contacts written down offline.",
    icon: "shield",
  },
  {
    title: "Rail planning",
    body: "When you can, reserve long-distance seats in advance and leave a little extra buffer around station transfers.",
    icon: "train",
  },
  {
    title: "Travel style",
    body: "A slower route usually feels even better than a packed check list. Save one flexible half-day for a neighborhood you did not expect to love.",
    icon: "heart",
  },
];

export function getDepartures() {
  return [
    { code: "EX 2046", destination: "Jaipur", slug: "jaipur", region: "North", status: "ON TIME", platform: "3" },
    { code: "IN 403", destination: "Leh", slug: "leh", region: "North", status: "DELAY 15M", platform: "7" },
    { code: "KL 218", destination: "Munnar", slug: "munnar", region: "South", status: "ON TIME", platform: "5" },
    { code: "WR 511", destination: "Goa", slug: "goa", region: "West", status: "BOARDING", platform: "1" },
    { code: "NE 730", destination: "Kaziranga", slug: "kaziranga", region: "Northeast", status: "ON TIME", platform: "2" },
    { code: "EJ 129", destination: "Puri", slug: "puri", region: "East", status: "ON TIME", platform: "6" },
  ];
}
