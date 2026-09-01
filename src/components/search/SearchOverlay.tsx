"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { searchAll } from "@/lib/search";
import { useLanguage } from "@/lib/i18n";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchAll(query, 8), [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-[#0E0507]/90 px-4 pt-[12vh] backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[rgba(230,57,86,0.25)] bg-[#120407] shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
        <form
          className="flex items-center gap-3 border-b border-white/10 px-5 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            const q = query.trim();
            if (!q) return;
            onClose();
            router.push(`/search?q=${encodeURIComponent(q)}`);
          }}
        >
          <Search className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.common.searchPlaceholder}
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-zinc-500"
            aria-label={t.nav.search}
            autoComplete="off"
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 hover:bg-white/10 hover:text-white cursor-pointer"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </form>

        <div className="max-h-[50vh] overflow-y-auto p-3">
          {query.trim() && results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-zinc-400">
              {t.common.noResults}
            </p>
          ) : null}
          {results.map((r) => (
            <Link
              key={`${r.type}-${r.slug}`}
              href={r.href}
              onClick={onClose}
              className="flex items-center gap-3.5 rounded-2xl px-3.5 py-3 transition hover:bg-[#8E162C]/25"
            >
              {r.image ? (
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10">
                  <Image src={r.image} alt="" fill className="object-cover" sizes="48px" />
                </span>
              ) : null}
              <span className="min-w-0">
                <span className="block truncate font-semibold text-white">
                  {r.title}
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#D4AF37]">
                  {r.type} · {r.subtitle}
                </span>
              </span>
            </Link>
          ))}
          {query.trim() ? (
            <button
              type="button"
              className="mt-1 w-full rounded-2xl px-3.5 py-3 text-left text-sm font-semibold text-[#D4AF37] transition hover:bg-[#8E162C]/20 cursor-pointer"
              onClick={() => {
                onClose();
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
              }}
            >
              Search all for &ldquo;{query.trim()}&rdquo; →
            </button>
          ) : (
            <p className="px-3 py-6 text-center text-sm text-zinc-500">
              Try “Kerala”, “festival”, “train”, or “Hampi”.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
