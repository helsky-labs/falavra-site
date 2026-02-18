"use client";

import { trackEvent, ANALYTICS_EVENTS, getAttributionData } from "@/lib/analytics";
import { CURRENT_VERSION, DOWNLOAD_DMG } from "@/lib/version";

export function DownloadLink({
  className,
  children,
  location = "hero",
}: {
  className?: string;
  children: React.ReactNode;
  location?: string;
}) {
  return (
    <a
      href={DOWNLOAD_DMG}
      className={className}
      onClick={() =>
        trackEvent(ANALYTICS_EVENTS.DOWNLOAD_CLICKED, {
          version: CURRENT_VERSION,
          location,
          ...getAttributionData(),
        })
      }
    >
      {children}
    </a>
  );
}
