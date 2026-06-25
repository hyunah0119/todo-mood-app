import SideMenu from "./SideMenu"
import { useThemeStore } from '@/store/themeStore'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Header = () => {
  const { isDarkMode } = useThemeStore();
  
  return (
    <div className='shrink-0 w-full'>
      <div className="w-full h-12.5 border-b border-gray-300 flex justify-between items-center px-5">
        <button className='cursor-pointer'>
          {isDarkMode ? (<MdLightMode className='text-white text-lg' />) : (<MdDarkMode className='text-lg' />)}
        </button>

        <SideMenu />
      </div>
    </div>
  )
}

export default Header