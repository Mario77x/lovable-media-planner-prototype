
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { GermanRegion } from '@/types';
import { REGION_COORDINATES, MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM } from '@/constants/mapConstants';
import { germanRegions } from '@/data/mockData';
import { toast } from 'sonner';

interface UseMapboxProps {
  selectedRegions: GermanRegion[];
  recommendedRegions: GermanRegion[];
  onRegionClick: (region: GermanRegion) => void;
}

export const useMapbox = ({ selectedRegions, recommendedRegions, onRegionClick }: UseMapboxProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<Record<string, mapboxgl.Marker>>({});
  
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
      
      // Add controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.AttributionControl({ compact: true }));
      
      // When map loads, add markers and update state
      map.current.on('load', () => {
        console.log("Map loaded successfully");
        setTokenState('valid');
        localStorage.setItem('mapbox_token', mapboxgl.accessToken);
        
        // Add markers after map is loaded
        addMarkers();
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
