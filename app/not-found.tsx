import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Ukurasa haujapatikana
        </h2>
        <p className="text-gray-600 mb-8">
          Samahani, ukurasa unaoutafuta haupo.
        </p>
        <Link
          href="/"
          className="inline-block bg-orange-600 text-white px-6 py-3 rounded-sm font-medium hover:bg-orange-700 transition-colors"
        >
          Rudi Nyumbani
        </Link>
      </div>
    </div>
  );
}