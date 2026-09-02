import type { MetadataRoute } from "next";
import {
  articles,
  destinations,
  experiences,
  SITE,
  states,
} from "@/data/content";
import { staysData } from "@/data/booking";
import type { StateDetails } from "@/lib/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/destinations",
    "/experiences",
    "/plan",
    "/map",
    "/stories",
    "/events",
    "/food",
    "/book",
    "/book/flights",
    "/book/trains",
    "/book/buses",
    "/book/stays",
    "/my-bookings",
    "/gallery",
    "/about",
    "/contact",
    "/search",
    "/saved-trips",
    "/businesses",
    "/travel-smart",
    "/admin",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const destRoutes = destinations.map((d) => ({
    url: `${SITE.url}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const stayRoutes = staysData.map((s) => ({
    url: `${SITE.url}/stays/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const expRoutes = experiences.map((e) => ({
    url: `${SITE.url}/experiences/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const storyRoutes = articles.map((a) => ({
    url: `${SITE.url}/stories/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const stateRoutes = states.map((s: StateDetails) => ({
    url: `${SITE.url}/states/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...destRoutes,
    ...stayRoutes,
    ...expRoutes,
    ...storyRoutes,
    ...stateRoutes,
  ];
}
