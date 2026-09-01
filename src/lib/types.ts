export type Region =
  | "North"
  | "South"
  | "East"
  | "West"
  | "Northeast"
  | "Central";

export type Theme =
  | "Heritage & Culture"
  | "Beaches & Islands"
  | "Hill Stations"
  | "Wildlife & Nature"
  | "Spiritual & Pilgrimage"
  | "Adventure & Trekking"
  | "Cuisine & Food Trails"
  | "Luxury Escapes"
  | "Wellness & Yoga"
  | "Hidden Gems"
  | "Village Experiences"
  | "Romantic"
  | "Family"
  | "Nature"
  | "Festivals";

export type ExperienceCategory =
  | "Local Food"
  | "Culture"
  | "Adventure"
  | "Wildlife"
  | "Heritage"
  | "Spiritual"
  | "Festivals"
  | "Village Experiences"
  | "Handicrafts"
  | "Nature";

export type BudgetTier = "Budget" | "Moderate" | "Premium" | "Luxury";

export type TravelStyle = "Relaxed" | "Balanced" | "Fast-paced";

export type AccommodationPreference =
  | "Hostel"
  | "Homestay"
  | "Hotel"
  | "Resort"
  | "Heritage Palace"
  | "Luxury";

export type TransportPreference =
  | "Public Transport"
  | "Bus"
  | "Train"
  | "Private Car / Taxi"
  | "Flight"
  | "Rental Scooter / Bike";

export type Language =
  | "en"
  | "hi"
  | "ta"
  | "bn"
  | "te"
  | "kn"
  | "ml"
  | "mr"
  | "gu"
  | "pa"
  | "zh-CN"
  | "zh"
  | "zh-TW"
  | "or"
  | "od"
  | (string & {});

export interface CuisineItem {
  name: string;
  description: string;
  image: string;
  mustTry?: boolean;
}

export interface MarketItem {
  name: string;
  location: string;
  specialty: string;
  timings: string;
  priceRange: "Budget" | "Mid" | "Premium";
}

export interface NearbyAttraction {
  name: string;
  distance: string;
  type: string;
  image?: string;
}

export interface WeatherMonth {
  month: string;
  tempHigh: number;
  tempLow: number;
  rainfall: number;
  recommendation: string;
}

export type MonthWeather = WeatherMonth;

export interface PhotographyGuide {
  bestSpots: string[];
  bestTime: string;
  tips: string[];
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  nameHi?: string;
  state: string;
  stateSlug: string;
  region: Region;
  themes: Theme[];
  tagline: string;
  summary: string;
  description: string;
  bestTime: string;
  duration: string;
  budget: "Budget" | "Mid-range" | "Luxury" | "Moderate" | "Premium";
  averageDailyBudget?: number;
  rating?: number;
  highlights: string[];
  image: string;
  gallery: string[];
  status?: "IN SEASON" | "FESTIVAL NOW" | "PEAK WEEK" | "OPEN ROUTES" | "MONSOON MAGIC" | "HIDDEN GEM";
  coordinates: { lat: number; lng: number };
  featured?: boolean;
  isHiddenGem?: boolean;
  crowdLevel?: "Low / Serene" | "Moderate" | "High" | "Very High";
  whyVisitHiddenGem?: string;
  
  // Extended Content
  significance?: string;
  history?: string;
  mythology?: string;
  architecture?: string;
  howToReach?: {
    air: string;
    rail: string;
    road: string;
  };
  placesToVisit?: Array<{
    name: string;
    type: string;
    description: string;
    timings: string;
    entryFee?: string;
  }>;
  localCuisine: CuisineItem[];
  localMarkets: MarketItem[];
  nearbyAttractions: NearbyAttraction[];
  travelTips: string[];
  safetyInfo?: {
    emergencyNumber?: string;
    tips: string[];
    womenSafetyRating?: "High" | "Good" | "Moderate";
    soloTravelRating?: "High" | "Good" | "Moderate";
  };
  dosAndDonts?: { dos: string[]; donts: string[] };
  accessibility?: { wheelchairFriendly: boolean; elderlyFriendly: boolean; familyFriendly: boolean };
  weather: WeatherMonth[];
  photography?: PhotographyGuide;
  festivalsCelebrated?: string[];
  lastUpdated?: string;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  category: ExperienceCategory;
  destination: string;
  destinationSlug: string;
  state: string;
  region?: Region | string;
  season?: string;
  bestSeason?: string;
  duration: string;
  priceRange: string;
  estimatedPrice: number;
  rating: number;
  reviewsCount?: number;
  image: string;
  summary?: string;
  description: string;
  highlights: string[];
  included: string[];
  verified?: boolean;
}

export interface FestivalEvent {
  id: string;
  slug: string;
  name: string;
  nameHi?: string;
  type: "festival" | "fair" | "music" | "food" | "cultural" | "religious";
  location: string;
  state: string;
  region?: Region | string;
  date: {
    startDate: string;
    endDate: string;
    month: string;
    approximateString: string;
  };
  startDate?: string;
  endDate?: string;
  month?: string;
  image: string;
  description: string;
  category: string;
  significance: string;
  rituals?: string[];
  entryFee?: string;
}

export interface Festival {
  id: string;
  slug: string;
  name: string;
  nameHi?: string;
  nameInRegionalLanguage?: string;
  type: "religious" | "cultural" | "harvest" | "seasonal";
  religion?: string;
  region: Region[];
  states: string[];
  date: {
    type: "fixed" | "lunar" | "seasonal";
    gregorianApprox: string;
    month: string;
  };
  duration: string;
  significance: string;
  history: string;
  rituals: { name: string; description: string; image?: string }[];
  foods: { name: string; description: string; image?: string }[];
  music: string[];
  dance: string[];
  dress: string;
  greetings: { language: string; greeting: string }[];
  bestPlacesToCelebrate: {
    place: string;
    state: string;
    whySpecial: string;
    destinationSlug?: string;
  }[];
  touristInfo: {
    canTouristsParticipate: boolean;
    tips: string[];
    whatToWear: string;
    whatToBring: string[];
  };
  gallery: string[];
  relatedDestinations: string[];
}

export interface LocalBusiness {
  id: string;
  name: string;
  category: "Local Guide" | "Homestay" | "Restaurant" | "Transport Provider" | "Activity Provider" | "Handicrafts & Art";
  location: string;
  state: string;
  destinationSlug: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  phone?: string;
  email?: string;
  website?: string;
  whatsapp?: string;
  contact?: {
    phone: string;
    email?: string;
    website?: string;
    whatsapp?: string;
  };
  priceRange: string;
  verified: boolean;
  features: string[];
}

// AI Trip Planning Interfaces
export interface AIActivityItem {
  time: string;
  title: string;
  type: "attraction" | "meal" | "experience" | "transit" | "hotel" | "leisure";
  description: string;
  location: string;
  estimatedCost: number;
  durationMinutes: number;
  whyRecommended?: string;
  icon?: string;
}

export interface AIDayPlan {
  day: number;
  date?: string;
  theme: string;
  routeSequence: string[];
  activities: AIActivityItem[];
  stay: {
    name: string;
    type: string;
    estimatedCost: number;
    description: string;
  };
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  dayEstimatedCost: number;
  travelTimeHours: number;
}

export interface TripBudgetBreakdown {
  stay: number;
  travel: number;
  food: number;
  activities: number;
  localTransport: number;
  miscellaneous: number;
  total: number;
  currency: string;
}

export interface AIGeneratedItinerary {
  id: string;
  title: string;
  destination: string;
  destinationSlugs: string[];
  state?: string;
  durationDays: number;
  travellersCount: number;
  budgetTier: BudgetTier;
  travelStyle: TravelStyle;
  summary: string;
  days: AIDayPlan[];
  budgetBreakdown: TripBudgetBreakdown;
  optimizedRoute: {
    summary: string;
    stops: string[];
    totalDistanceKm: number;
    recommendedTransport: string;
  };
  recommendedReasons: string[];
  hiddenGemsIncluded: string[];
  safetyTips: string[];
  packingAdvice: string[];
  createdAt: string;
}

export interface ReviewItem {
  id: number | string;
  targetSlug?: string;
  destinationSlug?: string;
  userName?: string;
  authorName?: string;
  userEmail?: string;
  rating: number;
  title?: string;
  comment?: string;
  content?: string;
  photos?: string[];
  helpful?: number;
  helpfulCount?: number;
  createdAt: string;
  verifiedReview?: boolean;
}

export interface StateDetails {
  slug: string;
  name: string;
  capital: string;
  region: Region;
  description: string;
  summary: string;
  culture: string;
  cuisine: string[];
  festivals: string[];
  transportHubs: {
    airport: string;
    railway: string;
    highways: string[];
  };
  itineraries: Array<{
    title: string;
    days: number;
    route: string[];
    summary: string;
  }>;
  image: string;
  coordinates: { lat: number; lng: number };
  destinationSlugs: string[];
}

export interface Train {
  id: string;
  name: string;
  number: string;
  type: string;
  route: { from: string; to: string; via: string[] };
  duration: string;
  frequency: string;
  classes: Array<{ name: string; price: number; amenities: string[] }>;
  image: string;
  scenicScore: number;
  bookingUrl: string;
}

export interface Bus {
  id: string;
  operator: string;
  type: string;
  route: string;
  duration: string;
  price: number;
  amenities: string[];
}

export interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  terminalInfo: string;
  connections: string[];
}

export interface Hotel {
  id: string;
  name: string;
  destinationSlug: string;
  category: string;
  pricePerNight: string;
  rating: number;
  image: string;
  description: string;
}

export interface Shop {
  id: string;
  name: string;
  destinationSlug: string;
  specialty: string;
  address: string;
}

export interface Article {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  content: string[];
  pullQuote?: string;
  gallery?: string[];
  tags: string[];
  relatedSlugs?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  caption?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  destination: string;
  trip?: string;
  rating: number;
  image?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  stay: string;
  meals: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: "documents" | "clothing" | "health" | "electronics" | "toiletries";
  seasons: Array<"summer" | "monsoon" | "winter" | "himalayan">;
  required: boolean;
  notes?: string;
}

export interface HindiPhrase {
  id: string;
  english: string;
  hindiScript: string;
  transliteration: string;
  category: "basics" | "food" | "shopping" | "transport" | "emergency";
  audioText?: string;
}

export interface LanguageTranslation {
  languageCode: string;
  langCode: string;
  languageName: string;
  name: string;
  nativeName: string;
  speechVoiceTag: string;
  voiceLang: string;
  narrativeText: string;
  content: string;
}

export type StateInfo = StateDetails;

export interface SearchResult {
  id: string;
  slug?: string;
  title: string;
  type: "destination" | "festival" | "state" | "train" | "experience" | "article" | "business";
  subtitle: string;
  href: string;
  image?: string;
  category?: string;
}
