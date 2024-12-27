'use client';

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function UpdateMapCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15)
    }
  }, [center, map]);
  return null;
}

export default function RestaurantsMap() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          toast.success('Location retrieved successfully!');
        },
        (error) => {
          toast.error('Unable to retrieve your location.');
        }
      );
    }
  }, []);

  //fallback location
  const defaultCenter: [number, number] = [51.505, -0.09];

  return (
    <div style={{ height: '100vh', width: '100%' }}>
    {typeof window !== 'undefined' && (
      <MapContainer
        center={userLocation ? [userLocation.lat, userLocation.lng] : defaultCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && <UpdateMapCenter center={[userLocation.lat, userLocation.lng]} />}
      </MapContainer>
    )}
    </div>
  );
}
