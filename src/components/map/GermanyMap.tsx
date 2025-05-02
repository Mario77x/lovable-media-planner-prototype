
import React from 'react';
import { GermanRegion } from '@/types';
import { germanRegions } from '@/data/mockData';

interface GermanyMapProps {
  selectedRegions: GermanRegion[];
  recommendedRegions?: GermanRegion[];
  onRegionClick: (region: GermanRegion) => void;
}

const GermanyMap: React.FC<GermanyMapProps> = ({
  selectedRegions,
  recommendedRegions = [],
  onRegionClick
}) => {
  const getRegionClassName = (regionId: GermanRegion) => {
    const isSelected = selectedRegions.includes(regionId);
    const isRecommended = recommendedRegions.includes(regionId);
    
    return `${isSelected ? 'selected' : ''} ${isRecommended ? 'recommended' : ''}`;
  };

  return (
    <div className="germany-map-container relative w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-sm z-10">
        <div className="text-sm font-medium mb-2">Legend:</div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 bg-blue-600 rounded-sm mr-2"></div>
          <span className="text-xs">Selected</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 bg-blue-200 rounded-sm mr-2"></div>
          <span className="text-xs">Recommended</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-400 rounded-sm mr-2"></div>
          <span className="text-xs">Selected & Recommended</span>
        </div>
      </div>
      
      <svg 
        viewBox="0 0 500 600" 
        className="germany-map w-full h-full max-h-[500px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Improved Germany map paths based on the reference image */}
        {/* Schleswig-Holstein (Pink/North) */}
        <path
          d="M235,90 L270,80 L290,90 L295,110 L280,125 L260,130 L240,125 L225,110 L230,95"
          className={getRegionClassName('schleswig-holstein')}
          onClick={() => onRegionClick('schleswig-holstein')}
        />
        {/* Hamburg (Orange dot) */}
        <path
          d="M255,140 L265,135 L275,140 L270,150 L260,148"
          className={getRegionClassName('hamburg')}
          onClick={() => onRegionClick('hamburg')}
        />
        {/* Mecklenburg-Vorpommern (Light Pink/Northeast) */}
        <path
          d="M280,125 L310,115 L345,125 L370,145 L360,165 L340,175 L315,170 L295,160 L285,140"
          className={getRegionClassName('mecklenburg-vorpommern')}
          onClick={() => onRegionClick('mecklenburg-vorpommern')}
        />
        {/* Bremen (Small Yellow dot) */}
        <path
          d="M215,160 L225,156 L230,162 L225,168 L215,165"
          className={getRegionClassName('bremen')}
          onClick={() => onRegionClick('bremen')}
        />
        {/* Lower Saxony (Light Teal/Northwest) */}
        <path
          d="M200,150 L240,125 L260,130 L285,140 L295,160 L290,185 L270,200 L245,205 L215,195 L190,175 L195,155"
          className={getRegionClassName('lower saxony')}
          onClick={() => onRegionClick('lower saxony')}
        />
        {/* Berlin (small region) */}
        <path
          d="M345,185 L355,180 L365,185 L360,195 L350,190"
          className={getRegionClassName('berlin')}
          onClick={() => onRegionClick('berlin')}
        />
        {/* Brandenburg (lighter orange/Northeast) */}
        <path
          d="M315,170 L340,175 L365,185 L375,205 L365,225 L340,235 L315,225 L300,210 L305,190"
          className={getRegionClassName('brandenburg')}
          onClick={() => onRegionClick('brandenburg')}
        />
        {/* Saxony-Anhalt (Yellow/Central East) */}
        <path
          d="M290,185 L305,190 L315,225 L310,245 L290,255 L275,245 L270,225 L280,200"
          className={getRegionClassName('saxony-anhalt')}
          onClick={() => onRegionClick('saxony-anhalt')}
        />
        {/* North Rhine-Westphalia (Light Purple/West) */}
        <path
          d="M190,175 L215,195 L230,215 L225,235 L200,250 L175,245 L160,230 L175,210 L185,190"
          className={getRegionClassName('north rhine-westphalia')}
          onClick={() => onRegionClick('north rhine-westphalia')}
        />
        {/* Saxony (Light Yellow/Southeast) */}
        <path
          d="M315,225 L340,235 L360,245 L355,265 L330,275 L305,265 L295,255 L310,245"
          className={getRegionClassName('saxony')}
          onClick={() => onRegionClick('saxony')}
        />
        {/* Thuringia (Light Green/Central) */}
        <path
          d="M270,225 L275,245 L290,255 L295,255 L305,265 L295,280 L275,275 L260,260 L265,240"
          className={getRegionClassName('thuringia')}
          onClick={() => onRegionClick('thuringia')}
        />
        {/* Hesse (Light Yellow/Central) */}
        <path
          d="M230,215 L245,205 L270,225 L265,240 L260,260 L235,270 L215,265 L205,250 L220,230"
          className={getRegionClassName('hesse')}
          onClick={() => onRegionClick('hesse')}
        />
        {/* Rhineland-Palatinate (Blue/Southwest) */}
        <path
          d="M175,245 L200,250 L205,250 L215,265 L210,285 L190,300 L170,295 L155,280 L160,260"
          className={getRegionClassName('rhineland-palatinate')}
          onClick={() => onRegionClick('rhineland-palatinate')}
        />
        {/* Saarland (Small Yellow/Southwest) */}
        <path
          d="M155,280 L170,295 L165,305 L150,300 L145,290 L150,280"
          className={getRegionClassName('saarland')}
          onClick={() => onRegionClick('saarland')}
        />
        {/* Baden-Württemberg (Light Green/South) */}
        <path
          d="M190,300 L210,285 L235,270 L260,260 L275,275 L270,305 L245,325 L215,320 L195,310"
          className={getRegionClassName('baden-wurttemberg')}
          onClick={() => onRegionClick('baden-wurttemberg')}
        />
        {/* Bavaria (Pink/Southeast) */}
        <path
          d="M275,275 L295,280 L305,265 L330,275 L355,265 L375,285 L385,315 L370,350 L345,370 L315,365 L295,350 L280,330 L270,305"
          className={getRegionClassName('bavaria')}
          onClick={() => onRegionClick('bavaria')}
        />
        
        {/* Region Labels */}
        {germanRegions.map(region => {
          // Position labels appropriately based on region ID
          const positions: Record<GermanRegion, [number, number]> = {
            'baden-wurttemberg': [225, 300],
            'bavaria': [330, 320],
            'berlin': [355, 185],
            'brandenburg': [340, 210],
            'bremen': [222, 162],
            'hamburg': [265, 142],
            'hesse': [240, 245],
            'lower saxony': [240, 175],
            'mecklenburg-vorpommern': [325, 145],
            'north rhine-westphalia': [195, 220],
            'rhineland-palatinate': [185, 275],
            'saarland': [155, 295],
            'saxony': [335, 255],
            'saxony-anhalt': [295, 225],
            'schleswig-holstein': [260, 105],
            'thuringia': [280, 260]
          };
          
          const [x, y] = positions[region.id];
          
          return (
            <text 
              key={region.id}
              x={x} 
              y={y} 
              className="text-[9px] font-medium select-none pointer-events-none fill-gray-700"
              textAnchor="middle"
            >
              {region.name.split(' ')[0]}
            </text>
          );
        })}
      </svg>
      
      <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium mb-2">Selected Regions:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedRegions.length > 0 ? (
            selectedRegions.map(regionId => {
              const region = germanRegions.find(r => r.id === regionId);
              return (
                <span key={regionId} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {region?.name}
                </span>
              );
            })
          ) : (
            <span className="text-gray-500 text-xs">No regions selected. Click on regions to select them.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GermanyMap;
