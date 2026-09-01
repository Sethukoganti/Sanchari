"use client";

import { useState } from "react";
import { Volume2, VolumeX, Pause, Sparkles, Languages } from "lucide-react";
import type { LanguageTranslation } from "@/data/translations";
import { cn } from "@/lib/utils";

interface MultilingualNarrativeProps {
  destinationName: string;
  translations: LanguageTranslation[];
}

export function MultilingualNarrative({
  destinationName,
  translations,
}: MultilingualNarrativeProps) {
  const [activeLangCode, setActiveLangCode] = useState(translations[0]?.languageCode || "en");
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTranslation =
    translations.find((t) => t.languageCode === activeLangCode) || translations[0];

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentTranslation.narrativeText || currentTranslation.content);
    utterance.lang = currentTranslation.speechVoiceTag || currentTranslation.voiceLang || "en-IN";
    utterance.rate = 0.9;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  if (!translations || translations.length === 0) return null;

  return (
    <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-turmeric/15 text-turmeric border border-turmeric/30">
            <Languages className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold text-warm-white">
              Multilingual Audio Narrative
            </h3>
            <p className="text-xs text-muted-gray">
              Listen to the cultural story of {destinationName} in regional Indian languages.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSpeak}
          className={cn(
            "btn-primary !py-2 !px-4 text-xs flex items-center gap-2 cursor-pointer transition-all",
            isPlaying && "bg-rani border-rani text-white animate-pulse"
          )}
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              <span>Pause Narration</span>
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4" />
              <span>Listen in {currentTranslation.languageName}</span>
            </>
          )}
        </button>
      </div>

      {/* Language Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {translations.map((t) => (
          <button
            key={t.languageCode}
            type="button"
            onClick={() => {
              if (isPlaying) {
                window.speechSynthesis.cancel();
                setIsPlaying(false);
              }
              setActiveLangCode(t.languageCode);
            }}
            className={cn(
              "chip !py-1.5 !px-3.5 text-xs font-semibold cursor-pointer",
              activeLangCode === t.languageCode && "chip-active"
            )}
          >
            <span>{t.nativeName}</span>
            <span className="text-[10px] text-muted-gray ml-1">({t.languageName})</span>
          </button>
        ))}
      </div>

      {/* Narrative Card */}
      <div className="rounded-2xl border border-white/5 bg-black/50 p-6 sm:p-8">
        <p className="text-base sm:text-lg leading-relaxed text-zinc-200 font-body">
          {currentTranslation.narrativeText || currentTranslation.content}
        </p>
      </div>
    </div>
  );
}

