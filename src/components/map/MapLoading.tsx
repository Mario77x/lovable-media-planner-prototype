
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface MapLoadingProps {
  onClearToken?: () => void;
  onSwitchToSimpleMap?: () => void;
}

const MapLoading: React.FC<MapLoadingProps> = ({ onClearToken, onSwitchToSimpleMap }) => {
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
      return "Validating map data...";
    } else if (loadingTime < 10) {
      return "Initializing map...";
    } else {
      return "This is taking longer than expected. Please check your console for errors.";
    }
  };
  
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="text-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B539A] mx-auto mb-4"></div>
        <p className="text-gray-600 mb-2" data-testid="loading-message">{getMessage()}</p>
        {loadingTime > 10 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 max-w-md">
              If you continue to see this screen, there may be an issue with the map initialization.
            </p>
            {onSwitchToSimpleMap && (
              <Button onClick={onSwitchToSimpleMap} variant="outline" size="sm">
                Switch to Simple Map
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapLoading;
