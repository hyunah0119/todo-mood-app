import { useEffect, useState } from "react";
import TodoListItems from "./TodoListItems";
import { useUpdateTodoOrderIndex } from "@/hooks/useTodos";
import EmptyTodo from "./EmptyTodo";
import type { Todo } from '@/types/todo'
import SortableTodoListItem from "./SortableTodoListItem";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

type FilterType = "all" | "complete" | "incomplete";

interface TodoListProps {
  todos: Todo[];
  filter : FilterType;
  isSortMode : boolean;
}

const TodoList = ({ todos, filter, isSortMode }: TodoListProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [localTodos, setLocalTodos] = useState<Todo[]>(todos);
  const { mutate } = useUpdateTodoOrderIndex();

  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

  // 완료 항목 아래로 재배열
  const handleToggleCompleted = (id:number) => {
    const updateTodos = localTodos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed : !todo.completed,
        };
      }

      return todo;
    });
    
    const incompleteTodos = updateTodos.filter(todo => !todo.completed);
    const completeTodos = updateTodos.filter(todo => todo.completed);

    const reorderedTodos = [...incompleteTodos, ...completeTodos];

    const reorderedWithIndex = reorderedTodos.map((todo, index) => ({
      ...todo,
      order_index : index + 1,
    }));

    setLocalTodos(reorderedWithIndex);
    mutate(reorderedWithIndex)
  }

  const nextIncompleteTodos  = localTodos.filter(todo => !todo.completed);
  const nextCompleteTodos = localTodos.filter(todo => todo.completed);
  const sortedTodos = [...nextIncompleteTodos, ...nextCompleteTodos];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = nextIncompleteTodos.findIndex(todo => todo.id === active.id);
    const newIndex = nextIncompleteTodos.findIndex(todo => todo.id === over.id);

    const reorderedIncompleteTodos = arrayMove(nextIncompleteTodos, oldIndex, newIndex);
    const reorderedTodos = [...reorderedIncompleteTodos, ...nextCompleteTodos];

    const reorderedWithIndex = reorderedTodos.map((todo, index) => ({
      ...todo,
      order_index: index + 1,
    }));

    setLocalTodos(reorderedWithIndex);
    mutate(reorderedWithIndex);
  };
  
  return (
    <div className="mt-5">
      <h3 className="text-sm tracking-wide font-medium text-neutral-400">오늘의 할 일</h3>

      <div className="mt-3.75"> 
        {sortedTodos.length === 0 ? (
          <EmptyTodo filter={filter} />
        ) : (
          <>
            {isSortMode && filter === "all" ? (
              <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={nextIncompleteTodos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
                  {nextIncompleteTodos.map((todo) => (
                    <SortableTodoListItem key={todo.id} id={todo.id}>
                      <TodoListItems
                        id={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        isOpen={openMenuId === todo.id}
                        onToggleMenu={() => setOpenMenuId(openMenuId === todo.id ? null : todo.id)}
                        onCloseMenu={() => setOpenMenuId(null)}
                        onToggleComplete={handleToggleCompleted}
                        isSortMode={isSortMode}
                      />
                    </SortableTodoListItem>
                  ))}
                </SortableContext>
              </DndContext>
            ) : (
              nextIncompleteTodos.map((todo) => (
                <TodoListItems
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  isOpen={openMenuId === todo.id}
                  onToggleMenu={() => setOpenMenuId(openMenuId === todo.id ? null : todo.id)}
                  onCloseMenu={() => setOpenMenuId(null)}
                  onToggleComplete={handleToggleCompleted}
                  isSortMode={isSortMode}
                />
              ))
            )}

            {nextCompleteTodos.map((todo) => (
              <TodoListItems
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                isOpen={openMenuId === todo.id}
                onToggleMenu={() => setOpenMenuId(openMenuId === todo.id ? null : todo.id)}
                onCloseMenu={() => setOpenMenuId(null)}
                onToggleComplete={handleToggleCompleted}
                isSortMode={isSortMode}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default TodoList