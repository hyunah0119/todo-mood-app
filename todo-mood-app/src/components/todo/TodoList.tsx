import TodoListItems from "./TodoListItems"
import EmptyTodo from "./EmptyTodo";
import type { Todo } from '@/types/todo'

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div className="mt-5">
      <h3 className="text-sm tracking-wide font-medium text-neutral-400">오늘의 할 일</h3>

      <div className="mt-3.75"> 
        {todos.length === 0 ? (
          <EmptyTodo />
        ) : (
          todos.map((todo) => (
            <TodoListItems 
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TodoList