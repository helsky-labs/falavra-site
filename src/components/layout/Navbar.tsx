'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

interface NavbarProps {
  showPricing?: boolean
  showGetPro?: boolean
}

export function Navbar({ showPricing = true, showGetPro = true }: NavbarProps) {
  const t = useTranslations('nav')
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
            <Image
              src="/icon.png"
              alt="falavra"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-semibold text-lg">falavra</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-4">
            {showPricing && (
              <Link
                href="/pricing"
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                {t('pricing')}
              </Link>
            )}
            {showGetPro && (
              <Link
                href="/pricing"
                className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors active:scale-95"
              >
                {t('getPro')}
              </Link>
            )}
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
            aria-label={isOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-1">
            {showPricing && (
              <Link
                href="/pricing"
                onClick={closeMenu}
                className="flex items-center min-h-[44px] px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
              >
                {t('pricing')}
              </Link>
            )}
            <Link
              href="/support"
              onClick={closeMenu}
              className="flex items-center min-h-[44px] px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
            >
              {t('support')}
            </Link>
            {showGetPro && (
              <Link
                href="/pricing"
                onClick={closeMenu}
                className="flex items-center justify-center min-h-[44px] px-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium transition-colors active:scale-95"
              >
                {t('getPro')}
              </Link>
            )}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
