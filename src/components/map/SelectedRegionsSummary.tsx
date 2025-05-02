
import React from 'react';
import { GermanRegion } from '@/types';
import { germanRegions } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

interface SelectedRegionsSummaryProps {
  selectedRegions: GermanRegion[];
}

const SelectedRegionsSummary: React.FC<SelectedRegionsSummaryProps> = ({ selectedRegions }) => {
  if (selectedRegions.length === 0) {
    return null;
  }
  
  return (
    <div className="absolute bottom-4 left-4 right-4 bg-background/90 border border-border p-3 rounded-lg shadow-sm">
      <h3 className="text-xs font-medium mb-2">Selected Regions:</h3>
      <div className="flex flex-wrap gap-2">
        {selectedRegions.map(regionId => {
          const region = germanRegions.find(r => r.id === regionId);
          return (
            <Badge key={regionId} variant="secondary" className="bg-agency-100 hover:bg-agency-200 text-agency-800">
              {region?.name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedRegionsSummary;
