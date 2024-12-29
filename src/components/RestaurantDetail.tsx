'use client';
import React, { useEffect, useState } from 'react';
import { RestaurantAttributes } from '@/models/Restaurant';
import { renderCuisine } from '@/utils/renderCuisine';
import calculateAverage from '@/utils/CalculateAverageStars';
import StarRating from './starRating';

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
    <div className="space-y-4" id='testing'>
      <h1 className="text-2xl font-bold">{restaurant.name}</h1>
      <p><strong>Address:</strong> {restaurant.address}</p>
      <p><strong>Cuisine:</strong> {renderCuisine(restaurant.cuisine)}</p>
      <p><strong>Meal: </strong>{restaurant.meal}</p>
      <strong>Overall Rating</strong> <StarRating rating={calculateAverage(restaurant.rating_service, restaurant.rating_foodquality, restaurant.rating_ambiance)} onRatingChange={() => {}} maxRating={5} allowHover={false} />
      <strong>Service Rating:</strong> <StarRating rating= {restaurant.rating_service}onRatingChange={() => {}} maxRating={5} allowHover={false} />
      <strong>Food Quality Rating:</strong> <StarRating rating= {restaurant.rating_foodquality}onRatingChange={() => {}} maxRating={5} allowHover={false} />
      <strong>Ambiance Rating:</strong> <StarRating rating= {restaurant.rating_ambiance}onRatingChange={() => {}} maxRating={5} allowHover={false} />
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