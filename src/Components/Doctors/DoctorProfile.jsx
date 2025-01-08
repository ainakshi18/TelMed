import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorNavbar from '../NavBar/DoctorNavbar';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    specialization: '',
    phone: '',
    availability: [],
    qualifications: '',
    hospitalName: '',
    gender: '',
    imageUrl: '',
    signUrl: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('doctorjwt');
    if (!token) {
      setError('Authentication token is missing. Please log in again.');
      return;
    }
    const doctorId = localStorage.getItem('doctorId');
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`http://localhost:8181/api/doctor/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctor(response.data);
        setFormData({
          specialization: response.data.specialization,
          phone: response.data.phone,
          availability: response.data.availability || [],
          qualifications: response.data.qualifications,
          hospitalName: response.data.hospitalName,
          gender: response.data.gender,
          imageUrl: response.data.imageUrl,
          signUrl: response.data.signUrl,
        });
      } catch (err) {
        setError('Error fetching doctor data');
      }
    };
    fetchDoctorData();
  }, []);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (index, value) => {
    const updatedAvailability = [...formData.availability];
    updatedAvailability[index] = value;

    setFormData((prevData) => ({
      ...prevData,
      availability: updatedAvailability,
    }));
  };

  const handleAddAvailability = () => {
    setFormData((prevData) => ({
      ...prevData,
      availability: [...prevData.availability, ''],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('doctorjwt');
    const doctorId = localStorage.getItem('doctorId');
    try {
      const response = await axios.put(
        `http://localhost:8181/api/doctor/update/${doctorId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setDoctor(response.data);
      setIsEditing(false);
    } catch (err) {
      setError('Error updating doctor data');
    }
  };

  return (
    <>
      <DoctorNavbar />
      <div className="max-w-6xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg mt-8">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {doctor ? (
          <>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium">🩺 Specialization:</label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">📞 Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium">⏰ Availability:</label>
                    {formData.availability.map((slot, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={slot}
                          onChange={(e) => handleAvailabilityChange(index, e.target.value)}
                          placeholder={`Availability ${index + 1}`}
                          className="flex-1 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddAvailability}
                      className="text-blue-500 hover:underline"
                    >
                      Add Availability
                    </button>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">🎓 Qualifications:</label>
                    <input
                      type="text"
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">🏥 Hospital Name:</label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">🚻 Gender:</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">🖼️ Image URL:</label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">✒️ Sign URL:</label>
                    <input
                      type="text"
                      name="signUrl"
                      value={formData.signUrl}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={toggleEdit}
                    className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-1">
                  <img
                    src={doctor.imageUrl || 'https://via.placeholder.com/150'}
                    alt="Doctor"
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
                <div className="col-span-2 space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{doctor.specialization}</h2>
                  <p>📞 Phone: {doctor.phone}</p>
                  <p>🎓 Qualifications: {doctor.qualifications}</p>
                  <p>🏥 Hospital: {doctor.hospitalName}</p>
                  <p>🚻 Gender: {doctor.gender}</p>
                  <div>
                    <h3>⏰ Availability:</h3>
                    <ul className="list-disc pl-5">
                      {doctor.availability.map((slot, index) => (
                        <li key={index}>{slot}</li>
                      ))}
                    </ul>
                  </div>
                  {doctor.signUrl && (
                    <div>
                      <h3>✒️ Doctor's Signature:</h3>
                      <img
                        src={doctor.signUrl}
                        alt="Doctor's Signature"
                        className="h-20 object-contain"
                      />
                    </div>
                  )}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={toggleEdit}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                      Make Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
      </div>
    </>
  );
};

export default DoctorProfile;
