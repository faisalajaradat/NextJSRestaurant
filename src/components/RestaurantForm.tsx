import React, { useEffect, useRef, useState } from 'react';
import { Libraries, useLoadScript } from '@react-google-maps/api'; 
import { RestaurantCreationAttributes, Mealtype } from '../models/Restaurant';
import StarRating from './starRating';
import { toast } from 'react-hot-toast';
import CuisineSelect from './SelectCuisine';
import { useAuth } from '@/hooks/useAuth';

interface RestaurantFormProps {
  onSubmit: (restaurant: RestaurantCreationAttributes) => Promise<void>;
  onClose: () => void;
  className?: string;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ onSubmit, onClose }) => {
  const { user } = useAuth();
  const addressInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [formData, setFormData] = useState<Omit<RestaurantCreationAttributes, 'userId' | 'uuid'>>({
    name: '',
    address: '',
    cuisine: [],
    longitude: 0,
    latitude: 0,
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
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const libraries: Libraries = ['places']; 
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  // Get the user's current location using Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          toast.error('Unable to retrieve your location.');
        }
      );
    }
  }, []);

  // Initialize Google Places Autocomplete and address autofill
  useEffect(() => {
    if (isLoaded && addressInputRef.current && window.google) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        bounds: userLocation ? new window.google.maps.LatLngBounds(userLocation) : undefined,
        fields: ['address_components', 'geometry', 'name'],
        types: ['restaurant'],
      });

      const handlePlaceChanged = () => {
        const place: google.maps.places.PlaceResult | undefined = autocompleteRef.current?.getPlace();
      
        if (place && place.address_components && place.geometry?.location) {
          const addressComponents = place.address_components;
      
          const streetNumber = addressComponents.find(ac => ac.types.includes('street_number'))?.long_name || '';
          const route = addressComponents.find(ac => ac.types.includes('route'))?.long_name || '';
          const locality = addressComponents.find(ac => ac.types.includes('locality'))?.long_name || '';
          const administrativeArea = addressComponents.find(ac => ac.types.includes('administrative_area_level_1'))?.short_name || '';
          const country = addressComponents.find(ac => ac.types.includes('country'))?.long_name || '';
          const postalCode = addressComponents.find(ac => ac.types.includes('postal_code'))?.long_name || '';
      
          const formattedAddress = `${streetNumber} ${route}, ${locality}, ${administrativeArea} ${postalCode}, ${country}`;
      
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();
      
          setFormData(prev => ({
            ...prev,
            name: place.name || prev.name,
            address: formattedAddress,
            latitude,
            longitude,
          }));
        } else {
          console.warn('Place, address components, or geometry is undefined.');
        }
      };
      
      autocompleteRef.current.addListener('place_changed', () => handlePlaceChanged());

      return () => {
        if (autocompleteRef.current) {
          google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }
      };
    }
  }, [isLoaded, userLocation]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, address: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      rating_service: formData.rating_service === 0,
      rating_foodquality: formData.rating_foodquality === 0,
      rating_ambiance: formData.rating_ambiance === 0,
    };

    setFormErrors(errors);

    if (Object.values(errors).some(error => error)) {
      toast.error('Please set all ratings before submitting.');
      return;
    }

    if (!user) {
      toast.error('User not authenticated. Please log in.');
      return;
    }

    setIsSubmitting(true);
    try {
      const restaurantWithUserId: RestaurantCreationAttributes = {
        ...formData,
        userId: user.uuid // Include the userId from the authenticated user
      };
      console.log('Submitting restaurant with userId:', restaurantWithUserId);
      await onSubmit(restaurantWithUserId);
      setFormData({
        name: '',
        address: '',
        cuisine: [],
        longitude:0,
        latitude:0,
        meal: null,
        rating_service: 0,
        rating_foodquality: 0,
        rating_ambiance: 0,
        notes: ''
      });
      setFormErrors({ rating_service: false, rating_foodquality: false, rating_ambiance: false });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
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
    setFormData(prev => ({ ...prev, cuisine: cuisines } as Omit<RestaurantCreationAttributes, 'userId' | 'uuid'>));
  };

  const handleRatingChange = (ratingType: 'rating_service' | 'rating_foodquality' | 'rating_ambiance') => (newRating: number) => {
    setFormData(prev => ({ ...prev, [ratingType]: newRating }));
    setFormErrors(prev => ({ ...prev, [ratingType]: false }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ${className}">
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
          ref={addressInputRef}
          value={formData.address}
          onChange={handleAddressChange}
          required
          className="w-full border rounded p-2 z-50"
          placeholder="Start typing an address..."
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
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Brunch">Brunch</option>
        </select>
      </div>
      <div >
        <label htmlFor="rating_service" className="block my-4">Service Rating:</label>
        <StarRating rating={formData.rating_service} onRatingChange={handleRatingChange('rating_service')} maxRating={5} />
        {formErrors.rating_service && <p className="text-red-500">Please set a service rating</p>}
      </div>
      <div >
        <label htmlFor="rating_foodquality" className="block my-4">Food Quality Rating:</label>
        <StarRating rating={formData.rating_foodquality} onRatingChange={handleRatingChange('rating_foodquality')} maxRating={5} />
        {formErrors.rating_foodquality && <p className="text-red-500">Please set a food quality rating</p>}
      </div> 
      <div >
        <label htmlFor="rating_ambiance" className="block my-4">Ambiance Rating:</label>
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
