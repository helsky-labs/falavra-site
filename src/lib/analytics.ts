declare global {
  interface Window {
    umami?: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(eventName, properties);
  }
}

export const ANALYTICS_EVENTS = {
  // Downloads
  DOWNLOAD_CLICKED: "download_clicked",

  // Payments
  CHECKOUT_INITIATED: "checkout_initiated",
  PURCHASE_COMPLETED: "purchase_completed",

  // Language
  LANGUAGE_CHANGED: "language_changed",

  // Conversion Funnel
  PRICING_PAGE_VIEWED: "pricing_page_viewed",
  NEWSLETTER_SUBSCRIBED: "newsletter_subscribed",

  // Content & Interactions
  RESTORE_SUBMITTED: "restore_submitted",
  THEME_CHANGED: "theme_changed",
  OUTBOUND_LINK: "outbound_link",
} as const;

export function getAttributionData(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const data: Record<string, string> = {};

  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) data[key] = value;
  }

  if (document.referrer) {
    try {
      const ref = new URL(document.referrer);
      data.referrer = ref.hostname;
    } catch {
      data.referrer = document.referrer;
    }
  }

  return data;
}
