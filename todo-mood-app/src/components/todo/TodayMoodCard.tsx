import { useMood } from "@/hooks/useMood";
import { useUserStore } from "@/store/userStore";
import { useSelectedDateStore } from "@/store/selectedDateStore";
import { MoodOptions, type MoodKey } from "@/types/mood";

import { NavLink } from "react-router-dom";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const TodayMoodCard = () => {
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();
  const { data: moodData } = useMood(userName, selectedDate.format('YYYY-MM-DD'));
  const todayMood = moodData?.[0]?.mood;

  return (
    <div className="flex justify-end">
      <NavLink 
        to="/mood"
        className='flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all duration-200 cursor-pointer group'
      >
        {todayMood ? (
          <p className="flex items-center gap-1">
            오늘의 기분 : 
            <span className="text-lg">{MoodOptions[todayMood as MoodKey].emoji}</span>
          </p>
        ) : (
          <>
            💡오늘의 기분을 기록해보세요. <MdKeyboardDoubleArrowRight className="text-lg group-hover:translate-x-0.5" />
          </>
        )}
      </NavLink>
    </div>
  )
}

export default TodayMoodCard