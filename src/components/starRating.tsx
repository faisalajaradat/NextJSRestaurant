import React, { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
  allowHover?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, maxRating = 5, allowHover = true }) => {
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
    const starValue = index + 1;
    const isFilled = starValue <= displayRating;
    const isHalfFilled = !isFilled && starValue - 0.5 === displayRating;

    return (
      <span
        key={index}
        className="star"
        tabIndex={0}
        onMouseMove={(e) => handleStarHover(e, starValue)}
        onClick={(e) => handleStarClick(e, starValue)}
        style={{ cursor: allowHover ? 'pointer' : 'default', position: 'relative', display: 'inline-block' }}
      >
        <span
          className="star-full"
          style={{ color: isFilled ? '#ffd700' : '#ddd', width: '100%', display: 'inline-block' }}
        >
          &#9733;
        </span>
        {isHalfFilled && (
          <span
            className="star-half"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              color: '#ffd700',
              overflow: 'hidden',
             // clipPath: 'inset(0 0 0 0%)',
            }}
          >
            &#9733;
          </span>
        )}
      </span>
    );
  });

  return (
    <div className="star-rating" onMouseLeave={handleMouseLeave}>
      {stars}

      <style>{`
        .star-rating {
          display: flex;
          align-items: center; /* Vertically center the stars */
          user-select: none;
        }
        .star {
          font-size: 2rem;
          position: relative;
          display: inline-block;
          width: 2rem;
          height: 2rem;
          margin-right: 0; /* Removed gap */
          line-height: 1; /* Ensure stars aren't cut off */
          vertical-align: middle; /* Vertically align stars */
        }
        .star-full {
          display: inline-block;
          width: 100%;
          line-height: 1; /* Ensure proper height alignment */
        }
      `}</style>
    </div>
  );
};

export default StarRating;
