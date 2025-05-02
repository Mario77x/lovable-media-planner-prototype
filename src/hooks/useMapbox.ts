
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { GermanRegion } from '@/types';
import { MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM } from '@/constants/mapConstants';
import { germanRegions } from '@/data/mockData';
import { germanyStatesGeoJSON } from '@/data/germanyStatesGeoJSON';
import { toast } from 'sonner';

interface UseMapboxProps {
  selectedRegions: GermanRegion[];
  recommendedRegions: GermanRegion[];
  onRegionClick: (region: GermanRegion) => void;
}

export const useMapbox = ({ selectedRegions, recommendedRegions, onRegionClick }: UseMapboxProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popup = useRef<mapboxgl.Popup | null>(null);
  
  const [tokenState, setTokenState] = useState<'checking' | 'valid' | 'invalid' | 'not-found'>('checking');
  const [mapToken, setMapToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check token on hook mount
  useEffect(() => {
    console.log("Mapbox hook initialized");
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      console.log("Found stored token, validating...");
      setMapToken(storedToken);
      validateToken(storedToken);
    } else {
      console.log("No token found");
      setTokenState('not-found');
    }
    
    // Clean up on unmount
    return () => {
      console.log("Mapbox hook cleaning up");
      if (map.current) {
        console.log("Removing map instance");
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update polygon styles when selections change
  useEffect(() => {
    if (tokenState === 'valid' && map.current) {
      console.log("Updating region styles due to selection changes");
      
      // Update polygon styles to reflect current selection
      selectedRegions.forEach(regionId => {
        updateRegionStyle(regionId);
      });
      
      recommendedRegions.forEach(regionId => {
        updateRegionStyle(regionId);
      });
    }
  }, [selectedRegions, recommendedRegions, tokenState]);

  // Validate the token and initialize map
  const validateToken = (token: string) => {
    console.log("Validating token:", token.substring(0, 10) + "...");
    setTokenState('checking');
    setError(null);
    
    // Test if token is formatted correctly (starts with pk.)
    if (!token.startsWith('pk.')) {
      console.error("Token does not appear to be a valid public token");
      setTokenState('invalid');
      setError("This doesn't appear to be a valid Mapbox public token. It should start with 'pk.'");
      return;
    }
    
    // Set token for mapbox globally
    mapboxgl.accessToken = token;
    
    // Initialize map
    initializeMap();
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
    localStorage.removeItem('mapbox_token');
    setMapToken(null);
  };

  // Initialize map
  const initializeMap = () => {
    if (!mapContainer.current) {
      console.log("Map container not ready");
      return;
    }
    
    try {
      console.log("Initializing map with container:", mapContainer.current);
      
      // Create map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: MAP_DEFAULT_CENTER,
        zoom: MAP_DEFAULT_ZOOM,
        attributionControl: false,
        dragRotate: false, // Disable rotation for 2D map view
        pitchWithRotate: false
      });
      
      console.log("Map instance created, waiting for load event");
      
      // Create popup but don't add to map yet
      popup.current = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
      
      // Add controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.AttributionControl({ compact: true }));
      
      // When map loads, add state boundaries and update state
      map.current.on('load', () => {
        console.log("Map loaded successfully");
        setTokenState('valid');
        localStorage.setItem('mapbox_token', mapboxgl.accessToken);
        
        // Add state boundaries
        addStatePolygons();
        
        toast.success("Map loaded successfully");
      });
      
      // Add error handler
      map.current.on('error', (e) => {
        console.error("Mapbox load error:", e);
        handleMapError(e.error || "Map error occurred");
      });
      
    } catch (error) {
      console.error("Error creating map instance:", error);
      handleMapError(error);
    }
  };

  // Add German state polygons to the map
  const addStatePolygons = () => {
    if (!map.current) {
      console.log("Cannot add state polygons, map is null");
      return;
    }
    
    console.log("Adding state polygons to map");
    
    // Add GeoJSON source
    map.current.addSource('german-states', {
      type: 'geojson',
      data: germanyStatesGeoJSON
    });
    
    // Add fill layer
    map.current.addLayer({
      'id': 'state-fills',
      'type': 'fill',
      'source': 'german-states',
      'layout': {},
      'paint': {
        'fill-color': [
          'case',
          ['boolean', ['in', ['get', 'id'], ['literal', selectedRegions.map(r => r.toString())]], false],
          ['boolean', ['in', ['get', 'id'], ['literal', recommendedRegions.map(r => r.toString())]], false],
          '#36d7c0', // Selected and recommended
          ['boolean', ['in', ['get', 'id'], ['literal', selectedRegions.map(r => r.toString())]], false],
          '#4f7ed3', // Selected only
          ['boolean', ['in', ['get', 'id'], ['literal', recommendedRegions.map(r => r.toString())]], false],
          '#85f5e5', // Recommended only
          '#f8f9fa' // Default
        ],
        'fill-opacity': 0.5
      }
    });
    
    // Add outline layer
    map.current.addLayer({
      'id': 'state-borders',
      'type': 'line',
      'source': 'german-states',
      'layout': {},
      'paint': {
        'line-color': '#6c757d',
        'line-width': 1
      }
    });
    
    // Add state labels
    map.current.addLayer({
      'id': 'state-labels',
      'type': 'symbol',
      'source': 'german-states',
      'layout': {
        'text-field': ['get', 'name'],
        'text-size': 12,
        'text-anchor': 'center',
        'text-justify': 'center',
      },
      'paint': {
        'text-color': '#212529',
        'text-halo-color': '#fff',
        'text-halo-width': 1
      }
    });
    
    // Add interactivity
    
    // Change cursor on hover
    map.current.on('mouseenter', 'state-fills', () => {
      if (map.current) map.current.getCanvas().style.cursor = 'pointer';
    });
    
    map.current.on('mouseleave', 'state-fills', () => {
      if (map.current) map.current.getCanvas().style.cursor = '';
      if (popup.current) popup.current.remove();
    });
    
    // Show state name on hover
    map.current.on('mousemove', 'state-fills', (e) => {
      if (!map.current || !popup.current || !e.features || !e.features[0] || !e.features[0].properties) return;
      
      const feature = e.features[0];
      const stateName = feature.properties.name;
      
      popup.current
        .setLngLat(e.lngLat)
        .setHTML(`<strong>${stateName}</strong>`)
        .addTo(map.current);
    });
    
    // Handle click on states
    map.current.on('click', 'state-fills', (e) => {
      if (!e.features || !e.features[0] || !e.features[0].properties) return;
      
      const feature = e.features[0];
      const regionId = feature.properties.id as GermanRegion;
      
      onRegionClick(regionId);
      updateRegionStyle(regionId);
    });
    
    console.log("All state polygons added to map");
  };

  // Update the style of a specific region based on selection state
  const updateRegionStyle = (regionId: GermanRegion) => {
    if (!map.current) return;
    
    // Update the map style to reflect new selection state
    const isSelected = selectedRegions.includes(regionId);
    const isRecommended = recommendedRegions.includes(regionId);
    
    // We need to update the fill-color expression in the state-fills layer
    // This is a bit complex because we need to recreate the entire expression
    map.current.setPaintProperty('state-fills', 'fill-color', [
      'case',
      ['all', 
        ['in', ['get', 'id'], ['literal', selectedRegions.map(r => r.toString())]],
        ['in', ['get', 'id'], ['literal', recommendedRegions.map(r => r.toString())]]
      ],
      '#36d7c0', // Selected and recommended
      ['in', ['get', 'id'], ['literal', selectedRegions.map(r => r.toString())]],
      '#4f7ed3', // Selected only
      ['in', ['get', 'id'], ['literal', recommendedRegions.map(r => r.toString())]],
      '#85f5e5', // Recommended only
      '#f8f9fa' // Default
    ]);
  };

  // Handle token submission
  const handleTokenSubmit = (token: string) => {
    console.log("New token submitted");
    setMapToken(token);
    
    if (map.current) {
      console.log("Removing existing map instance before creating new one");
      map.current.remove();
      map.current = null;
    }
    
    validateToken(token);
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
    
    toast.info("Mapbox token has been reset");
  };

  return {
    mapContainer,
    tokenState,
    error,
    handleTokenSubmit,
    clearToken
  };
};
