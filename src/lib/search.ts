import {
  articles,
  destinationsData,
  experiences,
  festivalsData,
  statesData,
  trainsData,
} from "@/data/content";
import type { SearchResult } from "@/lib/types";

export function searchAll(query: string, limit = 20): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  // 1. Destinations
  for (const d of destinationsData) {
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
        id: `dest-${d.id}`,
        type: "destination",
        slug: d.slug,
        title: d.name,
        subtitle: `${d.state} · ${d.region} India`,
        href: `/destinations/${d.slug}`,
        image: d.image,
      });
    }
  }

  // 2. Festivals
  for (const f of festivalsData) {
    const hay = [
      f.name,
      f.nameHi,
      f.type,
      ...f.states,
      f.significance,
      f.date.month,
    ]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `fest-${f.id}`,
        type: "festival",
        slug: f.slug,
        title: f.name,
        subtitle: `${f.type} · ${f.states.join(", ")} (${f.date.month})`,
        href: `/festivals/${f.slug}`,
        image: f.gallery[0],
      });
    }
  }

  // 3. States & UTs
  for (const st of statesData) {
    const hay = [st.name, st.capital, st.region, st.summary, ...st.cuisine, ...st.festivals]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `state-${st.slug}`,
        type: "state",
        slug: st.slug,
        title: st.name,
        subtitle: `${st.region} India · Capital: ${st.capital}`,
        href: `/states/${st.slug}`,
        image: st.image,
      });
    }
  }

  // 4. Trains
  for (const tr of trainsData) {
    const hay = [tr.name, tr.number, tr.type, tr.route.from, tr.route.to, ...tr.route.via]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `train-${tr.id}`,
        type: "train",
        slug: tr.id,
        title: tr.name,
        subtitle: `${tr.type} · ${tr.route.from} to ${tr.route.to}`,
        href: `/trains`,
        image: tr.image,
      });
    }
  }

  // 5. Experiences
  for (const exp of experiences) {
    const hay = [exp.title, exp.category, exp.destination, exp.state, exp.description, ...(exp.highlights || [])]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `exp-${exp.id}`,
        type: "experience",
        slug: exp.slug,
        title: exp.title,
        subtitle: `${exp.category} · ${exp.destination} (${exp.state})`,
        href: `/experiences/${exp.slug}`,
        image: exp.image,
      });
    }
  }

  // 6. Articles / Stories
  for (const a of articles) {
    const hay = [a.title, a.excerpt, a.category, ...a.tags, a.author]
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `art-${a.slug}`,
        type: "article",
        slug: a.slug,
        title: a.title,
        subtitle: `${a.category} · ${a.readTime}`,
        href: `/stories/${a.slug}`,
        image: a.image,
      });
    }
  }

  return results.slice(0, limit);
}
