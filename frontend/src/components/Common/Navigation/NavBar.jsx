/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import strathFigmaLogo from "@assets/strath.webp"; 
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import content from "../../../../constants";
export default function Navbar() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  function handleMenu() {
    setMenu(!menu);
  }


  function handleLogin() {
    navigate("/login");
  }

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-10 bg-navy">
      <div className="md:flex items-center justify-between bg-navy py-1 md:px-10 shadow-lg bg-blue-900">
        <div className="flex items-center gap-3 lg:ml-16 md:ml-8 ml-5">
          <img
            src={strathFigmaLogo}
            fetchpriority="high" 
            rel="preload"
            alt="Strath figma logo"
            className="lg:h-14 h-10 w-auto rounded-lg cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div
          onClick={handleMenu}
          className="text-3xl absolute right-3 top-3 cursor-pointer text-white md:hidden"
        >
          {menu ? <FaTimes /> : <FaBars />}
        </div>
        <ul
          className={`md:flex md:items-center md:justify-center md:pb-0 pb-12 absolute md:static bg-navy w-full md:w-auto md:pl-0 pl-9 transition-all ease-in-out duration-500 ${
            menu
              ? "bg-blue-900  opacity-100"
              : "left-[-500px] md:opacity-100 opacity-0"
          }`}
        >
          {content.Links.map((link) => (
            
            <li
              className="md:mx-6 my-4 text-white font-[Poppins] cursor-pointer"
              key={link.name}
            >
              <NavLink
                to={link.link}
                className="text-xl hover:text-yellow-400 focus:text-yellow-400"
                
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <li className="md:mx-6 my-4">
            <button
              onClick={handleLogin}
              className="w-32 h-8 bg-yellow-600 hover:bg-yellow-700 text-white border-none rounded-md text-md font-bold cursor-pointer"
            >
              Login!
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
