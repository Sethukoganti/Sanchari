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
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[rgba(230,57,86,0.25)] bg-[#120407]/98 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#1A070B] p-5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8E162C]/30 text-[#F7EAC8] ring-1 ring-[#D4AF37]/40">
              <Globe className="h-5 w-5" />
            </span>
            <div>
              <h2
                id="language-modal-title"
                className="font-display text-xl font-bold tracking-wide sm:text-2xl text-white"
              >
                Select Language · भाषा चुनें
              </h2>
              <p className="text-xs text-zinc-400 sm:text-sm">
                Explore in 22 Indian languages & 20+ international languages
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeLanguageModal}
            className="rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white cursor-pointer"
            aria-label="Close language selector"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search and Tabs */}
        <div className="border-b border-white/10 bg-[#160509] p-4 sm:px-6">
          {/* Search Box */}
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              aria-hidden
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search language / भाषा खोजें (e.g. বাংলা, Telugu, Español, Japanese)…"
              className="w-full rounded-xl border border-white/15 bg-[#0E0507] py-2.5 pl-10 pr-10 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A]"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
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
                "rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition cursor-pointer",
                activeTab === "all"
                  ? "bg-gradient-to-r from-[#8E162C] to-[#4A0E17] text-white shadow-md border border-[#C41E3A]"
                  : "bg-white/5 text-zinc-300 hover:bg-[#8E162C]/20 hover:text-white border border-white/10"
              )}
            >
              All Languages ({LANGUAGES.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("indian")}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition cursor-pointer",
                activeTab === "indian"
                  ? "bg-gradient-to-r from-[#8E162C] to-[#4A0E17] text-white shadow-md border border-[#C41E3A]"
                  : "bg-white/5 text-zinc-300 hover:bg-[#8E162C]/20 hover:text-white border border-white/10"
              )}
            >
              🇮🇳 Indian Languages ({INDIAN_LANGUAGES.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("international")}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition cursor-pointer",
                activeTab === "international"
                  ? "bg-gradient-to-r from-[#8E162C] to-[#4A0E17] text-white shadow-md border border-[#C41E3A]"
                  : "bg-white/5 text-zinc-300 hover:bg-[#8E162C]/20 hover:text-white border border-white/10"
              )}
            >
              🌍 International ({INTERNATIONAL_LANGUAGES.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("popular")}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition cursor-pointer",
                activeTab === "popular"
                  ? "bg-gradient-to-r from-[#8E162C] to-[#4A0E17] text-white shadow-md border border-[#C41E3A]"
                  : "bg-white/5 text-zinc-300 hover:bg-[#8E162C]/20 hover:text-white border border-white/10"
              )}
            >
              ⭐ Popular ({POPULAR_LANGUAGES.length})
            </button>
          </div>
        </div>

        {/* Quick-Pick Popular Bar */}
        {!query && (
          <div className="border-b border-white/10 bg-[#18060B]/70 px-6 py-2.5">
            <div className="flex items-center gap-2 overflow-x-auto text-xs py-1">
              <span className="flex items-center gap-1 font-semibold text-[#D4AF37] whitespace-nowrap">
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
                    "whitespace-nowrap rounded-lg px-2.5 py-1 font-medium transition cursor-pointer",
                    lang === item.code
                      ? "bg-[#8E162C] text-[#F7EAC8] ring-1 ring-[#D4AF37]"
                      : "bg-white/5 text-zinc-300 hover:bg-[#8E162C]/30 hover:text-white"
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
            <div className="py-12 text-center text-zinc-400">
              <p className="text-lg">No languages found matching &ldquo;{query}&rdquo;</p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-3 text-sm font-semibold text-[#D4AF37] hover:underline cursor-pointer"
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
                      "group relative flex items-center justify-between rounded-xl border p-3.5 text-left transition-all cursor-pointer",
                      isSelected
                        ? "border-[#C41E3A] bg-gradient-to-r from-[#8E162C]/35 to-[#4A0E17]/35 text-white shadow-lg ring-1 ring-[#C41E3A]"
                        : "border-white/10 bg-white/5 text-zinc-200 hover:border-[#C41E3A]/40 hover:bg-[#8E162C]/15 hover:text-white"
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
                            <span className="rounded bg-[#8E162C]/30 px-1 py-0.5 text-[9px] uppercase tracking-wider text-[#D4AF37]">
                              RTL
                            </span>
                          )}
                        </div>
                        <p className="truncate text-xs text-zinc-400">
                          {item.name} · {item.region}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C41E3A] text-white shadow-md">
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
        <div className="flex flex-col gap-2 border-t border-white/10 bg-[#160509] px-6 py-4 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Selected language applies across the website with instant translation.
          </span>
          <span className="font-semibold text-[#D4AF37]">
            {LANGUAGES.length} Languages Supported
          </span>
        </div>
      </div>
    </div>
  );
}

