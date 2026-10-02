import {
  articles,
  destinationsData,
  experiences,
  festivalsData,
  statesData,
  trainsData,
} from "@/data/content";
import { staysData } from "@/data/booking";
import { foodPlacesData } from "@/data/food";
import type { SearchResult } from "@/lib/types";

export function searchAll(query: string, limit = 25): SearchResult[] {
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
      ...(d.themes || []),
      ...(d.highlights || []),
    ]
      .filter(Boolean)
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

  // 2. Stays & Hotels
  for (const s of staysData) {
    const hay = [s.name, s.destinationName, s.state, s.location, s.propertyType, s.description]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `stay-${s.id}`,
        type: "hotel",
        slug: s.slug,
        title: s.name,
        subtitle: `${s.propertyType} · ${s.destinationName} (₹${s.pricePerNight}/night)`,
        href: `/stays/${s.slug}`,
        image: s.featuredImage,
      });
    }
  }

  // 3. Food Places
  for (const f of foodPlacesData) {
    const hay = [f.name, f.destinationName, f.cuisine, f.diet, f.category, ...(f.mustTryDishes || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `food-${f.id}`,
        type: "food",
        title: f.name,
        subtitle: `${f.cuisine} · ${f.destinationName} (${f.diet})`,
        href: `/food`,
        image: f.image,
      });
    }
  }

  // 4. Festivals
  for (const f of festivalsData) {
    const statesList = f.states || (f.state ? [f.state] : []);
    const hay = [
      f.name,
      f.nameHi,
      f.type,
      ...statesList,
      f.significance,
      f.date?.month,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `fest-${f.id}`,
        type: "festival",
        slug: f.slug,
        title: f.name,
        subtitle: `${f.type || "Festival"} · ${statesList.join(", ")} (${f.date?.month || "Seasonal"})`,
        href: `/festivals/${f.slug}`,
        image: f.gallery?.[0] || f.image || "",
      });
    }
  }

  // 5. States & UTs
  for (const st of statesData) {
    const hay = [st.name, st.capital, st.region, st.summary, ...(st.cuisine || []), ...(st.festivals || [])]
      .filter(Boolean)
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

  // 6. Experiences
  for (const exp of experiences) {
    const hay = [exp.title, exp.category, exp.destination, exp.state, exp.description, ...(exp.highlights || [])]
      .filter(Boolean)
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

  // 7. Articles / Stories
  for (const a of articles) {
    const hay = [a.title, a.excerpt, a.category, ...(a.tags || []), a.author]
      .filter(Boolean)
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
