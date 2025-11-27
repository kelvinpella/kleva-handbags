import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm w-full">
      <div className="w-full flex items-center justify-between gap-2 lg:max-w-7xl mx-auto px-4 py-4 lg:px-8">
        <div>
          <Link href="/" className="md:text-lg font-bold text-neutral-900">
            Kleva
          </Link>
        </div>
        <nav className="flex items-center gap-6 md:gap-8">
          <Link
            href="/new"
            className="text-sm pb-0.5 font-semibold text-neutral-900  transition-colors border-b-2 border-transparent hover:border-black flex flex-col items-center justify-center gap-1"
          >
            <span>New</span>
            <span className="italic text-xs font-normal">(Mpya)</span>
          </Link>
          <Link
            href="/second-hand"
            className="text-sm pb-0.5 font-semibold text-neutral-900 transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-black flex flex-col items-center justify-center gap-1"
          >
            <span>Second-Hand</span>
            <span className="italic text-xs font-normal">(Mtumba)</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
