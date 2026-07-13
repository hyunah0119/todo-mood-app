import { useState } from "react";
import { Dayjs } from "dayjs";

import type { MoodKey } from '@/types/mood'

import MoodForm from "./MoodForm";
import MemoForm from "./MemoForm";
import MoodItems from "./MoodItems";
import MemoItems from "./MemoItems";

interface MoodListProps {
  selectedDate: Dayjs;
  mood: MoodKey | undefined;
  memo: string | undefined;
}

const MoodList = ({ selectedDate, mood, memo }: MoodListProps) => {
  const [isMoodFormVisible, setIsMoodFormVisible] = useState(false);
  const [isMemoFormVisible, setIsMemoFormVisible] = useState(false);

  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null);
  const [isEditingMood, setIsEditingMood] = useState(false);

  const [inputMemo, setInputMemo] = useState<string>('');
  const [isEditingMemo, setIsEditingMemo] = useState(false);

  const handleToggleMoodForm = () => {
    setIsMoodFormVisible(prev => !prev);
    setIsMemoFormVisible(false);
  }

  const handleCloseMoodForm = () => {
    setIsMoodFormVisible(false);
  }

  const handleToggleMemoForm = () => {
    setIsMemoFormVisible(prev => !prev);
    setIsMoodFormVisible(false);
  }

  return (
    <div className="mt-7.5">
      <p className="text-lg font-medium">{selectedDate.format('MM월 DD일 (dd)')}</p>

      <div>
        <MoodForm 
          isMoodFormVisible={isMoodFormVisible} 
          onToggleMoodForm={handleToggleMoodForm} 
          onCloseMoodForm={handleCloseMoodForm}
          isMoodData={!!mood}
          selectedMood={selectedMood}
          onSelectedMood={setSelectedMood}
          isEditingMood={isEditingMood}
          setIsEditingMood={setIsEditingMood}
        />
        <MoodItems 
          selectedMood={mood ?? null}
          isEditingMood={isEditingMood}
        />
      </div>
      {mood &&
        <div className="mt-7.5">
          <MemoForm 
            isMemoFormVisible={isMemoFormVisible} 
            onToggleMemoForm={handleToggleMemoForm} 
            isMemoData={!!memo}
            memo={memo}
            inputMemo={inputMemo}
            onInputMemo={setInputMemo}
            isEditingMemo={isEditingMemo}
            setIsEditingMemo={setIsEditingMemo}
          />
          <MemoItems 
            memo={memo}
            isMemoFormVisible={isMemoFormVisible}
            isEditingMemo={isEditingMemo}
          />
        </div>
      }
    </div>
  )
}

export default MoodList