import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';  // Import useTranslation for i18n support

const StoreDetails = () => {
  const { t } = useTranslation();  // Initialize translation function
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderQuantity, setOrderQuantity] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [orderMessage, setOrderMessage] = useState('');

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(
          `http://localhost:8181/api/medicalstore/${storeId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStore(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching store details:', err);
        setIsLoading(false);
      }
    };

    fetchStore();
  }, [storeId]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMedicine || !orderQuantity) {
      setOrderMessage(t('Please select a medicine and quantity.'));
      return;
    }

    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.post(
        `http://localhost:8181/api/order`,
        {
          storeId: storeId,
          medicineId: selectedMedicine.id,
          quantity: orderQuantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrderMessage(t('Order placed successfully!'));
      console.log(response.data);
    } catch (err) {
      console.error('Error placing order:', err);
      setOrderMessage(t('Error placing order, please try again.'));
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">{t('Loading...')}</p>;

  if (!store) return <p className="text-center text-red-500">{t('Store not found.')}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center mb-6">
          {/* Store Image */}
          {store.imageUrl ? (
            <img
              src={store.imageUrl}
              alt={store.name}
              className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-xl text-gray-600">{t('No Image')}</span>
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-800">{store.name}</h1>
          <p className="text-lg text-gray-600">{store.phone}</p>
          <p className="text-lg text-gray-600">{store.email}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{t('Address')}:</h2>
          <p className="text-lg text-gray-600">
            {store.address?.street}, {store.address?.city}, {store.address?.state}
            {store.address?.zipCode ? `, ${store.address?.zipCode}` : ''}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{t('Available Medicines')}:</h2>
          {store.availableMedicines && store.availableMedicines.length > 0 ? (
            <ul className="list-disc pl-5 text-lg text-gray-600">
              {store.availableMedicines.map((medicine, index) => (
                <li
                  key={index}
                  className="cursor-pointer"
                  onClick={() => setSelectedMedicine(medicine)}
                >
                  {medicine.name} - {medicine.quantity} {t('available')}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-600">{t('No medicines available.')}</p>
          )}
        </div>

        {selectedMedicine && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {t('Request Medicine')}: {selectedMedicine.name}
            </h3>
            <form onSubmit={handleOrderSubmit} className="mt-4">
              <label className="block text-lg text-gray-600 mb-2">{t('Quantity')}:</label>
              <input
                type="number"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(e.target.value)}
                className="border-2 border-gray-300 p-2 rounded-lg mb-4 w-full"
                min="1"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg w-full"
              >
                {t('Place Order')}
              </button>
            </form>
            {orderMessage && (
              <p className="mt-4 text-lg text-gray-800">{orderMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDetails;
