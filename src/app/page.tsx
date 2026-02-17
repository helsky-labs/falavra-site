import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { FadeIn } from "@/components/ui/FadeIn";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DownloadLink } from "@/components/ui/DownloadLink";
import { CURRENT_VERSION } from "@/lib/version";

function FeatureIcon({ icon }: { icon: string }) {
  const iconClasses = "w-6 h-6";

  switch (icon) {
    case "brain":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case "globe":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "export":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "search":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    case "queue":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      );
    case "models":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    case "lock":
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    default:
      return null;
  }
}

export default async function LandingPage() {
  const locale = await getLocale();
  const t = await getTranslations();

  const features = [
    { icon: "brain", title: t("features.items.localAI.title"), description: t("features.items.localAI.description"), popular: true, isNew: false, pro: false },
    { icon: "globe", title: t("features.items.languages.title"), description: t("features.items.languages.description"), popular: false, isNew: false, pro: false },
    { icon: "youtube", title: t("features.items.youtube.title"), description: t("features.items.youtube.description"), popular: true, isNew: false, pro: false },
    { icon: "export", title: t("features.items.exports.title"), description: t("features.items.exports.description"), popular: false, isNew: false, pro: false },
    { icon: "search", title: t("features.items.search.title"), description: t("features.items.search.description"), popular: false, isNew: true, pro: false },
    { icon: "queue", title: t("features.items.queue.title"), description: t("features.items.queue.description"), popular: false, isNew: true, pro: false },
    { icon: "models", title: t("features.items.models.title"), description: t("features.items.models.description"), popular: false, isNew: false, pro: true },
    { icon: "lock", title: t("features.items.privacy.title"), description: t("features.items.privacy.description"), popular: false, isNew: false, pro: false },
  ];

  const steps = [
    { number: 1, title: t("howItWorks.steps.paste.title"), description: t("howItWorks.steps.paste.description") },
    { number: 2, title: t("howItWorks.steps.choose.title"), description: t("howItWorks.steps.choose.description") },
    { number: 3, title: t("howItWorks.steps.get.title"), description: t("howItWorks.steps.get.description") },
  ];

  return (
    <div className="min-h-screen">
      <Navbar showPricing showGetPro />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              {t("hero.badge")} - v{CURRENT_VERSION}
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {t("hero.title")}{" "}
              <span className="text-amber-600 dark:text-amber-400">
                {t("hero.titleHighlight")}
              </span>{" "}
              {t("hero.titleEnd")}
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              {t("hero.description")}
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <DownloadLink
                href="#download"
                location="hero"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-amber-500/25"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t("hero.downloadButton")}
              </DownloadLink>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border-2 border-amber-300 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-600 text-amber-600 dark:text-amber-400 font-medium transition-colors"
              >
                {t("hero.proButton")}
              </Link>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {t("hero.proHint")}
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
              {t("hero.requirements")} &middot; {t("hero.requirementsWindows")}
            </p>
          </FadeIn>
        </div>

        {/* App Preview */}
        <FadeIn delay={500} className="mt-16 max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <Image
              src="/screenshots/main.png"
              alt={t("preview.mainAlt")}
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />
          </div>
        </FadeIn>

        {/* Screenshot Gallery */}
        <FadeIn delay={600} className="mt-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {([
              { src: "/screenshots/in-progress.png", alt: t("preview.progressAlt"), caption: t("preview.captionProgress") },
              { src: "/screenshots/library.png", alt: t("preview.libraryAlt"), caption: t("preview.captionLibrary") },
              { src: "/screenshots/transcript.png", alt: t("preview.transcriptAlt"), caption: t("preview.captionTranscript") },
              { src: "/screenshots/settings.png", alt: t("preview.settingsAlt"), caption: t("preview.captionSettings") },
            ] as const).map((shot) => (
              <div key={shot.src} className="group">
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md transition-all group-hover:shadow-xl group-hover:scale-[1.02]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={960}
                    height={540}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                  {shot.caption}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              {t("features.title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              {t("features.description")}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} delay={index * 100}>
                <div
                  className={`relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border transition-all hover:shadow-lg hover:scale-[1.02] ${
                    feature.pro
                      ? "border-amber-200 dark:border-amber-800"
                      : feature.isNew
                      ? "border-green-200 dark:border-green-800"
                      : feature.popular
                      ? "border-amber-200 dark:border-amber-800"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {feature.pro ? (
                    <span className="absolute -top-3 right-4 px-3 py-1 text-xs font-medium bg-amber-500 text-white rounded-full">
                      {t("features.pro")}
                    </span>
                  ) : feature.isNew ? (
                    <span className="absolute -top-3 right-4 px-3 py-1 text-xs font-medium bg-green-600 text-white rounded-full">
                      {t("features.new")}
                    </span>
                  ) : feature.popular ? (
                    <span className="absolute -top-3 right-4 px-3 py-1 text-xs font-medium bg-amber-600 text-white rounded-full">
                      {t("features.popular")}
                    </span>
                  ) : null}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    feature.pro
                      ? "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400"
                      : feature.isNew
                      ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
                      : "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400"
                  }`}>
                    <FeatureIcon icon={feature.icon} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              {t("howItWorks.title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12">
              {t("howItWorks.description")}
            </p>
          </FadeIn>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <FadeIn key={step.number} delay={index * 150}>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-600 text-white font-bold text-xl flex items-center justify-center">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why falavra Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              {t("comparison.title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              {t("comparison.subtitle")}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {(["privacyFirst", "oneTimePrice", "youtubeOptimized", "offlineCapable"] as const).map((key, index) => (
              <FadeIn key={key} delay={index * 100}>
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                  <h3 className="font-semibold text-lg mb-4">
                    {t(`comparison.${key}.title`)}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                          {t("comparison.falavraLabel")}
                        </span>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5">
                          {t(`comparison.${key}.falavra`)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                          {t("comparison.othersLabel")}
                        </span>
                        <p className="text-sm text-slate-500 mt-0.5">
                          {t(`comparison.${key}.others`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="mt-12 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium">
                {t("comparison.ctaText")}
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-all hover:scale-105 shadow-lg shadow-amber-500/25"
              >
                {t("comparison.ctaButton")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("privacy.title")}
            </h2>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              {t("privacy.description")}
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {["noInternet", "noAccount", "localProcessing"].map((key) => (
                <div key={key} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t(`privacy.${key}`)}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              {t("testimonials.title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              {t("testimonials.subtitle")}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {(["t1", "t2", "t3"] as const).map((key, index) => (
              <FadeIn key={key} delay={index * 100}>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm flex-1 mb-4">
                    &ldquo;{t(`testimonials.${key}.quote`)}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 font-semibold text-sm">
                      {t(`testimonials.${key}.initials`)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{t(`testimonials.${key}.name`)}</p>
                      <p className="text-xs text-slate-500">{t(`testimonials.${key}.role`)}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Pricing Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              {t("homePricing.title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              {t("homePricing.subtitle")}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Tier */}
            <FadeIn delay={100}>
              <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-full flex flex-col">
                <h3 className="font-semibold text-xl mb-2">{t("homePricing.free.name")}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{t("homePricing.free.price")}</span>
                  <span className="text-slate-500 ml-2">{t("homePricing.free.priceLabel")}</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {(["feature1", "feature2", "feature3"] as const).map((key) => (
                    <li key={key} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t(`homePricing.free.${key}`)}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href="#download"
                    className="block w-full text-center py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 font-semibold transition-colors"
                  >
                    {t("cta.downloadButton")}
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Pro Tier */}
            <FadeIn delay={200}>
              <div className="relative p-8 rounded-2xl border-2 border-amber-500 bg-slate-50 dark:bg-slate-800 h-full flex flex-col">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold bg-amber-600 text-white rounded-full">
                  {t("homePricing.pro.badge")}
                </span>
                <h3 className="font-semibold text-xl mb-2">{t("homePricing.pro.name")}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{t("homePricing.pro.price")}</span>
                  <span className="text-slate-500 ml-2">{t("homePricing.pro.priceLabel")}</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {(["feature1", "feature2", "feature3"] as const).map((key) => (
                    <li key={key} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t(`homePricing.pro.${key}`)}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <CheckoutButton
                    locale={locale}
                    label={t("pricingPage.pro.checkoutButton")}
                    loadingLabel={t("pricingPage.pro.checkoutLoading")}
                    trustSecure={t("pricingPage.pro.trustSecure")}
                    trustGuarantee={t("pricingPage.pro.trustGuarantee")}
                    trustOneTime={t("pricingPage.pro.trustOneTime")}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              {t("cta.description")}
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-amber-500/25"
              >
                {t("cta.proButton")}
              </Link>
              <DownloadLink
                href="#download"
                location="cta"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t("cta.downloadButton")}
              </DownloadLink>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 text-sm text-slate-500">
              v{CURRENT_VERSION} &middot; {t("cta.version")} &middot; {t("cta.versionWindows")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">{t("newsletter.title")}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              {t("newsletter.description")}
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="flex justify-center">
              <NewsletterForm
                locale={locale}
                placeholder={t("newsletter.placeholder")}
                buttonLabel={t("newsletter.button")}
                submittingLabel={t("newsletter.submitting")}
                successMessage={t("newsletter.success")}
                errorMessage={t("newsletter.error")}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
