import { useTodos } from "@/hooks/useTodos";
import { useUserStore } from "@/store/userStore";
import { useSelectedDateStore } from "@/store/selectedDateStore";

import TodayMoodCard from "@/components/todo/TodayMoodCard"
import DateSelector from "@/components/todo/DateSelector"
import TodoForm from "@/components/todo/TodoForm"
import TodoToolbar from "@/components/todo/TodoToolbar"
import TodoList from "@/components/todo/TodoList"

const Todo = () => {
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();
  const { data } = useTodos(userName, selectedDate.format('YYYY-MM-DD'));
  console.log(data)

  return (
    <div className="w-full h-full py-2 px-5">
      <TodayMoodCard />
      <DateSelector />
      <TodoForm />
      <TodoToolbar />
      <TodoList todos={data ?? []} />
    </div>
  )
}

export default Todo