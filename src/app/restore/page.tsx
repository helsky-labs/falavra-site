"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RestorePage() {
  const t = useTranslations("restorePage");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      trackEvent(ANALYTICS_EVENTS.RESTORE_SUBMITTED);
      setSubmitted(true);
    } catch {
      setError(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showPricing showGetPro={false} />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">{t("success.title")}</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">{t("success.text")}</p>
              <Link href="/" className="text-brand dark:text-brand-light hover:underline">
                {t("success.backHome")}
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-center">
                {t("title")}
              </h1>
              <p className="text-slate-500 text-center mb-8">{t("subtitle")}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t("emailLabel")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-shadow"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-brand via-[#FF3645] to-brand-magenta hover:opacity-90 disabled:opacity-50 text-white font-semibold transition-colors"
                >
                  {isSubmitting ? t("submitting") : t("submit")}
                </button>
              </form>

              <p className="text-xs text-slate-400 text-center mt-6">{t("hint")}</p>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
