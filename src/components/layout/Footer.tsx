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
    <footer className="bg-navy text-white">
      <div className="container-site section-pad py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-turmeric text-dusk-ink">
                <TrainFront className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-display text-2xl">Explore India</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-warm-white/70">
              An independent travel platform for cinematic routes, living
              festivals, and itineraries paced like real journeys—not brochure
              sprints. Not a government website.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-warm-white/20 hover:border-turmeric hover:text-turmeric"
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-warm-white/20 hover:border-turmeric hover:text-turmeric"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="mailto:hello@exploreindia.travel"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-warm-white/20 hover:border-turmeric hover:text-turmeric"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <button
              type="button"
              onClick={openLanguageModal}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-warm-white/20 bg-warm-white/5 px-4 py-2 text-xs font-semibold text-warm-white transition hover:border-turmeric hover:bg-warm-white/15"
              aria-label={t.nav.language}
            >
              <span>{currentLanguage.flag || "🌐"}</span>
              <span className="font-display font-medium tracking-wide">
                {currentLanguage.nativeName} ({currentLanguage.name})
              </span>
              <span className="text-turmeric ml-1">· Change / बदलें</span>
            </button>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-warm-white/75 transition hover:text-warm-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric">
              Newsletter
            </p>
            <p className="mt-4 text-sm text-warm-white/70">
              Seasons, seats, and festival windows—once a month.
            </p>
            <div className="mt-4">
              <NewsletterForm source="footer" compact />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-warm-white/10 pt-8 text-xs text-warm-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Explore India. Crafted as an independent platform.</p>
          <p>Content written for travelers, not copied from tourism boards.</p>
        </div>
      </div>
    </footer>
  );
}
