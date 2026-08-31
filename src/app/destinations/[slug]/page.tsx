import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, getDestination } from "@/data/content";
import { DestinationCard } from "@/components/ui/DestinationCard";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return { title: "Destination" };
  return {
    title: dest.name,
    description: dest.summary,
    openGraph: {
      title: `${dest.name} · Explore India`,
      description: dest.summary,
      images: [dest.image],
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) notFound();

  const related = destinations
    .filter((d) => d.slug !== dest.slug && d.region === dest.region)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: dest.name,
    description: dest.description,
    image: dest.image,
    address: {
      "@type": "PostalAddress",
      addressRegion: dest.state,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: dest.coordinates.lat,
      longitude: dest.coordinates.lng,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative min-h-[70vh] bg-navy text-white">
        <Image
          src={dest.image}
          alt=""
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dusk-ink via-dusk-ink/50 to-dusk-ink/30" />
        <div className="relative container-site section-pad flex min-h-[70vh] flex-col justify-end pb-16 pt-32">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-turmeric">
            {dest.region} · {dest.state} · {dest.status}
          </p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl">
            {dest.name}
          </h1>
          <p className="mt-2 font-display text-2xl text-warm-white/80">
            {dest.nameHi}
          </p>
          <p className="mt-5 max-w-2xl text-lg text-warm-white/80">{dest.tagline}</p>
        </div>
      </section>

      <section className="section-pad py-14 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-lg leading-relaxed text-ink-muted">{dest.summary}</p>
            <p className="mt-6 text-base leading-relaxed text-dusk-ink/90">
              {dest.description}
            </p>
            <h2 className="mt-12 font-display text-3xl">Highlights</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {dest.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-xl border border-dusk-ink/10 bg-warm-white px-4 py-3 text-sm"
                >
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {dest.gallery.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                  <Image
                    src={src}
                    alt={`${dest.name} gallery image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="card-surface sticky top-28 space-y-4 p-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted">Best time</p>
                <p className="font-semibold">{dest.bestTime}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted">Suggested stay</p>
                <p className="font-semibold">{dest.duration}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted">Budget band</p>
                <p className="font-semibold">{dest.budget}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted">Themes</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {dest.themes.map((th) => (
                    <Link
                      key={th}
                      href={`/destinations?theme=${encodeURIComponent(th)}`}
                      className="chip"
                    >
                      {th}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/plan" className="btn-primary mt-4 w-full">
                Build an itinerary
              </Link>
              <Link href={`/map/${dest.stateSlug}`} className="btn-ghost w-full">
                Open state guide
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="section-pad pb-20">
          <div className="container-site">
            <h2 className="font-display text-3xl">More in {dest.region}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
