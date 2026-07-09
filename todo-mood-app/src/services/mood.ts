import { supabase } from '@/supabase/client'
import type { MoodKey } from '@/types/mood'

// 조회
export const getMood = async (user_name:string, date:string) => {
  const { data, error } = await supabase
    .from('moods')
    .select('*')
    .eq('user_name', user_name)
    .eq('date', date);

  if (error) {
    throw error;
  }

  return data;
}

// mood 추가
export const addMood = async (user_name:string, date:string, mood:MoodKey) => {
  const { data, error } = await supabase
    .from('moods')
    .insert([
      {
        user_name,
        date,
        mood
      }
    ]);

  if (error) {
    throw error;
  }

  return data;
}