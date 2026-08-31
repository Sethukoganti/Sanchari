import { destinations } from "@/data/content";
import type { ItineraryDay, Region, Theme } from "@/lib/types";

export interface ItineraryInput {
  tripLength: "4" | "7" | "10" | "14";
  interests: string[];
  budget: "Budget" | "Mid-range" | "Luxury";
  region: Region | "Flexible";
}

const stayByBudget: Record<ItineraryInput["budget"], string[]> = {
  Budget: [
    "Family guesthouse near the old quarter",
    "Clean backpacker lodge with rooftop breakfast",
    "Heritage hostel in a converted haveli wing",
  ],
  "Mid-range": [
    "Boutique heritage hotel with courtyard pool",
    "Riverside resort with breakfast included",
    "Design-led townhouse near the main bazaar",
  ],
  Luxury: [
    "Palace hotel suite with guided evening walk",
    "Private villa with cook and airport meet",
    "Luxury tented camp under desert or forest sky",
  ],
};

function pickDestinations(input: ItineraryInput) {
  let pool = [...destinations];
  if (input.region !== "Flexible") {
    const regional = pool.filter((d) => d.region === input.region);
    if (regional.length) pool = regional;
  }
  if (input.interests.length) {
    const scored = pool
      .map((d) => ({
        d,
        score: d.themes.filter((t) =>
          input.interests.includes(t as Theme | string),
        ).length,
      }))
      .sort((a, b) => b.score - a.score);
    pool = scored.map((s) => s.d);
  }
  const days = Number(input.tripLength);
  const count = days <= 4 ? 1 : days <= 7 ? 2 : days <= 10 ? 3 : 4;
  return pool.slice(0, Math.min(count, pool.length));
}

export function generateItinerary(input: ItineraryInput): {
  title: string;
  summary: string;
  days: ItineraryDay[];
  destinations: string[];
} {
  const picks = pickDestinations(input);
  const totalDays = Number(input.tripLength);
  const days: ItineraryDay[] = [];
  const stays = stayByBudget[input.budget];

  let dayNum = 1;
  let pickIndex = 0;
  const basePerStop = Math.max(1, Math.floor(totalDays / picks.length));

  while (dayNum <= totalDays && picks.length) {
    const dest = picks[Math.min(pickIndex, picks.length - 1)];
    const isArrival = dayNum === 1 || (pickIndex > 0 && days.length > 0 && days[days.length - 1].title.includes(picks[pickIndex - 1]?.name || "___"));
    const stopDay =
      dayNum === 1
        ? 1
        : days.filter((d) => d.title.includes(dest.name)).length + 1;

    const interestHint = input.interests[0] || "local life";
    const activities: string[] = [];

    if (stopDay === 1) {
      activities.push(
        `Arrive and settle near ${dest.highlights[0].toLowerCase()}`,
        `Orientation walk through ${dest.name}'s central lanes`,
        `Sunset stop at a local viewpoint recommended by your host`,
      );
    } else if (stopDay === 2) {
      activities.push(
        `Morning focus: ${dest.highlights[1] || dest.highlights[0]}`,
        `Midday meal built around ${interestHint.toLowerCase()} flavors`,
        `Afternoon craft or nature stop tied to ${dest.themes[0]}`,
      );
    } else {
      activities.push(
        `Flexible day—revisit a favorite corner of ${dest.name}`,
        `Optional add-on: ${dest.highlights[dest.highlights.length - 1]}`,
        `Golden-hour photography without the coach-group rush`,
      );
    }

    if (input.budget === "Luxury") {
      activities.push("Private guide window for deep-dive storytelling");
    } else if (input.budget === "Budget") {
      activities.push("Street-food supper crawl with a fixed cash budget");
    } else {
      activities.push("Reserved table at a trusted regional kitchen");
    }

    days.push({
      day: dayNum,
      title: `${dest.name}: ${stopDay === 1 ? "Arrival rhythm" : stopDay === 2 ? "Deep cut" : "Open frame"}`,
      activities,
      stay: stays[(dayNum - 1) % stays.length],
      meals:
        stopDay === 1
          ? "Light lunch on arrival · Welcome dinner"
          : "Local breakfast · Regional lunch · Optional café supper",
    });

    dayNum += 1;
    const daysOnThisStop = days.filter((d) => d.title.startsWith(dest.name)).length;
    const remainingStops = picks.length - pickIndex - 1;
    const remainingDays = totalDays - dayNum + 1;
    if (
      remainingStops > 0 &&
      daysOnThisStop >= basePerStop &&
      remainingDays >= remainingStops
    ) {
      pickIndex += 1;
    }
    // silence unused
    void isArrival;
  }

  const names = picks.map((p) => p.name);
  const title = `${totalDays}-day ${input.region === "Flexible" ? "India" : input.region} arc: ${names.join(" → ")}`;
  const summary = `A ${input.budget.toLowerCase()} pace across ${names.join(", ")}, shaped around ${
    input.interests.length ? input.interests.join(", ") : "balanced sightseeing"
  }. Built for real transfer times and one recovery window.`;

  return { title, summary, days, destinations: names };
}
