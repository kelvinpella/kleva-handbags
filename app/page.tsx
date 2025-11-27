import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <div className="grid md:grid-cols-2 min-h-[calc(100vh-8rem)]">
        {/* New Handbags Section */}
        <Link
          href="/new-handbags"
          className="relative group overflow-hidden flex items-center justify-center bg-neutral-50 hover:bg-neutral-100 transition-all duration-300"
        >
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <Image
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200"
              alt="New Handbags"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="relative text-center p-12 z-10">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <svg
                  className="w-12 h-12 text-neutral-900"
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
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Pochi Mpya
            </h2>
            <p className="text-base text-neutral-700 mb-8 max-w-md mx-auto">
              Tazama mkusanyiko wetu wa pochi mpya za kisasa
            </p>
            <span className="inline-flex items-center space-x-2 bg-neutral-900 text-white px-8 py-4 rounded font-medium text-base group-hover:bg-neutral-800 transition-colors duration-300">
              <span>Tizama Pochi Mpya</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </Link>

        {/* Second Hand Handbags Section */}
        <Link
          href="/second-hand"
          className="relative group overflow-hidden flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 transition-all duration-300"
        >
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <Image
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200"
              alt="Second Hand Handbags"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="relative text-center p-12 z-10">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <svg
                  className="w-12 h-12 text-neutral-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Pochi za Mtumba
            </h2>
            <p className="text-base text-neutral-700 mb-8 max-w-md mx-auto">
              Pata pochi za mtumba zenye ubora wa hali ya juu
            </p>
            <span className="inline-flex items-center space-x-2 bg-neutral-900 text-white px-8 py-4 rounded font-medium text-base group-hover:bg-neutral-800 transition-colors duration-300">
              <span>Tizama Pochi za Mtumba</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}