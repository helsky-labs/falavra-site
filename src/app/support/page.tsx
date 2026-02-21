import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("supportPage");
  return {
    title: t("title"),
    description: t("description"),
  };
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-4 rounded-lg bg-white dark:bg-navy-800/50 border border-slate-200 dark:border-navy-700">
      <h4 className="font-medium mb-2">{question}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400">{answer}</p>
    </div>
  );
}

export default async function SupportPage() {
  const t = await getTranslations("supportPage");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showPricing showGetPro />

      <main className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            {t("title")}
          </h1>
          <p className="text-slate-500 mb-12">{t("subtitle")}</p>

          {/* Contact */}
          <section className="mb-12">
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="mailto:support@falavra.com"
                className="flex items-start gap-4 p-6 rounded-xl border border-slate-200 dark:border-navy-700 hover:border-brand/30 dark:hover:border-brand/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand dark:text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("contact.email.title")}</h3>
                  <p className="text-sm text-slate-500">support@falavra.com</p>
                </div>
              </a>

              <a
                href="mailto:support@falavra.com?subject=Bug%20Report"
                className="flex items-start gap-4 p-6 rounded-xl border border-slate-200 dark:border-navy-700 hover:border-brand/30 dark:hover:border-brand/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-brand/10 dark:bg-brand/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand dark:text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("contact.github.title")}</h3>
                  <p className="text-sm text-slate-500">{t("contact.github.description")}</p>
                </div>
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("faq.title")}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-brand dark:text-brand-light">{t("faq.common.title")}</h3>
                <div className="space-y-4">
                  <FaqItem question={t("faq.common.modelDownload.q")} answer={t("faq.common.modelDownload.a")} />
                  <FaqItem question={t("faq.common.accuracy.q")} answer={t("faq.common.accuracy.a")} />
                  <FaqItem question={t("faq.common.formats.q")} answer={t("faq.common.formats.a")} />
                  <FaqItem question={t("faq.common.offline.q")} answer={t("faq.common.offline.a")} />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-brand dark:text-brand-light">{t("faq.license.title")}</h3>
                <div className="space-y-4">
                  <FaqItem question={t("faq.license.free.q")} answer={t("faq.license.free.a")} />
                  <FaqItem question={t("faq.license.activate.q")} answer={t("faq.license.activate.a")} />
                  <FaqItem question={t("faq.license.machines.q")} answer={t("faq.license.machines.a")} />
                  <FaqItem question={t("faq.license.lost.q")} answer={t("faq.license.lost.a")} />
                  <FaqItem question={t("faq.license.upgrade.q")} answer={t("faq.license.upgrade.a")} />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-brand dark:text-brand-light">{t("faq.technical.title")}</h3>
                <div className="space-y-4">
                  <FaqItem question={t("faq.technical.requirements.q")} answer={t("faq.technical.requirements.a")} />
                  <FaqItem question={t("faq.technical.storage.q")} answer={t("faq.technical.storage.a")} />
                  <FaqItem question={t("faq.technical.privacy.q")} answer={t("faq.technical.privacy.a")} />
                  <FaqItem question={t("faq.technical.youtube.q")} answer={t("faq.technical.youtube.a")} />
                </div>
              </div>
            </div>
          </section>

          {/* Restore License */}
          <section className="p-6 rounded-xl bg-slate-100 dark:bg-navy-800">
            <h2 className="text-lg font-semibold mb-2">{t("restore.title")}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{t("restore.text")}</p>
            <Link
              href="/restore"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-brand via-[#FF3645] to-brand-magenta hover:opacity-90 text-white font-medium text-sm transition-colors"
            >
              {t("restore.button")}
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
