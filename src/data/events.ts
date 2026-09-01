import type { FestivalEvent } from "@/lib/types";

export const eventsData: FestivalEvent[] = [
  {
    id: "evt-ziro-music",
    slug: "ziro-festival-of-music",
    name: "Ziro Festival of Music",
    type: "music",
    location: "Ziro Valley",
    state: "Arunachal Pradesh",
    date: {
      startDate: "2026-09-24",
      endDate: "2026-09-27",
      month: "September",
      approximateString: "Late September (Annual)",
    },
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description:
      "India's premier eco-friendly outdoor indie music festival hosted in the picturesque bamboo valleys of the Apatani tribe. Features dual solar-powered bamboo stages and camping under starry skies.",
    category: "Music & Indie Culture",
    significance: "Celebration of independent Indian and global music in harmony with tribal ecology.",
    rituals: ["Camping in pine hills", "Apatani rice beer tastings", "Acoustic sunrise performances"],
    entryFee: "₹6,000 (4-Day Festival Pass)",
  },
  {
    id: "evt-pushkar-mela",
    slug: "pushkar-camel-fair-2026",
    name: "Pushkar Camel Fair & Desert Mela",
    type: "fair",
    location: "Pushkar, Ajmer",
    state: "Rajasthan",
    date: {
      startDate: "2026-11-14",
      endDate: "2026-11-22",
      month: "November",
      approximateString: "November (Kartik Purnima)",
    },
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    description:
      "Over 50,000 decorated camels, horses, and desert pastoralists gather on golden Thar dunes for livestock competitions, Rajasthani folk dancing, hot air ballooning, and sacred Brahma lake aartis.",
    category: "Cultural Fair & Heritage",
    significance: "Ancient trading gathering combined with Kartik Purnima full-moon pilgrimage.",
    entryFee: "Free Entry (Balloon rides extra)",
  },
  {
    id: "evt-dev-deepawali",
    slug: "dev-deepawali-varanasi",
    name: "Dev Deepawali (Festival of the Gods)",
    type: "religious",
    location: "Varanasi Ghats",
    state: "Uttar Pradesh",
    date: {
      startDate: "2026-11-23",
      endDate: "2026-11-24",
      month: "November",
      approximateString: "15 Days after Diwali (Kartik Purnima)",
    },
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    description:
      "All 84 stone ghats of Varanasi are illuminated with over one million earthen diyas. River Ganga reflects thousands of floating flames as laser light shows and grand aartis take place.",
    category: "Spiritual & Sacred",
    significance: "Celebration of Lord Shiva defeating demon Tripurasura when the gods descend to bathe in the Ganga.",
    entryFee: "Free Public Event",
  },
  {
    id: "evt-hornbill",
    slug: "hornbill-festival-nagaland",
    name: "Hornbill Festival (Festival of Festivals)",
    type: "cultural",
    location: "Kisama Naga Heritage Village, Kohima",
    state: "Nagaland",
    date: {
      startDate: "2026-12-01",
      endDate: "2026-12-10",
      month: "December",
      approximateString: "December 1–10 Annually",
    },
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description:
      "Grand celebration of all 16 recognized indigenous Naga tribes. Showcases warrior dances, log-drum beats, traditional morung longhouses, and the Great Hornbill National Rock Contest.",
    category: "Indigenous Tribal Culture",
    significance: "Preserving and celebrating the unified heritage of the Naga people.",
    entryFee: "₹100 / day",
  },
  {
    id: "evt-hyderabad-haleem",
    slug: "hyderabad-ramadan-haleem-festival",
    name: "Hyderabad Ramadan Food & Haleem Carnival",
    type: "food",
    location: "Charminar & Tolichowki, Hyderabad",
    state: "Telangana",
    date: {
      startDate: "2026-03-10",
      endDate: "2026-04-09",
      month: "March",
      approximateString: "Holy Month of Ramadan",
    },
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    description:
      "A month-long culinary carnival where hundreds of traditional bhattis prepare authentic GI-tagged Hyderabadi Haleem, Patthar ka Gosht, and Sheer Khurma across illuminated night bazaars.",
    category: "Food Festival",
    significance: "Centuries-old Nizami culinary traditions during the sacred month of Ramadan.",
    entryFee: "Free Entry (Food a la carte)",
  },
];

export function getEventsByMonth(month: string): FestivalEvent[] {
  if (month === "All") return eventsData;
  return eventsData.filter((e) => e.date.month === month);
}

