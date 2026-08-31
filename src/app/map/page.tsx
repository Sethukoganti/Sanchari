import type { Metadata } from "next";
import { IndiaMap } from "@/components/map/IndiaMap";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Interactive Map",
  description:
    "Clickable SVG map of India—hover states for tooltips, click through to regional guides.",
};

export default function MapPage() {
  return (
    <>
      <PageHero
        eyebrow="Interactive map"
        title="Every state a path you can focus"
        description="Illustrative SVG with keyboard support. Linked states open local guides; others route into destination search."
      />
      <section className="section-pad py-14 lg:py-20">
        <div className="container-site">
          <IndiaMap />
        </div>
      </section>
    </>
  );
}
