import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const BASE_URL = "https://falavra.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "falavra - Transcribe YouTube Videos Locally with AI",
    template: "%s | falavra",
  },
  description:
    "falavra is a desktop app that transcribes YouTube videos locally using Whisper AI (sherpa-onnx). 99+ languages, multiple export formats, batch processing. 100% private and offline. macOS & Windows.",
  keywords: [
    "youtube transcription",
    "video to text",
    "whisper ai transcription",
    "local transcription app",
    "youtube subtitles generator",
    "offline transcription",
    "private transcription",
    "whisper sherpa-onnx",
    "video transcription desktop",
    "youtube captions",
    "srt subtitle generator",
    "batch video transcription",
    "multilingual transcription",
    "macos transcription app",
    "windows transcription app",
  ],
  authors: [{ name: "Helsky Labs" }],
  creator: "Helsky Labs",
  publisher: "Helsky Labs",
  applicationName: "falavra",
  category: "Utilities",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "pt-BR": "/",
    },
  },
  openGraph: {
    title: "falavra - Transcribe YouTube Videos Locally with AI",
    description:
      "Desktop app for transcribing YouTube videos using Whisper AI. 99+ languages, SRT/VTT export, batch processing. 100% private and offline.",
    type: "website",
    locale: "en_US",
    alternateLocale: "pt_BR",
    url: BASE_URL,
    siteName: "falavra",
  },
  twitter: {
    card: "summary_large_image",
    title: "falavra - YouTube Video Transcription",
    description:
      "Desktop app for transcribing YouTube videos using Whisper AI. 99+ languages, batch processing. 100% private and offline. macOS & Windows.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd />
        <Script
          defer
          src="https://analytics.helsky-labs.com/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ""}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
