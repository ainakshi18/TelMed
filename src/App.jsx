import React from 'react';
import ReactDOM from 'react-dom';
import {Routes, Route } from 'react-router-dom';
import './App.css'
import DoctordsPatient from './Components/Patients/DoctordsPatient';
import AwarenessPatient from './Components/Patients/AwarenessPatient';
import MedicalStorePatient from './Components/Patients/MedicalStorePatient';
import AppointmentsPatient from './Components/Patients/AppointmentsPatient';
import LoginPage from './Components/Auth/LoginPage';
import SignupPage from './Components/Auth/SignupPage';
import HomePatient from './Components/Patients/HomePatient';
import FirstAidPatient from './Components/Patients/FirstAidPatient';
import DoctorProfile from './Components/Doctors/DoctorProfile';
import PatientProfile from './Components/Patients/PatientProfile';
import DoctorHome from './Components/Doctors/DoctorHome';
import DoctorAwareness from './Components/Doctors/DoctorAwareness';
import DoctorAppointments from './Components/Doctors/DoctorAppointments';
import DoctorPatientHistory from './Components/Doctors/DoctorPatientHistory';
import StoreDashboard from './Components/Store/StoreDashboard';
import StoreProfile from './Components/Store/StoreProfile';
import StoreStock from './Components/Store/StoreStock';
import StorePatientRequest from './Components/Store/StorePatientRequest';
import StoreOrders from './Components/Store/StoreOrders';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePatient/>} />
        <Route path="/patient-profile" element={<PatientProfile/>} />
        <Route path="/doctors" element={<DoctordsPatient/>} />
        <Route path="/awareness" element={<AwarenessPatient/>} />
        <Route path="/first-aid" element={<FirstAidPatient/>} />
        <Route path="/appointments" element={<AppointmentsPatient/>} />
        <Route path="/medical-store" element={<MedicalStorePatient/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />

        <Route path="/doctor-dashboard" element={<DoctorHome/>} />
        <Route path="/doctor-profile" element={<DoctorProfile/>} />
        <Route path="/doctor/awareness" element={<DoctorAwareness/>} />
        <Route path="/doctor/appointments" element={<DoctorAppointments/>} />
        <Route path="/doctor/patient-history" element={<DoctorPatientHistory/>} />

        <Route path="/medical-store-dashboard" element={<StoreDashboard/>} />
        <Route path="/medical-store-profile" element={<StoreProfile/>} />
        <Route path="/store/stock" element={<StoreStock/>} />
        <Route path="/store/PatientRequest" element={<StorePatientRequest/>} />
        <Route path="/store/Orders" element={<StoreOrders/>} />
      </Routes>
     

    </>
  )
}

export default App
