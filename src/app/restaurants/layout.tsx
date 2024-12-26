// src/app/restaurants/layout.tsx
'use client';

import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from "next/navigation";


export default function RestaurantsLayout({ children, }:

Readonly<{
    children:React.ReactNode;
}> ){
const pathname = usePathname();
console.log("pathname is " + pathname);
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
          {/* <BreadcrumbSeparator/>
          <BreadcrumbItem>
           <BreadcrumbLink href="{pathname}"className='text-black'>{pathname.split("/")[2].charAt(0).toUpperCase() + pathname.split("/")[2].slice(1)}</BreadcrumbLink>
          </BreadcrumbItem> */}
        </BreadcrumbList>
      </Breadcrumb>

      <div className='flex flex-row mb-4 space-x-4'>
        <h1 className="text-2xl font-bold items-center">Restaurants
        </h1>
        <div className="justify-end flex flex-row space-x-4 flex-grow">
          <Link href={'/restaurants/list'}>
            List View 
          </Link>
          <Link href='/restaurants/map'>
            <p> Map View</p>
          </Link>
          
        </div>
      </div>
      {children}
      </div>
  );
}