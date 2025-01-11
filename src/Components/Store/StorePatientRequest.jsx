import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoreNavbar from '../NavBar/StoreNavbar';

const StorePatientRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState({});
  const [medicines, setMedicines] = useState({});
  const storeId = localStorage.getItem('storeId');
  const jwt = localStorage.getItem('jwt');
  const jwtToken = localStorage.getItem('storejwt');

  useEffect(() => {
    // Fetch Medicine Requests from the API
    axios.get(`http://localhost:8181/api/medicine-request/store/${storeId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching medicine requests:', error);
        setLoading(false);
      });
  }, [storeId, jwtToken]);

  useEffect(() => {
    // Fetch Patient and Medicine Data for each request
    requests.forEach((request) => {
      axios.get(`http://localhost:8181/api/patient/${request.patientId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          setPatients((prev) => ({
            ...prev,
            [request.patientId]: response.data,
          }));
        })
        .catch((error) => console.error('Error fetching patient data:', error));

      axios.get(`http://localhost:8181/api/medicines/${request.medicineId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          setMedicines((prev) => ({
            ...prev,
            [request.medicineId]: response.data,
          }));
        })
        .catch((error) => console.error('Error fetching medicine data:', error));
    });
  }, [requests]);

  const handleRequestStatus = (id, status) => {
    axios.put(`http://localhost:8181/api/medicine-request/${id}`, { status }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        setRequests((prev) =>
          prev.map((request) => (request.id === id ? response.data : request))
        );
      })
      .catch((error) => {
        console.error('Error updating request status:', error);
      });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <StoreNavbar />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800">Patient Request History</h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading requests...</p>
          ) : (
            <div className="mt-6">
              {requests.length === 0 ? (
                <p className="text-center text-gray-600">No patient requests yet.</p>
              ) : (
                <div className="space-y-6">
                  {requests.map((request) => {
                    const patient = patients[request.patientId];
                    const medicine = medicines[request.medicineId];

                    return (
                      <div key={request.id} className="bg-white p-5 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-xl text-gray-800">{patient ? patient.name : 'Loading...'}</h3>
                            <p className="text-sm text-gray-600">Location: {patient ? patient.address.city : 'Loading...'}</p>
                            <p className="text-sm text-gray-600">Medicine: {medicine ? medicine.name : 'Loading...'}</p>
                            <p className="text-sm text-gray-600">Description: {medicine ? medicine.description : 'Loading...'}</p>
                            <p className="text-sm text-gray-600">Request Time: {formatTimestamp(request.requestDate)}</p>
                          </div>
                          <div className="flex flex-col items-center gap-4">
                            <span
                              className={`text-sm ${
                                request.status === 'Accepted'
                                  ? 'text-green-600'
                                  : request.status === 'Rejected'
                                  ? 'text-red-600'
                                  : 'text-yellow-600'
                              }`}
                            >
                              {request.status || 'Pending'}
                            </span>
                            {/* {request.status === 'Pending' && ( */}
                              <div className="flex gap-4">
                                <button
                                  onClick={() => handleRequestStatus(request.id, 'Accepted')}
                                  className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleRequestStatus(request.id, 'Rejected')}
                                  className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                >
                                  Reject
                                </button>
                              </div>
                            {/* )} */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePatientRequest;
