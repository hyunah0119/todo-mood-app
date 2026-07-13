import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MoodKey } from "@/types/mood";

import { getMood, addMood, addMemo, updateMood, updateMemo, deleteMemo, deleteMood } from '@/services/mood'
import { useUserStore } from "@/store/userStore";
import { useSelectedDateStore } from "@/store/selectedDateStore";

type AddMoodParams = {
  user_name: string;
  date: string;
  mood: MoodKey;
}

type AddMemoParams = {
  memo: string;
}

type UpdateMoodParams = {
  mood: MoodKey;
}

type UpdateMemoParams = {
  memo: string;
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

// memo 추가
export const useAddMemo = () => {
  const queryClient = useQueryClient();
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();

  return useMutation({
    mutationFn : (memo:AddMemoParams) => addMemo(userName, selectedDate.format('YYYY-MM-DD'), memo.memo),
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ["moods", userName, selectedDate.format('YYYY-MM-DD')] })
    },
    onError : (error) => {
      console.error('에러 발생 : ', error)
    }
  })
}

// mood 수정
export const useUpdateMood = () => {
  const queryClient = useQueryClient();
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();

  return useMutation({
    mutationFn : (mood:UpdateMoodParams) => updateMood(userName, selectedDate.format('YYYY-MM-DD'), mood.mood),
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ["moods", userName, selectedDate.format('YYYY-MM-DD')] })
    },
    onError : (error) => {
      console.error('에러 발생 : ', error)
    }
  })
}

// memo 수정
export const useUpdateMemo = () => {
  const queryClient = useQueryClient();
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();

  return useMutation({
    mutationFn : (memo:UpdateMemoParams) => updateMemo(userName, selectedDate.format('YYYY-MM-DD'), memo.memo),
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ["moods", userName, selectedDate.format('YYYY-MM-DD')] })
    },
    onError : (error) => {
      console.error('에러 발생 : ', error)
    }
  })
}

// memo 삭제
export const useDeleteMemo = () => {
  const queryClient = useQueryClient();
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();

  return useMutation({
    mutationFn : () => deleteMemo(userName, selectedDate.format('YYYY-MM-DD')),
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ["moods", userName, selectedDate.format('YYYY-MM-DD')] })
    },
    onError : (error) => {
      console.error('에러 발생 : ', error)
    }
  })
}

// mood 삭제
export const useDeleteMood = () => {
  const queryClient = useQueryClient();
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();

  return useMutation({
    mutationFn : () => deleteMood(userName, selectedDate.format('YYYY-MM-DD')),
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ["moods", userName, selectedDate.format('YYYY-MM-DD')] })
    },
    onError : (error) => {
      console.error('에러 발생 : ', error)
    }
  })
}