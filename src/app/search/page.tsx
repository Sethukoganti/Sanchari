import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Search, Compass, MapPin, Sparkles, ChevronRight } from "lucide-react";
import { searchAll } from "@/lib/search";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Search Catalog · Explore India",
  description: "Search Explore India destinations, 50+ festivals, 36 states, trains, and cultural stories.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const results = q ? searchAll(q, 40) : [];

  return (
    <div className="min-h-screen pb-24 text-[#F7F3EC]">
      <PageHero
        eyebrow="Search the Subcontinent"
        title={q ? `Results for “${q}”` : "Search Destinations & Culture"}
        description={
          q
            ? `Found ${results.length} match${results.length === 1 ? "" : "es"} across destinations, festivals, state guides, trains, and cultural stories.`
            : "Search across 28 states, 50+ major festivals, UNESCO heritage bases, and scenic Indian rail routes."
        }
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Search" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site max-w-4xl space-y-8">
          {/* Search Box Form */}
          <form action="/search" method="get" className="card-surface p-4 bg-white/[0.04] border-white/10 rounded-2xl">
            <div className="relative flex items-center gap-2">
              <Search className="absolute left-4 h-5 w-5 text-muted-gray" />
              <input
                id="search-q"
                name="q"
                defaultValue={q}
                placeholder="Search Jaipur, Varanasi, Diwali, Toy Train, Kerala, Ghats..."
                className="w-full rounded-xl border border-white/15 bg-black/60 py-3 pl-12 pr-4 text-sm text-warm-white placeholder-muted-gray outline-none focus:border-turmeric"
              />
              <button type="submit" className="btn-primary shrink-0 !py-3 !px-6 text-xs">
                Search
              </button>
            </div>
          </form>

          {!q ? (
            <div className="card-surface p-12 text-center bg-white/[0.02] border-white/5 rounded-2xl">
              <Compass className="mx-auto h-12 w-12 text-white/60 animate-spin" style={{ animationDuration: "16s" }} />
              <h3 className="mt-4 font-display text-xl font-bold text-warm-white">
                Enter a destination, festival, state, or train to search
              </h3>
              <p className="mt-1 text-xs text-muted-gray">
                Examples: &ldquo;Diwali&rdquo;, &ldquo;Rajasthan&rdquo;, &ldquo;Vande Bharat&rdquo;, &ldquo;Hampi&rdquo;, &ldquo;Backwaters&rdquo;
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="card-surface p-12 text-center bg-white/[0.02] border-white/10 rounded-2xl space-y-4">
              <h3 className="font-display text-2xl font-bold text-warm-white">No exact matches found</h3>
              <p className="text-xs text-muted-gray">
                Try searching by city name, state, or browse our curated sections:
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link href="/destinations" className="btn-secondary !py-2 text-xs">
                  All Destinations
                </Link>
                <Link href="/festivals" className="btn-secondary !py-2 text-xs">
                  50+ Festivals Hub
                </Link>
                <Link href="/states" className="btn-secondary !py-2 text-xs">
                  All 36 States & UTs
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((r, i) => (
                <Link
                  key={`${r.type}-${r.slug}-${i}`}
                  href={r.href}
                  className="card-surface flex items-center justify-between gap-4 p-4 sm:p-5 bg-white/[0.03] border-white/10 rounded-2xl transition-all hover:scale-[1.01] hover:border-turmeric/40 group"
                >
                  <div className="flex items-center gap-4">
                    {r.image && (
                      <div className="relative h-16 w-20 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-black/60">
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="112px"
                        />
                      </div>
                    )}
                    <div>
                      <span className="inline-block rounded-full bg-turmeric/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-turmeric uppercase border border-turmeric/30">
                        {r.type}
                      </span>
                      <h4 className="mt-1 font-display text-lg sm:text-xl font-bold text-warm-white group-hover:text-turmeric transition-colors">
                        {r.title}
                      </h4>
                      <p className="text-xs text-muted-gray">{r.subtitle}</p>
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
