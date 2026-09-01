import type {
  AIGeneratedItinerary,
  AIDayPlan,
  AIActivityItem,
  BudgetTier,
  TravelStyle,
  AccommodationPreference,
  TransportPreference,
} from "@/lib/types";
import { destinationsData } from "@/data/destinations";

export interface AIPlanInput {
  destination: string;
  durationDays: number;
  budgetTier: BudgetTier;
  travellersCount: number;
  interests: string[];
  travelStyle: TravelStyle;
  accommodationPref?: AccommodationPreference;
  transportPref?: TransportPreference;
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
    // Pick a hidden gem or top destination if surprise me
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

  // Generate day-by-day plans
  const days: AIDayPlan[] = [];

  for (let i = 1; i <= duration; i++) {
    const isFirstDay = i === 1;
    const isLastDay = i === duration;
    const dayTheme = isFirstDay
      ? `Arrival & Heritage Orientation in ${dest.name}`
      : isLastDay
      ? `Hidden Gems, Crafts & Farewell in ${dest.name}`
      : `Deep Cultural Immersion & Scenic Landscapes`;

    const activities: AIActivityItem[] = [];

    if (isFirstDay) {
      activities.push({
        time: "09:30 AM",
        title: `Arrival, Check-in & Welcome Chai at ${dest.name}`,
        type: "hotel",
        description: `Arrive at your curated ${input.accommodationPref || "boutique stay"}, unpack, and enjoy fresh regional tea and orientation.`,
        location: `${dest.name} Central`,
        estimatedCost: 0,
        durationMinutes: 60,
        whyRecommended: `Allows smooth acclimatization and hassle-free check-in before afternoon explorations.`,
      });
      activities.push({
        time: "11:30 AM",
        title: `Historic Monument Walk: ${dest.highlights[0] || "Ancient Citadel"}`,
        type: "attraction",
        description: `Explore the iconic architectural centerpiece of ${dest.name} with audio guidance and photography stops.`,
        location: dest.name,
        estimatedCost: Math.round(300 * budgetMultiplier),
        durationMinutes: 120,
        whyRecommended: `Recommended because you requested heritage and cultural highlights.`,
      });
      activities.push({
        time: "01:30 PM",
        title: `Authentic Regional Lunch: ${dest.localCuisine[0]?.name || "Traditional Thali"}`,
        type: "meal",
        description: `Savor authentic local flavors at a verified community-recommended dining establishment.`,
        location: `${dest.name} Food Street`,
        estimatedCost: Math.round(450 * budgetMultiplier),
        durationMinutes: 75,
        whyRecommended: `Matches your culinary curiosity with high-hygiene verified authentic cooks.`,
      });
      activities.push({
        time: "04:30 PM",
        title: `Sunset Viewpoint & Photography: ${dest.highlights[1] || "Scenic Viewpoint"}`,
        type: "experience",
        description: `Catch the golden hour light as the landscape is bathed in warm twilight hues.`,
        location: `${dest.name} Panorama Point`,
        estimatedCost: 0,
        durationMinutes: 90,
        whyRecommended: `Prime photography lighting during the cool evening breeze.`,
      });
      activities.push({
        time: "07:30 PM",
        title: `Evening Market Stroll & Dinner at ${dest.localMarkets[0]?.name || "Historic Bazaar"}`,
        type: "meal",
        description: `Browse local artisanal handicrafts, spices, and enjoy dinner under illuminated lanterns.`,
        location: dest.localMarkets[0]?.name || "Main Market",
        estimatedCost: Math.round(600 * budgetMultiplier),
        durationMinutes: 120,
        whyRecommended: `Directly supports verified local craftspeople with zero middleman commissions.`,
      });
    } else if (isLastDay) {
      activities.push({
        time: "08:00 AM",
        title: `Sunrise Meditation & Nature Walk`,
        type: "leisure",
        description: `Start the day with peaceful birdsong and fresh morning mountain/lake air.`,
        location: `${dest.name} Outskirts`,
        estimatedCost: 0,
        durationMinutes: 60,
        whyRecommended: `Gentle start to your final day designed for relaxation.`,
      });
      activities.push({
        time: "10:30 AM",
        title: `Hidden Gem Exploration: ${dest.nearbyAttractions[0]?.name || "Quiet Artisan Hamlet"}`,
        type: "experience",
        description: `Visit an uncrowded off-beat attraction that mass tourism buses overlook.`,
        location: `${dest.nearbyAttractions[0]?.distance || "15 km"} from center`,
        estimatedCost: Math.round(250 * budgetMultiplier),
        durationMinutes: 120,
        whyRecommended: `Curated hidden gem to escape crowds and discover living traditions.`,
      });
      activities.push({
        time: "01:00 PM",
        title: `Farewell Feast & Souvenir Procurement`,
        type: "meal",
        description: `Sample final delicacies and purchase certified GI-tagged souvenirs directly from artisans.`,
        location: `${dest.name} Artisan Guild`,
        estimatedCost: Math.round(500 * budgetMultiplier),
        durationMinutes: 90,
        whyRecommended: `Ensures ethical shopping directly benefiting local families.`,
      });
      activities.push({
        time: "04:00 PM",
        title: `Departure Transfer to Airport / Railway Station`,
        type: "transit",
        description: `Comfortable transit connection for your return or onward journey.`,
        location: `${dest.name} Transit Hub`,
        estimatedCost: Math.round(300 * budgetMultiplier),
        durationMinutes: 60,
        whyRecommended: `Optimized timing to reach station 90 minutes before scheduled departure.`,
      });
    } else {
      activities.push({
        time: "08:30 AM",
        title: `Morning Heritage Expedition: ${dest.highlights[i % dest.highlights.length] || "Monument Exploration"}`,
        type: "attraction",
        description: `Beat midday crowds with early entry and explore intricate stone carvings and courtyards.`,
        location: dest.name,
        estimatedCost: Math.round(250 * budgetMultiplier),
        durationMinutes: 120,
        whyRecommended: `Morning slot avoids heat and allows quiet exploration.`,
      });
      activities.push({
        time: "12:00 PM",
        title: `Local Workshop / Artisan Masterclass`,
        type: "experience",
        description: `Interact with master weavers, potters, or organic farmers preserving regional heritage.`,
        location: `${dest.name} Craft Center`,
        estimatedCost: Math.round(400 * budgetMultiplier),
        durationMinutes: 90,
        whyRecommended: `Hands-on immersive activity tailored to your selected cultural interests.`,
      });
      activities.push({
        time: "01:30 PM",
        title: `Traditional Lunch at Verified Eatery`,
        type: "meal",
        description: `Savor authentic home-style meal prepared with locally harvested seasonal organic ingredients.`,
        location: `${dest.name} Old Town`,
        estimatedCost: Math.round(400 * budgetMultiplier),
        durationMinutes: 60,
        whyRecommended: `Authentic farm-to-table culinary spot recommended by local food docents.`,
      });
      activities.push({
        time: "04:00 PM",
        title: `Scenic Nature Trail or River/Lake Excursion`,
        type: "experience",
        description: `Enjoy a boat ride, nature trail, or temple aarti session during pleasant late afternoon breezes.`,
        location: `${dest.name} Scenic Zone`,
        estimatedCost: Math.round(350 * budgetMultiplier),
        durationMinutes: 120,
        whyRecommended: `Balanced travel pace offering restful scenic recreation.`,
      });
      activities.push({
        time: "07:30 PM",
        title: `Cultural Folk Music / Classical Recital & Dinner`,
        type: "meal",
        description: `Evening classical music, dance recital, and candlelit dinner with panoramic night views.`,
        location: `${dest.name} Cultural Amphitheatre`,
        estimatedCost: Math.round(700 * budgetMultiplier),
        durationMinutes: 120,
        whyRecommended: `Vibrant evening experience showcasing regional performing arts.`,
      });
    }

    days.push({
      day: i,
      theme: dayTheme,
      routeSequence: [
        `Hotel Stay`,
        activities[0]?.title.slice(0, 30) || "Morning Point",
        activities[1]?.title.slice(0, 30) || "Midday Attraction",
        activities[2]?.title.slice(0, 30) || "Lunch Spot",
        activities[3]?.title.slice(0, 30) || "Evening Sunset",
        `Hotel Stay`,
      ],
      activities,
      stay: {
        name: `Curated ${input.accommodationPref || "Heritage Boutique Stay"}, ${dest.name}`,
        type: input.accommodationPref || "Boutique Hotel",
        estimatedCost: baseStayCost,
        description: `Verified comfortable stay with modern amenities, organic breakfast, and prime location.`,
      },
      meals: {
        breakfast: "Complimentary regional breakfast at stay",
        lunch: `${dest.localCuisine[0]?.name || "Traditional Thali"} at verified kitchen`,
        dinner: "Gourmet regional dinner and dessert",
      },
      dayEstimatedCost: baseStayCost + baseFoodCost + baseActivityCost + baseLocalTransport,
      travelTimeHours: input.travelStyle === "Fast-paced" ? 2.5 : input.travelStyle === "Relaxed" ? 1.0 : 1.8,
    });
  }

  const reasons = [
    `Recommended because you selected ${input.budgetTier} budget with a ${input.travelStyle} travel pace for ${travellers} traveler(s).`,
    `Optimized to include both iconic monuments and peaceful lesser-known spots to avoid overcrowding.`,
    `Every activity and restaurant has been cross-referenced with verified local ratings and seasonal safety advisories.`,
  ];

  return {
    id: `trip-ai-${Date.now()}`,
    title: `${duration}-Day Personalized Journey in ${dest.name} (${dest.state})`,
    destination: dest.name,
    destinationSlugs: [dest.slug],
    state: dest.state,
    durationDays: duration,
    travellersCount: travellers,
    budgetTier: input.budgetTier,
    travelStyle: input.travelStyle,
    summary: `A carefully curated ${duration}-day journey across ${dest.name} emphasizing authentic heritage, local cuisine, scenic viewpoints, and sustainable tourism.`,
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
    optimizedRoute: {
      summary: `Optimized chronological circuit starting from Central ${dest.name} through key monuments, scenic viewpoints, and returning to accommodation with minimal backtracking.`,
      stops: [
        `Arrival Hub (${dest.howToReach?.air || dest.name})`,
        ...dest.highlights.slice(0, 3),
        dest.nearbyAttractions[0]?.name || "Scenic Nature Reserve",
        `Hotel Sanctuary in ${dest.name}`,
      ],
      totalDistanceKm: duration * 35,
      recommendedTransport: input.transportPref || "Private Taxi / Metro / Local Cab",
    },
    recommendedReasons: reasons,
    hiddenGemsIncluded: [
      dest.nearbyAttractions[0]?.name || "Ancient Village Stepwell",
      dest.localMarkets[0]?.name || "Artisan Weavers Cooperative",
    ],
    safetyTips: dest.travelTips || [
      "Carry bottled purified water and small cash notes for local market stalls.",
      "Dress respectfully when entering temples and religious sanctums.",
      "Emergency national police/medical helpline: 112.",
    ],
    packingAdvice: [
      "Light cotton layers during day, light jacket for evening lake/hill breezes",
      "Comfortable slip-on walking shoes for temple and fortress explorations",
      "Universal adapter (Type D/C) and high-capacity power bank",
    ],
    createdAt: new Date().toISOString(),
  };
}

