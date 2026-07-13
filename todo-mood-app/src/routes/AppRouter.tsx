import { BrowserRouter, Navigate, Outlet, Routes, Route } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"
import Home from "@/pages/Home"
import Todo from "@/pages/Todo"
import Mood from "@/pages/Mood"
import NotFound from "@/pages/NotFound"
import { useUserStore } from "@/store/userStore"

const ProtectedRoute = () => {
  const { userName } = useUserStore();

  if (!userName) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/todo" element={<Todo />}></Route>
            <Route path="/mood" element={<Mood />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter