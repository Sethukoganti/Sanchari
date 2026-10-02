export type Region = "North" | "South" | "East" | "West" | "Central" | "North East" | "Northeast";

export type Theme = string;

export type BudgetTier = "Budget" | "Moderate" | "Premium" | "Luxury";

export type TravelStyle = "Relaxed" | "Balanced" | "Fast-paced" | "Adventure" | "Spiritual" | "Cultural" | "Photography";

export type AccommodationPreference =
  | "Hotel"
  | "Homestay"
  | "Heritage Palace"
  | "Resort"
  | "Hostel"
  | "Luxury"
  | "Eco-Lodge"
  | "Boutique Hotel";

export type TransportPreference =
  | "Flight"
  | "Train"
  | "Private Car / Taxi"
  | "Bus"
  | "Rental Scooter / Bike"
  | "Self-drive Car"
  | "Public Transport";

export type Language =
  | "en"
  | "hi"
  | "te"
  | "ta"
  | "kn"
  | "ml"
  | "mr"
  | "bn"
  | "gu"
  | "pa"
  | "or"
  | "as"
  | "ne"
  | "sd"
  | "ur"
  | "sa"
  | "kok"
  | "mai"
  | "doi"
  | "ks"
  | "sat"
  | "brx"
  | "mni";

export type Season = "Winter" | "Summer" | "Monsoon" | "Post-Monsoon" | "Spring" | "Autumn";

export interface Destination {
  id: string;
  slug: string;
  name: string;
  nameHi?: string;
  tagline: string;
  state: string;
  stateSlug?: string;
  region: Region;
  summary: string;
  description: string;
  bestTimeToVisit?: string;
  bestTime?: string;
  idealDurationDays?: number;
  duration?: string;
  budget?: string;
  rating?: number;
  reviewsCount?: number;
  averageDailyCost?: number;
  averageDailyBudget?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  gallery: string[];
  themes: string[];
  highlights: string[];
  placesToVisit?: Array<{
    name: string;
    type: string;
    description: string;
    timings?: string;
    entryFee?: string;
    image?: string;
  }>;
  transportAccess?: {
    nearestAirport: string;
    airportDistanceKm: number;
    nearestRailwayStation: string;
    railwayDistanceKm: number;
    roadConnectivity: string;
  };
  howToReach?: {
    air?: string;
    rail?: string;
    road?: string;
  };
  localFoodSpecialities?: string[];
  localCuisine?: any;
  culturalSignificance?: string;
  sustainableTips?: string[];
  isHiddenGem?: boolean;
  crowdLevel?: "Low" | "Moderate" | "High" | "Low / Serene" | string;
  budgetTier?: BudgetTier;
  status?: string;
  significance?: string;
  history?: string;
  architecture?: string;
  localMarkets?: any[];
  monthlyWeather?: MonthWeather[];
  weather?: any;
  photography?: any;
  dosAndDonts?: any;
  featured?: boolean;
  whyVisitHiddenGem?: string;
  nearbyAttractions?: any[];
  travelTips?: string[];
}

export interface FestivalEvent {
  id: string;
  slug: string;
  name: string;
  nameHi?: string;
  nameInRegionalLanguage?: string;
  type?: "Cultural" | "Religious" | "Music & Dance" | "Harvest" | "Craft" | "Seasonal" | "music" | "cultural" | "religious" | string;
  category?: string;
  region?: any;
  states?: string[];
  location?: string;
  state?: string;
  date: {
    startDate?: string;
    endDate?: string;
    month?: string;
    approximateDates?: string;
    approximateString?: string;
    lunarSolarNote?: string;
    gregorianApprox?: string;
    type?: string;
  };
  startDate?: string;
  endDate?: string;
  month?: string;
  durationDays?: number;
  significance?: string;
  history?: string;
  ritualsAndHighlights?: string[];
  travelerTips?: string[];
  gallery?: string[];
  image?: string;
  heroImage?: string;
  featured?: boolean;
  upcomingDate?: string;
  nearestCity?: string;
  entryFee?: string;
  description?: string;
  religion?: string;
  duration?: string;
  rituals?: any[];
  foods?: any[];
  dress?: string;
  music?: any[];
  dance?: any[];
  greetings?: any[];
  bestPlacesToCelebrate?: any[];
  dosAndDonts?: any;
  touristInfo?: any;
  relatedDestinations?: string[];
}

export type Festival = FestivalEvent;

export interface AIActivityItem {
  time: string;
  title: string;
  type: "attraction" | "meal" | "experience" | "transit" | "leisure";
  description: string;
  location: string;
  estimatedCost: number;
  durationMinutes: number;
  whyRecommended?: string;
  bookingAction?: {
    type: "flight" | "train" | "bus" | "stay" | "food";
    label: string;
    link: string;
    estimatedCost?: number;
  };
}

export interface AIDayPlan {
  day: number;
  theme: string;
  routeSequence: string[];
  activities: AIActivityItem[];
  stay: {
    name: string;
    type: string;
    estimatedCost: number;
    description: string;
    bookingUrl?: string;
  };
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  dayEstimatedCost: number;
  travelTimeHours: number;
}

export interface AIGeneratedItinerary {
  id: string;
  title: string;
  destination: string;
  destinationSlugs: string[];
  state: string;
  durationDays: number;
  travellersCount: number;
  budgetTier: BudgetTier;
  travelStyle: TravelStyle;
  summary: string;
  days: AIDayPlan[];
  budgetBreakdown: {
    stay: number;
    travel: number;
    food: number;
    activities: number;
    localTransport: number;
    miscellaneous: number;
    total: number;
    currency: string;
  };
  smartBundle?: {
    flightCost: number;
    hotelCost: number;
    activitiesCost: number;
    foodCost: number;
    localTransportCost: number;
    totalBundlePrice: number;
    discountApplied: number;
  };
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
  culture?: string;
  cuisine?: string[];
  festivals?: string[];
  transportHubs?: {
    airport: string;
    railway: string;
    highways: string[];
  };
  gallery?: string[];
  relatedDestinations?: string[];
  destinationSlugs?: string[];
  highlights?: string[];
  touristFeatures?: string[];
  bestTimeToVisit?: string;
  itineraries?: Array<{ title: string; days: number; summary: string; route: string[] }>;
  image?: string;
  coordinates?: { lat: number; lng: number };
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

// --------------------------------------------------------
// TRANSPORT & STAY BOOKING TYPES
// --------------------------------------------------------

export interface FlightOption {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  logo?: string;
  fromCity: string;
  fromCode?: string;
  fromAirport?: string;
  toCity: string;
  toCode?: string;
  toAirport?: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails?: string;
  baggage?: any;
  price: number;
  refundable?: boolean;
  cabinClass?: string;
  seatsAvailable?: number;
  seatsLeft?: number;
  aircraft?: string;
  isBestOption?: boolean;
}

export interface TrainOption {
  id: string;
  trainName: string;
  trainNumber: string;
  fromStation: string;
  fromStationCode: string;
  toStation: string;
  toStationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  runningDays: string[];
  classes: Array<{
    className: "1A" | "2A" | "3A" | "SL" | "CC" | "EC" | string;
    fare: number;
    availabilityStatus: "AVAILABLE" | "RAC" | "WL";
    seatsAvailable: number;
  }>;
  isBestOption?: boolean;
}

export interface BusSeat {
  id: string;
  number: string;
  deck?: "lower" | "upper";
  row?: number;
  column?: number;
  type?: "sleeper" | "seater";
  status?: "available" | "selected" | "booked" | "ladies";
  isAvailable?: boolean;
  isLadiesOnly?: boolean;
  price: number;
}

export interface BusOption {
  id: string;
  operator: string;
  busType: string;
  fromCity: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  basePrice: number;
  seatsAvailable: number;
  boardingPoints: any[];
  droppingPoints: any[];
  amenities: string[];
  seats?: BusSeat[];
  seatLayout?: BusSeat[];
  totalSeats?: number;
  isBestOption?: boolean;
}

export interface HotelRoom {
  id: string;
  name: string;
  type: string;
  bedType: string;
  maxGuests: number;
  sizeSqFt: number;
  pricePerNight: number;
  originalPrice?: number;
  breakfastIncluded: boolean;
  freeCancellation: boolean;
  amenities: string[];
  image: string;
  availableCount?: number;
}

export interface HotelProperty {
  id: string;
  slug: string;
  name: string;
  destinationSlug: string;
  destinationName: string;
  state: string;
  location: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  rating: number;
  reviewsCount: number;
  propertyType: string;
  featuredImage: string;
  gallery: string[];
  description: string;
  pricePerNight: number;
  originalPrice?: number;
  breakfastIncluded: boolean;
  freeCancellation: boolean;
  amenities: string[];
  rooms: HotelRoom[];
  distanceFromCenter: string;
  badge?: string;
  isBestOption?: boolean;
}

export interface BookingPassenger {
  fullName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  seatNumber?: string;
  berthPreference?: string;
}

export interface UserBooking {
  id: string;
  bookingType: "flight" | "train" | "bus" | "stay";
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  referenceNumber: string;
  title: string;
  subtitle?: string;
  from?: string;
  to?: string;
  date: string;
  time?: string;
  passengersCount: number;
  passengers: BookingPassenger[];
  selectedClass?: string;
  selectedSeats?: string[];
  totalPrice: number;
  qrCodeData: string;
  createdAt: string;
  contactEmail: string;
  contactPhone?: string;
  stayDetails?: {
    hotelName: string;
    roomType: string;
    checkIn: string;
    checkOut: string;
    nights: number;
  };
}

export interface FoodPlace {
  id: string;
  name: string;
  destinationSlug: string;
  destinationName: string;
  cuisine: string;
  diet: "Vegetarian" | "Non-Vegetarian" | "Vegan" | "Satvik / Pure Veg";
  category: "Street Food" | "Heritage Kitchen" | "Traditional Thali" | "Cafes & Chai" | "Dessert House";
  priceRange: string;
  averageCostForTwo: number;
  rating: number;
  reviewsCount: number;
  image: string;
  address: string;
  openingHours: string;
  mustTryDishes: string[];
  description: string;
  coordinates?: { lat: number; lng: number };
  distanceFromCenter: string;
  isLocalFavourite?: boolean;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  category: string;
  destination: string;
  destinationSlug?: string;
  state: string;
  duration: string;
  priceRange: string;
  estimatedPrice: number;
  rating: number;
  image: string;
  description: string;
  highlights: string[];
  bestSeason?: string;
  itinerary?: any[];
  includes?: string[];
  included?: string[];
  reviewsCount?: number;
  verified: boolean;
}

export interface Article {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  image: string;
  date?: string;
  content?: any;
  body?: string;
  publishedDate?: string;
  publishDate?: string;
  pullQuote?: string;
  gallery?: string[];
  relatedSlugs?: string[];
}

export interface PackingItem {
  id: string;
  name: string;
  category: "documents" | "clothing" | "health" | "electronics" | "toiletries" | string;
  seasons: Array<"summer" | "monsoon" | "winter" | "himalayan" | string>;
  required: boolean;
  notes?: string;
}

export interface HindiPhrase {
  id: string;
  english: string;
  hindiScript: string;
  transliteration: string;
  category: "basics" | "food" | "shopping" | "transport" | "emergency" | string;
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

export interface SearchResult {
  id: string;
  slug?: string;
  title: string;
  type: "destination" | "festival" | "state" | "train" | "experience" | "article" | "business" | "hotel" | "food";
  subtitle: string;
  href: string;
  image?: string;
  category?: string;
}

export interface MonthWeather {
  month: string;
  tempHigh: number;
  tempLow: number;
  rainfall: number;
  description?: string;
  season?: string;
  recommendation?: string;
}

export interface GalleryItem {
  id?: string;
  image: string;
  caption?: string;
  title?: string;
  location?: string;
  state?: string;
  category: string;
  aspectRatio?: string;
  tags?: string[];
  photographer?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  image?: string;
  quote: string;
  role?: string;
  rating?: number;
  date?: string;
  trip?: string;
  destination?: string;
  destinationVisited?: string;
}

export interface Train {
  id: string;
  name: string;
  number: string;
  type: string;
  route: {
    from: string;
    to: string;
    via: string[];
  };
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

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[] | any[];
  stay?: string;
  meals?: string;
  location?: string;
}

export type StateInfo = StateDetails;
