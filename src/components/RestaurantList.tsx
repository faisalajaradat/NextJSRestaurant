'use client';
import React from 'react';
import Link from 'next/link';
import { RestaurantAttributes } from '@/models/Restaurant';
import { renderCuisine } from '@/utils/renderCuisine';
import StarRating from './starRating';

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import calculateAverage from '@/utils/CalculateAverageStars';

interface RestaurantListProps {
  restaurants: RestaurantAttributes[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  return (
    <div className="flex flex-wrap space-x4 dark">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <Link href={`/restaurants/${restaurant.id}`} className="hover:bg-white">
                <Card>
                    <CardHeader>
                    
                        <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                    </CardHeader>
                    <CardContent>
                    <p>Address: {restaurant.address}</p>
                    <p><strong>Cuisine:</strong> {renderCuisine(restaurant.cuisine)}</p>
                    <p><strong>Rating:</strong> <StarRating rating={calculateAverage(restaurant.rating_service, restaurant.rating_foodquality, restaurant.rating_ambiance)} onRatingChange={() => {}} maxRating={5} /></p>
                    {restaurant.notes && <p><strong>Notes:</strong> {restaurant.notes}</p>}
                    </CardContent>
                </Card>
            </Link>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;