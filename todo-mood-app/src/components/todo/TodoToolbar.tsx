import TodoFilter from "./TodoFilter"

import { FaRegTrashAlt } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";

type FilterType = "all" | "complete" | "incomplete";

type TodoToolbarProps = {
  filter : FilterType,
  setFilter : React.Dispatch<React.SetStateAction<FilterType>>
  isSortMode : boolean,
  setIsSortMode : React.Dispatch<React.SetStateAction<boolean>>
  isDeleteMode : boolean,
  setIsDeleteMode : React.Dispatch<React.SetStateAction<boolean>>
  onDeleteSelectedTodos : () => void;
}

const TodoToolbar = ({ filter, setFilter, isSortMode, setIsSortMode, isDeleteMode, setIsDeleteMode, onDeleteSelectedTodos } : TodoToolbarProps) => {
  const customButton = 'flex items-center gap-1.25 text-sm';

  const handleSortModeToggle = () => {
    if (filter !== "all") {
      alert("전체 목록일때만 정렬이 가능합니다.");
      return;
    }

    setIsSortMode(prev => !prev);
  }

  const handleDeleteModeToggle = () => {
    setIsDeleteMode(prev => !prev);
  }

  return (
    <div className="flex justify-between items-center mt-7.5" onClick={(e) => e.stopPropagation()}>
      <TodoFilter 
        filter={filter}
        setFilter={setFilter}
      />

      <div className="flex items-center gap-3.75">
        {isDeleteMode ? (
          <>
            <button className={`${customButton} cursor-pointer`} onClick={onDeleteSelectedTodos}>
              삭제 하기
            </button>
            |
            <button className={`${customButton} cursor-pointer`} onClick={handleDeleteModeToggle}>
              취소
            </button>
          </>
        ) : (
          <>
            <button 
              className={`${customButton} 
              ${filter === "all" ? 'cursor-pointer' : 'cursor-default opacity-50'} 
              ${isSortMode ? 'text-amber-400' : ''}`} 
              onClick={handleSortModeToggle}
            >
              <MdDragIndicator className="text-lg" /> 정렬
            </button>
            |
            <button 
              className={`${customButton} ${isSortMode ? 'cursor-default opacity-50' : 'cursor-pointer'}`} 
              onClick={handleDeleteModeToggle}
              disabled={isSortMode ? true : false}
            >
              <FaRegTrashAlt /> 삭제
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoToolbar