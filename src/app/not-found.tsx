import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/icon.png" alt="falavra" width={32} height={32} className="rounded-lg" />
              <span className="font-semibold text-lg">falavra</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Image src="/icon.png" alt="falavra" width={80} height={80} className="rounded-2xl mx-auto mb-8" />
          <h1 className="text-6xl font-bold tracking-tight mb-4">404</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Page not found</p>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors"
          >
            Go home
          </Link>
        </div>
      </main>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} falavra. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
