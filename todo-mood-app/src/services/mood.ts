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

// memo 추가
export const addMemo = async (user_name:string, date:string, memo:string) => {
  const { data, error } = await supabase
    .from('moods')
    .update({
      memo
    })
    .eq('user_name', user_name)
    .eq('date', date)

  if (error) {
    throw error;
  }

  return data;
}

// mood 수정
export const updateMood = async (user_name:string, date:string, mood:MoodKey) => {
  const { data, error } = await supabase
    .from('moods')
    .update({
      mood
    })
    .eq('user_name', user_name)
    .eq('date', date)

  if (error) {
    throw error;
  }

  return data;
}

// memo 수정
export const updateMemo = async (user_name:string, date:string, memo:string) => {
  const { data, error } = await supabase
    .from('moods')
    .update({
      memo
    })
    .eq('user_name', user_name)
    .eq('date', date)

  if (error) {
    throw error;
  }

  return data;
}

// memo 삭제
export const deleteMemo = async (user_name:string, date:string) => {
  const { data, error } = await supabase
    .from('moods')
    .update({
      memo: null
    })
    .eq('user_name', user_name)
    .eq('date', date)

  if (error) {
    throw error;
  }

  return data;
}