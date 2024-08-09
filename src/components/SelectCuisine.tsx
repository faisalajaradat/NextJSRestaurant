import React, { useState, useEffect, useRef } from 'react';
import { CUISINE_OPTIONS} from '@/lib/constants';
import toast from 'react-hot-toast';



interface CuisineSelectProps {
  selectedCuisines: string[];
  onChange: (cuisines: string[]) => void;
}


const CuisineSelect: React.FC<CuisineSelectProps> = ({ selectedCuisines, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = CUISINE_OPTIONS.filter(cuisine => 
    cuisine.toLowerCase().includes(inputValue.toLowerCase()) &&
    !selectedCuisines.includes(cuisine)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const addCuisine = (cuisine: string) => {
    if (!selectedCuisines.includes(cuisine) && (typeof CUISINE_OPTIONS).includes(cuisine)) {
      onChange([...selectedCuisines, cuisine]);
    }else if(!(typeof CUISINE_OPTIONS).includes(cuisine)){
        toast.error("Please Pick One of the Options.")
    }
    setInputValue('');
    inputRef.current?.focus();
  };

  const removeCuisine = (cuisine: string) => {
    onChange(selectedCuisines.filter(c => c !== cuisine));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        addCuisine(filteredOptions[0]);
      } else if (!selectedCuisines.includes(inputValue)) {
        addCuisine(inputValue);
      }
    } else if (e.key === 'Backspace' && inputValue === '' && selectedCuisines.length > 0) {
      removeCuisine(selectedCuisines[selectedCuisines.length - 1]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex flex-wrap gap-2 p-2 border rounded">
        {selectedCuisines.map(cuisine => (
          <span key={cuisine} className="bg-blue-100 px-2 py-1 rounded flex items-center">
            {cuisine}
            <button 
              type="button"
              onClick={() => removeCuisine(cuisine)}
              className="ml-1 text-sm text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-grow outline-none"
          placeholder={selectedCuisines.length === 0 ? "Type to add cuisines" : ""}
        />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.slice(0,5).map(cuisine => (
            <div 
              key={cuisine}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => addCuisine(cuisine)}
            >
              {cuisine}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CuisineSelect;