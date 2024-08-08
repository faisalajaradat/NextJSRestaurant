import { NextResponse } from 'next/server';
import { initModel, createRestaurant, getAllRestaurants } from '@/lib/database';
import { RestaurantCreationAttributes } from '@/models/Restaurant';

export async function GET() {
  await initModel();

  try {
    const restaurants = await getAllRestaurants();
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await initModel();

  try {
    const body: RestaurantCreationAttributes = await request.json();
    const { name, address, cuisine, meal, rating_ambiance, rating_foodquality, rating_service, notes } = body;

    if (!name || !address || !cuisine || !meal || rating_ambiance === undefined || rating_foodquality === undefined ||rating_service === undefined ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (typeof rating_service !== 'number' || rating_service < 0 || rating_service > 10 ||
        typeof rating_foodquality !== 'number' || rating_foodquality < 0 || rating_foodquality > 10 ||
        typeof rating_ambiance !== 'number' || rating_ambiance < 0 || rating_ambiance > 10) {
      return NextResponse.json({ error: 'Ratings must be numbers between 0 and 10' }, { status: 400 });
    }

    const restaurant = await createRestaurant({name, address, cuisine, meal, rating_ambiance, rating_foodquality, rating_service, notes });
    return NextResponse.json(restaurant, { status: 201 });
  } catch (error) {
    console.error('Failed to create restaurant:', error);
    return NextResponse.json({ error: 'Failed to create restaurant' }, { status: 500 });
  }
}