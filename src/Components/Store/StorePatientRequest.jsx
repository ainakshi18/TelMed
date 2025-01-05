import React, { useState } from 'react';
import StoreNavbar from '../NavBar/StoreNavbar';
// Sample Data - Patient Requests (Ideally, this would come from a backend)
const requestData = [
  {
    id: 1,
    patientName: 'Alice Johnson',
    location: '123 Medical Street, City',
    medicine: 'Aspirin',
    description: 'Need medication for headache.',
    status: 'Pending',
    timestamp: '2025-01-05T10:30:00Z', // ISO 8601 format
  },
  {
    id: 2,
    patientName: 'Bob Williams',
    location: '456 Health Avenue, City',
    medicine: 'Ibuprofen',
    description: 'Request for fever relief medication.',
    status: 'Pending',
    timestamp: '2025-01-05T11:00:00Z',
  },
  {
    id: 3,
    patientName: 'Charlie Davis',
    location: '789 Wellness Road, City',
    medicine: 'Paracetamol',
    description: 'Need medicine for cold.',
    status: 'Accepted',
    timestamp: '2025-01-04T09:45:00Z',
  },
];

const StorePatientRequestBoard = () => {
  const [requests, setRequests] = useState(requestData);

  const handleRequestStatus = (id, status) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: status } : request
    );
    setRequests(updatedRequests);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format to a readable date-time string
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <StoreNavbar />
      <div className="max-w-4xl mx-auto">
        {/* Patient Request History Header */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Patient Request History</h2>
          <div className="mt-6">
            {requests.length === 0 ? (
              <p>No patient requests yet.</p>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white p-4 border rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{request.patientName}</h3>
                      <p className="text-sm text-gray-600">Location: {request.location}</p>
                      <p className="text-sm text-gray-600">Medicine: {request.medicine}</p>
                      <p className="text-sm text-gray-600">Description: {request.description}</p>
                      <p className="text-sm text-gray-600">Request Time: {formatTimestamp(request.timestamp)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm ${
                          request.status === 'Accepted'
                            ? 'text-green-600'
                            : request.status === 'Rejected'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {request.status}
                      </span>
                      <div className="space-x-2">
                        {request.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleRequestStatus(request.id, 'Accepted')}
                              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRequestStatus(request.id, 'Rejected')}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePatientRequestBoard;
