import TodoFilter from "./TodoFilter"

import { FaRegTrashAlt } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";

type FilterType = "all" | "complete" | "incomplete";

type filterProps = {
  filter : FilterType,
  setFilter : React.Dispatch<React.SetStateAction<FilterType>>
}

const TodoToolbar = ({ filter, setFilter} : filterProps) => {
  const customButton = 'flex items-center gap-1.25 text-sm cursor-pointer';

  return (
    <div className="flex justify-between items-center mt-7.5">
      <TodoFilter 
        filter={filter}
        setFilter={setFilter}
      />

      <div className="flex items-center gap-3.75">
        <button className={`${customButton}`}>
          <MdDragIndicator className="text-lg" /> 정렬
        </button>
        
        |

        <button className={`${customButton}`}>
          <FaRegTrashAlt /> 삭제
        </button>
      </div>
    </div>
  )
}

export default TodoToolbar