
import React from 'react';
import { Button } from '@/components/ui/button';

interface MapErrorProps {
  error: string | null;
  onClearToken: () => void;
  onSwitchToSimpleMap?: () => void;
}

const MapError: React.FC<MapErrorProps> = ({ error, onClearToken, onSwitchToSimpleMap }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="text-center p-6 max-w-md">
        <div className="text-red-500 mb-4">⚠️</div>
        <h3 className="text-lg font-medium mb-2">Map Error</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <div className="flex space-x-4 justify-center">
          <Button variant="outline" onClick={onClearToken}>Reset Token</Button>
          {onSwitchToSimpleMap && (
            <Button variant="default" onClick={onSwitchToSimpleMap}>
              Use Simple Map
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapError;
