
import React from 'react';

const MapLoading: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agency-700 mx-auto mb-4"></div>
        <p className="text-gray-600">Validating Mapbox token...</p>
      </div>
    </div>
  );
};

export default MapLoading;
