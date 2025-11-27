import Link from 'next/link';

export default function ProductNotFound() {
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
          Pochi haipo
        </h2>
        <p className="text-neutral-600 mb-8">
          Samahani, pochi unayoitafuta haipo. Huenda imeuzwa tayari au link si sahihi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/new-handbags"
            className="inline-block bg-neutral-900 text-white px-6 py-3 font-medium hover:bg-neutral-800 transition-colors"
          >
            Angalia Pochi Mpya
          </Link>
          <Link
            href="/second-hand"
            className="inline-block border border-neutral-300 text-neutral-900 px-6 py-3 font-medium hover:bg-neutral-50 transition-colors"
          >
            Angalia Pochi za Mtumba
          </Link>
        </div>
      </div>
    </div>
  );
}
