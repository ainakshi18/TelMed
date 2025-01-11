import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import i18n
import axios from "axios"; // Import axios to make API calls
import Logo from "../../Images/Logo.jpg";

const DoctorNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const [role, setRole] = useState("");
  const [isOnline, setIsOnline] = useState(false); // State for doctor's online/offline status
  const navigate = useNavigate();
  const { i18n } = useTranslation(); // Initialize i18n

  useEffect(() => {
    // Simulate checking for user login (e.g., token or user data in localStorage)
    const token = localStorage.getItem("doctorjwt");
    console.log(token);
    console.log(localStorage.getItem("doctorId"));

    const user = localStorage.getItem("username") || localStorage.getItem("useremail");
    const userRole = localStorage.getItem("role");
    const status = localStorage.getItem("doctorStatus") === "online"; // Retrieve doctor's online/offline status from localStorage

    if (token && user) {
      setIsLoggedIn(true);
      setRole(userRole || ""); // Store the user's role
      setIsOnline(status); // Set the online/offline status
      // Extract initials from username or email
      const initials = user
        .split(" ") // Split by spaces for names
        .map((word) => word[0]) // Take the first letter of each word
        .join("") // Combine into initials
        .toUpperCase();
      setUserInitials(initials);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage); // Change the language
  };

  const handleButtonClick = () => {
    navigate("/doctor-profile"); // Redirect to doctor profile page
  };

  const handleStatusToggle = async () => {
    const newStatus = !isOnline; // Toggle the current status
    setIsOnline(newStatus); // Update the state
    localStorage.setItem("doctorStatus", newStatus ? "online" : "offline"); // Save status in localStorage

    const doctorId = localStorage.getItem("doctorId"); // Get the doctor ID from localStorage
    const token = localStorage.getItem("doctorjwt"); // Get the JWT token from localStorage

    try {
      // Update the doctor's status in the database via API call
      await axios.put(
        `http://localhost:8181/api/doctor/update/${doctorId}`,
        {
          status: newStatus, // Send the boolean value directly
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the JWT token in the Authorization header
          },
        }
      );
      console.log("Doctor's status updated successfully");
    } catch (error) {
      console.error("Error updating doctor's status", error);
    }
  };

  return (
    <nav className="bg-blue-600 bg-opacity-80 text-white py-4 px-6 border rounded">
      <ul className="flex justify-between items-center">
        <li className="text-lg font-bold">
          <img
            src={Logo}
            alt="Logo"
            className="h-20 w-20 object-contain"
          />
        </li>

        <div className="flex gap-4 items-center">
          <li>
            <a href="/doctor-dashboard" className="hover:text-gray-300">
              {i18n.t("Home")}
            </a>
          </li>
          <li>
            <a href="/doctor/awareness" className="hover:text-gray-300">
              {i18n.t("Awareness")}
            </a>
          </li>
          <li>
            <a href="/doctor/appointments" className="hover:text-gray-300">
              {i18n.t("Appointments")}
            </a>
          </li>
          <li>
            <a href="/doctor/patient-history" className="hover:text-gray-300">
              {i18n.t("Patients")}
            </a>
          </li>

          {!isLoggedIn ? (
            <li>
              <a href="/signup" className="hover:text-gray-300">
                {i18n.t("Sign In")}
              </a>
            </li>
          ) : (
            <li>
              <div
                className="flex items-center justify-center bg-blue-800 text-white w-8 h-8 rounded-full cursor-pointer"
                onClick={handleButtonClick}
              >
                {userInitials}
              </div>
            </li>
          )}

          {/* Toggle for online/offline status */}
          <li>
            <div className="flex items-center">
              <span className="mr-2">{isOnline ? "Online" : "Offline"}</span>
              <label
                htmlFor="online-status-toggle"
                className="relative inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="online-status-toggle"
                  className="sr-only"
                  checked={isOnline}
                  onChange={handleStatusToggle} // Toggle handler
                />
                <span className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                <span
                  className={`${
                    isOnline ? "translate-x-5" : "translate-x-0"
                  } absolute left-0.5 top-0.5 w-5 h-5 bg-blue-600 rounded-full transition-transform`}
                ></span>
              </label>
            </div>
          </li>

          <li>
            <select
              className="bg-blue-700 text-white px-2 py-1 rounded"
              onChange={handleLanguageChange}
              defaultValue={i18n.language}
            >
              <option value="en">English</option>
              <option value="mr">मराठी</option>
              <option value="hi">हिंदी</option>
            </select>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default DoctorNavbar;
