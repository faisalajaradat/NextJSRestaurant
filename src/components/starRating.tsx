import React from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, maxRating = 5 }) => {
  const handleClick = (ratingValue: number) => {
    onRatingChange(ratingValue);
  };

  
    
      const stars = Array.from({ length: maxRating }, (_, index) => {

        const isFilled = index < Math.floor(rating);
        const isHalfFilled = !isFilled && index < rating;
        return( <span
          key={index}
          onClick={() => handleClick(index + 1)}
          className={`star ${isFilled ? 'filled' : ''} ${isHalfFilled? 'half-filled': ''}` }
          tabIndex={0}
          
        >
          &#9733;
        </span>);
      })
    
      return (
      <div className="star-rating"> 
        {stars} 

        <style >{`
          .star-rating {
            display: flex;
            gap: 0.5rem;
            user-select: none; /* Prevent text selection */
          }
          .star {
            font-size: 2rem;
            color: #ddd;
            cursor: pointer; /* Change cursor to pointer */
            outline: none; /* Remove outline */
          
          }
          .star.filled {
            color: #ffd700;
          }.star.half-filled{
          background: linear-gradient(to right, #ffd700 50%, #ddd 50%);
                      -webkit-background-clip: text;
                      background-clip: text;
                      -webkit-text-fill-color: transparent;
          }
        `}
        </style> 
      </div>);
    };

export default StarRating;

