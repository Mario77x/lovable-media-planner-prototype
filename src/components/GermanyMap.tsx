
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
          <div className="w-4 h-4 bg-[#4f7ed3] rounded-sm mr-2"></div>
          <span className="text-xs">Selected</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 bg-[#85f5e5] rounded-sm mr-2"></div>
          <span className="text-xs">Recommended</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#36d7c0] rounded-sm mr-2"></div>
          <span className="text-xs">Selected & Recommended</span>
        </div>
      </div>
      
      <svg 
        viewBox="0 0 500 600" 
        className="germany-map w-full h-full max-h-[450px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Improved paths for German regions */}
        {/* Baden-Württemberg */}
        <path
          d="M180,410 L195,390 L215,385 L235,377 L255,365 L267,372 L277,390 L270,410 L245,425 L220,422 L200,415 Z"
          className={getRegionClassName('baden-wurttemberg')}
          onClick={() => onRegionClick('baden-wurttemberg')}
        />
        {/* Bavaria */}
        <path
          d="M277,390 L300,380 L325,360 L340,345 L355,350 L370,330 L395,335 L400,355 L390,375 L380,400 L360,415 L340,420 L315,410 L295,400 L270,410 Z"
          className={getRegionClassName('bavaria')}
          onClick={() => onRegionClick('bavaria')}
        />
        {/* Berlin */}
        <path
          d="M335,200 L345,193 L355,198 L358,208 L352,215 L342,211 L335,200"
          className={getRegionClassName('berlin')}
          onClick={() => onRegionClick('berlin')}
        />
        {/* Brandenburg */}
        <path
          d="M320,180 L345,172 L370,182 L385,205 L380,230 L345,240 L325,235 L310,220 L305,200 Z"
          className={getRegionClassName('brandenburg')}
          onClick={() => onRegionClick('brandenburg')}
        />
        {/* Bremen */}
        <path
          d="M195,162 L205,155 L215,162 L210,170 L195,162 Z"
          className={getRegionClassName('bremen')}
          onClick={() => onRegionClick('bremen')}
        />
        {/* Hamburg */}
        <path
          d="M225,145 L240,136 L252,147 L245,157 L225,150 Z"
          className={getRegionClassName('hamburg')}
          onClick={() => onRegionClick('hamburg')}
        />
        {/* Hesse */}
        <path
          d="M220,270 L235,255 L250,260 L265,280 L260,300 L240,310 L225,305 L215,290 L220,275 Z"
          className={getRegionClassName('hesse')}
          onClick={() => onRegionClick('hesse')}
        />
        {/* Lower Saxony */}
        <path
          d="M190,170 L225,150 L250,160 L270,180 L280,200 L270,225 L245,230 L220,225 L195,210 L180,195 Z"
          className={getRegionClassName('lower saxony')}
          onClick={() => onRegionClick('lower saxony')}
        />
        {/* Mecklenburg-Vorpommern */}
        <path
          d="M275,135 L300,125 L330,140 L345,160 L335,175 L315,185 L290,180 L270,170 L265,150 Z"
          className={getRegionClassName('mecklenburg-vorpommern')}
          onClick={() => onRegionClick('mecklenburg-vorpommern')}
        />
        {/* North Rhine-Westphalia */}
        <path
          d="M180,235 L195,225 L215,235 L230,245 L225,265 L205,275 L190,270 L175,255 Z"
          className={getRegionClassName('north rhine-westphalia')}
          onClick={() => onRegionClick('north rhine-westphalia')}
        />
        {/* Rhineland-Palatinate */}
        <path
          d="M165,295 L185,280 L205,285 L220,295 L215,315 L200,325 L180,320 L170,310 Z"
          className={getRegionClassName('rhineland-palatinate')}
          onClick={() => onRegionClick('rhineland-palatinate')}
        />
        {/* Saarland */}
        <path
          d="M150,315 L165,310 L175,318 L170,328 L155,330 L150,320 Z"
          className={getRegionClassName('saarland')}
          onClick={() => onRegionClick('saarland')}
        />
        {/* Saxony */}
        <path
          d="M325,235 L350,240 L365,255 L360,275 L340,285 L320,280 L305,270 L310,250 Z"
          className={getRegionClassName('saxony')}
          onClick={() => onRegionClick('saxony')}
        />
        {/* Saxony-Anhalt */}
        <path
          d="M290,215 L305,210 L325,225 L330,245 L315,255 L295,260 L280,250 L275,230 Z"
          className={getRegionClassName('saxony-anhalt')}
          onClick={() => onRegionClick('saxony-anhalt')}
        />
        {/* Schleswig-Holstein */}
        <path
          d="M225,100 L245,90 L265,105 L270,125 L260,140 L240,135 L225,125 Z"
          className={getRegionClassName('schleswig-holstein')}
          onClick={() => onRegionClick('schleswig-holstein')}
        />
        {/* Thuringia */}
        <path
          d="M270,265 L285,260 L305,265 L305,285 L290,295 L275,290 L265,280 Z"
          className={getRegionClassName('thuringia')}
          onClick={() => onRegionClick('thuringia')}
        />
        
        {/* Region Labels */}
        {germanRegions.map(region => {
          // Position labels appropriately based on region ID
          const positions: Record<GermanRegion, [number, number]> = {
            'baden-wurttemberg': [225, 400],
            'bavaria': [340, 380],
            'berlin': [345, 204],
            'brandenburg': [345, 210],
            'bremen': [205, 162],
            'hamburg': [237, 149],
            'hesse': [240, 285],
            'lower saxony': [230, 190],
            'mecklenburg-vorpommern': [310, 155],
            'north rhine-westphalia': [200, 250],
            'rhineland-palatinate': [195, 300],
            'saarland': [160, 320],
            'saxony': [335, 265],
            'saxony-anhalt': [305, 235],
            'schleswig-holstein': [245, 115],
            'thuringia': [285, 275]
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
                <span key={regionId} className="inline-block bg-[#e1e9f8] text-[#2B539A] px-2 py-1 rounded text-xs">
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
