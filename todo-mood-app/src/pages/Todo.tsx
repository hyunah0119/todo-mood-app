import { useTodos } from "@/hooks/useTodos";
import { useUserStore } from "@/store/userStore";
import { useSelectedDateStore } from "@/store/selectedDateStore";
import { useDeleteTodos } from "@/hooks/useTodos";

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
  const { data, isLoading, isError, refetch } = useTodos(userName, selectedDate.format('YYYY-MM-DD'));

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
  const todoListKey = [
    selectedDate.format('YYYY-MM-DD'),
    filter,
    data?.map(todo => `${todo.id}:${todo.completed}:${todo.order_index}:${todo.text}`).join('|') ?? 'empty',
  ].join('-');

  const handleToggleSelectTodo = (id:number) => {
    setSelectedTodoIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const { mutate:deleteTodosMutate } = useDeleteTodos();

  const handleDeleteSelectedTodos = () => {
    if (selectedTodoIds.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }

    deleteTodosMutate(
      { ids: selectedTodoIds },
      {
        onSuccess: () => {
          setIsDeleteMode(false);
          setSelectedTodoIds([]);
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full py-2 px-5 flex items-center justify-center text-sm text-neutral-500">
        할 일을 불러오는 중입니다.
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full h-full py-2 px-5 flex flex-col items-center justify-center gap-3 text-sm text-neutral-500">
        <p>할 일을 불러오지 못했습니다.</p>
        <button
          type="button"
          className="border rounded-md px-3 py-1 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          onClick={() => refetch()}
        >
          다시 시도
        </button>
      </div>
    )
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
          key={todoListKey}
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