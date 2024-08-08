import React from 'react';
import RestaurantList from '@/components/RestaurantList';

export default function RestaurantsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      <RestaurantList />
    </div>
  );
}