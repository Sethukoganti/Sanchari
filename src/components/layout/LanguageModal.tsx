"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Globe, Search, Sparkles, X } from "lucide-react";
import {
  INDIAN_LANGUAGES,
  INTERNATIONAL_LANGUAGES,
  LANGUAGES,
  POPULAR_LANGUAGES,
  searchLanguages,
  type LanguageInfo,
} from "@/lib/languages";
import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tab = "all" | "indian" | "international" | "popular";

export function LanguageModal() {
  const { lang, setLang, isLanguageModalOpen, closeLanguageModal } =
    useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");

  // Close on Escape key
  useEffect(() => {
    if (!isLanguageModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLanguageModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLanguageModalOpen, closeLanguageModal]);

  // Lock scroll when open
  useEffect(() => {
    if (isLanguageModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLanguageModalOpen]);

  // Filtered languages based on tab and query
  const filteredList = useMemo(() => {
    let baseList = LANGUAGES;
    if (activeTab === "indian") baseList = INDIAN_LANGUAGES;
    else if (activeTab === "international") baseList = INTERNATIONAL_LANGUAGES;
    else if (activeTab === "popular") baseList = POPULAR_LANGUAGES;

    if (!query.trim()) return baseList;
    const q = query.trim().toLowerCase();
    return baseList.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q) ||
        l.script.toLowerCase().includes(q)
    );
  }, [activeTab, query]);

  if (!isLanguageModalOpen) return null;

  const handleSelect = (selectedCode: string) => {
    setLang(selectedCode as Language);
    closeLanguageModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/80 backdrop-blur-sm transition-opacity"
        onClick={closeLanguageModal}
      />

      {/* Modal Card */}
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-navy text-white shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-warm-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-turmeric/20 text-turmeric ring-1 ring-turmeric/30">
              <Globe className="h-5 w-5" />
            </span>
            <div>
              <h2
                id="language-modal-title"
                className="font-display text-xl font-bold tracking-wide sm:text-2xl"
              >
                Select Language · भाषा चुनें
              </h2>
              <p className="text-xs text-warm-white/60 sm:text-sm">
                Explore in 22 Indian languages & 20+ international languages
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeLanguageModal}
            className="rounded-full p-2 text-warm-white/60 transition hover:bg-warm-white/10 hover:text-warm-white focus-visible:outline-turmeric"
            aria-label="Close language selector"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search and Tabs */}
        <div className="border-b border-warm-white/10 bg-board/60 p-4 sm:px-6">
          {/* Search Box */}
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-white/40"
              aria-hidden
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search language / भाषा खोजें (e.g. বাংলা, Telugu, Español, Japanese)…"
              className="w-full rounded-xl border border-warm-white/15 bg-dusk-ink/80 py-2.5 pl-10 pr-10 text-sm text-warm-white placeholder-warm-white/40 outline-none transition focus:border-turmeric focus:ring-1 focus:ring-turmeric"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-white/40 hover:text-warm-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition",
                activeTab === "all"
                  ? "bg-turmeric text-dusk-ink"
                  : "bg-warm-white/10 text-warm-white/80 hover:bg-warm-white/20 hover:text-warm-white"
              )}
            >
              All Languages ({LANGUAGES.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("indian")}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition",
                activeTab === "indian"
                  ? "bg-turmeric text-dusk-ink"
                  : "bg-warm-white/10 text-warm-white/80 hover:bg-warm-white/20 hover:text-warm-white"
              )}
            >
              🇮🇳 Indian Languages ({INDIAN_LANGUAGES.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("international")}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition",
                activeTab === "international"
                  ? "bg-turmeric text-dusk-ink"
                  : "bg-warm-white/10 text-warm-white/80 hover:bg-warm-white/20 hover:text-warm-white"
              )}
            >
              🌍 International ({INTERNATIONAL_LANGUAGES.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("popular")}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition",
                activeTab === "popular"
                  ? "bg-turmeric text-dusk-ink"
                  : "bg-warm-white/10 text-warm-white/80 hover:bg-warm-white/20 hover:text-warm-white"
              )}
            >
              ⭐ Popular ({POPULAR_LANGUAGES.length})
            </button>
          </div>
        </div>

        {/* Quick-Pick Popular Bar */}
        {!query && (
          <div className="border-b border-warm-white/10 bg-board/30 px-6 py-2.5">
            <div className="flex items-center gap-2 overflow-x-auto text-xs py-1">
              <span className="flex items-center gap-1 font-semibold text-turmeric whitespace-nowrap">
                <Sparkles className="h-3 w-3" /> Quick pick:
              </span>
              {[
                { code: "en", name: "English" },
                { code: "hi", name: "हिन्दी" },
                { code: "bn", name: "বাংলা" },
                { code: "te", name: "తెలుగు" },
                { code: "mr", name: "मराठी" },
                { code: "ta", name: "தமிழ்" },
                { code: "gu", name: "ગુજરાતી" },
                { code: "kn", name: "ಕನ್ನಡ" },
                { code: "ml", name: "മലയാളം" },
                { code: "pa", name: "ਪੰਜਾਬੀ" },
                { code: "fr", name: "Français" },
                { code: "es", name: "Español" },
                { code: "ja", name: "日本語" },
                { code: "de", name: "Deutsch" },
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={cn(
                    "whitespace-nowrap rounded-lg px-2.5 py-1 font-medium transition",
                    lang === item.code
                      ? "bg-turmeric/20 text-turmeric ring-1 ring-turmeric/50"
                      : "bg-warm-white/5 text-warm-white/70 hover:bg-warm-white/15 hover:text-warm-white"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grid List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredList.length === 0 ? (
            <div className="py-12 text-center text-warm-white/60">
              <p className="text-lg">No languages found matching &ldquo;{query}&rdquo;</p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-3 text-sm font-semibold text-turmeric hover:underline"
              >
                Clear search query
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredList.map((item) => {
                const isSelected =
                  lang === item.code ||
                  (lang === "zh" && item.code === "zh-CN") ||
                  (lang === "od" && item.code === "or");

                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleSelect(item.code)}
                    className={cn(
                      "group relative flex items-center justify-between rounded-xl border p-3.5 text-left transition-all",
                      isSelected
                        ? "border-turmeric bg-turmeric/15 text-warm-white shadow-md ring-1 ring-turmeric/50"
                        : "border-warm-white/10 bg-board/40 text-warm-white/90 hover:border-warm-white/30 hover:bg-warm-white/10 hover:text-warm-white"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xl sm:text-2xl shrink-0" aria-hidden>
                        {item.flag}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate font-display text-base font-bold sm:text-lg">
                            {item.nativeName}
                          </span>
                          {item.direction === "rtl" && (
                            <span className="rounded bg-warm-white/10 px-1 py-0.5 text-[9px] uppercase tracking-wider text-turmeric">
                              RTL
                            </span>
                          )}
                        </div>
                        <p className="truncate text-xs text-warm-white/60">
                          {item.name} · {item.region}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-turmeric text-dusk-ink">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex flex-col gap-2 border-t border-warm-white/10 bg-board/80 px-6 py-4 text-xs text-warm-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Selected language applies across the website with instant translation.
          </span>
          <span className="font-semibold text-turmeric">
            {LANGUAGES.length} Languages Supported
          </span>
        </div>
      </div>
    </div>
  );
}

