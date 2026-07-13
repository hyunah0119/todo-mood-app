import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";

interface SortableTodoListItemProps {
  id: number;
  children: React.ReactNode;
}

const SortableTodoListItem = ({ id, children }: SortableTodoListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex w-full min-w-0 items-stretch gap-2">
      <button
        ref={setActivatorNodeRef}
        type="button"
        aria-label="할 일 순서 변경"
        className="mb-2 flex w-8 shrink-0 touch-none cursor-grab items-center justify-center rounded-lg bg-neutral-100 text-xl text-neutral-500 active:cursor-grabbing dark:bg-neutral-700 dark:text-neutral-300"
        style={{ touchAction: "none" }}
        {...attributes}
        {...listeners}
      >
        <MdDragIndicator />
      </button>
      <div className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  );
};

export default SortableTodoListItem;