import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

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
      <body className={`${montserrat.variable} ${montserrat.className} bg-gray-50 font-sans`}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors">
                Pochi Store
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/new-handbags"
                  className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Pochi Mpya
                </Link>
                <Link
                  href="/second-hand"
                  className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Pochi za Mtumba
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center text-gray-600">
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