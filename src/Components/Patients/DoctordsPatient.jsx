import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import johnImage from "../../Images/doc1.jpeg";
import PatientNavbar from "../NavBar/PatientNavbar";
import { useTranslation } from "react-i18next";
import axios from "axios"; // Import axios for API calls

const DoctorsPage = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate(); // useNavigate for navigation

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    axios
      .get("http://localhost:8181/api/doctor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const handleConsultation = (doctorId, patientId) => {
    const token = localStorage.getItem("jwt");
    const consultationData = {
      patientId: patientId,
      doctorId: doctorId,
      date: new Date().toISOString().split("T")[0], // Today's date
      diagnosis: "Pending", // Default diagnosis
    };

    axios
      .post("http://localhost:8181/api/consultation/create", consultationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        // navigate("/consultation/waiting-time", { state: { doctorId, patientId } });
      })
      .catch((error) => console.error("Error creating consultation:", error));
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filterSpecialty || doctor.specialization === filterSpecialty)
  );

  const uniqueSpecialties = [...new Set(doctors.map((doctor) => doctor.specialization))];

  const handleOnDoctorClick = (status, id) => {
    if (status) {
      navigate(`/${id}/patientList`);
    } else {
      navigate("/appointment/form"); // Navigate to appointment form if doctor is offline
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        position: "relative",
        backgroundImage: 'url("https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg3MC10YW5nLTMxXzEuanBn.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <PatientNavbar />
      <header
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#007bff",
          color: "white",
        }}
      >
        <h1>{t("Find Your Doctor")}</h1>
        <p>{t("Search for the best specialists around you")}</p>
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: "20px",
          gap: "20px",
        }}
      >
        <input
          type="text"
          placeholder={t("Search by name")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            width: "250px",
          }}
        />
        <select
          value={filterSpecialty}
          onChange={(e) => setFilterSpecialty(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            width: "200px",
          }}
        >
          <option value="">{t("All Specialties")}</option>
          {uniqueSpecialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
          alignItems: "center",
        }}
      >
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              textAlign: "center",
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease",
              maxWidth: "300px",
              width: "100%",
              padding: "15px",
              backgroundColor: "#fff",
              position: "relative",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => handleOnDoctorClick(doctor.status, doctor.id)} // Update function here
          >
            {doctor.status ? (
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "green",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
              >
                {t("Online")}
              </span>
            ) : (
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
              >
                {t("Offline")}
              </span>
            )}

            <img
              src={doctor.imageUrl || johnImage}
              alt={doctor.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                margin: "0 auto",
                cursor: doctor.status ? "pointer" : "not-allowed",
              }}
              onClick={() =>
                doctor.status &&
                handleConsultation(doctor.id, doctor.patientQueue[0]) // Use the first patient in queue
              }
            />
            <div style={{ padding: "15px" }}>
              <h2 style={{ color: "#007bff", margin: "10px 0" }}>{doctor.name}</h2>
              <p style={{ margin: "5px 0", fontSize: "1rem" }}>
                <strong>{t("Specialization")}:</strong> {doctor.specialization}
              </p>
              <p style={{ margin: "5px 0", fontSize: "1rem" }}>
                <strong>{t("Phone")}:</strong> {doctor.phone}
              </p>
              <p style={{ margin: "5px 0", fontSize: "1rem" }}>
                <strong>{t("Email")}:</strong> {doctor.email}
              </p>
              <p style={{ margin: "5px 0", fontSize: "1rem" }}>
                <strong>{t("Patients Waiting")}:</strong> {doctor.patientQueue?.length || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
