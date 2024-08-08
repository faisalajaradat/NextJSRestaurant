'use client'
import React, { useEffect, useState } from 'react';
import RestaurantList from '@/components/RestaurantList';
import { RestaurantAttributes } from '@/models/Restaurant';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<RestaurantAttributes[]>([]);

  const fetchRestaurants = async () => {
    const response = await fetch('/api/restaurants');
    const data = await response.json();
    setRestaurants(data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <Breadcrumb className='my-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='text-black'>Restaurants</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      <RestaurantList restaurants={restaurants}/>
    </div>
  );
}