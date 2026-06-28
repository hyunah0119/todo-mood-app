import { FaCheck } from "react-icons/fa6";

const TodoForm = () => {
  return (
    <div className="w-full flex justify-center mt-5">
      <form className="w-full flex items-center justify-between">
        <input 
          type="text"
          className="w-[88%] border-b p-1 focus:outline-0"
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