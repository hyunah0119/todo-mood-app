import { useState } from "react";

import { FaCheck } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";

type todolistProps = {
  text : string
  completed : boolean
  id : number
}

const TodoListItems = ({ text, completed } : todolistProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleKebabMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div
        className={`flex justify-between items-center
        rounded-lg ${completed ? 'bg-neutral-200' : 'bg-neutral-50 hover:bg-neutral-100'}
        shadow-md px-2.5 py-2.5 box-border mb-2 transition-colors duration-200 cursor-pointer`}
      >
        <div>
          <input type="checkbox" id="todo-checkbox" />
          <div className="flex items-center gap-2">
            <span className={`w-3.75 h-3.75 border rounded-4xl 
              ${completed ? 'flex justify-center items-center text-[10px] border-amber-400 bg-amber-400 text-white' : ''}`}
            >
              {completed && <FaCheck />}
            </span>
            <label htmlFor="todo-checkbox" className={`cursor-pointer ${completed ? 'line-through italic' : ''}`}>{text}</label>
          </div>
        </div>

        <div className="relative">
          <button className="block cursor-pointer text-lg" onClick={handleKebabMenuToggle}><HiOutlineDotsVertical /></button>

          {isOpen &&
            <div className="flex flex-col w-25 px-5 py-2 border rounded-md absolute top-5 right-2 border-neutral-300 bg-white text-neutral-500 z-10">
              <button className="border-b border-neutral-300 pb-2 text-sm cursor-pointer">수정하기</button>
              <button className="pt-2 text-sm cursor-pointer">삭제하기</button>
            </div>
          }
        </div>
      </div>

{/* 
      <div
        className="flex justify-between items-center
        rounded-lg bg-neutral-50 hover:bg-neutral-100
        shadow-md px-2.5 py-2.5 box-border mb-2 transition-colors duration-200 cursor-pointer"
      >
        <div>
          <input type="checkbox" id="todo-checkbox" />
          <div className="flex items-center gap-2">
            <span className="w-3.75 h-3.75 border rounded-4xl"></span>
            <label htmlFor="todo-checkbox" className="cursor-pointer">기본 (케밥메뉴 open)</label>
          </div>
        </div>

        <div className="relative">
          <button className="block cursor-pointer text-lg" onClick={handleKebabMenuToggle}><HiOutlineDotsVertical /></button>

          <div className="flex flex-col w-25 px-5 py-2 border rounded-md absolute top-5 right-2 border-neutral-300 bg-white text-neutral-500 z-10">
            <button className="border-b border-neutral-300 pb-2 text-sm cursor-pointer">수정하기</button>
            <button className="pt-2 text-sm cursor-pointer">삭제하기</button>
          </div>
        </div>
      </div>

      <div
        className="flex justify-between items-center
        rounded-lg bg-neutral-50 hover:bg-neutral-100
        shadow-md px-2.5 py-2.5 box-border mb-2 transition-colors duration-200 cursor-pointer"
      >
        <div className="w-full">
          <form className="w-full flex items-center gap-2">
            <input 
              type="text"
              className="w-full border-b pl-1 bg-white focus:outline-0"
              value={'수정 모드'}
            />
            <button className="text-xl text-amber-400 cursor-pointer">
              <FaCheckCircle />
            </button>
          </form>
        </div>
      </div>

      <div
        className="flex justify-between items-center
        rounded-lg bg-neutral-100
        shadow-md px-2.5 py-2.5 box-border mb-2 transition-colors duration-200 cursor-pointer"
      >
        <div>
          <input type="checkbox" id="todo-checkbox" />
          <div className="flex items-center gap-2">
            <span className="w-3.75 h-3.75 border rounded-4xl flex justify-center items-center text-[10px] border-neutral-500 bg-neutral-500 text-white">
              <FaCheck />
            </span>
            <label htmlFor="todo-checkbox" className="cursor-pointer">전체삭제용 (체크버전)</label>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default TodoListItems