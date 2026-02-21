'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-navy-700">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/icon.png"
            alt="falavra"
            width={24}
            height={24}
            className="rounded-md"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            {t('builtBy')}{' '}
            <a
              href="https://helsky-labs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand dark:text-brand-light hover:underline"
            >
              <Image
                src="/helsky-mark-dark.png"
                alt=""
                width={16}
                height={16}
                className="dark:hidden"
              />
              <Image
                src="/helsky-mark-white.png"
                alt=""
                width={16}
                height={16}
                className="hidden dark:inline-block"
              />
              Helsky Labs
            </a>
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
          <Link
            href="/pricing"
            className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            {t('pricing')}
          </Link>
          <Link
            href="/privacy"
            className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            {t('privacy')}
          </Link>
          <Link
            href="/terms"
            className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            {t('terms')}
          </Link>
          <Link
            href="/support"
            className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            {t('support')}
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-4 text-center sm:text-left">
        <span className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} falavra. {t('copyright')}
        </span>
      </div>
    </footer>
  )
}
