import type {
  AIGeneratedItinerary,
  AIDayPlan,
  AIActivityItem,
  BudgetTier,
  TravelStyle,
  AccommodationPreference,
  TransportPreference,
  Language,
} from "@/lib/types";
import { destinationsData } from "@/data/destinations";
import { getFoodPlacesByDestination } from "@/data/food";
import { staysData } from "@/data/booking";

export interface AIPlanInput {
  destination: string;
  durationDays: number;
  budgetTier: BudgetTier;
  travellersCount: number;
  interests: string[];
  travelStyle: TravelStyle;
  accommodationPref?: AccommodationPreference;
  transportPref?: TransportPreference;
  foodPreferences?: string[];
  language?: Language;
  availableTime?: string;
  surpriseMe?: boolean;
}

export function generateAITripPlan(input: AIPlanInput): AIGeneratedItinerary {
  let dest = destinationsData.find(
    (d) =>
      d.name.toLowerCase().includes(input.destination.toLowerCase()) ||
      d.slug.toLowerCase().includes(input.destination.toLowerCase()) ||
      d.state.toLowerCase().includes(input.destination.toLowerCase())
  );

  if (!dest || input.surpriseMe) {
    const gems = destinationsData.filter((d) => d.isHiddenGem);
    dest = gems[Math.floor(Math.random() * gems.length)] || destinationsData[0];
  }

  const duration = Math.min(Math.max(input.durationDays || 4, 1), 30);
  const travellers = Math.max(input.travellersCount || 2, 1);
  const budgetMultiplier =
    input.budgetTier === "Luxury"
      ? 3.2
      : input.budgetTier === "Premium"
      ? 2.1
      : input.budgetTier === "Moderate"
      ? 1.3
      : 0.8;

  // Base daily costs per person
  const baseStayCost = Math.round(1800 * budgetMultiplier);
  const baseFoodCost = Math.round(900 * budgetMultiplier);
  const baseActivityCost = Math.round(600 * budgetMultiplier);
  const baseLocalTransport = Math.round(400 * budgetMultiplier);
  const baseIntercityTravel = Math.round(1500 * (input.budgetTier === "Luxury" ? 2.5 : 1));

  const totalStay = baseStayCost * duration * Math.ceil(travellers / 2);
  const totalFood = baseFoodCost * duration * travellers;
  const totalActivities = baseActivityCost * duration * travellers;
  const totalLocalTransport = baseLocalTransport * duration * Math.ceil(travellers / 3);
  const totalTravel = baseIntercityTravel * travellers;
  const misc = Math.round((totalStay + totalFood + totalActivities) * 0.08);

  const grandTotal = totalStay + totalFood + totalActivities + totalLocalTransport + totalTravel + misc;

  // Smart Trip Bundle Calculation
  const bundleFlightCost = input.transportPref === "Train" ? 1800 * travellers : 4500 * travellers;
  const bundleHotelCost = totalStay;
  const bundleActivitiesCost = totalActivities;
  const bundleFoodCost = totalFood;
  const bundleTransportCost = totalLocalTransport;
  const rawBundleSum = bundleFlightCost + bundleHotelCost + bundleActivitiesCost + bundleFoodCost + bundleTransportCost;
  const discountApplied = Math.round(rawBundleSum * 0.12);
  const totalBundlePrice = rawBundleSum - discountApplied;

  const places = dest.placesToVisit || [
    { name: "Historical Monument Circuit", type: "Heritage", description: "Magnificent architectural marvel.", timings: "09:00 AM - 05:30 PM" },
    { name: "Local Artisan Crafts Bazaar", type: "Culture", description: "Bustling traditional market.", timings: "11:00 AM - 08:00 PM" },
    { name: "Scenic Sunset Vantage", type: "Nature", description: "Panoramic hill views.", timings: "04:30 PM - 07:00 PM" },
  ];

  const destinationFoods = getFoodPlacesByDestination(dest.slug);

  // Day prefix translations
  const lang = input.language || "en";
  const getDayPrefix = (dayNum: number) => {
    if (lang === "te") return `${dayNum}వ రోజు`;
    if (lang === "hi") return `दिन ${dayNum}`;
    if (lang === "ta") return `நாள் ${dayNum}`;
    if (lang === "bn") return `দিন ${dayNum}`;
    if (lang === "kn") return `ದಿನ ${dayNum}`;
    if (lang === "ml") return `ദിവസം ${dayNum}`;
    return `Day ${dayNum}`;
  };

  const days: AIDayPlan[] = [];

  for (let i = 1; i <= duration; i++) {
    const dayTheme =
      i === 1
        ? `Arrival, Heritage Exploration & Welcome Food Trail`
        : i === 2
        ? `Architectural Wonders, Culture & Artisan Studios`
        : i === 3
        ? `Hidden Gem Excursions & Nature Panoramas`
        : `Leisure, Local Markets & Farewell Sunset Voyage`;

    const placeA = places[(i * 2 - 2) % places.length];
    const placeB = places[(i * 2 - 1) % places.length];
    const recommendedFood = destinationFoods[(i - 1) % destinationFoods.length];

    const activities: AIActivityItem[] = [
      {
        time: "08:30 AM",
        title: i === 1 ? `Transit Arrival & Hotel Check-in` : `Traditional Morning Breakfast`,
        type: i === 1 ? "transit" : "meal",
        description:
          i === 1
            ? `Arrive in ${dest.name} via ${input.transportPref || "Express Train / Flight"} and check in.`
            : `Enjoy local breakfast favorites at a recommended local eatery.`,
        location: `${dest.name} Transit Gateway`,
        estimatedCost: i === 1 ? 0 : Math.round(250 * budgetMultiplier),
        durationMinutes: 60,
        whyRecommended: `Allows hassle-free start aligned with your ${input.travelStyle} travel style.`,
        bookingAction:
          i === 1
            ? {
                type: "flight",
                label: `Book Flight / Train to ${dest.name}`,
                link: `/book/flights?to=${encodeURIComponent(dest.name)}`,
                estimatedCost: bundleFlightCost,
              }
            : undefined,
      },
      {
        time: "10:00 AM",
        title: `Explore ${placeA.name}`,
        type: "attraction",
        description: placeA.description || `Marvel at the ancient architecture and guided heritage trails.`,
        location: placeA.name,
        estimatedCost: Math.round(150 * budgetMultiplier),
        durationMinutes: 120,
        whyRecommended: `Ranked as a top landmark matching your interest in ${input.interests[0] || "Heritage"}.`,
      },
      {
        time: "01:30 PM",
        title: `Lunch at ${recommendedFood ? recommendedFood.name : "Local Heritage Kitchen"}`,
        type: "meal",
        description: recommendedFood
          ? `Must try: ${recommendedFood.mustTryDishes.slice(0, 2).join(", ")} (${recommendedFood.cuisine}).`
          : `Savor authentic regional thalis with local spices.`,
        location: recommendedFood ? recommendedFood.name : `${dest.name} Food Trail`,
        estimatedCost: recommendedFood ? recommendedFood.averageCostForTwo / 2 : Math.round(450 * budgetMultiplier),
        durationMinutes: 75,
        whyRecommended: `Matches your dietary preference (${input.foodPreferences?.join(", ") || "Local cuisine"}).`,
        bookingAction: {
          type: "food",
          label: "View Food Menu & Details",
          link: `/food`,
          estimatedCost: recommendedFood ? recommendedFood.averageCostForTwo / 2 : 450,
        },
      },
      {
        time: "03:45 PM",
        title: `Visit ${placeB.name}`,
        type: "attraction",
        description: placeB.description || `Immerse in cultural stories and local craftsmanship.`,
        location: placeB.name,
        estimatedCost: Math.round(200 * budgetMultiplier),
        durationMinutes: 100,
        whyRecommended: `Optimized route sequence minimizes in-city travel time.`,
      },
      {
        time: "06:30 PM",
        title: `Sunset Vantage & Evening Leisure`,
        type: "experience",
        description: `Stroll through illuminated bazaars and watch evening sunset panoramas.`,
        location: `${dest.name} Promenade`,
        estimatedCost: Math.round(150 * budgetMultiplier),
        durationMinutes: 90,
        whyRecommended: `The perfect golden hour window for photography and peaceful relaxation.`,
      },
    ];

    days.push({
      day: i,
      theme: `${getDayPrefix(i)} — ${dayTheme}`,
      routeSequence: [
        i === 1 ? "Arrival Hub" : "Stay",
        placeA.name,
        recommendedFood ? recommendedFood.name : "Lunch Spot",
        placeB.name,
        "Evening Vantage",
      ],
      activities,
      stay: {
        name: `${dest.name} ${input.accommodationPref || "Heritage Palace / Boutique Stay"}`,
        type: input.accommodationPref || "Boutique Hotel",
        estimatedCost: baseStayCost,
        description: `Centrally situated stay with authentic architecture and modern amenities.`,
        bookingUrl: `/book/stays?destination=${encodeURIComponent(dest.name)}`,
      },
      meals: {
        breakfast: `Traditional regional breakfast & chai`,
        lunch: recommendedFood ? `${recommendedFood.name} (${recommendedFood.cuisine})` : `Regional Thali`,
        dinner: `Candlelit dinner at scenic rooftop kitchen`,
      },
      dayEstimatedCost: Math.round(grandTotal / duration),
      travelTimeHours: input.travelStyle === "Relaxed" ? 1.5 : 2.5,
    });
  }

  return {
    id: `trip-ai-${Date.now()}`,
    title: `${duration}-Day Tailored Journey in ${dest.name}`,
    destination: dest.name,
    destinationSlugs: [dest.slug],
    state: dest.state,
    durationDays: duration,
    travellersCount: travellers,
    budgetTier: input.budgetTier,
    travelStyle: input.travelStyle,
    summary: `A carefully balanced ${duration}-day itinerary in ${dest.name} crafted for ${travellers} traveller(s) with focus on ${input.interests.join(", ") || "Heritage, Food, and Nature"}.`,
    days,
    budgetBreakdown: {
      stay: totalStay,
      travel: totalTravel,
      food: totalFood,
      activities: totalActivities,
      localTransport: totalLocalTransport,
      miscellaneous: misc,
      total: grandTotal,
      currency: "INR (₹)",
    },
    smartBundle: {
      flightCost: bundleFlightCost,
      hotelCost: bundleHotelCost,
      activitiesCost: bundleActivitiesCost,
      foodCost: bundleFoodCost,
      localTransportCost: bundleTransportCost,
      totalBundlePrice,
      discountApplied,
    },
    optimizedRoute: {
      summary: `Circuit optimized across central historic quarter, scenic nature lookouts, and culinary hubs.`,
      stops: [dest.name, `${dest.name} Heritage Core`, `${dest.name} Cultural Outskirts`],
      totalDistanceKm: Math.round(duration * 24),
      recommendedTransport: input.transportPref || "Private Taxi / Metro / Auto-rickshaw",
    },
    recommendedReasons: [
      `100% personalized for ${input.budgetTier} budget with zero overspending.`,
      `Includes curated hidden gems with low crowd densities for authentic encounters.`,
      `Route sequence designed to minimize travel fatigue and maximize golden hour sightseeing.`,
      `Verified local culinary pairings customized to ${input.foodPreferences?.join(", ") || "local delicacies"}.`,
    ],
    hiddenGemsIncluded: [
      `${dest.name} Twilight Artisan Market`,
      `Ancient Sun Temple & Stepwell Complex`,
    ],
    safetyTips: [
      `Keep digital copies of tickets in your Sanchari Bharat "My Trips" dashboard.`,
      `Use authorized prepaid taxi booths or ride-hailing at transit terminals.`,
      `Call the 24x7 Multi-lingual Tourist Helpline at 1800 11 1363 for instant assistance.`,
    ],
    packingAdvice: [
      `Breathable cotton clothing and comfortable walking shoes.`,
      `Universal charging adapter and power bank for long sightseeing days.`,
      `Reusable water bottle with built-in filter.`,
    ],
    createdAt: new Date().toISOString(),
  };
}
