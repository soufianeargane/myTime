import { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import { MdFavorite, MdHelp } from "react-icons/md";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [nav, setNav] = useState(false);

  const menuItems = [
    {
      icon: <TbTruckDelivery size={25} className="mr-4" />,
      text: "Dashboard",
      link: "/owner/dash",
    },
    {
      icon: <MdFavorite size={25} className="mr-4" />,
      text: "Products",
      link: "/owner/products",
    },
  ];

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm">
      {/* Left side */}
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={25} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">myTime</h1>
      </div>

      {/* Search Input */}
      <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <AiOutlineSearch size={25} />
        <input
          className="bg-transparent p-2 w-full focus:outline-none"
          type="text"
          placeholder="Search..."
        />
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
          My <span className="font-bold">Time</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-1 text-gray-800">
            {menuItems.map(({ icon, text, link }, index) => {
              return (
                <div key={index} className=" py-4">
                  <li>
                    <Link
                      to={link}
                      className="text-xl flex cursor-pointer  w-[50%] rounded-full  p-2 hover:text-white hover:bg-black"
                    >
                      {icon} {text}
                    </Link>
                  </li>
                </div>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
