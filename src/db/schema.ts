import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";

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

export const savedItineraries = pgTable("saved_itineraries", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 180 }),
  tripLength: varchar("trip_length", { length: 40 }).notNull(),
  interests: jsonb("interests").$type<string[]>().notNull(),
  budget: varchar("budget", { length: 40 }).notNull(),
  region: varchar("region", { length: 40 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  days: jsonb("days").$type<
    Array<{
      day: number;
      title: string;
      activities: string[];
      stay: string;
      meals: string;
    }>
  >().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type SavedItinerary = typeof savedItineraries.$inferSelect;
