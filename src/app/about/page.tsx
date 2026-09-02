import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Compass, Shield, Heart, Mail } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Explore India · Independent Travel Platform",
  description:
    "Explore India is an independent platform for slow-paced cinematic routes, living cultural festivals, and realistic travel itineraries across the subcontinent.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-24 text-zinc-900 dark:text-[#F7F3EC]">
      <PageHero
        eyebrow="Our Manifesto"
        title="An Independent Desk for Slow Travel Explorers"
        description="Explore India was crafted to counter rushed tourist sprints. We curate bases with room to linger, genuine cultural contexts, and realistic travel times."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "About" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          {/* Main Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-warm-white">
                Why We Built Explore India
              </h2>
              <p className="text-base text-zinc-300 leading-relaxed font-body">
                Travel in India is deeply sensory, layered, and transformative. Yet too many tourism websites treat the country as an overwhelming checklist of 50 monuments squeezed into 5 days.
              </p>
              <p className="text-base text-zinc-300 leading-relaxed font-body">
                We believe the true magic of the subcontinent reveals itself when you slow down: sipping spiced chai at dawn beside the Ghats of Varanasi, listening to temple bells echoing over the ruins of Hampi, or watching the morning mist rise over emerald backwater lagoons in Kerala.
              </p>
            </div>

            <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-warm-white">
                What Sets Our Platform Apart
              </h2>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="text-turmeric font-bold">✓</span>
                  <span><strong>Multilingual Storytelling:</strong> Native cultural narratives translated across 10 scheduled Indian languages with audio speech.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-turmeric font-bold">✓</span>
                  <span><strong>Accurate Interactive Map:</strong> Full SVG coverage of all 28 states & 8 Union Territories with official borders and animated circuits.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-turmeric font-bold">✓</span>
                  <span><strong>Indian Railways Explorer:</strong> Deep focus on mountain toy trains, royal locomotives, and modern Vande Bharat routes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-turmeric font-bold">✓</span>
                  <span><strong>Living Festivals Hub:</strong> Curated guide to 50+ living celebrations, rituals, foods, and festive attire.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="card-surface p-8 bg-gradient-to-b from-[#180E02] to-[#0A0A0A] border-turmeric/30 space-y-6">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-turmeric">
                  Subcontinent Motto
                </p>
                <p className="mt-2 font-display text-3xl font-extrabold text-warm-white">
                  A Billion Stories Await
                </p>
                <p className="mt-1 font-hindi text-xl text-turmeric font-semibold">
                  अतिथि देवो भव
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-1 text-xs text-muted-gray">
                <p className="font-mono uppercase text-zinc-300">Editorial Desk</p>
                <p>hello@exploreindia.travel</p>
                <p>New Delhi · Mumbai · Bengaluru</p>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <Link href="/contact" className="btn-primary w-full justify-center text-xs !py-2.5">
                  <Mail className="h-4 w-4" />
                  <span>Write to Editorial Desk</span>
                </Link>
                <Link href="/plan" className="btn-secondary w-full justify-center text-xs !py-2.5">
                  <span>Open Custom Trip Planner</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
