import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useCookies } from "react-cookie";

const Navbar = ({ darkMode }) => {
  const [open, setOpen] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [student, setStudentCookies] = useCookies(["student_token"]);

  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <nav className={'z-100 ${darkMode ? "dark:bg-gray-700" : "bg-white"}'}>
      <div
        className={`w-full flex fixed top-0 left-0 md:flex justify-between  items-center  px-6 py-3 bg-color  text-blue-500 z-60 ${
          darkMode ? "dark:border-white" : "border-blue-500"
        }   border-b-2`}
      >
        <div className="text-3xl font-bold cursor-pointer pl-2">
          <Link
            to="/"
            className={`logo font-Dancing  ${
              darkMode ? "dark:text-white" : "text-blue-600"
            }`}
          >
            BabiCode
          </Link>
        </div>
        <div className="text-3xl sm:text-slate-700 absolute right-8 top-5 hidden sm:block text-[#2C3CCF] cursor-pointer">
          {open ? (
            <FaTimes
              onClick={toggleMenu}
              className={`${darkMode ? "dark:text-white" : "text-blue-600"}`}
            />
          ) : (
            <FiMenu
              onClick={toggleMenu}
              className={`${darkMode ? "dark:text-white" : "text-blue-600"}`}
            />
          )}
        </div>
        <div
          className={
            open
              ? "absolute right-3 flex flex-row sm:flex-col  sm:gap-1 sm:px-4 gap-3 sm:left-0 py-0  sm:py-3 sm:flex  sm:top-[59px] top-[20px] sm:bg-white sm:text-blue-500 text-[1.2rem]"
              : "absolute right-3 sm:hidden flex flex-row text-[#2C3CCF] gap-3 "
          }
        >
          <Link
            //   to={cookies["access_token"] ? "/adminPage" : "/adminLogin"}
            to="/adminRegister"
            className={"text-[#2C3CCF] text-xl"}
          >
            Admin
          </Link>
          <Link
            //   to={student["student_token"] ? "/studentPage" : "/"}
            to="/tourGuide"
            className="text-[#2C3CCF] text-xl "
          >
            TourGuide
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
