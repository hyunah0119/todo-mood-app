import TodayTodoCard from "@/components/mood/TodayTodoCard"
import MoodCalendar from "@/components/mood/MoodCalendar"
import MoodList from "@/components/mood/MoodList"

import { useSelectedDateStore } from "@/store/selectedDateStore";
import { useUserStore } from "@/store/userStore"
import { useTodos } from "@/hooks/useTodos";
import { useMood } from "@/hooks/useMood"

const Mood = () => {
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();
  const { data: todoData } = useTodos(userName, selectedDate.format("YYYY-MM-DD"));
  const { data: moodData } = useMood(userName, selectedDate.format("YYYY-MM-DD"));

  const MoodsData = moodData?.[0]

  const mood = MoodsData?.mood;
  const memo = MoodsData?.memo;

  return (
    <div className="w-full h-full min-h-0 py-2 px-5 flex flex-col">
      <TodayTodoCard todos={todoData ?? []} />
      <MoodCalendar moodData={moodData ?? []} />
      <MoodList 
        selectedDate={selectedDate}
        mood={mood}
        memo={memo}
      />
    </div>
  )
}

export default Mood