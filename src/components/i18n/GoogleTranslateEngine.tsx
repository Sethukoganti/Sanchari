"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export function GoogleTranslateEngine() {
  const { lang } = useLanguage();
  const initializedRef = useRef(false);

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
        initializedRef.current = true;
      }
    };

    // Load Google Translate script if not already present
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // When language changes, update Google Translate dropdown if present
  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyTranslation = () => {
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (!select) return;

      const langStr = String(lang);
      const targetLang = langStr === "or" || langStr === "od" ? "or" : langStr;

      if (lang === "en") {
        // Reset to original English
        if (select.value && select.value !== "en") {
          select.value = "en";
          select.dispatchEvent(new Event("change"));
        }
        // Also remove cookies
        document.cookie =
          "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      } else {
        if (select.value !== targetLang) {
          select.value = targetLang;
          select.dispatchEvent(new Event("change"));
        }
      }
    };

    // Try immediately and with slight debounce to catch DOM mount
    applyTranslation();
    const t1 = setTimeout(applyTranslation, 400);
    const t2 = setTimeout(applyTranslation, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [lang]);

  return (
    <div
      id="google_translate_element"
      className="hidden pointer-events-none opacity-0 h-0 w-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
