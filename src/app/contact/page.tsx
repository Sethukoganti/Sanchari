import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SITE } from "@/data/content";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact the Editorial Desk · Explore India",
  description:
    "Write to the Explore India desk for trip planning help, partnerships, or corrections.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-24 text-zinc-900 dark:text-[#F7F3EC]">
      <PageHero
        eyebrow="Editorial Desk"
        title="Write to the Explore India Desk"
        description="Trip inquiries, custom itinerary consultations, press partnerships, or corrections. Every message is reviewed by our traveling team."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Contact" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="card-surface space-y-6 p-8 bg-white/[0.03] border-white/10 rounded-2xl">
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-turmeric flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  Direct Email
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-bold text-base text-warm-white hover:text-turmeric transition-colors mt-1 block"
                >
                  {SITE.email}
                </a>
              </div>

              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  Telephone Desk
                </p>
                <p className="font-bold text-base text-warm-white mt-1">{SITE.phone}</p>
                <p className="text-[11px] text-muted-gray">Monday – Friday: 09:00 to 18:00 IST</p>
              </div>

              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-rani flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Headquarters
                </p>
                <p className="text-xs text-zinc-300 mt-1">
                  Connaught Place, New Delhi, India 110001
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 text-xs text-muted-gray leading-relaxed">
                Explore India is an independent cultural travel platform. For sovereign visas and emergency advisories, always refer to official government bureaus.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
