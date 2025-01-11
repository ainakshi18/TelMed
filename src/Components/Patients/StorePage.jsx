import React from 'react';
import { useTranslation } from 'react-i18next';  // Import useTranslation for i18n support

const StorePage = ({ stores }) => {
  const { t } = useTranslation();  // Initialize translation function

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center mb-6">{t('Available Stores')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">{store.name}</h2>
            <p className="text-gray-600 mb-1">
              <strong>{t('Address')}:</strong> {store.address.street}, {store.address.city}, {store.address.state} {store.address.zipCode || ''}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>{t('Email')}:</strong> {store.email || t('Not Provided')}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>{t('Phone')}:</strong> {store.phone || t('Not Provided')}
            </p>
            {store.imageUrl && (
              <img
                src={store.imageUrl}
                alt={store.name}
                className="w-full h-40 object-cover mt-4 rounded-md"
              />
            )}
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => alert(`${t('Contact')} ${store.name} ${t('at')} ${store.phone}`)}
            >
              {t('Contact Store')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
