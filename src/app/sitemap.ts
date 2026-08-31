import type { MetadataRoute } from "next";
import {
  articles,
  destinations,
  experiences,
  SITE,
  states,
} from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/destinations",
    "/experiences",
    "/plan",
    "/map",
    "/stories",
    "/events",
    "/gallery",
    "/about",
    "/contact",
    "/search",
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

  const expRoutes = experiences.map((e) => ({
    url: `${SITE.url}/experiences/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const storyRoutes = articles.map((a) => ({
    url: `${SITE.url}/stories/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const stateRoutes = states.map((s) => ({
    url: `${SITE.url}/map/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...destRoutes,
    ...expRoutes,
    ...storyRoutes,
    ...stateRoutes,
  ];
}
