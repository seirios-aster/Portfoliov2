import { NavLink } from "react-router-dom";
import { profile } from "../constants";

const navItems = [
  { label: "About", route: "/about" },
  { label: "Projects", route: "/projects" },
  { label: "Contact", route: "/contact" },
];

const Navbar = () => (
  <header className='header'>
    <NavLink to='/' aria-label='Home'>
      <span className='shadow-lg rounded-md bg-white p-2 cursor-pointer text-blue-400 font-semibold'>RP</span>
    </NavLink>
    <nav className='flex items-center text-base sm:text-lg gap-4 sm:gap-7 font-medium' aria-label='Primary'>
      {navItems.map((item) => (
        <NavLink
          to={item.route}
          key={item.route}
          className={({ isActive }) => (isActive ? "text-blue-600" : "text-black hover:text-blue-400")}
        >
          {item.label}
        </NavLink>
      ))}
      <a
        href={profile.cv}
        download
        className='hidden sm:inline rounded-lg border border-blue-500 bg-white px-3 py-1 text-sm font-semibold text-blue-600 hover:bg-blue-500 hover:text-white transition'
      >
        CV
      </a>
    </nav>
  </header>
);

export default Navbar;
