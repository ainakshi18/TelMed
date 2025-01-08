import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientNavbar from '../NavBar/PatientNavbar';
import axios from 'axios';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState({});
  const navigate = useNavigate();

  const jwtToken = localStorage.getItem('jwt'); // Assuming JWT is stored in localStorage.

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const patientId = localStorage.getItem('patientId'); // Replace with dynamic patient ID if available.
        const response = await axios.get(
          `http://localhost:8181/api/appointments/patient/${patientId}`,
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        setAppointments(response.data);

        // Fetch doctor details for each appointment
        const doctorPromises = response.data.map((appointment) =>
          axios.get(`http://localhost:8181/api/doctor/${appointment.doctorId}`, {
            headers: { Authorization: `Bearer ${jwtToken}` },
          })
        );

        const doctorResponses = await Promise.all(doctorPromises);
        const doctorsMap = doctorResponses.reduce((acc, doctorResponse) => {
          acc[doctorResponse.data.id] = doctorResponse.data.name;
          return acc;
        }, {});
        setDoctors(doctorsMap);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [jwtToken]);

  const handleNavigate = () => {
    navigate('/appointment/form');
  };

  const handleCardClick = (appointmentId, status) => {
    if (status === 'Accepted') {
      navigate(`/video-call/${appointmentId}`);
    }
  };

  return (
    <div className="relative">
      <PatientNavbar />

      {/* Button to navigate to the appointment form */}
      <button
        onClick={handleNavigate}
        className="absolute top-24 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none z-10"
      >
        Book Appointment
      </button>

      <div className="mt-32 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`relative bg-white rounded-lg shadow-lg transform transition duration-300 ${
              appointment.status === 'Pending'
                ? 'cursor-not-allowed hover:scale-100 hover:shadow-none'
                : 'hover:scale-105 hover:shadow-2xl'
            } p-6`}
            onClick={() => handleCardClick(appointment.id, appointment.status)}
          >
            {/* Status Badge */}
            <span
              className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold ${
                appointment.status === 'Pending'
                  ? 'bg-red-500 text-white'
                  : 'bg-green-500 text-white'
              }`}
            >
              {appointment.status}
            </span>

            {/* Appointment Details */}
            <h2 className="text-xl font-bold text-gray-800">{appointment.name}</h2>
            <p className="text-gray-600">Phone: {appointment.phoneNumber}</p>
            <p className="text-gray-600">Age: {appointment.age}</p>
            <p className="text-gray-600">Sex: {appointment.sex}</p>

            {/* Doctor Name */}
            <p className="text-gray-600">
              Doctor: {doctors[appointment.doctorId] || 'Loading...'}
            </p>

            {/* Symptoms */}
            {/* <p className="mt-2 text-gray-600">
              Symptoms: {appointment.symptoms.join(', ')}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientAppointments;
