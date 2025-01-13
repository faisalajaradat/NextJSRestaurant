'use client';

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import { RestaurantAttributes } from '@/models/Restaurant';
import Link from 'next/link';
import { useLocation } from '@/contexts/LocationContext';

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
  const {location:userLocation,error,loading} = useLocation();
  const [restaurants, setRestaurants] = useState<RestaurantAttributes[]>([]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants');
      
      // Ensure we handle empty response properly
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      
      const text = await response.text();  // Get raw response first
      const data = text ? JSON.parse(text) : [];  // Parse only if not empty

      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };
  

  useEffect(()=>{
    fetchRestaurants()
  },[])


  //fallback location
  const defaultCenter: [number, number] = [51.505, -0.09];

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      
    {typeof window !== 'undefined' && (
      <MapContainer
        center={userLocation ? [userLocation.latitude, userLocation.longitude] : defaultCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && <UpdateMapCenter center={[userLocation.latitude, userLocation.longitude]} />}


        {/* WRITE FOR LOOP FOR ALL RESTAURANTS */}
        
        {/* {listAllRestaurants()} */}
        
        {restaurants.map((restaurant) => (

          
            <div key={restaurant.id}>
              <Marker position={[restaurant.latitude, restaurant.longitude]}>
                <Popup>
                  <Link href={`/restaurants/${restaurant.id}`}> <b className='hover:text-blue-950 text-lg'>{restaurant.name}</b></Link>
                  
                  <br />
                  {restaurant.address}
                </Popup>
              </Marker>
            </div>

          ))}
      
      
      </MapContainer>
    )}
    </div>
  );
}
