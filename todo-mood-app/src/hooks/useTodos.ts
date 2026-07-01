import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos } from '@/services/todo'
import { addTodos } from "@/services/todo";
import { updateTodoCompleted } from "@/services/todo";
import { deleteTodo } from "@/services/todo";
import { useUserStore } from "@/store/userStore";
import { useSelectedDateStore } from "@/store/selectedDateStore";

type AddTodoParams = {
  user_name: string;
  date: string;
  text: string;
  completed: boolean;
  order_index: number;
};

type UpdateTodoCompletedParams = {
  id: number;
  completed: boolean;
};

type DeleteTodoParams = {
  id: number;
};

// 조회
export const useTodos = (userName:string, date:string) => {
  return useQuery({
    queryKey : ["todos", userName, date],
    queryFn : () => getTodos(userName, date),
    enabled: !!userName && !!date,
  });
}

// 추가
export const useAddTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : (todo:AddTodoParams) => addTodos(todo.user_name, todo.date, todo.text, todo.completed, todo.order_index),
    onSuccess : (_,todo:AddTodoParams) => {
      queryClient.invalidateQueries({ queryKey: ["todos", todo.user_name, todo.date] })
    },
    onError : (error) => {
      console.error('에러 발생 : ', error)
    }
  })
}

// 완료 업데이트
export const useUpdateTodoCompleted = () => {
  const queryClient = useQueryClient();
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();

  return useMutation({
    mutationFn : (todo:UpdateTodoCompletedParams) => updateTodoCompleted(todo.id, todo.completed),
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ["todos", userName, selectedDate.format('YYYY-MM-DD')] })
    },
    onError : (error) => {
      console.error('에러 발생 : ', error)
    }
  })
}

// 삭제
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { userName } = useUserStore();
  const { selectedDate } = useSelectedDateStore();

  return useMutation({
    mutationFn : (todo:DeleteTodoParams) => deleteTodo(todo.id),
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ["todos", userName, selectedDate.format('YYYY-MM-DD')] })
    },
    onError : (error) => {
      console.error('에러 발생 : ', error)
    }
  })
}