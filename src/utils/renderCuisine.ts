export const renderCuisine = (cuisine: any): string => {
    if (Array.isArray(cuisine)) {
      return cuisine.join(', ');
    } else if (typeof cuisine === 'string') {
      try {
        const parsedCuisine = JSON.parse(cuisine);
        if (Array.isArray(parsedCuisine)) {
          return parsedCuisine.join(', ');
        }
      } catch (e) {
        // If parsing fails, it's likely already a string
        return cuisine;
      }
    } else if (typeof cuisine === 'object' && cuisine !== null) {
      // Handle the case where cuisine is an object
      if ('value' in cuisine && 'label' in cuisine) {
        return cuisine.label;
      } else {
        return Object.values(cuisine).join(', ');
      }
    }
    return String(cuisine); // Fallback to string representation
  };