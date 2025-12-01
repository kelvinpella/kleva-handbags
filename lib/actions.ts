'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function loginAction(email: string, password: string) {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    return {
      success: false,
      error: authError.message || 'Failed to sign in. Please try again.',
    };
  }

  if (!data.user) {
    return {
      success: false,
      error: 'Login failed. Please try again.',
    };
  }

  // Redirect to admin dashboard on successful login
  redirect('/admin');
}

export async function signoutAction() {
  const supabase = await createClient();

  // This will clear the session cookies server-side when using
  // the `createServerClient` helper from `@supabase/ssr`.
  await supabase.auth.signOut();

  // Redirect user to the login page after signing out
  redirect('/login');
}
