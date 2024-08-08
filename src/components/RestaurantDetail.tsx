'use client';
import React, { useEffect, useState } from 'react';
import { RestaurantAttributes } from '@/models/Restaurant';
import { renderCuisine } from '@/utils/renderCuisine';

interface RestaurantDetailProps {
  id: number;
}

const RestaurantDetail: React.FC<RestaurantDetailProps> = ({ id }) => {
  const [restaurant, setRestaurant] = useState<RestaurantAttributes | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await fetch(`/api/restaurants/${id}`);
      const data = await response.json();
      setRestaurant(data);
    };
    fetchRestaurant();
  }, [id]);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{restaurant.name}</h1>
      <p><strong>Address:</strong> {restaurant.address}</p>
      <p><strong>Cuisine:</strong> {renderCuisine(restaurant.cuisine)}</p>
      <p><strong>Rating:</strong> {restaurant.rating}/10</p>
      {restaurant.notes && (
        <div>
          <strong>Notes:</strong>
          <p>{restaurant.notes}</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;