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
    const { name, address, cuisine, rating, notes } = body;

    if (!name || !address || !cuisine || rating === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be a number between 1 and 5' }, { status: 400 });
    }

    const restaurant = await createRestaurant({ name, address, cuisine, rating, notes });
    return NextResponse.json(restaurant, { status: 201 });
  } catch (error) {
    console.error('Failed to create restaurant:', error);
    return NextResponse.json({ error: 'Failed to create restaurant' }, { status: 500 });
  }
}