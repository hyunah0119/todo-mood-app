import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MoodKey } from "@/types/mood";

import { getMood, addMood } from '@/services/mood'

type AddMoodParams = {
  user_name: string;
  date: string;
  mood: MoodKey;
}

// 조회
export const useMood = (userName:string, date:string) => {
  return useQuery({
    queryKey : ["moods", userName, date],
    queryFn : () => getMood(userName, date),
    enabled: !!userName && !!date,
  });
}

// mood 추가
export const useAddMood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : (mood:AddMoodParams) => addMood(mood.user_name, mood.date, mood.mood),
    onSuccess : (_,mood:AddMoodParams) => {
      queryClient.invalidateQueries({ queryKey: ["moods", mood.user_name, mood.date] })
    },
    onError : (error) => {
      console.error('에러 발생 : ', error)
    }
  })
}