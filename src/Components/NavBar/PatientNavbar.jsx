import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PatientNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking for user login (e.g., token or user data in localStorage)
    const token = localStorage.getItem("jwt");
    const user = localStorage.getItem("username") || localStorage.getItem("useremail");
    const userRole = localStorage.getItem("role");

    if (token && user) {
      setIsLoggedIn(true);
      setRole(userRole || ""); // Store the user's role
      // Extract initials from username or email
      const initials = user
        .split(" ") // Split by spaces for names
        .map((word) => word[0]) // Take the first letter of each word
        .join("") // Combine into initials
        .toUpperCase();
      setUserInitials(initials);
    }
  }, []);

  const handleButtonClick = () => {
      navigate("/patient-profile");
  };

  return (
    <nav className="bg-blue-600 bg-opacity-80 text-white py-4 px-6 border rounded">
      <ul className="flex justify-between items-center">
        <li className="text-lg font-bold">Logo</li>
        <div className="flex gap-4 items-center">
          <li>
            <a href="/" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="/doctors" className="hover:text-gray-300">
              Doctors
            </a>
          </li>
          <li>
            <a href="/awareness" className="hover:text-gray-300">
              Awareness
            </a>
          </li>
          <li>
            <a href="/first-aid" className="hover:text-gray-300">
              First Aid
            </a>
          </li>
          <li>
            <a href="/medical-store" className="hover:text-gray-300">
              Medical Store
            </a>
          </li>
          <li>
            <a href="/appointments" className="hover:text-gray-300">
              Appointments
            </a>
          </li>

          {!isLoggedIn ? (
            <li>
              <a href="/signup" className="hover:text-gray-300">
                Sign In
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
        </div>
      </ul>
    </nav>
  );
};

export default PatientNavbar;
