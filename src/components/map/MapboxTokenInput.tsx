
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MapboxTokenInputProps {
  onTokenSubmit: (token: string) => void;
  onCancel: () => void;
}

const MapboxTokenInput: React.FC<MapboxTokenInputProps> = ({ onTokenSubmit, onCancel }) => {
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

export default MapboxTokenInput;
