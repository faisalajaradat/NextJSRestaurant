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

  return (
    <div className="star-rating ">
      {Array.from({ length: maxRating }, (_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index + 1)}
          className={`star ${index < rating ? 'filled' : ''}`}
          tabIndex={0}
        >
          &#9733;
        </span>
      ))}
      <style jsx>{`
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
        }
      `}</style>
    </div>
  );
};

export default StarRating;
