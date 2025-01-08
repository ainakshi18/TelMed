import React from 'react';
import { Link } from 'react-router-dom';

const StoreList = ({ storeIds, stores }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mt-4 mb-2">Available in:</h3>
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
                  {store.name} - {store.address?.city || 'Unknown City'}
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
