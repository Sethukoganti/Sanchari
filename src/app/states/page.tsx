import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Compass } from "lucide-react";
import { statesData } from "@/data/states";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Explore India's 28 States & 8 Union Territories · Explore India",
  description:
    "Comprehensive directory of all 28 Indian states and 8 union territories. Discover regional culture, signature cuisines, festivals, and transport networks.",
};

const REGIONS = ["North", "South", "East", "West", "Northeast", "Central"] as const;

export default function StatesPage() {
  return (
    <div className="min-h-screen pb-24 text-zinc-900 dark:text-[#F7F3EC]">
      <PageHero
        eyebrow="The Sovereign Tapestry"
        title="28 States & 8 Union Territories"
        description="From the high snow-dusted Karakoram passes of Ladakh to the turquoise tropical waters of the Indian Ocean, explore India state by state."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "States" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site space-y-16">
          {REGIONS.map((region) => {
            const regionalStates = statesData.filter((s) => s.region === region);
            if (regionalStates.length === 0) return null;

            return (
              <div key={region} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <span className="h-3 w-3 rounded-full bg-turmeric" />
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
                    {region} India
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {regionalStates.map((st) => (
                    <Link
                      key={st.slug}
                      href={`/states/${st.slug}`}
                      className="group card-surface block overflow-hidden rounded-2xl bg-white/[0.03] border-white/10 transition duration-300 hover:scale-[1.02] hover:border-turmeric/50 hover:shadow-xl hover:shadow-turmeric/10"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                        <Image
                          src={st.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"}
                          alt={st.name}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                        <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-2.5 py-0.5 font-mono text-[10px] font-bold text-turmeric uppercase border border-turmeric/30 backdrop-blur-md">
                          Capital: {st.capital}
                        </span>
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="font-display text-xl font-bold text-warm-white group-hover:text-turmeric transition-colors flex items-center justify-between">
                          <span>{st.name}</span>
                          <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </h3>
                        <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                          {st.summary}
                        </p>

                        <div className="border-t border-white/5 pt-3 flex flex-wrap gap-1.5">
                          {(st.cuisine || []).slice(0, 3).map((food) => (
                            <span key={food} className="chip !py-0.5 !px-2 text-[10px]">
                              {food}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
