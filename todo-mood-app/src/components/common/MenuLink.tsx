import { NavLink } from "react-router-dom";

type MenuLinkProps = {
  children : React.ReactNode;
  to : string;
  onClick? : () => void;
}

const MenuLink = ( {children, to, onClick} : MenuLinkProps ) => {
  return (
    <li className="text-[#666] dark:text-white hover:text-black transition-colors duration-300">
      <NavLink
        to={to}
        onClick={onClick}
        className={({isActive}) => 
          `flex items-center gap-2 border-l-2 py-2 pl-4 pr-4 transition-colors duration-300 box-border
          ${isActive ? 
            'border-amber-400 font-semibold text-black dark:text-white text-lg' : 
            'border-transparent text-gray-500 dark:text-neutral-400 hover:text-black dark:hover:text-white  text-base'
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  )
}

export default MenuLink