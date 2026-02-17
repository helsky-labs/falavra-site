import { CURRENT_VERSION } from "@/lib/version";

export function JsonLd() {
  const baseUrl = "https://falavra.com";

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "falavra",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "macOS, Windows",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        name: "Free",
      },
      {
        "@type": "Offer",
        price: "19.99",
        priceCurrency: "USD",
        name: "Pro",
      },
      {
        "@type": "Offer",
        price: "99.00",
        priceCurrency: "BRL",
        name: "Pro",
      },
    ],
    description:
      "Desktop app for transcribing YouTube videos locally using Whisper AI (sherpa-onnx). Supports 99+ languages, multiple export formats, batch processing, and full-text search. 100% private and offline.",
    softwareVersion: CURRENT_VERSION,
    downloadUrl: baseUrl,
    screenshot: `${baseUrl}/icon.png`,
    author: {
      "@type": "Organization",
      name: "Helsky Labs",
      url: "https://helsky-labs.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Helsky Labs",
      url: "https://helsky-labs.com",
    },
    featureList: [
      "Local Whisper AI transcription (sherpa-onnx)",
      "99+ language support",
      "YouTube URL integration",
      "Export to Markdown, TXT, SRT, VTT",
      "Full-text search across all transcriptions",
      "Batch job queue for multiple videos",
      "Multiple Whisper model sizes (tiny to large-v3)",
      "100% offline and private",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "falavra",
    url: baseUrl,
    description:
      "falavra is a desktop app that transcribes YouTube videos locally using Whisper AI.",
    publisher: {
      "@type": "Organization",
      name: "Helsky Labs",
      url: "https://helsky-labs.com",
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Helsky Labs",
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
