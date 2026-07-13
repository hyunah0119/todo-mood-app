import { MoodOptions, type MoodKey } from '@/types/mood'
import { useAddMood } from '@/hooks/useMood';
import { useUserStore } from '@/store/userStore';
import { useSelectedDateStore } from '@/store/selectedDateStore';

import EditButton from './EditButton';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { TbMoodPlus } from "react-icons/tb";
import { TbMoodEdit } from "react-icons/tb";
import { TbMoodX } from "react-icons/tb";
import { TbMoodCheck } from "react-icons/tb";

type MoodFormProps = {
  isMoodFormVisible: boolean;
  onToggleMoodForm: () => void;
  isMoodData: boolean | undefined;
  selectedMood: MoodKey | null;
  onSelectedMood: (mood: MoodKey) => void;
}

const MoodForm = ({ isMoodFormVisible, onToggleMoodForm, isMoodData, selectedMood, onSelectedMood }: MoodFormProps) => {
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();
  const { mutate: addMood } = useAddMood();

  const handleAddMood = () => {
    if (selectedMood) {
      addMood({
        user_name: userName,
        date: selectedDate.format('YYYY-MM-DD'),
        mood: selectedMood
      },
      {
        onSuccess: () => {
          onToggleMoodForm();
        },
        onError: (error) => {
          console.error('에러 발생 : ', error);
        }
      }
    );
    }
  }

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm tracking-wide font-medium text-neutral-400">오늘의 기분</h3>

        <div className="flex items-center gap-5">
          {isMoodData ? (
            <>
              <EditButton 
                ariaLabel="기분 저장"
                onClick={handleAddMood}
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
                onClick={handleAddMood}
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
            {Object.entries(MoodOptions).map(([key, value]) => {
              const moodKey = key as MoodKey;
              const isSelected = selectedMood === moodKey;

              return (
                <SwiperSlide key={key}>
                  <button 
                    type="button"
                    aria-label={value.text}
                    onClick={() => onSelectedMood(moodKey)}
                    className={`text-3xl border-2 rounded-full p-2 cursor-pointer 
                      ${isSelected
                        ? 'border-amber-400 bg-amber-100'
                        : 'border-neutral-100 bg-neutral-100'
                    }`}
                  >
                    {value.emoji}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      }
    </div>
  )
}

export default MoodForm