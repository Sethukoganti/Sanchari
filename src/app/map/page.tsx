import type { Metadata } from "next";
import { IndiaMap } from "@/components/map/IndiaMap";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Interactive SVG India Map · 28 States & 8 Union Territories",
  description:
    "Interactive, zoomable, and pannable map of India with official state boundaries, pulsing destination pins, and animated tourist circuits.",
};

export default function MapPage() {
  return (
    <div className="min-h-screen pb-24 text-zinc-900 dark:text-[#F7F3EC]">
      <PageHero
        eyebrow="Interactive Geographic Atlas"
        title="Interactive Map of India"
        description="Zoom, pan, and search all 28 states and 8 union territories. Click any state or glowing pin to explore state guides and travel circuits."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Interactive Map" }]} />
      </div>

      <div className="container-site section-pad mt-8">
        <IndiaMap />
      </div>
    </div>
  );
}
