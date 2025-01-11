import React, { useState, useEffect } from 'react';
import StoreNavbar from '../NavBar/StoreNavbar';

const StoreOrderBoard = () => {
  const [orders, setOrders] = useState([]);
  const [medicineRequests, setMedicineRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const storeId = localStorage.getItem('storeId');
  const jwtToken = localStorage.getItem('storejwt');

  useEffect(() => {
    // Fetch Medicine Requests for the Store
    fetch(`http://localhost:8181/api/medicine-request/store/${storeId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMedicineRequests(data))
      .catch((error) => console.error('Error fetching medicine requests:', error));

    // Fetch Orders for the Store
    fetch(`http://localhost:8181/api/order/store/${storeId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, [storeId, jwtToken]);

  const handleOrderFulfillment = (id, status) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: status } : order
    );
    setOrders(updatedOrders);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Filter orders by medicine name
  const filteredOrders = orders.filter((order) =>
    order.medicineId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <StoreNavbar />
      <div className="max-w-4xl mx-auto">
      

        {/* Orders Section */}
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
                      <h3 className="font-semibold text-lg">Patient ID: {order.patientId}</h3>
                      <p className="text-sm text-gray-600">Medicine ID: {order.medicineId}</p>
                      <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                      <p className="text-sm text-gray-600">Order Time: {formatTimestamp(order.timestamp)}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Status: {order.status}</p>
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
