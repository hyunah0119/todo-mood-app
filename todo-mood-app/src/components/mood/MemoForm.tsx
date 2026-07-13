import { useAddMemo, useUpdateMemo, useDeleteMemo } from '@/hooks/useMood';

import EditButton from './EditButton';

import { BiMessageRoundedAdd } from "react-icons/bi";
import { BiMessageRoundedEdit } from "react-icons/bi";
import { BiMessageRoundedX } from "react-icons/bi";
import { BiMessageRoundedCheck } from "react-icons/bi";

type MemoFormProps = {
  isMemoFormVisible: boolean;
  onToggleMemoForm: () => void;
  isMemoData: boolean | undefined;
  memo: string | undefined;
  inputMemo: string;
  onInputMemo: (memo: string) => void;
  isEditingMemo: boolean;
  setIsEditingMemo: (isEditingMemo: boolean) => void;
}

const MemoForm = ({ isMemoFormVisible, onToggleMemoForm, isMemoData, memo, inputMemo, onInputMemo, isEditingMemo, setIsEditingMemo }: MemoFormProps) => {
  const { mutate: addMemo } = useAddMemo();
  const { mutate: updateMemo } = useUpdateMemo();
  const { mutate: deleteMemo } = useDeleteMemo();

  // 메모 수정 모드 진입
  const handleEditMemo = () => {
    onInputMemo(memo ?? '');

    if (!isMemoFormVisible) {
      onToggleMemoForm();
    }
    setIsEditingMemo(true);
  }
  
  // 메모 저장
  const handleSaveMemo = () => {
    if (inputMemo) {
      addMemo({
        memo: inputMemo
      },
      {
        onSuccess: () => {
          onToggleMemoForm();
          onInputMemo('');
        },
        onError: (error) => {
          console.error('에러 발생 : ', error);
        }
      });
    }
  }

  // 메모 수정
  const handleUpdateMemo = () => {
    if (inputMemo) {
      updateMemo({
        memo: inputMemo
      },
      {
        onSuccess: () => {
          if (isMemoFormVisible) {
            onToggleMemoForm();
          }
          setIsEditingMemo(false);
        },
        onError: (error) => {
          console.error('에러 발생 : ', error);
        }
      });
    }
  }

  // 메모 삭제
  const handleDeleteMemo = () => {
    const isConfirmed = confirm('메모가 삭제됩니다. 삭제하시겠습니까?');

    if (!isConfirmed) return;

    deleteMemo(undefined, {
      onSuccess: () => {
        if (isMemoFormVisible) {
          onToggleMemoForm();
        }
        onInputMemo('');
        setIsEditingMemo(false);
      },
      onError: (error) => {
        console.error('에러 발생 : ', error);
      }
    });
  }
  
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm tracking-wide font-medium text-neutral-400">오늘의 메모</h3>

        <div className="flex items-center gap-5">
          {isMemoData ? (
            <>
              <EditButton 
                ariaLabel={isEditingMemo ? "메모 저장" : "메모 수정"}
                onClick={isEditingMemo ? handleUpdateMemo : handleEditMemo}
              >
                {isEditingMemo ? <BiMessageRoundedCheck /> : <BiMessageRoundedEdit />}
              </EditButton>
              <EditButton 
                ariaLabel="메모 삭제"
                onClick={handleDeleteMemo}
                disabled={isEditingMemo}
              >
                <BiMessageRoundedX />
              </EditButton>
            </>
          ) : (
            isMemoFormVisible ? (
              <EditButton 
                ariaLabel="메모 저장"
                onClick={handleSaveMemo}
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
            maxLength={200}
            value={inputMemo}
            onChange={(e) => onInputMemo(e.target.value)}
          ></textarea>
          <p className="text-sm text-neutral-500 font-medium text-right">
            <span className='font-bold text-amber-500'>{inputMemo.length}</span>/200
            </p>
        </div>
      }
    </div>
  )
}

export default MemoForm