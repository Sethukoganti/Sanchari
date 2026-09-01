import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EXPERIENCE_CATEGORIES, experiences } from "@/data/content";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Star, Clock, Plus, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Curated Cultural Experiences & Expeditions · SANCHARI BHARAT",
  description:
    "Local culinary trails, river rafting, ancient craft studios, scenic coracle voyages, and living cultural immersions across India.",
};

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen pb-24 text-[#F8FAFC]">
      <PageHero
        eyebrow="Living Cultural Traditions"
        title="Curated Experiences & Cultural Expeditions"
        description="Immerse yourself in authentic Indian experiences—from midnight Biryani walks in Hyderabad to bamboo village living in Ziro and sunrise coracle voyages in Hampi."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Experiences" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site space-y-8">
          <div className="flex flex-wrap gap-2">
            {EXPERIENCE_CATEGORIES.map((cat: string) => (
              <a key={cat} href={`#${cat}`} className="chip !py-1.5 !px-3 text-xs">
                {cat}
              </a>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                id={exp.category}
                className="group card-surface overflow-hidden bg-navy-surface/60 border-white/10 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:border-saffron/40 hover:-translate-y-1"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-black/30" />
                    <span className="absolute top-3 left-3 rounded-full bg-black/80 px-2.5 py-1 font-mono text-[10px] font-bold text-saffron border border-saffron/30 uppercase tracking-wider backdrop-blur-md">
                      {exp.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <p className="text-xs font-mono uppercase text-emerald-accent font-semibold">
                      {exp.destination} ({exp.state})
                    </p>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-warm-white transition-colors group-hover:text-saffron">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed font-body">
                      {exp.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-white/5 mt-auto flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1 text-amber-300 font-bold">
                    <Star className="h-3.5 w-3.5 fill-amber-300" />
                    {exp.rating}
                  </span>
                  <span className="text-saffron font-bold">
                    {exp.priceRange}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
