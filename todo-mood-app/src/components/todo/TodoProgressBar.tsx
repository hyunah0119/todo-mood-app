import type { Todo } from "@/types/todo";

type TodoProgressBarProps = {
  todos: Todo[];
}

const TodoProgressBar = ({ todos }: TodoProgressBarProps) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  const progressRate = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  return (
    <div className="w-full mt-5">
      <span className="text-sm tracking-wide font-medium text-neutral-700 dark:text-neutral-300">완료율</span>
      <div className="w-full h-6.25 rounded-full border border-neutral-700 dark:border-neutral-300 flex items-center relative">
        <div className="h-full rounded-full bg-neutral-700 dark:bg-neutral-300 transition-all duration-250" style={{ width: `${progressRate}%` }}></div>
        <span className={`text-sm tracking-wide font-medium absolute left-2 ${progressRate > 0 ? "text-white dark:text-black" : "text-neutral-700 dark:text-neutral-300"}`}>{progressRate}%</span>
      </div>
    </div>
  )
}

export default TodoProgressBar