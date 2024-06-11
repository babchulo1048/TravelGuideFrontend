import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../apiConfig";
import { FaToggleOn, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoToggleOutline } from "react-icons/io5";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [adminCookies, setAdminCookies] = useCookies(["admin_token"]);
  const [guideNamecookies, setGuideNameCookies] = useCookies([
    "guide_name_token",
  ]);
  const [guideCookies, setGuideCookies] = useCookies(["guide_token"]);
  const [guideIdCookies, setGuideIdCookies] = useCookies(["guide_id_token"]);
  const [adminIdCookies, setAdminIdCookies] = useCookies(["admin_id_token"]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleDarkMode = () => {
    console.log("toggle clicked");
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/login`,
        formData
      );
      console.log("response & status", response.data, response.status);
      toast.success("Admin Logged In Successfully!");
      setFormData({ password: "", email: "" });

      if (response.status === 200) {
        if (response.data.role === "Admin") {
          setCookies("access_token", response.data);
          setAdminCookies("admin_token", response.data.name);
          setAdminIdCookies("admin_id_token", response.data.id);
          navigate("/adminPage");
        } else if (response.data.role === "TourGuide") {
          setGuideCookies("guide_token", response.data);
          setGuideIdCookies("guide_id_token", response.data.id);
          setGuideNameCookies("guide_name_token", response.data.name);
          navigate("/viewBook");
        }
      }

      setCookies("access_token", response.data);
      setAdminCookies("admin_token", response.data.name);
    } catch (ex) {
      console.log("ex:", ex);
      if (ex.response.status === 401) {
        setErrors({ ...errors, password: "Password Invalid" });
      } else if (ex.response.status === 404) {
        setErrors({ ...errors, email: "Admin Not Found" });
      } else {
        console.log(ex);
      }
    }
  };

  return (
    <div
      className={`${
        darkMode ? "dark:bg-gray-700" : "bg-white "
      } h-screen relative`}
    >
      <Navbar darkMode={darkMode} />
      <div className="flex flex-col items-center md:pt-20 pt-24 ">
        {darkMode ? (
          <button onClick={handleDarkMode} className="">
            <IoToggleOutline
              className={`bg-white rounded-xl w-[25px] h-[25px]  `}
            />
          </button>
        ) : (
          <button onClick={handleDarkMode} className="">
            <FaToggleOn className={`text-red w-[25px] h-[25px]  `} />
          </button>
        )}

        <h2
          className={`text-3xl font-bold mb-4 text-gray-700 font-Roboto ${
            darkMode ? "dark:text-white" : "text-blue-600"
          }`}
        >
          Login
        </h2>
        <form className="w-3/4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block text-gray-700 text-md font-bold mb-2 ${
                darkMode ? "dark:text-gray-300" : "text-gray-700"
              }`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your Email"
              onChange={handleChange}
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </div>

          <div className="mb-4 relative">
            <label
              className={`block text-gray-700 text-md font-bold mb-2 ${
                darkMode ? "dark:text-gray-300" : "text-gray-700"
              }`}
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Enter your password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <Link
            className="font-sm ml-12 text-blue-500 mt-16"
            to="/adminRegister"
          >
            Register
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
