"use client";

import { useEffect } from "react";
import { trackEvent, ANALYTICS_EVENTS, getAttributionData } from "@/lib/analytics";

export function PricingPageTracker() {
  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.PRICING_PAGE_VIEWED, {
      ...getAttributionData(),
    });
  }, []);

  return null;
}
