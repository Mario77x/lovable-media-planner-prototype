
import React from 'react';
import { GermanRegion } from '@/types';
import { germanRegions } from '@/data/mockData';

interface SelectedRegionsSummaryProps {
  selectedRegions: GermanRegion[];
}

const SelectedRegionsSummary: React.FC<SelectedRegionsSummaryProps> = ({ selectedRegions }) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 bg-background border border-border p-3 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium mb-2">Selected Regions:</h3>
      <div className="flex flex-wrap gap-2">
        {selectedRegions.length > 0 ? (
          selectedRegions.map(regionId => {
            const region = germanRegions.find(r => r.id === regionId);
            return (
              <span key={regionId} className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                {region?.name}
              </span>
            );
          })
        ) : (
          <span className="text-muted-foreground text-xs">No regions selected. Click on markers to select regions.</span>
        )}
      </div>
    </div>
  );
};

export default SelectedRegionsSummary;
