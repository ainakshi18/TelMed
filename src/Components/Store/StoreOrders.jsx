import React, { useState } from 'react';
import StoreNavbar from '../NavBar/StoreNavbar';
// Sample Data - Orders (Ideally, this would come from a backend)
const orderData = [
  {
    id: 1,
    patientName: 'Alice Johnson',
    location: '123 Medical Street, City',
    contact: '+1 234-567-8900',
    medicine: 'Aspirin',
    quantity: 2,
    status: 'Not Fulfilled',
    timestamp: '2025-01-05T10:30:00Z', // ISO 8601 format
  },
  {
    id: 2,
    patientName: 'Bob Williams',
    location: '456 Health Avenue, City',
    contact: '+1 345-678-9012',
    medicine: 'Ibuprofen',
    quantity: 3,
    status: 'Not Fulfilled',
    timestamp: '2025-01-05T11:00:00Z',
  },
  {
    id: 3,
    patientName: 'Charlie Davis',
    location: '789 Wellness Road, City',
    contact: '+1 456-789-0123',
    medicine: 'Paracetamol',
    quantity: 1,
    status: 'Fulfilled',
    timestamp: '2025-01-04T09:45:00Z',
  },
];

const StoreOrderBoard = () => {
  const [orders, setOrders] = useState(orderData);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const handleOrderFulfillment = (id, status) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: status } : order
    );
    setOrders(updatedOrders);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format to a readable date-time string
  };

  // Filter orders by medicine name
  const filteredOrders = orders.filter((order) =>
    order.medicine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <StoreNavbar/>
      <div className="max-w-4xl mx-auto">
        {/* Order History Header */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Order History</h2>

          {/* Filter by Medicine Name */}
          <div className="mt-6 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by medicine name..."
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mt-6">
            {filteredOrders.length === 0 ? (
              <p>No orders found for the selected medicine.</p>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white p-4 border rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{order.patientName}</h3>
                      <p className="text-sm text-gray-600">Location: {order.location}</p>
                      <p className="text-sm text-gray-600">Contact: {order.contact}</p>
                      <p className="text-sm text-gray-600">Order Time: {formatTimestamp(order.timestamp)}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Medicine: {order.medicine}</p>
                      <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm ${
                          order.status === 'Fulfilled' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {order.status}
                      </span>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleOrderFulfillment(order.id, 'Fulfilled')}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Fulfill
                        </button>
                        <button
                          onClick={() => handleOrderFulfillment(order.id, 'Not Fulfilled')}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Not Fulfilled
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOrderBoard;