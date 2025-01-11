import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoreList from './Storelist';
import PatientNavbar from '../NavBar/PatientNavbar';
import { useTranslation } from 'react-i18next';

const MedicalStorePatient = () => {
  const { t } = useTranslation();
  const [medicines, setMedicines] = useState([]);
  const [stores, setStores] = useState({});
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwt');

        // Fetch medicines data
        const medicineResponse = await axios.get('http://localhost:8181/api/medicines', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const medicinesData = medicineResponse.data;
        setMedicines(medicinesData);

        // Fetch store details
        const storeIds = [...new Set(medicinesData.flatMap(med => med.storeId))];
        const storeRequests = storeIds.map(storeId =>
          axios.get(`http://localhost:8181/api/medicalstore/${storeId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        );

        const storeResponses = await Promise.all(storeRequests);

        const storeDetails = storeResponses.reduce((acc, response) => {
          const store = response.data;
          acc[store.id] = store;
          return acc;
        }, {});

        setStores(storeDetails);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(t('Failed to load data'));
        setIsLoading(false);
      }
    };

    fetchData();
  }, [t]);

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchByCity = (city) => {
    const filteredStores = Object.values(stores).filter(store =>
      store.address.city.toLowerCase().includes(city.toLowerCase())
    );
    const filteredMedicinesByStore = medicines.filter(medicine =>
      medicine.storeId.some(storeId =>
        filteredStores.some(store => store.id === storeId)
      )
    );
    setMedicines(filteredMedicinesByStore);
  };

  return (
    <div
      style={{
        fontFamily: 'Roboto, sans-serif',
        minHeight: '100vh',
        backgroundImage: 'url("https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg3MC10YW5nLTMxXzEuanBn.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        padding: '0',
        backgroundAttachment: 'fixed',
      }}
    >
      <PatientNavbar />
      {/* Header */}
      <header
        style={{
          padding: '50px 20px',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 123, 255, 0.7)',
          borderBottom: '5px solid #fff',
        }}
      >
        <h1 style={{ fontSize: '3.5em', marginBottom: '20px', color: '#fff', fontWeight: 'bold' }}>
          {t('Find Medicines')}
        </h1>
        <p style={{ fontSize: '1.5em', fontWeight: 'lighter', color: '#fff' }}>
          {t('Search and find medicines available at nearby stores')}
        </p>
      </header>

      {/* Search Section */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <input
          type="text"
          placeholder={t('Search for a medicine...')}
          className="p-3 w-4/5 sm:w-3/4 md:w-3/4 lg:w-3/5 xl:w-3/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder={t('Search by city...')}
          className="p-3 w-4/5 sm:w-3/4 md:w-3/4 lg:w-3/5 xl:w-3/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleSearchByCity(e.target.value)}
        />
      </div>

      {/* Loading and Error Messages */}
      {isLoading && <p className="text-center">{t('Loading...')}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Medicines List */}
      {!isLoading && !error && filteredMedicines.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine, index) => (
              <div
                key={index}
                className="bg-white p-5 shadow-lg rounded-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                {/* Medicine Image */}
                <img
                  src={medicine.imageUrl || 'https://via.placeholder.com/150'}
                  alt={medicine.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{medicine.name}</h2>
                <p className="text-gray-600 mb-2">{t('Description')}: {medicine.description}</p>
                <p className="text-gray-600 mb-2">{t('Quantity')}: {medicine.quantity}</p>
                <p className="text-gray-600 mb-4">{t('Price')}: ${medicine.price.toFixed(2)}</p>

                {/* Store List Component */}
                <StoreList storeIds={medicine.storeId} stores={stores} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Medicines Found Message */}
      {!isLoading && !error && filteredMedicines.length === 0 && (
        <p className="text-center text-gray-500">{t('No medicines found.')}</p>
      )}
    </div>
  );
};

export default MedicalStorePatient;
