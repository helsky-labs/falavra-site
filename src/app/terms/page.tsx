import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for falavra, the desktop app for transcribing YouTube videos with local AI.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showPricing showGetPro={false} />

      <main className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Terms of Service
          </h1>
          <p className="text-slate-500 mb-8">Last updated: February 2026</p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-slate-600 dark:text-slate-400">
                These Terms of Service (&quot;Terms&quot;) govern your use of
                falavra (&quot;the App&quot;), a desktop application for
                transcribing YouTube videos using on-device AI. By downloading,
                installing, or using falavra, you agree to be bound by these
                Terms. If you do not agree, do not use the App.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. License Grant</h2>
              <p className="text-slate-600 dark:text-slate-400">
                falavra is available in two tiers: a free tier and a paid Pro
                tier. Upon purchase of a Pro license, you are granted a
                personal, non-exclusive, non-transferable, revocable license to
                use the Pro features of falavra on up to three (3) devices
                that you own or control. This license is valid for the current
                major version of the App (v1.x).
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-3">
                The free tier provides limited functionality, including a daily
                transcription cap and a maximum video duration. The Pro
                tier unlocks unlimited transcriptions, longer videos, and
                access to all available Whisper AI models.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Free Tier and Pro Tier</h2>
              <p className="text-slate-600 dark:text-slate-400">
                The free tier of falavra is provided at no cost and includes
                basic transcription capabilities with usage limits. These limits
                may be adjusted at our discretion. The Pro tier requires a
                one-time purchase and removes usage restrictions for the current
                major version.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-3">
                Future major versions (e.g., v2.0) may require a separate
                purchase or upgrade fee. Minor updates and bug fixes within the
                same major version are included at no additional cost.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Payment Terms</h2>
              <p className="text-slate-600 dark:text-slate-400">
                The Pro license is a one-time purchase processed securely
                through Stripe. Pricing may vary by region and currency. The
                price displayed at the time of purchase is the final price you
                will be charged. We do not store your payment information on our
                servers; all payment processing is handled by Stripe.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Refund Policy</h2>
              <p className="text-slate-600 dark:text-slate-400">
                We offer a 14-day money-back guarantee from the date of
                purchase. If you are not satisfied with falavra Pro for any
                reason, you may request a full refund by contacting us at{" "}
                <a href="mailto:support@falavra.com" className="text-brand dark:text-brand-light hover:underline">
                  support@falavra.com
                </a>{" "}
                within 14 days of your purchase. Refunds are processed through
                Stripe and typically appear within 5-10 business days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
              <p className="text-slate-600 dark:text-slate-400">
                falavra is proprietary software. All rights, title, and interest
                in and to the App, including its code, design, graphics, logos,
                and documentation, are owned by the developer. You may not copy,
                modify, distribute, sell, reverse engineer, decompile, or
                disassemble the App except as permitted by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. User Responsibilities</h2>
              <p className="text-slate-600 dark:text-slate-400">
                You agree to use falavra in compliance with all applicable laws.
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-600 dark:text-slate-400">
                <li>Ensuring you have the right to transcribe any videos you process.</li>
                <li>Maintaining the confidentiality of your license key.</li>
                <li>Using the App only on devices you own or have authorization to use.</li>
                <li>Not attempting to circumvent any license restrictions or usage limits.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Disclaimer of Warranties</h2>
              <p className="text-slate-600 dark:text-slate-400">
                falavra is provided &quot;as is&quot; and &quot;as available&quot;
                without warranties of any kind. We do not warrant that the App
                will be error-free or that transcription results will be
                accurate. Transcription quality depends on audio quality, the
                selected AI model, and other factors beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
              <p className="text-slate-600 dark:text-slate-400">
                To the maximum extent permitted by law, the developer shall not
                be liable for any indirect, incidental, special, or
                consequential damages resulting from your use of the App. Our
                total liability shall not exceed the amount you paid for the Pro
                license.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Termination</h2>
              <p className="text-slate-600 dark:text-slate-400">
                We reserve the right to revoke your license if you violate these
                Terms, including sharing license keys or attempting to reverse
                engineer the App. Upon termination, you must cease all use and
                delete any copies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Changes to Terms</h2>
              <p className="text-slate-600 dark:text-slate-400">
                We may update these Terms from time to time. When we make
                material changes, we will update the &quot;Last updated&quot;
                date. Your continued use of falavra after changes constitutes
                acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">12. Contact</h2>
              <p className="text-slate-600 dark:text-slate-400">
                If you have questions about these Terms, contact us at{" "}
                <a href="mailto:support@falavra.com" className="text-brand dark:text-brand-light hover:underline">
                  support@falavra.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
