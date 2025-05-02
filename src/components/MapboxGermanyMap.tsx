
import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GermanRegion } from '@/types';
import { useMapbox } from '@/hooks/useMapbox';
import MapboxTokenInput from '@/components/map/MapboxTokenInput';
import MapLegend from '@/components/map/MapLegend';
import SelectedRegionsSummary from '@/components/map/SelectedRegionsSummary';
import MapLoading from '@/components/map/MapLoading';
import MapError from '@/components/map/MapError';

interface MapboxGermanyMapProps {
  selectedRegions: GermanRegion[];
  recommendedRegions?: GermanRegion[];
  onRegionClick: (region: GermanRegion) => void;
  onSwitchToSimpleMap?: () => void;
}

const MapboxGermanyMap: React.FC<MapboxGermanyMapProps> = ({
  selectedRegions,
  recommendedRegions = [],
  onRegionClick,
  onSwitchToSimpleMap
}) => {
  const {
    mapContainer,
    tokenState,
    error,
    handleTokenSubmit,
    clearToken
  } = useMapbox({
    selectedRegions,
    recommendedRegions,
    onRegionClick
  });
  
  // Loading state
  if (tokenState === 'checking') {
    return <MapLoading />;
  }
  
  // Error or invalid token state
  if (tokenState === 'invalid' || tokenState === 'not-found') {
    return (
      <MapboxTokenInput 
        onTokenSubmit={handleTokenSubmit} 
        onCancel={onSwitchToSimpleMap || (() => {})} 
      />
    );
  }
  
  // Error state but with valid token
  if (error) {
    return (
      <MapError 
        error={error} 
        onClearToken={clearToken}
        onSwitchToSimpleMap={onSwitchToSimpleMap} 
      />
    );
  }
  
  // Map display
  return (
    <div className="relative w-full h-full rounded-lg shadow-md overflow-hidden">
      {/* Legend and Controls */}
      <MapLegend 
        onClearToken={clearToken}
        onSwitchToSimpleMap={onSwitchToSimpleMap}
      />
      
      {/* Map container */}
      <div 
        ref={mapContainer} 
        className="w-full h-full bg-gray-100"
        data-testid="mapbox-container"
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      />
      
      {/* Selected regions summary */}
      <SelectedRegionsSummary selectedRegions={selectedRegions} />
    </div>
  );
};

export default MapboxGermanyMap;
