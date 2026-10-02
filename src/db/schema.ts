import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  jsonb,
  integer,
  boolean,
  doublePrecision,
} from "drizzle-orm/pg-core";

// 1. Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }),
  profileImage: text("profile_image"),
  preferredLanguage: varchar("preferred_language", { length: 20 }).default("en"),
  preferredTheme: varchar("preferred_theme", { length: 20 }).default("dark"),
  travelStyle: varchar("travel_style", { length: 40 }).default("Balanced"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 2. Destinations
export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 150 }).notNull(),
  stateSlug: varchar("state_slug", { length: 120 }).notNull(),
  region: varchar("region", { length: 60 }).notNull(),
  tagline: text("tagline"),
  summary: text("summary"),
  description: text("description"),
  bestTime: varchar("best_time", { length: 100 }),
  duration: varchar("duration", { length: 60 }),
  budget: varchar("budget", { length: 60 }),
  averageDailyBudget: integer("avg_daily_budget").default(3500),
  rating: doublePrecision("rating").default(4.8),
  image: text("image"),
  gallery: jsonb("gallery").$type<string[]>().default([]),
  themes: jsonb("themes").$type<string[]>().default([]),
  highlights: jsonb("highlights").$type<string[]>().default([]),
  isHiddenGem: boolean("is_hidden_gem").default(false),
  crowdLevel: varchar("crowd_level", { length: 60 }).default("Moderate"),
  whyVisitHiddenGem: text("why_visit_hidden_gem"),
  coordinates: jsonb("coordinates").$type<{ lat: number; lng: number }>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 3. States
export const states = pgTable("states", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  capital: varchar("capital", { length: 120 }).notNull(),
  region: varchar("region", { length: 60 }).notNull(),
  description: text("description"),
  summary: text("summary"),
  culture: text("culture"),
  cuisine: jsonb("cuisine").$type<string[]>().default([]),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 4. Attractions
export const attractions = pgTable("attractions", {
  id: serial("id").primaryKey(),
  destinationSlug: varchar("destination_slug", { length: 120 }).notNull(),
  name: varchar("name", { length: 180 }).notNull(),
  type: varchar("type", { length: 80 }),
  description: text("description"),
  timings: varchar("timings", { length: 100 }),
  entryFee: varchar("entry_fee", { length: 80 }),
  image: text("image"),
  coordinates: jsonb("coordinates").$type<{ lat: number; lng: number }>(),
});

// 5. Experiences
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  destinationSlug: varchar("destination_slug", { length: 120 }).notNull(),
  duration: varchar("duration", { length: 60 }),
  priceRange: varchar("price_range", { length: 60 }),
  estimatedPrice: integer("estimated_price").default(1500),
  rating: doublePrecision("rating").default(4.9),
  image: text("image"),
  description: text("description"),
  highlights: jsonb("highlights").$type<string[]>().default([]),
  verified: boolean("verified").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 6. Events & Festivals
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  type: varchar("type", { length: 60 }).notNull(),
  location: varchar("location", { length: 150 }),
  state: varchar("state", { length: 100 }),
  startDate: varchar("start_date", { length: 60 }),
  endDate: varchar("end_date", { length: 60 }),
  month: varchar("month", { length: 40 }),
  description: text("description"),
  image: text("image"),
  category: varchar("category", { length: 80 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 7. Local Tourism Businesses
export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  location: varchar("location", { length: 150 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  destinationSlug: varchar("destination_slug", { length: 120 }).notNull(),
  description: text("description"),
  image: text("image"),
  rating: doublePrecision("rating").default(4.9),
  reviewsCount: integer("reviews_count").default(15),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 180 }),
  whatsapp: varchar("whatsapp", { length: 50 }),
  priceRange: varchar("price_range", { length: 60 }),
  verified: boolean("verified").default(true),
  features: jsonb("features").$type<string[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 8. Transport Bookings (Flights, Trains, Buses)
export const transportBookings = pgTable("transport_bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  bookingReference: varchar("booking_reference", { length: 60 }).notNull().unique(),
  type: varchar("type", { length: 30 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  subtitle: varchar("subtitle", { length: 200 }),
  fromCity: varchar("from_city", { length: 120 }),
  toCity: varchar("to_city", { length: 120 }),
  travelDate: varchar("travel_date", { length: 60 }).notNull(),
  passengers: jsonb("passengers").$type<any[]>().default([]).notNull(),
  selectedClass: varchar("selected_class", { length: 60 }),
  selectedSeats: jsonb("selected_seats").$type<string[]>().default([]),
  totalPrice: integer("total_price").notNull(),
  status: varchar("status", { length: 40 }).default("CONFIRMED"),
  contactEmail: varchar("contact_email", { length: 180 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 50 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 9. Hotel Properties & Stays
export const hotelProperties = pgTable("hotel_properties", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  destinationSlug: varchar("destination_slug", { length: 120 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  location: varchar("location", { length: 150 }).notNull(),
  address: text("address").notNull(),
  propertyType: varchar("property_type", { length: 60 }).notNull(),
  rating: doublePrecision("rating").default(4.8),
  pricePerNight: integer("price_per_night").notNull(),
  featuredImage: text("featured_image").notNull(),
  description: text("description").notNull(),
  amenities: jsonb("amenities").$type<string[]>().default([]),
  breakfastIncluded: boolean("breakfast_included").default(true),
  freeCancellation: boolean("free_cancellation").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 10. Hotel Bookings
export const hotelBookings = pgTable("hotel_bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  bookingReference: varchar("booking_reference", { length: 60 }).notNull().unique(),
  hotelId: integer("hotel_id"),
  hotelName: varchar("hotel_name", { length: 200 }).notNull(),
  roomType: varchar("room_type", { length: 100 }).notNull(),
  checkIn: varchar("check_in", { length: 60 }).notNull(),
  checkOut: varchar("check_out", { length: 60 }).notNull(),
  nightsCount: integer("nights_count").default(2),
  guestsCount: integer("guests_count").default(2),
  totalPrice: integer("total_price").notNull(),
  status: varchar("status", { length: 40 }).default("CONFIRMED"),
  contactEmail: varchar("contact_email", { length: 180 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 11. Food Places & Eateries
export const foodPlaces = pgTable("food_places", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  destinationSlug: varchar("destination_slug", { length: 120 }).notNull(),
  cuisine: varchar("cuisine", { length: 100 }).notNull(),
  diet: varchar("diet", { length: 60 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  averageCostForTwo: integer("avg_cost_for_two").default(500),
  rating: doublePrecision("rating").default(4.8),
  image: text("image").notNull(),
  address: text("address").notNull(),
  mustTryDishes: jsonb("must_try_dishes").$type<string[]>().default([]),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 12. Trips & Generated AI Itineraries
export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  sessionId: varchar("session_id", { length: 120 }),
  title: varchar("title", { length: 220 }).notNull(),
  destination: varchar("destination", { length: 150 }).notNull(),
  durationDays: integer("duration_days").notNull().default(5),
  travellersCount: integer("travellers_count").notNull().default(2),
  budgetTier: varchar("budget_tier", { length: 60 }).notNull().default("Moderate"),
  travelStyle: varchar("travel_style", { length: 60 }).notNull().default("Balanced"),
  summary: text("summary"),
  itineraryData: jsonb("itinerary_data").notNull(),
  budgetBreakdown: jsonb("budget_breakdown").notNull(),
  coverImage: text("cover_image"),
  status: varchar("status", { length: 40 }).default("Planned"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  destinationSlug: varchar("destination_slug", { length: 120 }).notNull(),
  userName: varchar("user_name", { length: 120 }).notNull(),
  userEmail: varchar("user_email", { length: 180 }),
  rating: integer("rating").notNull().default(5),
  title: varchar("title", { length: 200 }).notNull(),
  comment: text("comment").notNull(),
  photos: jsonb("photos").$type<string[]>().default([]).notNull(),
  helpful: integer("helpful").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const savedItineraries = pgTable("saved_itineraries", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 180 }),
  tripLength: varchar("trip_length", { length: 40 }),
  interests: jsonb("interests").$type<string[]>().default([]),
  budget: varchar("budget", { length: 40 }),
  region: varchar("region", { length: 40 }),
  title: varchar("title", { length: 200 }),
  days: jsonb("days").$type<any[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const festivalReminders = pgTable("festival_reminders", {
  id: serial("id").primaryKey(),
  festivalSlug: varchar("festival_slug", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  remindBefore: varchar("remind_before", { length: 40 }).default("1_week"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  page: varchar("page", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull(),
  views: integer("views").notNull().default(1),
  lastViewed: timestamp("last_viewed", { withTimezone: true }).defaultNow().notNull(),
});

export const tripPlans = trips;
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  subject: varchar("subject", { length: 120 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  source: varchar("source", { length: 60 }).default("footer"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
