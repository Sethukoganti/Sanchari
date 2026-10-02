"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  MapPin,
  ArrowRight,
  Compass,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_CATEGORIES = [
  { label: "Beaches", href: "/destinations?theme=Beaches+%26+Islands", icon: "🏖️" },
  { label: "Mountains", href: "/destinations?theme=Hill+Stations", icon: "🏔️" },
  { label: "Heritage", href: "/destinations?theme=Heritage+%26+Culture", icon: "🏛️" },
  { label: "Wildlife", href: "/destinations?theme=Wildlife+%26+Nature", icon: "🐅" },
  { label: "Spiritual", href: "/destinations?theme=Spiritual+%26+Pilgrimage", icon: "🕉️" },
  { label: "Food", href: "/experiences?category=Local+Food", icon: "🍛" },
  { label: "Festivals", href: "/events", icon: "🪔" },
  { label: "Adventure", href: "/experiences?category=Adventure", icon: "🧗" },
  { label: "Hidden Gems", href: "/destinations?filter=hidden-gems", icon: "💎", highlight: true },
];

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/destinations");
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
      {/* Background Cinematic Image with Deep Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=85"
          alt="Majestic India Heritage"
          fill
          priority
          className="object-cover object-center brightness-100 dark:brightness-60 scale-105 transition-transform duration-1000"
          sizes="100vw"
          />
        {/* Multilayered radial and vertical dark blue gradient overlays */}
       <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/45 to-white/20 dark:from-navy-deep dark:via-navy-deep/75 dark:to-navy-dark/60" />
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.25)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(11,19,43,0.3)_0%,rgba(5,8,17,0.95)_100%)]" />
       </div>

      <div className="container-site relative z-10 text-center space-y-8 max-w-5xl mx-auto px-4">
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-surface/80 border border-saffron/40 backdrop-blur-xl shadow-xl shadow-saffron/10 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-saffron animate-ping" />
          <span className="font-mono text-xs font-bold text-saffron uppercase tracking-widest">
            SANCHARI BHARAT · AI-POWERED TRAVEL DISCOVERY
          </span>
        </div>

        {/* Main Headings */}
        <div className="space-y-4">
         <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-navy dark:text-white tracking-tight leading-[1.08]">
          Discover India. <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-amber-400 to-emerald-accent">Plan Smarter.</span> Travel Better.
          </h1>
          <p className="font-body text-base sm:text-xl text-slate-700 dark:text-white max-w-3xl mx-auto leading-relaxed">
            Explore destinations, experiences and hidden gems across India — and let AI create a personalised, day-wise trip for you in seconds.
          </p>
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/plan"
            className="btn-ai !py-3.5 !px-8 text-sm sm:text-base font-bold shadow-2xl shadow-ai-violet/40 flex items-center gap-2 group cursor-pointer"
          >
            <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            <span>Plan My Trip with AI</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/destinations"
            className="btn-secondary !py-3.5 !px-8 text-sm sm:text-base font-bold flex items-center gap-2 cursor-pointer"
          >
            <Compass className="h-4 w-4 text-white" />
            <span>Explore India</span>
          </Link>
        </div>

        {/* Interactive Search Bar */}
        <div className="max-w-2xl mx-auto pt-4">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center p-2 rounded-2xl bg-white/95 dark:bg-navy-surface/90 border border-slate-300 dark:border-white/20 backdrop-blur-2xl shadow-2xl hover:border-saffron/50 transition-all group"
            >
            <Search className="h-5 w-5 text-white ml-3.5 shrink-0 group-hover:scale-110 transition-transform" />
            <input
              type="text"
              placeholder="Search destinations, states, festivals, experiences..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent px-4 py-2.5 text-xs sm:text-sm text-navy dark:text-white placeholder:text-slate-500 dark:placeholder:text-muted-gray outline-none font-body"
               />
            <button
              type="submit"
              className="btn-primary !py-2.5 !px-5 text-xs shrink-0 cursor-pointer"
            >
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Quick Category Chips */}
        <div className="pt-2">
          <p className="text-[11px] font-mono text-slate-700 dark:text-white uppercase tracking-wider mb-3">
             Quick Discovery Categories:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className={cn(
                  "chip !py-1.5 !px-3.5 text-xs transition cursor-pointer",
                  cat.highlight
                    ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold hover:bg-emerald-900/50"
                    : "hover:border-saffron/40"
                )}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
