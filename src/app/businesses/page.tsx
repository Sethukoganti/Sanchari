"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Plus,
  Store,
  Compass,
  Check,
  X,
} from "lucide-react";
import { businessesData, getBusinessesByCategory } from "@/data/businesses";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Local Guide",
  "Homestay",
  "Handicrafts & Art",
  "Activity Provider",
  "Transport Provider",
];

export default function BusinessesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [bizName, setBizName] = useState("");
  const [bizCategory, setBizCategory] = useState("Local Guide");
  const [bizLocation, setBizLocation] = useState("");
  const [bizPhone, setBizPhone] = useState("");
  const [bizDesc, setBizDesc] = useState("");

  const filteredBusinesses = getBusinessesByCategory(activeCategory);

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPartnerModalOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-24 text-zinc-900 dark:text-[#F8FAFC]">
      <PageHero
        eyebrow="Local Tourism Directory"
        title="Verified Local Businesses & Guides"
        description="Directly connect with certified indigenous docents, organic homestays, and master weaver cooperatives across India with zero middleman commissions."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Local Businesses" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site space-y-8">
          {/* Header & Register Partner Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "chip !py-1.5 !px-3.5 text-xs font-semibold cursor-pointer",
                    activeCategory === cat && "chip-active"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPartnerModalOpen(true)}
              className="btn-primary !py-2 !px-4 text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Register as Verified Partner</span>
            </button>
          </div>

          {/* Business Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBusinesses.map((biz) => (
              <div
                key={biz.id}
                className="group card-surface overflow-hidden bg-navy-surface/60 border-white/10 hover:border-emerald-500/40 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={biz.image}
                      alt={biz.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-black/30" />

                    <div className="absolute top-3.5 left-3.5">
                      <span className="chip !py-1 !px-2.5 text-[10px] bg-emerald-950/80 backdrop-blur-md text-emerald-300 border-emerald-500/50 font-bold flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Verified Local Business
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex justify-between items-center text-xs">
                      <span className="text-warm-white font-semibold font-mono text-[11px] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        {biz.category}
                      </span>
                      <span className="flex items-center gap-1 text-amber-300 font-bold bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                        <Star className="h-3 w-3 fill-white" />
                        {biz.rating} ({biz.reviewsCount})
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-display text-lg font-bold text-warm-white group-hover:text-emerald-accent transition-colors">
                      {biz.name}
                    </h3>
                    <p className="text-xs text-zinc-300 font-body leading-relaxed line-clamp-3">
                      {biz.description}
                    </p>

                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {biz.features.map((feat) => (
                        <span
                          key={feat}
                          className="chip !py-0.5 !px-2 text-[10px] bg-navy-dark/60 text-zinc-400 border-white/5"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 text-xs text-muted-gray border-t border-white/5 space-y-1">
                      <div>Location: <strong className="text-warm-white">{biz.location}</strong></div>
                      <div>Tariff: <strong className="text-saffron font-mono">{biz.priceRange}</strong></div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-2">
                  <a
                    href={`tel:${biz.phone}`}
                    className="btn-secondary flex-1 justify-center !py-2 text-xs flex items-center gap-1.5 hover:border-emerald-500/40"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-accent" />
                    <span>Call Direct</span>
                  </a>
                  {biz.whatsapp && (
                    <a
                      href={`https://wa.me/${biz.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary !px-3 !py-2 text-xs flex items-center gap-1 text-emerald-400 hover:border-emerald-500/40"
                      title="WhatsApp Chat"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Registration Modal */}
      {partnerModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#0E172F] p-6 sm:p-8 text-warm-white shadow-2xl space-y-6">
            <button
              type="button"
              onClick={() => setPartnerModalOpen(false)}
              className="absolute right-4 top-4 rounded-xl p-2 text-zinc-400 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="badge-hidden-gem">Join Sanchari Bharat</span>
              <h3 className="font-display text-2xl font-bold text-warm-white">
                Register as a Verified Local Partner
              </h3>
              <p className="text-xs text-muted-gray">
                Empower your local community. Get verified by our regional coordinators.
              </p>
            </div>

            {submitted ? (
              <div className="my-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-6 text-center space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
                <p className="font-display text-lg font-bold text-warm-white">
                  Application Submitted!
                </p>
                <p className="text-xs text-muted-gray">
                  Our regional audit coordinator will verify your business details within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Business / Guide Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hampi Boulder Guides Collective"
                    value={bizName}
                    onChange={(e) => setBizName(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-navy-dark px-3.5 py-2.5 text-xs text-warm-white outline-none focus:border-emerald-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Category
                    </label>
                    <select
                      value={bizCategory}
                      onChange={(e) => setBizCategory(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-navy-dark px-3 py-2.5 text-xs text-warm-white outline-none focus:border-emerald-accent"
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={bizPhone}
                      onChange={(e) => setBizPhone(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-navy-dark px-3.5 py-2.5 text-xs text-warm-white outline-none focus:border-emerald-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Location & State
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anegundi, Karnataka"
                    value={bizLocation}
                    onChange={(e) => setBizLocation(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-navy-dark px-3.5 py-2.5 text-xs text-warm-white outline-none focus:border-emerald-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Brief Description of Services
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your tour offerings, homestay amenities, or craft specialties..."
                    value={bizDesc}
                    onChange={(e) => setBizDesc(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-navy-dark px-3.5 py-2 text-xs text-warm-white outline-none focus:border-emerald-accent"
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center !py-2.5 text-xs mt-2">
                  Submit for Verification
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

