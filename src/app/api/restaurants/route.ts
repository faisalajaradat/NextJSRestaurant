import { NextResponse } from 'next/server';
import { initModel, createRestaurant, getAllRestaurants, deleteRestaurant, getRestaurantsByUUID } from '@/lib/database';
import { RestaurantCreationAttributes } from '@/models/Restaurant';

export async function GET(request: Request) {
  await initModel();

  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId')?.toString();

    if (userId) {
      // Get restaurants for a specific UUID
      const restaurants = await getRestaurantsByUUID(userId);
      return NextResponse.json(restaurants);
    } else {
      // Get all restaurants if no UUID is provided
      const restaurants = await getAllRestaurants();
      return NextResponse.json(restaurants);
    }
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await initModel();

  try {
    const body: RestaurantCreationAttributes = await request.json();
    const { userId, name, address, latitude, longitude, cuisine, meal, rating_ambiance, rating_foodquality, rating_service, notes } = body;

    // Log the entire request body and specifically the userId for debugging purposes
    console.log('Request body:', body);
    console.log('User ID:', userId);

    if (!userId || !name || !address || !cuisine || !latitude || !longitude || !meal || rating_ambiance === undefined || rating_foodquality === undefined || rating_service === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (typeof rating_service !== 'number' || rating_service < 0 || rating_service > 10 ||
        typeof rating_foodquality !== 'number' || rating_foodquality < 0 || rating_foodquality > 10 ||
        typeof rating_ambiance !== 'number' || rating_ambiance < 0 || rating_ambiance > 10) {
      return NextResponse.json({ error: 'Ratings must be numbers between 0 and 10' }, { status: 400 });
    }

    const restaurant = await createRestaurant({ userId, name, address, cuisine, latitude, longitude, meal, rating_ambiance, rating_foodquality, rating_service, notes });
    return NextResponse.json(restaurant, { status: 201 });
  } catch (error) {
    console.error('Failed to create restaurant:', error);
    return NextResponse.json({ error: 'Failed to create restaurant' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  await initModel();

  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id') || '');

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid restaurant ID' }, { status: 400 });
    }

    const success = await deleteRestaurant(id);
    if (!success) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Restaurant deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete restaurant:', error);
    return NextResponse.json({ error: 'Failed to delete restaurant' }, { status: 500 });
  }
}
