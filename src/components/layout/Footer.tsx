"use client";

import Link from "next/link";
import { Mail, TrainFront } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/destinations", label: "Destinations" },
      { href: "/experiences", label: "Experiences" },
      { href: "/map", label: "Interactive map" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Plan",
    links: [
      { href: "/plan", label: "Itinerary builder" },
      { href: "/plan#essentials", label: "Travel essentials" },
      { href: "/plan#faq", label: "FAQ" },
      { href: "/events", label: "Events calendar" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/stories", label: "Stories & culture" },
      { href: "/contact", label: "Contact" },
      { href: "/search", label: "Search" },
    ],
  },
];

export function Footer() {
  const { t, currentLanguage, openLanguageModal } = useLanguage();

  return (
    <footer className="border-t border-[rgba(230,57,86,0.18)] bg-[#0B0204] text-white">
      <div className="container-site section-pad py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8E162C] to-[#4A0E17] text-[#F7EAC8] border border-[#D4AF37]/40 shadow-md">
                <TrainFront className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-display text-2xl font-bold tracking-wide text-white">Explore India</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-300">
              An independent travel platform for cinematic routes, living
              festivals, and itineraries paced like real journeys—not brochure
              sprints.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-zinc-300 transition hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#8E162C]/20"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-zinc-300 transition hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#8E162C]/20"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="mailto:hello@exploreindia.travel"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-zinc-300 transition hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#8E162C]/20"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <button
              type="button"
              onClick={openLanguageModal}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#1A070B] px-4 py-2 text-xs font-semibold text-[#F7EAC8] transition hover:border-[#D4AF37] hover:bg-[#8E162C]/30 cursor-pointer shadow-sm"
              aria-label={t.nav.language}
            >
              <span>{currentLanguage.flag || "🌐"}</span>
              <span className="font-display font-medium tracking-wide">
                {currentLanguage.nativeName} ({currentLanguage.name})
              </span>
              <span className="text-[#D4AF37] ml-1">· Change / बदलें</span>
            </button>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-300 transition hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Newsletter
            </p>
            <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
              Seasons, seats, and festival windows—once a month.
            </p>
            <div className="mt-4">
              <NewsletterForm source="footer" compact />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Explore India. Crafted as an independent platform.</p>
          <p>Content written for travelers, authentic imagery across 31 Indian states.</p>
        </div>
      </div>
    </footer>
  );
}
