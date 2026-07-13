import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import { Outlet } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'

const MainLayout = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`${isDarkMode ? 'dark' : ''} font-pretendard font-light text-[#333]`}>
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 flex justify-center dark:text-white">
        <div className="w-full max-w-107.5 h-dvh min-h-0 flex flex-col bg-white dark:bg-neutral-900 overflow-hidden relative">
          <Header />
          <div className="flex flex-1 min-h-0 w-full flex-col overflow-hidden">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainLayout