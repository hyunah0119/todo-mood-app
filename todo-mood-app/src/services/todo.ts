import { supabase } from '@/supabase/client'

export const getTodos = async (user_name:string, date:string) => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_name', user_name)
    .eq('date', date)
    .order('order_index', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}