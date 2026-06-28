import TodoListItems from "./TodoListItems"

const TodoList = () => {
  return (
    <div className="mt-5">
      <h3 className="text-sm tracking-wide font-medium text-neutral-400">오늘의 할 일</h3>

      <div className="mt-3.75">
        <TodoListItems />
      </div>
    </div>
  )
}

export default TodoList