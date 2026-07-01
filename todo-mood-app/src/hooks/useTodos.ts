import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos } from '@/services/todo'
import { addTodos } from "@/services/todo";


// 조회
export const useTodos = (userName:string, date:string) => {
  return useQuery({
    queryKey : ["todos", userName, date],
    queryFn : () => getTodos(userName, date),
    enabled: !!userName && !!date,
  });
}

// 추가
type AddTodoParams = {
  user_name: string;
  date: string;
  text: string;
  completed: boolean;
  order_index: number;
};

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