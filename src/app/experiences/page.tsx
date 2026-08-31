import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EXPERIENCE_CATEGORIES, experiences } from "@/data/content";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Festivals, wellness weeks, craft studios, train journeys, river cruises, and desert safaris across India.",
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title="Reasons to shape a trip around"
        description="Not generic activities—specific windows for color, craft, rails, rivers, and quiet practice."
      />
      <section className="section-pad py-14 lg:py-20">
        <div className="container-site">
          <div className="mb-10 flex flex-wrap gap-2">
            {EXPERIENCE_CATEGORIES.map((cat) => (
              <a key={cat} href={`#${cat}`} className="chip">
                {cat}
              </a>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {experiences.map((exp) => (
              <Link
                key={exp.id}
                id={exp.category}
                href={`/experiences/${exp.slug}`}
                className="card-surface group overflow-hidden scroll-mt-28"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={exp.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-peacock">
                    {exp.category} · {exp.region}
                  </p>
                  <h2 className="mt-2 font-display text-2xl leading-snug text-dusk-ink">
                    {exp.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-muted">{exp.summary}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {exp.duration} · {exp.season}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
