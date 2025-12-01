'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ADMIN_NAVIGATION } from '@/lib/constants';
import { signoutAction } from '@/lib/actions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);

  // When using the server action as a form `action`, we can set local
  // UI state on submit and let Next call the server action.
  const onSignoutSubmit = () => setSigningOut(true);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-neutral-900 text-white">
        <div className="flex items-center space-x-2 px-6 py-5 border-b border-neutral-800">
          <div className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="text-xl font-bold">Pochi Admin</span>
        </div>

        <nav className="px-4 py-6 space-y-2">
          {ADMIN_NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
          <form action={signoutAction} onSubmit={onSignoutSubmit} className="w-full">
            <button
              type="submit"
              disabled={signingOut}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-md text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">{signingOut ? 'Signing out...' : 'Sign Out'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <div className="px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}