import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { IoIosLogOut } from "react-icons/io";
import { MdCreditScore } from "react-icons/md";
import { PiExam } from "react-icons/pi";
import AdminNavbar from "./AdminNavbar";
import { ModeStand } from "../hook/zustand";

const Sidebar = ({ open, onToggle }) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [adminCookies, setAdminCookies] = useCookies(["admin_token"]);
  const navigate = useNavigate();
  const theme = ModeStand((state) => state.theme);
  const Logout = () => {
    // setStudentCookies("student_token", "");
    setCookies("access_token", "");
    // console.log(response.data);

    setAdminCookies("admin_token", "");
    navigate("/");
  };
  return (
    <div>
      <AdminNavbar />
      <div
        className={`flex flex-col gap-4 bg-[#2C3CCF] z-10 opacity-95  h-full p-5  fixed top-[61px]
      ${!open ? "sm:w-20 w-0" : "w-[200px] "}  duration-300 ${
          theme === "light" ? "" : "dark:bg-gray-700 text-white "
        } border-r-2 border-blue-500`}
      >
        <FaArrowLeft
          className={`border border-[#2C3CCF] text-[#2C3CCF] bg-white rounded-full absolute -right-3 cursor-pointer text-xl p-[2px] ${
            !open && "rotate-180"
          }`}
          onClick={onToggle}
        />
        <div className="inline-flex">
          <MdOutlineAdminPanelSettings
            className={`text-amber-300 text-3xl block float-left rounded cursor-pointer mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <Link
            to="/adminPage"
            className={`text-white text-xl font-semibold hover:text-amber-300  duration-300 ${
              !open && "hidden"
            }`}
          >
            Admin
          </Link>
        </div>
        <div className="inline-flex">
          <FaPerson
            className={`text-amber-300 text-2xl rounded  cursor-pointer mr-2`}
          />
          <Link
            to="/viewTourGuide"
            className={`text-white text-sm font-semibold hover:text-amber-300 duration-300
          ${!open && "hidden"}`}
          >
            MANAGE TOURGUIDE
          </Link>
        </div>
        <div className="inline-flex">
          <MdSubject
            className={`text-amber-300 text-2xl  rounded cursor-pointer mr-2 `}
          />
          <Link
            to="/package"
            className={`text-white text-sm font-semibold hover:text-amber-300  duration-300 ${
              !open && "hidden"
            }`}
          >
            PACKAGES
          </Link>
        </div>

        <div className="inline-flex">
          <PiExam
            className={`text-amber-300 text-2xl rounded cursor-pointer mr-2 `}
          />
          <Link
            to="/viewUser"
            className={`text-white font-semibold text-sm hover:text-amber-300  duration-300 ${
              !open && "hidden"
            }`}
          >
            MANAGE USER
          </Link>
        </div>
        {/* <div className="inline-flex">
          <MdCreditScore
            className={`text-amber-300 text-2xl rounded cursor-pointer mr-2 `}
          />
          <Link
            to=""
            className={`text-white font-semibold text-sm hover:text-amber-300  duration-300 ${
              !open && "hidden"
            }`}
          >
            BOOKING ORDER
          </Link>
        </div> */}
        <div className="inline-flex">
          <IoIosLogOut
            className={`text-amber-300 text-2xl rounded cursor-pointer mr-2 `}
          />
          <a
            // to="/adminLogin"
            onClick={Logout}
            className={`text-white font-semibold text-sm hover:text-amber-300 cursor-pointer  duration-300 ${
              !open && "hidden"
            }`}
          >
            LOGOUT
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
