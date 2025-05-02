
import React, { useEffect, useState } from 'react';

const MapLoading: React.FC = () => {
  const [loadingTime, setLoadingTime] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Show additional message if loading takes too long
  const getMessage = () => {
    if (loadingTime < 5) {
      return "Validating Mapbox token...";
    } else if (loadingTime < 10) {
      return "Initializing map connection...";
    } else {
      return "This is taking longer than expected. Please ensure your Mapbox token is valid.";
    }
  };
  
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="text-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agency-700 mx-auto mb-4"></div>
        <p className="text-gray-600 mb-2">{getMessage()}</p>
        {loadingTime > 10 && (
          <p className="text-sm text-gray-500 max-w-md mt-2">
            If you continue to see this screen, check your network connection or try resetting your Mapbox token.
          </p>
        )}
      </div>
    </div>
  );
};

export default MapLoading;
