import type { Todo } from "@/types/todo";
import { NavLink } from "react-router-dom";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";

interface TodayTodoCardProps {
  todos?: Todo[];
}

const TodayTodoCard = ({ todos = [] }: TodayTodoCardProps) => {
  const todayTodoCount = todos.length;

  return (
    <div className="flex justify-end">
      <NavLink 
        to="/todo"
        className='flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all duration-200 cursor-pointer group'
      >
        {todayTodoCount > 0 ? (
          <>
            오늘의 할 일 : {todayTodoCount}개
          </>
        ) : (
          <>
            💡오늘의 할 일을 기록해보세요. <MdKeyboardDoubleArrowRight className="text-lg group-hover:translate-x-0.5" />
          </>
        )}
      </NavLink>
    </div>
  )
}

export default TodayTodoCard