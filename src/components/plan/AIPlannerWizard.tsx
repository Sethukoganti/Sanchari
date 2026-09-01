"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Compass,
  ArrowRight,
  ArrowLeft,
  Check,
  Download,
  Share2,
  Bookmark,
  Printer,
  ShieldAlert,
  Bed,
  Utensils,
  Car,
  DollarSign,
  Shuffle,
  Info,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { destinationsData } from "@/data/destinations";
import { generateAITripPlan, type AIPlanInput } from "@/lib/ai-trip-engine";
import type {
  AIGeneratedItinerary,
  BudgetTier,
  TravelStyle,
  AccommodationPreference,
  TransportPreference,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const ALL_INTERESTS = [
  { id: "Heritage", label: "Forts, Palaces & UNESCO Heritage", icon: "🏛️" },
  { id: "Culture", label: "Living Traditions & Village Crafts", icon: "🎨" },
  { id: "Food", label: "Street Food, Thalis & Royal Recipes", icon: "🍛" },
  { id: "Nature", label: "Mountains, Tea Hills & Waterfalls", icon: "🌿" },
  { id: "Spiritual", label: "Sacred Ghats, Temples & Yoga", icon: "🕉️" },
  { id: "Adventure", label: "Rafting, Treks & High Passes", icon: "🧗" },
  { id: "Wildlife", label: "Tiger Reserves & Bird Sanctuaries", icon: "🐅" },
  { id: "Beaches", label: "Golden Sands & Coastal Sunsets", icon: "🏖️" },
  { id: "Photography", label: "Golden Hour & Architectural Spots", icon: "📸" },
  { id: "Relaxation", label: "Ayurvedic Spas & Slow Houseboats", icon: "🧘" },
];

const BUDGET_OPTIONS: Array<{ id: BudgetTier; title: string; desc: string; range: string }> = [
  { id: "Budget", title: "Authentic Slow / Budget", desc: "Clean homestays, scenic trains, authentic street kitchens", range: "₹2,000 – ₹3,500 / day" },
  { id: "Moderate", title: "Curated Comfort / Boutique", desc: "Charming 3-4★ boutique stays, private AC cabs, curated experiences", range: "₹4,500 – ₹8,000 / day" },
  { id: "Premium", title: "Premium Heritage", desc: "Historic Havelis, high-speed Vande Bharat, guided food & craft tours", range: "₹9,000 – ₹16,000 / day" },
  { id: "Luxury", title: "Royal Palaces & Bespoke", desc: "5★ Royal palaces, private chauffeurs, private boat charters & butler", range: "₹20,000+ / day" },
];

const TRAVEL_STYLES: Array<{ id: TravelStyle; title: string; desc: string }> = [
  { id: "Relaxed", title: "Relaxed & Immersive", desc: "1-2 key attractions daily, ample time for cafes, reading, and wandering" },
  { id: "Balanced", title: "Balanced & Comprehensive", desc: "3 key experiences daily with pleasant lunch and sunset breaks" },
  { id: "Fast-paced", title: "Action-Packed Explorer", desc: "Cover all major monuments, morning-to-night activity coverage" },
];

const ACCOMMODATIONS: AccommodationPreference[] = [
  "Homestay",
  "Hotel",
  "Resort",
  "Heritage Palace",
  "Hostel",
  "Luxury",
];

const TRANSPORTS: TransportPreference[] = [
  "Train",
  "Private Car / Taxi",
  "Flight",
  "Public Transport",
  "Bus",
  "Rental Scooter / Bike",
];

export function AIPlannerWizard() {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("Hyderabad");
  const [customDestination, setCustomDestination] = useState("");
  const [durationDays, setDurationDays] = useState(5);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>("Moderate");
  const [travellersCount, setTravellersCount] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Heritage", "Food", "Culture"]);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("Balanced");
  const [accommodationPref, setAccommodationPref] = useState<AccommodationPreference>("Hotel");
  const [transportPref, setTransportPref] = useState<TransportPreference>("Private Car / Taxi");

  // Loading and Result state
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [itinerary, setItinerary] = useState<AIGeneratedItinerary | null>(null);

  // Active view tab in generated itinerary
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "route" | "budget" | "stay" | "safety">("itinerary");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true });

  const toggleDay = (day: number) => {
    setExpandedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setLoadingStep(1);

    const targetDest = customDestination.trim() || destination;

    // Simulate multi-step AI reasoning animation
    setTimeout(() => setLoadingStep(2), 600);
    setTimeout(() => setLoadingStep(3), 1200);
    setTimeout(() => setLoadingStep(4), 1800);

    setTimeout(() => {
      const generated = generateAITripPlan({
        destination: targetDest,
        durationDays,
        budgetTier,
        travellersCount,
        interests: selectedInterests,
        travelStyle,
        accommodationPref,
        transportPref,
      });

      setItinerary(generated);
      setIsGenerating(false);
      setStep(8); // Display results screen
    }, 2400);
  };

  const handleSaveTrip = () => {
    if (!itinerary) return;
    try {
      const existing = JSON.parse(localStorage.getItem("sanchari_saved_trips") || "[]");
      const updated = [itinerary, ...existing.filter((t: any) => t.id !== itinerary.id)];
      localStorage.setItem("sanchari_saved_trips", JSON.stringify(updated));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = () => {
    if (!itinerary) return;
    const lines = [
      `==================================================`,
      `SANCHARI BHARAT — AI-GENERATED ITINERARY`,
      `==================================================`,
      `Title: ${itinerary.title}`,
      `Destination: ${itinerary.destination} (${itinerary.state || "India"})`,
      `Duration: ${itinerary.durationDays} Days | Travellers: ${itinerary.travellersCount}`,
      `Budget Tier: ${itinerary.budgetTier} | Travel Style: ${itinerary.travelStyle}`,
      `Estimated Budget: ₹${itinerary.budgetBreakdown.total.toLocaleString("en-IN")}`,
      ``,
      `SUMMARY:`,
      `${itinerary.summary}`,
      ``,
      `OPTIMIZED ROUTE:`,
      `${itinerary.optimizedRoute.summary}`,
      `Circuit: ${itinerary.optimizedRoute.stops.join(" -> ")}`,
      ``,
      `DAY-BY-DAY SCHEDULE:`,
      `--------------------------------------------------`,
      ...itinerary.days.flatMap((d) => [
        `DAY ${d.day}: ${d.theme.toUpperCase()}`,
        `Stay: ${d.stay.name}`,
        `Meals: ${d.meals.lunch} (Lunch), ${d.meals.dinner} (Dinner)`,
        `Activities:`,
        ...d.activities.map((a) => `  [${a.time}] ${a.title} - ${a.description} (₹${a.estimatedCost})`),
        ``,
      ]),
      `SAFETY & LOCAL TIPS:`,
      ...itinerary.safetyTips.map((t) => `• ${t}`),
      ``,
      `Generated with Sanchari Bharat — AI-powered discovery for India`,
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Sanchari-Bharat-${itinerary.destination.replace(/\s+/g, "-")}-Itinerary.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Wizard Progress Header (Steps 1 to 7) */}
      {step <= 7 && !isGenerating && (
        <div className="card-surface p-4 sm:p-6 bg-navy-surface/80 border-white/10 rounded-3xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-saffron text-black font-mono font-bold text-xs">
                {step}
              </span>
              <span className="font-display font-bold text-sm text-warm-white">
                Step {step} of 7: {
                  step === 1 ? "Choose Destination" :
                  step === 2 ? "Trip Duration" :
                  step === 3 ? "Budget Tier" :
                  step === 4 ? "Travellers" :
                  step === 5 ? "Interests & Themes" :
                  step === 6 ? "Travel Style & Transport" : "Review & Generate"
                }
              </span>
            </div>
            <span className="font-mono text-xs text-saffron font-bold">
              {Math.round((step / 7) * 100)}% Completed
            </span>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-navy-light/60 h-2 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-gradient-to-r from-saffron via-emerald-accent to-ai-violet h-full transition-all duration-500 rounded-full"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* AI GENERATION ANIMATION STATE */}
      {isGenerating && (
        <div className="card-ai p-8 sm:p-14 text-center space-y-8 rounded-3xl border border-ai-violet/40 shadow-2xl">
          <div className="relative mx-auto h-20 w-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-ai-violet/20 animate-ping" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-ai-violet to-saffron text-white shadow-xl shadow-ai-violet/30">
              <Sparkles className="h-8 w-8 animate-spin" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-warm-white">
              Planning your perfect Indian journey...
            </h3>
            <p className="text-sm text-muted-gray max-w-md mx-auto font-body">
              Our AI engine is compiling local cultural insights, optimizing day-by-day routes, and checking verified local partners.
            </p>
          </div>

          {/* Animated Checklist Steps */}
          <div className="max-w-md mx-auto space-y-3 text-left text-xs font-mono">
            {[
              { id: 1, label: "Analyzing travel style, duration, and budget..." },
              { id: 2, label: `Finding iconic spots & hidden gems in ${customDestination || destination}...` },
              { id: 3, label: "Optimizing chronological daily route sequence..." },
              { id: 4, label: "Calculating transparent itemized cost breakdown..." },
            ].map((st) => (
              <div
                key={st.id}
                className={cn(
                  "p-3 rounded-xl border flex items-center gap-2.5 transition-all duration-300",
                  loadingStep >= st.id
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-semibold"
                    : "bg-navy-surface/40 border-white/5 text-muted-gray"
                )}
              >
                {loadingStep >= st.id ? (
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <div className="h-3 w-3 rounded-full border border-zinc-600 shrink-0" />
                )}
                <span>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: DESTINATION */}
      {!isGenerating && step === 1 && (
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 1
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
              Where do you want to go in India?
            </h2>
            <p className="text-xs sm:text-sm text-muted-gray mt-1">
              Select a popular base or enter any state, city, or click &quot;Surprise Me&quot; for off-beat gems.
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-saffron" />
              <input
                type="text"
                placeholder="Or type any destination (e.g. Araku Valley, Ziro, Spiti, Goa)..."
                value={customDestination}
                onChange={(e) => setCustomDestination(e.target.value)}
                className="w-full rounded-2xl border border-white/15 bg-navy-dark/80 pl-12 pr-4 py-3.5 text-sm text-warm-white outline-none focus:border-saffron"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {destinationsData.slice(0, 9).map((d) => {
                const isSelected = destination === d.name && !customDestination;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setDestination(d.name);
                      setCustomDestination("");
                    }}
                    className={cn(
                      "p-3.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer",
                      isSelected
                        ? "bg-saffron/15 border-saffron text-warm-white shadow-lg shadow-saffron/10"
                        : "bg-navy-dark/60 border-white/10 hover:border-white/20 text-muted-gray"
                    )}
                  >
                    <div className="relative h-11 w-11 rounded-xl overflow-hidden shrink-0">
                      <Image src={d.image} alt={d.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-warm-white">{d.name}</h4>
                      <p className="text-[11px] text-muted-gray">{d.state}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const randomGem = destinationsData.filter((d) => d.isHiddenGem);
                  const picked = randomGem[Math.floor(Math.random() * randomGem.length)];
                  setDestination(picked.name);
                  setCustomDestination("");
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-accent hover:underline cursor-pointer"
              >
                <Shuffle className="h-4 w-4" />
                <span>🎲 Surprise Me with a Hidden Gem</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-primary"
            >
              <span>Continue to Duration</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DURATION */}
      {!isGenerating && step === 2 && (
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 2
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
              How many days are you planning?
            </h2>
            <p className="text-xs sm:text-sm text-muted-gray mt-1">
              Select anywhere between 1 to 30 days for your trip.
            </p>
          </div>

          <div className="space-y-6 py-4 max-w-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-gray">Trip Duration:</span>
              <span className="font-mono text-2xl font-black text-saffron bg-saffron/10 px-4 py-1.5 rounded-2xl border border-saffron/30">
                {durationDays} {durationDays === 1 ? "Day" : "Days"}
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={30}
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full h-2.5 bg-navy-light rounded-lg appearance-none cursor-pointer accent-saffron"
            />

            <div className="grid grid-cols-4 gap-2 pt-2">
              {[3, 5, 7, 14].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDurationDays(d)}
                  className={cn(
                    "p-2.5 rounded-xl border text-xs font-mono font-bold cursor-pointer transition",
                    durationDays === d
                      ? "bg-saffron text-black border-saffron"
                      : "bg-navy-dark/60 border-white/10 text-muted-gray hover:text-white"
                  )}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-white/10">
            <button type="button" onClick={() => setStep(1)} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="button" onClick={() => setStep(3)} className="btn-primary">
              <span>Continue to Budget</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: BUDGET */}
      {!isGenerating && step === 3 && (
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 3
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
              What is your budget tier?
            </h2>
            <p className="text-xs sm:text-sm text-muted-gray mt-1">
              The AI will calibrate stays, meals, and transit options accordingly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {BUDGET_OPTIONS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBudgetTier(b.id)}
                className={cn(
                  "p-5 rounded-2xl border text-left transition cursor-pointer space-y-2",
                  budgetTier === b.id
                    ? "bg-saffron/15 border-saffron text-warm-white shadow-lg shadow-saffron/10"
                    : "bg-navy-dark/60 border-white/10 hover:border-white/20 text-muted-gray"
                )}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-display font-bold text-base text-warm-white">{b.title}</h4>
                  <span className="font-mono text-xs font-bold text-saffron">{b.range}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-body">{b.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-white/10">
            <button type="button" onClick={() => setStep(2)} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="button" onClick={() => setStep(4)} className="btn-primary">
              <span>Continue to Travellers</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: TRAVELLERS */}
      {!isGenerating && step === 4 && (
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 4
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
              How many travellers?
            </h2>
            <p className="text-xs sm:text-sm text-muted-gray mt-1">
              We adjust room allocations, cab types, and group activity reservations.
            </p>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 max-w-xl">
            {[
              { count: 1, label: "Solo Explorer", desc: "1 Person" },
              { count: 2, label: "Couple / Duo", desc: "2 People" },
              { count: 4, label: "Small Group / Family", desc: "3–5 People" },
              { count: 8, label: "Large Group", desc: "6+ People" },
            ].map((tr) => (
              <button
                key={tr.label}
                type="button"
                onClick={() => setTravellersCount(tr.count)}
                className={cn(
                  "p-5 rounded-2xl border text-center transition cursor-pointer space-y-1.5",
                  travellersCount === tr.count
                    ? "bg-emerald-accent/15 border-emerald-accent text-warm-white shadow-lg shadow-emerald-accent/10"
                    : "bg-navy-dark/60 border-white/10 hover:border-white/20 text-muted-gray"
                )}
              >
                <div className="font-mono text-2xl font-black text-warm-white">{tr.count}</div>
                <h4 className="font-display font-bold text-xs text-warm-white">{tr.label}</h4>
                <p className="text-[10px] text-muted-gray">{tr.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-white/10">
            <button type="button" onClick={() => setStep(3)} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="button" onClick={() => setStep(5)} className="btn-primary">
              <span>Continue to Interests</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: INTERESTS */}
      {!isGenerating && step === 5 && (
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 5
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
              What experiences inspire you most?
            </h2>
            <p className="text-xs sm:text-sm text-muted-gray mt-1">
              Pick as many as you like. Our AI will curate activities around your passions.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_INTERESTS.map((item) => {
              const isSelected = selectedInterests.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleInterest(item.id)}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer",
                    isSelected
                      ? "bg-ai-violet/20 border-ai-violet text-warm-white shadow-md shadow-ai-violet/15"
                      : "bg-navy-dark/60 border-white/10 hover:border-white/20 text-muted-gray"
                  )}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-sm text-warm-white">{item.id}</h4>
                    <p className="text-[11px] text-muted-gray">{item.label}</p>
                  </div>
                  <div
                    className={cn(
                      "h-5 w-5 rounded-lg border flex items-center justify-center shrink-0",
                      isSelected ? "bg-ai-violet border-ai-violet text-white" : "border-white/20"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between pt-4 border-t border-white/10">
            <button type="button" onClick={() => setStep(4)} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="button" onClick={() => setStep(6)} className="btn-primary">
              <span>Continue to Style</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: TRAVEL STYLE & PREFERENCES */}
      {!isGenerating && step === 6 && (
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 6
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
              Pacing & Travel Preferences
            </h2>
            <p className="text-xs sm:text-sm text-muted-gray mt-1">
              Fine-tune your daily speed, stay type, and transit mode.
            </p>
          </div>

          {/* Travel Pace */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-saffron font-bold">
              Travel Pace:
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              {TRAVEL_STYLES.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setTravelStyle(st.id)}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition cursor-pointer space-y-1",
                    travelStyle === st.id
                      ? "bg-saffron/15 border-saffron text-warm-white"
                      : "bg-navy-dark/60 border-white/10 text-muted-gray"
                  )}
                >
                  <h4 className="font-display font-bold text-sm text-warm-white">{st.title}</h4>
                  <p className="text-[11px] text-muted-gray">{st.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Accommodation & Transport */}
          <div className="grid gap-6 sm:grid-cols-2 pt-2">
            <div>
              <label className="text-xs font-mono uppercase text-emerald-accent font-bold block mb-2">
                Preferred Stay:
              </label>
              <select
                value={accommodationPref}
                onChange={(e) => setAccommodationPref(e.target.value as any)}
                className="w-full rounded-xl border border-white/15 bg-navy-dark px-4 py-3 text-xs text-warm-white outline-none focus:border-emerald-accent"
              >
                {ACCOMMODATIONS.map((acc) => (
                  <option key={acc} value={acc}>
                    {acc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-ai-violet font-bold block mb-2">
                Preferred Transport:
              </label>
              <select
                value={transportPref}
                onChange={(e) => setTransportPref(e.target.value as any)}
                className="w-full rounded-xl border border-white/15 bg-navy-dark px-4 py-3 text-xs text-warm-white outline-none focus:border-ai-violet"
              >
                {TRANSPORTS.map((tr) => (
                  <option key={tr} value={tr}>
                    {tr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-white/10">
            <button type="button" onClick={() => setStep(5)} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="button" onClick={() => setStep(7)} className="btn-primary">
              <span>Review Preferences</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: REVIEW & GENERATE */}
      {!isGenerating && step === 7 && (
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 7 · Final Confirmation
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
              Ready to generate your custom Indian journey?
            </h2>
            <p className="text-xs sm:text-sm text-muted-gray mt-1">
              Review your trip summary below before triggering the AI Trip Engine.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-5 rounded-2xl bg-navy-dark/80 border border-white/10 text-xs">
            <div>
              <span className="text-muted-gray block">Destination:</span>
              <span className="font-bold text-warm-white text-sm">{customDestination || destination}</span>
            </div>
            <div>
              <span className="text-muted-gray block">Duration & Travellers:</span>
              <span className="font-bold text-warm-white text-sm">{durationDays} Days · {travellersCount} Person(s)</span>
            </div>
            <div>
              <span className="text-muted-gray block">Budget & Pace:</span>
              <span className="font-bold text-saffron text-sm">{budgetTier} · {travelStyle}</span>
            </div>
            <div>
              <span className="text-muted-gray block">Stay & Transit:</span>
              <span className="font-bold text-emerald-accent text-sm">{accommodationPref} · {transportPref}</span>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-white/10">
            <button type="button" onClick={() => setStep(6)} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" /> Edit
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              className="btn-ai !px-8 !py-3.5 text-sm flex items-center gap-2 shadow-xl shadow-ai-violet/30"
            >
              <Sparkles className="h-4 w-4 animate-spin" />
              <span>Generate AI Itinerary</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 8: GENERATED PERSONALIZED ITINERARY VIEW */}
      {/* ========================================================================= */}
      {step === 8 && itinerary && (
        <div className="space-y-8 animate-fade-in">
          {/* Top Hero Summary Bar */}
          <div className="card-ai p-6 sm:p-8 rounded-3xl space-y-4 border border-ai-violet/30 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="chip-ai font-mono uppercase text-[10px] tracking-wider">
                  ✨ Sanchari Bharat AI Trip Engine
                </span>
                <span className="text-xs text-muted-gray">
                  Generated {new Date(itinerary.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveTrip}
                  className={cn(
                    "btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5 cursor-pointer",
                    savedSuccess && "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                  )}
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  <span>{savedSuccess ? "Saved to My Trips!" : "Save Trip"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-black text-warm-white">
              {itinerary.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-body max-w-4xl">
              {itinerary.summary}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/10 text-xs">
              <div className="p-3 rounded-xl bg-navy-dark/60 border border-white/5">
                <span className="text-muted-gray block text-[11px]">Estimated Budget:</span>
                <span className="font-mono text-base font-bold text-saffron">
                  ₹{itinerary.budgetBreakdown.total.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-navy-dark/60 border border-white/5">
                <span className="text-muted-gray block text-[11px]">Duration & Style:</span>
                <span className="font-bold text-warm-white">
                  {itinerary.durationDays} Days · {itinerary.travelStyle}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-navy-dark/60 border border-white/5">
                <span className="text-muted-gray block text-[11px]">Travellers:</span>
                <span className="font-bold text-warm-white">{itinerary.travellersCount} Person(s)</span>
              </div>
              <div className="p-3 rounded-xl bg-navy-dark/60 border border-white/5">
                <span className="text-muted-gray block text-[11px]">Hidden Gems:</span>
                <span className="font-bold text-emerald-accent">{itinerary.hiddenGemsIncluded.length} Included</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
            {[
              { id: "itinerary", label: "Day-by-Day Timeline" },
              { id: "route", label: "Optimized Route & Map" },
              { id: "budget", label: "Budget Breakdown & Modifier" },
              { id: "stay", label: "Stays & Dining" },
              { id: "safety", label: "Safety & Local Tips" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "chip !py-2 !px-4 text-xs font-semibold cursor-pointer",
                  activeTab === tab.id && "chip-active"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: ITINERARY TIMELINE */}
          {activeTab === "itinerary" && (
            <div className="space-y-6">
              {itinerary.days.map((day) => {
                const isExpanded = expandedDays[day.day] ?? true;
                return (
                  <div
                    key={day.day}
                    className="card-surface p-6 bg-navy-surface/80 border-white/10 rounded-3xl space-y-4"
                  >
                    <div
                      onClick={() => toggleDay(day.day)}
                      className="flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-saffron text-black font-mono font-black text-sm">
                          {day.day}
                        </span>
                        <div>
                          <span className="font-mono text-[10px] uppercase text-saffron font-bold block">
                            Day {day.day}
                          </span>
                          <h3 className="font-display text-lg sm:text-xl font-bold text-warm-white">
                            {day.theme}
                          </h3>
                        </div>
                      </div>

                      <button type="button" className="p-2 text-muted-gray hover:text-white">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-4 border-t border-white/10 space-y-4 animate-fade-in">
                        {/* Time-slotted Activities Timeline */}
                        <div className="space-y-3 relative pl-6 border-l-2 border-saffron/30 ml-4">
                          {day.activities.map((act, idx) => (
                            <div key={idx} className="relative group">
                              <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-saffron border-2 border-navy" />
                              <div className="p-4 rounded-2xl bg-navy-dark/60 border border-white/5 space-y-1.5 hover:border-saffron/40 transition">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="font-mono text-[11px] font-bold text-saffron bg-saffron/10 px-2 py-0.5 rounded-md">
                                    {act.time}
                                  </span>
                                  {act.estimatedCost > 0 && (
                                    <span className="font-mono text-xs text-muted-gray">
                                      Est. ₹{act.estimatedCost}
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-display font-bold text-sm text-warm-white">
                                  {act.title}
                                </h4>
                                <p className="text-xs text-zinc-300 font-body leading-relaxed">
                                  {act.description}
                                </p>
                                {act.whyRecommended && (
                                  <div className="pt-1.5 flex items-start gap-1.5 text-[11px] text-ai-light font-body">
                                    <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                                    <span>{act.whyRecommended}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Day Summary Footer */}
                        <div className="p-4 rounded-2xl bg-navy-dark/40 border border-white/5 flex flex-wrap justify-between items-center gap-3 text-xs">
                          <div className="flex items-center gap-2 text-zinc-300">
                            <Bed className="h-4 w-4 text-emerald-accent" />
                            <span>Stay: <strong className="text-warm-white">{day.stay.name}</strong></span>
                          </div>
                          <div className="font-mono text-xs text-saffron">
                            Day Estimate: ₹{day.dayEstimatedCost.toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: OPTIMIZED ROUTE & MAP */}
          {activeTab === "route" && (
            <div className="card-surface p-6 sm:p-8 bg-navy-surface/80 border-white/10 rounded-3xl space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-warm-white">
                  Optimized Travel Route & Navigation Circuit
                </h3>
                <p className="text-xs text-muted-gray mt-1 font-body">
                  {itinerary.optimizedRoute.summary}
                </p>
              </div>

              {/* Route Chain Flow */}
              <div className="p-6 rounded-2xl bg-navy-dark/80 border border-saffron/30 space-y-4">
                <span className="text-[11px] font-mono text-saffron font-bold uppercase block">
                  Chronological Stop Sequence:
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {itinerary.optimizedRoute.stops.map((stop, idx) => (
                    <div key={stop + idx} className="flex items-center gap-2">
                      <span className="p-2.5 rounded-xl bg-navy-light/70 border border-white/10 font-semibold text-warm-white">
                        {stop}
                      </span>
                      {idx < itinerary.optimizedRoute.stops.length - 1 && (
                        <span className="text-saffron font-bold text-sm">→</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-muted-gray border-t border-white/10">
                  <span>Est. Circuit Distance: <strong>~{itinerary.optimizedRoute.totalDistanceKm} km</strong></span>
                  <span>Transit Mode: <strong>{itinerary.optimizedRoute.recommendedTransport}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BUDGET BREAKDOWN */}
          {activeTab === "budget" && (
            <div className="card-surface p-6 sm:p-8 bg-navy-surface/80 border-white/10 rounded-3xl space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-warm-white">
                  Detailed Cost Breakdown ({itinerary.travellersCount} Travellers · {itinerary.durationDays} Days)
                </h3>
                <p className="text-xs text-muted-gray mt-1">
                  Transparent itemized estimates based on current average regional tariffs.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Accommodation / Stays", amount: itinerary.budgetBreakdown.stay, icon: Bed, color: "text-emerald-accent" },
                  { label: "Intercity & Gateway Travel", amount: itinerary.budgetBreakdown.travel, icon: Car, color: "text-saffron" },
                  { label: "Dining & Food Experiences", amount: itinerary.budgetBreakdown.food, icon: Utensils, color: "text-amber-400" },
                  { label: "Activities & Monuments", amount: itinerary.budgetBreakdown.activities, icon: Compass, color: "text-ai-violet" },
                  { label: "Local Transport / Cabs", amount: itinerary.budgetBreakdown.localTransport, icon: Car, color: "text-teal-400" },
                  { label: "Buffer & Miscellaneous", amount: itinerary.budgetBreakdown.miscellaneous, icon: DollarSign, color: "text-zinc-400" },
                ].map((cat) => (
                  <div key={cat.label} className="p-4 rounded-2xl bg-navy-dark/60 border border-white/5 space-y-1">
                    <div className="flex items-center gap-2">
                      <cat.icon className={cn("h-4 w-4", cat.color)} />
                      <span className="text-xs text-muted-gray">{cat.label}</span>
                    </div>
                    <div className="font-mono text-xl font-bold text-warm-white">
                      ₹{cat.amount.toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-saffron/10 border border-saffron/30 flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase font-mono text-saffron font-bold block">Total Estimated Cost</span>
                  <p className="text-xs text-muted-gray">Includes taxes, average fares, and permits.</p>
                </div>
                <div className="font-mono text-2xl font-black text-saffron">
                  ₹{itinerary.budgetBreakdown.total.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STAYS & DINING */}
          {activeTab === "stay" && (
            <div className="card-surface p-6 sm:p-8 bg-navy-surface/80 border-white/10 rounded-3xl space-y-6">
              <h3 className="font-display text-xl font-bold text-warm-white">
                Recommended Stays & Culinary Highlights
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="p-5 rounded-2xl bg-navy-dark/60 border border-white/10 space-y-2">
                  <span className="text-xs font-mono text-emerald-accent font-bold uppercase">
                    Suggested Stay:
                  </span>
                  <h4 className="font-display font-bold text-base text-warm-white">
                    {itinerary.days[0]?.stay.name}
                  </h4>
                  <p className="text-xs text-zinc-300">{itinerary.days[0]?.stay.description}</p>
                </div>

                <div className="p-5 rounded-2xl bg-navy-dark/60 border border-white/10 space-y-2">
                  <span className="text-xs font-mono text-saffron font-bold uppercase">
                    Signature Culinary Highlights:
                  </span>
                  <h4 className="font-display font-bold text-base text-warm-white">
                    {itinerary.days[0]?.meals.lunch}
                  </h4>
                  <p className="text-xs text-zinc-300">Prepared fresh at verified local heritage eateries.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SAFETY & LOCAL TIPS */}
          {activeTab === "safety" && (
            <div className="card-surface p-6 sm:p-8 bg-navy-surface/80 border-white/10 rounded-3xl space-y-6">
              <h3 className="font-display text-xl font-bold text-warm-white flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-saffron" />
                Verified Safety Advisories & Local Rules
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 pl-4 list-disc">
                {itinerary.safetyTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary !px-5 !py-2 text-xs"
            >
              ← Plan Another Trip
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSaveTrip}
                className="btn-primary !px-5 !py-2 text-xs"
              >
                Save to My Trips
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

