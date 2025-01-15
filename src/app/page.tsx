import React from 'react';
import Image from 'next/image';
import { RestaurantAttributes } from '@/models/Restaurant';
import { getAllRestaurants } from '@/lib/database';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import StarRating from '@/components/starRating';
import { renderCuisine } from '@/utils/renderCuisine';
import calculateAverage from '@/utils/CalculateAverageStars';



export default async function HomePage() {
    // Fetching restaurants on the server side
  const restaurants: RestaurantAttributes[] = await getAllRestaurants();

  // Calculate total restaurants
  const totalRestaurants = restaurants.length;

  // Find the highest-rated restaurant
  const highestRatedRestaurant = restaurants.length > 0
  ? restaurants.reduce((prev: RestaurantAttributes, current: RestaurantAttributes) => {
      const prevAvgRating = (prev.rating_ambiance + prev.rating_foodquality + prev.rating_service) / 3;
      const currentAvgRating = (current.rating_ambiance + current.rating_foodquality + current.rating_service) / 3;
      return currentAvgRating > prevAvgRating ? current : prev;
    })
  : null;
  
    return(
        <div className='flex flex-col justify-center items-center' style={{ height:`calc(100vh-7vh)`, overflow: 'hidden' }}> 
            <section className="container mx-auto px-6 pt-8 pb-22 lg:pb-24 lg:pt-8">
                <div className="flex flex-col lg:flex-row items-center max-w-full lg:space-x-12 space-y-8 lg:space-y-0">
                    <div className="flex flex-col w-full lg:w-1/2 text-center lg:text-left space-y-6">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                            Track your Restaurants!
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-700">
                            A platform that allows users to rate restaurants they have eaten at. Restaurants are ranked based on the average rating, and users can view restaurants they rated and the ratings they have given.
                        </p>
                        <Link href={"/restaurants/list"}>
                            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg w-max self-center lg:self-start">
                                
                                View Restaurants
                                
                            </button>
                        </Link>
                    </div>
                    
                    {/* Image Section */}
                    <div className="flex justify-center w-full lg:w-1/2">
                        <Image 
                            src="/homepage-img.jpeg"
                            width={1000}
                            height={1000}
                            alt="Restaurant Hero"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </section>

                {/* Section for MAP + Total Restaurants */}
                <section className="container mx-auto pt-8 flex flex-col items-center">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">Restaurant Stats</h2>
                    <div className="flex flex-row w-full justify-around items-center">
                        {/* Total Restaurants */}
                        <div className="basis-1/3 text-center bg-slate-500 rounded-lg p-4">
                        <p className="text-lg">
                            <strong>Total Restaurants:</strong> {totalRestaurants}
                        </p>
                        </div>

                        {/* Highest Rated Restaurant */}
                        <div className="basis-1/3 text-center">
                        {highestRatedRestaurant && (
                            <div>
                            <div key={highestRatedRestaurant.id} className="w-full dark hover:bg-slate-750">
                                <h1 className="text-xl p-4">Highest Rated Restaurant</h1>
                                <Link href={`/restaurants/${highestRatedRestaurant.id}`} className="hover:bg-white">
                                <Card>
                                    <CardHeader>
                                    <h2 className="text-xl font-semibold">{highestRatedRestaurant.name}</h2>
                                    </CardHeader>
                                    <CardContent style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    <p><strong>Address:</strong> {highestRatedRestaurant.address}</p>
                                    <p className="mb-2"><strong>Cuisine:</strong> {renderCuisine(highestRatedRestaurant.cuisine)}</p>
                                    </CardContent>
                                </Card>
                                </Link>
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                    </section>
        </div>
    )
}