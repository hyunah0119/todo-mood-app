import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import { Outlet } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import { useEffect } from "react"

const MainLayout = () => {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    const setAppHeight = () => {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${viewportHeight}px`);
    }

    setAppHeight();

    window.addEventListener("resize", setAppHeight);
    window.visualViewport?.addEventListener("resize", setAppHeight);
    window.visualViewport?.addEventListener("scroll", setAppHeight);

    return () => {
      window.removeEventListener("resize", setAppHeight);
      window.visualViewport?.removeEventListener("resize", setAppHeight);
      window.visualViewport?.removeEventListener("scroll", setAppHeight);
    }
  }, []);

  return (
    <div className={`${isDarkMode ? 'dark' : ''} font-pretendard font-light text-[#333]`}>
      <div className="min-h-(--app-height) bg-neutral-100 dark:bg-neutral-950 flex justify-center dark:text-white">
        <div className="w-full max-w-107.5 h-(--app-height) min-h-0 flex flex-col bg-white dark:bg-neutral-900 overflow-hidden relative">
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