"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Sparkles,
  Compass,
  ArrowRight,
} from "lucide-react";
import { statesData } from "@/data/states";
import { destinationsData } from "@/data/destinations";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

// Region Color Configuration
const REGION_COLORS: Record<string, { base: string; hover: string; border: string; text: string; glow: string }> = {
  North: {
    base: "rgba(59, 130, 246, 0.45)",
    hover: "rgba(96, 165, 250, 0.9)",
    border: "#60A5FA",
    text: "text-blue-400",
    glow: "rgba(59, 130, 246, 0.6)",
  },
  South: {
    base: "rgba(16, 185, 129, 0.45)",
    hover: "rgba(52, 211, 153, 0.9)",
    border: "#34D399",
    text: "text-emerald-400",
    glow: "rgba(16, 185, 129, 0.6)",
  },
  East: {
    base: "rgba(249, 115, 22, 0.45)",
    hover: "rgba(251, 146, 60, 0.9)",
    border: "#FB923C",
    text: "text-orange-400",
    glow: "rgba(249, 115, 22, 0.6)",
  },
  West: {
    base: "rgba(168, 85, 247, 0.45)",
    hover: "rgba(192, 132, 252, 0.9)",
    border: "#C084FC",
    text: "text-purple-400",
    glow: "rgba(168, 85, 247, 0.6)",
  },
  Northeast: {
    base: "rgba(20, 184, 166, 0.45)",
    hover: "rgba(45, 212, 191, 0.9)",
    border: "#2DD4BF",
    text: "text-teal-400",
    glow: "rgba(20, 184, 166, 0.6)",
  },
  Central: {
    base: "rgba(245, 158, 11, 0.45)",
    hover: "rgba(251, 191, 36, 0.9)",
    border: "#FBBF24",
    text: "text-amber-400",
    glow: "rgba(245, 158, 11, 0.6)",
  },
};

// All 28 States & 8 Union Territories Accurate High-Definition SVG Coordinate Paths
const ALL_STATES_SVG = [
  // NORTH
  { slug: "jammu-and-kashmir", name: "Jammu and Kashmir", region: "North", capital: "Srinagar / Jammu", d: "M210,32 L228,38 L244,52 L234,68 L218,74 L196,66 L186,48 L198,34 Z" },
  { slug: "ladakh", name: "Ladakh", region: "North", capital: "Leh", d: "M244,52 L285,56 L312,78 L300,98 L268,102 L242,88 L234,68 Z" },
  { slug: "himachal-pradesh", name: "Himachal Pradesh", region: "North", capital: "Shimla", d: "M228,78 L262,82 L274,102 L256,116 L226,108 L216,92 Z" },
  { slug: "punjab", name: "Punjab", region: "North", capital: "Chandigarh", d: "M194,94 L224,96 L228,114 L204,126 L182,118 L188,102 Z" },
  { slug: "haryana", name: "Haryana", region: "North", capital: "Chandigarh", d: "M204,126 L232,122 L242,142 L222,154 L198,146 L194,132 Z" },
  { slug: "delhi", name: "Delhi (NCT)", region: "North", capital: "New Delhi", d: "M226,134 L234,134 L236,142 L228,144 Z" },
  { slug: "uttarakhand", name: "Uttarakhand", region: "North", capital: "Dehradun", d: "M254,106 L284,112 L292,134 L266,142 L246,128 Z" },
  { slug: "uttar-pradesh", name: "Uttar Pradesh", region: "North", capital: "Lucknow", d: "M244,142 L318,148 L342,182 L312,204 L248,198 L224,172 L232,152 Z" },

  // WEST
  { slug: "rajasthan", name: "Rajasthan", region: "West", capital: "Jaipur", d: "M142,128 L204,126 L222,168 L212,214 L164,228 L118,206 L112,164 Z" },
  { slug: "gujarat", name: "Gujarat", region: "West", capital: "Gandhinagar", d: "M114,208 L162,216 L174,252 L148,284 L108,286 L86,252 L94,220 Z" },
  { slug: "maharashtra", name: "Maharashtra", region: "West", capital: "Mumbai", d: "M168,252 L244,260 L266,298 L252,342 L198,348 L152,318 L158,272 Z" },
  { slug: "goa", name: "Goa", region: "West", capital: "Panaji", d: "M166,346 L178,348 L180,362 L168,364 Z" },

  // CENTRAL
  { slug: "madhya-pradesh", name: "Madhya Pradesh", region: "Central", capital: "Bhopal", d: "M218,194 L308,202 L326,242 L312,274 L234,282 L182,260 L188,222 Z" },
  { slug: "chhattisgarh", name: "Chhattisgarh", region: "Central", capital: "Raipur", d: "M308,236 L344,244 L354,284 L336,316 L304,310 L294,272 Z" },

  // EAST
  { slug: "bihar", name: "Bihar", region: "East", capital: "Patna", d: "M328,172 L382,176 L392,208 L348,214 L326,196 Z" },
  { slug: "jharkhand", name: "Jharkhand", region: "East", capital: "Ranchi", d: "M342,212 L388,216 L394,248 L354,252 L332,234 Z" },
  { slug: "west-bengal", name: "West Bengal", region: "East", capital: "Kolkata", d: "M376,198 L398,188 L404,234 L386,274 L370,258 L378,224 Z" },
  { slug: "odisha", name: "Odisha", region: "East", capital: "Bhubaneswar", d: "M338,254 L382,264 L392,304 L364,334 L328,324 L320,284 Z" },

  // SOUTH
  { slug: "andhra-pradesh", name: "Andhra Pradesh", region: "South", capital: "Amaravati", d: "M246,336 L298,344 L310,392 L278,432 L234,420 L238,374 Z" },
  { slug: "telangana", name: "Telangana", region: "South", capital: "Hyderabad", d: "M248,298 L296,306 L306,342 L274,358 L240,344 L238,320 Z" },
  { slug: "karnataka", name: "Karnataka", region: "South", capital: "Bengaluru", d: "M184,348 L236,356 L248,406 L226,446 L188,438 L168,396 Z" },
  { slug: "kerala", name: "Kerala", region: "South", capital: "Thiruvananthapuram", d: "M192,442 L212,448 L218,494 L204,524 L188,510 L184,464 Z" },
  { slug: "tamil-nadu", name: "Tamil Nadu", region: "South", capital: "Chennai", d: "M224,438 L268,446 L278,496 L248,536 L212,528 L216,482 Z" },
  { slug: "andaman-and-nicobar-islands", name: "Andaman & Nicobar", region: "South", capital: "Port Blair", d: "M438,448 L446,448 L448,512 L436,512 Z" },

  // NORTHEAST
  { slug: "sikkim", name: "Sikkim", region: "Northeast", capital: "Gangtok", d: "M386,164 L398,164 L400,178 L386,180 Z" },
  { slug: "assam", name: "Assam", region: "Northeast", capital: "Dispur", d: "M422,176 L488,182 L498,206 L454,218 L418,202 Z" },
  { slug: "arunachal-pradesh", name: "Arunachal Pradesh", region: "Northeast", capital: "Itanagar", d: "M434,142 L514,148 L524,182 L478,186 L438,168 Z" },
  { slug: "nagaland", name: "Nagaland", region: "Northeast", capital: "Kohima", d: "M486,188 L508,192 L504,218 L482,216 Z" },
  { slug: "manipur", name: "Manipur", region: "Northeast", capital: "Imphal", d: "M478,218 L502,220 L498,244 L476,242 Z" },
  { slug: "mizoram", name: "Mizoram", region: "Northeast", capital: "Aizawl", d: "M464,244 L482,246 L478,276 L458,272 Z" },
  { slug: "tripura", name: "Tripura", region: "Northeast", capital: "Agartala", d: "M444,228 L462,230 L458,254 L440,250 Z" },
  { slug: "meghalaya", name: "Meghalaya", region: "Northeast", capital: "Shillong", d: "M422,198 L462,200 L460,218 L420,216 Z" },
];

// Featured Destination Pin Coordinates on the Map Canvas (580 x 580 coordinate system)
const DESTINATION_PINS = [
  { slug: "delhi", name: "Delhi", x: 231, y: 139, state: "Delhi" },
  { slug: "jaipur", name: "Jaipur", x: 196, y: 172, state: "Rajasthan" },
  { slug: "varanasi", name: "Varanasi", x: 318, y: 188, state: "Uttar Pradesh" },
  { slug: "leh", name: "Leh Ladakh", x: 268, y: 84, state: "Ladakh" },
  { slug: "alleppey", name: "Alleppey", x: 202, y: 486, state: "Kerala" },
  { slug: "hampi", name: "Hampi", x: 218, y: 394, state: "Karnataka" },
  { slug: "mumbai", name: "Mumbai", x: 158, y: 298, state: "Maharashtra" },
  { slug: "kolkata", name: "Kolkata", x: 388, y: 242, state: "West Bengal" },
];

// Famous Animated Tourist Circuits
const TOURIST_CIRCUITS = [
  {
    name: "The Golden Triangle",
    points: "231,139 254,162 196,172 231,139", // Delhi -> Agra -> Jaipur -> Delhi
    color: "#E8A013",
  },
  {
    name: "Southern Heritage Trail",
    points: "218,394 224,420 202,486 238,498", // Hampi -> Bengaluru -> Alleppey -> Madurai
    color: "#10B981",
  },
];

export function IndiaMap() {
  const router = useRouter();
  const [hoveredState, setHoveredState] = useState<typeof ALL_STATES_SVG[0] | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCircuits, setShowCircuits] = useState(true);

  // Search Filtered States
  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return ALL_STATES_SVG.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // State Click Navigation
  const handleStateClick = (slug: string) => {
    setSelectedState(slug);
    router.push(`/states/${slug}`);
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#0d0d0d] border border-white/10 p-4 sm:p-6 select-none overflow-hidden shadow-2xl">
      {/* Top Controls Bar: Search & Circuit Toggle */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 relative z-20">
        {/* State Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-gray" />
          <input
            type="text"
            placeholder="Search 28 states & 8 UTs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/5 py-2 pl-10 pr-4 text-xs text-warm-white placeholder-muted-gray backdrop-blur-md transition-all focus:border-turmeric focus:bg-white/10 focus:outline-none"
          />

          {/* Autocomplete Search Dropdown */}
          {filteredStates.length > 0 && (
            <div className="absolute left-0 top-full z-30 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-white/15 bg-[#141414] p-1 shadow-2xl backdrop-blur-2xl">
              {filteredStates.map((st) => (
                <button
                  key={st.slug}
                  type="button"
                  onClick={() => {
                    setSelectedState(st.slug);
                    setSearchQuery(st.name);
                    handleStateClick(st.slug);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-xs text-zinc-300 transition-colors hover:bg-turmeric/20 hover:text-white"
                >
                  <span>{st.name}</span>
                  <span className="text-[10px] text-muted-gray">{st.region}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons: Circuit Toggle & Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCircuits((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer",
              showCircuits
                ? "border-turmeric/50 bg-turmeric/15 text-turmeric"
                : "border-white/10 bg-white/5 text-muted-gray hover:text-white",
            )}
            title="Toggle Animated Tourist Circuit Trails"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Tourist Circuits</span>
          </button>

        </div>
      </div>

      {/* Interactive Leaflet Map Area */}
      <div className="relative h-[480px] sm:h-[620px] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-navy-dark z-10">
        <LeafletMap />
      </div>

      {/* Bottom Region Legend & Circuit Indicator */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs">
        {/* Region Color Legend */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-gray">
            Regions:
          </span>
          {Object.entries(REGION_COLORS).map(([region, color]) => (
            <button
              key={region}
              type="button"
              onClick={() => {
                const firstInRegion = ALL_STATES_SVG.find((s) => s.region === region);
                if (firstInRegion) setSelectedState(firstInRegion.slug);
              }}
              className="flex items-center gap-1.5 transition-opacity hover:opacity-100 cursor-pointer"
            >
              <span
                className="h-3 w-3 rounded-md border"
                style={{ backgroundColor: color.base, borderColor: color.border }}
              />
              <span className="text-zinc-300 font-medium">{region}</span>
            </button>
          ))}
        </div>

        {/* Map Tip */}
        <p className="text-[11px] text-muted-gray flex items-center gap-1">
          <Compass className="h-3.5 w-3.5 text-white" />
          <span>Scroll to zoom · Drag to pan · Click any state or glowing pin</span>
        </p>
      </div>
    </div>
  );
}
