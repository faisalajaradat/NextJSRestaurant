import React, { useEffect, useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
  allowHover?:boolean;

}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, maxRating = 5, allowHover= true }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleStarHover = (event: React.MouseEvent<HTMLSpanElement>, hoveredRating: number) => {
    if (!allowHover) return;
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const isHalfStar = x < width / 2;
    setHoverRating(isHalfStar ? hoveredRating - 0.5 : hoveredRating);
  };

  const handleStarClick = (event: React.MouseEvent<HTMLSpanElement>, clickedRating: number) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const isHalfStar = x < width / 2;
    onRatingChange(isHalfStar ? clickedRating - 0.5 : clickedRating);
  };

  const handleMouseLeave = () => {
    if (!allowHover) return;
    setHoverRating(null);
  };

  const displayRating = hoverRating !== null ? hoverRating : rating;
    
      const stars = Array.from({ length: maxRating }, (_, index) => {
        const starValue = index+1;
        const isFilled = starValue <= displayRating;
        const isHalfFilled = !isFilled && starValue <= Math.ceil(displayRating);
        return( <span
          key={index}
          className={`star ${isFilled ? 'filled' : ''} ${isHalfFilled? 'half-filled': ''}` }
          tabIndex={0}
          onMouseMove={(e) => handleStarHover(e, starValue)}
          onClick={(e) => handleStarClick(e, starValue)}
          style={{cursor:allowHover ? 'pointer' : 'default'}}
        >
          &#9733;
        </span>);
      })
    
      return (
      <div className="star-rating" onMouseLeave={handleMouseLeave}>
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

