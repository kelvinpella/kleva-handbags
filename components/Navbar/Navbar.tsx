"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm w-full">
      <div className="w-full flex items-center justify-between gap-2 lg:max-w-7xl mx-auto px-4 py-4 lg:px-8">
        <div>
          <Link href="/" className="md:text-lg font-bold text-neutral-900">
            Kleva
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 md:gap-8">
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

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 rounded"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-neutral-900 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-neutral-900 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-neutral-900 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-lg font-bold text-neutral-900"
            >
              Kleva
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 rounded"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-neutral-900"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-4 p-4 flex-1">
            <Link
              href="/new"
              onClick={closeMenu}
              className="text-sm py-3 font-semibold text-neutral-900 transition-colors border-b-2 border-transparent hover:border-black flex flex-col items-start gap-1"
            >
              <span>New</span>
              <span className="italic text-xs font-normal">(Mpya)</span>
            </Link>
            <Link
              href="/second-hand"
              onClick={closeMenu}
              className="text-sm py-3 font-semibold text-neutral-900 transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-black flex flex-col items-start gap-1"
            >
              <span>Second-Hand</span>
              <span className="italic text-xs font-normal">(Mtumba)</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
