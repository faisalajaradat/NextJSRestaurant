import  Restaurant  from '../models/Restaurant';

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const response = await fetch('/api/restaurants');
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants');
  }
  return response.json();
};

export const fetchRestaurant = async (id: number): Promise<Restaurant> => {
  const response = await fetch(`/api/restaurants/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch restaurant');
  }
  return response.json();
};

export const createRestaurant = async (restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant> => {
  const response = await fetch('/api/restaurants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(restaurant),
  });
  if (!response.ok) {
    throw new Error('Failed to create restaurant');
  }
  return response.json();
};

export const updateRestaurant = async (id: number, restaurant: Partial<Restaurant>): Promise<Restaurant> => {
  const response = await fetch(`/api/restaurants/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(restaurant),
  });
  if (!response.ok) {
    throw new Error('Failed to update restaurant');
  }
  return response.json();
};

export const deleteRestaurant = async (id: number): Promise<void> => {
  const response = await fetch(`/api/restaurants/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete restaurant');
  }
};