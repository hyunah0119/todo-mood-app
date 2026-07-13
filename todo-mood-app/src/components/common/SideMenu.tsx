import MenuLink from './MenuLink';
import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore'
import { useNavigate } from 'react-router-dom';

import { IoMenu } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbMoodTongueWink2 } from "react-icons/tb";
import { CiBoxList } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

type HeaderProps = {
  menuOpen : boolean;
  onClick : () => void;
  onClose : () => void;
  userName : string;
}

const SideMenu = ({ menuOpen, onClick, onClose, userName } : HeaderProps) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const { logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    logout();
    navigate('/')
  }

  return (
    <>
      {/* menu open btn */}
      <button className='cursor-pointer' onClick={onClick}>
        <IoMenu className="text-2xl" />
      </button>

      {/* menuOpen: true */}
      <div 
        className={`absolute inset-0 bg-black dark:bg-neutral-700 transition-opacity duration-250 z-100 ${menuOpen ? "opacity-60 dark:opacity-80" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      ></div>
      <div 
        className={`absolute top-0 right-0 h-dvh w-80 bg-white dark:bg-neutral-800 flex flex-col justify-between overflow-y-auto pb-[calc(2rem+env(safe-area-inset-bottom))] transition-transform duration-250 ease-in-out z-100
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className='w-full h-12.5 border-b border-gray-300 flex items-center justify-between px-5'>
            <div className='flex items-center gap-1.5 text-base'>
              <FaUserAlt />
              <p>{userName}</p>
            </div>

            {/* close btn */}
            <button className='cursor-pointer' onClick={onClose}>
              <IoClose className='text-xl' />
            </button>
          </div>
  
          <ul className='w-full pt-20 flex flex-col gap-5'>
            <MenuLink to='/todo' onClick={onClose}>
              <CiBoxList /> Todo List
            </MenuLink>
            <MenuLink to='/mood' onClick={onClose}>
              <TbMoodTongueWink2 /> Mood Tracker
            </MenuLink>
          </ul>
        </div>
        
        {/* logout btn */}
        <div className='mt-12.5 self-center'>
          <button 
            className='flex items-center gap-1 text-sm text-[#666] dark:text-neutral-400 hover:text-[#333] dark:hover:text-white 
            font-medium hover:font-bold transition-colors duration-300 cursor-pointer'
            onClick={handleLogout}
          >
            <IoLogOutOutline className='text-lg' />
            로그아웃
          </button>
        </div>
      </div>
    </>
  )
}

export default SideMenu