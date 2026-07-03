import TodoListItems from "./TodoListItems"
import EmptyTodo from "./EmptyTodo";
import type { Todo } from '@/types/todo'
import { useState } from "react";

type FilterType = "all" | "complete" | "incomplete";

interface TodoListProps {
  todos: Todo[];
  filter : FilterType;
}

const TodoList = ({ todos, filter }: TodoListProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

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
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TodoList