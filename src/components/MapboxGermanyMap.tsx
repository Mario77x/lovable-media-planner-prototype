
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GermanRegion } from '@/types';
import { germanRegions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Define region boundaries for Germany's states
const REGION_COORDINATES: Record<GermanRegion, [number, number]> = {
  'baden-wurttemberg': [9.1, 48.5],
  'bavaria': [11.5, 48.7],
  'berlin': [13.4, 52.5],
  'brandenburg': [13.4, 52.0],
  'bremen': [8.8, 53.1],
  'hamburg': [10.0, 53.6],
  'hesse': [8.7, 50.6],
  'lower saxony': [9.0, 52.6],
  'mecklenburg-vorpommern': [12.5, 53.9],
  'north rhine-westphalia': [7.5, 51.5],
  'rhineland-palatinate': [7.3, 49.8],
  'saarland': [7.0, 49.4],
  'saxony': [13.7, 51.1],
  'saxony-anhalt': [11.9, 51.9],
  'schleswig-holstein': [9.8, 54.2],
  'thuringia': [11.0, 50.9]
};

// Mapbox access token input component
const MapboxTokenInput: React.FC<{ 
  onTokenSubmit: (token: string) => void,
  onCancel: () => void
}> = ({ onTokenSubmit, onCancel }) => {
  const [token, setToken] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onTokenSubmit(token.trim());
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Mapbox API Token Required</h3>
      <p className="mb-4 text-sm text-gray-600">
        To view the interactive map, you need to provide your Mapbox public token. 
        You can get one for free at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="mapbox-token" className="block text-sm font-medium text-gray-700 mb-1">
            Mapbox Public Token
          </label>
          <input
            id="mapbox-token"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="pk.eyJ1Ijoie3lvdXJ1c2VybmFtZX0iLCJhIjoi..."
            required
          />
        </div>
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Use Simple Map
          </Button>
          <Button
            type="submit"
            className="bg-agency-700 hover:bg-agency-800 text-white"
          >
            Set Token
          </Button>
        </div>
      </form>
    </div>
  );
};

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [tokenState, setTokenState] = useState<'checking' | 'valid' | 'invalid' | 'not-found'>('checking');
  const [mapToken, setMapToken] = useState<string | null>(null);
  const markers = useRef<Record<string, mapboxgl.Marker>>({});
  const [error, setError] = useState<string | null>(null);
  const mapInitializedRef = useRef<boolean>(false);
  
  // Check token on component mount
  useEffect(() => {
    console.log("MapboxGermanyMap component mounted");
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      console.log("Found stored token, validating...");
      setMapToken(storedToken);
      setTimeout(() => validateToken(storedToken), 100); // Small delay to ensure DOM is ready
    } else {
      console.log("No token found");
      setTokenState('not-found');
    }
    
    // Clean up on unmount
    return () => {
      console.log("MapboxGermanyMap component unmounting, cleaning up map instance");
      if (map.current) {
        console.log("Removing map instance");
        map.current.remove();
        map.current = null;
        mapInitializedRef.current = false;
      }
    };
  }, []);
  
  // Validate the token
  const validateToken = (token: string) => {
    console.log("Validating token:", token.substring(0, 5) + "...");
    setTokenState('checking');
    setError(null);
    
    try {
      // Set token for mapbox globally
      mapboxgl.accessToken = token;
      console.log("Access token set, attempting to initialize map");
      
      // We'll initialize the map with a slight delay to ensure the DOM is fully ready
      setTimeout(() => {
        try {
          initializeMap(token);
        } catch (error) {
          console.error("Error during delayed map initialization:", error);
          handleMapError(error);
        }
      }, 200);
    } catch (error) {
      console.error("Error setting mapbox token:", error);
      handleMapError(error);
    }
  };
  
  // Handle map errors
  const handleMapError = (error: unknown) => {
    console.error("Mapbox error:", error);
    setTokenState('invalid');
    setError("Invalid token or map initialization error: " + (error instanceof Error ? error.message : "Unknown error"));
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
    mapInitializedRef.current = false;
    localStorage.removeItem('mapbox_token');
    setMapToken(null);
  };
  
  // Initialize map
  const initializeMap = (token: string) => {
    if (!mapContainer.current || mapInitializedRef.current) {
      console.log("Map container not ready or map already initialized");
      return;
    }
    
    console.log("Initializing map with container:", mapContainer.current);
    
    try {
      // Create map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [10.4515, 51.1657], // Germany's center
        zoom: 5,
        attributionControl: false
      });
      
      // Mark as initialized to prevent double initialization
      mapInitializedRef.current = true;
      
      console.log("Map instance created");
      
      // When map loads, add markers and update state
      map.current.on('load', () => {
        console.log("Map loaded successfully, adding markers");
        setTokenState('valid');
        localStorage.setItem('mapbox_token', token);
        addMarkers();
        toast.success("Map loaded successfully");
      });
      
      map.current.on('error', (e) => {
        console.error("Mapbox load error:", e);
        handleMapError(e.error);
      });
      
      // Add controls after creating the map
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.AttributionControl({ compact: true }));
      
    } catch (error) {
      console.error("Error creating map instance:", error);
      handleMapError(error);
    }
  };
  
  // Add markers to the map
  const addMarkers = () => {
    if (!map.current) {
      console.log("Cannot add markers, map is null");
      return;
    }
    
    console.log("Adding markers to map");
    
    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};
    
    // Add new markers
    germanRegions.forEach(region => {
      const coordinates = REGION_COORDINATES[region.id];
      if (!coordinates) {
        console.log("No coordinates for region:", region.id);
        return;
      }
      
      // Create marker element
      const el = document.createElement('div');
      el.className = 'region-marker';
      
      // Add region name as label
      const label = document.createElement('div');
      label.className = 'marker-label';
      label.textContent = region.name;
      el.appendChild(label);
      
      // Style marker based on selection status
      updateMarkerStyle(el, region.id);
      
      // Create and add marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .addTo(map.current!);
      
      // Add click handler
      el.addEventListener('click', () => {
        onRegionClick(region.id);
      });
      
      // Store reference
      markers.current[region.id] = marker;
    });
    
    console.log("All markers added to map");
  };
  
  // Handle token submission
  const handleTokenSubmit = (token: string) => {
    console.log("New token submitted");
    
    // Reset state
    setMapToken(token);
    
    if (map.current) {
      console.log("Removing existing map instance before creating new one");
      map.current.remove();
      map.current = null;
    }
    
    mapInitializedRef.current = false;
    
    // Validate and initialize
    validateToken(token);
  };
  
  // Update marker styles when selections change
  useEffect(() => {
    if (tokenState === 'valid' && map.current) {
      console.log("Updating marker styles due to selection changes");
      // Update all markers to reflect current selection
      Object.keys(markers.current).forEach(regionId => {
        const marker = markers.current[regionId];
        const el = marker.getElement();
        updateMarkerStyle(el, regionId as GermanRegion);
      });
    }
  }, [selectedRegions, recommendedRegions, tokenState]);
  
  // Helper to update marker style based on selection
  const updateMarkerStyle = (element: HTMLElement, regionId: GermanRegion) => {
    const isSelected = selectedRegions.includes(regionId);
    const isRecommended = recommendedRegions.includes(regionId);
    
    element.classList.remove('selected', 'recommended', 'selected-recommended');
    
    if (isSelected && isRecommended) {
      element.classList.add('selected-recommended');
    } else if (isSelected) {
      element.classList.add('selected');
    } else if (isRecommended) {
      element.classList.add('recommended');
    }
  };
  
  // Clear token and reset
  const clearToken = () => {
    console.log("Clearing token");
    localStorage.removeItem('mapbox_token');
    setTokenState('not-found');
    setMapToken(null);
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
    mapInitializedRef.current = false;
    toast.info("Mapbox token has been reset");
  };
  
  // Loading state
  if (tokenState === 'checking') {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agency-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating Mapbox token...</p>
        </div>
      </div>
    );
  }
  
  // Error or invalid token state
  if (tokenState === 'invalid' || tokenState === 'not-found') {
    return <MapboxTokenInput 
      onTokenSubmit={handleTokenSubmit} 
      onCancel={onSwitchToSimpleMap || (() => {})} 
    />;
  }
  
  // Error state but with valid token
  if (error) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center p-6 max-w-md">
          <div className="text-red-500 mb-4">⚠️</div>
          <h3 className="text-lg font-medium mb-2">Map Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex space-x-4 justify-center">
            <Button variant="outline" onClick={clearToken}>Reset Token</Button>
            {onSwitchToSimpleMap && (
              <Button variant="default" onClick={onSwitchToSimpleMap}>
                Use Simple Map
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Map display
  return (
    <div className="relative w-full h-[500px] rounded-lg shadow-md overflow-hidden">
      {/* Legend and Controls */}
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
            onClick={clearToken}
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
      
      {/* Map container with explicit height and width */}
      <div 
        ref={mapContainer} 
        className="absolute inset-0 bg-gray-100" 
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Selected regions summary */}
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
            <span className="text-gray-500 text-xs">No regions selected. Click on markers to select regions.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapboxGermanyMap;
