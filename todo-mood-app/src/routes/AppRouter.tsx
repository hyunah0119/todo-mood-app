import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"
import Home from "@/pages/Home"
import Todo from "@/pages/Todo"
import Mood from "@/pages/Mood"
import NotFound from "@/pages/NotFound"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/mood" element={<Mood />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter