import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of India routes with category filters and a full lightbox—keyboard arrows and Escape supported.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Light, texture, and working landscapes"
        description="Masonry grid with category chips. Open any frame for a lightbox with next/prev and keyboard controls."
        tone="light"
      />
      <section className="section-pad pb-20">
        <div className="container-site">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
