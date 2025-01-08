import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userRole: "ROLE_PATIENT", 
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:8181/api/auth/signup", formData);

      // Assuming the response contains the token
      const { token, role, fullname ,userId} = response.data;
      console.log(response.data);
      localStorage.setItem("role", role); // Save role in localStorage
      localStorage.setItem("username", fullname);
      setSuccess("Account created successfully!");

      // Navigate to the appropriate page based on role
      if (role === "ROLE_PATIENT") {
        
        localStorage.setItem("jwt", token);
          
        localStorage.setItem("patientId", userId);
        navigate("/create-patient");
      } else if (role === "ROLE_DOCTOR") {
        
        localStorage.setItem("doctorjwt", token);
        localStorage.setItem("doctorId", userId);
        navigate("/create-doctor");
      } else if (role === "ROLE_PHARMACIST") {
        
        localStorage.setItem("storejwt", token);
          
        localStorage.setItem("storeId", userId);
        navigate("/medical-store-dashboard");
      } else {
        setError("Unknown role. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-blue-700 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-blue-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-blue-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="userRole" className="block text-blue-700 font-medium">
              Role
            </label>
            <select
              id="userRole"
              name="userRole" // Changed name to `userRole`
              value={formData.userRole}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
              required
            >
              <option value="ROLE_PATIENT">Patient</option>
              <option value="ROLE_DOCTOR">Doctor</option>
              <option value="ROLE_PHARMACIST">Medical Store</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-500">{success}</p>}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline hover:text-blue-800 transition duration-300"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
