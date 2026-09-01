"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Star, Phone, ArrowRight, Store } from "lucide-react";
import { businessesData } from "@/data/businesses";

export function LocalBusinessesSection() {
  return (
    <section className="container-site section-pad space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="chip !py-1 !px-2.5 text-[10px] bg-emerald-950/40 text-emerald-300 border-emerald-500/40 font-mono font-bold">
              ✓ Verified Local Ecosystem
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-warm-white mt-1">
            Local Tourism Businesses
          </h2>
          <p className="text-xs sm:text-sm text-muted-gray mt-1 max-w-2xl font-body">
            Directly connect with certified indigenous guides, solar-powered farmstays, and artisan handloom cooperatives.
          </p>
        </div>

        <Link
          href="/businesses"
          className="text-xs font-semibold text-emerald-accent hover:underline flex items-center gap-1.5"
        >
          <span>View All Partners ({businessesData.length})</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {businessesData.slice(0, 3).map((biz) => (
          <div
            key={biz.id}
            className="group card-surface overflow-hidden bg-navy-surface/60 border-white/10 hover:border-emerald-500/40 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={biz.image}
                  alt={biz.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-black/30" />

                <div className="absolute top-3 left-3">
                  <span className="chip !py-1 !px-2.5 text-[10px] bg-emerald-950/80 backdrop-blur-md text-emerald-300 border-emerald-500/50 font-bold flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Local Business
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-[10px] font-bold text-saffron uppercase">
                    {biz.category}
                  </span>
                  <span className="flex items-center gap-1 text-amber-300 font-bold">
                    <Star className="h-3 w-3 fill-amber-300" />
                    {biz.rating} ({biz.reviewsCount})
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-warm-white group-hover:text-emerald-accent transition-colors">
                  {biz.name}
                </h3>
                <p className="text-xs text-zinc-300 font-body leading-relaxed line-clamp-2">
                  {biz.description}
                </p>

                <div className="pt-2 text-xs text-muted-gray border-t border-white/5 space-y-1">
                  <div>Location: <strong className="text-warm-white">{biz.location}</strong></div>
                  <div>Tariff: <strong className="text-saffron font-mono">{biz.priceRange}</strong></div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <a
                href={`tel:${biz.phone}`}
                className="btn-secondary w-full justify-center !py-2 text-xs flex items-center gap-1.5 hover:border-emerald-500/40"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-accent" />
                <span>Call Verified Partner</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

