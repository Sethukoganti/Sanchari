import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Train, Bus, Car, Shield, Compass, Sparkles } from "lucide-react";
import { airportsData, busesData, trainsData } from "@/data/transport";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Getting Around India — Flights, Trains, Buses & Taxis · Explore India",
  description:
    "Master transportation across India: Major international airport terminals, luxury and express trains, Volvo intercity buses, and app-based urban transit.",
};

export default function TransportPage() {
  return (
    <div className="min-h-screen pb-24 text-[#F7F3EC]">
      <PageHero
        eyebrow="Transit & Logistics"
        title="Getting Around India"
        description="Navigate India's vast modern transit ecosystem with confidence: 150+ domestic airports, 68,000 km of railway lines, express highways, and app-based electric cabs."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Transport" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site space-y-16">
          {/* Section 1: Flights & Airports */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Plane className="h-6 w-6 text-turmeric" />
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
                Major Gateway Airports
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {airportsData.map((ap) => (
                <div
                  key={ap.id}
                  className="card-surface p-6 bg-white/[0.03] border-white/10 rounded-2xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-bold text-turmeric bg-turmeric/10 px-3 py-1 rounded-xl border border-turmeric/30">
                      {ap.code}
                    </span>
                    <span className="text-xs text-muted-gray">{ap.city}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-warm-white">{ap.name}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">{ap.terminalInfo}</p>
                  <div className="border-t border-white/5 pt-3">
                    <span className="text-[11px] font-mono text-muted-gray uppercase block mb-1">
                      Direct Flights:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {ap.connections.map((c) => (
                        <span key={c} className="chip !py-0.5 !px-2 text-[10px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Indian Railways */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <Train className="h-6 w-6 text-teal-400" />
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
                  Scenic Trains & Railways
                </h2>
              </div>
              <Link href="/trains" className="btn-secondary !py-1.5 text-xs">
                View All Trains →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trainsData.map((tr) => (
                <div
                  key={tr.id}
                  className="card-surface p-6 bg-white/[0.03] border-white/10 rounded-2xl space-y-3"
                >
                  <span className="rounded-full bg-teal-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-teal-300 uppercase border border-teal-500/30">
                    {tr.type}
                  </span>
                  <h3 className="font-display text-lg font-bold text-warm-white">{tr.name}</h3>
                  <p className="text-xs text-zinc-300">
                    {tr.route.from} to {tr.route.to} ({tr.duration})
                  </p>
                  <div className="pt-2 flex justify-between items-center text-xs">
                    <span className="text-muted-gray">From ₹{tr.classes[0].price.toLocaleString("en-IN")}</span>
                    <Link href="/trains" className="text-turmeric font-semibold hover:underline">
                      Details & Booking →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Intercity Buses & Cabs */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Bus className="h-6 w-6 text-rani" />
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
                Intercity Volvo Buses & Cabs
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {busesData.map((bus) => (
                <div
                  key={bus.id}
                  className="card-surface p-6 bg-white/[0.03] border-white/10 rounded-2xl space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-warm-white">{bus.operator}</span>
                    <span className="font-mono text-sm font-bold text-turmeric">
                      ₹{bus.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-gray">{bus.type}</p>
                  <p className="text-xs text-zinc-200">Route: {bus.route} ({bus.duration})</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {bus.amenities.map((a) => (
                      <span key={a} className="chip !py-0.5 !px-2 text-[10px]">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

