"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/request";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

const localeNames: Record<Locale, string> = {
  en: "EN",
  "pt-BR": "PT",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const handleChange = (newLocale: Locale) => {
    trackEvent(ANALYTICS_EVENTS.LANGUAGE_CHANGED, { language: newLocale });
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
      window.location.reload();
    });
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      {(Object.keys(localeNames) as Locale[]).map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          disabled={isPending}
          className={`px-3 py-2 min-h-[44px] rounded transition-colors active:scale-95 ${
            locale === loc
              ? "bg-brand/10 dark:bg-brand/20 text-brand dark:text-brand-light font-medium"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          } ${isPending ? "opacity-50 cursor-wait" : ""}`}
        >
          {localeNames[loc]}
        </button>
      ))}
    </div>
  );
}
