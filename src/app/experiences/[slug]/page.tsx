import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, Sparkles, MapPin, CheckCircle2, Star, Plus } from "lucide-react";
import { experiences, getExperience } from "@/data/content";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ShareButton } from "@/components/common/ShareButton";

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
  if (!exp) return { title: "Experience Not Found · SANCHARI BHARAT" };
  return {
    title: `${exp.title} · SANCHARI BHARAT Expeditions`,
    description: exp.description,
    openGraph: {
      title: exp.title,
      description: exp.description,
      images: [exp.image],
    },
  };
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
    <div className="min-h-screen pb-24 text-[#F8FAFC]">
      <div className="container-site section-pad pt-24 pb-4">
        <Breadcrumbs
          items={[
            { label: "Experiences", href: "/experiences" },
            { label: exp.title },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative min-h-[55vh] bg-navy-deep text-white overflow-hidden">
        <Image
          src={exp.image}
          alt={exp.title}
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-transparent" />

        <div className="relative container-site section-pad flex min-h-[55vh] flex-col justify-end pb-14 pt-32">
          <span className="w-fit rounded-full border border-saffron/50 bg-saffron/15 px-3 py-1 font-mono text-xs font-bold text-saffron uppercase tracking-wider backdrop-blur-md">
            {exp.category} · {exp.destination} ({exp.state})
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl font-extrabold text-warm-white">
            {exp.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-zinc-300 font-body">
            {exp.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ShareButton title={exp.title} text={exp.description} />
          </div>
        </div>
      </section>

      {/* Content Body */}
      <div className="container-site section-pad mt-12 grid gap-10 lg:grid-cols-12">
        <main className="lg:col-span-8 space-y-8">
          <div className="card-surface p-6 sm:p-8 bg-navy-surface/60 border-white/10 rounded-3xl">
            <h2 className="font-display text-2xl font-bold text-warm-white mb-4">
              About This Experience
            </h2>
            <p className="text-base text-zinc-300 leading-relaxed font-body">
              {exp.description}
            </p>
          </div>

          <div className="card-surface p-6 sm:p-8 bg-navy-surface/60 border-white/10 rounded-3xl">
            <h3 className="font-display text-xl font-bold text-saffron mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              What to Expect & Highlights
            </h3>
            <ul className="space-y-3">
              {exp.highlights.map((h: string) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-2xl border border-white/5 bg-navy-dark/60 p-4 text-xs sm:text-sm text-zinc-200"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-accent shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>

        <aside className="lg:col-span-4 space-y-6">
          <div className="card-surface p-6 bg-navy-surface/60 border-white/10 rounded-3xl space-y-4">
            <h3 className="font-display text-lg font-bold text-warm-white border-b border-white/10 pb-3">
              Quick Facts
            </h3>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-gray flex items-center gap-1.5 font-mono">
                <Clock className="h-3.5 w-3.5 text-white" />
                Duration:
              </span>
              <span className="font-semibold text-warm-white">{exp.duration}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-gray flex items-center gap-1.5 font-mono">
                <Calendar className="h-3.5 w-3.5 text-emerald-accent" />
                Best Season:
              </span>
              <span className="font-semibold text-warm-white">{exp.bestSeason || "Year-round"}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-gray font-mono">Rating:</span>
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <Star className="h-3 w-3 fill-white" />
                {exp.rating}
              </span>
            </div>

            <Link
              href="/plan"
              className="btn-primary w-full justify-center !py-2.5 text-xs mt-4 flex items-center gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add to AI Trip Planner</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
