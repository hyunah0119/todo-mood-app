import { MoodOptions, type MoodKey } from '@/types/mood'
import { useAddMood, useUpdateMood, useDeleteMood } from '@/hooks/useMood';
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
  onCloseMoodForm: () => void;
  isMoodData: boolean | undefined;
  selectedMood: MoodKey | null;
  onSelectedMood: (mood: MoodKey | null) => void;
  isEditingMood: boolean;
  setIsEditingMood: (isEditingMood: boolean) => void;
}

const MoodForm = ({ isMoodFormVisible, onToggleMoodForm, onCloseMoodForm, isMoodData, selectedMood, onSelectedMood, isEditingMood, setIsEditingMood }: MoodFormProps) => {
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();
  const { mutate: addMood } = useAddMood();
  const { mutate: updateMood } = useUpdateMood();
  const { mutate: deleteMood } = useDeleteMood();

  // mood 수정 모드 진입
  const handleEditMood = () => {
    if (!isMoodFormVisible) {
      onToggleMoodForm();
    }
    setIsEditingMood(true);
  }

  // mood 추가
  const handleAddMood = () => {
    if (selectedMood) {
      addMood({
        user_name: userName,
        date: selectedDate.format('YYYY-MM-DD'),
        mood: selectedMood
      },
      {
        onSuccess: () => {
          onCloseMoodForm();
          onSelectedMood(null);
        },
        onError: (error) => {
          console.error('에러 발생 : ', error);
        }
      }
    );
    }
  }

  // mood 수정
  const handleUpdateMood = () => {
    if (selectedMood) {
      updateMood({
        mood: selectedMood
      },
      {
        onSuccess: () => {
          onCloseMoodForm();
          onSelectedMood(null);
          setIsEditingMood(false);
        },
        onError: (error) => {
          console.error('에러 발생 : ', error);
        }
      });
    }
  }

  // mood 삭제
  const handleDeleteMood = () => {
    const isConfirmed = confirm('오늘의 기분 및 메모가 삭제됩니다. 삭제하시겠습니까?');

    if (!isConfirmed) return;

    deleteMood(undefined, {
      onSuccess: () => {
        onCloseMoodForm();
        onSelectedMood(null);
        setIsEditingMood(false);
      },
      onError: (error) => {
        console.error('에러 발생 : ', error);
      }
    });
  }

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm tracking-wide font-medium text-neutral-400">오늘의 기분</h3>

        <div className="flex items-center gap-5">
          {isMoodData ? (
            <>
              <EditButton 
                ariaLabel={isEditingMood ? "기분 저장" : "기분 수정"}
                onClick={isEditingMood ? handleUpdateMood : handleEditMood}
              >
                {isEditingMood ? <TbMoodCheck /> : <TbMoodEdit />}
              </EditButton>
              <EditButton 
                ariaLabel="기분 삭제"
                onClick={handleDeleteMood}
                disabled={isEditingMood}
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