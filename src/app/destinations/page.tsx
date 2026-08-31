import type { Metadata } from "next";
import { DestinationExplorer } from "@/components/destinations/DestinationExplorer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Filter Explore India destinations by region and theme—heritage cities, backwaters, high deserts, wildlife parks, and more.",
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const region = typeof params.region === "string" ? params.region : undefined;
  const theme = typeof params.theme === "string" ? params.theme : undefined;
  const q = typeof params.q === "string" ? params.q : undefined;

  return (
    <>
      <PageHero
        eyebrow="Destination board"
        title="Routes worth defending on a map"
        description="Multi-select region and theme filters run entirely in the browser. Cards zoom on hover; load more when you want a longer list."
      />
      <section className="section-pad py-14 lg:py-20">
        <div className="container-site">
          <DestinationExplorer
            initialRegion={region}
            initialTheme={theme}
            initialQuery={q}
          />
        </div>
      </section>
    </>
  );
}
