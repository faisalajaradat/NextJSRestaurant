import { NextResponse } from 'next/server';
import { getRestaurantById, updateRestaurant, deleteRestaurant } from '@/lib/database';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const restaurant = await getRestaurantById(parseInt(params.id));
  if (restaurant) {
    return NextResponse.json(restaurant);
  }
  return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const data = await request.json();
  const updatedRestaurant = await updateRestaurant(parseInt(params.id), data);
  if (updatedRestaurant) {
    return NextResponse.json(updatedRestaurant);
  }
  return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const result = await deleteRestaurant(parseInt(params.id));
  if (result) {
    return NextResponse.json({ message: 'Restaurant deleted successfully' });
  }
  return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
}