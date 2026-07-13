type MemoItemsProps = {
  memo: string | undefined;
}

const MemoItems = ({ memo }: MemoItemsProps) => {
  return (
    <>
      {memo ? (
        <div className="flex items-center justify-between rounded-md shadow-md p-2.5 relative">
          <textarea 
            className="w-full h-full text-sm resize-none outline-0 bg-transparent p-2.5"
            disabled
            value={memo}
          ></textarea>
        </div>
      ) : (
        <div className="mt-5 text-center text-sm">
          오늘의 감정 메모가 아직 기록되지 않았습니다.<br/>
          오늘의 감정 메모를 작성해보세요.
        </div>
      )}
    </>
  )
}

export default MemoItems