import React, { useState } from 'react';
import { RestaurantCreationAttributes } from '../models/Restaurant';
import StarRating from './starRating';
/*
1.Name
2.Location
3.Cuisine
4.What meal was eaten from 
5.Rating subMenu (Service, Food Quality, Ambiance)



*/
interface RestaurantFormProps {
  onSubmit: (restaurant: RestaurantCreationAttributes) => Promise<void>;
  onClose: () => void;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<RestaurantCreationAttributes>({
    name: '',
    address: '',
    cuisine: [],
    rating: 0,
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    await onSubmit(formData);
    setFormData({ name: '', address: '', cuisine: [], rating: 0, notes: '' });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cuisine' ? value.split(',').map(item => item.trim()) : value
    }));
  };

  const handleRatingChange = (newRating: number) => {
    setFormData(prev => ({ ...prev, rating: newRating }));
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="address" className="block">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="cuisine" className="block">Cuisine:</label>
        <input
          type="text"
          id="cuisine"
          name="cuisine"
          value={formData.cuisine.join(', ')}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="rating" className="block">Rating:</label>
        <StarRating rating={formData.rating} onRatingChange={handleRatingChange} maxRating={5} />
      </div>
      <div>
        <label htmlFor="notes" className="block">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Restaurant
      </button>
    </form>
  );
};

export default RestaurantForm;