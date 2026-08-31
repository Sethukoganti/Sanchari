import type { Metadata } from "next";
import { StoriesExplorer } from "@/components/stories/StoriesExplorer";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Stories & Culture",
  description:
    "Original travel essays on seasons, railway breakfasts, textile towns, festival photography, and night markets.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Stories & culture"
        title="Field notes, not brochure copy"
        description="Filter by category. Every piece is written for Explore India—no scraped tourism text."
        tone="light"
      />
      <section className="section-pad pb-20">
        <div className="container-site">
          <StoriesExplorer />
        </div>
      </section>
    </>
  );
}
