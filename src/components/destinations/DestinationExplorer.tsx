"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { destinations, REGIONS, THEMES } from "@/data/content";
import type { Region, Theme } from "@/lib/types";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

export function DestinationExplorer({
  initialRegion,
  initialTheme,
  initialQuery,
}: {
  initialRegion?: string;
  initialTheme?: string;
  initialQuery?: string;
}) {
  const { t } = useLanguage();
  const [regions, setRegions] = useState<Region[]>(
    initialRegion && REGIONS.includes(initialRegion as Region)
      ? [initialRegion as Region]
      : [],
  );
  const [themes, setThemes] = useState<Theme[]>(
    initialTheme && THEMES.includes(initialTheme as Theme)
      ? [initialTheme as Theme]
      : [],
  );
  const [query, setQuery] = useState(initialQuery || "");
  const [sort, setSort] = useState<"featured" | "name" | "region">("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = destinations.filter((d) => {
      if (regions.length && !regions.includes(d.region)) return false;
      if (themes.length && !themes.some((th) => d.themes.includes(th)))
        return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = [
          d.name,
          d.state,
          d.region,
          d.summary,
          d.tagline,
          ...d.themes,
          ...d.highlights,
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "region") return a.region.localeCompare(b.region);
      return Number(!!b.featured) - Number(!!a.featured);
    });
    return list;
  }, [regions, themes, query, sort]);

  function toggleRegion(r: Region) {
    setRegions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r],
    );
    setVisible(PAGE_SIZE);
  }

  function toggleTheme(th: Theme) {
    setThemes((prev) =>
      prev.includes(th) ? prev.filter((x) => x !== th) : [...prev, th],
    );
    setVisible(PAGE_SIZE);
  }

  function clearAll() {
    setRegions([]);
    setThemes([]);
    setQuery("");
    setSort("featured");
    setVisible(PAGE_SIZE);
  }

  const shown = filtered.slice(0, visible);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <div className="card-surface sticky top-28 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-peacock">
              {t.common.filters}
            </p>
            <button
              type="button"
              className="text-xs font-semibold text-ink-muted hover:text-rani"
              onClick={clearAll}
            >
              {t.common.clear}
            </button>
          </div>

          <label className="relative mt-5 block">
            <span className="sr-only">Keyword search</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
              aria-hidden
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              placeholder="Keyword…"
              className="w-full rounded-full border border-dusk-ink/15 bg-warm-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-peacock"
            />
          </label>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Region
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleRegion(r)}
                  className={cn("chip", regions.includes(r) && "chip-active")}
                  aria-pressed={regions.includes(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Theme
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {THEMES.map((th) => (
                <button
                  key={th}
                  type="button"
                  onClick={() => toggleTheme(th)}
                  className={cn("chip", themes.includes(th) && "chip-active")}
                  aria-pressed={themes.includes(th)}
                >
                  {th}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="sort-dest" className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Sort
            </label>
            <select
              id="sort-dest"
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as "featured" | "name" | "region")
              }
              className="mt-2 w-full rounded-xl border border-dusk-ink/15 bg-warm-white px-3 py-2.5 text-sm outline-none focus:border-peacock"
            >
              <option value="featured">Featured first</option>
              <option value="name">Name A–Z</option>
              <option value="region">Region</option>
            </select>
          </div>
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-muted">
            Showing <strong className="text-dusk-ink">{shown.length}</strong> of{" "}
            <strong className="text-dusk-ink">{filtered.length}</strong> routes
          </p>
          {(regions.length > 0 || themes.length > 0 || query) && (
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r}
                  type="button"
                  className="chip chip-active"
                  onClick={() => toggleRegion(r)}
                >
                  {r} <X className="h-3 w-3" aria-hidden />
                </button>
              ))}
              {themes.map((th) => (
                <button
                  key={th}
                  type="button"
                  className="chip chip-active"
                  onClick={() => toggleTheme(th)}
                >
                  {th} <X className="h-3 w-3" aria-hidden />
                </button>
              ))}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="card-surface p-10 text-center">
            <p className="font-display text-2xl">{t.common.noResults}</p>
            <button type="button" className="btn-primary mt-6" onClick={clearAll}>
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
            {visible < filtered.length ? (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                >
                  {t.common.loadMore}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
