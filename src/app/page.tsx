'use client';

import React, { useState, useEffect } from 'react';
import RestaurantList from '@/components/RestaurantList';
import { RestaurantAttributes, RestaurantCreationAttributes } from '../models/Restaurant';
import CreateRestaurant from '../components/AddFormModal';
import SearchBar from '@/components/SearchBar';
import { toast } from 'react-hot-toast';
import NavBar from '@/components/NavBar';

export default function Home() {
    return(
    <div className='flex px-12 flex-wrap justify-evenly align-middle h-[100px]'> 
            <div className=''>
                <h1 className='text-3xl '>Track your Restaurants!</h1>
            </div>
   
    </div>)
}