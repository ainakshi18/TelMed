import React, { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";

const ConsultationCard = ({ consultation }) => {
  const [prescription, setPrescription] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const cardRef = useRef(); // Reference for capturing the component

  useEffect(() => {
    console.log(consultation.prescriptionId);

    // Fetch prescription data
    const fetchPrescription = async () => {
      const token = localStorage.getItem("doctorjwt");
      const response = await fetch(
        `http://localhost:8181/api/prescriptions/${consultation.prescriptionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPrescription(data);
      } else {
        // Handle errors (e.g., unauthorized, not found, etc.)
        console.error("Error fetching prescription:", response.statusText);
      }
    };

    // Fetch doctor name using doctorId
    const fetchDoctorName = async () => {
      const token = localStorage.getItem("doctorjwt");
      const response = await fetch(
        `http://localhost:8181/api/doctor/${consultation.doctorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDoctorName(data.name); // Assuming the response has a 'name' field
      } else {
        console.error("Error fetching doctor info:", response.statusText);
      }
    };

    if (consultation.prescriptionId) {
      fetchPrescription();
    }

    if (consultation.doctorId) {
      fetchDoctorName();
    }
  }, [consultation.prescriptionId, consultation.doctorId]);

  const handleDownload = () => {
    const doc = new jsPDF("p", "pt", "a4");

    // Add the HTML content to the PDF
    doc.html(cardRef.current, {
      callback: (doc) => {
        doc.save(`consultation-${consultation.id}.pdf`);
      },
      x: 10,
      y: 10,
    });
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 mb-4"
      ref={cardRef} // Attach the reference
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Consultation with Dr. {doctorName}
        </h3>
        <span className="text-sm text-gray-500">
          {new Date(consultation.date).toLocaleDateString()}
        </span>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-medium text-gray-700">Diagnosis:</h4>
        <p className="text-gray-600">{consultation.diagnosis}</p>
      </div>

      {prescription && (
        <div className="mb-4">
          <h4 className="text-lg font-medium text-gray-700">Prescription:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            {prescription.medicines.map((medicine, index) => (
              <li key={index}>
                <span className="font-semibold">{medicine.name}</span> -{" "}
                {medicine.quantity} ({medicine.dosage})
              </li>
            ))}
          </ul>
          <p className="text-gray-600">Notes: {prescription.notes}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
          onClick={handleDownload}
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default ConsultationCard;
