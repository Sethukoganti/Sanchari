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
  | "Cuisine & Food Trails";

export type ExperienceCategory =
  | "Festivals"
  | "Wellness & Yoga"
  | "Art & Crafts"
  | "Train Journeys"
  | "River Cruises"
  | "Desert Safaris";

export type { LanguageInfo } from "@/lib/languages";

export type Language =
  // Popular / Default
  | "en"
  // All 22 Scheduled Indian Languages
  | "hi" | "bn" | "te" | "mr" | "ta" | "gu" | "kn" | "ml" | "or" | "od" | "pa" | "as"
  | "ur" | "sa" | "mai" | "kok" | "ne" | "sd" | "doi" | "ks" | "mni" | "sat" | "brx"
  // Popular International Languages
  | "es" | "fr" | "de" | "ja" | "zh" | "zh-CN" | "zh-TW" | "ru" | "pt" | "it" | "ko"
  | "ar" | "th" | "vi" | "id" | "tr" | "nl" | "fa" | "pl" | "sv" | "he" | "el";

export interface Destination {
  id: string;
  slug: string;
  name: string;
  nameHi: string;
  state: string;
  stateSlug: string;
  region: Region;
  themes: Theme[];
  tagline: string;
  summary: string;
  description: string;
  bestTime: string;
  duration: string;
  budget: "Budget" | "Mid-range" | "Luxury";
  highlights: string[];
  image: string;
  gallery: string[];
  status: "IN SEASON" | "FESTIVAL NOW" | "PEAK WEEK" | "OPEN ROUTES" | "MONSOON MAGIC";
  coordinates: { lat: number; lng: number };
  featured?: boolean;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  category: ExperienceCategory;
  region: Region;
  summary: string;
  description: string;
  duration: string;
  season: string;
  image: string;
  highlights: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
  pullQuote: string;
  gallery: string[];
  relatedSlugs: string[];
  tags: string[];
}

export interface FestivalEvent {
  id: string;
  slug: string;
  name: string;
  location: string;
  region: Region;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
  month: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  image: string;
  location: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  trip: string;
  quote: string;
  rating: number;
  image: string;
}

export interface StateInfo {
  slug: string;
  name: string;
  region: Region;
  summary: string;
  image: string;
  destinationSlugs: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  stay: string;
  meals: string;
}

export interface SearchResult {
  type: "destination" | "article" | "experience" | "event";
  slug: string;
  title: string;
  subtitle: string;
  href: string;
  image?: string;
}
