import Image from "next/image";
import Link from "next/link";
import { articles, events, experiences, getFeaturedDestinations } from "@/data/content";
import { DeparturesBoard } from "@/components/home/DeparturesBoard";
import { Hero } from "@/components/home/Hero";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { IndiaMap } from "@/components/map/IndiaMap";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDateRange } from "@/lib/utils";

export default function HomePage() {
  const featured = getFeaturedDestinations();
  const storyPreview = articles.slice(0, 3);
  const experiencePreview = experiences.slice(0, 3);
  const eventPreview = events.slice(0, 3);

  return (
    <>
      <Hero />
      <DeparturesBoard />

      <section className="section-pad py-20 lg:py-28 xl:py-32">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Featured routes"
              title="Places with room to linger"
              description="Eight carefully written bases across regions—filter the full board when you are ready to go wider."
            />
            <Link href="/destinations" className="btn-ghost">
              View all destinations
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0b0b] py-20 text-warm-white lg:py-28 xl:py-32">
        <div className="container-site section-pad">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              tone="dark"
              eyebrow="Experiences"
              title="Book the reason, not just the room"
              description="Festivals, craft studios, trains, and quiet wellness weeks that shape the arc of a trip."
            />
            <Link href="/experiences" className="btn-secondary">
              Browse experiences
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {experiencePreview.map((exp) => (
              <Link
                key={exp.id}
                href={`/experiences/${exp.slug}`}
                className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={exp.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                    {exp.category} · {exp.region}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-snug text-white">
                    {exp.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{exp.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad py-20 lg:py-28 xl:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Interactive map"
            title="Trace the map, then pick a pace"
            description="Click a state path for a local guide. Keyboard users can tab through every region."
          />
          <div className="mt-12 overflow-hidden rounded-[22px] border border-white/5 bg-[#0d0d0d] p-3 shadow-[0_24px_50px_rgba(0,0,0,0.18)] sm:p-5">
            <IndiaMap />
          </div>
        </div>
      </section>

      <section className="section-pad pb-20 lg:pb-28 xl:pb-32">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Stories & culture"
              title="Field notes from the road"
              description="Original essays on seasons, platforms, textile towns, and festival etiquette."
            />
            <Link href="/stories" className="btn-ghost">
              All stories
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {storyPreview.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101010] py-20 lg:py-28 xl:py-32">
        <div className="container-site section-pad">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Events"
              title="Festival windows worth defending"
              description="Date-true cards you can filter by month and region on the full calendar."
            />
            <Link href="/events" className="btn-ghost">
              Open calendar
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {eventPreview.map((event) => (
              <article key={event.id} className="overflow-hidden rounded-[20px] border border-white/10 bg-[#111111] shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/35">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={event.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-300">
                    {formatDateRange(event.startDate, event.endDate)}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-white">{event.name}</h3>
                  <p className="mt-1 text-sm text-zinc-300">{event.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="bg-[#050505] py-20 text-warm-white lg:py-28 xl:py-32">
        <div className="container-site section-pad grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-300">
              Station notes
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-white">
              One thoughtful dispatch a month
            </h2>
            <p className="mt-4 max-w-lg text-white/70">
              Seasons, seat release tips, and festival windows—written like a
              letter from a careful friend, not a blast from a booking engine.
            </p>
          </div>
          <NewsletterForm source="home" dark />
        </div>
      </section>
    </>
  );
}
