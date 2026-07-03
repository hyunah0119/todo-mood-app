type FilterType = "all" | "complete" | "incomplete";

type filterProps = {
  filter : FilterType,
}

const EmptyTodo = ({ filter } : filterProps) => {
  const message = 
    filter === 'all' 
      ? <>오늘의 할 일이 없습니다.<br/>첫 번째 할 일을 추가해보세요.</> 
      : filter === 'complete' 
        ? <>완료된 할 일이 없습니다.</>
        : <>미완료된 할 일이 없습니다.</>;

  return (
    <div className="flex flex-col justify-center items-center gap-2 text-center mt-12.5 text-neutral-600">
      {message}
    </div>
  )
}

export default EmptyTodo