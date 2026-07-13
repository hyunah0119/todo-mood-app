import dayjs from "dayjs";
import 'dayjs/locale/ko';

import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
import { ko } from "@daypicker/react/locale";

import { useSelectedDateStore } from '@/store/selectedDateStore';

dayjs.locale('ko')

const MoodCalendar = () => {
  const { selectedDate, setSelectedDate } = useSelectedDateStore();

  const year = new Date().getFullYear();
  const maxYearDate = new Date(year + 1, 11);
  const minYearDate = new Date(year - 5, 11);

  return (
    <div className="mt-7.5">
      <div className="mood-calendar w-full">
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
            }
          }}
        />
      </div>
    </div>
  )
}

export default MoodCalendar