"use client";

import { useEffect } from "react";
import { trackEvent, ANALYTICS_EVENTS, getAttributionData } from "@/lib/analytics";

export function PurchaseTracker() {
  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.PURCHASE_COMPLETED, {
      ...getAttributionData(),
    });
  }, []);

  return null;
}
