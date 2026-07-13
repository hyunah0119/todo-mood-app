import type { MoodKey } from '@/types/mood';
import { MoodOptions } from '@/types/mood';

type MoodItemsProps = {
  selectedMood: MoodKey | null;
}

const MoodItems = ({ selectedMood }: MoodItemsProps) => {
  return (
    <>
      {selectedMood ? (
        <div className="flex items-center justify-between rounded-md shadow-md p-2.5 relative">
          <div className="flex items-center gap-5">
            <div className="text-3xl">
              {MoodOptions[selectedMood].emoji}
            </div>
      
            <div>
              <p className="text-lg font-bold tracking-wide font-pretendard">{MoodOptions[selectedMood].text}</p>
              <span className="text-sm text-neutral-500 font-medium">{selectedMood}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 text-center text-sm">
          오늘의 기분이 아직 기록되지 않았습니다.<br/>
          오늘의 기분을 추가해보세요.
        </div>
      )}
    </>
  )
}

export default MoodItems