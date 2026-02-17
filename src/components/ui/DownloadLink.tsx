"use client";

import { trackEvent, ANALYTICS_EVENTS, getAttributionData } from "@/lib/analytics";
import { CURRENT_VERSION } from "@/lib/version";

export function DownloadLink({
  href,
  className,
  children,
  location = "hero",
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  location?: string;
}) {
  return (
    <a
      href={href}
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
