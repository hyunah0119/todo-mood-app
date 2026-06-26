import { create } from 'zustand'
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/ko'

dayjs.locale('ko');

interface selectedDateStore {
  selectedDate : Dayjs,
  setSelectedDate : (data: Dayjs) => void
}

export const useSelectedDateStore = create<selectedDateStore>((set) => ({
  selectedDate : dayjs(),
  setSelectedDate : (date) => set({ selectedDate: date })
}))