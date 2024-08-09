'use client';

import React, { useState, useEffect } from 'react';
import RestaurantList from '@/components/RestaurantList';
import { RestaurantAttributes, RestaurantCreationAttributes } from '../models/Restaurant';
import CreateRestaurant from '../components/AddFormModal';
import SearchBar from '@/components/SearchBar';
import { toast } from 'react-hot-toast';

export default function Home() {
  const [restaurants, setRestaurants] = useState<RestaurantAttributes[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<RestaurantAttributes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRestaurants = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/restaurants');
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      const data = await response.json();
      setRestaurants(data);
      setFilteredRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      toast.error('Failed to load restaurants. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const addRestaurant = async (restaurant: RestaurantCreationAttributes) => {
    try {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurant),
      });
      if (!response.ok) {
        throw new Error('Failed to add restaurant');
      }
      await fetchRestaurants();
      toast.success('Restaurant added successfully!');
    } catch (error) {
      console.error('Failed to add restaurant:', error);
      toast.error('Failed to add restaurant. Please try again.');
    }
  };
useEffect(() => {
  const filtered = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
    restaurant.meal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (restaurant.notes && restaurant.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  setFilteredRestaurants(filtered);

}, [searchTerm, restaurants]);

   

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6 text-center">Restaurant Tracker</h1>
      
      <div>
        <div className='flex justify-between'>
          <h2 className="text-2xl flex-wrap basis-6/12 font-semibold mb-4">Restaurant List</h2>
          <CreateRestaurant pass={addRestaurant} />
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        {isLoading ? (
          <p>Loading restaurants...</p>
        ) : (
          <RestaurantList restaurants={filteredRestaurants || restaurants} />
        )}
      </div>
    </div>
  );
}