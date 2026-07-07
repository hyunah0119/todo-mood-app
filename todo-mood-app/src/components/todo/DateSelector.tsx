import dayjs from "dayjs";
import 'dayjs/locale/ko'

import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
import { ko } from "@daypicker/react/locale";

import { useSelectedDateStore } from '@/store/selectedDateStore'

import { FaCalendarAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";

dayjs.locale('ko');

const DateSelector = () => {
  const arrowBtnClassName = (direction : 'left' | 'right') => `
    text-3xl text-neutral-600 hover:text-black cursor-pointer transition-transform duration-250
    dark:text-neutral-400 dark:hover:text-white
    ${direction === 'left' ? 'hover:-translate-x-0.5' : 'hover:translate-x-0.5'}
  `
  const { selectedDate, setSelectedDate } = useSelectedDateStore();

  const year = new Date().getFullYear();
  const maxYearDate = new Date(year + 1, 11);
  const minYearDate = new Date(year - 5, 11);

  const isToday = selectedDate.isSame(dayjs(), "day");

  // 날짜 선택
  const formattedDate = selectedDate.format('MM월 DD일 (dd)');

  const handleYesterDay = () => {
    setSelectedDate(selectedDate.subtract(1, 'day'))
  }

  const handleNextDay = () => {
    setSelectedDate(selectedDate.add(1, 'day'))
  }

  // 달력 팝업
  const [isOpen, setIsOpen] = useState(false);

  const handleCalendar = () => {
    setIsOpen(true);
  }

  // today button
  const handleToday = () => {
    setSelectedDate(dayjs());
  }

  return (
    <div className="flex items-center justify-evenly mt-5">
      <button className={arrowBtnClassName('left')} onClick={handleYesterDay}><MdKeyboardArrowLeft /></button>

      <div className="flex items-center gap-2">
        <p className="text-lg font-medium">{formattedDate}</p>
        <button 
          className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer transition-colors duration-250"
          onClick={handleCalendar}
        ><FaCalendarAlt /></button>
        <button
          className={`ml-2 border rounded-md px-2 py-1 text-sm font-medium text-white transition-colors duration-250 dark:border-black
          ${isToday ? "bg-neutral-400 dark:bg-neutral-700 dark:text-neutral-400 cursor-default" : "bg-neutral-700 dark:bg-neutral-300 dark:text-black hover:bg-black dark:hover:bg-white cursor-pointer"}`}
          onClick={handleToday}
          disabled={isToday}
        >오늘</button>
      </div>

      <button className={arrowBtnClassName('right')} onClick={handleNextDay}><MdKeyboardArrowRight /></button>

      {isOpen && 
        <>
          <div className="w-full h-screen flex flex-col justify-center items-center absolute inset-0 bg-black/60 z-99" onClick={() => setIsOpen(false)}>
              <div className="bg-white dark:bg-neutral-700 p-8 rounded-md" onClick={(e) => e.stopPropagation()}>
                <DayPicker
                  locale={ko}
                  animate
                  mode="single"
                  navLayout="around"
                  endMonth={maxYearDate}
                  startMonth={minYearDate}
                  selected={selectedDate.toDate()}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(dayjs(date));
                      setIsOpen(false)
                    }
                  }}
                />
              </div>
          </div>
        </>
      }
    </div>
  )
}

export default DateSelector