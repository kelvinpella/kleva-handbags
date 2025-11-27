import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <div className="grid lg:grid-cols-2 gap-4 mt-4 min-h-[calc(100vh-8rem)]">
        {/* New Handbags Section */}
        <Link
          href="/new"
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
            <h2 className="text-2xl md:text-5xl flex flex-col items-center justify-center gap-4 font-bold text-neutral-900 mb-4">
              <span>New Handbags</span>
              <span className="italic text-xl font-normal">(Pochi Mpya)</span>
            </h2>
            <div className="mt-6 inline-flex items-center space-x-4 bg-neutral-900 text-white px-8 py-4 rounded font-medium text-base group-hover:bg-neutral-800 transition-colors duration-300">
              <div className="flex flex-col items-center justify-center gap-2">
                <span>View New Handbags</span>
                <span className="italic text-sm font-normal">(Tizama Pochi Mpya)</span>
              </div>
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
            </div>
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
            <h2 className="text-2xl md:text-5xl flex flex-col items-center justify-center gap-4 font-bold text-neutral-900 mb-4">
              <span>Second-Hand</span>
              <span className="italic text-xl font-normal">(Pochi za Mtumba)</span>
            </h2>
            <div className="mt-6 inline-flex items-center space-x-4 bg-neutral-900 text-white px-8 py-4 rounded font-medium text-base group-hover:bg-neutral-800 transition-colors duration-300">
              <div className="flex flex-col items-center justify-center gap-2">
                <span>View Second-Hand</span>
                <span className="italic text-sm font-normal">(Tizama Pochi Za Mtumba)</span>
              </div>
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
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
