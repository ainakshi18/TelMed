import React, { useState } from 'react';
import { Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import StoreNavbar from '../NavBar/StoreNavbar';
const StoreProfile = () => {
  // Sample store data (This would typically come from a backend API)
  const storeData = {
    storePhoto: '/api/placeholder/150/150',
    storeName: 'HealthCare Pharmacy',
    storeOwner: 'Dr. John Doe',
    location: '123 Medical Street, City',
    contactNumber: '+1 234-567-8900',
    numberOfOrders: 15,
    numberOfRequests: 5,
    storeDescription: 'A reliable pharmacy offering a wide range of medications.',
  };

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      from: 'StoreBot',
      text: 'Hello! How can I assist you today?',
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { from: 'User', text: message }]);
      // Simulate ChatGPT response (In reality, it would call an API to get a response)
      setTimeout(() => {
        setChatHistory([
          ...chatHistory,
          { from: 'User', text: message },
          { from: 'StoreBot', text: `You said: ${message}. How can I help more?` },
        ]);
      }, 1000);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <StoreNavbar />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Store Header with Image */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={storeData.storePhoto}
            alt={storeData.storeName}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">{storeData.storeName}</h2>
            <p className="text-gray-600">{storeData.storeOwner}</p>
          </div>
        </div>

        {/* Store Contact Information */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-5 w-5" />
            <span>{storeData.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-5 w-5" />
            <span>{storeData.contactNumber}</span>
          </div>
        </div>

        {/* Store Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">Orders Coming In</p>
            <Link to="/orders">
              <button className="text-2xl font-bold">{storeData.numberOfOrders}</button>
            </Link>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-700">Requests Coming In</p>
            <p className="text-2xl font-bold">{storeData.numberOfRequests}</p>
          </div>
        </div>

        {/* Store Description */}
        <div className="mb-6">
          <p className="text-gray-600">{storeData.storeDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;
