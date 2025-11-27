import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
          Ukurasa haujapatikana
        </h2>
        <p className="text-neutral-600 mb-8">
          Samahani, ukurasa unaoutafuta haupo.
        </p>
        <Link
          href="/"
          className="inline-block bg-neutral-900 text-white px-6 py-3 font-medium hover:bg-neutral-800 transition-colors"
        >
          Rudi Nyumbani
        </Link>
      </div>
    </div>
  );
}