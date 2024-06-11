import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useCookies } from "react-cookie";
import { FaToggleOn } from "react-icons/fa";
import { IoToggleOutline } from "react-icons/io5";
import { ModeStand } from "../hook/zustand";

const AdminNavbar = () => {
  // const [cookies] = useCookies(["admin_token"]);
  const [adminCookies, setAdminCookies] = useCookies(["admin_token"]);
  const [darkMode, setDarkMode] = useState(false);
  const setTheme = ModeStand((state) => state.changeTheme);
  const theme = ModeStand((state) => state.theme);

  const handleDarkMode = () => {
    // console.log("toggle clicked");
    setDarkMode(!darkMode);
    setTheme(theme === "light" ? "dark" : "light");
    // console.log(theme);
  };

  return (
    <div
      className={`w-[100%] z-50  overflow-hidden fixed top-0 left-0 flex justify-between  items-center text-[#2C3CCF] px-6 py-3 bg-color bg-white  border-blue-500 border-b-2   ${
        theme === "light" ? "" : "dark:bg-gray-700 text-white "
      }`}
    >
      <div className="text-3xl font-bold cursor-pointer pl-2">
        <Link to="/" className="logo font-Dancing">
          Babichulo
        </Link>
      </div>

      <div className="flex gap-2">
        {darkMode ? (
          <button onClick={handleDarkMode} className="">
            <IoToggleOutline className={` rounded-xl w-[25px] h-[25px]  `} />
          </button>
        ) : (
          <button onClick={handleDarkMode} className="">
            <FaToggleOn className={`text-red w-[25px] h-[25px]  `} />
          </button>
        )}
        {adminCookies["admin_token"] !== undefined ? (
          <div
            className={`text-[#2C3CCF] text-lg  ${
              theme === "light" ? "" : "dark:bg-gray-700 text-white "
            }`}
          >
            {adminCookies["admin_token"]}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
