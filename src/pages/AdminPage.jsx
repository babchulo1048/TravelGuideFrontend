import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";
import API_BASE_URL from "../apiConfig";
import { FaPerson } from "react-icons/fa6";
import { MdSubject } from "react-icons/md";
import ChartComponent from "../chart-component/graph";
import { FaStar } from "react-icons/fa";
import PieChartComponent from "../chart-component/UserPie";
import GuidePieChartComponent from "../chart-component/GuidePie";
import { ModeStand } from "../hook/zustand";

// Utility function to floor the average rating
const getFlooredAverageRating = (rating) => {
  return Math.floor(rating) || 0;
};

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [tourGuides, setTourGuides] = useState([]);
  const [orders, setOrders] = useState([]);
  const theme = ModeStand((state) => state.theme);

  const [topRatedPackages, setTopRatedPackages] = useState([]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${API_BASE_URL}/user/active`);
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchGuide = async () => {
      const response = await axios.get(`${API_BASE_URL}/guide/active`);
      setTourGuides(response.data);
    };

    fetchGuide();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`${API_BASE_URL}/book/detail`);
      setOrders(response.data);
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchTopRatedPackages = async () => {
      const response = await axios.get(`${API_BASE_URL}/package/topRated`);
      setTopRatedPackages(response.data);
    };
    fetchTopRatedPackages();
  }, []);

  return (
    <div className={"font-Roboto"}>
      <AdminNavbar />
      <div className="flex">
        <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />

        <div
          className={`flex-1  pt-8 bg-white mt-8 sm:pl-[3rem] pl-[2.5rem] ${
            theme === "light" ? "" : "dark:bg-gray-700 text-white "
          } ${
            sidebarOpen ? "ml-[2rem] sm:mx-[1rem]" : "sm:ml-[1.5rem] ml-[1rem]"
          }`}
        >
          <div className="flex gap-2 items-start justify-around">
            <div>
              <div className="w-[600px] flex flex-col sm:flex-row   sm:items-center gap-8 my-[2rem] mx-[2rem]">
                <div
                  className={`bg-blue-500 py-6 w-[250px] px-4 text-white flex mr-2 items-center rounded ${
                    theme === "light"
                      ? ""
                      : "dark:bg-gray-700 border-2 border-blue-500  text-white "
                  }`}
                >
                  <div className="flex flex-col mr-2 font-bold">
                    <p>{users.length}</p>
                    <p>Users</p>
                  </div>
                  <FaPerson
                    className={`text-amber-300 text-2xl rounded  cursor-pointer `}
                  />
                </div>
                <div
                  className={`bg-blue-500 py-6 w-[250px] px-4 text-white flex items-center rounded ${
                    theme === "light"
                      ? ""
                      : "dark:bg-gray-700 border-2 border-blue-500  text-white "
                  }`}
                >
                  <div className="flex flex-col mr-2 font-bold">
                    <p>{tourGuides.length}</p>
                    <p>TourGuides</p>
                  </div>
                  <MdSubject
                    className={`text-amber-300 text-2xl rounded cursor-pointer mr-2 `}
                  />
                </div>
                <div
                  className={`bg-blue-500 py-6 w-[250px] px-4 text-white flex items-center rounded ${
                    theme === "light"
                      ? ""
                      : "dark:bg-gray-700 border-2 border-blue-500  text-white "
                  }`}
                >
                  <div className="flex flex-col mr-2 font-bold">
                    <p>{orders.length}</p>
                    <p>Booking Orders</p>
                  </div>
                  <MdSubject
                    className={`text-amber-300 text-2xl rounded cursor-pointer mr-2 `}
                  />
                </div>
              </div>
              <div className="my-2">
                <ChartComponent />
              </div>
            </div>

            <div className="mt-[2rem] mx-[1rem]">
              <h1 className="text-center text-[1.2rem] p-1 font-medium">
                Top Rated Packages
              </h1>
              <div className="border-2 border-blue-500 p-2 ">
                {topRatedPackages.map((item, index) => {
                  const averageRating = getFlooredAverageRating(
                    item.averageRating
                  );
                  return (
                    <div key={index} className="flex gap-2 items-center mx-4">
                      <img
                        src={item.image.url}
                        alt="itemckage"
                        className="w-[40px] h-[40px] object-cover rounded-full"
                      />
                      <div className="flex flex-col ml-4">
                        <h1 className="text-[1rem] font-bold text-gray-700">
                          {item.name}
                        </h1>
                        <p className="text-base text-[1rem] ">
                          Price: {item.price}
                        </p>
                        <p className="flex items-center">
                          {[...Array(averageRating)].map((_, index) => (
                            <FaStar key={index} size={20} color="orange" />
                          ))}
                          <span>({item.averageRating})</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex-col gap-2 items-center mb-4 z-10">
                <PieChartComponent />
                <GuidePieChartComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
