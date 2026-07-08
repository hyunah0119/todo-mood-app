import { useState } from "react";

import { HiOutlineDotsVertical } from "react-icons/hi";

const MoodItems = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleUtils = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className="flex items-center justify-between rounded-md shadow-md p-2.5 relative">
      <div className="flex items-center gap-5">
        <div className="text-3xl">
          🤩
        </div>
  
        <div>
          <p className="text-lg font-bold tracking-wide font-pretendard">행복</p>
          <span className="text-sm text-neutral-500 font-medium">HAPPY</span>
        </div>
      </div>

      <button 
        className="block cursor-pointer text-lg" 
        onClick={handleToggleUtils}
      ><HiOutlineDotsVertical /></button>

      {isOpen &&
        <div className="flex flex-col w-25 px-5 py-2 border rounded-md absolute top-11 right-5 border-neutral-300 dark:border-black bg-white dark:bg-black text-neutral-500 dark:text-white z-10">
          <button 
            className="border-b border-neutral-300 dark:border-neutral-500 pb-2 text-sm cursor-pointer"
          >수정하기</button>
          <button 
            className="pt-2 text-sm cursor-pointer"
          >삭제하기</button>
        </div>
      }
    </div>
  )
}

export default MoodItems