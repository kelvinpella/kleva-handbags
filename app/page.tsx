import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="grid md:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* New Handbags Section */}
        <Link
          href="/new-handbags"
          className="relative group overflow-hidden flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-500"
        >
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
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
              <svg
                className="w-24 h-24 mx-auto text-orange-600 group-hover:scale-110 transition-transform duration-500"
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pochi Mpya
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
              Tazama mkusanyiko wetu wa pochi mpya za kisasa
            </p>
            <span className="inline-block bg-orange-600 text-white px-8 py-4 rounded-sm font-semibold text-lg group-hover:bg-orange-700 transition-colors duration-300">
              Tizama Pochi Mpya →
            </span>
          </div>
        </Link>

        {/* Second Hand Handbags Section */}
        <Link
          href="/second-hand"
          className="relative group overflow-hidden flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 transition-all duration-500"
        >
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
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
              <svg
                className="w-24 h-24 mx-auto text-amber-700 group-hover:scale-110 transition-transform duration-500"
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pochi za Mtumba
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
              Pata pochi za mtumba zenye ubora wa hali ya juu
            </p>
            <span className="inline-block bg-amber-700 text-white px-8 py-4 rounded-sm font-semibold text-lg group-hover:bg-amber-800 transition-colors duration-300">
              Tizama Pochi za Mtumba →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}