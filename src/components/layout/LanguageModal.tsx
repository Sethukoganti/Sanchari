"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Globe, Search, Sparkles, X } from "lucide-react";
import { LANGUAGES, type LanguageInfo, getLanguageByCode } from "@/lib/languages";
import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const { language, setLanguage } = useLanguage();
  const [query, setQuery] = useState("");

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const filteredLanguages = useMemo(() => {
    if (!query.trim()) return LANGUAGES;
    const q = query.toLowerCase().trim();
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q) ||
        l.script.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-navy-surface border border-black/10 dark:border-white/10 p-6 sm:p-8 shadow-2xl space-y-6 text-zinc-900 dark:text-warm-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-2xl bg-saffron/15 text-saffron flex items-center justify-center">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h2 id="language-modal-title" className="font-display text-xl font-bold">
                Select Language · भाषा चुनें
              </h2>
              <p className="text-xs text-zinc-500 font-mono">
                India's 22 Scheduled Languages + English (23 Total)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search language (e.g., Telugu, हिन्दी, Tamil, বাংলা)..."
            className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-navy-dark/60 py-3 pl-11 pr-4 text-sm font-semibold focus:border-saffron focus:outline-none"
            autoFocus
          />
        </div>

        {/* Language Grid */}
        <div className="max-h-[380px] overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredLanguages.map((langItem) => {
            const isSelected = language === langItem.code;
            return (
              <button
                key={langItem.code}
                type="button"
                onClick={() => {
                  setLanguage(langItem.code as Language);
                  onClose();
                }}
                className={cn(
                  "p-3.5 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer",
                  isSelected
                    ? "bg-saffron/15 border-saffron text-saffron shadow-sm"
                    : "bg-black/[0.02] dark:bg-navy-dark/40 border-black/5 dark:border-white/5 hover:border-saffron/40"
                )}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-base font-bold">
                      {langItem.nativeName}
                    </span>
                    <span className="text-xs text-zinc-500 font-body">
                      ({langItem.name})
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
                    {langItem.script} · {langItem.region}
                  </p>
                </div>

                <div
                  className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center shrink-0 border",
                    isSelected
                      ? "bg-saffron border-saffron text-white"
                      : "border-black/10 dark:border-white/10"
                  )}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="border-t border-black/10 dark:border-white/10 pt-4 flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span>Active: {getLanguageByCode(language)?.name || "English"}</span>
          <span>Instant UI Translation Active</span>
        </div>
      </div>
    </div>
  );
}
