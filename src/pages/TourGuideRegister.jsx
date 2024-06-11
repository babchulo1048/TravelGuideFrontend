import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../apiConfig";
import { useCookies } from "react-cookie";
import { FaToggleOn, FaEye, FaEyeSlash } from "react-icons/fa";

const schema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long",
    }),

  email: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  phone: Joi.string().required(),
  website: Joi.string().allow("").optional(),
}).options({ abortEarly: false });

const TourGuideRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    description: "",
    phone: "",
    website: "",
  });
  const [guideNamecookies, setGuideNameCookies] = useCookies([
    "guide_name_token",
  ]);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [guideCookies, setGuideCookies] = useCookies(["guide_token"]);
  const [guideIdCookies, setGuideIdCookies] = useCookies(["guide_id_token"]);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validateAsync(formData, { abortEarly: false });
      const response = await axios.post(
        `${API_BASE_URL}/guide/register`,
        formData
      );
      console.log(response.data);
      toast.success("TourGuide created Successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        location: "",
        description: "",
        phone: "",
        website: "",
      });

      if (response.status === 201) {
        setGuideCookies("guide_token", response.data);
        // console.log(response.data);

        setGuideNameCookies("guide_name_token", response.data.name);

        setGuideIdCookies("guide_id_token", response.data.id);

        navigate("/viewBook");
      }

      //   navigate("/adminPage");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // Server validation error
        setErrors({ email: ex.response.data });
      } else if (ex?.details) {
        // Extract the validation errors from the Joi validation error
        const validationErrors = {};
        ex.details.forEach((error) => {
          validationErrors[error.context.key] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center md:mt-20 mt-24 py-[1.5rem] z-10">
        <h2 className="text-3xl font-bold mb-4 text-gray-700 font-Roboto">
          TourGuide Registration
        </h2>
        <form className="w-3/4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
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
            {errors.name && <div className="text-red-500">{errors.name}</div>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
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
            {errors.description && (
              <div className="text-red-500">{errors.description}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="website"
            >
              website (optional)
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="website"
              type="text"
              name="website"
              value={formData.website}
              placeholder="Enter your website (if any)"
              onChange={handleChange}
            />
            {/* {errors.website && (
              <div className="text-red-500">{errors.website}</div>
            )} */}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="number"
              name="phone"
              value={formData.phone}
              placeholder="Enter your phone"
              onChange={handleChange}
            />
            {errors.phone && <div className="text-red-500">{errors.phone}</div>}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <Link className="font-sm ml-12 text-blue-500 mt-16" to="/">
            Login
          </Link>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default TourGuideRegister;
