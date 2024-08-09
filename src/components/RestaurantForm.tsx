import React, { useState } from 'react';
import { RestaurantCreationAttributes, Mealtype } from '../models/Restaurant';
import StarRating from './starRating';
import { toast } from 'react-hot-toast';
import CuisineSelect from './SelectCuisine';

interface RestaurantFormProps {
  onSubmit: (restaurant: RestaurantCreationAttributes) => Promise<void>;
  onClose: () => void;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<RestaurantCreationAttributes>({
    name: '',
    address: '',
    cuisine: [],
    meal: null,
    rating_service: 0,
    rating_foodquality: 0,
    rating_ambiance: 0,
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({
    rating_service: false,
    rating_foodquality: false,
    rating_ambiance: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      rating_service: formData.rating_service === 0,
      rating_foodquality: formData.rating_foodquality === 0,
      rating_ambiance: formData.rating_ambiance === 0,
    };

    setFormErrors(errors);

    // If any rating is 0, prevent form submission
    if (Object.values(errors).some(error => error)) {
      toast.error('Please set all ratings before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ name: '', address: '', cuisine: [], meal: null, rating_service: 0, rating_foodquality: 0, rating_ambiance: 0, notes: '' });
      setFormErrors({ rating_service: false, rating_foodquality: false, rating_ambiance: false });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cuisine' ? value.split(',').map(item => item.trim()) : 
               name === 'meal' ? (value === '' ? null : value as Mealtype) : 
               value
    }));
  };
  const handleCuisineChange = (cuisines: string[]) => {
    setFormData(prev => ({ ...prev, cuisine: cuisines } as RestaurantCreationAttributes));
  };

  const handleRatingChange = (ratingType: 'rating_service' | 'rating_foodquality' | 'rating_ambiance') => (newRating: number) => {
    setFormData(prev => ({ ...prev, [ratingType]: newRating }));
    setFormErrors(prev => ({ ...prev, [ratingType]: false }));
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
        <CuisineSelect
          selectedCuisines={formData.cuisine}
          onChange={handleCuisineChange}
        />
      </div>
      <div>
        <label htmlFor="meal" className="block">Meal:</label>
        <select
          id="meal"
          name="meal"
          value={formData.meal || ''}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        >
          <option value="">Select a meal</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="brunch">Brunch</option>
        </select>
      </div>
      <div>
        <label htmlFor="rating_service" className="block">Service Rating:</label>
        <StarRating rating={formData.rating_service} onRatingChange={handleRatingChange('rating_service')} maxRating={5} />
        {formErrors.rating_service && <p className="text-red-500">Please set a service rating</p>}
      </div>
      <div>
        <label htmlFor="rating_foodquality" className="block">Food Quality Rating:</label>
        <StarRating rating={formData.rating_foodquality} onRatingChange={handleRatingChange('rating_foodquality')} maxRating={5} />
        {formErrors.rating_foodquality && <p className="text-red-500">Please set a food quality rating</p>}
      </div>
      <div>
        <label htmlFor="rating_ambiance" className="block">Ambiance Rating:</label>
        <StarRating rating={formData.rating_ambiance} onRatingChange={handleRatingChange('rating_ambiance')} maxRating={5} />
        {formErrors.rating_ambiance && <p className="text-red-500">Please set an ambiance rating</p>}
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
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding...' : 'Add Restaurant'}
      </button>
    </form>
  );
};

export default RestaurantForm;