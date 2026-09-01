"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Compass,
  ArrowRight,
  ArrowLeft,
  Bed,
  Utensils,
  Check,
  Download,
  Share2,
  Mail,
} from "lucide-react";
import { destinationsData } from "@/data/destinations";
import { statesData } from "@/data/states";
import { cn } from "@/lib/utils";
import { isValidEmail } from "@/lib/utils";

interface DayPlan {
  day: number;
  title: string;
  activities: string[];
  stay: string;
  meals: string;
}

interface ItineraryResult {
  title: string;
  summary: string;
  days: DayPlan[];
}

const TRIP_LENGTHS = [
  { id: "3-4", label: "3 – 4 Days", desc: "Short Weekend Heritage Escape" },
  { id: "5-7", label: "5 – 7 Days", desc: "Classic Regional Discovery" },
  { id: "8-10", label: "8 – 10 Days", desc: "In-Depth Multi-City Circuit" },
  { id: "14+", label: "2 Weeks+", desc: "Grand Pan-India Expedition" },
];

const INTERESTS = [
  { id: "heritage", label: "Forts, Palaces & UNESCO Heritage" },
  { id: "spiritual", label: "Ghats, Temples & Living Rituals" },
  { id: "nature", label: "Himalayas, Tea Hills & Backwaters" },
  { id: "food", label: "Street Food, Royal Thalis & Cooking" },
  { id: "festivals", label: "Living Festivals & Cultural Fairs" },
  { id: "wildlife", label: "National Parks & Tiger Safaris" },
];

const BUDGET_CATEGORIES = [
  { id: "budget", label: "Authentic Slow / Budget (₹2,500 – ₹4,000/day)" },
  { id: "mid", label: "Curated Comfort / Boutique (₹6,000 – ₹12,000/day)" },
  { id: "luxury", label: "Royal Heritage & Palaces (₹20,000+/day)" },
];

const REGIONS = [
  { id: "North", label: "North India (Delhi, Agra, Varanasi, Ladakh)" },
  { id: "West", label: "West India (Rajasthan, Gujarat, Mumbai, Goa)" },
  { id: "South", label: "South India (Kerala, Hampi, Tamil Nadu)" },
  { id: "East", label: "East & Northeast (Kolkata, Darjeeling, Nagaland)" },
];

export function ItineraryBuilder() {
  const [step, setStep] = useState(0);
  const [tripLength, setTripLength] = useState("5-7");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["heritage", "food"]);
  const [budget, setBudget] = useState("mid");
  const [region, setRegion] = useState("West");
  const [result, setResult] = useState<ItineraryResult | null>(null);

  // Email Save Form
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    let title = "";
    let summary = "";
    let days: DayPlan[] = [];

    if (region === "West") {
      title = "Royal Rajasthan & Heritage Fortresses Circuit";
      summary = `A handcrafted ${tripLength} days slow-travel expedition exploring golden forts, Rajput palaces, and desert sunsets.`;
      days = [
        {
          day: 1,
          title: "Arrival in Jaipur · The Terracotta Pink City",
          activities: [
            "Check into a heritage Haveli in the Old City",
            "Sunset panoramic tea at Nahargarh Fort Padao viewpoint",
            "Savor hot Pyaaz Kachori and Lassi on MI Road",
          ],
          stay: "Boutique Heritage Haveli, Jaipur",
          meals: "Breakfast & Royal Rajasthani Welcome Thali",
        },
        {
          day: 2,
          title: "Amber Citadel & Astronomical Marvels",
          activities: [
            "Early morning ascent to Amber Fort and Sheesh Mahal mirror palace",
            "Guided walkthrough of UNESCO Jantar Mantar stone sundials",
            "Photograph Hawa Mahal honeycomb windows during morning light",
          ],
          stay: "Boutique Heritage Haveli, Jaipur",
          meals: "Breakfast & Street Food Trail at Bapu Bazaar",
        },
        {
          day: 3,
          title: "Blue City of Jodhpur · Ramparts of Mehrangarh",
          activities: [
            "Scenic express train or highway drive to Jodhpur",
            "Explore the cliffside bastions and museum of Mehrangarh Fort",
            "Blue alleyways walking tour with a local heritage docent",
          ],
          stay: "Heritage Fort-view Stay, Jodhpur",
          meals: "Breakfast & Ker Sangri with Bajra Roti",
        },
        {
          day: 4,
          title: "Romantic Lakes of Udaipur · City of Dawn",
          activities: [
            "Drive to Udaipur via Ranakpur Marble Jain Temple (1,444 carved pillars)",
            "Private sunset boat ride on Lake Pichola past Jag Mandir",
            "Dharohar folk dance show at Bagore Ki Haveli",
          ],
          stay: "Lakeview Heritage Palace, Udaipur",
          meals: "Breakfast & Candlelight Lakeside Dining",
        },
        {
          day: 5,
          title: "City Palace Art & Departure",
          activities: [
            "Explore Udaipur City Palace courtyards and miniature painting studios",
            "Souvenir shopping for silver jewelry and block-printed textiles",
            "Transfer to Maharana Pratap Airport or Railway Station",
          ],
          stay: "Departure / Return Journey",
          meals: "Breakfast & Farewell Masala Chai",
        },
      ];
    } else if (region === "North") {
      title = "Sacred Ganges & Nawabi Heritage Odyssey";
      summary = `A sublime ${tripLength} days spiritual journey from the Mughal wonders of Agra to the timeless stone ghats of Varanasi.`;
      days = [
        {
          day: 1,
          title: "Agra · Sunrise at the Taj Mahal",
          activities: [
            "Sunrise viewing of the Taj Mahal with morning mist on the Yamuna",
            "Walk through the red sandstone courtyards of Agra Fort",
            "Sample authentic Agra Petha and Mughlai kebabs",
          ],
          stay: "Taj-view Boutique Hotel, Agra",
          meals: "Breakfast & Awadhi Dinner",
        },
        {
          day: 2,
          title: "High-Speed Vande Bharat to Sacred Varanasi",
          activities: [
            "Board the morning Vande Bharat Express to Kashi",
            "Evening boat ride for the grand Ganga Aarti at Dashashwamedh Ghat",
            "Night stroll through the vibrant brass and silk bazaars",
          ],
          stay: "Heritage Ghat Palace, Varanasi",
          meals: "Breakfast & Banarasi Kachori Jalebi",
        },
        {
          day: 3,
          title: "Subah-e-Banaras & Sarnath Buddhist Deer Park",
          activities: [
            "Dawn wooden rowboat journey along all 84 stone ghats",
            "Visit Sarnath Dhamek Stupa where Lord Buddha gave his first sermon",
            "Evening classical Sitar and Tabla recital by the Ganges",
          ],
          stay: "Heritage Ghat Palace, Varanasi",
          meals: "Breakfast & Satvik Thali",
        },
      ];
    } else {
      title = "God's Own Country Backwaters & Spice Trail";
      summary = `A peaceful ${tripLength} days retreat through misty Western Ghats tea valleys and emerald Kerala backwater lagoons.`;
      days = [
        {
          day: 1,
          title: "Colonial Fort Kochi · Chinese Fishing Nets",
          activities: [
            "Walk past Portuguese churches and Jewish Synagogue in Mattancherry",
            "Watch fishermen operate 14th-century Chinese cantilevered fishing nets",
            "Evening Kathakali classical dance and makeup demonstration",
          ],
          stay: "Colonial Heritage Hotel, Fort Kochi",
          meals: "Breakfast & Malabar Fish Curry",
        },
        {
          day: 2,
          title: "Misty Munnar Tea Plantations",
          activities: [
            "Scenic drive climbing through cardamom and tea covered hills",
            "Visit century-old tea factory and sample fresh orthodox black tea",
            "Sunset walk through Eravikulam National Park",
          ],
          stay: "Plantation Resort, Munnar",
          meals: "Breakfast & Appam with Vegetable Stew",
        },
        {
          day: 3,
          title: "Alleppey Private Luxury Houseboat Cruise",
          activities: [
            "Board a traditional wooden Kettuvallam on Vembanad Lake",
            "Glide through peaceful village canals while private chef prepares Karimeen",
            "Overnight anchorage under star-filled tropical skies",
          ],
          stay: "Private Luxury Houseboat, Alleppey",
          meals: "All Meals & Traditional Kerala Sadya",
        },
      ];
    }

    setResult({ title, summary, days });
    setStep(4);
  };

  const handleDownload = () => {
    if (!result) return;
    const lines = [
      result.title,
      result.summary,
      "",
      ...result.days.flatMap((d) => [
        `Day ${d.day} — ${d.title}`,
        ...d.activities.map((a: string) => `  • ${a}`),
        `  Stay: ${d.stay}`,
        `  Meals: ${d.meals}`,
        "",
      ]),
      "Generated by Explore India — independent cultural travel platform",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Explore-India-Itinerary-${region}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result || !isValidEmail(email)) return;

    setEmailStatus("loading");
    try {
      await fetch("/api/trip-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinations: [result.title],
          budget,
          days: result.days.length,
          travelers: 2,
          notes: `Itinerary for ${email}: ${result.title}`,
        }),
      });
      setEmailStatus("success");
    } catch {
      setEmailStatus("error");
    }
  };

  return (
    <div className="card-surface bg-white/[0.03] border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      {/* Steps Header */}
      <div className="border-b border-white/10 bg-black/40 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {["Duration", "Interests", "Budget", "Region", "Itinerary"].map((lbl, idx) => (
            <button
              key={lbl}
              type="button"
              onClick={() => {
                if (idx < 4 || result) setStep(idx);
              }}
              className={cn(
                "rounded-full px-3.5 py-1 text-xs font-mono font-bold transition cursor-pointer",
                step === idx
                  ? "bg-turmeric text-black shadow-lg shadow-turmeric/20"
                  : idx < step
                  ? "bg-turmeric/15 text-turmeric border border-turmeric/30"
                  : "bg-white/5 text-muted-gray border border-white/10"
              )}
            >
              {idx + 1}. {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Step Contents */}
      <div className="p-6 sm:p-10 space-y-8">
        {step === 0 && (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-warm-white">
              How many days are you planning to travel in India?
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {TRIP_LENGTHS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTripLength(t.id)}
                  className={cn(
                    "card-surface p-5 rounded-2xl text-left border transition cursor-pointer space-y-1",
                    tripLength === t.id
                      ? "bg-turmeric/15 border-turmeric text-warm-white shadow-lg shadow-turmeric/10"
                      : "bg-black/40 border-white/10 hover:border-white/20"
                  )}
                >
                  <h4 className="font-display text-lg font-bold text-warm-white">{t.label}</h4>
                  <p className="text-xs text-muted-gray">{t.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-primary !px-6 !py-2.5 text-xs flex items-center gap-2"
              >
                <span>Continue to Interests</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-warm-white">
              What experiences inspire you most?
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {INTERESTS.map((int) => {
                const isSelected = selectedInterests.includes(int.id);
                return (
                  <button
                    key={int.id}
                    type="button"
                    onClick={() => toggleInterest(int.id)}
                    className={cn(
                      "p-4 rounded-2xl text-left border transition cursor-pointer flex items-center gap-3",
                      isSelected
                        ? "bg-teal-500/15 border-teal-500 text-teal-200 shadow-md"
                        : "bg-black/40 border-white/10 hover:border-white/20 text-zinc-300"
                    )}
                  >
                    <div
                      className={cn(
                        "h-5 w-5 rounded-lg border flex items-center justify-center shrink-0",
                        isSelected ? "border-teal-400 bg-teal-400 text-black" : "border-white/20"
                      )}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">{int.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="btn-secondary !px-5 !py-2 text-xs"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-primary !px-6 !py-2.5 text-xs flex items-center gap-2"
              >
                <span>Continue to Budget</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-warm-white">
              Choose your travel style & budget preference:
            </h3>
            <div className="space-y-3">
              {BUDGET_CATEGORIES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudget(b.id)}
                  className={cn(
                    "w-full p-4 rounded-2xl text-left border transition cursor-pointer",
                    budget === b.id
                      ? "bg-rani/15 border-rani text-warm-white shadow-md"
                      : "bg-black/40 border-white/10 hover:border-white/20 text-zinc-300"
                  )}
                >
                  <span className="font-display text-base font-bold">{b.label}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary !px-5 !py-2 text-xs"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-primary !px-6 !py-2.5 text-xs flex items-center gap-2"
              >
                <span>Continue to Region</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-warm-white">
              Select your primary regional focus:
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRegion(r.id)}
                  className={cn(
                    "p-5 rounded-2xl text-left border transition cursor-pointer space-y-1",
                    region === r.id
                      ? "bg-turmeric/15 border-turmeric text-warm-white shadow-md shadow-turmeric/10"
                      : "bg-black/40 border-white/10 hover:border-white/20 text-zinc-300"
                  )}
                >
                  <h4 className="font-display text-lg font-bold text-warm-white">{r.label}</h4>
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-secondary !px-5 !py-2 text-xs"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                className="btn-primary !px-8 !py-3 text-sm flex items-center gap-2 shadow-xl shadow-turmeric/20"
              >
                <Sparkles className="h-4 w-4" />
                <span>Generate Custom Itinerary</span>
              </button>
            </div>
          </div>
        )}

        {step === 4 && result && (
          <div className="space-y-8 animate-fade-in">
            {/* Itinerary Title Card */}
            <div className="card-surface p-6 sm:p-8 bg-black/60 border-turmeric/30 rounded-3xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs font-bold text-turmeric uppercase bg-turmeric/10 px-3 py-1 rounded-full border border-turmeric/30">
                  {region} India · {result.days.length} Days
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download TXT</span>
                  </button>
                </div>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-warm-white">
                {result.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-body">
                {result.summary}
              </p>
            </div>

            {/* Timeline Days */}
            <div className="space-y-6">
              {result.days.map((day) => (
                <div
                  key={day.day}
                  className="card-surface p-6 bg-white/[0.03] border-white/10 rounded-2xl space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-turmeric text-black font-mono font-bold text-sm shrink-0">
                      {day.day}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-warm-white">
                      {day.title}
                    </h3>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 pl-11">
                    {day.activities.map((act: string) => (
                      <li key={act} className="flex items-start gap-2">
                        <span className="text-turmeric mt-1">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-4 text-xs pt-3 border-t border-white/5 pl-11">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Bed className="h-3.5 w-3.5 text-turmeric" />
                      <span>Stay: <strong className="text-zinc-200">{day.stay}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Utensils className="h-3.5 w-3.5 text-rani" />
                      <span>Meals: <strong className="text-zinc-200">{day.meals}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Email Form */}
            <div className="card-surface p-6 bg-black/60 border-white/10 rounded-2xl space-y-3">
              <h4 className="font-display text-lg font-bold text-warm-white">
                Save & Email this Itinerary
              </h4>
              <p className="text-xs text-muted-gray">
                We will email you a permanent shareable link and PDF breakdown of this route.
              </p>
              {emailStatus === "success" ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Itinerary successfully saved to your profile!</span>
                </div>
              ) : (
                <form onSubmit={handleSaveEmail} className="flex flex-wrap gap-2 pt-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 min-w-[220px] rounded-xl border border-white/15 bg-black px-4 py-2.5 text-xs text-warm-white outline-none focus:border-turmeric"
                  />
                  <button
                    type="submit"
                    disabled={emailStatus === "loading"}
                    className="btn-primary !py-2.5 text-xs"
                  >
                    {emailStatus === "loading" ? "Saving..." : "Save Itinerary"}
                  </button>
                </form>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="btn-secondary !px-5 !py-2 text-xs"
              >
                ← Plan Another Trip
              </button>
              <Link href="/budget-calculator" className="btn-primary !px-5 !py-2 text-xs">
                Calculate Trip Budget →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
