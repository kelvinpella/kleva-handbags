"use client";

import Link from "next/link";
import { useState, useCallback, FormEvent } from "react";
import { loginAction } from "../../lib/actions";

// Types
interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

// Constants
const ROUTES = {
  HOME: "/",
  ADMIN: "/admin",
} as const;

const MESSAGES = {
  ERROR_GENERIC: "Failed to sign in. Please try again.",
  SIGNING_IN: "Signing in...",
  SIGN_IN: "Sign In",
} as const;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: FormEvent<LoginFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value;

    try {
      const result = await loginAction(email, password);

      if (!result.success) {
        setError(result.error);
      }
      // If successful, loginAction will redirect via redirect()
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : MESSAGES.ERROR_GENERIC;
      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <header className="text-center">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center space-x-2 mb-6 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 rounded"
            aria-label="Return to Kleva Handbags home"
          >
            <span className="text-3xl font-bold text-neutral-900">
              Kleva Handbags
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-neutral-900">Admin Sign In</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Sign in with your email and password to access your admin dashboard
          </p>
        </header>

        {/* Login Form */}
        <main className="bg-white py-8 px-6 shadow-sm border border-neutral-200 rounded-lg">
          {error && (
            <div
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isLoading}
                className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-required="true"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-busy={isLoading}
            >
              {isLoading ? MESSAGES.SIGNING_IN : MESSAGES.SIGN_IN}
            </button>
          </form>
        </main>

        {/* Footer */}
        <footer className="text-center">
          <Link
            href={ROUTES.HOME}
            className="text-sm text-neutral-600 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 rounded transition-colors"
          >
            ← Back to store
          </Link>
        </footer>
      </div>
    </div>
  );
}
