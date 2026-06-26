import SideMenu from "./SideMenu"
import { useState } from "react";
import { useThemeStore } from '@/store/themeStore'
import { useUserStore } from '@/store/userStore'

import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const { userName } = useUserStore();

  const handleMenuOpen = () => {
    setIsOpen(true)
  }

  const handleMenuClose = () => {
    setIsOpen(false)
  }
  
  return (
    <div className='shrink-0 w-full'>
      <div className="w-full h-12.5 border-b border-gray-300 flex justify-between items-center px-5">
        
        {/* 다크/라이트 모드 버튼 */}
        <button className='cursor-pointer' onClick={toggleTheme}>
          {isDarkMode ? (<MdLightMode className='text-white text-lg' />) : (<MdDarkMode className='text-lg' />)}
        </button>

        {/* 로그인 후에만 보여짐 (userName : true) */}
        {userName &&
          <>
            <div>
              <h3 className="text-xl font-bold tracking-wide">TODAY.</h3>
            </div>

            <SideMenu
              menuOpen={isOpen}
              onClick={handleMenuOpen}
              onClose={handleMenuClose}
              userName={userName}
            />
          </>
        }
      </div>
    </div>
  )
}

export default Header