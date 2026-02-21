import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacyPage");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacyPage");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showPricing showGetPro={false} />

      <main className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            {t("title")}
          </h1>
          <p className="text-slate-500 mb-8">{t("lastUpdated")}</p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">{t("overview.title")}</h2>
              <p className="text-slate-600 dark:text-slate-400">{t("overview.text")}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("audioProcessing.title")}</h2>
              <p className="text-slate-600 dark:text-slate-400">{t("audioProcessing.text")}</p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600 dark:text-slate-400">
                <li>{t("audioProcessing.items.noUpload")}</li>
                <li>{t("audioProcessing.items.noStorage")}</li>
                <li>{t("audioProcessing.items.noAccess")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("dataCollected.title")}</h2>
              <h3 className="text-lg font-medium mt-4 mb-2">{t("dataCollected.purchase.title")}</h3>
              <p className="text-slate-600 dark:text-slate-400">{t("dataCollected.purchase.text")}</p>
              <h3 className="text-lg font-medium mt-4 mb-2">{t("dataCollected.license.title")}</h3>
              <p className="text-slate-600 dark:text-slate-400">{t("dataCollected.license.text")}</p>
              <h3 className="text-lg font-medium mt-4 mb-2">{t("dataCollected.telemetry.title")}</h3>
              <p className="text-slate-600 dark:text-slate-400">{t("dataCollected.telemetry.text")}</p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600 dark:text-slate-400">
                <li>{t("dataCollected.telemetry.items.events")}</li>
                <li>{t("dataCollected.telemetry.items.noPersonal")}</li>
                <li>{t("dataCollected.telemetry.items.optOut")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("thirdParties.title")}</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                <li><strong>Stripe</strong> &mdash; {t("thirdParties.stripe")}</li>
                <li><strong>Resend</strong> &mdash; {t("thirdParties.resend")}</li>
                <li><strong>Supabase</strong> &mdash; {t("thirdParties.supabase")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("noTracking.title")}</h2>
              <p className="text-slate-600 dark:text-slate-400">{t("noTracking.text")}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("retention.title")}</h2>
              <p className="text-slate-600 dark:text-slate-400">{t("retention.text")}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">{t("contact.title")}</h2>
              <p className="text-slate-600 dark:text-slate-400">
                {t("contact.text")}{" "}
                <a href="mailto:support@falavra.com" className="text-brand dark:text-brand-light hover:underline">
                  support@falavra.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
