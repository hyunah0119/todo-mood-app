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
    ${direction === 'left' ? 'hover:-translate-x-0.5' : 'hover:translate-x-0.5'}
  `
  const { selectedDate, setSelectedDate } = useSelectedDateStore();

  const year = new Date().getFullYear();
  const maxYearDate = new Date(year + 1, 11);
  const minYearDate = new Date(year - 5, 11);

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

  return (
    <div className="flex items-center justify-evenly mt-5">
      <button className={arrowBtnClassName('left')} onClick={handleYesterDay}><MdKeyboardArrowLeft /></button>

      <div className="flex items-center gap-2">
        <p className="text-lg font-medium">{formattedDate}</p>
        <button 
          className="text-neutral-600 hover:text-black cursor-pointer transition-colors duration-250"
          onClick={handleCalendar}
        ><FaCalendarAlt /></button>
      </div>

      <button className={arrowBtnClassName('right')} onClick={handleNextDay}><MdKeyboardArrowRight /></button>

      {isOpen && 
        <>
          <div className="w-full h-screen flex flex-col justify-center items-center absolute inset-0 bg-black/60" onClick={() => setIsOpen(false)}>
              <div className="bg-white p-8 rounded-md">
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