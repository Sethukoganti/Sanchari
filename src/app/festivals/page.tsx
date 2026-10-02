import type { Metadata } from "next";
import { festivalsData } from "@/data/festivals";
import { FestivalHubClient } from "@/components/festivals/FestivalHubClient";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "50+ Major Indian Festivals Hub · Explore India",
  description:
    "Explore India's comprehensive festival calendar: Deepawali, Holi, Durga Puja, Onam, Hornbill, Pushkar Mela, Hemis, Rann Utsav, and 50+ sacred regional celebrations.",
};

export default function FestivalsPage() {
  return (
    <div className="min-h-screen pb-24 text-zinc-900 dark:text-[#F7F3EC]">
      <PageHero
        eyebrow="Living Culture & Rituals"
        title="50+ Major Indian Festivals Hub"
        description="Immerse in the world's most vibrant celebrations. Discover rituals, festive food recipes, traditional attire, and authentic local celebration spots across all Indian states."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Festivals" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site">
          <FestivalHubClient festivals={festivalsData} />
        </div>
      </section>
    </div>
  );
}

