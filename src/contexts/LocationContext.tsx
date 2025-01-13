'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

interface LocationContextType {
  location: { latitude: number; longitude: number } | null;
  error: string | null;
  loading: boolean;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  error: null,
  loading: true,
});

export default function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLoading(false);
          toast.success('Location retrieved successfully!');
        },
        (error) => {
          setError(`Geolocation error: ${error.message}`);
          setLoading(false);
          toast.error('Unable to retrieve your location.');
        }
      );
    } else {
      setError('Geolocation is not supported');
      setLoading(false);
      toast.error('Geolocation is not supported by your browser.');
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, error, loading }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => {
  return useContext(LocationContext);
};
