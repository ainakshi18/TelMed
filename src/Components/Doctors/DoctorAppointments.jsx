import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import DoctorNavbar from "../NavBar/DoctorNavbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState({ location: "", disease: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const doctorId = localStorage.getItem("doctorId");
    const jwtToken = localStorage.getItem("doctorjwt");

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8181/api/appointments/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleAccept = async (id) => {
    const time = prompt("Enter the appointment time (e.g., 10 Jan 10am):");
    if (!time) {
      alert("Time is required to accept the appointment.");
      return;
    }

    try {
      const jwtToken = localStorage.getItem("doctorjwt");
      console.log(id)
      const response = await axios.put(
        `http://localhost:8181/api/appointments/${id}`,
        { status: "Accepted", time },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: "Accepted", time }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const jwtToken = localStorage.getItem("doctorjwt");
      await axios.patch(
        `http://localhost:8181/api/appointments/${id}`,
        { status: "Rejected" },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "Rejected" } : appointment
        )
      );
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    return (
      (filter.location === "" ||
        appointment.location?.toLowerCase().includes(filter.location.toLowerCase())) &&
      (filter.disease === "" ||
        appointment.symptoms.some((symptom) =>
          symptom.toLowerCase().includes(filter.disease.toLowerCase())
        ))
    );
  });

  const handlePrescriptionClick = (patientId) => {
    navigate(`/create-prescription/${patientId}`);
  };
  
  return (
    <>
      <DoctorNavbar />
      <div className="min-h-screen bg-gray-50">
        <main className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          </div>

          {/* Filters Section */}
          <div className="mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Filter by Location"
                className="p-2 border rounded"
                value={filter.location}
                onChange={(e) => setFilter({ ...filter, location: e.target.value })}
              />
              <input
                type="text"
                placeholder="Filter by Disease"
                className="p-2 border rounded"
                value={filter.disease}
                onChange={(e) => setFilter({ ...filter, disease: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-lg transition-transform transform hover:-translate-y-1"
              >
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">{appointment.name}</h3>
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Time:</span>
                    <span>{appointment.time || "Not Scheduled"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Symptoms:</span>
                    <span>{appointment.symptoms.join(", ")}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-4">
                    <span className="text-gray-500">Status:</span>
                    <span
                      className={`text-xs font-semibold ${
                        appointment.status === "Accepted"
                          ? "text-green-600"
                          : appointment.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  {appointment.status === "Pending" && (
                    <div className="mt-4 flex gap-4">
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={() => handleAccept(appointment.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={() => handleReject(appointment.id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {appointment.status === "Accepted" && (
                    <div className="mt-4 flex gap-4">
                      <button
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        onClick={() => handlePrescriptionClick(appointment.patientId)}
                      >
                        Prescription
                      </button>
                      <Link
                        to={`/video-call/${appointment.id}`}
                        className="text-blue-500 hover:text-blue-700 mt-4 inline-block text-sm"
                      >
                        Join Video Call
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default DoctorAppointments;
