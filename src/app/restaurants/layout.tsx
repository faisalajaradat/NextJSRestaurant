// src/app/restaurants/layout.tsx
'use client';

import React, { use } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from "next/navigation";


export default function RestaurantsLayout({ children, }:

Readonly<{
    children:React.ReactNode;
}> ){
const pathname = usePathname();
const isMapView = pathname === '/restaurants/map';
  return (
    <div className="p-4 pt-0 mx-0 w-[100%]">
      <div className="flex container items-center px-0 justify-between mb-4">
      <Breadcrumb className='items-center'>
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
      

      {/* <div className='flex flex-row mb-4 space-x-4'>
        <h1 className="text-2xl font-bold items-center">Restaurants
        </h1>    
      </div> */}

        
      <div className="flex space-x-4">
      {!isMapView ? (
            <Link href="/restaurants/map">
              <p className="hover:text-black text-[#64748B] text-sm">Map View</p>
            </Link>
          ) : (
            <Link href="/restaurants/list">
              <p className="hover:text-black text-[#64748B] text-sm">List View</p>
            </Link>
          )}
        </div>
        </div>
      {children}
      </div>
  );
}