import type {
  Article,
  Destination,
  Experience,
  FestivalEvent,
  GalleryItem,
  StateInfo,
  Testimonial,
} from "@/lib/types";

export { statesData, getState, getStatesByRegion } from "@/data/states";
export { destinationsData, getDestination, getFeaturedDestinations, getHiddenGems } from "@/data/destinations";
export { festivalsData, getFestival, getUpcomingFestivals } from "@/data/festivals";
export { experiencesData, getExperience, getExperiencesByCategory } from "@/data/experiences";
export { eventsData, getEventsByMonth } from "@/data/events";
export { businessesData, getBusinessesByCategory } from "@/data/businesses";
export { trainsData, busesData, airportsData, hotelsData, shopsData } from "@/data/transport";
export { destinationTranslations } from "@/data/translations";
export { packingChecklistData, hindiPhrasesData } from "@/data/travel-guide";

import { destinationsData } from "@/data/destinations";
import { statesData } from "@/data/states";
import { experiencesData } from "@/data/experiences";
import { eventsData } from "@/data/events";

export const destinations: Destination[] = destinationsData;
export const states: StateInfo[] = statesData;
export const experiences: Experience[] = experiencesData;
export const events: FestivalEvent[] = eventsData;

export const SITE = {
  name: "SANCHARI BHARAT",
  subName: "Explore India",
  tagline: "AI-powered discovery → personalised planning → smarter travel",
  description:
    "Discover 25+ iconic and hidden Indian destinations, 50+ living festivals, local verified businesses, and generate personalized day-wise AI itineraries.",
  url: "https://www.sancharibharat.example",
  email: "concierge@sancharibharat.example",
  phone: "+91 1800 11 1363",
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
  "Luxury Escapes",
  "Wellness & Yoga",
  "Hidden Gems",
  "Village Experiences",
  "Romantic",
  "Family",
  "Nature",
  "Festivals",
] as const;

export const EXPERIENCE_CATEGORIES = [
  "All",
  "Local Food",
  "Culture",
  "Adventure",
  "Wildlife",
  "Heritage",
  "Spiritual",
  "Festivals",
  "Village Experiences",
  "Handicrafts",
  "Nature",
] as const;

export const articles: Article[] = [
  {
    id: "art-1",
    slug: "slow-travel-kashi",
    title: "The Art of Slow Travel along the Ghats of Kashi",
    excerpt: "Why spending a week in Varanasi transforms your perspective on life, philosophy, and timeless sacred rhythms.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    category: "Spiritual Essay",
    readTime: "6 min read",
    date: "August 2026",
    author: "Aditi Sharma",
    content: [
      "To truly experience Varanasi, one must surrender all urgency. The city does not reveal its soul to the hurried traveler ticking checklist items between Dashashwamedh and Kashi Vishwanath.",
      "Instead, sit at Manikarnika or Assi at 5:00 AM as the mist rises off the sacred Ganga. Listen to the rhythmic splash of wooden oars and the distant chiming of temple bells.",
      "Slow down, drink chai from clay kulhads, and let the living philosophy of the world's oldest city settle into your consciousness.",
    ],
    pullQuote: "In Varanasi, eternity is not an abstract concept; it is the daily rhythm of life, light, and prayer.",
    gallery: [
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["Varanasi", "Spiritual", "Slow Travel", "Uttar Pradesh"],
    relatedSlugs: ["hidden-gem-araku-coffee"],
  },
  {
    id: "art-2",
    slug: "hidden-gem-araku-coffee",
    title: "Araku Valley: The High-Altitude Organic Coffee Sanctuary",
    excerpt: "How indigenous tribal farmers transformed Eastern Ghats slopes into an international award-winning coffee destination.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    category: "Hidden Gems",
    readTime: "5 min read",
    date: "July 2026",
    author: "Kalyan Varma",
    content: [
      "Winding through the Eastern Ghats aboard the glass-roof Vistadome train from Visakhapatnam, the landscape shifts from coastal plains to cool, mist-covered mountain valleys.",
      "Araku is home to indigenous tribal cooperatives cultivating pure organic Arabica coffee under native shade trees with zero chemical pesticides.",
      "Beyond the coffee plantations lie the 150-million-year-old Borra Caves and thundering Katiki waterfalls, creating an unhurried, crowd-free paradise.",
    ],
    pullQuote: "Every cup of Araku coffee directly empowers indigenous tribal families preserving their native mountain soil.",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["Araku Valley", "Hidden Gems", "Andhra Pradesh", "Sustainable Travel"],
    relatedSlugs: ["slow-travel-kashi"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Golden Hour at Amber Citadel",
    location: "Jaipur, Rajasthan",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    caption: "Amber Fort overlooking Maota Lake in Rajasthan.",
    featured: true,
  },
  {
    id: "g2",
    title: "Varanasi Evening Ganga Aarti",
    location: "Varanasi, Uttar Pradesh",
    category: "Spiritual",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    caption: "Sacred fire lamps lifted during evening prayer rituals on Dashashwamedh Ghat.",
    featured: true,
  },
  {
    id: "g3",
    title: "Kerala Backwater Kettuvallam",
    location: "Alleppey, Kerala",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    caption: "Traditional wooden houseboat cruising through Vembanad Lake.",
    featured: true,
  },
  {
    id: "g4",
    title: "Apatani Pine Valleys of Ziro",
    location: "Ziro Valley, Arunachal Pradesh",
    category: "Hidden Gem",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    caption: "Sustainable paddy fields and pine hills in Ziro.",
    featured: true,
  },
  {
    id: "g5",
    title: "Ancient Stone Chariot of Vittala",
    location: "Hampi, Karnataka",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80",
    caption: "Monolithic Vijayanagara stone chariot in Hampi.",
    featured: true,
  },
];

export const gallery = galleryItems;

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Elena Rostova",
    location: "Berlin, Germany",
    trip: "Rajasthan Circuit · 7 Days",
    quote: "Sanchari Bharat's AI planner crafted a 7-day Rajasthan itinerary that perfectly balanced major forts with quiet rural haveli stays. The time-slotted timeline and food recommendations were 100% spot on.",
    destination: "Rajasthan Circuit",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "t2",
    name: "Vikram Malhotra",
    location: "Mumbai, India",
    trip: "Araku Valley · 4 Days",
    quote: "Discovering Araku Valley through the Hidden Gems section was the highlight of our year. We stayed at a verified tribal homestay with zero tourist crowds and drank the freshest coffee of our lives.",
    destination: "Araku Valley",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "t3",
    name: "Dr. Rachel Chen",
    location: "Singapore",
    trip: "Varanasi & Rishikesh · 6 Days",
    quote: "The 'Why we recommend this' explanation feature gave us immense confidence in the AI suggestions. The emergency tips and offline Hindi phrases made our solo trip completely stress-free.",
    destination: "Varanasi & Rishikesh",
    rating: 5,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
];

export const travelEssentials = [
  {
    title: "Visas & e-Tourist Entry",
    icon: "passport",
    body: "Eligible international citizens should apply online for an Indian e-Visa (30 days double entry or 1 year multiple entry) 4 to 30 days prior to departure at indianvisaonline.gov.in.",
  },
  {
    title: "Currency, ATMs & UPI",
    icon: "wallet",
    body: "India is globally pioneering instant digital QR payments (UPI). International visitors can set up authorized foreign-tourist UPI wallets at airport booths to pay even roadside chai stalls.",
  },
  {
    title: "Health & Pure Water",
    icon: "shield",
    body: "Always drink sealed bottled RO-purified water or use portable UV filters. Dine at vibrant, busy local restaurants and street kitchens where dishes are freshly prepared on hot fires.",
  },
  {
    title: "Train Travel & FTQ Quota",
    icon: "train",
    body: "Book AC 1st, 2nd, or Executive classes on Indian Railways. Utilize the Foreign Tourist Quota (FTQ) at major railway station tourist bureaus for last-minute reserved berths.",
  },
];

export const faqs = [
  {
    q: "How does the Sanchari Bharat AI Trip Planner work?",
    a: "Our AI engine analyzes your selected destination, duration (1–30 days), budget tier, traveller count, interests, and travel pace to generate an optimized, day-wise timeline with route sequences, verified stays, and dynamic budget calculations.",
  },
  {
    q: "What makes Sanchari Bharat different from generic travel sites?",
    a: "We actively promote lesser-known Indian destinations (Hidden Gems) to prevent over-tourism, verify local tourism businesses with zero middleman commissions, provide transparent 'Why we recommend this' AI explanations, and integrate real-time travel safety intelligence.",
  },
  {
    q: "Can I customize the generated AI itinerary?",
    a: "Yes! You can modify hotel preferences, change transport options, adjust activities, recalculate budgets in real-time, print or download your plan, and save it to 'My Trips'.",
  },
];

export function getDepartures() {
  return [
    { code: "EXP-01", slug: "hyderabad", destination: "Hyderabad", region: "South", status: "On Time", platform: "PF 1" },
    { code: "EXP-02", slug: "jaipur", destination: "Jaipur", region: "West", status: "Boarding", platform: "PF 3" },
    { code: "EXP-03", slug: "varanasi", destination: "Varanasi", region: "North", status: "On Time", platform: "PF 2" },
    { code: "EXP-04", slug: "araku-valley", destination: "Araku Valley", region: "South", status: "On Time", platform: "PF 4" },
    { code: "EXP-05", slug: "goa", destination: "Goa", region: "West", status: "On Time", platform: "PF 5" },
  ];
}
