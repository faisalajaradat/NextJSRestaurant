import React from 'react';
import RestaurantDetail from '@/components/RestaurantDetail';


export default async function RestaurantDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <div className="container mx-auto p-4">


      <RestaurantDetail id={parseInt(params.id)} />
    </div>
  );
}