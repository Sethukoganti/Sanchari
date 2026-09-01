import type { Metadata } from "next";
import {
  Calendar,
  FileText,
  Heart,
  Shield,
  Train,
  Wallet,
  Sparkles,
} from "lucide-react";
import { travelEssentials } from "@/data/content";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { AIPlannerWizard } from "@/components/plan/AIPlannerWizard";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "AI Trip Planner · Personalized Day-wise Itineraries | SANCHARI BHARAT",
  description:
    "Generate custom day-wise Indian travel itineraries with route optimization, dynamic budget calculation, hidden gems, and verified local stays in seconds.",
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
    <div className="min-h-screen pb-24 text-[#F8FAFC]">
      <PageHero
        eyebrow="AI Trip Engine"
        title="Personalized AI Trip Planner"
        description="Enter your dream destinations, duration, budget, and travel style. Our AI engine builds an optimized, day-wise timeline with route sequencing and verified local partners."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "AI Trip Planner" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site">
          <AIPlannerWizard />
        </div>
      </section>

      {/* Travel Essentials Grid */}
      <section id="essentials" className="scroll-mt-28 mt-20">
        <div className="container-site section-pad">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-warm-white">
            Travel Essentials & Advisories
          </h2>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm text-muted-gray">
            Practical field notes for first-time and seasoned travelers across Indian states.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {travelEssentials.map((item: { title: string; icon: string; body: string }) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Calendar;
              return (
                <article key={item.title} className="card-surface p-6 bg-navy-surface/60 border-white/10">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-saffron/15 text-saffron border border-saffron/30">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-warm-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-300 font-body">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-pad scroll-mt-28 mt-16">
        <div className="container-site max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-warm-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-gray">
            Straight answers with realistic transfer times and genuine local advice.
          </p>
          <div className="mt-8">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </div>
  );
}
