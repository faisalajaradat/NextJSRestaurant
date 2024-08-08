import { NextResponse } from 'next/server';
import { getRestaurantById, updateRestaurant, deleteRestaurant } from '@/lib/database';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const restaurant = await getRestaurantById(parseInt(params.id));
  if (restaurant) {
    return NextResponse.json(restaurant);
  }
  return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();
  const updatedRestaurant = await updateRestaurant(parseInt(params.id), data);
  if (updatedRestaurant) {
    return NextResponse.json(updatedRestaurant);
  }
  return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const result = await deleteRestaurant(parseInt(params.id));
  if (result) {
    return NextResponse.json({ message: 'Restaurant deleted successfully' });
  }
  return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
}