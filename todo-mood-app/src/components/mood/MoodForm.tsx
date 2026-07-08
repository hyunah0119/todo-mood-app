import { useState } from "react";
import { useSelectedDateStore } from "@/store/selectedDateStore";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { TbMoodPlus } from "react-icons/tb";
import { BiMessageAdd } from "react-icons/bi";

const MoodForm = () => {
  const { selectedDate } = useSelectedDateStore();

  const [isMoodFormVisible, setIsMoodFormVisible] = useState(false);
  const [isMemoFormVisible, setIsMemoFormVisible] = useState(false);

  return (
    <div className="mt-7.5">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">{selectedDate.format('MM월 DD일 (dd)')}</p>
  
        <div className="flex items-center gap-5">
          <button 
            type="button" 
            aria-label="기분 추가" 
            className="text-2xl cursor-pointer"
            onClick={() => (
              setIsMemoFormVisible(false),
              setIsMoodFormVisible(prev => !prev)
            )}
          >
            <TbMoodPlus />
          </button>
          <button 
            type="button" 
            aria-label="메모 추가" 
            className="text-2xl cursor-pointer"
            onClick={() => (
              setIsMoodFormVisible(false),
              setIsMemoFormVisible(prev => !prev)
            )}
          >
            <BiMessageAdd />
          </button>
        </div>
      </div>

      {/* 기분 선택 */}
      {isMoodFormVisible && 
        <form className="mt-5">
          <div className="w-full rounded-md shadow-md px-2.5 py-3.75">
            <Swiper
              spaceBetween={10}
              slidesPerView={5.5}
            >
              <SwiperSlide>
                <button 
                  type="button" 
                  aria-label="행복"
                  className="text-3xl border-2 border-neutral-100 bg-neutral-100 rounded-full p-2 cursor-pointer"
                >😊</button>
              </SwiperSlide>
              {/* active */}
              <SwiperSlide>
                <button 
                  type="button" 
                  aria-label="행복"
                  className="text-3xl border-2 border-neutral-100 active:border-amber-400 bg-neutral-100 rounded-full p-2 cursor-pointer"
                >😊</button>
              </SwiperSlide>
            </Swiper>
          </div>
          
          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold tracking-wide rounded-md shadow-md py-2.5 mt-3.75 transition-colors duration-250 cursor-pointer"
          >오늘의 기분 저장</button>
        </form>
      }

      {/* 메모 입력 */}
      {isMemoFormVisible && 
        <form className="mt-5">
          <textarea
            className="w-full h-24 rounded-md border p-2.5 resize-none"
            placeholder="오늘의 기분에 대한 메모를 입력해주세요."
          ></textarea>

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold tracking-wide rounded-md shadow-md py-2.5 mt-1.25 transition-colors duration-250 cursor-pointer"
          >오늘의 메모 저장</button>
        </form>
      }
    </div>
  )
}

export default MoodForm