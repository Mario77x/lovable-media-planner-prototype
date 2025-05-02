
import React, { useState, useMemo } from 'react';
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
    <div className="germany-map-container relative w-full h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
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
        <div className="flex items-center">
          <div className="w-4 h-4 bg-teal-300 mr-2"></div>
          <span className="text-xs">Selected & Recommended</span>
        </div>
      </div>
      
      <svg 
        viewBox="0 0 800 900" 
        className="germany-map w-full h-full"
      >
        {/* Baden-Württemberg */}
        <path
          d="M300,650 L320,620 L350,630 L400,610 L430,640 L445,660 L430,680 L400,690 L370,680 L340,670 L320,660 Z"
          className={getRegionClassName('baden-wurttemberg')}
          onClick={() => onRegionClick('baden-wurttemberg')}
        />
        {/* Bavaria */}
        <path
          d="M430,640 L470,620 L500,590 L520,600 L550,580 L580,590 L600,630 L590,670 L570,700 L540,720 L510,710 L480,690 L450,680 L430,680 Z"
          className={getRegionClassName('bavaria')}
          onClick={() => onRegionClick('bavaria')}
        />
        {/* Berlin */}
        <path
          d="M530,330 L544,320 L558,330 L560,344 L550,354 L534,348 L530,330"
          className={getRegionClassName('berlin')}
          onClick={() => onRegionClick('berlin')}
        />
        {/* Brandenburg */}
        <path
          d="M490,300 L520,290 L560,310 L580,350 L570,390 L530,410 L500,400 L480,370 L470,340 L490,300 Z"
          className={getRegionClassName('brandenburg')}
          onClick={() => onRegionClick('brandenburg')}
        />
        {/* Bremen */}
        <path
          d="M300,270 L310,260 L320,270 L315,280 L300,270 Z"
          className={getRegionClassName('bremen')}
          onClick={() => onRegionClick('bremen')}
        />
        {/* Hamburg */}
        <path
          d="M340,240 L360,230 L370,245 L360,260 L340,250 Z"
          className={getRegionClassName('hamburg')}
          onClick={() => onRegionClick('hamburg')}
        />
        {/* Hesse */}
        <path
          d="M350,430 L370,410 L400,420 L420,450 L410,480 L380,500 L350,490 L330,470 L340,450 Z"
          className={getRegionClassName('hesse')}
          onClick={() => onRegionClick('hesse')}
        />
        {/* Lower Saxony */}
        <path
          d="M290,280 L330,250 L370,260 L400,290 L420,330 L400,370 L370,380 L330,370 L300,340 L270,320 Z"
          className={getRegionClassName('lower saxony')}
          onClick={() => onRegionClick('lower saxony')}
        />
        {/* Mecklenburg-Vorpommern */}
        <path
          d="M410,220 L450,210 L490,230 L520,260 L510,290 L480,310 L440,300 L410,280 L400,250 Z"
          className={getRegionClassName('mecklenburg-vorpommern')}
          onClick={() => onRegionClick('mecklenburg-vorpommern')}
        />
        {/* North Rhine-Westphalia */}
        <path
          d="M270,380 L300,360 L340,380 L370,400 L360,430 L330,450 L300,440 L270,420 Z"
          className={getRegionClassName('north rhine-westphalia')}
          onClick={() => onRegionClick('north rhine-westphalia')}
        />
        {/* Rhineland-Palatinate */}
        <path
          d="M250,470 L280,450 L320,460 L350,480 L340,510 L310,530 L280,520 L260,500 Z"
          className={getRegionClassName('rhineland-palatinate')}
          onClick={() => onRegionClick('rhineland-palatinate')}
        />
        {/* Saarland */}
        <path
          d="M230,520 L250,510 L270,520 L265,535 L245,540 L230,530 Z"
          className={getRegionClassName('saarland')}
          onClick={() => onRegionClick('saarland')}
        />
        {/* Saxony */}
        <path
          d="M500,400 L540,410 L560,430 L550,460 L520,480 L490,470 L470,450 L480,420 Z"
          className={getRegionClassName('saxony')}
          onClick={() => onRegionClick('saxony')}
        />
        {/* Saxony-Anhalt */}
        <path
          d="M440,350 L470,340 L500,360 L510,390 L490,420 L460,430 L430,410 L420,380 Z"
          className={getRegionClassName('saxony-anhalt')}
          onClick={() => onRegionClick('saxony-anhalt')}
        />
        {/* Schleswig-Holstein */}
        <path
          d="M340,180 L370,170 L400,190 L410,220 L390,240 L360,230 L340,210 Z"
          className={getRegionClassName('schleswig-holstein')}
          onClick={() => onRegionClick('schleswig-holstein')}
        />
        {/* Thuringia */}
        <path
          d="M410,430 L440,420 L470,430 L470,460 L450,480 L420,470 L400,450 Z"
          className={getRegionClassName('thuringia')}
          onClick={() => onRegionClick('thuringia')}
        />
        
        {/* Region Labels */}
        {germanRegions.map(region => {
          // Position labels appropriately based on region ID
          const positions: Record<GermanRegion, [number, number]> = {
            'baden-wurttemberg': [360, 660],
            'bavaria': [520, 660],
            'berlin': [544, 338],
            'brandenburg': [530, 350],
            'bremen': [310, 270],
            'hamburg': [355, 245],
            'hesse': [380, 450],
            'lower saxony': [350, 310],
            'mecklenburg-vorpommern': [460, 260],
            'north rhine-westphalia': [320, 410],
            'rhineland-palatinate': [310, 490],
            'saarland': [250, 525],
            'saxony': [520, 445],
            'saxony-anhalt': [470, 390],
            'schleswig-holstein': [370, 200],
            'thuringia': [440, 450]
          };
          
          const [x, y] = positions[region.id];
          
          return (
            <text 
              key={region.id}
              x={x} 
              y={y} 
              className="text-[10px] font-medium select-none pointer-events-none fill-gray-700"
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
                <span key={regionId} className="inline-block bg-agency-100 text-agency-800 px-2 py-1 rounded text-xs">
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
