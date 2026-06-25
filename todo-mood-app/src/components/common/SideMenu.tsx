import MenuLink from './MenuLink';

import { useThemeStore } from '@/store/themeStore'
import { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbMoodTongueWink2 } from "react-icons/tb";
import { CiBoxList } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

const SideMenu = () => {
  const { toggleTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className='cursor-pointer'>
        <IoMenu className="text-2xl" />
      </button>

      {/* isOpen: true */}
      <div className='w-full bg-black opacity-60 absolute inset-0'></div>
      <div className='w-85 h-screen bg-white absolute top-0 right-0 flex flex-col justify-between pb-8'>
        <div>
          <div className='w-full h-12.5 border-b border-gray-300 flex items-center justify-between px-5'>
            <div className='flex items-center gap-1.5 text-base'>
              <FaUserAlt />
              <p>user name</p>
            </div>
  
            <button className='cursor-pointer'>
              <IoClose className='text-xl' />
            </button>
          </div>
  
          <ul className='w-full pt-20 flex flex-col gap-5'>
            <MenuLink to='/todo'>
              <CiBoxList /> Todo List
            </MenuLink>
            <MenuLink to='/mood'>
              <TbMoodTongueWink2 /> Mood Tracker
            </MenuLink>
          </ul>
        </div>

        <div className='mt-12.5 self-center'>
          <button className='flex items-center gap-1 text-sm text-[#666] hover:text-[#333] font-medium hover:font-bold transition-colors duration-300 cursor-pointer'>
            <IoLogOutOutline className='text-lg' />
            로그아웃
          </button>
        </div>
      </div>
    </>
  )
}

export default SideMenu