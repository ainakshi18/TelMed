import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../NavBar/PatientNavbar";
import axios from "axios";
import { useTranslation } from "react-i18next";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState({});
  const navigate = useNavigate();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [rating, setRating] = useState(0);
  const jwtToken = localStorage.getItem("jwt"); // Assuming JWT is stored in localStorage.

  
    const { t, i18n } = useTranslation();
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const patientId = localStorage.getItem("patientId");
        const response = await axios.get(
          `http://localhost:8181/api/appointments/patient/${patientId}`,
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        setAppointments(response.data);

        // Fetch doctor details
        const doctorPromises = response.data.map((appointment) =>
          axios.get(
            `http://localhost:8181/api/doctor/${appointment.doctorId}`,
            {
              headers: { Authorization: `Bearer ${jwtToken}` },
            }
          )
        );

        const doctorResponses = await Promise.all(doctorPromises);
        const doctorsMap = doctorResponses.reduce((acc, doctorResponse) => {
          acc[doctorResponse.data.id] = doctorResponse.data.name;
          return acc;
        }, {});
        setDoctors(doctorsMap);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (jwtToken) fetchAppointments();
  }, [jwtToken]);

  const handleNavigate = () => {
    navigate("/appointment/form");
  };

  const handleCardClick = (appointmentId, status) => {
    if (status === "Accepted") {
      navigate(`/video-call/${appointmentId}`);
    }
  };

  const handleRateClick = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowRatingModal(true);
  };

  const handleRatingSubmit = () => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appt) =>
        appt.id === selectedAppointmentId
          ? { ...appt, rating }
          : appt
      )
    );
    setShowRatingModal(false); // Close the modal
    setRating(0); // Reset rating
  };

  return (
    <div className="relative">
      <PatientNavbar />
      <button
        onClick={handleNavigate}
        className="absolute top-36 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none z-10"
      >
        Book Appointment
      </button>

      <div className="mt-32 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`relative bg-white rounded-lg shadow-lg transform transition duration-300 ${
              appointment.status === "Pending"
                ? "cursor-not-allowed hover:scale-100 hover:shadow-none"
                : "hover:scale-105 hover:shadow-2xl"
            } p-6`}
            onClick={() => handleCardClick(appointment.id, appointment.status)}
          >
            <span
              className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold ${
                appointment.status === "Pending"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {appointment.status}
            </span>
            <h2 className="text-xl font-bold text-gray-800">
              {appointment.name}
            </h2>
            <p className="text-gray-600">Phone: {appointment.phoneNumber}</p>
            <p className="text-gray-600">Age: {appointment.age}</p>
            <p className="text-gray-600">Sex: {appointment.sex}</p>
            <p className="text-gray-600">
              Doctor: {doctors[appointment.doctorId] || "Loading..."}
            </p>
            {appointment.status === "Accepted" && (
              <div className="mt-4">
                {appointment.rating ? (
                  <p className="text-yellow-500 font-semibold">
                    Rating: {appointment.rating} / 5
                  </p>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRateClick(appointment.id);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Rate Appointment
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showRatingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Rate Appointment</h3>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowRatingModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRatingSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
