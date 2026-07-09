import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import EditButton from './EditButton';
import { MoodOptions } from '@/types/mood'
import type { MoodKey } from '@/types/mood'

import { TbMoodPlus } from "react-icons/tb";
import { TbMoodEdit } from "react-icons/tb";
import { TbMoodX } from "react-icons/tb";
import { TbMoodCheck } from "react-icons/tb";

type MoodFormProps = {
  isMoodFormVisible: boolean;
  onToggleMoodForm: () => void;
  isMoodData: boolean | undefined;
}

const MoodForm = ({ isMoodFormVisible, onToggleMoodForm, isMoodData }: MoodFormProps) => {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm tracking-wide font-medium text-neutral-400">오늘의 기분</h3>

        <div className="flex items-center gap-5">
          {isMoodData ? (
            <>
              <EditButton 
                ariaLabel="기분 저장"
                onClick={() => {}}
              >
                <TbMoodCheck />
              </EditButton>
              <EditButton 
                ariaLabel="기분 수정"
                onClick={() => {}}
              >
                <TbMoodEdit />
              </EditButton>
              <EditButton 
                ariaLabel="기분 삭제"
                onClick={() => {}}
              >
                <TbMoodX />
              </EditButton>
            </>
          ) : (
            isMoodFormVisible ? (
              <EditButton 
                ariaLabel="기분 저장"
                onClick={() => {}}
              >
                <TbMoodCheck />
              </EditButton>
            ) : (
              <EditButton 
                ariaLabel="기분 추가"
                onClick={onToggleMoodForm}
              >
                <TbMoodPlus />
              </EditButton>
            )
          )}
        </div>
      </div>

      {/* 기분 선택 */}
      {isMoodFormVisible && 
        <div className="w-full rounded-md shadow-md px-2.5 py-3.75 mt-5">
          <Swiper
            spaceBetween={10}
            slidesPerView={4.5}
          >
            {Object.entries(MoodOptions).map(([key, value]) => (
              <SwiperSlide key={key}>
                <button 
                  type="button" 
                  aria-label={value.text}
                  className="text-3xl border-2 border-neutral-100 active:border-amber-400 bg-neutral-100 rounded-full p-2 cursor-pointer"
                >{value.emoji}</button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    </div>
  )
}

export default MoodForm