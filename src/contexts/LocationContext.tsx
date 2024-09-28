import React, { createContext, useState, useContext, useEffect } from 'react';

interface LocationContextType {
  location: { latitude: number; longitude: number } | null;
  error: string | null;
  loading: boolean;
  debugInfo: string;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  error: null,
  loading: true,
  debugInfo: ''
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const getLocation = () => {
      setDebugInfo(prev => prev + '\nAttempting to get location...');
      if (typeof window !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            setLoading(false);
            setDebugInfo(prev => prev + '\nLocation successfully retrieved.');
          },
          (err) => {
            setError(`Geolocation error: ${err.message}`);
            setLoading(false);
            setDebugInfo(prev => prev + `\nGeolocation error: ${err.message}`);
          },
          { timeout: 10000, maximumAge: 0 } // 10 second timeout, force fresh location
        );
      } else {
        setError('Geolocation is not supported');
        setLoading(false);
        setDebugInfo(prev => prev + '\nGeolocation is not supported');
      }
    };

    setDebugInfo('LocationProvider mounted');
    getLocation();

    // Cleanup function
    return () => {
      setDebugInfo(prev => prev + '\nLocationProvider unmounted');
    };
  }, []);

  return (
    <LocationContext.Provider value={{ location, error, loading, debugInfo }}>
      {children}
    </LocationContext.Provider>
  );
};