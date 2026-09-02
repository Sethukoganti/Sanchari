import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Train,
  Sparkles,
  Compass,
  Clock,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Star,
} from "lucide-react";
import { trainsData } from "@/data/transport";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Indian Railways Explorer & Luxury Trains · Explore India",
  description:
    "Discover the world's greatest rail network: Palace on Wheels, Maharajas' Express, UNESCO Darjeeling & Kalka-Shimla Toy Trains, and modern Vande Bharat Express.",
};

export default function TrainsPage() {
  return (
    <div className="min-h-screen pb-24 text-[#F7F3EC]">
      <PageHero
        eyebrow="The Iron Veins of the Nation"
        title="Indian Railways Explorer"
        description="Traverse mountains, Thar deserts, coastal coconut groves, and colonial hill stations aboard India's royal luxury trains and scenic heritage mountain railways."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Indian Railways" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site space-y-10">
          <div className="grid gap-8 lg:grid-cols-1">
            {trainsData.map((train) => (
              <article
                key={train.id}
                className="card-surface grid gap-8 overflow-hidden rounded-3xl bg-white/[0.03] border-white/10 p-6 sm:p-8 lg:grid-cols-12 hover:border-turmeric/40 transition duration-300 shadow-2xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl lg:col-span-5 bg-black/60">
                  <Image
                    src={train.image}
                    alt={train.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-black/80 px-3 py-1 font-mono text-[10px] font-bold text-turmeric uppercase border border-turmeric/40 backdrop-blur-md flex items-center gap-1.5">
                    <Star className="h-3 w-3 fill-turmeric" />
                    Scenic Score: {train.scenicScore}/10
                  </div>
                </div>

                <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-turmeric/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-turmeric uppercase border border-turmeric/30">
                        {train.type}
                      </span>
                      <span className="font-mono text-xs text-muted-gray">
                        Train #{train.number}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white">
                      {train.name}
                    </h2>

                    <div className="grid gap-2 text-xs sm:grid-cols-2 pt-2 border-t border-white/10">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Clock className="h-4 w-4 text-teal-400" />
                        <span>Duration: {train.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Calendar className="h-4 w-4 text-rani" />
                        <span>Frequency: {train.frequency}</span>
                      </div>
                    </div>

                    {/* Route Flow */}
                    <div className="pt-2">
                      <span className="text-[11px] font-mono text-muted-gray uppercase block mb-1.5">
                        Route & Key Stops:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-200">
                        <span className="font-bold text-turmeric">{train.route.from}</span>
                        <span>→</span>
                        {train.route.via.slice(0, 3).map((v: string) => (
                          <span key={v} className="bg-white/5 px-2 py-0.5 rounded text-[11px]">
                            {v}
                          </span>
                        ))}
                        <span>→</span>
                        <span className="font-bold text-teal-400">{train.route.to}</span>
                      </div>
                    </div>

                    {/* Classes Grid */}
                    <div className="pt-3">
                      <span className="text-[11px] font-mono text-muted-gray uppercase block mb-2">
                        Fares & Travel Classes:
                      </span>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {train.classes.map((cls: any) => (
                          <div
                            key={cls.name}
                            className="rounded-xl border border-white/5 bg-black/40 p-3 text-xs space-y-1"
                          >
                            <div className="flex justify-between font-semibold">
                              <span className="text-warm-white">{cls.name}</span>
                              <span className="text-turmeric font-mono">
                                ₹{cls.price.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <p className="text-[10px] text-zinc-400">
                              {cls.amenities.slice(0, 2).join(" · ")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                    <a
                      href={train.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !py-2.5 text-xs flex items-center gap-2"
                    >
                      <span>Official IRCTC Booking</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <Link href="/travel-guide" className="btn-secondary !py-2.5 text-xs">
                      Foreign Tourist Quota Guide
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
