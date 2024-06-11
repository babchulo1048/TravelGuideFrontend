import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import API_BASE_URL from "../apiConfig";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ModeStand } from "../hook/zustand";

const ViewBannedGuide = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = ModeStand((state) => state.theme);
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [tourGuides, setTourGuides] = useState([]);

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/guide/banned`);
        // const data = await response.json();
        console.log("touguide:", response.data);
        setTourGuides(response.data);
      } catch (error) {
        console.error("Error fetching tour guides:", error);
      }
    };
    fetchTourGuides();
  }, []);
  return (
    <div className={"font-Roboto"}>
      <AdminNavbar />
      <div className="flex">
        <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />

        <div
          className={`flex-1 p-8 min-h-screen bg-white mt-8 sm:pl-[2.2rem] ${
            sidebarOpen ? "ml-[1.6rem] sm:mx-[1rem]" : "sm:ml-[1.5rem] ml-20"
          }  ${theme === "light" ? "" : "dark:bg-gray-700 text-white "} ${
            sidebarOpen ? "ml-[2rem] sm:mx-[1rem]" : "sm:ml-[1.5rem] ml-[1rem]"
          }`}
        >
          <div className="flex gap-8 my-4 ml-[3rem]">
            <Link to="/viewTourGuide">Active</Link>
            <Link
              to="/bannedTourGuide"
              className={"text-[1rem]   border-b-4 border-blue-400"}
            >
              Banned
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr
                  className={`${
                    theme === "light" ? "" : "dark:bg-gray-700 text-white "
                  }`}
                >
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>location</th>
                  <th>website</th>
                  <th>phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tourGuides &&
                  tourGuides.map((guide, index) => (
                    <tr key={guide._id}>
                      <th>{index + 1}</th>
                      <td>{guide.name}</td>
                      <td>{guide.email}</td>
                      <td>{guide.location}</td>
                      <td>{guide.website}</td>
                      <td>{guide.phone}</td>
                      <td>
                        {/* Action buttons */}
                        {/* {guide.status + "ned"} */}
                        {/* <button className="btn  btn-sm text-red-500">
                        </button> */}
                        <button className="btn  btn-sm text-red-500">
                          {guide.status + "ned"}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBannedGuide;
