import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateAppointments = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    sex: "",
    symptoms: "",
    doctorId: "", // doctorId will be selected here
    doctorName: "", // To display the selected doctor's name
    status: "Pending",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchToggle, setSearchToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      // Assuming JWT is stored in localStorage (adjust if needed)
      const token = localStorage.getItem("jwt");

      const response = await fetch("http://localhost:8181/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include JWT in the header
        },
        body: JSON.stringify({
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          age: formData.age,
          sex: formData.sex,
          symptoms: formData.symptoms.split(","), // Convert symptoms to an array
          doctorId: formData.doctorId, // Pass the selected doctorId
          status: formData.status,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Your appointment has been scheduled successfully!");
        console.log("Appointment Response:", data);
      } else {
        setError("There was an issue scheduling your appointment.");
        console.error("Error:", data);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
    navigate("/appointments")
  };

  // Handle doctor selection
  const handleSelectDoctor = (doctor) => {
    setFormData({
      ...formData,
      doctorId: doctor.id,  // Set selected doctorId
      doctorName: doctor.name,  // Set selected doctor's name
    });
    setSearchToggle(false);  // Hide the doctor search modal
  };

  // Navigate to Doctor Select Page
  const handleSearchDoctor = () => {
    setSearchToggle(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-2xl rounded-lg p-5 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-5">
          Schedule an Appointment
        </h1>

        {error && (
          <div className="text-red-600 text-sm mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 text-sm mb-4">
            <strong>Success:</strong> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Age Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
              required
            />
          </div>

          {/* Sex Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Sex
            </label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Symptoms Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Description of Symptoms
            </label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your symptoms"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Doctor Name Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Selected Doctor
            </label>
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
              placeholder="Select a doctor"
            />
          </div>

          {/* Select Doctor Button */}
          <div>
            <button
              type="button"
              onClick={handleSearchDoctor}
              className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md font-semibold hover:bg-blue-600 hover:shadow-lg transition duration-300"
            >
              Select Doctor
            </button>
          </div>

          {/* Doctor Search Modal */}
          {searchToggle && (
            <div>
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  minHeight: "100vh",
                  position: "relative",
                  backgroundImage:
                    'url("https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg3MC10YW5nLTMxXzEuanBn.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundAttachment: "fixed",
                }}
              >
                {/* Header */}
                <header
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    backgroundColor: "#007bff",
                    color: "white",
                  }}
                >
                  <h1>Find Your Doctor</h1>
                  <p>Search for the best specialists around you</p>
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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name"
                    className="p-2 border border-gray-300 rounded-lg"
                  />
                  <select
                    onChange={(e) => setFilterSpecialty(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Filter by specialty</option>
                    {uniqueSpecialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor List */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "20px",
                    padding: "0 20px",
                  }}
                >
                  {filteredDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="doctor-card p-4 border border-gray-300 rounded-lg shadow-md"
                    >
                      <h3 className="text-xl font-bold">{doctor.name}</h3>
                      <p className="text-gray-700">{doctor.specialization}</p>
                      <button
                        onClick={() => handleSelectDoctor(doctor)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
                      >
                        Select Doctor
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md font-semibold hover:bg-green-600 hover:shadow-lg transition duration-300"
          >
            Submit Appointment Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointments;