import React, { useState, useEffect } from "react";
import GuideSidebar from "../components/GuideSidebar";
import GuideNavbar from "../components/GuideNavbar";
import API_BASE_URL from "../apiConfig";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { ModeStand } from "../hook/zustand";

const ViewBooking = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [guideIdCookies, setGuideIdCookies] = useCookies(["guide_id_token"]);

  const guideId = guideIdCookies.guide_id_token;
  // console.log("guideId:", guideId);
  const theme = ModeStand((state) => state.theme);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [bookings, setBookings] = useState([]);

  // const handleCloseModal = () => {
  //   setShowModal(!showModal);
  // };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/book/guide/${guideId}`
        );
        // const data = await response.json();
        // console.log("booking:", response.data);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching tour guides:", error);
      }
    };
    fetchBooking();
  }, []);

  const handleStatusChange = (event, bookingId) => {
    const newStatus = event.target.value;
    setSelectedBookingId(bookingId);
    setSelectedStatus(newStatus);
    if (newStatus === "confirm" || newStatus === "cancelled") {
      setShowModal(true);
    } else {
      updateBookingStatus(bookingId, newStatus);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    console.log("bookingId , status", bookingId, status);
    try {
      await axios.put(`${API_BASE_URL}/guide/manageBook/${bookingId}`, {
        status,
      });
      setBookings((prevBookings) => {
        return prevBookings.map((booking) => {
          if (booking._id === bookingId) {
            return {
              ...booking,
              status: status,
            };
          }
          return booking;
        });
      });
      toast.success("Booking Status Updated Successfully!");
      // Update bookings state or re-fetch bookings
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const handleConfirm = () => {
    console.log("confirm clicked");
    updateBookingStatus(selectedBookingId, selectedStatus);
    setShowModal(false);
  };

  const handleCancel = () => {
    console.log("cancel clicked");
    setShowModal(false);
  };

  // Filter bookings by package name
  const filteredBookings = bookings.filter((booking) =>
    booking.package.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={"font-Roboto"}>
      <GuideNavbar />
      <div className="flex">
        <GuideSidebar open={sidebarOpen} onToggle={handleSidebarToggle} />

        <div
          className={`flex-1 p-8 bg-white mt-[3.5rem] min-h-screen ${
            theme === "light" ? "" : "dark:bg-gray-700 text-white "
          }  ${
            sidebarOpen ? "ml-[2rem] sm:mx-[1rem]" : " ml-[1.5rem] sm:ml-20"
          } `}
        >
          <div>
            <input
              type="text"
              placeholder="Search by package name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 px-3 py-2 border text--[1rem] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className={`overflow-x-auto ${showModal ? "blurred" : ""}`}>
            <table className="table table-xs">
              <thead>
                <tr>
                  <th></th>
                  <th
                    className={`${
                      theme === "light" ? "" : "dark:bg-gray-700 text-white "
                    }`}
                  >
                    User
                  </th>
                  <th
                    className={`${
                      theme === "light" ? "" : "dark:bg-gray-700 text-white "
                    }`}
                  >
                    Package
                  </th>
                  <th
                    className={`${
                      theme === "light" ? "" : "dark:bg-gray-700 text-white "
                    }`}
                  >
                    Date
                  </th>
                  {/* <th
                    className={`${
                      theme === "light" ? "" : "dark:bg-gray-700 text-white "
                    }`}
                  >
                    Payment Method
                  </th> */}
                  <th
                    className={`${
                      theme === "light" ? "" : "dark:bg-gray-700 text-white "
                    }`}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  // bookings &&
                  filteredBookings.map((book, index) => (
                    <tr key={book._id}>
                      <th>{index + 1}</th>
                      <td>{book.user._id}</td>
                      <td>{book.package.name}</td>
                      <td>{new Date(book.createdAt).toLocaleString()}</td>

                      {/* <td>
                        {book.method === 0 ? (
                          <span>cash</span>
                        ) : (
                          <span>paypal</span>
                        )}
                      </td> */}
                      <td>
                        <select
                          value={book.status}
                          onChange={(e) => handleStatusChange(e, book._id)}
                          className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                            theme === "light"
                              ? ""
                              : "dark:bg-gray-900 text-white "
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <ToastContainer />
          {/* Confirmation Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              {/* <div className="absolute inset-0 "></div> */}
              <div className="bg-white p-8 rounded shadow-lg">
                <p>Are you sure you want to update the status?</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleConfirm}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 cursor-pointer"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBooking;
