import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"
import { Outlet } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import { useEffect, useState } from "react"

const MainLayout = () => {
  const { isDarkMode } = useThemeStore();
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);

  useEffect(() => {
    const setAppHeight = () => {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${viewportHeight}px`);
    }

    setAppHeight();

    window.addEventListener("resize", setAppHeight);
    window.visualViewport?.addEventListener("resize", setAppHeight);

    return () => {
      window.removeEventListener("resize", setAppHeight);
      window.visualViewport?.removeEventListener("resize", setAppHeight);
    }
  }, []);

  useEffect(() => {
    const isTextEntryElement = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;

      if (target.matches("textarea, select, [contenteditable='true']")) return true;

      if (target instanceof HTMLInputElement) {
        return !["button", "checkbox", "radio", "reset", "submit"].includes(target.type);
      }

      return false;
    }

    const handleFocusIn = (event: FocusEvent) => {
      if (isTextEntryElement(event.target)) {
        setIsTextInputFocused(true);
      }
    }

    const handleFocusOut = () => {
      window.setTimeout(() => {
        setIsTextInputFocused(isTextEntryElement(document.activeElement));
      }, 150);
    }

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
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
          {!isTextInputFocused && <Footer />}
        </div>
      </div>
    </div>
  )
}

export default MainLayout