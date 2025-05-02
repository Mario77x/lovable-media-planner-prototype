
import React from 'react';
import { Button } from '@/components/ui/button';

interface MapLegendProps {
  onClearToken: () => void;
  onSwitchToSimpleMap?: () => void;
}

const MapLegend: React.FC<MapLegendProps> = ({ onClearToken, onSwitchToSimpleMap }) => {
  return (
    <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-sm z-10">
      <div className="text-sm font-medium mb-2">Legend:</div>
      <div className="flex items-center mb-1">
        <div className="w-4 h-4 bg-agency-300 mr-2"></div>
        <span className="text-xs">Selected</span>
      </div>
      <div className="flex items-center mb-1">
        <div className="w-4 h-4 bg-teal-100 mr-2"></div>
        <span className="text-xs">Recommended</span>
      </div>
      <div className="flex items-center mb-2">
        <div className="w-4 h-4 bg-teal-300 mr-2"></div>
        <span className="text-xs">Selected & Recommended</span>
      </div>
      
      <div className="border-t border-gray-200 pt-2 mt-2 flex flex-col">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearToken}
          className="text-xs text-gray-600 hover:text-red-600"
        >
          Reset Token
        </Button>
        {onSwitchToSimpleMap && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSwitchToSimpleMap}
            className="text-xs mt-1"
          >
            Use Simple Map
          </Button>
        )}
      </div>
    </div>
  );
};

export default MapLegend;
