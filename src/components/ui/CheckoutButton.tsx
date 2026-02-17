"use client";

import { useState } from "react";
import { trackEvent, ANALYTICS_EVENTS, getAttributionData } from "@/lib/analytics";

interface CheckoutButtonProps {
  locale?: string;
  label?: string;
  loadingLabel?: string;
  trustSecure?: string;
  trustGuarantee?: string;
  trustOneTime?: string;
}

export function CheckoutButton({ locale, label, loadingLabel, trustSecure, trustGuarantee, trustOneTime }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    trackEvent(ANALYTICS_EVENTS.CHECKOUT_INITIATED, { locale, ...getAttributionData() });

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locale }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Failed to create checkout session");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="block w-full text-center py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold transition-colors"
      >
        {loading ? (loadingLabel || "Loading...") : (label || "Get Pro License")}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
      )}
      {(trustSecure || trustGuarantee || trustOneTime) && (
        <div className="mt-3 flex flex-col gap-1.5">
          {trustSecure && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>{trustSecure}</span>
            </div>
          )}
          {trustGuarantee && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{trustGuarantee}</span>
            </div>
          )}
          {trustOneTime && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{trustOneTime}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
