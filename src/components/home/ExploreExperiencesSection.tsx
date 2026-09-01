"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Clock, Star, ArrowRight, ShieldCheck, Plus } from "lucide-react";
import { experiencesData } from "@/data/experiences";

export function ExploreExperiencesSection() {
  return (
    <section className="container-site section-pad space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-xs text-saffron uppercase font-bold tracking-widest block mb-1">
            Curated Local Activities
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-warm-white">
            Explore by Experience
          </h2>
          <p className="text-xs sm:text-sm text-muted-gray mt-1 max-w-2xl font-body">
            Immerse in indigenous crafts, river rafting, midnight culinary food trails, and Vedic classical music recitals.
          </p>
        </div>

        <Link
          href="/experiences"
          className="text-xs font-semibold text-saffron hover:underline flex items-center gap-1.5"
        >
          <span>All Experiences ({experiencesData.length})</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {experiencesData.slice(0, 6).map((exp) => (
          <div
            key={exp.id}
            className="group card-surface overflow-hidden bg-navy-surface/60 border-white/10 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:border-saffron/40 hover:-translate-y-1"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-black/30" />

                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="chip !py-1 !px-2.5 text-[10px] bg-black/60 backdrop-blur-md text-saffron border-saffron/30 font-mono">
                    {exp.category}
                  </span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex justify-between items-center text-xs">
                  <span className="text-warm-white font-semibold flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-gray" />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-1 text-amber-300 font-bold bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                    <Star className="h-3 w-3 fill-amber-300" />
                    {exp.rating}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-display text-base font-bold text-warm-white group-hover:text-saffron transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs text-zinc-300 font-body leading-relaxed line-clamp-2">
                  {exp.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-muted-gray border-t border-white/5">
                  <span>Location: <strong className="text-warm-white">{exp.destination}</strong></span>
                  <span className="font-mono text-saffron font-bold">{exp.priceRange}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center gap-2">
              <Link
                href="/plan"
                className="btn-primary w-full justify-center !py-2 text-xs flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add to Trip Planner</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

