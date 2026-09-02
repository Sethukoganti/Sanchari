"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Utensils, Star, MapPin, Search, Filter, Sparkles, Check, Heart, Plus } from "lucide-react";
import { foodPlacesData } from "@/data/food";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";

export default function FoodDiscoveryPage() {
  const [query, setQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const results = useMemo(() => {
    return foodPlacesData
      .filter((f) => {
        if (dietFilter === "All") return true;
        if (dietFilter === "Vegetarian") return f.diet === "Vegetarian" || f.diet === "Satvik / Pure Veg";
        if (dietFilter === "Non-Vegetarian") return f.diet === "Non-Vegetarian";
        if (dietFilter === "Vegan") return f.diet === "Vegan" || f.diet === "Satvik / Pure Veg";
        return true;
      })
      .filter((f) => {
        if (categoryFilter === "All") return true;
        return f.category === categoryFilter;
      })
      .filter((f) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase().trim();
        return (
          f.name.toLowerCase().includes(q) ||
          f.destinationName.toLowerCase().includes(q) ||
          f.cuisine.toLowerCase().includes(q) ||
          f.mustTryDishes.some((d) => d.toLowerCase().includes(q))
        );
      });
  }, [query, dietFilter, categoryFilter]);

  return (
    <div className="min-h-screen pb-24 text-[#0B132B] dark:text-[#F8FAFC]">
      <PageHero
        eyebrow="Culinary Trails & Food Discovery"
        title="Authentic Regional Indian Food & Heritage Kitchens"
        description="Discover legendary biryanis in Hyderabad, Banarasi tamatar chaat on the ghats, royal Rajasthani thalis, and tribal bamboo chicken in Araku Valley."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Food & Dining" }]} />
      </div>

      <div className="container-site section-pad mt-8 space-y-8">
        {/* Search & Filter Bar */}
        <div className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-saffron" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by restaurant name, dish (e.g., Biryani, Pyaaz Kachori), or city..."
              className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-navy-dark/60 py-3 pl-11 pr-4 text-sm font-semibold focus:border-saffron focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Diet Filter Chips */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono uppercase text-zinc-500 self-center mr-1">Diet:</span>
              {["All", "Vegetarian", "Non-Vegetarian", "Vegan"].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDietFilter(d)}
                  className={cn(
                    "chip !py-1.5 !px-3.5 text-xs cursor-pointer",
                    dietFilter === d && "chip-active"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono uppercase text-zinc-500 self-center mr-1">Category:</span>
              {["All", "Street Food", "Traditional Thali", "Heritage Kitchen", "Cafes & Chai", "Dessert House"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategoryFilter(c)}
                  className={cn(
                    "chip !py-1.5 !px-3.5 text-xs cursor-pointer",
                    categoryFilter === c && "chip-active"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((food) => (
            <div
              key={food.id}
              className="card-surface overflow-hidden rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 flex flex-col justify-between hover:border-saffron/40 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                  <Image src={food.image} alt={food.name} fill className="object-cover" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 text-saffron text-[10px] font-mono font-bold uppercase backdrop-blur-md border border-saffron/30">
                    {food.cuisine}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-mono font-bold uppercase">
                    {food.diet}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {food.destinationName}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-400 font-mono">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      {food.rating} ({food.reviewsCount})
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold">{food.name}</h3>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 font-mono">
                    <MapPin className="h-3.5 w-3.5 text-saffron shrink-0" />
                    <span>{food.distanceFromCenter}</span>
                  </p>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 font-body leading-relaxed">
                    {food.description}
                  </p>

                  {/* Must-try dishes */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                      Must Try Dishes:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {food.mustTryDishes.slice(0, 3).map((d) => (
                        <span
                          key={d}
                          className="px-2 py-0.5 rounded-md bg-saffron/10 text-saffron text-[10px] font-mono font-semibold"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-black/5 dark:border-white/5 mt-4 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-zinc-400 text-[10px] block">Avg. Cost for Two</span>
                  <span className="font-bold text-saffron">₹{food.averageCostForTwo}</span>
                </div>

                <Link
                  href={`/plan?interest=Food&destination=${encodeURIComponent(food.destinationName)}`}
                  className="btn-secondary !py-1.5 !px-3 text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add to Trip</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
