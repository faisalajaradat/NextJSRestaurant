import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RestaurantForm from './RestaurantForm';
import { RestaurantCreationAttributes } from '@/models/Restaurant';

interface CreateRestaurantProps {
  pass?: (restaurant: RestaurantCreationAttributes) => Promise<void>;
}

const defaultPass: CreateRestaurantProps['pass'] = async () => {};

const CreateRestaurant: React.FC<CreateRestaurantProps> = ({ pass = defaultPass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <DialogTrigger
          onClick={isOpen ? handleClose : handleOpen}
          className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center focus:outline-none relative"
        >
          <span className={`absolute transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </span>
        </DialogTrigger >
        <DialogContent className= "bg-[#ADC4CE]">
          <DialogHeader>
            <DialogTitle>Add Restaurant</DialogTitle>
            <DialogDescription >
              <RestaurantForm onSubmit={pass} onClose={handleClose}  />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateRestaurant;