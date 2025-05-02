
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { GermanRegion } from '@/types';
import GermanyMap from '@/components/map/GermanyMap';
import { germanRegions } from '@/data/mockData';

interface GeographicTargetingProps {
  selectedRegions: GermanRegion[];
  recommendedRegions: GermanRegion[];
  onRegionClick: (region: GermanRegion) => void;
}

const GeographicTargeting: React.FC<GeographicTargetingProps> = ({ 
  selectedRegions,
  recommendedRegions,
  onRegionClick
}) => {
  return (
    <div className="space-y-4">
      {/* Map Container - Increased height */}
      <div className="w-full h-[450px] relative overflow-hidden rounded-lg">
        <GermanyMap
          selectedRegions={selectedRegions}
          recommendedRegions={recommendedRegions}
          onRegionClick={onRegionClick}
        />
      </div>
      
      {/* Selected Regions Display - Only shown in the map itself, 
          removing the duplicate selected regions display */}
    </div>
  );
};

export default GeographicTargeting;
