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
      className="fixed inset-0 z-[60] flex items-start justify-center bg-navy/85 px-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-limestone shadow-2xl">
        <form
          className="flex items-center gap-3 border-b border-dusk-ink/10 px-4 py-3"
          onSubmit={(e) => {
            e.preventDefault();
            const q = query.trim();
            if (!q) return;
            onClose();
            router.push(`/search?q=${encodeURIComponent(q)}`);
          }}
        >
          <Search className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.common.searchPlaceholder}
            className="w-full bg-transparent text-base text-dusk-ink outline-none placeholder:text-ink-muted/70"
            aria-label={t.nav.search}
            autoComplete="off"
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-dusk-ink/5"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </form>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {query.trim() && results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-ink-muted">
              {t.common.noResults}
            </p>
          ) : null}
          {results.map((r) => (
            <Link
              key={`${r.type}-${r.slug}`}
              href={r.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-surface-elevated"
            >
              {r.image ? (
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <Image src={r.image} alt="" fill className="object-cover" sizes="48px" />
                </span>
              ) : null}
              <span className="min-w-0">
                <span className="block truncate font-semibold text-dusk-ink">
                  {r.title}
                </span>
                <span className="block text-xs uppercase tracking-wider text-peacock">
                  {r.type} · {r.subtitle}
                </span>
              </span>
            </Link>
          ))}
          {query.trim() ? (
            <button
              type="button"
              className="mt-1 w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-peacock hover:bg-surface-elevated"
              onClick={() => {
                onClose();
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
              }}
            >
              View all results for “{query.trim()}”
            </button>
          ) : (
            <p className="px-3 py-6 text-center text-sm text-ink-muted">
              Try “Kerala”, “festival”, “train”, or “Hampi”.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
