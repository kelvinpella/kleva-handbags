import Link from 'next/link';

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-white">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-red-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Sign In Failed</h1>
        <h2 className="text-lg font-semibold text-neutral-700 mb-4">
          Authentication Error
        </h2>
        <p className="text-neutral-600 mb-8">
          There was an issue signing you in. This could be due to an invalid or expired authentication code. Please try signing in again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="inline-block bg-neutral-900 text-white px-6 py-3 font-medium hover:bg-neutral-800 transition-colors"
          >
            Try Signing In Again
          </Link>
          <Link
            href="/"
            className="inline-block border border-neutral-300 text-neutral-900 px-6 py-3 font-medium hover:bg-neutral-50 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
