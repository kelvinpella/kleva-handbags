import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-white">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-neutral-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-600 mb-8">
          Sorry, the page you're looking for doesn't exist. The link might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-neutral-900 text-white px-6 py-3 font-medium hover:bg-neutral-800 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/new"
            className="inline-block border border-neutral-300 text-neutral-900 px-6 py-3 font-medium hover:bg-neutral-50 transition-colors"
          >
            View New Handbags
          </Link>
        </div>
      </div>
    </div>
  );
}