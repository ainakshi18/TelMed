import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // To access the doctor ID from the URL
import axios from 'axios';

const PatientList = () => {
  const { id } = useParams(); // Get the doctor ID from the URL
  const [waitingTime, setWaitingTime] = useState(null);

  const handleConsultation = () => {
    const token = localStorage.getItem('doctorjwt');
    const consultationData = {
      patientId: '67814d146552664c586bf3d8', // Example patient ID (replace with actual)
      doctorId: id,
      date: new Date().toISOString().split('T')[0], // Today's date
      diagnosis: 'Fever and Cold', // Example diagnosis
    };

    axios
      .post('http://localhost:8181/api/consultation/create', consultationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setWaitingTime(response.data.waitingTime); // Set the waiting time from the response
        console.log('Consultation created:', response.data);
      })
      .catch((error) => {
        console.error('Error creating consultation:', error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Consultation for Doctor ID: {id}</h2>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleConsultation}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Book Consultation
        </button>
      </div>

      {waitingTime && (
        <div className="mt-4 text-center">
          <h3 className="text-xl font-medium mb-2">Waiting Time:</h3>
          <p className="text-lg font-bold text-green-600">{waitingTime}</p>
        </div>
      )}
    </div>
  );
};

export default PatientList;
