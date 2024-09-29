import React, { useState, useEffect } from 'react';
import RestaurantList from '@/components/RestaurantList';
import { RestaurantAttributes, RestaurantCreationAttributes } from '../models/Restaurant';
import CreateRestaurant from '../components/AddFormModal';
import SearchBar from '@/components/SearchBar';
import { toast } from 'react-hot-toast';
import NavBar from '@/components/NavBar';
import Image from 'next/image';

export default function Home() {
    return(
        <div className='flex' style={{ height:`calc(100vh-7vh)`, overflow: 'hidden' }}> 
            <section className='remove-scrollbar container mx-auto my-auto'>
                <div className='flex flex-col lg:flex-row max-w-full place-content-around items-center'>
                    <div className='flex w-full lg:w-1/2 justify-center lg:justify-start'>
                        <h1 className='text-3xl text-center lg:text-left my-auto'>Track your Restaurants!</h1>
                    </div>
                    <div className='flex w-full lg:w-1/2 justify-center'>
                        <Image 
                            src="/homepage-img.jpeg"
                            width={1000}
                            height={1000}
                            alt='Restaurant Hero'
                            className='mb-12 w-auto max-w-full h-auto'
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}