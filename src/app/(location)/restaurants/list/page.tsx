'use client'
import React, { useEffect, useState } from 'react';
import RestaurantList from '@/components/RestaurantList';
import { RestaurantAttributes } from '@/models/Restaurant';

export default function RestaurantsList() {
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
  useEffect(() => {
    fetchRestaurants();
  }, []);
  return (
      <div className='flex container px-0 pt-5'>
        <RestaurantList restaurants={restaurants}/>
      </div>

    
  );
}