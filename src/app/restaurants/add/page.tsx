'use client';
import React, { useState } from 'react';
import RestaurantForm from '@/components/RestaurantForm';
import { RestaurantCreationAttributes } from '@/models/Restaurant';

export default function AddRestaurantPage() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Restaurant</h1>
           {/* #=<RestaurantForm onClose={() =>{}} onSubmit={ handleClose }/>  */}
    </div>
  );
}