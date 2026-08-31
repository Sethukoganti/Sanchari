import {
  articles,
  destinations,
  events,
  experiences,
} from "@/data/content";
import type { SearchResult } from "@/lib/types";

export function searchAll(query: string, limit = 12): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const d of destinations) {
    const hay = [
      d.name,
      d.nameHi,
      d.state,
      d.region,
      d.summary,
      d.tagline,
      ...d.themes,
      ...d.highlights,
    ]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        type: "destination",
        slug: d.slug,
        title: d.name,
        subtitle: `${d.state} · ${d.region}`,
        href: `/destinations/${d.slug}`,
        image: d.image,
      });
    }
  }

  for (const a of articles) {
    const hay = [a.title, a.excerpt, a.category, ...a.tags, a.author]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        type: "article",
        slug: a.slug,
        title: a.title,
        subtitle: `${a.category} · ${a.readTime}`,
        href: `/stories/${a.slug}`,
        image: a.image,
      });
    }
  }

  for (const e of experiences) {
    const hay = [e.title, e.summary, e.category, e.region, ...e.highlights]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        type: "experience",
        slug: e.slug,
        title: e.title,
        subtitle: `${e.category} · ${e.region}`,
        href: `/experiences/${e.slug}`,
        image: e.image,
      });
    }
  }

  for (const ev of events) {
    const hay = [ev.name, ev.location, ev.region, ev.description]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        type: "event",
        slug: ev.slug,
        title: ev.name,
        subtitle: `${ev.location} · ${ev.region}`,
        href: `/events#${ev.slug}`,
        image: ev.image,
      });
    }
  }

  return results.slice(0, limit);
}
