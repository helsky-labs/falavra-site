"use client";

import { useState } from "react";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

interface NewsletterFormProps {
  locale: string;
  placeholder: string;
  buttonLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessage: string;
}

export function NewsletterForm({
  locale,
  placeholder,
  buttonLabel,
  submittingLabel,
  successMessage,
  errorMessage,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "submitting") return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        trackEvent(ANALYTICS_EVENTS.NEWSLETTER_SUBSCRIBED, { locale });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>{successMessage}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder={placeholder}
        required
        className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-brand-light"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand via-[#FF3645] to-brand-magenta hover:opacity-90 disabled:opacity-50 text-white font-medium text-sm transition-all whitespace-nowrap"
      >
        {status === "submitting" ? submittingLabel : buttonLabel}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-500 sm:col-span-2">{errorMessage}</p>
      )}
    </form>
  );
}
