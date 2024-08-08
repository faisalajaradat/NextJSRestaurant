import React from 'react';
import RestaurantDetail from '@/components/RestaurantDetail';

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <RestaurantDetail id={parseInt(params.id)} />
    </div>
  );
}