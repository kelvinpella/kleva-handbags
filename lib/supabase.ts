import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    console.error('Error fetching handbags:', error);
    return { data: [], count: 0 };
  }

  return { data, count };
}

export async function getHandbagById(id: string) {
  const { data, error } = await supabase
    .from('handbags')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching handbag:', error);
    return null;
  }

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
    console.error('Error fetching similar handbags:', error);
    return [];
  }

  return data;
}