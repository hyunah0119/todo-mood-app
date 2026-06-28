import { useEffect } from "react";
import { supabase } from "@/supabase/client";

import TodayMoodCard from "@/components/todo/TodayMoodCard"
import DateSelector from "@/components/todo/DateSelector"
import TodoForm from "@/components/todo/TodoForm"
import TodoToolbar from "@/components/todo/TodoToolbar"
import TodoList from "@/components/todo/TodoList"

const Todo = () => {
  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*");

      console.log(data);
      console.log(error);
    };

    test();
  }, []);

  return (
    <div className="w-full h-full py-2 px-5">
      <TodayMoodCard />
      <DateSelector />
      <TodoForm />
      <TodoToolbar />
      <TodoList />
    </div>
  )
}

export default Todo