import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Explore India is an independent travel platform for cinematic routes and carefully paced itineraries—not a government tourism site.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="An independent desk for serious wanderers"
        description="Explore India is not a ministry portal, hotel chain, or cloned brochure. We write routes the way travelers actually move—with buffers, seasons, and specific doors."
      />
      <section className="section-pad py-14 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="prose-ei lg:col-span-7">
            <p>
              The platform began from a simple frustration: too many India trip
              pages sound identical, promise everything, and leave you with a
              packing list of temples you will never reach on time. We built
              Explore India around fewer places, clearer seasons, and the small
              operational details that change a day—platform breakfasts, dye-yard
              mornings, jeep range openings after rain.
            </p>
            <p>
              Our signature live departures board is a deliberate nod to the
              station boards travelers actually stare at. It is decoration with a
              job: surface routes that are genuinely in season or festival-lit
              right now, pulled from the same destination data as the rest of the
              site.
            </p>
            <h2>What we are not</h2>
            <p>
              We are not an official government tourism website. Visas, permits,
              and safety advisories belong to sovereign authorities—we point you
              there and refuse to cosplay as them. We also do not scrape other
              travel brands for copy. Every destination note and story on this
              site is written for Explore India.
            </p>
            <h2>How we work</h2>
            <p>
              Editorial first, booking-agnostic by design. Use the itinerary
              builder to sketch a paced arc, then take it to the operators you
              trust. When you write to us, a human reads it.
            </p>
          </div>
          <aside className="lg:col-span-5">
            <div className="card-surface space-y-6 p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-peacock">
                  Tagline
                </p>
                <p className="mt-2 font-display text-3xl">A Billion Stories Await</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-peacock">
                  Contact
                </p>
                <p className="mt-2 text-sm">hello@exploreindia.travel</p>
                <p className="text-sm">+91 22 4890 2100</p>
              </div>
              <Link href="/contact" className="btn-primary">
                Write to the desk
              </Link>
              <Link href="/plan" className="btn-ghost">
                Open itinerary builder
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
