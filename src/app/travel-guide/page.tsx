"use client";

import { useState } from "react";
import {
  CheckSquare,
  Volume2,
  FileText,
  CreditCard,
  Smartphone,
  Check,
  Pause,
} from "lucide-react";
import {
  packingChecklistData,
  hindiPhrasesData,
} from "@/data/travel-guide";
import type { PackingItem, HindiPhrase } from "@/lib/types";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";

export default function TravelGuidePage() {
  const [activeSeason, setActiveSeason] = useState<string>("all");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPacking = packingChecklistData.filter((item: PackingItem) => {
    if (activeSeason === "all") return true;
    return item.seasons.includes(activeSeason as any);
  });

  const speakPhrase = (phrase: HindiPhrase) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (playingPhraseId === phrase.id) {
      window.speechSynthesis.cancel();
      setPlayingPhraseId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase.audioText || phrase.hindiScript || phrase.english);
    utterance.lang = "hi-IN";
    utterance.rate = 0.85;

    utterance.onend = () => setPlayingPhraseId(null);
    utterance.onerror = () => setPlayingPhraseId(null);

    window.speechSynthesis.speak(utterance);
    setPlayingPhraseId(phrase.id);
  };

  return (
    <div className="min-h-screen pb-24 text-zinc-900 dark:text-[#F7F3EC]">
      <PageHero
        eyebrow="Practical Field Handbook"
        title="Comprehensive Travel Guide"
        description="Essential advisories for international & domestic explorers: e-Visa rules, UPI QR mobile payments, seasonal packing checklists, and audio-assisted Hindi phrasebook."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Travel Guide" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site space-y-16">
          {/* Advisory Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-surface p-6 bg-white/[0.03] border-white/10 rounded-2xl space-y-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-turmeric/15 text-turmeric border border-turmeric/30">
                <FileText className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-bold text-warm-white">
                Indian e-Tourist Visa
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-body">
                Apply only on the official government website (indianvisaonline.gov.in) 4 to 30 days before departure. 30-day double entry, 1-year and 5-year multiple entry visas are available for 165+ nationalities.
              </p>
            </div>

            <div className="card-surface p-6 bg-white/[0.03] border-white/10 rounded-2xl space-y-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300 border border-teal-500/30">
                <CreditCard className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-bold text-warm-white">
                UPI QR Mobile Payments
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-body">
                India is largely a cashless QR society. Foreign travelers can register for designated prepaid UPI wallets at Delhi, Mumbai, and Bengaluru airport transit desks to pay roadside tea stalls and major shops directly with their phone.
              </p>
            </div>

            <div className="card-surface p-6 bg-white/[0.03] border-white/10 rounded-2xl space-y-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rani/15 text-rani border border-rani/30">
                <Smartphone className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-bold text-warm-white">
                eSIMs & 5G Connectivity
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-body">
                Install an international eSIM (Airalo / Nomad) prior to boarding, or purchase a local Airtel/Jio SIM card at airport arrival lounges with your passport and photo. 5G speeds are pervasive across all cities.
              </p>
            </div>
          </div>

          {/* Packing Checklist Generator */}
          <div id="packing" className="space-y-6 scroll-mt-28">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white flex items-center gap-2.5">
                  <CheckSquare className="h-6 w-6 text-white" />
                  Interactive Packing Checklist Generator
                </h2>
                <p className="text-xs text-muted-gray mt-1">
                  Filter by your destination season and check off items as you pack.
                </p>
              </div>

              {/* Season Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "All Seasons" },
                  { id: "summer", label: "Summer / Plains" },
                  { id: "monsoon", label: "Monsoon" },
                  { id: "winter", label: "Winter / Desert" },
                  { id: "himalayan", label: "High Himalayan" },
                ].map((seas) => (
                  <button
                    key={seas.id}
                    type="button"
                    onClick={() => setActiveSeason(seas.id)}
                    className={cn(
                      "chip !py-1.5 !px-3 text-xs font-semibold cursor-pointer",
                      activeSeason === seas.id && "chip-active"
                    )}
                  >
                    {seas.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPacking.map((item: PackingItem) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={cn(
                      "card-surface p-4 rounded-2xl border transition duration-200 cursor-pointer flex items-start gap-3 select-none",
                      isChecked
                        ? "bg-emerald-950/20 border-emerald-500/40 text-zinc-300"
                        : "bg-white/[0.03] border-white/10 hover:border-turmeric/40"
                    )}
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition",
                        isChecked
                          ? "border-emerald-500 bg-emerald-500 text-black"
                          : "border-white/20 bg-white/5"
                      )}
                    >
                      {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <h4
                        className={cn(
                          "font-display text-base font-bold text-warm-white",
                          isChecked && "line-through text-zinc-400"
                        )}
                      >
                        {item.name}
                      </h4>
                      {item.notes && (
                        <p className="text-[11px] text-muted-gray mt-0.5">{item.notes}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hindi Phrasebook with Audio */}
          <div id="hindi-phrases" className="space-y-6 scroll-mt-28">
            <div className="border-b border-white/10 pb-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white flex items-center gap-2.5">
                <Volume2 className="h-6 w-6 text-teal-400" />
                Hindi Travel Phrasebook with Audio
              </h2>
              <p className="text-xs text-muted-gray mt-1">
                Listen to native pronunciations for essential daily phrases across markets, transport, and dining.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hindiPhrasesData.map((phrase: HindiPhrase) => {
                const isPlaying = playingPhraseId === phrase.id;
                return (
                  <div
                    key={phrase.id}
                    className="card-surface p-5 bg-white/[0.03] border-white/10 rounded-2xl space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-turmeric uppercase">
                          {phrase.category}
                        </span>
                        <h4 className="font-display text-lg font-bold text-warm-white mt-0.5">
                          {phrase.english}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => speakPhrase(phrase)}
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition cursor-pointer",
                          isPlaying
                            ? "border-rani bg-rani text-white animate-pulse"
                            : "border-white/15 bg-white/5 text-turmeric hover:bg-turmeric hover:text-black"
                        )}
                        title="Listen to audio"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </button>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-black/40 p-3 space-y-1">
                      <p className="font-display text-lg font-bold text-warm-white">
                        {phrase.hindiScript}
                      </p>
                      <p className="font-mono text-xs text-teal-300">
                        {phrase.transliteration}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

