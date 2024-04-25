/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import strath from "../../assets/strath.webp";
import content from "../../../constants";
import { NavLink } from "react-router-dom";

export default function AdminNavProfile() {
  const navigate = useNavigate();
  const [showProfileCard, setShowProfileCard] = useState(false);

  function handleLogout() {
    sessionStorage.clear();
    navigate("/");
  }

  function handleProfileCard() {
    setShowProfileCard(!showProfileCard);
  }

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-navy">
      <div className="flex items-center justify-between bg-navy py-1 md:px-10 shadow-lg bg-blue-900">
        <img
          src={strath}
          fetchpriority="high"
          rel="preload"
          alt="Strath figma logo"
          className="lg:h-14 ml-20 h-10 w-auto rounded-lg cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center gap-3 relative">
          <div
            className="h-10 w-10 rounded-full overflow-hidden cursor-pointer"
            onClick={handleProfileCard}
          >
            <div className="text-3xl absolute right-12 top-1 cursor-pointer text-white">
              {showProfileCard ? <FaTimes /> : <FaBars />}
            </div>
          </div>
          {showProfileCard && (
            <div className="absolute z-10 right-0 top-20 bg-blue-900 rounded-lg shadow-md w-64 p-4 text-lg font-semibold transition ease-in-out">
              <ul>
                {content.AmdinNavProfile.map((link, index) => (
                  <li
                    key={index}
                    className="md:mx-6 w-full ml-4 my-4 text-white font-[Poppins] cursor-pointer hover:text-yellow-400  focus:text-yellow-400 transition-colors duration-300"
                  >
                    <NavLink to={link.link}>{link.name}</NavLink>
                  </li>
                ))}
                <li className="md:mx-6 my-4 ml-4 text-white font-[Poppins] cursor-pointer">
                  <button
                    onClick={handleLogout}
                    className="w-full h-12 bg-yellow-600 hover:bg-yellow-700 text-white border-none rounded-md text-xl font-bold cursor-pointer transition-colors duration-300"
                  >
                    Logout!
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
