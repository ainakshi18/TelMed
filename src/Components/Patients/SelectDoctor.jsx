import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useTranslation } from "react-i18next";  // Import useTranslation from react-i18next
import johnImage from "../../Images/doc1.jpeg";  // Placeholder image for now

const SelectDoctor = () => {
    const { t } = useTranslation();  // Initialize translation function
    const [search, setSearch] = useState("");
    const [filterSpecialty, setFilterSpecialty] = useState("");
    const [filterLocation, setFilterLocation] = useState("");
    const [doctors, setDoctors] = useState([]);

    // Fetch doctors data from the backend
    useEffect(() => {
      const token = localStorage.getItem("jwt"); // Assuming JWT token is saved in localStorage
      fetch("http://localhost:8181/api/doctor", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setDoctors(data))  // Save the doctor data into state
        .catch((error) => console.error("Error fetching doctors:", error));
    }, []);

    const filteredDoctors = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) &&
        (!filterSpecialty || doctor.specialization === filterSpecialty)
    );

    // Get unique specialties for filtering
    const uniqueSpecialties = [...new Set(doctors.map((doctor) => doctor.specialization))];

    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          minHeight: "100vh", // Ensure full height
          position: "relative",
          backgroundImage: 'url("https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg3MC10YW5nLTMxXzEuanBn.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <PatientNavbar/>
        {/* Header */}
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

        {/* Filters */}
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

        {/* Doctors Grid */}
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
                backgroundColor: "#fff", // Ensure cards have a white background to be visible
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
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
                  <strong>{t("Availability")}:</strong> {doctor.availability.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default SelectDoctor;
