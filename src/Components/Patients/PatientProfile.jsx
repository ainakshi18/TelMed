import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PatientNavbar from '../NavBar/PatientNavbar';
import ConsultationCard from './ConsultationCard';

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [consultations, setConsultations] = useState([]);
  const [orders, setOrders] = useState([]); // Array to hold multiple orders
  const [medicines, setMedicines] = useState([]); // Array to hold multiple medicines
  const [requests, setRequests] = useState([]);
  const [medicineDetails, setMedicineDetails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const patientId = localStorage.getItem('patientId');

    if (!token) {
      setError('Authentication token is missing. Please log in again.');
      return;
    }

    axios
      .get(`http://localhost:8181/api/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPatient(response.data);
        setFormData(response.data);

        // Fetch orders and medicines
        const fetchOrders = async () => {
          const fetchedOrders = await Promise.all(
            response.data.order.map(async (orderId) => {
              const orderResponse = await axios.get(
                `http://localhost:8181/api/order/${orderId}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return orderResponse.data;
            })
          );
          setOrders(fetchedOrders);

          // Fetch medicines based on order data
          const fetchedMedicines = await Promise.all(
            fetchedOrders.map(async (order) => {
              const medicineResponse = await axios.get(
                `http://localhost:8181/api/medicines/${order.medicineId}/store/${order.storeId}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return medicineResponse.data;
            })
          );
          setMedicines(fetchedMedicines);
        };

        // Fetch consultations
        const fetchConsultations = async () => {
          try {
            const consultationPromises = response.data.consultation.map((consultationId) =>
              axios.get(
                `http://localhost:8181/api/consultation/${consultationId}`,
                { headers: { Authorization: `Bearer ${token}` } }
              )
            );
            const consultationsData = await Promise.all(consultationPromises);
            setConsultations(consultationsData.map((consultation) => consultation.data));
          } catch (err) {
            setError('Error fetching consultations');
          }
        };

        fetchConsultations();
        fetchOrders();

        // Fetch all requests based on the request IDs from patient data
        const fetchRequests = async () => {
          const fetchedRequests = await Promise.all(
            response.data.request.map(async (requestId) => {
              const requestResponse = await axios.get(
                `http://localhost:8181/api/medicine-request/${requestId}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return requestResponse.data;
            })
          );
          setRequests(fetchedRequests);

          // Fetch medicine and store details for each request
          const fetchDetails = async () => {
            const details = await Promise.all(
              fetchedRequests.map((req) =>
                axios
                  .get(
                    `http://localhost:8181/api/medicines/${req.medicineId}/store/${req.storeId}`
                  )
                  .then((res) => res.data)
              )
            );
            setMedicineDetails(details);
          };

          fetchDetails();
        };

        fetchRequests();
      })
      .catch(() => setError('Error fetching patient data'));
  }, []);

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle between view and edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle form submission for updating patient data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    const patientId = localStorage.getItem('patientId'); // Patient ID should be dynamic here

    if (!token) {
      setError('Authentication token is missing. Please log in again.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8181/api/patient/update/${patientId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setIsEditing(false);
        setPatient(response.data); // Update patient data
      }
    } catch (err) {
      setError('Error updating patient data');
    }
  };

  return (
    <div>
      <PatientNavbar />
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
        {patient ? (
          <>
            {isEditing ? (
              // Edit form
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  {/* Form fields (name, age, gender, etc.) */}
                  <div className="form-group">
                    <label className="block font-medium text-gray-700">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block font-medium text-gray-700">Age:</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block font-medium text-gray-700">Gender:</label>
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block font-medium text-gray-700">Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              // Display patient data
              <div className="patient-info space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                      <img
                        src="https://via.placeholder.com/150" // Placeholder image for the profile picture
                        alt="Patient Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{patient.name}</h2>
                      <p className="text-sm text-gray-600">{patient.age} years old</p>
                    </div>
                  </div>

                  {/* Patient Details */}
                  <div className="space-y-4">
                    <p className="text-gray-800 font-semibold">
                      Gender: <span className="text-gray-600">{patient.gender}</span>
                    </p>
                    <p className="text-gray-800 font-semibold">
                      Phone: <span className="text-gray-600">{patient.phone}</span>
                    </p>
                    <p className="text-gray-800 font-semibold">
                      Email: <span className="text-gray-600">{patient.email}</span>
                    </p>
                  </div>

                  {/* Address Information */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <p className="text-gray-800 font-semibold">
                      City: <span className="text-gray-600">{patient.address.city}</span>
                    </p>
                    <p className="text-gray-800 font-semibold">
                      State: <span className="text-gray-600">{patient.address.state}</span>
                    </p>
                    <p className="text-gray-800 font-semibold">
                      Pincode: <span className="text-gray-600">{patient.address.pincode}</span>
                    </p>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={toggleEdit}
                    className="bg-yellow-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                  >
                    Edit Information
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">Loading patient data...</p>
        )}
      </div>

      {/* Consultations */}
      <div className="consultations mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Consultations</h3>
        {consultations.length === 0 ? (
          <p>No consultations yet.</p>
        ) : (
          consultations.map((consultation, index) => (
            <ConsultationCard key={index} consultation={consultation} />
          ))
        )}
      </div>
      <div className="container mx-auto p-6">
      {/* Orders Section */}
      <div className="orders mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h3>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="relative group bg-white border border-gray-200 shadow-md rounded-lg p-6 hover:shadow-lg transition-all"
              >
                {/* Order Status Chip */}
                <div
                  className={`absolute top-2 right-2 px-4 py-2 text-white text-sm font-semibold rounded-md ${
                    order.status === 'Delivered'
                      ? 'bg-green-500'
                      : order.status === 'Accepted'
                      ? 'bg-blue-500'
                      : 'bg-red-500'
                  }`}
                >
                  {order.status}
                </div>

                {/* Card Content */}
                <div>
                  {/* Medicine Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {medicines[index]?.name}
                  </h3>

                  {/* Quantity and Store Info */}
                  <div className="flex justify-between items-center text-gray-700">
                    <p className="text-lg">Quantity: {order.quantity}</p>
                    <p className="text-sm text-gray-500">
                      {medicines[index]?.storeName}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-2">
                    <p className="text-lg font-semibold text-gray-800">
                      Price: ${medicines[index]?.price * order.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Medicine Requests Section */}
      <div className="medicine-requests mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Medicine Requests</h3>
        {requests.length === 0 ? (
          <p>No requests made yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request, index) => {
              const medicine = medicines[index]; // corresponding medicine data
              return (
                <div
                  key={index}
                  className="relative group bg-white border border-gray-200 shadow-md rounded-lg p-6 hover:shadow-lg transition-all"
                >
                  {/* Request Status Chip */}
                  <div
                    className={`absolute top-2 right-2 px-4 py-2 text-white text-sm font-semibold rounded-md ${
                      request.status === 'Fulfilled'
                        ? 'bg-green-500'
                        : request.status === 'Pending'
                        ? 'bg-blue-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {request.status || 'Pending'}
                  </div>

                  {/* Card Content */}
                  <div>
                    {/* Medicine Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {medicine?.name || 'Medicine Name'}
                    </h3>

                    {/* Request Date */}
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Request Date: {new Date(request.requestDate).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Fulfilment Date */}
                    {request.fulfilmentDate && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Fulfillment Date: {new Date(request.fulfilmentDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    {/* Price Calculation */}
                    <div className="mt-2">
                      <p className="text-lg font-semibold text-gray-800">
                        Price: ${medicine?.price * request.quantity || 0}
                      </p>
                    </div>

                    {/* Start Time */}
                    {request.startTime && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Start Time: {new Date(request.startTime).toLocaleTimeString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
   
    </div>
  );
};

export default PatientProfile;
