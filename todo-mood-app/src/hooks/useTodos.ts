import { useQuery } from "@tanstack/react-query";
import { getTodos } from '@/services/todo'

export const useTodos = (userName:string, date:string) => {
  return useQuery({
    queryKey : ["todos", userName, date],
    queryFn : () => getTodos(userName, date),
    enabled: !!userName && !!date,
  });
}