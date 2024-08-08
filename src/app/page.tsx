'use client';

import React, { useState, useEffect } from 'react';
import RestaurantForm from '../components/RestaurantForm';
import RestaurantList from '@/components/RestaurantList';
import { RestaurantAttributes, RestaurantCreationAttributes } from '../models/Restaurant';
import CreateRestaurant from '../components/AddFormModal';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [restaurants, setRestaurants] = useState<RestaurantAttributes[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<RestaurantAttributes[]>([]);

  const fetchRestaurants = async () => {
    const response = await fetch('/api/restaurants');
    const data = await response.json();
    setRestaurants(data);
    setFilteredRestaurants(data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const addRestaurant = async (restaurant: RestaurantCreationAttributes) => {
    const response = await fetch('/api/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurant),
    });
    if (response.ok) {
      await fetchRestaurants(); // Refresh the list after adding a new restaurant
    } else {
      console.error('Failed to add restaurant');
    }
  };
  const handleSearch = (term: string) => {
    const filtered = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(term.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(term.toLowerCase()) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(term.toLowerCase())) ||
      restaurant.meal?.toLowerCase().includes(term.toLowerCase())||
      (restaurant.notes && restaurant.notes.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredRestaurants(filtered);
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6 text-center">Restaurant Tracker</h1>
      
      <div>
        <div className='flex justify-between'>
          <h2 className="text-2xl flex-wrap basis-6/12 font-semibold mb-4">Restaurant List</h2>

          <CreateRestaurant pass={addRestaurant}></CreateRestaurant>

        </div>
        <SearchBar onSearch={handleSearch}/>
        <RestaurantList restaurants={filteredRestaurants || restaurants} />
      </div>
    </div>
  );
}