import React, { useState } from 'react';
import { MapPin, Phone, Plus } from 'lucide-react';
import StoreNavbar from '../NavBar/StoreNavbar';
// Sample Data - This would ideally come from an API
const storeData = [
  {
    id: 1,
    name: 'HealthCare Pharmacy',
    owner: 'John Doe',
    contact: '+1 234-567-8900',
    location: '123 Medical Street, City',
    imageUrl: '/path/to/store1.jpg',
  },
  {
    id: 2,
    name: 'Pharma Plus',
    owner: 'Jane Smith',
    contact: '+1 345-678-9012',
    location: '456 Health Avenue, City',
    imageUrl: '/path/to/store2.jpg',
  },
  {
    id: 3,
    name: 'MediCare Shop',
    owner: 'James Brown',
    contact: '+1 456-789-0123',
    location: '789 Wellness Road, City',
    imageUrl: '/path/to/store3.jpg',
  },
];

const StoreDashboard = () => {
  const [filterLocation, setFilterLocation] = useState('');
  const [filteredStores, setFilteredStores] = useState(storeData);
  const [showAddStoreForm, setShowAddStoreForm] = useState(false);
  const [newStore, setNewStore] = useState({
    name: '',
    owner: '',
    contact: '',
    location: '',
    imageUrl: '',
  });

  const handleLocationFilter = (location) => {
    setFilterLocation(location);
    if (location === '') {
      setFilteredStores(storeData);
    } else {
      setFilteredStores(storeData.filter(store => store.location.includes(location)));
    }
  };

  const handleAddStore = () => {
    setShowAddStoreForm(true);
  };

  const handleSubmitStore = () => {
    // Add the new store to the store data (you can save it to an API here)
    const updatedStores = [...storeData, { ...newStore, id: storeData.length + 1 }];
    setFilteredStores(updatedStores);
    setShowAddStoreForm(false); // Close the form after submission
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <StoreNavbar />
      <div className="max-w-4xl mx-auto">
        {/* Filter Bar */}
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Filter by location..."
            value={filterLocation}
            onChange={(e) => handleLocationFilter(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          {/* Add Store Button */}
          <button
            onClick={handleAddStore}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 ml-4"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* Store Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div key={store.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={store.imageUrl}
                alt={store.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{store.name}</h2>
                <p className="text-gray-500">{store.owner}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>{store.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-5 w-5" />
                    <span>{store.contact}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Store Form */}
        {showAddStoreForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-2xl font-semibold mb-4">Add New Store</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Store Name"
                value={newStore.name}
                onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Owner Name"
                value={newStore.owner}
                onChange={(e) => setNewStore({ ...newStore, owner: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={newStore.contact}
                onChange={(e) => setNewStore({ ...newStore, contact: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Location"
                value={newStore.location}
                onChange={(e) => setNewStore({ ...newStore, location: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newStore.imageUrl}
                onChange={(e) => setNewStore({ ...newStore, imageUrl: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmitStore}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDashboard;
