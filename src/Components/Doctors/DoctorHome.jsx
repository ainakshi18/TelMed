import React from 'react';
import { Activity, Calendar, Users, Clock } from 'lucide-react';
import DoctorNavbar  from '../NavBar/DoctorNavbar';

const DoctorHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorNavbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Today's Appointments
              </h3>
            </div>
            <p className="text-2xl font-bold">8</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                Total Patients
              </h3>
            </div>
            <p className="text-2xl font-bold">145</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-600" />
                Pending Reports
              </h3>
            </div>
            <p className="text-2xl font-bold">3</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                Average Wait Time
              </h3>
            </div>
            <p className="text-2xl font-bold">12m</p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default DoctorHome;