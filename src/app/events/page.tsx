import type { Metadata } from "next";
import { EventsCalendar } from "@/components/events/EventsCalendar";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Events & Festivals",
  description:
    "Festival calendar for India with month and region filters—Pushkar, Hornbill, Onam, Rann Utsav, and more.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events calendar"
        title="Festival windows on a real timeline"
        description="Filter by month and region. Cards include dates, place, and a short briefing—not a dead decorative list."
      />
      <section className="section-pad py-14 lg:py-20">
        <div className="container-site">
          <EventsCalendar />
        </div>
      </section>
    </>
  );
}
