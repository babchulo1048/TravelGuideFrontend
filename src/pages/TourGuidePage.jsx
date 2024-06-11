import React, { useEffect, useState } from "react";
import GuideSidebar from "../components/GuideSidebar";
import GuideNavbar from "../components/GuideNavbar";
import { ModeStand } from "../hook/zustand";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../apiConfig";

const TourGuidePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = ModeStand((state) => state.theme);
  const [guideIdCookies, setGuideIdCookies] = useCookies(["guide_id_token"]);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  const guideId = guideIdCookies["guide_id_token"];

  console.log("guideID:", guideId);

  useEffect(() => {
    const fetchGuideId = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/guide/specific/${guideId}`
        );
        // console.log("response:", response.data);
        // setGuideIdCookies("guide_id_token", response.data.guideId);

        if (response.data.status === "ban") {
          // alert("sorry you are banned");
          setStatus(true);
          setTimeout(() => navigate("/"), 3000);
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching guide ID:", error);
      }
    };

    fetchGuideId();
  }, [guideId]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (status) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Your account has been banned.
          </h1>
          <p className="mb-4">
            You will be redirected to the homepage shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={"font-Roboto dark"}>
      <GuideNavbar />
      <div className="flex h-screen">
        <GuideSidebar open={sidebarOpen} onToggle={handleSidebarToggle} />

        <div
          className={`flex-1 p-8 bg-white mt-10 h- ${
            theme === "light" ? "" : "dark:bg-gray-700 text-white "
          } ${
            sidebarOpen ? "ml-[2rem] sm:mx-[1rem]" : " ml-[1.5rem] sm:ml-20"
          }`}
        >
          Tour Guide Page
          {/* <div className="w-[100%] flex sm:flex-col flex-row sm:justify-center gap-4">
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default TourGuidePage;
