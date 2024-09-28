'use client';
import React, { useState, useEffect } from 'react';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLoading(false);
        },
        (err) => {
          setLoading(false);
        },
        { timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading location...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!location) {
    return <div>Unable to retrieve location</div>;
  }

  return (
    <div>
      <h2>Your Location</h2>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
};

export default LocationComponent;