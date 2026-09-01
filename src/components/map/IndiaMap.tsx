"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { states } from "@/data/content";

/** Simplified clickable state shapes for an illustrative India map */
const STATE_PATHS: Array<{
  slug: string;
  name: string;
  d: string;
}> = [
  {
    slug: "jammu-kashmir",
    name: "Jammu & Kashmir",
    d: "M210 28 l28 8 18 22 -6 18 -22 8 -30 -10 -12 -20 z",
  },
  {
    slug: "ladakh",
    name: "Ladakh",
    d: "M250 30 l40 6 22 28 -10 16 -36 4 -28 -18 z",
  },
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    d: "M230 70 l36 4 10 18 -18 12 -34 -6 -8 -16 z",
  },
  {
    slug: "punjab",
    name: "Punjab",
    d: "M198 88 l28 2 8 18 -22 10 -24 -6 -4 -14 z",
  },
  {
    slug: "uttar-pradesh",
    name: "Uttar Pradesh",
    d: "M250 105 l70 8 18 28 -12 24 -70 4 -30 -18 -8 -24 z",
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    d: "M145 115 l70 6 18 40 -8 42 -48 18 -50 -20 -12 -40 10 -36 z",
  },
  {
    slug: "gujarat",
    name: "Gujarat",
    d: "M120 190 l48 8 12 36 -20 28 -40 4 -24 -30 4 -34 z",
  },
  {
    slug: "maharashtra",
    name: "Maharashtra",
    d: "M175 230 l70 10 20 40 -10 36 -55 8 -40 -28 -5 -40 z",
  },
  {
    slug: "goa",
    name: "Goa",
    d: "M175 310 l18 4 4 14 -14 6 -12 -8 z",
  },
  {
    slug: "karnataka",
    name: "Karnataka",
    d: "M195 320 l45 6 16 40 -8 36 -40 8 -28 -30 2 -42 z",
  },
  {
    slug: "kerala",
    name: "Kerala",
    d: "M200 390 l18 8 6 36 -12 28 -14 -10 -8 -40 z",
  },
  {
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    d: "M230 370 l40 10 12 40 -20 42 -34 4 -16 -36 4 -40 z",
  },
  {
    slug: "andhra-pradesh",
    name: "Andhra Pradesh",
    d: "M250 320 l48 14 8 40 -28 36 -40 -8 -6 -40 z",
  },
  {
    slug: "telangana",
    name: "Telangana",
    d: "M255 290 l40 8 10 28 -30 14 -32 -10 -4 -24 z",
  },
  {
    slug: "madhya-pradesh",
    name: "Madhya Pradesh",
    d: "M220 175 l90 8 20 36 -10 34 -80 10 -50 -20 -8 -36 z",
  },
  {
    slug: "chhattisgarh",
    name: "Chhattisgarh",
    d: "M310 210 l36 10 10 36 -20 28 -34 -4 -10 -36 z",
  },
  {
    slug: "odisha",
    name: "Odisha",
    d: "M340 230 l40 12 8 40 -24 28 -36 -8 -6 -40 z",
  },
  {
    slug: "west-bengal",
    name: "West Bengal",
    d: "M380 180 l28 8 10 50 -8 40 -24 8 -16 -40 2 -50 z",
  },
  {
    slug: "bihar",
    name: "Bihar",
    d: "M340 155 l50 6 10 28 -40 14 -36 -8 -4 -24 z",
  },
  {
    slug: "jharkhand",
    name: "Jharkhand",
    d: "M335 190 l42 6 8 24 -30 12 -30 -6 -4 -22 z",
  },
  {
    slug: "assam",
    name: "Assam",
    d: "M430 150 l50 8 20 18 -10 18 -48 6 -28 -12 z",
  },
  {
    slug: "meghalaya",
    name: "Meghalaya",
    d: "M430 185 l40 4 6 16 -36 8 -22 -6 z",
  },
  {
    slug: "nagaland",
    name: "Nagaland",
    d: "M490 155 l22 6 6 16 -16 10 -20 -8 z",
  },
  {
    slug: "manipur",
    name: "Manipur",
    d: "M485 180 l20 8 4 16 -18 8 -16 -10 z",
  },
  {
    slug: "mizoram",
    name: "Mizoram",
    d: "M470 205 l16 8 2 20 -14 8 -12 -14 z",
  },
  {
    slug: "tripura",
    name: "Tripura",
    d: "M450 205 l16 4 4 16 -14 6 -12 -10 z",
  },
  {
    slug: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    d: "M460 120 l55 4 18 24 -20 16 -55 4 -18 -20 z",
  },
  {
    slug: "sikkim",
    name: "Sikkim",
    d: "M400 145 l14 2 4 12 -12 6 -10 -8 z",
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    d: "M255 85 l40 6 10 20 -24 10 -34 -6 -6 -16 z",
  },
  {
    slug: "haryana",
    name: "Haryana",
    d: "M225 100 l28 4 6 16 -22 8 -20 -6 z",
  },
  {
    slug: "delhi",
    name: "Delhi",
    d: "M238 118 l10 2 2 8 -8 4 -8 -4 z",
  },
];

const LINKED = new Set(states.map((s) => s.slug));

export function IndiaMap() {
  const router = useRouter();
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>("rajasthan");
  const [stateSearch, setStateSearch] = useState("");
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);

  const stateLookup = useMemo(
    () => new Map(states.map((state) => [state.slug, state])),
    [],
  );

  const activeSlug = hover || selected;

  const info = useMemo(() => {
    if (!activeSlug) return null;
    return (
      stateLookup.get(activeSlug) || {
        slug: activeSlug,
        name: STATE_PATHS.find((p) => p.slug === activeSlug)?.name || activeSlug,
        region: "North" as const,
        summary: "Open destination routes and explore cultural trails in this state.",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        destinationSlugs: [] as string[],
      }
    );
  }, [activeSlug, stateLookup]);

  const onActivate = useCallback(
    (slug: string) => {
      setSelected(slug);
      router.push(`/map/${slug}`);
    },
    [router],
  );

  const filteredStatesList = useMemo(() => {
    if (!stateSearch.trim()) return states;
    const q = stateSearch.toLowerCase();
    return states.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.region.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q),
    );
  }, [stateSearch]);

  return (
    <div className="relative grid gap-8 lg:grid-cols-12">
      <div className="relative lg:col-span-8">
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(230,57,86,0.2)] bg-[#120407] p-2 shadow-2xl sm:p-4">
          <svg
            viewBox="0 0 560 460"
            className="h-auto w-full rounded-xl"
            role="img"
            aria-label="Interactive map of India. Select a state to explore."
          >
            <defs>
              <linearGradient id="mapBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1C070C" />
                <stop offset="50%" stopColor="#140508" />
                <stop offset="100%" stopColor="#0B0204" />
              </linearGradient>
              <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(196, 30, 58, 0.15)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="560" height="460" fill="url(#mapBgGrad)" rx="12" />
            <rect width="560" height="460" fill="url(#mapGlow)" rx="12" />

            {/* Decorative subtle grid lines */}
            <line x1="40" y1="120" x2="520" y2="120" stroke="rgba(212, 175, 55, 0.05)" strokeDasharray="4 4" />
            <line x1="40" y1="240" x2="520" y2="240" stroke="rgba(212, 175, 55, 0.05)" strokeDasharray="4 4" />
            <line x1="40" y1="360" x2="520" y2="360" stroke="rgba(212, 175, 55, 0.05)" strokeDasharray="4 4" />
            <line x1="180" y1="40" x2="180" y2="420" stroke="rgba(212, 175, 55, 0.05)" strokeDasharray="4 4" />
            <line x1="360" y1="40" x2="360" y2="420" stroke="rgba(212, 175, 55, 0.05)" strokeDasharray="4 4" />

            <text
              x="28"
              y="34"
              fill="#D4AF37"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="3"
              fontWeight="600"
            >
              EXPLORE INDIA · INTERACTIVE STATE BOARD
            </text>
            <text
              x="28"
              y="48"
              fill="rgba(247, 234, 200, 0.5)"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="1"
            >
              CLICK OR TAB TO EXPLORE 31 REGIONAL GUIDES
            </text>

            {STATE_PATHS.map((state) => {
              const isHovered = hover === state.slug;
              const isSelected = selected === state.slug;
              const active = isHovered || isSelected;

              return (
                <path
                  key={state.slug}
                  d={state.d}
                  className="map-state"
                  data-active={active ? "true" : "false"}
                  tabIndex={0}
                  role="button"
                  aria-label={`${state.name} - Explore state routes`}
                  onMouseEnter={(e) => {
                    setHover(state.slug);
                    const rect = (e.target as SVGPathElement)
                      .ownerSVGElement!
                      .getBoundingClientRect();
                    setTooltip({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }}
                  onMouseMove={(e) => {
                    const rect = (e.target as SVGPathElement)
                      .ownerSVGElement!
                      .getBoundingClientRect();
                    setTooltip({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }}
                  onMouseLeave={() => {
                    setHover(null);
                    setTooltip(null);
                  }}
                  onFocus={() => {
                    setHover(state.slug);
                  }}
                  onBlur={() => setHover(null)}
                  onClick={() => onActivate(state.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onActivate(state.slug);
                    }
                  }}
                />
              );
            })}
          </svg>

          {/* Interactive Floating State Preview Tooltip */}
          {hover && tooltip && info ? (
            <div
              className="pointer-events-none absolute z-20 w-64 overflow-hidden rounded-2xl border border-[rgba(230,57,86,0.3)] bg-[#18060B]/95 shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(196,30,58,0.25)] backdrop-blur-md transition-all duration-150"
              style={{
                left: Math.min(Math.max(tooltip.x + 14, 16), 310),
                top: Math.min(Math.max(tooltip.y - 30, 16), 260),
              }}
            >
              <div className="relative h-28 w-full overflow-hidden">
                <Image
                  src={info.image}
                  alt={info.name}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18060B] via-[#18060B]/30 to-transparent" />
                <span className="absolute left-2.5 top-2.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#F7EAC8] backdrop-blur-sm">
                  {info.region} India
                </span>
              </div>
              <div className="p-3.5 pt-1">
                <p className="font-display text-base font-bold text-white">{info.name}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-300">
                  {info.summary}
                </p>
                <p className="mt-2 text-[10px] font-semibold text-[#D4AF37]">
                  Click to open state guide →
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="lg:col-span-4">
        <div className="card-surface sticky top-28 flex flex-col p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              State Guide
            </span>
            {info ? (
              <span className="rounded-full border border-[#C41E3A]/40 bg-[#8E162C]/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#F7EAC8]">
                {info.region}
              </span>
            ) : null}
          </div>

          {info ? (
            <div className="mt-4">
              <div className="relative mb-4 h-36 w-full overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={info.image}
                  alt={info.name}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3">
                  <h3 className="font-display text-2xl font-bold text-white drop-shadow-md">
                    {info.name}
                  </h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[color:var(--text-soft)]">
                {info.summary}
              </p>
              <button
                type="button"
                className="btn-primary mt-5 w-full"
                onClick={() => onActivate(info.slug)}
              >
                Explore {info.name} Guide
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <h3 className="font-display text-2xl text-[color:var(--text)]">
                Select a State
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-soft)]">
                Hover or click any state on the map or choose from the list below to view its authentic photography and travel routes.
              </p>
            </div>
          )}

          <div className="mt-6 border-t border-[color:var(--surface-border)] pt-4">
            <input
              type="text"
              value={stateSearch}
              onChange={(e) => setStateSearch(e.target.value)}
              placeholder="Search 31 states & territories…"
              className="w-full rounded-xl border border-[color:var(--surface-border)] bg-[color:var(--surface-strong)] px-3.5 py-2 text-xs text-[color:var(--text)] outline-none transition focus:border-[#C41E3A]"
            />

            <ul className="mt-3 max-h-56 space-y-1.5 overflow-y-auto pr-1">
              {filteredStatesList.map((s) => {
                const isCurrent = activeSlug === s.slug;
                return (
                  <li key={s.slug}>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                        isCurrent
                          ? "border border-[#C41E3A]/40 bg-[#8E162C]/25 text-white font-semibold"
                          : "hover:bg-[color:var(--surface)] text-[color:var(--text)]"
                      }`}
                      onClick={() => onActivate(s.slug)}
                      onMouseEnter={() => setHover(s.slug)}
                      onMouseLeave={() => setHover(null)}
                    >
                      <span className="font-medium">{s.name}</span>
                      <span className="text-[10px] text-[color:var(--text-soft)]">
                        {s.region}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
