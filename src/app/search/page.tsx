import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { searchAll } from "@/lib/search";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Explore India destinations, stories, experiences, and events.",
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
    <>
      <PageHero
        eyebrow="Search"
        title={q ? `Results for “${q}”` : "Search the board"}
        description={
          q
            ? `${results.length} match${results.length === 1 ? "" : "es"} across destinations, stories, experiences, and events.`
            : "Use the header search icon for live suggestions, or submit a query to land here."
        }
        tone="light"
      />
      <section className="section-pad pb-20">
        <div className="container-site max-w-3xl">
          <form action="/search" method="get" className="mb-10">
            <label htmlFor="search-q" className="sr-only">
              Search query
            </label>
            <div className="flex gap-2">
              <input
                id="search-q"
                name="q"
                defaultValue={q}
                placeholder="Kerala, Holi, train, Hampi…"
                className="w-full rounded-full border border-dusk-ink/15 bg-warm-white px-5 py-3 text-sm outline-none focus:border-peacock"
              />
              <button type="submit" className="btn-primary shrink-0">
                Search
              </button>
            </div>
          </form>

          {!q ? (
            <p className="text-ink-muted">Enter a keyword to search the full catalog.</p>
          ) : results.length === 0 ? (
            <div className="card-surface p-8">
              <p className="font-display text-2xl">No matches yet</p>
              <p className="mt-2 text-ink-muted">
                Try another keyword, or browse{" "}
                <Link href="/destinations" className="text-peacock underline">
                  destinations
                </Link>{" "}
                and{" "}
                <Link href="/stories" className="text-peacock underline">
                  stories
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {results.map((r) => (
                <li key={`${r.type}-${r.slug}`}>
                  <Link
                    href={r.href}
                    className="card-surface flex items-center gap-4 p-4 transition hover:shadow-lg"
                  >
                    {r.image ? (
                      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={r.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </span>
                    ) : null}
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-peacock">
                        {r.type}
                      </span>
                      <span className="block font-display text-xl text-dusk-ink">
                        {r.title}
                      </span>
                      <span className="block text-sm text-ink-muted">{r.subtitle}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
