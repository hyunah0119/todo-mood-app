import { useState } from "react";

import { HiOutlineDotsVertical } from "react-icons/hi";

const MemoItems = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleUtils = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className="flex items-center justify-between rounded-md shadow-md p-2.5 relative">
      <textarea 
        className="w-full h-full text-sm resize-none outline-0 bg-transparent p-2.5"
        disabled
        value={'오늘은 기분이 별로..'}
      ></textarea>

      <button 
        className="block cursor-pointer text-lg absolute top-2.5 right-2.5" 
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

export default MemoItems