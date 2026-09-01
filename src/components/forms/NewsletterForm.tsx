"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { isValidEmail } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function NewsletterForm({
  source = "home",
  compact = false,
  dark = true,
}: {
  source?: string;
  compact?: boolean;
  dark?: boolean;
}) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError(t.common.required);
      return;
    }
    if (!isValidEmail(email)) {
      setError(t.common.invalidEmail);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not subscribe. Try again.");
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p
        className="rounded-xl border border-[#C41E3A]/40 bg-[#8E162C]/30 px-4 py-3 text-sm font-medium text-white shadow-md"
        role="status"
      >
        {t.common.subscribed}. Welcome aboard.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className={cn("flex gap-2", compact ? "flex-col" : "flex-col sm:flex-row")}>
        <label className="sr-only" htmlFor={`newsletter-${source}`}>
          Email
        </label>
        <input
          id={`newsletter-${source}`}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="you@email.com"
          className={cn(
            "w-full rounded-xl border px-4 py-3 text-sm outline-none transition",
            dark
              ? "border-white/20 bg-white/5 text-white placeholder:text-zinc-500 focus:border-[#C41E3A]"
              : "border-[color:var(--surface-border)] bg-[color:var(--surface)] text-[color:var(--text)] placeholder:text-[color:var(--text-soft)] focus:border-[#C41E3A]",
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `newsletter-error-${source}` : undefined}
        />
        <button
          type="submit"
          className="btn-primary shrink-0"
          disabled={status === "loading"}
        >
          {status === "loading" ? t.common.sending : t.common.subscribe}
        </button>
      </div>
      {error ? (
        <p
          id={`newsletter-error-${source}`}
          className="mt-2 text-sm text-[#E63956]"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
