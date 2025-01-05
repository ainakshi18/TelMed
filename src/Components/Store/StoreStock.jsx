import React, { useState } from 'react';
import StoreNavbar from '../NavBar/StoreNavbar';
const StoreStock = () => {
  // Sample stock data (In a real app, this data would come from a backend API)
  const [stocks, setStocks] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      description: 'Pain reliever and fever reducer',
      expiryDate: '2025-12-31',
      available: true,
      quantity: 50,
      photo: '/api/placeholder/100/100', // Placeholder image
    },
    {
      id: 2,
      name: 'Aspirin',
      description: 'Anti-inflammatory drug',
      expiryDate: '2025-10-15',
      available: false,
      quantity: 0,
      photo: '/api/placeholder/100/100', // Placeholder image
    },
    {
      id: 3,
      name: 'Ibuprofen',
      description: 'Pain reliever, anti-inflammatory',
      expiryDate: '2025-07-01',
      available: true,
      quantity: 30,
      photo: '/api/placeholder/100/100', // Placeholder image
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStock, setNewStock] = useState({
    name: '',
    description: '',
    expiryDate: '',
    available: true,
    quantity: 0,
    photo: '/api/placeholder/100/100', // Placeholder image
  });
  
  const [searchQuery, setSearchQuery] = useState(''); // For filter

  const handleAddStock = (e) => {
    e.preventDefault();
    const newStockItem = {
      ...newStock,
      id: stocks.length + 1, // Incrementing ID
      available: newStock.quantity > 0, // Set availability based on quantity
    };
    setStocks([...stocks, newStockItem]);
    setShowAddForm(false); // Close the form after adding
    setNewStock({ name: '', description: '', expiryDate: '', available: true, quantity: 0, photo: '/api/placeholder/100/100' }); // Reset form
  };

  // Filtered stocks based on search query
  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStock = (id) => {
    // Find the stock by ID
    const stockToUpdate = stocks.find((stock) => stock.id === id);
    // Prompt for new values (this can be replaced with a modal or form)
    const updatedStock = { ...stockToUpdate };

    // Update logic (you can replace this with a better form or modal for ease of use)
    const updatedName = prompt("Enter the new name:", updatedStock.name);
    if (updatedName !== null) updatedStock.name = updatedName;

    const updatedDescription = prompt("Enter the new description:", updatedStock.description);
    if (updatedDescription !== null) updatedStock.description = updatedDescription;

    const updatedExpiryDate = prompt("Enter the new expiry date:", updatedStock.expiryDate);
    if (updatedExpiryDate !== null) updatedStock.expiryDate = updatedExpiryDate;

    const updatedQuantity = prompt("Enter the new quantity:", updatedStock.quantity);
    if (updatedQuantity !== null) updatedStock.quantity = parseInt(updatedQuantity, 10);

    const updatedAvailable = updatedQuantity > 0; // Update availability based on quantity
    updatedStock.available = updatedAvailable;

    // Update the stock in the state
    setStocks(stocks.map((stock) =>
      stock.id === id ? updatedStock : stock
    ));
  };

  const handleDeleteStock = (id) => {
    // Delete the stock by filtering out the one with the matching id
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  const handleIncrementQuantity = (id) => {
    // Increment the quantity of the stock item by 1
    setStocks(stocks.map((stock) => {
      if (stock.id === id) {
        const newQuantity = stock.quantity + 1;
        return { ...stock, quantity: newQuantity, available: newQuantity > 0 };
      }
      return stock;
    }));
  };

  const handleDecrementQuantity = (id) => {
    // Decrement the quantity of the stock item by 1 (not going below 0)
    setStocks(stocks.map((stock) => {
      if (stock.id === id) {
        const newQuantity = Math.max(stock.quantity - 1, 0);
        return { ...stock, quantity: newQuantity, available: newQuantity > 0 };
      }
      return stock;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <StoreNavbar />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Store Stock</h2>

        {/* Search Bar for Filtering by Medicine Name */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by medicine name..."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

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

        {/* Display Filtered Stock */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {filteredStocks.map((stock) => (
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
                    onClick={() => handleUpdateStock(stock.id)}
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
    </div>
  );
};

export default StoreStock;
