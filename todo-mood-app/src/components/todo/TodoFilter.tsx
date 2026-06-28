import InputRadio from "./InputRadio"

const TodoFilter = () => {
  return (
    <div className="flex items-center gap-3.75">
      <InputRadio htmlFor="all" radioName="todoFilter">전체</InputRadio>
      <InputRadio htmlFor="complete" radioName="todoFilter">완료</InputRadio>
      <InputRadio htmlFor="incomplete" radioName="todoFilter">미완료</InputRadio>
    </div>
  )
}

export default TodoFilter