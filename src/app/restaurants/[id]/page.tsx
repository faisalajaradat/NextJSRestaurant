import React from 'react';
import RestaurantDetail from '@/components/RestaurantDetail';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function RestaurantDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <div className="container mx-auto p-4">
      <Breadcrumb className='my-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/restaurants">Restaurants</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{params.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <RestaurantDetail id={parseInt(params.id)} />
    </div>
  );
}