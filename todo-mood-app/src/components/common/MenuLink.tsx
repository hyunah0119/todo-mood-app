import { NavLink } from "react-router-dom";

type MenuLinkProps = {
  children : React.ReactNode;
  to : string;
}

const MenuLink = ( {children, to} : MenuLinkProps ) => {
  return (
    <li className="text-[#666] hover:text-black transition-colors duration-300">
      <NavLink
        to={to}
        className={({isActive}) => 
          `flex items-center gap-2 border-l-2 py-2 pl-4 pr-4 transition-colors duration-300 box-border
          ${isActive ? 'border-amber-400 font-semibold text-black text-lg' : 'border-transparent text-gray-500 hover:text-black text-base'}`
        }
      >
        {children}
      </NavLink>
    </li>
  )
}

export default MenuLink