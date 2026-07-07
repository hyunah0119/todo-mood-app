import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const TodayMoodCard = () => {
  return (
    <div className="flex justify-end">
      <button 
        className='flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all duration-200 cursor-pointer group'
      >
        {/* todayMood : false */}
        💡오늘의 기분을 기록해보세요. <MdKeyboardDoubleArrowRight className="text-lg group-hover:translate-x-0.5" />

        {/* todayMood : true */}
        {/* 오늘의 기분 😁 */}
      </button>
    </div>
  )
}

export default TodayMoodCard