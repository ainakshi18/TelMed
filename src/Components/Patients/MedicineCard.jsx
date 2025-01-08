import React from 'react';
import { useNavigate } from 'react-router-dom';

const MedicineCard = ({ medicine }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Replace with actual store data fetch or pass props
    const mockStores = [
      {
        id: '677b9e5b865fd835f0ff9636',
        name: 'Ganpati Bappa Morya',
        address: {
          street: '123 Health Streeeeet',
          city: 'MedCity',
          state: 'HealthState',
          zipCode: null,
        },
        email: 'GanpatiBappa818181@gmail.com',
        phone: '9876543210',
        imageUrl: null,
      },
      // Add more mock stores as needed
    ];

    navigate('/stores', { state: { stores: mockStores } });
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer"
      onClick={handleClick}
    >
      <h2 className="text-xl font-semibold">{medicine.name}</h2>
      <p className="text-gray-600">{medicine.description}</p>
    </div>
  );
};

export default MedicineCard;