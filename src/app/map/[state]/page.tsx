import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, getState, states } from "@/data/content";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { PageHero } from "@/components/ui/PageHero";

export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const info = getState(state);
  if (!info) return { title: "State" };
  return { title: info.name, description: info.summary };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const info = getState(state);
  if (!info) notFound();

  const local =
    info.destinationSlugs.length > 0
      ? destinations.filter((d) => info.destinationSlugs.includes(d.slug))
      : destinations.filter((d) => d.region === info.region).slice(0, 3);

  return (
    <>
      <div className="relative h-72 bg-navy sm:h-96">
        <Image
          src={info.image}
          alt=""
          fill
          className="object-cover opacity-55"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dusk-ink to-transparent" />
      </div>
      <PageHero
        eyebrow={`${info.region} India`}
        title={info.name}
        description={info.summary}
      />
      <section className="section-pad pb-20">
        <div className="container-site">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-3xl">Routes in and near {info.name}</h2>
            <Link href="/map" className="btn-ghost">
              Back to map
            </Link>
          </div>
          {local.length ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {local.map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          ) : (
            <p className="mt-8 card-surface p-8 text-ink-muted">
              We are still writing full destination cards for this state. Browse{" "}
              <Link href="/destinations" className="font-semibold text-peacock underline">
                all destinations
              </Link>{" "}
              or{" "}
              <Link href="/plan" className="font-semibold text-peacock underline">
                build an itinerary
              </Link>
              .
            </p>
          )}
        </div>
      </section>
    </>
  );
}
