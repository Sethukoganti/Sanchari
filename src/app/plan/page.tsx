import type { Metadata } from "next";
import {
  Calendar,
  FileText,
  Heart,
  Shield,
  Train,
  Wallet,
} from "lucide-react";
import { travelEssentials } from "@/data/content";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { ItineraryBuilder } from "@/components/plan/ItineraryBuilder";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Plan Your Trip",
  description:
    "Build a day-by-day India itinerary, review travel essentials, and browse practical FAQs.",
};

const iconMap = {
  passport: FileText,
  calendar: Calendar,
  wallet: Wallet,
  shield: Shield,
  train: Train,
  heart: Heart,
} as const;

export default function PlanPage() {
  return (
    <>
      <PageHero
        eyebrow="Plan your trip"
        title="Build an arc, not a scramble"
        description="Answer four short prompts and get a templated day-by-day itinerary you can download or email. Then skim essentials and FAQ."
      />
      <section className="section-pad py-14 lg:py-20">
        <div className="container-site">
          <ItineraryBuilder />
        </div>
      </section>

      <section id="essentials" className="scroll-mt-28 bg-surface-elevated py-16 lg:py-24">
        <div className="container-site section-pad">
          <h2 className="font-display text-3xl sm:text-4xl">Travel essentials</h2>
          <p className="mt-3 max-w-2xl text-ink-muted">
            Practical notes for first-timers. Always verify visas and advisories
            with official government sources—Explore India is independent.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {travelEssentials.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Calendar;
              return (
                <article key={item.title} className="card-surface p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-saffron/10 text-saffron">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faq" className="section-pad scroll-mt-28 py-16 lg:py-24">
        <div className="container-site max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl">FAQ</h2>
          <p className="mt-3 text-ink-muted">
            Straight answers with enough detail to act on—not brochure vagueness.
          </p>
          <div className="mt-8">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  );
}
