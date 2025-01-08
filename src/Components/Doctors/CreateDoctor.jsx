import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateDoctor = () => {
  const [formData, setFormData] = useState({
    specialization: '',
    phone: '',
    availability: [], // Start with an empty array for availability
    qualifications: '',
    hospitalName: '',
    gender: '',
    imageUrl: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle adding a new availability slot
  const handleAddAvailability = () => {
    setFormData((prevData) => ({
      ...prevData,
      availability: [...prevData.availability, ''],
    }));
  };

  // Handle changes in each availability input
  const handleAvailabilityChange = (index, value) => {
    const updatedAvailability = [...formData.availability];
    updatedAvailability[index] = value;

    setFormData((prevData) => ({
      ...prevData,
      availability: updatedAvailability,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('doctorjwt'); // Assuming JWT is stored in localStorage

    if (!token) {
      setError('Authentication token is missing. Please log in again.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8181/api/doctor/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // Navigate to the doctor profile or other desired page
        navigate('/doctor-profile', { state: { doctor: response.data } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating doctor');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Doctor</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Availability</label>
          {formData.availability.map((slot, index) => (
            <div key={index} className="mb-2 flex space-x-2">
              <input
                type="text"
                value={slot}
                onChange={(e) => handleAvailabilityChange(index, e.target.value)}
                placeholder={`Availability ${index + 1}`}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAvailability}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Availability
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Qualifications</label>
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create Doctor
        </button>
      </form>
    </div>
  );
};

export default CreateDoctor;
