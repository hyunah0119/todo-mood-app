import TodayTodoCard from "@/components/mood/TodayTodoCard"
import MoodCalendar from "@/components/mood/MoodCalendar"
import MoodList from "@/components/mood/MoodList"

import { useSelectedDateStore } from "@/store/selectedDateStore";
import { useUserStore } from "@/store/userStore"
import { useTodos } from "@/hooks/useTodos";
import { useMood } from "@/hooks/useMood"
import dayjs from "dayjs";
import { useEffect, useRef } from "react";

const Mood = () => {
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: todoData, isLoading: isTodoLoading, isError: isTodoError, refetch: refetchTodos } = useTodos(userName, dayjs().format("YYYY-MM-DD"));
  const selectedDateKey = selectedDate.format("YYYY-MM-DD");
  const { data: moodData, isLoading: isMoodLoading, isError: isMoodError, refetch: refetchMood } = useMood(userName, selectedDateKey);

  const MoodsData = moodData?.[0]

  const mood = MoodsData?.mood;
  const memo = MoodsData?.memo;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [selectedDateKey, mood, memo]);

  if (isTodoLoading || isMoodLoading) {
    return (
      <div className="w-full h-full py-2 px-5 flex items-center justify-center text-sm text-neutral-500">
        기분 기록을 불러오는 중입니다.
      </div>
    )
  }

  if (isTodoError || isMoodError) {
    return (
      <div className="w-full h-full py-2 px-5 flex flex-col items-center justify-center gap-3 text-sm text-neutral-500">
        <p>기록을 불러오지 못했습니다.</p>
        <button
          type="button"
          className="border rounded-md px-3 py-1 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          onClick={() => {
            refetchTodos();
            refetchMood();
          }}
        >
          다시 시도
        </button>
      </div>
    )
  }

  return (
    <div ref={scrollRef} className="todo-scrollbar w-full h-full min-h-0 py-2 px-5 flex flex-col overflow-x-hidden overflow-y-auto">
      <TodayTodoCard todos={todoData ?? []} />
      <MoodCalendar />
      <MoodList 
        key={selectedDateKey}
        selectedDate={selectedDate}
        mood={mood}
        memo={memo}
      />
    </div>
  )
}

export default Mood