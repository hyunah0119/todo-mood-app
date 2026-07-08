import MoodItems from "./MoodItems"
import MemoItems from "./MemoItems"

const MoodList = () => {
  return (
    <div>
      <div className="mt-5">
        <h3 className="text-sm tracking-wide font-medium text-neutral-400">오늘의 기분</h3>
        <MoodItems />
      </div>

      <div className="mt-5">
        <h3 className="text-sm tracking-wide font-medium text-neutral-400">오늘의 메모</h3>
        <MemoItems />
      </div>
    </div>
  )
}

export default MoodList