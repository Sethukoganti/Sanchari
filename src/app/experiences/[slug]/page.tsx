import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { experiences, getExperience } from "@/data/content";
import { PageHero } from "@/components/ui/PageHero";

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) return { title: "Experience" };
  return { title: exp.title, description: exp.summary };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) notFound();

  return (
    <>
      <div className="relative min-h-[50vh] bg-navy">
        <Image
          src={exp.image}
          alt=""
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dusk-ink via-dusk-ink/40 to-transparent" />
      </div>
      <PageHero
        eyebrow={`${exp.category} · ${exp.region}`}
        title={exp.title}
        description={exp.summary}
      />
      <section className="section-pad pb-20">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="prose-ei lg:col-span-8">
            <p>{exp.description}</p>
            <h2>What to expect</h2>
            <ul className="mt-4 space-y-2">
              {exp.highlights.map((h) => (
                <li key={h} className="rounded-xl bg-warm-white px-4 py-3 shadow-sm">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-4">
            <div className="card-surface space-y-4 p-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted">Duration</p>
                <p className="font-semibold">{exp.duration}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted">Season</p>
                <p className="font-semibold">{exp.season}</p>
              </div>
              <Link href="/plan" className="btn-primary w-full">
                Fold into an itinerary
              </Link>
              <Link href="/experiences" className="btn-ghost w-full">
                All experiences
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
