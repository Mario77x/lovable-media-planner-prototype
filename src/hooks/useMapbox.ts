import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { GermanRegion } from '@/types';
import { MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM } from '@/constants/mapConstants';
import { germanRegions } from '@/data/mockData';
import { germanyStatesGeoJSON } from '@/data/germanyStatesGeoJSON';
import { toast } from 'sonner';
import 'mapbox-gl/dist/mapbox-gl.css';

// This is the token provided by the user - it's a public token that can be committed to the repo
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoibWFyaW83N3giLCJhIjoiY21hNm9hMnVmMHVzdDJqc2RtMGFtaDJpbyJ9.qxDd2jCHleOpE4EcQBmuRA';

interface UseMapboxProps {
  selectedRegions: GermanRegion[];
  recommendedRegions: GermanRegion[];
  onRegionClick: (region: GermanRegion) => void;
}

export const useMapbox = ({ selectedRegions, recommendedRegions, onRegionClick }: UseMapboxProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popup = useRef<mapboxgl.Popup | null>(null);
  
  const [tokenState, setTokenState] = useState<'checking' | 'valid' | 'invalid'>('checking');
  const [error, setError] = useState<string | null>(null);

  // Initialize map with the hardcoded token
  useEffect(() => {
    console.log("Mapbox hook initialized");
    
    // Set the token for mapbox globally
    mapboxgl.accessToken = DEFAULT_MAPBOX_TOKEN;
    console.log("Using Mapbox token:", DEFAULT_MAPBOX_TOKEN.substring(0, 10) + "...");
    
    // Attempt to initialize map
    if (mapContainer.current && !map.current) {
      console.log("Container is ready, initializing map");
      initializeMap();
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

  // Initialize map when container is ready
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      console.log("Container ref available, initializing map");
      initializeMap();
    }
  }, [mapContainer.current]);

  // Update polygon styles when selections change
  useEffect(() => {
    if (map.current && map.current.isStyleLoaded() && map.current.getSource('german-states')) {
      console.log("Updating region styles due to selection changes");
      
      // Update polygon styles to reflect current selection
      selectedRegions.forEach(regionId => {
        updateRegionStyle(regionId);
      });
      
      recommendedRegions.forEach(regionId => {
        updateRegionStyle(regionId);
      });
    }
  }, [selectedRegions, recommendedRegions]);

  // Initialize map
  const initializeMap = () => {
    if (!mapContainer.current) {
      console.log("Map container not ready");
      return;
    }
    
    try {
      console.log("Creating new map instance");
      
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

  // Handle map errors
  const handleMapError = (error: unknown) => {
    console.error("Mapbox error:", error);
    setTokenState('invalid');
    setError("Map initialization error: " + (error instanceof Error ? error.message : "Unknown error"));
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
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

  // Reset map with default token
  const clearToken = () => {
    console.log("Resetting map with default token");
    
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
    
    // Set back to default token
    mapboxgl.accessToken = DEFAULT_MAPBOX_TOKEN;
    
    // Reinitialize with default token
    setTimeout(() => {
      if (mapContainer.current) {
        initializeMap();
      }
    }, 100);
    
    toast.info("Map reset");
  };

  return {
    mapContainer,
    tokenState,
    error,
    clearToken
  };
};
