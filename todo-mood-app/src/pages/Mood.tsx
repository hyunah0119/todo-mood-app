import TodayTodoCard from "@/components/mood/TodayTodoCard"
import MoodCalendar from "@/components/mood/MoodCalendar"
import MoodForm from "@/components/mood/MoodForm"
import MoodList from "@/components/mood/MoodList"
import { useTodos } from "@/hooks/useTodos"
import { useUserStore } from "@/store/userStore"
import dayjs from "dayjs"

const Mood = () => {
  const { userName } = useUserStore();
  const { data } = useTodos(userName, dayjs().format("YYYY-MM-DD"));

  return (
    <div className="w-full h-full min-h-0 py-2 px-5 flex flex-col">
      <TodayTodoCard todos={data ?? []} />
      <MoodCalendar />
      <MoodForm />
      <MoodList />
    </div>
  )
}

export default Mood