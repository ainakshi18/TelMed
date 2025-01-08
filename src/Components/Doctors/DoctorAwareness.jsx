
import React from 'react';
import { BellRing, Users } from 'lucide-react';
import DoctorNavbar from '../NavBar/DoctorNavbar';
const DoctorAwareness = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorNavbar />
      <main className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <BellRing className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Medical Awareness</h1>
        </div>

        <div className="grid gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5" />
                Public Health Notice
              </h3>
            </div>
            <p className="text-gray-600">
              Stay updated with the latest health guidelines and medical practices.
              Regular updates will be posted here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default DoctorAwareness;