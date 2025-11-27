import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pochi Store - Handbags Mpya na za Mtumba',
  description: 'Nunua pochi mpya na za mtumba kwa bei nafuu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sw">
      <body className={`${montserrat.className} bg-white`}>
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top bar with icons */}
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-neutral-900">
                  Pochi Store
                </span>
              </Link>

              <div className="flex items-center space-x-6">
                <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                  <svg
                    className="w-6 h-6 text-neutral-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                  <svg
                    className="w-6 h-6 text-neutral-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
                <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative">
                  <svg
                    className="w-6 h-6 text-neutral-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                  <svg
                    className="w-6 h-6 text-neutral-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-8 h-12 overflow-x-auto">
              <Link
                href="/new-handbags"
                className="text-sm font-medium text-neutral-900 hover:text-primary-orange transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-primary-orange h-full flex items-center"
              >
                Pochi Mpya
              </Link>
              <Link
                href="/second-hand"
                className="text-sm font-medium text-neutral-900 hover:text-primary-orange transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-primary-orange h-full flex items-center"
              >
                Pochi za Mtumba
              </Link>
            </nav>
          </div>
        </header>
        <main className="min-h-screen bg-white">{children}</main>
        <footer className="bg-neutral-100 border-t border-neutral-200 mt-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center text-neutral-600">
              <p className="text-sm">
                © 2024 Pochi Store. Haki zote zimehifadhiwa.
              </p>
              <p className="text-xs mt-2">
                Nunua pochi mpya na za mtumba kwa bei nafuu
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}