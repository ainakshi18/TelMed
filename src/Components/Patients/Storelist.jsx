import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';  // Import useTranslation for i18n support

const StoreList = ({ storeIds, stores }) => {
  const { t } = useTranslation();  // Initialize translation function

  return (
    <div>
      <h3 className="text-lg font-semibold mt-4 mb-2">{t('Available in:')}</h3>
      <ul className="list-disc list-inside">
        {storeIds.map((storeId) => {
          const store = stores[storeId];
          return (
            store && (
              <li key={storeId}>
                <Link
                  to={`/stores/${storeId}`}
                  className="text-blue-500 hover:underline"
                >
                  {store.name} - {store.address?.city || t('Unknown City')}
                </Link>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default StoreList;
