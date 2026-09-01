import type { Metadata } from "next";
import { destinationsData } from "@/data/destinations";
import { DestinationExplorer } from "@/components/destinations/DestinationExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Explore Destinations across India",
  description:
    "Curated travel bases across 28 states and 8 union territories: heritage fortresses, high mountain passes, emerald backwaters, and holy riverbanks.",
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; theme?: string }>;
}) {
  const { region, theme } = await searchParams;

  return (
    <div className="min-h-screen pb-24 text-[#F7F3EC]">
      <PageHero
        eyebrow="Curated Bases"
        title="Destinations with Room to Linger"
        description="Filter by region, cultural themes, or budget style to plan an authentic, slow-paced journey across the subcontinent."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Destinations" }]} />
      </div>

      <div className="container-site section-pad mt-8">
        <DestinationExplorer
          initialRegion={region}
          initialTheme={theme}
        />
      </div>
    </div>
  );
}
