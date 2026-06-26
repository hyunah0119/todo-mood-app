import TodayMoodCard from "@/components/todo/TodayMoodCard"
import DateSelector from "@/components/todo/DateSelector"

const Todo = () => {
  return (
    <div className="w-full h-full py-2 px-5">
      <TodayMoodCard />
      <DateSelector />
    </div>
  )
}

export default Todo