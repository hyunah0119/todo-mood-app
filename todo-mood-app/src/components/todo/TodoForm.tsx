import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useSelectedDateStore } from "@/store/selectedDateStore";
import { useAddTodos } from "@/hooks/useTodos";

import { FaCheck } from "react-icons/fa6";

type todoFormProps = {
  orderIndex : number
}

const TodoForm = ({ orderIndex } : todoFormProps) => {
  const [inputValue, setInputValue] = useState('');
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();
  const { mutate } = useAddTodos();

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!inputValue.trim()) {
      alert('할 일을 입력해주세요.');
      return
    }

    mutate({
      user_name : userName,
      date: selectedDate.format("YYYY-MM-DD"),
      text: inputValue.trim(),
      completed: false,
      order_index: orderIndex,
    },
    {
      onSuccess : () => {
        setInputValue('')
      }
    })
  }

  const handleOnchange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <div className="w-full flex justify-center mt-5">
      <form className="w-full flex items-center justify-between" onSubmit={handleSubmit}>
        <input 
          type="text"
          className="w-[88%] border-b p-1 focus:outline-0"
          value={inputValue}
          onChange={handleOnchange}
          placeholder="할 일을 입력하세요."
        />
  
        <button
          type="submit"
          className="w-[10%] h-full flex items-center justify-center border rounded-md 
          border-neutral-700 bg-neutral-700 hover:border-black hover:bg-black text-white 
          text-xl font-bold cursor-pointer transition-colors duration-300"
        ><FaCheck /></button>
      </form>
    </div>
  )
}

export default TodoForm