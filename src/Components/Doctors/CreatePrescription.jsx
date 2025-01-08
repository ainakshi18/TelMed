import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CreatePrescription = () => {
    const { patientId } = useParams(); // Get patientId from URL path

  const [consultation, setConsultation] = useState({
    diagnosis: "",
    medicines: [{ name: "", dosage: "", quantity: "" }],
    notes: "",
    date: "", // Date is now taken from the form
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsultation({ ...consultation, [name]: value });
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedicines = [...consultation.medicines];
    updatedMedicines[index][field] = value;
    setConsultation({ ...consultation, medicines: updatedMedicines });
  };

  const addMedicine = () => {
    setConsultation({
      ...consultation,
      medicines: [...consultation.medicines, { name: "", dosage: "", quantity: "" }],
    });
  };

  const removeMedicine = (index) => {
    const updatedMedicines = consultation.medicines.filter((_, i) => i !== index);
    setConsultation({ ...consultation, medicines: updatedMedicines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const doctorId = localStorage.getItem("doctorId"); // Get doctorId from localStorage
    const jwt = localStorage.getItem("doctorjwt"); // Get doctor JWT token
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };
  
    // Log the data that will be sent
    console.log({
      patientId,
      doctorId,
      date: consultation.date,
      diagnosis: consultation.diagnosis,
    });
  
    try {
      // Step 1: Create Consultation
      const consultationResponse = await axios.post(
        "http://localhost:8181/api/consultation/create",
        {
          patientId,
          doctorId,
          date: consultation.date,
          diagnosis: consultation.diagnosis,
        },
        { headers }
      );
  
      const consultationId = consultationResponse.data.id; // Get the consultationId from the response
  
      // Step 2: Create Prescription
      const prescriptionResponse = await axios.post(
        "http://localhost:8181/api/prescriptions",
        {
          consultationId, // Add consultationId here
          medicines: consultation.medicines,
          status: "Pending",
          notes: consultation.notes,
        },
        { headers }
      );
  
      alert("Consultation and Prescription created successfully!");
      navigate("/doctor/appointments"); // Redirect after successful creation
    } catch (error) {
      console.error("Error creating consultation or prescription:", error);
      alert("Failed to create consultation or prescription.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-200 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Consultation & Prescription
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Diagnosis
            </label>
            <textarea
              name="diagnosis"
              value={consultation.diagnosis}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">Prescription</h2>
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">Medications</h2>
              {consultation.medicines.map((medicine, index) => (
                <div key={index} className="flex items-center mt-4 gap-4">
                  <input
                    type="text"
                    placeholder="Medicine Name"
                    value={medicine.name}
                    onChange={(e) =>
                      handleMedicationChange(index, "name", e.target.value)
                    }
                    className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Dosage"
                    value={medicine.dosage}
                    onChange={(e) =>
                      handleMedicationChange(index, "dosage", e.target.value)
                    }
                    className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={medicine.quantity}
                    onChange={(e) =>
                      handleMedicationChange(index, "quantity", e.target.value)
                    }
                    className="block w-1/6 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeMedicine(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addMedicine}
                className="mt-4 inline-flex items-center px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600"
              >
                Add Medication
              </button>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                name="notes"
                value={consultation.notes}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                rows="4"
              ></textarea>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Date of Consultation
              </label>
              <input
                type="date"
                name="date"
                value={consultation.date}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePrescription;
