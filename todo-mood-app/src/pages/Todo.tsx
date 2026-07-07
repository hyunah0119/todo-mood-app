import { useTodos } from "@/hooks/useTodos";
import { useUserStore } from "@/store/userStore";
import { useSelectedDateStore } from "@/store/selectedDateStore";
import { useDeleteTodo } from "@/hooks/useTodos";

import TodayMoodCard from "@/components/todo/TodayMoodCard"
import DateSelector from "@/components/todo/DateSelector"
import TodoForm from "@/components/todo/TodoForm"
import TodoProgressBar from "@/components/todo/TodoProgressBar"
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

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedTodoIds, setSelectedTodoIds] = useState<number[]>([]);

  const handleToggleSelectTodo = (id:number) => {
    setSelectedTodoIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const { mutate:deleteTodoMutate } = useDeleteTodo();

  const handleDeleteSelectedTodos = () => {
    if (selectedTodoIds.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }

    selectedTodoIds.forEach(id => {
      deleteTodoMutate({ id });
    });
    
    setIsDeleteMode(false);
    setSelectedTodoIds([]);
  }

  return (
    <div
      className="w-full h-full min-h-0 py-2 px-5 flex flex-col"
      onClick={() => {
        if (isDeleteMode) {
          setIsDeleteMode(false);
          setSelectedTodoIds([]);
        }
      }}
    >
      <TodayMoodCard />
      <DateSelector />
      <TodoForm orderIndex={(data?.length ?? 0) + 1} />
      <TodoToolbar 
        filter={filter}
        setFilter={setFilter}
        isSortMode={isSortMode}
        setIsSortMode={setIsSortMode}
        isDeleteMode={isDeleteMode}
        setIsDeleteMode={setIsDeleteMode}
        onDeleteSelectedTodos={handleDeleteSelectedTodos}
      />
      <TodoProgressBar todos={data ?? []} />
      <div className="min-h-0 flex-1 flex flex-col" onClick={(e) => e.stopPropagation()}>
        <TodoList 
          todos={filteredTodos} 
          filter={filter} 
          isSortMode={isSortMode}
          isDeleteMode={isDeleteMode}
          selectedTodoIds={selectedTodoIds}
          onToggleSelectTodo={handleToggleSelectTodo}
        />
      </div>
    </div>
  )
}

export default Todo