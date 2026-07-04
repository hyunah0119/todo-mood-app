import { useTodos } from "@/hooks/useTodos";
import { useUserStore } from "@/store/userStore";
import { useSelectedDateStore } from "@/store/selectedDateStore";

import TodayMoodCard from "@/components/todo/TodayMoodCard"
import DateSelector from "@/components/todo/DateSelector"
import TodoForm from "@/components/todo/TodoForm"
import TodoToolbar from "@/components/todo/TodoToolbar"
import TodoList from "@/components/todo/TodoList"
import { useState } from "react";

type FilterType = "all" | "complete" | "incomplete";

const Todo = () => {
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();
  const { data } = useTodos(userName, selectedDate.format('YYYY-MM-DD'));

  const [filter, setFilter] = useState<FilterType>("all");
  const [isSortMode, setIsSortMode] = useState(false);

  let filteredTodos = data ?? [];

  if (filter === 'complete') {
    filteredTodos = filteredTodos.filter((item) => item.completed === true)
  }

  if (filter === 'incomplete') {
    filteredTodos = filteredTodos.filter((item) => item.completed === false)
  }

  return (
    <div className="w-full h-full py-2 px-5">
      <TodayMoodCard />
      <DateSelector />
      <TodoForm orderIndex={(data?.length ?? 0) + 1} />
      <TodoToolbar 
        filter={filter}
        setFilter={setFilter}
        isSortMode={isSortMode}
        setIsSortMode={setIsSortMode}
      />
      <TodoList 
        todos={filteredTodos} 
        filter={filter} 
        isSortMode={isSortMode}
      />
    </div>
  )
}

export default Todo