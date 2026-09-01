import type { Metadata } from "next";
import { ReviewSection } from "@/components/reviews/ReviewSection";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Traveler Reviews & Community Stories · Explore India",
  description:
    "Read verified traveler reviews, cultural field notes, and firsthand slow-travel advice across India's states, heritage cities, and festivals.",
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen pb-24 text-[#F7F3EC]">
      <PageHero
        eyebrow="Community Dispatches"
        title="Traveler Reviews & Field Notes"
        description="Authentic travel dispatches from global explorers, heritage enthusiasts, and solo adventurers who walked the ghats, climbed the fortresses, and joined the celebrations."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Reviews" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site max-w-4xl">
          <ReviewSection
            targetType="general"
            targetSlug="explore-india"
            targetName="Explore India Collective"
          />
        </div>
      </section>
    </div>
  );
}

