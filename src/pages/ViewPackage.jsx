import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import API_BASE_URL from "../apiConfig";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { ModeStand } from "../hook/zustand";

const ViewPackage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [updatedPackages, setUpdatedPackages] = useState({});
  const theme = ModeStand((state) => state.theme);
  const [selectedPackage, setSelectedPackage] = useState(null);
  //   const [editModalOpen, setEditModalOpen] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [adminIdCookies, setAdminIdCookies] = useCookies(["admin_id_token"]);

  const adminId = adminIdCookies["admin_id_token"];

  const [formData, setFormData] = useState({
    name: "",
    activities: [],
    location: "",
    description: "",
    price: "",
    admin: adminId,
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/package/detail`);
        // const data = await response.json();
        console.log("packages:", response.data);
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setErrors({ ...errors, [name]: "" });
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

  const handleUpdateClick = (pack) => {
    setShowUpdateModal(true);
    setUpdatedPackages(pack);
    console.log("package", pack);

    setFormData({
      name: pack.name,
      description: pack.description,
      location: pack.location,
      description: pack.description,
      price: pack.price,
      activities: pack.activities,
    });

    // setSelectedFile(pack.image);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

  const AddActivities = () => {
    setFormData({ ...formData, activities: [...formData.activities, ""] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("formData:", formData);
    const { _id, __v, ...modifiedPackage } = updatedPackages;
    modifiedPackage.name = formData.name;
    modifiedPackage.activities = formData.activities;
    modifiedPackage.location = formData.location;
    modifiedPackage.description = formData.description;
    modifiedPackage.price = formData.price;

    console.log("modifiedPackage: ", modifiedPackage);

    const requestedData = new FormData();

    for (const key in modifiedPackage) {
      if (key === "activities") {
        modifiedPackage[key].forEach((activity, index) => {
          requestedData.append(`activities[${index}]`, activity);
        });
      } else {
        requestedData.append(key, modifiedPackage[key]);
      }
    }
    // console.log("iamge:", image);
    if (selectedFile) {
      requestedData.append("image", selectedFile);
    }

    try {
      console.log("requestedData: ", requestedData);

      const response = await axios.put(
        `${API_BASE_URL}/package/${_id}`,
        requestedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("updated packages", response.data);

      const updatedCors = packages.map((pack) => {
        if (pack._id === _id) {
          return response.data;
        } else {
          return pack;
        }
      });

      console.log("updatedCors", updatedCors);

      setPackages(updatedCors);
      setUpdatedPackages(response.data);
      // setShowUpdateModal(false);

      console.log("updated response", response.data);
      toast.success("Package Updated Successfully!");
      // Remove query parameters from URL
      // navigate("/viewStudent");
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleDelete = async (pack) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/package/${pack._id}`
      );
      setPackages((prevPackages) =>
        prevPackages.filter((p) => p._id !== pack._id)
      );
      console.log(response.data);
      toast.success("Package Deleted Successfully!");
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className={"font-Roboto"}>
      <AdminNavbar />
      <div className="flex">
        <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />

        <div
          className={`flex-1  pt-8 bg-white mt-8 sm:pl-[2.2rem] ${
            sidebarOpen ? "ml-[2rem] sm:mx-[1rem]" : "sm:ml-[1.5rem] ml-[1rem]"
          } ${theme === "light" ? "" : "dark:bg-gray-700 text-white "} ${
            sidebarOpen ? "ml-[2rem] sm:mx-[1rem]" : "sm:ml-[1.5rem] ml-[1rem]"
          } min-h-screen`}
        >
          {/* className={` ${showUpdateModal ? "blurred" : ""}`} */}
          <div className="my-4">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mx-8 my-4 ${
                showUpdateModal ? "blurred" : ""
              }`}
            >
              {packages &&
                packages.map((pa, index) => (
                  <div key={index} className="flex flex-col">
                    <img
                      src={pa.image.url}
                      alt="package"
                      className="w-full h-48 object-cover"
                    />
                    <div className="flex justify-between mt-2 items-center">
                      <h1 className="text-xl font-bold">{pa.name}</h1>
                      <p className="text-base">Price: {pa.price}</p>
                    </div>
                    <div className="flex gap-2 mt-2 items-center my-2">
                      <button
                        className="btn bg-blue-500 text-white btn-sm"
                        onClick={() => handleUpdateClick(pa)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error btn-sm text-white"
                        onClick={() => handleDelete(pa)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <Link
              to="/package"
              className="ml-[2rem] bg-blue-500 px-2  rounded-lg  text-white font-semibold text-[1rem] py-[.7rem]"
            >
              <span className="font-bold mr-2">+</span>Add Package
            </Link>
          </div>
          <ToastContainer />
          {showUpdateModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto sm:pt-[15rem] pt-[25rem]">
              <div className="bg-white p-8 rounded shadow-lg transform transition-all duration-300 ">
                <div className="flex-1 items-center mt-8">
                  <h2 className="text-3xl text-gray-700 font-bold mb-4">
                    Update Packages
                  </h2>
                  <form className="w-84" onSubmit={handleUpdate}>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2"
                        htmlFor="name"
                      >
                        Package Name
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Enter name"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2"
                        htmlFor="location"
                      >
                        location
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter Course location"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2"
                        htmlFor="price"
                      >
                        Price
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="price"
                        name="price"
                        value={formData.price}
                        placeholder="Enter your price"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-md font-bold mb-2"
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
                                onChange={(event) =>
                                  handleActivityChange(event, idx)
                                }
                              />
                              {/* {errors[activity] && (
                                <div className="text-red-500 absolute bottom-0 left-0 top-[2.5rem]">
                                  {errors[activity]}
                                </div>
                              )} */}
                            </div>
                          );
                        })}

                      <button
                        className="bg-blue-400 hover:opacity-75 text-white font-bold py-0 px-4 rounded focus:outline-none focus:shadow-outline block m-2 text-[1rem]"
                        onClick={AddActivities}
                        type="button"
                      >
                        <span className="text-[1.5rem] font-bold mr-2">+</span>
                        Add Activities
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
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                      />
                      {/* {errors.image && (
                        <div className="text-red-500">{errors.image}</div>
                      )} */}
                    </div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                  </form>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPackage;

// {
//   selectedPackage && (
//     <div className="fixed z-10 inset-0 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
//         <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <h3 className="text-lg font-bold mb-4">
//               Edit Package: {selectedPackage.name}
//             </h3>
//             <p className="text-base mb-2">Price: {selectedPackage.price}</p>
//             <img
//               src={selectedPackage.image.url}
//               alt="package"
//               className="w-full h-48 object-cover mb-4"
//             />
//             <p className="text-base">
//               Description: {selectedPackage.description}
//             </p>
//             <p className="text-base">location: {selectedPackage.location}</p>
//             <div>
//               <h1>Activities</h1>
//               {selectedPackage &&
//                 selectedPackage.activities &&
//                 selectedPackage.activities.map((activity, index) => (
//                   <p className="text-base" key={index}>
//                     {activity}
//                   </p>
//                 ))}
//             </div>
//             {/* Add more fields as needed */}
//           </div>
//           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//             <button
//               onClick={handleCloseEditModal}
//               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
