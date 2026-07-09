import EditButton from './EditButton';

import { BiMessageRoundedAdd } from "react-icons/bi";
import { BiMessageRoundedEdit } from "react-icons/bi";
import { BiMessageRoundedX } from "react-icons/bi";
import { BiMessageRoundedCheck } from "react-icons/bi";

type MemoFormProps = {
  isMemoFormVisible: boolean;
  onToggleMemoForm: () => void;
  isMemoData: boolean | undefined;
}

const MoodForm = ({ isMemoFormVisible, onToggleMemoForm, isMemoData }: MemoFormProps) => {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm tracking-wide font-medium text-neutral-400">오늘의 메모</h3>

        <div className="flex items-center gap-5">
          {isMemoData ? (
            <>
              <EditButton 
                ariaLabel="메모 저장"
                onClick={() => {}}
              >
                <BiMessageRoundedCheck />
              </EditButton>
              <EditButton 
                ariaLabel="메모 수정"
                onClick={() => {}}
              >
                <BiMessageRoundedEdit />
              </EditButton>
              <EditButton 
                ariaLabel="메모 삭제"
                onClick={() => {}}
              >
                <BiMessageRoundedX />
              </EditButton>
            </>
          ) : (
            isMemoFormVisible ? (
              <EditButton 
                ariaLabel="메모 저장"
                onClick={() => {}}
              >
                <BiMessageRoundedCheck />
              </EditButton>
            ) : (
              <EditButton 
                ariaLabel="메모 추가"
                onClick={onToggleMemoForm}
              >
                <BiMessageRoundedAdd />
              </EditButton> 
            )
          )}
        </div>
      </div>

      {/* 메모 입력 */}
      {isMemoFormVisible && 
        <div className="mt-5">
          <textarea
            className="w-full h-24 rounded-md border p-2.5 resize-none"
            placeholder="오늘의 기분에 대한 메모를 입력해주세요."
          ></textarea>
        </div>
      }
    </div>
  )
}

export default MoodForm