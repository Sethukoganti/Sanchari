"use client";

import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Heart,
  Store,
  Navigation,
} from "lucide-react";

const REGIONS = ["North", "South", "East", "West", "Northeast", "Central"];

const FOOTER_LINKS = {
  explore: [
    { label: "All Destinations", href: "/destinations" },
    { label: "Discover Hidden Gems", href: "/destinations?filter=hidden-gems" },
    { label: "Experiences & Food Trails", href: "/experiences" },
    { label: "Events & Cultural Festivals", href: "/events" },
    { label: "Interactive India Map", href: "/map" },
    { label: "28 States & 8 UTs Directory", href: "/states" },
  ],
  tools: [
    { label: "AI Trip Planner", href: "/plan" },
    { label: "Saved Trips (My Trips)", href: "/saved-trips" },
    { label: "Travel Smart Assistant", href: "/travel-smart" },
    { label: "Verified Local Businesses", href: "/businesses" },
    { label: "Trip Budget Calculator", href: "/budget-calculator" },
    { label: "Destination Comparator", href: "/compare" },
  ],
  company: [
    { label: "About Sanchari Bharat", href: "/about" },
    { label: "Community Reviews & Field Notes", href: "/reviews" },
    { label: "Admin CMS Dashboard", href: "/admin" },
    { label: "Contact & Concierge", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-navy-deep text-[#F8FAFC] overflow-hidden">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl rounded-full bg-radial from-saffron/10 via-ai-violet/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site section-pad pt-16 pb-12 relative z-10 space-y-12">
        {/* Top Brand & Newsletter Banner */}
        <div className="grid gap-10 lg:grid-cols-12 pb-14 border-b border-white/10">
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-amber-600 text-black font-display font-black text-xl shadow-lg shadow-saffron/20">
                SB
              </span>
              <div>
                <span className="font-display text-2xl font-black tracking-tight text-warm-white group-hover:text-saffron transition-colors block">
                  SANCHARI BHARAT
                </span>
                <span className="font-mono text-[10px] text-saffron uppercase font-bold tracking-widest block">
                  Explore India
                </span>
              </div>
            </Link>
            <p className="text-sm text-zinc-300 leading-relaxed font-body max-w-md">
              AI-powered discovery → personalised planning → smarter travel. One intelligent platform for discovering iconic monuments and hidden Indian gems while supporting verified local tourism businesses.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-muted-gray pt-2">
              <span className="flex items-center gap-1 text-emerald-accent">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified Local Partners
              </span>
              <span>·</span>
              <span className="text-ai-light">100% Independent Platform</span>
            </div>
          </div>

          <div className="lg:col-span-7 card-surface p-6 sm:p-8 bg-navy-surface/60 border-white/10 rounded-3xl space-y-4">
            <div>
              <h3 className="font-display text-xl font-bold text-warm-white">
                Subscribe to Seasonal Indian Travel Dispatches
              </h3>
              <p className="text-xs text-muted-gray mt-1">
                Monsoon guides, festival tickets, train quotas, and slow-travel essays delivered fortnightly.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* 4 Organized Columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 border-b border-white/10 pb-12">
          {/* Column 1: Regions */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-saffron font-mono">
              Regions & States
            </p>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-zinc-300">
              {REGIONS.map((region) => (
                <li key={region}>
                  <Link
                    href={`/destinations?region=${encodeURIComponent(region)}`}
                    className="hover:text-saffron transition-colors"
                  >
                    {region} India
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/states" className="font-semibold text-saffron hover:underline">
                  All 28 States & 8 UTs →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Explore Hubs */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-accent font-mono">
              Explore India
            </p>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-zinc-300">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-emerald-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Travel Tools */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ai-violet font-mono">
              Smart Travel Tools
            </p>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-zinc-300">
              {FOOTER_LINKS.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-ai-light transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Platform */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">
              Platform & Concierge
            </p>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-zinc-300">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 text-xs text-muted-gray">
                <span className="block">Support: concierge@sancharibharat.example</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-gray font-mono">
          <p>© {new Date().getFullYear()} SANCHARI BHARAT – Explore India. AI-powered travel platform.</p>
          <p className="text-[11px] text-zinc-500 text-center sm:text-right">
            Disputed boundaries depicted strictly per official Survey of India cartographic standards.
          </p>
        </div>
      </div>
    </footer>
  );
}
