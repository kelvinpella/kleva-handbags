import { createClient } from "./supabase/client";

const supabase = createClient()

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