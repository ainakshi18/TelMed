import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StoreNavbar = () => {
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
      navigate("/medical-store-profile");
  };

  return (
    <nav className="bg-blue-600 bg-opacity-80 text-white py-4 px-6 border rounded">
      <ul className="flex justify-between items-center">
        <li className="text-lg font-bold">Logo</li>
        <div className="flex gap-4 items-center">
          <li>
            <a href="/medical-store-dashboard" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="/Store/Stock" className="hover:text-gray-300">
              Stock
            </a>
          </li>
          <li>
            <a href="/store/PatientRequest" className="hover:text-gray-300">
              Request
            </a>
          </li>
          <li>
            <a href="/store/Orders" className="hover:text-gray-300">
              Orders
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

export default StoreNavbar;
