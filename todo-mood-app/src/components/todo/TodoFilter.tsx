import InputRadio from "./InputRadio"

type FilterType = "all" | "complete" | "incomplete";

type filterProps = {
  filter : FilterType,
  setFilter : React.Dispatch<React.SetStateAction<FilterType>>,
}

const TodoFilter = ({ filter, setFilter} : filterProps) => {
  return (
    <div className="flex items-center gap-3.75">
      <InputRadio 
        htmlFor="all" 
        radioName="todoFilter"
        value="all"
        filter={filter}
        setFilter={setFilter}
      >전체</InputRadio>

      <InputRadio 
        htmlFor="complete" 
        radioName="todoFilter"
        value="complete" 
        filter={filter}
        setFilter={setFilter}
      >완료</InputRadio>
      
      <InputRadio 
        htmlFor="incomplete" 
        radioName="todoFilter"
        value="incomplete" 
        filter={filter}
        setFilter={setFilter}
      >미완료</InputRadio>
    </div>
  )
}

export default TodoFilter