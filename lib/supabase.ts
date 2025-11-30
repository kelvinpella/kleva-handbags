import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let supabaseInstance: SupabaseClient | null = null;

function getSupabase() {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    }
  });

  return supabaseInstance;
}

export const supabase = getSupabase();

/**
 * Retrieve the currently authenticated user without modifying any application state.
 * This calls Supabase's `auth.getUser()` which reads the user from the auth session
 * but does not change any React state in your app.
 */
export async function getUserNoState() {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user ?? null, error };
}

export async function getHandbags(
  condition: 'new' | 'second-hand',
  page: number = 1,
  itemsPerPage: number = 12
) {
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { data, error, count } = await supabase
    .from('handbags')
    .select('*', { count: 'exact' })
    .eq('condition', condition)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.log('Error fetching handbags:', error);
    return { data: [], count: 0 };
  }

  return { data, count };
}

export async function getHandbagById(id: string) {
  console.log('Fetching handbag with ID:', id);
  
  const { data, error } = await supabase
    .from('handbags')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log('Error fetching handbag:', error);
    return null;
  }

  console.log('Fetched handbag:', data);
  return data;
}

export async function getSimilarHandbags(
  currentId: string,
  condition: 'new' | 'second-hand',
  limit: number = 4
) {
  const { data, error } = await supabase
    .from('handbags')
    .select('*')
    .eq('condition', condition)
    .neq('id', currentId)
    .limit(limit);

  if (error) {
    console.log('Error fetching similar handbags:', error);
    return [];
  }

  return data;
}