import React from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div>
          <img
            className="w-16 p-2 cursor-pointer"
            src="./images/logo.png"
            alt="Company logo"
          />
        </div>
        <div
          className={`nav-links duration-500 md:static absolute bg-white dark:bg-gray-800 text-gray-800 dark:text-white md:text-black focus:ring-4  md:min-h-fit min-h-[60vh] left-0 ${isOpen ? "top-[9%]" : "top-[-100%]"} md:w-auto w-full flex items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <a className="hover:text-gray-500" href="./">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="/pixslip">
                Betting
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                How it works
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="/admin_panel">
                Admin Panel
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
            Sign in
          </button>
          {isOpen ? (
            <IoMdClose
              className="text-3xl cursor-pointer md:hidden text-white"
              onClick={onToggleMenu}
            />
          ) : (
            <IoMdMenu
              className="text-3xl cursor-pointer md:hidden text-white"
              onClick={onToggleMenu}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
