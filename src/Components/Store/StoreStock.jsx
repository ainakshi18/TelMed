import React, { useState, useEffect } from 'react';
import StoreNavbar from '../NavBar/StoreNavbar';

const MedicineStock = () => {
  const [stocks, setStocks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStock, setNewStock] = useState({
    name: '',
    description: '',
    expiryDate: '',
    available: true,
    quantity: 0,
    photo: '/api/placeholder/100/100', // Placeholder image
  });
  
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);

  const jwtToken = localStorage.getItem('storejwt'); // Retrieve JWT from local storage
  const storeId = localStorage.getItem('storeId'); // Retrieve Store ID from local storage

  useEffect(() => {
    // Fetch medicines for the store on component mount
    fetch(`http://localhost:8181/api/medicalstore/${storeId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Add JWT token to the request
      },
    })
      .then((response) => response.json())
      .then((data) => setStocks(data.availableMedicines))
      .catch((error) => console.error('Error fetching medicines:', error));
  }, [storeId, jwtToken]);

  const handleAddStock = (e) => {
    e.preventDefault();
    
    const newStockItem = {
      storeId: [storeId], // Use the store ID from localStorage
      name: newStock.name,
      quantity: newStock.quantity,
      price: newStock.price || 0.0, // You can add a price input field if needed
      expiryDate: newStock.expiryDate,
      description: newStock.description,
      imageUrl: newStock.photo,
    };
  
    // Make API POST request to add the new stock
    fetch('http://localhost:8181/api/medicines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`, // Include JWT token for authentication
      },
      body: JSON.stringify(newStockItem),
    })
      .then((response) => response.json())
      .then((data) => {
        // After successful POST, update the stock list with the new medicine
        setStocks([...stocks, data]);
        setShowAddForm(false); // Close the form after adding
        setNewStock({ name: '', description: '', expiryDate: '', available: true, quantity: 0, photo: '/api/placeholder/100/100' }); // Reset form
        console.log("store",response.data)
      })
      .catch((error) => console.error('Error adding medicine:', error));
  };
  

  const handleUpdateStock = (e) => {
    e.preventDefault();
    // Update the stock
    console.log(currentStock.id)
    fetch(`http://localhost:8181/api/medicines/${currentStock.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(currentStock),
    })
      .then((response) => response.json())
      .then((updatedStock) => {
        setStocks((prevStocks) =>
          prevStocks.map((stock) =>
            stock.id === updatedStock.id ? updatedStock : stock
          )
        );
        setShowUpdateForm(false);
      })
      .catch((error) => console.error('Error updating stock:', error));
      console.log("medicines",response.data)

  };

  const handleDeleteStock = (id) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  const handleIncrementQuantity = (id) => {
    setStocks(stocks.map((stock) => {
      if (stock.id === id) {
        const newQuantity = stock.quantity + 1;
        return { ...stock, quantity: newQuantity, available: newQuantity > 0 };
      }
      return stock;
    }));
  };

  const handleDecrementQuantity = (id) => {
    setStocks(stocks.map((stock) => {
      if (stock.id === id) {
        const newQuantity = Math.max(stock.quantity - 1, 0);
        return { ...stock, quantity: newQuantity, available: newQuantity > 0 };
      }
      return stock;
    }));
  };

  return (<>
  <StoreNavbar/>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Medicine Stock</h2>

        {/* Add New Stock Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="mb-6 p-2 bg-blue-500 text-white rounded"
        >
          Add New Stock
        </button>

        {/* Add Stock Form (Modal) */}
        {showAddForm && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <form
              onSubmit={handleAddStock}
              className="bg-white p-6 rounded-lg shadow-lg w-1/2"
            >
              <h3 className="text-xl font-semibold mb-4">Add New Stock</h3>

              <div className="mb-4">
                <label className="block text-sm text-gray-700">Medicine Name</label>
                <input
                  type="text"
                  value={newStock.name}
                  onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-700">Description</label>
                <textarea
                  value={newStock.description}
                  onChange={(e) => setNewStock({ ...newStock, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  value={newStock.expiryDate}
                  onChange={(e) => setNewStock({ ...newStock, expiryDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={newStock.quantity}
                  onChange={(e) => setNewStock({ ...newStock, quantity: parseInt(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-700">Photo URL</label>
                <input
                  type="url"
                  value={newStock.photo}
                  onChange={(e) => setNewStock({ ...newStock, photo: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="p-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Add Stock
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Update Stock Form (Modal) */}
        {showUpdateForm && currentStock && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <form
              onSubmit={handleUpdateStock}
              className="bg-white p-6 rounded-lg shadow-lg w-1/2"
            >
              <h3 className="text-xl font-semibold mb-4">Update Stock</h3>

              <div className="mb-4">
                <label className="block text-sm text-gray-700">Medicine Name</label>
                <input
                  type="text"
                  value={currentStock.name}
                  onChange={(e) => setCurrentStock({ ...currentStock, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-700">Description</label>
                <textarea
                  value={currentStock.description}
                  onChange={(e) => setCurrentStock({ ...currentStock, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  value={currentStock.expiryDate}
                  onChange={(e) => setCurrentStock({ ...currentStock, expiryDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={currentStock.quantity}
                  onChange={(e) => setCurrentStock({ ...currentStock, quantity: parseInt(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  className="p-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Update Stock
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Display Filtered Stock */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {Array.isArray(stocks) && stocks.map((stock) => (
            <div key={stock.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={stock.photo}
                alt={stock.name}
                className="w-24 h-24 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{stock.name}</h3>
              <p className="text-gray-600">{stock.description}</p>
              <p className="text-sm text-gray-500">Expiry Date: {stock.expiryDate}</p>
              <p className="text-sm text-gray-500">Quantity: {stock.quantity}</p>

              {/* Available/Unavailable Badge */}
              <div className={`p-2 mt-2 ${stock.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} rounded`}>
                {stock.available ? 'Available' : 'Unavailable'}
              </div>

              <div className="mt-4 flex justify-between">
                {/* Increment and Decrement Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleIncrementQuantity(stock.id)}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDecrementQuantity(stock.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    -
                  </button>
                </div>

                {/* Update and Delete Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCurrentStock(stock);
                      setShowUpdateForm(true);
                    }}
                    className="bg-yellow-500 text-white p-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteStock(stock.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div></>
  );
};

export default MedicineStock;
