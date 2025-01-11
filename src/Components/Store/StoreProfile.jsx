import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MedicalStoreProfile = () => {
  // State variables for the form fields
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  const navigate = useNavigate();
  
  const jwtToken = localStorage.getItem('storejwt');
  const storeId = localStorage.getItem('storeId');
  // Function to fetch the initial store profile data
  useEffect(() => {
    const fetchStoreData = async () => {

      try {
        const response = await fetch(`http://localhost:8181/api/medicalstore/${storeId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const data = await response.json();

        if (data) {
          setStreet(data.address.street);
          setCity(data.address.city);
          setState(data.address.state);
          setZipcode(data.address.zipcode);
          setPhone(data.phone);
        }
      } catch (error) {
        console.error('Error fetching store data:', error);
      }
    };

    fetchStoreData();
  }, [storeId]); // Fetch data when component mounts

  // Function to handle form submission for updating store data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem('storejwt');

    const formData = {
      address: {
        street,
        city,
        state,
        zipcode,
      },
      phone,
    };

    try {
      const response = await fetch(`http://localhost:8181/api/medicalstore/${storeId}`, {
        method: 'PUT', // Use PUT to update data
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Success:', result);

      // Save updated data to localStorage
      localStorage.setItem('medicalStoreData', JSON.stringify(formData));
      setIsEditing(false);
      navigate(`/medical-store-profile`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">
          {isEditing ? 'Edit Medical Store Profile' : 'Medical Store Profile'}
        </h2>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                Street:
              </label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="mt-1 block w-full px-5 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City:
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full px-5 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State:
              </label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 block w-full px-5 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
                Zipcode:
              </label>
              <input
                type="text"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                className="mt-1 block w-full px-5 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-5 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <p><strong>Street:</strong> {street}</p>
            </div>
            <div>
              <p><strong>City:</strong> {city}</p>
            </div>
            <div>
              <p><strong>State:</strong> {state}</p>
            </div>
            <div>
              <p><strong>Zipcode:</strong> {zipcode}</p>
            </div>
            <div>
              <p><strong>Phone:</strong> {phone}</p>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500"
              >
                Make Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalStoreProfile;
