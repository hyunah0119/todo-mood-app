import { useState } from "react";
import TodoListItems from "./TodoListItems";
import { useUpdateTodoOrderIndex } from "@/hooks/useTodos";
import EmptyTodo from "./EmptyTodo";
import type { Todo } from '@/types/todo'

type FilterType = "all" | "complete" | "incomplete";

interface TodoListProps {
  todos: Todo[];
  filter : FilterType;
}

const TodoList = ({ todos, filter }: TodoListProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const { mutate } = useUpdateTodoOrderIndex();

  // 완료 항목 아래로 재배열
  const handleToggleCompleted = (id:number) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed : !todo.completed,
        };
      }

      return todo;
    });
    
    const incompleteTodos = updateTodos.filter(todo => !todo.completed);
    const completeTodos = updateTodos.filter(todo => todo.completed);

    const reorderedTodos = [...incompleteTodos, ...completeTodos];

    const reorderedWithIndex = reorderedTodos.map((todo, index) => ({
      ...todo,
      order_index : index + 1,
    }));

    mutate(reorderedWithIndex)
  }
  
  return (
    <div className="mt-5">
      <h3 className="text-sm tracking-wide font-medium text-neutral-400">오늘의 할 일</h3>

      <div className="mt-3.75"> 
        {todos.length === 0 ? (
          <EmptyTodo filter={filter} />
        ) : (
          todos.map((todo) => (
            <TodoListItems 
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              isOpen={openMenuId === todo.id}
              onToggleMenu={() => setOpenMenuId(openMenuId === todo.id ? null : todo.id)}
              onCloseMenu={() => setOpenMenuId(null)}
              onToggleComplete={handleToggleCompleted}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TodoList