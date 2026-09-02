import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Visual Gallery · Photographs of India",
  description:
    "Photo gallery of India routes with category filters and a full lightbox—keyboard arrows and Escape supported.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen pb-24 text-zinc-900 dark:text-[#F7F3EC]">
      <PageHero
        eyebrow="Visual Chronicles"
        title="Light, Texture & Sacred Landscapes"
        description="High-definition visual gallery capturing ancient temple carvings, high Himalayan passes, desert dunes, and coastal backwaters."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Gallery" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
