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
  Plane,
  Train,
  CheckCircle,
} from "lucide-react";
import { destinationsData } from "@/data/destinations";
import { generateAITripPlan, type AIPlanInput } from "@/lib/ai-trip-engine";
import type {
  AIGeneratedItinerary,
  BudgetTier,
  TravelStyle,
  AccommodationPreference,
  TransportPreference,
  UserBooking,
} from "@/lib/types";
import { useLanguage, useTranslation } from "@/lib/i18n";
import { BookingCheckoutModal } from "@/components/booking/BookingCheckoutModal";
import { TicketViewModal } from "@/components/booking/TicketViewModal";
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

const FOOD_PREFERENCES = [
  { id: "Local cuisine", label: "Local Cuisine & Delicacies", icon: "🍛" },
  { id: "Vegetarian", label: "Pure Vegetarian Thalis", icon: "🥗" },
  { id: "Vegan", label: "Plant-Based & Vegan", icon: "🌱" },
  { id: "Non-vegetarian", label: "Biryanis & Non-Vegetarian", icon: "🍗" },
  { id: "Spicy food", label: "Spicy Street Flavours", icon: "🌶️" },
  { id: "Desserts", label: "Regional Sweets & Desserts", icon: "🍰" },
  { id: "Cafes", label: "Artisan Coffee & Chai Cafes", icon: "☕" },
  { id: "Traditional food", label: "Clay-pot Heritage Cooking", icon: "🥘" },
  { id: "Fine dining", label: "Royal Heritage Dining", icon: "✨" },
];

const BUDGET_OPTIONS: Array<{ id: BudgetTier; title: string; desc: string; range: string }> = [
  { id: "Budget", title: "Authentic Slow / Budget", desc: "Clean homestays, scenic trains, authentic street kitchens", range: "₹2,000 – ₹3,500 / day" },
  { id: "Moderate", title: "Curated Comfort / Boutique", desc: "Charming 3-4★ boutique stays, private AC cabs, curated experiences", range: "₹4,500 – ₹8,000 / day" },
  { id: "Premium", title: "Premium Heritage", desc: "Historic Havelis, high-speed Vande Bharat, guided food & craft tours", range: "₹9,000 – ₹16,000 / day" },
  { id: "Luxury", title: "Royal Palaces & Bespoke", desc: "5★ Royal palaces, private chauffeurs, private boat charters & butler", range: "₹20,000+ / day" },
];

const TRAVEL_STYLES: Array<{ id: TravelStyle; title: string; desc: string }> = [
  { id: "Relaxed", title: "Slow & Immersive", desc: "1-2 highlights/day with unhurried tea rituals and local village walks" },
  { id: "Balanced", title: "Curated Balance", desc: "3 key monuments/experiences per day with comfortable midday pauses" },
  { id: "Fast-paced", title: "Explorer Expedition", desc: "Packed sunrise-to-night itinerary capturing every landmark & photo spot" },
];

const ACCOMMODATIONS: AccommodationPreference[] = [
  "Hotel",
  "Homestay",
  "Heritage Palace",
  "Resort",
  "Hostel",
  "Luxury",
];

const TRANSPORTS: TransportPreference[] = [
  "Flight",
  "Train",
  "Private Car / Taxi",
  "Bus",
  "Rental Scooter / Bike",
  "Public Transport",
];

export function AIPlannerWizard() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  // Wizard Steps (1 to 7)
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("Hyderabad");
  const [customDestination, setCustomDestination] = useState("");
  const [durationDays, setDurationDays] = useState(4);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>("Moderate");
  const [travellersCount, setTravellersCount] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Heritage", "Food"]);
  const [selectedFoodPrefs, setSelectedFoodPrefs] = useState<string[]>(["Local cuisine", "Vegetarian"]);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("Balanced");
  const [accommodationPref, setAccommodationPref] = useState<AccommodationPreference>("Heritage Palace");
  const [transportPref, setTransportPref] = useState<TransportPreference>("Flight");

  // Output & UI states
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [itinerary, setItinerary] = useState<AIGeneratedItinerary | null>(null);
  const [activeTab, setActiveTab] = useState<"itinerary" | "route" | "budget" | "smartBundle">("itinerary");
  const [isSaved, setIsSaved] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true, 2: true });

  // Direct Booking Modal states
  const [checkoutModalData, setCheckoutModalData] = useState<{
    bookingType: "flight" | "train" | "bus" | "stay";
    title: string;
    subtitle: string;
    totalPrice: number;
  } | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<UserBooking | null>(null);

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((i) => i !== id));
      }
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const toggleFoodPref = (id: string) => {
    if (selectedFoodPrefs.includes(id)) {
      if (selectedFoodPrefs.length > 1) {
        setSelectedFoodPrefs(selectedFoodPrefs.filter((i) => i !== id));
      }
    } else {
      setSelectedFoodPrefs([...selectedFoodPrefs, id]);
    }
  };

  const handleSurpriseMe = () => {
    const gems = destinationsData.filter((d) => d.isHiddenGem);
    const randomGem = gems[Math.floor(Math.random() * gems.length)];
    if (randomGem) {
      setDestination(randomGem.name);
      setCustomDestination(randomGem.name);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setLoadingPhase(0);

    const timer1 = setTimeout(() => setLoadingPhase(1), 700);
    const timer2 = setTimeout(() => setLoadingPhase(2), 1400);
    const timer3 = setTimeout(() => setLoadingPhase(3), 2100);

    setTimeout(() => {
      const generated = generateAITripPlan({
        destination: customDestination.trim() || destination,
        durationDays,
        budgetTier,
        travellersCount,
        interests: selectedInterests,
        foodPreferences: selectedFoodPrefs,
        travelStyle,
        accommodationPref,
        transportPref,
        language,
      });

      setItinerary(generated);
      setIsGenerating(false);
      setStep(8); // View generated plan
    }, 2800);
  };

  const handleSaveTrip = () => {
    if (!itinerary) return;
    try {
      const saved = JSON.parse(localStorage.getItem("sanchari_saved_trips") || "[]");
      const updated = [itinerary, ...saved.filter((t: any) => t.id !== itinerary.id)];
      localStorage.setItem("sanchari_saved_trips", JSON.stringify(updated));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {}
  };

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  return (
    <div className="space-y-8 text-zinc-900 dark:text-warm-white">
      {/* Wizard Progress Indicator */}
      {step < 8 && !isGenerating && (
        <div className="card-surface p-4 sm:p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-saffron font-bold uppercase tracking-wider">
              Step {step} of 7
            </span>
            <span className="text-zinc-500 dark:text-muted-gray font-semibold">
              {step === 1 && "Destination Selection"}
              {step === 2 && "Duration & Dates"}
              {step === 3 && "Budget Tier"}
              {step === 4 && "Travellers Group"}
              {step === 5 && "Interests & Passion Points"}
              {step === 6 && "Food & Dining Preferences"}
              {step === 7 && "Pacing & Review"}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full rounded-full bg-black/5 dark:bg-navy-dark overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-saffron to-ai-violet transition-all duration-500 rounded-full"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {isGenerating && (
        <div className="card-ai p-12 text-center rounded-3xl space-y-6 animate-pulse-glow">
          <div className="h-16 w-16 mx-auto rounded-3xl bg-ai-violet/20 text-ai-violet flex items-center justify-center">
            <Sparkles className="h-8 w-8 animate-spin" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold">
              {loadingPhase === 0 && "Analyzing your travel style and preferences..."}
              {loadingPhase === 1 && "Optimizing landmark routes & hidden gems..."}
              {loadingPhase === 2 && "Selecting authentic verified culinary spots..."}
              {loadingPhase === 3 && "Calculating dynamic itemized budget breakdown..."}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-muted-gray font-mono">
              Crafting personalized day-wise itinerary for {customDestination || destination}
            </p>
          </div>
        </div>
      )}

      {/* STEP 1: DESTINATION */}
      {!isGenerating && step === 1 && (
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 1
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Where in India do you wish to explore?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-muted-gray mt-1">
              Select an iconic destination, explore an undiscovered hidden gem, or let our AI surprise you.
            </p>
          </div>

          {/* Quick Select Buttons */}
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {destinationsData.slice(0, 8).map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setDestination(d.name);
                  setCustomDestination(d.name);
                }}
                className={cn(
                  "p-3.5 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between",
                  (customDestination || destination) === d.name
                    ? "bg-saffron/15 border-saffron text-saffron font-bold shadow-md"
                    : "bg-black/[0.02] dark:bg-navy-dark/60 border-black/10 dark:border-white/10 hover:border-saffron/40"
                )}
              >
                <div>
                  <h4 className="font-display text-sm font-semibold">{d.name}</h4>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{d.state}</p>
                </div>
                {d.isHiddenGem && (
                  <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Gem</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="btn-secondary !py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Shuffle className="h-4 w-4 text-emerald-500" />
              <span>🎲 Surprise Me with a Hidden Gem</span>
            </button>
          </div>

          <div className="flex justify-end pt-4 border-t border-black/10 dark:border-white/10">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-primary flex items-center gap-2"
            >
              <span>Continue to Duration</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DURATION */}
      {!isGenerating && step === 2 && (
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 2
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              How many days are you planning?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-muted-gray mt-1">
              From a quick weekend getaway to a month-long slow cultural immersion.
            </p>
          </div>

          <div className="space-y-4 max-w-xl">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Duration:</span>
              <span className="font-mono text-3xl font-extrabold text-saffron">
                {durationDays} Days / {durationDays - 1} Nights
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={30}
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full accent-saffron h-3 cursor-pointer"
            />
          </div>

          <div className="flex justify-between pt-4 border-t border-black/10 dark:border-white/10">
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
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 3
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              What is your target budget tier?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-muted-gray mt-1">
              Estimates include stays, transit, meals, and curated experiences.
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
                    ? "bg-saffron/15 border-saffron shadow-lg shadow-saffron/10"
                    : "bg-black/[0.02] dark:bg-navy-dark/60 border-black/10 dark:border-white/10"
                )}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-base">{b.title}</h4>
                  <span className="text-xs font-mono font-bold text-saffron">{b.range}</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-muted-gray">{b.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-black/10 dark:border-white/10">
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
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 4
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              How many travellers?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-muted-gray mt-1">
              We adjust room allocations, transport types, and group activity bookings.
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
                    ? "bg-emerald-500/15 border-emerald-500 shadow-lg shadow-emerald-500/10"
                    : "bg-black/[0.02] dark:bg-navy-dark/60 border-black/10 dark:border-white/10 text-zinc-600 dark:text-muted-gray"
                )}
              >
                <div className="font-mono text-2xl font-black text-emerald-600 dark:text-emerald-400">{tr.count}</div>
                <h4 className="font-display font-bold text-xs">{tr.label}</h4>
                <p className="text-[10px] text-zinc-500">{tr.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-black/10 dark:border-white/10">
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
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 5
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              What experiences inspire you most?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-muted-gray mt-1">
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
                      ? "bg-ai-violet/20 border-ai-violet text-ai-violet shadow-md"
                      : "bg-black/[0.02] dark:bg-navy-dark/60 border-black/10 dark:border-white/10 hover:border-ai-violet/40"
                  )}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-sm">{item.id}</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-muted-gray">{item.label}</p>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-ai-violet" />}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between pt-4 border-t border-black/10 dark:border-white/10">
            <button type="button" onClick={() => setStep(4)} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="button" onClick={() => setStep(6)} className="btn-primary">
              <span>Continue to Food Preferences</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: FOOD PREFERENCES */}
      {!isGenerating && step === 6 && (
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 6 · Culinary Personalisation
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              What kind of food do you enjoy?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-muted-gray mt-1">
              Our AI pairs every day with verified eateries matching your taste and dietary restrictions.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FOOD_PREFERENCES.map((food) => {
              const isSelected = selectedFoodPrefs.includes(food.id);
              return (
                <button
                  key={food.id}
                  type="button"
                  onClick={() => toggleFoodPref(food.id)}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer",
                    isSelected
                      ? "bg-amber-500/15 border-amber-500 text-amber-600 dark:text-amber-400 shadow-md"
                      : "bg-black/[0.02] dark:bg-navy-dark/60 border-black/10 dark:border-white/10 hover:border-amber-500/40"
                  )}
                >
                  <span className="text-2xl">{food.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-sm">{food.label}</h4>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-amber-500" />}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between pt-4 border-t border-black/10 dark:border-white/10">
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
        <div className="card-surface p-6 sm:p-10 space-y-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10">
          <div>
            <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
              Step 7 · Final Confirmation
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Ready to generate your custom Indian journey?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-muted-gray mt-1">
              Review your trip summary below before triggering the AI Trip Engine.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-5 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/80 border border-black/10 dark:border-white/10 text-xs">
            <div>
              <span className="text-zinc-500 block">Destination:</span>
              <span className="font-bold text-sm">{customDestination || destination}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Duration & Travellers:</span>
              <span className="font-bold text-sm">{durationDays} Days · {travellersCount} Pax</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Budget & Style:</span>
              <span className="font-bold text-saffron text-sm">{budgetTier} · {travelStyle}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Food Diet:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{selectedFoodPrefs.join(", ")}</span>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-black/10 dark:border-white/10">
            <button type="button" onClick={() => setStep(6)} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" /> Edit
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              className="btn-ai !px-8 !py-3.5 text-sm flex items-center gap-2 shadow-xl shadow-ai-violet/30 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 animate-spin" />
              <span>Generate AI Itinerary</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 8: GENERATED ITINERARY VIEW & SMART BUNDLE */}
      {step === 8 && itinerary && (
        <div className="space-y-8 animate-fade-in">
          {/* Top Hero Summary Bar */}
          <div className="card-ai p-6 sm:p-8 rounded-3xl space-y-4 border border-ai-violet/30 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-ai-violet font-bold block">
                  AI TRIP ARCHITECT · SANCHARI BHARAT
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold mt-1">
                  {itinerary.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1 max-w-3xl font-body">
                  {itinerary.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleSaveTrip}
                  className="btn-primary !py-2 !px-4 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Bookmark className="h-4 w-4" />
                  <span>{isSaved ? "Saved to My Trips ✓" : "Save to My Trips"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary !py-2 !px-4 text-xs font-bold cursor-pointer"
                >
                  New Plan
                </button>
              </div>
            </div>

            {/* Smart Bundle Banner */}
            {itinerary.smartBundle && (
              <div className="p-5 rounded-2xl bg-saffron/10 border border-saffron/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                <div>
                  <span className="text-[10px] font-mono text-saffron uppercase font-bold tracking-widest block">
                    ⚡ Smart Trip Bundle & 1-Click Booking
                  </span>
                  <p className="font-display text-lg font-bold mt-0.5">
                    Complete Travel Package (Transport + {itinerary.durationDays}N Stays + Food + Activities)
                  </p>
                  <p className="text-xs text-zinc-500 font-mono">
                    Bundle Total: <strong className="text-saffron text-sm">₹{itinerary.smartBundle.totalBundlePrice.toLocaleString("en-IN")}</strong>{" "}
                    (Saved ₹{itinerary.smartBundle.discountApplied.toLocaleString("en-IN")} with 12% Package Discount)
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCheckoutModalData({
                      bookingType: "stay",
                      title: `Complete Trip Bundle to ${itinerary.destination}`,
                      subtitle: `${itinerary.durationDays} Days / Stays & Transit`,
                      totalPrice: itinerary.smartBundle!.totalBundlePrice,
                    })
                  }
                  className="btn-primary !py-2.5 !px-6 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-saffron/30"
                >
                  <span>Book Selected Bundle</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-3 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("itinerary")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer",
                activeTab === "itinerary" ? "bg-saffron text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              )}
            >
              Day-by-Day Timeline
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("route")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer",
                activeTab === "route" ? "bg-saffron text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              )}
            >
              Route Circuit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("budget")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer",
                activeTab === "budget" ? "bg-saffron text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              )}
            >
              Budget Breakdown
            </button>
          </div>

          {/* TAB 1: DAY-BY-DAY TIMELINE */}
          {activeTab === "itinerary" && (
            <div className="space-y-6">
              {itinerary.days.map((day) => {
                const isExpanded = expandedDays[day.day] ?? true;
                return (
                  <div
                    key={day.day}
                    className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 space-y-4"
                  >
                    <div
                      onClick={() => toggleDay(day.day)}
                      className="flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-saffron text-white font-mono font-black text-sm">
                          {day.day}
                        </span>
                        <div>
                          <h3 className="font-display text-lg sm:text-xl font-bold">
                            {day.theme}
                          </h3>
                        </div>
                      </div>

                      <button type="button" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-4 animate-fade-in">
                        {/* Time-slotted Activities Timeline */}
                        <div className="space-y-3 relative pl-6 border-l-2 border-saffron/30 ml-4">
                          {day.activities.map((act, idx) => (
                            <div key={idx} className="relative group">
                              <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-saffron border-2 border-white dark:border-navy" />
                              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-navy-dark/60 border border-black/5 dark:border-white/5 space-y-2 hover:border-saffron/40 transition">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="font-mono text-[11px] font-bold text-saffron bg-saffron/10 px-2 py-0.5 rounded-md">
                                    {act.time}
                                  </span>
                                  {act.estimatedCost > 0 && (
                                    <span className="font-mono text-xs text-zinc-500">
                                      Est. ₹{act.estimatedCost}
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-display font-bold text-sm">
                                  {act.title}
                                </h4>
                                <p className="text-xs text-zinc-600 dark:text-zinc-300 font-body leading-relaxed">
                                  {act.description}
                                </p>

                                {act.whyRecommended && (
                                  <div className="pt-1 flex items-start gap-1.5 text-[11px] text-ai-violet font-body">
                                    <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                                    <span>{act.whyRecommended}</span>
                                  </div>
                                )}

                                {/* Booking CTA Button inside activity */}
                                {act.bookingAction && (
                                  <div className="pt-2">
                                    <Link
                                      href={act.bookingAction.link}
                                      className="btn-primary !py-1.5 !px-3 text-[11px] font-bold inline-flex items-center gap-1.5"
                                    >
                                      <span>{act.bookingAction.label}</span>
                                      <ArrowRight className="h-3 w-3" />
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Day Stay & Booking */}
                        <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/40 border border-black/5 dark:border-white/5 flex flex-wrap justify-between items-center gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4 text-emerald-500" />
                            <span>Stay: <strong>{day.stay.name}</strong></span>
                          </div>

                          <Link
                            href={day.stay.bookingUrl || "/book/stays"}
                            className="text-saffron font-bold hover:underline"
                          >
                            Book This Stay →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: ROUTE */}
          {activeTab === "route" && (
            <div className="card-surface p-6 sm:p-8 bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 rounded-3xl space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold">
                  Optimized Travel Route & Navigation Circuit
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  {itinerary.optimizedRoute.summary}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/80 border border-saffron/30 space-y-4">
                <span className="text-[11px] font-mono text-saffron font-bold uppercase block">
                  Chronological Stop Sequence:
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {itinerary.optimizedRoute.stops.map((stop, idx) => (
                    <div key={stop + idx} className="flex items-center gap-2">
                      <span className="p-2.5 rounded-xl bg-white dark:bg-navy-light/70 border border-black/10 dark:border-white/10 font-semibold">
                        {stop}
                      </span>
                      {idx < itinerary.optimizedRoute.stops.length - 1 && (
                        <span className="text-saffron font-bold text-sm">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BUDGET */}
          {activeTab === "budget" && (
            <div className="card-surface p-6 sm:p-8 bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 rounded-3xl space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold">
                  Detailed Cost Breakdown ({itinerary.travellersCount} Pax · {itinerary.durationDays} Days)
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Transparent itemized estimates based on current average regional tariffs.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Accommodation / Stays", amount: itinerary.budgetBreakdown.stay, icon: Bed, color: "text-emerald-500" },
                  { label: "Intercity & Gateway Travel", amount: itinerary.budgetBreakdown.travel, icon: Car, color: "text-saffron" },
                  { label: "Dining & Food Experiences", amount: itinerary.budgetBreakdown.food, icon: Utensils, color: "text-amber-500" },
                  { label: "Activities & Monuments", amount: itinerary.budgetBreakdown.activities, icon: Compass, color: "text-ai-violet" },
                  { label: "Local Transport / Cabs", amount: itinerary.budgetBreakdown.localTransport, icon: Car, color: "text-teal-500" },
                  { label: "Buffer & Miscellaneous", amount: itinerary.budgetBreakdown.miscellaneous, icon: DollarSign, color: "text-zinc-500" },
                ].map((cat) => (
                  <div key={cat.label} className="p-4 rounded-2xl bg-black/[0.02] dark:bg-navy-dark/60 border border-black/5 dark:border-white/5 space-y-1">
                    <div className="flex items-center gap-2">
                      <cat.icon className={cn("h-4 w-4", cat.color)} />
                      <span className="text-xs text-zinc-500">{cat.label}</span>
                    </div>
                    <div className="font-mono text-xl font-bold">
                      ₹{cat.amount.toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Direct Bundle Checkout Modal */}
      {checkoutModalData && (
        <BookingCheckoutModal
          isOpen={!!checkoutModalData}
          onClose={() => setCheckoutModalData(null)}
          bookingType={checkoutModalData.bookingType}
          itemTitle={checkoutModalData.title}
          itemSubtitle={checkoutModalData.subtitle}
          from={itinerary?.destination || "Origin"}
          to={itinerary?.destination || "Destination"}
          travelDate="2026-09-15"
          totalPrice={checkoutModalData.totalPrice}
          onBookingSuccess={(booking) => {
            setCheckoutModalData(null);
            setConfirmedBooking(booking);
          }}
        />
      )}

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <TicketViewModal
          isOpen={!!confirmedBooking}
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      )}
    </div>
  );
}
