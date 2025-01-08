import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import DoctordsPatient from "./Components/Patients/DoctordsPatient";
import AwarenessPatient from "./Components/Patients/AwarenessPatient";
import MedicalStorePatient from "./Components/Patients/MedicalStorePatient";
import AppointmentsPatient from "./Components/Patients/CreateAppointment";
import LoginPage from "./Components/Auth/LoginPage";
import SignupPage from "./Components/Auth/SignupPage";
import HomePatient from "./Components/Patients/HomePatient";
import FirstAidPatient from "./Components/Patients/FirstAidPatient";
import DoctorProfile from "./Components/Doctors/DoctorProfile";
import PatientProfile from "./Components/Patients/PatientProfile";
import DoctorHome from "./Components/Doctors/DoctorHome";
import DoctorAwareness from "./Components/Doctors/DoctorAwareness";
import DoctorAppointments from "./Components/Doctors/DoctorAppointments";
import DoctorPatientHistory from "./Components/Doctors/DoctorPatientHistory";
import StoreDashboard from "./Components/Store/StoreDashboard";
import StoreProfile from "./Components/Store/StoreProfile";
import StoreStock from "./Components/Store/StoreStock";
import StorePatientRequest from "./Components/Store/StorePatientRequest";
import StoreOrders from "./Components/Store/StoreOrders";
import CreatePatient from "./Components/Patients/CreatePatient";
import StoreDetails from "./Components/Patients/storedetails";
import CreateDoctor from "./Components/Doctors/CreateDoctor";
import SelectDoctor from "./Components/Patients/SelectDoctor";
import PatientAppointments from "./Components/Patients/PatientAppointments";
import VideoCallPage from "./Components/Doctors/VedioCallPage";
import CreatePrescription from "./Components/Doctors/CreatePrescription";

function App() {
  // if ("serviceWorker" in navigator) {
  //   window.addEventListener("load", () => {
  //     navigator.serviceWorker
  //       .register("/sw.js")
  //       .then((registration) => {
  //         console.log("Service Worker registered: ", registration);
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed: ", error);
  //       });
  //   });
  // }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePatient />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/create-patient" element={<CreatePatient />} />
        <Route path="/doctors" element={<DoctordsPatient />} />
        <Route path="/appointment/form" element={<AppointmentsPatient />} />
        <Route path="/create-prescription/:patientId" element={<CreatePrescription />} />
        <Route path="/doctor/select" element={<SelectDoctor />} />
        <Route path="/awareness" element={<AwarenessPatient />} />
        <Route path="/first-aid" element={<FirstAidPatient />} />
        <Route path="/appointments" element={<PatientAppointments />} />
        <Route path="/medical-store" element={<MedicalStorePatient />} />
        <Route path="/stores/:storeId" element={<StoreDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* <Route path="/appointments" element={<AppointmentsDashboard />} /> */}
        <Route path="/appointments/:doctorId" element={<AppointmentsPatient />} />
        <Route path="/video-call/:id" element={<VideoCallPage/>} />
        <Route path="/doctor-dashboard" element={<DoctorHome />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/create-doctor" element={<CreateDoctor />} />
        <Route path="/doctor/awareness" element={<DoctorAwareness />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />}/>
        <Route path="/doctor/patient-history" element={<DoctorPatientHistory />}/>

        <Route path="/medical-store-dashboard" element={<StoreDashboard />} />
        <Route path="/medical-store-profile" element={<StoreProfile />} />
        <Route path="/store/stock" element={<StoreStock />} />
        <Route path="/store/PatientRequest" element={<StorePatientRequest />} />
        <Route path="/store/Orders" element={<StoreOrders />} />
      </Routes>
    </>
  );
}

export default App;
