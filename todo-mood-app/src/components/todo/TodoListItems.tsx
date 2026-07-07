import { useState } from "react";
import { useDeleteTodo } from "@/hooks/useTodos";
import { useModifyTodo } from "@/hooks/useTodos";

import { FaCheck } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";

type todolistProps = {
  text : string
  completed : boolean
  id : number
  isOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onToggleComplete: (id:number) => void;
  isSortMode : boolean;
  selectedTodoIds : number[];
  isDeleteMode : boolean;
  onToggleSelectTodo : (id:number) => void;
}

const TodoListItems = (
  { text, completed, id, isOpen, onToggleMenu, onCloseMenu, 
    onToggleComplete, isSortMode, isDeleteMode, selectedTodoIds, onToggleSelectTodo 
  } : todolistProps) => {
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyText, setModifyText] = useState(text);
  const { mutate:deleteTodoMutate } = useDeleteTodo();
  const { mutate:modifyTodoMutate } = useModifyTodo();

  // 완료
  const handleOnCompleted = () => {
    onToggleComplete(id);
  }

  // 삭제
  const handleDeleteTodo = (e:React.MouseEvent) => {
    e.stopPropagation();

    deleteTodoMutate ({
      id: id
    })
  }

  // 수정
  const handleModifyMode = (e:React.MouseEvent) => {
    e.stopPropagation();

    setModifyText(text);
    setModifyMode(true);
    onCloseMenu();
  }

  const handleModifyTextSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!modifyText.trim()) return;

    modifyTodoMutate(
      { id, text: modifyText.trim() },
      {
        onSuccess: () => {
          setModifyMode(false);
          onCloseMenu();
        },
      }
    );
  };

  const isSelected = selectedTodoIds.includes(id);

  return (
    <>
      <div
        className={`flex justify-between items-center
        rounded-lg ${completed ? 'bg-neutral-200 dark:bg-black' : 'bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'}
        shadow-md px-2.5 py-2.5 box-border mb-2 transition-colors duration-200 cursor-pointer`}
        onClick={isDeleteMode ? () => onToggleSelectTodo(id) : handleOnCompleted}
      >
        {modifyMode ? (
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <form 
              className="w-full flex items-center gap-2"
              onSubmit={handleModifyTextSave}
            >
              <input 
                type="text"
                className="w-full border-b pl-1 bg-white focus:outline-0"
                value={modifyText}
                onChange={(e) => setModifyText(e.target.value)}
              />
              <button 
                className="text-xl text-amber-400 cursor-pointer"
                type="submit"
                onClick={(e) => e.stopPropagation()}
              >
                <FaCheckCircle />
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="flex items-center">
              {isSortMode && !completed && <MdDragIndicator className="text-lg mr-2" />}
              <input type="checkbox" id="todo-checkbox" />
              <div className="flex items-center gap-2">
                {isDeleteMode ? (
                  <>
                    <span className={`w-3.75 h-3.75 border rounded-4xl flex justify-center items-center text-[10px] border-neutral-500 
                      ${isSelected ? 'bg-neutral-500 text-white' : ''}`}>
                      {isSelected && <FaCheck />}
                    </span>
                    <label htmlFor="todo-checkbox" className={`cursor-pointer ${completed ? 'line-through italic dark:text-neutral-500' : ''}`}>{text}</label>
                  </>
                ) : (
                  <>
                    <span className={`w-3.75 h-3.75 border rounded-4xl 
                      ${completed ? 'flex justify-center items-center text-[10px] border-amber-400 bg-amber-400 text-white' : ''}`}
                    >
                      {completed && <FaCheck />}
                    </span>
                    <label htmlFor="todo-checkbox" className={`cursor-pointer ${completed ? 'line-through italic dark:text-neutral-500' : ''}`}>{text}</label>
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <button 
                className="block cursor-pointer text-lg" 
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleMenu()
                }}
              ><HiOutlineDotsVertical /></button>

              {isOpen &&
                <div className="flex flex-col w-25 px-5 py-2 border rounded-md absolute top-5 right-2 border-neutral-300 dark:border-black bg-white dark:bg-black text-neutral-500 dark:text-white z-10">
                  <button 
                    className="border-b border-neutral-300 dark:border-neutral-500 pb-2 text-sm cursor-pointer"
                    onClick={handleModifyMode}
                  >수정하기</button>
                  <button 
                    className="pt-2 text-sm cursor-pointer"
                    onClick={handleDeleteTodo}
                  >삭제하기</button>
                </div>
              }
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default TodoListItems