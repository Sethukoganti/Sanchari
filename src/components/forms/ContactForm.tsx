"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { isValidEmail } from "@/lib/utils";

const subjects = [
  "Trip planning help",
  "Group or family itinerary",
  "Press & partnerships",
  "Correction or feedback",
  "Something else",
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
        className="card-surface border border-saffron/20 bg-saffron/5 p-8"
        role="status"
      >
        <p className="font-display text-3xl text-dusk-ink">{t.common.submitted}</p>
        <p className="mt-3 text-ink-muted">
          Thanks—we read every note. Expect a reply within two business days.
        </p>
        <button
          type="button"
          className="btn-ghost mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-dusk-ink/15 bg-warm-white px-4 py-3 text-sm outline-none transition focus:border-peacock";

  return (
    <form onSubmit={onSubmit} noValidate className="card-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="contact-name" className="text-sm font-semibold">
            Name
          </label>
          <input
            id="contact-name"
            className={fieldClass}
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
          />
          {errors.name ? (
            <p id="err-name" className="mt-1 text-sm text-rani" role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            className={fieldClass}
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email ? (
            <p id="err-email" className="mt-1 text-sm text-rani" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-phone" className="text-sm font-semibold">
            Phone <span className="font-normal text-ink-muted">({t.common.optional})</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            className={fieldClass}
            value={fields.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className="text-sm font-semibold">
            Subject
          </label>
          <select
            id="contact-subject"
            className={fieldClass}
            value={fields.subject}
            onChange={(e) => set("subject", e.target.value)}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "err-subject" : undefined}
          >
            <option value="">Select a topic</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.subject ? (
            <p id="err-subject" className="mt-1 text-sm text-rani" role="alert">
              {errors.subject}
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="text-sm font-semibold">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={6}
            className={fieldClass}
            value={fields.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "err-message" : undefined}
          />
          {errors.message ? (
            <p id="err-message" className="mt-1 text-sm text-rani" role="alert">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>
      <button
        type="submit"
        className="btn-primary mt-6"
        disabled={status === "loading"}
      >
        {status === "loading" ? t.common.sending : t.common.submit}
      </button>
    </form>
  );
}
