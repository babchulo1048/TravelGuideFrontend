import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import API_BASE_URL from "../apiConfig";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { ModeStand } from "../hook/zustand";

const AddPackage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = ModeStand((state) => state.theme);
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [adminIdCookies, setAdminIdCookies] = useCookies(["admin_id_token"]);

  const adminId = adminIdCookies["admin_id_token"];
  const [formData, setFormData] = useState({
    name: "",
    activities: [],
    location: "",
    description: "",
    price: "",
    admin: adminId,
    itinerary: [],
  });
  // const [itinerary, setItinerary] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleItineraryChange = (idx, field, value) => {
    const updatedItinerary = [...formData.itinerary]; // Get the current itinerary from formData
    updatedItinerary[idx][field] = value; // Update the specific field of the itinerary item
    setFormData({ ...formData, itinerary: updatedItinerary }); // Update the formData state with the updated itinerary
  };

  const addItineraryEntry = () => {
    const updatedItinerary = [...formData.itinerary, { day: "", info: "" }]; // Create a new array with the updated itinerary
    setFormData({ ...formData, itinerary: updatedItinerary }); // Update the formData state with the updated itinerary
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleActivityChange = (event, idx) => {
    const { value } = event.target;
    // const members = formData.members;
    const newActivities = [...formData.activities];
    newActivities[idx] = value;

    setFormData({ ...formData, activities: newActivities });

    // setFormData({ ...formData, members });
  };

  const AddActivities = () => {
    setFormData({ ...formData, activities: [...formData.activities, ""] });
  };

  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();

    console.log("formData:", formData);
    // console.log("iternary:", itinerary);
    // const { name, activities, location, description, price, admin } = formData;

    // Create FormData after validation
    const requestedData = new FormData();
    for (const key in formData) {
      if (key === "activities") {
        formData[key].forEach((activity, index) => {
          requestedData.append(`activities[${index}]`, activity);
        });
      } else if (key === "itinerary") {
        formData[key].forEach((item, index) => {
          requestedData.append(`itinerary[${index}][day]`, item.day);
          requestedData.append(`itinerary[${index}][info]`, item.info);
        });
      } else {
        requestedData.append(key, formData[key]);
      }
    }
    console.log("iamge:", image);
    if (selectedFile) {
      requestedData.append("image", selectedFile);
    }
    try {
      // await schema.validateAsync(requestedData, {
      //   abortEarly: false,
      // });
      // const requestDataObject = Object.fromEntries(requestedData);
      // await schema.validateAsync(requestDataObject, { abortEarly: false });
      // await schema.validateAsync(requestedData, { abortEarly: false });

      console.log("requestData:", requestedData);

      const response = await axios.post(
        `${API_BASE_URL}/package/create`,
        requestedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response.data:", response.data);
      toast.success("Package created Successfully!");
      setSelectedFile(null);
      setFormData({
        name: "",

        activities: [],
        location: "",
        description: "",
        price: "",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      //   navigate("/adminPage");
    } catch (ex) {
      console.log("ex:", ex);
      // if (ex?.details) {
      //   // Extract the validation errors from the Joi validation error
      //   const validationErrors = {};
      //   ex.details.forEach((error) => {
      //     validationErrors[error.context.key] = error.message;
      //   });
      //   setErrors(validationErrors);
      // }
    }
  };

  return (
    <div className={"font-Roboto"}>
      <AdminNavbar />
      <div className="flex">
        <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />

        <div
          className={`flex-1 pt-4 bg-white  sm:pl-[2.2rem] ${
            sidebarOpen ? "ml-[2rem] sm:mx-[1rem]" : "sm:ml-[1.5rem] ml-20"
          }  ${theme === "light" ? "" : "dark:bg-gray-700 text-white "} ${
            sidebarOpen ? "ml-[2rem] sm:mx-[1rem]" : "sm:ml-[1.5rem] ml-[1rem]"
          }`}
        >
          <div className="flex flex-col items-center md:mt-20 mt-24 py-[1.5rem]">
            <div className="flex justify-around mx-4 w-full ">
              <h2
                className={`text-3xl font-bold mb-4 text-gray-700 font-Roboto ${
                  theme === "light" ? "" : "dark:bg-gray-700 text-white "
                }`}
              >
                Add Packages
              </h2>
              <Link
                to="/viewPackage"
                className="bg-blue-500 px-4  rounded-lg text-center py-2 text-white font-semibold"
              >
                View
              </Link>
            </div>
            <form className="w-3/4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className={`block text-gray-700 text-md font-bold mb-2 ${
                    theme === "light" ? "" : "dark:bg-gray-700 text-white "
                  }`}
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  className={`block text-gray-700 text-md font-bold mb-2 ${
                    theme === "light" ? "" : "dark:bg-gray-700 text-white "
                  }`}
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  placeholder="Enter your price"
                  onChange={handleChange}
                />
                {errors.price && (
                  <div className="text-red-500">{errors.price}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  className={`block text-gray-700 text-md font-bold mb-2 ${
                    theme === "light" ? "" : "dark:bg-gray-700 text-white "
                  }`}
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  placeholder="Enter your Location"
                  onChange={handleChange}
                />
                {errors.location && (
                  <div className="text-red-500">{errors.location}</div>
                )}
              </div>
              <div className="mb-4">
                <label
                  className={`block text-gray-700 text-md font-bold mb-2 ${
                    theme === "light" ? "" : "dark:bg-gray-700 text-white "
                  }`}
                  htmlFor="description"
                >
                  description
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  id="description"
                  name="description"
                  value={formData.description}
                  placeholder="Enter your Description"
                  onChange={handleChange}
                />
                {errors.description && (
                  <div className="text-red-500">{errors.description}</div>
                )}
              </div>

              <div className="mb-4">
                {formData.activities &&
                  formData.activities.map((activity, idx) => {
                    return (
                      <div key={idx} className="relative">
                        <input
                          className={
                            "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                          }
                          type="text"
                          placeholder="activities"
                          name="activities"
                          value={activity}
                          onChange={(event) => handleActivityChange(event, idx)}
                        />
                        {errors[activity] && (
                          <div className="text-red-500 absolute bottom-0 left-0 top-[2.5rem]">
                            {errors[activity]}
                          </div>
                        )}
                      </div>
                    );
                  })}

                <button
                  className="bg-blue-400 hover:opacity-75 text-white font-bold py-0 px-4 rounded focus:outline-none focus:shadow-outline block m-2 text-[1rem]"
                  onClick={AddActivities}
                  type="button"
                >
                  <span className="text-[1.5rem] font-bold mr-2">+</span>Add
                  Activities
                </button>
              </div>

              <div className="mb-4">
                {formData.itinerary &&
                  formData.itinerary.map((item, idx) => (
                    <div key={idx}>
                      <input
                        type="text"
                        placeholder="Day"
                        className={
                          "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                        }
                        value={item.day}
                        onChange={(e) =>
                          handleItineraryChange(idx, "day", e.target.value)
                        }
                      />
                      <textarea
                        placeholder="Information"
                        rows="4"
                        className={
                          "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                        }
                        value={item.info}
                        onChange={(e) =>
                          handleItineraryChange(idx, "info", e.target.value)
                        }
                      ></textarea>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={addItineraryEntry}
                  className="bg-blue-400 hover:opacity-75 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline block m-2 text-[1rem]"
                >
                  Add Itinerary Entry
                </button>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="image"
                >
                  Image
                </label>
                <input
                  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    theme === "light" ? "" : "dark:bg-gray-700 text-white "
                  }`}
                  id="image"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                />
                {errors.image && (
                  <div className="text-red-500">{errors.image}</div>
                )}
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create Package
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AddPackage;
