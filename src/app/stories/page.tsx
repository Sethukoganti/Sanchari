import type { Metadata } from "next";
import { StoriesExplorer } from "@/components/stories/StoriesExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cultural Stories & Slow Travel Essays · Explore India",
  description:
    "Original travel essays on mountain seasons, historic railway breakfasts, handloom textile towns, and festival traditions across India.",
};

export default function StoriesPage() {
  return (
    <div className="min-h-screen pb-24 text-zinc-900 dark:text-[#F7F3EC]">
      <PageHero
        eyebrow="Cultural Essays"
        title="Field Notes & Subcontinent Stories"
        description="Thoughtful travel essays exploring regional cuisines, heritage architecture, and living traditions across India."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Stories & Culture" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site">
          <StoriesExplorer />
        </div>
      </section>
    </div>
  );
}
