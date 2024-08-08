'use client';
import React, { useEffect, useState } from 'react';
import { RestaurantAttributes } from '@/models/Restaurant';
import { renderCuisine } from '@/utils/renderCuisine';
import calculateAverage from '@/utils/CalculateAverageStars';

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
      <p><strong>Meal: </strong>{restaurant.meal}</p>
      <p><strong>Service Rating:</strong> {restaurant.rating_service}/10</p>
      <p><strong>Food Quality Rating:</strong> {restaurant.rating_foodquality}/10</p>
      <p><strong>Ambiance Rating:</strong> {restaurant.rating_ambiance}/10</p>
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