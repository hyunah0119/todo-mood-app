import { supabase } from '@/supabase/client'

// 조회
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

// 추가
export const addTodos = async (user_name:string, date:string, text:string, completed:boolean, order_index:number) => {
  const { data, error } = await supabase
    .from('todos')
    .insert([
      {
        user_name,
        date,
        text,
        completed,
        order_index
      }
  ]);

  if (error) {
    throw error;
  }

  return data;
}