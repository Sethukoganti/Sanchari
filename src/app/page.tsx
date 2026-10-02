import Image from "next/image";
import Link from "next/link";
import {
  destinationsData,
  experiencesData,
  eventsData,
  getFeaturedDestinations,
  testimonials,
} from "@/data/content";
import { Hero } from "@/components/home/Hero";
import { LiveTicker } from "@/components/home/LiveTicker";
import { StatsCounter } from "@/components/home/StatsCounter";
import { NetflixCarousel } from "@/components/home/NetflixCarousel";
import { MoodFilter } from "@/components/home/MoodFilter";
import { IndiaMap } from "@/components/map/IndiaMap";
import { HiddenGemsSection } from "@/components/home/HiddenGemsSection";
import { ExploreExperiencesSection } from "@/components/home/ExploreExperiencesSection";
import { AIPlannerCTA } from "@/components/home/AIPlannerCTA";
import { WhySanchariSection } from "@/components/home/WhySanchariSection";
import { LocalBusinessesSection } from "@/components/home/LocalBusinessesSection";
import { ResponsibleTourismSection } from "@/components/home/ResponsibleTourismSection";
import { Testimonials } from "@/components/home/Testimonials";
import { Sparkles, ArrowRight, Calendar, Star, MapPin } from "lucide-react";

export default function HomePage() {
  const featured = getFeaturedDestinations();

  return (
    <div className="min-h-screen bg-navy-deep text-[#F8FAFC] space-y-16 sm:space-y-24 pb-24 overflow-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Live Ticker / Real-time Travel News */}
      <LiveTicker />

      {/* 3. Stats Counter */}
      <div className="container-site section-pad">
        <StatsCounter />
      </div>

      {/* 4. Popular & Trending Destinations Carousel */}
      <div className="container-site section-pad">
        <NetflixCarousel
          badge="Popular Bases"
          title="Popular Destinations Across India"
          subtitle="Iconic citadels, serene coastal shores, and sacred riverbanks with verified itineraries."
          destinations={destinationsData}
          viewAllHref="/destinations"
        />
      </div>

      {/* 5. Explore by Experience Section */}
      <ExploreExperiencesSection />

      {/* 6. Interactive India SVG Map */}
      <section className="container-site section-pad">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="chip !py-1 !px-2.5 text-[10px] bg-saffron/15 text-saffron border-saffron/30 font-mono font-bold">
                Interactive Cartography
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-warm-white mt-1">
              Explore Incredible India
            </h2>
            <p className="text-xs sm:text-sm text-muted-gray max-w-xl font-body mt-1">
              Select any of the 28 states and 8 union territories to filter by regional culture, sacred shrines, and travel routes.
            </p>
          </div>
          <Link href="/map"
            className="text-xs font-semibold text-white hover:underline flex items-center gap-1.5"
          >
            <span>Full Map Explorer</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <IndiaMap />
      </section>

      {/* 7. AI Trip Planner Interactive CTA */}
      <AIPlannerCTA />

      {/* 8. Discover India's Hidden Gems */}
      <HiddenGemsSection />

      {/* 9. Upcoming Festivals & Events */}
      <section className="container-site section-pad space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-xs text-saffron uppercase font-bold tracking-widest block mb-1">
              Living Cultural Calendar
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-warm-white">
              Upcoming Festivals & Events
            </h2>
            <p className="text-xs sm:text-sm text-muted-gray mt-1 max-w-2xl font-body">
              Discover vibrant music gatherings, livestock desert melas, and sacred Ganga deepawalis.
            </p>
          </div>

          <Link href="/events"
            className="text-xs font-semibold text-white hover:underline flex items-center gap-1.5"
          >
            <span>All Festivals & Events ({eventsData.length})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eventsData.slice(0, 3).map((evt) => (
            <div
              key={evt.id}
              className="group card-surface overflow-hidden bg-navy-surface/60 border-white/10 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:border-saffron/40 hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={evt.image || evt.heroImage || evt.gallery?.[0] || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"}
                    alt={evt.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-black/30" />

                  <div className="absolute top-3.5 left-3.5">
                    <span className="chip !py-1 !px-2.5 text-[10px] bg-black/60 backdrop-blur-md text-saffron border-saffron/30 font-mono font-bold">
                      {evt.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex justify-between items-center text-xs">
                    <span className="text-warm-white font-semibold flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-white" />
                      {evt.date.approximateString || evt.date.month || "Upcoming"}
                    </span>
                    <span className="text-muted-gray text-[11px] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                      {evt.state}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-display text-base font-bold text-warm-white group-hover:text-saffron transition-colors">
                    {evt.name}
                  </h3>
                  <p className="text-xs text-zinc-300 font-body leading-relaxed line-clamp-2">
                    {evt.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/festivals`}
                  className="btn-secondary w-full justify-center !py-2 text-xs flex items-center gap-1.5"
                >
                  <span>View Festival Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Why Sanchari Bharat? Platform Impact */}
      <WhySanchariSection />

      {/* 11. Travel Stories & Reviews */}
      <div className="container-site section-pad">
        <Testimonials />
      </div>

      {/* 12. Local Tourism Businesses */}
      <LocalBusinessesSection />

      {/* 13. Responsible & Sustainable Tourism */}
      <ResponsibleTourismSection />
    </div>
  );
}
