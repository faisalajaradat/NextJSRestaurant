'use client'

import CreateRestaurant from "@/components/AddFormModal";
import RestaurantList from "@/components/RestaurantList";
import SearchBar from "@/components/SearchBar";
import { RestaurantAttributes, RestaurantCreationAttributes } from "@/models/Restaurant";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {useAuth} from "@/hooks/useAuth"
import { UUID } from "crypto";

export default function HomePage(){
        const { user, loading } = useAuth()
        const [restaurants, setRestaurants] = useState<RestaurantAttributes[]>([]);
        const [filteredRestaurants, setFilteredRestaurants] = useState<RestaurantAttributes[]>([]);
        const [isLoading, setIsLoading] = useState(true);
        const [searchTerm, setSearchTerm] = useState('');
      
        const fetchRestaurants = async () => {

          if(!user) return;
          setIsLoading(true);
          try {
            const response = await fetch(`/api/restaurants?uuid=${user!.id as UUID}`);
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
        }, [user]);
      
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
        <div className="flex flex-col" style={{ minHeight:`calc(100vh-7vh)`, overflow: 'hidden' }}>
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="flex-grow container mx-auto p-4" style={{ overflow: 'hidden' }}>
              <div className='flex justify-between space-x-10 my-8'>
                <div className='w-[70%] max-w-[750px]'>
                  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <CreateRestaurant pass={addRestaurant} />
              </div>
    
              {isLoading ? (
                <p>Loading restaurants...</p>
              ) : (
                <RestaurantList restaurants={filteredRestaurants || restaurants} />
              )}
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center" style={{ overflow: 'hidden' }}>
              <div className="text-center">
                <p>Please log in to view restaurants.</p>
              </div>
            </div>
          )}
        </div>
      );
}


       