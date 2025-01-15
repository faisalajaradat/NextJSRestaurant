// src/app/restaurants/layout.tsx
'use client';

import React, { use } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import NextBreadcrumb from "@/components/NextBreadcrumb";


export default function RestaurantsLayout({ children, }:

Readonly<{
    children:React.ReactNode;
}> ){
const pathname = usePathname();
const isMapView = pathname === '/restaurants/map';
  return (
    <div className="p-4 pt-0 mx-0 w-[100%]">
      <div className="flex container items-center px-0 justify-between mb-4">

      <NextBreadcrumb
            homeElement="Home"
            separator={<span className="mx-1 text-gray-400"> <BreadcrumbSeparator/></span>}
            containerClasses="flex items-center space-x-2"
            listClasses="text-sm text-gray-600 hover:text-black"
            activeClasses="font-bold text-black"
            capitalizeLinks={true}
        />
      

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