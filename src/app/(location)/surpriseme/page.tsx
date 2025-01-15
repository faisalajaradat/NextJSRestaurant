'use client';

import { useLocation } from '@/contexts/LocationContext';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

export default function Surpriseme() {
  const { location, error, loading } = useLocation();
  const [distance, setDistance] = useState(20); // Default distance: 20 km
  const [showOptions, setShowOptions] = useState(false);
  const [beenTo, setBeenTo] = useState('haven’t');
  const [cuisine, setCuisine] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  const cuisines = ['Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese', 'American']; // Example cuisines

  const handleGetRecommendation = async () => {
    if (!location || loading || error) {
      alert('Unable to fetch your location.');
      return;
    }


    const response = await fetch(`/api/recommendation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude,
        beenTo,
        cuisine: cuisine === 'any' ? '' : cuisine, 
        radius: distance,
      }),
    });

    const data = await response.json();
    setRecommendation(data.recommendation || 'No recommendations found.');
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Find a recommendation for your next meal!</h2>

      {error ? (
        <p className="text-red-500">Error fetching location: {error}</p>
      ) : loading ? (
        <p>Loading your location...</p>
      ) : (
        <p className="text-center text-gray-700">
          Your location: {location?.latitude}, {location?.longitude}
        </p>
      )}

      {/* Toggle More Options */}
      <div
        className="flex justify-center items-center cursor-pointer mt-4"
        onClick={() => setShowOptions(!showOptions)}
      >
        <span className="text-sm text-gray-500">More Options</span>
        {showOptions ? (
          <ChevronUpIcon className="w-6 h-6 ml-2 text-gray-500" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 ml-2 text-gray-500" />
        )}
      </div>

      {/* Extra Options */}
      {showOptions && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Have you been there before?</label>
            <Select value={beenTo} onValueChange={(value) => setBeenTo(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="haven’t">I haven’t been there</SelectItem>
                <SelectItem value="been">I’ve been there</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Select a cuisine:</label>
            <Select value={cuisine} onValueChange={(value) => setCuisine(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any cuisine</SelectItem>
                {cuisines.map((cuisine) => (
                  <SelectItem key={cuisine} value={cuisine}>
                    {cuisine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Select distance (in km):</label>
            <Slider
              value={[distance]}
              min={1}
              max={100}
              step={1}
              onValueChange={(value) => setDistance(value[0])}
              className="mt-2"
            />
            <p className="text-sm text-gray-500 mt-1">Distance: {distance} km</p>
          </div>
        </div>
      )}

      {/* Get Recommendation Button */}
      <Button className="mt-6 w-full" onClick={handleGetRecommendation}>
        Get Recommendation
      </Button>

      {/* Recommendation Display */}
      {recommendation && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Your Recommendation:</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}
