import React, { useState } from "react";
import GuideNavbar from "./GuideNavbar";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

import { useCookies } from "react-cookie";
import { IoIosLogOut } from "react-icons/io";
import { MdCreditScore } from "react-icons/md";
import { PiExam } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { ModeStand } from "../hook/zustand";

const GuideSidebar = ({ open, onToggle }) => {
  const [guideCookies, setGuideCookies] = useCookies(["guide_token"]);
  const [guideNamecookies, setGuideNameCookies] = useCookies([
    "guide_name_token",
  ]);
  const navigate = useNavigate();
  const theme = ModeStand((state) => state.theme);

  const Logout = () => {
    // setStudentCookies("student_token", "");
    setGuideCookies("guide_token", "");
    // console.log(response.data);

    setGuideNameCookies("guide_name_token", "");
    navigate("/");
  };

  return (
    <div>
      <GuideNavbar />
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
            to="/tourGuidePage"
            className={`text-white text-xl font-semibold hover:text-amber-300  duration-300 ${
              !open && "hidden"
            }`}
          >
            TourGuide
          </Link>
        </div>

        <div className="inline-flex">
          <MdCreditScore
            className={`text-amber-300 text-2xl rounded cursor-pointer mr-2 `}
          />
          <Link
            to="/viewBook"
            className={`text-white font-semibold text-sm hover:text-amber-300  duration-300 ${
              !open && "hidden"
            }`}
          >
            BOOKING ORDER
          </Link>
        </div>
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

export default GuideSidebar;
