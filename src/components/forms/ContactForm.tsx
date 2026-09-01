"use client";

import { useState } from "react";
import { Check, Mail, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { isValidEmail } from "@/lib/utils";

const subjects = [
  "Trip planning assistance",
  "Custom itinerary guidance",
  "Press & storytelling partnerships",
  "Correction or state guide feedback",
  "General inquiry",
];

interface Fields {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const { t } = useLanguage();
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function validate(): Errors {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = t.common.required;
    if (!fields.email.trim()) next.email = t.common.required;
    else if (!isValidEmail(fields.email)) next.email = t.common.invalidEmail;
    if (!fields.subject) next.subject = "Choose a subject from the list.";
    if (!fields.message.trim()) next.message = t.common.required;
    else if (fields.message.trim().length < 12)
      next.message = "Add a few more details so we can help (12+ characters).";
    return next;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not send message.");
      }
      setStatus("success");
      setFields(empty);
    } catch (err) {
      setErrors({
        message:
          err instanceof Error
            ? err.message
            : "Could not send message. Please try again.",
      });
      setStatus("idle");
    }
  }

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  }

  if (status === "success") {
    return (
      <div
        className="card-surface border border-emerald-500/40 bg-emerald-950/20 p-8 text-center rounded-2xl"
        role="status"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <Check className="h-7 w-7" />
        </div>
        <p className="mt-4 font-display text-3xl font-bold text-warm-white">
          Message Received!
        </p>
        <p className="mt-2 text-sm text-zinc-300">
          Thanks for reaching out to the Explore India desk. A human traveler will reply within 24 hours.
        </p>
        <button
          type="button"
          className="btn-primary mt-6"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-white/15 bg-black/60 text-warm-white px-4 py-2.5 text-xs outline-none transition focus:border-turmeric";

  return (
    <form onSubmit={onSubmit} noValidate className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-2xl">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="contact-name" className="text-xs font-semibold text-zinc-300">
            Your Name *
          </label>
          <input
            id="contact-name"
            className={fieldClass}
            placeholder="e.g. Vikramaditya"
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="mt-1 text-[11px] text-rose-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="text-xs font-semibold text-zinc-300">
            Email Address *
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@domain.com"
            className={fieldClass}
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-[11px] text-rose-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="text-xs font-semibold text-zinc-300">
            Phone / WhatsApp (Optional)
          </label>
          <input
            id="contact-phone"
            type="tel"
            placeholder="+91..."
            className={fieldClass}
            value={fields.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className="text-xs font-semibold text-zinc-300">
            Subject *
          </label>
          <select
            id="contact-subject"
            className={fieldClass}
            value={fields.subject}
            onChange={(e) => set("subject", e.target.value)}
            aria-invalid={!!errors.subject}
          >
            <option value="">Select a topic</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="mt-1 text-[11px] text-rose-400">{errors.subject}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="text-xs font-semibold text-zinc-300">
            Message & Details *
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Tell us what you're planning, dates, or how we can help..."
            className={fieldClass}
            value={fields.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p className="mt-1 text-[11px] text-rose-400">{errors.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary mt-6 !py-2.5 text-xs flex items-center gap-2"
        disabled={status === "loading"}
      >
        <Send className="h-3.5 w-3.5" />
        <span>{status === "loading" ? "Sending dispatch..." : "Send Message to Desk"}</span>
      </button>
    </form>
  );
}
