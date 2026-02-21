import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { PricingPageTracker } from "@/components/ui/PricingPageTracker";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pricingPage");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("description"),
    },
  };
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default async function PricingPage() {
  const locale = await getLocale();
  const t = await getTranslations("pricingPage");
  const tTestimonials = await getTranslations("testimonials");
  const isBR = locale === "pt-BR";
  const proPrice = isBR ? "R$99" : "$19.99";
  const freePrice = isBR ? "R$0" : "$0";

  const freeFeatures = [
    { text: t("free.feature1"), included: true },
    { text: t("free.feature2"), included: true },
    { text: t("free.feature3"), included: true },
    { text: t("free.feature4"), included: true },
    { text: t("free.feature5"), included: true },
    { text: t("free.feature6"), included: false },
    { text: t("free.feature7"), included: false },
    { text: t("free.feature8"), included: false },
  ];

  const proFeatures = [
    t("pro.feature1"),
    t("pro.feature2"),
    t("pro.feature3"),
    t("pro.feature4"),
    t("pro.feature5"),
    t("pro.feature6"),
    t("pro.feature7"),
  ];

  const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13"] as const;
  const faqs = faqKeys.map((key) => ({
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`),
  }));

  return (
    <div className="min-h-screen">
      <PricingPageTracker />
      <Navbar showPricing={false} showGetPro={false} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {t("hero.titleStart")}
              <span className="text-brand dark:text-brand-light">
                {t("hero.titleHighlight")}
              </span>
              {t("hero.titleEnd")}
            </h1>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <FadeIn delay={200}>
              <div className="rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {t("free.name")}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {t("free.description")}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    {freePrice}
                  </span>
                  <span className="text-slate-500 ml-2">{t("free.priceLabel")}</span>
                </div>
                <Link
                  href="/"
                  className="block w-full text-center py-3 px-4 rounded-xl border border-slate-300 dark:border-navy-700 hover:border-slate-400 dark:hover:border-slate-500 font-medium transition-colors mb-8"
                >
                  {t("free.downloadButton")}
                </Link>
                <ul className="space-y-4">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {feature.included ? <CheckIcon /> : <XIcon />}
                      <span
                        className={
                          feature.included
                            ? "text-slate-700 dark:text-slate-300"
                            : "text-slate-400"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Pro Tier */}
            <FadeIn delay={300}>
              <div className="relative rounded-2xl border-2 border-brand bg-white dark:bg-navy-800 p-8">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-brand via-[#FF3645] to-brand-magenta text-white text-sm font-medium rounded-full">
                    {t("pro.badge")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {t("pro.name")}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {t("pro.description")}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    {proPrice}
                  </span>
                  <span className="text-slate-500 ml-2">{t("pro.priceLabel")}</span>
                </div>
                <CheckoutButton
                  locale={locale}
                  label={t("pro.checkoutButton")}
                  loadingLabel={t("pro.checkoutLoading")}
                  trustSecure={t("pro.trustSecure")}
                  trustGuarantee={t("pro.trustGuarantee")}
                  trustOneTime={t("pro.trustOneTime")}
                />
                <ul className="space-y-4">
                  {proFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckIcon />
                      <span className="text-slate-700 dark:text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
              {tTestimonials("subtitle")}
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            {(["t1", "t2", "t3"] as const).map((key, index) => (
              <FadeIn key={key} delay={index * 100}>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-brand" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mb-3">
                    &ldquo;{tTestimonials(`${key}.quote`)}&rdquo;
                  </p>
                  <p className="text-xs font-medium">{tTestimonials(`${key}.name`)} <span className="text-slate-400 font-normal">&mdash; {tTestimonials(`${key}.role`)}</span></p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-navy-800/50">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("faq.title")}
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="bg-white dark:bg-navy-800 rounded-xl p-6 border border-slate-200 dark:border-navy-700">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {faq.answer}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
