import React from 'react';
import DoctorNavbar from '../NavBar/DoctorNavbar';

// Dummy data for patient history
const dummyHistory = [
  {
    patient: 'John Doe',
    disease: 'Flu',
    location: 'New York',
    contact: '123-456-7890',
    status: 'Accepted',
    date: '2025-01-06',
    time: '10:00 AM',
  },
  {
    patient: 'Jane Smith',
    disease: 'Cold',
    location: 'Los Angeles',
    contact: '987-654-3210',
    status: 'Rejected',
    date: '2025-01-06',
    time: '11:30 AM',
  },
  {
    patient: 'Sam Brown',
    disease: 'Skin Rash',
    location: 'Chicago',
    contact: '555-123-4567',
    status: 'Called',
    date: '2025-01-07',
    time: '02:00 PM',
  },
  {
    patient: 'Alice Green',
    disease: 'Fever',
    location: 'San Francisco',
    contact: '444-987-6543',
    status: 'Prescription Given',
    date: '2025-01-08',
    time: '09:00 AM',
  },
];

const PatientHistoryBoard = () => {
  return (
    <div>
      {/* Navbar */}
      <DoctorNavbar />

      {/* Main Content */}
      <main className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Patient History Board</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyHistory.length > 0 ? (
            dummyHistory.map((record, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Patient: {record.patient}
                </h3>
                <p>
                  <strong>Disease:</strong> {record.disease}
                </p>
                <p>
                  <strong>Location:</strong> {record.location}
                </p>
                <p>
                  <strong>Contact:</strong> {record.contact || 'Not Provided'}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    className={
                      record.status === 'Accepted'
                        ? 'text-green-600'
                        : record.status === 'Rejected'
                        ? 'text-red-600'
                        : record.status === 'Called'
                        ? 'text-blue-600'
                        : 'text-purple-600'
                    }
                  >
                    {record.status}
                  </span>
                </p>
                <p>
                  <strong>Appointment:</strong> {record.date} at {record.time}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No history available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientHistoryBoard;
