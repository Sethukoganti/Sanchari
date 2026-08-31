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
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);
  const stateLookup = useMemo(
    () => new Map(states.map((state) => [state.slug, state])),
    [],
  );

  const info = useMemo(() => {
    if (!hover) return null;
    return (
      stateLookup.get(hover) || {
        slug: hover,
        name: STATE_PATHS.find((p) => p.slug === hover)?.name || hover,
        region: "Central" as const,
        summary: "Open destinations to explore routes in this state.",
        image:
          "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",
        destinationSlugs: [] as string[],
      }
    );
  }, [hover, stateLookup]);

  const onActivate = useCallback(
    (slug: string) => {
      if (LINKED.has(slug)) {
        router.push(`/map/${slug}`);
      } else {
        router.push(`/destinations?q=${encodeURIComponent(slug.replace(/-/g, " "))}`);
      }
    },
    [router],
  );

  return (
    <div className="relative grid gap-8 lg:grid-cols-12">
      <div className="relative lg:col-span-8">
        <svg
          viewBox="0 0 560 460"
          className="h-auto w-full rounded-2xl bg-navy p-4 shadow-xl"
          role="img"
          aria-label="Interactive map of India. Select a state to explore."
        >
          <rect width="560" height="460" fill="#241934" rx="12" />
          <text
            x="28"
            y="36"
            fill="#E8A013"
            fontSize="12"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="3"
          >
            EXPLORE INDIA · STATE BOARD
          </text>
          {STATE_PATHS.map((state) => {
            const active = hover === state.slug;
            const hasPage = LINKED.has(state.slug);
            return (
              <path
                key={state.slug}
                d={state.d}
                className="map-state"
                data-active={active ? "true" : "false"}
                tabIndex={0}
                role="button"
                aria-label={`${state.name}${hasPage ? "" : " (search destinations)"}`}
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
                onFocus={() => setHover(state.slug)}
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
        {hover && tooltip && info ? (
          <div
            className="pointer-events-none absolute z-10 w-56 overflow-hidden rounded-xl border border-warm-white/10 bg-dusk-ink/95 shadow-2xl"
            style={{
              left: Math.min(tooltip.x + 12, 320),
              top: Math.max(tooltip.y - 20, 8),
            }}
          >
            <div className="relative h-24 w-full">
              <Image src={info.image} alt="" fill className="object-cover" sizes="224px" />
            </div>
            <div className="p-3">
              <p className="font-semibold text-warm-white">{info.name}</p>
              <p className="text-xs text-warm-white/65">{info.summary}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="lg:col-span-4">
        <div className="card-surface sticky top-28 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-peacock">
            Selected
          </p>
          {info ? (
            <>
              <h3 className="mt-2 font-display text-3xl text-dusk-ink">{info.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {info.summary}
              </p>
              <button
                type="button"
                className="btn-primary mt-6"
                onClick={() => onActivate(info.slug)}
              >
                Open {info.name}
              </button>
            </>
          ) : (
            <>
              <h3 className="mt-2 font-display text-3xl text-dusk-ink">
                Hover a state
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Each path is keyboard-focusable. States with dedicated pages open
                a local guide; others jump to destination search.
              </p>
            </>
          )}
          <ul className="mt-8 max-h-64 space-y-2 overflow-y-auto pr-1">
            {states.map((s) => (
              <li key={s.slug}>
                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-surface-elevated"
                  onClick={() => onActivate(s.slug)}
                  onMouseEnter={() => setHover(s.slug)}
                >
                  <span className="font-semibold text-dusk-ink">{s.name}</span>
                  <span className="block text-xs text-ink-muted">{s.region}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
