import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { SITE } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to the Explore India desk for trip planning help, partnerships, or corrections.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write to the desk"
        description="Trip questions, group arcs, press, or a correction we should fix. Validated form, real success state, stored securely."
        tone="light"
      />
      <section className="section-pad pb-20">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <aside className="lg:col-span-5">
            <div className="card-surface space-y-5 p-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted">Email</p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-semibold text-peacock hover:underline"
                >
                  {SITE.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted">Phone</p>
                <p className="font-semibold">{SITE.phone}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted">Note</p>
                <p className="text-sm leading-relaxed text-ink-muted">
                  Explore India is an independent platform. For visas and official
                  travel advisories, use government channels.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
