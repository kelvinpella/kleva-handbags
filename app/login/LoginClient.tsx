"use client";

import Link from "next/link";
import { useState, useCallback, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "@/lib/actions";
import { createClient } from "@/lib/supabase/client";

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

export default function LoginClient() {
  const searchParams = useSearchParams();
  const initialError = searchParams?.get("error") ?? null;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);

  // Sign in with Google (OAuth)
  const handleGoogleSignIn = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (oauthError) {
        setError(oauthError.message || MESSAGES.ERROR_GENERIC);
        setIsLoading(false);
      }

      // If successful, Supabase will redirect the browser to the provider
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : MESSAGES.ERROR_GENERIC;
      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

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
      const errorMessage = err instanceof Error ? err.message : MESSAGES.ERROR_GENERIC;
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
            <span className="text-3xl font-bold text-neutral-900">Kleva Handbags</span>
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

          {/* Google sign-in (top) */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              aria-label="Sign in with Google"
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-neutral-300 rounded-md shadow-sm bg-white hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.2-4.6-50.5H272v95.6h147.4c-6.4 34.2-25.6 63.1-54.6 82.4v68.3h88.3c51.7-47.7 82.4-118 82.4-195.8z" />
                <path fill="#34A853" d="M272 544.3c73.6 0 135.4-24.4 180.5-66.2l-88.3-68.3c-24.6 16.5-56 26-92.2 26-70.9 0-131-47.9-152.5-112.3H29.9v70.6C76.9 483.3 167.4 544.3 272 544.3z" />
                <path fill="#FBBC05" d="M119.5 323.4c-9.6-28.6-9.6-59.7 0-88.3V164.5H29.9c-39 76.9-39 169.5 0 246.4l89.6-87.5z" />
                <path fill="#EA4335" d="M272 107.1c39.9 0 75.9 13.7 104.2 40.6l78.1-78.1C403.1 24.4 341.3 0 272 0 167.4 0 76.9 61 29.9 164.5l89.6 70.6C141 154.9 201.1 107.1 272 107.1z" />
              </svg>
              <span className="ml-3">Sign in with Google</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center" aria-hidden>
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-neutral-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
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
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
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
