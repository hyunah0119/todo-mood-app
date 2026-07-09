import { useState } from "react";
import { Dayjs } from "dayjs";

import { useAddMood } from "@/hooks/useMood";

import MoodForm from "./MoodForm";
import MemoForm from "./MemoForm";
import MoodItems from "./MoodItems";
import MemoItems from "./MemoItems";

interface MoodListProps {
  isMoodData: boolean | undefined;
  isMemoData: boolean | undefined;
  selectedDate: Dayjs;
}

const MoodList = ({ selectedDate, isMoodData, isMemoData }: MoodListProps) => {
  const [isMoodFormVisible, setIsMoodFormVisible] = useState(false);
  const [isMemoFormVisible, setIsMemoFormVisible] = useState(false);

  const { mutate: addMood } = useAddMood();


  const handleToggleMoodForm = () => {
    setIsMoodFormVisible(prev => !prev);
    setIsMemoFormVisible(false);
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
          isMoodData={isMoodData}
        />
        <MoodItems 
          isMoodData={isMoodData}
        />
      </div>
      {isMoodData &&
        <div className="mt-7.5">
          <MemoForm 
            isMemoFormVisible={isMemoFormVisible} 
            onToggleMemoForm={handleToggleMemoForm} 
            isMemoData={isMemoData}
          />
          <MemoItems 
            isMemoData={isMemoData}
          />
        </div>
      }
    </div>
  )
}

export default MoodList